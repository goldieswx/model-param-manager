/* Copyright (C) 2023 Contributor:  David Jakubowski

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. */

import {inject, Injectable} from '@angular/core';
import {dataMock, dataMock2} from "./jsonview/mock";
import {BehaviorSubject, map, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as _ from 'lodash';

export interface ConfigurationFile {
      uri?: string;
      contents: string;
      machineName: string;
      type: 'json' | 'yaml' | 'xml' | 'ini' | string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigurationFileService {

  private _configurationFile: ConfigurationFile[] = [];
  private $configurationFile = new BehaviorSubject<ConfigurationFile[]>([]);

  #http = inject(HttpClient);

  constructor() {

        this.setFiles( [ /*{
          uri: "http://uri",
          contents: JSON.stringify(dataMock),
          machineName: 'burdiConfig',
          type: 'json'
        },
          {
            uri: null,
            contents: null, // JSON.stringify(dataMock2),
            machineName: 'webAppConfig',
            type: 'json'
          }*/] );

  }

  public setFiles(files ?: ConfigurationFile[]) {
      if (files) {
        this._configurationFile = files;
      }
      this.$configurationFile.next(this._configurationFile);
  }

  public getConfigurationFiles(): ConfigurationFile[] {
    return this._configurationFile;
  }

  public getOnConfigurationFilesChanged(): Observable<ConfigurationFile[]> {
     return this.$configurationFile.asObservable();
  }

  public addConfigurationFile(file?: ConfigurationFile) {

       if (!file) {
          file = {
            uri: null,
            contents: null, // JSON.stringify(dataMock2),
            machineName: 'renameMe',
            type: 'json'
          }
       }
       this._configurationFile.push(file);
       this.setFiles();
  }

  public getFileContents(url : string): Observable<any> {

    return this.#http.get(url, {
      headers: new HttpHeaders({'Content-Type': 'application/text'}),
      responseType: 'text'
    }).pipe(map(stream => {
          return stream;
    }));
  }

  removeConfigFile(config: ConfigurationFile) {
      const index = this._configurationFile.indexOf(config);
      if (index >= 0) {
        this._configurationFile.splice(index);
        this.setFiles();
      }
  }


}
