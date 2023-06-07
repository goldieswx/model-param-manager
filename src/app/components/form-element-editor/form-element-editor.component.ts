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

import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {DesignerEventsService} from "../designer/designer-events.service";
import {FormItem} from "../designer/design-form/form-manager.service";
import {OutputModule, OutputModuleService} from "../output-module/output-module.service";
import {ListItem} from "carbon-components-angular";

@Component({
  selector: 'app-form-element-editor',
  templateUrl: './form-element-editor.component.html',
  styleUrls: ['./form-element-editor.component.scss']
})
export class FormElementEditorComponent implements  OnDestroy, OnInit {

    #events = inject(DesignerEventsService);
    #outputModules = inject(OutputModuleService);
    private subs = new Subscription();

    formItem : FormItem = null;
    private _modules : OutputModule[] = this.#outputModules.getOutputModules();

    readonly availableTypes : any = [
          { content: 'String', key: 'string' },
          { content: 'Number', key: 'number' },
          { content: 'Boolean', key: 'boolean' },
          { content: 'Date', key: 'date' } ];

    readonly availableDisplays : any = [
        { content: 'Checkbox', key: 'checkbox' },
        { content: 'Text', key: 'text' },
        { content: 'Number', key: 'number' },
        { content: 'Slider', key: 'checkbox' },
        { content: 'Textarea', key: 'textarea' },
        { content: 'Dropdown', key: 'dropdown' },
        { content: 'Datepicker', key: 'datepicker' },
        { content: 'Timepicker', key: 'timepicker' }];

    outputModules : ListItem [] = [];

    ngOnInit() {
        this.subs.add(this.#events.getCurrentFormElement().subscribe((form : FormItem) => {
              this.formItem = form;
              this.outputModules = this._modules.map((m) => ({ content:  m.name, key: m.name, selected: m.name === this.formItem?.outputModule }));
        }));

        this.subs.add(this.#outputModules.getOnOutputModulesChanged().subscribe(modules => {
              this.outputModules = modules.map((m) => ({ content:  m.name, key: m.name, selected: m.name === this.formItem?.outputModule }));
        }));
    }



  ngOnDestroy() {
      this.subs.unsubscribe();
  }

  setType(e: any) {
       this.formItem.type = e?.item?.key;
  }

  setDisplay(e: any) {
    this.formItem.display = e?.item?.key;
  }

  onMarkDownChanged() {
    this.#events.fireFormAction('markDownUpdate', this.formItem);
  }

  setOutputModule(e: any) {
    this.formItem.outputModule = e?.item?.key;
  }
}
