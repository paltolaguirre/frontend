import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

// http://jasonwatmore.com/post/2018/10/29/angular-7-user-registration-and-login-example-tutorial#app-module-ts

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private authenticationService: AuthService,
        private router: Router
        ) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const tokenByURL = route.queryParams['token'];
        const showMenu = (route.queryParams['showmenu'] == 'true');
        const showToolbar = (route.queryParams['showtoolbar'] == 'true');
        console.log("Token: " + tokenByURL);
        if (tokenByURL) {
            this.authenticationService.save_currentUser({ token: tokenByURL, showmenu: Boolean(showMenu), showtoolbar: Boolean(showToolbar) } );
        }
        const tokenOk = await this.authenticationService.check_token();
        if (!tokenOk) {
            // not logged in so redirect to login page with the return url
            this.router.navigate(['auth/login'], { queryParams: { returnUrl: state.url } });
        }

        return tokenOk;
    }
}