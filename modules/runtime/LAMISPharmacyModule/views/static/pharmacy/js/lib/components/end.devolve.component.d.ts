import {OnInit} from '@angular/core';
import {PharmacyService} from '../services/pharmacy.service';
import {DevolveService} from '../services/devolve.service';
import {NotificationService} from '@alfresco/adf-core';
import {AppLoaderService} from '@lamis/web-core';
import {ActivatedRoute} from '@angular/router';
import {Devolve} from '../model/pharmacy.model';
import {Moment} from 'moment';

export declare class EndDevolveComponent implements OnInit {
    private pharmacyService;
    private devolveService;
    protected notification: NotificationService;
    private appLoaderService;
    protected activatedRoute: ActivatedRoute;
    entity: Devolve;
    dmocType: string;
    isSaving: boolean;
    minDate: Moment;
    minDiscontinued: Moment;
    today: Moment;

    constructor(pharmacyService: PharmacyService, devolveService: DevolveService, notification: NotificationService, appLoaderService: AppLoaderService, activatedRoute: ActivatedRoute);

    ngOnInit(): void;

    dateDiscontinuedChanged(): void;

    previousState(): void;

    save(): void;

    private subscribeToSaveResponse;
    private onSaveSuccess;
    private onSaveError;

    protected onError(errorMessage: string): void;
}
