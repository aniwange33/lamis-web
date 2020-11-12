import {__decorate, __param, __metadata} from 'tslib';
import {Inject, ɵɵdefineInjectable, ɵɵinject, Injectable, Component, ViewChild, Input, NgModule} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
    DATE_FORMAT,
    SERVER_API_URL_CONFIG,
    entityCompare,
    AppLoaderService,
    MatDateFormatModule
} from '@lamis/web-core';
import {map, filter} from 'rxjs/operators';
import * as moment_ from 'moment';
import {
    CardViewDateItemModel,
    CardViewIntItemModel,
    CardViewTextItemModel,
    CardViewBoolItemModel,
    NotificationService,
    CoreModule
} from '@alfresco/adf-core';
import {CommonModule} from '@angular/common';
import {
    MatProgressBar,
    MatButton,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTableModule,
    MatTabsModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTooltipModule
} from '@angular/material';
import {Router, ActivatedRoute, RouterModule} from '@angular/router';
import {TdDialogService, CovalentMessageModule, CovalentDialogsModule, CovalentCommonModule} from '@covalent/core';
import {ColumnMode, NgxDatatableModule} from '@swimlane/ngx-datatable';
import {of} from 'rxjs';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CustomFormsModule} from 'ng2-validation';

const moment = moment_;
let PharmacyService = class PharmacyService {
    constructor(http, serverUrl) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.resourceUrl = '';
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/pharmacies';
    }

    create(pharmacy) {
        const copy = this.convertDateFromClient(pharmacy);
        return this.http
            .post(this.resourceUrl, copy, {observe: 'response'})
            .pipe(map((res) => this.convertDateFromServer(res)));
    }

    update(pharmacy) {
        const copy = this.convertDateFromClient(pharmacy);
        return this.http
            .put(this.resourceUrl, copy, {observe: 'response'})
            .pipe(map((res) => this.convertDateFromServer(res)));
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

    delete(id) {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    getPatient(id) {
        return this.http.get(`/api/patients/by-uuid/${id}`, {observe: 'body'})
            .pipe(map((res) => {
                if (res) {
                    res.dateRegistration = res.dateRegistration != null ? moment(res.dateRegistration) : null;
                }
                return res;
            }));
    }

    getVisitDatesByPatient(patientId) {
        return this.http.get(`${this.resourceUrl}/patient/${patientId}/visit-dates`)
            .pipe(map((res) => {
                res.forEach(d => moment(d));
                return res;
            }));
    }

    regimenTypes() {
        return this.http.get(`${this.resourceUrl}/regimen-types`);
    }

    regimenInfo(patientId) {
        return this.http.get(`${this.resourceUrl}/regimen-info/patient/${patientId}`);
    }

    adrs() {
        return this.http.get(`${this.resourceUrl}/adrs`);
    }

    getLinesByPharmacy(pharmacyId) {
        return this.http.get(`${this.resourceUrl}/${pharmacyId}/lines`);
    }

    regimesByRegimenType(id) {
        return this.http.get(`${this.resourceUrl}/regimens/regimen-type/${id}`);
    }

    getDrugsByRegimen(id) {
        return this.http.get(`${this.resourceUrl}/drugs/regimen/${id}`);
    }

    getRegimenById(id) {
        return this.http.get(`${this.resourceUrl}/regimen/${id}`);
    }

    latestVisit(patientId) {
        return this.http.get(`${this.resourceUrl}/patient/${patientId}/latest`);
    }

    getDevolvement(patientId, date) {
        const d = date.format(DATE_FORMAT);
        return this.http.get(`${this.resourceUrl}/patient/${patientId}/devolvement/at/${d}`)
            .pipe(map(res => {
                res.dateDevolved = res.dateDevolved != null ? moment(res.dateDevolved) : null;
                res.dateReturnedToFacility = res.dateReturnedToFacility != null ? moment(res.dateReturnedToFacility) : null;
                res.dateNextClinic = res.dateNextClinic != null ? moment(res.dateNextClinic) : null;
                res.dateNextRefill = res.dateNextRefill != null ? moment(res.dateNextRefill) : null;
                return res;
            }));
    }

    convertDateFromClient(pharmacy) {
        const copy = Object.assign({}, pharmacy, {
            dateVisit: pharmacy.dateVisit != null && pharmacy.dateVisit.isValid() ? pharmacy.dateVisit.format(DATE_FORMAT) : null,
            nextAppointment: pharmacy.nextAppointment != null && pharmacy.nextAppointment.isValid() ? pharmacy.nextAppointment.format(DATE_FORMAT) : null
        });
        return copy;
    }

    convertDateFromServer(res) {
        if (res.body) {
            res.body.nextAppointment = res.body.nextAppointment != null ? moment(res.body.nextAppointment) : null;
            res.body.dateVisit = res.body.dateVisit != null ? moment(res.body.dateVisit) : null;
        }
        return res;
    }

    convertDateArrayFromServer(res) {
        if (res.body) {
            res.body.forEach((pharmacy) => {
                pharmacy.dateVisit = pharmacy.dateVisit != null ? moment(pharmacy.dateVisit) : null;
                pharmacy.nextAppointment = pharmacy.nextAppointment != null ? moment(pharmacy.nextAppointment) : null;
                1;
            });
        }
        return res;
    }
};
PharmacyService.ctorParameters = () => [
    {type: HttpClient},
    {type: undefined, decorators: [{type: Inject, args: [SERVER_API_URL_CONFIG,]}]}
];
PharmacyService.ngInjectableDef = ɵɵdefineInjectable({
    factory: function PharmacyService_Factory() {
        return new PharmacyService(ɵɵinject(HttpClient), ɵɵinject(SERVER_API_URL_CONFIG));
    }, token: PharmacyService, providedIn: "root"
});
PharmacyService = __decorate([
    Injectable({providedIn: 'root'}),
    __param(1, Inject(SERVER_API_URL_CONFIG)),
    __metadata("design:paramtypes", [HttpClient, Object])
], PharmacyService);

let PharmacyDetailsComponent = class PharmacyDetailsComponent {
    constructor(router, route, pharmacyService, _dialogService, notificationService) {
        this.router = router;
        this.route = route;
        this.pharmacyService = pharmacyService;
        this._dialogService = _dialogService;
        this.notificationService = notificationService;
        this.properties = [];
    }

    ngOnInit() {
        this.route.data.subscribe(({entity}) => {
            this.entity = !!entity && entity.body ? entity.body : entity;
            const patientId = this.route.snapshot.paramMap.get('patientId');
            this.pharmacyService.getPatient(patientId).subscribe((res) => this.entity.patient = res);
            this.buildProperties();
        });
    }

    edit() {
        this.router.navigate(['/', 'pharmacies', this.entity.uuid, 'patient', this.entity.patient.id, 'edit']);
    }

    delete() {
        this._dialogService.openConfirm({
            title: 'Confirm',
            message: 'Do you want to delete this pharmacy refill, action cannot be reversed?',
            cancelButton: 'No',
            acceptButton: 'Yes',
            width: '500px',
        }).afterClosed().subscribe((accept) => {
            if (accept) {
                this.pharmacyService.delete(this.entity.id).subscribe((res) => {
                    if (res.ok) {
                        this.router.navigate(['patients']);
                    } else {
                        this.notificationService.showError('Error deleting visit, please try again');
                    }
                });
            } else {
                // DO SOMETHING ELSE
            }
        });
    }

    buildProperties() {
        this.properties.push(new CardViewDateItemModel({
            key: 'ds',
            value: this.entity.dateVisit,
            label: 'Date of Dispensing',
            format: 'dd MMM, yyyy'
        }));
        this.pharmacyService.getLinesByPharmacy(this.entity.id)
            .subscribe(res => {
                this.dataSource = res;
                this.properties.push(new CardViewIntItemModel({
                    label: 'Refill Period (days)',
                    key: 'cs',
                    value: res.map(r => r.duration)
                        .sort((r1, r2) => r1 - r2)
                        .pop()
                }));
            });
        this.properties.push(new CardViewDateItemModel({
            key: 'na',
            value: this.entity.nextAppointment,
            label: 'Next Pharmacy Refill',
            format: 'dd MMM, yyyy'
        }));
        this.properties.push(new CardViewTextItemModel({
            label: 'MMD Type',
            key: 'fs',
            value: this.entity.mmdType
        }));
        this.properties.push(new CardViewBoolItemModel({
            label: 'Adverse Drug Reactions',
            key: 'adr',
            value: this.entity.adrScreened
        }));
        this.properties.push(new CardViewBoolItemModel({
            label: 'Prescription error',
            key: 'bw',
            value: this.entity.prescriptionError
        }));
        this.pharmacyService.regimenInfo(this.entity.patient.id)
            .subscribe((res) => {
                this.properties.push(new CardViewTextItemModel({
                    label: 'Regimen Line',
                    key: 'cs',
                    value: res.regimenType
                }));
                this.properties.push(new CardViewTextItemModel({
                    label: 'Regimen',
                    key: 'ts',
                    value: res.regimen
                }));
            });
    }

    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
    }
};
PharmacyDetailsComponent.ctorParameters = () => [
    {type: Router},
    {type: ActivatedRoute},
    {type: PharmacyService},
    {type: TdDialogService},
    {type: NotificationService}
];
PharmacyDetailsComponent = __decorate([
    Component({
        selector: 'lamis-pharmacy',
        template: "<div class=\"lamis-edit-form\">\r\n    <div class=\"lamis-edit-form-container\">\r\n        <mat-card>\r\n            <mat-card-header>\r\n            </mat-card-header>\r\n            <mat-card-content>\r\n                <adf-card-view [properties]=\"properties\" editable=\"false\"></adf-card-view>\r\n                <mat-divider></mat-divider>\r\n                <adf-datatable *ngIf=\"dataSource\"\r\n                               [rows]=\"dataSource\">\r\n                    <data-columns>\r\n                        <data-column key=\"description\" title=\"Description\" sortable=\"true\"></data-column>\r\n                        <data-column key=\"morning\" title=\"Morning\" sortable=\"false\"></data-column>\r\n                        <data-column key=\"afternoon\" title=\"Afternoon\" sortable=\"false\"></data-column>\r\n                        <data-column key=\"evening\" title=\"Evening\" sortable=\"false\"></data-column>\r\n                        <data-column key=\"duration\" title=\"Duration\" sortable=\"false\"></data-column>\r\n                    </data-columns>\r\n                </adf-datatable>\r\n            </mat-card-content>\r\n            <mat-card-actions class=\"lamis-edit-form-actions\">\r\n                <button mat-button (click)=\"previousState()\">Back</button>\r\n                <button mat-raised-button color=\"warn\" (click)=\"delete()\">Delete</button>\r\n                <button mat-raised-button color=\"primary\" (click)=\"edit()\">Edit</button>\r\n            </mat-card-actions>\r\n        </mat-card>\r\n    </div>\r\n</div>\r\n"
    }),
    __metadata("design:paramtypes", [Router, ActivatedRoute, PharmacyService,
        TdDialogService,
        NotificationService])
], PharmacyDetailsComponent);

