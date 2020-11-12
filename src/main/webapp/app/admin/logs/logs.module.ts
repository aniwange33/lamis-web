import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonComponentModule} from 'app/adf/common-component.module';
import {LogsRoutes} from 'app/admin/logs/logsRoutes';
import {LogsComponent} from 'app/admin/logs/logs.component';
import {LamisSharedModule} from '@lamis/web-core';
import {NgJhipsterModule} from 'ng-jhipster';

@NgModule({
    imports: [
        LamisSharedModule,
        CommonComponentModule,
        RouterModule.forChild(LogsRoutes),
        NgJhipsterModule
    ],
    declarations: [
        LogsComponent
    ]
})
export class LogsModule {

}
