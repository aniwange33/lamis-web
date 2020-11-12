import {OnInit} from '@angular/core';
import {Biometric, Finger, Patient} from '../model/biometric.model';
import {BiometricService} from '../services/biometric.service';
import {NotificationService} from '@alfresco/adf-core';
import {ActivatedRoute} from '@angular/router';
import {AppLoaderService} from '@lamis/web-core';
import {TdDialogService} from '@covalent/core';

export declare class BiometricEditComponent implements OnInit {
    private biometricService;
    protected notification: NotificationService;
    private appLoaderService;
    private _dialogService;
    protected activatedRoute: ActivatedRoute;
    biometrics: Biometric[];
    patient: Patient;
    isSaving: boolean;
    error: boolean;
    finger: Finger;
    fingers: Finger[];
    readers: any[];
    reader: any;
    message: string;

    constructor(biometricService: BiometricService, notification: NotificationService, appLoaderService: AppLoaderService, _dialogService: TdDialogService, activatedRoute: ActivatedRoute);

    ngOnInit(): void;

    enroll(): void;

    fingerToString(finger: Finger): any;

    previousState(): void;

    save(): void;

    private subscribeToSaveResponse;
    private onSaveSuccess;
    private onSaveError;

    protected onError(errorMessage: string): void;
}
