import {Routes} from '@angular/router';
import {JhiResolvePagingParams} from 'ng-jhipster';

import {AuditsComponent} from './audits.component';

export const AuditsRoute: Routes = [
    {
        path: '',
        component: AuditsComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            title: 'Audits',
            breadcrumb: 'AUDITS',
            defaultSort: 'auditEventDate,desc'
        }
    }
];
