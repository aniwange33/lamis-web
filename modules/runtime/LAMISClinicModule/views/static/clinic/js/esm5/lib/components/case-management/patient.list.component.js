import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { CaseManagementService } from '../../services/case-management.service';
import { CardViewIntItemModel, CardViewItem, NotificationService } from '@alfresco/adf-core';
import { TdDialogService } from '@covalent/core';
import { RxStompService } from '@stomp/ng2-stompjs';
var PatientListComponent = /** @class */ (function () {
    function PatientListComponent(service, _dialogService, notificationService, stompService) {
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
        this.filterByCaseManager = false;
    }
    PatientListComponent.prototype.ngOnInit = function () {
        /*this.topicSubscription = this.stompService.watch('/topic/case-management').subscribe((msg: Message) => {
            console.log('Simp Message', msg);
            if(msg.body === 'finished'){
                this.initializing = false;
            }
        });*/
        var _this = this;
        this.service.getActiveFacility().subscribe(function (f) {
            if (f) {
                _this.facilityId = f.id;
                _this.service.initClients(f.id).subscribe(function (r) {
                    _this.initializing = false;
                    _this.service.getCaseManagers(f.id).subscribe(function (res) {
                        _this.caseManagers = res.filter(function (c) { return c.active; });
                        _this.updateList();
                    });
                });
                _this.service.getCaseManagerStats(0, f.id).subscribe(function (res) {
                    _this.stats = res;
                    _this.buildStats();
                });
            }
        });
        this.service.getStates().subscribe(function (res) { return _this.states = res; });
    };
    PatientListComponent.prototype.ngOnDestroy = function () {
        // this.topicSubscription.unsubscribe();
    };
    PatientListComponent.prototype.clearHospitalNum = function () {
        this.hospitalNum = null;
        this.filter['hospitalNum'] = null;
        this.page = 0;
    };
    PatientListComponent.prototype.search = function () {
        this.page = 0;
        this.updateList();
    };
    PatientListComponent.prototype.assignClients = function () {
        var _this = this;
        this._dialogService.openConfirm({
            title: 'Confirm',
            message: 'Do you want to assign selected clients to the selected Case Manager?',
            cancelButton: 'No',
            acceptButton: 'Yes',
            width: '500px',
        }).afterClosed().subscribe(function (accept) {
            if (accept) {
                var patientIds = _this.patients.filter(function (p) { return p.selected; })
                    .map(function (p) { return p.id; });
                _this.service.assignToCaseManager(_this.assignCaseManager.id, patientIds).subscribe(function (res) {
                    if (res.ok) {
                        _this.updateList();
                        _this.service.getCaseManagerStats(_this.caseManager.id, _this.facilityId).subscribe(function (res1) {
                            _this.stats = res1;
                            _this.buildStats();
                        });
                    }
                    else {
                        _this.notificationService.showError('Error assigning clients, please try again');
                    }
                });
            }
            else {
                // DO SOMETHING ELSE
            }
        });
    };
    PatientListComponent.prototype.deAssignClients = function () {
        var _this = this;
        this._dialogService.openConfirm({
            title: 'Confirm',
            message: 'Do you want to de-assign selected clients?',
            cancelButton: 'No',
            acceptButton: 'Yes',
            width: '500px',
        }).afterClosed().subscribe(function (accept) {
            if (accept) {
                var patientIds = _this.patients.filter(function (p) { return p.selected; })
                    .map(function (p) { return p.id; });
                _this.service.deAssignClients(patientIds).subscribe(function (res) {
                    if (res.ok) {
                        _this.updateList();
                        _this.service.getCaseManagerStats(_this.caseManager.id, _this.facilityId).subscribe(function (res1) {
                            _this.stats = res1;
                            _this.buildStats();
                        });
                    }
                    else {
                        _this.notificationService.showError('Error de-assigning clients, please try again');
                    }
                });
            }
            else {
                // DO SOMETHING ELSE
            }
        });
    };
    PatientListComponent.prototype.selections = function () {
        return this.patients && !!this.patients.find(function (p) { return p.selected; });
    };
    PatientListComponent.prototype.loadPage = function (page) {
        this.page = page;
        this.updateList();
    };
    PatientListComponent.prototype.select = function (event) {
        this.patients = this.patients.map(function (p) {
            if (p.id === event.obj.id) {
                p.selected = !p.selected;
            }
            return p;
        });
    };
    PatientListComponent.prototype.caseManagerChanged = function () {
        var _this = this;
        if (!this.caseManager) {
            this.stats = null;
        }
        this.service.getCaseManagerStats(this.caseManager.id, this.facilityId).subscribe(function (res) {
            _this.stats = res;
            _this.buildStats();
        });
        if (this.filterByCaseManager) {
            this.filter['caseManagerId'] = this.caseManager.id;
        }
        else {
            this.filter['caseManagerId'] = null;
        }
        this.updateList();
    };
    PatientListComponent.prototype.updateList = function () {
        var _this = this;
        if (this.hospitalNum) {
            this.filter.hospitalNum = this.hospitalNum;
        }
        this.filter['facilityId'] = this.facilityId;
        this.filter['size'] = this.itemsPerPage;
        this.filter['page'] = this.page > 0 ? this.page - 1 : 0;
        if (this.filterByCaseManager) {
            this.filter['caseManagerId'] = this.caseManager.id;
        }
        else {
            this.filter['caseManagerId'] = null;
        }
        this.loading = true;
        this.service.getClientList(this.filter).subscribe(function (res) {
            if (res.body) {
                _this.patients = res.body.map(function (p) {
                    var caseManager = _this.caseManagers.find(function (c) { return c.id === p.caseManagerId; });
                    if (caseManager) {
                        p.caseManager = caseManager;
                    }
                    return p;
                });
                _this.totalItems = res.headers.get('X-Total-Count');
                _this.service.getCaseManagerStats(0, _this.facilityId).subscribe(function (res1) {
                    _this.globalStats = res1;
                    _this.buildGlobalStats();
                });
            }
            _this.loading = false;
        });
    };
    PatientListComponent.prototype.ageGroupChanged = function () {
        if (this.ageLimit === 9) {
            this.filter['lowerAgeLimit'] = 0;
            this.filter['upperAgeLimit'] = 9;
        }
        else if (this.ageLimit === 14) {
            this.filter['lowerAgeLimit'] = 10;
            this.filter['upperAgeLimit'] = 14;
        }
        else if (this.ageLimit === 19) {
            this.filter['lowerAgeLimit'] = 15;
            this.filter['upperAgeLimit'] = 19;
        }
        else if (this.ageLimit === 24) {
            this.filter['lowerAgeLimit'] = 20;
            this.filter['upperAgeLimit'] = 24;
        }
        else if (this.ageLimit === 100) {
            this.filter['lowerAgeLimit'] = 25;
            this.filter['upperAgeLimit'] = 100;
        }
        if (!this.ageLimit) {
            this.filter['lowerAgeLimit'] = null;
            this.filter['upperAgeLimit'] = null;
        }
        this.updateList();
    };
    PatientListComponent.prototype.pregnancyStatusChanged = function () {
        if (this.pregnancyStatus === 1) {
            this.filter['pregnant'] = true;
        }
        else if (this.pregnancyStatus === 2) {
            this.filter['breastfeeding'] = true;
        }
        if (!this.pregnancyStatus) {
            this.filter['pregnant'] = null;
            this.filter['breastfeeding'] = null;
        }
        this.updateList();
    };
    PatientListComponent.prototype.stateChanged = function (id) {
        var _this = this;
        if (id) {
            this.service.getLgasByState(id).subscribe(function (res) { return _this.lgas = res; });
        }
    };
    PatientListComponent.prototype.assigned = function (val) {
        if (val === 1) {
            this.filter.assigned = true;
        }
        else if (val === 2) {
            this.filter.assigned = false;
        }
        else {
            this.filter.assigned = null;
        }
        this.updateList();
    };
    PatientListComponent.prototype.lgaChanged = function (id) {
        if (id) {
            this.filter.lgaId = id;
        }
        else {
            this.filter.lgaId = null;
        }
        this.updateList();
    };
    PatientListComponent.prototype.buildStats = function () {
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
    };
    PatientListComponent.prototype.buildGlobalStats = function () {
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
    };
    PatientListComponent.ctorParameters = function () { return [
        { type: CaseManagementService },
        { type: TdDialogService },
        { type: NotificationService },
        { type: RxStompService }
    ]; };
    PatientListComponent = tslib_1.__decorate([
        Component({
            selector: 'case-management-patient-list',
            template: "<div class=\"layout\">\n    <div class=\"list-container\">\n        <mat-card>\n            <mat-card-content>\n                <div class=\"row\">\n                    <div class=\"col-md-6\">\n                        <mat-form-field class=\"full-width\">\n                            <mat-label>Facility Case Manager:</mat-label>\n                            <mat-select [(ngModel)]=\"caseManager\" name=\"caseManager\"\n                                        (selectionChange)=\"caseManagerChanged()\">\n                                <mat-option></mat-option>\n                                <mat-option *ngFor=\"let c of caseManagers\" [value]=\"c\">{{c.name}}\n                                </mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                        <div *ngIf=\"caseManager\">\n                            <mat-checkbox [(ngModel)]=\"filterByCaseManager\"\n                                          (change)=\"updateList()\"\n                                          name=\"activeTb\"\n                            >\n                                Filter by Case Manager\n                            </mat-checkbox>\n                        </div>\n                    </div>\n                    <div class=\"col-md-6\">\n                        <div *ngIf=\"caseManager\">\n                            <div class=\"row\">\n                                <div class=\"col-md-2\">\n                                    Clients(s) Assigned:\n                                </div>\n                                <div class=\"col-md-2\">\n                                    {{stats.assigned | number: '1.'}}\n                                </div>\n                                <div class=\"col-md-2\">\n                                    Stable 1 Year:\n                                </div>\n                                <div class=\"col-md-2\">\n                                    {{stats.stable | number: '1.'}}\n                                </div>\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col-md-2\">\n                                    Unstable less than 1 Year:\n                                </div>\n                                <div class=\"col-md-2\">\n                                    {{stats.unstableLessThan1year | number: '1.'}}\n                                </div>\n                                <div class=\"col-md-2\">\n                                    Unstable more than 1 Year:\n                                </div>\n                                <div class=\"col-md-2\">\n                                    {{stats.unstableMoreThan1Year | number: '1.'}}\n                                </div>\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col-md-2\">\n                                    Awaiting ART:\n                                </div>\n                                <div class=\"col-md-2\">\n                                    {{stats.preArt | number: '1.'}}\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <h5> Demographic/Clinic filters</h5>\n                <p></p>\n                <div class=\"row\">\n                    <div class=\"col-md-6\">\n                        <mat-form-field class=\"full-width\">\n                            <mat-label>Client Categorization</mat-label>\n                            <mat-select name=\"categoryId\" [(ngModel)]=\"filter.status\" (selectionChange)=\"updateList()\">\n                                <mat-option>--All--</mat-option>\n                                <mat-option value='STABLE'>Stable One Year</mat-option>\n                                <mat-option value='UNSTABLE_LESS_THAN_1_YEAR'>Unstable less than One Year</mat-option>\n                                <mat-option value='UNSTABLE_MORE_THAN_1_YEAR'>Unstable One Year or more</mat-option>\n                                <mat-option value='PRE_ART'>Awaiting ART</mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n                    <div class=\"col-md-6\">\n                        <mat-form-field class=\"full-width\">\n                            <mat-label>Age Group</mat-label>\n                            <mat-select name=\"ageGroup\" [(ngModel)]=\"ageLimit\" (selectionChange)=\"ageGroupChanged()\">\n                                <mat-option>--All--</mat-option>\n                                <mat-option value='9'>Children (0-9 Years)</mat-option>\n                                <mat-option value='14'>Younger Adolescent (10 to 14 Years)</mat-option>\n                                <mat-option value='19'>Older Adolescent (15 to 19 Years)</mat-option>\n                                <mat-option value='24'>Young People (20 to 24 Years)</mat-option>\n                                <mat-option value='100'>Adults (25 and Above)</mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"col-md-6\">\n                        <mat-form-field class=\"full-width\">\n                            <mat-label>Gender</mat-label>\n                            <mat-select name=\"gender\" [(ngModel)]=\"filter.gender\" (selectionChange)=\"updateList()\">\n                                <mat-option>--All--</mat-option>\n                                <mat-option [value]=\"'FEMALE'\">Female</mat-option>\n                                <mat-option [value]=\"'MALE'\">Male</mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n                    <div class=\"col-md-6\">\n                        <mat-form-field class=\"full-width\">\n                            <mat-label>Pregnancy Status</mat-label>\n                            <mat-select name=\"pregnancyStatus\" [(ngModel)]=\"pregnancyStatus\"\n                                        (selectionChange)=\"pregnancyStatusChanged()\">\n                                <mat-option>--All--</mat-option>\n                                <mat-option value='1'>Pregnant</mat-option>\n                                <mat-option value='2'>Breastfeeding</mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"col-md-6\">\n                        <mat-form-field class=\"full-width\">\n                            <mat-label>State of Residence</mat-label>\n                            <mat-select name=\"state\" (selectionChange)=\"stateChanged($event.value.id)\">\n                                <mat-option></mat-option>\n                                <mat-option *ngFor=\"let state of states\" [value]=\"state\">{{state.name}}</mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n                    <div class=\"col-md-6\">\n                        <mat-form-field class=\"full-width\">\n                            <mat-label>LGA of Residence</mat-label>\n                            <mat-select name=\"lga\" (selectionChange)=\"lgaChanged($event.value.id)\">\n                                <mat-option></mat-option>\n                                <mat-option *ngFor=\"let lga of lgas\" [value]=\"lga\">{{lga.name}}</mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n                </div>\n                <div *ngIf=\"patients?.length\">\n                    <div class=\"row\">\n                        <div class=\"col-md-2\">\n                            Clients(s) Assigned:\n                        </div>\n                        <div class=\"col-md-2\">\n                            {{globalStats.assigned | number: '1.'}}\n                        </div>\n                        <div class=\"col-md-2\">\n                            Stable 1 Year:\n                        </div>\n                        <div class=\"col-md-2\">\n                            {{globalStats.stable | number: '1.'}}\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-2\">\n                            Unstable less than 1 Year:\n                        </div>\n                        <div class=\"col-md-2\">\n                            {{globalStats.unstableLessThan1year | number: '1.'}}\n                        </div>\n                        <div class=\"col-md-2\">\n                            Unstable more than 1 Year:\n                        </div>\n                        <div class=\"col-md-2\">\n                            {{globalStats.unstableMoreThan1Year | number: '1.'}}\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-2\">\n                            Awaiting ART:\n                        </div>\n                        <div class=\"col-md-2\">\n                            {{globalStats.preArt | number: '1.'}}\n                        </div>\n                    </div>\n                </div>\n                <div>\n                    <div class=\"row\">\n                        <div class=\"col-md-8 col-md-offset-4\">\n                            <div class=\"adf-toolbar--spacer\"></div>\n                            <td-search-box backIcon=\"arrow_back\" class=\"push-right-sm\"\n                                           placeholder=\"Search hospital number\" [debounce]=\"500\"\n                                           [(ngModel)]=\"hospitalNum\"\n                                           (searchDebounce)=\"search()\"\n                                           (search)=\"search()\"\n                                           (clear)=\"clearHospitalNum()\" flex>\n                            </td-search-box>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Assign to Case Manager:</mat-label>\n                                <mat-select [(ngModel)]=\"assignCaseManager\" name=\"caseManager1\">\n                                    <mat-option></mat-option>\n                                    <mat-option *ngFor=\"let c of caseManagers\" [value]=\"c\">{{c.name}}\n                                    </mat-option>\n                                </mat-select>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-sm-3 col-sm-offset-9\">\n                            <div>\n                                <button mat-raised-button color=\"primary\"\n                                        *ngIf=\"assignCaseManager && selections()\"\n                                        (click)=\"assignClients()\">Assign to Case Manager\n                                </button>\n                                <button mat-raised-button color=\"accent\" *ngIf=\"selections()\"\n                                        (click)=\"deAssignClients()\">De-assign Client(s)\n                                </button>\n                            </div>\n                        </div>\n                    </div>\n                    <mat-progress-spinner\n                            *ngIf=\"initializing\"\n                            class=\"adf-document-list-loading-margin\"\n                            [color]=\"'primary'\"\n                            [mode]=\"'indeterminate'\">\n                    </mat-progress-spinner>\n                    <adf-datatable *ngIf=\"patients || loading\"\n                                   [rows]=\"patients\"\n                                   (rowClick)=\"select($event.value)\">\n                        <data-columns>\n                            <data-column key=\"selected\" title=\"\">\n                                <ng-template let-context=\"$implicit\">\n                                    <mat-checkbox [checked]=\"context.row.getValue('selected')\"></mat-checkbox>\n                                </ng-template>\n                            </data-column>\n                            <data-column key=\"name\" title=\"Name\" sortable=\"true\"></data-column>\n                            <data-column key=\"hospitalNum\" title=\"Hospital Number\" sortable=\"true\"></data-column>\n                            <data-column key=\"gender\" title=\"Gender\" sortable=\"true\">\n                                <ng-template let-context=\"$implicit\">\n                                    {{context.row.getValue('gender') === 'MALE' ? 'Male' : context.row.getValue('gender') === 'FEMALE' ? 'Female' : ''}}\n                                </ng-template>\n                            </data-column>\n                            <data-column key=\"dateBirth\" title=\"Date of Birth\" sortable=\"true\">\n                                <ng-template let-context=\"$implicit\">\n                                    {{context.row.getValue('dateBirth') | date: 'dd MMM, yyyy'}}\n                                </ng-template>\n                            </data-column>\n                            <data-column key=\"address\" title=\"Address\" class=\"full-width ellipsis-cell\"></data-column>\n                            <data-column key=\"currentStatus\" title=\"ART Status\" sortable=\"true\"></data-column>\n                            <data-column key=\"caseManager.name\" title=\"Assigned to\" sortable=\"true\"></data-column>\n                        </data-columns>\n                        <adf-loading-content-template>\n                            <ng-template>\n                                <mat-progress-spinner\n                                        class=\"adf-document-list-loading-margin\"\n                                        [color]=\"'primary'\"\n                                        [mode]=\"'indeterminate'\">\n                                </mat-progress-spinner>\n                            </ng-template>\n                        </adf-loading-content-template>\n                    </adf-datatable>\n                </div>\n                <adf-empty-content\n                        *ngIf=\"!patients\"\n                        icon=\"blur_on\"\n                        [title]=\"'No Patients found'\"\n                        [subtitle]=\"'No Patients matching search criteria or no Patients available'\">\n                </adf-empty-content>\n                <div class=\"row\">\n                    <div class=\"col-md-8\">\n                        <ngb-pagination [collectionSize]=\"totalItems\"\n                                        [(page)]=\"page\"\n                                        [pageSize]=\"itemsPerPage\"\n                                        [maxSize]=\"5\"\n                                        size=\"sm\"\n                                        [rotate]=\"true\"\n                                        [boundaryLinks]=\"true\"\n                                        (pageChange)=\"loadPage(page)\">\n                        </ngb-pagination>\n                    </div>\n                    <div class=\"col-md-4\">\n                        <mat-form-field>\n                            <mat-label>Assignment Filter</mat-label>\n                            <mat-select (selectionChange)=\"assigned($event.value)\">\n                                <mat-option></mat-option>\n                                <mat-option [value]=\"1\">Only assigned clients</mat-option>\n                                <mat-option [value]=\"2\">Only clients not assigned</mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n                </div>\n            </mat-card-content>\n        </mat-card>\n    </div>\n</div>\n"
        }),
        tslib_1.__metadata("design:paramtypes", [CaseManagementService, TdDialogService,
            NotificationService, RxStompService])
    ], PatientListComponent);
    return PatientListComponent;
}());
export { PatientListComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aWVudC5saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xhbWlzLWNsaW5pYy0xLjQuMC8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2Nhc2UtbWFuYWdlbWVudC9wYXRpZW50Lmxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFvQixNQUFNLGVBQWUsQ0FBQztBQUUzRCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx3Q0FBd0MsQ0FBQztBQUM3RSxPQUFPLEVBQUMsb0JBQW9CLEVBQUUsWUFBWSxFQUFFLG1CQUFtQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDM0YsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRS9DLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQXNCbEQ7SUF3QkksOEJBQW9CLE9BQThCLEVBQVUsY0FBK0IsRUFDdkUsbUJBQXdDLEVBQVUsWUFBNEI7UUFEOUUsWUFBTyxHQUFQLE9BQU8sQ0FBdUI7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBaUI7UUFDdkUsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFnQjtRQXhCbEcsaUJBQVksR0FBa0IsRUFBRSxDQUFDO1FBR2pDLGFBQVEsR0FBYyxFQUFFLENBQUM7UUFDekIsZUFBVSxHQUF3QixFQUFFLENBQUM7UUFDckMscUJBQWdCLEdBQXdCLEVBQUUsQ0FBQztRQUMzQyxVQUFLLEdBQXFCLEVBQUUsQ0FBQztRQUM3QixnQkFBVyxHQUFxQixFQUFFLENBQUM7UUFFbkMsV0FBTSxHQUFXLEVBQUUsQ0FBQztRQUtwQixnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUNqQixlQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsU0FBSSxHQUFHLENBQUMsQ0FBQztRQUNULGlCQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLFlB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VCxLQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUI7YUFDaEQsQ0FBQyxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksb0JBQW9CLENBQUM7Z0JBQ2hELEtBQUssRUFBRSxjQUFjO2dCQUNyQixHQUFHLEVBQUUsSUFBSTtnQkFDVCxLQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNO2FBQ2pDLENBQUMsQ0FBQyxDQUFDO1NBQ1A7SUFDTCxDQUFDOztnQkFsUzRCLHFCQUFxQjtnQkFBMEIsZUFBZTtnQkFDbEQsbUJBQW1CO2dCQUF3QixjQUFjOztJQXpCekYsb0JBQW9CO1FBSmhDLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSw4QkFBOEI7WUFDeEMsNnJnQkFBNEM7U0FDL0MsQ0FBQztpREF5QitCLHFCQUFxQixFQUEwQixlQUFlO1lBQ2xELG1CQUFtQixFQUF3QixjQUFjO09BekJ6RixvQkFBb0IsQ0EyVGhDO0lBQUQsMkJBQUM7Q0FBQSxBQTNURCxJQTJUQztTQTNUWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25EZXN0cm95LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDYXNlTWFuYWdlciwgQ2FzZU1hbmFnZXJTdGF0cywgUGF0aWVudH0gZnJvbSAnLi4vLi4vbW9kZWwvY2FzZS1tYW5hZ2VtZW50Lm1vZGVsJztcbmltcG9ydCB7Q2FzZU1hbmFnZW1lbnRTZXJ2aWNlfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jYXNlLW1hbmFnZW1lbnQuc2VydmljZSc7XG5pbXBvcnQge0NhcmRWaWV3SW50SXRlbU1vZGVsLCBDYXJkVmlld0l0ZW0sIE5vdGlmaWNhdGlvblNlcnZpY2V9IGZyb20gJ0BhbGZyZXNjby9hZGYtY29yZSc7XG5pbXBvcnQge1RkRGlhbG9nU2VydmljZX0gZnJvbSAnQGNvdmFsZW50L2NvcmUnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtSeFN0b21wU2VydmljZX0gZnJvbSAnQHN0b21wL25nMi1zdG9tcGpzJztcblxuZXhwb3J0IGludGVyZmFjZSBGaWx0ZXIge1xuICAgIHVwcGVyQWdlTGltaXQ/OiBudW1iZXI7XG4gICAgbG93ZXJBZ2VMaW1pdD86IG51bWJlcjtcbiAgICBwcmVnbmFudD86IGJvb2xlYW47XG4gICAgYnJlYXN0ZmVlZGluZz86IGJvb2xlYW47XG4gICAgbGdhSWQ/OiBudW1iZXI7XG4gICAgZmFjaWxpdHlJZD86IG51bWJlcjtcbiAgICBzdGF0dXM/OiBzdHJpbmc7XG4gICAgZ2VuZGVyPzogc3RyaW5nO1xuICAgIGhvc3BpdGFsTnVtPzogc3RyaW5nO1xuICAgIHBhZ2U/OiBudW1iZXI7XG4gICAgc2l6ZT86IG51bWJlcjtcbiAgICBhc3NpZ25lZD86IGJvb2xlYW47XG4gICAgY2FzZU1hbmFnZXJJZD86IG51bWJlcjtcbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdjYXNlLW1hbmFnZW1lbnQtcGF0aWVudC1saXN0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vcGF0aWVudC5saXN0LmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBQYXRpZW50TGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBjYXNlTWFuYWdlcnM6IENhc2VNYW5hZ2VyW10gPSBbXTtcbiAgICBjYXNlTWFuYWdlcjogQ2FzZU1hbmFnZXI7XG4gICAgYXNzaWduQ2FzZU1hbmFnZXI6IENhc2VNYW5hZ2VyO1xuICAgIHBhdGllbnRzOiBQYXRpZW50W10gPSBbXTtcbiAgICBwcm9wZXJ0aWVzOiBBcnJheTxDYXJkVmlld0l0ZW0+ID0gW107XG4gICAgZ2xvYmFsUHJvcGVydGllczogQXJyYXk8Q2FyZFZpZXdJdGVtPiA9IFtdO1xuICAgIHN0YXRzOiBDYXNlTWFuYWdlclN0YXRzID0ge307XG4gICAgZ2xvYmFsU3RhdHM6IENhc2VNYW5hZ2VyU3RhdHMgPSB7fTtcbiAgICBmYWNpbGl0eUlkOiBudW1iZXI7XG4gICAgZmlsdGVyOiBGaWx0ZXIgPSB7fTtcbiAgICBhZ2VMaW1pdDogbnVtYmVyO1xuICAgIHByZWduYW5jeVN0YXR1czogbnVtYmVyO1xuICAgIHN0YXRlczogYW55W107XG4gICAgbGdhczogYW55W107XG4gICAgaG9zcGl0YWxOdW0gPSAnJztcbiAgICB0b3RhbEl0ZW1zID0gMDtcbiAgICBwYWdlID0gMDtcbiAgICBpdGVtc1BlclBhZ2UgPSAyMDtcbiAgICBsb2FkaW5nID0gdHJ1ZTtcbiAgICBpbml0aWFsaXppbmcgPSB0cnVlO1xuICAgIGZpbHRlckJ5Q2FzZU1hbmFnZXIgPSBmYWxzZTtcbiAgICBwcml2YXRlIHRvcGljU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNlcnZpY2U6IENhc2VNYW5hZ2VtZW50U2VydmljZSwgcHJpdmF0ZSBfZGlhbG9nU2VydmljZTogVGREaWFsb2dTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgbm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSwgcHJpdmF0ZSBzdG9tcFNlcnZpY2U6IFJ4U3RvbXBTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIC8qdGhpcy50b3BpY1N1YnNjcmlwdGlvbiA9IHRoaXMuc3RvbXBTZXJ2aWNlLndhdGNoKCcvdG9waWMvY2FzZS1tYW5hZ2VtZW50Jykuc3Vic2NyaWJlKChtc2c6IE1lc3NhZ2UpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTaW1wIE1lc3NhZ2UnLCBtc2cpO1xuICAgICAgICAgICAgaWYobXNnLmJvZHkgPT09ICdmaW5pc2hlZCcpe1xuICAgICAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6aW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pOyovXG5cbiAgICAgICAgdGhpcy5zZXJ2aWNlLmdldEFjdGl2ZUZhY2lsaXR5KCkuc3Vic2NyaWJlKChmKSA9PiB7XG4gICAgICAgICAgICBpZiAoZikge1xuICAgICAgICAgICAgICAgIHRoaXMuZmFjaWxpdHlJZCA9IGYuaWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLmluaXRDbGllbnRzKGYuaWQpLnN1YnNjcmliZSgocikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRpYWxpemluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlcnZpY2UuZ2V0Q2FzZU1hbmFnZXJzKGYuaWQpLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXNlTWFuYWdlcnMgPSByZXMuZmlsdGVyKGMgPT4gYy5hY3RpdmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVMaXN0KCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLmdldENhc2VNYW5hZ2VyU3RhdHMoMCwgZi5pZCkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdHMgPSByZXM7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVpbGRTdGF0cygpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zZXJ2aWNlLmdldFN0YXRlcygpLnN1YnNjcmliZShyZXMgPT4gdGhpcy5zdGF0ZXMgPSByZXMpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICAvLyB0aGlzLnRvcGljU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgY2xlYXJIb3NwaXRhbE51bSgpIHtcbiAgICAgICAgdGhpcy5ob3NwaXRhbE51bSA9IG51bGw7XG4gICAgICAgIHRoaXMuZmlsdGVyWydob3NwaXRhbE51bSddID0gbnVsbDtcbiAgICAgICAgdGhpcy5wYWdlID0gMDtcbiAgICB9XG5cbiAgICBzZWFyY2goKSB7XG4gICAgICAgIHRoaXMucGFnZSA9IDA7XG4gICAgICAgIHRoaXMudXBkYXRlTGlzdCgpO1xuICAgIH1cblxuICAgIGFzc2lnbkNsaWVudHMoKSB7XG4gICAgICAgIHRoaXMuX2RpYWxvZ1NlcnZpY2Uub3BlbkNvbmZpcm0oe1xuICAgICAgICAgICAgdGl0bGU6ICdDb25maXJtJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdEbyB5b3Ugd2FudCB0byBhc3NpZ24gc2VsZWN0ZWQgY2xpZW50cyB0byB0aGUgc2VsZWN0ZWQgQ2FzZSBNYW5hZ2VyPycsXG4gICAgICAgICAgICBjYW5jZWxCdXR0b246ICdObycsXG4gICAgICAgICAgICBhY2NlcHRCdXR0b246ICdZZXMnLFxuICAgICAgICAgICAgd2lkdGg6ICc1MDBweCcsXG4gICAgICAgIH0pLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKChhY2NlcHQ6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgIGlmIChhY2NlcHQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXRpZW50SWRzID0gdGhpcy5wYXRpZW50cy5maWx0ZXIocCA9PiBwLnNlbGVjdGVkKVxuICAgICAgICAgICAgICAgICAgICAubWFwKHAgPT4gcC5pZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLmFzc2lnblRvQ2FzZU1hbmFnZXIodGhpcy5hc3NpZ25DYXNlTWFuYWdlci5pZCwgcGF0aWVudElkcykuc3Vic2NyaWJlKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVMaXN0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlcnZpY2UuZ2V0Q2FzZU1hbmFnZXJTdGF0cyh0aGlzLmNhc2VNYW5hZ2VyLmlkLCB0aGlzLmZhY2lsaXR5SWQpLnN1YnNjcmliZShyZXMxID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRzID0gcmVzMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1aWxkU3RhdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnNob3dFcnJvcignRXJyb3IgYXNzaWduaW5nIGNsaWVudHMsIHBsZWFzZSB0cnkgYWdhaW4nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBETyBTT01FVEhJTkcgRUxTRVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkZUFzc2lnbkNsaWVudHMoKSB7XG4gICAgICAgIHRoaXMuX2RpYWxvZ1NlcnZpY2Uub3BlbkNvbmZpcm0oe1xuICAgICAgICAgICAgdGl0bGU6ICdDb25maXJtJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdEbyB5b3Ugd2FudCB0byBkZS1hc3NpZ24gc2VsZWN0ZWQgY2xpZW50cz8nLFxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uOiAnTm8nLFxuICAgICAgICAgICAgYWNjZXB0QnV0dG9uOiAnWWVzJyxcbiAgICAgICAgICAgIHdpZHRoOiAnNTAwcHgnLFxuICAgICAgICB9KS5hZnRlckNsb3NlZCgpLnN1YnNjcmliZSgoYWNjZXB0OiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgICBpZiAoYWNjZXB0KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGF0aWVudElkcyA9IHRoaXMucGF0aWVudHMuZmlsdGVyKHAgPT4gcC5zZWxlY3RlZClcbiAgICAgICAgICAgICAgICAgICAgLm1hcChwID0+IHAuaWQpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VydmljZS5kZUFzc2lnbkNsaWVudHMocGF0aWVudElkcykuc3Vic2NyaWJlKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVMaXN0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlcnZpY2UuZ2V0Q2FzZU1hbmFnZXJTdGF0cyh0aGlzLmNhc2VNYW5hZ2VyLmlkLCB0aGlzLmZhY2lsaXR5SWQpLnN1YnNjcmliZShyZXMxID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRzID0gcmVzMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1aWxkU3RhdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnNob3dFcnJvcignRXJyb3IgZGUtYXNzaWduaW5nIGNsaWVudHMsIHBsZWFzZSB0cnkgYWdhaW4nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBETyBTT01FVEhJTkcgRUxTRVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZWxlY3Rpb25zKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXRpZW50cyAmJiAhIXRoaXMucGF0aWVudHMuZmluZChwID0+IHAuc2VsZWN0ZWQpO1xuICAgIH1cblxuICAgIGxvYWRQYWdlKHBhZ2UpIHtcbiAgICAgICAgdGhpcy5wYWdlID0gcGFnZTtcbiAgICAgICAgdGhpcy51cGRhdGVMaXN0KCk7XG4gICAgfVxuXG4gICAgc2VsZWN0KGV2ZW50KSB7XG4gICAgICAgIHRoaXMucGF0aWVudHMgPSB0aGlzLnBhdGllbnRzLm1hcChwID0+IHtcbiAgICAgICAgICAgIGlmIChwLmlkID09PSBldmVudC5vYmouaWQpIHtcbiAgICAgICAgICAgICAgICBwLnNlbGVjdGVkID0gIXAuc2VsZWN0ZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2FzZU1hbmFnZXJDaGFuZ2VkKCkge1xuICAgICAgICBpZiAoIXRoaXMuY2FzZU1hbmFnZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdHMgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VydmljZS5nZXRDYXNlTWFuYWdlclN0YXRzKHRoaXMuY2FzZU1hbmFnZXIuaWQsIHRoaXMuZmFjaWxpdHlJZCkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICB0aGlzLnN0YXRzID0gcmVzO1xuICAgICAgICAgICAgdGhpcy5idWlsZFN0YXRzKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodGhpcy5maWx0ZXJCeUNhc2VNYW5hZ2VyKSB7XG4gICAgICAgICAgICB0aGlzLmZpbHRlclsnY2FzZU1hbmFnZXJJZCddID0gdGhpcy5jYXNlTWFuYWdlci5pZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyWydjYXNlTWFuYWdlcklkJ10gPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlTGlzdCgpO1xuICAgIH1cblxuICAgIHVwZGF0ZUxpc3QoKSB7XG4gICAgICAgIGlmICh0aGlzLmhvc3BpdGFsTnVtKSB7XG4gICAgICAgICAgICB0aGlzLmZpbHRlci5ob3NwaXRhbE51bSA9IHRoaXMuaG9zcGl0YWxOdW07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5maWx0ZXJbJ2ZhY2lsaXR5SWQnXSA9IHRoaXMuZmFjaWxpdHlJZDtcbiAgICAgICAgdGhpcy5maWx0ZXJbJ3NpemUnXSA9IHRoaXMuaXRlbXNQZXJQYWdlO1xuICAgICAgICB0aGlzLmZpbHRlclsncGFnZSddID0gdGhpcy5wYWdlID4gMCA/IHRoaXMucGFnZSAtIDEgOiAwO1xuICAgICAgICBpZiAodGhpcy5maWx0ZXJCeUNhc2VNYW5hZ2VyKSB7XG4gICAgICAgICAgICB0aGlzLmZpbHRlclsnY2FzZU1hbmFnZXJJZCddID0gdGhpcy5jYXNlTWFuYWdlci5pZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyWydjYXNlTWFuYWdlcklkJ10gPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuc2VydmljZS5nZXRDbGllbnRMaXN0KHRoaXMuZmlsdGVyKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICAgIGlmIChyZXMuYm9keSkge1xuICAgICAgICAgICAgICAgIHRoaXMucGF0aWVudHMgPSByZXMuYm9keS5tYXAocCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNhc2VNYW5hZ2VyID0gdGhpcy5jYXNlTWFuYWdlcnMuZmluZChjID0+IGMuaWQgPT09IHAuY2FzZU1hbmFnZXJJZCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjYXNlTWFuYWdlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcC5jYXNlTWFuYWdlciA9IGNhc2VNYW5hZ2VyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMudG90YWxJdGVtcyA9ICg8YW55PnJlcy5oZWFkZXJzKS5nZXQoJ1gtVG90YWwtQ291bnQnKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlcnZpY2UuZ2V0Q2FzZU1hbmFnZXJTdGF0cygwLCB0aGlzLmZhY2lsaXR5SWQpLnN1YnNjcmliZShyZXMxID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nbG9iYWxTdGF0cyA9IHJlczE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVpbGRHbG9iYWxTdGF0cygpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFnZUdyb3VwQ2hhbmdlZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuYWdlTGltaXQgPT09IDkpIHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyWydsb3dlckFnZUxpbWl0J10gPSAwO1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJbJ3VwcGVyQWdlTGltaXQnXSA9IDk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5hZ2VMaW1pdCA9PT0gMTQpIHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyWydsb3dlckFnZUxpbWl0J10gPSAxMDtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyWyd1cHBlckFnZUxpbWl0J10gPSAxNDtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmFnZUxpbWl0ID09PSAxOSkge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJbJ2xvd2VyQWdlTGltaXQnXSA9IDE1O1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJbJ3VwcGVyQWdlTGltaXQnXSA9IDE5O1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYWdlTGltaXQgPT09IDI0KSB7XG4gICAgICAgICAgICB0aGlzLmZpbHRlclsnbG93ZXJBZ2VMaW1pdCddID0gMjA7XG4gICAgICAgICAgICB0aGlzLmZpbHRlclsndXBwZXJBZ2VMaW1pdCddID0gMjQ7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5hZ2VMaW1pdCA9PT0gMTAwKSB7XG4gICAgICAgICAgICB0aGlzLmZpbHRlclsnbG93ZXJBZ2VMaW1pdCddID0gMjU7XG4gICAgICAgICAgICB0aGlzLmZpbHRlclsndXBwZXJBZ2VMaW1pdCddID0gMTAwO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5hZ2VMaW1pdCkge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJbJ2xvd2VyQWdlTGltaXQnXSA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmZpbHRlclsndXBwZXJBZ2VMaW1pdCddID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZUxpc3QoKTtcbiAgICB9XG5cbiAgICBwcmVnbmFuY3lTdGF0dXNDaGFuZ2VkKCkge1xuICAgICAgICBpZiAodGhpcy5wcmVnbmFuY3lTdGF0dXMgPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyWydwcmVnbmFudCddID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByZWduYW5jeVN0YXR1cyA9PT0gMikge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJbJ2JyZWFzdGZlZWRpbmcnXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLnByZWduYW5jeVN0YXR1cykge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJbJ3ByZWduYW50J10gPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJbJ2JyZWFzdGZlZWRpbmcnXSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGVMaXN0KCk7XG4gICAgfVxuXG4gICAgc3RhdGVDaGFuZ2VkKGlkKSB7XG4gICAgICAgIGlmIChpZCkge1xuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLmdldExnYXNCeVN0YXRlKGlkKS5zdWJzY3JpYmUocmVzID0+IHRoaXMubGdhcyA9IHJlcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3NpZ25lZCh2YWwpIHtcbiAgICAgICAgaWYgKHZhbCA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXIuYXNzaWduZWQgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKHZhbCA9PT0gMikge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXIuYXNzaWduZWQgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyLmFzc2lnbmVkID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZUxpc3QoKTtcbiAgICB9XG5cbiAgICBsZ2FDaGFuZ2VkKGlkKSB7XG4gICAgICAgIGlmIChpZCkge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXIubGdhSWQgPSBpZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyLmxnYUlkID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZUxpc3QoKTtcbiAgICB9XG5cbiAgICBidWlsZFN0YXRzKCkge1xuICAgICAgICB0aGlzLnByb3BlcnRpZXMgPSBbXTtcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3SW50SXRlbU1vZGVsKHtcbiAgICAgICAgICAgIGxhYmVsOiAnQ2xpZW50cyhzKSBBc3NpZ25lZCcsXG4gICAgICAgICAgICBrZXk6ICdhcycsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5zdGF0cy5hc3NpZ25lZFxuICAgICAgICB9KSk7XG4gICAgICAgIHRoaXMucHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld0ludEl0ZW1Nb2RlbCh7XG4gICAgICAgICAgICBsYWJlbDogJ1N0YWJsZSAxIFllYXInLFxuICAgICAgICAgICAga2V5OiAnYXMnLFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMuc3RhdHMuc3RhYmxlXG4gICAgICAgIH0pKTtcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3SW50SXRlbU1vZGVsKHtcbiAgICAgICAgICAgIGxhYmVsOiAnVW5zdGFibGUgbGVzcyB0aGFuIDEgWWVhcicsXG4gICAgICAgICAgICBrZXk6ICdhcycsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5zdGF0cy51bnN0YWJsZUxlc3NUaGFuMXllYXJcbiAgICAgICAgfSkpO1xuICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdJbnRJdGVtTW9kZWwoe1xuICAgICAgICAgICAgbGFiZWw6ICdVbnN0YWJsZSBtb3JlIHRoYW4gMSBZZWFyJyxcbiAgICAgICAgICAgIGtleTogJ2FzJyxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnN0YXRzLnVuc3RhYmxlTW9yZVRoYW4xWWVhclxuICAgICAgICB9KSk7XG4gICAgICAgIHRoaXMucHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld0ludEl0ZW1Nb2RlbCh7XG4gICAgICAgICAgICBsYWJlbDogJ0F3YWl0aW5nIEFSVCcsXG4gICAgICAgICAgICBrZXk6ICdhcycsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5zdGF0cy5wcmVBcnRcbiAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIGJ1aWxkR2xvYmFsU3RhdHMoKSB7XG4gICAgICAgIHRoaXMuZ2xvYmFsUHJvcGVydGllcyA9IFtdO1xuICAgICAgICBpZiAodGhpcy5nbG9iYWxTdGF0cykge1xuICAgICAgICAgICAgdGhpcy5nbG9iYWxQcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3SW50SXRlbU1vZGVsKHtcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0NsaWVudHMocykgQXNzaWduZWQnLFxuICAgICAgICAgICAgICAgIGtleTogJ2FzJyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5nbG9iYWxTdGF0cy5hc3NpZ25lZFxuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgdGhpcy5nbG9iYWxQcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3SW50SXRlbU1vZGVsKHtcbiAgICAgICAgICAgICAgICBsYWJlbDogJ1N0YWJsZSAxIFllYXInLFxuICAgICAgICAgICAgICAgIGtleTogJ2FzJyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5nbG9iYWxTdGF0cy5zdGFibGVcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIHRoaXMuZ2xvYmFsUHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld0ludEl0ZW1Nb2RlbCh7XG4gICAgICAgICAgICAgICAgbGFiZWw6ICdVbnN0YWJsZSBsZXNzIHRoYW4gMSBZZWFyJyxcbiAgICAgICAgICAgICAgICBrZXk6ICdhcycsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuZ2xvYmFsU3RhdHMudW5zdGFibGVMZXNzVGhhbjF5ZWFyXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB0aGlzLmdsb2JhbFByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdJbnRJdGVtTW9kZWwoe1xuICAgICAgICAgICAgICAgIGxhYmVsOiAnVW5zdGFibGUgbW9yZSB0aGFuIDEgWWVhcicsXG4gICAgICAgICAgICAgICAga2V5OiAnYXMnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLmdsb2JhbFN0YXRzLnVuc3RhYmxlTW9yZVRoYW4xWWVhclxuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgdGhpcy5nbG9iYWxQcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3SW50SXRlbU1vZGVsKHtcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0F3YWl0aW5nIEFSVCcsXG4gICAgICAgICAgICAgICAga2V5OiAnYXMnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLmdsb2JhbFN0YXRzLnByZUFydFxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19