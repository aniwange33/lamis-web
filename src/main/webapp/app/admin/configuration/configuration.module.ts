import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {LamisSharedModule} from '@lamis/web-core';
import {ConfigurationRoute} from './configuration.route';
import {ConfigurationComponent} from './configuration.component';
import {CommonComponentModule} from '../../adf/common-component.module';
import {NgJhipsterModule} from 'ng-jhipster';

@NgModule({
    imports: [
        LamisSharedModule,
        CommonComponentModule,
        RouterModule.forChild(ConfigurationRoute),
        NgJhipsterModule
    ],
    declarations: [
        ConfigurationComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConfigurationModule {

}
