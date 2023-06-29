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
import {FormItem} from "../../../services/form-manager.service";
import {DesignerEventsService} from "../../../services/designer-events.service";
import {Subscription} from "rxjs";
import {ConfigurationFileService} from "../../../services/configuration-file.service";
import * as _ from 'lodash';

@Component({
  selector: 'app-form-element',
  templateUrl: './form-element.component.html',
  styleUrls: ['./form-element.component.scss']
})
export class FormElementComponent implements OnDestroy, OnChanges {

  #events = inject(DesignerEventsService);
  #elRef = inject(ElementRef);
  #configFile = inject(ConfigurationFileService);

  @Input() element : FormItem;
  private subs = new Subscription();

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
  }

  ngOnChanges(changes: SimpleChanges) {
      if (changes && changes['element']?.currentValue) {
            if (this.element?.display === 'dropdown') {
                console.log(this.element);
                const items = this.#configFile.getValue(this.element.displayOptions.configName, this.element.displayOptions.dataKey);
                const [k,v] = [_.keys(items), _.values(items)];
                this.dropdownItems = _.map(k,(key, index) => ({ content: v[index], key: k }));
                console.log(this.dropdownItems,k,v,items);
            }
      }
  }

  setCurrentFormElement() {
        this.#events.setCurrentFormElement(this.element);
  }

  showHelp() {
      this.#events.fireFormAction('showMarkDown', this.element);
  }

  ngOnDestroy() {
      this.subs.unsubscribe();
  }

  private getRef() {
    return this.#elRef.nativeElement
  }
}
