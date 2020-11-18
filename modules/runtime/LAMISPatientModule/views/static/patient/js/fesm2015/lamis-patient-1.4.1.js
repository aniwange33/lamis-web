import { __decorate, __param, __metadata } from 'tslib';
import { Inject, ɵɵdefineInjectable, ɵɵinject, Injectable, Input, Component, ComponentFactoryResolver, ViewContainerRef, Renderer2, ViewChild, NgModule, Directive } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { createRequestOption, DATE_FORMAT, SERVER_API_URL_CONFIG, AuthServerProvider, entityCompare, AppLoaderService, PagingParamsResolve, FieldType, LamisSharedModule, JsonFormModule, MatDateFormatModule } from '@lamis/web-core';
import { map, share, filter, debounceTime, take, switchMap } from 'rxjs/operators';
import * as moment_ from 'moment';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { NotificationService, CardViewBoolItemModel, CardViewIntItemModel, CardViewFloatItemModel, CardViewDateItemModel, CardViewDatetimeItemModel, CardViewTextItemModel, CoreModule } from '@alfresco/adf-core';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatIconModule, MatDividerModule, MatCardModule, MatSelectModule, MatButtonModule, MatCheckboxModule, MatTabsModule, MatProgressBarModule, MatListModule, MatChipsModule, MatAutocompleteModule } from '@angular/material';
import { TdDialogService, CovalentMessageModule, CovalentDialogsModule, CovalentSearchModule } from '@covalent/core';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgJhipsterModule } from 'ng-jhipster';
import { NgForm, NG_ASYNC_VALIDATORS, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { MatFormioModule } from 'angular-material-formio';
import { CustomFormsModule } from 'ng2-validation';

var PatientService_1;
const moment = moment_;
let PatientService = PatientService_1 = class PatientService {
    constructor(http, serverUrl, authServerProvider) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.authServerProvider = authServerProvider;
        this.resourceUrl = '';
        this.resourceSearchUrl = '';
        this.ovcResourceUrl = '';
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/patients';
        this.resourceSearchUrl = serverUrl.SERVER_API_URL + '/api/_search/patients';
        this.ovcResourceUrl = serverUrl.SERVER_API_URL + '/api/ovcs';
    }
    create(data) {
        const patient = this.convertDateFromClient(data);
        return this.http
            .post(this.resourceUrl, patient, { observe: 'response' })
            .pipe(map((res) => this.convertDateFromServer(res)));
    }
    update(data) {
        const patient = this.convertDateFromClient(data);
        return this.http
            .put(this.resourceUrl, patient, { observe: 'response' })
            .pipe(map((res) => this.convertDateFromServer(res)), share());
    }
    find(id) {
        return this.http
            .get(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res) => this.convertDateFromServer(res)));
    }
    findByUuid(id) {
        return this.http
            .get(`${this.resourceUrl}/by-uuid/${id}`, { observe: 'response' })
            .pipe(map((res) => this.convertDateFromServer(res)));
    }
    query(req) {
        const options = createRequestOption(req);
        return this.http
            .get(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res) => this.convertDateArrayFromServer(res)));
    }
    delete(id) {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
    getOVCByPatient(id) {
        return this.http.get(`${this.ovcResourceUrl}/patient/${id}`);
    }
    widgets(patientId) {
        return this.http.get(`${this.resourceUrl}/${patientId}/widgets`, { observe: 'body' });
    }
    observations(patientId) {
        return this.http.get(`${this.resourceUrl}/${patientId}/observations`, {
            observe: 'body'
        });
    }
    activities(patientId, detailed) {
        return this.http.get(`${this.resourceUrl}/${patientId}/activities?full=${detailed}`, { observe: 'body' })
            .pipe(map(res => {
            res.sort((t1, t2) => {
                const d1 = moment(t1.date, 'DD MMM, YYYY');
                const d2 = moment(t2.date, 'DD MMM, YYYY');
                return d2.diff(d1);
            });
            return res;
        }));
    }
    getActiveFacility() {
        return this.http.get('/api/facilities/active');
    }
    getAllFacility() {
        return this.http.get('/api/facilities');
    }
    getStates() {
        return this.http.get('/api/states');
    }
    getLgasByState(id) {
        return this.http.get(`/api/provinces/state/${id}`);
    }
    getStateByLga(id) {
        return this.http.get(`/api/provinces/${id}/state`);
    }
    getFacility(id) {
        return this.http.get(`/api/facilities/${id}`);
    }
    existsByHospitalNumber(hospitalNum) {
        return this.http.post(`${this.resourceUrl}/exists/hospital-number`, { number: hospitalNum })
            .pipe(map((res => res ? { 'numberExists': true } : null)));
    }
    getStatusDatesByPatient(patientId) {
        return this.http.get(`/api/client-statuses/patient/${patientId}/status-dates`)
            .pipe(map((res) => {
            res.forEach(d => moment(d));
            return res;
        }));
    }
    getSummaryForPatient(id) {
        return this.http.get(`${this.resourceUrl}/${id}/summary`);
    }
    saveClientStatus(status) {
        console.log('Status', status);
        const copy = PatientService_1.convertStatusFromClient(status);
        console.log('Copy', copy);
        return this.http.post('/api/client-statuses', copy, { observe: 'response' });
    }
    updateClientStatus(status) {
        const copy = PatientService_1.convertStatusFromClient(status);
        return this.http.put('/api/client-statuses', copy, { observe: 'response' });
    }
    findClientStatus(id) {
        return this.http.get(`/api/client-statuses/by-uuid/${id}`, { observe: 'response' })
            .pipe(map((res) => {
            res.body.dateTracked = res.body.dateTracked != null ? moment(res.body.dateTracked) : null;
            res.body.dateStatus = res.body.dateStatus != null ? moment(res.body.dateStatus) : null;
            res.body.agreedDate = res.body.agreedDate != null ? moment(res.body.agreedDate) : null;
            return res;
        }));
    }
    currentClientStatus(patientId) {
        return this.http.get(`/api/client-statuses/patient/${patientId}/current`, { responseType: 'text' });
    }
    getStatusName(id) {
        return this.http.get(`/api/client-statuses/${id}/name`, { responseType: 'text' });
    }
    static convertStatusFromClient(status) {
        const copy = Object.assign({}, status, {
            dateStatus: status.dateStatus != null && status.dateStatus.isValid() ? status.dateStatus.format(DATE_FORMAT) : null,
            agreedDate: status.agreedDate != null && status.agreedDate.isValid() ? status.agreedDate.format(DATE_FORMAT) : null,
            dateTracked: status.dateTracked != null && status.dateTracked.isValid() ? status.dateTracked.format(DATE_FORMAT) : null,
        });
        return copy;
    }
    convertDateFromClient(patient) {
        const copy = Object.assign({}, patient, {
            dateBirth: patient.dateBirth != null && patient.dateBirth.isValid() ? patient.dateBirth.format(DATE_FORMAT) : null,
            dateRegistration: patient.dateRegistration != null && patient.dateRegistration.isValid() ? patient.dateRegistration.format(DATE_FORMAT) : null,
            dateStarted: patient.dateStarted != null && patient.dateStarted.isValid() ? patient.dateStarted.format(DATE_FORMAT) : null,
            dateConfirmedHiv: patient.dateConfirmedHiv != null && patient.dateConfirmedHiv.isValid() ? patient.dateConfirmedHiv.format(DATE_FORMAT) : null,
            dateEnrolledPMTCT: patient.dateEnrolledPMTCT != null && patient.dateEnrolledPMTCT.isValid() ? patient.dateEnrolledPMTCT.format(DATE_FORMAT) : null,
            pregnant: patient.pregnancyStatus === 2,
            breastfeeding: patient.pregnancyStatus === 3
        });
        return copy;
    }
    convertDateFromServer(res) {
        if (res.body) {
            res.body.name = res.body.surname + ', ' + res.body.otherNames;
            res.body.dateBirth = res.body.dateBirth != null ? moment(res.body.dateBirth) : null;
            res.body.dateRegistration = res.body.dateRegistration != null ? moment(res.body.dateRegistration) : null;
            res.body.dateConfirmedHiv = res.body.dateConfirmedHiv != null ? moment(res.body.dateConfirmedHiv) : null;
            res.body.dateEnrolledPMTCT = res.body.dateEnrolledPMTCT != null ? moment(res.body.dateEnrolledPMTCT) : null;
            res.body.dateStarted = res.body.dateStarted != null ? moment(res.body.dateStarted) : null;
            res.body.pregnancyStatus = res.body.pregnant != null && res.body.pregnant ? 2 : res.body.gender === 'FEMALE' ? 1 : null;
            res.body.pregnancyStatus = res.body.breastfeeding != null && res.body.breastfeeding ? 3 : res.body.gender === 'FEMALE' ? 1 : null;
        }
        return res;
    }
    convertDateArrayFromServer(res) {
        if (res.body) {
            res.body.forEach((patient) => {
                patient.name = patient.surname + ', ' + patient.otherNames;
                patient.dateBirth = patient.dateBirth != null ? moment(patient.dateBirth) : null;
                patient.dateRegistration = patient.dateRegistration != null ? moment(patient.dateRegistration) : null;
                patient.dateStarted = patient.dateStarted != null ? moment(patient.dateStarted) : null;
            });
        }
        return res;
    }
};
PatientService.ctorParameters = () => [
    { type: HttpClient },
    { type: undefined, decorators: [{ type: Inject, args: [SERVER_API_URL_CONFIG,] }] },
    { type: AuthServerProvider }
];
PatientService.ngInjectableDef = ɵɵdefineInjectable({ factory: function PatientService_Factory() { return new PatientService(ɵɵinject(HttpClient), ɵɵinject(SERVER_API_URL_CONFIG), ɵɵinject(AuthServerProvider)); }, token: PatientService, providedIn: "root" });
PatientService = PatientService_1 = __decorate([
    Injectable({ providedIn: 'root' }),
    __param(1, Inject(SERVER_API_URL_CONFIG)),
    __metadata("design:paramtypes", [HttpClient, Object, AuthServerProvider])
], PatientService);

let PatientListComponent = class PatientListComponent {
    constructor(patientService, notification, router, activatedRoute) {
        this.patientService = patientService;
        this.notification = notification;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.page = 0;
        this.loading = false;
        this.itemsPerPage = 10;
        this.currentSearch = '';
        this.totalItems = 0;
        this.display = 'list';
        this.facility = {};
        this.currentSearch = '';
    }
    ngOnDestroy() {
    }
    ngOnInit() {
        this.patientService.getActiveFacility().subscribe(res => {
            this.facility = res;
            this.onPageChange(0);
        });
    }
    searchPatient(search) {
        this.currentSearch = search;
        this.page = 0;
        this.loadAll();
    }
    select(data) {
        if (!!this.path) {
            this.router.navigateByUrl(`${this.path}/${data.obj.uuid}`);
        }
        else {
            this.router.navigate(['..', 'patients', data.obj.uuid, 'view'], { relativeTo: this.activatedRoute });
        }
    }
    onPageChange(pageInfo) {
        this.page = pageInfo;
        this.loadAll();
    }
    loadPage(page) {
        this.loadAll();
    }
    loadAll() {
        this.loading = true;
        this.patientService.query({
            keyword: this.currentSearch,
            page: this.page > 0 ? this.page - 1 : 0,
            facilityId: this.facility.id || 0,
            size: this.itemsPerPage,
            sort: ['id', 'asc']
        }).subscribe((res) => {
            this.onSuccess(res.body, res.headers);
        }, (res) => this.onError(res));
    }
    onSuccess(data, headers) {
        this.patients = data;
        this.totalItems = headers.get('X-Total-Count');
        this.loading = false;
    }
    onError(error) {
        this.notification.openSnackMessage(error.message);
        this.loading = false;
    }
};
PatientListComponent.ctorParameters = () => [
    { type: PatientService },
    { type: NotificationService },
    { type: Router },
    { type: ActivatedRoute }
];
__decorate([
    Input(),
    __metadata("design:type", String)
], PatientListComponent.prototype, "path", void 0);
PatientListComponent = __decorate([
    Component({
        selector: 'lamis-patients',
        template: "<div class=\"layout\">\n    <div class=\"list-container\">\n        <div class=\"row\">\n            <div class=\"col-md-8 col-md-offset-4\">\n                <div class=\"adf-toolbar--spacer\"></div>\n                <td-search-box backIcon=\"arrow_back\" class=\"push-right-sm\"\n                               placeholder=\"Search here\" [debounce]=\"500\"\n                               [(ngModel)]=\"currentSearch\"\n                               (searchDebounce)=\"searchPatient($event)\"\n                               (search)=\"searchPatient($event)\"\n                               (clear)=\"currentSearch = ''\" flex>\n                </td-search-box>\n            </div>\n        </div>\n        <br/>\n        <adf-datatable *ngIf=\"patients\"\n                       [rows]=\"patients\"\n                       [loading]=\"loading\"\n                       [display]=\"display\"\n                       (rowClick)=\"select($event.value)\">\n            <data-columns>\n                <data-column key=\"name\" title=\"Name\" sortable=\"true\"></data-column>\n                <data-column key=\"hospitalNum\" title=\"Hospital Number\" sortable=\"true\"></data-column>\n                <data-column key=\"uniqueId\" title=\"Unique ID\" sortable=\"true\"></data-column>\n                <data-column key=\"gender\" title=\"Gender\" sortable=\"true\">\n                    <ng-template let-context=\"$implicit\">\n                        {{context.row.getValue('gender') === 'MALE' ? 'Male' : 'Female'}}\n                    </ng-template>\n                </data-column>\n                <data-column key=\"status\" title=\"Current Status\" sortable=\"true\"></data-column>\n                <data-column key=\"phone\" title=\"Telephone Number\" sortable=\"true\"></data-column>\n                <data-column key=\"address\" title=\"Address\" class=\"full-width ellipsis-cell\"></data-column>\n            </data-columns>\n            <adf-loading-content-template>\n                <ng-template>\n                    <mat-progress-spinner\n                            class=\"adf-document-list-loading-margin\"\n                            [color]=\"'primary'\"\n                            [mode]=\"'indeterminate'\">\n                    </mat-progress-spinner>\n                </ng-template>\n            </adf-loading-content-template>\n        </adf-datatable>\n    </div>\n    <adf-empty-content\n            *ngIf=\"!patients\"\n            icon=\"blur_on\"\n            [title]=\"'No Patients found'\"\n            [subtitle]=\"'No Patients matching search criteria or no Patients available'\">\n    </adf-empty-content>\n    <ngb-pagination [collectionSize]=\"totalItems\"\n                    [(page)]=\"page\"\n                    [pageSize]=\"itemsPerPage\"\n                    [maxSize]=\"5\"\n                    size=\"sm\"\n                    [rotate]=\"true\"\n                    [boundaryLinks]=\"true\"\n                    (pageChange)=\"loadPage(page)\">\n    </ngb-pagination>\n\n</div>\n<div class=\"fab-container\">\n    <button mat-fab\n            [matTooltip]=\"'Register New Patient'\"\n            [routerLink]=\"['new']\">\n        <mat-icon>add</mat-icon>\n    </button>\n</div>\n"
    }),
    __metadata("design:paramtypes", [PatientService,
        NotificationService,
        Router,
        ActivatedRoute])
], PatientListComponent);

