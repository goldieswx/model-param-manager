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

import {Component, ElementRef, inject, Input, OnDestroy} from '@angular/core';
import {FormItem} from "../design-form/form-manager.service";
import {DesignerEventsService} from "../designer-events.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-form-element',
  templateUrl: './form-element.component.html',
  styleUrls: ['./form-element.component.scss']
})
export class FormElementComponent implements OnDestroy {

  #events = inject(DesignerEventsService);
  #elRef = inject(ElementRef);

  @Input() element : FormItem;
  private subs = new Subscription();

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
