import {Component, Inject, OnInit} from '@angular/core';

import {EntityAuditService} from './entity-audit.service';
import {EntityAuditEvent} from './entity-audit-event.model';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'jhi-entity-audit-modal',
    templateUrl: './entity-audit-modal.component.html',
    styles: [`
        /* NOTE: for now the /deep/ shadow-piercing descendant combinator is
         * required because Angular defaults to emulated view encapsulation and
         * preprocesses all component styles to approximate shadow scoping
         * rules. This means these styles wouldn't apply to the HTML generated
         * by ng-diff-match-patch.
         *
         * This shouldn't be required when browsers support native
         * encapsulation, at which point /deep/ will also be deprecated/removed
         * see https://angular.io/guide/component-styles
         */

        :host /deep/ ins {
            color: black;
            background: #bbffbb;
        }

        :host /deep/ del {
            color: black;
            background: #ffbbbb;
        }

        .code {
            background: #dcdada;
            padding: 10px;
        }
    `]
})
export class EntityAuditModalComponent implements OnInit {
    action: string;
    left: string;
    right: string;
    audit: EntityAuditEvent;

    constructor(
        private service: EntityAuditService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.audit = data.audit;
    }

    ngOnInit(): void {
        this.service.getPrevVersion(
            this.audit.entityType, this.audit.entityId, this.audit.commitVersion
        ).subscribe((data: any) => {
            const previousVersion = JSON.stringify(JSON.parse(data.entityValue), null, 2);
            const currentVersion = JSON.stringify(this.audit.entityValue, null, 2);

            this.action = this.audit.action;
            this.left = previousVersion;
            this.right = currentVersion;
        });
    }
}
