import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
//import { DiffMatchPatchModule } from 'ng-diff-match-patch';

import {EntityAuditComponent} from './entity-audit.component';
import {EntityAuditModalComponent} from './entity-audit-modal.component';
import {EntityAuditService} from './entity-audit.service';
import {CommonComponentModule} from 'app/adf/common-component.module';
import {RouterModule} from '@angular/router';
import {EntityAuditRoutes} from 'app/admin/entity-audit/entity-audit-routes';
import {LamisSharedModule} from '@lamis/web-core';
import {NgJhipsterModule} from 'ng-jhipster';

@NgModule({
    imports: [
        CommonModule,
        CommonComponentModule,
        LamisSharedModule,
        //DiffMatchPatchModule,
        RouterModule.forChild(EntityAuditRoutes),
        NgJhipsterModule
    ],
    declarations: [
        EntityAuditComponent,
        EntityAuditModalComponent
    ],
    entryComponents: [
        EntityAuditModalComponent
    ],
    providers: [
        EntityAuditService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EntityAuditModule {
}
