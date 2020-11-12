import {Routes} from '@angular/router';

import {MetricsComponent} from './metrics.component';

export const MetricsRoute: Routes = [
    {
        path: '',
        component: MetricsComponent,
        data: {
            title: 'Application Metrics',
            breadcrumb: 'APPLICATION METRICS',
        }
    }
];
