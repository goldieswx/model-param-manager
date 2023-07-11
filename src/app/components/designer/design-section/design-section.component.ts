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
import {FormManagerService} from "../../../services/form-manager.service";
import {DesignerService, Section, Subsection} from "../../../services/designer.service";
import {InitializationService} from "../../../services/initialization.service";


@Component({
  selector: 'app-design-section',
  templateUrl: './design-section.component.html',
  styleUrls: ['./design-section.component.scss']
})
export class DesignSectionComponent implements OnChanges {

    @Input() section : Section;
    #formManager = inject(FormManagerService);
    #designer = inject(DesignerService);
    #config = inject(InitializationService);

    readOnlyInterface = (this.#config.getConfig() || { readOnly: true}).readOnly;


  public currentSubsection : Subsection = null;

    public addSubsection() {
        this.#designer.addSubSection(this.section,{
          name: 'New subsection',
          form: this.#formManager.getEmptyDesignForm()
        });
        this.currentSubsection = this.currentSubsection || _.first(this.section.subSections);
    }

    public removeSubsection() {
        if (this.currentSubsection) {
          this.#designer.removeSubsection(this.section, this.currentSubsection);
          this.currentSubsection = _.first(this.section.subSections) || null;
        }
    }

    ngOnChanges(changes: SimpleChanges) {

      if (changes && changes['section']?.currentValue) {
         this.currentSubsection =  _.first(this.section.subSections);
      }
    }

  updateSubsectionName() {
      this.#designer.triggerSectionChanged(this.section);
  }
}
