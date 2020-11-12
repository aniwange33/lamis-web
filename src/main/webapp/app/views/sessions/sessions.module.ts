import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SessionsRoutes} from './sessions.routes';
import {LoginComponent} from './login/login.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {AuthenticationService, CoreModule} from '@alfresco/adf-core';
import {MaterialModule} from '../../material.module';
import {LoginAuthenticationService} from '@lamis/web-core';

@NgModule({
    imports: [
        RouterModule.forChild(SessionsRoutes),
        MaterialModule,
        CommonModule,
        CoreModule.forChild()
    ],
    declarations: [
        LoginComponent,
        NotFoundComponent
    ],
    providers: [
        LoginAuthenticationService,
        {
            provide: AuthenticationService,
            useClass: LoginAuthenticationService
        }
    ]
})
export class SessionsModule {

}
