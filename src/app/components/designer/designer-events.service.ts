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

import {inject, Injectable, NgZone} from '@angular/core';
import {Observable, Subject} from "rxjs";

export interface AppDragEvent {
    type: string;
    event: any;
}

export interface AppDropEvent {
  type: string;
  event: any;
  dragOriginData: any;
}

@Injectable({
  providedIn: 'root'
})
export class DesignerEventsService {

  #ngZone = inject(NgZone);
  dragEvents$ = new Subject<AppDragEvent>();
  dropEvents$ = new Subject<AppDropEvent>();

  constructor() { }

  public pushDragEvent(type: string, event: any) {
      this.#ngZone.run(() => {
        this.dragEvents$.next({type, event});
      });
  }

  public pushDropEvent(type: string, event: any, dragOriginData: any) {
    this.#ngZone.run(() => {
      this.dropEvents$.next({type, event, dragOriginData});
    });
  }

  public getDragEvents() : Observable<AppDragEvent> {
      return this.dragEvents$.asObservable();
  }

  public getDropEvents() : Observable<AppDropEvent> {
    return this.dropEvents$.asObservable();
  }

}
