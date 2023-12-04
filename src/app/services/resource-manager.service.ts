import {inject, Injectable} from '@angular/core';
import {InitializationService} from "./initialization.service";
import {HttpClient} from "@angular/common/http";
import {ConfigProject} from "./projects-manager.service";
import {Observable} from "rxjs";

export interface ResourceFile {
  filename: string;
  size: number;
  modified: Date | string;
}

export interface FileContents {
  filename: string;
  contents: string;
}

@Injectable({
  providedIn: 'root'
})
export class ResourceManagerService {

  #init = inject(InitializationService);
  private backendUrl =  this.#init.getConfig()?.backendUrl;
  private currentProject: ConfigProject;

  constructor(private http : HttpClient) {
  }

  public getResourceLinks(projectId: string): Observable<string[]> {
    return this.http.get<string[]>(this.backendUrl + '/resources/' + projectId);
  }

  public getResourceFiles(projectId: string, linkId: string): Observable<ResourceFile[]> {
    return this.http.get<ResourceFile[]>(this.backendUrl + '/resources/' + projectId + '/' + linkId);
  }

  public uploadFiles(projectId: string, currentLink: string, formData: FormData): Observable<any> {
    return this.http.post(this.backendUrl +  '/resources/'+ projectId + '/' + currentLink + '/files/upload', formData, {
      observe: "events", reportProgress: true
    });
  }

  public deleteFiles(projectId: string, currentLink: string, selectedFiles: string[]) {
    return this.http.post(this.backendUrl  +  '/resources/'+ projectId + '/' + currentLink + '/files/delete', selectedFiles);
  }

  public getFileContents(filename: string[], reportProgress : boolean) {

    return this.http.get(this.backendUrl + '/static/resources/' + filename.join('/'), {
          responseType: 'text' as 'json', observe: "events" as any, reportProgress: reportProgress});
  }

  public updateFile(incomingFilename: string[], contents: string) {

    const projectId = incomingFilename[0];
    const linkId = incomingFilename[1];
    const fileName = incomingFilename[2];

    return this.http.post(this.backendUrl  +  '/resources/'+ projectId + '/' + linkId + '/files/update', { filename: fileName, contents: contents });
  }
}
