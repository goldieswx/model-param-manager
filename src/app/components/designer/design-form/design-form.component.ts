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


import {Component, ElementRef, inject, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {DesignerEventsService} from "../designer-events.service";
import {Subscription} from "rxjs";
import {DesignForm, FormManagerService} from "./form-manager.service";
import * as _ from 'lodash';



@Component({
  selector: 'app-design-form',
  templateUrl: './design-form.component.html',
  styleUrls: ['./design-form.component.scss']
})
export class DesignFormComponent implements OnDestroy, OnInit, OnChanges  {

  #elRef = inject(ElementRef);
  #events = inject(DesignerEventsService);
  #formManager = inject(FormManagerService);

  private subs = new Subscription();

  @Input() form : DesignForm = null;

  ngOnChanges(changes: SimpleChanges) {

      if (changes && changes['form']?.currentValue) {
        this.#formManager.setForm(this.form);
      }

  }

  ngOnInit() {
    this.#formManager.setForm(this.form);

    this.subs.add(this.#events.getDropEvents().subscribe((e) => {
      // check if the events concerns my subsection.
      if (this.getRef().contains(e.event?.target) ) {
        if (e.type === 'drop') {
             // dropped a (json) key into a empty slot
             const targetDisplay = this._getDisplayTarget(e.event.target.classList);
             this.#formManager.addItem( e.dragOriginData.key, e.dragOriginData.data, e.dragOriginData.parentKey, targetDisplay);
        } else if (e.type === 'drop-reorder') {
             // reordered a form item into a new slot
               const targetDisplay = this._getDisplayTarget(e.event.target.classList);
               this.#formManager.moveItem( e.dragOriginData.element , targetDisplay);
        }
      } // other events.
      else if (e.event.target.classList.contains('droppable-remove')) {

          this.#formManager.removeItem( e.dragOriginData.element);
      }
    }));
  }

  public getRef() {
    return this.#elRef.nativeElement
  }

  private _getDisplayTarget (classList: string[]) : { insertAt: number, useSide: boolean } {

      const useSide  =  _.indexOf(classList,'__droptarget_side') >= 0;
      const targetIndex = _.find(classList, (c) => (c.indexOf('__droptarget_item-') >= 0)) || '';

      const findItem = /__droptarget_item-([0-9]*)/;

      return { insertAt: parseInt(findItem.exec(targetIndex)[1]) || 0, useSide: useSide };

  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
