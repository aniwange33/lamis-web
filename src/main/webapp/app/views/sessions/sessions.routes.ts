import {Routes} from '@angular/router';
import {LoginComponent} from 'app/views/sessions/login/login.component';
import {NotFoundComponent} from 'app/views/sessions/not-found/not-found.component';

export const SessionsRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        data: {
            title: 'Login'
        }
    },
    {
        path: '404',
        component: NotFoundComponent,
        data: {
            title: 'Not found'
        }
    }
];
