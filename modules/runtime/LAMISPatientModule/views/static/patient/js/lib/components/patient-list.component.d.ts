import {OnDestroy, OnInit} from '@angular/core';
import {PatientService} from '../services/patient.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '@alfresco/adf-core';
import {Patient} from '../model/patient.model';
import {Facility} from '../model/facility.model';

export declare class PatientListComponent implements OnInit, OnDestroy {
    private patientService;
    protected notification: NotificationService;
    protected router: Router;
    protected activatedRoute: ActivatedRoute;
    path: string;
    page: number;
    patients: Patient[];
    loading: boolean;
    itemsPerPage: number;
    currentSearch: string;
    totalItems: number;
    display: string;
    facility: Facility;

    constructor(patientService: PatientService, notification: NotificationService, router: Router, activatedRoute: ActivatedRoute);

    ngOnDestroy(): void;

    ngOnInit(): void;

    searchPatient(search: any): void;

    select(data: any): any;

    onPageChange(pageInfo: any): void;

    loadPage(page: number): void;

    loadAll(): void;

    protected onSuccess(data: any, headers: any): void;

    private onError;
}
