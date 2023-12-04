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

import {
  AfterViewInit,
  Component,
  ComponentRef,
  inject,
  Input,
  NgZone,
  OnChanges, OnDestroy,
  SimpleChanges,
  ViewChildren
} from '@angular/core';
import {dataMock} from "./mock";
import * as interact from "interactjs";
import {JsonpartialComponent} from "./jsonpartial/jsonpartial.component";
import * as _ from 'lodash';
import {DesignerEventsService} from "../../services/designer-events.service";
import {ConfigurationFile, ConfigurationFileService} from "../../services/configuration-file.service";
import {ConfigurationFileBindingService} from "../../services/configuration-file-binding.service";

@Component({
  selector: 'app-jsonview',
  templateUrl: './jsonview.component.html',
  styleUrls: ['./jsonview.component.scss']
})
export class JsonviewComponent implements  AfterViewInit, OnChanges, OnDestroy {

  #ngZone = inject(NgZone);
  #events = inject(DesignerEventsService);
  #configBinding = inject(ConfigurationFileBindingService);

  @Input() data: string;
  @Input() configFile: ConfigurationFile;

  parsedData : any = {};

  ngOnChanges(changes: SimpleChanges) {
      if (changes && changes['data']?.currentValue) {
          this.parsedData = JSON.parse(this.data);
      }
  }

  ngOnDestroy() {
    interact.default('.draggable').unset();
  }

  ngAfterViewInit() {

    interact.default('.draggable')
      .draggable({
        inertia: true,
        listeners: {
          start: (event) => {
            this.#events.pushDragEvent('start',event);
          },
          // call this function on every dragmove event
          move: (event) => this._dragMoveListener(event),

          // call this function on every dragend event
          end: (event) =>  {
            this.#events.pushDragEvent('end',event);
            event.target.style.transform = 'none';
            event.target.style.height = 'auto';

            event.target.setAttribute('data-x', 0);
            event.target.setAttribute('data-y', 0);
          }
        }
      });
  }

  private _dragMoveListener (event: any) {

    var target = event.target

    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

    // translate the element
    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
    target.style.height = 0;

    // update the posiion attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
  }
}
