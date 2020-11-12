import {OnInit} from '@angular/core';
import {PatientService, PatientTimeline} from '../services/patient.service';
import {Router} from '@angular/router';
import {TdDialogService} from '@covalent/core';
import {NotificationService} from '@alfresco/adf-core';
import {ObservationService} from '../services/observation.service';

export declare class TimelineComponent implements OnInit {
    private patientService;
    private router;
    private observationService;
    private _dialogService;
    private notificationService;
    patientId: number;
    patientUuid: string;
    detailed: boolean;
    timeLine: PatientTimeline[];

    constructor(patientService: PatientService, router: Router, observationService: ObservationService, _dialogService: TdDialogService, notificationService: NotificationService);

    ngOnInit(): void;

    view(path: string, id: string): void;

    edit(path: string, id: string): void;

    delete(path: string, id: string): void;

    loadActivities(): void;
}
