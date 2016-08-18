import {provideRouter, RouterConfig} from '@angular/router';
import {HomeComponent} from "./home";
import {LoginComponent} from './auth/login';
import {RegisterComponent} from './auth/register';
import {AuthGuard} from './auth';
import {DashboardComponent} from './dashboard';

const routes:RouterConfig = [
    {path: '', component: HomeComponent},
    {path: 'auth/login', component: LoginComponent},
    {path: 'auth/register', component: RegisterComponent},
    {path: 'dashboard', component: DashboardComponent, canActivate: ['AuthGuard', AuthGuard]}
];

export const appRouterProviders = [
    provideRouter(routes)
];