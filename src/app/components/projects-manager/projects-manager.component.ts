import {Component, inject, OnDestroy} from '@angular/core';
import {ConfigProject, ProjectsManagerService} from "../../services/projects-manager.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import * as _ from 'lodash';

@Component({
  selector: 'app-projects-manager',
  templateUrl: './projects-manager.component.html',
  styleUrls: ['./projects-manager.component.scss']
})
export class ProjectsManagerComponent implements  OnDestroy {

  #projects = inject(ProjectsManagerService);

  public projects : ConfigProject[] = [];
  public currentProject : ConfigProject = null;
  public sub = new Subscription();

  constructor(private router: Router, activeRoute: ActivatedRoute) {
        this.#projects.getProjects().subscribe((projects) => {
            this.projects = projects;
            this.sub.add(
              activeRoute.params.subscribe((params )=> {
                this.currentProject = _.find(this.projects, { projectId : params['projectId'] } );
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

}
