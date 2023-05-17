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

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
    ButtonModule,
    CheckboxModule, DropdownModule,
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
import { FormElementEditorComponent } from './components/form-element-editor/form-element-editor.component';
import { MarkdownViewerComponent } from './components/designer/markdown-viewer/markdown-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    JsonviewComponent,
    JsonpartialComponent,
    DesignerComponent,
    DesignSectionComponent,
    DesignFormComponent,
    FormElementComponent,
    GroupByRowPipe,
    FormElementEditorComponent,
    MarkdownViewerComponent
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
        DropdownModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
