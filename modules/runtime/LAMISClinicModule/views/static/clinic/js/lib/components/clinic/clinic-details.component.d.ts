import {ComponentFactoryResolver, OnDestroy, OnInit} from '@angular/core';
import {Clinic} from '../../model/clinic.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ClinicService} from '../../services/clinic.service';
import {TdDialogService} from '@covalent/core';
import {CardViewItem, NotificationService} from '@alfresco/adf-core';

export declare class ClinicDetailsComponent implements OnInit, OnDestroy {
    private router;
    private route;
    private clinicService;
    private cfr;
    private _dialogService;
    private notificationService;
    properties: CardViewItem[];
    entity: Clinic;

    constructor(router: Router, route: ActivatedRoute, clinicService: ClinicService, cfr: ComponentFactoryResolver, _dialogService: TdDialogService, notificationService: NotificationService);

    ngOnInit(): void;

    edit(): void;

    delete(): void;

    buildProperties(): void;

    previousState(): void;

    ngOnDestroy(): void;
}