const moment$1 = moment_;
let PatientDetailsComponent = class PatientDetailsComponent {
    constructor(router, route, patientService, cfr, _dialogService, notificationService, _viewContainerRef, renderer2) {
        this.router = router;
        this.route = route;
        this.patientService = patientService;
        this.cfr = cfr;
        this._dialogService = _dialogService;
        this.notificationService = notificationService;
        this._viewContainerRef = _viewContainerRef;
        this.renderer2 = renderer2;
        this.template = 'patient-details';
        this.properties = [];
    }
    ngOnInit() {
        this.route.data.subscribe(({ entity }) => {
            this.entity = !!entity && entity.body ? entity.body : entity;
            this.patientService.currentClientStatus(entity.uuid).subscribe(res => {
                this.status = res;
            });
            this.attacheWidgets();
            this.getObservations();
        });
    }
    edit() {
        this.router.navigate(['..', 'edit'], { relativeTo: this.route });
    }
    updateStatus() {
        this.router.navigate(['/', 'client-statuses', 'patient', this.entity.uuid, 'new']);
    }
    delete() {
        this._dialogService.openConfirm({
            title: 'Confirm',
            message: 'Do you want to delete this patient, action cannot be reversed?',
            cancelButton: 'No',
            acceptButton: 'Yes',
            width: '500px',
        }).afterClosed().subscribe((accept) => {
            if (accept) {
                this.patientService.delete(this.entity.id).subscribe((res) => {
                    if (res.ok) {
                        this.router.navigate(['patients']);
                    }
                    else {
                        this.notificationService.showError('Error deleting patient, please try again');
                    }
                });
            }
            else {
                // DO SOMETHING ELSE
            }
        });
    }
    previousState() {
        window.history.back();
    }
    getComponentFactory(name) {
        const factories = Array.from(this.cfr['_factories'].values());
        return factories.find((x) => x.componentType.name === name);
    }
    getObservations() {
        this.patientService.observations(this.entity.id).subscribe((res) => this.observations = res);
    }
    addObservation(action) {
        const path = action.path.split('/');
        const parts = ['/'];
        parts.push(...path);
        parts.push('patient', this.entity.uuid, 'new');
        this.router.navigate([...parts]);
    }
    attacheWidgets() {
        this.buildWidget('TimelineComponent', 'Recent Activities', 'timeline');
        this.buildWidget('SummaryWidgetComponent', 'Patient Summary', 'account_balance_wallet');
        /*this.patientService.widgets(this.entity.id).subscribe((res: PatientWidget[]) => {
            res.forEach((widget: PatientWidget) => {
                this.buildWidget(widget.componentName, widget.title, widget.icon);
            })
        });*/
    }
    ngOnDestroy() {
    }
    buildWidget(componentName, title, icon) {
        const factory = this.getComponentFactory(componentName);
        if (factory !== undefined) {
            const parentFactory = this.getComponentFactory('WidgetContainerComponent');
            const componentRef = this.container.createComponent(parentFactory);
            if (!componentRef.instance.embeddedContainer) {
                const cmpName = componentRef.instance.constructor.name;
                throw new TypeError(`Trying to render embedded content. ${cmpName} must have @ViewChild() embeddedContainer defined`);
            }
            console.log('Created component', componentRef);
            const instanceRef = componentRef.instance.embeddedContainer.createComponent(factory);
            this.renderer2.addClass(componentRef.location.nativeElement, 'col-md-6');
            componentRef.instance.icon = icon;
            componentRef.instance.title = title;
            try {
                instanceRef.instance.patientId = this.entity.id;
                instanceRef.instance.patientUuid = this.entity.uuid;
            }
            catch (e) {
            }
        }
    }
    age(dob) {
        let age = moment$1().diff(dob, 'years');
        if (age > 0) {
            return age + ' year(s)';
        }
        age = moment$1().diff(dob, 'months');
        if (age > 0) {
            return age + ' month(s)';
        }
        return moment$1().diff(dob, 'weeks') + ' week(s)';
    }
};
PatientDetailsComponent.ctorParameters = () => [
    { type: Router },
    { type: ActivatedRoute },
    { type: PatientService },
    { type: ComponentFactoryResolver },
    { type: TdDialogService },
    { type: NotificationService },
    { type: ViewContainerRef },
    { type: Renderer2 }
];
__decorate([
    ViewChild('container', { read: ViewContainerRef, static: true }),
    __metadata("design:type", ViewContainerRef)
], PatientDetailsComponent.prototype, "container", void 0);
PatientDetailsComponent = __decorate([
    Component({
        selector: 'lamis-patient',
        template: "<div>\n    <mat-card>\n        <mat-card class=\"dark-blue-100 full-width\">\n            <mat-card-content>\n                <div class=\"row\">\n                    <div class=\"col-md-9\">\n                        <div class=\"row\">\n                            <mat-form-field class=\"col-md-3\">\n                                <mat-label>Surname</mat-label>\n                                <input matInput [value]=\"entity.surname\" disabled style=\"font-weight: 900\">\n                            </mat-form-field>\n                            <mat-form-field class=\"col-md-3\">\n                                <mat-label>Other Names</mat-label>\n                                <input matInput [value]=\"entity.otherNames\" disabled style=\"font-weight: 900\">\n                            </mat-form-field>\n                            <div class=\"col-md-1\"></div>\n                            <div class=\"col-md-3\">\n                                <span style=\"font-size: 12px\">\n                                    {{entity.gender === 'FEMALE' ? 'Female' : 'Male'}} {{age(entity.dateBirth)}}\n                                    ({{entity.dateBirth | date: 'dd MMM, yyyy'}})\n                                </span>\n                            </div>\n                            <mat-form-field class=\"col-md-2\">\n                                <mat-label>Hospital Number</mat-label>\n                                <input matInput [value]=\"entity.hospitalNum\" disabled style=\"font-weight: 900\">\n                            </mat-form-field>\n                        </div>\n                        <div class=\"row\">\n                            <mat-form-field class=\"col-md-8\">\n                                <mat-label>Address</mat-label>\n                                <input matInput [value]=\"entity.address\" disabled style=\"font-weight: 800\">\n                            </mat-form-field>\n                            <mat-form-field class=\"col-md-4\">\n                                <mat-label>Telephone Number</mat-label>\n                                <input matInput [value]=\"entity.phone || ' '\" disabled style=\"font-weight: 700\">\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div class=\"col-md-3\">\n                        <mat-form-field class=\"col-md-12\">\n                            <mat-label>Current Status</mat-label>\n                            <input matInput [value]=\"status\" disabled style=\"font-weight: 800\">\n                        </mat-form-field>\n                        <a (click)=\"previousState()\" class=\"dark-blue-200\">BACK</a>\n                    </div>\n                </div>\n            </mat-card-content>\n        </mat-card>\n        <div class=\"\">\n            <div class=\"row\">\n                <div class=\"col-md-9\">\n                    <div class=\"row\">\n                        <div #container></div>\n                    </div>\n                </div>\n                <div class=\"col-md-3\">\n                    <mat-card class=\"dark-blue-200\">\n                        <mat-card-header>\n                            General Actions\n                        </mat-card-header>\n                        <mat-divider></mat-divider>\n                        <mat-card-content>\n                            <mat-nav-list>\n                                <mat-list-item *ngFor=\"let action of observations\">\n                                    <mat-icon mat-list-icon>{{action.icon || 'dashboard'}}</mat-icon>\n                                    <a mat-line matTooltip=\"{{action.tooltip || ''}}\"\n                                       (click)=\"addObservation(action)\">{{action.name}}</a>\n                                </mat-list-item>\n                                <mat-list-item>\n                                    <mat-icon mat-list-icon>edit</mat-icon>\n                                    <a mat-line matTooltip=\"Update Patient Status\" (click)=\"updateStatus()\">Update\n                                        Client Status</a>\n                                </mat-list-item>\n                                <mat-list-item>\n                                    <mat-icon mat-list-icon>edit</mat-icon>\n                                    <a mat-line matTooltip=\"Edit Patient registration information\"\n                                       (click)=\"edit()\">Edit Registration\n                                        Information</a>\n                                </mat-list-item>\n                                <mat-list-item>\n                                    <mat-icon mat-list-icon>delete</mat-icon>\n                                    <a mat-line matTooltip=\"Delete patient\" (click)=\"delete()\">Delete Patient</a>\n                                </mat-list-item>\n                            </mat-nav-list>\n                        </mat-card-content>\n                    </mat-card>\n                </div>\n            </div>\n        </div>\n    </mat-card>\n</div>\n",
        styles: [".bold{font-weight:700}"]
    }),
    __metadata("design:paramtypes", [Router, ActivatedRoute, PatientService,
        ComponentFactoryResolver, TdDialogService,
        NotificationService, ViewContainerRef,
        Renderer2])
], PatientDetailsComponent);