const moment$1 = moment_;
let PharmacyEditComponent = class PharmacyEditComponent {
    constructor(pharmacyService, notification, appLoaderService, activatedRoute) {
        this.pharmacyService = pharmacyService;
        this.notification = notification;
        this.appLoaderService = appLoaderService;
        this.activatedRoute = activatedRoute;
        this.entity = {};
        this.regimenTypes = [];
        this.regimens = [];
        this.selectedRegimens = [];
        this.error = false;
        this.tomorrow = moment$1().add(1, 'days');
        this.today = moment$1();
        this.ColumnMode = ColumnMode;
        this.editing = {};
        this.rows = [];
        this.drugIds = new Set();
        this.visitDates = [];
        this.drugs = [];
    }

    createEntity() {
        return {};
    }

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({entity}) => {
            this.entity = !!entity && entity.body ? entity.body : entity;
            if (this.entity === undefined) {
                this.entity = this.createEntity();
            }
            const patientId = this.activatedRoute.snapshot.paramMap.get('patientId');
            this.pharmacyService.getPatient(patientId).subscribe((res) => {
                this.entity.patient = res;
                this.patient = res;
                this.dateRegistration = res.dateRegistration;
                this.entity.facility = res.facility;
                this.minNextAppointment = this.dateRegistration.clone().add(15, 'days');
                this.pharmacyService.getVisitDatesByPatient(res.id).subscribe((res) => {
                    this.visitDates = res;
                });
            });
            if (this.entity.id) {
                this.pharmacyService.getLinesByPharmacy(this.entity.id)
                    .subscribe((res) => {
                        this.rows = res.map(r => {
                            r.quantity = (r.morning + r.afternoon + r.evening) * r.duration;
                            this.pharmacyService.getRegimenById(r.regimen.id).subscribe(res => {
                                if (!this.regimens.map(r => r.id).includes(r.regimen.id)) {
                                    this.regimens.push(res);
                                    this.selectedRegimens.push(res);
                                    this.regimens = [...this.regimens];
                                    this.selectedRegimens = [...this.selectedRegimens];
                                }
                            });
                            return r;
                        });
                        this.entity.duration = res.map(r => r.duration)
                            .sort((r1, r2) => r1 - r2)
                            .pop();
                    });
                this.pharmacyService.getDevolvement(this.entity.patient.id, this.entity.dateVisit).subscribe(res => {
                    this.devolve = res;
                    this.updateDmocType();
                });
            }
            this.pharmacyService.regimenTypes().subscribe(res => this.regimenTypes = res);
        });
    }

    dateVisitChanged(date) {
        this.entity.nextAppointment = this.suggestedNextAppointment();
        this.minNextAppointment = this.entity.nextAppointment.clone().subtract(7, 'days');
        this.maxNextVisit = this.entity.nextAppointment.clone().add(180, 'days');
        this.pharmacyService.getDevolvement(this.entity.patient.id, this.entity.dateVisit).subscribe(res => {
            this.devolve = res;
            this.updateDmocType();
        });
    }

    suggestedNextAppointment() {
        if (this.entity.dateVisit) {
            let nextAppointment = this.entity.dateVisit.clone().add(this.entity.duration - 2 || 13, 'days');
            const weekday = nextAppointment.isoWeekday();
            if (weekday === 6) {
                nextAppointment = nextAppointment.clone().add(2, 'days');
            } else if (weekday === 7) {
                nextAppointment = nextAppointment.clone().add(1, 'days');
            }
            return nextAppointment;
        }
        return null;
    }

    updateDmocType() {
        let type = 'MMD';
        switch (this.devolve.dmocType) {
            case 'ARC':
                type = 'Adolescent Refill Club';
                break;
            case 'CPARP':
                type = 'CPARP';
                break;
            case 'CARC':
                type = 'CARC';
                break;
            case 'F_CARG':
                type = 'F-CARG';
                break;
            case 'FAST_TRACK':
                type = 'Fast Track';
                break;
            case 'S_CARG':
                type = 'S-CARG';
                break;
            case 'MMS':
                type = 'MMS';
                break;
        }
        this.dmocType = type;
    }

    filterDates(date) {
        let exists = false;
        this.visitDates.forEach(d => {
            if (date.diff(d, 'days') === 0) {
                exists = true;
            }
        });
        return (this.entity.id && date.diff(this.entity.dateVisit, 'days') === 0) || !exists;
    }

    previousState() {
        window.history.back();
    }

    entityCompare(e1, e2) {
        return entityCompare(e1, e2);
    }

    save() {
        this.submitButton.disabled = true;
        //this.progressBar.mode = 'indeterminate';
        this.appLoaderService.open('Saving visit...');
        this.entity.lines = this.rows;
        this.isSaving = true;
        if (this.entity.id !== undefined) {
            this.subscribeToSaveResponse(this.pharmacyService.update(this.entity));
        } else {
            this.subscribeToSaveResponse(this.pharmacyService.create(this.entity));
        }
    }

    regimenTypeChange(type) {
        this.pharmacyService.regimesByRegimenType(type.id).subscribe((res) => {
            res.forEach((regimen) => {
                if (!this.regimens.map(r => r.id).includes(regimen.id)) {
                    this.regimens.push(regimen);
                    this.regimens = [...this.regimens];
                }
            });
        });
    }

    durationChanged(duration) {
        this.rows = this.rows.map(r => {
            r.duration = duration;
            r.quantity = (r.morning + r.afternoon + r.evening) * duration;
            return r;
        });
        this.rows = [...this.rows];
        this.entity.nextAppointment = this.suggestedNextAppointment();
        if (duration === 90) {
            this.entity.mmdType = 'MMD-3';
        } else if (duration === 120) {
            this.entity.mmdType = 'MMD-4';
        } else if (duration === 150) {
            this.entity.mmdType = 'MMD-5';
        } else if (duration === 180) {
            this.entity.mmdType = 'MMD-6';
        } else {
            this.entity.mmdType = null;
        }
    }

    regimenChange(event) {
        this.selectedRegimens.forEach(regimen => {
            this.pharmacyService.getDrugsByRegimen(regimen.id).subscribe((res) => {
                res.forEach((drug) => {
                    console.log('Drug', drug, this.rows);
                    if (!this.rows.map(r => r.drug.id).includes(drug.drug.id)) {
                        this.rows.push({
                            drug: drug.drug,
                            description: drug.drug.name,
                            morning: drug.drug.morning,
                            afternoon: drug.drug.afternoon,
                            evening: drug.drug.evening,
                            regimen: regimen,
                            duration: this.entity.duration,
                            quantity: this.entity.duration * (drug.drug.morning + drug.drug.afternoon + drug.drug.evening),
                            regimenType: regimen.regimenType,
                            regimenDrug: drug.regimenDrug
                        });
                        this.rows = [...this.rows];
                        //this.drugs.push(drug.drug);
                    }
                    this.rows = this.rows.filter(row => this.selectedRegimens.map(regimen => regimen.id).includes(row.regimen.id));
                    this.drugs.forEach(drug => {
                        if (!this.rows.map(r => r.drug.id).includes(drug.id)) {
                            this.drugs = this.drugs.filter(d => d.id !== drug.id);
                        }
                    });
                });
            });
        });
    }

    updateValue(event, cell, rowIndex) {
        this.editing[rowIndex + '-' + cell] = false;
        this.rows[rowIndex][cell] = event.target.value;
        if (this.entity.duration) {
            const total = parseInt(this.rows[rowIndex]['morning'] + '' || '0') + parseInt(this.rows[rowIndex]['afternoon'] + '' || '0') +
                parseInt(this.rows[rowIndex]['evening'] + '' || '0');
            this.rows[rowIndex]['quantity'] = (total * this.entity.duration);
        }
        this.rows = [...this.rows];
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
        this.notification.showInfo('Pharmacy visit successfully saved');
        this.previousState();
    }

    onSaveError() {
        this.isSaving = false;
        this.error = true;
        this.notification.showError('Error saving pharmacy visit');
    }

    onError(errorMessage) {
        this.isSaving = false;
        this.notification.showError(errorMessage);
    }
};
PharmacyEditComponent.ctorParameters = () => [
    {type: PharmacyService},
    {type: NotificationService},
    {type: AppLoaderService},
    {type: ActivatedRoute}
];
__decorate([
    ViewChild(MatProgressBar, {static: true}),
    __metadata("design:type", MatProgressBar)
], PharmacyEditComponent.prototype, "progressBar", void 0);
__decorate([
    ViewChild(MatButton, {static: true}),
    __metadata("design:type", MatButton)
], PharmacyEditComponent.prototype, "submitButton", void 0);
PharmacyEditComponent = __decorate([
    Component({
        selector: 'lamis-pharmacy-edit',
        template: "<div class=\"lamis-edit-form\">\r\n    <div class=\"lamis-edit-form-container\">\r\n        <form name=\"form\" role=\"form\" novalidate (ngSubmit)=\"save()\" #pharmacyForm=\"ngForm\">\r\n            <mat-card class=\"default\">\r\n                <mat-card-header>\r\n                </mat-card-header>\r\n                <mat-card-content *ngIf=\"patient\">\r\n                    <div>\r\n                        <mat-form-field class=\"full-width\" *ngIf=\"entity && dateRegistration\">\r\n                            <input matInput [matDatepicker]=\"picker\"\r\n                                   placeholder=\"Date of Dispensing\"\r\n                                   [(ngModel)]=\"entity.dateVisit\"\r\n                                   [matDatepickerFilter]=\"filterDates.bind(this)\"\r\n                                   (dateChange)=\"dateVisitChanged($event.value)\"\r\n                                   #visit=\"ngModel\"\r\n                                   [max]=\"today\"\r\n                                   [min]=\"dateRegistration\"\r\n                                   name=\"visit\"\r\n                                   required>\r\n                            <mat-datepicker-toggle\r\n                                    matSuffix\r\n                                    [for]=\"picker\">\r\n                            </mat-datepicker-toggle>\r\n                            <mat-datepicker #picker></mat-datepicker>\r\n                            <mat-error\r\n                                    *ngIf=\"visit.errors && (visit.dirty || visit.touched) && (visit.errors.required)\">\r\n                                Date of dispensing is required\r\n                            </mat-error>\r\n                            <mat-error\r\n                                    *ngIf=\"visit.errors && (visit.dirty || visit.touched) && (visit.errors.min)\">\r\n                                Date of dispensing cannot be before {{dateRegistration | date: 'dd MMM, yyyy'}}\r\n                            </mat-error>\r\n                            <mat-error\r\n                                    *ngIf=\"visit.errors && (visit.dirty || visit.touched) && (visit.errors.max)\">\r\n                                Date of dispensing cannot be in the future\r\n                            </mat-error>\r\n                        </mat-form-field>\r\n                    </div>\r\n                    <div class=\"row\" *ngIf=\"devolve && !devolve.dateReturnedToFacility\">\r\n                        <div class=\"col-md-6\">\r\n                            <mat-form-field class=\"full-width\">\r\n                                <mat-label>Date of Devolvement</mat-label>\r\n                                <input matInput disabled value=\"{{devolve.dateDevolved | date: 'dd MMM, yyyy'}}\">\r\n                            </mat-form-field>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <mat-form-field class=\"full-width\">\r\n                                <mat-label>DMOC Type</mat-label>\r\n                                <input matInput disabled [value]=\"dmocType\">\r\n                            </mat-form-field>\r\n                        </div>\r\n                    </div>\r\n                    <div>\r\n                        <mat-form-field class=\"full-width\">\r\n                            <mat-select [(ngModel)]=\"entity.duration\"\r\n                                        placeholder=\"Refill Period (days)\"\r\n                                        (selectionChange)=\"durationChanged($event.value)\"\r\n                                        #refill=\"ngModel\" required name=\"refill\">\r\n                                <mat-option></mat-option>\r\n                                <mat-option [value]=\"15\">15</mat-option>\r\n                                <mat-option [value]=\"30\">30</mat-option>\r\n                                <mat-option [value]=\"60\">60</mat-option>\r\n                                <mat-option [value]=\"90\">90</mat-option>\r\n                                <mat-option [value]=\"120\">120</mat-option>\r\n                                <mat-option [value]=\"150\">150</mat-option>\r\n                                <mat-option [value]=\"180\">180</mat-option>\r\n                            </mat-select>\r\n                            <mat-error\r\n                                    *ngIf=\"refill.errors && (refill.dirty || refill.touched) && (refill.errors.required)\">\r\n                                Refill Duration is required\r\n                            </mat-error>\r\n                        </mat-form-field>\r\n                    </div>\r\n                    <div *ngIf=\"minNextAppointment\">\r\n                        <mat-form-field class=\"full-width\">\r\n                            <input matInput [matDatepicker]=\"picker1\"\r\n                                   placeholder=\"Date of Next Appointment\"\r\n                                   [(ngModel)]=\"entity.nextAppointment\"\r\n                                   #next=\"ngModel\"\r\n                                   [min]=\"minNextAppointment\"\r\n                                   [max]=\"maxNextVisit\"\r\n                                   name=\"next\"\r\n                                   required>\r\n                            <mat-datepicker-toggle\r\n                                    matSuffix\r\n                                    [for]=\"picker1\">\r\n                            </mat-datepicker-toggle>\r\n                            <mat-datepicker #picker1></mat-datepicker>\r\n                            <mat-error\r\n                                    *ngIf=\"next.errors && (next.dirty || next.touched) && (next.errors.required)\">\r\n                                Date of Next Appointment is required\r\n                            </mat-error>\r\n                            <mat-error\r\n                                    *ngIf=\"next.errors && (next.dirty || next.touched) && (next.errors.max)\">\r\n                                Date of Next Appointment must be after {{maxNextVisit | date:'dd MMM, yyyy'}}\r\n                            </mat-error>\r\n                            <mat-error\r\n                                    *ngIf=\"next.errors && (next.dirty || next.touched) && (next.errors.min)\">\r\n                                Date of Next Appointment must be after {{minNextAppointment | date:'dd MMM, yyyy'}}\r\n                            </mat-error>\r\n                        </mat-form-field>\r\n                    </div>\r\n                    <div>\r\n                        <mat-form-field class=\"full-width\" *ngIf=\"entity.mmdType\">\r\n                            <mat-label>MMD Type</mat-label>\r\n                            <input matInput disabled [value]=\"entity.mmdType || ''\">\r\n                        </mat-form-field>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <mat-checkbox [(ngModel)]=\"entity.prescriptionError\" name=\"error\">Any prescription error?\r\n                            </mat-checkbox>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <mat-checkbox [(ngModel)]=\"entity.adrScreened\" name=\"screened\">Adverse Drug Reactions\r\n                            </mat-checkbox>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <mat-form-field *ngIf=\"entity.adrScreened\">\r\n                                <mat-select multiple [(ngModel)]=\"entity.adrs\"\r\n                                            name=\"adrs\"\r\n                                >\r\n                                    <mat-option></mat-option>\r\n                                </mat-select>\r\n                            </mat-form-field>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <mat-form-field>\r\n                                <mat-select placeholder=\"Regimen Type\"\r\n                                            (selectionChange)=\"regimenTypeChange($event.value)\">\r\n                                    <mat-option></mat-option>\r\n                                    <mat-option *ngFor=\"let type of regimenTypes\"\r\n                                                [value]=\"type\">{{type.description}}</mat-option>\r\n                                </mat-select>\r\n                            </mat-form-field>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <mat-form-field>\r\n                                <mat-select placeholder=\"Regimen\"\r\n                                            multiple\r\n                                            name=\"regimen\"\r\n                                            [(ngModel)]=\"selectedRegimens\"\r\n                                            [compareWith]=\"entityCompare\"\r\n                                            (selectionChange)=\"regimenChange($event.value)\">\r\n                                    <mat-option *ngFor=\"let regimen of regimens\"\r\n                                                [value]=\"regimen\">{{regimen.description}}</mat-option>\r\n                                </mat-select>\r\n                            </mat-form-field>\r\n                        </div>\r\n                    </div>\r\n                    <div>\r\n                        Drug Dispensed\r\n                        <mat-divider></mat-divider>\r\n                        <ngx-datatable\r\n                            #mydatatable\r\n                            class=\"material\"\r\n                            [headerHeight]=\"50\"\r\n                            [limit]=\"8\"\r\n                            [columnMode]=\"ColumnMode.force\"\r\n                            [footerHeight]=\"50\"\r\n                            rowHeight=\"auto\"\r\n                            [rows]=\"rows\"\r\n                        >\r\n                            <ngx-datatable-column name=\"Description\">\r\n                                <ng-template ngx-datatable-cell-template let-value=\"value\">\r\n                                    <mat-form-field>\r\n                                        <input matInput disabled [value]=\"value\" style=\"font-weight: 900\">\r\n                                    </mat-form-field>\r\n                                </ng-template>\r\n                            </ngx-datatable-column>\r\n                            <ngx-datatable-column [maxWidth]=\"1\">\r\n                                <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\"\r\n                                             let-row=\"row\">\r\n                                </ng-template>\r\n                            </ngx-datatable-column>\r\n                            <ngx-datatable-column name=\"Morning\">\r\n                                <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\"\r\n                                             let-row=\"row\">\r\n                                    <mat-form-field class=\"full-width\">\r\n                                        <input\r\n                                                autofocus\r\n                                                matInput\r\n                                                type=\"number\"\r\n                                                (blur)=\"updateValue($event, 'morning', rowIndex)\"\r\n                                                [value]=\"value\"\r\n                                        >\r\n                                    </mat-form-field>\r\n                                </ng-template>\r\n                            </ngx-datatable-column>\r\n                            <ngx-datatable-column [maxWidth]=\"1\">\r\n                                <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\"\r\n                                             let-row=\"row\">\r\n                                </ng-template>\r\n                            </ngx-datatable-column>\r\n                            <ngx-datatable-column name=\"Afternoon\">\r\n                                <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\"\r\n                                             let-row=\"row\">\r\n                                    <mat-form-field class=\"full-width\">\r\n                                        <input\r\n                                                autofocus\r\n                                                matInput\r\n                                                type=\"number\"\r\n                                                (blur)=\"updateValue($event, 'afternoon', rowIndex)\"\r\n                                                [value]=\"value\"\r\n                                        >\r\n                                    </mat-form-field>\r\n                                </ng-template>\r\n                            </ngx-datatable-column>\r\n                            <ngx-datatable-column [maxWidth]=\"1\">\r\n                                <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\"\r\n                                             let-row=\"row\">\r\n                                </ng-template>\r\n                            </ngx-datatable-column>\r\n                            <ngx-datatable-column name=\"Evening\">\r\n                                <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\"\r\n                                             let-row=\"row\">\r\n                                    <mat-form-field class=\"full-width\">\r\n                                        <input\r\n                                                autofocus\r\n                                                matInput\r\n                                                type=\"number\"\r\n                                                (blur)=\"updateValue($event, 'evening', rowIndex)\"\r\n                                                [value]=\"value\"\r\n                                        >\r\n                                    </mat-form-field>\r\n                                </ng-template>\r\n                            </ngx-datatable-column>\r\n                            <ngx-datatable-column [maxWidth]=\"1\">\r\n                                <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\"\r\n                                             let-row=\"row\">\r\n                                </ng-template>\r\n                            </ngx-datatable-column>\r\n                            <ngx-datatable-column name=\"Duration\">\r\n                                <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\"\r\n                                             let-row=\"row\">\r\n                                    <mat-form-field class=\"full-width\">\r\n                                        <input\r\n                                                autofocus\r\n                                                matInput\r\n                                                type=\"number\"\r\n                                                (blur)=\"updateValue($event, 'duration', rowIndex)\"\r\n                                                [value]=\"value\"\r\n                                        >\r\n                                    </mat-form-field>\r\n                                </ng-template>\r\n                            </ngx-datatable-column>\r\n                            <ngx-datatable-column [maxWidth]=\"1\">\r\n                                <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\"\r\n                                             let-row=\"row\">\r\n                                </ng-template>\r\n                            </ngx-datatable-column>\r\n                            <ngx-datatable-column name=\"Quantity\">\r\n                                <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\"\r\n                                             let-row=\"row\">\r\n                                    <mat-form-field>\r\n                                        <input matInput disabled [value]=\"value\" style=\"font-weight: 900\">\r\n                                    </mat-form-field>\r\n                                </ng-template>\r\n                            </ngx-datatable-column>\r\n                        </ngx-datatable>\r\n                    </div>\r\n                    <mat-divider></mat-divider>\r\n                </mat-card-content>\r\n                <mat-card-actions class=\"lamis-edit-form-actions\">\r\n                    <button mat-raised-button type=\"button\" (click)=\"previousState()\">Back</button>\r\n                    <button mat-raised-button color='primary'\r\n                            [disabled]=\"pharmacyForm.invalid || rows.length === 0 || isSaving\"\r\n                            type=\"submit\">\r\n                        {{entity.id !== undefined ? 'Update' : 'Save'}}\r\n                    </button>\r\n                </mat-card-actions>\r\n            </mat-card>\r\n        </form>\r\n    </div>\r\n</div>\r\n"
    }),
    __metadata("design:paramtypes", [PharmacyService,
        NotificationService,
        AppLoaderService,
        ActivatedRoute])
], PharmacyEditComponent);

