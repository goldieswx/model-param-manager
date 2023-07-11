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

import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import {Observable, Subject} from "rxjs";
import {ChangeObserver} from "./designer.service";

export interface FormItem {
    key ?: string;
    value ?: any;
    type ?: 'string' | 'number' | 'date' | 'boolean' | 'string-array' | 'number-array' |  string ;
    display ?: 'checkbox' | 'text' | 'number' | 'slider' | 'textarea' | 'dropdown' | 'datepicker' | 'timepicker'  |  string;
    displayOptions ?: any;
    label: string;
    toolType ?: 'label' | string;
    displayRow?: number;
    displayCol?: number;
    mdHelpText?: string;
    outputModule ?: string;
}

export interface DesignForm  {
  items: FormItem[];
}

@Injectable({
  providedIn: 'root'
})
export class FormManagerService {

  private _form: DesignForm = null;
  private $_formItemchanges = new Subject<ChangeObserver<FormItem>>();

  constructor() { }

  public getEmptyDesignForm() {
      return {
            items: []
      } as DesignForm;
  }

  public setForm(newValue: DesignForm) {
      this._form = newValue;
  }

  public inferType(value: any): string {

        if (_.isNumber(value)) {
          return 'number';
        }
        if (! Number.isNaN ((new Date(value)).getTime())) {
          return 'date';
        }
        if (_.isString(value)) {
          return 'string';
        }
        if (_.isBoolean(value)) {
          return 'boolean';
        }

        if (_.isArray(value)) {
          return 'string-array';
        }
        if (_.isObject(value)) {
          return 'object';
        }


        return 'string';
  }

  public inferDisplay(type: string): string {

        const inferences: any = {
            'number': 'number',
            'string': 'text',
            'date': 'datepicker',
            'boolean': 'checkbox'
        }

        return inferences[type] || 'text';

  }

  private reorderItemsByRowCol(itemsToReorder : FormItem[]): FormItem[] {

      const orderedItems = _.orderBy(itemsToReorder,['displayRow','displayCol']);

      let row = 0, col = 0, prevRow: any = null;
      const ret = _.map(orderedItems, (i) => {

        if (prevRow !== i.displayRow) {
          col = 0;
          row++;
        } else {
          col++;
        }
        prevRow = i.displayRow;
        return { ...i, displayRow: row, displayCol: col };
      });


    return ret;
  }


  public addItem(key: string, value: any, parentKey: string, target: { insertAt: number, useSide: boolean}) {

    if (this._form) {

          const type = this.inferType(value);
          const fullKey = (((parentKey || '').length) ? (parentKey + '.') : '')  + key;

          if (type === 'object') {
              // recursively add all properties of this object that are not object.
              _.forOwnRight(value, (v, k) => {
                   const type = this.inferType(v);
                   if (type !== 'object') {
                        this.addItem(k, v, fullKey, { insertAt : target.insertAt, useSide: target.useSide });
                   }
              });

          } else {

            const newItem = {
              key: fullKey,
              value: value,
              type: type,
              display: this.inferDisplay(type),
              label: _.capitalize(_.startCase(key)) /* + ' [' + fullKey + ']' */,
              displayRow: (target.insertAt + 1) - ((target.useSide) ? 0 : 0.5), /* insertAt is zero based. display Row is 1 based. We insert before => -.5*/
              displayCol: (target.useSide) ? 999 : null,
              outputModule: 'default'
            };

            this._form.items.push(newItem);
            this._form.items = this.reorderItemsByRowCol(this._form.items);
            this.triggerFormItemChanges(newItem, 'create');
          }
      }
  }

  public moveItem (item: FormItem,  target: { insertAt: number, useSide: boolean}) {

      item.displayRow = (target.insertAt + 1) - ((target.useSide) ? 0 : 0.5); /* insertAt is zero based. display Row is 1 based. We insert before => -.5*/
      item.displayCol = (target.useSide) ? 999 : null;

      this._form.items = this.reorderItemsByRowCol(this._form.items);
      this.triggerFormItemChanges(item, 'update');
  }

  public removeItem (item: FormItem) {

    this._form.items = _.pull(this._form.items, item);
    this._form.items = this.reorderItemsByRowCol(this._form.items);
    this.triggerFormItemChanges(item, 'delete');
  }

  public triggerFormItemChanges(item: FormItem, action: string) {
      this.$_formItemchanges.next({ action, data: item});
  }

  public getOnFormItemChanged(): Observable<ChangeObserver<FormItem>> {
      return this.$_formItemchanges.asObservable();
  }

  addTool(dragOriginData: any, target: { insertAt: number, useSide: boolean}) {

    const newItem = {
      toolType: 'label',
      label: 'Label' /* + ' [' + fullKey + ']' */,
      displayRow: (target.insertAt + 1) - ((target.useSide) ? 0 : 0.5), /* insertAt is zero based. display Row is 1 based. We insert before => -.5*/
      displayCol: (target.useSide) ? 999 : null,
      outputModule: 'default'
    };

    this._form.items.push(newItem);
    this._form.items = this.reorderItemsByRowCol(this._form.items);
    this.triggerFormItemChanges(newItem, 'create');


  }
}