const moment$2 = moment_;
let PatientEditComponent = class PatientEditComponent {
    constructor(patientService, notification, loaderService, _dialogService, activatedRoute) {
        this.patientService = patientService;
        this.notification = notification;
        this.loaderService = loaderService;
        this._dialogService = _dialogService;
        this.activatedRoute = activatedRoute;
        this.template = 'patient-edit';
        this.ovc = {};
        this.error = false;
        this.today = moment$2();
        this.minDob = moment$2().subtract(75, 'years');
        this.minDateRegistration = moment$2('1998', 'YYYY');
        this.maxDateBirth = moment$2().subtract(2, 'months');
        this.maxDateConfirmed = moment$2();
        this.minDateConfirmed = moment$2('1998', 'YYYY');
        this.ovcApplicable = false;
        this.prep = false;
    }
    createEntity() {
        return {};
    }
    ngOnInit() {
        this.patientService.getActiveFacility().subscribe((res) => {
            this.entity.facility = res;
        });
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ entity }) => {
            this.entity = !!entity && entity.body ? entity.body : entity;
            if (this.entity === undefined) {
                this.entity = this.createEntity();
                this.entity.extra = {
                    art: true
                };
            }
            if (this.entity.id) {
                this.ovcMin = this.entity.dateBirth.clone();
            }
            if (this.entity.id && this.entity.lga) {
                this.minDateRegistration = this.entity.dateBirth.clone().add(2, 'month');
                this.minDateConfirmed = this.entity.dateBirth.clone().add(1, 'month');
                this.patientService.getStateByLga(this.entity.lga.id).subscribe(res => {
                    this.state = res;
                    this.stateChange(this.state.id);
                });
            }
            if (this.entity.extra) {
                this.targetGroup = this.entity.extra.targetGroup;
            }
            if (this.entity.extra && this.entity.extra.prep) {
                this.prep = true;
                this.indicationForPrep = this.entity.extra.prep.indicationForPrep;
                this.prepId = this.entity.extra.prep.prepId;
                this.onDemandIndication = this.entity.extra.prep.onDemandIndication;
            }
            if (this.entity.extra && this.entity.extra.ovc) {
                this.ovc.householdUniqueNo = this.entity.extra.ovc.householdUniqueNo;
                this.ovc.referredTo = this.entity.extra.ovc.referredTo;
                this.ovc.referredFrom = this.entity.extra.ovc.referredFrom;
                if (!!this.entity.extra.ovc.dateReferredTo) {
                    this.ovc.dateReferredTo = moment$2(this.entity.extra.ovc.dateReferredTo);
                }
                if (!!this.entity.extra.ovc.dateReferredFrom) {
                    this.ovc.dateReferredFrom = moment$2(this.entity.extra.ovc.dateReferredFrom);
                }
                if (!this.entity.extra.ovc.servicesProvided) {
                    this.ovc.servicesProvided = [];
                }
            }
            const date = this.entity.dateBirth && this.entity.dateBirth.clone() || moment$2('1998-01-01', 'YYYY-MM-DD');
            if (!moment$2().subtract(17, 'years').isAfter(date)) {
                this.ovcApplicable = true;
            }
            this.patientForm.form.setErrors({ 'invalid': true });
            this.patientForm.form.markAllAsTouched();
        });
        this.patientService.getStates().subscribe(res => this.states = res);
    }
    entityCompare(e1, e2) {
        return entityCompare(e1, e2);
    }
    estimateDob() {
        if (this.age && this.ageUnit && this.entity.dateRegistration) {
            const dateRegistration = this.entity.dateRegistration;
            this.entity.dateBirth = dateRegistration.clone().subtract(this.age, this.ageUnit);
            this.ovcMin = this.entity.dateBirth.clone();
            this.minDateConfirmed = this.entity.dateBirth.clone().add(1, 'months');
            this.ovcApplicable = !this.entity.dateRegistration.clone().subtract(17, 'years').isAfter(this.entity.dateBirth);
        }
    }
    stateChange(id) {
        this.patientService.getLgasByState(id).subscribe(res => this.lgas = res);
    }
    statusChanged() {
        this.prep = this.entity.statusAtRegistration === 'HIV_NEGATIVE';
        if (this.prep) {
            this.entity.extra['art'] = false;
            this.entity.extra.prep = {
                registered: true
            };
        }
        else {
            this.entity.extra['art'] = true;
            this.entity.extra.prep = {
                registered: false
            };
        }
    }
    previousState() {
        window.history.back();
    }
    dateBirthChanged(date) {
        this.minDateRegistration = date.clone().add(2, 'months');
        this.minDateConfirmed = date.clone().add(1, 'months');
        if (this.minDateRegistration.isBefore(moment$2('1998', 'YYYY'), 'day')) {
            this.minDateRegistration = moment$2('1998', 'YYYY');
            this.minDateConfirmed = moment$2('1998', 'YYYY');
        }
        this.ovcMin = date.clone();
        if (!!this.entity.dateRegistration) {
            this.ovcApplicable = !this.entity.dateRegistration.clone().subtract(17, 'years').isAfter(this.entity.dateBirth);
        }
    }
    dateRegistrationChanged(date) {
        this.maxDateBirth = date.clone().subtract(2, 'months');
        this.maxDateConfirmed = date.clone();
        if (!!this.entity.dateBirth) {
            this.ovcApplicable = !this.entity.dateRegistration.clone().subtract(17, 'years').isAfter(this.entity.dateBirth);
        }
    }
    save() {
        //this.progressBar.mode = 'indeterminate';
        this.isSaving = true;
        if (this.prep) {
            if (!this.entity.extra) {
                this.entity.extra = {};
            }
            this.entity.extra.prep = {
                registered: true,
                prepId: this.prepId,
                indicationForPrep: this.indicationForPrep,
                onDemandIndication: this.onDemandIndication
            };
        }
        else {
            this.entity.extra.prep = {
                registered: false
            };
        }
        if (this.ovcApplicable) {
            if (!this.entity.extra) {
                this.entity.extra = {};
            }
            this.entity.extra.ovc = {};
            this.entity.extra.ovc = this.ovc;
            this.entity.extra.ovc.dateReferredFrom = this.ovc.dateReferredFrom != null && this.ovc.dateReferredFrom.isValid() ?
                this.ovc.dateReferredFrom.format(DATE_FORMAT) : null;
            this.entity.extra.ovc.dateReferredTo = this.ovc.dateReferredTo != null && this.ovc.dateReferredTo.isValid() ?
                this.ovc.dateReferredTo.format(DATE_FORMAT) : null;
            if (!!this.ovc.householdUniqueNo && !(!!this.ovc.referredFrom || !!this.ovc.referredTo)) {
                this._dialogService.openAlert({
                    title: 'OVC Partner is required',
                    message: 'Please indicate either OVC Partner transferred to or from',
                    disableClose: true
                });
                return;
            }
            if ((!!this.ovc.referredTo || !!this.ovc.referredFrom) && !this.ovc.householdUniqueNo) {
                this._dialogService.openAlert({
                    title: 'Household number is required',
                    message: 'Please indicate Household Unique No',
                    disableClose: true
                });
                return;
            }
            if (!!this.ovc.referredFrom && !!this.ovc.referredTo) {
                this._dialogService.openAlert({
                    title: 'OVC Partner mismatch',
                    message: 'Please provide either OVC Partner transfer to or from, not both',
                    disableClose: true
                });
                return;
            }
        }
        if (this.targetGroup) {
            this.entity.extra.targetGroup = this.targetGroup;
        }
        this.loaderService.open('Saving patient...');
        if (!this.entity.id) {
            if (this.entity.dobEstimated) {
                this.entity.dateBirth = this.entity.dateRegistration.clone().subtract(this.age, this.ageUnit);
            }
            this.subscribeToSaveResponse(this.patientService.create(this.entity));
        }
        else {
            this.subscribeToSaveResponse(this.patientService.update(this.entity));
        }
    }
    subscribeToSaveResponse(result) {
        this.loaderService.close();
        result.subscribe((res) => this.onSaveSuccess(res.body), (res) => {
            this.onSaveError();
            this.onError(res.message);
        });
    }
    onSaveSuccess(result) {
        this.isSaving = false;
        this.notification.showInfo('Patient successfully saved');
        this.previousState();
    }
    onSaveError() {
        this.isSaving = false;
        this.error = true;
        //this.progressBar.mode = 'determinate';
    }
    onError(errorMessage) {
        this.notification.showError(errorMessage);
    }
    isOVCAge() {
        if (this.age && this.ageUnit === 'years') {
            if (this.age >= 10 && this.age <= 24) {
                return true;
            }
        }
        const dob = this.entity.dateBirth.clone();
        const diff = this.entity.dateRegistration.clone().diff(dob);
        return diff >= 10 && diff <= 24;
    }
};
PatientEditComponent.ctorParameters = () => [
    { type: PatientService },
    { type: NotificationService },
    { type: AppLoaderService },
    { type: TdDialogService },
    { type: ActivatedRoute }
];
__decorate([
    ViewChild('patientForm', { static: true }),
    __metadata("design:type", NgForm)
], PatientEditComponent.prototype, "patientForm", void 0);
PatientEditComponent = __decorate([
    Component({
        selector: 'lamis-patient-edit',
        template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <form name=\"form\" role=\"form\" novalidate (ngSubmit)=\"save()\" #patientForm=\"ngForm\">\n            <mat-card class=\"default\">\n                <mat-card-content>\n                    <mat-divider></mat-divider>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Hospital Number</mat-label>\n                                <input matInput [(ngModel)]=\"entity.hospitalNum\" #hospitalNum=\"ngModel\"\n                                       [required]=\"!entity.id\"\n                                       uniqueHospitalNum\n                                       [disabled]=\"!!entity.id\"\n                                       name=\"hospitalNum\"/>\n                                <mat-error\n                                        *ngIf=\"hospitalNum.errors && (hospitalNum.dirty || hospitalNum.touched) && (hospitalNum.errors.required)\">\n                                    Hospital Number is required\n                                </mat-error>\n                                <mat-error\n                                        *ngIf=\"hospitalNum.errors && (hospitalNum.dirty || hospitalNum.touched) && (hospitalNum.errors.numberExists)\">\n                                    Hospital Number is used by another patient\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Unique ID</mat-label>\n                                <input matInput [(ngModel)]=\"entity.uniqueId\" name=\"uniqueId\"/>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\" *ngIf=\"!!minDateRegistration\">\n                            <mat-form-field class=\"full-width\">\n                                <input matInput [matDatepicker]=\"picker\"\n                                       placeholder=\"Date of Registration/Transfer-In\"\n                                       [(ngModel)]=\"entity.dateRegistration\"\n                                       #registration=\"ngModel\"\n                                       [max]=\"today\"\n                                       [min]=\"minDateRegistration\"\n                                       (dateChange)=\"dateRegistrationChanged($event.value)\"\n                                       name=\"registration\"\n                                       required>\n                                <mat-datepicker-toggle\n                                        matSuffix\n                                        [for]=\"picker\">\n                                </mat-datepicker-toggle>\n                                <mat-datepicker #picker></mat-datepicker>\n                                <mat-error\n                                        *ngIf=\"registration.errors && (registration.dirty || registration.touched || !!entity.id) && (registration.errors.required)\">\n                                    Date of Registration is required\n                                </mat-error>\n                                <mat-error\n                                        *ngIf=\"registration.errors && (registration.dirty || registration.touched || !!entity.id) && (registration.errors.min)\">\n                                    Date of Registration cannot be before {{minDateRegistration | date: 'dd MMM, yyyy'}}\n                                </mat-error>\n                                <mat-error\n                                        *ngIf=\"registration.errors && (registration.dirty || registration.touched || !!entity.id) && (registration.errors.max)\">\n                                    Date of Registration cannot be in the future\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Surname</mat-label>\n                                <input matInput [(ngModel)]=\"entity.surname\" #sn=\"ngModel\"\n                                       required\n                                       [minLength]=\"2\"\n                                       name=\"sn\"/>\n                                <mat-error\n                                        *ngIf=\"sn.errors && (sn.dirty || sn.touched || !!entity.id) && (sn.errors.required)\">\n                                    Surname is required\n                                </mat-error>\n                                <mat-error\n                                        *ngIf=\"sn.errors && (sn.dirty || sn.touched || !!entity.id) && (sn.errors.minLength)\">\n                                    Minimum length for Surname is 2 characters\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Other Names</mat-label>\n                                <input matInput [(ngModel)]=\"entity.otherNames\" #on=\"ngModel\"\n                                       required\n                                       [minLength]=\"5\"\n                                       name=\"on\"/>\n                                <mat-error\n                                        *ngIf=\"on.errors && (on.dirty || on.touched || !!entity.id) && (on.errors.required)\">\n                                    Other Names required\n                                </mat-error>\n                                <mat-error\n                                        *ngIf=\"on.errors && (on.dirty || on.touched || !!entity.id) && (on.errors.minLength)\">\n                                    Minimum length for Other Names is 5 characters\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div *ngIf=\"!entity.id\">\n                        <fieldset>\n                            <div class=\"row\">\n                                <div class=\"col-md-6\">\n                                    <mat-checkbox [(ngModel)]=\"entity.dobEstimated\" name=\"est\">Age Estimated?\n                                    </mat-checkbox>\n                                </div>\n                                <div class=\"col-md-6\">\n                                    <div *ngIf=\"entity.dobEstimated\" class=\"row\">\n                                        <div class=\"col-md-6\">\n                                            <mat-form-field class=\"full-width\">\n                                                <mat-label>Age at Registration</mat-label>\n                                                <input matInput [(ngModel)]=\"age\" required\n                                                       [min]=\"2\"\n                                                       [max]=\"70\"\n                                                       (change)=\"estimateDob()\"\n                                                       name=\"age\" #age1=\"ngModel\">\n                                                <mat-error\n                                                        *ngIf=\"age1.errors && (age1.dirty || age1.touched) && (age1.errors.min)\">\n                                                    Minimum age is 2\n                                                </mat-error>\n                                                <mat-error\n                                                        *ngIf=\"age1.errors && (age1.dirty || age1.touched) && (age1.errors.max)\">\n                                                    Maximum age is 70\n                                                </mat-error>\n                                                <mat-error\n                                                        *ngIf=\"age1.errors && (age1.dirty || age1.touched) && (age1.errors.required)\">\n                                                    Estimated age is required\n                                                </mat-error>\n                                            </mat-form-field>\n                                        </div>\n                                        <div class=\"col-md-6\">\n                                            <mat-form-field class=\"full-width\">\n                                                <mat-label>Age Units</mat-label>\n                                                <mat-select [(ngModel)]=\"ageUnit\"\n                                                            (selectionChange)=\"estimateDob()\"\n                                                            required name=\"units\" #units=\"ngModel\">\n                                                    <mat-option></mat-option>\n                                                    <mat-option [value]=\"'years'\">Year(s)</mat-option>\n                                                    <mat-option [value]=\"'months'\">Month(s)</mat-option>\n                                                </mat-select>\n                                                <mat-error\n                                                        *ngIf=\"units.errors && (units.dirty || units.touched) && (units.errors.required)\">\n                                                    Age units is required\n                                                </mat-error>\n                                            </mat-form-field>\n                                        </div>\n                                    </div>\n                                    <div>\n                                        <mat-form-field class=\"full-width\" *ngIf=\"!entity.dobEstimated\">\n                                            <input matInput [matDatepicker]=\"picker1\"\n                                                   placeholder=\"Date of Birth\"\n                                                   [(ngModel)]=\"entity.dateBirth\"\n                                                   [min]=\"minDob\"\n                                                   (dateChange)=\"dateBirthChanged($event.value)\"\n                                                   required\n                                                   [max]=\"maxDateBirth\"\n                                                   #dob1=\"ngModel\"\n                                                   name=\"dob\">\n                                            <mat-datepicker-toggle\n                                                    matSuffix\n                                                    [for]=\"picker1\">\n                                            </mat-datepicker-toggle>\n                                            <mat-datepicker #picker1></mat-datepicker>\n                                            <mat-error\n                                                    *ngIf=\"dob1.errors && (dob1.dirty || dob1.touched) && (dob1.errors.required)\">\n                                                Date of Birth is required\n                                            </mat-error>\n                                        </mat-form-field>\n                                    </div>\n                                </div>\n                            </div>\n                        </fieldset>\n                    </div>\n                    <div *ngIf=\"entity.id\">\n                        <div class=\"row\">\n                            <div class=\"col-md-6\">\n                                <mat-form-field class=\"full-width\" *ngIf=\"minDob\">\n                                    <input matInput [matDatepicker]=\"picker2\"\n                                           placeholder=\"Date of Birth\"\n                                           [(ngModel)]=\"entity.dateBirth\"\n                                           #birth=\"ngModel\"\n                                           (dateChange)=\"dateBirthChanged($event.value)\"\n                                           [max]=\"maxDateBirth\"\n                                           [min]=\"minDob\"\n                                           name=\"dob\"\n                                           required>\n                                    <mat-datepicker-toggle\n                                            matSuffix\n                                            [for]=\"picker2\">\n                                    </mat-datepicker-toggle>\n                                    <mat-datepicker #picker2></mat-datepicker>\n                                    <mat-error\n                                            *ngIf=\"birth.errors && (birth.dirty || birth.touched || !!entity.id) && (birth.errors.required)\">\n                                        Date of Birth is required\n                                    </mat-error>\n                                    <mat-error\n                                            *ngIf=\"birth.errors && (birth.dirty || birth.touched || !!entity.id) && (birth.errors.max)\">\n                                        Date of Birth cannot be after Date of Registration\n                                    </mat-error>\n                                </mat-form-field>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Gender</mat-label>\n                                <mat-select [(ngModel)]=\"entity.gender\"\n                                            required name=\"gender\" #gender=\"ngModel\">\n                                    <mat-option></mat-option>\n                                    <mat-option [value]=\"'FEMALE'\">Female</mat-option>\n                                    <mat-option [value]=\"'MALE'\">Male</mat-option>\n                                </mat-select>\n                                <mat-error\n                                        *ngIf=\"gender.errors && (gender.dirty || gender.touched || !!entity.id) && (gender.errors.required)\">\n                                    Gender is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Marital Status</mat-label>\n                                <mat-select [(ngModel)]=\"entity.maritalStatus\"\n                                            required name=\"status\" #status=\"ngModel\">\n                                    <mat-option></mat-option>\n                                    <mat-option [value]=\"'Single'\">Single</mat-option>\n                                    <mat-option [value]=\"'Married'\">Married</mat-option>\n                                    <mat-option [value]=\"'Widowed'\">Widowed</mat-option>\n                                    <mat-option [value]=\"'Separated'\">Separated</mat-option>\n                                    <mat-option [value]=\"'Divorced'\">Divorced</mat-option>\n                                </mat-select>\n                                <mat-error\n                                        *ngIf=\"status.errors && (status.dirty || status.touched || !!entity.id) && (status.errors.required)\">\n                                    Marital Status is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Job /Occupation Status</mat-label>\n                                <mat-select name=\"occupation\" [(ngModel)]=\"entity.occupation\">\n                                    <mat-option></mat-option>\n                                    <mat-option [value]=\"'Unemployed'\">Unemployed</mat-option>\n                                    <mat-option [value]=\"'Employed'\">Employed</mat-option>\n                                    <mat-option [value]=\"'Student'\">Student</mat-option>\n                                    <mat-option [value]=\"'Retired'\">Retired</mat-option>\n                                </mat-select>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Educational Level</mat-label>\n                                <mat-select name=\"education\" [(ngModel)]=\"entity.education\">\n                                    <mat-option></mat-option>\n                                    <mat-option [value]=\"'None'\">None</mat-option>\n                                    <mat-option [value]=\"'Primary'\">Primary</mat-option>\n                                    <mat-option [value]=\"'Senior Secondary'\">Senior Secondary</mat-option>\n                                    <mat-option [value]=\"'Quranic'\">Quranic</mat-option>\n                                    <mat-option [value]=\"'Junior Secondary'\">Junior Secondary</mat-option>\n                                    <mat-option [value]=\"'Post Secondary'\">Post Secondary</mat-option>\n                                </mat-select>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>State of Residence</mat-label>\n                                <mat-select name=\"state\" [(ngModel)]=\"state\"\n                                            [compareWith]=\"entityCompare\"\n                                            (selectionChange)=\"stateChange($event.value.id)\">\n                                    <mat-option></mat-option>\n                                    <mat-option *ngFor=\"let state of states\" [value]=\"state\">{{state.name}}</mat-option>\n                                </mat-select>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>LGA of Residence</mat-label>\n                                <mat-select name=\"lga\" [(ngModel)]=\"entity.lga\" required #lga=\"ngModel\"\n                                            [compareWith]=\"entityCompare\">\n                                    <mat-option></mat-option>\n                                    <mat-option *ngFor=\"let lga of lgas\" [value]=\"lga\">{{lga.name}}</mat-option>\n                                </mat-select>\n                                <mat-error\n                                        *ngIf=\"lga.errors && (lga.dirty || lga.touched || !!entity.id) && (lga.errors.required)\">\n                                    LGA of Residence is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label class=\"form-label\">Address</mat-label>\n                                <textarea name=\"address\" matInput [(ngModel)]=\"entity.address\"\n                                          rows=\"3\"\n                                          required #address=\"ngModel\"></textarea>\n                                <mat-error\n                                        *ngIf=\"address.errors && (address.dirty || address.touched || !!entity.id) && (address.errors.required)\">\n                                    Address is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Telephone Number</mat-label>\n                                <input matInput name=\"phone\" phoneNumber [(ngModel)]=\"entity.phone\" #phone=\"ngModel\"/>\n                                <mat-error\n                                        *ngIf=\"phone.errors && (phone.dirty || phone.touched || !!entity.id) && (phone.errors.invalidPhone)\">\n                                    Invalid phone number\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Target group</mat-label>\n                                <mat-select name=\"tg\" [(ngModel)]=\"targetGroup\"\n                                            required #tg=\"ngModel\">\n                                    <mat-option></mat-option>\n                                    <mat-option [value]=\"'CSW'\">CSW</mat-option>\n                                    <mat-option [value]=\"'FSW'\">FSW</mat-option>\n                                    <mat-option [value]=\"'TRANSGENDER'\">Transgender</mat-option>\n                                    <mat-option [value]=\"'MSM'\">MSM</mat-option>\n                                    <mat-option [value]=\"'PWID'\">PWID</mat-option>\n                                    <mat-option [value]=\"'PRISON'\">Prison</mat-option>\n                                </mat-select>\n                                <mat-error\n                                        *ngIf=\"tg.errors && (tg.dirty || tg.touched || !!entity.id) && (tg.errors.required)\">\n                                    Target Group is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>HIV Status at Registration</mat-label>\n                                <mat-select name=\"statusRegistration\" [(ngModel)]=\"entity.statusAtRegistration\"\n                                            (selectionChange)=\"statusChanged()\"\n                                            required #status=\"ngModel\">\n                                    <mat-option></mat-option>\n                                    <mat-option [value]=\"'HIV_EXPOSED_STATUS_UNKNOWN'\">HIV Exposed Status Unknown\n                                    </mat-option>\n                                    <mat-option [value]=\"'HIV_PLUS_NON_ART'\">HIV+ non ART</mat-option>\n                                    <mat-option [value]=\"'ART_TRANSFER_IN'\">ART Transfer In</mat-option>\n                                    <mat-option [value]=\"'PRE_ART_TRANSFER_IN'\">Pre-ART Transfer In</mat-option>\n                                    <mat-option [value]=\"'HIV_NEGATIVE'\">HIV Negative</mat-option>\n                                </mat-select>\n                                <mat-error\n                                        *ngIf=\"status.errors && (status.dirty || status.touched || !!entity.id) && (status.errors.required)\">\n                                    HIV Status at Registration is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Care Entry Point</mat-label>\n                                <mat-select name=\"entryPoint\" [(ngModel)]=\"entity.entryPoint\"\n                                            #entryPoint=\"ngModel\">\n                                    <mat-option></mat-option>\n                                    <mat-option [value]=\"'OPD'\">OPD</mat-option>\n                                    <mat-option [value]=\"'In-patient'\">In-patient</mat-option>\n                                    <mat-option [value]=\"'HCT'\">HCT</mat-option>\n                                    <mat-option [value]=\"'TB DOTS'\">TB DOTS</mat-option>\n                                    <mat-option [value]=\"'STI Clinic'\">STI Clinic</mat-option>\n                                    <mat-option [value]=\"'PMTCT'\">PMTCT</mat-option>\n                                    <mat-option [value]=\"'Transfer-in'\">Transfer-in</mat-option>\n                                    <mat-option [value]=\"'Outreach'\">Outreach</mat-option>\n                                    <mat-option [value]=\"'OVC Partner'\">OVC Partner</mat-option>\n                                    <mat-option [value]=\"'Others'\">Others</mat-option>\n                                </mat-select>\n                                <mat-error\n                                        *ngIf=\"entryPoint.errors && (entryPoint.dirty || entryPoint.touched || !!entity.id) && (entryPoint.errors.required)\">\n                                    Care Entry Point is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <ng-container *ngIf=\"prep\">\n                        <fieldset>\n                            <legend>PrEP</legend>\n                            <div class=\"row\">\n                                <div class=\"col-md-6\">\n                                    <mat-form-field class=\"full-width\">\n                                        <mat-label>PrEP ID</mat-label>\n                                        <input matInput name=\"prepId\" required [(ngModel)]=\"prepId\" #prepID=\"ngModel\"/>\n                                        <mat-error\n                                                *ngIf=\"prepID.errors && (prepID.dirty || prepID.touched || !!entity.id) && (prepID.errors.required)\">\n                                            PrEP ID is required\n                                        </mat-error>\n                                    </mat-form-field>\n                                </div>\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col-md-6\">\n                                    <mat-form-field class=\"full-width\">\n                                        <mat-label>Indication for PrEP</mat-label>\n                                        <mat-select name=\"indication\" required #indication=\"ngModel\"\n                                                    [(ngModel)]=\"indicationForPrep\">\n                                            <mat-option></mat-option>\n                                            <mat-option [value]=\"'Sero-Discordant Relationship'\">Sero-Discordant\n                                                Relationship\n                                            </mat-option>\n                                            <mat-option [value]=\"'On Demand'\">On Demand</mat-option>\n                                        </mat-select>\n                                        <mat-error\n                                                *ngIf=\"indication.errors && (indication.dirty || indication.touched || !!entity.id) && (indication.errors.required)\">\n                                            Indication for PrEP is required\n                                        </mat-error>\n                                    </mat-form-field>\n                                </div>\n                                <div class=\"col-md-6\" *ngIf=\"indicationForPrep === 'On Demand'\">\n                                    <mat-form-field class=\"full-width\">\n                                        <mat-label>On Demand Type</mat-label>\n                                        <mat-select name=\"type\" required #type=\"ngModel\"\n                                                    [(ngModel)]=\"onDemandIndication\">\n                                            <mat-option></mat-option>\n                                            <mat-option [value]=\"'Partner Non-disclosure'\">Partner Non-disclosure\n                                            </mat-option>\n                                            <mat-option [value]=\"'Partner unwilling to undergo HIV testing'\">Partner\n                                                unwilling to undergo HIV testing\n                                            </mat-option>\n                                            <mat-option [value]=\"'Client unable to negotiate condom use'\">Client unable\n                                                to negotiate condom use\n                                            </mat-option>\n                                            <mat-option [value]=\"'Individuals with high risk sexual behaviors'\">\n                                                Individuals with high risk sexual behaviors\n                                            </mat-option>\n                                            <mat-option [value]=\"'Others'\">Others</mat-option>\n                                        </mat-select>\n                                        <mat-error\n                                                *ngIf=\"type.errors && (type.dirty || type.touched || !!entity.id) && (type.errors.required)\">\n                                            On Demand is required\n                                        </mat-error>\n                                    </mat-form-field>\n                                </div>\n                            </div>\n                        </fieldset>\n                    </ng-container>\n                    <div class=\"row\" *ngIf=\"entity.gender === 'FEMALE'\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Time of HIV Diagnosis</mat-label>\n                                <mat-select name=\"timeHivDiagnosis\" [(ngModel)]=\"entity.timeHivDiagnosis\">\n                                    <mat-option></mat-option>\n                                    <mat-option [value]=\"'Previous - Non pregnant'\">Previous - Non pregnant</mat-option>\n                                    <mat-option [value]=\"'Previous pregnancy (ANC)'\">Previous pregnancy (ANC)\n                                    </mat-option>\n                                    <mat-option [value]=\"'Previous pregnancy (L&amp;D)'\">Previous pregnancy (L&amp;D)\n                                    </mat-option>\n                                    <mat-option [value]=\"'Previous pregnancy (PP &lt;72hrs)'\">Previous pregnancy (PP\n                                        &lt;72hrs)\n                                    </mat-option>\n                                    <mat-option [value]=\"'ANC'\">ANC</mat-option>\n                                    <mat-option [value]=\"'Labour'\">Labour</mat-option>\n                                    <mat-option [value]=\"'Post Partum &lt;=72hrs'\">Post Partum &lt;=72hrs</mat-option>\n                                    <mat-option [value]=\"'Post Partum &gt;72hrs'\">Post Partum &gt;72hrs</mat-option>\n                                </mat-select>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Date enrolled into PMTCT</mat-label>\n                                <input matInput [matDatepicker]=\"picker3\"\n                                       [(ngModel)]=\"entity.dateEnrolledPMTCT\"\n                                       #pmtct=\"ngModel\"\n                                       [max]=\"entity.dateRegistration\"\n                                       [min]=\"entity.dateBirth\"\n                                       name=\"pmtct\">\n                                <mat-datepicker-toggle\n                                        matSuffix\n                                        [for]=\"picker3\">\n                                </mat-datepicker-toggle>\n                                <mat-datepicker #picker3></mat-datepicker>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div class=\"row\" *ngIf=\"entity.gender === 'FEMALE'\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Pregnancy Status</mat-label>\n                                <mat-select name=\"pregnancyStatus\" [(ngModel)]=\"entity.pregnancyStatus\">\n                                    <mat-option></mat-option>\n                                    <mat-option value=\"1\">Not Pregnant</mat-option>\n                                    <mat-option value=\"2\">Pregnant</mat-option>\n                                    <mat-option value=\"3\">Breastfeeding</mat-option>\n                                </mat-select>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Source of Referral</mat-label>\n                                <mat-select name=\"sourceReferral\" [(ngModel)]=\"entity.sourceReferral\">\n                                    <mat-option></mat-option>\n                                    <mat-option [value]=\"'PMTCT outreach'\">PMTCT outreach</mat-option>\n                                    <mat-option [value]=\"'Sex worker outreach'\">Sex worker outreach</mat-option>\n                                    <mat-option [value]=\"'Medical outpatient'\">Medical outpatient</mat-option>\n                                    <mat-option [value]=\"'Youth/Adolescent outreach'\">Youth/Adolescent outreach\n                                    </mat-option>\n                                    <mat-option [value]=\"'Private/Commercial Health facility'\">Private/Commercial Health\n                                        facility\n                                    </mat-option>\n                                    <mat-option [value]=\"'Under-fives/Immunization clinic'\">Under-fives/Immunization\n                                        clinic\n                                    </mat-option>\n                                    <mat-option [value]=\"'External HCT centre'\">External HCT centre</mat-option>\n                                    <mat-option [value]=\"'OVC Partner'\">OVC Partner</mat-option>\n                                    <mat-option [value]=\"'In-patients'\">In-patients</mat-option>\n                                    <mat-option [value]=\"'Self-referral'\">Self-referral</mat-option>\n                                </mat-select>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Enrollment Setting</mat-label>\n                                <mat-select name=\"enrollmentSetting\" [(ngModel)]=\"entity.enrollmentSetting\"\n                                            [required]=\"true\" #setting=\"ngModel\">\n                                    <mat-option></mat-option>\n                                    <mat-option [value]=\"'Facility'\">Facility</mat-option>\n                                    <mat-option [value]=\"'Community'\">Community</mat-option>\n                                </mat-select>\n                                <mat-error\n                                        *ngIf=\"setting.errors && (setting.dirty || setting.touched || !!entity.id) && (setting.errors.required)\">\n                                    Enrollment Setting is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\"\n                                            *ngIf=\"minDateConfirmed && entity.statusAtRegistration !== 'HIV_NEGATIVE'\">\n                                <mat-label>Date of Confirmed HIV Test</mat-label>\n                                <input matInput [matDatepicker]=\"picker2\"\n                                       [(ngModel)]=\"entity.dateConfirmedHiv\"\n                                       #time=\"ngModel\"\n                                       [max]=\"maxDateConfirmed\"\n                                       [min]=\"minDateConfirmed\"\n                                       required\n                                       name=\"time\">\n                                <mat-datepicker-toggle\n                                        matSuffix\n                                        [for]=\"picker2\">\n                                </mat-datepicker-toggle>\n                                <mat-datepicker #picker2></mat-datepicker>\n                                <mat-error\n                                        *ngIf=\"time.errors && (time.dirty || time.touched || !!entity.id) && (time.errors.required)\">\n                                    Date of Confirmed HIV Test is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>TB Status</mat-label>\n                                <mat-select name=\"tbStatus\" [(ngModel)]=\"entity.tbStatus\">\n                                    <mat-option></mat-option>\n                                    <mat-option [value]=\"'No sign or symptoms of TB'\">No sign or symptoms of TB\n                                    </mat-option>\n                                    <mat-option [value]=\"'TB suspected and referred for evaluation'\">TB suspected and\n                                        referred for evaluation\n                                    </mat-option>\n                                    <mat-option [value]=\"'Currently on INH prophylaxis'\">Currently on INH prophylaxis\n                                    </mat-option>\n                                    <mat-option [value]=\"'Currently on TB treatment'\">Currently on TB treatment\n                                    </mat-option>\n                                    <mat-option [value]=\"'TB positive not on TB drugs'\">TB positive not on TB drugs\n                                    </mat-option>\n                                </mat-select>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <fieldset>\n                        <legend>Next of kin/Treatment Supporter</legend>\n                        <div class=\"row\">\n                            <div class=\"col-md-6\">\n                                <mat-form-field class=\"full-width\">\n                                    <mat-label>Name</mat-label>\n                                    <input matInput name=\"nextKin\" [(ngModel)]=\"entity.nextOfKin\"/>\n                                </mat-form-field>\n                            </div>\n                            <div class=\"col-md-6\">\n                                <mat-form-field class=\"full-width\">\n                                    <mat-label>Relationship</mat-label>\n                                    <mat-select name=\"relationKin\" [(ngModel)]=\"entity.nextOfKinRelationship\">\n                                        <mat-option></mat-option>\n                                        <mat-option [value]=\"'Aunt'\">Aunt</mat-option>\n                                        <mat-option [value]=\"'Brother'\">Brother</mat-option>\n                                        <mat-option [value]=\"'Cousin'\">Cousin</mat-option>\n                                        <mat-option [value]=\"'Daughter'\">Daughter</mat-option>\n                                        <mat-option [value]=\"'Father'\">Father</mat-option>\n                                        <mat-option [value]=\"'Friend'\">Friend</mat-option>\n                                        <mat-option [value]=\"'Grand parent'\">Grand parent</mat-option>\n                                        <mat-option [value]=\"'Mother'\">Mother</mat-option>\n                                        <mat-option [value]=\"'Sister'\">Sister</mat-option>\n                                        <mat-option [value]=\"'Son'\">Son</mat-option>\n                                        <mat-option [value]=\"'Spouse'\">Spouse</mat-option>\n                                        <mat-option [value]=\"'Treatment Supporter'\">Treatment Supporter</mat-option>\n                                        <mat-option [value]=\"'Uncle'\">Uncle</mat-option>\n                                    </mat-select>\n                                </mat-form-field>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-md-6\">\n                                <mat-form-field class=\"full-width\">\n                                    <mat-label>Address</mat-label>\n                                    <input matInput name=\"addressKin\" [(ngModel)]=\"entity.nextOfKinAddress\"/>\n                                </mat-form-field>\n                            </div>\n                            <div class=\"col-md-6\">\n                                <mat-form-field class=\"full-width\">\n                                    <mat-label>Telephone Number</mat-label>\n                                    <input matInput name=\"phoneKin\" phoneNumber [(ngModel)]=\"entity.nextOfKinPhone\"\n                                           #phone1=\"ngModel\"/>\n                                    <mat-error\n                                            *ngIf=\"phone1.errors && (phone1.dirty || phone1.touched || !!entity.id) && (phone1.errors.invalidPhone)\">\n                                        Invalid phone number\n                                    </mat-error>\n                                </mat-form-field>\n                            </div>\n                        </div>\n                    </fieldset>\n                    <ng-container *ngIf=\"ovcApplicable\">\n                        <fieldset>\n                            <legend>OVC</legend>\n                            <div class=\"row\">\n                                <div class=\"col-md-6\">\n                                    <mat-form-field class=\"full-width\">\n                                        <mat-label>Household Unique No</mat-label>\n                                        <input matInput name=\"householdUniqueNo\" [(ngModel)]=\"ovc.householdUniqueNo\"\n                                               [required]=\"!!ovc.referredTo || !!ovc.referredFrom\"\n                                               #hun=\"ngModel\"/>\n                                        <mat-error\n                                                *ngIf=\"hun.errors && (hun.dirty || hun.touched || !!entity.id) && (hun.errors.required)\">\n                                            Household Unique No is required\n                                        </mat-error>\n                                    </mat-form-field>\n                                </div>\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col-md-6\">\n                                    <mat-form-field class=\"full-width\"\n                                                    *ngIf=\"!!ovc.referredFrom || !!ovc.dateReferredFrom || ovcMin\">\n                                        <mat-label>Referred To OVC Partner</mat-label>\n                                        <input matInput name=\"referredTo\" [(ngModel)]=\"ovc.referredTo\"\n                                               [required]=\"!!ovc.dateReferredTo\"\n                                               [disabled]=\"!!ovc.referredFrom || !!ovc.dateReferredFrom\"\n                                               #rt=\"ngModel\"/>\n                                        <mat-error\n                                                *ngIf=\"rt.errors && (rt.dirty || rt.touched) && (rt.errors.required)\">\n                                            OVC Partner referred to is required\n                                        </mat-error>\n                                    </mat-form-field>\n                                </div>\n                                <div class=\"col-md-6\">\n                                    <mat-form-field class=\"full-width\"\n                                                    *ngIf=\"!!ovc.referredFrom || !!ovc.dateReferredFrom || ovcMin\">\n                                        <mat-label>Date Referred to OVC Partner</mat-label>\n                                        <input matInput [matDatepicker]=\"picker8\"\n                                               [(ngModel)]=\"ovc.dateReferredTo\"\n                                               #drt=\"ngModel\"\n                                               [max]=\"today\"\n                                               [min]=\"ovcMin\"\n                                               [disabled]=\"!!ovc.referredFrom || !!ovc.dateReferredFrom\"\n                                               [required]=\"!!ovc.referredTo\"\n                                               name=\"drt\">\n                                        <mat-datepicker-toggle\n                                                matSuffix\n                                                [for]=\"picker8\">\n                                        </mat-datepicker-toggle>\n                                        <mat-datepicker #picker8></mat-datepicker>\n                                        <mat-error\n                                                *ngIf=\"drt.errors && (drt.dirty || drt.touched) && (drt.errors.required)\">\n                                            Date Referred to OVC Partner is required\n                                        </mat-error>\n                                    </mat-form-field>\n                                </div>\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col-md-6\">\n                                    <mat-form-field class=\"full-width\"\n                                                    *ngIf=\"!!ovc.referredTo || !!ovc.dateReferredTo || ovcMin\">\n                                        <mat-label>Referred From OVC Partner</mat-label>\n                                        <input matInput name=\"referredFrom\" [(ngModel)]=\"ovc.referredFrom\"\n                                               [required]=\"!!ovc.dateReferredFrom\"\n                                               [disabled]=\"!!ovc.referredTo || !!ovc.dateReferredTo\"\n                                               #rf=\"ngModel\"/>\n                                        <mat-error\n                                                *ngIf=\"rf.errors && (rf.dirty || rf.touched) && (rf.errors.required)\">\n                                            OVC Partner referred from is required\n                                        </mat-error>\n                                    </mat-form-field>\n                                </div>\n                                <div class=\"col-md-6\">\n                                    <mat-form-field class=\"full-width\"\n                                                    *ngIf=\"!!ovc.referredTo || !!ovc.dateReferredTo || ovcMin\">\n                                        <mat-label>Date Referred From OVC Partner</mat-label>\n                                        <input matInput [matDatepicker]=\"picker9\"\n                                               [(ngModel)]=\"ovc.dateReferredFrom\"\n                                               #drf=\"ngModel\"\n                                               [max]=\"today\"\n                                               [min]=\"ovcMin\"\n                                               [disabled]=\"!!ovc.referredTo || !!ovc.dateReferredTo\"\n                                               [required]=\"!!ovc.referredFrom\"\n                                               name=\"drf\">\n                                        <mat-datepicker-toggle\n                                                matSuffix\n                                                [for]=\"picker9\">\n                                        </mat-datepicker-toggle>\n                                        <mat-datepicker #picker9></mat-datepicker>\n                                        <mat-error\n                                                *ngIf=\"drf.errors && (drf.dirty || drf.touched) && (drf.errors.required)\">\n                                            Date Referred to OVC Partner is required\n                                        </mat-error>\n                                    </mat-form-field>\n                                </div>\n                            </div>\n                            <div class=\"row\" *ngIf=\"ovc.householdUniqueNo\">\n                                <div class=\"col-md-12\">\n                                    <mat-form-field class=\"full-width\">\n                                        <mat-label>Services Provided</mat-label>\n                                        <mat-select name=\"services\" [(ngModel)]=\"ovc.servicesProvided\" multiple>\n                                            <mat-option [value]=\"'Emergency Health Services'\">Emergency Health\n                                                Services\n                                            </mat-option>\n                                            <mat-option [value]=\"'Educational Support'\">Educational Support</mat-option>\n                                            <mat-option [value]=\"'Household Economic Strengthening'\">Household Economic\n                                                Strengthening\n                                            </mat-option>\n                                            <mat-option [value]=\"'Nutritional Support'\">Nutritional Support</mat-option>\n                                            <mat-option [value]=\"'Health Education'\">Health Education</mat-option>\n                                            <mat-option [value]=\"'Water, Sanitation &amp; Hygiene Messaging (WASH)'\">\n                                                Water, Sanitation &amp; Hygiene Messaging (WASH)\n                                            </mat-option>\n                                            <mat-option [value]=\"'ART Adherence Support'\">ART Adherence Support\n                                            </mat-option>\n                                            <mat-option [value]=\"'Nutrition Assessment, Counseling and Support'\">\n                                                Nutrition Assessment, Counseling and Support\n                                            </mat-option>\n                                            <mat-option [value]=\"'Growth Monitoring'\">Growth Monitoring</mat-option>\n                                            <mat-option [value]=\"'Emergency Support'\">Emergency Support</mat-option>\n                                            <mat-option [value]=\"'School Enrollment/ Re-enrollment'\">School Enrollment/\n                                                Re-enrollment\n                                            </mat-option>\n                                            <mat-option [value]=\"'Psychosocial Support'\">Psychosocial Support\n                                            </mat-option>\n                                        </mat-select>\n                                    </mat-form-field>\n                                </div>\n                            </div>\n                        </fieldset>\n                    </ng-container>\n                </mat-card-content>\n                <mat-card-actions class=\"lamis-edit-form-actions\">\n                    <button mat-button type=\"button\" (click)=\"previousState()\">Back</button>\n                    <button mat-raised-button color=\"primary\" (click)=\"save()\"\n                            [disabled]=\"patientForm.invalid || isSaving || (!!ovc.householdUniqueNo && !(!!ovc.referredFrom || !!ovc.referredTo))\">\n                        {{entity.id ? 'Update' : 'Save'}}\n                    </button>\n                </mat-card-actions>\n            </mat-card>\n        </form>\n    </div>\n</div>\n"
    }),
    __metadata("design:paramtypes", [PatientService,
        NotificationService,
        AppLoaderService,
        TdDialogService,
        ActivatedRoute])
], PatientEditComponent);

