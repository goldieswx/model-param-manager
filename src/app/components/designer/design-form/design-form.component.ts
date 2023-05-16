/* Contributors: 2023 * Paul Wurth SA / David Jakubowski.

This work is licensed under the Creative Commons Attribution-ShareAlike 4.0 International License.
You should have received a copy of the Creative Commons with this program.

If not, to view a copy of this license, visit <http://creativecommons.org/licenses/by-sa/4.0/>.
or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA. */


import {Component, ElementRef, inject, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {DesignerEventsService} from "../designer-events.service";
import {Subscription} from "rxjs";
import {DesignForm, FormManagerService} from "./form-manager.service";
import * as _ from 'lodash';

export interface Subsection {
  name: string;
  form : DesignForm;
}

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
      if (this.getRef().contains(e.event?.target) ) {
        if (e.type === 'drop') {
             // console.log('tgt',e.event.target.className);
             const targetDisplay = this._getDisplayTarget(e.event.target.classList);
             this.#formManager.addItem( e.dragOriginData.key, e.dragOriginData.data, e.dragOriginData.parentKey, targetDisplay);
        }
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
