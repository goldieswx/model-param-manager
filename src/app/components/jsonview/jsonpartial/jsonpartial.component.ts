/* Contributors: 2023 * Paul Wurth SA / David Jakubowski.

This work is licensed under the Creative Commons Attribution-ShareAlike 4.0 International License.
You should have received a copy of the Creative Commons with this program.

If not, to view a copy of this license, visit <http://creativecommons.org/licenses/by-sa/4.0/>.
or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA. */


import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy, OnInit,
  SimpleChanges
} from '@angular/core';
import * as _ from 'lodash';

import * as interact from 'interactjs';
import {DesignerEventsService} from "../../designer/designer-events.service";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-jsonpartial',
  templateUrl: './jsonpartial.component.html',
  styleUrls: ['./jsonpartial.component.scss']
})
export class JsonpartialComponent implements OnChanges, OnDestroy, OnInit  {

  #elRef = inject(ElementRef);
  #events = inject(DesignerEventsService);

  @Input('data')  data: any = {};
  @Input('key')   key = '';
  @Input('parentKey') parentKey = '';


  public renderedData : any[] = [];
  public isExpanded = false;
  public isComposite = false;
  public beingDragged = false;

  private subs = new Subscription();

  ngOnInit() {
      this.subs.add(this.#events.getDragEvents().subscribe((e) => {
          if (this.getRef() === e.event?.relatedTarget?.parentElement) {
            if (e.type === 'drag-drop') {
              this.#events.pushDropEvent('drop', e.event, { key: this.key, data: this.data, parentKey: this.parentKey } );
            }
          } else if (this.getRef() === e.event?.target?.parentElement) {
            if (e.type === 'start') {
              this.beingDragged = true;
            } else if (e.type === 'end') {
              this.beingDragged = false;
            }
          }
      }));
  }

  ngOnChanges(changes: SimpleChanges) {

      if (changes && changes['data'] && changes['data'].currentValue) {
            this.isComposite = (_.isObject(this.data) || _.isArray(this.data));
            if (this.isComposite) {
              this.renderedData = _.toPairs(this.data);
            } else {
              this.renderedData = [this.data];
            }
      }
  }

  toggleExpand() {
     this.isExpanded = !this.isExpanded;
  }

  public getRef() {
     return this.#elRef.nativeElement
  }

  public test() {
      console.log('testing');
  }

  ngOnDestroy() {
      this.subs.unsubscribe();
  }

}







