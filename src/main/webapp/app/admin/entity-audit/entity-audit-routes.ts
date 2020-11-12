import {Routes} from '@angular/router';

import {EntityAuditComponent} from './entity-audit.component';

export const EntityAuditRoutes: Routes = [
    {
        path: '',
        component: EntityAuditComponent,
        data: {
            title: 'Entity Audit',
            breadcrumb: 'ENTITY AUDIT'
        }
    }
];
