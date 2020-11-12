import {Routes} from '@angular/router';
import {ElasticsearchReindexComponent} from './elasticsearch-reindex.component';

export const ElasticsearchReindexRoute: Routes = [
    {
        path: '',
        component: ElasticsearchReindexComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            title: 'Reindex Elasticsearch',
            breadcrumb: 'REINDEX ELASTICSEARCH'
        },
    }
];
