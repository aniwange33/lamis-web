import {Routes} from '@angular/router';

import {ConfigurationComponent} from './configuration.component';

export const ConfigurationRoute: Routes = [
    {
        path: '',
        component: ConfigurationComponent,
        data: {
            title: 'Configuration',
            breadcrumb: 'CONFIGURATION',
        }
    }
];
