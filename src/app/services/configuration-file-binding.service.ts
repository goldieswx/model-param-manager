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

import {inject, Injectable} from '@angular/core';
import {FormItem, FormManagerService} from "./form-manager.service";
import {DesignerService} from "./designer.service";
import * as _ from 'lodash';
import {BehaviorSubject, bufferTime, debounceTime, filter, Observable, Subject} from "rxjs";

export interface ConfigFileBinding {
   originKey: string;
   mapping : FormItem[];
}

@Injectable({
  providedIn: 'root'
})
export class ConfigurationFileBindingService {

  #designer = inject(DesignerService);
  #formManager = inject(FormManagerService);
  private bindings : {[key:string]: ConfigFileBinding} = {};
  private $_bindingsChanged = new BehaviorSubject<ConfigFileBinding[]>([]);

  constructor() {

    this.#formManager.getOnFormItemChanged()
            .pipe(bufferTime(500),filter(e => !!e.length))
            .subscribe((e) => {
              this.refreshBindings();
    });

    this.#designer.getOnSectionChanged().subscribe(() => {
      this.refreshBindings();
    });

    this.refreshBindings();
  }

  public getAllBindings(): {[key:string]: ConfigFileBinding} {

       const sections = this.#designer.getSections();
       const bindings: {[key:string]: ConfigFileBinding} = {};

       _.each(sections, (sct) => {
            _.each(sct.subSections, (subsection) => {
                _.each(subsection.form.items, (f: FormItem) => {
                   bindings[f.key] = bindings[f.key] || { originKey: f.key, mapping: []};
                   bindings[f.key].mapping.push(f);
                });
            })
       });

       return bindings;
  }

  public refreshBindings ()  {

    this.bindings = this.getAllBindings();
    this.$_bindingsChanged.next(_.values(this.bindings));
  }

  public getOnBindingsChanged() : Observable<ConfigFileBinding[]> {
        return this.$_bindingsChanged.asObservable();
  }


}
