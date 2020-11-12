import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonComponentModule} from 'app/adf/common-component.module';
import {RouterModule} from '@angular/router';
import {AuditsRoute} from './audits.route';
import {AuditsComponent} from './audits.component';
import {LamisSharedModule} from '@lamis/web-core';
import {NgJhipsterModule} from 'ng-jhipster';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
    imports: [
        LamisSharedModule,
        CommonComponentModule,
        RouterModule.forChild(AuditsRoute),
        NgJhipsterModule,
        FontAwesomeModule
    ],
    declarations: [
        AuditsComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuditModule {

}
