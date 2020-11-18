import { __decorate, __param } from 'tslib';
import { Inject, ɵɵdefineInjectable, ɵɵinject, Injectable, Component, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL_CONFIG, entityCompare, createRequestOption, AppLoaderService, LamisCoreModule } from '@lamis/web-core';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatIconModule, MatDividerModule, MatCardModule, MatSelectModule, MatButtonModule } from '@angular/material';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { NotificationService, CardViewTextItemModel, CardViewBoolItemModel, CoreModule } from '@alfresco/adf-core';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TdDialogService, CovalentCommonModule, CovalentDialogsModule } from '@covalent/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

var FacilityService = /** @class */ (function () {
    function FacilityService(http, serverUrl) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.resourceUrl = '';
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/facilities';
    }
    FacilityService.prototype.update = function (facility) {
        return this.http
            .post(this.resourceUrl + "/switch", facility, { observe: 'response' });
    };
    FacilityService.prototype.getFacilitiesByLga = function (id) {
        return this.http
            .get(this.resourceUrl + "/lga/" + id, { observe: 'body' });
    };
    FacilityService.prototype.getStates = function () {
        return this.http.get('/api/states');
    };
    FacilityService.prototype.getLgaByState = function (id) {
        return this.http.get("/api/provinces/state/" + id);
    };
    FacilityService.prototype.getActive = function () {
        return this.http
            .get(this.resourceUrl + "/active", { observe: 'response' });
    };
    FacilityService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: undefined, decorators: [{ type: Inject, args: [SERVER_API_URL_CONFIG,] }] }
    ]; };
    FacilityService.ngInjectableDef = ɵɵdefineInjectable({ factory: function FacilityService_Factory() { return new FacilityService(ɵɵinject(HttpClient), ɵɵinject(SERVER_API_URL_CONFIG)); }, token: FacilityService, providedIn: "root" });
    FacilityService = __decorate([
        Injectable({ providedIn: 'root' }),
        __param(1, Inject(SERVER_API_URL_CONFIG))
    ], FacilityService);
    return FacilityService;
}());

var FacilityComponent = /** @class */ (function () {
    function FacilityComponent(facilityService, notification) {
        this.facilityService = facilityService;
        this.notification = notification;
    }
    FacilityComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.facilityService.getStates().subscribe(function (res) { return _this.states = res; });
        this.facility = this.facilityService.getActive().subscribe(function (res) {
            if (res.body) {
                _this.facility = res.body;
            }
        });
    };
    FacilityComponent.prototype.entityCompare = function (e1, e2) {
        return entityCompare(e1, e2);
    };
    FacilityComponent.prototype.stateChanged = function (id) {
        var _this = this;
        this.facilityService.getLgaByState(id).subscribe(function (res) { return _this.lgas = res; });
    };
    FacilityComponent.prototype.lgaChanged = function (id) {
        var _this = this;
        this.facilityService.getFacilitiesByLga(id).subscribe(function (res) { return _this.facilities = res; });
    };
    FacilityComponent.prototype.setActive = function () {
        var _this = this;
        this.facilityService.update(this.active).subscribe(function (res) {
            if (res.ok && res.body) {
                _this.facilityService.getActive().subscribe(function (r) {
                    if (r.body) {
                        _this.facility = r.body;
                    }
                });
                _this.notification.showInfo("Facility switched to " + res.body.name);
            }
        });
    };
    FacilityComponent.ctorParameters = function () { return [
        { type: FacilityService },
        { type: NotificationService }
    ]; };
    FacilityComponent = __decorate([
        Component({
            selector: 'lamis-facility',
            template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <mat-card>\n            <mat-card-header>\n                Switch Facility\n            </mat-card-header>\n            <form name=\"form\" role=\"form\" novalidate (ngSubmit)=\"setActive()\" #facilityForm=\"ngForm\">\n                <mat-card-content>\n                    <div class=\"row\">\n                        <div class=\"col-md-12\">\n                            Active Facility: {{facility.name}}\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-select placeholder=\"State\"\n                                            (selectionChange)=\"stateChanged($event.value)\">\n                                    <mat-option *ngFor=\"let state of states\"\n                                                [value]=\"state.id\">{{state.name}}</mat-option>\n                                </mat-select>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-select placeholder=\"LGA\"\n                                            (selectionChange)=\"lgaChanged($event.value)\">\n                                    <mat-option *ngFor=\"let lga of lgas\"\n                                                [value]=\"lga.id\">{{lga.name}}</mat-option>\n                                </mat-select>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-select placeholder=\"Facility\"\n                                            [(ngModel)]=\"active\"\n                                            required\n                                            [compareWith]=\"entityCompare\"\n                                            #fac=\"ngModel\"\n                                            name=\"facility\">\n                                    <mat-option></mat-option>\n                                    <mat-option *ngFor=\"let facility of facilities\"\n                                                [value]=\"facility\">{{facility.name}}</mat-option>\n                                </mat-select>\n                                <mat-error *ngIf=\"fac.errors\">\n                                    Facility is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <mat-divider></mat-divider>\n                </mat-card-content>\n                <mat-card-actions class=\"lamis-edit-form-actions\">\n                    <button mat-raised-button color=\"primary\" [disabled]=\"facilityForm.invalid\">Switch Facility</button>\n                </mat-card-actions>\n            </form>\n        </mat-card>\n    </div>\n</div>\n",
            styles: [".bold{font-weight:700}"]
        })
    ], FacilityComponent);
    return FacilityComponent;
}());

