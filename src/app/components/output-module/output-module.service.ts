import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {DesignerService, Section} from "../designer/designer.service";
import * as _ from 'lodash';

export interface OutputModule {
      name: string;
      httpAction ?: 'POST' | 'PUT' | 'GET' | string;
      uri ?: string;
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
      this.setModules([ {
              name: 'default',
              httpAction: 'POST' } ]);
  }

  public addOutputModule() {
      this._outputModules.push({
           name: 'unnamed', httpAction: 'POST'
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

  public getOutputModuleData(moduleName: string): OutputProcessedData {
          const sections : Section[]= this.#designer.getSections();

          const result = {} as any;

          _.each(sections || [],(section) => {
              _.each(section.subSections || [], (subSection) => {
                    _.each(subSection?.form?.items || [], (formItem) => {
                         if (formItem.outputModule === moduleName) {
                           _.set(result, formItem.key, formItem.value);
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
