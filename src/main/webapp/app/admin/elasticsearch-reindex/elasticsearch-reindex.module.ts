import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ElasticsearchReindexComponent} from './elasticsearch-reindex.component';
import {ElasticsearchReindexModalComponent} from './elasticsearch-reindex-modal.component';
import {ElasticsearchReindexService} from './elasticsearch-reindex.service';
import {ElasticsearchReindexRoute} from './elasticsearch-reindex.route';
import {CommonComponentModule} from '../../adf/common-component.module';
import {LamisSharedModule} from '@lamis/web-core';

@NgModule({
    imports: [
        LamisSharedModule,
        CommonComponentModule,
        RouterModule.forChild(ElasticsearchReindexRoute)
    ],
    declarations: [
        ElasticsearchReindexComponent,
        ElasticsearchReindexModalComponent
    ],
    entryComponents: [
        ElasticsearchReindexModalComponent
    ],
    providers: [
        ElasticsearchReindexService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ElasticsearchReindexModule {
}
