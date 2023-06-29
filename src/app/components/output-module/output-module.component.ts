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

import {Component, inject, Input} from '@angular/core';
import {OutputModule, OutputModuleService} from "../../services/output-module.service";

@Component({
  selector: 'app-output-module',
  templateUrl: './output-module.component.html',
  styleUrls: ['./output-module.component.scss']
})
export class OutputModuleComponent {

   #outputModule = inject(OutputModuleService);

   @Input() module: OutputModule;
   readonly httpActions : any = [
    { content: 'POST', key: 'post' },
    { content: 'PUT', key: 'put' },
    { content: 'GET', key: 'get' } ];


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
}
