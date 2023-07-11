import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

export interface ContentKey {
    content: string;
    key: string;
}

@Pipe({
  name: 'dropdownDisplay'
})
export class DropdownDisplayPipe implements PipeTransform {

  transform(items: ContentKey[], item: string): string {
    return _.find(items || [], { key: item })?.content || item ;
  }

}
