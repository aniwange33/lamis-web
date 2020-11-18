import {__decorate, __param, __metadata} from 'tslib';
import {
    Inject,
    ɵɵdefineInjectable,
    ɵɵinject,
    Injectable,
    Input,
    Component,
    ComponentFactoryResolver,
    ViewContainerRef,
    Renderer2,
    ViewChild,
    NgModule,
    Directive
} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
    createRequestOption,
    DATE_FORMAT,
    SERVER_API_URL_CONFIG,
    AuthServerProvider,
    entityCompare,
    AppLoaderService,
    PagingParamsResolve,
    FieldType,
    LamisSharedModule,
    JsonFormModule,
    MatDateFormatModule
} from '@lamis/web-core';
import {map, share, filter, debounceTime, take, switchMap} from 'rxjs/operators';
import * as moment_ from 'moment';
import {Router, ActivatedRoute, RouterModule} from '@angular/router';
import {
    NotificationService,
    CardViewBoolItemModel,
    CardViewIntItemModel,
    CardViewFloatItemModel,
    CardViewDateItemModel,
    CardViewDatetimeItemModel,
    CardViewTextItemModel,
    CoreModule
} from '@alfresco/adf-core';
import {CommonModule} from '@angular/common';
import {
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTabsModule,
    MatProgressBarModule,
    MatListModule,
    MatChipsModule,
    MatAutocompleteModule
} from '@angular/material';
import {TdDialogService, CovalentMessageModule, CovalentDialogsModule, CovalentSearchModule} from '@covalent/core';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {NgJhipsterModule} from 'ng-jhipster';
import {NgForm, NG_ASYNC_VALIDATORS, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {of} from 'rxjs';
import {MatFormioModule} from 'angular-material-formio';
import {CustomFormsModule} from 'ng2-validation';

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
            .post(this.resourceUrl, patient, {observe: 'response'})
            .pipe(map((res) => this.convertDateFromServer(res)));
    }

    update(data) {
        const patient = this.convertDateFromClient(data);
        return this.http
            .put(this.resourceUrl, patient, {observe: 'response'})
            .pipe(map((res) => this.convertDateFromServer(res)), share());
    }

    find(id) {
        return this.http
            .get(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .pipe(map((res) => this.convertDateFromServer(res)));
    }

    findByUuid(id) {
        return this.http
            .get(`${this.resourceUrl}/by-uuid/${id}`, {observe: 'response'})
            .pipe(map((res) => this.convertDateFromServer(res)));
    }

    query(req) {
        const options = createRequestOption(req);
        return this.http
            .get(this.resourceUrl, {params: options, observe: 'response'})
            .pipe(map((res) => this.convertDateArrayFromServer(res)));
    }

    delete(id) {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    getOVCByPatient(id) {
        return this.http.get(`${this.ovcResourceUrl}/patient/${id}`);
    }

    widgets(patientId) {
        return this.http.get(`${this.resourceUrl}/${patientId}/widgets`, {observe: 'body'});
    }

    observations(patientId) {
        return this.http.get(`${this.resourceUrl}/${patientId}/observations`, {
            observe: 'body'
        });
    }

    activities(patientId, detailed) {
        return this.http.get(`${this.resourceUrl}/${patientId}/activities?full=${detailed}`, {observe: 'body'})
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
        return this.http.post(`${this.resourceUrl}/exists/hospital-number`, {number: hospitalNum})
            .pipe(map((res => res ? {'numberExists': true} : null)));
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
        return this.http.post('/api/client-statuses', copy, {observe: 'response'});
    }

    updateClientStatus(status) {
        const copy = PatientService_1.convertStatusFromClient(status);
        return this.http.put('/api/client-statuses', copy, {observe: 'response'});
    }

    findClientStatus(id) {
        return this.http.get(`/api/client-statuses/by-uuid/${id}`, {observe: 'response'})
            .pipe(map((res) => {
                res.body.dateTracked = res.body.dateTracked != null ? moment(res.body.dateTracked) : null;
                res.body.dateStatus = res.body.dateStatus != null ? moment(res.body.dateStatus) : null;
                res.body.agreedDate = res.body.agreedDate != null ? moment(res.body.agreedDate) : null;
                return res;
            }));
    }

    currentClientStatus(patientId) {
        return this.http.get(`/api/client-statuses/patient/${patientId}/current`, {responseType: 'text'});
    }

    getStatusName(id) {
        return this.http.get(`/api/client-statuses/${id}/name`, {responseType: 'text'});
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
    {type: HttpClient},
    {type: undefined, decorators: [{type: Inject, args: [SERVER_API_URL_CONFIG,]}]},
    {type: AuthServerProvider}
];
PatientService.ngInjectableDef = ɵɵdefineInjectable({
    factory: function PatientService_Factory() {
        return new PatientService(ɵɵinject(HttpClient), ɵɵinject(SERVER_API_URL_CONFIG), ɵɵinject(AuthServerProvider));
    }, token: PatientService, providedIn: "root"
});
PatientService = PatientService_1 = __decorate([
    Injectable({providedIn: 'root'}),
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
        } else {
            this.router.navigate(['..', 'patients', data.obj.uuid, 'view'], {relativeTo: this.activatedRoute});
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
    {type: PatientService},
    {type: NotificationService},
    {type: Router},
    {type: ActivatedRoute}
];
__decorate([
    Input(),
    __metadata("design:type", String)
], PatientListComponent.prototype, "path", void 0);
PatientListComponent = __decorate([
    Component({
        selector: 'lamis-patients',
        template: "<div class=\"layout\">\r\n    <div class=\"list-container\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-8 col-md-offset-4\">\r\n                <div class=\"adf-toolbar--spacer\"></div>\r\n                <td-search-box backIcon=\"arrow_back\" class=\"push-right-sm\"\r\n                               placeholder=\"Search here\" [debounce]=\"500\"\r\n                               [(ngModel)]=\"currentSearch\"\r\n                               (searchDebounce)=\"searchPatient($event)\"\r\n                               (search)=\"searchPatient($event)\"\r\n                               (clear)=\"currentSearch = ''\" flex>\r\n                </td-search-box>\r\n            </div>\r\n        </div>\r\n        <br/>\r\n        <adf-datatable *ngIf=\"patients\"\r\n                       [rows]=\"patients\"\r\n                       [loading]=\"loading\"\r\n                       [display]=\"display\"\r\n                       (rowClick)=\"select($event.value)\">\r\n            <data-columns>\r\n                <data-column key=\"name\" title=\"Name\" sortable=\"true\"></data-column>\r\n                <data-column key=\"hospitalNum\" title=\"Hospital Number\" sortable=\"true\"></data-column>\r\n                <data-column key=\"uniqueId\" title=\"Unique ID\" sortable=\"true\"></data-column>\r\n                <data-column key=\"gender\" title=\"Gender\" sortable=\"true\">\r\n                    <ng-template let-context=\"$implicit\">\r\n                        {{context.row.getValue('gender') === 'MALE' ? 'Male' : 'Female'}}\r\n                    </ng-template>\r\n                </data-column>\r\n                <data-column key=\"status\" title=\"Current Status\" sortable=\"true\"></data-column>\r\n                <data-column key=\"phone\" title=\"Telephone Number\" sortable=\"true\"></data-column>\r\n                <data-column key=\"address\" title=\"Address\" class=\"full-width ellipsis-cell\"></data-column>\r\n            </data-columns>\r\n            <adf-loading-content-template>\r\n                <ng-template>\r\n                    <mat-progress-spinner\r\n                            class=\"adf-document-list-loading-margin\"\r\n                            [color]=\"'primary'\"\r\n                            [mode]=\"'indeterminate'\">\r\n                    </mat-progress-spinner>\r\n                </ng-template>\r\n            </adf-loading-content-template>\r\n        </adf-datatable>\r\n    </div>\r\n    <adf-empty-content\r\n            *ngIf=\"!patients\"\r\n            icon=\"blur_on\"\r\n            [title]=\"'No Patients found'\"\r\n            [subtitle]=\"'No Patients matching search criteria or no Patients available'\">\r\n    </adf-empty-content>\r\n        <ngb-pagination [collectionSize]=\"totalItems\"\r\n                        [(page)]=\"page\"\r\n                        [pageSize]=\"itemsPerPage\"\r\n                        [maxSize]=\"5\"\r\n                        size=\"sm\"\r\n                        [rotate]=\"true\"\r\n                        [boundaryLinks]=\"true\"\r\n                        (pageChange)=\"loadPage(page)\">\r\n        </ngb-pagination>\r\n\r\n</div>\r\n<div class=\"fab-container\">\r\n    <button mat-fab\r\n            [matTooltip]=\"'Register New Patient'\"\r\n            [routerLink]=\"['new']\">\r\n        <mat-icon>add</mat-icon>\r\n    </button>\r\n</div>\r\n"
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
        this.route.data.subscribe(({entity}) => {
            this.entity = !!entity && entity.body ? entity.body : entity;
            this.patientService.currentClientStatus(entity.uuid).subscribe(res => {
                this.status = res;
            });
            this.attacheWidgets();
            this.getObservations();
        });
    }

    edit() {
        this.router.navigate(['..', 'edit'], {relativeTo: this.route});
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
                    } else {
                        this.notificationService.showError('Error deleting patient, please try again');
                    }
                });
            } else {
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
            } catch (e) {
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
    {type: Router},
    {type: ActivatedRoute},
    {type: PatientService},
    {type: ComponentFactoryResolver},
    {type: TdDialogService},
    {type: NotificationService},
    {type: ViewContainerRef},
    {type: Renderer2}
];
__decorate([
    ViewChild('container', {read: ViewContainerRef, static: true}),
    __metadata("design:type", ViewContainerRef)
], PatientDetailsComponent.prototype, "container", void 0);
PatientDetailsComponent = __decorate([
    Component({
        selector: 'lamis-patient',
        template: "<div>\r\n    <mat-card>\r\n        <mat-card class=\"dark-blue-100 full-width\">\r\n            <mat-card-content>\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-9\">\r\n                        <div class=\"row\">\r\n                            <mat-form-field class=\"col-md-3\">\r\n                                <mat-label>Surname</mat-label>\r\n                                <input matInput [value]=\"entity.surname\" disabled style=\"font-weight: 900\">\r\n                            </mat-form-field>\r\n                            <mat-form-field class=\"col-md-3\">\r\n                                <mat-label>Other Names</mat-label>\r\n                                <input matInput [value]=\"entity.otherNames\" disabled style=\"font-weight: 900\">\r\n                            </mat-form-field>\r\n                            <div class=\"col-md-1\"></div>\r\n                            <div class=\"col-md-3\">\r\n                                <span style=\"font-size: 12px\">\r\n                                    {{entity.gender === 'FEMALE' ? 'Female' : 'Male'}} {{age(entity.dateBirth)}}\r\n                                    ({{entity.dateBirth | date: 'dd MMM, yyyy'}})\r\n                                </span>\r\n                            </div>\r\n                            <mat-form-field class=\"col-md-2\">\r\n                                <mat-label>Hospital Number</mat-label>\r\n                                <input matInput [value]=\"entity.hospitalNum\" disabled style=\"font-weight: 900\">\r\n                            </mat-form-field>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                            <mat-form-field class=\"col-md-8\">\r\n                                <mat-label>Address</mat-label>\r\n                                <input matInput [value]=\"entity.address\" disabled style=\"font-weight: 800\">\r\n                            </mat-form-field>\r\n                            <mat-form-field class=\"col-md-4\">\r\n                                <mat-label>Telephone Number</mat-label>\r\n                                <input matInput [value]=\"entity.phone || ' '\" disabled style=\"font-weight: 700\">\r\n                            </mat-form-field>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"col-md-3\">\r\n                        <mat-form-field class=\"col-md-12\">\r\n                            <mat-label>Current Status</mat-label>\r\n                            <input matInput [value]=\"status\" disabled style=\"font-weight: 800\">\r\n                        </mat-form-field>\r\n                        <a (click)=\"previousState()\" class=\"dark-blue-200\">BACK</a>\r\n                    </div>\r\n                </div>\r\n            </mat-card-content>\r\n        </mat-card>\r\n        <div class=\"\">\r\n            <div class=\"row\">\r\n                <div class=\"col-md-9\">\r\n                    <div class=\"row\">\r\n                        <div #container></div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"col-md-3\">\r\n                    <mat-card class=\"dark-blue-200\">\r\n                        <mat-card-header>\r\n                            General Actions\r\n                        </mat-card-header>\r\n                        <mat-divider></mat-divider>\r\n                        <mat-card-content>\r\n                            <mat-nav-list>\r\n                                <mat-list-item *ngFor=\"let action of observations\">\r\n                                    <mat-icon mat-list-icon>{{action.icon || 'dashboard'}}</mat-icon>\r\n                                    <a mat-line matTooltip=\"{{action.tooltip || ''}}\"\r\n                                       (click)=\"addObservation(action)\">{{action.name}}</a>\r\n                                </mat-list-item>\r\n                                <mat-list-item>\r\n                                    <mat-icon mat-list-icon>edit</mat-icon>\r\n                                    <a mat-line matTooltip=\"Update Patient Status\" (click)=\"updateStatus()\">Update\r\n                                        Client Status</a>\r\n                                </mat-list-item>\r\n                                <mat-list-item>\r\n                                    <mat-icon mat-list-icon>edit</mat-icon>\r\n                                    <a mat-line matTooltip=\"Edit Patient registration information\"\r\n                                       (click)=\"edit()\">Edit Registration\r\n                                        Information</a>\r\n                                </mat-list-item>\r\n                                <mat-list-item>\r\n                                    <mat-icon mat-list-icon>delete</mat-icon>\r\n                                    <a mat-line matTooltip=\"Delete patient\" (click)=\"delete()\">Delete Patient</a>\r\n                                </mat-list-item>\r\n                            </mat-nav-list>\r\n                        </mat-card-content>\r\n                    </mat-card>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </mat-card>\r\n</div>\r\n",
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
        this.activatedRoute.data.subscribe(({entity}) => {
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
            this.patientForm.form.setErrors({'invalid': true});
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
        } else {
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
        } else {
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
        this.loaderService.open('Saving patient...');
        if (!this.entity.id) {
            if (this.entity.dobEstimated) {
                this.entity.dateBirth = this.entity.dateRegistration.clone().subtract(this.age, this.ageUnit);
            }
            this.subscribeToSaveResponse(this.patientService.create(this.entity));
        } else {
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
    {type: PatientService},
    {type: NotificationService},
    {type: AppLoaderService},
    {type: TdDialogService},
    {type: ActivatedRoute}
];
__decorate([
    ViewChild('patientForm', {static: true}),
    __metadata("design:type", NgForm)
], PatientEditComponent.prototype, "patientForm", void 0);
PatientEditComponent = __decorate([
    Component({
        selector: 'lamis-patient-edit',
        template: "<div class=\"lamis-edit-form\">\r\n    <div class=\"lamis-edit-form-container\">\r\n        <form name=\"form\" role=\"form\" novalidate (ngSubmit)=\"save()\" #patientForm=\"ngForm\">\r\n            <mat-card class=\"default\">\r\n                <mat-card-content>\r\n                    <mat-divider></mat-divider>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <mat-form-field class=\"full-width\">\r\n                                <mat-label>Hospital Number</mat-label>\r\n                                <input matInput [(ngModel)]=\"entity.hospitalNum\" #hospitalNum=\"ngModel\"\r\n                                       [required]=\"!entity.id\"\r\n                                       uniqueHospitalNum\r\n                                       [disabled]=\"!!entity.id\"\r\n                                       name=\"hospitalNum\"/>\r\n                                <mat-error\r\n                                        *ngIf=\"hospitalNum.errors && (hospitalNum.dirty || hospitalNum.touched) && (hospitalNum.errors.required)\">\r\n                                    Hospital Number is required\r\n                                </mat-error>\r\n                                <mat-error\r\n                                        *ngIf=\"hospitalNum.errors && (hospitalNum.dirty || hospitalNum.touched) && (hospitalNum.errors.numberExists)\">\r\n                                    Hospital Number is used by another patient\r\n                                </mat-error>\r\n                            </mat-form-field>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <mat-form-field class=\"full-width\">\r\n                                <mat-label>Unique ID</mat-label>\r\n                                <input matInput [(ngModel)]=\"entity.uniqueId\" name=\"uniqueId\"/>\r\n                            </mat-form-field>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\" *ngIf=\"!!minDateRegistration\">\r\n                            <mat-form-field class=\"full-width\">\r\n                                <input matInput [matDatepicker]=\"picker\"\r\n                                       placeholder=\"Date of Registration/Transfer-In\"\r\n                                       [(ngModel)]=\"entity.dateRegistration\"\r\n                                       #registration=\"ngModel\"\r\n                                       [max]=\"today\"\r\n                                       [min]=\"minDateRegistration\"\r\n                                       (dateChange)=\"dateRegistrationChanged($event.value)\"\r\n                                       name=\"registration\"\r\n                                       required>\r\n                                <mat-datepicker-toggle\r\n                                        matSuffix\r\n                                        [for]=\"picker\">\r\n                                </mat-datepicker-toggle>\r\n                                <mat-datepicker #picker></mat-datepicker>\r\n                                <mat-error\r\n                                        *ngIf=\"registration.errors && (registration.dirty || registration.touched || !!entity.id) && (registration.errors.required)\">\r\n                                    Date of Registration is required\r\n                                </mat-error>\r\n                                <mat-error\r\n                                        *ngIf=\"registration.errors && (registration.dirty || registration.touched || !!entity.id) && (registration.errors.min)\">\r\n                                    Date of Registration cannot be before {{minDateRegistration | date: 'dd MMM, yyyy'}}\r\n                                </mat-error>\r\n                                <mat-error\r\n                                        *ngIf=\"registration.errors && (registration.dirty || registration.touched || !!entity.id) && (registration.errors.max)\">\r\n                                    Date of Registration cannot be in the future\r\n                                </mat-error>\r\n                            </mat-form-field>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <mat-form-field class=\"full-width\">\r\n                                <mat-label>Surname</mat-label>\r\n                                <input matInput [(ngModel)]=\"entity.surname\" #sn=\"ngModel\"\r\n                                       required\r\n                                       [minLength]=\"2\"\r\n                                       name=\"sn\"/>\r\n                                <mat-error\r\n                                        *ngIf=\"sn.errors && (sn.dirty || sn.touched || !!entity.id) && (sn.errors.required)\">\r\n                                    Surname is required\r\n                                </mat-error>\r\n                                <mat-error\r\n                                        *ngIf=\"sn.errors && (sn.dirty || sn.touched || !!entity.id) && (sn.errors.minLength)\">\r\n                                    Minimum length for Surname is 2 characters\r\n                                </mat-error>\r\n                            </mat-form-field>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <mat-form-field class=\"full-width\">\r\n                                <mat-label>Other Names</mat-label>\r\n                                <input matInput [(ngModel)]=\"entity.otherNames\" #on=\"ngModel\"\r\n                                       required\r\n                                       [minLength]=\"5\"\r\n                                       name=\"on\"/>\r\n                                <mat-error\r\n                                        *ngIf=\"on.errors && (on.dirty || on.touched || !!entity.id) && (on.errors.required)\">\r\n                                    Other Names required\r\n                                </mat-error>\r\n                                <mat-error\r\n                                        *ngIf=\"on.errors && (on.dirty || on.touched || !!entity.id) && (on.errors.minLength)\">\r\n                                    Minimum length for Other Names is 5 characters\r\n                                </mat-error>\r\n                            </mat-form-field>\r\n                        </div>\r\n                    </div>\r\n                    <div *ngIf=\"!entity.id\">\r\n                        <fieldset>\r\n                            <div class=\"row\">\r\n                                <div class=\"col-md-6\">\r\n                                    <mat-checkbox [(ngModel)]=\"entity.dobEstimated\" name=\"est\">Age Estimated?\r\n                                    </mat-checkbox>\r\n                                </div>\r\n                                <div class=\"col-md-6\">\r\n                                    <div *ngIf=\"entity.dobEstimated\" class=\"row\">\r\n                                        <div class=\"col-md-6\">\r\n                                            <mat-form-field class=\"full-width\">\r\n                                                <mat-label>Age at Registration</mat-label>\r\n                                                <input matInput [(ngModel)]=\"age\" required\r\n                                                       [min]=\"2\"\r\n                                                       [max]=\"70\"\r\n                                                       (change)=\"estimateDob()\"\r\n                                                       name=\"age\" #age1=\"ngModel\">\r\n                                                <mat-error\r\n                                                        *ngIf=\"age1.errors && (age1.dirty || age1.touched) && (age1.errors.min)\">\r\n                                                    Minimum age is 2\r\n                                                </mat-error>\r\n                                                <mat-error\r\n                                                        *ngIf=\"age1.errors && (age1.dirty || age1.touched) && (age1.errors.max)\">\r\n                                                    Maximum age is 70\r\n                                                </mat-error>\r\n                                                <mat-error\r\n                                                        *ngIf=\"age1.errors && (age1.dirty || age1.touched) && (age1.errors.required)\">\r\n                                                    Estimated age is required\r\n                                                </mat-error>\r\n                                            </mat-form-field>\r\n                                        </div>\r\n                                        <div class=\"col-md-6\">\r\n                                            <mat-form-field class=\"full-width\">\r\n                                                <mat-label>Age Units</mat-label>\r\n                                                <mat-select [(ngModel)]=\"ageUnit\"\r\n                                                            (selectionChange)=\"estimateDob()\"\r\n                                                            required name=\"units\" #units=\"ngModel\">\r\n                                                    <mat-option></mat-option>\r\n                                                    <mat-option [value]=\"'years'\">Year(s)</mat-option>\r\n                                                    <mat-option [value]=\"'months'\">Month(s)</mat-option>\r\n                                                </mat-select>\r\n                                                <mat-error\r\n                                                        *ngIf=\"units.errors && (units.dirty || units.touched) && (units.errors.required)\">\r\n                                                    Age units is required\r\n                                                </mat-error>\r\n                                            </mat-form-field>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div>\r\n                                        <mat-form-field class=\"full-width\" *ngIf=\"!entity.dobEstimated\">\r\n                                            <input matInput [matDatepicker]=\"picker1\"\r\n                                                   placeholder=\"Date of Birth\"\r\n                                                   [(ngModel)]=\"entity.dateBirth\"\r\n                                                   [min]=\"minDob\"\r\n                                                   (dateChange)=\"dateBirthChanged($event.value)\"\r\n                                                   required\r\n                                                   [max]=\"maxDateBirth\"\r\n                                                   #dob1=\"ngModel\"\r\n                                                   name=\"dob\">\r\n                                            <mat-datepicker-toggle\r\n                                                    matSuffix\r\n                                                    [for]=\"picker1\">\r\n                                            </mat-datepicker-toggle>\r\n                                            <mat-datepicker #picker1></mat-datepicker>\r\n                                            <mat-error\r\n                                                    *ngIf=\"dob1.errors && (dob1.dirty || dob1.touched) && (dob1.errors.required)\">\r\n                                                Date of Birth is required\r\n                                            </mat-error>\r\n                                        </mat-form-field>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </fieldset>\r\n                    </div>\r\n                    <div *ngIf=\"entity.id\">\r\n                        <div class=\"row\">\r\n                            <div class=\"col-md-6\">\r\n                                <mat-form-field class=\"full-width\" *ngIf=\"minDob\">\r\n                                    <input matInput [matDatepicker]=\"picker2\"\r\n                                           placeholder=\"Date of Birth\"\r\n                                           [(ngModel)]=\"entity.dateBirth\"\r\n                                           #birth=\"ngModel\"\r\n                                           (dateChange)=\"dateBirthChanged($event.value)\"\r\n                                           [max]=\"maxDateBirth\"\r\n                                           [min]=\"minDob\"\r\n                                           name=\"dob\"\r\n                                           required>\r\n                                    <mat-datepicker-toggle\r\n                                            matSuffix\r\n                                            [for]=\"picker2\">\r\n                                    </mat-datepicker-toggle>\r\n                                    <mat-datepicker #picker2></mat-datepicker>\r\n                                    <mat-error\r\n                                            *ngIf=\"birth.errors && (birth.dirty || birth.touched || !!entity.id) && (birth.errors.required)\">\r\n                                        Date of Birth is required\r\n                                    </mat-error>\r\n                                    <mat-error\r\n                                            *ngIf=\"birth.errors && (birth.dirty || birth.touched || !!entity.id) && (birth.errors.max)\">\r\n                                        Date of Birth cannot be after Date of Registration\r\n                                    </mat-error>\r\n                                </mat-form-field>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <mat-form-field class=\"full-width\">\r\n                                <mat-label>Gender</mat-label>\r\n                                <mat-select [(ngModel)]=\"entity.gender\"\r\n                                            required name=\"gender\" #gender=\"ngModel\">\r\n                                    <mat-option></mat-option>\r\n                                    <mat-option [value]=\"'FEMALE'\">Female</mat-option>\r\n                                    <mat-option [value]=\"'MALE'\">Male</mat-option>\r\n                                </mat-select>\r\n                                <mat-error\r\n                                        *ngIf=\"gender.errors && (gender.dirty || gender.touched || !!entity.id) && (gender.errors.required)\">\r\n                                    Gender is required\r\n                                </mat-error>\r\n                            </mat-form-field>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <mat-form-field class=\"full-width\">\r\n                                <mat-label>Marital Status</mat-label>\r\n                                <mat-select [(ngModel)]=\"entity.maritalStatus\"\r\n                                            required name=\"status\" #status=\"ngModel\">\r\n                                    <mat-option></mat-option>\r\n                                    <mat-option [value]=\"'Single'\">Single</mat-option>\r\n                                    <mat-option [value]=\"'Married'\">Married</mat-option>\r\n                                    <mat-option [value]=\"'Widowed'\">Widowed</mat-option>\r\n                                    <mat-option [value]=\"'Separated'\">Separated</mat-option>\r\n                                    <mat-option [value]=\"'Divorced'\">Divorced</mat-option>\r\n                                </mat-select>\r\n                                <mat-error\r\n                                        *ngIf=\"status.errors && (status.dirty || status.touched || !!entity.id) && (status.errors.required)\">\r\n                                    Marital Status is required\r\n                                </mat-error>\r\n                            </mat-form-field>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <mat-form-field class=\"full-width\">\r\n                                <mat-label>Job /Occupation Status</mat-label>\r\n                                <mat-select name=\"occupation\" [(ngModel)]=\"entity.occupation\">\r\n                                    <mat-option></mat-option>\r\n                                    <mat-option [value]=\"'Unemployed'\">Unemployed</mat-option>\r\n                                    <mat-option [value]=\"'Employed'\">Employed</mat-option>\r\n                                    <mat-option [value]=\"'Student'\">Student</mat-option>\r\n                                    <mat-option [value]=\"'Retired'\">Retired</mat-option>\r\n                                </mat-select>\r\n                            </mat-form-field>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <mat-form-field class=\"full-width\">\r\n                                <mat-label>Educational Level</mat-label>\r\n                                <mat-select name=\"education\" [(ngModel)]=\"entity.education\">\r\n                                    <mat-option></mat-option>\r\n                                    <mat-option [value]=\"'None'\">None</mat-option>\r\n                                    <mat-option [value]=\"'Primary'\">Primary</mat-option>\r\n                                    <mat-option [value]=\"'Senior Secondary'\">Senior Secondary</mat-option>\r\n                                    <mat-option [value]=\"'Quranic'\">Quranic</mat-option>\r\n                                    <mat-option [value]=\"'Junior Secondary'\">Junior Secondary</mat-option>\r\n                                    <mat-option [value]=\"'Post Secondary'\">Post Secondary</mat-option>\r\n                                </mat-select>\r\n                            </mat-form-field>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <mat-form-field class=\"full-width\">\r\n                                <mat-label>State of Residence</mat-label>\r\n                                <mat-select name=\"state\" [(ngModel)]=\"state\"\r\n                                            [compareWith]=\"entityCompare\"\r\n                                            (selectionChange)=\"stateChange($event.value.id)\">\r\n                                    <mat-option></mat-option>\r\n                                    <mat-option *ngFor=\"let state of states\" [value]=\"state\">{{state.name}}</mat-option>\r\n                                </mat-select>\r\n                            </mat-form-field>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <mat-form-field class=\"full-width\">\r\n                                <mat-label>LGA of Residence</mat-label>\r\n                                <mat-select name=\"lga\" [(ngModel)]=\"entity.lga\" required #lga=\"ngModel\"\r\n                                            [compareWith]=\"entityCompare\">\r\n                                    <mat-option></mat-option>\r\n                                    <mat-option *ngFor=\"let lga of lgas\" [value]=\"lga\">{{lga.name}}</mat-option>\r\n                                </mat-select>\r\n                                <mat-error\r\n                                        *ngIf=\"lga.errors && (lga.dirty || lga.touched || !!entity.id) && (lga.errors.required)\">\r\n                                    LGA of Residence is required\r\n                                </mat-error>\r\n                            </mat-form-field>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <mat-form-field class=\"full-width\">\r\n                                <mat-label class=\"form-label\">Address</mat-label>\r\n                                <textarea name=\"address\" matInput [(ngModel)]=\"entity.address\"\r\n                                          rows=\"3\"\r\n                                          required #address=\"ngModel\"></textarea>\r\n                                <mat-error\r\n                                        *ngIf=\"address.errors && (address.dirty || address.touched || !!entity.id) && (address.errors.required)\">\r\n                                    Address is required\r\n                                </mat-error>\r\n                            </mat-form-field>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <mat-form-field class=\"full-width\">\r\n                                <mat-label>Telephone Number</mat-label>\r\n                                <input matInput name=\"phone\" phoneNumber [(ngModel)]=\"entity.phone\" #phone=\"ngModel\"/>\r\n                                <mat-error\r\n                                        *ngIf=\"phone.errors && (phone.dirty || phone.touched || !!entity.id) && (phone.errors.invalidPhone)\">\r\n                                    Invalid phone number\r\n                                </mat-error>\r\n                            </mat-form-field>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <mat-form-field class=\"full-width\">\r\n                                <mat-label>HIV Status at Registration</mat-label>\r\n                                <mat-select name=\"statusRegistration\" [(ngModel)]=\"entity.statusAtRegistration\"\r\n                                            (selectionChange)=\"statusChanged()\"\r\n                                            required #status=\"ngModel\">\r\n                                    <mat-option></mat-option>\r\n                                    <mat-option [value]=\"'HIV_EXPOSED_STATUS_UNKNOWN'\">HIV Exposed Status Unknown\r\n                                    </mat-option>\r\n                                    <mat-option [value]=\"'HIV_PLUS_NON_ART'\">HIV+ non ART</mat-option>\r\n                                    <mat-option [value]=\"'ART_TRANSFER_IN'\">ART Transfer In</mat-option>\r\n                                    <mat-option [value]=\"'PRE_ART_TRANSFER_IN'\">Pre-ART Transfer In</mat-option>\r\n                                    <mat-option [value]=\"'HIV_NEGATIVE'\">HIV Negative</mat-option>\r\n                                </mat-select>\r\n                                <mat-error\r\n                                        *ngIf=\"status.errors && (status.dirty || status.touched || !!entity.id) && (status.errors.required)\">\r\n                                    HIV Status at Registration is required\r\n                                </mat-error>\r\n                            </mat-form-field>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <mat-form-field class=\"full-width\">\r\n                                <mat-label>Care Entry Point</mat-label>\r\n                                <mat-select name=\"entryPoint\" [(ngModel)]=\"entity.entryPoint\"\r\n                                            #entryPoint=\"ngModel\">\r\n                                    <mat-option></mat-option>\r\n                                    <mat-option [value]=\"'OPD'\">OPD</mat-option>\r\n                                    <mat-option [value]=\"'In-patient'\">In-patient</mat-option>\r\n                                    <mat-option [value]=\"'HCT'\">HCT</mat-option>\r\n                                    <mat-option [value]=\"'TB DOTS'\">TB DOTS</mat-option>\r\n                                    <mat-option [value]=\"'STI Clinic'\">STI Clinic</mat-option>\r\n                                    <mat-option [value]=\"'PMTCT'\">PMTCT</mat-option>\r\n                                    <mat-option [value]=\"'Transfer-in'\">Transfer-in</mat-option>\r\n                                    <mat-option [value]=\"'Outreach'\">Outreach</mat-option>\r\n                                    <mat-option [value]=\"'OVC Partner'\">OVC Partner</mat-option>\r\n                                    <mat-option [value]=\"'Others'\">Others</mat-option>\r\n                                </mat-select>\r\n                                <mat-error\r\n                                        *ngIf=\"entryPoint.errors && (entryPoint.dirty || entryPoint.touched || !!entity.id) && (entryPoint.errors.required)\">\r\n                                    Care Entry Point is required\r\n                                </mat-error>\r\n                            </mat-form-field>\r\n                        </div>\r\n                    </div>\r\n                    <ng-container *ngIf=\"prep\">\r\n                        <fieldset>\r\n                            <legend>PrEP</legend>\r\n                            <div class=\"row\">\r\n                                <div class=\"col-md-6\">\r\n                                    <mat-form-field class=\"full-width\">\r\n                                        <mat-label>PrEP ID</mat-label>\r\n                                        <input matInput name=\"prepId\" required [(ngModel)]=\"prepId\" #prepID=\"ngModel\"/>\r\n                                        <mat-error\r\n                                                *ngIf=\"prepID.errors && (prepID.dirty || prepID.touched || !!entity.id) && (prepID.errors.required)\">\r\n                                            PrEP ID is required\r\n                                        </mat-error>\r\n                                    </mat-form-field>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"row\">\r\n                                <div class=\"col-md-6\">\r\n                                    <mat-form-field class=\"full-width\">\r\n                                        <mat-label>Indication for PrEP</mat-label>\r\n                                        <mat-select name=\"indication\" required #indication=\"ngModel\"\r\n                                                    [(ngModel)]=\"indicationForPrep\">\r\n                                            <mat-option></mat-option>\r\n                                            <mat-option [value]=\"'Sero-Discordant Relationship'\">Sero-Discordant\r\n                                                Relationship\r\n                                            </mat-option>\r\n                                            <mat-option [value]=\"'On Demand'\">On Demand</mat-option>\r\n                                        </mat-select>\r\n                                        <mat-error\r\n                                                *ngIf=\"indication.errors && (indication.dirty || indication.touched || !!entity.id) && (indication.errors.required)\">\r\n                                            Indication for PrEP is required\r\n                                        </mat-error>\r\n                                    </mat-form-field>\r\n                                </div>\r\n                                <div class=\"col-md-6\" *ngIf=\"indicationForPrep === 'On Demand'\">\r\n                                    <mat-form-field class=\"full-width\">\r\n                                        <mat-label>On Demand Type</mat-label>\r\n                                        <mat-select name=\"type\" required #type=\"ngModel\"\r\n                                                    [(ngModel)]=\"onDemandIndication\">\r\n                                            <mat-option></mat-option>\r\n                                            <mat-option [value]=\"'Partner Non-disclosure'\">Partner Non-disclosure\r\n                                            </mat-option>\r\n                                            <mat-option [value]=\"'Partner unwilling to undergo HIV testing'\">Partner\r\n                                                unwilling to undergo HIV testing\r\n                                            </mat-option>\r\n                                            <mat-option [value]=\"'Client unable to negotiate condom use'\">Client unable\r\n                                                to negotiate condom use\r\n                                            </mat-option>\r\n                                            <mat-option [value]=\"'Individuals with high risk sexual behaviors'\">\r\n                                                Individuals with high risk sexual behaviors\r\n                                            </mat-option>\r\n                                            <mat-option [value]=\"'Others'\">Others</mat-option>\r\n                                        </mat-select>\r\n                                        <mat-error\r\n                                                *ngIf=\"type.errors && (type.dirty || type.touched || !!entity.id) && (type.errors.required)\">\r\n                                            On Demand is required\r\n                                        </mat-error>\r\n                                    </mat-form-field>\r\n                                </div>\r\n                            </div>\r\n                        </fieldset>\r\n                    </ng-container>\r\n                    <div class=\"row\" *ngIf=\"entity.gender === 'FEMALE'\">\r\n                        <div class=\"col-md-6\">\r\n                            <mat-form-field class=\"full-width\">\r\n                                <mat-label>Time of HIV Diagnosis</mat-label>\r\n                                <mat-select name=\"timeHivDiagnosis\" [(ngModel)]=\"entity.timeHivDiagnosis\">\r\n                                    <mat-option></mat-option>\r\n                                    <mat-option [value]=\"'Previous - Non pregnant'\">Previous - Non pregnant</mat-option>\r\n                                    <mat-option [value]=\"'Previous pregnancy (ANC)'\">Previous pregnancy (ANC)\r\n                                    </mat-option>\r\n                                    <mat-option [value]=\"'Previous pregnancy (L&amp;D)'\">Previous pregnancy (L&amp;D)\r\n                                    </mat-option>\r\n                                    <mat-option [value]=\"'Previous pregnancy (PP &lt;72hrs)'\">Previous pregnancy (PP\r\n                                        &lt;72hrs)\r\n                                    </mat-option>\r\n                                    <mat-option [value]=\"'ANC'\">ANC</mat-option>\r\n                                    <mat-option [value]=\"'Labour'\">Labour</mat-option>\r\n                                    <mat-option [value]=\"'Post Partum &lt;=72hrs'\">Post Partum &lt;=72hrs</mat-option>\r\n                                    <mat-option [value]=\"'Post Partum &gt;72hrs'\">Post Partum &gt;72hrs</mat-option>\r\n                                </mat-select>\r\n                            </mat-form-field>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <mat-form-field class=\"full-width\">\r\n                                <mat-label>Date enrolled into PMTCT</mat-label>\r\n                                <input matInput [matDatepicker]=\"picker3\"\r\n                                       [(ngModel)]=\"entity.dateEnrolledPMTCT\"\r\n                                       #pmtct=\"ngModel\"\r\n                                       [max]=\"entity.dateRegistration\"\r\n                                       [min]=\"entity.dateBirth\"\r\n                                       name=\"pmtct\">\r\n                                <mat-datepicker-toggle\r\n                                        matSuffix\r\n                                        [for]=\"picker3\">\r\n                                </mat-datepicker-toggle>\r\n                                <mat-datepicker #picker3></mat-datepicker>\r\n                            </mat-form-field>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\" *ngIf=\"entity.gender === 'FEMALE'\">\r\n                        <div class=\"col-md-6\">\r\n                            <mat-form-field class=\"full-width\">\r\n                                <mat-label>Pregnancy Status</mat-label>\r\n                                <mat-select name=\"pregnancyStatus\" [(ngModel)]=\"entity.pregnancyStatus\">\r\n                                    <mat-option></mat-option>\r\n                                    <mat-option value=\"1\">Not Pregnant</mat-option>\r\n                                    <mat-option value=\"2\">Pregnant</mat-option>\r\n                                    <mat-option value=\"3\">Breastfeeding</mat-option>\r\n                                </mat-select>\r\n                            </mat-form-field>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <mat-form-field class=\"full-width\">\r\n                                <mat-label>Source of Referral</mat-label>\r\n                                <mat-select name=\"sourceReferral\" [(ngModel)]=\"entity.sourceReferral\">\r\n                                    <mat-option></mat-option>\r\n                                    <mat-option [value]=\"'PMTCT outreach'\">PMTCT outreach</mat-option>\r\n                                    <mat-option [value]=\"'Sex worker outreach'\">Sex worker outreach</mat-option>\r\n                                    <mat-option [value]=\"'Medical outpatient'\">Medical outpatient</mat-option>\r\n                                    <mat-option [value]=\"'Youth/Adolescent outreach'\">Youth/Adolescent outreach\r\n                                    </mat-option>\r\n                                    <mat-option [value]=\"'Private/Commercial Health facility'\">Private/Commercial Health\r\n                                        facility\r\n                                    </mat-option>\r\n                                    <mat-option [value]=\"'Under-fives/Immunization clinic'\">Under-fives/Immunization\r\n                                        clinic\r\n                                    </mat-option>\r\n                                    <mat-option [value]=\"'External HCT centre'\">External HCT centre</mat-option>\r\n                                    <mat-option [value]=\"'OVC Partner'\">OVC Partner</mat-option>\r\n                                    <mat-option [value]=\"'In-patients'\">In-patients</mat-option>\r\n                                    <mat-option [value]=\"'Self-referral'\">Self-referral</mat-option>\r\n                                </mat-select>\r\n                            </mat-form-field>\r\n                        </div>\r\n                        <div class=\"col-6\">\r\n                            <mat-form-field class=\"full-width\">\r\n                                <mat-label>Enrollment Setting</mat-label>\r\n                                <mat-select name=\"enrollmentSetting\" [(ngModel)]=\"entity.enrollmentSetting\"\r\n                                            [required]=\"true\" #setting=\"ngModel\">\r\n                                    <mat-option></mat-option>\r\n                                    <mat-option [value]=\"'Facility'\">Facility</mat-option>\r\n                                    <mat-option [value]=\"'Community'\">Community</mat-option>\r\n                                </mat-select>\r\n                                <mat-error\r\n                                        *ngIf=\"setting.errors && (setting.dirty || setting.touched || !!entity.id) && (setting.errors.required)\">\r\n                                    Enrollment Setting is required\r\n                                </mat-error>\r\n                            </mat-form-field>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <mat-form-field class=\"full-width\"\r\n                                            *ngIf=\"minDateConfirmed && entity.statusAtRegistration !== 'HIV_NEGATIVE'\">\r\n                                <mat-label>Date of Confirmed HIV Test</mat-label>\r\n                                <input matInput [matDatepicker]=\"picker2\"\r\n                                       [(ngModel)]=\"entity.dateConfirmedHiv\"\r\n                                       #time=\"ngModel\"\r\n                                       [max]=\"maxDateConfirmed\"\r\n                                       [min]=\"minDateConfirmed\"\r\n                                       required\r\n                                       name=\"time\">\r\n                                <mat-datepicker-toggle\r\n                                        matSuffix\r\n                                        [for]=\"picker2\">\r\n                                </mat-datepicker-toggle>\r\n                                <mat-datepicker #picker2></mat-datepicker>\r\n                                <mat-error\r\n                                        *ngIf=\"time.errors && (time.dirty || time.touched || !!entity.id) && (time.errors.required)\">\r\n                                    Date of Confirmed HIV Test is required\r\n                                </mat-error>\r\n                            </mat-form-field>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <mat-form-field class=\"full-width\">\r\n                                <mat-label>TB Status</mat-label>\r\n                                <mat-select name=\"tbStatus\" [(ngModel)]=\"entity.tbStatus\">\r\n                                    <mat-option></mat-option>\r\n                                    <mat-option [value]=\"'No sign or symptoms of TB'\">No sign or symptoms of TB\r\n                                    </mat-option>\r\n                                    <mat-option [value]=\"'TB suspected and referred for evaluation'\">TB suspected and\r\n                                        referred for evaluation\r\n                                    </mat-option>\r\n                                    <mat-option [value]=\"'Currently on INH prophylaxis'\">Currently on INH prophylaxis\r\n                                    </mat-option>\r\n                                    <mat-option [value]=\"'Currently on TB treatment'\">Currently on TB treatment\r\n                                    </mat-option>\r\n                                    <mat-option [value]=\"'TB positive not on TB drugs'\">TB positive not on TB drugs\r\n                                    </mat-option>\r\n                                </mat-select>\r\n                            </mat-form-field>\r\n                        </div>\r\n                    </div>\r\n                    <fieldset>\r\n                        <legend>Next of kin/Treatment Supporter</legend>\r\n                        <div class=\"row\">\r\n                            <div class=\"col-md-6\">\r\n                                <mat-form-field class=\"full-width\">\r\n                                    <mat-label>Name</mat-label>\r\n                                    <input matInput name=\"nextKin\" [(ngModel)]=\"entity.nextOfKin\"/>\r\n                                </mat-form-field>\r\n                            </div>\r\n                            <div class=\"col-md-6\">\r\n                                <mat-form-field class=\"full-width\">\r\n                                    <mat-label>Relationship</mat-label>\r\n                                    <mat-select name=\"relationKin\" [(ngModel)]=\"entity.nextOfKinRelationship\">\r\n                                        <mat-option></mat-option>\r\n                                        <mat-option [value]=\"'Aunt'\">Aunt</mat-option>\r\n                                        <mat-option [value]=\"'Brother'\">Brother</mat-option>\r\n                                        <mat-option [value]=\"'Cousin'\">Cousin</mat-option>\r\n                                        <mat-option [value]=\"'Daughter'\">Daughter</mat-option>\r\n                                        <mat-option [value]=\"'Father'\">Father</mat-option>\r\n                                        <mat-option [value]=\"'Friend'\">Friend</mat-option>\r\n                                        <mat-option [value]=\"'Grand parent'\">Grand parent</mat-option>\r\n                                        <mat-option [value]=\"'Mother'\">Mother</mat-option>\r\n                                        <mat-option [value]=\"'Sister'\">Sister</mat-option>\r\n                                        <mat-option [value]=\"'Son'\">Son</mat-option>\r\n                                        <mat-option [value]=\"'Spouse'\">Spouse</mat-option>\r\n                                        <mat-option [value]=\"'Treatment Supporter'\">Treatment Supporter</mat-option>\r\n                                        <mat-option [value]=\"'Uncle'\">Uncle</mat-option>\r\n                                    </mat-select>\r\n                                </mat-form-field>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                            <div class=\"col-md-6\">\r\n                                <mat-form-field class=\"full-width\">\r\n                                    <mat-label>Address</mat-label>\r\n                                    <input matInput name=\"addressKin\" [(ngModel)]=\"entity.nextOfKinAddress\"/>\r\n                                </mat-form-field>\r\n                            </div>\r\n                            <div class=\"col-md-6\">\r\n                                <mat-form-field class=\"full-width\">\r\n                                    <mat-label>Telephone Number</mat-label>\r\n                                    <input matInput name=\"phoneKin\" phoneNumber [(ngModel)]=\"entity.nextOfKinPhone\"\r\n                                           #phone1=\"ngModel\"/>\r\n                                    <mat-error\r\n                                            *ngIf=\"phone1.errors && (phone1.dirty || phone1.touched || !!entity.id) && (phone1.errors.invalidPhone)\">\r\n                                        Invalid phone number\r\n                                    </mat-error>\r\n                                </mat-form-field>\r\n                            </div>\r\n                        </div>\r\n                    </fieldset>\r\n                    <ng-container *ngIf=\"ovcApplicable\">\r\n                        <fieldset>\r\n                            <legend>OVC</legend>\r\n                            <div class=\"row\">\r\n                                <div class=\"col-md-6\">\r\n                                    <mat-form-field class=\"full-width\">\r\n                                        <mat-label>Household Unique No</mat-label>\r\n                                        <input matInput name=\"householdUniqueNo\" [(ngModel)]=\"ovc.householdUniqueNo\"\r\n                                               [required]=\"!!ovc.referredTo || !!ovc.referredFrom\"\r\n                                               #hun=\"ngModel\"/>\r\n                                        <mat-error\r\n                                                *ngIf=\"hun.errors && (hun.dirty || hun.touched || !!entity.id) && (hun.errors.required)\">\r\n                                            Household Unique No is required\r\n                                        </mat-error>\r\n                                    </mat-form-field>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"row\">\r\n                                <div class=\"col-md-6\">\r\n                                    <mat-form-field class=\"full-width\"\r\n                                                    *ngIf=\"!!ovc.referredFrom || !!ovc.dateReferredFrom || ovcMin\">\r\n                                        <mat-label>Referred To OVC Partner</mat-label>\r\n                                        <input matInput name=\"referredTo\" [(ngModel)]=\"ovc.referredTo\"\r\n                                               [required]=\"!!ovc.dateReferredTo\"\r\n                                               [disabled]=\"!!ovc.referredFrom || !!ovc.dateReferredFrom\"\r\n                                               #rt=\"ngModel\"/>\r\n                                        <mat-error\r\n                                                *ngIf=\"rt.errors && (rt.dirty || rt.touched) && (rt.errors.required)\">\r\n                                            OVC Partner referred to is required\r\n                                        </mat-error>\r\n                                    </mat-form-field>\r\n                                </div>\r\n                                <div class=\"col-md-6\">\r\n                                    <mat-form-field class=\"full-width\"\r\n                                                    *ngIf=\"!!ovc.referredFrom || !!ovc.dateReferredFrom || ovcMin\">\r\n                                        <mat-label>Date Referred to OVC Partner</mat-label>\r\n                                        <input matInput [matDatepicker]=\"picker8\"\r\n                                               [(ngModel)]=\"ovc.dateReferredTo\"\r\n                                               #drt=\"ngModel\"\r\n                                               [max]=\"today\"\r\n                                               [min]=\"ovcMin\"\r\n                                               [disabled]=\"!!ovc.referredFrom || !!ovc.dateReferredFrom\"\r\n                                               [required]=\"!!ovc.referredTo\"\r\n                                               name=\"drt\">\r\n                                        <mat-datepicker-toggle\r\n                                                matSuffix\r\n                                                [for]=\"picker8\">\r\n                                        </mat-datepicker-toggle>\r\n                                        <mat-datepicker #picker8></mat-datepicker>\r\n                                        <mat-error\r\n                                                *ngIf=\"drt.errors && (drt.dirty || drt.touched) && (drt.errors.required)\">\r\n                                            Date Referred to OVC Partner is required\r\n                                        </mat-error>\r\n                                    </mat-form-field>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"row\">\r\n                                <div class=\"col-md-6\">\r\n                                    <mat-form-field class=\"full-width\"\r\n                                                    *ngIf=\"!!ovc.referredTo || !!ovc.dateReferredTo || ovcMin\">\r\n                                        <mat-label>Referred From OVC Partner</mat-label>\r\n                                        <input matInput name=\"referredFrom\" [(ngModel)]=\"ovc.referredFrom\"\r\n                                               [required]=\"!!ovc.dateReferredFrom\"\r\n                                               [disabled]=\"!!ovc.referredTo || !!ovc.dateReferredTo\"\r\n                                               #rf=\"ngModel\"/>\r\n                                        <mat-error\r\n                                                *ngIf=\"rf.errors && (rf.dirty || rf.touched) && (rf.errors.required)\">\r\n                                            OVC Partner referred from is required\r\n                                        </mat-error>\r\n                                    </mat-form-field>\r\n                                </div>\r\n                                <div class=\"col-md-6\">\r\n                                    <mat-form-field class=\"full-width\"\r\n                                                    *ngIf=\"!!ovc.referredTo || !!ovc.dateReferredTo || ovcMin\">\r\n                                        <mat-label>Date Referred From OVC Partner</mat-label>\r\n                                        <input matInput [matDatepicker]=\"picker9\"\r\n                                               [(ngModel)]=\"ovc.dateReferredFrom\"\r\n                                               #drf=\"ngModel\"\r\n                                               [max]=\"today\"\r\n                                               [min]=\"ovcMin\"\r\n                                               [disabled]=\"!!ovc.referredTo || !!ovc.dateReferredTo\"\r\n                                               [required]=\"!!ovc.referredFrom\"\r\n                                               name=\"drf\">\r\n                                        <mat-datepicker-toggle\r\n                                                matSuffix\r\n                                                [for]=\"picker9\">\r\n                                        </mat-datepicker-toggle>\r\n                                        <mat-datepicker #picker9></mat-datepicker>\r\n                                        <mat-error\r\n                                                *ngIf=\"drf.errors && (drf.dirty || drf.touched) && (drf.errors.required)\">\r\n                                            Date Referred to OVC Partner is required\r\n                                        </mat-error>\r\n                                    </mat-form-field>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"row\" *ngIf=\"ovc.householdUniqueNo\">\r\n                                <div class=\"col-md-12\">\r\n                                    <mat-form-field class=\"full-width\">\r\n                                        <mat-label>Services Provided</mat-label>\r\n                                        <mat-select name=\"services\" [(ngModel)]=\"ovc.servicesProvided\" multiple>\r\n                                            <mat-option [value]=\"'Emergency Health Services'\">Emergency Health\r\n                                                Services\r\n                                            </mat-option>\r\n                                            <mat-option [value]=\"'Educational Support'\">Educational Support</mat-option>\r\n                                            <mat-option [value]=\"'Household Economic Strengthening'\">Household Economic\r\n                                                Strengthening\r\n                                            </mat-option>\r\n                                            <mat-option [value]=\"'Nutritional Support'\">Nutritional Support</mat-option>\r\n                                            <mat-option [value]=\"'Health Education'\">Health Education</mat-option>\r\n                                            <mat-option [value]=\"'Water, Sanitation &amp; Hygiene Messaging (WASH)'\">\r\n                                                Water, Sanitation &amp; Hygiene Messaging (WASH)\r\n                                            </mat-option>\r\n                                            <mat-option [value]=\"'ART Adherence Support'\">ART Adherence Support\r\n                                            </mat-option>\r\n                                            <mat-option [value]=\"'Nutrition Assessment, Counseling and Support'\">\r\n                                                Nutrition Assessment, Counseling and Support\r\n                                            </mat-option>\r\n                                            <mat-option [value]=\"'Growth Monitoring'\">Growth Monitoring</mat-option>\r\n                                            <mat-option [value]=\"'Emergency Support'\">Emergency Support</mat-option>\r\n                                            <mat-option [value]=\"'School Enrollment/ Re-enrollment'\">School Enrollment/\r\n                                                Re-enrollment\r\n                                            </mat-option>\r\n                                            <mat-option [value]=\"'Psychosocial Support'\">Psychosocial Support\r\n                                            </mat-option>\r\n                                        </mat-select>\r\n                                    </mat-form-field>\r\n                                </div>\r\n                            </div>\r\n                        </fieldset>\r\n                    </ng-container>\r\n                </mat-card-content>\r\n                <mat-card-actions class=\"lamis-edit-form-actions\">\r\n                    <button mat-button type=\"button\" (click)=\"previousState()\">Back</button>\r\n                    <button mat-raised-button color=\"primary\" (click)=\"save()\"\r\n                            [disabled]=\"patientForm.invalid || isSaving || (!!ovc.householdUniqueNo && !(!!ovc.referredFrom || !!ovc.referredTo))\">\r\n                        {{entity.id ? 'Update' : 'Save'}}\r\n                    </button>\r\n                </mat-card-actions>\r\n            </mat-card>\r\n        </form>\r\n    </div>\r\n</div>\r\n"
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
        this.route.data.subscribe(({entity}) => {
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
    {type: PatientService},
    {type: ActivatedRoute}
];
DetailedTimelineComponent = __decorate([
    Component({
        selector: 'detailed-timeline',
        template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <mat-card>\n            <mat-card-header>\n                <mat-card-title>Patient Activity History </mat-card-title>\n            </mat-card-header>\n            <mat-card-content>\n                <patient-timeline [patientId]=\"id\" [patientUuid]=\"uuid\" [detailed]=\"true\"></patient-timeline>\n            </mat-card-content>\n            <mat-card-actions class=\"lamis-edit-form-actions\">\n                <button mat-button type=\"button\" (click)=\"previousState()\">Back</button>\n            </mat-card-actions>\n        </mat-card>\n    </div>\n</div>\n"
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
    {type: PatientService}
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
    ViewChild('container', {read: ViewContainerRef, static: true}),
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
        return this.http.delete(`${this.resourceUrl}/${path}/${id}`, {observe: 'response'});
    }

    getObservation(path, id) {
        return this.http.get(`${this.resourceUrl}/${path}/by-uuid/${id}`, {observe: 'response'});
    }
};
ObservationService.ctorParameters = () => [
    {type: HttpClient},
    {type: undefined, decorators: [{type: Inject, args: [SERVER_API_URL_CONFIG,]}]}
];
ObservationService.ngInjectableDef = ɵɵdefineInjectable({
    factory: function ObservationService_Factory() {
        return new ObservationService(ɵɵinject(HttpClient), ɵɵinject(SERVER_API_URL_CONFIG));
    }, token: ObservationService, providedIn: "root"
});
ObservationService = __decorate([
    Injectable({providedIn: 'root'}),
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
                            } else {
                                this.notificationService.showError('Error deleting event, please try again');
                            }
                        });
                    }
                });
            } else {
                // DO SOMETHING ELSE
            }
        });
    }

    loadActivities() {
        this.patientService.activities(this.patientId, this.detailed).subscribe((res) => this.timeLine = res);
    }
};
TimelineComponent.ctorParameters = () => [
    {type: PatientService},
    {type: Router},
    {type: ObservationService},
    {type: TdDialogService},
    {type: NotificationService}
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
        template: "<a class=\"mb-1 pb-1 underlined\" [routerLink]=\"['/', 'patients', patientUuid, 'timeline']\" *ngIf=\"!detailed\">Click here to view detailed History</a>\n<mat-divider></mat-divider>\n<timeline>\n    <timeline-event *ngFor=\"let period of timeLine\" side=\"right\">\n        <timeline-badge>\n            <mat-icon>insert_invitation</mat-icon>\n        </timeline-badge>\n        <timeline-panel>\n            <timeline-header>\n                <h4>{{period.date}}</h4>\n            </timeline-header>\n            <mat-list>\n                <mat-list-item>\n                    <div matLine>\n                        <ng-container *ngFor=\"let event of period.activities\">\n                            <div matLine>\n                                <button mat-icon-button aria-label=\"Delete event\"\n                                        *ngIf=\"event.deletable\"\n                                        (click)=\"delete(event.path, event.uuid)\">\n                                    <mat-icon>delete</mat-icon>\n                                </button>\n                                <button mat-icon-button aria-label=\"View event\"\n                                        *ngIf=\"event.viewable\"\n                                        (click)=\"view(event.path, event.uuid)\">\n                                    <mat-icon>remove_red_eye</mat-icon>\n                                </button>\n                                <button mat-icon-button aria-label=\"Edit event\"\n                                        *ngIf=\"event.editable\"\n                                        (click)=\"edit(event.path, event.uuid)\">\n                                    <mat-icon>edit</mat-icon>\n                                </button>\n                            </div>\n                            <a mat-line matTooltip=\"{{event.name}}\">{{event.name}}</a>\n                            <mat-divider></mat-divider>\n                        </ng-container>\n                    </div>\n                </mat-list-item>\n            </mat-list>\n        </timeline-panel>\n    </timeline-event>\n</timeline>\n"
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
        } else if ((side === 'alternate' || !side) && leftSide === false) {
            return rightClass;
        } else if (side === 'right') {
            return rightClass;
        } else {
            return leftClass;
        }
    }

    updateRowClasses(value) {
        this.oddClass = this.checkClass(value, true);
        this.evenClass = this.checkClass(value, false);
    }
};
TimelineEvent.ctorParameters = () => [
    {type: TimelineWidget}
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
    {type: TimelineEvent}
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
    {type: TimelineEvent}
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
    {type: PatientService}
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
    {type: PatientService}
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
        this.activatedRoute.data.subscribe(({entity}) => {
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
        } else {
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
    {type: PatientService},
    {type: ActivatedRoute},
    {type: Router},
    {type: NotificationService},
    {type: AppLoaderService}
];
ClientStatusComponent = __decorate([
    Component({
        selector: 'client-status',
        template: "<script src=\"patient-details.component.ts\"></script>\n<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <form name=\"form\" role=\"form\" novalidate (ngSubmit)=\"save()\" #statusForm=\"ngForm\">\n            <mat-card class=\"default\">\n                <mat-card-content *ngIf=\"patient\">\n                    <div>\n                        <mat-form-field class=\"full-width\" *ngIf=\"entity\">\n                            <input matInput [matDatepicker]=\"picker\"\n                                   placeholder=\"{{entity.id ? 'Date of Status' : 'Date of New Status'}}\"\n                                   [(ngModel)]=\"entity.dateStatus\"\n                                   [matDatepickerFilter]=\"filterDates.bind(this)\"\n                                   #visit=\"ngModel\"\n                                   [max]=\"today\"\n                                   [min]=\"patient.dateRegistration\"\n                                   name=\"visit\"\n                                   required>\n                            <mat-datepicker-toggle\n                                    matSuffix\n                                    [for]=\"picker\">\n                            </mat-datepicker-toggle>\n                            <mat-datepicker #picker></mat-datepicker>\n                            <mat-error\n                                    *ngIf=\"visit.errors && (visit.dirty || visit.touched) && (visit.errors.required)\">\n                                Date of new status is required\n                            </mat-error>\n                            <mat-error\n                                    *ngIf=\"visit.errors && (visit.dirty || visit.touched) && (visit.errors.min)\">\n                                Date of new status cannot be before {{entity.patient.dateRegistration}}\n                            </mat-error>\n                            <mat-error\n                                    *ngIf=\"visit.errors && (visit.dirty || visit.touched) && (visit.errors.max)\">\n                                Date of new status cannot be in the future\n                            </mat-error>\n                        </mat-form-field>\n                    </div>\n                    <div>\n                        <mat-form-field class=\"full-width\">\n                            <mat-select [(ngModel)]=\"entity.status\"\n                                        placeholder=\"{{entity.id ? 'Status' : 'New Status'}}\"\n                                        #outcome=\"ngModel\" required name=\"outcome\">\n                                <mat-option></mat-option>\n                                <mat-option [value]=\"'ART_TRANSFER_OUT'\">ART Transfer Out</mat-option>\n                                <mat-option [value]=\"'PRE_ART_TRANSFER_OUT'\">Pre-ART Transfer Out</mat-option>\n                                <mat-option [value]=\"'STOPPED_TREATMENT'\">Stopped Treatment</mat-option>\n                                <mat-option [value]=\"'KNOWN_DEATH'\">Died (Confirmed)</mat-option>\n                                <mat-option [value]=\"'PREVIOUSLY_UNDOCUMENTED_TRANSFER_CONFIRMED'\">Previously\n                                    Undocumented Patient Transfer (Confirmed)\n                                </mat-option>\n                                <mat-option [value]=\"'TRACED_UNABLE_TO_LOCATE'\">Traced Patient (Unable to locate)\n                                </mat-option>\n                                <mat-option [value]=\"'TRACED_AGREED_TO_RETURN_TO_CARE'\">Traced Patient and agreed to\n                                    return to care\n                                </mat-option>\n                                <mat-option [value]=\"'DID_NOT_ATTEMPT_TO_TRACE'\">Did Not Attempt to Trace Patient\n                                </mat-option>\n                            </mat-select>\n                            <mat-error\n                                    *ngIf=\"outcome.errors && (outcome.dirty || outcome.touched) && (outcome.errors.required)\">\n                                New Status is required\n                            </mat-error>\n                        </mat-form-field>\n                    </div>\n                    <div class=\"row\" *ngIf=\"entity.outcome && entity.outcome.indexOf('TRACE') !== -1\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <input matInput [matDatepicker]=\"picker1\"\n                                       placeholder=\"Date of Tracked\"\n                                       [(ngModel)]=\"entity.dateTracked\"\n                                       #tracked=\"ngModel\"\n                                       [min]=\"entity.patient.dateRegistration\"\n                                       [max]=\"entity.dateStatus\"\n                                       name=\"tracked\"\n                                       required>\n                                <mat-datepicker-toggle\n                                        matSuffix\n                                        [for]=\"picker1\">\n                                </mat-datepicker-toggle>\n                                <mat-datepicker #picker1></mat-datepicker>\n                                <mat-error\n                                        *ngIf=\"tracked.errors && (tracked.dirty || tracked.touched) && (tracked.errors.required)\">\n                                    Date tracked is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\" *ngIf=\"entity.outcome === 'TRACED_AGREED_TO_RETURN_TO_CARE'\">\n                            <mat-form-field class=\"full-width\">\n                                <input matInput [matDatepicker]=\"picker2\"\n                                       placeholder=\"Date Agreed to Return\"\n                                       [(ngModel)]=\"entity.agreedDate\"\n                                       #agreed=\"ngModel\"\n                                       [min]=\"entity.dateStatus\"\n                                       name=\"agreed\"\n                                       required>\n                                <mat-datepicker-toggle\n                                        matSuffix\n                                        [for]=\"picker2\">\n                                </mat-datepicker-toggle>\n                                <mat-datepicker #picker2></mat-datepicker>\n                                <mat-error\n                                        *ngIf=\"agreed.errors && (agreed.dirty || agreed.touched) && (agreed.errors.required)\">\n                                    Date of agreed to return is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div *ngIf=\"entity.status === 'ART_TRANSFER_OUT'\">\n                        <mat-form-field class=\"full-width\">\n                            <input matInput type=\"text\" placeholder=\"Facility Transferred To\"\n                                   required name=\"fac\" #fac=\"ngModel\"\n                                   [(ngModel)]=\"facilityTransferredTo\"\n                                   (input)=\"change($event.target.value)\"\n                                   [matAutocomplete]=\"auto\">\n                            <mat-autocomplete #auto=\"matAutocomplete\">\n                                <mat-option *ngFor=\"let facility of facilities\" [value]=\"facility\">{{facility}}</mat-option>\n                            </mat-autocomplete>\n                            <mat-error\n                                    *ngIf=\"fac.errors && (fac.dirty || fac.touched) && (fac.errors.required)\">\n                                Facility transferred to is required\n                            </mat-error>\n                        </mat-form-field>\n                    </div>\n                    <div *ngIf=\"entity.status === 'KNOWN_DEATH'\">\n                        <mat-form-field class=\"full-width\">\n                            <mat-select [(ngModel)]=\"entity.causeOfDeath\"\n                                        placeholder=\"Cause of Death\"\n                                        #death=\"ngModel\" required name=\"death\">\n                                <mat-option></mat-option>\n                                <mat-option [value]=\"'HIV disease resulting in TB'\">HIV disease resulting in TB\n                                </mat-option>\n                                <mat-option [value]=\"'HIV disease resulting in cancer'\">HIV disease resulting in\n                                    cancer\n                                </mat-option>\n                                <mat-option [value]=\"'HIV disease resulting in other infectious and parasitic disease'\">\n                                    HIV disease resulting in other infectious and parasitic disease\n                                </mat-option>\n                                <mat-option\n                                        [value]=\"'Other HIV disease resulting in other disease or conditions leading to death'\">\n                                    Other HIV disease resulting in other disease or conditions leading to death\n                                </mat-option>\n                                <mat-option [value]=\"'Other natural causes'\">Other natural causes</mat-option>\n                                <mat-option [value]=\"'Non-natural causes'\">Non-natural causes</mat-option>\n                                <mat-option [value]=\"'Unknown cause'\">Unknown cause</mat-option>\n                            </mat-select>\n                            <mat-error\n                                    *ngIf=\"death.errors && (death.dirty || death.touched) && (death.errors.required)\">\n                                Cause of death is required\n                            </mat-error>\n                        </mat-form-field>\n                    </div>\n                    <div *ngIf=\"entity.status === 'STOPPED_TREATMENT'\">\n                        <mat-form-field class=\"full-width\">\n                            <mat-select [(ngModel)]=\"entity.reasonForInterruption\"\n                                        placeholder=\"Reason for Interruption\"\n                                        #interrupt=\"ngModel\" required name=\"interrupt\">\n                                <mat-option></mat-option>\n                                <mat-option [value]=\"'Toxicity/side effect'\">Toxicity /side effect</mat-option>\n                                <mat-option [value]=\"'Pregnancy'\">Pregnancy</mat-option>\n                                <mat-option [value]=\"'Treatment failure'\">Treatment failure</mat-option>\n                                <mat-option [value]=\"'Poor adherence'\">Poor adherence</mat-option>\n                                <mat-option [value]=\"'Illness, hospitalization'\">Illness, hospitalization</mat-option>\n                                <mat-option [value]=\"'Drug out of stock'\">Drug out of stock</mat-option>\n                                <mat-option [value]=\"'Patient lacks finances'\">Patient lacks finances</mat-option>\n                                <mat-option [value]=\"'Other patient decision'\">Other patient decision</mat-option>\n                                <mat-option [value]=\"'Planned Rx interruption'\">Planned Rx interruption</mat-option>\n                                <mat-option [value]=\"'Other'\">Other</mat-option>\n                            </mat-select>\n                            <mat-error\n                                    *ngIf=\"interrupt.errors && (interrupt.dirty || interrupt.touched) && (interrupt.errors.required)\">\n                                Reason for interruption is required\n                            </mat-error>\n                        </mat-form-field>\n                    </div>\n                    <mat-divider></mat-divider>\n                </mat-card-content>\n                <mat-card-actions class=\"lamis-edit-form-actions\">\n                    <button mat-raised-button type=\"button\" (click)=\"previousState()\">Back</button>\n                    <button mat-raised-button color='primary'\n                            [disabled]=\"statusForm.invalid\"\n                            type=\"submit\">\n                        {{entity.id !== undefined ? 'Update' : 'Save'}}\n                    </button>\n                </mat-card-actions>\n            </mat-card>\n        </form>\n    </div>\n</div>\n"
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
    {type: PatientService}
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

export {
    ClientStatusModule,
    PatientListComponent,
    PatientModule,
    PatientService,
    PatientDetailsComponent as ɵa,
    PatientEditComponent as ɵb,
    WidgetContainerComponent as ɵc,
    TimelineComponent as ɵd,
    ObservationService as ɵe,
    DetailedTimelineComponent as ɵf,
    SummaryWidgetComponent as ɵg,
    UniqueHospitalNumValidator as ɵh,
    PatientResolve as ɵi,
    ROUTES as ɵj,
    TimelineWidgetModule as ɵk,
    TimelineBadge as ɵl,
    TimelineEvent as ɵm,
    TimelineWidget as ɵn,
    TimelineFooter as ɵo,
    TimelineHeader as ɵp,
    TimelinePanel as ɵq,
    StatusResolve as ɵr,
    ROUTES$1 as ɵs,
    ClientStatusComponent as ɵt
};
//# sourceMappingURL=lamis-patient-1.4.0.js.map
