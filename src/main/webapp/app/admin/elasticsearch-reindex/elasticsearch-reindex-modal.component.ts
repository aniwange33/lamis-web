import {Component} from '@angular/core';

import {ElasticsearchReindexService} from './elasticsearch-reindex.service';
import {MatDialogRef} from '@angular/material';

@Component({
    selector: 'jhi-elasticsearch-reindex-modal',
    templateUrl: './elasticsearch-reindex-modal.component.html'
})
export class ElasticsearchReindexModalComponent {

    constructor(
        private elasticsearchReindexService: ElasticsearchReindexService,
        public dialogRef: MatDialogRef<ElasticsearchReindexModalComponent>
    ) {
    }

    reindex() {
        this.elasticsearchReindexService.reindex().subscribe(() => this.dialogRef.close());
    }
}
