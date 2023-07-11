import {Component, inject} from '@angular/core';

import {Router} from "@angular/router";
import {AppNotification, NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {

  #notify = inject(NotificationService);
  notifications: AppNotification[] = [];

  constructor() {
    this.#notify.getNotifications().subscribe((n) => {

     this.notifications = n
      console.log(this.notifications);
    });
  }


}
