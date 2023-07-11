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
import * as _ from 'lodash';
import {NotificationService} from "../../services/notification.service";

declare let require: any;
const jsonLint = require('json-lint');
const beautify = require('beautify');

@Component({
  selector: 'app-configuration-file-editor',
  templateUrl: './configuration-file-editor.component.html',
  styleUrls: ['./configuration-file-editor.component.scss']
})
export class ConfigurationFileEditorComponent implements AfterViewInit, OnChanges {

  @Input() config: ConfigurationFile;

  #configService = inject(ConfigurationFileService);
  #notification = inject(NotificationService);
  @ViewChild('textEditor') textEditor: any;

  hideJsonContents = true;
  validMachineName = true;

  private _codeMirror: any;

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes['config']) {
      this.validMachineName = !!(this.config.machineName && this.config.machineName !== '');
      if (this.config?.contents) {
        this.config.contents = JSON.stringify(JSON.parse(this.config.contents));
        setTimeout(() => this._codeMirror.setValue(beautify(this.config.contents || '', {format: 'json'})), 500);
      }
    }
  }

  getConfigFile(config: ConfigurationFile) {
    this.#configService.getFileContents(config.uri).subscribe((t) => {
      config.contents = t;
      this.updateFiles();
      setTimeout(() => this._codeMirror.setValue(beautify(this.config.contents || '', {format: 'json'})), 500);
    });
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
        lineWrapping: false,
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

    const contents = this._codeMirror.getValue();
    const parsed = jsonLint(contents);

    if (parsed && parsed.error) {

      this.#notification.notify({
        title: 'Error in JSON',
        message:  'Error in json file (line ' + parsed.line + ') ' + parsed.error,
        type: 'error'})

      this._codeMirror.getDoc().markText({line: (parsed.line - 1), ch: 0}, {
        line: (parsed.line - 1),
        ch: 999
      }, {clearOnEnter: true, css: "background-color: #cc333388"});


    } else {
      this.config.contents = beautify(JSON.stringify(JSON.parse(contents)), {format: 'json'});
      this.#configService.updateFile(this.config);
      this._codeMirror.setValue(this.config.contents || '');

      this.#notification.notify({
        title: 'Configuration file modified',
        message: `The  ${this.config.machineName} configuration file was successfully modified`,
        type: 'info'})

    }

  }

  _checkValidMachineName(value: string): boolean {
        if (value && value.length) {
            return !_.find(this.#configService.getConfigurationFiles(),{ machineName: value});
        }
        return false;
  }

  updateMachineName(newValue: string) {
      this.validMachineName = this._checkValidMachineName(newValue);
      if (this.validMachineName) {
        this.config.machineName = newValue;
        this.updateFiles();
      }
  }


  toggleJsonViewer() {
    this.hideJsonContents = !this.hideJsonContents;
  }
}
