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

import {AfterViewInit, Component, inject, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {ConfigurationFile, ConfigurationFileService} from "../../services/configuration-file.service";
import * as CodeMirror from 'codemirror';

@Component({
  selector: 'app-configuration-file-editor',
  templateUrl: './configuration-file-editor.component.html',
  styleUrls: ['./configuration-file-editor.component.scss']
})
export class ConfigurationFileEditorComponent implements AfterViewInit, OnChanges {

  @Input() config : ConfigurationFile;

  #configService = inject(ConfigurationFileService);
  @ViewChild('textEditor') textEditor: any;

  private _codeMirror : any;

  /*

          console.log("setting config file value", t);
        this._codeMirror.setValue(t);
   */

  ngOnChanges(changes: SimpleChanges) {

      if (changes && changes['config']) {
          console.log('changes', this.config.contents);
           setTimeout(() => this._codeMirror.setValue(this.config.contents), 500);
      }

  }

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

  private initCodeEditor() {

    if (this.textEditor) {
      this._codeMirror = CodeMirror.fromTextArea(this.textEditor.nativeElement, {
        lineNumbers: true,
        lineWrapping: true,
        mode: "nginx",
        matchBrackets: true
      });
    } else {
      console.log('could not load text editor');
    }
  }

  ngAfterViewInit() {
      this.initCodeEditor();
  }

  updateJsonContents() {
     this.config.contents = this._codeMirror.getValue();
      this.#configService.updateFile(this.config);
  }
}
