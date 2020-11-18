import { OnInit } from '@angular/core';
import { ClinicService } from '../../services/clinic.service';
import { CardViewItem, NotificationService } from '@alfresco/adf-core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChronicCare } from '../../model/clinic.model';
import { TdDialogService } from '@covalent/core';
import { ChronicCareService } from '../../services/chronic.care.service';
export declare class ChronicCareDetailComponent implements OnInit {
    private router;
    private route;
    private chronicCareService;
    private _dialogService;
    private notificationService;
    private clinicService;
    properties: CardViewItem[];
    entity: ChronicCare;
    constructor(router: Router, route: ActivatedRoute, chronicCareService: ChronicCareService, _dialogService: TdDialogService, notificationService: NotificationService, clinicService: ClinicService);
    ngOnInit(): void;
    edit(): void;
    delete(): void;
    buildProperties(): void;
    previousState(): void;
}