let PharmacyResolve = class PharmacyResolve {
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
PharmacyResolve.ctorParameters = () => [
    {type: PharmacyService}
];
PharmacyResolve = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PharmacyService])
], PharmacyResolve);
const ɵ0 = {
    title: 'Pharmacy Refill',
    breadcrumb: 'PHARMACY REFILL'
}, ɵ1 = {
    authorities: ['ROLE_USER'],
    title: 'Pharmacy Refill',
    breadcrumb: 'PHARMACY REFILL'
}, ɵ2 = {
    authorities: ['ROLE_DEC'],
    title: 'Pharmacy Refill',
    breadcrumb: 'ADD PHARMACY REFILL'
}, ɵ3 = {
    authorities: ['ROLE_DEC'],
    title: 'Pharmacy Refill Edit',
    breadcrumb: 'PHARMACY REFILL EDIT'
};
const ROUTES = [
    {
        path: '',
        data: ɵ0,
        children: [
            {
                path: ':id/patient/:patientId/view',
                component: PharmacyDetailsComponent,
                resolve: {
                    entity: PharmacyResolve
                },
                data: ɵ1,
            },
            {
                path: 'patient/:patientId/new',
                component: PharmacyEditComponent,
                data: ɵ2,
            },
            {
                path: ':id/patient/:patientId/edit',
                component: PharmacyEditComponent,
                resolve: {
                    entity: PharmacyResolve
                },
                data: ɵ3,
            }
        ]
    }
];

