import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'toText'
})
export class ToTextPipe implements PipeTransform {

  transform(value: any): string {
        if (_.isArray(value)) {
            return value.join(',');
        }
        return value;
  }

}
