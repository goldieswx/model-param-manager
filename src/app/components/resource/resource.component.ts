import {Component, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {catchError, Subscription, throwError} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {ResourceFile, ResourceManagerService} from "../../services/resource-manager.service";
import humanFormat from "human-format";
import {sumBy, filter, padStart, last} from 'lodash';
import {NotificationService} from "../../services/notification.service";
import {HttpEventType} from "@angular/common/http";
import {TextEditorComponent} from "./text-editor/text-editor.component";

export interface UIResourceFile <T> {
    selected: boolean;
    humanSize: string;
    humanDate: string;
    data: T;
}


@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss']
})
export class ResourceComponent implements OnInit, OnDestroy {

  @ViewChild('appTextEditor') appTextEditor: TextEditorComponent;


  private subs = new Subscription();
  projectId : string = '';
  currentLink : string = '';

  #resources = inject(ResourceManagerService);
  #notification : NotificationService = inject(NotificationService);

  resourceLinks: string[] = [];
  files: UIResourceFile<ResourceFile>[] = [];
  selectCount: number = 0;

  componentMode : 'editor' | 'file-manager' = 'file-manager';
  currentFilenames: string[] = null;
  uploading = false;
  uploadingPercent = 0;

  constructor(private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.subs.add(
      this.activeRoute.params.subscribe((params) => {
        this.projectId = params['projectId'];
        this.#resources.getResourceLinks(this.projectId).subscribe(links => {
          this.resourceLinks = links;
        });
        this.loadFileIds(params['linkId']);
      })
    );
  }

  loadFileIds(link: string) {

    if (!link || !link.length) { return; }
    this.currentLink = link;
    this.selectCount = 0;
    this.#resources.getResourceFiles(this.projectId, link).subscribe(files => {
        this.files = files.map((f) => ({
              selected: false,
              humanSize: humanFormat(f.size, { decimals: 0,   unit: "B" }) ,
              humanDate: this._formatDate(new Date(f.modified)),
              data: f
        }))
    });
  }

  private _formatDate(d: Date): string {
      return String(d.getDate()).padStart(2, '0')  + "-" + String(d.getMonth()+1).padStart(2, "0") + "-" + d.getFullYear() + " " +
      String(d.getHours()).padStart(2,'0') + ":" + String(d.getMinutes()).padStart(2,'0');
  }

  ngOnDestroy() {
     this.subs.unsubscribe();
  }

  filesDropped (ev: any) {

    ev.stopPropagation();
    ev.preventDefault();

    const files: any[] = [];

    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      [...ev.dataTransfer.items].forEach((item, i) => {
        // If dropped items aren't files, reject them
        if (item.kind === "file") {
          const file = item.getAsFile();
          files.push(file);
          console.log(`… file[${i}].name = ${file.name}`, file);
        }
      });
    } else {
      // Use DataTransfer interface to access the file(s)
      [...ev.dataTransfer.files].forEach((file, i) => {
        files.push(file);
        console.log(`… file[${i}].name = ${file.name}`, file);
      });
    }

    const formData = new FormData();
    files.map(f => formData.append('file',f));

    this.#resources.uploadFiles(this.projectId, this.currentLink, formData).subscribe((res) => {

          if (res.type === HttpEventType.Response) {
            this.uploading = false;
            this.loadFileIds(this.currentLink);
            this.#notification.notify({ title: 'File(s) Uploaded', type: 'info', message: 'Your files have been successfully uploaded'});
          }

          if (res.type === HttpEventType.UploadProgress) {
            setTimeout(() => {
              this.uploadingPercent = Math.floor((res.loaded || 1) / (res.total || 1) * 100);
              this.uploading = this.uploadingPercent < 100;
            });
          }


    },(errr) => {
      this.loadFileIds(this.currentLink);
      this.#notification.notify({ title: 'Error while uploading files', type: 'error', message: errr.message});
    });
  }


  filesDragOver($event: DragEvent) {
      $event.preventDefault();
  }

  toggleSelect(file: UIResourceFile<ResourceFile>) {
       file.selected = !file.selected;
       this.selectCount = sumBy (this.files, (f) => (f.selected) ? 1 : 0);

  }

  deleteSelectedFiles() {
     const selectedFiles = filter(this.files, (f) => f.selected).map(f => f.data.filename);
     this.#resources.deleteFiles(this.projectId, this.currentLink, selectedFiles).subscribe((res) => {
       this.loadFileIds(this.currentLink);
       this.#notification.notify({ title: 'File(s) deleted', type: 'info', message: 'Selected files have been deleted.'});
     },(errr) => {
       this.loadFileIds(this.currentLink);
       this.#notification.notify({ title: 'Error while deleting files', type: 'error', message: errr.message});
     });

  }

  editFile(file: UIResourceFile<ResourceFile>) {
      this.componentMode = 'editor';
      this.currentFilenames = [this.projectId, this.currentLink, file.data.filename];
  }

  saveEditedFile() {
    if (this.appTextEditor) {
        this.appTextEditor.saveExistingFile();
    } else {
       console.log('Text editor not found!');
    }
  }


}
