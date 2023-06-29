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
import {DesignerService, Section} from "./designer.service";
import {FormManagerService} from "./form-manager.service";
import {debounceTime} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class LocalStoragePersistenceService {

  #designer = inject(DesignerService);
  #formManager = inject(FormManagerService);

  constructor() {

        this.#designer.getOnSectionChanged().pipe(debounceTime(1000)).subscribe(() => {
            this.saveSections();
        });

        this.#formManager.getOnFormItemChanged().pipe(debounceTime(1000)).subscribe(() => {
          this.saveSections();
        });

        const storedSections = this.getStoredSections();
        if (storedSections?.length) {
          this.#designer.setSections(storedSections);
        }

  }

  public saveSections() {

        localStorage.setItem('sections', JSON.stringify(this.#designer.getSections()));
  }

  public getStoredSections(): Section[] {
        return JSON.parse(localStorage.getItem('sections')) || [];
  }

}
