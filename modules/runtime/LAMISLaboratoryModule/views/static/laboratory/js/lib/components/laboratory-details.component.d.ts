import { ComponentFactoryResolver, OnDestroy, OnInit } from '@angular/core';
import { Laboratory, LaboratoryLine } from '../model/laboratory.model';
import { ActivatedRoute, Router } from '@angular/router';
import { LaboratoryService } from '../services/laboratory.service';
import { TdDialogService } from '@covalent/core';
import { CardViewItem, CardViewUpdateService, NotificationService } from '@alfresco/adf-core';
import { ColumnMode } from '@swimlane/ngx-datatable';
export declare class LaboratoryDetailsComponent implements OnInit, OnDestroy {
    private router;
    private route;
    private laboratoryService;
    private cfr;
    private _dialogService;
    private notificationService;
    private updateService;
    properties: CardViewItem[];
    entity: Laboratory;
    ColumnMode: typeof ColumnMode;
    dataSource: LaboratoryLine[];
    constructor(router: Router, route: ActivatedRoute, laboratoryService: LaboratoryService, cfr: ComponentFactoryResolver, _dialogService: TdDialogService, notificationService: NotificationService, updateService: CardViewUpdateService);
    ngOnInit(): void;
    edit(): void;
    delete(): void;
    buildProperties(): void;
    previousState(): void;
    ngOnDestroy(): void;
}
