import {OnInit} from '@angular/core';
import {CaseManager} from '../../model/case-management.model';
import {NotificationService} from '@alfresco/adf-core';
import {ActivatedRoute} from '@angular/router';
import {AppLoaderService} from '@lamis/web-core';
import {CaseManagementService} from '../../services/case-management.service';
import {CaseManagerService} from '../../services/case-manager.service';

export declare class CaseManagerEditComponent implements OnInit {
    private caseManagementService;
    private caseManagerService;
    protected notification: NotificationService;
    protected activatedRoute: ActivatedRoute;
    private appLoaderService;
    entity: CaseManager;
    isSaving: boolean;

    constructor(caseManagementService: CaseManagementService, caseManagerService: CaseManagerService, notification: NotificationService, activatedRoute: ActivatedRoute, appLoaderService: AppLoaderService);

    createEntity(): CaseManager;

    ngOnInit(): void;

    save(): void;

    previousState(): void;

    private subscribeToSaveResponse;
    private onSaveSuccess;
    private onSaveError;

    protected onError(errorMessage: string): void;
}
