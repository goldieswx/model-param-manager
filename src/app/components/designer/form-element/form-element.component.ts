/* Contributors: 2023 * Paul Wurth SA / David Jakubowski.

This work is licensed under the Creative Commons Attribution-ShareAlike 4.0 International License.
You should have received a copy of the Creative Commons with this program.

If not, to view a copy of this license, visit <http://creativecommons.org/licenses/by-sa/4.0/>.
or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA. */


import {Component, Input} from '@angular/core';
import {FormItem} from "../design-form/form-manager.service";

@Component({
  selector: 'app-form-element',
  templateUrl: './form-element.component.html',
  styleUrls: ['./form-element.component.scss']
})
export class FormElementComponent {

    @Input() element : FormItem;

}
