import {inject, Injectable} from '@angular/core';
import {InitializationService} from "./initialization.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ConfigurationFile} from "./configuration-file.service";
import {OutputModule} from "./output-module.service";
import {Section} from "./designer.service";
import * as _ from "lodash";

export interface ProjectData {
   configurationFiles : ConfigurationFile[];
   outputModules : OutputModule[];
   sections : Section[];
}

export interface ConfigProject {
  projectName: string;
  projectId: string;
  projectDescription : string;
  data : ProjectData;
  _unsaved ?: boolean;
  _invalid ?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsManagerService {

  #init = inject(InitializationService);
  private backendUrl =  this.#init.getConfig()?.backendUrl;


  constructor(private http : HttpClient) {
  }

  public getProjects(): Observable<ConfigProject[]> {
      return this.http.get<ConfigProject[]>(this.backendUrl + '/projects');
  }

  public getProject(projectId : string): Observable<ConfigProject> {
      return this.http.get<ConfigProject>(this.backendUrl + '/project/' + projectId );
  }

  public saveProject(project: ConfigProject) {

      return this.http.post(this.backendUrl + '/project/' + project.projectId, project );
  }

  public deleteProject(project: ConfigProject) {
    return this.http.delete(this.backendUrl + '/project/' + project.projectId );

  }
}
