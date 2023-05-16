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







