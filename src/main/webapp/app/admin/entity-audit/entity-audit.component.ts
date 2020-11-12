import {Component, OnInit} from '@angular/core';

import {EntityAuditService} from './entity-audit.service';
import {EntityAuditEvent} from './entity-audit-event.model';
import {EntityAuditModalComponent} from './entity-audit-modal.component';
import {MatDialog} from '@angular/material';
import {NotificationService} from '@alfresco/adf-core';

@Component({
    selector: 'jhi-entity-audit',
    templateUrl: './entity-audit.component.html',
    styles: [`
      .code {
        background: #dcdada;
        padding: 10px;
      }
    `]
})
export class EntityAuditComponent implements OnInit {
    audits: EntityAuditEvent[];
    entities: string[] = [];
    selectedEntity: string;
    limits = [25, 50, 100, 200];
    selectedLimit = this.limits[0];
    loading = false;
    filterEntityId = '';
    orderProp: string;
    reverse = false;

    constructor(
        private dialog: MatDialog,
        private service: EntityAuditService,
        private alertService: NotificationService
    ) {
    }

    ngOnInit() {
        this.service.getAllAudited().subscribe((entities) => {
            this.entities = entities;
        });
    }

    loadChanges() {
        this.loading = true;
        this.service.findByEntity(this.selectedEntity, this.selectedLimit)
            .subscribe((audits) => {
                this.audits = audits.map((it) => {
                    it.entityValue = JSON.parse(it.entityValue);
                    return it
                });
                this.loading = false;
            }, (err) => this.loading = false);
    }

    trackId(index: number, item: EntityAuditEvent) {
        return item.id;
    }

    openChange(audit: EntityAuditEvent) {
        if (audit.commitVersion < 2) {
            this.alertService.openSnackMessage(
                'There is no previous version available for this entry.\n' +
                'This is the first audit entry captured for this object.'
            );

        } else {
            this.dialog.open(EntityAuditModalComponent, {
                data: {audit: audit}
            });
        }
    }
}