let DetailedTimelineComponent = class DetailedTimelineComponent {
    constructor(patientService, route) {
        this.patientService = patientService;
        this.route = route;
    }
    ngOnInit() {
        this.route.data.subscribe(({ entity }) => {
            const patient = !!entity && entity.body ? entity.body : entity;
            this.id = patient.id;
            this.uuid = patient.uuid;
        });
    }
    previousState() {
        window.history.back();
    }
};
DetailedTimelineComponent.ctorParameters = () => [
    { type: PatientService },
    { type: ActivatedRoute }
];
DetailedTimelineComponent = __decorate([
    Component({
        selector: 'detailed-timeline',
        template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <mat-card>\n            <mat-card-header>\n                <mat-card-title>Patient Activity History</mat-card-title>\n            </mat-card-header>\n            <mat-card-content>\n                <patient-timeline [patientId]=\"id\" [patientUuid]=\"uuid\" [detailed]=\"true\"></patient-timeline>\n            </mat-card-content>\n            <mat-card-actions class=\"lamis-edit-form-actions\">\n                <button mat-button type=\"button\" (click)=\"previousState()\">Back</button>\n            </mat-card-actions>\n        </mat-card>\n    </div>\n</div>\n"
    }),
    __metadata("design:paramtypes", [PatientService, ActivatedRoute])
], DetailedTimelineComponent);

