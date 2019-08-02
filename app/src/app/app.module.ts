import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TemplateModule } from './template/template.module';
import { LoginModule } from './auth/login.module';
import { AuthGuard } from './auth/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth/token.interceptor';
import { ErrorInterceptor } from './auth/error.interceptor';
import { HandlerErrorModule } from './handler-error/handler-error.module';
import { NotificationService } from './handler-error/notification.service';
import { PrintService } from './print/print.service';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es-AR';
import localeEsExtra from '@angular/common/locales/extra/es-AR';
import { DemoMaterialModule } from './material.module';

//registerLocaleData(localeEs, 'es-AR', localeEsExtra);
registerLocaleData(localeEs, 'es-Ar');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    LoginModule,
    HandlerErrorModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'es-Ar' },
    AuthGuard,
    NotificationService,
    PrintService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
