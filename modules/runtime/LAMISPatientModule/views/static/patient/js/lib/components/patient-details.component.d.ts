import {ComponentFactoryResolver, OnDestroy, OnInit, Renderer2, ViewContainerRef} from '@angular/core';
import {Patient} from '../model/patient.model';
import {ActivatedRoute, Router} from '@angular/router';
import {PatientObservation, PatientService} from '../services/patient.service';
import {TdDialogService} from '@covalent/core';
import {CardViewItem, NotificationService} from '@alfresco/adf-core';
import {Moment} from 'moment';

export declare class PatientDetailsComponent implements OnInit, OnDestroy {
    private router;
    private route;
    private patientService;
    private cfr;
    private _dialogService;
    private notificationService;
    private _viewContainerRef;
    private renderer2;
    template: string;
    entity: Patient;
    observations: PatientObservation[];
    container: ViewContainerRef;
    properties: CardViewItem[];
    status: string;

    constructor(router: Router, route: ActivatedRoute, patientService: PatientService, cfr: ComponentFactoryResolver, _dialogService: TdDialogService, notificationService: NotificationService, _viewContainerRef: ViewContainerRef, renderer2: Renderer2);

    ngOnInit(): void;

    edit(): void;

    updateStatus(): void;

    delete(): void;

    previousState(): void;

    private getComponentFactory;

    getObservations(): void;

    addObservation(action: PatientObservation): void;

    private attacheWidgets;

    ngOnDestroy(): void;

    private buildWidget;

    age(dob: Moment): string;
}
