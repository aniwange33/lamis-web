import { OnInit } from '@angular/core';
import { CaseManager } from '../../model/case-management.model';
import { CaseManagerService } from '../../services/case-manager.service';
import { NotificationService } from '@alfresco/adf-core';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseManagementService } from '../../services/case-management.service';
import { Facility } from '../../model/facility.model';
export declare class CaseManagerListComponent implements OnInit {
    private caseManagerService;
    private caseManagementService;
    protected notification: NotificationService;
    protected router: Router;
    protected activatedRoute: ActivatedRoute;
    page: number;
    caseManagers: CaseManager[];
    loading: boolean;
    itemsPerPage: number;
    currentSearch: string;
    totalItems: number;
    display: string;
    facility: Facility;
    constructor(caseManagerService: CaseManagerService, caseManagementService: CaseManagementService, notification: NotificationService, router: Router, activatedRoute: ActivatedRoute);
    ngOnInit(): void;
    select(data: any): any;
    onPageChange(pageInfo: any): void;
    loadPage(page: number): void;
    loadAll(): void;
    protected onSuccess(data: any, headers: any): void;
    private onError;
}
