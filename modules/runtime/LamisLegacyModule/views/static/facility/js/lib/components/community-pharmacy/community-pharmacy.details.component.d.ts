import { OnInit } from '@angular/core';
import { CardViewItem, NotificationService } from '@alfresco/adf-core';
import { ActivatedRoute, Router } from '@angular/router';
import { TdDialogService } from '@covalent/core';
import { CommunityPharmacy } from '../../model/community-pharmacy.model';
import { CommunityPharmacyService } from '../../services/community-pharmacy.service';
export declare class CommunityPharmacyDetailsComponent implements OnInit {
    private router;
    private route;
    private service;
    private _dialogService;
    private notificationService;
    properties: CardViewItem[];
    entity: CommunityPharmacy;
    constructor(router: Router, route: ActivatedRoute, service: CommunityPharmacyService, _dialogService: TdDialogService, notificationService: NotificationService);
    ngOnInit(): void;
    edit(): void;
    delete(): void;
    buildProperties(): void;
    previousState(): void;
}
