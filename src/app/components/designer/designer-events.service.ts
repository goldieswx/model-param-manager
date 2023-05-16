/* Contributors: 2023 * Paul Wurth SA / David Jakubowski.

This work is licensed under the Creative Commons Attribution-ShareAlike 4.0 International License.
You should have received a copy of the Creative Commons with this program.

If not, to view a copy of this license, visit <http://creativecommons.org/licenses/by-sa/4.0/>.
or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA. */


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