var ɵ0 = {
    title: 'Facility Switch',
    breadcrumb: 'FACILITY SWITCH'
}, ɵ1 = {
    authorities: ['ROLE_USER'],
    title: 'Facility Switch',
    breadcrumb: 'FACILITY SWITCH'
};
var ROUTES = [
    {
        path: '',
        data: ɵ0,
        children: [
            {
                path: '',
                component: FacilityComponent,
                data: ɵ1,
            },
        ]
    }
];

var FacilityModule = /** @class */ (function () {
    function FacilityModule() {
    }
    FacilityModule = __decorate([
        NgModule({
            declarations: [
                FacilityComponent
            ],
            imports: [
                CommonModule,
                MatInputModule,
                MatIconModule,
                MatDividerModule,
                MatCardModule,
                MatSelectModule,
                MatButtonModule,
                FormsModule,
                RouterModule.forChild(ROUTES)
            ],
            exports: [
                FacilityComponent
            ],
            entryComponents: [],
            providers: []
        })
    ], FacilityModule);
    return FacilityModule;
}());

var CommunityPharmacyService = /** @class */ (function () {
    function CommunityPharmacyService(http, serverUrl) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.resourceUrl = '';
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/community-pharmacies';
    }
    CommunityPharmacyService.prototype.create = function (caseManager) {
        return this.http
            .post(this.resourceUrl, caseManager, { observe: 'response' });
    };
    CommunityPharmacyService.prototype.update = function (caseManager) {
        return this.http
            .put(this.resourceUrl, caseManager, { observe: 'response' });
    };
    CommunityPharmacyService.prototype.find = function (id) {
        return this.http
            .get(this.resourceUrl + "/" + id, { observe: 'response' });
    };
    CommunityPharmacyService.prototype.delete = function (id) {
        return this.http.delete(this.resourceUrl + "/" + id, { observe: 'response' });
    };
    CommunityPharmacyService.prototype.query = function (req) {
        var options = createRequestOption(req);
        return this.http
            .get(this.resourceUrl, { params: options, observe: 'response' });
    };
    CommunityPharmacyService.prototype.getLgasByState = function (id) {
        return this.http.get("/api/provinces/state/" + id);
    };
    CommunityPharmacyService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: undefined, decorators: [{ type: Inject, args: [SERVER_API_URL_CONFIG,] }] }
    ]; };
    CommunityPharmacyService.ngInjectableDef = ɵɵdefineInjectable({ factory: function CommunityPharmacyService_Factory() { return new CommunityPharmacyService(ɵɵinject(HttpClient), ɵɵinject(SERVER_API_URL_CONFIG)); }, token: CommunityPharmacyService, providedIn: "root" });
    CommunityPharmacyService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __param(1, Inject(SERVER_API_URL_CONFIG))
    ], CommunityPharmacyService);
    return CommunityPharmacyService;
}());

