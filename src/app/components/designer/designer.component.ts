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


import {AfterViewInit, Component, inject, OnDestroy, ViewChild} from '@angular/core';
import * as interact from "interactjs";
import {DesignerEventsService, FormAction} from "../../services/designer-events.service";
import {catchError, of, Subscription, throwError} from "rxjs";
import {DesignerService, Section} from "../../services/designer.service";
import {ConfigurationFile, ConfigurationFileService} from "../../services/configuration-file.service";
import {OutputModule, OutputModuleService} from "../../services/output-module.service";
import * as _ from 'lodash';
import {ActivatedRoute, Router} from "@angular/router";
import {ConfigProject, ProjectsManagerService} from "../../services/projects-manager.service";
import {InitializationService} from "../../services/initialization.service";

@Component({
  selector: 'app-designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.scss']
})
export class DesignerComponent  implements  AfterViewInit, OnDestroy {

  #events = inject(DesignerEventsService);
  #designer = inject(DesignerService);
  #configFiles = inject(ConfigurationFileService);
  #outputModules = inject(OutputModuleService);
  #projects = inject(ProjectsManagerService);
  #config = inject(InitializationService);

  sideDisplay: any = { tree: true };

  sections: Section[] = [];

  private subs = new Subscription();
  configurationFiles: ConfigurationFile[] = [];
  outputModules: OutputModule[] = [];
  currentSection: Section = null;

  readOnlyInterface = (this.#config.getConfig() || { readOnly: true}).readOnly;
  showToolbar = false;

  currentProject: ConfigProject = null;
  disallowAdd: boolean;
  startedDragging = false;

  constructor(private router: Router, activeRoute: ActivatedRoute) {

    this.subs.add(
      activeRoute.params.subscribe((params )=> {
            this.#projects.getProject(params['projectId'])
              .pipe(catchError(() =>  throwError(() => new Error ('project doenst exist'))))
              .subscribe((config) => {

              this.configurationFiles =  config.data?.configurationFiles || [];
              this.outputModules = config.data?.outputModules || [];
              this.sections = config.data?.sections || [];

              this.currentProject = config;
              this.currentProject.data = {
                      configurationFiles: this.configurationFiles,
                      outputModules: this.outputModules,
                      sections: this.sections
              }

              this.#outputModules.setModules(this.outputModules);
              this.#configFiles.setFiles(this.configurationFiles);
              this.#designer.setSections(this.sections);
              this.currentSection = _.first(this.sections) || null;

              this.disallowAdd = !!_.find(this.configurationFiles, (configurationFile : ConfigurationFile) => !configurationFile.machineName)

              if (this.readOnlyInterface) {
                this.#outputModules.readFromAllOutputModuleData();
              }

            });
      }));

      this.subs.add(this.#configFiles.getOnConfigurationFilesChanged().subscribe((configuration: ConfigurationFile[]) => {
             const found =  _.find(configuration, (configurationFile : ConfigurationFile) => {
               return (!(configurationFile.machineName  && configurationFile.machineName?.length) ||
               !(configurationFile.contents && configurationFile.contents?.length));
             } );
             console.log('found', found, configuration);
        this.disallowAdd = !!found;
      }));
  }

  ngOnDestroy() {
      this.saveProject()
      this.subs.unsubscribe();
      interact.default('label').unset();
      interact.default('.droppable-remove').unset();
      interact.default('.droppable').unset();
  }

  private saveProject() {
      this.#projects.saveProject(this.currentProject).subscribe((saveResult) => {
          console.log('saved project', saveResult);
      });
  }

  addConfigurationFile() {
     this.disallowAdd = true;
     this.#configFiles.addConfigurationFile();
  }

  addOutputModule() {
     this.#outputModules.addOutputModule();
  }


  addSection() {
      this.#designer.addSection('New Section');
  }

  removeCurrentSection() {
      this.#designer.removeSection(this.currentSection)
      this.currentSection = _.first(this.sections) || null;
  }

  onSectionSelect(currentSection: Section) {
      this.currentSection = currentSection;
  }

  updateSectionName() {
      this.#designer.triggerSectionChanged(this.currentSection);
  }

  sendAllOutputModules() {
       this.#outputModules.sendAllOutputModules();
  }


  ngAfterViewInit() {

    // implemente droppable zones where items (json keys or items) [are dropped (added or reorder)]
    interact.default('.droppable').dropzone({
      // Require a 75% element overlap for a drop to be possible
      //overlap: 0.75,

      ondragenter:  (event) => {
        event.target.style.border = 'dotted 2px #999';
        console.log('dropped drag enter activated', event);
      },
      ondragleave:  (event) => {
        event.target.style.border = 'none';
      },
      // listen for drop related events:
      ondropactivate:  (event) => {
      },
      ondrop: (event) => {
        event.target.style.border = 'none';
        // make the implementing component initate itself the drop event and include whatever reference it needs.
        this.#events.pushDragEvent('drag-drop', event);
      }
    });

    // implement remove button drop zone
    interact.default('.droppable-remove').dropzone({
      // Require a 75% element overlap for a drop to be possible
      //overlap: 0.75,
      ondrop: (event) => {
        this.#events.pushDragEvent('drag-drop', event);
      }
    });


    // implement draggable on labels in order to reorder items on the form.
    interact.default('label')
      .draggable({
        inertia: true,
        listeners: {
          start: (event) => {

            event.target.setAttribute('data-x', event.dx);
            event.target.setAttribute('data-y', event.dy);
            this.startedDragging = true;
            //this.#events.pushMoveFormItemEvent ('start',  event);
          },
          // call this function on every dragmove event
          move: (event) => this._dragMoveListener(event),

          // call this function on every dragend event
          end: (event) =>  {
            //this.#events.pushDragEvent('end',event);
            const transformTarget = event.target.closest('app-form-element');

            transformTarget.style.transform = 'none';
            transformTarget.style.height = 'auto';
            transformTarget.opacity = 1;

            event.target.setAttribute('data-x', 0);
            event.target.setAttribute('data-y', 0);
            //this.#events.pushMoveFormItemEvent ('end',  event);
            this.startedDragging = false;

          }
        }
      });


  }

  private _dragMoveListener (event: any) {

    var target = event.target

    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

    // translate the element
    const transformTarget = target.closest('app-form-element');
    transformTarget.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
    transformTarget.style.height = 0;
    transformTarget.style.opacity = 0.5;

    // update the posiion attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
  }


  toggleToolbar() {
      this.showToolbar = !this.showToolbar;
  }
}
