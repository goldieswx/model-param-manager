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


import {Component, inject} from '@angular/core';
import {Subsection} from "../design-form/design-form.component";
import * as _ from 'lodash';
import {FormManagerService} from "../design-form/form-manager.service";

@Component({
  selector: 'app-design-section',
  templateUrl: './design-section.component.html',
  styleUrls: ['./design-section.component.scss']
})
export class DesignSectionComponent {

    #formManager = inject(FormManagerService);

    public subSections : Subsection[] = [
      { name: 'Global parameters', form: this.#formManager.getEmptyDesignForm()},
      { name: 'External parameters', form: this.#formManager.getEmptyDesignForm()},
      { name: 'Other parameters', form: this.#formManager.getEmptyDesignForm()},
      { name: 'Rarely used', form: this.#formManager.getEmptyDesignForm()}
    ];

    public currentSubsection = _.first(this.subSections);

}
