import {AfterViewInit, Component, inject, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import * as CodeMirror from "codemirror";
import {EditorConfiguration} from "codemirror";
import {ResourceManagerService} from "../../../services/resource-manager.service";
import {HttpEventType} from "@angular/common/http";
import {last} from "lodash";
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements AfterViewInit, OnChanges {

  @ViewChild('textEditor') textEditor: any;

  @Input() filename: string[];

  #resource = inject(ResourceManagerService);
  #notification = inject(NotificationService);

  private _codeMirror: any;
  loadingPercent = 0;
  loading = false;

  private initCodeEditor() {

    console.log('initiailize editor');
    if (this.textEditor) {
      this._codeMirror = CodeMirror.fromTextArea(this.textEditor.nativeElement, {
        lineNumbers: true,
        lineWrapping: true,
        matchBrackets: true
      } as EditorConfiguration);
    } else {
      console.log('could not load text editor');
    }
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes && changes['filename']) {

        setTimeout(() => {
            this._codeMirror.setValue('');
            this.loadingPercent = 0
            this.loading = this.loadingPercent < 100;
        }, 10);

        this.#resource.getFileContents(this.filename, true).subscribe((contents) => {
          // setTimeout(() => this._codeMirror.setValue(beautify(this.config.contents || '', {format: 'json'})), 500);


          if (contents.type === HttpEventType.Response) {
            this.loading = false;
            setTimeout(() => this._codeMirror.setValue(String((contents as any).body), 500));
          }

          if (contents.type === HttpEventType.DownloadProgress) {
            setTimeout(() => {
              this.loadingPercent = Math.floor((contents.loaded || 1) / (contents.total || 1) * 100);
              this.loading = this.loadingPercent < 100;
            });
          }
        });

    }

  }

  ngAfterViewInit() {
    this.initCodeEditor();
  }

  public saveExistingFile() {
    return this.#resource.updateFile(this.filename, this._codeMirror.getValue()).subscribe((res) => {
      this.#notification.notify({ title: 'File Saved (' + this.filename + ')', type: 'info', message: 'File successfully saved.'});
    },(errr) => {
      this.#notification.notify({ title: 'Error while saving file', type: 'error', message: errr.message});
    });
  }

}