var CommunityPharmacyListComponent = /** @class */ (function () {
    function CommunityPharmacyListComponent(service, facilityService, notification, router, activatedRoute) {
        this.service = service;
        this.facilityService = facilityService;
        this.notification = notification;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.page = 0;
        this.loading = false;
        this.itemsPerPage = 10;
        this.currentSearch = '';
        this.totalItems = 0;
        this.display = 'list';
    }
    CommunityPharmacyListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.facilityService.getActive().subscribe(function (res) {
            _this.facility = res.body;
            _this.onPageChange(0);
        });
    };
    CommunityPharmacyListComponent.prototype.select = function (data) {
        this.router.navigate(['..', 'community-pharmacies', data.obj.id, 'view'], { relativeTo: this.activatedRoute });
    };
    CommunityPharmacyListComponent.prototype.onPageChange = function (pageInfo) {
        this.page = pageInfo;
        this.loadAll(pageInfo - 1);
    };
    CommunityPharmacyListComponent.prototype.loadPage = function (page) {
        this.page = page;
        this.loadAll(page - 1);
    };
    CommunityPharmacyListComponent.prototype.loadAll = function (page) {
        var _this = this;
        this.loading = true;
        this.service.query({
            keyword: this.currentSearch,
            page: page < 0 ? 0 : page,
            stateId: this.facility && this.facility.state && this.facility.state.id || 0,
            size: this.itemsPerPage,
            sort: ['id', 'asc']
        }).subscribe(function (res) {
            _this.onSuccess(res.body, res.headers);
        }, function (res) { return _this.onError(res); });
    };
    CommunityPharmacyListComponent.prototype.onSuccess = function (data, headers) {
        this.communityPharmacies = data;
        this.totalItems = headers.get('X-Total-Count');
        this.loading = false;
    };
    CommunityPharmacyListComponent.prototype.onError = function (error) {
        this.notification.openSnackMessage(error.message);
        this.loading = false;
    };
    CommunityPharmacyListComponent.ctorParameters = function () { return [
        { type: CommunityPharmacyService },
        { type: FacilityService },
        { type: NotificationService },
        { type: Router },
        { type: ActivatedRoute }
    ]; };
    CommunityPharmacyListComponent = __decorate([
        Component({
            selector: 'community-pharmacies',
            template: "<div class=\"layout\">\n    <div class=\"list-container\">\n        <adf-datatable *ngIf=\"communityPharmacies\"\n                       [rows]=\"communityPharmacies\"\n                       [loading]=\"loading\"\n                       [display]=\"display\"\n                       (rowClick)=\"select($event.value)\">\n            <data-columns>\n                <data-column key=\"name\" title=\"Name\" sortable=\"true\"></data-column>\n                <data-column key=\"pin\" title=\"PIN\" sortable=\"true\"></data-column>\n                <data-column key=\"phone\" title=\"Telephone Number\" sortable=\"true\"></data-column>\n                <data-column key=\"address\" title=\"Address\" class=\"full-width ellipsis-cell\"></data-column>\n                <data-column key=\"active\" title=\"Active\" sortable=\"true\">\n                    <ng-template let-context=\"$implicit\">\n                        <mat-checkbox [checked]=\"context.row.getValue('active')\"></mat-checkbox>\n                    </ng-template>\n                </data-column>\n            </data-columns>\n            <adf-loading-content-template>\n                <ng-template>\n                    <mat-progress-spinner\n                            class=\"adf-document-list-loading-margin\"\n                            [color]=\"'primary'\"\n                            [mode]=\"'indeterminate'\">\n                    </mat-progress-spinner>\n                </ng-template>\n            </adf-loading-content-template>\n        </adf-datatable>\n    </div>\n    <adf-empty-content\n            *ngIf=\"!communityPharmacies\"\n            icon=\"blur_on\"\n            [title]=\"'No Community Pharmacies found'\"\n            [subtitle]=\"'No Community Pharmacies matching search criteria or no Community Pharmacies available'\">\n    </adf-empty-content>\n    <ngb-pagination [collectionSize]=\"totalItems\"\n                    [(page)]=\"page\"\n                    [pageSize]=\"itemsPerPage\"\n                    [maxSize]=\"5\"\n                    size=\"sm\"\n                    [rotate]=\"true\"\n                    [boundaryLinks]=\"true\"\n                    (pageChange)=\"loadPage(page)\">\n    </ngb-pagination>\n\n</div>\n<div class=\"fab-container\">\n    <button mat-fab\n            [matTooltip]=\"'Add New Community Pharmacy'\"\n            [routerLink]=\"['new']\">\n        <mat-icon>add</mat-icon>\n    </button>\n</div>\n"
        })
    ], CommunityPharmacyListComponent);
    return CommunityPharmacyListComponent;
}());

