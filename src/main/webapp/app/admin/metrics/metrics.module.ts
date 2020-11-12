import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonComponentModule} from '../../adf/common-component.module';
import {MetricsRoute} from './metrics.route';
import {MetricsComponent} from './metrics.component';
import {MetricsMonitoringModalComponent} from './metrics-modal.component';
import {LamisSharedModule} from '@lamis/web-core';
import {NgbProgressbarModule} from '@ng-bootstrap/ng-bootstrap';
import {NgJhipsterModule} from 'ng-jhipster';

@NgModule({
    imports: [
        LamisSharedModule,
        CommonComponentModule,
        RouterModule.forChild(MetricsRoute),
        NgbProgressbarModule,
        NgJhipsterModule
    ],
    declarations: [
        MetricsComponent,
        MetricsMonitoringModalComponent
    ],
    entryComponents: [
        MetricsMonitoringModalComponent
    ]
})
export class MetricsModule {

}
