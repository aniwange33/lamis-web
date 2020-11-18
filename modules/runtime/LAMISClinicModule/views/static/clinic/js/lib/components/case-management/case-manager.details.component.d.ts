import { CardViewItem, NotificationService } from '@alfresco/adf-core';
import { ActivatedRoute, Router } from '@angular/router';
import { TdDialogService } from '@covalent/core';
import { CaseManager } from '../../model/case-management.model';
import { CaseManagerService } from '../../services/case-manager.service';
export declare class CaseManagerDetailsComponent {
    private router;
    private route;
    private service;
    private _dialogService;
    private notificationService;
    properties: CardViewItem[];
    entity: CaseManager;
    constructor(router: Router, route: ActivatedRoute, service: CaseManagerService, _dialogService: TdDialogService, notificationService: NotificationService);
    ngOnInit(): void;
    edit(): void;
    delete(): void;
    buildProperties(): void;
    previousState(): void;
}
