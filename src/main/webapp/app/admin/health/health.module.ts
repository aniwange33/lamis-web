import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonComponentModule} from '../../adf/common-component.module';
import {HealthRoutes} from './healthRoutes';
import {HealthCheckComponent} from 'app/admin/health/health.component';
import {HealthModalComponent} from 'app/admin/health/health-modal.component';
import {LamisSharedModule} from '@lamis/web-core';
import {NgJhipsterModule} from 'ng-jhipster';

@NgModule({
    imports: [
        LamisSharedModule,
        CommonComponentModule,
        RouterModule.forChild(HealthRoutes),
        NgJhipsterModule
    ],
    declarations: [
        HealthCheckComponent,
        HealthModalComponent
    ],
    entryComponents: [
        HealthModalComponent
    ]
})
export class HealthModule {

}