let PharmacyWidget = class PharmacyWidget {
    constructor(pharmacyService) {
        this.pharmacyService = pharmacyService;
        this.properties = [];
    }

    ngOnInit() {
        this.pharmacyService.latestVisit(this.patientId).subscribe((res) => {
            this.pharmacy = res;
            this.buildProperties();
        });
    }

    buildProperties() {
        this.properties.push(new CardViewDateItemModel({
            key: 'dv',
            value: this.pharmacy.dateVisit,
            label: 'Last Pharmacy Refill',
            format: 'dd MMM, yyyy'
        }));
        this.properties.push(new CardViewDateItemModel({
            key: 'nv',
            value: this.pharmacy.nextAppointment,
            label: 'Next Pharmacy Refill',
            format: 'dd MMM, yyyy'
        }));
        this.properties.push(new CardViewTextItemModel({
            label: 'MMD Type',
            key: 'fs',
            value: this.pharmacy.mmdType
        }));
        this.pharmacyService.regimenInfo(this.pharmacy.patient.id)
            .subscribe((res) => {
                this.properties.push(new CardViewTextItemModel({
                    label: 'Regimen Line',
                    key: 'cs',
                    value: res.regimenType
                }));
                this.properties.push(new CardViewTextItemModel({
                    label: 'Regimen',
                    key: 'ts',
                    value: res.regimen
                }));
            });
    }
};
PharmacyWidget.ctorParameters = () => [
    {type: PharmacyService}
];
__decorate([
    Input(),
    __metadata("design:type", Number)
], PharmacyWidget.prototype, "patientId", void 0);
PharmacyWidget = __decorate([
    Component({
        selector: 'pharmacy-widget',
        template: "<adf-card-view [properties]=\"properties\"></adf-card-view>\n"
    }),
    __metadata("design:paramtypes", [PharmacyService])
], PharmacyWidget);

