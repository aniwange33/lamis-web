import { OnInit } from '@angular/core';
import { EAC } from '../../model/clinic.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TdDialogService } from '@covalent/core';
import { CardViewItem, NotificationService } from '@alfresco/adf-core';
import { EacService } from '../../services/eac.service';
export declare class EacDetailsComponent implements OnInit {
    private router;
    private route;
    private _dialogService;
    private notificationService;
    private eacService;
    properties: CardViewItem[];
    entity: EAC;
    constructor(router: Router, route: ActivatedRoute, _dialogService: TdDialogService, notificationService: NotificationService, eacService: EacService);
    ngOnInit(): void;
    edit(): void;
    delete(): void;
    buildProperties(): void;
    previousState(): void;
}
