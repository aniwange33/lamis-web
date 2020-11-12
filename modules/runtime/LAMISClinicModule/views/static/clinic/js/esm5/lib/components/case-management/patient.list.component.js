import * as tslib_1 from "tslib";
import {Component} from '@angular/core';
import {CaseManagementService} from '../../services/case-management.service';
import {CardViewIntItemModel, CardViewItem, NotificationService} from '@alfresco/adf-core';
import {TdDialogService} from '@covalent/core';
import {RxStompService} from '@stomp/ng2-stompjs';

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
                        _this.caseManagers = res;
                        _this.updateList();
                    });
                });
                _this.service.getCaseManagerStats(0, f.id).subscribe(function (res) {
                    _this.stats = res;
                    _this.buildStats();
                });
            }
        });
        this.service.getStates().subscribe(function (res) {
            return _this.states = res;
        });
    };
    PatientListComponent.prototype.ngOnDestroy = function () {
        //this.topicSubscription.unsubscribe();
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
                var patientIds = _this.patients.filter(function (p) {
                    return p.selected;
                })
                    .map(function (p) {
                        return p.id;
                    });
                _this.service.assignToCaseManager(_this.caseManager.id, patientIds).subscribe(function (res) {
                    if (res.ok) {
                        _this.updateList();
                        _this.service.getCaseManagerStats(_this.caseManager.id, _this.facilityId).subscribe(function (res) {
                            _this.stats = res;
                            _this.buildStats();
                        });
                    } else {
                        _this.notificationService.showError('Error assigning clients, please try again');
                    }
                });
            } else {
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
                var patientIds = _this.patients.filter(function (p) {
                    return p.selected;
                })
                    .map(function (p) {
                        return p.id;
                    });
                _this.service.deAssignClients(patientIds).subscribe(function (res) {
                    if (res.ok) {
                        _this.updateList();
                        _this.service.getCaseManagerStats(_this.caseManager.id, _this.facilityId).subscribe(function (res) {
                            _this.stats = res;
                            _this.buildStats();
                        });
                    } else {
                        _this.notificationService.showError('Error de-assigning clients, please try again');
                    }
                });
            } else {
                // DO SOMETHING ELSE
            }
        });
    };
    PatientListComponent.prototype.selections = function () {
        return this.patients && !!this.patients.find(function (p) {
            return p.selected;
        });
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
    };
    PatientListComponent.prototype.updateList = function () {
        var _this = this;
        if (this.hospitalNum) {
            this.filter.hospitalNum = this.hospitalNum;
        }
        this.filter['facilityId'] = this.facilityId;
        this.filter['size'] = this.itemsPerPage;
        this.filter['page'] = this.page > 0 ? this.page - 1 : 0;
        this.loading = true;
        this.service.getClientList(this.filter).subscribe(function (res) {
            if (res.body) {
                _this.patients = res.body.map(function (p) {
                    var caseManager = _this.caseManagers.find(function (c) {
                        return c.id === p.caseManagerId;
                    });
                    if (caseManager) {
                        p.caseManager = caseManager;
                    }
                    return p;
                });
                _this.totalItems = res.headers.get('X-Total-Count');
                _this.service.getCaseManagerStats(0, _this.facilityId).subscribe(function (res) {
                    _this.globalStats = res;
                    _this.buildGlobalStats();
                });
            }
            _this.loading = false;
        });
    };
    PatientListComponent.prototype.ageGroupChanged = function () {
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
    };
    PatientListComponent.prototype.pregnancyStatusChanged = function () {
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
    };
    PatientListComponent.prototype.stateChanged = function (id) {
        var _this = this;
        if (id) {
            this.service.getLgasByState(id).subscribe(function (res) {
                return _this.lgas = res;
            });
        }
    };
    PatientListComponent.prototype.assigned = function (val) {
        if (val == 1) {
            this.filter.assigned = true;
        } else if (val == 2) {
            this.filter.assigned = false;
        } else {
            this.filter.assigned = null;
        }
        this.updateList();
    };
    PatientListComponent.prototype.lgaChanged = function (id) {
        if (id) {
            this.filter.lgaId = id;
        } else {
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
    PatientListComponent.ctorParameters = function () {
        return [
            {type: CaseManagementService},
            {type: TdDialogService},
            {type: NotificationService},
            {type: RxStompService}
        ];
    };
    PatientListComponent = tslib_1.__decorate([
        Component({
            selector: 'case-management-patient-list',
            template: "<div class=\"layout\">\n    <div class=\"list-container\">\n        <mat-card>\n            <mat-card-content>\n                <div class=\"row\">\n                    <div class=\"col-md-6\">\n                        <mat-form-field class=\"full-width\">\n                            <mat-label>Facility Case Manager:</mat-label>\n                            <mat-select [(ngModel)]=\"caseManager\" name=\"caseManager\"\n                                        (selectionChange)=\"caseManagerChanged()\">\n                                <mat-option></mat-option>\n                                <mat-option *ngFor=\"let c of caseManagers\" [value]=\"c\">{{c.name}}\n                                </mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n                    <div class=\"col-md-6\">\n                        <div *ngIf=\"caseManager\">\n                            <div class=\"row\">\n                                <div class=\"col-md-2\">\n                                    Clients(s) Assigned:\n                                </div>\n                                <div class=\"col-md-2\">\n                                    {{stats.assigned | number: '1.'}}\n                                </div>\n                                <div class=\"col-md-2\">\n                                    Stable 1 Year:\n                                </div>\n                                <div class=\"col-md-2\">\n                                    {{stats.stable | number: '1.'}}\n                                </div>\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col-md-2\">\n                                    Unstable less than 1 Year:\n                                </div>\n                                <div class=\"col-md-2\">\n                                    {{stats.unstableLessThan1year | number: '1.'}}\n                                </div>\n                                <div class=\"col-md-2\">\n                                    Unstable more than 1 Year:\n                                </div>\n                                <div class=\"col-md-2\">\n                                    {{stats.unstableMoreThan1Year | number: '1.'}}\n                                </div>\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col-md-2\">\n                                    Awaiting ART:\n                                </div>\n                                <div class=\"col-md-2\">\n                                    {{stats.preArt | number: '1.'}}\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <h5> Demographic/Clinic filters</h5>\n                <p></p>\n                <div class=\"row\">\n                    <div class=\"col-md-6\">\n                        <mat-form-field class=\"full-width\">\n                            <mat-label>Client Categorization</mat-label>\n                            <mat-select name=\"categoryId\" [(ngModel)]=\"filter.status\" (selectionChange)=\"updateList()\">\n                                <mat-option>--All--</mat-option>\n                                <mat-option value='STABLE'>Stable One Year</mat-option>\n                                <mat-option value='UNSTABLE_LESS_THAN_1_YEAR'>Unstable less than One Year</mat-option>\n                                <mat-option value='UNSTABLE_MORE_THAN_1_YEAR'>Unstable One Year or more</mat-option>\n                                <mat-option value='PRE_ART'>Awaiting ART</mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n                    <div class=\"col-md-6\">\n                        <mat-form-field class=\"full-width\">\n                            <mat-label>Age Group</mat-label>\n                            <mat-select name=\"ageGroup\" [(ngModel)]=\"ageLimit\" (selectionChange)=\"ageGroupChanged()\">\n                                <mat-option>--All--</mat-option>\n                                <mat-option value='9'>Children (0-9 Years)</mat-option>\n                                <mat-option value='14'>Younger Adolescent (10 to 14 Years)</mat-option>\n                                <mat-option value='19'>Older Adolescent (15 to 19 Years)</mat-option>\n                                <mat-option value='24'>Young People (20 to 24 Years)</mat-option>\n                                <mat-option value='100'>Adults (25 and Above)</mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"col-md-6\">\n                        <mat-form-field class=\"full-width\">\n                            <mat-label>Gender</mat-label>\n                            <mat-select name=\"gender\" [(ngModel)]=\"filter.gender\" (selectionChange)=\"updateList()\">\n                                <mat-option>--All--</mat-option>\n                                <mat-option [value]=\"'FEMALE'\">Female</mat-option>\n                                <mat-option [value]=\"'MALE'\">Male</mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n                    <div class=\"col-md-6\">\n                        <mat-form-field class=\"full-width\">\n                            <mat-label>Pregnancy Status</mat-label>\n                            <mat-select name=\"pregnancyStatus\" [(ngModel)]=\"pregnancyStatus\"\n                                        (selectionChange)=\"pregnancyStatusChanged()\">\n                                <mat-option>--All--</mat-option>\n                                <mat-option value='1'>Pregnant</mat-option>\n                                <mat-option value='2'>Breastfeeding</mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"col-md-6\">\n                        <mat-form-field class=\"full-width\">\n                            <mat-label>State of Residence</mat-label>\n                            <mat-select name=\"state\" (selectionChange)=\"stateChanged($event.value.id)\">\n                                <mat-option></mat-option>\n                                <mat-option *ngFor=\"let state of states\" [value]=\"state\">{{state.name}}</mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n                    <div class=\"col-md-6\">\n                        <mat-form-field class=\"full-width\">\n                            <mat-label>LGA of Residence</mat-label>\n                            <mat-select name=\"lga\" (selectionChange)=\"lgaChanged($event.value.id)\">\n                                <mat-option></mat-option>\n                                <mat-option *ngFor=\"let lga of lgas\" [value]=\"lga\">{{lga.name}}</mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n                </div>\n                <div *ngIf=\"patients?.length\">\n                    <div class=\"row\">\n                        <div class=\"col-md-2\">\n                            Clients(s) Assigned:\n                        </div>\n                        <div class=\"col-md-2\">\n                            {{globalStats.assigned | number: '1.'}}\n                        </div>\n                        <div class=\"col-md-2\">\n                            Stable 1 Year:\n                        </div>\n                        <div class=\"col-md-2\">\n                            {{globalStats.stable | number: '1.'}}\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-2\">\n                            Unstable less than 1 Year:\n                        </div>\n                        <div class=\"col-md-2\">\n                            {{globalStats.unstableLessThan1year | number: '1.'}}\n                        </div>\n                        <div class=\"col-md-2\">\n                            Unstable more than 1 Year:\n                        </div>\n                        <div class=\"col-md-2\">\n                            {{globalStats.unstableMoreThan1Year | number: '1.'}}\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-2\">\n                            Awaiting ART:\n                        </div>\n                        <div class=\"col-md-2\">\n                            {{globalStats.preArt | number: '1.'}}\n                        </div>\n                    </div>\n                </div>\n                <div>\n                    <div class=\"row\">\n                        <div class=\"col-md-8 col-md-offset-4\">\n                            <div class=\"adf-toolbar--spacer\"></div>\n                            <td-search-box backIcon=\"arrow_back\" class=\"push-right-sm\"\n                                           placeholder=\"Search hospital number\" [debounce]=\"500\"\n                                           [(ngModel)]=\"hospitalNum\"\n                                           (searchDebounce)=\"search()\"\n                                           (search)=\"search()\"\n                                           (clear)=\"clearHospitalNum()\" flex>\n                            </td-search-box>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-sm-1 col-sm-offset-11\">\n                            <button mat-raised-button color=\"primary\"\n                                    *ngIf=\"caseManager && selections()\"\n                                    (click)=\"assignClients()\">Assign to Case Manager\n                            </button>\n                            <button mat-raised-button color=\"primary\" *ngIf=\"selections()\"\n                                    (click)=\"deAssignClients()\">De-assign Client(s)\n                            </button>\n                        </div>\n                    </div>\n                    <mat-progress-spinner\n                            *ngIf=\"initializing\"\n                            class=\"adf-document-list-loading-margin\"\n                            [color]=\"'primary'\"\n                            [mode]=\"'indeterminate'\">\n                    </mat-progress-spinner>\n                    <adf-datatable *ngIf=\"patients || loading\"\n                                   [rows]=\"patients\"\n                                   (rowClick)=\"select($event.value)\">\n                        <data-columns>\n                            <data-column key=\"selected\" title=\"\">\n                                <ng-template let-context=\"$implicit\">\n                                    <mat-checkbox [checked]=\"context.row.getValue('selected')\"></mat-checkbox>\n                                </ng-template>\n                            </data-column>\n                            <data-column key=\"name\" title=\"Name\" sortable=\"true\"></data-column>\n                            <data-column key=\"hospitalNum\" title=\"Hospital Number\" sortable=\"true\"></data-column>\n                            <data-column key=\"gender\" title=\"Gender\" sortable=\"true\">\n                                <ng-template let-context=\"$implicit\">\n                                    {{context.row.getValue('gender') === 'MALE' ? 'Male' : context.row.getValue('gender') === 'FEMALE' ? 'Female' : ''}}\n                                </ng-template>\n                            </data-column>\n                            <data-column key=\"dateBirth\" title=\"Date of Birth\" sortable=\"true\">\n                                <ng-template let-context=\"$implicit\">\n                                    {{context.row.getValue('dateBirth') | date: 'dd MMM, yyyy'}}\n                                </ng-template>\n                            </data-column>\n                            <data-column key=\"address\" title=\"Address\" class=\"full-width ellipsis-cell\"></data-column>\n                            <data-column key=\"currentStatus\" title=\"ART Status\" sortable=\"true\"></data-column>\n                            <data-column key=\"caseManager.name\" title=\"Assigned to\" sortable=\"true\"></data-column>\n                        </data-columns>\n                        <adf-loading-content-template>\n                            <ng-template>\n                                <mat-progress-spinner\n                                        class=\"adf-document-list-loading-margin\"\n                                        [color]=\"'primary'\"\n                                        [mode]=\"'indeterminate'\">\n                                </mat-progress-spinner>\n                            </ng-template>\n                        </adf-loading-content-template>\n                    </adf-datatable>\n                </div>\n                <adf-empty-content\n                        *ngIf=\"!patients\"\n                        icon=\"blur_on\"\n                        [title]=\"'No Patients found'\"\n                        [subtitle]=\"'No Patients matching search criteria or no Patients available'\">\n                </adf-empty-content>\n                <div class=\"row\">\n                    <div class=\"col-md-8\">\n                        <ngb-pagination [collectionSize]=\"totalItems\"\n                                        [(page)]=\"page\"\n                                        [pageSize]=\"itemsPerPage\"\n                                        [maxSize]=\"5\"\n                                        size=\"sm\"\n                                        [rotate]=\"true\"\n                                        [boundaryLinks]=\"true\"\n                                        (pageChange)=\"loadPage(page)\">\n                        </ngb-pagination>\n                    </div>\n                    <div class=\"col-md-4\">\n                        <mat-form-field>\n                            <mat-label>Assignment Filter</mat-label>\n                            <mat-select (selectionChange)=\"assigned($event.value)\">\n                                <mat-option></mat-option>\n                                <mat-option [value]=\"1\">Only assigned clients</mat-option>\n                                <mat-option [value]=\"2\">Only clients not assigned</mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n                </div>\n            </mat-card-content>\n        </mat-card>\n    </div>\n</div>\n"
        }),
        tslib_1.__metadata("design:paramtypes", [CaseManagementService, TdDialogService,
            NotificationService, RxStompService])
    ], PatientListComponent);
    return PatientListComponent;
}());
export {PatientListComponent};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aWVudC5saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xhbWlzLWNsaW5pYy0xLjEuMy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2Nhc2UtbWFuYWdlbWVudC9wYXRpZW50Lmxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUU3RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUMvRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsWUFBWSxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDN0YsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWpELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQXNCcEQ7SUFzQkksOEJBQW9CLE9BQThCLEVBQVUsY0FBK0IsRUFDdkUsbUJBQXdDLEVBQVUsWUFBNEI7UUFEOUUsWUFBTyxHQUFQLE9BQU8sQ0FBdUI7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBaUI7UUFDdkUsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFnQjtRQXRCbEcsaUJBQVksR0FBa0IsRUFBRSxDQUFDO1FBRWpDLGFBQVEsR0FBYyxFQUFFLENBQUM7UUFDekIsZUFBVSxHQUF3QixFQUFFLENBQUM7UUFDckMscUJBQWdCLEdBQXdCLEVBQUUsQ0FBQztRQUMzQyxVQUFLLEdBQXFCLEVBQUUsQ0FBQztRQUM3QixnQkFBVyxHQUFxQixFQUFFLENBQUM7UUFFbkMsV0FBTSxHQUFXLEVBQUUsQ0FBQztRQUtwQixnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUN6QixlQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsU0FBSSxHQUFHLENBQUMsQ0FBQztRQUNULGlCQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLFlB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U0E5U1ksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FzZU1hbmFnZXIsIENhc2VNYW5hZ2VyU3RhdHMsIFBhdGllbnQgfSBmcm9tICcuLi8uLi9tb2RlbC9jYXNlLW1hbmFnZW1lbnQubW9kZWwnO1xuaW1wb3J0IHsgQ2FzZU1hbmFnZW1lbnRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvY2FzZS1tYW5hZ2VtZW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2FyZFZpZXdJbnRJdGVtTW9kZWwsIENhcmRWaWV3SXRlbSwgTm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gJ0BhbGZyZXNjby9hZGYtY29yZSc7XG5pbXBvcnQgeyBUZERpYWxvZ1NlcnZpY2UgfSBmcm9tICdAY292YWxlbnQvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFJ4U3RvbXBTZXJ2aWNlIH0gZnJvbSAnQHN0b21wL25nMi1zdG9tcGpzJztcbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tIFwiQHN0b21wL3N0b21wanNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBGaWx0ZXIge1xuICAgIHVwcGVyQWdlTGltaXQ/OiBudW1iZXI7XG4gICAgbG93ZXJBZ2VMaW1pdD86IG51bWJlcjtcbiAgICBwcmVnbmFudD86IGJvb2xlYW47XG4gICAgYnJlYXN0ZmVlZGluZz86IGJvb2xlYW47XG4gICAgbGdhSWQ/OiBudW1iZXI7XG4gICAgZmFjaWxpdHlJZD86IG51bWJlcjtcbiAgICBzdGF0dXM/OiBzdHJpbmc7XG4gICAgZ2VuZGVyPzogc3RyaW5nO1xuICAgIGhvc3BpdGFsTnVtPzogc3RyaW5nO1xuICAgIHBhZ2U/OiBudW1iZXI7XG4gICAgc2l6ZT86IG51bWJlcjtcbiAgICBhc3NpZ25lZD86IGJvb2xlYW47XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnY2FzZS1tYW5hZ2VtZW50LXBhdGllbnQtbGlzdCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3BhdGllbnQubGlzdC5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgUGF0aWVudExpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgY2FzZU1hbmFnZXJzOiBDYXNlTWFuYWdlcltdID0gW107XG4gICAgY2FzZU1hbmFnZXI6IENhc2VNYW5hZ2VyO1xuICAgIHBhdGllbnRzOiBQYXRpZW50W10gPSBbXTtcbiAgICBwcm9wZXJ0aWVzOiBBcnJheTxDYXJkVmlld0l0ZW0+ID0gW107XG4gICAgZ2xvYmFsUHJvcGVydGllczogQXJyYXk8Q2FyZFZpZXdJdGVtPiA9IFtdO1xuICAgIHN0YXRzOiBDYXNlTWFuYWdlclN0YXRzID0ge307XG4gICAgZ2xvYmFsU3RhdHM6IENhc2VNYW5hZ2VyU3RhdHMgPSB7fTtcbiAgICBmYWNpbGl0eUlkOiBudW1iZXI7XG4gICAgZmlsdGVyOiBGaWx0ZXIgPSB7fTtcbiAgICBhZ2VMaW1pdDogbnVtYmVyO1xuICAgIHByZWduYW5jeVN0YXR1czogbnVtYmVyO1xuICAgIHN0YXRlczogYW55W107XG4gICAgbGdhczogYW55W107XG4gICAgaG9zcGl0YWxOdW06IHN0cmluZyA9ICcnO1xuICAgIHRvdGFsSXRlbXMgPSAwO1xuICAgIHBhZ2UgPSAwO1xuICAgIGl0ZW1zUGVyUGFnZSA9IDIwO1xuICAgIGxvYWRpbmcgPSB0cnVlO1xuICAgIGluaXRpYWxpemluZyA9IHRydWU7XG4gICAgcHJpdmF0ZSB0b3BpY1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzZXJ2aWNlOiBDYXNlTWFuYWdlbWVudFNlcnZpY2UsIHByaXZhdGUgX2RpYWxvZ1NlcnZpY2U6IFRkRGlhbG9nU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIG5vdGlmaWNhdGlvblNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UsIHByaXZhdGUgc3RvbXBTZXJ2aWNlOiBSeFN0b21wU2VydmljZSkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICAvKnRoaXMudG9waWNTdWJzY3JpcHRpb24gPSB0aGlzLnN0b21wU2VydmljZS53YXRjaCgnL3RvcGljL2Nhc2UtbWFuYWdlbWVudCcpLnN1YnNjcmliZSgobXNnOiBNZXNzYWdlKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnU2ltcCBNZXNzYWdlJywgbXNnKTtcbiAgICAgICAgICAgIGlmKG1zZy5ib2R5ID09PSAnZmluaXNoZWQnKXtcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRpYWxpemluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTsqL1xuXG4gICAgICAgIHRoaXMuc2VydmljZS5nZXRBY3RpdmVGYWNpbGl0eSgpLnN1YnNjcmliZSgoZikgPT4ge1xuICAgICAgICAgICAgaWYgKGYpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZhY2lsaXR5SWQgPSBmLmlkO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VydmljZS5pbml0Q2xpZW50cyhmLmlkKS5zdWJzY3JpYmUoKHIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0aWFsaXppbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLmdldENhc2VNYW5hZ2VycyhmLmlkKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FzZU1hbmFnZXJzID0gcmVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVMaXN0KClcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNlcnZpY2UuZ2V0Q2FzZU1hbmFnZXJTdGF0cygwLCBmLmlkKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0cyA9IHJlcztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idWlsZFN0YXRzKCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc2VydmljZS5nZXRTdGF0ZXMoKS5zdWJzY3JpYmUocmVzID0+IHRoaXMuc3RhdGVzID0gcmVzKVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICAvL3RoaXMudG9waWNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBjbGVhckhvc3BpdGFsTnVtKCkge1xuICAgICAgICB0aGlzLmhvc3BpdGFsTnVtID0gbnVsbDtcbiAgICAgICAgdGhpcy5maWx0ZXJbJ2hvc3BpdGFsTnVtJ10gPSBudWxsO1xuICAgICAgICB0aGlzLnBhZ2UgPSAwO1xuICAgIH1cblxuICAgIHNlYXJjaCgpIHtcbiAgICAgICAgdGhpcy5wYWdlID0gMDtcbiAgICAgICAgdGhpcy51cGRhdGVMaXN0KCk7XG4gICAgfVxuXG4gICAgYXNzaWduQ2xpZW50cygpIHtcbiAgICAgICAgdGhpcy5fZGlhbG9nU2VydmljZS5vcGVuQ29uZmlybSh7XG4gICAgICAgICAgICB0aXRsZTogJ0NvbmZpcm0nLFxuICAgICAgICAgICAgbWVzc2FnZTogJ0RvIHlvdSB3YW50IHRvIGFzc2lnbiBzZWxlY3RlZCBjbGllbnRzIHRvIHRoZSBzZWxlY3RlZCBDYXNlIE1hbmFnZXI/JyxcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvbjogJ05vJyxcbiAgICAgICAgICAgIGFjY2VwdEJ1dHRvbjogJ1llcycsXG4gICAgICAgICAgICB3aWR0aDogJzUwMHB4JyxcbiAgICAgICAgfSkuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUoKGFjY2VwdDogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgaWYgKGFjY2VwdCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhdGllbnRJZHMgPSB0aGlzLnBhdGllbnRzLmZpbHRlcihwID0+IHAuc2VsZWN0ZWQpXG4gICAgICAgICAgICAgICAgICAgIC5tYXAocCA9PiBwLmlkKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlcnZpY2UuYXNzaWduVG9DYXNlTWFuYWdlcih0aGlzLmNhc2VNYW5hZ2VyLmlkLCBwYXRpZW50SWRzKS5zdWJzY3JpYmUoKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUxpc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VydmljZS5nZXRDYXNlTWFuYWdlclN0YXRzKHRoaXMuY2FzZU1hbmFnZXIuaWQsIHRoaXMuZmFjaWxpdHlJZCkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0cyA9IHJlcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1aWxkU3RhdHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc2hvd0Vycm9yKCdFcnJvciBhc3NpZ25pbmcgY2xpZW50cywgcGxlYXNlIHRyeSBhZ2FpbicpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBETyBTT01FVEhJTkcgRUxTRVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkZUFzc2lnbkNsaWVudHMoKSB7XG4gICAgICAgIHRoaXMuX2RpYWxvZ1NlcnZpY2Uub3BlbkNvbmZpcm0oe1xuICAgICAgICAgICAgdGl0bGU6ICdDb25maXJtJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdEbyB5b3Ugd2FudCB0byBkZS1hc3NpZ24gc2VsZWN0ZWQgY2xpZW50cz8nLFxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uOiAnTm8nLFxuICAgICAgICAgICAgYWNjZXB0QnV0dG9uOiAnWWVzJyxcbiAgICAgICAgICAgIHdpZHRoOiAnNTAwcHgnLFxuICAgICAgICB9KS5hZnRlckNsb3NlZCgpLnN1YnNjcmliZSgoYWNjZXB0OiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgICBpZiAoYWNjZXB0KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGF0aWVudElkcyA9IHRoaXMucGF0aWVudHMuZmlsdGVyKHAgPT4gcC5zZWxlY3RlZClcbiAgICAgICAgICAgICAgICAgICAgLm1hcChwID0+IHAuaWQpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VydmljZS5kZUFzc2lnbkNsaWVudHMocGF0aWVudElkcykuc3Vic2NyaWJlKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVMaXN0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlcnZpY2UuZ2V0Q2FzZU1hbmFnZXJTdGF0cyh0aGlzLmNhc2VNYW5hZ2VyLmlkLCB0aGlzLmZhY2lsaXR5SWQpLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdHMgPSByZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idWlsZFN0YXRzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnNob3dFcnJvcignRXJyb3IgZGUtYXNzaWduaW5nIGNsaWVudHMsIHBsZWFzZSB0cnkgYWdhaW4nKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gRE8gU09NRVRISU5HIEVMU0VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2VsZWN0aW9ucygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGF0aWVudHMgJiYgISF0aGlzLnBhdGllbnRzLmZpbmQocCA9PiBwLnNlbGVjdGVkKVxuICAgIH1cblxuICAgIGxvYWRQYWdlKHBhZ2UpIHtcbiAgICAgICAgdGhpcy5wYWdlID0gcGFnZTtcbiAgICAgICAgdGhpcy51cGRhdGVMaXN0KClcbiAgICB9XG5cbiAgICBzZWxlY3QoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5wYXRpZW50cyA9IHRoaXMucGF0aWVudHMubWFwKHAgPT4ge1xuICAgICAgICAgICAgaWYgKHAuaWQgPT09IGV2ZW50Lm9iai5pZCkge1xuICAgICAgICAgICAgICAgIHAuc2VsZWN0ZWQgPSAhcC5zZWxlY3RlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBwO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjYXNlTWFuYWdlckNoYW5nZWQoKSB7XG4gICAgICAgIGlmICghdGhpcy5jYXNlTWFuYWdlcikge1xuICAgICAgICAgICAgdGhpcy5zdGF0cyA9IG51bGxcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNlcnZpY2UuZ2V0Q2FzZU1hbmFnZXJTdGF0cyh0aGlzLmNhc2VNYW5hZ2VyLmlkLCB0aGlzLmZhY2lsaXR5SWQpLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdGF0cyA9IHJlcztcbiAgICAgICAgICAgIHRoaXMuYnVpbGRTdGF0cygpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHVwZGF0ZUxpc3QoKSB7XG4gICAgICAgIGlmICh0aGlzLmhvc3BpdGFsTnVtKSB7XG4gICAgICAgICAgICB0aGlzLmZpbHRlci5ob3NwaXRhbE51bSA9IHRoaXMuaG9zcGl0YWxOdW07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5maWx0ZXJbJ2ZhY2lsaXR5SWQnXSA9IHRoaXMuZmFjaWxpdHlJZDtcbiAgICAgICAgdGhpcy5maWx0ZXJbJ3NpemUnXSA9IHRoaXMuaXRlbXNQZXJQYWdlO1xuICAgICAgICB0aGlzLmZpbHRlclsncGFnZSddID0gdGhpcy5wYWdlID4gMCA/IHRoaXMucGFnZSAtIDEgOiAwO1xuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLnNlcnZpY2UuZ2V0Q2xpZW50TGlzdCh0aGlzLmZpbHRlcikuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICBpZiAocmVzLmJvZHkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhdGllbnRzID0gcmVzLmJvZHkubWFwKHAgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjYXNlTWFuYWdlciA9IHRoaXMuY2FzZU1hbmFnZXJzLmZpbmQoYyA9PiBjLmlkID09PSBwLmNhc2VNYW5hZ2VySWQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2FzZU1hbmFnZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHAuY2FzZU1hbmFnZXIgPSBjYXNlTWFuYWdlcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLnRvdGFsSXRlbXMgPSAoPGFueT5yZXMuaGVhZGVycykuZ2V0KCdYLVRvdGFsLUNvdW50Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLmdldENhc2VNYW5hZ2VyU3RhdHMoMCwgdGhpcy5mYWNpbGl0eUlkKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nbG9iYWxTdGF0cyA9IHJlcztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idWlsZEdsb2JhbFN0YXRzKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBhZ2VHcm91cENoYW5nZWQoKSB7XG4gICAgICAgIGlmICh0aGlzLmFnZUxpbWl0ID09IDkpIHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyWydsb3dlckFnZUxpbWl0J10gPSAwO1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJbJ3VwcGVyQWdlTGltaXQnXSA9IDk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5hZ2VMaW1pdCA9PSAxNCkge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJbJ2xvd2VyQWdlTGltaXQnXSA9IDEwO1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJbJ3VwcGVyQWdlTGltaXQnXSA9IDE0O1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYWdlTGltaXQgPT0gMTkpIHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyWydsb3dlckFnZUxpbWl0J10gPSAxNTtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyWyd1cHBlckFnZUxpbWl0J10gPSAxOTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmFnZUxpbWl0ID09IDI0KSB7XG4gICAgICAgICAgICB0aGlzLmZpbHRlclsnbG93ZXJBZ2VMaW1pdCddID0gMjA7XG4gICAgICAgICAgICB0aGlzLmZpbHRlclsndXBwZXJBZ2VMaW1pdCddID0gMjQ7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5hZ2VMaW1pdCA9PSAxMDApIHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyWydsb3dlckFnZUxpbWl0J10gPSAyNTtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyWyd1cHBlckFnZUxpbWl0J10gPSAxMDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLmFnZUxpbWl0KSB7XG4gICAgICAgICAgICB0aGlzLmZpbHRlclsnbG93ZXJBZ2VMaW1pdCddID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyWyd1cHBlckFnZUxpbWl0J10gPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlTGlzdCgpXG4gICAgfVxuXG4gICAgcHJlZ25hbmN5U3RhdHVzQ2hhbmdlZCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJlZ25hbmN5U3RhdHVzID09IDEpIHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyWydwcmVnbmFudCddID0gdHJ1ZVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJlZ25hbmN5U3RhdHVzID09IDIpIHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyWydicmVhc3RmZWVkaW5nJ10gPSB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLnByZWduYW5jeVN0YXR1cykge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJbJ3ByZWduYW50J10gPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJbJ2JyZWFzdGZlZWRpbmcnXSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGVMaXN0KClcbiAgICB9XG5cbiAgICBzdGF0ZUNoYW5nZWQoaWQpIHtcbiAgICAgICAgaWYgKGlkKSB7XG4gICAgICAgICAgICB0aGlzLnNlcnZpY2UuZ2V0TGdhc0J5U3RhdGUoaWQpLnN1YnNjcmliZShyZXMgPT4gdGhpcy5sZ2FzID0gcmVzKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXNzaWduZWQodmFsKSB7XG4gICAgICAgIGlmICh2YWwgPT0gMSkge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXIuYXNzaWduZWQgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKHZhbCA9PSAyKSB7XG4gICAgICAgICAgICB0aGlzLmZpbHRlci5hc3NpZ25lZCA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXIuYXNzaWduZWQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlTGlzdCgpO1xuICAgIH1cblxuICAgIGxnYUNoYW5nZWQoaWQpIHtcbiAgICAgICAgaWYgKGlkKSB7XG4gICAgICAgICAgICB0aGlzLmZpbHRlci5sZ2FJZCA9IGlkXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZpbHRlci5sZ2FJZCA9IG51bGxcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZUxpc3QoKVxuICAgIH1cblxuICAgIGJ1aWxkU3RhdHMoKSB7XG4gICAgICAgIHRoaXMucHJvcGVydGllcyA9IFtdO1xuICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdJbnRJdGVtTW9kZWwoe1xuICAgICAgICAgICAgbGFiZWw6ICdDbGllbnRzKHMpIEFzc2lnbmVkJyxcbiAgICAgICAgICAgIGtleTogJ2FzJyxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnN0YXRzLmFzc2lnbmVkXG4gICAgICAgIH0pKTtcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3SW50SXRlbU1vZGVsKHtcbiAgICAgICAgICAgIGxhYmVsOiAnU3RhYmxlIDEgWWVhcicsXG4gICAgICAgICAgICBrZXk6ICdhcycsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5zdGF0cy5zdGFibGVcbiAgICAgICAgfSkpO1xuICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdJbnRJdGVtTW9kZWwoe1xuICAgICAgICAgICAgbGFiZWw6ICdVbnN0YWJsZSBsZXNzIHRoYW4gMSBZZWFyJyxcbiAgICAgICAgICAgIGtleTogJ2FzJyxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnN0YXRzLnVuc3RhYmxlTGVzc1RoYW4xeWVhclxuICAgICAgICB9KSk7XG4gICAgICAgIHRoaXMucHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld0ludEl0ZW1Nb2RlbCh7XG4gICAgICAgICAgICBsYWJlbDogJ1Vuc3RhYmxlIG1vcmUgdGhhbiAxIFllYXInLFxuICAgICAgICAgICAga2V5OiAnYXMnLFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMuc3RhdHMudW5zdGFibGVNb3JlVGhhbjFZZWFyXG4gICAgICAgIH0pKTtcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3SW50SXRlbU1vZGVsKHtcbiAgICAgICAgICAgIGxhYmVsOiAnQXdhaXRpbmcgQVJUJyxcbiAgICAgICAgICAgIGtleTogJ2FzJyxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnN0YXRzLnByZUFydFxuICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgYnVpbGRHbG9iYWxTdGF0cygpIHtcbiAgICAgICAgdGhpcy5nbG9iYWxQcm9wZXJ0aWVzID0gW107XG4gICAgICAgIGlmICh0aGlzLmdsb2JhbFN0YXRzKSB7XG4gICAgICAgICAgICB0aGlzLmdsb2JhbFByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdJbnRJdGVtTW9kZWwoe1xuICAgICAgICAgICAgICAgIGxhYmVsOiAnQ2xpZW50cyhzKSBBc3NpZ25lZCcsXG4gICAgICAgICAgICAgICAga2V5OiAnYXMnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLmdsb2JhbFN0YXRzLmFzc2lnbmVkXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB0aGlzLmdsb2JhbFByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdJbnRJdGVtTW9kZWwoe1xuICAgICAgICAgICAgICAgIGxhYmVsOiAnU3RhYmxlIDEgWWVhcicsXG4gICAgICAgICAgICAgICAga2V5OiAnYXMnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLmdsb2JhbFN0YXRzLnN0YWJsZVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgdGhpcy5nbG9iYWxQcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3SW50SXRlbU1vZGVsKHtcbiAgICAgICAgICAgICAgICBsYWJlbDogJ1Vuc3RhYmxlIGxlc3MgdGhhbiAxIFllYXInLFxuICAgICAgICAgICAgICAgIGtleTogJ2FzJyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5nbG9iYWxTdGF0cy51bnN0YWJsZUxlc3NUaGFuMXllYXJcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIHRoaXMuZ2xvYmFsUHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld0ludEl0ZW1Nb2RlbCh7XG4gICAgICAgICAgICAgICAgbGFiZWw6ICdVbnN0YWJsZSBtb3JlIHRoYW4gMSBZZWFyJyxcbiAgICAgICAgICAgICAgICBrZXk6ICdhcycsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuZ2xvYmFsU3RhdHMudW5zdGFibGVNb3JlVGhhbjFZZWFyXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB0aGlzLmdsb2JhbFByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdJbnRJdGVtTW9kZWwoe1xuICAgICAgICAgICAgICAgIGxhYmVsOiAnQXdhaXRpbmcgQVJUJyxcbiAgICAgICAgICAgICAgICBrZXk6ICdhcycsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuZ2xvYmFsU3RhdHMucHJlQXJ0XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=