let PatientResolve = class PatientResolve {
    constructor(service) {
        this.service = service;
    }
    resolve(route, state) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.findByUuid(id).pipe(filter((response) => response.ok), map((patient) => patient.body));
        }
        return of({});
    }
};
PatientResolve.ctorParameters = () => [
    { type: PatientService }
];
PatientResolve = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PatientService])
], PatientResolve);
const ɵ0 = {
    title: 'Patients',
    breadcrumb: 'PATIENTS'
}, ɵ1 = {}, ɵ2 = {
    authorities: ['ROLE_USER'],
    title: 'Patient Details',
    breadcrumb: 'PATIENT DETAILS'
}, ɵ3 = {
    authorities: ['ROLE_DEC'],
    title: 'Add Patient',
    breadcrumb: 'ADD PATIENT'
}, ɵ4 = {
    authorities: ['ROLE_DEC'],
    title: 'Patient Edit',
    breadcrumb: 'PATIENT EDIT'
}, ɵ5 = {
    authorities: ['ROLE_DEC'],
    title: 'Patient Timeline',
    breadcrumb: 'PATIENT TIMELINE'
};
const ROUTES = [
    {
        path: '',
        data: ɵ0,
        children: [
            {
                path: '',
                component: PatientListComponent,
                resolve: {
                    pagingParams: PagingParamsResolve
                },
                data: ɵ1,
            },
            {
                path: ':id/view',
                component: PatientDetailsComponent,
                resolve: {
                    entity: PatientResolve
                },
                data: ɵ2,
            },
            {
                path: 'new',
                component: PatientEditComponent,
                data: ɵ3,
            },
            {
                path: ':id/edit',
                component: PatientEditComponent,
                resolve: {
                    entity: PatientResolve
                },
                data: ɵ4,
            },
            {
                path: ':id/timeline',
                component: DetailedTimelineComponent,
                resolve: {
                    entity: PatientResolve
                },
                data: ɵ5,
            }
        ]
    }
];

