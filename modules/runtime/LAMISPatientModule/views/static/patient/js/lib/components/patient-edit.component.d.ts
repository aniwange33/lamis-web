import {OnInit} from '@angular/core';
import {Patient} from '../model/patient.model';
import {PatientService} from '../services/patient.service';
import {NotificationService} from '@alfresco/adf-core';
import {ActivatedRoute} from '@angular/router';
import * as moment_ from 'moment';
import {DurationInputArg2, Moment} from 'moment';
import {AppLoaderService} from '@lamis/web-core';
import {FormBuilder} from '@angular/forms';

export declare class PatientEditComponent implements OnInit {
    private patientService;
    protected notification: NotificationService;
    private loaderService;
    protected activatedRoute: ActivatedRoute;
    private formBuilder;
    template: string;
    entity: Patient;
    patient: Patient;
    isSaving: boolean;
    error: boolean;
    today: moment_.Moment;
    minDob: moment_.Moment;
    minDateRegistration: Moment;
    maxDateBirth: Moment;
    maxDateConfirmed: moment_.Moment;
    minDateConfirmed: moment_.Moment;
    age: number;
    ageUnit: DurationInputArg2;
    state: any;
    states: any[];
    lgas: any[];

    constructor(patientService: PatientService, notification: NotificationService, loaderService: AppLoaderService, activatedRoute: ActivatedRoute, formBuilder: FormBuilder);

    createEntity(): Patient;

    ngOnInit(): void;

    entityCompare(e1: any, e2: any): boolean;

    estimateDob(): void;

    stateChange(id: any): void;

    previousState(): void;

    dateBirthChanged(date: Moment): void;

    dateRegistrationChanged(date: Moment): void;

    save(): void;

    private subscribeToSaveResponse;
    private onSaveSuccess;
    private onSaveError;

    protected onError(errorMessage: string): void;
}
