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

import {Component, ElementRef, inject, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {FormItem, FormManagerService} from "../../../services/form-manager.service";
import {DesignerEventsService} from "../../../services/designer-events.service";
import {Subscription} from "rxjs";
import {ConfigurationFile, ConfigurationFileService} from "../../../services/configuration-file.service";
import * as _ from 'lodash';
import {ConfigFileBinding, ConfigurationFileBindingService} from "../../../services/configuration-file-binding.service";
import {ChangeObserver} from "../../../services/designer.service";

@Component({
  selector: 'app-form-element',
  templateUrl: './form-element.component.html',
  styleUrls: ['./form-element.component.scss']
})
export class FormElementComponent implements OnDestroy, OnChanges {

  #events = inject(DesignerEventsService);
  #elRef = inject(ElementRef);
  #configFile = inject(ConfigurationFileService);
  #formManager = inject(FormManagerService);


  @Input() element : FormItem;
  private subs = new Subscription();

  configsBound : ConfigurationFile[] = [];
  dropdownItems : any[]= [];

  constructor() {
    this.subs.add(this.#events.getDragEvents().subscribe((e) => {

      if (e.event.relatedTarget) {
        const targetAppForm = e.event.relatedTarget.closest('app-form-element');
        if (targetAppForm === this.getRef()) {
          if (e.type === 'drag-drop') {
            this.#events.pushDropEvent('drop-reorder', e.event, { element: this.element } );
          }
        }
      }

    }));

    this.subs.add(this.#configFile.getOnConfigurationFilesChanged().subscribe((changes: ConfigurationFile[]) => {
          this.configsBound = this.#configFile.getFilesByKey(this.element?.key || '');
    }));

    this.subs.add(this.#formManager.getOnFormItemChanged().subscribe((change: ChangeObserver<FormItem>)=> {

        if (change.data === this.element) {
            this._onElementChanged();
        }
    }));

  }

  private _onElementChanged() {
    if (this.element?.display === 'dropdown') {
      const items = this.#configFile.getValue(this.element.displayOptions.configName, this.element.displayOptions.dataKey);
      const [k,v] = [_.keys(items), _.values(items)];
      this.dropdownItems = _.map(k,(key, index) => ({ content: v[index], key: key }));
    }
    this.configsBound = this.#configFile.getFilesByKey(this.element.key);
  }

  ngOnChanges(changes: SimpleChanges) {
      if (changes && changes['element']?.currentValue) {
            this._onElementChanged();
      }
  }

  setCurrentFormElement() {
        this.#events.setCurrentFormElement(this.element);
  }

  showHelp() {
      this.#events.fireFormAction('showMarkDown', this.element);
  }

  setTextValue(formItem: FormItem, newValue: string) {
        if (formItem.type === 'string-array') {
             formItem.value = newValue.split(',');
        } else {
           formItem.value = newValue;
        }

  }

  ngOnDestroy() {
      this.subs.unsubscribe();
  }

  private getRef() {
    return this.#elRef.nativeElement
  }

  setDate(element: FormItem, $event: any) {
        element.value = (new Date($event)).toISOString();
  }

  setDropdownValue(element: FormItem, $event: any) {
        element.value = $event.item.key;
  }
}
