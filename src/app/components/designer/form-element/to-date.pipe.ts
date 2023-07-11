import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toDate'
})
export class ToDatePipe implements PipeTransform {

  transform(value: string): string {
        const date = new Date(value);
        const hrMin = [date.getHours(), date.getMinutes()];
        return ((hrMin[0] <= 9) ? '0' : '') + hrMin[0] + ':' + ((hrMin[1] <= 9) ? '0' : '') + hrMin[1]
  }

}
