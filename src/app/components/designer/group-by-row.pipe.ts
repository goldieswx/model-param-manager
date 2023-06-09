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


import { Pipe, PipeTransform } from '@angular/core';
import {FormItem} from "../../services/form-manager.service";
import * as _  from 'lodash';

@Pipe({
  name: 'groupByRow'
})
export class GroupByRowPipe implements PipeTransform {

  transform(value: FormItem[]): FormItem[][] {
    console.log('transformed to ', _.values(_.groupBy(value, (value) => value.displayRow)));
    return _.values(_.groupBy(value, (value) => value.displayRow));
  }

}
