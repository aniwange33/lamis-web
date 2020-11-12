import {Component} from '@angular/core';

import {ElasticsearchReindexModalComponent} from './elasticsearch-reindex-modal.component';
import {MatDialog} from '@angular/material';

@Component({
    selector: 'jhi-elasticsearch-reindex',
    templateUrl: './elasticsearch-reindex.component.html'
})
export class ElasticsearchReindexComponent {

    constructor(
        private dialog: MatDialog,
    ) {
    }

    showConfirm() {
        this.dialog.open(ElasticsearchReindexModalComponent);
    }
}
