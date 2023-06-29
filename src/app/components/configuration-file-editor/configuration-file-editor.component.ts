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

import {Component, inject, Input} from '@angular/core';
import {ConfigurationFile, ConfigurationFileService} from "../../services/configuration-file.service";


@Component({
  selector: 'app-configuration-file-editor',
  templateUrl: './configuration-file-editor.component.html',
  styleUrls: ['./configuration-file-editor.component.scss']
})
export class ConfigurationFileEditorComponent {

  @Input() config : ConfigurationFile;

  #configService = inject(ConfigurationFileService);

  getConfigFile(config: ConfigurationFile) {
      this.#configService.getFileContents(config.uri).subscribe((t) => {
        config.contents = t;
        this.updateFiles();
      } );
  }

  deleteConfigFile(config: ConfigurationFile) {
      this.#configService.removeConfigFile(config);
  }

  updateFiles() {
      this.#configService.setFiles();
  }


}