var CommunityPharmacyDetailsComponent = /** @class */ (function () {
    function CommunityPharmacyDetailsComponent(router, route, service, _dialogService, notificationService) {
        this.router = router;
        this.route = route;
        this.service = service;
        this._dialogService = _dialogService;
        this.notificationService = notificationService;
        this.properties = [];
    }
    CommunityPharmacyDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (_a) {
            var entity = _a.entity;
            _this.entity = !!entity && entity.body ? entity.body : entity;
            _this.buildProperties();
        });
    };
    CommunityPharmacyDetailsComponent.prototype.edit = function () {
        this.router.navigate(['/', 'admin', 'config', 'community-pharmacies', this.entity.id, 'edit']);
    };
    CommunityPharmacyDetailsComponent.prototype.delete = function () {
        var _this = this;
        this._dialogService.openConfirm({
            title: 'Confirm',
            message: 'Do you want to delete this Community Pharmacy, action cannot be reversed?',
            cancelButton: 'No',
            acceptButton: 'Yes',
            width: '500px',
        }).afterClosed().subscribe(function (accept) {
            if (accept) {
                _this.service.delete(_this.entity.id).subscribe(function (res) {
                    if (res.ok) {
                        _this.router.navigate(['admin', 'config', 'community-pharmacies']);
                    }
                    else {
                        _this.notificationService.showError('Error deleting Community Pharmacy, please try again');
                    }
                });
            }
            else {
                // DO SOMETHING ELSE
            }
        });
    };
    CommunityPharmacyDetailsComponent.prototype.buildProperties = function () {
        this.properties.push(new CardViewTextItemModel({
            label: 'Name',
            key: 'cs',
            value: this.entity.name
        }));
        this.properties.push(new CardViewTextItemModel({
            label: 'Address',
            key: 'fs',
            value: this.entity.address
        }));
        this.properties.push(new CardViewTextItemModel({
            label: 'PIN',
            key: 'fs',
            value: this.entity.pin
        }));
        this.properties.push(new CardViewTextItemModel({
            label: 'Phone',
            key: 'ts',
            value: this.entity.phone
        }));
        this.properties.push(new CardViewTextItemModel({
            label: 'Email',
            key: 'cd4p',
            value: this.entity.email
        }));
        this.properties.push(new CardViewBoolItemModel({
            label: 'Active',
            key: 'cd4p',
            value: this.entity.active
        }));
    };
    CommunityPharmacyDetailsComponent.prototype.previousState = function () {
        window.history.back();
    };
    CommunityPharmacyDetailsComponent.ctorParameters = function () { return [
        { type: Router },
        { type: ActivatedRoute },
        { type: CommunityPharmacyService },
        { type: TdDialogService },
        { type: NotificationService }
    ]; };
    CommunityPharmacyDetailsComponent = __decorate([
        Component({
            selector: 'community-pharmacy-details',
            template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <mat-card>\n            <mat-card-header>\n            </mat-card-header>\n            <mat-card-content>\n                <adf-card-view [properties]=\"properties\" editable=\"false\"></adf-card-view>\n            </mat-card-content>\n            <mat-card-actions class=\"lamis-edit-form-actions\">\n                <button mat-button (click)=\"previousState()\">Back</button>\n                <button mat-raised-button color=\"primary\" (click)=\"edit()\">Edit</button>\n            </mat-card-actions>\n        </mat-card>\n    </div>\n</div>\n"
        })
    ], CommunityPharmacyDetailsComponent);
    return CommunityPharmacyDetailsComponent;
}());

