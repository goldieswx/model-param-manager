import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import * as _ from 'lodash';

export interface AppNotification {

    title ?: string;
    type: 'error' | 'success' | 'info' | 'warning' | string;
    subtitle ?: string;
    message ?: string;
    timeOutMs ?: number;
}


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  _notifications : AppNotification[] = [];
  $notifications = new BehaviorSubject<AppNotification[]>([]);

  constructor() { }

  public getNotifications(): Observable<AppNotification[]> {
      return this.$notifications.asObservable();
  }


  public notify(notification : AppNotification) {
        const notifyObject = _.clone(notification);
        this._notifications.push(notifyObject);
        const timeout = notification?.timeOutMs || 10000;
        if (timeout !== -1) {
          setTimeout(() => this.pullNotification(notifyObject), timeout)
        }
       this.$notifications.next(this._notifications);

  }

  private pullNotification(notifyObject: AppNotification) {
     this._notifications = _.pull(this._notifications, notifyObject);
     this.$notifications.next(this._notifications);
  }
}
