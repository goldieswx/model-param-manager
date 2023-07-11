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

import {Component, inject, Input, OnChanges, SimpleChanges} from '@angular/core';
import {OutputModule, OutputModuleService} from "../../services/output-module.service";
import * as _  from 'lodash';

@Component({
  selector: 'app-output-module',
  templateUrl: './output-module.component.html',
  styleUrls: ['./output-module.component.scss']
})
export class OutputModuleComponent implements OnChanges{

   #outputModule = inject(OutputModuleService);

   validName : boolean;
   validated : boolean;

   _moduleName : string = ''

   @Input() module: OutputModule;
   readonly httpActions : any[] = [
    { content: 'POST', key: 'post' },
    { content: 'PUT', key: 'put' },
    { content: 'GET', key: 'get' } ];

  ngOnChanges(changes: SimpleChanges) {
      if (changes && changes['module']?.currentValue) {
            this.validName = this.checkValidName(this.module.name);
            this.validated = this.validName;
            this._moduleName = this.module.name;
      }
  }

  private checkValidName(moduleName: string): boolean {
        if(moduleName && moduleName?.length) {
            let module = _.find(this.#outputModule.getOutputModules(), { name: moduleName});
            if (module === this.module) {
              return true;
            }
            return !module;
        }
        return false;
  }

  update() {
      this.#outputModule.setModules();
  }

  send(module: OutputModule) {
      this.#outputModule.getOutputModuleData(module);
  }

  delete(module: OutputModule) {
       this.#outputModule.deleteModule(module);
  }

  read(module: OutputModule) {
      this.#outputModule.readFromOutputModuleData(module);
  }


  updateModuleName(moduleName : string) {
     this.validName = this.checkValidName(moduleName);
      if (this.validName && !this.validated) {
          this.module.name = this._moduleName;
          this.update();
          this.validated = true;
          this.validName = true;
      }
  }

  setPrivateModuleName(moduleName: string) {
     this._moduleName = moduleName;
      this.validName = this.checkValidName(moduleName);
  }

  cycleAction(retrieveHttpAction: 'post' | 'put' | 'get' | string) {

      let index = _.findIndex(this.httpActions, { key: retrieveHttpAction });
      if (index === -1) { index = 0; }
      index = (index + 1) % this.httpActions.length;

      return this.httpActions[index]?.key;
  }
}
