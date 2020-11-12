import {OnInit} from '@angular/core';
import {
    Adhere,
    AdverseDrugReaction,
    Clinic,
    ClinicAdverseDrugReaction,
    OpportunisticInfection
} from '../../model/clinic.model';
import {ClinicService} from '../../services/clinic.service';
import {NotificationService} from '@alfresco/adf-core';
import {ActivatedRoute} from '@angular/router';
import * as moment_ from 'moment';
import {Moment} from 'moment';
import {AppLoaderService} from '@lamis/web-core';
import {ColumnMode} from '@swimlane/ngx-datatable';

export declare class ClinicEditComponent implements OnInit {
    private clinicService;
    protected notification: NotificationService;
    protected activatedRoute: ActivatedRoute;
    private appLoaderService;
    entity: Clinic;
    isSaving: boolean;
    error: boolean;
    commence: any;
    today: moment_.Moment;
    lmpMin: Moment;
    appointmentMax: Moment;
    appointmentMin: Moment;
    opportunisticInfections: OpportunisticInfection[];
    adverseDrugReactions: AdverseDrugReaction[];
    adheres: Adhere[];
    regimenLines: any[];
    regimens: any[];
    dateBirth: Moment;
    dateRegistration: Moment;
    visitDates: Moment[];
    selectedClinicAdr: ClinicAdverseDrugReaction[];
    oiList: OpportunisticInfection[];
    adhereList: Adhere[];
    ColumnMode: typeof ColumnMode;
    adr: boolean;

    constructor(clinicService: ClinicService, notification: NotificationService, activatedRoute: ActivatedRoute, appLoaderService: AppLoaderService);

    createEntity(): Clinic;

    ngOnInit(): void;

    updateValue(event: any, cell: any, row: ClinicAdverseDrugReaction): void;

    filterDates(date: Moment): boolean;

    dateChanged(date: Moment): void;

    entityCompare(e1: any, e2: any): boolean;

    previousState(): void;

    save(): void;

    regimenLineChange(type: any): void;

    private subscribeToSaveResponse;
    private onSaveSuccess;
    private onSaveError;

    protected onError(errorMessage: string): void;
}
