import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, pipe } from 'rxjs';
import { publish, refCount } from 'rxjs/operators';

type OptionsNotificationType = "done" | "info" | "warning" | "error";

export interface Notificacion {
    mensaje: string;
    tipo?: OptionsNotificationType;
    codigo?: number;
}

@Injectable()
export class NotificationService {

    private _notification: BehaviorSubject<Notificacion> = new BehaviorSubject(null);
    readonly notification$: Observable<Notificacion> = this._notification.asObservable()
        .pipe(
            publish(),
            refCount()
        );

    constructor() { }

    notify(notification) {
        const familiaTipo = Math.trunc(notification.codigo / 100);
        switch (familiaTipo) {
            case 2:
                notification.tipo = "done";
                notification.mensaje = "Acción realizada correctamente";
                break;
            case 4:
                notification.tipo = "warning";
                break;
            case 5:
                notification.tipo = "error";
                break;
            default:
                notification.tipo = "info";
                break;
        }
        this._notification.next(notification);
        setTimeout(() => this._notification.next(null), 10 * 1000);
    }

}