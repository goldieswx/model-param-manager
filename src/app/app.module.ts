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
    CheckboxModule, DialogModule, DropdownModule,
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
import { ConfigurationFileEditorComponent } from './components/configuration-file-editor/configuration-file-editor.component';
import {HttpClientModule} from "@angular/common/http";
import { OutputModuleComponent } from './components/output-module/output-module.component';
import {LocalStoragePersistenceService} from "./services/local-storage-persistence.service";
import { ToolbarComponent } from './components/designer/toolbar/toolbar.component';
import {ConfigurationFileBindingService} from "./services/configuration-file-binding.service";
import { ProjectsManagerComponent } from './components/projects-manager/projects-manager.component';

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
    MarkdownViewerComponent,
    ConfigurationFileEditorComponent,
    OutputModuleComponent,
    ToolbarComponent,
    ProjectsManagerComponent
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
        HttpClientModule,
        DialogModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

    constructor(persist: LocalStoragePersistenceService, bindings: ConfigurationFileBindingService) {
    }


}
