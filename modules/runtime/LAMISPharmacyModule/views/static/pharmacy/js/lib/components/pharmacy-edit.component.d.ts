import {OnInit} from '@angular/core';
import {Adr, Devolve, Drug, Patient, Pharmacy, PharmacyLine, Regimen, RegimenType} from '../model/pharmacy.model';
import {PharmacyService} from '../services/pharmacy.service';
import {NotificationService} from '@alfresco/adf-core';
import {ActivatedRoute} from '@angular/router';
import {MatButton, MatProgressBar} from '@angular/material';
import {ColumnMode} from '@swimlane/ngx-datatable';
import * as moment_ from 'moment';
import {Moment} from 'moment';
import {AppLoaderService} from '@lamis/web-core';

export declare class PharmacyEditComponent implements OnInit {
    private pharmacyService;
    protected notification: NotificationService;
    private appLoaderService;
    protected activatedRoute: ActivatedRoute;
    progressBar: MatProgressBar;
    submitButton: MatButton;
    entity: Pharmacy;
    patient: Patient;
    dateRegistration: Moment;
    maxNextVisit: Moment;
    regimenTypes: RegimenType[];
    regimens: Regimen[];
    selectedRegimens: Regimen[];
    adrs: Adr[];
    isSaving: boolean;
    error: boolean;
    tomorrow: moment_.Moment;
    today: moment_.Moment;
    minNextAppointment: Moment;
    ColumnMode: typeof ColumnMode;
    editing: {};
    rows: PharmacyLine[];
    drugIds: Set<any>;
    visitDates: Moment[];
    devolve: Devolve;
    dmocType: string;
    drugs: Drug[];

    constructor(pharmacyService: PharmacyService, notification: NotificationService, appLoaderService: AppLoaderService, activatedRoute: ActivatedRoute);

    createEntity(): Pharmacy;

    ngOnInit(): void;

    dateVisitChanged(date: Moment): void;

    suggestedNextAppointment(): Moment;

    updateDmocType(): void;

    filterDates(date: Moment): boolean;

    previousState(): void;

    entityCompare(e1: any, e2: any): boolean;

    save(): void;

    regimenTypeChange(type: any): void;

    durationChanged(duration: any): void;

    regimenChange(event: any): void;

    updateValue(event: any, cell: any, rowIndex: any): void;

    private subscribeToSaveResponse;
    private onSaveSuccess;
    private onSaveError;

    protected onError(errorMessage: string): void;
}
