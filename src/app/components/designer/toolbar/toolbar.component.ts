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

import {Component, ElementRef, inject, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {DesignerEventsService} from "../../../services/designer-events.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnDestroy {

  #events = inject(DesignerEventsService);
  #elRef = inject(ElementRef);

  private subs = new Subscription();

  constructor() {

    this.subs.add(this.#events.getDragEvents().subscribe((e) => {

      if (e.event.relatedTarget) {
        const targetAppForm = e.event.relatedTarget.closest('app-toolbar');
        if (targetAppForm === this.getRef()) {
          if (e.type === 'drag-drop') {
            this.#events.pushDropEvent('drop-tool', e.event, { tool: 'label' } );
          }
        }
      }

    }));

  }

  ngOnDestroy() {
      this.subs.unsubscribe();
  }

  public getRef() {
    return this.#elRef.nativeElement
  }

}