var CommunityPharmacyEditComponent = /** @class */ (function () {
    function CommunityPharmacyEditComponent(service, notification, facilityService, activatedRoute, appLoaderService) {
        this.service = service;
        this.notification = notification;
        this.facilityService = facilityService;
        this.activatedRoute = activatedRoute;
        this.appLoaderService = appLoaderService;
        this.states = [];
        this.lgas = [];
    }
    CommunityPharmacyEditComponent.prototype.createEntity = function () {
        return {};
    };
    CommunityPharmacyEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isSaving = false;
        this.activatedRoute.data.subscribe(function (_a) {
            var entity = _a.entity;
            _this.entity = !!entity && entity.body ? entity.body : entity;
            if (_this.entity === undefined) {
                _this.entity = _this.createEntity();
                _this.entity.active = true;
            }
        });
        this.facilityService.getActive().subscribe(function (res) {
            var facility = res.body;
            _this.entity.state = facility.state;
            _this.states.push(_this.entity.state);
            _this.stateChange(facility.state.id);
        });
    };
    CommunityPharmacyEditComponent.prototype.save = function () {
        this.isSaving = true;
        this.appLoaderService.open('Saving Community Pharmacy..');
        if (this.entity.id !== undefined) {
            this.subscribeToSaveResponse(this.service.update(this.entity));
        }
        else {
            this.subscribeToSaveResponse(this.service.create(this.entity));
        }
    };
    CommunityPharmacyEditComponent.prototype.previousState = function () {
        window.history.back();
    };
    CommunityPharmacyEditComponent.prototype.subscribeToSaveResponse = function (result) {
        var _this = this;
        result.subscribe(function (res) { return _this.onSaveSuccess(res.body); }, function (res) {
            _this.onSaveError();
            _this.onError(res.message);
        });
    };
    CommunityPharmacyEditComponent.prototype.onSaveSuccess = function (result) {
        this.appLoaderService.close();
        this.isSaving = false;
        this.notification.openSnackMessage('Community Pharmacy successfully saved');
        this.previousState();
    };
    CommunityPharmacyEditComponent.prototype.onSaveError = function () {
        this.isSaving = false;
        this.appLoaderService.close();
        //this.submitButton.disabled = true;
        this.notification.showError('Error occurred saving Community Pharmacy; try again');
        //this.progressBar.mode = 'determinate';
    };
    CommunityPharmacyEditComponent.prototype.onError = function (errorMessage) {
        this.appLoaderService.close();
        this.notification.showError(errorMessage);
    };
    CommunityPharmacyEditComponent.prototype.stateChange = function (id) {
        var _this = this;
        this.service.getLgasByState(id).subscribe(function (res) { return _this.lgas = res; });
    };
    CommunityPharmacyEditComponent.prototype.entityCompare = function (e1, e2) {
        return entityCompare(e1, e2);
    };
    CommunityPharmacyEditComponent.ctorParameters = function () { return [
        { type: CommunityPharmacyService },
        { type: NotificationService },
        { type: FacilityService },
        { type: ActivatedRoute },
        { type: AppLoaderService }
    ]; };
    CommunityPharmacyEditComponent = __decorate([
        Component({
            selector: 'community-pharmacy-edit',
            template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <form name=\"form\" role=\"form\" novalidate (ngSubmit)=\"save()\" #cpForm=\"ngForm\">\n            <mat-card class=\"default\">\n                <mat-card-content>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Name</mat-label>\n                                <input matInput name=\"name\" #name=\"ngModel\"\n                                       required\n                                       [(ngModel)]=\"entity.name\"/>\n                                <mat-error\n                                        *ngIf=\"name.errors && (name.dirty || name.touched) && (name.errors.required)\">\n                                    Community Pharmacy name is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>PIN</mat-label>\n                                <input matInput name=\"pin\" #pin=\"ngModel\"\n                                       required\n                                       [(ngModel)]=\"entity.pin\"/>\n                                <mat-error\n                                        *ngIf=\"pin.errors && (pin.dirty || pin.touched) && (pin.errors.required)\">\n                                    PIN is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>State</mat-label>\n                                <mat-select name=\"state\" [(ngModel)]=\"entity.state\"\n                                            [compareWith]=\"entityCompare\"\n                                            required\n                                            #s=\"ngModel\"\n                                            (selectionChange)=\"stateChange($event.value.id)\">\n                                    <mat-option></mat-option>\n                                    <mat-option *ngFor=\"let state of states\" [value]=\"state\">{{state.name}}</mat-option>\n                                </mat-select>\n                                <mat-error\n                                        *ngIf=\"s.errors && (s.dirty || s.touched || !!entity.id) && (s.errors.required)\">\n                                    State is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>LGA</mat-label>\n                                <mat-select name=\"lga\" [(ngModel)]=\"entity.lga\" required #l=\"ngModel\"\n                                            [compareWith]=\"entityCompare\">\n                                    <mat-option></mat-option>\n                                    <mat-option *ngFor=\"let lga of lgas\" [value]=\"lga\">{{lga.name}}</mat-option>\n                                </mat-select>\n                                <mat-error\n                                        *ngIf=\"l.errors && (l.dirty || l.touched || !!entity.id) && (l.errors.required)\">\n                                    LGA is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Address</mat-label>\n                                <textarea matInput name=\"address\" [(ngModel)]=\"entity.address\" #address=\"ngModel\"\n                                          rows=\"2\" >\n                                </textarea>\n                                <mat-error\n                                        *ngIf=\"address.errors && (address.dirty || address.touched) && (address.errors.required)\">\n                                    Community Pharmacy address is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Email</mat-label>\n                                <input matInput name=\"email\" type=\"email\" #email=\"ngModel\"\n                                       [(ngModel)]=\"entity.email\"/>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Telephone</mat-label>\n                                <input matInput name=\"phone\" phoneNumber [(ngModel)]=\"entity.phone\"\n                                       #phone=\"ngModel\"/>\n                                <mat-error\n                                        *ngIf=\"phone.errors && (phone.dirty || phone.touched) && (phone.errors.invalidPhone)\">\n                                    Invalid phone number\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-checkbox name=\"active\" [(ngModel)]=\"entity.active\">Active</mat-checkbox>\n                        </div>\n                    </div>\n                </mat-card-content>\n                <mat-card-actions class=\"lamis-edit-form-actions\">\n                    <button mat-raised-button type=\"button\" (click)=\"previousState()\">Back</button>\n                    <button mat-raised-button color='primary'\n                            [disabled]=\"cpForm.invalid || isSaving\"\n                            type=\"submit\">\n                        {{entity.id !== undefined ? 'Update' : 'Save'}}\n                    </button>\n                </mat-card-actions>\n            </mat-card>\n        </form>\n    </div>\n</div>\n"
        })
    ], CommunityPharmacyEditComponent);
    return CommunityPharmacyEditComponent;
}());

