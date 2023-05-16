/* Contributors: 2023 * Paul Wurth SA / David Jakubowski.

This work is licensed under the Creative Commons Attribution-ShareAlike 4.0 International License.
You should have received a copy of the Creative Commons with this program.

If not, to view a copy of this license, visit <http://creativecommons.org/licenses/by-sa/4.0/>.
or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA. */


import { Injectable } from '@angular/core';
import * as _ from 'lodash';

export interface FormItem {
    key: string;
    value: any;
    type: 'string' | 'number' | 'date' | 'boolean' | string ;
    display: 'checkbox' | 'text' | 'number' | 'slider' | 'textarea' | 'dropdown' | 'datepicker' | 'timepicker' |  string;
    label: string;
    displayRow?: number;
    displayCol?: number;
}


export interface DesignForm  {
  items: FormItem[];
}

@Injectable({
  providedIn: 'root'
})
export class FormManagerService {

  private _form: DesignForm = null;

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
        if (_.isString(value)) {
          return 'string';
        }
        if (Number.isNaN ((new Date(value)).getTime())) {
           return 'date';
        }
        if (_.isBoolean(value)) {
           return 'boolean';
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

      console.log('reorder', _.cloneDeep(orderedItems));
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
    console.log('reorder ret', _.cloneDeep(ret));

    return ret;
  }

  public addItem(key: string, value: any, parentKey: string, target: { insertAt: number, useSide: boolean}) {

    if (this._form) {

          const type = this.inferType(value);
          const fullKey = (((parentKey || '').length) ? (parentKey + '.') : '')  + key;

          const newItem = {
              key: fullKey,
              value: value,
              type: type,
              display: this.inferDisplay(type),
              label: _.capitalize(_.startCase(key)) /* + ' [' + fullKey + ']' */,
              displayRow : (target.insertAt + 1) - ((target.useSide) ? 0 : 0.5), /* insertAt is zero based. display Row is 1 based. We insert before => -.5*/
              displayCol : (target.useSide) ? 999 : null
          };

          this._form.items.push(newItem);
          this._form.items = this.reorderItemsByRowCol(this._form.items);

      }
  }


}