/*!
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function modules() {
    return [
        MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule,
        MatChipsModule, MatDatepickerModule, MatDialogModule, MatGridListModule, MatIconModule,
        MatInputModule, MatListModule, MatNativeDateModule, MatOptionModule, MatProgressSpinnerModule, MatRadioModule,
        MatRippleModule, MatSelectModule, MatSlideToggleModule, MatTableModule, MatTabsModule,
        MatMenuModule, MatProgressBarModule, MatSidenavModule, MatSnackBarModule, MatToolbarModule,
        MatTooltipModule, MatDatetimepickerModule, MatNativeDatetimeModule
    ];
}

let MaterialModule = class MaterialModule {
};
MaterialModule = __decorate([
    NgModule({
        imports: modules(),
        exports: modules()
    })
], MaterialModule);

let PharmacyWidgetModule = class PharmacyWidgetModule {
};
PharmacyWidgetModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            MaterialModule,
            CoreModule
        ],
        declarations: [
            PharmacyWidget
        ],
        entryComponents: [
            PharmacyWidget
        ],
        exports: [
            PharmacyWidget
        ],
        providers: []
    })
], PharmacyWidgetModule);

let PharmacyModule = class PharmacyModule {
};
PharmacyModule = __decorate([
    NgModule({
        declarations: [
            PharmacyDetailsComponent,
            PharmacyEditComponent
        ],
        imports: [
            CommonModule,
            MatInputModule,
            MatIconModule,
            MatCardModule,
            MatSelectModule,
            MatButtonModule,
            RouterModule.forChild(ROUTES),
            MatProgressBarModule,
            FormsModule,
            CovalentMessageModule,
            CovalentDialogsModule,
            MatTableModule,
            MatListModule,
            CoreModule,
            PharmacyWidgetModule,
            NgxDatatableModule,
            ReactiveFormsModule,
            MatDateFormatModule,
            CustomFormsModule
        ],
        exports: [
            PharmacyDetailsComponent,
            PharmacyEditComponent
        ],
        entryComponents: [],
        providers: [
            PharmacyResolve
        ]
    })
], PharmacyModule);

const moment$2 = moment_;
let DevolveService = class DevolveService {
    constructor(http, serverUrl) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.resourceUrl = '';
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/devolves';
    }

    create(devolve) {
        const copy = this.convertDateFromClient(devolve);
        return this.http
            .post(this.resourceUrl, copy, {observe: 'response'})
            .pipe(map((res) => this.convertDateFromServer(res)));
    }

    update(devolve) {
        const copy = this.convertDateFromClient(devolve);
        return this.http
            .put(this.resourceUrl, copy, {observe: 'response'})
            .pipe(map((res) => this.convertDateFromServer(res)));
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

    delete(id) {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    getDevolveDatesByPatient(patientId) {
        return this.http.get(`${this.resourceUrl}/patient/${patientId}/visit-dates`)
            .pipe(map((res) => {
                res.forEach(d => moment$2(d));
                return res;
            }));
    }

    getStates() {
        return this.http.get('/api/states');
    }

    getLgasByState(id) {
        return this.http.get(`/api/provinces/state/${id}`);
    }

    getCommunityPharmaciesByLga(id) {
        return this.http.get(`${this.resourceUrl}/community-pharmacies/lga/${id}`);
    }

    getRelatedPharmacy(devolveId, patientId, date) {
        const d = date.format(DATE_FORMAT);
        return this.http.get(`${this.resourceUrl}/${devolveId}/patient/${patientId}/related-pharmacy/at/${d}`)
            .pipe(map(res => {
                if (res.dateVisit) {
                    res.dateVisit = moment$2(res.dateVisit).format('DD MMM, YYYY');
                }
                return res;
            }));
    }

    getRelatedClinic(devolveId, patientId, date) {
        const d = date.format(DATE_FORMAT);
        return this.http.get(`${this.resourceUrl}/${devolveId}/patient/${patientId}/related-clinic/at/${d}`)
            .pipe(map(res => {
                if (res.dateVisit) {
                    res.dateVisit = moment$2(res.dateVisit).format('DD MMM, YYYY');
                }
                return res;
            }));
    }

    getRelatedViralLoad(devolveId, patientId, date) {
        const d = date.format(DATE_FORMAT);
        return this.http.get(`${this.resourceUrl}/${devolveId}/patient/${patientId}/related-viral-load/at/${d}`)
            .pipe(map(res => {
                if (res.dateResultReceived) {
                    res.dateResultReceived = moment$2(res.dateResultReceived).format('DD MMM, YYYY');
                }
                return res;
            }));
    }

    getRelatedCD4(devolveId, patientId, date) {
        const d = date.format(DATE_FORMAT);
        return this.http.get(`${this.resourceUrl}/${devolveId}/patient/${patientId}/related-cd4/at/${d}`)
            .pipe(map(res => {
                if (res.dateResultReceived) {
                    res.dateResultReceived = moment$2(res.dateResultReceived).format('DD MMM, YYYY');
                }
                return res;
            }));
    }

    getStateByLga(id) {
        return this.http.get(`/api/provinces/${id}/state`);
    }

    convertDateFromClient(devolve) {
        const copy = Object.assign({}, devolve, {
            dateDevolved: devolve.dateDevolved != null && devolve.dateDevolved.isValid() ? devolve.dateDevolved.format(DATE_FORMAT) : null,
            dateNextClinic: devolve.dateNextClinic != null && devolve.dateNextClinic.isValid() ? devolve.dateNextClinic.format(DATE_FORMAT) : null,
            dateNextRefill: devolve.dateNextRefill != null && devolve.dateNextRefill.isValid() ? devolve.dateNextRefill.format(DATE_FORMAT) : null,
            dateDiscontinued: devolve.dateDiscontinued != null && devolve.dateDiscontinued.isValid() ? devolve.dateDiscontinued.format(DATE_FORMAT) : null,
            dateReturnedToFacility: devolve.dateReturnedToFacility != null && devolve.dateReturnedToFacility.isValid() ? devolve.dateReturnedToFacility.format(DATE_FORMAT) : null
        });
        return copy;
    }

    convertDateFromServer(res) {
        if (res.body) {
            res.body.dateReturnedToFacility = res.body.dateReturnedToFacility != null ? moment$2(res.body.dateReturnedToFacility) : null;
            res.body.dateNextRefill = res.body.dateNextRefill != null ? moment$2(res.body.dateNextRefill) : null;
            res.body.dateNextClinic = res.body.dateNextClinic != null ? moment$2(res.body.dateNextClinic) : null;
            res.body.dateDevolved = res.body.dateDevolved != null ? moment$2(res.body.dateDevolved) : null;
            res.body.dateDiscontinued = res.body.dateDiscontinued != null ? moment$2(res.body.dateDiscontinued) : null;
        }
        return res;
    }
};
DevolveService.ctorParameters = () => [
    {type: HttpClient},
    {type: undefined, decorators: [{type: Inject, args: [SERVER_API_URL_CONFIG,]}]}
];
DevolveService.ngInjectableDef = ɵɵdefineInjectable({
    factory: function DevolveService_Factory() {
        return new DevolveService(ɵɵinject(HttpClient), ɵɵinject(SERVER_API_URL_CONFIG));
    }, token: DevolveService, providedIn: "root"
});
DevolveService = __decorate([
    Injectable({providedIn: 'root'}),
    __param(1, Inject(SERVER_API_URL_CONFIG)),
    __metadata("design:paramtypes", [HttpClient, Object])
], DevolveService);

let DevolveDetailsComponent = class DevolveDetailsComponent {
    constructor(router, route, devolveService, _dialogService, notificationService) {
        this.router = router;
        this.route = route;
        this.devolveService = devolveService;
        this._dialogService = _dialogService;
        this.notificationService = notificationService;
        this.properties = [];
    }

    ngOnInit() {
        this.route.data.subscribe(({entity}) => {
            this.entity = !!entity && entity.body ? entity.body : entity;
            this.buildProperties();
        });
    }

    edit() {
        this.router.navigate(['/', 'devolves', this.entity.uuid, 'patient', this.entity.patient.uuid, 'edit']);
    }

    delete() {
        this._dialogService.openConfirm({
            title: 'Confirm',
            message: 'Do you want to delete this client devolve, action cannot be reversed?',
            cancelButton: 'No',
            acceptButton: 'Yes',
            width: '500px',
        }).afterClosed().subscribe((accept) => {
            if (accept) {
                this.devolveService.delete(this.entity.id).subscribe((res) => {
                    if (res.ok) {
                        this.router.navigate(['patients']);
                    } else {
                        this.notificationService.showError('Error deleting devolve, please try again');
                    }
                });
            } else {
                // DO SOMETHING ELSE
            }
        });
    }

    buildProperties() {
        this.properties.push(new CardViewDateItemModel({
            key: 'ds',
            value: this.entity.dateDevolved,
            label: 'Date of Devolvement',
            format: 'dd MMM, yyyy'
        }));
        let type = 'MMD';
        switch (this.entity.dmocType) {
            case 'ARC':
                type = 'Adolescent Refill Club';
                break;
            case 'CPARP':
                type = 'CPARP';
                break;
            case 'CARC':
                type = 'CARC';
                break;
            case 'F_CARG':
                type = 'F-CARG';
                break;
            case 'FAST_TRACK':
                type = 'Fast Track';
                break;
            case 'S_CARG':
                type = 's-CARG';
                break;
            case 'MMS':
                type = 'MMS';
                break;
        }
        this.properties.push(new CardViewTextItemModel({
            key: 'ds',
            value: type,
            label: 'Type of DMOC'
        }));
        this.devolveService.getRelatedClinic(this.entity.id, this.entity.patient.id, this.entity.dateDevolved).subscribe(res => {
            this.relatedClinic = res;
            console.log('Related clinic', res);
            if (this.relatedClinic.dateVisit) {
                this.properties.push(new CardViewTextItemModel({
                    key: 'ds',
                    value: this.relatedClinic.dateVisit,
                    label: 'Date of Clinical Stage'
                }));
                this.properties.push(new CardViewTextItemModel({
                    key: 'ds',
                    value: this.relatedClinic && this.relatedClinic.clinicStage,
                    label: 'Current Clinical Stage',
                }));
            }
        });
        this.devolveService.getRelatedPharmacy(this.entity.id, this.entity.patient.id, this.entity.dateDevolved).subscribe(res => {
            this.relatedPharmacy = res;
            if (this.relatedPharmacy.dateVisit) {
                this.properties.push(new CardViewTextItemModel({
                    key: 'ds',
                    value: this.relatedPharmacy.dateVisit,
                    label: 'Date of Current ARV Regimen'
                }));
                this.properties.push(new CardViewTextItemModel({
                    key: 'ds',
                    value: this.relatedPharmacy && this.relatedPharmacy.regimen,
                    label: 'Current ARV Regimen',
                }));
            }
        });
        this.devolveService.getRelatedViralLoad(this.entity.id, this.entity.patient.id, this.entity.dateDevolved).subscribe(res => {
            this.relatedViralLoad = res;
            if (this.relatedViralLoad.dateResultReceived) {
                this.properties.push(new CardViewTextItemModel({
                    key: 'ds',
                    value: this.relatedViralLoad.dateResultReceived,
                    label: 'Date of Viral Load'
                }));
                this.properties.push(new CardViewTextItemModel({
                    key: 'ds',
                    value: this.relatedViralLoad && this.relatedViralLoad.value,
                    label: 'Current Viral Load',
                }));
            }
        });
        this.devolveService.getRelatedCD4(this.entity.id, this.entity.patient.id, this.entity.dateDevolved).subscribe(res => {
            this.relatedCD4 = res;
            if (this.relatedCD4.dateResultReceived) {
                this.properties.push(new CardViewTextItemModel({
                    key: 'ds',
                    value: this.relatedCD4.dateResultReceived,
                    label: 'Date of CD4'
                }));
                this.properties.push(new CardViewTextItemModel({
                    key: 'ds',
                    value: this.relatedCD4 && this.relatedCD4.value,
                    label: 'Current Viral Load',
                }));
            }
        });
        this.properties.push(new CardViewDateItemModel({
            key: 'ds',
            value: this.entity.dateNextClinic,
            label: 'Date of next Clinic/Lab',
            format: 'dd MMM, yyyy'
        }));
        this.properties.push(new CardViewDateItemModel({
            key: 'ds',
            value: this.entity.dateNextRefill,
            label: 'Date of Viral Load',
            format: 'dd MMM, yyyy'
        }));
        if (this.entity.communityPharmacy) {
            this.properties.push(new CardViewTextItemModel({
                key: 'ds',
                value: this.entity.communityPharmacy.name,
                label: 'Community Pharmacy'
            }));
        }
        if (this.entity.dateDiscontinued) {
            this.properties.push(new CardViewDateItemModel({
                key: 'ds',
                value: this.entity.dateDiscontinued,
                label: 'Date of Discontinuation',
                format: 'dd MMM, yyyy'
            }));
            this.properties.push(new CardViewTextItemModel({
                key: 'ds',
                value: this.entity.reasonDiscontinued,
                label: 'Reason of Discontinuation'
            }));
            if (this.entity.dateReturnedToFacility) {
                this.properties.push(new CardViewDateItemModel({
                    key: 'ds',
                    value: this.entity.dateReturnedToFacility,
                    label: 'Date Returned to Facility',
                    format: 'dd MMM, yyyy'
                }));
            }
        }
    }

    previousState() {
        window.history.back();
    }
};
DevolveDetailsComponent.ctorParameters = () => [
    {type: Router},
    {type: ActivatedRoute},
    {type: DevolveService},
    {type: TdDialogService},
    {type: NotificationService}
];
DevolveDetailsComponent = __decorate([
    Component({
        selector: 'devolve-details',
        template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <mat-card>\n            <mat-card-header>\n            </mat-card-header>\n            <mat-card-content>\n                <adf-card-view [properties]=\"properties\" editable=\"false\"></adf-card-view>\n                <mat-divider></mat-divider>\n            </mat-card-content>\n            <mat-card-actions class=\"lamis-edit-form-actions\">\n                <button mat-button (click)=\"previousState()\">Back</button>\n                <button mat-raised-button color=\"warn\" (click)=\"delete()\">Delete</button>\n                <button mat-raised-button color=\"primary\" (click)=\"edit()\">Edit</button>\n            </mat-card-actions>\n        </mat-card>\n    </div>\n</div>\n"
    }),
    __metadata("design:paramtypes", [Router, ActivatedRoute, DevolveService,
        TdDialogService,
        NotificationService])
], DevolveDetailsComponent);

const moment$3 = moment_;
let DevolveEditComponent = class DevolveEditComponent {
    constructor(pharmacyService, devolveService, notification, appLoaderService, activatedRoute) {
        this.pharmacyService = pharmacyService;
        this.devolveService = devolveService;
        this.notification = notification;
        this.appLoaderService = appLoaderService;
        this.activatedRoute = activatedRoute;
        this.entity = {};
        this.states = [];
        this.dmocTypes = [];
        this.error = false;
        this.tomorrow = moment$3().add(1, 'days');
        this.today = moment$3();
        this.editing = {};
        this.devolveDates = [];
        this.enableCommunityPharmacy = false;
        this.properties = [];
    }

    createEntity() {
        return {};
    }

    ngOnInit() {
        this.dmocTypes.push({
            name: 'Adolescent Refill Club',
            value: 'ARC'
        });
        this.dmocTypes.push({
            name: 'CARC',
            value: 'CARC'
        });
        this.dmocTypes.push({
            name: 'CPARP',
            value: 'CPARP'
        });
        this.dmocTypes.push({
            name: 'F-CARG',
            value: 'F_CARG'
        });
        this.dmocTypes.push({
            name: 'Fast Track',
            value: 'FAST_TRACK'
        });
        this.dmocTypes.push({
            name: 'S-CARG',
            value: 'S_CARG'
        });
        this.activatedRoute.data.subscribe(({entity}) => {
            this.entity = !!entity && entity.body ? entity.body : entity;
            if (this.entity === undefined) {
                this.entity = this.createEntity();
            }
            const patientId = this.activatedRoute.snapshot.paramMap.get('patientId');
            this.pharmacyService.getPatient(patientId).subscribe((res) => {
                this.entity.patient = res;
                this.patient = res;
                this.dateRegistration = res.dateRegistration;
                this.entity.facility = res.facility;
                this.minNextAppointment = this.dateRegistration.add(15, 'days');
                /*this.devolveService.getDevolveDatesByPatient(res.id).subscribe((res) => {
                    this.devolveDates = res;
                });*/
                this.updateRelated();
            });
            if (this.entity.id) {
                const dmoc = this.entity.dmocType;
                if (dmoc === 'MMD') {
                    this.dmocTypes.push({
                        name: 'MMD',
                        value: 'MMD'
                    });
                } else if (dmoc === 'MMS') {
                    this.dmocTypes.push({
                        name: 'MMS',
                        value: 'MMS'
                    });
                }
                if (this.entity.communityPharmacy) {
                    this.enableCommunityPharmacy = true;
                    this.devolveService.getStateByLga(this.entity.communityPharmacy.lga.id).subscribe(res => {
                        this.state = res;
                        this.lga = this.entity.communityPharmacy.lga;
                        this.lgaChanged(this.lga.id);
                        this.stateChanged(this.state.id);
                    });
                }
                if (this.entity.dateDiscontinued) {
                    this.minDate = this.entity.dateDiscontinued.clone().add(2, 'day');
                } else {
                    this.minDiscontinued = this.entity.dateDevolved.clone().add(1, 'day');
                    this.minDate = this.entity.dateDevolved.clone().add(2, 'day');
                }
            }
            this.devolveService.getStates().subscribe(res => this.states = res);
        });
    }

    dateDiscontinuedChanged() {
        if (this.entity.dateDiscontinued) {
            this.minDate = this.entity.dateDiscontinued.clone().add(1, 'day');
        }
    }

    filterDates(date) {
        let exists = false;
        this.devolveDates.forEach(d => {
            if (date.diff(d, 'days') === 0) {
                exists = true;
            }
        });
        return (this.entity.id && date.diff(this.entity.dateDevolved, 'days') === 0) || !exists;
    }

    stateChanged(id) {
        this.devolveService.getLgasByState(id).subscribe(res => this.lgas = res);
    }

    lgaChanged(id) {
        this.devolveService.getCommunityPharmaciesByLga(id).subscribe(res => this.communityPharmacies = res);
    }

    communityPharmacyChanged(communityPharmacy) {
        this.properties = [];
        this.properties.push(new CardViewTextItemModel({
            key: 'add',
            label: 'Address',
            value: communityPharmacy.address
        }));
        this.properties.push(new CardViewTextItemModel({
            key: 'phone',
            label: 'Telephone Number',
            value: communityPharmacy.phone
        }));
        this.properties.push(new CardViewTextItemModel({
            key: 'email',
            label: 'Email',
            value: communityPharmacy.email
        }));
    }

    dmocChanged(dmocType) {
        this.enableCommunityPharmacy = dmocType === 'CPARP';
    }

    dateDevolvedChanged(date) {
        this.minNextAppointment = date.clone().add(7, 'days');
        this.maxNextVisit = date.clone().add(3, 'months');
        console.log('Dates', this.minNextAppointment, this.maxNextVisit);
        this.updateRelated();
    }

    updateRelated() {
        this.entity.relatedViralLoad = null;
        this.entity.relatedClinic = null;
        this.entity.relatedCd4 = null;
        this.entity.relatedPharmacy = null;
        if (this.entity.dateDevolved) {
            this.devolveService.getRelatedClinic(this.entity.id || 0, this.patient.id, this.entity.dateDevolved).subscribe(res => {
                this.relatedClinic = res;
                this.entity.relatedClinic = {id: res.id};
            });
            this.devolveService.getRelatedPharmacy(this.entity.id || 0, this.patient.id, this.entity.dateDevolved).subscribe(res => {
                this.relatedPharmacy = res;
                this.entity.relatedPharmacy = {id: res.id};
            });
            this.devolveService.getRelatedCD4(this.entity.id || 0, this.patient.id, this.entity.dateDevolved).subscribe(res => {
                this.relatedCD4 = res;
                this.entity.relatedCd4 = {id: res.id};
            });
            this.devolveService.getRelatedViralLoad(this.entity.id || 0, this.patient.id, this.entity.dateDevolved).subscribe(res => {
                this.relatedViralLoad = res;
                this.entity.relatedViralLoad = {id: res.id};
            });
        }
    }

    entityCompare(e1, e2) {
        return entityCompare(e1, e2);
    }

    previousState() {
        window.history.back();
    }

    save() {
        //this.progressBar.mode = 'indeterminate';
        this.appLoaderService.open('Saving visit...');
        this.isSaving = true;
        if (this.entity.id !== undefined) {
            this.subscribeToSaveResponse(this.devolveService.update(this.entity));
        } else {
            this.subscribeToSaveResponse(this.devolveService.create(this.entity));
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
        this.notification.showInfo('Devolve successfully saved');
        this.previousState();
    }

    onSaveError() {
        this.isSaving = false;
        this.error = true;
        this.notification.showError('Error saving devolve');
    }

    onError(errorMessage) {
        this.isSaving = false;
        this.notification.showError(errorMessage);
    }
};
DevolveEditComponent.ctorParameters = () => [
    {type: PharmacyService},
    {type: DevolveService},
    {type: NotificationService},
    {type: AppLoaderService},
    {type: ActivatedRoute}
];
DevolveEditComponent = __decorate([
    Component({
        selector: 'devolve-edit',
        template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <form name=\"form\" role=\"form\" novalidate (ngSubmit)=\"save()\" #devolveForm=\"ngForm\">\n            <mat-card class=\"default\">\n                <mat-card-header>\n                </mat-card-header>\n                <mat-card-content *ngIf=\"patient\">\n                    <div>\n                        <mat-form-field class=\"full-width\" *ngIf=\"entity && dateRegistration\">\n                            <input matInput [matDatepicker]=\"picker\"\n                                   placeholder=\"Date of Devolvement\"\n                                   [(ngModel)]=\"entity.dateDevolved\"\n                                   (dateChange)=\"dateDevolvedChanged($event.value)\"\n                                   #visit=\"ngModel\"\n                                   [max]=\"today\"\n                                   [min]=\"dateRegistration\"\n                                   [disabled]=\"!!entity.dateDiscontinued\"\n                                   name=\"visit\"\n                                   required>\n                            <mat-datepicker-toggle\n                                    matSuffix\n                                    [for]=\"picker\">\n                            </mat-datepicker-toggle>\n                            <mat-datepicker #picker></mat-datepicker>\n                            <mat-error\n                                    *ngIf=\"visit.errors && (visit.dirty || visit.touched) && (visit.errors.required)\">\n                                Date of devolve is required\n                            </mat-error>\n                            <mat-error\n                                    *ngIf=\"visit.errors && (visit.dirty || visit.touched) && (visit.errors.min)\">\n                                Date of devolve cannot be before {{dateRegistration | date: 'dd MMM, yyyy'}}\n                            </mat-error>\n                            <mat-error\n                                    *ngIf=\"visit.errors && (visit.dirty || visit.touched) && (visit.errors.max)\">\n                                Date of devolve cannot be in the future\n                            </mat-error>\n                        </mat-form-field>\n                    </div>\n                    <div>\n                        <mat-form-field class=\"full-width\">\n                            <mat-select [(ngModel)]=\"entity.dmocType\"\n                                        placeholder=\"Type of DMOC\"\n                                        (selectionChange)=\"dmocChanged($event.value)\"\n                                        #dmoc=\"ngModel\" required name=\"dmoc\">\n                                <mat-option></mat-option>\n                                <mat-option *ngFor=\"let type of dmocTypes\"\n                                            [value]=\"type.value\">{{type.name}}</mat-option>\n                            </mat-select>\n                            <mat-error\n                                    *ngIf=\"dmoc.errors && (dmoc.dirty || dmoc.touched) && (dmoc.errors.required)\">\n                                Type of DMOC is required\n                            </mat-error>\n                        </mat-form-field>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>ARV Regimen</mat-label>\n                                <input matInput disabled [value]=\"relatedPharmacy && relatedPharmacy.regimen || ''\">\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Date of Current ARV Regimen</mat-label>\n                                <input matInput disabled\n                                       value=\"{{relatedPharmacy && relatedPharmacy.dateVisit || ''}} \">\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Current Viral Load</mat-label>\n                                <input matInput disabled [value]=\"relatedViralLoad && relatedViralLoad.value || ''\">\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Date of Viral Load</mat-label>\n                                <input matInput disabled\n                                       value=\"{{relatedViralLoad && relatedViralLoad.dateResultReceived || ''}} \">\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Current CD4</mat-label>\n                                <input matInput disabled [value]=\"relatedCD4 && relatedCD4.value || ''\">\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Date of CD4</mat-label>\n                                <input matInput disabled\n                                       value=\"{{relatedCD4 && relatedCD4.dateResultReceived || ''}} \">\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Current Clinical Stage</mat-label>\n                                <input matInput disabled [value]=\"relatedClinic && relatedClinic.clinicStage || ''\">\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Date of Clinical Stage</mat-label>\n                                <input matInput disabled\n                                       value=\"{{relatedClinic && relatedClinic.dateVisit | date: 'dd MMM, yyyy' || null}} \">\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <ng-container *ngIf=\"minNextAppointment\">\n                        <div class=\"row\">\n                            <div class=\"col-md-6\">\n                                <mat-form-field class=\"full-width\">\n                                    <input matInput [matDatepicker]=\"picker2\"\n                                           placeholder=\"Date of next ARV Refill\"\n                                           [(ngModel)]=\"entity.dateNextRefill\"\n                                           #visit2=\"ngModel\"\n                                           [min]=\"minNextAppointment\"\n                                           [max]=\"maxNextVisit\"\n                                           name=\"visit2\">\n                                    <mat-datepicker-toggle\n                                            matSuffix\n                                            [for]=\"picker2\">\n                                    </mat-datepicker-toggle>\n                                    <mat-datepicker #picker2></mat-datepicker>\n                                    <mat-error\n                                            *ngIf=\"visit2.errors && (visit2.dirty || visit2.touched) && (visit2.errors.required)\">\n                                        Date of next ARV Refill is required\n                                    </mat-error>\n                                    <mat-error\n                                            *ngIf=\"visit2.errors && (visit2.dirty || visit2.touched) && (visit2.errors.min)\">\n                                        Date of next ARV Refill cannot be\n                                        before {{minNextAppointment | date: 'dd MMM, yyyy'}}\n                                    </mat-error>\n                                    <mat-error\n                                            *ngIf=\"visit2.errors && (visit2.dirty || visit2.touched) && (visit2.errors.max)\">\n                                        Date of next ARV Refill cannot be after {{maxNextVisit | date: 'dd NNN, yyyy'}}\n                                    </mat-error>\n                                </mat-form-field>\n                            </div>\n                            <div class=\"col-md-6\">\n                                <mat-form-field class=\"full-width\">\n                                    <input matInput [matDatepicker]=\"picker3\"\n                                           placeholder=\"Date of next Clinic/Lab\"\n                                           [(ngModel)]=\"entity.dateNextClinic\"\n                                           #visit3=\"ngModel\"\n                                           [min]=\"minNextAppointment\"\n                                           [max]=\"maxNextVisit\"\n                                           name=\"visit3\">\n                                    <mat-datepicker-toggle\n                                            matSuffix\n                                            [for]=\"picker3\">\n                                    </mat-datepicker-toggle>\n                                    <mat-datepicker #picker3></mat-datepicker>\n                                    <mat-error\n                                            *ngIf=\"visit3.errors && (visit3.dirty || visit3.touched) && (visit3.errors.required)\">\n                                        Date of next Clinic/Lab is required\n                                    </mat-error>\n                                    <mat-error\n                                            *ngIf=\"visit3.errors && (visit3.dirty || visit3.touched) && (visit3.errors.min)\">\n                                        Date of next Clinic/Lab cannot be\n                                        before {{minNextAppointment | date: 'dd MMM, yyyy'}}\n                                    </mat-error>\n                                    <mat-error\n                                            *ngIf=\"visit3.errors && (visit3.dirty || visit3.touched) && (visit3.errors.max)\">\n                                        Date of next Clinic/Lab cannot be after {{maxNextVisit | date: 'dd NNN, yyyy'}}\n                                    </mat-error>\n                                </mat-form-field>\n                            </div>\n                        </div>\n                    </ng-container>\n                    <ng-container *ngIf=\"enableCommunityPharmacy\">\n                        <div class=\"row\">\n                            <div class=\"col-md-6\">\n                                <mat-form-field class=\"full-width\">\n                                    <mat-label>State of Residence</mat-label>\n                                    <mat-select name=\"state\"\n                                                [(ngModel)]=\"state\"\n                                                (selectionChange)=\"stateChanged($event.value.id)\">\n                                        <mat-option></mat-option>\n                                        <mat-option *ngFor=\"let state of states\"\n                                                    [value]=\"state\">{{state.name}}</mat-option>\n                                    </mat-select>\n                                </mat-form-field>\n                            </div>\n                            <div class=\"col-md-6\">\n                                <mat-form-field class=\"full-width\">\n                                    <mat-label>LGA of Residence</mat-label>\n                                    <mat-select name=\"lga\" [(ngModel)]=\"lga\"\n                                                (selectionChange)=\"lgaChanged($event.value.id)\">\n                                        <mat-option></mat-option>\n                                        <mat-option *ngFor=\"let lga of lgas\" [value]=\"lga\">{{lga.name}}</mat-option>\n                                    </mat-select>\n                                </mat-form-field>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-md-6\">\n                                <mat-form-field class=\"full-width\">\n                                    <mat-label>Community Pharmacy</mat-label>\n                                    <mat-select name=\"pharm\" [(ngModel)]=\"entity.communityPharmacy\" required\n                                                #pharm=\"ngModel\"\n                                                (selectionChange)=\"communityPharmacyChanged($event.value)\"\n                                                [compareWith]=\"entityCompare\">\n                                        <mat-option></mat-option>\n                                        <mat-option *ngFor=\"let pharmacy of communityPharmacies\"\n                                                    [value]=\"pharmacy\">{{pharmacy.name}}</mat-option>\n                                    </mat-select>\n                                    <mat-error\n                                            *ngIf=\"pharm.errors && (pharm.dirty || pharm.touched) && (pharm.errors.required)\">\n                                        Community Pharmacy is required\n                                    </mat-error>\n                                </mat-form-field>\n                            </div>\n                            <div class=\"col-md-6\">\n                                <adf-card-view [properties]=\"properties\" [editable]=\"false\"></adf-card-view>\n                            </div>\n                        </div>\n                    </ng-container>\n                    <ng-container *ngIf=\"entity.dateDiscontinued\">\n                        <div class=\"row\">\n                            <div class=\"col-md-6\">\n                                <mat-form-field class=\"full-width\">\n                                    <mat-label>Date Discontinued</mat-label>\n                                    <input matInput [matDatepicker]=\"picker5\"\n                                           [(ngModel)]=\"entity.dateDiscontinued\"\n                                           #disc=\"ngModel\"\n                                           (dateChange)=\"dateDiscontinuedChanged()\"\n                                           [min]=\"minDiscontinued\"\n                                           [max]=\"today\"\n                                           name=\"disc\"\n                                           required>\n                                    <mat-datepicker-toggle\n                                            matSuffix\n                                            [for]=\"picker5\">\n                                    </mat-datepicker-toggle>\n                                    <mat-datepicker #picker5></mat-datepicker>\n                                    <mat-error\n                                            *ngIf=\"disc.errors && (disc.dirty || disc.touched) && (disc.errors.required)\">\n                                        Date Discontinued is required\n                                    </mat-error>\n                                    <mat-error\n                                            *ngIf=\"disc.errors && (disc.dirty || disc.touched) && (disc.errors.min)\">\n                                        Date Discontinued cannot be before {{minDiscontinued | date: 'dd MMM, yyyy'}}\n                                    </mat-error>\n                                    <mat-error\n                                            *ngIf=\"disc.errors && (disc.dirty || disc.touched) && (disc.errors.max)\">\n                                        Date Discontinued cannot be after {{today | date: 'dd MMM, yyyy'}}\n                                    </mat-error>\n                                </mat-form-field>\n                            </div>\n                            <div class=\"col-md-6\">\n                                <mat-form-field class=\"full-width\">\n                                    <mat-label>Reason Discontinued</mat-label>\n                                    <mat-select name=\"reason\" #reason=\"ngModel\" [(ngModel)]=\"entity.reasonDiscontinued\"\n                                                required>\n                                        <mat-option></mat-option>\n                                        <mat-option [value]=\"'Becomes pregnant'\">Becomes pregnant</mat-option>\n                                        <mat-option [value]=\"'Unable to pay service charge'\">Unable to pay service\n                                            charge\n                                        </mat-option>\n                                        <mat-option [value]=\"'Develops comorbidity'\">Develops comorbidity</mat-option>\n                                        <mat-option [value]=\"'Loss of viral suppression'\">Loss of viral suppression\n                                        </mat-option>\n                                        <mat-option [value]=\"'Decides to go back to hospital'\">Decides to go back to\n                                            hospital\n                                        </mat-option>\n                                        <mat-option [value]=\"'Becomes non-adherent'\">Becomes non-adherent</mat-option>\n                                    </mat-select>\n                                    <mat-error\n                                            *ngIf=\"reason.errors && (reason.dirty || reason.touched) && (reason.errors.required)\">\n                                        Reason for Discontinuation is required\n                                    </mat-error>\n                                </mat-form-field>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-md-6\">\n                                <mat-form-field class=\"full-width\" *ngIf=\"minDate\">\n                                    <input matInput [matDatepicker]=\"picker6\"\n                                           placeholder=\"Date Returned to Facility\"\n                                           [(ngModel)]=\"entity.dateReturnedToFacility\"\n                                           #visit1=\"ngModel\"\n                                           [min]=\"minDate\"\n                                           [max]=\"today\"\n                                           name=\"visit1\"\n                                           required>\n                                    <mat-datepicker-toggle\n                                            matSuffix\n                                            [for]=\"picker6\">\n                                    </mat-datepicker-toggle>\n                                    <mat-datepicker #picker6></mat-datepicker>\n                                    <mat-error\n                                            *ngIf=\"visit1.errors && (visit1.dirty || visit1.touched) && (visit1.errors.required)\">\n                                        Date returned to Facility is required\n                                    </mat-error>\n                                    <mat-error\n                                            *ngIf=\"visit1.errors && (visit1.dirty || visit1.touched) && (visit1.errors.min)\">\n                                        Date returned to Facility cannot be before {{minDate | date: 'dd MMM, yyyy'}}\n                                    </mat-error>\n                                    <mat-error\n                                            *ngIf=\"visit1.errors && (visit1.dirty || visit1.touched) && (visit1.errors.max)\">\n                                        Date returned to Facility cannot be after {{today | date: 'dd MMM, yyyy'}}\n                                    </mat-error>\n                                </mat-form-field>\n                            </div>\n                        </div>\n                    </ng-container>\n                    <mat-divider></mat-divider>\n                </mat-card-content>\n                <mat-card-actions class=\"lamis-edit-form-actions\">\n                    <button mat-raised-button type=\"button\" (click)=\"previousState()\">Back</button>\n                    <button mat-raised-button color='primary'\n                            [disabled]=\"devolveForm.invalid || isSaving\"\n                            type=\"submit\">\n                        {{entity.id !== undefined ? 'Update' : 'Save'}}\n                    </button>\n                </mat-card-actions>\n            </mat-card>\n        </form>\n    </div>\n</div>\n"
    }),
    __metadata("design:paramtypes", [PharmacyService,
        DevolveService,
        NotificationService,
        AppLoaderService,
        ActivatedRoute])
], DevolveEditComponent);

