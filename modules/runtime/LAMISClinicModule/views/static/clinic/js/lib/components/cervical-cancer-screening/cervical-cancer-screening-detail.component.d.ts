import { OnInit } from '@angular/core';
import { CardViewItem, NotificationService } from '@alfresco/adf-core';
import { CervicalCancerScreening, Observation, Patient } from '../../model/clinic.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TdDialogService } from '@covalent/core';
import { CervicalCancerScreeningService } from '../../services/cervical-cancer-screening.service';
import { ClinicService } from '../../services/clinic.service';
export declare class CervicalCancerScreeningDetailComponent implements OnInit {
    private router;
    private route;
    private screeningService;
    private _dialogService;
    private clinicService;
    private notificationService;
    properties: CardViewItem[];
    entity: CervicalCancerScreening;
    observation: Observation;
    patient: Patient;
    constructor(router: Router, route: ActivatedRoute, screeningService: CervicalCancerScreeningService, _dialogService: TdDialogService, clinicService: ClinicService, notificationService: NotificationService);
    ngOnInit(): void;
    edit(): void;
    delete(): void;
    buildProperties(): void;
    previousState(): void;
}
