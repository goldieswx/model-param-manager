import {Component, inject, OnDestroy} from '@angular/core';
import {ConfigProject, ProjectData, ProjectsManagerService} from "../../services/projects-manager.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import * as _ from 'lodash';
import {InitializationService} from "../../services/initialization.service";

@Component({
  selector: 'app-projects-manager',
  templateUrl: './projects-manager.component.html',
  styleUrls: ['./projects-manager.component.scss']
})
export class ProjectsManagerComponent implements  OnDestroy {

  #projects = inject(ProjectsManagerService);
  #config = inject(InitializationService);

  readOnlyInterface = (this.#config.getConfig() || { readOnly: true}).readOnly;

  public projects : ConfigProject[] = [];
  public currentProject : ConfigProject = null;
  public sub = new Subscription();

  hasUnsavedProject = false;

  constructor(private router: Router, activeRoute: ActivatedRoute) {
    this.#projects.getProjects().subscribe((projects) => {
        this.projects = projects;
        this.sub.add(
          activeRoute.params.subscribe((params )=> {
            this.currentProject = _.find(this.projects, { projectId : params['projectId'] } );
            this.#projects.setCurrentProject(this.currentProject);
          })
        );
    });
  }

  ngOnDestroy() {
        this.sub.unsubscribe();
  }


  setCurrentProject(project: ConfigProject) {
        this.router.navigate(['projects', project.projectId ]);
  }

  editCurrentProject() {
        this.router.navigate(['designer', this.currentProject.projectId ]);
  }

  addEmptyProject() {

    this.currentProject = {
      projectName: 'New Project',
      projectId: '',
      projectDescription: 'New Project Description',
      data: {} as ProjectData,
      _unsaved: true
    }
    this.hasUnsavedProject = true;
    this.projects.push(this.currentProject);
  }

  saveCurrentProject() {
      this.#projects.saveProject({
        ...this.currentProject,
        _unsaved: undefined,
        _invalid: undefined
      }).subscribe((r) => {
            this.currentProject._unsaved = undefined;
            this.hasUnsavedProject = false;
      })
  }

  setProjectId(currentProject: ConfigProject, newValue: string) {
      currentProject._invalid = !newValue || !!_.find(this.projects, { projectId: newValue });
      currentProject.projectId = newValue;
  }

  deleteCurrentProject() {
        if (this.currentProject && !this.currentProject._unsaved) {
            this.#projects.deleteProject(this.currentProject).subscribe(() => {
                this._deleteProject(this.currentProject);
            })
        } else {
           this._deleteProject(this.currentProject);
        }
  }

  private _deleteProject(project: ConfigProject) {
    const currentProjectIndex = _.indexOf(this.projects, project);
    if (currentProjectIndex >= 0) {
      this.projects.splice(currentProjectIndex, 1);
    }
    this.currentProject = _.first(this.projects) || null;
    this.hasUnsavedProject = false;
  }

}
