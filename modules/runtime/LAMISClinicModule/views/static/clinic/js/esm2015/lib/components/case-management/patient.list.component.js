import * as tslib_1 from "tslib";
import {Component} from '@angular/core';
import {CaseManagementService} from '../../services/case-management.service';
import {CardViewIntItemModel, CardViewItem, NotificationService} from '@alfresco/adf-core';
import {TdDialogService} from '@covalent/core';
import {RxStompService} from '@stomp/ng2-stompjs';

let PatientListComponent = class PatientListComponent {
    constructor(service, _dialogService, notificationService, stompService) {
        this.service = service;
        this._dialogService = _dialogService;
        this.notificationService = notificationService;
        this.stompService = stompService;
        this.caseManagers = [];
        this.patients = [];
        this.properties = [];
        this.globalProperties = [];
        this.stats = {};
        this.globalStats = {};
        this.filter = {};
        this.hospitalNum = '';
        this.totalItems = 0;
        this.page = 0;
        this.itemsPerPage = 20;
        this.loading = true;
        this.initializing = true;
    }

    ngOnInit() {
        /*this.topicSubscription = this.stompService.watch('/topic/case-management').subscribe((msg: Message) => {
            console.log('Simp Message', msg);
            if(msg.body === 'finished'){
                this.initializing = false;
            }
        });*/
        this.service.getActiveFacility().subscribe((f) => {
            if (f) {
                this.facilityId = f.id;
                this.service.initClients(f.id).subscribe((r) => {
                    this.initializing = false;
                    this.service.getCaseManagers(f.id).subscribe(res => {
                        this.caseManagers = res;
                        this.updateList();
                    });
                });
                this.service.getCaseManagerStats(0, f.id).subscribe(res => {
                    this.stats = res;
                    this.buildStats();
                });
            }
        });
        this.service.getStates().subscribe(res => this.states = res);
    }

    ngOnDestroy() {
        //this.topicSubscription.unsubscribe();
    }

    clearHospitalNum() {
        this.hospitalNum = null;
        this.filter['hospitalNum'] = null;
        this.page = 0;
    }

    search() {
        this.page = 0;
        this.updateList();
    }

    assignClients() {
        this._dialogService.openConfirm({
            title: 'Confirm',
            message: 'Do you want to assign selected clients to the selected Case Manager?',
            cancelButton: 'No',
            acceptButton: 'Yes',
            width: '500px',
        }).afterClosed().subscribe((accept) => {
            if (accept) {
                const patientIds = this.patients.filter(p => p.selected)
                    .map(p => p.id);
                this.service.assignToCaseManager(this.caseManager.id, patientIds).subscribe((res) => {
                    if (res.ok) {
                        this.updateList();
                        this.service.getCaseManagerStats(this.caseManager.id, this.facilityId).subscribe(res => {
                            this.stats = res;
                            this.buildStats();
                        });
                    } else {
                        this.notificationService.showError('Error assigning clients, please try again');
                    }
                });
            } else {
                // DO SOMETHING ELSE
            }
        });
    }

    deAssignClients() {
        this._dialogService.openConfirm({
            title: 'Confirm',
            message: 'Do you want to de-assign selected clients?',
            cancelButton: 'No',
            acceptButton: 'Yes',
            width: '500px',
        }).afterClosed().subscribe((accept) => {
            if (accept) {
                const patientIds = this.patients.filter(p => p.selected)
                    .map(p => p.id);
                this.service.deAssignClients(patientIds).subscribe((res) => {
                    if (res.ok) {
                        this.updateList();
                        this.service.getCaseManagerStats(this.caseManager.id, this.facilityId).subscribe(res => {
                            this.stats = res;
                            this.buildStats();
                        });
                    } else {
                        this.notificationService.showError('Error de-assigning clients, please try again');
                    }
                });
            } else {
                // DO SOMETHING ELSE
            }
        });
    }

    selections() {
        return this.patients && !!this.patients.find(p => p.selected);
    }

    loadPage(page) {
        this.page = page;
        this.updateList();
    }

    select(event) {
        this.patients = this.patients.map(p => {
            if (p.id === event.obj.id) {
                p.selected = !p.selected;
            }
            return p;
        });
    }

    caseManagerChanged() {
        if (!this.caseManager) {
            this.stats = null;
        }
        this.service.getCaseManagerStats(this.caseManager.id, this.facilityId).subscribe(res => {
            this.stats = res;
            this.buildStats();
        });
    }

    updateList() {
        if (this.hospitalNum) {
            this.filter.hospitalNum = this.hospitalNum;
        }
        this.filter['facilityId'] = this.facilityId;
        this.filter['size'] = this.itemsPerPage;
        this.filter['page'] = this.page > 0 ? this.page - 1 : 0;
        this.loading = true;
        this.service.getClientList(this.filter).subscribe(res => {
            if (res.body) {
                this.patients = res.body.map(p => {
                    const caseManager = this.caseManagers.find(c => c.id === p.caseManagerId);
                    if (caseManager) {
                        p.caseManager = caseManager;
                    }
                    return p;
                });
                this.totalItems = res.headers.get('X-Total-Count');
                this.service.getCaseManagerStats(0, this.facilityId).subscribe(res => {
                    this.globalStats = res;
                    this.buildGlobalStats();
                });
            }
            this.loading = false;
        });
    }

    ageGroupChanged() {
        if (this.ageLimit == 9) {
            this.filter['lowerAgeLimit'] = 0;
            this.filter['upperAgeLimit'] = 9;
        } else if (this.ageLimit == 14) {
            this.filter['lowerAgeLimit'] = 10;
            this.filter['upperAgeLimit'] = 14;
        } else if (this.ageLimit == 19) {
            this.filter['lowerAgeLimit'] = 15;
            this.filter['upperAgeLimit'] = 19;
        } else if (this.ageLimit == 24) {
            this.filter['lowerAgeLimit'] = 20;
            this.filter['upperAgeLimit'] = 24;
        } else if (this.ageLimit == 100) {
            this.filter['lowerAgeLimit'] = 25;
            this.filter['upperAgeLimit'] = 100;
        }
        if (!this.ageLimit) {
            this.filter['lowerAgeLimit'] = null;
            this.filter['upperAgeLimit'] = null;
        }
        this.updateList();
    }

    pregnancyStatusChanged() {
        if (this.pregnancyStatus == 1) {
            this.filter['pregnant'] = true;
        } else if (this.pregnancyStatus == 2) {
            this.filter['breastfeeding'] = true;
        }
        if (!this.pregnancyStatus) {
            this.filter['pregnant'] = null;
            this.filter['breastfeeding'] = null;
        }
        this.updateList();
    }

    stateChanged(id) {
        if (id) {
            this.service.getLgasByState(id).subscribe(res => this.lgas = res);
        }
    }

    assigned(val) {
        if (val == 1) {
            this.filter.assigned = true;
        } else if (val == 2) {
            this.filter.assigned = false;
        } else {
            this.filter.assigned = null;
        }
        this.updateList();
    }

    lgaChanged(id) {
        if (id) {
            this.filter.lgaId = id;
        } else {
            this.filter.lgaId = null;
        }
        this.updateList();
    }

    buildStats() {
        this.properties = [];
        this.properties.push(new CardViewIntItemModel({
            label: 'Clients(s) Assigned',
            key: 'as',
            value: this.stats.assigned
        }));
        this.properties.push(new CardViewIntItemModel({
            label: 'Stable 1 Year',
            key: 'as',
            value: this.stats.stable
        }));
        this.properties.push(new CardViewIntItemModel({
            label: 'Unstable less than 1 Year',
            key: 'as',
            value: this.stats.unstableLessThan1year
        }));
        this.properties.push(new CardViewIntItemModel({
            label: 'Unstable more than 1 Year',
            key: 'as',
            value: this.stats.unstableMoreThan1Year
        }));
        this.properties.push(new CardViewIntItemModel({
            label: 'Awaiting ART',
            key: 'as',
            value: this.stats.preArt
        }));
    }

    buildGlobalStats() {
        this.globalProperties = [];
        if (this.globalStats) {
            this.globalProperties.push(new CardViewIntItemModel({
                label: 'Clients(s) Assigned',
                key: 'as',
                value: this.globalStats.assigned
            }));
            this.globalProperties.push(new CardViewIntItemModel({
                label: 'Stable 1 Year',
                key: 'as',
                value: this.globalStats.stable
            }));
            this.globalProperties.push(new CardViewIntItemModel({
                label: 'Unstable less than 1 Year',
                key: 'as',
                value: this.globalStats.unstableLessThan1year
            }));
            this.globalProperties.push(new CardViewIntItemModel({
                label: 'Unstable more than 1 Year',
                key: 'as',
                value: this.globalStats.unstableMoreThan1Year
            }));
            this.globalProperties.push(new CardViewIntItemModel({
                label: 'Awaiting ART',
                key: 'as',
                value: this.globalStats.preArt
            }));
        }
    }
};
PatientListComponent.ctorParameters = () => [
    {type: CaseManagementService},
    {type: TdDialogService},
    {type: NotificationService},
    {type: RxStompService}
];
PatientListComponent = tslib_1.__decorate([
    Component({
        selector: 'case-management-patient-list',
        template: "<div class=\"layout\">\n    <div class=\"list-container\">\n        <mat-card>\n            <mat-card-content>\n                <div class=\"row\">\n                    <div class=\"col-md-6\">\n                        <mat-form-field class=\"full-width\">\n                            <mat-label>Facility Case Manager:</mat-label>\n                            <mat-select [(ngModel)]=\"caseManager\" name=\"caseManager\"\n                                        (selectionChange)=\"caseManagerChanged()\">\n                                <mat-option></mat-option>\n                                <mat-option *ngFor=\"let c of caseManagers\" [value]=\"c\">{{c.name}}\n                                </mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n                    <div class=\"col-md-6\">\n                        <div *ngIf=\"caseManager\">\n                            <div class=\"row\">\n                                <div class=\"col-md-2\">\n                                    Clients(s) Assigned:\n                                </div>\n                                <div class=\"col-md-2\">\n                                    {{stats.assigned | number: '1.'}}\n                                </div>\n                                <div class=\"col-md-2\">\n                                    Stable 1 Year:\n                                </div>\n                                <div class=\"col-md-2\">\n                                    {{stats.stable | number: '1.'}}\n                                </div>\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col-md-2\">\n                                    Unstable less than 1 Year:\n                                </div>\n                                <div class=\"col-md-2\">\n                                    {{stats.unstableLessThan1year | number: '1.'}}\n                                </div>\n                                <div class=\"col-md-2\">\n                                    Unstable more than 1 Year:\n                                </div>\n                                <div class=\"col-md-2\">\n                                    {{stats.unstableMoreThan1Year | number: '1.'}}\n                                </div>\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col-md-2\">\n                                    Awaiting ART:\n                                </div>\n                                <div class=\"col-md-2\">\n                                    {{stats.preArt | number: '1.'}}\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <h5> Demographic/Clinic filters</h5>\n                <p></p>\n                <div class=\"row\">\n                    <div class=\"col-md-6\">\n                        <mat-form-field class=\"full-width\">\n                            <mat-label>Client Categorization</mat-label>\n                            <mat-select name=\"categoryId\" [(ngModel)]=\"filter.status\" (selectionChange)=\"updateList()\">\n                                <mat-option>--All--</mat-option>\n                                <mat-option value='STABLE'>Stable One Year</mat-option>\n                                <mat-option value='UNSTABLE_LESS_THAN_1_YEAR'>Unstable less than One Year</mat-option>\n                                <mat-option value='UNSTABLE_MORE_THAN_1_YEAR'>Unstable One Year or more</mat-option>\n                                <mat-option value='PRE_ART'>Awaiting ART</mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n                    <div class=\"col-md-6\">\n                        <mat-form-field class=\"full-width\">\n                            <mat-label>Age Group</mat-label>\n                            <mat-select name=\"ageGroup\" [(ngModel)]=\"ageLimit\" (selectionChange)=\"ageGroupChanged()\">\n                                <mat-option>--All--</mat-option>\n                                <mat-option value='9'>Children (0-9 Years)</mat-option>\n                                <mat-option value='14'>Younger Adolescent (10 to 14 Years)</mat-option>\n                                <mat-option value='19'>Older Adolescent (15 to 19 Years)</mat-option>\n                                <mat-option value='24'>Young People (20 to 24 Years)</mat-option>\n                                <mat-option value='100'>Adults (25 and Above)</mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"col-md-6\">\n                        <mat-form-field class=\"full-width\">\n                            <mat-label>Gender</mat-label>\n                            <mat-select name=\"gender\" [(ngModel)]=\"filter.gender\" (selectionChange)=\"updateList()\">\n                                <mat-option>--All--</mat-option>\n                                <mat-option [value]=\"'FEMALE'\">Female</mat-option>\n                                <mat-option [value]=\"'MALE'\">Male</mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n                    <div class=\"col-md-6\">\n                        <mat-form-field class=\"full-width\">\n                            <mat-label>Pregnancy Status</mat-label>\n                            <mat-select name=\"pregnancyStatus\" [(ngModel)]=\"pregnancyStatus\"\n                                        (selectionChange)=\"pregnancyStatusChanged()\">\n                                <mat-option>--All--</mat-option>\n                                <mat-option value='1'>Pregnant</mat-option>\n                                <mat-option value='2'>Breastfeeding</mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"col-md-6\">\n                        <mat-form-field class=\"full-width\">\n                            <mat-label>State of Residence</mat-label>\n                            <mat-select name=\"state\" (selectionChange)=\"stateChanged($event.value.id)\">\n                                <mat-option></mat-option>\n                                <mat-option *ngFor=\"let state of states\" [value]=\"state\">{{state.name}}</mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n                    <div class=\"col-md-6\">\n                        <mat-form-field class=\"full-width\">\n                            <mat-label>LGA of Residence</mat-label>\n                            <mat-select name=\"lga\" (selectionChange)=\"lgaChanged($event.value.id)\">\n                                <mat-option></mat-option>\n                                <mat-option *ngFor=\"let lga of lgas\" [value]=\"lga\">{{lga.name}}</mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n                </div>\n                <div *ngIf=\"patients?.length\">\n                    <div class=\"row\">\n                        <div class=\"col-md-2\">\n                            Clients(s) Assigned:\n                        </div>\n                        <div class=\"col-md-2\">\n                            {{globalStats.assigned | number: '1.'}}\n                        </div>\n                        <div class=\"col-md-2\">\n                            Stable 1 Year:\n                        </div>\n                        <div class=\"col-md-2\">\n                            {{globalStats.stable | number: '1.'}}\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-2\">\n                            Unstable less than 1 Year:\n                        </div>\n                        <div class=\"col-md-2\">\n                            {{globalStats.unstableLessThan1year | number: '1.'}}\n                        </div>\n                        <div class=\"col-md-2\">\n                            Unstable more than 1 Year:\n                        </div>\n                        <div class=\"col-md-2\">\n                            {{globalStats.unstableMoreThan1Year | number: '1.'}}\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-2\">\n                            Awaiting ART:\n                        </div>\n                        <div class=\"col-md-2\">\n                            {{globalStats.preArt | number: '1.'}}\n                        </div>\n                    </div>\n                </div>\n                <div>\n                    <div class=\"row\">\n                        <div class=\"col-md-8 col-md-offset-4\">\n                            <div class=\"adf-toolbar--spacer\"></div>\n                            <td-search-box backIcon=\"arrow_back\" class=\"push-right-sm\"\n                                           placeholder=\"Search hospital number\" [debounce]=\"500\"\n                                           [(ngModel)]=\"hospitalNum\"\n                                           (searchDebounce)=\"search()\"\n                                           (search)=\"search()\"\n                                           (clear)=\"clearHospitalNum()\" flex>\n                            </td-search-box>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-sm-1 col-sm-offset-11\">\n                            <button mat-raised-button color=\"primary\"\n                                    *ngIf=\"caseManager && selections()\"\n                                    (click)=\"assignClients()\">Assign to Case Manager\n                            </button>\n                            <button mat-raised-button color=\"primary\" *ngIf=\"selections()\"\n                                    (click)=\"deAssignClients()\">De-assign Client(s)\n                            </button>\n                        </div>\n                    </div>\n                    <mat-progress-spinner\n                            *ngIf=\"initializing\"\n                            class=\"adf-document-list-loading-margin\"\n                            [color]=\"'primary'\"\n                            [mode]=\"'indeterminate'\">\n                    </mat-progress-spinner>\n                    <adf-datatable *ngIf=\"patients || loading\"\n                                   [rows]=\"patients\"\n                                   (rowClick)=\"select($event.value)\">\n                        <data-columns>\n                            <data-column key=\"selected\" title=\"\">\n                                <ng-template let-context=\"$implicit\">\n                                    <mat-checkbox [checked]=\"context.row.getValue('selected')\"></mat-checkbox>\n                                </ng-template>\n                            </data-column>\n                            <data-column key=\"name\" title=\"Name\" sortable=\"true\"></data-column>\n                            <data-column key=\"hospitalNum\" title=\"Hospital Number\" sortable=\"true\"></data-column>\n                            <data-column key=\"gender\" title=\"Gender\" sortable=\"true\">\n                                <ng-template let-context=\"$implicit\">\n                                    {{context.row.getValue('gender') === 'MALE' ? 'Male' : context.row.getValue('gender') === 'FEMALE' ? 'Female' : ''}}\n                                </ng-template>\n                            </data-column>\n                            <data-column key=\"dateBirth\" title=\"Date of Birth\" sortable=\"true\">\n                                <ng-template let-context=\"$implicit\">\n                                    {{context.row.getValue('dateBirth') | date: 'dd MMM, yyyy'}}\n                                </ng-template>\n                            </data-column>\n                            <data-column key=\"address\" title=\"Address\" class=\"full-width ellipsis-cell\"></data-column>\n                            <data-column key=\"currentStatus\" title=\"ART Status\" sortable=\"true\"></data-column>\n                            <data-column key=\"caseManager.name\" title=\"Assigned to\" sortable=\"true\"></data-column>\n                        </data-columns>\n                        <adf-loading-content-template>\n                            <ng-template>\n                                <mat-progress-spinner\n                                        class=\"adf-document-list-loading-margin\"\n                                        [color]=\"'primary'\"\n                                        [mode]=\"'indeterminate'\">\n                                </mat-progress-spinner>\n                            </ng-template>\n                        </adf-loading-content-template>\n                    </adf-datatable>\n                </div>\n                <adf-empty-content\n                        *ngIf=\"!patients\"\n                        icon=\"blur_on\"\n                        [title]=\"'No Patients found'\"\n                        [subtitle]=\"'No Patients matching search criteria or no Patients available'\">\n                </adf-empty-content>\n                <div class=\"row\">\n                    <div class=\"col-md-8\">\n                        <ngb-pagination [collectionSize]=\"totalItems\"\n                                        [(page)]=\"page\"\n                                        [pageSize]=\"itemsPerPage\"\n                                        [maxSize]=\"5\"\n                                        size=\"sm\"\n                                        [rotate]=\"true\"\n                                        [boundaryLinks]=\"true\"\n                                        (pageChange)=\"loadPage(page)\">\n                        </ngb-pagination>\n                    </div>\n                    <div class=\"col-md-4\">\n                        <mat-form-field>\n                            <mat-label>Assignment Filter</mat-label>\n                            <mat-select (selectionChange)=\"assigned($event.value)\">\n                                <mat-option></mat-option>\n                                <mat-option [value]=\"1\">Only assigned clients</mat-option>\n                                <mat-option [value]=\"2\">Only clients not assigned</mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n                </div>\n            </mat-card-content>\n        </mat-card>\n    </div>\n</div>\n"
    }),
    tslib_1.__metadata("design:paramtypes", [CaseManagementService, TdDialogService,
        NotificationService, RxStompService])
], PatientListComponent);
export {PatientListComponent};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aWVudC5saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xhbWlzLWNsaW5pYy0xLjEuMy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2Nhc2UtbWFuYWdlbWVudC9wYXRpZW50Lmxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUU3RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUMvRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsWUFBWSxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDN0YsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWpELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQXNCcEQsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBb0I7SUFzQjdCLFlBQW9CLE9BQThCLEVBQVUsY0FBK0IsRUFDdkUsbUJBQXdDLEVBQVUsWUFBNEI7UUFEOUUsWUFBTyxHQUFQLE9BQU8sQ0FBdUI7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBaUI7UUFDdkUsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFnQjtRQXRCbEcsaUJBQVksR0FBa0IsRUFBRSxDQUFDO1FBRWpDLGFBQVEsR0FBYyxFQUFFLENBQUM7UUFDekIsZUFBVSxHQUF3QixFQUFFLENBQUM7UUFDckMscUJBQWdCLEdBQXdCLEVBQUUsQ0FBQztRQUMzQyxVQUFLLEdBQXFCLEVBQUUsQ0FBQztRQUM3QixnQkFBVyxHQUFxQixFQUFFLENBQUM7UUFFbkMsV0FBTSxHQUFXLEVBQUUsQ0FBQztRQUtwQixnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUN6QixlQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsU0FBSSxHQUFHLENBQUMsQ0FBQztRQUNU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V0FBVyxDQUFDLE1BQU07YUFDakMsQ0FBQyxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksb0JBQW9CLENBQUM7Z0JBQ2hELEtBQUssRUFBRSwyQkFBMkI7Z0JBQ2xDLEdBQUcsRUFBRSxJQUFJO2dCQUNULEtBQUssRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLHFCQUFxQjthQUNoRCxDQUFDLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxvQkFBb0IsQ0FBQztnQkFDaEQsS0FBSyxFQUFFLDJCQUEyQjtnQkFDbEMsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsS0FBSyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMscUJBQXFCO2FBQ2hELENBQUMsQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLG9CQUFvQixDQUFDO2dCQUNoRCxLQUFLLEVBQUUsY0FBYztnQkFDckIsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsS0FBSyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTTthQUNqQyxDQUFDLENBQUMsQ0FBQztTQUNQO0lBQ0wsQ0FBQztDQUNKLENBQUE7O1lBeFJnQyxxQkFBcUI7WUFBMEIsZUFBZTtZQUNsRCxtQkFBbUI7WUFBd0IsY0FBYzs7QUF2QnpGLG9CQUFvQjtJQUpoQyxTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsOEJBQThCO1FBQ3hDLGkrZEFBNEM7S0FDL0MsQ0FBQzs2Q0F1QitCLHFCQUFxQixFQUEwQixlQUFlO1FBQ2xELG1CQUFtQixFQUF3QixjQUFjO0dBdkJ6RixvQkFBb0IsQ0E4U2hDO1NBOVNZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhc2VNYW5hZ2VyLCBDYXNlTWFuYWdlclN0YXRzLCBQYXRpZW50IH0gZnJvbSAnLi4vLi4vbW9kZWwvY2FzZS1tYW5hZ2VtZW50Lm1vZGVsJztcbmltcG9ydCB7IENhc2VNYW5hZ2VtZW50U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2Nhc2UtbWFuYWdlbWVudC5zZXJ2aWNlJztcbmltcG9ydCB7IENhcmRWaWV3SW50SXRlbU1vZGVsLCBDYXJkVmlld0l0ZW0sIE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICdAYWxmcmVzY28vYWRmLWNvcmUnO1xuaW1wb3J0IHsgVGREaWFsb2dTZXJ2aWNlIH0gZnJvbSAnQGNvdmFsZW50L2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBSeFN0b21wU2VydmljZSB9IGZyb20gJ0BzdG9tcC9uZzItc3RvbXBqcyc7XG5pbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSBcIkBzdG9tcC9zdG9tcGpzXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmlsdGVyIHtcbiAgICB1cHBlckFnZUxpbWl0PzogbnVtYmVyO1xuICAgIGxvd2VyQWdlTGltaXQ/OiBudW1iZXI7XG4gICAgcHJlZ25hbnQ/OiBib29sZWFuO1xuICAgIGJyZWFzdGZlZWRpbmc/OiBib29sZWFuO1xuICAgIGxnYUlkPzogbnVtYmVyO1xuICAgIGZhY2lsaXR5SWQ/OiBudW1iZXI7XG4gICAgc3RhdHVzPzogc3RyaW5nO1xuICAgIGdlbmRlcj86IHN0cmluZztcbiAgICBob3NwaXRhbE51bT86IHN0cmluZztcbiAgICBwYWdlPzogbnVtYmVyO1xuICAgIHNpemU/OiBudW1iZXI7XG4gICAgYXNzaWduZWQ/OiBib29sZWFuO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2Nhc2UtbWFuYWdlbWVudC1wYXRpZW50LWxpc3QnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9wYXRpZW50Lmxpc3QuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIFBhdGllbnRMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIGNhc2VNYW5hZ2VyczogQ2FzZU1hbmFnZXJbXSA9IFtdO1xuICAgIGNhc2VNYW5hZ2VyOiBDYXNlTWFuYWdlcjtcbiAgICBwYXRpZW50czogUGF0aWVudFtdID0gW107XG4gICAgcHJvcGVydGllczogQXJyYXk8Q2FyZFZpZXdJdGVtPiA9IFtdO1xuICAgIGdsb2JhbFByb3BlcnRpZXM6IEFycmF5PENhcmRWaWV3SXRlbT4gPSBbXTtcbiAgICBzdGF0czogQ2FzZU1hbmFnZXJTdGF0cyA9IHt9O1xuICAgIGdsb2JhbFN0YXRzOiBDYXNlTWFuYWdlclN0YXRzID0ge307XG4gICAgZmFjaWxpdHlJZDogbnVtYmVyO1xuICAgIGZpbHRlcjogRmlsdGVyID0ge307XG4gICAgYWdlTGltaXQ6IG51bWJlcjtcbiAgICBwcmVnbmFuY3lTdGF0dXM6IG51bWJlcjtcbiAgICBzdGF0ZXM6IGFueVtdO1xuICAgIGxnYXM6IGFueVtdO1xuICAgIGhvc3BpdGFsTnVtOiBzdHJpbmcgPSAnJztcbiAgICB0b3RhbEl0ZW1zID0gMDtcbiAgICBwYWdlID0gMDtcbiAgICBpdGVtc1BlclBhZ2UgPSAyMDtcbiAgICBsb2FkaW5nID0gdHJ1ZTtcbiAgICBpbml0aWFsaXppbmcgPSB0cnVlO1xuICAgIHByaXZhdGUgdG9waWNTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc2VydmljZTogQ2FzZU1hbmFnZW1lbnRTZXJ2aWNlLCBwcml2YXRlIF9kaWFsb2dTZXJ2aWNlOiBUZERpYWxvZ1NlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBub3RpZmljYXRpb25TZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlLCBwcml2YXRlIHN0b21wU2VydmljZTogUnhTdG9tcFNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgLyp0aGlzLnRvcGljU3Vic2NyaXB0aW9uID0gdGhpcy5zdG9tcFNlcnZpY2Uud2F0Y2goJy90b3BpYy9jYXNlLW1hbmFnZW1lbnQnKS5zdWJzY3JpYmUoKG1zZzogTWVzc2FnZSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1NpbXAgTWVzc2FnZScsIG1zZyk7XG4gICAgICAgICAgICBpZihtc2cuYm9keSA9PT0gJ2ZpbmlzaGVkJyl7XG4gICAgICAgICAgICAgICAgdGhpcy5pbml0aWFsaXppbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7Ki9cblxuICAgICAgICB0aGlzLnNlcnZpY2UuZ2V0QWN0aXZlRmFjaWxpdHkoKS5zdWJzY3JpYmUoKGYpID0+IHtcbiAgICAgICAgICAgIGlmIChmKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mYWNpbGl0eUlkID0gZi5pZDtcbiAgICAgICAgICAgICAgICB0aGlzLnNlcnZpY2UuaW5pdENsaWVudHMoZi5pZCkuc3Vic2NyaWJlKChyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VydmljZS5nZXRDYXNlTWFuYWdlcnMoZi5pZCkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhc2VNYW5hZ2VycyA9IHJlcztcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTGlzdCgpXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLmdldENhc2VNYW5hZ2VyU3RhdHMoMCwgZi5pZCkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdHMgPSByZXM7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVpbGRTdGF0cygpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNlcnZpY2UuZ2V0U3RhdGVzKCkuc3Vic2NyaWJlKHJlcyA9PiB0aGlzLnN0YXRlcyA9IHJlcylcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgLy90aGlzLnRvcGljU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgY2xlYXJIb3NwaXRhbE51bSgpIHtcbiAgICAgICAgdGhpcy5ob3NwaXRhbE51bSA9IG51bGw7XG4gICAgICAgIHRoaXMuZmlsdGVyWydob3NwaXRhbE51bSddID0gbnVsbDtcbiAgICAgICAgdGhpcy5wYWdlID0gMDtcbiAgICB9XG5cbiAgICBzZWFyY2goKSB7XG4gICAgICAgIHRoaXMucGFnZSA9IDA7XG4gICAgICAgIHRoaXMudXBkYXRlTGlzdCgpO1xuICAgIH1cblxuICAgIGFzc2lnbkNsaWVudHMoKSB7XG4gICAgICAgIHRoaXMuX2RpYWxvZ1NlcnZpY2Uub3BlbkNvbmZpcm0oe1xuICAgICAgICAgICAgdGl0bGU6ICdDb25maXJtJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdEbyB5b3Ugd2FudCB0byBhc3NpZ24gc2VsZWN0ZWQgY2xpZW50cyB0byB0aGUgc2VsZWN0ZWQgQ2FzZSBNYW5hZ2VyPycsXG4gICAgICAgICAgICBjYW5jZWxCdXR0b246ICdObycsXG4gICAgICAgICAgICBhY2NlcHRCdXR0b246ICdZZXMnLFxuICAgICAgICAgICAgd2lkdGg6ICc1MDBweCcsXG4gICAgICAgIH0pLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKChhY2NlcHQ6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgIGlmIChhY2NlcHQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXRpZW50SWRzID0gdGhpcy5wYXRpZW50cy5maWx0ZXIocCA9PiBwLnNlbGVjdGVkKVxuICAgICAgICAgICAgICAgICAgICAubWFwKHAgPT4gcC5pZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLmFzc2lnblRvQ2FzZU1hbmFnZXIodGhpcy5jYXNlTWFuYWdlci5pZCwgcGF0aWVudElkcykuc3Vic2NyaWJlKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVMaXN0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlcnZpY2UuZ2V0Q2FzZU1hbmFnZXJTdGF0cyh0aGlzLmNhc2VNYW5hZ2VyLmlkLCB0aGlzLmZhY2lsaXR5SWQpLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdHMgPSByZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idWlsZFN0YXRzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnNob3dFcnJvcignRXJyb3IgYXNzaWduaW5nIGNsaWVudHMsIHBsZWFzZSB0cnkgYWdhaW4nKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gRE8gU09NRVRISU5HIEVMU0VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGVBc3NpZ25DbGllbnRzKCkge1xuICAgICAgICB0aGlzLl9kaWFsb2dTZXJ2aWNlLm9wZW5Db25maXJtKHtcbiAgICAgICAgICAgIHRpdGxlOiAnQ29uZmlybScsXG4gICAgICAgICAgICBtZXNzYWdlOiAnRG8geW91IHdhbnQgdG8gZGUtYXNzaWduIHNlbGVjdGVkIGNsaWVudHM/JyxcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvbjogJ05vJyxcbiAgICAgICAgICAgIGFjY2VwdEJ1dHRvbjogJ1llcycsXG4gICAgICAgICAgICB3aWR0aDogJzUwMHB4JyxcbiAgICAgICAgfSkuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUoKGFjY2VwdDogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgaWYgKGFjY2VwdCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhdGllbnRJZHMgPSB0aGlzLnBhdGllbnRzLmZpbHRlcihwID0+IHAuc2VsZWN0ZWQpXG4gICAgICAgICAgICAgICAgICAgIC5tYXAocCA9PiBwLmlkKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlcnZpY2UuZGVBc3NpZ25DbGllbnRzKHBhdGllbnRJZHMpLnN1YnNjcmliZSgocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTGlzdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLmdldENhc2VNYW5hZ2VyU3RhdHModGhpcy5jYXNlTWFuYWdlci5pZCwgdGhpcy5mYWNpbGl0eUlkKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRzID0gcmVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnVpbGRTdGF0cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zaG93RXJyb3IoJ0Vycm9yIGRlLWFzc2lnbmluZyBjbGllbnRzLCBwbGVhc2UgdHJ5IGFnYWluJylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIERPIFNPTUVUSElORyBFTFNFXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNlbGVjdGlvbnMoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhdGllbnRzICYmICEhdGhpcy5wYXRpZW50cy5maW5kKHAgPT4gcC5zZWxlY3RlZClcbiAgICB9XG5cbiAgICBsb2FkUGFnZShwYWdlKSB7XG4gICAgICAgIHRoaXMucGFnZSA9IHBhZ2U7XG4gICAgICAgIHRoaXMudXBkYXRlTGlzdCgpXG4gICAgfVxuXG4gICAgc2VsZWN0KGV2ZW50KSB7XG4gICAgICAgIHRoaXMucGF0aWVudHMgPSB0aGlzLnBhdGllbnRzLm1hcChwID0+IHtcbiAgICAgICAgICAgIGlmIChwLmlkID09PSBldmVudC5vYmouaWQpIHtcbiAgICAgICAgICAgICAgICBwLnNlbGVjdGVkID0gIXAuc2VsZWN0ZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2FzZU1hbmFnZXJDaGFuZ2VkKCkge1xuICAgICAgICBpZiAoIXRoaXMuY2FzZU1hbmFnZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdHMgPSBudWxsXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXJ2aWNlLmdldENhc2VNYW5hZ2VyU3RhdHModGhpcy5jYXNlTWFuYWdlci5pZCwgdGhpcy5mYWNpbGl0eUlkKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RhdHMgPSByZXM7XG4gICAgICAgICAgICB0aGlzLmJ1aWxkU3RhdHMoKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICB1cGRhdGVMaXN0KCkge1xuICAgICAgICBpZiAodGhpcy5ob3NwaXRhbE51bSkge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXIuaG9zcGl0YWxOdW0gPSB0aGlzLmhvc3BpdGFsTnVtO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZmlsdGVyWydmYWNpbGl0eUlkJ10gPSB0aGlzLmZhY2lsaXR5SWQ7XG4gICAgICAgIHRoaXMuZmlsdGVyWydzaXplJ10gPSB0aGlzLml0ZW1zUGVyUGFnZTtcbiAgICAgICAgdGhpcy5maWx0ZXJbJ3BhZ2UnXSA9IHRoaXMucGFnZSA+IDAgPyB0aGlzLnBhZ2UgLSAxIDogMDtcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zZXJ2aWNlLmdldENsaWVudExpc3QodGhpcy5maWx0ZXIpLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcy5ib2R5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXRpZW50cyA9IHJlcy5ib2R5Lm1hcChwID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2FzZU1hbmFnZXIgPSB0aGlzLmNhc2VNYW5hZ2Vycy5maW5kKGMgPT4gYy5pZCA9PT0gcC5jYXNlTWFuYWdlcklkKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhc2VNYW5hZ2VyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwLmNhc2VNYW5hZ2VyID0gY2FzZU1hbmFnZXI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHA7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy50b3RhbEl0ZW1zID0gKDxhbnk+cmVzLmhlYWRlcnMpLmdldCgnWC1Ub3RhbC1Db3VudCcpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VydmljZS5nZXRDYXNlTWFuYWdlclN0YXRzKDAsIHRoaXMuZmFjaWxpdHlJZCkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2xvYmFsU3RhdHMgPSByZXM7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVpbGRHbG9iYWxTdGF0cygpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgYWdlR3JvdXBDaGFuZ2VkKCkge1xuICAgICAgICBpZiAodGhpcy5hZ2VMaW1pdCA9PSA5KSB7XG4gICAgICAgICAgICB0aGlzLmZpbHRlclsnbG93ZXJBZ2VMaW1pdCddID0gMDtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyWyd1cHBlckFnZUxpbWl0J10gPSA5O1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYWdlTGltaXQgPT0gMTQpIHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyWydsb3dlckFnZUxpbWl0J10gPSAxMDtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyWyd1cHBlckFnZUxpbWl0J10gPSAxNDtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmFnZUxpbWl0ID09IDE5KSB7XG4gICAgICAgICAgICB0aGlzLmZpbHRlclsnbG93ZXJBZ2VMaW1pdCddID0gMTU7XG4gICAgICAgICAgICB0aGlzLmZpbHRlclsndXBwZXJBZ2VMaW1pdCddID0gMTk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5hZ2VMaW1pdCA9PSAyNCkge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJbJ2xvd2VyQWdlTGltaXQnXSA9IDIwO1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJbJ3VwcGVyQWdlTGltaXQnXSA9IDI0O1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYWdlTGltaXQgPT0gMTAwKSB7XG4gICAgICAgICAgICB0aGlzLmZpbHRlclsnbG93ZXJBZ2VMaW1pdCddID0gMjU7XG4gICAgICAgICAgICB0aGlzLmZpbHRlclsndXBwZXJBZ2VMaW1pdCddID0gMTAwO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5hZ2VMaW1pdCkge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJbJ2xvd2VyQWdlTGltaXQnXSA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmZpbHRlclsndXBwZXJBZ2VMaW1pdCddID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZUxpc3QoKVxuICAgIH1cblxuICAgIHByZWduYW5jeVN0YXR1c0NoYW5nZWQoKSB7XG4gICAgICAgIGlmICh0aGlzLnByZWduYW5jeVN0YXR1cyA9PSAxKSB7XG4gICAgICAgICAgICB0aGlzLmZpbHRlclsncHJlZ25hbnQnXSA9IHRydWVcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByZWduYW5jeVN0YXR1cyA9PSAyKSB7XG4gICAgICAgICAgICB0aGlzLmZpbHRlclsnYnJlYXN0ZmVlZGluZyddID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5wcmVnbmFuY3lTdGF0dXMpIHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyWydwcmVnbmFudCddID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyWydicmVhc3RmZWVkaW5nJ10gPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlTGlzdCgpXG4gICAgfVxuXG4gICAgc3RhdGVDaGFuZ2VkKGlkKSB7XG4gICAgICAgIGlmIChpZCkge1xuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLmdldExnYXNCeVN0YXRlKGlkKS5zdWJzY3JpYmUocmVzID0+IHRoaXMubGdhcyA9IHJlcylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzc2lnbmVkKHZhbCkge1xuICAgICAgICBpZiAodmFsID09IDEpIHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyLmFzc2lnbmVkID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmICh2YWwgPT0gMikge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXIuYXNzaWduZWQgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyLmFzc2lnbmVkID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZUxpc3QoKTtcbiAgICB9XG5cbiAgICBsZ2FDaGFuZ2VkKGlkKSB7XG4gICAgICAgIGlmIChpZCkge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXIubGdhSWQgPSBpZFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXIubGdhSWQgPSBudWxsXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGVMaXN0KClcbiAgICB9XG5cbiAgICBidWlsZFN0YXRzKCkge1xuICAgICAgICB0aGlzLnByb3BlcnRpZXMgPSBbXTtcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3SW50SXRlbU1vZGVsKHtcbiAgICAgICAgICAgIGxhYmVsOiAnQ2xpZW50cyhzKSBBc3NpZ25lZCcsXG4gICAgICAgICAgICBrZXk6ICdhcycsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5zdGF0cy5hc3NpZ25lZFxuICAgICAgICB9KSk7XG4gICAgICAgIHRoaXMucHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld0ludEl0ZW1Nb2RlbCh7XG4gICAgICAgICAgICBsYWJlbDogJ1N0YWJsZSAxIFllYXInLFxuICAgICAgICAgICAga2V5OiAnYXMnLFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMuc3RhdHMuc3RhYmxlXG4gICAgICAgIH0pKTtcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3SW50SXRlbU1vZGVsKHtcbiAgICAgICAgICAgIGxhYmVsOiAnVW5zdGFibGUgbGVzcyB0aGFuIDEgWWVhcicsXG4gICAgICAgICAgICBrZXk6ICdhcycsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5zdGF0cy51bnN0YWJsZUxlc3NUaGFuMXllYXJcbiAgICAgICAgfSkpO1xuICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdJbnRJdGVtTW9kZWwoe1xuICAgICAgICAgICAgbGFiZWw6ICdVbnN0YWJsZSBtb3JlIHRoYW4gMSBZZWFyJyxcbiAgICAgICAgICAgIGtleTogJ2FzJyxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnN0YXRzLnVuc3RhYmxlTW9yZVRoYW4xWWVhclxuICAgICAgICB9KSk7XG4gICAgICAgIHRoaXMucHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld0ludEl0ZW1Nb2RlbCh7XG4gICAgICAgICAgICBsYWJlbDogJ0F3YWl0aW5nIEFSVCcsXG4gICAgICAgICAgICBrZXk6ICdhcycsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5zdGF0cy5wcmVBcnRcbiAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIGJ1aWxkR2xvYmFsU3RhdHMoKSB7XG4gICAgICAgIHRoaXMuZ2xvYmFsUHJvcGVydGllcyA9IFtdO1xuICAgICAgICBpZiAodGhpcy5nbG9iYWxTdGF0cykge1xuICAgICAgICAgICAgdGhpcy5nbG9iYWxQcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3SW50SXRlbU1vZGVsKHtcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0NsaWVudHMocykgQXNzaWduZWQnLFxuICAgICAgICAgICAgICAgIGtleTogJ2FzJyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5nbG9iYWxTdGF0cy5hc3NpZ25lZFxuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgdGhpcy5nbG9iYWxQcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3SW50SXRlbU1vZGVsKHtcbiAgICAgICAgICAgICAgICBsYWJlbDogJ1N0YWJsZSAxIFllYXInLFxuICAgICAgICAgICAgICAgIGtleTogJ2FzJyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5nbG9iYWxTdGF0cy5zdGFibGVcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIHRoaXMuZ2xvYmFsUHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld0ludEl0ZW1Nb2RlbCh7XG4gICAgICAgICAgICAgICAgbGFiZWw6ICdVbnN0YWJsZSBsZXNzIHRoYW4gMSBZZWFyJyxcbiAgICAgICAgICAgICAgICBrZXk6ICdhcycsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuZ2xvYmFsU3RhdHMudW5zdGFibGVMZXNzVGhhbjF5ZWFyXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB0aGlzLmdsb2JhbFByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdJbnRJdGVtTW9kZWwoe1xuICAgICAgICAgICAgICAgIGxhYmVsOiAnVW5zdGFibGUgbW9yZSB0aGFuIDEgWWVhcicsXG4gICAgICAgICAgICAgICAga2V5OiAnYXMnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLmdsb2JhbFN0YXRzLnVuc3RhYmxlTW9yZVRoYW4xWWVhclxuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgdGhpcy5nbG9iYWxQcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3SW50SXRlbU1vZGVsKHtcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0F3YWl0aW5nIEFSVCcsXG4gICAgICAgICAgICAgICAga2V5OiAnYXMnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLmdsb2JhbFN0YXRzLnByZUFydFxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19
