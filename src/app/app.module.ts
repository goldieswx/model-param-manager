/* Contributors: 2023 * Paul Wurth SA / David Jakubowski.

This work is licensed under the Creative Commons Attribution-ShareAlike 4.0 International License.
You should have received a copy of the Creative Commons with this program.

If not, to view a copy of this license, visit <http://creativecommons.org/licenses/by-sa/4.0/>.
or send aletter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA. */


import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  ButtonModule,
  CheckboxModule,
  InputModule, NumberModule,
  PanelModule,
  TabsModule,
  UIShellModule
} from "carbon-components-angular";
import { JsonviewComponent } from './components/jsonview/jsonview.component';
import {FormsModule} from "@angular/forms";
import {JsonpartialComponent} from "./components/jsonview/jsonpartial/jsonpartial.component";
import { DesignerComponent } from './components/designer/designer.component';
import { DesignSectionComponent } from './components/designer/design-section/design-section.component';
import { DesignFormComponent } from './components/designer/design-form/design-form.component';
import { FormElementComponent } from './components/designer/form-element/form-element.component';
import { GroupByRowPipe } from './components/designer/group-by-row.pipe';

@NgModule({
  declarations: [
    AppComponent,
    JsonviewComponent,
    JsonpartialComponent,
    DesignerComponent,
    DesignSectionComponent,
    DesignFormComponent,
    FormElementComponent,
    GroupByRowPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PanelModule,
    FormsModule,
    UIShellModule,
    TabsModule,
    ButtonModule,
    CheckboxModule,
    InputModule,
    NumberModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
