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
import {BehaviorSubject, Observable} from "rxjs";
import {DesignerService, Section} from "./designer.service";
import * as _ from 'lodash';

export interface OutputModule {
      name: string;
      retrieveHttpAction ?: 'POST' | 'PUT' | 'GET' | string;
      retrieveUri ?: string;
      persistUri ?: string;
      persistHttpAction ?: 'POST' | 'PUT' | 'GET' | string;
}

export interface OutputProcessedData {

      result: any;

}

@Injectable({
  providedIn: 'root'
})
export class OutputModuleService {

  private _outputModules: OutputModule[] = [];
  private $outputModules = new BehaviorSubject<OutputModule[]>([]);

  #designer = inject(DesignerService);

  constructor() {

      const storedModules: OutputModule[] = JSON.parse(localStorage.getItem('output-modules') ) || [{
        name: 'default',
        httpAction: 'POST' }] ;

      this.getOnOutputModulesChanged().subscribe((modules) => {
              localStorage.setItem('output-modules', JSON.stringify(modules));
      });

      this.setModules(storedModules);
  }

  public addOutputModule() {
      this._outputModules.push({
           name: 'unnamed', retrieveHttpAction: 'GET', persistHttpAction: 'POST'
      });
      this.setModules();
  }

  public setModules(modules ?: OutputModule[]) {
    if (modules) {
      this._outputModules = modules;
    }
    this.$outputModules.next(this._outputModules);
  }

  public getOutputModules(): OutputModule[] {
    return this._outputModules;
  }

  public getOnOutputModulesChanged(): Observable<OutputModule[]> {
    return this.$outputModules.asObservable();
  }

  public deleteModule(output: OutputModule) {
      const index = _.indexOf(this._outputModules, output);
      if (index >= 0) {
          this._outputModules.splice(index);
          this.$outputModules.next(this._outputModules);
      }

  }

  public getOutputModuleData(moduleName: string): OutputProcessedData {
          const sections : Section[]= this.#designer.getSections();

          const result = {} as any;

          _.each(sections || [],(section) => {
              _.each(section.subSections || [], (subSection) => {
                    _.each(subSection?.form?.items || [], (formItem) => {
                         if (formItem.outputModule === moduleName) {
                           if (formItem.key) {
                             _.set(result, formItem.key, formItem.value);
                           }
                         }
                    });
              });
          });

          console.log('processed result', result);

          return {
              result
          };
  }


}
