import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            switch (err.status) {
                case 401:
                    // auto logout if 401 response returned from api
                    this.authenticationService.logout();
                    location.reload(true);
                    break
                default:
                    if (err.error.error) err.error.message = err.error.error;
            }

            const error = err.error.message || err.statusText;
            return throwError(`${err.status}|${error}`);
        }))
    }
}