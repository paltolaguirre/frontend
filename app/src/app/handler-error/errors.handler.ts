
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';

//import * as StackTraceParser from 'error-stack-parser';

// import { ErrorsService } from '../errors-service/errors.service';

@Injectable()
export class ErrorsHandler implements ErrorHandler {

    constructor(
        private injector: Injector,
    ) { }

    handleError(error: Error | HttpErrorResponse) {
        const notificationService = this.injector.get(NotificationService);
        // const errorsService = this.injector.get(ErrorsService);
        const router = this.injector.get(Router);

        if (error instanceof HttpErrorResponse) {
            // Server error happened      
            if (!navigator.onLine) {
                // No Internet connection
                // return notificationService.notify('No Internet Connection');
                console.log("No Internet connection");
            }
            // Http Error
            // Send the error to the server
            /*errorsService.log(error).subscribe();
            // Show notification to the user
            return notificationService.notify(`${error.status} - ${error.message}`);*/
        } else {
            // Client Error Happend
            // Send the error to the server and then
            // redirect the user to the page with all the info
            /*errorsService
                .log(error)
                .subscribe(errorWithContextInfo => {
                    router.navigate(['/error'], { queryParams: errorWithContextInfo });
                });*/

            //console.error("Se produjo un Error:");
            console.error(error);
            return notificationService.notify(`Error - ${error.message}`);
        }
    }
}
