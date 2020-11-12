import {OnInit} from '@angular/core';
import {ChronicCare, ChronicCareDm, ChronicCareTB, Patient} from '../../model/clinic.model';
import {ClinicService} from '../../services/clinic.service';
import {NotificationService} from '@alfresco/adf-core';
import {ActivatedRoute} from '@angular/router';
import {ChronicCareService} from '../../services/chronic.care.service';
import * as moment_ from 'moment';
import {Moment} from 'moment';
import {AppLoaderService} from '@lamis/web-core';

export declare class ChronicCareEditComponent implements OnInit {
    private clinicService;
    private chronicCareService;
    protected notification: NotificationService;
    protected activatedRoute: ActivatedRoute;
    private appLoaderService;
    entity: ChronicCare;
    patient: Patient;
    today: moment_.Moment;
    tbs: ChronicCareTB[];
    dms: ChronicCareDm[];
    visitDates: Moment[];
    isSaving: boolean;
    bmi: string;
    bmiCalculated: string;

    constructor(clinicService: ClinicService, chronicCareService: ChronicCareService, notification: NotificationService, activatedRoute: ActivatedRoute, appLoaderService: AppLoaderService);

    createEntity(): ChronicCare;

    ngOnInit(): void;

    filterDates(date: Moment): boolean;

    previousState(): void;

    calculateBmi(): void;

    save(): void;

    private subscribeToSaveResponse;
    private onSaveSuccess;
    private onSaveError;

    protected onError(errorMessage: string): void;
}