var CommunityPharmacyResolve = /** @class */ (function () {
    function CommunityPharmacyResolve(service) {
        this.service = service;
    }
    CommunityPharmacyResolve.prototype.resolve = function (route, state) {
        var id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(filter(function (response) { return response.ok; }), map(function (patient) { return patient.body; }));
        }
        return of({});
    };
    CommunityPharmacyResolve.ctorParameters = function () { return [
        { type: CommunityPharmacyService }
    ]; };
    CommunityPharmacyResolve = __decorate([
        Injectable()
    ], CommunityPharmacyResolve);
    return CommunityPharmacyResolve;
}());
var ɵ0$1 = {
    title: 'Community Pharmacies',
    breadcrumb: 'COMMUNITY PHARMACIES'
}, ɵ1$1 = {
    authorities: ['ROLE_USER'],
    title: 'Community Pharmacies',
    breadcrumb: 'COMMUNITY PHARMACIES'
}, ɵ2 = {
    authorities: ['ROLE_USER'],
    title: 'Community Pharmacy',
    breadcrumb: 'COMMUNITY PHARMACY'
}, ɵ3 = {
    authorities: ['ROLE_DEC'],
    title: 'Add Community Pharmacy',
    breadcrumb: 'ADD COMMUNITY PHARMACY'
}, ɵ4 = {
    authorities: ['ROLE_DEC'],
    title: 'Community Pharmacy Edit',
    breadcrumb: 'COMMUNITY PHARMACY EDIT'
};
var ROUTES$1 = [
    {
        path: '',
        data: ɵ0$1,
        children: [
            {
                path: '',
                component: CommunityPharmacyListComponent,
                data: ɵ1$1,
            },
            {
                path: ':id/view',
                component: CommunityPharmacyDetailsComponent,
                resolve: {
                    entity: CommunityPharmacyResolve
                },
                data: ɵ2,
            },
            {
                path: 'new',
                component: CommunityPharmacyEditComponent,
                data: ɵ3,
            },
            {
                path: ':id/edit',
                component: CommunityPharmacyEditComponent,
                resolve: {
                    entity: CommunityPharmacyResolve
                },
                data: ɵ4,
            }
        ]
    }
];

