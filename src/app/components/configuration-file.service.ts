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

import { Injectable } from '@angular/core';
import {dataMock, dataMock2} from "./jsonview/mock";

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

  constructor() { }

  public getConfigurationFiles(): ConfigurationFile[] {
    return [ {
        uri: "http://uri",
        contents: JSON.stringify(dataMock),
        machineName: 'burdiConfig',
        type: 'json'
    },
      {
        uri: "http://uri2",
        contents: JSON.stringify(dataMock2),
        machineName: 'webAppConfig',
        type: 'json'
      }];
  }
}