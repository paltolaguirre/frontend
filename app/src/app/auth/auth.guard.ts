import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { variable } from '@angular/compiler/src/output/output_ast';

// http://jasonwatmore.com/post/2018/10/29/angular-7-user-registration-and-login-example-tutorial#app-module-ts

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private authenticationService: AuthService,
        private router: Router
        ) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const tokenByURL = route.queryParams['token'];
        var showToolBar = false;
        var showMenu = false;
        
        if (route.queryParams['showToolBar']==null) {
            showToolBar = true;
        } else {
            showToolBar = (route.queryParams['showToolBar'] == 'true');
        }
        if (route.queryParams['showMenu']==null) {
            showMenu = true;
        } else {
            showMenu = (route.queryParams['showMenu'] == 'true');
        }
        this.authenticationService.save_currentEnviroment({showMenu : Boolean(showMenu) , showToolBar : Boolean(showToolBar)});
        
        if (tokenByURL) {
            this.authenticationService.save_currentUser({ token: tokenByURL} );
        }
        const tokenOk = await this.authenticationService.check_token();
        if (!tokenOk) {
            // not logged in so redirect to login page with the return url
            this.router.navigate(['auth/login'], { queryParams: { returnUrl: state.url } });
        }

        return tokenOk;
    }
}