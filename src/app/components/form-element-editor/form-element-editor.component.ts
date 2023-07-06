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

import {Component, ElementRef, inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {DesignerEventsService} from "../../services/designer-events.service";
import {FormItem, FormManagerService} from "../../services/form-manager.service";
import {OutputModule, OutputModuleService} from "../../services/output-module.service";
import {ListItem} from "carbon-components-angular";
import * as _ from 'lodash';
import {ConfigurationFileService} from "../../services/configuration-file.service";

@Component({
  selector: 'app-form-element-editor',
  templateUrl: './form-element-editor.component.html',
  styleUrls: ['./form-element-editor.component.scss']
})
export class FormElementEditorComponent implements  OnDestroy, OnInit {

    #elRef = inject(ElementRef);
    #events = inject(DesignerEventsService);
    #outputModules = inject(OutputModuleService);
    #formManager = inject(FormManagerService);
    #configFile = inject(ConfigurationFileService);

    private subs = new Subscription();

    formItem : FormItem = null;
    private _modules : OutputModule[] = this.#outputModules.getOutputModules();

    readonly availableTypes : any = [
          { content: 'String', key: 'string' },
          { content: 'Number', key: 'number' },
          { content: 'Boolean', key: 'boolean' },
          { content: 'Date', key: 'date' } ,
          { content: 'String Array', key: 'string-array' },
          { content: 'Number Array', key: 'number-array' } ];

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

      this.subs.add(this.#events.getDropEvents().subscribe((e) => {
        // check if the events concerns my subsection.
        if (this.getRef().contains(e.event?.target)) {
          if (e.type === 'drop') {
            // dropped a (json) key into a empty slot
             if (e.event.target.classList.contains('dropzone')) {
                this.onDroppedDropdownKey(e.dragOriginData);
             }
          }
        }
      }));

   }

  public getRef() {
    return this.#elRef.nativeElement
  }

  ngOnDestroy() {
      this.subs.unsubscribe();
  }

  private onDroppedDropdownKey(e: any) {
      const fullKey = _.compact([e.parentKey, e.key]).join('.');
      const configFile = e.configFile.machineName;
      this.formItem.displayOptions = { dataKey: fullKey, configName: configFile };
      this.#formManager.triggerFormItemChanges(this.formItem,'update');
  }

  setType(e: any) {
       this.formItem.type = e?.item?.key;
       this.update();
   }

  setDisplay(e: any) {
    this.formItem.display = e?.item?.key;
    this.update();
  }

  onMarkDownChanged() {
    this.#events.fireFormAction('markDownUpdate', this.formItem);
    this.#formManager.triggerFormItemChanges(this.formItem,'update');

  }

  setOutputModule(e: any) {
    this.formItem.outputModule = e?.item?.key;
    this.update()
  }

  update() {
    this.#formManager.triggerFormItemChanges(this.formItem,'update');
  }

}
