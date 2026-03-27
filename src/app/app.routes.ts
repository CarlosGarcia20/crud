import { Routes } from '@angular/router';
import { Login } from './business/auth/login/login';
import { Users } from './business/users/users';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch:'full' },
    { path: 'login', component: Login },
    { path: 'users', component: Users },

    { path: '**', redirectTo: '/login'}
];
