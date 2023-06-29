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
import {DesignForm, FormManagerService} from "./form-manager.service";
import {Observable, Subject} from "rxjs";
import * as _ from "lodash";

export interface ChangeObserver<T> {
    action: 'update' | 'create' | 'delete' | string;
    data : T;
}

export interface Subsection {
  name: string;
  form : DesignForm;
}

export interface Section {
  name: string;
  subSections : Subsection[];
}


@Injectable({
  providedIn: 'root'
})
export class DesignerService {


  private sections : Section[] = [];
  private $_sectionChanges = new Subject<ChangeObserver<Section>>();

  constructor() {
       this.addSection('Global');
  }

  public setSections(sections : Section[]) {
       this.sections = sections;
       _.each(sections,(s) => this.triggerSectionChanged(s, 'create'));
  }

  public addSection(name: string) {
      const section: Section = { name: name, subSections: [] };
      this.sections.push(section);
      this.triggerSectionChanged(section, 'create');
  }

  public getSections() : Section[] {
      return this.sections;
  }

  public removeSection(section: Section) {
      const sectionIndex = this.sections.indexOf(section);
      if (sectionIndex >= 0) {
        this.sections.splice(sectionIndex);
        this.triggerSectionChanged(section, 'delete');
      }

  }

  public removeSubsection (section: Section, subSection: Subsection) {
        if (!section) { return; }
        section.subSections = _.pull(section.subSections, subSection);
        this.triggerSectionChanged(section, 'update');
  }

  public addSubSection (section: Section, subsection: Subsection) {
        section.subSections.push(subsection);
        this.triggerSectionChanged(section, 'update');
  }

  public getOnSectionChanged(): Observable<ChangeObserver<Section>> {
        return this.$_sectionChanges.asObservable();
  }

  /**
   * Get stream on section/subsection modifications.
   * @param section
   * @param whatChanged
   * @private
   */
  public triggerSectionChanged(section: Section, whatChanged?: string) {
        this.$_sectionChanges.next({ data: section, action: whatChanged || 'update'});
  }




}
