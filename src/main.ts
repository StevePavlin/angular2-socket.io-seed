import {bootstrap} from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import {HTTP_PROVIDERS} from "@angular/http";
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AppComponent, environment, appRouterProviders} from './app';

import {SocketService, UserService} from "./app/shared";
import {AuthService, AuthGuard} from './app/auth';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  appRouterProviders,
  HTTP_PROVIDERS,

  // Custom
  UserService,
  SocketService,
  AuthService,
  AuthGuard,
  {
    provide: 'AuthGuard',
    useValue: (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => true
  },

]);