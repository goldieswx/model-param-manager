/* Contributors: 2023 * Paul Wurth SA / David Jakubowski.

This work is licensed under the Creative Commons Attribution-ShareAlike 4.0 International License.
You should have received a copy of the Creative Commons with this program.

If not, to view a copy of this license, visit <http://creativecommons.org/licenses/by-sa/4.0/>.
or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA. */


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
