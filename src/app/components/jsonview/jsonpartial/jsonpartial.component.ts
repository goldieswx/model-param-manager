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
import {DesignerEventsService} from "../../../services/designer-events.service";
import {Subscription} from "rxjs";
import {FormManagerService} from "../../../services/form-manager.service";
import {ConfigurationFileBindingService} from "../../../services/configuration-file-binding.service";
import {bind} from "lodash";
import {ConfigurationFile} from "../../../services/configuration-file.service";


@Component({
  selector: 'app-jsonpartial',
  templateUrl: './jsonpartial.component.html',
  styleUrls: ['./jsonpartial.component.scss']
})
export class JsonpartialComponent implements OnChanges, OnDestroy, OnInit  {

  #elRef = inject(ElementRef);
  #events = inject(DesignerEventsService);
  #formManager = inject(FormManagerService);
  #bindings = inject(ConfigurationFileBindingService);

  @Input('data')  data: any = {};
  @Input('key')   key = '';
  @Input('parentKey') parentKey = '';
  @Input() configFile: ConfigurationFile;

  public renderedData : any[] = [];
  public isExpanded = false;
  public isComposite = false;
  public beingDragged = false;
  public bound = false;

  public inferredType = 'any';

  private subs = new Subscription();

  ngOnInit() {
      this.subs.add(this.#events.getDragEvents().subscribe((e) => {
          if (this.getRef() === e.event?.relatedTarget?.parentElement) {
            if (e.type === 'drag-drop') {
              this.#events.pushDropEvent('drop', e.event, { key: this.key, data: this.data, parentKey: this.parentKey, configFile: this.configFile } );
            }
          } else if (this.getRef() === e.event?.target?.parentElement) {
            if (e.type === 'start') {
              this.beingDragged = true;
            } else if (e.type === 'end') {
              this.beingDragged = false;
            }
          }
      }));

      this.subs.add(this.#bindings.getOnBindingsChanged().subscribe(bindings => {
        this.bound = !!_.find(bindings, {originKey: _.compact([this.parentKey,this.key]).join('.')});
      }));
  }

  ngOnChanges(changes: SimpleChanges) {

      if (changes && changes['data'] && changes['data'].currentValue) {
            this.isComposite = (_.isObject(this.data) || _.isArray(this.data));
            if (this.isComposite) {
              this.renderedData = _.toPairs(this.data);
            } else {
              this.renderedData = [this.data];
              this.inferredType = this.#formManager.inferType(this.data);
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