let WidgetContainerComponent = class WidgetContainerComponent {
};
__decorate([
    Input(),
    __metadata("design:type", String)
], WidgetContainerComponent.prototype, "title", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], WidgetContainerComponent.prototype, "icon", void 0);
__decorate([
    ViewChild('container', { read: ViewContainerRef, static: true }),
    __metadata("design:type", ViewContainerRef)
], WidgetContainerComponent.prototype, "embeddedContainer", void 0);
WidgetContainerComponent = __decorate([
    Component({
        selector: 'widget-container',
        template: "<mat-card class=\"dark-blue-100\">\n    <mat-card-header>\n        <mat-icon mat-card-avatar>{{icon || 'dashboard'}}</mat-icon>\n        <mat-card-title>{{title}}</mat-card-title>\n    </mat-card-header>\n    <mat-divider></mat-divider>\n    <mat-card-content>\n        <ng-container #container></ng-container>\n    </mat-card-content>\n</mat-card>\n",
        styles: ["mat-icon.mat-card-avatar{width:30px;height:30px;font-size:30px}mat-card-title{padding-top:5px!important}"]
    })
], WidgetContainerComponent);

let ObservationService = class ObservationService {
    constructor(http, serverUrl) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.resourceUrl = '';
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api';
    }
    deleteObservation(path, id) {
        return this.http.delete(`${this.resourceUrl}/${path}/${id}`, { observe: 'response' });
    }
    getObservation(path, id) {
        return this.http.get(`${this.resourceUrl}/${path}/by-uuid/${id}`, { observe: 'response' });
    }
};
ObservationService.ctorParameters = () => [
    { type: HttpClient },
    { type: undefined, decorators: [{ type: Inject, args: [SERVER_API_URL_CONFIG,] }] }
];
ObservationService.ngInjectableDef = ɵɵdefineInjectable({ factory: function ObservationService_Factory() { return new ObservationService(ɵɵinject(HttpClient), ɵɵinject(SERVER_API_URL_CONFIG)); }, token: ObservationService, providedIn: "root" });
ObservationService = __decorate([
    Injectable({ providedIn: 'root' }),
    __param(1, Inject(SERVER_API_URL_CONFIG)),
    __metadata("design:paramtypes", [HttpClient, Object])
], ObservationService);

let TimelineComponent = class TimelineComponent {
    constructor(patientService, router, observationService, _dialogService, notificationService) {
        this.patientService = patientService;
        this.router = router;
        this.observationService = observationService;
        this._dialogService = _dialogService;
        this.notificationService = notificationService;
        this.detailed = false;
    }
    ngOnInit() {
        this.loadActivities();
    }
    view(path, id) {
        this.router.navigate(['/', path, id, 'patient', this.patientUuid, 'view']);
    }
    edit(path, id) {
        this.router.navigate(['/', path, id, 'patient', this.patientUuid, 'edit']);
    }
    delete(path, id) {
        this._dialogService.openConfirm({
            title: 'Confirm',
            message: 'Do you want to delete this event, action cannot be reversed?',
            cancelButton: 'No',
            acceptButton: 'Yes',
            width: '500px',
        }).afterClosed().subscribe((accept) => {
            if (accept) {
                this.observationService.getObservation(path, id).subscribe(obj => {
                    if (obj.body) {
                        this.observationService.deleteObservation(path, obj.body.id).subscribe((res) => {
                            if (res.ok) {
                                this.patientService.activities(this.patientId, this.detailed).subscribe((res) => this.timeLine = res);
                            }
                            else {
                                this.notificationService.showError('Error deleting event, please try again');
                            }
                        });
                    }
                });
            }
            else {
                // DO SOMETHING ELSE
            }
        });
    }
    loadActivities() {
        this.patientService.activities(this.patientId, this.detailed).subscribe((res) => this.timeLine = res);
    }
};
TimelineComponent.ctorParameters = () => [
    { type: PatientService },
    { type: Router },
    { type: ObservationService },
    { type: TdDialogService },
    { type: NotificationService }
];
__decorate([
    Input(),
    __metadata("design:type", Number)
], TimelineComponent.prototype, "patientId", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], TimelineComponent.prototype, "patientUuid", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], TimelineComponent.prototype, "detailed", void 0);
TimelineComponent = __decorate([
    Component({
        selector: 'patient-timeline',
        template: "<a class=\"mb-1 pb-1 underlined\" [routerLink]=\"['/', 'patients', patientUuid, 'timeline']\" *ngIf=\"!detailed\">Click here\n    to view detailed History</a>\n<mat-divider></mat-divider>\n<timeline>\n    <timeline-event *ngFor=\"let period of timeLine\" side=\"right\">\n        <timeline-badge>\n            <mat-icon>insert_invitation</mat-icon>\n        </timeline-badge>\n        <timeline-panel>\n            <timeline-header>\n                <h4>{{period.date}}</h4>\n            </timeline-header>\n            <mat-list>\n                <mat-list-item>\n                    <div matLine>\n                        <ng-container *ngFor=\"let event of period.activities\">\n                            <div matLine>\n                                <button mat-icon-button aria-label=\"Delete event\"\n                                        *ngIf=\"event.deletable\"\n                                        (click)=\"delete(event.path, event.uuid)\">\n                                    <mat-icon>delete</mat-icon>\n                                </button>\n                                <button mat-icon-button aria-label=\"View event\"\n                                        *ngIf=\"event.viewable\"\n                                        (click)=\"view(event.path, event.uuid)\">\n                                    <mat-icon>remove_red_eye</mat-icon>\n                                </button>\n                                <button mat-icon-button aria-label=\"Edit event\"\n                                        *ngIf=\"event.editable\"\n                                        (click)=\"edit(event.path, event.uuid)\">\n                                    <mat-icon>edit</mat-icon>\n                                </button>\n                            </div>\n                            <a mat-line matTooltip=\"{{event.name}}\">{{event.name}}</a>\n                            <mat-divider></mat-divider>\n                        </ng-container>\n                    </div>\n                </mat-list-item>\n            </mat-list>\n        </timeline-panel>\n    </timeline-event>\n</timeline>\n"
    }),
    __metadata("design:paramtypes", [PatientService, Router, ObservationService,
        TdDialogService, NotificationService])
], TimelineComponent);

