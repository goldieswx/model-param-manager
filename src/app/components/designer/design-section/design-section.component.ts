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


import {Component, inject, Input, OnChanges, SimpleChanges} from '@angular/core';
import * as _ from 'lodash';
import {FormManagerService} from "../design-form/form-manager.service";
import {Section, Subsection} from "../designer.service";


@Component({
  selector: 'app-design-section',
  templateUrl: './design-section.component.html',
  styleUrls: ['./design-section.component.scss']
})
export class DesignSectionComponent implements OnChanges {

    @Input() section : Section;
    #formManager = inject(FormManagerService);

    public currentSubsection : Subsection = null;

    public addSubsection() {
        this.section.subSections.push({
            name: 'New subsection',
            form: this.#formManager.getEmptyDesignForm()
        })
    }

    public removeSubsection() {
        if (this.currentSubsection) {
          this.section.subSections = _.pull(this.section.subSections, this.currentSubsection);
        }
    }

    ngOnChanges(changes: SimpleChanges) {

      if (changes && changes['section']?.currentValue) {
         this.currentSubsection =  _.first(this.section.subSections);
      }
    }

}
