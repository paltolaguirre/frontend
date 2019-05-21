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
                case 400:
                    // auto logout if 401 response returned from api
                    if (err.error) err.error.message = err.error.error;
                    break;
                case 401:
                    // auto logout if 401 response returned from api
                    this.authenticationService.logout();
                    location.reload(true);
                    break;
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}