let TimelineWidget = class TimelineWidget {
    ngOnInit() {
    }
};
TimelineWidget = __decorate([
    Component({
        selector: 'timeline',
        template: "<ul class=\"timeline\">\n    <ng-content></ng-content>\n</ul>\n"
    })
], TimelineWidget);

let TimelineEvent = class TimelineEvent {
    constructor(parent) {
        this.parent = parent;
        this._side = 'left';
    }
    set side(side) {
        this._side = side;
        this.updateRowClasses(this._side);
    }
    ngOnInit() {
        this.updateRowClasses(this._side);
    }
    checkClass(side, leftSide) {
        let leftClass = '';
        let rightClass = 'timeline-inverted';
        if (side === 'left' || (!side && leftSide === true)) {
            return leftClass;
        }
        else if ((side === 'alternate' || !side) && leftSide === false) {
            return rightClass;
        }
        else if (side === 'right') {
            return rightClass;
        }
        else {
            return leftClass;
        }
    }
    updateRowClasses(value) {
        this.oddClass = this.checkClass(value, true);
        this.evenClass = this.checkClass(value, false);
    }
};
TimelineEvent.ctorParameters = () => [
    { type: TimelineWidget }
];
__decorate([
    Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], TimelineEvent.prototype, "side", null);
TimelineEvent = __decorate([
    Component({
        selector: 'timeline-event',
        template: "<li class=\"timeline-event\" ng-class-odd=\"oddClass\" ng-class-even=\"evenClass\">\n    <ng-content></ng-content>\n</li>\n"
    }),
    __metadata("design:paramtypes", [TimelineWidget])
], TimelineEvent);

let TimelineBadge = class TimelineBadge {
    constructor(event) {
        this.event = event;
    }
};
TimelineBadge.ctorParameters = () => [
    { type: TimelineEvent }
];
TimelineBadge = __decorate([
    Component({
        selector: 'timeline-badge',
        template: `
        <div class='timeline-badge'>
            <ng-content></ng-content>
        </div>
    `
    }),
    __metadata("design:paramtypes", [TimelineEvent])
], TimelineBadge);

let TimelineFooter = class TimelineFooter {
};
TimelineFooter = __decorate([
    Component({
        selector: 'timeline-footer',
        template: `
        <div class='timeline-footer'>
            <ng-content></ng-content>
        </div>
    `
    })
], TimelineFooter);

let TimelineHeader = class TimelineHeader {
};
TimelineHeader = __decorate([
    Component({
        selector: 'timeline-header',
        template: `
        <div class='timeline-header'>
            <ng-content></ng-content>
        </div>
    `
    })
], TimelineHeader);

let TimelinePanel = class TimelinePanel {
    constructor(event) {
        this.event = event;
    }
};
TimelinePanel.ctorParameters = () => [
    { type: TimelineEvent }
];
TimelinePanel = __decorate([
    Component({
        selector: 'timeline-panel',
        template: `
        <div class='timeline-panel'>
            <ng-content></ng-content>
        </div>`
    }),
    __metadata("design:paramtypes", [TimelineEvent])
], TimelinePanel);

const COMPONENTS = [TimelineBadge, TimelineEvent, TimelineFooter, TimelineHeader, TimelinePanel, TimelineWidget];
let TimelineWidgetModule = class TimelineWidgetModule {
};
TimelineWidgetModule = __decorate([
    NgModule({
        declarations: [
            ...COMPONENTS
        ],
        exports: [
            ...COMPONENTS
        ]
    })
], TimelineWidgetModule);

var UniqueHospitalNumValidator_1;
let UniqueHospitalNumValidator = UniqueHospitalNumValidator_1 = class UniqueHospitalNumValidator {
    constructor(patientService) {
        this.patientService = patientService;
    }
    validate(control) {
        return control.valueChanges
            .pipe(debounceTime(300), take(1), switchMap(value => this.patientService.existsByHospitalNumber(value)));
    }
};
UniqueHospitalNumValidator.ctorParameters = () => [
    { type: PatientService }
];
UniqueHospitalNumValidator = UniqueHospitalNumValidator_1 = __decorate([
    Directive({
        selector: '[uniqueHospitalNum]',
        providers: [{
                provide: NG_ASYNC_VALIDATORS,
                useExisting: UniqueHospitalNumValidator_1,
                multi: true
            }]
    }),
    __metadata("design:paramtypes", [PatientService])
], UniqueHospitalNumValidator);

const moment$3 = moment_;
let SummaryWidgetComponent = class SummaryWidgetComponent {
    constructor(patientService) {
        this.patientService = patientService;
    }
    ngOnInit() {
        this.patientService.getSummaryForPatient(this.patientId).subscribe(res => this.summaries = res);
    }
    propertiesForSummary(summary) {
        const properties = [];
        for (const field of summary.fields) {
            const dataType = field.type.toLowerCase();
            let item;
            switch (dataType) {
                case FieldType.boolean:
                    item = new CardViewBoolItemModel({
                        value: field.value,
                        key: '',
                        label: field.label
                    });
                    break;
                case FieldType.int:
                    item = new CardViewIntItemModel({
                        value: field.value,
                        key: '',
                        label: field.label,
                    });
                    break;
                case FieldType.float:
                    item = new CardViewFloatItemModel({
                        value: field.value,
                        key: '',
                        label: field.label,
                    });
                    break;
                case FieldType.date:
                    item = new CardViewDateItemModel({
                        value: field.value ? moment$3(field.value) : null,
                        key: '',
                        label: field.label,
                        format: 'dd MMM, yyyy'
                    });
                    break;
                case FieldType.datetime:
                    item = new CardViewDatetimeItemModel({
                        value: field.value ? moment$3(field.value) : null,
                        key: '',
                        label: field.label,
                        format: 'dd MMM, yyyy HH:mm'
                    });
                    break;
                default:
                    item = new CardViewTextItemModel({
                        value: field.value,
                        key: '',
                        label: field.label,
                    });
            }
            properties.push(item);
        }
        return properties;
    }
};
SummaryWidgetComponent.ctorParameters = () => [
    { type: PatientService }
];
__decorate([
    Input(),
    __metadata("design:type", Number)
], SummaryWidgetComponent.prototype, "patientId", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], SummaryWidgetComponent.prototype, "patientUuid", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], SummaryWidgetComponent.prototype, "summaries", void 0);
SummaryWidgetComponent = __decorate([
    Component({
        selector: 'patient-summary-widget',
        template: "<ng-container *ngIf=\"summaries\">\n    <mat-card *ngFor=\"let summary of summaries\" class=\"default mb-1 pb-0\">\n        <ng-container *ngIf=\"!!summary.header\">\n            <mat-card-title>{{summary.header}}</mat-card-title>\n            <mat-divider></mat-divider>\n        </ng-container>\n        <mat-card-content>\n            <adf-card-view [properties]=\"propertiesForSummary(summary)\"></adf-card-view>\n        </mat-card-content>\n    </mat-card>\n</ng-container>\n"
    }),
    __metadata("design:paramtypes", [PatientService])
], SummaryWidgetComponent);

let PatientModule = class PatientModule {
};
PatientModule = __decorate([
    NgModule({
        declarations: [
            PatientListComponent,
            PatientDetailsComponent,
            PatientEditComponent,
            WidgetContainerComponent,
            TimelineComponent,
            DetailedTimelineComponent,
            SummaryWidgetComponent,
            UniqueHospitalNumValidator
        ],
        imports: [
            CommonModule,
            NgJhipsterModule,
            LamisSharedModule,
            JsonFormModule,
            MatFormioModule,
            MatInputModule,
            MatIconModule,
            MatDividerModule,
            MatCardModule,
            MatSelectModule,
            MatButtonModule,
            MatCheckboxModule,
            MatTabsModule,
            RouterModule.forChild(ROUTES),
            MatProgressBarModule,
            CovalentMessageModule,
            MatListModule,
            MatChipsModule,
            CoreModule,
            CovalentDialogsModule,
            CovalentSearchModule,
            NgbPaginationModule,
            TimelineWidgetModule,
            FormsModule,
            ReactiveFormsModule,
            MatDateFormatModule,
            CustomFormsModule,
            MatAutocompleteModule
        ],
        exports: [
            PatientListComponent,
            PatientDetailsComponent,
            PatientEditComponent
        ],
        entryComponents: [
            WidgetContainerComponent,
            TimelineComponent,
            SummaryWidgetComponent
        ],
        providers: [
            //PatientService,
            //ObservationService,
            PatientResolve
        ]
    })
], PatientModule);

