/* Contributors: 2023 * Paul Wurth SA / David Jakubowski.

This work is licensed under the Creative Commons Attribution-ShareAlike 4.0 International License.
You should have received a copy of the Creative Commons with this program.

If not, to view a copy of this license, visit <http://creativecommons.org/licenses/by-sa/4.0/>.
or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA. */


import {AfterViewInit, Component, ComponentRef, inject, NgZone, ViewChildren} from '@angular/core';
import {dataMock} from "./mock";
import * as interact from "interactjs";
import {JsonpartialComponent} from "./jsonpartial/jsonpartial.component";
import * as _ from 'lodash';
import {DesignerEventsService} from "../designer/designer-events.service";

@Component({
  selector: 'app-jsonview',
  templateUrl: './jsonview.component.html',
  styleUrls: ['./jsonview.component.scss']
})
export class JsonviewComponent implements  AfterViewInit {

  #ngZone = inject(NgZone);
  #events = inject(DesignerEventsService);

  public data = dataMock;

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
            console.log('drag event done!');
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
