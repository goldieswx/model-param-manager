import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";


import * as _ from 'lodash';
import {BehaviorSubject} from "rxjs";
import {ConfigurationFile, ConfigurationFileService} from "./configuration-file.service";
import {DesignerService, Section} from "./designer.service";
import {OutputModule, OutputModuleService} from "./output-module.service";
import {ProjectsManagerService} from "./projects-manager.service";

export interface AppConfig {
  reloadConfigurationFiles: boolean;
  backendUrl: string;
  readonly: boolean;
}

export interface InitFileStructure {
  configurationFiles: ConfigurationFile[],
  sections: Section[],
  outputModules: OutputModule[]
}


@Injectable({
  providedIn: 'root'
})
export class InitializationService {

  private config : AppConfig = null;

  private $_applicationLoaded = new BehaviorSubject<boolean>(false);
  public readonly $applicationLoaded = this.$_applicationLoaded.asObservable();


  constructor(private http: HttpClient) { }

  public getConfig() : AppConfig {
      return this.config;
  }

  public loadConfig() {
      this.http.get<AppConfig>('assets/config.json').subscribe((cfg) => {
            this.config = cfg;
            if (cfg?.backendUrl) {
                  this.$_applicationLoaded.next(true);
            }
      });
  }

}
