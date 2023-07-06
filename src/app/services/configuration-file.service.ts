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
import {dataMock, dataMock2} from "../components/jsonview/mock";
import {BehaviorSubject, map, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as _ from 'lodash';
import {OutputModule} from "./output-module.service";

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

    const storedFiles: ConfigurationFile[] = JSON.parse(localStorage.getItem('configuration-files') ) || [];

    this.setFiles(storedFiles);

    this.getOnConfigurationFilesChanged().subscribe((files) => {
      localStorage.setItem('configuration-files', JSON.stringify(files));
    });

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

  public getValue(configFileName: string, key: string) : any {
        const config = _.find(this._configurationFile, { machineName: configFileName });
        if (config) {
          const parsedFile = JSON.parse(config.contents);
          return _.get(parsedFile, key);
        }
  }


  public updateFile(config: ConfigurationFile) {
      const index = _.findIndex(this._configurationFile, { machineName: config.machineName });
      if (index >= 0) {
        this._configurationFile[index] = config;
        this.setFiles();
      }
  }

  getFilesByKey(key: string): ConfigurationFile[] {

       const result : ConfigurationFile[] = [];
       _.each(this._configurationFile, (configFile: ConfigurationFile) => {
          const parsedFile = JSON.parse(configFile.contents);
          if (_.has(parsedFile, key)) {
                result.push(configFile);
          }
       });

       return result;

  }
}
