import {Routes} from '@angular/router';

import {HealthCheckComponent} from './health.component';

export const HealthRoutes: Routes = [
    {
        path: '',
        component: HealthCheckComponent,
        data: {
            title: 'Health Checks',
            breadcrumb: 'HEALTH CHECKS',
        }
    }
];
