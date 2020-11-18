import { OnDestroy, OnInit } from '@angular/core';
import { Pharmacy, PharmacyLine } from '../model/pharmacy.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PharmacyService } from '../services/pharmacy.service';
import { TdDialogService } from '@covalent/core';
import { CardViewItem, NotificationService } from '@alfresco/adf-core';
import { ColumnMode } from '@swimlane/ngx-datatable';
export declare class PharmacyDetailsComponent implements OnInit, OnDestroy {
    private router;
    private route;
    private pharmacyService;
    private _dialogService;
    private notificationService;
    properties: CardViewItem[];
    entity: Pharmacy;
    ColumnMode: typeof ColumnMode;
    dataSource: PharmacyLine[];
    constructor(router: Router, route: ActivatedRoute, pharmacyService: PharmacyService, _dialogService: TdDialogService, notificationService: NotificationService);
    ngOnInit(): void;
    edit(): void;
    delete(): void;
    buildProperties(): void;
    previousState(): void;
    ngOnDestroy(): void;
}