const moment$4 = moment_;
let EndDevolveComponent = class EndDevolveComponent {
    constructor(pharmacyService, devolveService, notification, appLoaderService, activatedRoute) {
        this.pharmacyService = pharmacyService;
        this.devolveService = devolveService;
        this.notification = notification;
        this.appLoaderService = appLoaderService;
        this.activatedRoute = activatedRoute;
        this.entity = {};
        this.dmocType = '';
        this.isSaving = false;
        this.today = moment$4();
    }

    ngOnInit() {
        const patientId = this.activatedRoute.snapshot.paramMap.get('patientId');
        this.pharmacyService.getPatient(patientId).subscribe((res) => {
            this.pharmacyService.getDevolvement(res.id, moment$4()).subscribe(r => {
                this.entity = r;
                if (this.entity.dateDiscontinued) {
                    this.minDate = r.dateDiscontinued.clone().add(2, 'day');
                } else {
                    this.minDiscontinued = r.dateDevolved.clone().add(1, 'day');
                    this.minDate = r.dateDevolved.clone().add(2, 'day');
                }
                let type = 'MMD';
                switch (r.dmocType) {
                    case 'ARC':
                        type = 'Adolescent Refill Club';
                        break;
                    case 'CPARP':
                        type = 'CPARP';
                        break;
                    case 'CARC':
                        type = 'CARC';
                        break;
                    case 'F_CARG':
                        type = 'F-CARG';
                        break;
                    case 'FAST_TRACK':
                        type = 'Fast Track';
                        break;
                    case 'S_CARG':
                        type = 'S-CARG';
                        break;
                    case 'MMS':
                        type = 'MMS';
                        break;
                }
                this.dmocType = type;
            });
        });
        this.activatedRoute.data.subscribe(({entity}) => {
            this.entity = !!entity && entity.body ? entity.body : entity;
        });
    }

    dateDiscontinuedChanged() {
        if (this.entity.dateDiscontinued) {
            this.minDate = this.entity.dateDiscontinued.clone().add(1, 'day');
        }
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.appLoaderService.open('Saving visit...');
        this.isSaving = true;
        if (this.entity.id !== undefined) {
            this.subscribeToSaveResponse(this.devolveService.update(this.entity));
        } else {
            this.subscribeToSaveResponse(this.devolveService.create(this.entity));
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
        this.notification.showInfo('Devolve successfully saved');
        this.previousState();
    }

    onSaveError() {
        this.isSaving = false;
        this.notification.showError('Error saving devolve');
    }

    onError(errorMessage) {
        this.isSaving = false;
        this.notification.showError(errorMessage);
    }
};
EndDevolveComponent.ctorParameters = () => [
    {type: PharmacyService},
    {type: DevolveService},
    {type: NotificationService},
    {type: AppLoaderService},
    {type: ActivatedRoute}
];
EndDevolveComponent = __decorate([
    Component({
        selector: 'end-devolve',
        template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <form name=\"form\" role=\"form\" novalidate (ngSubmit)=\"save()\" #devolveForm=\"ngForm\">\n            <mat-card class=\"default\">\n                <mat-card-header>\n                </mat-card-header>\n                <mat-card-content *ngIf=\"entity\">\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Date of Devolvement</mat-label>\n                                <input matInput disabled value=\"{{entity.dateDevolved | date: 'dd MMM, yyyy'}}\">\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>DMOC Type</mat-label>\n                                <input matInput disabled [value]=\"dmocType\">\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Date Discontinued</mat-label>\n                                <input matInput [matDatepicker]=\"picker1\"\n                                       [(ngModel)]=\"entity.dateDiscontinued\"\n                                       #disc=\"ngModel\"\n                                       (dateChange)=\"dateDiscontinuedChanged()\"\n                                       [min]=\"minDiscontinued\"\n                                       [max]=\"today\"\n                                       name=\"disc\"\n                                       required>\n                                <mat-datepicker-toggle\n                                        matSuffix\n                                        [for]=\"picker1\">\n                                </mat-datepicker-toggle>\n                                <mat-datepicker #picker1></mat-datepicker>\n                                <mat-error\n                                        *ngIf=\"disc.errors && (disc.dirty || disc.touched) && (disc.errors.required)\">\n                                    Date Discontinued is required\n                                </mat-error>\n                                <mat-error\n                                        *ngIf=\"disc.errors && (disc.dirty || disc.touched) && (disc.errors.min)\">\n                                    Date Discontinued cannot be before {{minDiscontinued | date: 'dd MMM, yyyy'}}\n                                </mat-error>\n                                <mat-error\n                                        *ngIf=\"disc.errors && (disc.dirty || disc.touched) && (disc.errors.max)\">\n                                    Date Discontinued cannot be after {{today | date: 'dd MMM, yyyy'}}\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Reason Discontinued</mat-label>\n                                <mat-select name=\"reason\" #reason=\"ngModel\" [(ngModel)]=\"entity.reasonDiscontinued\" required>\n                                    <mat-option></mat-option>\n                                    <mat-option [value]=\"'Becomes pregnant'\">Becomes pregnant</mat-option>\n                                    <mat-option [value]=\"'Unable to pay service charge'\">Unable to pay service charge</mat-option>\n                                    <mat-option [value]=\"'Develops comorbidity'\">Develops comorbidity</mat-option>\n                                    <mat-option [value]=\"'Loss of viral suppression'\">Loss of viral suppression</mat-option>\n                                    <mat-option [value]=\"'Decides to go back to hospital'\">Decides to go back to hospital</mat-option>\n                                    <mat-option [value]=\"'Becomes non-adherent'\">Becomes non-adherent</mat-option>\n                                </mat-select>\n                                <mat-error\n                                        *ngIf=\"reason.errors && (reason.dirty || reason.touched) && (reason.errors.required)\">\n                                    Reason for Discontinuation is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\" *ngIf=\"minDate\">\n                                <input matInput [matDatepicker]=\"picker\"\n                                       placeholder=\"Date Returned to Facility\"\n                                       [(ngModel)]=\"entity.dateReturnedToFacility\"\n                                       #visit=\"ngModel\"\n                                       [min]=\"minDate\"\n                                       [max]=\"today\"\n                                       name=\"visit\"\n                                       required>\n                                <mat-datepicker-toggle\n                                        matSuffix\n                                        [for]=\"picker\">\n                                </mat-datepicker-toggle>\n                                <mat-datepicker #picker></mat-datepicker>\n                                <mat-error\n                                        *ngIf=\"visit.errors && (visit.dirty || visit.touched) && (visit.errors.required)\">\n                                    Date returned to Facility is required\n                                </mat-error>\n                                <mat-error\n                                        *ngIf=\"visit.errors && (visit.dirty || visit.touched) && (visit.errors.min)\">\n                                    Date returned to Facility cannot be before {{minDate | date: 'dd MMM, yyyy'}}\n                                </mat-error>\n                                <mat-error\n                                        *ngIf=\"visit.errors && (visit.dirty || visit.touched) && (visit.errors.max)\">\n                                    Date returned to Facility cannot be after {{today | date: 'dd MMM, yyyy'}}\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                </mat-card-content>\n                <mat-card-actions class=\"lamis-edit-form-actions\">\n                    <button mat-raised-button type=\"button\" (click)=\"previousState()\">Back</button>\n                    <button mat-raised-button color='primary'\n                            [disabled]=\"devolveForm.invalid || isSaving || !entity.dateDiscontinued\"\n                            type=\"submit\">\n                        Update\n                    </button>\n                </mat-card-actions>\n            </mat-card>\n        </form>\n    </div>\n</div>\n"
    }),
    __metadata("design:paramtypes", [PharmacyService,
        DevolveService,
        NotificationService,
        AppLoaderService,
        ActivatedRoute])
], EndDevolveComponent);

let DevolveResolve = class DevolveResolve {
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
DevolveResolve.ctorParameters = () => [
    {type: DevolveService}
];
DevolveResolve = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [DevolveService])
], DevolveResolve);
const ɵ0$1 = {
    title: 'Client Devolvement',
    breadcrumb: 'CLIENT DEVOLVEMENT'
}, ɵ1$1 = {
    authorities: ['ROLE_USER'],
    title: 'Client Devolve',
    breadcrumb: 'CLIENT DEVOLVE'
}, ɵ2$1 = {
    authorities: ['ROLE_DEC'],
    title: 'Client Devolve',
    breadcrumb: 'DEVOLVE CLIENT'
}, ɵ3$1 = {
    authorities: ['ROLE_DEC'],
    title: 'Devolve Edit',
    breadcrumb: 'DEVOLVE EDIT'
}, ɵ4 = {
    authorities: ['ROLE_DEC'],
    title: 'End Devolve',
    breadcrumb: 'END CLIENT DEVOLVE'
};
const ROUTES$1 = [
    {
        path: '',
        data: ɵ0$1,
        children: [
            {
                path: ':id/patient/:patientId/view',
                component: DevolveDetailsComponent,
                resolve: {
                    entity: DevolveResolve
                },
                data: ɵ1$1,
            },
            {
                path: 'patient/:patientId/new',
                component: DevolveEditComponent,
                data: ɵ2$1,
            },
            {
                path: ':id/patient/:patientId/edit',
                component: DevolveEditComponent,
                resolve: {
                    entity: DevolveResolve
                },
                data: ɵ3$1,
            },
            {
                path: 'return/patient/:patientId/new',
                component: EndDevolveComponent,
                data: ɵ4,
            }
        ]
    }
];

