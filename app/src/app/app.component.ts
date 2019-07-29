import { Component, OnInit } from '@angular/core';
import { NotificationService, Notificacion } from './handler-error/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  title = 'Angular-SCSS';

  notification: Notificacion;
  showNotification: boolean;

  constructor(
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.notificationService
      .notification$
      .subscribe(notification => {
        this.onMessage(notification);
      });
  }

  onMessage(notification: Notificacion){
    if (notification) {
      this.notification = notification;
      this.showNotification = true;
    } else {
      this.showNotification = false;
    }
  }
}
