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


import {AfterViewInit, Component, inject} from '@angular/core';
import * as interact from "interactjs";
import {DesignerEventsService} from "./designer-events.service";

@Component({
  selector: 'app-designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.scss']
})
export class DesignerComponent  implements  AfterViewInit {

  #events = inject(DesignerEventsService);
  sideDisplay: any = { tree: true };

  ngAfterViewInit() {

    interact.default('.droppable').dropzone({
      // Require a 75% element overlap for a drop to be possible
      //overlap: 0.75,

      ondragenter:  (event) => {
        event.target.style.border = 'dotted 2px #999';
        console.log('dropped drag enter activated', event);
      },
      ondragleave:  (event) => {
        event.target.style.border = 'none';
      },

      // listen for drop related events:
      ondropactivate:  (event) => {
        console.log('dropped activated');
      },
      ondrop: (event) => {
        console.log('dropped', event);
        event.target.style.border = 'none';
        this.#events.pushDragEvent('drag-drop', event);
      }
    });

  }

}
