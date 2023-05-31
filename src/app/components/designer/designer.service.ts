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

import { Injectable} from '@angular/core';
import {DesignForm} from "./design-form/form-manager.service";

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

  constructor() {
       this.addSection('Global');
  }


  addSection(name: string) {
      this.sections.push({ name: name, subSections: [] });
  }

  getSections() : Section[] {
      return this.sections;
  }

}