const moment$4 = moment_;
let ClientStatusComponent = class ClientStatusComponent {
    constructor(patientService, activatedRoute, router, notification, appLoaderService) {
        this.patientService = patientService;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.notification = notification;
        this.appLoaderService = appLoaderService;
        this.facilities = [];
        this.statusDates = [];
        this.today = moment$4();
        this.statuses = ['TRACED_UNABLE_TO_LOCATE', 'TRACED_AGREED_TO_RETURN_TO_CARE', 'DID_NOT_ATTEMPT_TO_TRACE'];
    }
    createEntity() {
        return {};
    }
    ngOnInit() {
        this.isSaving = false;
        this.patientService.getActiveFacility().subscribe(fac => {
            this.patientService.getAllFacility().subscribe(res => {
                this.facilities = res.map(f => f.name).filter(f => f != fac.name);
            });
        });
        this.activatedRoute.data.subscribe(({ entity }) => {
            this.entity = !!entity && entity.body ? entity.body : entity;
            if (this.entity === undefined) {
                this.entity = this.createEntity();
            }
            const patientId = this.activatedRoute.snapshot.paramMap.get('patientId');
            this.patientService.findByUuid(patientId).subscribe((res) => {
                this.entity.patient = res.body;
                this.patient = res.body;
                this.entity.facility = res.body.facility;
                this.patientService.getStatusDatesByPatient(res.body.id).subscribe((res) => {
                    this.statusDates = res;
                });
            });
            if (this.entity.id) {
                this.patientService.getStatusName(this.entity.id).subscribe(res => this.status = res);
                if (this.entity && this.entity.extra) {
                    this.facilityTransferredTo = this.entity.extra.facilityTransferredTo;
                }
            }
        });
    }
    change(input) {
        if (input) {
            this.facilities = this.facilities.filter(f => f.toLowerCase().includes(input.toLowerCase()));
        }
    }
    filterDates(date) {
        let exists = false;
        this.statusDates.forEach(d => {
            if (date.diff(d, 'days') === 0) {
                exists = true;
            }
        });
        return (this.entity.id && date.diff(this.entity.dateStatus, 'days') === 0) || !exists;
    }
    previousState() {
        window.history.back();
    }
    save() {
        this.appLoaderService.open('Saving Client status update...');
        this.isSaving = true;
        if (!this.entity.extra) {
            this.entity.extra = {};
        }
        this.entity.extra.facilityTransferredTo = this.facilityTransferredTo;
        if (this.statuses.includes(this.entity.status)) {
            this.entity.outcome = this.entity.status;
            this.entity.status = null;
        }
        if (this.entity.id !== undefined) {
            this.subscribeToSaveResponse(this.patientService.updateClientStatus(this.entity));
        }
        else {
            this.subscribeToSaveResponse(this.patientService.saveClientStatus(this.entity));
        }
    }
    subscribeToSaveResponse(result) {
        result.subscribe((res) => this.onSaveSuccess(res.body), (res) => {
            this.appLoaderService.close();
            this.onSaveError();
            this.onError(res.message);
        });
    }
    onSaveSuccess(result) {
        this.appLoaderService.close();
        this.isSaving = false;
        this.notification.showInfo('Client status update successfully saved');
        this.previousState();
    }
    onSaveError() {
        this.isSaving = false;
        this.notification.showError('Error saving status update');
    }
    onError(errorMessage) {
        this.isSaving = false;
        this.notification.showError(errorMessage);
    }
};
ClientStatusComponent.ctorParameters = () => [
    { type: PatientService },
    { type: ActivatedRoute },
    { type: Router },
    { type: NotificationService },
    { type: AppLoaderService }
];
ClientStatusComponent = __decorate([
    Component({
        selector: 'client-status',
        template: "<script src=\"patient-details.component.ts\"></script>\n<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <form name=\"form\" role=\"form\" novalidate (ngSubmit)=\"save()\" #statusForm=\"ngForm\">\n            <mat-card class=\"default\">\n                <mat-card-content *ngIf=\"patient\">\n                    <div>\n                        <mat-form-field class=\"full-width\" *ngIf=\"entity\">\n                            <input matInput [matDatepicker]=\"picker\"\n                                   placeholder=\"{{entity.id ? 'Date of Status' : 'Date of New Status'}}\"\n                                   [(ngModel)]=\"entity.dateStatus\"\n                                   [matDatepickerFilter]=\"filterDates.bind(this)\"\n                                   #visit=\"ngModel\"\n                                   [max]=\"today\"\n                                   [min]=\"patient.dateRegistration\"\n                                   name=\"visit\"\n                                   required>\n                            <mat-datepicker-toggle\n                                    matSuffix\n                                    [for]=\"picker\">\n                            </mat-datepicker-toggle>\n                            <mat-datepicker #picker></mat-datepicker>\n                            <mat-error\n                                    *ngIf=\"visit.errors && (visit.dirty || visit.touched) && (visit.errors.required)\">\n                                Date of new status is required\n                            </mat-error>\n                            <mat-error\n                                    *ngIf=\"visit.errors && (visit.dirty || visit.touched) && (visit.errors.min)\">\n                                Date of new status cannot be before {{entity.patient.dateRegistration}}\n                            </mat-error>\n                            <mat-error\n                                    *ngIf=\"visit.errors && (visit.dirty || visit.touched) && (visit.errors.max)\">\n                                Date of new status cannot be in the future\n                            </mat-error>\n                        </mat-form-field>\n                    </div>\n                    <div>\n                        <mat-form-field class=\"full-width\">\n                            <mat-select [(ngModel)]=\"entity.status\"\n                                        placeholder=\"{{entity.id ? 'Status' : 'New Status'}}\"\n                                        #outcome=\"ngModel\" required name=\"outcome\">\n                                <mat-option></mat-option>\n                                <mat-option [value]=\"'ART_TRANSFER_OUT'\">ART Transfer Out</mat-option>\n                                <mat-option [value]=\"'PRE_ART_TRANSFER_OUT'\">Pre-ART Transfer Out</mat-option>\n                                <mat-option [value]=\"'STOPPED_TREATMENT'\">Stopped Treatment</mat-option>\n                                <mat-option [value]=\"'KNOWN_DEATH'\">Died (Confirmed)</mat-option>\n                                <mat-option [value]=\"'PREVIOUSLY_UNDOCUMENTED_TRANSFER_CONFIRMED'\">Previously\n                                    Undocumented Patient Transfer (Confirmed)\n                                </mat-option>\n                                <mat-option [value]=\"'TRACED_UNABLE_TO_LOCATE'\">Traced Patient (Unable to locate)\n                                </mat-option>\n                                <mat-option [value]=\"'TRACED_AGREED_TO_RETURN_TO_CARE'\">Traced Patient and agreed to\n                                    return to care\n                                </mat-option>\n                                <mat-option [value]=\"'DID_NOT_ATTEMPT_TO_TRACE'\">Did Not Attempt to Trace Patient\n                                </mat-option>\n                            </mat-select>\n                            <mat-error\n                                    *ngIf=\"outcome.errors && (outcome.dirty || outcome.touched) && (outcome.errors.required)\">\n                                New Status is required\n                            </mat-error>\n                        </mat-form-field>\n                    </div>\n                    <div class=\"row\" *ngIf=\"entity.outcome && entity.outcome.indexOf('TRACE') !== -1\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <input matInput [matDatepicker]=\"picker1\"\n                                       placeholder=\"Date of Tracked\"\n                                       [(ngModel)]=\"entity.dateTracked\"\n                                       #tracked=\"ngModel\"\n                                       [min]=\"entity.patient.dateRegistration\"\n                                       [max]=\"entity.dateStatus\"\n                                       name=\"tracked\"\n                                       required>\n                                <mat-datepicker-toggle\n                                        matSuffix\n                                        [for]=\"picker1\">\n                                </mat-datepicker-toggle>\n                                <mat-datepicker #picker1></mat-datepicker>\n                                <mat-error\n                                        *ngIf=\"tracked.errors && (tracked.dirty || tracked.touched) && (tracked.errors.required)\">\n                                    Date tracked is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\" *ngIf=\"entity.outcome === 'TRACED_AGREED_TO_RETURN_TO_CARE'\">\n                            <mat-form-field class=\"full-width\">\n                                <input matInput [matDatepicker]=\"picker2\"\n                                       placeholder=\"Date Agreed to Return\"\n                                       [(ngModel)]=\"entity.agreedDate\"\n                                       #agreed=\"ngModel\"\n                                       [min]=\"entity.dateStatus\"\n                                       name=\"agreed\"\n                                       required>\n                                <mat-datepicker-toggle\n                                        matSuffix\n                                        [for]=\"picker2\">\n                                </mat-datepicker-toggle>\n                                <mat-datepicker #picker2></mat-datepicker>\n                                <mat-error\n                                        *ngIf=\"agreed.errors && (agreed.dirty || agreed.touched) && (agreed.errors.required)\">\n                                    Date of agreed to return is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div *ngIf=\"entity.status === 'ART_TRANSFER_OUT'\">\n                        <mat-form-field class=\"full-width\">\n                            <input matInput type=\"text\" placeholder=\"Facility Transferred To\"\n                                   required name=\"fac\" #fac=\"ngModel\"\n                                   [(ngModel)]=\"facilityTransferredTo\"\n                                   (input)=\"change($event.target.value)\"\n                                   [matAutocomplete]=\"auto\">\n                            <mat-autocomplete #auto=\"matAutocomplete\">\n                                <mat-option *ngFor=\"let facility of facilities\"\n                                            [value]=\"facility\">{{facility}}</mat-option>\n                            </mat-autocomplete>\n                            <mat-error\n                                    *ngIf=\"fac.errors && (fac.dirty || fac.touched) && (fac.errors.required)\">\n                                Facility transferred to is required\n                            </mat-error>\n                        </mat-form-field>\n                    </div>\n                    <div *ngIf=\"entity.status === 'KNOWN_DEATH'\">\n                        <mat-form-field class=\"full-width\">\n                            <mat-select [(ngModel)]=\"entity.causeOfDeath\"\n                                        placeholder=\"Cause of Death\"\n                                        #death=\"ngModel\" required name=\"death\">\n                                <mat-option></mat-option>\n                                <mat-option [value]=\"'HIV disease resulting in TB'\">HIV disease resulting in TB\n                                </mat-option>\n                                <mat-option [value]=\"'HIV disease resulting in cancer'\">HIV disease resulting in\n                                    cancer\n                                </mat-option>\n                                <mat-option [value]=\"'HIV disease resulting in other infectious and parasitic disease'\">\n                                    HIV disease resulting in other infectious and parasitic disease\n                                </mat-option>\n                                <mat-option\n                                        [value]=\"'Other HIV disease resulting in other disease or conditions leading to death'\">\n                                    Other HIV disease resulting in other disease or conditions leading to death\n                                </mat-option>\n                                <mat-option [value]=\"'Other natural causes'\">Other natural causes</mat-option>\n                                <mat-option [value]=\"'Non-natural causes'\">Non-natural causes</mat-option>\n                                <mat-option [value]=\"'Unknown cause'\">Unknown cause</mat-option>\n                            </mat-select>\n                            <mat-error\n                                    *ngIf=\"death.errors && (death.dirty || death.touched) && (death.errors.required)\">\n                                Cause of death is required\n                            </mat-error>\n                        </mat-form-field>\n                    </div>\n                    <div *ngIf=\"entity.status === 'STOPPED_TREATMENT'\">\n                        <mat-form-field class=\"full-width\">\n                            <mat-select [(ngModel)]=\"entity.reasonForInterruption\"\n                                        placeholder=\"Reason for Interruption\"\n                                        #interrupt=\"ngModel\" required name=\"interrupt\">\n                                <mat-option></mat-option>\n                                <mat-option [value]=\"'Toxicity/side effect'\">Toxicity /side effect</mat-option>\n                                <mat-option [value]=\"'Pregnancy'\">Pregnancy</mat-option>\n                                <mat-option [value]=\"'Treatment failure'\">Treatment failure</mat-option>\n                                <mat-option [value]=\"'Poor adherence'\">Poor adherence</mat-option>\n                                <mat-option [value]=\"'Illness, hospitalization'\">Illness, hospitalization</mat-option>\n                                <mat-option [value]=\"'Drug out of stock'\">Drug out of stock</mat-option>\n                                <mat-option [value]=\"'Patient lacks finances'\">Patient lacks finances</mat-option>\n                                <mat-option [value]=\"'Other patient decision'\">Other patient decision</mat-option>\n                                <mat-option [value]=\"'Planned Rx interruption'\">Planned Rx interruption</mat-option>\n                                <mat-option [value]=\"'Other'\">Other</mat-option>\n                            </mat-select>\n                            <mat-error\n                                    *ngIf=\"interrupt.errors && (interrupt.dirty || interrupt.touched) && (interrupt.errors.required)\">\n                                Reason for interruption is required\n                            </mat-error>\n                        </mat-form-field>\n                    </div>\n                    <mat-divider></mat-divider>\n                </mat-card-content>\n                <mat-card-actions class=\"lamis-edit-form-actions\">\n                    <button mat-raised-button type=\"button\" (click)=\"previousState()\">Back</button>\n                    <button mat-raised-button color='primary'\n                            [disabled]=\"statusForm.invalid\"\n                            type=\"submit\">\n                        {{entity.id !== undefined ? 'Update' : 'Save'}}\n                    </button>\n                </mat-card-actions>\n            </mat-card>\n        </form>\n    </div>\n</div>\n"
    }),
    __metadata("design:paramtypes", [PatientService, ActivatedRoute, Router,
        NotificationService, AppLoaderService])
], ClientStatusComponent);

let StatusResolve = class StatusResolve {
    constructor(service) {
        this.service = service;
    }
    resolve(route, state) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.findClientStatus(id).pipe(filter((response) => response.ok), map((patient) => patient.body));
        }
        return of({});
    }
};
StatusResolve.ctorParameters = () => [
    { type: PatientService }
];
StatusResolve = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PatientService])
], StatusResolve);
const ɵ0$1 = {
    title: 'Clinic Visit',
    breadcrumb: 'CLINIC VISIT'
}, ɵ1$1 = {
    authorities: ['ROLE_DEC'],
    title: 'Update Client Status',
    breadcrumb: 'UPDATE CLIENT STATUS'
}, ɵ2$1 = {
    authorities: ['ROLE_DEC'],
    title: 'Client Status Edit',
    breadcrumb: 'CLIENT STATUS EDIT'
};
const ROUTES$1 = [
    {
        path: '',
        data: ɵ0$1,
        children: [
            {
                path: 'patient/:patientId/new',
                component: ClientStatusComponent,
                data: ɵ1$1,
            },
            {
                path: ':id/patient/:patientId/edit',
                component: ClientStatusComponent,
                resolve: {
                    entity: StatusResolve
                },
                data: ɵ2$1,
            }
        ]
    }
];

let ClientStatusModule = class ClientStatusModule {
};
ClientStatusModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            CovalentDialogsModule,
            LamisSharedModule,
            JsonFormModule,
            MatFormioModule,
            MatInputModule,
            MatIconModule,
            MatDividerModule,
            MatCardModule,
            MatSelectModule,
            MatButtonModule,
            MatCheckboxModule,
            MatTabsModule,
            RouterModule.forChild(ROUTES$1),
            MatProgressBarModule,
            CoreModule,
            MatDateFormatModule
        ],
        declarations: [
            ClientStatusComponent
        ],
        exports: [
            ClientStatusComponent
        ],
        providers: [
            StatusResolve
        ]
    })
], ClientStatusModule);

/*
 * Public API Surface of Patient
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ClientStatusModule, PatientListComponent, PatientModule, PatientService, PatientDetailsComponent as ɵa, PatientEditComponent as ɵb, WidgetContainerComponent as ɵc, TimelineComponent as ɵd, ObservationService as ɵe, DetailedTimelineComponent as ɵf, SummaryWidgetComponent as ɵg, UniqueHospitalNumValidator as ɵh, PatientResolve as ɵi, ROUTES as ɵj, TimelineWidgetModule as ɵk, TimelineBadge as ɵl, TimelineEvent as ɵm, TimelineWidget as ɵn, TimelineFooter as ɵo, TimelineHeader as ɵp, TimelinePanel as ɵq, StatusResolve as ɵr, ROUTES$1 as ɵs, ClientStatusComponent as ɵt };
//# sourceMappingURL=lamis-patient-1.4.1.js.map
