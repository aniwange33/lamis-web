import { OnInit } from '@angular/core';
import { CervicalCancerScreening, Observation, Patient } from '../../model/clinic.model';
import * as moment_ from 'moment';
import { ClinicService } from '../../services/clinic.service';
import { NotificationService } from '@alfresco/adf-core';
import { ActivatedRoute } from '@angular/router';
import { AppLoaderService } from '@lamis/web-core';
import { CervicalCancerScreeningService } from '../../services/cervical-cancer-screening.service';
export declare class CervicalCancerScreeningComponent implements OnInit {
    private clinicService;
    private screeningService;
    protected notification: NotificationService;
    protected activatedRoute: ActivatedRoute;
    private appLoaderService;
    entity: CervicalCancerScreening;
    patient: Patient;
    observation: Observation;
    today: moment_.Moment;
    isSaving: boolean;
    constructor(clinicService: ClinicService, screeningService: CervicalCancerScreeningService, notification: NotificationService, activatedRoute: ActivatedRoute, appLoaderService: AppLoaderService);
    ngOnInit(): void;
    previousState(): void;
    save(): void;
    private subscribeToSaveResponse;
    private onSaveSuccess;
    private onSaveError;
    protected onError(errorMessage: string): void;
}
