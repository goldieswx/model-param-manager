/* Contributors: 2023 * Paul Wurth SA / David Jakubowski.

This work is licensed under the Creative Commons Attribution-ShareAlike 4.0 International License.
You should have received a copy of the Creative Commons with this program.

If not, to view a copy of this license, visit <http://creativecommons.org/licenses/by-sa/4.0/>.
or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA. */


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
