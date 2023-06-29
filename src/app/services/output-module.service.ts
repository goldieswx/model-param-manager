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
import {HttpClient} from "@angular/common/http";

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

  constructor(private http: HttpClient) {

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

  public getOutputModuleData(module: OutputModule): OutputProcessedData {
          const sections : Section[]= this.#designer.getSections();

          const result = {} as any;

          _.each(sections || [],(section) => {
              _.each(section.subSections || [], (subSection) => {
                    _.each(subSection?.form?.items || [], (formItem) => {
                         if (formItem.outputModule === module.name) {
                           if (formItem.key) {
                             _.set(result, formItem.key, formItem.value);
                           }
                         }
                    });
              });
          });

          console.log('processed result', result);

          this.http.post(module.persistUri, result).subscribe((data) => {
              console.log('posted ', data);
          });

          return {
              result
          };
  }

  private _keysDeep(obj: any, keys : string[], parentKey : string = '') {

       _.forOwn(obj,(v,k) => {
            if (_.isObjectLike(v)) {
               this._keysDeep(v, keys, k);
            } else {
               keys.push(_.compact([parentKey, k]).join('.'));
            }
       });

  }

  public readFromOutputModuleData(module: OutputModule) {
        this.http.get(module.retrieveUri).subscribe((data) => {
              const allKeys : string[] = [];
              this._keysDeep(data, allKeys);

              const sections : Section[]= this.#designer.getSections();

              console.log('all keys', allKeys);

              _.each(sections || [],(section) => {
                _.each(section.subSections || [], (subSection) => {
                  _.each(subSection?.form?.items || [], (formItem) => {
                    if (formItem.outputModule === module.name) {
                      if (formItem.key) {
                        if (_.indexOf(allKeys,formItem.key) >= 0) {
                             console.log('setting key', formItem.key, 'to value', formItem.value);
                            formItem.value = _.get(data, formItem.key);
                        } else {
                             console.log('ignoring key', formItem.key);
                        }
                      }
                    }
                  });
                });
              });

        });
  }


}