var CommunityPharmacyModule = /** @class */ (function () {
    function CommunityPharmacyModule() {
    }
    CommunityPharmacyModule = __decorate([
        NgModule({
            declarations: [
                CommunityPharmacyDetailsComponent,
                CommunityPharmacyEditComponent,
                CommunityPharmacyListComponent
            ],
            imports: [
                CommonModule,
                MatInputModule,
                MatIconModule,
                MatDividerModule,
                MatCardModule,
                MatSelectModule,
                MatButtonModule,
                FormsModule,
                RouterModule.forChild(ROUTES$1),
                CoreModule,
                CovalentCommonModule,
                CovalentDialogsModule,
                NgbModule,
                LamisCoreModule
            ],
            exports: [],
            providers: [
                CommunityPharmacyResolve
            ]
        })
    ], CommunityPharmacyModule);
    return CommunityPharmacyModule;
}());

/*
 * Public API Surface of Patient
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CommunityPharmacyModule, FacilityModule, FacilityService, FacilityComponent as ɵa, ROUTES as ɵb, CommunityPharmacyDetailsComponent as ɵc, CommunityPharmacyService as ɵd, CommunityPharmacyEditComponent as ɵe, CommunityPharmacyListComponent as ɵf, CommunityPharmacyResolve as ɵg, ROUTES$1 as ɵh };
//# sourceMappingURL=lamis-facility-1.2.0.js.map