let DevolveModule = class DevolveModule {
};
DevolveModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            RouterModule.forChild(ROUTES$1),
            ReactiveFormsModule,
            CustomFormsModule,
            CoreModule,
            MatDatepickerModule,
            MatDateFormatModule,
            MatInputModule,
            MatButtonModule,
            MatCardModule,
            MatSelectModule,
            CovalentCommonModule,
            CovalentDialogsModule
        ],
        declarations: [
            DevolveDetailsComponent,
            DevolveEditComponent,
            EndDevolveComponent
        ],
        providers: [
            DevolveResolve
        ]
    })
], DevolveModule);

/*
 * Public API Surface of Clinic
 */

/**
 * Generated bundle index. Do not edit.
 */

export {
    DevolveModule,
    PharmacyModule,
    PharmacyService,
    PharmacyWidgetModule,
    PharmacyDetailsComponent as ɵa,
    PharmacyEditComponent as ɵb,
    PharmacyResolve as ɵc,
    ROUTES as ɵd,
    modules as ɵe,
    MaterialModule as ɵf,
    PharmacyWidget as ɵg,
    DevolveResolve as ɵh,
    ROUTES$1 as ɵi,
    DevolveDetailsComponent as ɵj,
    DevolveService as ɵk,
    DevolveEditComponent as ɵl,
    EndDevolveComponent as ɵm
};
//# sourceMappingURL=lamis-pharmacy-1.1.4.js.map
