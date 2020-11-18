import { __decorate, __param, __metadata } from 'tslib';
import { Inject, ɵɵdefineInjectable, ɵɵinject, Injectable, ComponentFactoryResolver, Component, Input, NgModule } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DATE_FORMAT, SERVER_API_URL_CONFIG, entityCompare, AppLoaderService, MatDateFormatModule, LamisSharedModule, createRequestOption } from '@lamis/web-core';
import { map, filter, tap, catchError } from 'rxjs/operators';
import * as moment_ from 'moment';
import { CardViewDateItemModel, CardViewIntItemModel, CardViewFloatItemModel, CardViewTextItemModel, CardViewBoolItemModel, NotificationService, CoreModule } from '@alfresco/adf-core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatNativeDateModule, MatOptionModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSlideToggleModule, MatTableModule, MatTabsModule, MatMenuModule, MatProgressBarModule, MatSidenavModule, MatSnackBarModule, MatToolbarModule, MatTooltipModule, MatStepperModule } from '@angular/material';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { TdDialogService, CovalentMessageModule, CovalentDialogsModule, CovalentSearchModule } from '@covalent/core';
import { ColumnMode, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { of } from 'rxjs';
import { MatDatetimepickerModule, MatNativeDatetimeModule } from '@mat-datetimepicker/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { RxStompService } from '@stomp/ng2-stompjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const moment = moment_;
let ClinicService = class ClinicService {
    constructor(http, serverUrl) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.resourceUrl = '';
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/clinics';
    }
    create(clinic) {
        clinic = this.convertDateFromClient(clinic);
        return this.http
            .post(this.resourceUrl, clinic, { observe: 'response' })
            .pipe(map((res) => this.convertDateFromServer(res)));
    }
    update(clinic) {
        clinic = this.convertDateFromClient(clinic);
        return this.http
            .put(this.resourceUrl, clinic, { observe: 'response' })
            .pipe(map((res) => this.convertDateFromServer(res)));
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
    delete(id) {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
    getVisitDatesByPatient(patientId) {
        return this.http.get(`${this.resourceUrl}/patient/${patientId}/visit-dates`)
            .pipe(map((res) => {
            res.forEach(d => moment(d));
            return res;
        }));
    }
    getPatient(id) {
        return this.http.get(`/api/patients/by-uuid/${id}`, { observe: 'body' })
            .pipe(map((res) => {
            if (res) {
                res.dateRegistration = res.dateRegistration != null ? moment(res.dateRegistration) : null;
                res.dateBirth = res.dateBirth != null ? moment(res.dateBirth) : null;
            }
            return res;
        }));
    }
    getRegimenLines() {
        return this.http.get(`${this.resourceUrl}/regimen-types`);
    }
    getRegimenByLine(id) {
        return this.http.get(`${this.resourceUrl}/regimens/regimen-type/${id}`);
    }
    adverseDrugReactions() {
        return this.http.get(`${this.resourceUrl}/adverse-drug-reactions`);
    }
    opportunisticInfections() {
        return this.http.get(`${this.resourceUrl}/opportunistic-infections`);
    }
    adheres() {
        return this.http.get(`${this.resourceUrl}/adheres`);
    }
    regimes(regimenType) {
        return this.http.get(`${this.resourceUrl}/regimens/${regimenType}`);
    }
    latestVisit(patientId) {
        return this.http.get(`${this.resourceUrl}/patient/${patientId}/latest`);
    }
    enrolledOnOTZ(id) {
        return this.http.get(`${this.resourceUrl}/patient/${id}/enrolled-on-otz`);
    }
    convertDateFromClient(clinic) {
        const copy = Object.assign({}, clinic, {
            dateVisit: clinic.dateVisit != null && clinic.dateVisit.isValid() ? clinic.dateVisit.format(DATE_FORMAT) : null,
            lmp: clinic.lmp != null && clinic.lmp.isValid() ? clinic.lmp.format(DATE_FORMAT) : null,
            nextAppointment: clinic.nextAppointment != null && clinic.nextAppointment.isValid() ?
                clinic.nextAppointment.format(DATE_FORMAT) : null,
            pregnant: clinic.pregnancyStatus != null && clinic.pregnancyStatus === 2,
            breastfeeding: clinic.pregnancyStatus != null && clinic.pregnancyStatus === 3,
            bp: clinic.bp1 > 0 && clinic.bp2 > 0 ? clinic.bp1 + '/' + clinic.bp2 : null
        });
        return copy;
    }
    convertDateFromServer(res) {
        if (res.body) {
            res.body.nextAppointment = res.body.nextAppointment != null ? moment(res.body.nextAppointment) : null;
            res.body.dateVisit = res.body.dateVisit != null ? moment(res.body.dateVisit) : null;
            res.body.lmp = res.body.lmp != null ? moment(res.body.lmp) : null;
            res.body.pregnancyStatus = res.body.pregnant ? 2 : res.body.breastfeeding ? 3 : 1;
            if (res.body.bp) {
                const parts = res.body.bp.split('/');
                res.body.bp1 = parseInt(parts[0], 10);
                res.body.bp2 = parts.length === 2 ? parseInt(parts[1], 10) : null;
            }
        }
        return res;
    }
    convertDateArrayFromServer(res) {
        if (res.body) {
            res.body.forEach((clinic) => {
                clinic.dateVisit = clinic.dateVisit != null ? moment(clinic.dateVisit) : null;
                clinic.lmp = clinic.lmp != null ? moment(clinic.lmp) : null;
                clinic.nextAppointment = clinic.nextAppointment != null ? moment(clinic.nextAppointment) : null;
                clinic.pregnancyStatus = clinic.pregnant ? 2 : clinic.breastfeeding ? 3 : 1;
            });
        }
        return res;
    }
};
ClinicService.ctorParameters = () => [
    { type: HttpClient },
    { type: undefined, decorators: [{ type: Inject, args: [SERVER_API_URL_CONFIG,] }] }
];
ClinicService.ngInjectableDef = ɵɵdefineInjectable({ factory: function ClinicService_Factory() { return new ClinicService(ɵɵinject(HttpClient), ɵɵinject(SERVER_API_URL_CONFIG)); }, token: ClinicService, providedIn: "root" });
ClinicService = __decorate([
    Injectable({ providedIn: 'root' }),
    __param(1, Inject(SERVER_API_URL_CONFIG)),
    __metadata("design:paramtypes", [HttpClient, Object])
], ClinicService);

const moment$1 = moment_;
let ClinicDetailsComponent = class ClinicDetailsComponent {
    constructor(router, route, clinicService, cfr, _dialogService, notificationService) {
        this.router = router;
        this.route = route;
        this.clinicService = clinicService;
        this.cfr = cfr;
        this._dialogService = _dialogService;
        this.notificationService = notificationService;
        this.properties = [];
    }
    ngOnInit() {
        this.route.data.subscribe(({ entity }) => {
            this.entity = !!entity && entity.body ? entity.body : entity;
            const patientId = this.route.snapshot.paramMap.get('patientId');
            this.clinicService.getPatient(patientId).subscribe((res) => this.entity.patient = res);
            this.buildProperties();
        });
    }
    edit() {
        this.router.navigate(['/', 'clinics', this.entity.uuid, 'patient', this.entity.patient.uuid, 'edit']);
    }
    delete() {
        this._dialogService.openConfirm({
            title: 'Confirm',
            message: 'Do you want to delete this clinic visit, action cannot be reversed?',
            cancelButton: 'No',
            acceptButton: 'Yes',
            width: '500px',
        }).afterClosed().subscribe((accept) => {
            if (accept) {
                this.clinicService.delete(this.entity.id).subscribe((res) => {
                    if (res.ok) {
                        this.router.navigate(['patients']);
                    }
                    else {
                        this.notificationService.showError('Error deleting visit, please try again');
                    }
                });
            }
            else {
                // DO SOMETHING ELSE
            }
        });
    }
    buildProperties() {
        this.properties.push(new CardViewDateItemModel({
            key: 'ds',
            value: this.entity.dateVisit,
            label: this.entity.commence ? 'ART Start Date' : 'Date Visit',
            format: 'dd MMM, yyyy'
        }));
        if (this.entity.commence) {
            this.properties.push(new CardViewIntItemModel({
                label: 'CD4 at start of ART',
                key: 'cd4',
                value: this.entity.cd4p || null
            }));
            this.properties.push(new CardViewFloatItemModel({
                label: 'CD4%',
                key: 'cd4p',
                value: this.entity.cd4p || null
            }));
            this.properties.push(new CardViewTextItemModel({
                label: 'Original Regimen Line',
                key: 'rl',
                value: this.entity.regimenType != null ? this.entity.regimenType.description : ''
            }));
            this.properties.push(new CardViewTextItemModel({
                label: 'Original Regimen',
                key: 'rl',
                value: this.entity.regimen != null ? this.entity.regimen.description : ''
            }));
        }
        if (this.entity.extra && this.entity.patient.extra.prep && this.entity.patient.extra.prep.registered) {
            if (this.entity.commence) {
                this.properties.push(new CardViewTextItemModel({
                    label: 'HIV Status at PrEP Initiation',
                    key: 'cs',
                    value: this.entity.extra.prep.hivTestResult
                }));
                this.properties.push(new CardViewTextItemModel({
                    label: 'Creatinine Clearance (mL/min)',
                    key: 'cs',
                    value: this.entity.extra.prep.creatinineClearance
                }));
                this.properties.push(new CardViewTextItemModel({
                    label: 'Urinalysis',
                    key: 'cs',
                    value: this.entity.extra.prep.urinalysis
                }));
                this.properties.push(new CardViewTextItemModel({
                    label: 'Hepatitis B Screening',
                    key: 'cs',
                    value: this.entity.extra.prep.hepatitisB
                }));
                this.properties.push(new CardViewTextItemModel({
                    label: 'Hepatitis C Screening',
                    key: 'cs',
                    value: this.entity.extra.prep.hepatitisC
                }));
            }
            else {
                this.properties.push(new CardViewTextItemModel({
                    label: 'HIV Status /Test Result',
                    key: 'cs',
                    value: this.entity.extra.prep.hivTestResult
                }));
            }
        }
        if (this.entity.extra && this.entity.extra.otz && this.entity.extra.otz.dateEnrolledOnOTZ) {
            this.properties.push(new CardViewDateItemModel({
                key: 'ds',
                value: moment$1(this.entity.extra.dateEnrolledOnOTZ),
                label: 'Date Enrolled on OTZ',
                format: 'dd MMM, yyyy'
            }));
        }
        this.properties.push(new CardViewTextItemModel({
            label: 'Clinical Stage',
            key: 'cs',
            value: this.entity.clinicStage
        }));
        this.properties.push(new CardViewTextItemModel({
            label: 'Functional Status',
            key: 'fs',
            value: this.entity.funcStatus
        }));
        this.properties.push(new CardViewTextItemModel({
            label: 'TB Status',
            key: 'ts',
            value: this.entity.tbStatus
        }));
        this.properties.push(new CardViewFloatItemModel({
            label: 'Body Weight(Kg)',
            key: 'bw',
            value: this.entity.bodyWeight || null
        }));
        this.properties.push(new CardViewFloatItemModel({
            label: 'Height(m)',
            key: 'h',
            value: this.entity.height || null
        }));
        this.properties.push(new CardViewTextItemModel({
            label: 'Blood Pressure',
            key: 'cd4p',
            value: this.entity.bp
        }));
        if (this.entity.patient.gender === 'Female') {
            this.properties.push(new CardViewBoolItemModel({
                label: 'Pregnant',
                key: 'pg',
                value: this.entity.pregnant
            }));
            this.properties.push(new CardViewBoolItemModel({
                label: 'Breastfeeding',
                key: 'bf',
                value: this.entity.breastfeeding
            }));
            this.properties.push(new CardViewDateItemModel({
                key: 'lpm',
                value: this.entity.lmp,
                label: 'LMP',
                format: 'dd MMM, yyyy'
            }));
        }
        this.properties.push(new CardViewTextItemModel({
            label: 'Level of Adherence',
            key: 'ts',
            value: this.entity.tbStatus
        }));
        if (this.entity.extra && this.entity.extra.otz && this.entity.extra.otz.dateLastOTZMeeting) {
            this.properties.push(new CardViewDateItemModel({
                key: 'ds',
                value: moment$1(this.entity.extra.dateLastOTZMeeting),
                label: 'Date of Last OTZ Meeting',
                format: 'dd MMM, yyyy'
            }));
        }
        this.properties.push(new CardViewDateItemModel({
            key: 'na',
            value: this.entity.nextAppointment,
            label: 'Next Appointment Date',
            format: 'dd MMM, yyyy'
        }));
    }
    previousState() {
        window.history.back();
    }
    ngOnDestroy() {
    }
};
ClinicDetailsComponent.ctorParameters = () => [
    { type: Router },
    { type: ActivatedRoute },
    { type: ClinicService },
    { type: ComponentFactoryResolver },
    { type: TdDialogService },
    { type: NotificationService }
];
ClinicDetailsComponent = __decorate([
    Component({
        selector: 'lamis-clinic',
        template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <mat-card>\n            <mat-card-header>\n            </mat-card-header>\n            <mat-card-content>\n                <adf-card-view [properties]=\"properties\" editable=\"false\"></adf-card-view>\n            </mat-card-content>\n            <mat-card-actions class=\"lamis-edit-form-actions\">\n                <button mat-button (click)=\"previousState()\">Back</button>\n                <button mat-raised-button color=\"warn\" (click)=\"delete()\">Delete</button>\n                <button mat-raised-button color=\"primary\" (click)=\"edit()\">Edit</button>\n            </mat-card-actions>\n        </mat-card>\n    </div>\n</div>\n"
    }),
    __metadata("design:paramtypes", [Router, ActivatedRoute, ClinicService,
        ComponentFactoryResolver, TdDialogService,
        NotificationService])
], ClinicDetailsComponent);

const moment$2 = moment_;
let ClinicEditComponent = class ClinicEditComponent {
    constructor(clinicService, notification, activatedRoute, appLoaderService) {
        this.clinicService = clinicService;
        this.notification = notification;
        this.activatedRoute = activatedRoute;
        this.appLoaderService = appLoaderService;
        this.error = false;
        this.today = moment$2();
        this.visitDates = [];
        this.selectedClinicAdr = [];
        this.oiList = [];
        this.adhereList = [];
        this.ColumnMode = ColumnMode;
        this.adr = false;
        this.otzApplicable = false;
        this.hasOtz = false;
    }
    createEntity() {
        return {};
    }
    ngOnInit() {
        this.clinicService.opportunisticInfections().subscribe(res => this.opportunisticInfections = res);
        this.clinicService.adheres().subscribe(res => this.adheres = res);
        this.isSaving = false;
        this.clinicService.getRegimenLines().subscribe(res => {
            this.regimenLines = res;
        });
        this.activatedRoute.data.subscribe(({ entity }) => {
            this.commence = !!this.activatedRoute.snapshot.data['commence'];
            this.entity = !!entity && entity.body ? entity.body : entity;
            if (this.entity === undefined) {
                this.entity = this.createEntity();
            }
            const patientId = this.activatedRoute.snapshot.paramMap.get('patientId');
            this.clinicService.getPatient(patientId).subscribe((res) => {
                this.entity.patient = res;
                this.entity.facility = res.facility;
                this.dateBirth = res.dateBirth;
                this.dateRegistration = res.dateRegistration;
                if (res.statusAtRegistration === 'ART_TRANSFER_IN') {
                    this.dateRegistration = moment$2('1999-01-01', 'YYYY-MM-DD');
                    if (this.dateRegistration.isBefore(this.entity.patient.dateBirth)) {
                        this.dateRegistration = this.entity.patient.dateBirth.clone().add(3, 'months');
                    }
                }
                if (res.extra && res.extra.prep && res.extra.prep.registered) {
                    this.prep = true;
                    this.clinicService.getRegimenLines().subscribe(res1 => {
                        this.regimenLines = res1.filter(t => {
                            return t.id === 30;
                        });
                    });
                }
                this.clinicService.enrolledOnOTZ(res.id).subscribe(r => {
                    this.enrolledOnOTZ = r;
                    this.hasOtz = r;
                });
                this.otzApplicable = !moment$2().subtract(24, 'years').isAfter(this.entity.patient.dateBirth)
                    && !moment$2().subtract(10, 'years').isBefore(this.entity.patient.dateBirth);
                this.clinicService.getVisitDatesByPatient(this.entity.patient.id).subscribe((res1) => {
                    this.visitDates = res1;
                });
            });
            if (this.entity.commence && this.entity.regimenType) {
                this.regimenLineChange(this.entity.regimenType);
            }
            this.commence = this.commence || this.entity.commence;
            if (this.commence) {
                this.entity.commence = true;
                if (this.entity.regimenType) {
                    this.regimenLineChange(this.entity.regimenType);
                }
            }
            if (this.entity.id) {
                this.appointmentMin = this.entity.dateVisit.clone().add(14, 'days');
                this.appointmentMax = this.entity.dateVisit.clone().add(8, 'months');
                this.clinicService.adverseDrugReactions().subscribe(res1 => {
                    this.adverseDrugReactions = res1;
                    this.adr = !!this.entity.adverseDrugReactions;
                    this.adverseDrugReactions.forEach(adr => {
                        let found = false;
                        (this.entity.adverseDrugReactions || []).forEach(cadr => {
                            if (cadr.adverseDrugReaction.id === adr.id) {
                                found = true;
                                this.selectedClinicAdr.push(cadr);
                            }
                        });
                        if (!found) {
                            this.selectedClinicAdr.push({
                                adverseDrugReaction: adr
                            });
                        }
                    });
                    this.selectedClinicAdr = [...this.selectedClinicAdr];
                    if (this.entity.extra) {
                        if (this.entity.extra.prep) {
                            this.hivTestResult = this.entity.extra.prep.hivTestResult;
                            this.creatinineClearance = this.entity.extra.prep.creatinineClearance;
                            this.hepatitisB = this.entity.extra.prep.hepatitisB;
                            this.hepatitisC = this.entity.extra.prep.hepatitisC;
                            this.urinalysis = this.entity.extra.prep.urinalysis;
                        }
                        if (this.entity.extra.otz) {
                            if (!!this.entity.extra.otz.dateOfFullDisclosure) {
                                this.dateOfFullDisclosure = moment$2(this.entity.extra.otz.dateOfFullDisclosure);
                            }
                            this.attendedLastOTZMeeting = !!this.entity.extra.otz.attendedLastOTZMeeting;
                            this.enrolledOnOTZ = !!this.entity.extra.otz.enrolledOnOTZ;
                            if (!!this.entity.extra.otz.dateEnrolledOnOTZ) {
                                this.dateEnrolledOnOTZ = moment$2(this.entity.extra.otz.dateEnrolledOnOTZ);
                            }
                            if (!!this.entity.extra.otz.dateLastOTZMeeting) {
                                this.dateLastOTZMeeting = moment$2(this.entity.extra.otz.dateLastOTZMeeting);
                            }
                            this.caregiverPhone = this.entity.extra.otz.caregiverPhone;
                            this.caregiverAddress = this.entity.extra.otz.caregiverAddress;
                            this.modulesCompleted = this.entity.extra.otz.modulesCompleted;
                            this.fullDisclosure = this.entity.extra.otz.fullDisclosure;
                        }
                    }
                });
            }
            else {
                this.clinicService.adverseDrugReactions().subscribe(res => {
                    this.adverseDrugReactions = res;
                    this.adverseDrugReactions.forEach(adr => {
                        this.selectedClinicAdr.push({
                            adverseDrugReaction: adr
                        });
                    });
                });
                this.selectedClinicAdr = [...this.selectedClinicAdr];
            }
        });
    }
    updateValue(event, cell, row) {
        console.log('Edit', event, cell, row);
        this.selectedClinicAdr = [...this.selectedClinicAdr.map(cadr => {
                if (cadr.adverseDrugReaction && cadr.adverseDrugReaction.id === row.id) {
                    cadr.severity = event;
                }
                return cadr;
            })];
        console.log('UPDATED!', row, event);
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
    dateChanged(date) {
        this.appointmentMax = date.clone().add(6, 'months');
        this.lmpMin = date.clone().subtract(2, 'years');
        this.appointmentMin = date.clone().add(14, 'days');
        this.otzApplicable = !date.clone().subtract(24, 'years').isAfter(this.entity.patient.dateBirth)
            && !date.clone().subtract(10, 'years').isBefore(this.entity.patient.dateBirth);
    }
    entityCompare(e1, e2) {
        return entityCompare(e1, e2);
    }
    previousState() {
        window.history.back();
    }
    save() {
        this.isSaving = true;
        if (!this.entity.extra) {
            this.entity.extra = {};
        }
        this.entity.extra.otz = {};
        this.entity.extra.otz.fullDisclosure = this.fullDisclosure;
        this.entity.extra.otz.dateOfFullDisclosure = this.dateOfFullDisclosure != null && this.dateOfFullDisclosure.isValid() ?
            this.dateOfFullDisclosure.format(DATE_FORMAT) : null;
        this.entity.extra.otz.dateEnrolledOnOTZ = this.dateEnrolledOnOTZ != null && this.dateEnrolledOnOTZ.isValid() ?
            this.dateEnrolledOnOTZ.format(DATE_FORMAT) : null;
        this.entity.extra.otz.attendedLastOTZMeeting = !!this.attendedLastOTZMeeting;
        this.entity.extra.otz.dateLastOTZMeeting = this.dateLastOTZMeeting != null && this.dateLastOTZMeeting.isValid() ?
            this.dateLastOTZMeeting.format(DATE_FORMAT) : null;
        this.entity.extra.otz.enrolledOnOTZ = this.enrolledOnOTZ;
        this.entity.extra.otz.caregiverPhone = this.caregiverPhone;
        this.entity.extra.otz.caregiverAddress = this.caregiverAddress;
        this.entity.extra.otz.modulesCompleted = this.modulesCompleted;
        if (this.prep) {
            this.entity.extra.prep = {};
            this.entity.extra.prep.hivTestResult = this.hivTestResult;
            this.entity.extra.prep.creatinineClearance = this.creatinineClearance;
            this.entity.extra.prep.hepatitisB = this.hepatitisB;
            this.entity.extra.prep.hepatitisC = this.hepatitisC;
            this.entity.extra.prep.urinalysis = this.urinalysis;
        }
        this.entity.adverseDrugReactions = this.selectedClinicAdr.filter(cadr => !!cadr.severity);
        this.entity.opportunisticInfections = this.oiList;
        this.entity.adheres = this.adhereList;
        this.appLoaderService.open('Saving clinic visit..');
        if (this.entity.id !== undefined) {
            this.subscribeToSaveResponse(this.clinicService.update(this.entity));
        }
        else {
            this.subscribeToSaveResponse(this.clinicService.create(this.entity));
        }
    }
    regimenLineChange(type) {
        this.clinicService.getRegimenByLine(type.id).subscribe(res => this.regimens = res);
    }
    subscribeToSaveResponse(result) {
        result.subscribe((res) => this.onSaveSuccess(res.body), (res) => {
            this.onSaveError();
            this.onError(res.message);
        });
    }
    onSaveSuccess(result) {
        this.appLoaderService.close();
        this.isSaving = false;
        this.notification.showInfo('Clinic visit successfully saved');
        this.previousState();
    }
    onSaveError() {
        this.isSaving = false;
        this.appLoaderService.close();
        this.error = true;
        // this.submitButton.disabled = true;
        this.notification.showError('Error occurred saving clinic visit; try again');
        // this.progressBar.mode = 'determinate';
    }
    onError(errorMessage) {
        this.appLoaderService.close();
        this.notification.showError(errorMessage);
    }
};
ClinicEditComponent.ctorParameters = () => [
    { type: ClinicService },
    { type: NotificationService },
    { type: ActivatedRoute },
    { type: AppLoaderService }
];
ClinicEditComponent = __decorate([
    Component({
        selector: 'lamis-clinic-edit',
        template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <form name=\"form\" role=\"form\" novalidate (ngSubmit)=\"save()\" #clinicForm=\"ngForm\">\n            <mat-card class=\"default\">\n                <mat-card-content *ngIf=\"!!entity.patient\">\n                    <ng-container *ngIf=\"commence === true\">\n                        <div>\n                            <mat-form-field class=\"full-width\">\n                                <input matInput [matDatepicker]=\"picker\"\n                                       placeholder=\"ART Start Date\"\n                                       [(ngModel)]=\"entity.dateVisit\"\n                                       #visit=\"ngModel\"\n                                       (dateChange)=\"dateChanged($event.value)\"\n                                       [matDatepickerFilter]=\"filterDates.bind(this)\"\n                                       [max]=\"today\"\n                                       [min]=\"dateRegistration\"\n                                       name=\"visit\"\n                                       required>\n                                <mat-datepicker-toggle\n                                        matSuffix\n                                        [for]=\"picker\">\n                                </mat-datepicker-toggle>\n                                <mat-datepicker #picker></mat-datepicker>\n                                <mat-error\n                                        *ngIf=\"visit.errors && (visit.dirty || visit.touched) && (visit.errors.required)\">\n                                    {{prep ? 'Date of PrEP Initiation ' : 'ART Start Date '}}is required\n                                </mat-error>\n                                <mat-error\n                                        *ngIf=\"visit.errors && (visit.dirty || visit.touched) && (visit.errors.min)\">\n                                    Date of visit cannot be before {{dateRegistration | date: 'dd MMM, yyyy'}}\n                                </mat-error>\n                                <mat-error\n                                        *ngIf=\"visit.errors && (visit.dirty || visit.touched) && (visit.errors.max)\">\n                                    {{prep ? 'Date of PrEP Initiation ' : 'ART Start Date '}}cannot be in the future\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"row\" *ngIf=\"!prep\">\n                            <div class=\"col-md-6\">\n                                <mat-form-field class=\"full-width\">\n                                    <input matInput placeholder=\"CD4 at start of ART\" [min]=\"0\" type=\"number\"\n                                           #cd4=\"ngModel\" name=\"cd4\" [(ngModel)]=\"entity.cd4\"/>\n                                    <mat-error\n                                            *ngIf=\"cd4.errors && (cd4.dirty || cd4.touched) && (cd4.errors.min)\">\n                                        Minimum CD4 is 0\n                                    </mat-error>\n                                </mat-form-field>\n                            </div>\n                            <div class=\"col-md-6\">\n                                <mat-form-field class=\"full-width\">\n                                    <input matInput placeholder=\"CD4 %\" [min]=\"0\" [max]=\"100\" type=\"number\"\n                                           #cd4p=\"ngModel\" name=\"cd4p\" [(ngModel)]=\"entity.cd4p\"/>\n                                    <mat-error\n                                            *ngIf=\"cd4p.errors && (cd4p.dirty || cd4p.touched) && (cd4p.errors.min)\">\n                                        Minimum CD4 % is 0\n                                    </mat-error>\n                                    <mat-error\n                                            *ngIf=\"cd4p.errors && (cd4p.dirty || cd4p.touched) && (cd4p.errors.max)\">\n                                        Maximum CD4 % is 100\n                                    </mat-error>\n                                </mat-form-field>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-md-6\">\n                                <mat-form-field class=\"full-width\">\n                                    <mat-select [(ngModel)]=\"entity.regimenType\"\n                                                placeholder=\"Original Regimen Line\"\n                                                #rtype=\"ngModel\" required name=\"rt\"\n                                                [compareWith]=\"entityCompare\"\n                                                (selectionChange)=\"regimenLineChange($event.value)\">\n                                        <mat-option>None</mat-option>\n                                        <mat-option *ngFor=\"let line of regimenLines\"\n                                                    [value]=\"line\">{{line.description}}</mat-option>\n                                        <mat-error\n                                                *ngIf=\"rtype.errors && (rtype.dirty || rtype.touched) && (rtype.errors.required)\">\n                                            Regimen Line is required\n                                        </mat-error>\n                                    </mat-select>\n                                </mat-form-field>\n                            </div>\n                            <div class=\"col-md-6\">\n                                <mat-form-field class=\"full-width\">\n                                    <mat-select [(ngModel)]=\"entity.regimen\"\n                                                placeholder=\"Original Regimen\"\n                                                [compareWith]=\"entityCompare\"\n                                                #rm=\"ngModel\" required name=\"rm\">\n                                        <mat-option>None</mat-option>\n                                        <mat-option *ngFor=\"let regimen of regimens\"\n                                                    [value]=\"regimen\">{{regimen.description}}</mat-option>\n                                        <mat-error\n                                                *ngIf=\"rm.errors && (rm.dirty || rm.touched) && (rm.errors.required)\">\n                                            Regimen is required\n                                        </mat-error>\n                                    </mat-select>\n                                </mat-form-field>\n                            </div>\n                        </div>\n                    </ng-container>\n                    <div *ngIf=\"commence === false || commence === undefined\">\n                        <mat-form-field class=\"full-width\">\n                            <input matInput [matDatepicker]=\"picker\"\n                                   placeholder=\"Date of Visit\"\n                                   [(ngModel)]=\"entity.dateVisit\"\n                                   [matDatepickerFilter]=\"filterDates.bind(this)\"\n                                   #visit=\"ngModel\"\n                                   (dateChange)=\"dateChanged($event.value)\"\n                                   [max]=\"today\"\n                                   [min]=\"dateRegistration\"\n                                   name=\"visit\"\n                                   required>\n                            <mat-datepicker-toggle\n                                    matSuffix\n                                    [for]=\"picker\">\n                            </mat-datepicker-toggle>\n                            <mat-datepicker #picker></mat-datepicker>\n                            <mat-error\n                                    *ngIf=\"visit.errors && (visit.dirty || visit.touched) && (visit.errors.required)\">\n                                Date of visit is required\n                            </mat-error>\n                            <mat-error\n                                    *ngIf=\"visit.errors && (visit.dirty || visit.touched) && (visit.errors.min)\">\n                                Date of visit cannot be before {{dateRegistration | date: 'dd MMM, yyyy'}}\n                            </mat-error>\n                            <mat-error\n                                    *ngIf=\"visit.errors && (visit.dirty || visit.touched) && (visit.errors.max)\">\n                                Date of visit cannot be in the future\n                            </mat-error>\n                        </mat-form-field>\n                    </div>\n                    <ng-container *ngIf=\"otzApplicable && !hasOtz\">\n                        <div class=\"row\">\n                            <div class=\"col-md-6\">\n                                <mat-checkbox [(ngModel)]=\"fullDisclosure\" name=\"fd\">\n                                    Full Disclosure?\n                                </mat-checkbox>\n                            </div>\n                            <div class=\"col-md-6\">\n                                <mat-form-field class=\"full-width\" *ngIf=\"fullDisclosure\">\n                                    <input matInput [matDatepicker]=\"picker8\"\n                                           placeholder=\"Date of Full Disclosure\"\n                                           [(ngModel)]=\"dateOfFullDisclosure\"\n                                           #dfd=\"ngModel\"\n                                           [max]=\"today\"\n                                           [min]=\"entity.patient.dateBirth\"\n                                           name=\"dfd\"\n                                           required>\n                                    <mat-datepicker-toggle\n                                            matSuffix\n                                            [for]=\"picker8\">\n                                    </mat-datepicker-toggle>\n                                    <mat-datepicker #picker8></mat-datepicker>\n                                    <mat-error\n                                            *ngIf=\"dfd.errors && (dfd.dirty || dfd.touched) && (dfd.errors.required)\">\n                                        Date of Full Disclosure is required\n                                    </mat-error>\n                                    <mat-error\n                                            *ngIf=\"dfd.errors && (dfd.dirty || dfd.touched) && (dfd.errors.min)\">\n                                        Date of Full Disclosure cannot be before date of\n                                        birth {{entity.patient.dateBirth | date: 'dd MMM, yyyy'}}\n                                    </mat-error>\n                                    <mat-error\n                                            *ngIf=\"dfd.errors && (dfd.dirty || dfd.touched) && (dfd.errors.max)\">\n                                        Date of Full Disclosure cannot be in the future\n                                    </mat-error>\n                                </mat-form-field>\n                            </div>\n                        </div>\n                        <ng-container *ngIf=\"fullDisclosure && !hasOtz\">\n                            <div class=\"row\">\n                                <div class=\"col-md-6\">\n                                    <mat-checkbox [(ngModel)]=\"enrolledOnOTZ\" name=\"otz\">\n                                        Enrolled on OTZ?\n                                    </mat-checkbox>\n                                </div>\n                                <div class=\"col-md-6\">\n                                    <mat-form-field class=\"full-width\" *ngIf=\"enrolledOnOTZ\">\n                                        <input matInput [matDatepicker]=\"picker7\"\n                                               placeholder=\"Date Enrolled on OTZ\"\n                                               [(ngModel)]=\"dateEnrolledOnOTZ\"\n                                               #otze=\"ngModel\"\n                                               [max]=\"today\"\n                                               [min]=\"entity.patient.dateBirth\"\n                                               name=\"otze\"\n                                               [required]=\"enrolledOnOTZ\">\n                                        <mat-datepicker-toggle\n                                                matSuffix\n                                                [for]=\"picker7\">\n                                        </mat-datepicker-toggle>\n                                        <mat-datepicker #picker7></mat-datepicker>\n                                        <mat-error\n                                                *ngIf=\"otze.errors && (otze.dirty || otze.touched) && (otze.errors.required)\">\n                                            Date enrolled on OTZ is required\n                                        </mat-error>\n                                        <mat-error\n                                                *ngIf=\"otze.errors && (otze.dirty || otze.touched) && (otze.errors.min)\">\n                                            Date enrolled on OTZ cannot be before date of\n                                            birth {{entity.patient.dateBirth | date: 'dd MMM, yyyy'}}\n                                        </mat-error>\n                                        <mat-error\n                                                *ngIf=\"otze.errors && (otze.dirty || otze.touched) && (otze.errors.max)\">\n                                            Date enrolled on OTZ cannot be in the future\n                                        </mat-error>\n                                    </mat-form-field>\n                                </div>\n                            </div>\n                            <ng-container *ngIf=\"enrolledOnOTZ\">\n                                <fieldset>\n                                    <legend>OTZ</legend>\n                                    <div class=\"row\">\n                                        <div class=\"col-md-6\">\n                                            <mat-form-field class=\"full-width\">\n                                                <mat-label>Caregiver Phone</mat-label>\n                                                <input matInput name=\"phone\" [(ngModel)]=\"caregiverPhone\"\n                                                       #phone=\"ngModel\"\n                                                       phoneNumber/>\n                                                <mat-error\n                                                        *ngIf=\"phone.errors && (phone.dirty || phone.touched) && (phone.errors.required)\">\n                                                    Caregiver phone number is required\n                                                </mat-error>\n                                                <mat-error\n                                                        *ngIf=\"phone.errors && (phone.dirty || phone.touched || !!entity.id) && (phone.errors.phoneNumber)\">\n                                                    Invalid phone number\n                                                </mat-error>\n                                            </mat-form-field>\n                                        </div>\n                                        <div class=\"col-md-6\">\n                                            <mat-form-field class=\"full-width\">\n                                                <mat-label>Caregiver Address</mat-label>\n                                                <textarea matInput name=\"address\" [(ngModel)]=\"caregiverAddress\"\n                                                          #address=\"ngModel\"\n                                                          rows=\"2\">\n                                            </textarea>\n                                                <mat-error\n                                                        *ngIf=\"address.errors && (address.dirty || address.touched) && (address.errors.required)\">\n                                                    Case Manager address is required\n                                                </mat-error>\n                                            </mat-form-field>\n                                        </div>\n                                    </div>\n                                </fieldset>\n                            </ng-container>\n                        </ng-container>\n                    </ng-container>\n                    <div>\n                        <mat-form-field class=\"full-width\">\n                            <mat-select [(ngModel)]=\"entity.clinicStage\"\n                                        placeholder=\"Clinical Stage\"\n                                        #clinicStage=\"ngModel\" name=\"cs\">\n                                <mat-option>None</mat-option>\n                                <mat-option [value]=\"'Stage I'\">Stage I</mat-option>\n                                <mat-option [value]=\"'Stage II'\">Stage II</mat-option>\n                                <mat-option [value]=\"'Stage III'\">Stage III</mat-option>\n                                <mat-option [value]=\"'Stage IV'\">Stage IV</mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n                    <div>\n                        <mat-form-field class=\"full-width\">\n                            <mat-select [(ngModel)]=\"entity.funcStatus\"\n                                        placeholder=\"Functional Status\"\n                                        #funcStatus=\"ngModel\" name=\"fs\">\n                                <mat-option>None</mat-option>\n                                <mat-option [value]=\"'Working'\">Working</mat-option>\n                                <mat-option [value]=\"'Ambulatory'\">Ambulatory</mat-option>\n                                <mat-option [value]=\"'Bedridden'\">Bedridden</mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n                    <ng-container *ngIf=\"prep\">\n                        <fieldset>\n                            <legend>PrEP</legend>\n                            <div *ngIf=\"commence\">\n                                <mat-form-field class=\"full-width\">\n                                    <mat-select [(ngModel)]=\"hivTestResult\"\n                                                placeholder=\"HIV Status at PrEP Initiation\"\n                                                required\n                                                #hivStatus=\"ngModel\" name=\"htr\">\n                                        <mat-option>None</mat-option>\n                                        <mat-option [value]=\"'NEGATIVE'\">Negative</mat-option>\n                                        <mat-option [value]=\"'POSITIVE'\">Positive</mat-option>\n                                    </mat-select>\n                                    <mat-error\n                                            *ngIf=\"hivStatus.errors && (hivStatus.dirty || hivStatus.touched) && (hivStatus.errors.required)\">\n                                        HIV Status is required\n                                    </mat-error>\n                                </mat-form-field>\n                            </div>\n                            <div *ngIf=\"!commence\">\n                                <mat-form-field class=\"full-width\">\n                                    <mat-select [(ngModel)]=\"hivTestResult\"\n                                                placeholder=\"HIV Status /Test Result\"\n                                                required\n                                                #hivStatus=\"ngModel\" name=\"htr\">\n                                        <mat-option>None</mat-option>\n                                        <mat-option [value]=\"'NEGATIVE'\">Negative</mat-option>\n                                        <mat-option [value]=\"'POSITIVE'\">Positive</mat-option>\n                                        <mat-option [value]=\"'NOT_DONE'\">Not Done</mat-option>\n                                    </mat-select>\n                                    <mat-error\n                                            *ngIf=\"hivStatus.errors && (hivStatus.dirty || hivStatus.touched) && (hivStatus.errors.required)\">\n                                        HIV Status is required\n                                    </mat-error>\n                                </mat-form-field>\n                            </div>\n                            <ng-container *ngIf=\"commence\">\n                                <div class=\"row\">\n                                    <div class=\"col-md-6\">\n                                        <mat-form-field class=\"full-width\">\n                                            <input matInput [(ngModel)]=\"creatinineClearance\"\n                                                   placeholder=\"Creatinine Clearance (mL/min)\"\n                                                   #creatinine=\"ngModel\" name=\"creatinine\"/>\n                                        </mat-form-field>\n                                    </div>\n                                    <div class=\"col-md-6\">\n                                        <mat-form-field class=\"full-width\">\n                                            <mat-select [(ngModel)]=\"urinalysis\"\n                                                        placeholder=\"Urinalysis\"\n                                                        #urinal=\"ngModel\" name=\"urinalysis\">\n                                                <mat-option>None</mat-option>\n                                                <mat-option [value]=\"'Normal'\">Normal</mat-option>\n                                                <mat-option [value]=\"'Deranged'\">Deranged</mat-option>\n                                            </mat-select>\n                                        </mat-form-field>\n                                    </div>\n                                </div>\n                                <div class=\"row\">\n                                    <div class=\"col-md-6\">\n                                        <mat-form-field class=\"full-width\">\n                                            <mat-select [(ngModel)]=\"hepatitisB\"\n                                                        placeholder=\"Hepatitis B Screening\"\n                                                        #hepatitisb=\"ngModel\" name=\"hepatitisB\">\n                                                <mat-option>None</mat-option>\n                                                <mat-option [value]=\"'Positive'\">Positive</mat-option>\n                                                <mat-option [value]=\"'Negative'\">Negative</mat-option>\n                                                <mat-option [value]=\"'Not Done'\">Not Done</mat-option>\n                                            </mat-select>\n                                        </mat-form-field>\n                                    </div>\n                                    <div class=\"col-md-6\">\n                                        <mat-form-field class=\"full-width\">\n                                            <mat-select [(ngModel)]=\"hepatitisC\"\n                                                        placeholder=\"Hepatitis C Screening\"\n                                                        #hepatitisb=\"ngModel\" name=\"hepatitisC\">\n                                                <mat-option>None</mat-option>\n                                                <mat-option [value]=\"'Positive'\">Positive</mat-option>\n                                                <mat-option [value]=\"'Negative'\">Negative</mat-option>\n                                                <mat-option [value]=\"'Not Done'\">Not Done</mat-option>\n                                            </mat-select>\n                                        </mat-form-field>\n                                    </div>\n                                </div>\n                            </ng-container>\n                        </fieldset>\n                    </ng-container>\n                    <div>\n                        <mat-form-field class=\"full-width\">\n                            <mat-select [(ngModel)]=\"entity.tbStatus\"\n                                        placeholder=\"TB Status\"\n                                        name=\"tb\"\n                                        #tbStatus=\"ngModel\">\n                                <mat-option>None</mat-option>\n                                <mat-option [value]=\"'No sign or symptoms of TB'\">No sign or symptoms of TB</mat-option>\n                                <mat-option [value]=\"'TB suspected and referred for evaluation'\">TB suspected and\n                                    referred\n                                    for evaluation\n                                </mat-option>\n                                <mat-option [value]=\"'Currently on INH prophylaxis'\">Currently on INH prophylaxis\n                                </mat-option>\n                                <mat-option [value]=\"'Currently on TB treatment'\">Currently on TB treatment</mat-option>\n                                <mat-option [value]=\"'TB positive not on TB drugs'\">TB positive not on TB drugs\n                                </mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n                    <div>\n                        <mat-form-field class=\"full-width\">\n                            <input matInput placeholder=\"Body weight(Kg)\" [min]=\"0\" [max]=\"250\" type=\"number\"\n                                   #weight=\"ngModel\" name=\"weight\" [(ngModel)]=\"entity.bodyWeight\"/>\n                            <mat-error\n                                    *ngIf=\"weight.errors && (weight.dirty || weight.touched) && (weight.errors.min)\">\n                                Minimum body weight is 0\n                            </mat-error>\n                            <mat-error\n                                    *ngIf=\"weight.errors && (weight.dirty || weight.touched) && (weight.errors.max)\">\n                                Maximum body weight is 250\n                            </mat-error>\n                        </mat-form-field>\n                    </div>\n                    <div>\n                        <mat-form-field class=\"full-width\">\n                            <input matInput placeholder=\"Height (m)\" [min]=\"0\" [max]=\"1.8\" type=\"number\"\n                                   #height=\"ngModel\" name=\"height\" [(ngModel)]=\"entity.height\"/>\n                            <mat-error\n                                    *ngIf=\"height.errors && (height.dirty || height.touched) && (height.errors.min)\">\n                                Minimum height is 0\n                            </mat-error>\n                            <mat-error\n                                    *ngIf=\"height.errors && (height.dirty || height.touched) && (height.errors.max)\">\n                                Maximum height is 1.8m\n                            </mat-error>\n                        </mat-form-field>\n                    </div>\n                    <fieldset>\n                        <h6>Blood Pressure(mmHg)</h6>\n                        <div class=\"row\">\n                            <div class=\"col-md-3\">\n                                <mat-form-field class=\"full-width\">\n                                    <input matInput placeholder=\"Systolic\"\n                                           name=\"bp1\" type=\"number\"\n                                           [max]=\"190\"\n                                           [min]=\"70\"\n                                           [required]=\"!!entity.bp2\"\n                                           #bp1=\"ngModel\" [(ngModel)]=\"entity.bp1\"/>\n                                    <mat-error\n                                            *ngIf=\"bp1.errors && (bp1.dirty || bp1.touched) && (bp1.errors.max)\">\n                                        Maximum Systolic is 190\n                                    </mat-error>\n                                    <mat-error\n                                            *ngIf=\"bp1.errors && (bp1.dirty || bp1.touched) && (bp1.errors.min)\">\n                                        Minimum Systolic is 70\n                                    </mat-error>\n                                    <mat-error\n                                            *ngIf=\"bp1.errors && (bp1.dirty || bp1.touched) && (bp1.errors.required)\">\n                                        Systolic is required\n                                    </mat-error>\n                                </mat-form-field>\n                            </div>\n                            <div class=\"col-md-3\">\n                                <mat-form-field class=\"full-width\">\n                                    <input matInput placeholder=\"Diastolic\"\n                                           name=\"bp2\" type=\"number\"\n                                           [max]=\"100\"\n                                           [min]=\"40\"\n                                           [required]=\"!!entity.bp1\"\n                                           #bp2=\"ngModel\" [(ngModel)]=\"entity.bp2\"/>\n                                    <mat-error\n                                            *ngIf=\"bp2.errors && (bp2.dirty || bp2.touched) && (bp2.errors.max)\">\n                                        Maximum Diastolic is 100\n                                    </mat-error>\n                                    <mat-error\n                                            *ngIf=\"bp2.errors && (bp2.dirty || bp2.touched) && (bp2.errors.min)\">\n                                        Minimum Diastolic is 40\n                                    </mat-error>\n                                    <mat-error\n                                            *ngIf=\"bp2.errors && (bp2.dirty || bp2.touched) && (bp2.errors.required)\">\n                                        Diastolic is required\n                                    </mat-error>\n                                </mat-form-field>\n                            </div>\n                        </div>\n                    </fieldset>\n                    <div *ngIf=\"entity.patient && entity.patient.gender === 'FEMALE'\">\n                        <mat-form-field class=\"full-width\">\n                            <mat-select [(ngModel)]=\"entity.pregnancyStatus\"\n                                        placeholder=\"Pregnancy Status\"\n                                        #pregStatus=\"ngModel\" name=\"ps\">\n                                <mat-option>None</mat-option>\n                                <mat-option [value]=\"1\">Not Pregnant</mat-option>\n                                <mat-option [value]=\"2\">Pregnant</mat-option>\n                                <mat-option [value]=\"3\">Breastfeeding</mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n                    <div *ngIf=\"entity.patient && entity.patient.gender === 'FEMALE' && lmpMin\">\n                        <mat-form-field class=\"full-width\">\n                            <input matInput [matDatepicker]=\"picker1\"\n                                   placeholder=\"LMP\"\n                                   [(ngModel)]=\"entity.lmp\"\n                                   #lmp=\"ngModel\"\n                                   [max]=\"entity.dateVisit\"\n                                   [min]=\"lmpMin\"\n                                   name=\"lmp\">\n                            <mat-datepicker-toggle\n                                    matSuffix\n                                    [for]=\"picker1\">\n                            </mat-datepicker-toggle>\n                            <mat-datepicker #picker1></mat-datepicker>\n                            <mat-error\n                                    *ngIf=\"lmp.errors && (lmp.dirty || lmp.touched) && (lmp.errors.max)\">\n                                LMP cannot be after {{entity.dateVisit | date: 'dd MMM, yyyy'}}\n                            </mat-error>\n                            <mat-error\n                                    *ngIf=\"lmp.errors && (lmp.dirty || lmp.touched) && (lmp.errors.min)\">\n                                LMP cannot be before {{lmpMin | date: 'dd MMM, yyyy'}}\n                            </mat-error>\n                        </mat-form-field>\n                    </div>\n                    <div>\n                        <mat-form-field class=\"full-width\">\n                            <mat-select [(ngModel)]=\"oiList\"\n                                        placeholder=\"Opportunistic Infections\"\n                                        [compareWith]=\"entityCompare\"\n                                        name=\"ois\"\n                                        #oiIds=\"ngModel\" multiple>\n                                <mat-option>None</mat-option>\n                                <mat-option *ngFor=\"let oi of opportunisticInfections\"\n                                            [value]=\"oi\">{{oi.description}}</mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-4\">\n                            <mat-checkbox [(ngModel)]=\"adr\"\n                                          name=\"ad\">Adverse Drug Reaction Screened?\n                            </mat-checkbox>\n                        </div>\n                        <div style=\"height: 300px; overflow-y: auto;\" *ngIf=\"adr\" class=\"col-md-8\">\n                            <adf-datatable [rows]=\"selectedClinicAdr\"\n                                           [stickyHeader]=\"true\">\n                                <data-columns>\n                                    <data-column key=\"adverseDrugReaction.description\" title=\"Description\"\n                                                 sortable=\"true\"></data-column>\n                                    <data-column key=\"severity\" title=\"Severity\" sortable=\"false\">\n                                        <ng-template let-context=\"$implicit\">\n                                            <mat-form-field class=\"full-width\">\n                                                <mat-select autofocus\n                                                            [value]=\"context.row.getValue('severity')\"\n                                                            name=\"severity\"\n                                                            (valueChange)=\"updateValue($event, 'severity', context.row.getValue('adverseDrugReaction'))\">\n                                                    <mat-option>None</mat-option>\n                                                    <mat-option [value]=\"'Grade 1'\">Grade 1</mat-option>\n                                                    <mat-option [value]=\"'Grade 2'\">Grade 2</mat-option>\n                                                    <mat-option [value]=\"'Grade 3'\">Grade 3</mat-option>\n                                                    <mat-option [value]=\"'Grade 4'\">Grade 4</mat-option>\n                                                </mat-select>\n                                            </mat-form-field>\n                                        </ng-template>\n                                    </data-column>\n                                </data-columns>\n                            </adf-datatable>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-select [(ngModel)]=\"entity.adherenceLevel\"\n                                            placeholder=\"Level of Adherence\"\n                                            #adherence=\"ngModel\" name=\"al\">\n                                    <mat-option>None</mat-option>\n                                    <mat-option [value]=\"'Good'\">Good</mat-option>\n                                    <mat-option [value]=\"'Fair'\">Fair</mat-option>\n                                    <mat-option [value]=\"'Poor'\">Poor</mat-option>\n                                </mat-select>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\"\n                                            *ngIf=\"entity.adherenceLevel === 'Fair' || entity.adherenceLevel === 'Poor'\">\n                                <mat-select [(ngModel)]=\"adhereList\"\n                                            placeholder=\"Adherence\"\n                                            name=\"ads\"\n                                            [compareWith]=\"entityCompare\"\n                                            #adrIds=\"ngModel\" multiple>\n                                    <mat-option>None</mat-option>\n                                    <mat-option *ngFor=\"let adhere of adheres\"\n                                                [value]=\"adhere\">{{adhere.description}}</mat-option>\n                                </mat-select>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <ng-container *ngIf=\"otzApplicable || enrolledOnOTZ\">\n                        <div class=\"row\">\n                            <div class=\"col-md-6\">\n                                <mat-checkbox [(ngModel)]=\"attendedLastOTZMeeting\" name=\"aotz\">\n                                    Attended last support group (OTZ club) meeting?\n                                </mat-checkbox>\n                            </div>\n                            <div class=\"col-md-6\">\n                                <mat-form-field class=\"full-width\" *ngIf=\"attendedLastOTZMeeting\">\n                                    <input matInput [matDatepicker]=\"picker8\"\n                                           placeholder=\"Date of Last OTZ Club Meeting\"\n                                           [(ngModel)]=\"dateLastOTZMeeting\"\n                                           #lotzm=\"ngModel\"\n                                           [max]=\"today\"\n                                           [min]=\"dateEnrolledOnOTZ\"\n                                           name=\"lotzm\"\n                                           [required]=\"attendedLastOTZMeeting\">\n                                    <mat-datepicker-toggle\n                                            matSuffix\n                                            [for]=\"picker8\">\n                                    </mat-datepicker-toggle>\n                                    <mat-datepicker #picker8></mat-datepicker>\n                                    <mat-error\n                                            *ngIf=\"lotzm.errors && (lotzm.dirty || lotzm.touched) && (lotzm.errors.required)\">\n                                        Date of Last OTZ meeting is required\n                                    </mat-error>\n                                    <mat-error\n                                            *ngIf=\"lotzm.errors && (lotzm.dirty || lotzm.touched) && (lotzm.errors.min)\">\n                                        Date of last OTZ meeting cannot be\n                                        before {{dateEnrolledOnOTZ | date: 'dd MMM, yyyy'}}\n                                    </mat-error>\n                                    <mat-error\n                                            *ngIf=\"lotzm.errors && (lotzm.dirty || lotzm.touched) && (lotzm.errors.max)\">\n                                        Date of last OTZ meeting cannot be in the future\n                                    </mat-error>\n                                </mat-form-field>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-md-6\">\n                                <mat-form-field class=\"full-width\">\n                                    <mat-select name=\"modules\" [(ngModel)]=\"modulesCompleted\" #modules=\"ngModel\"\n                                                [required]=\"attendedLastOTZMeeting\">\n                                        <mat-option></mat-option>\n                                        <mat-option [value]=\"1\">1</mat-option>\n                                        <mat-option [value]=\"2\">2</mat-option>\n                                        <mat-option [value]=\"3\">3</mat-option>\n                                        <mat-option [value]=\"4\">4</mat-option>\n                                        <mat-option [value]=\"5\">5</mat-option>\n                                        <mat-option [value]=\"6\">6</mat-option>\n                                        <mat-option [value]=\"7\">7</mat-option>\n                                    </mat-select>\n                                    <mat-error\n                                            *ngIf=\"modules.errors && (modules.dirty || modules.touched) && (modules.errors.required)\">\n                                        Number of modules attended required\n                                    </mat-error>\n                                </mat-form-field>\n                            </div>\n                        </div>\n                    </ng-container>\n                    <div *ngIf=\"!!appointmentMin\">\n                        <mat-form-field class=\"full-width\">\n                            <input matInput [matDatepicker]=\"picker2\"\n                                   placeholder=\"Date of Next Appointment\"\n                                   [(ngModel)]=\"entity.nextAppointment\"\n                                   #na=\"ngModel\"\n                                   [min]=\"appointmentMin\"\n                                   [max]=\"appointmentMax\"\n                                   name=\"na\"\n                                   required>\n                            <mat-datepicker-toggle\n                                    matSuffix\n                                    [for]=\"picker2\">\n                            </mat-datepicker-toggle>\n                            <mat-datepicker #picker2></mat-datepicker>\n                            <mat-error\n                                    *ngIf=\"na.errors && (na.dirty || na.touched) && (na.errors.required)\">\n                                Date of next appointment is required\n                            </mat-error>\n                            <mat-error\n                                    *ngIf=\"na.errors && (na.dirty || na.touched) && (na.errors.max)\">\n                                Date of next appointment cannot be after {{appointmentMax | date: 'dd MMM, yyyy'}}\n                            </mat-error>\n                            <mat-error\n                                    *ngIf=\"na.errors && (na.dirty || na.touched) && (na.errors.min)\">\n                                Date of next appointment cannot be before {{appointmentMin | date: 'dd MMM, yyyy'}}\n                            </mat-error>\n                        </mat-form-field>\n                    </div>\n                    <div>\n                        <mat-form-field class=\"full-width\">\n                            <textarea matInput placeholder=\"Clinical Notes\"\n                                      cols=\"30\"\n                                      rows=\"3\"\n                                      name=\"notes\"\n                                      #note=\"ngModel\" [(ngModel)]=\"entity.notes\"></textarea>\n                        </mat-form-field>\n                    </div>\n                    <mat-card-actions class=\"lamis-edit-form-actions\">\n                        <button mat-raised-button type=\"button\" (click)=\"previousState()\">Back</button>\n                        <button mat-raised-button color='primary'\n                                [disabled]=\"clinicForm.invalid || isSaving\"\n                                type=\"submit\">\n                            {{entity.id !== undefined ? 'Update' : 'Save'}}\n                        </button>\n                    </mat-card-actions>\n                </mat-card-content>\n            </mat-card>\n        </form>\n    </div>\n</div>\n"
    }),
    __metadata("design:paramtypes", [ClinicService,
        NotificationService,
        ActivatedRoute,
        AppLoaderService])
], ClinicEditComponent);

let ClinicResolve = class ClinicResolve {
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
ClinicResolve.ctorParameters = () => [
    { type: ClinicService }
];
ClinicResolve = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ClinicService])
], ClinicResolve);
const ɵ0 = {
    title: 'Clinic Visit',
    breadcrumb: 'CLINIC VISIT'
}, ɵ1 = {
    authorities: ['ROLE_USER'],
    title: 'Clinic Visit',
    breadcrumb: 'CLINIC VISIT'
}, ɵ2 = {
    authorities: ['ROLE_DEC'],
    title: 'Clinic Visit',
    breadcrumb: 'ADD CLINIC VISIT'
}, ɵ3 = {
    authorities: ['ROLE_DEC'],
    title: 'ART Commencement /PrEP Initiation',
    breadcrumb: 'ADD ART COMMENCEMENT /PREP INITIATION',
    commence: true
}, ɵ4 = {
    authorities: ['ROLE_DEC'],
    title: 'Clinic Visit Edit',
    breadcrumb: 'CLINIC VISIT EDIT'
};
const ROUTES = [
    {
        path: '',
        data: ɵ0,
        children: [
            {
                path: ':id/patient/:patientId/view',
                component: ClinicDetailsComponent,
                resolve: {
                    entity: ClinicResolve
                },
                data: ɵ1,
            },
            {
                path: 'patient/:patientId/new',
                component: ClinicEditComponent,
                data: ɵ2,
            },
            {
                path: 'art-commencement/patient/:patientId/new',
                component: ClinicEditComponent,
                data: ɵ3,
            },
            {
                path: ':id/patient/:patientId/edit',
                component: ClinicEditComponent,
                resolve: {
                    entity: ClinicResolve
                },
                data: ɵ4,
            }
        ]
    }
];

let ClinicWidget = class ClinicWidget {
    constructor(clinicService) {
        this.clinicService = clinicService;
        this.properties = [];
    }
    ngOnInit() {
        this.clinicService.latestVisit(this.patientId).subscribe((res) => {
            this.clinic = res;
            this.buildProperties();
        });
    }
    buildProperties() {
        this.properties.push(new CardViewDateItemModel({
            key: 'dv',
            value: this.clinic.dateVisit,
            label: 'Last Clinic Visit',
            format: 'dd MMM, yyyy'
        }));
        this.properties.push(new CardViewDateItemModel({
            key: 'nv',
            value: this.clinic.nextAppointment,
            label: 'Next Clinic Visit',
            format: 'dd MMM, yyyy'
        }));
        this.properties.push(new CardViewTextItemModel({
            label: 'Functional Status',
            key: 'fs',
            value: this.clinic.funcStatus
        }));
        this.properties.push(new CardViewTextItemModel({
            label: 'Clinical Stage',
            key: 'cs',
            value: this.clinic.clinicStage
        }));
        this.properties.push(new CardViewTextItemModel({
            label: 'TB Status',
            key: 'ts',
            value: this.clinic.tbStatus
        }));
        this.properties.push(new CardViewFloatItemModel({
            label: 'Body Weight(Kg)',
            key: 'bw',
            value: this.clinic.bodyWeight
        }));
    }
};
ClinicWidget.ctorParameters = () => [
    { type: ClinicService }
];
__decorate([
    Input(),
    __metadata("design:type", Number)
], ClinicWidget.prototype, "patientId", void 0);
ClinicWidget = __decorate([
    Component({
        selector: 'clinic-widget',
        template: "<adf-card-view [properties]=\"properties\"></adf-card-view>\n"
    }),
    __metadata("design:paramtypes", [ClinicService])
], ClinicWidget);

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

let ClinicWidgetModule = class ClinicWidgetModule {
};
ClinicWidgetModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            MaterialModule,
            CoreModule
        ],
        declarations: [
            ClinicWidget
        ],
        entryComponents: [
            ClinicWidget
        ],
        exports: [
            ClinicWidget
        ],
        providers: []
    })
], ClinicWidgetModule);

let ClinicModule = class ClinicModule {
};
ClinicModule = __decorate([
    NgModule({
        declarations: [
            ClinicDetailsComponent,
            ClinicEditComponent
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
            CovalentMessageModule,
            CovalentDialogsModule,
            MatListModule,
            CoreModule,
            ClinicWidgetModule,
            FormsModule,
            ReactiveFormsModule,
            MatDateFormatModule,
            CustomFormsModule,
            LamisSharedModule,
            NgxDatatableModule,
        ],
        exports: [
            ClinicDetailsComponent,
            ClinicEditComponent
        ],
        entryComponents: [],
        providers: [
            ClinicResolve
        ]
    })
], ClinicModule);

const moment$3 = moment_;
let ChronicCareService = class ChronicCareService {
    constructor(http, serverUrl) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.resourceUrl = '';
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/chronic-cares';
    }
    create(chronicCare) {
        const copy = this.convertDateFromClient(chronicCare);
        return this.http
            .post(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res) => this.convertDateFromServer(res)));
    }
    update(chronicCare) {
        const copy = this.convertDateFromClient(chronicCare);
        return this.http
            .put(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res) => this.convertDateFromServer(res)));
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
    delete(id) {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
    getDmScreens() {
        return this.http.get(`${this.resourceUrl}/dm-screens`);
    }
    getTbScreens() {
        return this.http.get(`${this.resourceUrl}/tb-screens`);
    }
    getDmScreenByChronicCare(id) {
        return this.http.get(`${this.resourceUrl}/${id}/dm-screens`);
    }
    getTbScreenByChronicCare(id) {
        return this.http.get(`${this.resourceUrl}/${id}/tb-screens`);
    }
    getVisitDatesByPatient(patientId) {
        return this.http.get(`${this.resourceUrl}/patient/${patientId}/visit-dates`)
            .pipe(map((res) => {
            res.forEach(d => moment$3(d));
            return res;
        }));
    }
    convertDateFromServer(res) {
        if (res.body) {
            res.body.dateLastCd4 = res.body.dateLastCd4 != null ? moment$3(res.body.dateLastCd4) : null;
            res.body.dateVisit = res.body.dateVisit != null ? moment$3(res.body.dateVisit) : null;
            res.body.dateLastViralLoad = res.body.dateLastViralLoad != null ? moment$3(res.body.dateLastViralLoad) : null;
            res.body.dateStartedTbTreatment = res.body.dateStartedTbTreatment != null ? moment$3(res.body.dateStartedTbTreatment) : null;
        }
        return res;
    }
    convertDateFromClient(chronicCare) {
        chronicCare = Object.assign({}, chronicCare, {
            dateLastViralLoad: chronicCare.dateLastViralLoad != null && chronicCare.dateLastViralLoad.isValid() ?
                chronicCare.dateLastViralLoad.format(DATE_FORMAT) : null,
            dateVisit: chronicCare.dateVisit != null && chronicCare.dateVisit.isValid() ?
                chronicCare.dateVisit.format(DATE_FORMAT) : null,
            dateLastCd4: chronicCare.dateLastCd4 != null && chronicCare.dateLastCd4.isValid() ?
                chronicCare.dateLastCd4.format(DATE_FORMAT) : null,
            dateStartedTbTreatment: chronicCare.dateStartedTbTreatment != null &&
                chronicCare.dateStartedTbTreatment.isValid() ? chronicCare.dateStartedTbTreatment.format(DATE_FORMAT) : null
        });
        return chronicCare;
    }
};
ChronicCareService.ctorParameters = () => [
    { type: HttpClient },
    { type: undefined, decorators: [{ type: Inject, args: [SERVER_API_URL_CONFIG,] }] }
];
ChronicCareService.ngInjectableDef = ɵɵdefineInjectable({ factory: function ChronicCareService_Factory() { return new ChronicCareService(ɵɵinject(HttpClient), ɵɵinject(SERVER_API_URL_CONFIG)); }, token: ChronicCareService, providedIn: "root" });
ChronicCareService = __decorate([
    Injectable({ providedIn: 'root' }),
    __param(1, Inject(SERVER_API_URL_CONFIG)),
    __metadata("design:paramtypes", [HttpClient, Object])
], ChronicCareService);

let ChronicCareDetailComponent = class ChronicCareDetailComponent {
    constructor(router, route, chronicCareService, _dialogService, notificationService, clinicService) {
        this.router = router;
        this.route = route;
        this.chronicCareService = chronicCareService;
        this._dialogService = _dialogService;
        this.notificationService = notificationService;
        this.clinicService = clinicService;
        this.properties = [];
    }
    ngOnInit() {
        this.route.data.subscribe(({ entity }) => {
            this.entity = !!entity && entity.body ? entity.body : entity;
            const patientId = this.route.snapshot.paramMap.get('patientId');
            this.clinicService.getPatient(patientId).subscribe((res) => this.entity.patient = res);
            this.buildProperties();
        });
    }
    edit() {
        this.router.navigate(['/', 'chronic-cares', this.entity.uuid, 'patient', this.entity.patient.uuid, 'edit']);
    }
    delete() {
        this._dialogService.openConfirm({
            title: 'Confirm',
            message: 'Do you want to delete this chronic care visit, action cannot be reversed?',
            cancelButton: 'No',
            acceptButton: 'Yes',
            width: '500px',
        }).afterClosed().subscribe((accept) => {
            if (accept) {
                this.chronicCareService.delete(this.entity.id).subscribe((res) => {
                    if (res.ok) {
                        this.router.navigate(['patients']);
                    }
                    else {
                        this.notificationService.showError('Error deleting visit, please try again');
                    }
                });
            }
            else {
                // DO SOMETHING ELSE
            }
        });
    }
    buildProperties() {
    }
    previousState() {
        window.history.back();
    }
};
ChronicCareDetailComponent.ctorParameters = () => [
    { type: Router },
    { type: ActivatedRoute },
    { type: ChronicCareService },
    { type: TdDialogService },
    { type: NotificationService },
    { type: ClinicService }
];
ChronicCareDetailComponent = __decorate([
    Component({
        selector: 'chronic-care-detail',
        template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <mat-card>\n            <mat-card-header>\n            </mat-card-header>\n            <mat-card-content>\n                <adf-card-view [properties]=\"properties\" editable=\"false\"></adf-card-view>\n            </mat-card-content>\n            <mat-card-actions class=\"lamis-edit-form-actions\">\n                <button mat-button (click)=\"previousState()\">Back</button>\n                <button mat-raised-button color=\"warn\" (click)=\"delete()\">Delete</button>\n                <button mat-raised-button color=\"primary\" (click)=\"edit()\">Edit</button>\n            </mat-card-actions>\n        </mat-card>\n    </div>\n</div>\n"
    }),
    __metadata("design:paramtypes", [Router, ActivatedRoute, ChronicCareService,
        TdDialogService, NotificationService,
        ClinicService])
], ChronicCareDetailComponent);

const moment$4 = moment_;
let ChronicCareEditComponent = class ChronicCareEditComponent {
    constructor(clinicService, chronicCareService, notification, activatedRoute, appLoaderService) {
        this.clinicService = clinicService;
        this.chronicCareService = chronicCareService;
        this.notification = notification;
        this.activatedRoute = activatedRoute;
        this.appLoaderService = appLoaderService;
        this.today = moment$4();
        this.tbs = [];
        this.dms = [];
        this.visitDates = [];
        this.isSaving = false;
        this.bmi = '';
        this.bmiCalculated = '';
    }
    createEntity() {
        return {};
    }
    ngOnInit() {
        this.activatedRoute.data.subscribe(({ entity }) => {
            this.entity = !!entity && entity.body ? entity.body : entity;
            if (this.entity === undefined) {
                this.entity = this.createEntity();
            }
            const patientId = this.activatedRoute.snapshot.paramMap.get('patientId');
            this.clinicService.getPatient(patientId).subscribe((res) => {
                this.entity.patient = res;
                this.entity.facility = res.facility;
                this.chronicCareService.getVisitDatesByPatient(this.entity.patient.id).subscribe((res1) => {
                    this.visitDates = res1;
                });
            });
            this.calculateBmi();
        });
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
    calculateBmi() {
        if (this.entity.bodyWeight && this.entity.height) {
            const bmi = this.entity.bodyWeight / Math.pow(this.entity.height, 2);
            if (bmi < 18.5) {
                this.bmi = '<18.5 (Underweight)';
            }
            else if (bmi < 24.9) {
                this.bmi = '18.5 - 24.9 (Healthy)';
            }
            else if (bmi < 29.9) {
                this.bmi = '25.0 - 29.9 (Overweight)';
            }
            else if (bmi < 40) {
                this.bmi = '30 - 40 (Obesity)';
            }
            else {
                this.bmi = '>40 (Morbid Obesity)';
            }
            this.bmiCalculated = bmi.toFixed(1);
        }
        else {
            this.bmi = '';
        }
    }
    save() {
        // this.submitButton.disabled = true;
        // this.progressBar.mode = 'indeterminate';
        this.isSaving = true;
        this.appLoaderService.open('Saving chronic care visit..');
        if (this.entity.id !== undefined) {
            this.subscribeToSaveResponse(this.chronicCareService.update(this.entity));
        }
        else {
            this.subscribeToSaveResponse(this.chronicCareService.create(this.entity));
        }
    }
    subscribeToSaveResponse(result) {
        result.subscribe((res) => this.onSaveSuccess(res.body), (res) => {
            this.onSaveError();
            this.onError(res.message);
        });
    }
    onSaveSuccess(result) {
        this.appLoaderService.close();
        this.isSaving = false;
        this.notification.showInfo('Chronic Care visit successfully saved');
        this.previousState();
    }
    onSaveError() {
        this.isSaving = false;
        this.appLoaderService.close();
        // this.submitButton.disabled = true;
        this.notification.showError('Error occurred saving chronic care visit; try again');
        // this.progressBar.mode = 'determinate';
    }
    onError(errorMessage) {
        this.appLoaderService.close();
        this.notification.showError(errorMessage);
    }
};
ChronicCareEditComponent.ctorParameters = () => [
    { type: ClinicService },
    { type: ChronicCareService },
    { type: NotificationService },
    { type: ActivatedRoute },
    { type: AppLoaderService }
];
ChronicCareEditComponent = __decorate([
    Component({
        selector: 'chronic-care-edit',
        template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <form name=\"form\" role=\"form\" novalidate (ngSubmit)=\"save()\" #careForm=\"ngForm\">\n            <mat-card class=\"default\">\n                <mat-card-content>\n                    <mat-vertical-stepper #stepper *ngIf=\"entity.patient\">\n                        <mat-step>\n                            <ng-template matStepLabel>Details</ng-template>\n                            <div class=\"row\">\n                                <div class=\"col-md-6\">\n                                    <mat-form-field class=\"full-width\">\n                                        <input matInput [matDatepicker]=\"picker\"\n                                               placeholder=\"Date of Visit\"\n                                               [(ngModel)]=\"entity.dateVisit\"\n                                               #visit=\"ngModel\"\n                                               [matDatepickerFilter]=\"filterDates.bind(this)\"\n                                               [max]=\"today\"\n                                               [min]=\"entity.patient.dateRegistration\"\n                                               name=\"visit\"\n                                               required>\n                                        <mat-datepicker-toggle\n                                                matSuffix\n                                                [for]=\"picker\">\n                                        </mat-datepicker-toggle>\n                                        <mat-datepicker #picker></mat-datepicker>\n                                        <mat-error\n                                                *ngIf=\"visit.errors && (visit.dirty || visit.touched) && (visit.errors.required)\">\n                                            Date of Visit is required\n                                        </mat-error>\n                                        <mat-error\n                                                *ngIf=\"visit.errors && (visit.dirty || visit.touched) && (visit.errors.min)\">\n                                            Date of Visit cannot be before {{entity.patient.dateRegistration}}\n                                        </mat-error>\n                                        <mat-error\n                                                *ngIf=\"visit.errors && (visit.dirty || visit.touched) && (visit.errors.max)\">\n                                            Date of Visit cannot be in the future\n                                        </mat-error>\n                                    </mat-form-field>\n                                </div>\n                            </div>\n                            <div class=\"row \">\n                                <div class=\"col-md-6\">\n                                    <mat-form-field class=\"full-width\">\n                                        <mat-label class=\"form-label\">Type of Client:</mat-label>\n                                        <mat-select name=\"clinicType\" [(ngModel)]=\"entity.clientType\" name=\"type\">\n                                            <mat-option></mat-option>\n                                            <mat-option [value]=\"'PLHIV newly enrolled into HIV Care & treatment'\">PLHIV\n                                                newly enrolled into HIV Care & treatment\n                                            </mat-option>\n                                            <mat-option [value]=\"'Registered PLHIV on first time visit this FY'\">\n                                                Registered PLHIV on first time visit this FY\n                                            </mat-option>\n                                            <mat-option\n                                                    [value]=\"'Registered PLHIV on follow up/subsequent visit this FY'\">\n                                                Registered PLHIV on follow up/subsequent visit this FY\n                                            </mat-option>\n                                        </mat-select>\n                                    </mat-form-field>\n                                </div>\n                                <div class=\"col-md-6\">\n                                    <mat-form-field class=\"full-width\">\n                                        <mat-label class=\"form-label\">ART Status</mat-label>\n                                        <mat-select name=\"currentStatus\" [(ngModel)]=\"entity.currentStatus\"\n                                                    name=\"status\">\n                                            <mat-option></mat-option>\n                                            <mat-option [value]=\"'Pre-ART'\">Pre-ART</mat-option>\n                                            <mat-option [value]=\"'ART'\">ART</mat-option>\n                                        </mat-select>\n                                    </mat-form-field>\n                                </div>\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col-md-6\" *ngIf=\"entity.patient.gender === 'Female'\">\n                                    <mat-form-field class=\"full-width\">\n                                        <mat-label class=\"form-label\">Pregnancy Status:</mat-label>\n                                        <mat-select name=\"pregnancyStatus\" [(ngModel)]=\"entity.pregnancyStatus\"\n                                                    name=\"preg\">\n                                            <mat-option></mat-option>\n                                            <mat-option [value]=\"'Pregnant'\">Pregnant</mat-option>\n                                            <mat-option [value]=\"'Non-Pregnant'\">Non-Pregnant</mat-option>\n                                            <mat-option [value]=\"'Post Partum'\">Post Partum</mat-option>\n                                        </mat-select>\n                                    </mat-form-field>\n                                </div>\n                                <div class=\"col-md-6\">\n                                    <mat-form-field class=\"full-width\">\n                                        <mat-label class=\"form-label\">Clinical Stage:</mat-label>\n                                        <mat-select name=\"clinicStage\" [(ngModel)]=\"entity.clinicStage\" name=\"stage\">\n                                            <mat-option></mat-option>\n                                            <mat-option [value]=\"'Stage I'\">Stage I</mat-option>\n                                            <mat-option [value]=\"'Stage II'\">Stage II</mat-option>\n                                            <mat-option [value]=\"'Stage III'\">Stage III</mat-option>\n                                            <mat-option [value]=\"'Stage IV'\">Stage IV</mat-option>\n                                        </mat-select>\n                                    </mat-form-field>\n                                </div>\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col-md-6\">\n                                    <mat-form-field class=\"full-width\">\n                                        <mat-label class=\"form-label\">Last CD4 Count:</mat-label>\n                                        <input matInput type=\"number\" name=\"lastCd4\"\n                                               #lastCd4=\"ngModel\"\n                                               [(ngModel)]=\"entity.lastCd4\"\n                                               [required]=\"!!entity.dateLastCd4\"\n                                               [min]=\"1\"/>\n                                        <mat-error\n                                                *ngIf=\"lastCd4.errors && (lastCd4.dirty || lastCd4.touched) && (lastCd4.errors.min)\">\n                                            Minimum value is 1\n                                        </mat-error>\n                                    </mat-form-field>\n                                </div>\n                                <div class=\"col-md-6\">\n                                    <mat-form-field class=\"full-width\">\n                                        <input matInput [matDatepicker]=\"picker1\"\n                                               placeholder=\"Date of Last CD4\"\n                                               [(ngModel)]=\"entity.dateLastCd4\"\n                                               [required]=\"!!entity.lastCd4\"\n                                               #cd4=\"ngModel\"\n                                               name=\"cd4\"\n                                               [max]=\"today\"\n                                               [min]=\"entity.patient.dateRegistration\">\n                                        <mat-datepicker-toggle\n                                                matSuffix\n                                                [for]=\"picker1\">\n                                        </mat-datepicker-toggle>\n                                        <mat-datepicker #picker1></mat-datepicker>\n                                    </mat-form-field>\n                                </div>\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col-md-6\">\n                                    <mat-form-field class=\"full-width\">\n                                        <mat-label class=\"form-label\">Last Viral Load Count:</mat-label>\n                                        <input matInput type=\"number\" name=\"lastViral\"\n                                               #lastViral=\"ngModel\"\n                                               [(ngModel)]=\"entity.lastViralLoad\"\n                                               [required]=\"!!entity.dateLastViralLoad\"\n                                               [min]=\"1\"/>\n                                        <mat-error\n                                                *ngIf=\"lastViral.errors && (lastViral.dirty || lastViral.touched) && (lastViral.errors.min)\">\n                                            Minimum value is 1\n                                        </mat-error>\n                                    </mat-form-field>\n                                </div>\n                                <div class=\"col-md-6\">\n                                    <mat-form-field class=\"full-width\">\n                                        <input matInput [matDatepicker]=\"picker2\"\n                                               placeholder=\"Date of Last Viral Load\"\n                                               [(ngModel)]=\"entity.dateLastViralLoad\"\n                                               [required]=\"!!entity.lastViralLoad\"\n                                               #viral=\"ngModel\"\n                                               name=\"viral\"\n                                               [max]=\"today\"\n                                               [min]=\"entity.patient.dateRegistration\">\n                                        <mat-datepicker-toggle\n                                                matSuffix\n                                                [for]=\"picker2\">\n                                        </mat-datepicker-toggle>\n                                        <mat-datepicker #picker2></mat-datepicker>\n                                    </mat-form-field>\n                                </div>\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col-md-6\">\n                                    <mat-checkbox [(ngModel)]=\"entity.eligibleCd4\" name=\"cd\">\n                                        Eligible for CD4\n                                    </mat-checkbox>\n                                </div>\n                                <div class=\"col-md-6\">\n                                    <mat-checkbox [(ngModel)]=\"entity.eligibleViralLoad\"\n                                                  name=\"vr\">\n                                        Eligible for Viral Load\n                                    </mat-checkbox>\n                                </div>\n                            </div>\n                            <div>\n                                <button mat-button type=\"button\" matStepperNext>Next</button>\n                            </div>\n                        </mat-step>\n                        <mat-step>\n                            <ng-template matStepLabel>Co-trimoxazole Eligibility Assessment</ng-template>\n                            <div class=\"row\">\n                                <div class=\"col-md-6\">\n                                    <mat-list>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.plhivSymtomaticHiv\"\n                                                          name=\"symt\"\n                                            >\n                                                PLHIV with symptomatic HIV\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.plhivAsymtomaticCD4L500\"\n                                                          name=\"sdym\"\n                                            >\n                                                Asymptomatic PLHIV with CD4 count &lt;500 cells/mm<sup>3</sup>\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.plhivActiveTb\"\n                                                          name=\"activeTb\"\n                                            >\n                                                PLHIV with active TB\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item *ngIf=\"entity.patient.gender === 'Female'\">\n                                            <mat-checkbox [(ngModel)]=\"entity.plhivPregnantAfter1stTrimester\"\n                                                          name=\"ftm\"\n                                            >\n                                                Pregnant PLHIV after the first trimester\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.plhivL5Years\"\n                                                          name=\"l5\"\n                                            >\n                                                LHIV &le; 5 years\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                    </mat-list>\n                                </div>\n                            </div>\n                            <div>\n                                <button mat-button type=\"button\" matStepperPrevious>Back</button>\n                                <button mat-button type=\"button\" matStepperNext>Next</button>\n                            </div>\n                        </mat-step>\n                        <mat-step>\n                            <ng-template matStepLabel>TB Screening</ng-template>\n                            <div class=\"row \">\n                                <div class=\"col-md-6\">\n                                    <mat-checkbox [(ngModel)]=\"entity.tbTreatment\"\n                                                  name=\"tbTreatment\">\n                                        Are you currently on TB Treatment?\n                                    </mat-checkbox>\n                                    <div>\n                                    </div>\n                                </div>\n                                <div class=\"col-md-6\">\n                                    <mat-form-field class=\"full-width\">\n                                        <input matInput [matDatepicker]=\"picker3\"\n                                               placeholder=\"Date Started\"\n                                               [(ngModel)]=\"entity.dateStartedTbTreatment\"\n                                               [required]=\"entity.tbTreatment\"\n                                               #started=\"ngModel\"\n                                               name=\"started\"\n                                               [max]=\"today\"\n                                               [min]=\"entity.patient.dateRegistration\">\n                                        <mat-datepicker-toggle\n                                                matSuffix\n                                                [for]=\"picker3\">\n                                        </mat-datepicker-toggle>\n                                        <mat-datepicker #picker3></mat-datepicker>\n                                    </mat-form-field>\n                                </div>\n                            </div>\n                            <div class=\"row \">\n                                <div class=\"col-md-6\">\n                                    <mat-list>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.tbReferred\"\n                                                          name=\"tbReferred\">\n                                                Referred for TB Diagnosis\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.ipt\"\n                                                          name=\"ipt\"\n                                            >\n                                                Are you currently on Isoniazid Preventive Therapy (IPT)?\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.inh\"\n                                                          name=\"inh\"\n                                            >\n                                                Have you received INH within the past 2 year?\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.eligibleIpt\"\n                                                          name=\"iptEl\"\n                                            >\n                                                Eligible for IPT\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                    </mat-list>\n                                </div>\n                            </div>\n                        </mat-step>\n                        <mat-step>\n                            <ng-template matStepLabel>Nutritional Assessment</ng-template>\n                            <div class=\"row\">\n                                <div class=\"col-md-3\">\n                                    <mat-form-field class=\"full-width\">\n                                        <input matInput placeholder=\"Body weight(Kg)\" [min]=\"1\" [max]=\"250\"\n                                               type=\"number\"\n                                               (change)=\"calculateBmi()\"\n                                               #weight=\"ngModel\" name=\"weight\" [(ngModel)]=\"entity.bodyWeight\"/>\n                                        <mat-error\n                                                *ngIf=\"weight.errors && (weight.dirty || weight.touched) && (weight.errors.min)\">\n                                            Minimum body weight is 1\n                                        </mat-error>\n                                        <mat-error\n                                                *ngIf=\"weight.errors && (weight.dirty || weight.touched) && (weight.errors.max)\">\n                                            Maximum body weight is 250\n                                        </mat-error>\n                                    </mat-form-field>\n                                </div>\n                                <div class=\"col-md-3\">\n                                    <mat-form-field class=\"full-width\">\n                                        <input matInput placeholder=\"Height (m)\" [min]=\"0.2\" [max]=\"1.8\" type=\"number\"\n                                               #height=\"ngModel\" name=\"height\" [(ngModel)]=\"entity.height\"\n                                               (change)=\"calculateBmi()\"/>\n                                        <mat-error\n                                                *ngIf=\"height.errors && (height.dirty || height.touched) && (height.errors.min)\">\n                                            Minimum height is 0.2\n                                        </mat-error>\n                                        <mat-error\n                                                *ngIf=\"height.errors && (height.dirty || height.touched) && (height.errors.max)\">\n                                            Maximum height is 1.8m\n                                        </mat-error>\n                                    </mat-form-field>\n                                </div>\n                                <div class=\"col-md-3\">\n                                    <mat-form-field class=\"full-width\">\n                                        <mat-label>BMI Calculated</mat-label>\n                                        <input matInput disabled [value]=\"bmiCalculated\">\n                                    </mat-form-field>\n                                </div>\n                                <div class=\"col-md-3\">\n                                    <mat-form-field class=\"full-width\">\n                                        <mat-label>BMI Range</mat-label>\n                                        <input matInput disabled [value]=\"bmi\">\n                                    </mat-form-field>\n                                </div>\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col-md-4\">\n                                    <mat-form-field class=\"full-width\">\n                                        <mat-label> MUAC (cm) (under 5yrs):</mat-label>\n                                        <input matInput [min]=\"2\" [max]=\"26.5\"\n                                               type=\"number\"\n                                               #muac=\"ngModel\" name=\"muac\" [(ngModel)]=\"entity.muac\"/>\n                                        <mat-error\n                                                *ngIf=\"muac.errors && (muac.dirty || muac.touched) && (muac.errors.min)\">\n                                            Minimum Mid Upper Arm Circumference is 2\n                                        </mat-error>\n                                        <mat-error\n                                                *ngIf=\"muac.errors && (muac.dirty || muac.touched) && (muac.errors.max)\">\n                                            Maximum Mid Upper Arm Circumference is 26.5\n                                        </mat-error>\n                                    </mat-form-field>\n                                </div>\n                                <div class=\"col-md-4\">\n                                    <mat-form-field class=\"full-width\">\n                                        <mat-label>UAC Pediatrics</mat-label>\n                                        <mat-select name=\"muacPediatrics\"\n                                                    [(ngModel)]=\"entity.muacPediatrics\">\n                                            <mat-option></mat-option>\n                                            <mat-option [value]=\"'<11.5cm (Severe Acute Malnutrition)'\">&lt;11.5cm\n                                                (Severe Acute Malnutrition)\n                                            </mat-option>\n                                            <mat-option [value]=\"'11.5-12.5cm (Moderate Acute Malnutrition)'\">\n                                                11.5-12.5cm (Moderate Acute Malnutrition)\n                                            </mat-option>\n                                            <mat-option [value]=\"'>12.5cm (Well nourished)'\">&gt;12.5cm (Well\n                                                nourished)\n                                            </mat-option>\n                                        </mat-select>\n                                    </mat-form-field>\n                                </div>\n                                <div class=\"col-md-4\" *ngIf=\"entity.patient.gender === 'Female'\">\n                                    <mat-form-field class=\"full-width\">\n                                        <mat-label>MUAC Pregnant:</mat-label>\n                                        <mat-select name=\"muacPregnant\" [(ngModel)]=\"entity.muacPregnant\">\n                                            <mat-option></mat-option>\n                                            <mat-option [value]=\"'<23cm (Underweight)'\">&lt;23cm (Underweight)\n                                            </mat-option>\n                                        </mat-select>\n                                    </mat-form-field>\n                                </div>\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col-md-6\">\n                                    <mat-list>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.supplementaryFood\"\n                                                          name=\"supp\"\n                                            >\n                                                Provided with Therapeutic/Supplementary\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.nutritionalStatusReferred\"\n                                                          name=\"nutr\"\n                                            >\n                                                Referred\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                    </mat-list>\n                                </div>\n                            </div>\n                            <div>\n                                <button mat-button type=\"button\" matStepperPrevious>Back</button>\n                                <button mat-button type=\"button\" matStepperNext>Next</button>\n                            </div>\n                        </mat-step>\n                        <mat-step>\n                            <ng-template matStepLabel>Gender Based Violence Screening</ng-template>\n                            <div class=\"row\">\n                                <div class=\"col-md-6\">\n                                    <mat-list>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.sexuallyAbused\"\n                                                          name=\"sexuallyAbused\"\n                                            >\n                                                Have you been beaten, sexually coerced, raped or threatened or any of\n                                                these by your partner or anyone else?\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.sexuallyAbusedReferred\"\n                                                          *ngIf=\"entity.sexuallyAbused\"\n                                                          name=\"sexuallyAbusedReferred\"\n                                            >\n                                                Referred for Post GBV Care\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.essentialsDeniedByPartner\"\n                                                          name=\"denied\"\n                                            >\n                                                Does your partner/family deny you food, shelter, freedom of movement,\n                                                livelihood or finance to access health care?\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.essentialsDeniedByPartnerReferred\"\n                                                          *ngIf=\"entity.essentialsDeniedByPartner\"\n                                                          name=\"deniedReferred\"\n                                            >\n                                                Referred for Post GBV Care\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                    </mat-list>\n                                </div>\n                            </div>\n                            <div>\n                                <button mat-button type=\"button\" matStepperPrevious>Back</button>\n                                <button mat-button type=\"button\" matStepperNext>Next</button>\n                            </div>\n                        </mat-step>\n                        <mat-step>\n                            <ng-template matStepLabel>Screening for Chronic Conditions</ng-template>\n                            <div class=\"row\">\n                                <div class=\"col-md-6\">\n                                    <mat-checkbox [(ngModel)]=\"entity.hypertensive\"\n                                                  name=\"hyper\"\n                                    >\n                                        Known Hypertensive?\n                                    </mat-checkbox>\n                                </div>\n                                <div class=\"col-md-6\">\n                                    <mat-checkbox [(ngModel)]=\"entity.firstHypertensive\"\n                                                  *ngIf=\"entity.hypertensive\"\n                                                  name=\"hyper1s\"\n                                    >\n                                        First time identified within the programme\n                                    </mat-checkbox>\n                                </div>\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col-md-6\">\n                                    <mat-checkbox [(ngModel)]=\"entity.bpAbove14090\"\n                                                  name=\"bpAbove\"\n                                    >\n                                        BP above 140/90mmHg\n                                    </mat-checkbox>\n                                </div>\n                                <div class=\"col-md-6\">\n                                    <mat-checkbox [(ngModel)]=\"entity.bpReferred\"\n                                                  *ngIf=\"entity.bpAbove14090\"\n                                                  name=\"bpReferred\"\n                                    >\n                                        Referred for further care\n                                    </mat-checkbox>\n                                </div>\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col-md-6\">\n                                    <mat-checkbox [(ngModel)]=\"entity.diabetic\"\n                                                  name=\"diabetic\"\n                                    >\n                                        Known Diabetic?\n                                    </mat-checkbox>\n                                </div>\n                                <div class=\"col-md-6\">\n                                    <mat-checkbox [(ngModel)]=\"entity.firstDiabetic\"\n                                                  *ngIf=\"entity.diabetic\"\n                                                  name=\"diabetic1st\"\n                                    >\n                                        First Time Identified Within the Programme?\n                                    </mat-checkbox>\n                                </div>\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col-md-6\">\n                                </div>\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col-md-6\">\n                                    <mat-checkbox [(ngModel)]=\"entity.dmReferred\"\n                                                  name=\"dm\"\n                                    >\n                                        Referred for further care\n                                    </mat-checkbox>\n                                </div>\n                            </div>\n                            <div>\n                                <button mat-button type=\"button\" matStepperPrevious>Back</button>\n                                <button mat-button type=\"button\" matStepperNext>Next</button>\n                            </div>\n                        </mat-step>\n                        <mat-step>\n                            <ng-template matStepLabel>Positive Health Dignity and Prevention(PHDP)</ng-template>\n                            <h5>A)Prevent HIV Transmission</h5>\n                            <div class=\"row\">\n                                <div class=\"col-md-6\">\n                                    <mat-form-field class=\"full-width\">\n                                        <mat-label>How many doses of ARVs have you missed since the last appointment?(If\n                                            on ART)\n                                        </mat-label>\n                                        <mat-select name=\"missed1\" [(ngModel)]=\"entity.missedArvs\">\n                                            <mat-option></mat-option>\n                                            <mat-option [value]=\"'<=3'\">&le;3</mat-option>\n                                            <mat-option [value]=\"'4-8'\">4-8</mat-option>\n                                            <mat-option [value]=\"'>=9'\">&ge;9</mat-option>\n                                        </mat-select>\n                                    </mat-form-field>\n                                </div>\n                                <mat-list>\n                                    <mat-list-item>\n                                        <mat-checkbox [(ngModel)]=\"entity.missedArvsServicesProvided\"\n                                                      name=\"missed1Referred\"\n                                        >\n                                            Medication adherence counselling done?\n                                        </mat-checkbox>\n                                    </mat-list-item>\n                                    <mat-list-item>\n                                        <mat-checkbox [(ngModel)]=\"entity.statusDisclosedToPartner\"\n                                                      name=\"sdtp\"\n                                        >\n                                            Have you disclosed your status to your partner(s)?\n                                        </mat-checkbox>\n                                    </mat-list-item>\n                                    >\n                                    <mat-list-item>\n                                        <mat-checkbox [(ngModel)]=\"entity.partnerStatusKnown\"\n                                                      name=\"psk\"\n                                        >\n                                            Do you know the status of your partner(s)?\n                                        </mat-checkbox>\n                                    </mat-list-item>\n                                    <mat-list-item>\n                                        <mat-checkbox [(ngModel)]=\"entity.useCondomsAlways\"\n                                                      name=\"uca\"\n                                        >\n                                            Do you use condoms during every sexual encounter?\n                                        </mat-checkbox>\n                                    </mat-list-item>\n                                    <mat-list-item>\n                                        <mat-checkbox [(ngModel)]=\"entity.useCondomsAlwaysServicesProvided\"\n                                                      name=\"ucasp\"\n                                        >\n                                            Condom use counselling done?\n                                        </mat-checkbox>\n                                    </mat-list-item>\n                                </mat-list>\n                            </div>\n                            <mat-divider class=\"pb-1\"></mat-divider>\n                            <h5>B)Prevent Diseases/Opportunistic Infections</h5>\n                            <div class=\"row\">\n                                <div class=\"col-md-6\">\n                                    <mat-checkbox [(ngModel)]=\"entity.opportunisticInfections\"\n                                                  name=\"oi\"\n                                    >\n                                        Do you/partner have genital sores/rash/pain/discharge/bleeding?\n                                    </mat-checkbox>\n                                </div>\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col-md-6\">\n                                    <mat-form-field class=\"full-width\">\n                                        <mat-label>How many doses of Co-trimoxazole have you missed since the last\n                                            appointment?\n                                        </mat-label>\n                                        <input matInput type=\"number\" [(ngModel)]=\"entity.missedCotrim\" [min]=\"1\"\n                                               #missed=\"ngModel\"\n                                               name=\"missed\"/>\n                                        <mat-error\n                                                *ngIf=\"missed.errors && (missed.dirty || missed.touched) && (missed.errors.min)\">\n                                            Minimum value is 1\n                                        </mat-error>\n                                    </mat-form-field>\n                                </div>\n                            </div>\n                            <mat-divider class=\"pb-1\"></mat-divider>\n                            <h5>C)Promote Healthy Living</h5>\n                            <div class=\"row\">\n                                <div class=\"col-md-6\">\n                                    <mat-form-field class=\"full-width\">\n                                        <mat-label>How regularly do you take alcohol in a week?</mat-label>\n                                        <input matInput type=\"number\" [(ngModel)]=\"entity.weeklyAlcoholConsumption\"\n                                               [min]=\"1\" #alcohol=\"ngModel\"\n                                               name=\"alcohol\"/>\n                                        <mat-error\n                                                *ngIf=\"alcohol.errors && (alcohol.dirty || alcohol.touched) && (alcohol.errors.min)\">\n                                            Minimum value is 1\n                                        </mat-error>\n                                    </mat-form-field>\n                                    <mat-list>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.weeklyAlcoholConsumptionServicesProvided\"\n                                                          name=\"alcolR\"\n                                            >\n                                                Nutritional counseling done?\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.washServicesProvided\"\n                                                          name=\"wash\"\n                                            >\n                                                WASH counseling done?\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                    </mat-list>\n                                </div>\n                            </div>\n                            <mat-divider class=\"pb-1\"></mat-divider>\n                            <h5>Additional PHDP Services provided</h5>\n                            <div class=\"row\">\n                                <div class=\"col-md-6\">\n                                    <mat-list>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.useInsecticideNets\"\n                                                          name=\"uin\"\n                                            >\n                                                Insecticide treated nets\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item *ngIf=\"entity.patient.gender === 'Female'\">\n                                            <mat-checkbox [(ngModel)]=\"entity.cervicalCancerScreening\"\n                                                          name=\"ccs\"\n                                            >\n                                                Cervical Cancer Screening\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.activeMemberOfSG\"\n                                                          name=\"amsg\"\n                                            >\n                                                Active member of SG\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.familyPlanning\"\n                                                          name=\"fp\"\n                                            >\n                                                Family Planning\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.basicCareKits\"\n                                                          name=\"bck\"\n                                            >\n                                                Basic care kits\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.disclosureCounseling\"\n                                                          name=\"dc\"\n                                            >\n                                                Disclosure counseling\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.socialServices\"\n                                                          name=\"sc\"\n                                            >\n                                                Social Services\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.linkageToIGA\"\n                                                          name=\"liga\"\n                                            >\n                                                Linkage to IGAs\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.legalServices\"\n                                                          name=\"ls\"\n                                            >\n                                                Legal Services\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.otherServices\"\n                                                          name=\"ots\"\n                                            >\n                                                Others\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                    </mat-list>\n                                </div>\n                            </div>\n                            <div>\n                                <button mat-button type=\"button\" matStepperPrevious>Back</button>\n                                <button mat-button type=\"button\" matStepperNext>Next</button>\n                            </div>\n                        </mat-step>\n                        <mat-step>\n                            <ng-template matStepLabel>Reproductive Intentions</ng-template>\n                            <div class=\"row \">\n                                <div class=\"col-md-6\">\n                                    <mat-list>\n                                        <mat-list-item *ngIf=\"entity.patient.gender === 'Female'\">\n                                            <mat-checkbox [(ngModel)]=\"entity.cervicalCancerScreeningWithinPastYear\"\n                                                          name=\"ccswpy\"\n                                            >\n                                                Have you been screened for cervical cancer in the last one year?\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item *ngIf=\"entity.patient.gender === 'Female'\">\n                                            <mat-checkbox\n                                                    [(ngModel)]=\"entity.cervicalCancerScreeningWithinPastYearReferred\"\n                                                    name=\"ccswpyr\"\n                                            >\n                                                Referred for further care\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item *ngIf=\"entity.patient.gender === 'Female'\">\n                                            <mat-checkbox [(ngModel)]=\"entity.wantPregnancyWithinAYear\"\n                                                          name=\"wpwy\"\n                                            >\n                                                Do you want a pregnancy in the next one year?\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item *ngIf=\"entity.patient.gender === 'Female'\">\n                                            <mat-checkbox [(ngModel)]=\"entity.wantPregnancyWithinAYearReferred\"\n                                                          name=\"wpwar\"\n                                            >\n                                                Referred for further care?\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.currentlyUsingContraceptive\"\n                                                          name=\"cuc\"\n                                            >\n                                                If no, are you currently using a contraceptive?\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.currentlyUsingContraceptiveReferred\"\n                                                          name=\"cucr\"\n                                            >\n                                                Referred for further care?\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                    </mat-list>\n                                    <mat-divider class=\"pb-1\"></mat-divider>\n                                    <h5>Malaria Prevention</h5>\n                                    <mat-list>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.useInsecticideBedNet\"\n                                                          name=\"uibn\"\n                                            >\n                                                Do you use insecticide treated bed net?\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.useInsecticideBedNetReferred\"\n                                                          name=\"uibnr\"\n                                            >\n                                                Referred?\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item *ngIf=\"entity.patient.gender === 'Female'\">\n                                            <mat-checkbox [(ngModel)]=\"entity.pregnantIntermittentPreventiveTherapy\"\n                                                          name=\"pipt\"\n                                            >\n                                                If pregnant: have you been on intermittent preventive therapy?\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item *ngIf=\"entity.patient.gender === 'Female'\">\n                                            <mat-checkbox\n                                                    [(ngModel)]=\"entity.pregnantIntermittentPreventiveTherapyReferred\"\n                                                    name=\"piptr\"\n                                            >\n                                                Referred\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                    </mat-list>\n                                </div>\n                            </div>\n                            <div>\n                                <button mat-button type=\"button\" matStepperPrevious>Back</button>\n                            </div>\n                        </mat-step>\n                    </mat-vertical-stepper>\n                    <mat-divider></mat-divider>\n                </mat-card-content>\n                <mat-card-actions class=\"lamis-edit-form-actions\">\n                    <button mat-raised-button type=\"button\" (click)=\"previousState()\">Back</button>\n                    <button mat-raised-button color='primary'\n                            [disabled]=\"careForm.invalid || isSaving\"\n                            type=\"submit\">\n                        {{entity.id !== undefined ? 'Update' : 'Save'}}\n                    </button>\n                </mat-card-actions>\n            </mat-card>\n        </form>\n    </div>\n</div>\n"
    }),
    __metadata("design:paramtypes", [ClinicService,
        ChronicCareService,
        NotificationService,
        ActivatedRoute,
        AppLoaderService])
], ChronicCareEditComponent);

let ChronicCareResolve = class ChronicCareResolve {
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
ChronicCareResolve.ctorParameters = () => [
    { type: ChronicCareService }
];
ChronicCareResolve = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ChronicCareService])
], ChronicCareResolve);
const ɵ0$1 = {
    title: 'Chronic Care Visit',
    breadcrumb: 'CHRONIC CARE VISIT'
}, ɵ1$1 = {
    authorities: ['ROLE_USER'],
    title: 'Chronic Care Visit',
    breadcrumb: 'CHRONIC CARE VISIT'
}, ɵ2$1 = {
    authorities: ['ROLE_DEC'],
    title: 'Chronic Care Visit',
    breadcrumb: 'ADD CHRONIC CARE VISIT'
}, ɵ3$1 = {
    authorities: ['ROLE_DEC'],
    title: 'Chronic Care Visit Edit',
    breadcrumb: 'CHRONIC CARE VISIT EDIT'
};
const ROUTES$1 = [
    {
        path: '',
        data: ɵ0$1,
        children: [
            {
                path: ':id/patient/:patientId/view',
                component: ChronicCareDetailComponent,
                resolve: {
                    entity: ChronicCareResolve
                },
                data: ɵ1$1,
            },
            {
                path: 'patient/:patientId/new',
                component: ChronicCareEditComponent,
                data: ɵ2$1,
            },
            {
                path: ':id/patient/:patientId/edit',
                component: ChronicCareEditComponent,
                resolve: {
                    entity: ChronicCareResolve
                },
                data: ɵ3$1,
            }
        ]
    }
];

let ChronicCareModule = class ChronicCareModule {
};
ChronicCareModule = __decorate([
    NgModule({
        declarations: [
            ChronicCareDetailComponent,
            ChronicCareEditComponent
        ],
        imports: [
            CommonModule,
            CovalentDialogsModule,
            FormsModule,
            ReactiveFormsModule,
            LamisSharedModule,
            MaterialModule,
            CoreModule,
            CustomFormsModule,
            MatDateFormatModule,
            RouterModule.forChild(ROUTES$1),
            MatStepperModule
        ],
        providers: [
            ChronicCareResolve
        ]
    })
], ChronicCareModule);

const moment$5 = moment_;
let EacService = class EacService {
    constructor(http, serverUrl) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.resourceUrl = '';
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/eacs';
    }
    create(eac) {
        const copy = this.convertDateFromClient(eac);
        return this.http
            .post(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res) => this.convertDateFromServer(res)));
    }
    update(eac) {
        const copy = this.convertDateFromClient(eac);
        return this.http
            .put(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res) => this.convertDateFromServer(res)));
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
    delete(id) {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
    getLatestByPatient(uuid) {
        return this.http
            .get(`${this.resourceUrl}/patient/${uuid}`, { observe: 'response' })
            .pipe(map((res) => this.convertDateFromServer(res)));
    }
    getLatestViralLoadByPatient(id, at) {
        const date = at.format(DATE_FORMAT);
        return this.http
            .get(`${this.resourceUrl}/patient/${id}/viral-load-result/at/${date}`, { observe: 'response' })
            .pipe(map((res) => {
            if (res.body) {
                res.body.laboratory.dateReported = res.body.laboratory.dateReported != null ?
                    moment$5(res.body.laboratory.dateReported) : null;
            }
            return res;
        }));
    }
    convertDateFromClient(eac) {
        const copy = Object.assign({}, eac, {
            dateEac1: eac.dateEac1 != null && eac.dateEac1.isValid() ? eac.dateEac1.format(DATE_FORMAT) : null,
            dateEac2: eac.dateEac2 != null && eac.dateEac2.isValid() ? eac.dateEac2.format(DATE_FORMAT) : null,
            dateEac3: eac.dateEac3 != null && eac.dateEac3.isValid() ? eac.dateEac3.format(DATE_FORMAT) : null,
            dateSampleCollected: eac.dateSampleCollected != null && eac.dateSampleCollected.isValid() ? eac.dateSampleCollected.format(DATE_FORMAT) : null,
            dateLastViralLoad: eac.dateLastViralLoad != null && eac.dateLastViralLoad.isValid() ? eac.dateLastViralLoad.format(DATE_FORMAT) : null,
        });
        return copy;
    }
    convertDateFromServer(res) {
        if (res.body) {
            res.body.dateLastViralLoad = res.body.dateLastViralLoad != null ? moment$5(res.body.dateLastViralLoad) : null;
            res.body.dateEac1 = res.body.dateEac1 != null ? moment$5(res.body.dateEac1) : null;
            res.body.dateEac2 = res.body.dateEac2 != null ? moment$5(res.body.dateEac2) : null;
            res.body.dateEac3 = res.body.dateEac3 != null ? moment$5(res.body.dateEac3) : null;
            res.body.dateSampleCollected = res.body.dateSampleCollected != null ? moment$5(res.body.dateSampleCollected) : null;
        }
        return res;
    }
};
EacService.ctorParameters = () => [
    { type: HttpClient },
    { type: undefined, decorators: [{ type: Inject, args: [SERVER_API_URL_CONFIG,] }] }
];
EacService.ngInjectableDef = ɵɵdefineInjectable({ factory: function EacService_Factory() { return new EacService(ɵɵinject(HttpClient), ɵɵinject(SERVER_API_URL_CONFIG)); }, token: EacService, providedIn: "root" });
EacService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __param(1, Inject(SERVER_API_URL_CONFIG)),
    __metadata("design:paramtypes", [HttpClient, Object])
], EacService);

let EacDetailsComponent = class EacDetailsComponent {
    constructor(router, route, _dialogService, notificationService, eacService) {
        this.router = router;
        this.route = route;
        this._dialogService = _dialogService;
        this.notificationService = notificationService;
        this.eacService = eacService;
        this.properties = [];
    }
    ngOnInit() {
        this.route.data.subscribe(({ entity }) => {
            this.entity = !!entity && entity.body ? entity.body : entity;
            this.buildProperties();
        });
    }
    edit() {
        this.router.navigate(['/', 'eacs', this.entity.uuid, 'patient', this.entity.patient.uuid, 'edit']);
    }
    delete() {
        this._dialogService.openConfirm({
            title: 'Confirm',
            message: 'Do you want to delete this EAC Record, action cannot be reversed?',
            cancelButton: 'No',
            acceptButton: 'Yes',
            width: '500px',
        }).afterClosed().subscribe((accept) => {
            if (accept) {
                this.eacService.delete(this.entity.id).subscribe((res) => {
                    if (res.ok) {
                        this.router.navigate(['patients']);
                    }
                    else {
                        this.notificationService.showError('Error deleting visit, please try again');
                    }
                });
            }
            else {
                // DO SOMETHING ELSE
            }
        });
    }
    buildProperties() {
        this.properties.push(new CardViewDateItemModel({
            key: 'ds',
            value: this.entity.dateLastViralLoad,
            label: 'Date Last Viral Load',
            format: 'dd MMM, yyyy'
        }));
        this.properties.push(new CardViewTextItemModel({
            key: 'vl',
            value: this.entity.lastViralLoad,
            label: 'Last Viral Load'
        }));
        this.properties.push(new CardViewDateItemModel({
            key: 'ds',
            value: this.entity.dateEac1,
            label: 'Date of 1st EAC Session',
            format: 'dd MMM, yyyy'
        }));
        if (this.entity.dateEac2) {
            this.properties.push(new CardViewDateItemModel({
                key: 'ds',
                value: this.entity.dateEac2,
                label: 'Date of 2nd EAC Session',
                format: 'dd MMM, yyyy'
            }));
        }
        if (this.entity.dateEac3) {
            this.properties.push(new CardViewDateItemModel({
                key: 'ds',
                value: this.entity.dateEac3,
                label: 'Date of 3rd EAC Session',
                format: 'dd MMM, yyyy'
            }));
        }
        if (this.entity.dateEac3) {
            this.properties.push(new CardViewDateItemModel({
                key: 'ds',
                value: this.entity.dateSampleCollected,
                label: 'Date of Repeat VL Sample Collection',
                format: 'dd MMM, yyyy'
            }));
        }
        this.properties.push(new CardViewTextItemModel({
            label: 'Notes',
            key: 'ts',
            value: this.entity.notes
        }));
    }
    previousState() {
        window.history.back();
    }
};
EacDetailsComponent.ctorParameters = () => [
    { type: Router },
    { type: ActivatedRoute },
    { type: TdDialogService },
    { type: NotificationService },
    { type: EacService }
];
EacDetailsComponent = __decorate([
    Component({
        selector: 'eac-details',
        template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <mat-card>\n            <mat-card-header>\n            </mat-card-header>\n            <mat-card-content>\n                <adf-card-view [properties]=\"properties\" editable=\"false\"></adf-card-view>\n            </mat-card-content>\n            <mat-card-actions class=\"lamis-edit-form-actions\">\n                <button mat-button (click)=\"previousState()\">Back</button>\n                <button mat-raised-button color=\"warn\" (click)=\"delete()\">Delete</button>\n                <button mat-raised-button color=\"primary\" (click)=\"edit()\">Edit</button>\n            </mat-card-actions>\n        </mat-card>\n    </div>\n</div>\n"
    }),
    __metadata("design:paramtypes", [Router, ActivatedRoute,
        TdDialogService, NotificationService,
        EacService])
], EacDetailsComponent);

const moment$6 = moment_;
let EacEditComponent = class EacEditComponent {
    constructor(clinicService, eacService, notification, activatedRoute, appLoaderService) {
        this.clinicService = clinicService;
        this.eacService = eacService;
        this.notification = notification;
        this.activatedRoute = activatedRoute;
        this.appLoaderService = appLoaderService;
        this.today = moment$6();
        this.isSaving = false;
    }
    createEntity() {
        return {};
    }
    ngOnInit() {
        this.activatedRoute.data.subscribe(({ entity }) => {
            this.entity = !!entity && entity.body ? entity.body : entity;
            if (this.entity === undefined) {
                this.entity = this.createEntity();
            }
            const patientId = this.activatedRoute.snapshot.paramMap.get('patientId');
            this.clinicService.getPatient(patientId).subscribe((res) => {
                this.entity.patient = res;
                this.entity.facility = res.facility;
                this.dateRegistration = res.dateRegistration;
                this.updateMinDates(res.id, moment$6());
                if (!this.entity.id) {
                    this.eacService.getLatestByPatient(res.uuid).subscribe(r => {
                        this.entity = r.ok ? r.body : this.createEntity();
                        this.repeatVLMin = this.entity.dateEac3 ? this.entity.dateEac3.clone().add(1, 'day') :
                            this.entity.dateLastViralLoad;
                        this.eac2Min = this.entity.dateEac1 ? this.entity.dateEac1.clone().add(2, 'week') :
                            this.entity.dateLastViralLoad;
                        this.eac3Min = this.entity.dateEac2 ? this.entity.dateEac2.clone().add(2, 'week') :
                            this.entity.dateLastViralLoad;
                    });
                }
            });
        });
    }
    updateMinDates(id, date) {
        this.eacService.getLatestViralLoadByPatient(id, date).pipe(tap((r) => {
            this.entity.dateLastViralLoad = moment$6(r.laboratory.dateResultReceived);
            this.entity.lastViralLoad = r.result;
            this.eac1Min = this.entity.dateLastViralLoad.clone().add(1, 'day');
            this.eac2Min = this.entity.dateEac1 ? this.entity.dateEac1.clone().add(2, 'week') :
                this.entity.dateLastViralLoad;
            this.eac3Min = this.entity.dateEac2 ? this.entity.dateEac2.clone().add(2, 'week') :
                this.entity.dateLastViralLoad;
            this.repeatVLMin = this.entity.dateEac3 ? this.entity.dateEac3.clone().add(1, 'day') :
                this.entity.dateLastViralLoad;
        }), catchError((err) => {
            this.entity.dateLastViralLoad = null;
            this.entity.lastViralLoad = null;
            this.eac1Min = this.entity.patient.dateRegistration.clone().add(1, 'day');
            this.eac2Min = this.entity.dateEac1 ? this.entity.dateEac1.clone().add(2, 'week') :
                this.entity.dateLastViralLoad;
            this.eac3Min = this.entity.dateEac2 ? this.entity.dateEac2.clone().add(2, 'week') :
                this.entity.dateLastViralLoad;
            this.repeatVLMin = this.entity.dateEac3 ? this.entity.dateEac3.clone().add(1, 'day') :
                this.entity.dateLastViralLoad;
            return null;
        }));
    }
    dateEac1Changed(date) {
        this.eac2Min = date.clone().add(2, 'weeks');
        this.updateMinDates(this.entity.patient.id, date);
    }
    dateEac2Changed(date) {
        this.eac3Min = date.clone().add(2, 'weeks');
    }
    dateEac3Changed(date) {
        this.repeatVLMin = date.clone().add(1, 'days');
        this.repeatVLMax = date.clone().add(6, 'months');
    }
    save() {
        //this.submitButton.disabled = true;
        //this.progressBar.mode = 'indeterminate';
        this.isSaving = true;
        this.appLoaderService.open('Saving EAC session..');
        if (this.entity.id !== undefined) {
            this.subscribeToSaveResponse(this.eacService.update(this.entity));
        }
        else {
            this.subscribeToSaveResponse(this.eacService.create(this.entity));
        }
    }
    previousState() {
        window.history.back();
    }
    subscribeToSaveResponse(result) {
        result.subscribe((res) => this.onSaveSuccess(res.body), (res) => {
            this.onSaveError();
            this.onError(res.message);
        });
    }
    onSaveSuccess(result) {
        this.appLoaderService.close();
        this.isSaving = false;
        this.notification.openSnackMessage('EAC session successfully saved');
        this.previousState();
    }
    onSaveError() {
        this.isSaving = false;
        this.appLoaderService.close();
        //this.submitButton.disabled = true;
        this.notification.showError('Error occurred saving EAC session; try again');
        //this.progressBar.mode = 'determinate';
    }
    onError(errorMessage) {
        this.appLoaderService.close();
        this.notification.showError(errorMessage);
    }
};
EacEditComponent.ctorParameters = () => [
    { type: ClinicService },
    { type: EacService },
    { type: NotificationService },
    { type: ActivatedRoute },
    { type: AppLoaderService }
];
EacEditComponent = __decorate([
    Component({
        selector: 'eac-edit',
        template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <mat-card class=\"default\">\n            <mat-card-content>\n                <mat-progress-bar mode=\"determinate\" class=\"session-progress\"></mat-progress-bar>\n            </mat-card-content>\n        </mat-card>\n        <form name=\"form\" role=\"form\" novalidate (ngSubmit)=\"save()\" #clinicForm=\"ngForm\">\n            <mat-card class=\"default\">\n                <mat-card-content *ngIf=\"entity.patient\">\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field>\n                                <mat-label>Date Last Viral Load</mat-label>\n                                <input matInput\n                                       [value]=\"entity.dateLastViralLoad && entity.dateLastViralLoad.format('DD MMM, YYYY')\"\n                                       disabled>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field>\n                                <input matInput [value]=\"entity.lastViralLoad\" disabled>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div>\n                        <mat-form-field class=\"full-width\">\n                            <input matInput [matDatepicker]=\"picker\"\n                                   placeholder=\"Date of 1st EAC Session\"\n                                   [(ngModel)]=\"entity.dateEac1\"\n                                   #visit=\"ngModel\"\n                                   (dateChange)=\"dateEac1Changed($event.value)\"\n                                   [max]=\"today\"\n                                   [min]=\"eac1Min\"\n                                   name=\"visit\"\n                                   required>\n                            <mat-datepicker-toggle\n                                    matSuffix\n                                    [for]=\"picker\">\n                            </mat-datepicker-toggle>\n                            <mat-datepicker #picker></mat-datepicker>\n                            <mat-error\n                                    *ngIf=\"visit.errors && (visit.dirty || visit.touched) && (visit.errors.required)\">\n                                Date of first EAC session is required\n                            </mat-error>\n                            <mat-error\n                                    *ngIf=\"visit.errors && (visit.dirty || visit.touched) && (visit.errors.min)\">\n                                Date of first EAC session cannot be before {{eac1Min | date: 'dd MMM, yyyy'}}\n                            </mat-error>\n                            <mat-error\n                                    *ngIf=\"visit.errors && (visit.dirty || visit.touched) && (visit.errors.max)\">\n                                Date of first EAC session cannot be after {{today | date: 'dd MMM, yyyy'}}\n                            </mat-error>\n                        </mat-form-field>\n                    </div>\n                    <div>\n                        <mat-form-field class=\"full-width\" *ngIf=\"entity.id && !!eac2Min\">\n                            <input matInput [matDatepicker]=\"picker2\"\n                                   placeholder=\"Date of 2nd EAC Session\"\n                                   [(ngModel)]=\"entity.dateEac2\"\n                                   #visit2=\"ngModel\"\n                                   (dateChange)=\"dateEac2Changed($event.value)\"\n                                   [max]=\"today\"\n                                   [min]=\"eac2Min\"\n                                   name=\"visit2\">\n                            <mat-datepicker-toggle\n                                    matSuffix\n                                    [for]=\"picker2\">\n                            </mat-datepicker-toggle>\n                            <mat-datepicker #picker2></mat-datepicker>\n                            <mat-error\n                                    *ngIf=\"visit2.errors && (visit2.dirty || visit2.touched) && (visit2.errors.required)\">\n                                Date of second EAC session is required\n                            </mat-error>\n                            <mat-error\n                                    *ngIf=\"visit2.errors && (visit2.dirty || visit2.touched) && (visit2.errors.min)\">\n                                Date of second EAC session cannot be before {{eac2Min | date: 'dd MMM, yyyy'}}\n                            </mat-error>\n                            <mat-error\n                                    *ngIf=\"visit2.errors && (visit2.dirty || visit2.touched) && (visit2.errors.max)\">\n                                Date of second EAC session cannot be after {{today | date: 'dd MMM, yyyy'}}\n                            </mat-error>\n                        </mat-form-field>\n                    </div>\n                    <div>\n                        <mat-form-field class=\"full-width\" *ngIf=\"entity.dateEac2 && !!eac3Min\">\n                            <input matInput [matDatepicker]=\"picker3\"\n                                   placeholder=\"Date of 3rd EAC Session\"\n                                   [(ngModel)]=\"entity.dateEac3\"\n                                   #visit3=\"ngModel\"\n                                   (dateChange)=\"dateEac3Changed($event.value)\"\n                                   [max]=\"today\"\n                                   [min]=\"eac3Min\"\n                                   name=\"visit3\">\n                            <mat-datepicker-toggle\n                                    matSuffix\n                                    [for]=\"picker3\">\n                            </mat-datepicker-toggle>\n                            <mat-datepicker #picker3></mat-datepicker>\n                            <mat-error\n                                    *ngIf=\"visit3.errors && (visit3.dirty || visit3.touched) && (visit3.errors.required)\">\n                                Date of third EAC session is required\n                            </mat-error>\n                            <mat-error\n                                    *ngIf=\"visit3.errors && (visit3.dirty || visit3.touched) && (visit3.errors.min)\">\n                                Date of third EAC session cannot be before {{eac3Min | date: 'dd MMM, yyyy'}}\n                            </mat-error>\n                            <mat-error\n                                    *ngIf=\"visit3.errors && (visit3.dirty || visit3.touched) && (visit3.errors.max)\">\n                                Date of third EAC session cannot be after {{today | date: 'dd MMM, yyyy'}}\n                            </mat-error>\n                        </mat-form-field>\n                    </div>\n                    <div>\n                        <mat-form-field class=\"full-width\" *ngIf=\"entity.dateEac3 && !!repeatVLMin\">\n                            <input matInput [matDatepicker]=\"picker4\"\n                                   placeholder=\"Date of Repeat VL Sample Collection\"\n                                   [(ngModel)]=\"entity.dateSampleCollected\"\n                                   #visit4=\"ngModel\"\n                                   [max]=\"repeatVLMax\"\n                                   [min]=\"repeatVLMin\"\n                                   name=\"repeat\">\n                            <mat-datepicker-toggle\n                                    matSuffix\n                                    [for]=\"picker4\">\n                            </mat-datepicker-toggle>\n                            <mat-datepicker #picker4></mat-datepicker>\n                            <mat-error\n                                    *ngIf=\"visit4.errors && (visit4.dirty || visit4.touched) && (visit4.errors.required)\">\n                                Date of Repeat VL Sample Collection is required\n                            </mat-error>\n                            <mat-error\n                                    *ngIf=\"visit4.errors && (visit4.dirty || visit4.touched) && (visit4.errors.min)\">\n                                Date of Repeat VL Sample Collection cannot be\n                                before {{repeatVLMin | date:'dd MMM, yyyy'}}\n                            </mat-error>\n                            <mat-error\n                                    *ngIf=\"visit4.errors && (visit4.dirty || visit4.touched) && (visit4.errors.max)\">\n                                Date of Repeat VL Sample Collection cannot be\n                                after {{repeatVLMax | date:'dd MMM, yyyy'}}\n                            </mat-error>\n                        </mat-form-field>\n                    </div>\n                    <div>\n                        <mat-form-field class=\"full-width\">\n                            <textarea matInput placeholder=\"Notes\"\n                                      cols=\"30\"\n                                      rows=\"3\"\n                                      name=\"notes\"\n                                      #note=\"ngModel\" [(ngModel)]=\"entity.notes\"></textarea>\n                        </mat-form-field>\n                    </div>\n                    <mat-card-actions class=\"lamis-edit-form-actions\">\n                        <button mat-raised-button type=\"button\" (click)=\"previousState()\">Back</button>\n                        <button mat-raised-button color='primary'\n                                [disabled]=\"clinicForm.invalid || isSaving\"\n                                type=\"submit\">\n                            {{entity.id !== undefined ? 'Update' : 'Save'}}\n                        </button>\n                    </mat-card-actions>\n                </mat-card-content>\n            </mat-card>\n        </form>\n    </div>\n</div>\n"
    }),
    __metadata("design:paramtypes", [ClinicService,
        EacService,
        NotificationService,
        ActivatedRoute,
        AppLoaderService])
], EacEditComponent);

let EacResolve = class EacResolve {
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
EacResolve.ctorParameters = () => [
    { type: EacService }
];
EacResolve = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [EacService])
], EacResolve);
const ɵ0$2 = {
    title: 'EAC Session',
    breadcrumb: 'EAC SESSION'
}, ɵ1$2 = {
    authorities: ['ROLE_USER'],
    title: 'EAC Session',
    breadcrumb: 'EAC SESSION'
}, ɵ2$2 = {
    authorities: ['ROLE_DEC'],
    title: 'EAC Session',
    breadcrumb: 'ADD EAC SESSION',
    commence: true
}, ɵ3$2 = {
    authorities: ['ROLE_DEC'],
    title: 'EAC Session Edit',
    breadcrumb: 'EAC SESSION EDIT'
};
const ROUTES$2 = [
    {
        path: '',
        data: ɵ0$2,
        children: [
            {
                path: ':id/patient/:patientId/view',
                component: EacDetailsComponent,
                resolve: {
                    entity: EacResolve
                },
                data: ɵ1$2,
            },
            {
                path: 'patient/:patientId/new',
                component: EacEditComponent,
                data: ɵ2$2,
            },
            {
                path: ':id/patient/:patientId/edit',
                component: EacEditComponent,
                resolve: {
                    entity: EacResolve
                },
                data: ɵ3$2,
            }
        ]
    }
];

let EacModule = class EacModule {
};
EacModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            CovalentDialogsModule,
            FormsModule,
            ReactiveFormsModule,
            LamisSharedModule,
            MaterialModule,
            CoreModule,
            CustomFormsModule,
            MatDateFormatModule,
            RouterModule.forChild(ROUTES$2)
        ],
        declarations: [
            EacDetailsComponent,
            EacEditComponent
        ],
        providers: [
            EacResolve
        ]
    })
], EacModule);

let CaseManagementService = class CaseManagementService {
    constructor(http, serverUrl) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.resourceUrl = '';
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/case-management';
    }
    initClients(facilityId) {
        return this.http.get(`${this.resourceUrl}/init-clients/${facilityId}`);
    }
    getClientList(req) {
        return this.http.post(`${this.resourceUrl}/client-list`, req, { observe: 'response' });
    }
    getCaseManagerStats(caseManagerId, facilityId) {
        return this.http.get(`${this.resourceUrl}/facility/${facilityId}/case-manager/${caseManagerId}/stats`);
    }
    getActiveFacility() {
        return this.http.get('/api/facilities/active');
    }
    getCaseManagers(facilityId) {
        return this.http.get(`${this.resourceUrl}/facility/${facilityId}/case-managers`);
    }
    assignToCaseManager(caseManagerId, ids) {
        let params = new HttpParams();
        ids.forEach(id => params = params.append('ids', id.toString()));
        return this.http.get(`${this.resourceUrl}/case-manager/${caseManagerId}/assign-clients`, {
            params,
            observe: 'response'
        });
    }
    deAssignClients(ids) {
        let params = new HttpParams();
        ids.forEach(id => params = params.append('ids', id.toString()));
        return this.http.get(`${this.resourceUrl}/de-assign-clients`, {
            params,
            observe: 'response'
        });
    }
    getStates() {
        return this.http.get('/api/states');
    }
    getLgasByState(id) {
        return this.http.get(`/api/provinces/state/${id}`);
    }
};
CaseManagementService.ctorParameters = () => [
    { type: HttpClient },
    { type: undefined, decorators: [{ type: Inject, args: [SERVER_API_URL_CONFIG,] }] }
];
CaseManagementService.ngInjectableDef = ɵɵdefineInjectable({ factory: function CaseManagementService_Factory() { return new CaseManagementService(ɵɵinject(HttpClient), ɵɵinject(SERVER_API_URL_CONFIG)); }, token: CaseManagementService, providedIn: "root" });
CaseManagementService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __param(1, Inject(SERVER_API_URL_CONFIG)),
    __metadata("design:paramtypes", [HttpClient, Object])
], CaseManagementService);

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
        this.filterByCaseManager = false;
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
                        this.caseManagers = res.filter(c => c.active);
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
        // this.topicSubscription.unsubscribe();
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
                this.service.assignToCaseManager(this.assignCaseManager.id, patientIds).subscribe((res) => {
                    if (res.ok) {
                        this.updateList();
                        this.service.getCaseManagerStats(this.caseManager.id, this.facilityId).subscribe(res1 => {
                            this.stats = res1;
                            this.buildStats();
                        });
                    }
                    else {
                        this.notificationService.showError('Error assigning clients, please try again');
                    }
                });
            }
            else {
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
                        this.service.getCaseManagerStats(this.caseManager.id, this.facilityId).subscribe(res1 => {
                            this.stats = res1;
                            this.buildStats();
                        });
                    }
                    else {
                        this.notificationService.showError('Error de-assigning clients, please try again');
                    }
                });
            }
            else {
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
        if (this.filterByCaseManager) {
            this.filter['caseManagerId'] = this.caseManager.id;
        }
        else {
            this.filter['caseManagerId'] = null;
        }
        this.updateList();
    }
    updateList() {
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
                this.service.getCaseManagerStats(0, this.facilityId).subscribe(res1 => {
                    this.globalStats = res1;
                    this.buildGlobalStats();
                });
            }
            this.loading = false;
        });
    }
    ageGroupChanged() {
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
    }
    pregnancyStatusChanged() {
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
    }
    stateChanged(id) {
        if (id) {
            this.service.getLgasByState(id).subscribe(res => this.lgas = res);
        }
    }
    assigned(val) {
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
    }
    lgaChanged(id) {
        if (id) {
            this.filter.lgaId = id;
        }
        else {
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
    { type: CaseManagementService },
    { type: TdDialogService },
    { type: NotificationService },
    { type: RxStompService }
];
PatientListComponent = __decorate([
    Component({
        selector: 'case-management-patient-list',
        template: "<div class=\"layout\">\n    <div class=\"list-container\">\n        <mat-card>\n            <mat-card-content>\n                <div class=\"row\">\n                    <div class=\"col-md-6\">\n                        <mat-form-field class=\"full-width\">\n                            <mat-label>Facility Case Manager:</mat-label>\n                            <mat-select [(ngModel)]=\"caseManager\" name=\"caseManager\"\n                                        (selectionChange)=\"caseManagerChanged()\">\n                                <mat-option></mat-option>\n                                <mat-option *ngFor=\"let c of caseManagers\" [value]=\"c\">{{c.name}}\n                                </mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                        <div *ngIf=\"caseManager\">\n                            <mat-checkbox [(ngModel)]=\"filterByCaseManager\"\n                                          (change)=\"updateList()\"\n                                          name=\"activeTb\"\n                            >\n                                Filter by Case Manager\n                            </mat-checkbox>\n                        </div>\n                    </div>\n                    <div class=\"col-md-6\">\n                        <div *ngIf=\"caseManager\">\n                            <div class=\"row\">\n                                <div class=\"col-md-2\">\n                                    Clients(s) Assigned:\n                                </div>\n                                <div class=\"col-md-2\">\n                                    {{stats.assigned | number: '1.'}}\n                                </div>\n                                <div class=\"col-md-2\">\n                                    Stable 1 Year:\n                                </div>\n                                <div class=\"col-md-2\">\n                                    {{stats.stable | number: '1.'}}\n                                </div>\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col-md-2\">\n                                    Unstable less than 1 Year:\n                                </div>\n                                <div class=\"col-md-2\">\n                                    {{stats.unstableLessThan1year | number: '1.'}}\n                                </div>\n                                <div class=\"col-md-2\">\n                                    Unstable more than 1 Year:\n                                </div>\n                                <div class=\"col-md-2\">\n                                    {{stats.unstableMoreThan1Year | number: '1.'}}\n                                </div>\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col-md-2\">\n                                    Awaiting ART:\n                                </div>\n                                <div class=\"col-md-2\">\n                                    {{stats.preArt | number: '1.'}}\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <h5> Demographic/Clinic filters</h5>\n                <p></p>\n                <div class=\"row\">\n                    <div class=\"col-md-6\">\n                        <mat-form-field class=\"full-width\">\n                            <mat-label>Client Categorization</mat-label>\n                            <mat-select name=\"categoryId\" [(ngModel)]=\"filter.status\" (selectionChange)=\"updateList()\">\n                                <mat-option>--All--</mat-option>\n                                <mat-option value='STABLE'>Stable One Year</mat-option>\n                                <mat-option value='UNSTABLE_LESS_THAN_1_YEAR'>Unstable less than One Year</mat-option>\n                                <mat-option value='UNSTABLE_MORE_THAN_1_YEAR'>Unstable One Year or more</mat-option>\n                                <mat-option value='PRE_ART'>Awaiting ART</mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n                    <div class=\"col-md-6\">\n                        <mat-form-field class=\"full-width\">\n                            <mat-label>Age Group</mat-label>\n                            <mat-select name=\"ageGroup\" [(ngModel)]=\"ageLimit\" (selectionChange)=\"ageGroupChanged()\">\n                                <mat-option>--All--</mat-option>\n                                <mat-option value='9'>Children (0-9 Years)</mat-option>\n                                <mat-option value='14'>Younger Adolescent (10 to 14 Years)</mat-option>\n                                <mat-option value='19'>Older Adolescent (15 to 19 Years)</mat-option>\n                                <mat-option value='24'>Young People (20 to 24 Years)</mat-option>\n                                <mat-option value='100'>Adults (25 and Above)</mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"col-md-6\">\n                        <mat-form-field class=\"full-width\">\n                            <mat-label>Gender</mat-label>\n                            <mat-select name=\"gender\" [(ngModel)]=\"filter.gender\" (selectionChange)=\"updateList()\">\n                                <mat-option>--All--</mat-option>\n                                <mat-option [value]=\"'FEMALE'\">Female</mat-option>\n                                <mat-option [value]=\"'MALE'\">Male</mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n                    <div class=\"col-md-6\">\n                        <mat-form-field class=\"full-width\">\n                            <mat-label>Pregnancy Status</mat-label>\n                            <mat-select name=\"pregnancyStatus\" [(ngModel)]=\"pregnancyStatus\"\n                                        (selectionChange)=\"pregnancyStatusChanged()\">\n                                <mat-option>--All--</mat-option>\n                                <mat-option value='1'>Pregnant</mat-option>\n                                <mat-option value='2'>Breastfeeding</mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"col-md-6\">\n                        <mat-form-field class=\"full-width\">\n                            <mat-label>State of Residence</mat-label>\n                            <mat-select name=\"state\" (selectionChange)=\"stateChanged($event.value.id)\">\n                                <mat-option></mat-option>\n                                <mat-option *ngFor=\"let state of states\" [value]=\"state\">{{state.name}}</mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n                    <div class=\"col-md-6\">\n                        <mat-form-field class=\"full-width\">\n                            <mat-label>LGA of Residence</mat-label>\n                            <mat-select name=\"lga\" (selectionChange)=\"lgaChanged($event.value.id)\">\n                                <mat-option></mat-option>\n                                <mat-option *ngFor=\"let lga of lgas\" [value]=\"lga\">{{lga.name}}</mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n                </div>\n                <div *ngIf=\"patients?.length\">\n                    <div class=\"row\">\n                        <div class=\"col-md-2\">\n                            Clients(s) Assigned:\n                        </div>\n                        <div class=\"col-md-2\">\n                            {{globalStats.assigned | number: '1.'}}\n                        </div>\n                        <div class=\"col-md-2\">\n                            Stable 1 Year:\n                        </div>\n                        <div class=\"col-md-2\">\n                            {{globalStats.stable | number: '1.'}}\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-2\">\n                            Unstable less than 1 Year:\n                        </div>\n                        <div class=\"col-md-2\">\n                            {{globalStats.unstableLessThan1year | number: '1.'}}\n                        </div>\n                        <div class=\"col-md-2\">\n                            Unstable more than 1 Year:\n                        </div>\n                        <div class=\"col-md-2\">\n                            {{globalStats.unstableMoreThan1Year | number: '1.'}}\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-2\">\n                            Awaiting ART:\n                        </div>\n                        <div class=\"col-md-2\">\n                            {{globalStats.preArt | number: '1.'}}\n                        </div>\n                    </div>\n                </div>\n                <div>\n                    <div class=\"row\">\n                        <div class=\"col-md-8 col-md-offset-4\">\n                            <div class=\"adf-toolbar--spacer\"></div>\n                            <td-search-box backIcon=\"arrow_back\" class=\"push-right-sm\"\n                                           placeholder=\"Search hospital number\" [debounce]=\"500\"\n                                           [(ngModel)]=\"hospitalNum\"\n                                           (searchDebounce)=\"search()\"\n                                           (search)=\"search()\"\n                                           (clear)=\"clearHospitalNum()\" flex>\n                            </td-search-box>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Assign to Case Manager:</mat-label>\n                                <mat-select [(ngModel)]=\"assignCaseManager\" name=\"caseManager1\">\n                                    <mat-option></mat-option>\n                                    <mat-option *ngFor=\"let c of caseManagers\" [value]=\"c\">{{c.name}}\n                                    </mat-option>\n                                </mat-select>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-sm-3 col-sm-offset-9\">\n                            <div>\n                                <button mat-raised-button color=\"primary\"\n                                        *ngIf=\"assignCaseManager && selections()\"\n                                        (click)=\"assignClients()\">Assign to Case Manager\n                                </button>\n                                <button mat-raised-button color=\"accent\" *ngIf=\"selections()\"\n                                        (click)=\"deAssignClients()\">De-assign Client(s)\n                                </button>\n                            </div>\n                        </div>\n                    </div>\n                    <mat-progress-spinner\n                            *ngIf=\"initializing\"\n                            class=\"adf-document-list-loading-margin\"\n                            [color]=\"'primary'\"\n                            [mode]=\"'indeterminate'\">\n                    </mat-progress-spinner>\n                    <adf-datatable *ngIf=\"patients || loading\"\n                                   [rows]=\"patients\"\n                                   (rowClick)=\"select($event.value)\">\n                        <data-columns>\n                            <data-column key=\"selected\" title=\"\">\n                                <ng-template let-context=\"$implicit\">\n                                    <mat-checkbox [checked]=\"context.row.getValue('selected')\"></mat-checkbox>\n                                </ng-template>\n                            </data-column>\n                            <data-column key=\"name\" title=\"Name\" sortable=\"true\"></data-column>\n                            <data-column key=\"hospitalNum\" title=\"Hospital Number\" sortable=\"true\"></data-column>\n                            <data-column key=\"gender\" title=\"Gender\" sortable=\"true\">\n                                <ng-template let-context=\"$implicit\">\n                                    {{context.row.getValue('gender') === 'MALE' ? 'Male' : context.row.getValue('gender') === 'FEMALE' ? 'Female' : ''}}\n                                </ng-template>\n                            </data-column>\n                            <data-column key=\"dateBirth\" title=\"Date of Birth\" sortable=\"true\">\n                                <ng-template let-context=\"$implicit\">\n                                    {{context.row.getValue('dateBirth') | date: 'dd MMM, yyyy'}}\n                                </ng-template>\n                            </data-column>\n                            <data-column key=\"address\" title=\"Address\" class=\"full-width ellipsis-cell\"></data-column>\n                            <data-column key=\"currentStatus\" title=\"ART Status\" sortable=\"true\"></data-column>\n                            <data-column key=\"caseManager.name\" title=\"Assigned to\" sortable=\"true\"></data-column>\n                        </data-columns>\n                        <adf-loading-content-template>\n                            <ng-template>\n                                <mat-progress-spinner\n                                        class=\"adf-document-list-loading-margin\"\n                                        [color]=\"'primary'\"\n                                        [mode]=\"'indeterminate'\">\n                                </mat-progress-spinner>\n                            </ng-template>\n                        </adf-loading-content-template>\n                    </adf-datatable>\n                </div>\n                <adf-empty-content\n                        *ngIf=\"!patients\"\n                        icon=\"blur_on\"\n                        [title]=\"'No Patients found'\"\n                        [subtitle]=\"'No Patients matching search criteria or no Patients available'\">\n                </adf-empty-content>\n                <div class=\"row\">\n                    <div class=\"col-md-8\">\n                        <ngb-pagination [collectionSize]=\"totalItems\"\n                                        [(page)]=\"page\"\n                                        [pageSize]=\"itemsPerPage\"\n                                        [maxSize]=\"5\"\n                                        size=\"sm\"\n                                        [rotate]=\"true\"\n                                        [boundaryLinks]=\"true\"\n                                        (pageChange)=\"loadPage(page)\">\n                        </ngb-pagination>\n                    </div>\n                    <div class=\"col-md-4\">\n                        <mat-form-field>\n                            <mat-label>Assignment Filter</mat-label>\n                            <mat-select (selectionChange)=\"assigned($event.value)\">\n                                <mat-option></mat-option>\n                                <mat-option [value]=\"1\">Only assigned clients</mat-option>\n                                <mat-option [value]=\"2\">Only clients not assigned</mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n                </div>\n            </mat-card-content>\n        </mat-card>\n    </div>\n</div>\n"
    }),
    __metadata("design:paramtypes", [CaseManagementService, TdDialogService,
        NotificationService, RxStompService])
], PatientListComponent);

const ɵ0$3 = {
    title: 'Case Management',
    breadcrumb: 'CASE MANAGEMENT'
}, ɵ1$3 = {
    authorities: ['ROLE_USER'],
    title: 'Case Management',
    breadcrumb: 'CASE MANAGEMENT'
}, ɵ2$3 = {
    title: 'Case Management',
    breadcrumb: 'CASE MANAGEMENT'
};
const ROUTES$3 = [
    {
        path: '',
        data: ɵ0$3,
        children: [
            {
                path: '',
                children: [
                    {
                        path: '',
                        component: PatientListComponent,
                        data: ɵ1$3
                    }
                ],
                data: ɵ2$3,
            }
        ]
    }
];

let CaseManagementModule = class CaseManagementModule {
};
CaseManagementModule = __decorate([
    NgModule({
        imports: [
            MaterialModule,
            FormsModule,
            CommonModule,
            RouterModule.forChild(ROUTES$3),
            CoreModule,
            NgbModule,
            CovalentSearchModule,
            CovalentDialogsModule,
            LamisSharedModule,
        ],
        declarations: [
            PatientListComponent
        ],
        providers: []
    })
], CaseManagementModule);

let CaseManagerService = class CaseManagerService {
    constructor(http, serverUrl) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.resourceUrl = '';
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/case-managers';
    }
    create(caseManager) {
        return this.http
            .post(this.resourceUrl, caseManager, { observe: 'response' });
    }
    update(caseManager) {
        return this.http
            .put(this.resourceUrl, caseManager, { observe: 'response' });
    }
    find(id) {
        return this.http
            .get(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
    findByUuid(id) {
        return this.http
            .get(`${this.resourceUrl}/by-uuid/${id}`, { observe: 'response' });
    }
    delete(id) {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
    query(req) {
        const options = createRequestOption(req);
        return this.http
            .get(this.resourceUrl, { params: options, observe: 'response' });
    }
};
CaseManagerService.ctorParameters = () => [
    { type: HttpClient },
    { type: undefined, decorators: [{ type: Inject, args: [SERVER_API_URL_CONFIG,] }] }
];
CaseManagerService.ngInjectableDef = ɵɵdefineInjectable({ factory: function CaseManagerService_Factory() { return new CaseManagerService(ɵɵinject(HttpClient), ɵɵinject(SERVER_API_URL_CONFIG)); }, token: CaseManagerService, providedIn: "root" });
CaseManagerService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __param(1, Inject(SERVER_API_URL_CONFIG)),
    __metadata("design:paramtypes", [HttpClient, Object])
], CaseManagerService);

let CaseManagerDetailsComponent = class CaseManagerDetailsComponent {
    constructor(router, route, service, _dialogService, notificationService) {
        this.router = router;
        this.route = route;
        this.service = service;
        this._dialogService = _dialogService;
        this.notificationService = notificationService;
        this.properties = [];
    }
    ngOnInit() {
        this.route.data.subscribe(({ entity }) => {
            this.entity = !!entity && entity.body ? entity.body : entity;
            this.buildProperties();
        });
    }
    edit() {
        this.router.navigate(['/', 'admin', 'case-managers', this.entity.uuid, 'edit']);
    }
    delete() {
        this._dialogService.openConfirm({
            title: 'Confirm',
            message: 'Do you want to delete this Case Manager, action cannot be reversed?',
            cancelButton: 'No',
            acceptButton: 'Yes',
            width: '500px',
        }).afterClosed().subscribe((accept) => {
            if (accept) {
                this.service.delete(this.entity.id).subscribe((res) => {
                    if (res.ok) {
                        this.router.navigate(['admin', 'case-managers']);
                    }
                    else {
                        this.notificationService.showError('Error deleting Case Manager, please try again');
                    }
                });
            }
            else {
                // DO SOMETHING ELSE
            }
        });
    }
    buildProperties() {
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
            label: 'Gender',
            key: 'ts',
            value: this.entity.gender === 'FEMALE' ? 'Female' : 'Male'
        }));
        this.properties.push(new CardViewTextItemModel({
            label: 'Telephone',
            key: 'cd4p',
            value: this.entity.phoneNumber
        }));
        this.properties.push(new CardViewBoolItemModel({
            label: 'Active',
            key: 'cd4p',
            value: this.entity.active
        }));
    }
    previousState() {
        window.history.back();
    }
};
CaseManagerDetailsComponent.ctorParameters = () => [
    { type: Router },
    { type: ActivatedRoute },
    { type: CaseManagerService },
    { type: TdDialogService },
    { type: NotificationService }
];
CaseManagerDetailsComponent = __decorate([
    Component({
        selector: 'case-manager-details',
        template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <mat-card>\n            <mat-card-header>\n            </mat-card-header>\n            <mat-card-content>\n                <adf-card-view [properties]=\"properties\" editable=\"false\"></adf-card-view>\n            </mat-card-content>\n            <mat-card-actions class=\"lamis-edit-form-actions\">\n                <button mat-button (click)=\"previousState()\">Back</button>\n                <button mat-raised-button color=\"primary\" (click)=\"edit()\">Edit</button>\n            </mat-card-actions>\n        </mat-card>\n    </div>\n</div>\n"
    }),
    __metadata("design:paramtypes", [Router, ActivatedRoute, CaseManagerService,
        TdDialogService,
        NotificationService])
], CaseManagerDetailsComponent);

let CaseManagerEditComponent = class CaseManagerEditComponent {
    constructor(caseManagementService, caseManagerService, notification, activatedRoute, appLoaderService) {
        this.caseManagementService = caseManagementService;
        this.caseManagerService = caseManagerService;
        this.notification = notification;
        this.activatedRoute = activatedRoute;
        this.appLoaderService = appLoaderService;
    }
    createEntity() {
        return {};
    }
    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ entity }) => {
            this.entity = !!entity && entity.body ? entity.body : entity;
            if (this.entity === undefined) {
                this.entity = this.createEntity();
            }
            this.caseManagementService.getActiveFacility().subscribe((res) => {
                this.entity.facility = res;
            });
        });
    }
    save() {
        this.isSaving = true;
        this.appLoaderService.open('Saving Case Manager..');
        if (this.entity.id !== undefined) {
            this.subscribeToSaveResponse(this.caseManagerService.update(this.entity));
        }
        else {
            this.subscribeToSaveResponse(this.caseManagerService.create(this.entity));
        }
    }
    previousState() {
        window.history.back();
    }
    subscribeToSaveResponse(result) {
        result.subscribe((res) => this.onSaveSuccess(res.body), (res) => {
            this.onSaveError();
            this.onError(res.message);
        });
    }
    onSaveSuccess(result) {
        this.appLoaderService.close();
        this.isSaving = false;
        this.notification.openSnackMessage('Case Manager successfully saved');
        this.previousState();
    }
    onSaveError() {
        this.isSaving = false;
        this.appLoaderService.close();
        //this.submitButton.disabled = true;
        this.notification.showError('Error occurred saving Case Manager; try again');
        //this.progressBar.mode = 'determinate';
    }
    onError(errorMessage) {
        this.appLoaderService.close();
        this.notification.showError(errorMessage);
    }
};
CaseManagerEditComponent.ctorParameters = () => [
    { type: CaseManagementService },
    { type: CaseManagerService },
    { type: NotificationService },
    { type: ActivatedRoute },
    { type: AppLoaderService }
];
CaseManagerEditComponent = __decorate([
    Component({
        selector: 'case-manager-edit',
        template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <form name=\"form\" role=\"form\" novalidate (ngSubmit)=\"save()\" #caseManagerForm=\"ngForm\">\n            <mat-card class=\"default\">\n                <mat-card-content>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Name</mat-label>\n                                <input matInput name=\"name\" #name=\"ngModel\"\n                                       required\n                                       [(ngModel)]=\"entity.name\"/>\n                                <mat-error\n                                        *ngIf=\"name.errors && (name.dirty || name.touched) && (name.errors.required)\">\n                                    Case Manager name is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Address</mat-label>\n                                <textarea matInput name=\"address\" [(ngModel)]=\"entity.address\" #address=\"ngModel\"\n                                          rows=\"2\" required>\n                                </textarea>\n                                <mat-error\n                                        *ngIf=\"address.errors && (address.dirty || address.touched) && (address.errors.required)\">\n                                    Case Manager address is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Sex</mat-label>\n                                <mat-select name=\"sex\" [(ngModel)]=\"entity.gender\" #sex=\"ngModel\" required>\n                                    <mat-option></mat-option>\n                                    <mat-option [value]=\"'FEMALE'\">Female</mat-option>\n                                    <mat-option [value]=\"'MALE'\">Male</mat-option>\n                                </mat-select>\n                                <mat-error\n                                        *ngIf=\"sex.errors && (sex.dirty || sex.touched) && (sex.errors.required)\">\n                                    Case Manager sex is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Telephone</mat-label>\n                                <input matInput name=\"phone\" phoneNumber [(ngModel)]=\"entity.phoneNumber\" required\n                                       #phone=\"ngModel\"/>\n                                <mat-error\n                                        *ngIf=\"phone.errors && (phone.dirty || phone.touched) && (phone.errors.required)\">\n                                    Case Manager Telephone number is required\n                                </mat-error>\n                                <mat-error\n                                        *ngIf=\"phone.errors && (phone.dirty || phone.touched) && (phone.errors.invalidPhone)\">\n                                    Invalid phone number\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-checkbox name=\"active\" [(ngModel)]=\"entity.active\">Active</mat-checkbox>\n                        </div>\n                    </div>\n                </mat-card-content>\n                <mat-card-actions class=\"lamis-edit-form-actions\">\n                    <button mat-raised-button type=\"button\" (click)=\"previousState()\">Back</button>\n                    <button mat-raised-button color='primary'\n                            [disabled]=\"caseManagerForm.invalid || isSaving\"\n                            type=\"submit\">\n                        {{entity.id !== undefined ? 'Update' : 'Save'}}\n                    </button>\n                </mat-card-actions>\n            </mat-card>\n        </form>\n    </div>\n</div>\n"
    }),
    __metadata("design:paramtypes", [CaseManagementService,
        CaseManagerService,
        NotificationService,
        ActivatedRoute,
        AppLoaderService])
], CaseManagerEditComponent);

let CaseManagerListComponent = class CaseManagerListComponent {
    constructor(caseManagerService, caseManagementService, notification, router, activatedRoute) {
        this.caseManagerService = caseManagerService;
        this.caseManagementService = caseManagementService;
        this.notification = notification;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.page = 0;
        this.loading = false;
        this.itemsPerPage = 200;
        this.currentSearch = '';
        this.totalItems = 0;
        this.display = 'list';
    }
    ngOnInit() {
        this.caseManagementService.getActiveFacility().subscribe(res => {
            this.facility = res;
            this.onPageChange(0);
        });
    }
    select(data) {
        this.router.navigate(['..', 'case-managers', data.obj.uuid, 'view'], { relativeTo: this.activatedRoute });
    }
    onPageChange(pageInfo) {
        this.page = pageInfo;
        this.loadAll();
    }
    loadPage(page) {
        this.page = page;
        this.loadAll();
    }
    loadAll() {
        this.loading = true;
        this.caseManagerService.query({
            keyword: this.currentSearch,
            page: 0,
            id: this.facility && this.facility.id || 0,
            size: this.itemsPerPage,
            sort: ['id', 'asc']
        }).subscribe((res) => {
            this.onSuccess(res.body, res.headers);
        }, (res) => this.onError(res));
    }
    onSuccess(data, headers) {
        this.caseManagers = data;
        this.totalItems = headers.get('X-Total-Count');
        this.loading = false;
    }
    onError(error) {
        this.notification.openSnackMessage(error.message);
        this.loading = false;
    }
};
CaseManagerListComponent.ctorParameters = () => [
    { type: CaseManagerService },
    { type: CaseManagementService },
    { type: NotificationService },
    { type: Router },
    { type: ActivatedRoute }
];
CaseManagerListComponent = __decorate([
    Component({
        selector: 'case-managers',
        template: "<div class=\"layout\">\n    <div class=\"list-container\">\n        <adf-datatable *ngIf=\"caseManagers\"\n                       [rows]=\"caseManagers\"\n                       [loading]=\"loading\"\n                       [display]=\"display\"\n                       (rowClick)=\"select($event.value)\">\n            <data-columns>\n                <data-column key=\"name\" title=\"Name\" sortable=\"true\"></data-column>\n                <data-column key=\"gender\" title=\"Gender\" sortable=\"true\">\n                    <ng-template let-context=\"$implicit\">\n                        {{context.row.getValue('gender') === 'MALE' ? 'Male' : context.row.getValue('gender') === 'FEMALE' ? 'Female' : ''}}\n                    </ng-template>\n                </data-column>\n                <data-column key=\"phoneNumber\" title=\"Telephone Number\" sortable=\"true\"></data-column>\n                <data-column key=\"address\" title=\"Address\" class=\"full-width ellipsis-cell\"></data-column>\n                <data-column key=\"active\" title=\"Active\" sortable=\"true\">\n                    <ng-template let-context=\"$implicit\">\n                        <mat-checkbox [checked]=\"context.row.getValue('active')\"></mat-checkbox>\n                    </ng-template>\n                </data-column>\n            </data-columns>\n            <adf-loading-content-template>\n                <ng-template>\n                    <mat-progress-spinner\n                            class=\"adf-document-list-loading-margin\"\n                            [color]=\"'primary'\"\n                            [mode]=\"'indeterminate'\">\n                    </mat-progress-spinner>\n                </ng-template>\n            </adf-loading-content-template>\n        </adf-datatable>\n    </div>\n    <adf-empty-content\n            *ngIf=\"!caseManagers\"\n            icon=\"blur_on\"\n            [title]=\"'No Case Managers found'\"\n            [subtitle]=\"'No Case Managers matching search criteria or no Case Managers available'\">\n    </adf-empty-content>\n    <ngb-pagination [collectionSize]=\"totalItems\"\n                    [(page)]=\"page\"\n                    [pageSize]=\"itemsPerPage\"\n                    [maxSize]=\"5\"\n                    size=\"sm\"\n                    [rotate]=\"true\"\n                    [boundaryLinks]=\"true\"\n                    (pageChange)=\"loadPage(page)\">\n    </ngb-pagination>\n\n</div>\n<div class=\"fab-container\">\n    <button mat-fab\n            [matTooltip]=\"'Add New Case Manager'\"\n            [routerLink]=\"['new']\">\n        <mat-icon>add</mat-icon>\n    </button>\n</div>\n"
    }),
    __metadata("design:paramtypes", [CaseManagerService,
        CaseManagementService,
        NotificationService,
        Router,
        ActivatedRoute])
], CaseManagerListComponent);

let CaseManagerResolve = class CaseManagerResolve {
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
CaseManagerResolve.ctorParameters = () => [
    { type: CaseManagerService }
];
CaseManagerResolve = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [CaseManagerService])
], CaseManagerResolve);
const ɵ0$4 = {
    title: 'Case Manager',
    breadcrumb: 'CASE MANAGERS'
}, ɵ1$4 = {
    authorities: ['ROLE_USER'],
    title: 'Case Managers',
    breadcrumb: 'CASE MANAGERS'
}, ɵ2$4 = {
    authorities: ['ROLE_USER'],
    title: 'Case Manager',
    breadcrumb: 'CASE MANAGER'
}, ɵ3$3 = {
    authorities: ['ROLE_DEC'],
    title: 'Add Case Manager',
    breadcrumb: 'ADD CASE MANAGER'
}, ɵ4$1 = {
    authorities: ['ROLE_DEC'],
    title: 'Case Manager Edit',
    breadcrumb: 'CASE MANAGER EDIT'
};
const ROUTES$4 = [
    {
        path: '',
        data: ɵ0$4,
        children: [
            {
                path: '',
                component: CaseManagerListComponent,
                data: ɵ1$4,
            },
            {
                path: ':id/view',
                component: CaseManagerDetailsComponent,
                resolve: {
                    entity: CaseManagerResolve
                },
                data: ɵ2$4,
            },
            {
                path: 'new',
                component: CaseManagerEditComponent,
                data: ɵ3$3,
            },
            {
                path: ':id/edit',
                component: CaseManagerEditComponent,
                resolve: {
                    entity: CaseManagerResolve
                },
                data: ɵ4$1,
            }
        ]
    }
];

let CaseManagerModule = class CaseManagerModule {
};
CaseManagerModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            MaterialModule,
            CoreModule,
            FormsModule,
            RouterModule.forChild(ROUTES$4),
            CoreModule,
            NgbModule,
            CovalentSearchModule,
            CovalentDialogsModule,
            LamisSharedModule,
        ],
        declarations: [
            CaseManagerDetailsComponent,
            CaseManagerEditComponent,
            CaseManagerListComponent
        ],
        providers: [
            CaseManagerResolve
        ]
    })
], CaseManagerModule);

const moment$7 = moment_;
let CervicalCancerScreeningService = class CervicalCancerScreeningService {
    constructor(http, serverUrl) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.resourceUrl = '';
        this.observationResourceUrl = '';
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/cervical-cancer-screenings';
        this.observationResourceUrl = serverUrl.SERVER_API_URL + '/api/observations';
    }
    find(id) {
        return this.http.get(`${this.observationResourceUrl}/${id}`, { observe: 'response' })
            .pipe(map(res => {
            console.log('Response1', res);
            res.body.date = res.body.date != null ? moment$7(res.body.date) : null;
            res.body.data.dateTreated = res.body.data.dateTreated != null ? moment$7(res.body.data.dateTreated) : null;
            res.body.data.dateScreened = res.body.data.dateScreened != null ? moment$7(res.body.data.dateScreened) : null;
            return res;
        }));
    }
    findByUuid(id) {
        return this.find(id);
    }
    delete(id) {
        return this.http.delete(`${this.observationResourceUrl}/${id}`, { observe: 'response' });
    }
    save(data) {
        return this.http.post(`${this.observationResourceUrl}`, data, { observe: 'response' })
            .pipe(map(res => {
            res.body.data.dateTreated = res.body.data.dateTreated != null ? moment$7(res.body.data.dateTreated) : null;
            res.body.data.dateScreened = res.body.data.dateScreened != null ? moment$7(res.body.data.dateScreened) : null;
            return res;
        }));
    }
    update(data) {
        return this.http.put(`${this.observationResourceUrl}`, data, { observe: 'response' })
            .pipe(map(res => {
            res.body.data.dateTreated = res.body.data.dateTreated != null ? moment$7(res.body.data.dateTreated) : null;
            res.body.data.dateScreened = res.body.data.dateScreened != null ? moment$7(res.body.data.dateScreened) : null;
            return res;
        }));
    }
    getScreeningByPatient(id) {
        return this.http.get(`${this.resourceUrl}/patient/${id}`, { observe: 'response' })
            .pipe(map(res => {
            res.body.data = res.body.data.cervicalCancerScreening;
            res.body.date = res.body.date != null ? moment$7(res.body.date) : null;
            res.body.data.dateTreated = res.body.data.dateTreated != null ? moment$7(res.body.data.dateTreated) : null;
            res.body.data.dateScreened = res.body.data.dateScreened != null ? moment$7(res.body.data.dateScreened) : null;
            return res;
        }));
    }
};
CervicalCancerScreeningService.ctorParameters = () => [
    { type: HttpClient },
    { type: undefined, decorators: [{ type: Inject, args: [SERVER_API_URL_CONFIG,] }] }
];
CervicalCancerScreeningService.ngInjectableDef = ɵɵdefineInjectable({ factory: function CervicalCancerScreeningService_Factory() { return new CervicalCancerScreeningService(ɵɵinject(HttpClient), ɵɵinject(SERVER_API_URL_CONFIG)); }, token: CervicalCancerScreeningService, providedIn: "root" });
CervicalCancerScreeningService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __param(1, Inject(SERVER_API_URL_CONFIG)),
    __metadata("design:paramtypes", [HttpClient, Object])
], CervicalCancerScreeningService);

const moment$8 = moment_;
let CervicalCancerScreeningComponent = class CervicalCancerScreeningComponent {
    constructor(clinicService, screeningService, notification, activatedRoute, appLoaderService) {
        this.clinicService = clinicService;
        this.screeningService = screeningService;
        this.notification = notification;
        this.activatedRoute = activatedRoute;
        this.appLoaderService = appLoaderService;
        this.entity = {};
        this.observation = {};
        this.today = moment$8();
        this.isSaving = false;
    }
    ngOnInit() {
        this.activatedRoute.data.subscribe(({ entity }) => {
            this.observation = !!entity && entity.body ? entity.body : entity;
            if (!!this.observation) {
                this.entity = this.observation.data;
            }
            else {
                this.observation = {};
            }
            if (this.entity === undefined) {
                this.entity = {};
            }
            const patientId = this.activatedRoute.snapshot.paramMap.get('patientId');
            this.clinicService.getPatient(patientId).subscribe((res) => {
                this.patient = res;
                if (!!this.entity) {
                    this.screeningService.getScreeningByPatient(res.id).subscribe(r => {
                        this.entity = r.body && r.body.data;
                        this.observation = r.body;
                    });
                }
            });
        });
    }
    previousState() {
        window.history.back();
    }
    save() {
        //this.submitButton.disabled = true;
        //this.progressBar.mode = 'indeterminate';
        this.isSaving = true;
        this.appLoaderService.open('Saving cancer screening..');
        const data = {
            id: this.observation && this.observation.id || null,
            patient: this.patient,
            date: this.entity.dateScreened.format(DATE_FORMAT),
            facility: this.patient.facility,
            type: 'CERVICAL_CANCER_SCREENING',
            data: {
                cervicalCancerScreening: Object.assign({}, this.entity, {
                    dateScreened: this.entity.dateScreened != null && this.entity.dateScreened.isValid() ?
                        this.entity.dateScreened.format(DATE_FORMAT) : null,
                    dateTreated: this.entity.dateTreated != null && this.entity.dateTreated.isValid() ?
                        this.entity.dateTreated.format(DATE_FORMAT) : null,
                })
            }
        };
        if (!!this.observation.id) {
            this.subscribeToSaveResponse(this.screeningService.update(data));
        }
        else {
            this.subscribeToSaveResponse(this.screeningService.save(data));
        }
    }
    subscribeToSaveResponse(result) {
        result.subscribe((res) => this.onSaveSuccess(res.body), (res) => {
            this.onSaveError();
            this.onError(res.message);
        });
    }
    onSaveSuccess(result) {
        this.appLoaderService.close();
        this.isSaving = false;
        this.notification.showInfo('Cancer screening successfully saved');
        this.previousState();
    }
    onSaveError() {
        this.isSaving = false;
        this.appLoaderService.close();
        //this.submitButton.disabled = true;
        this.notification.showError('Error occurred saving cancer screening; try again');
        //this.progressBar.mode = 'determinate';
    }
    onError(errorMessage) {
        this.appLoaderService.close();
        this.notification.showError(errorMessage);
    }
};
CervicalCancerScreeningComponent.ctorParameters = () => [
    { type: ClinicService },
    { type: CervicalCancerScreeningService },
    { type: NotificationService },
    { type: ActivatedRoute },
    { type: AppLoaderService }
];
CervicalCancerScreeningComponent = __decorate([
    Component({
        selector: 'cancer-screening',
        template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <form name=\"form\" role=\"form\" novalidate (ngSubmit)=\"save()\" #screeningForm=\"ngForm\">\n            <mat-card class=\"default\">\n                <mat-card-content *ngIf=\"patient\">\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <input matInput [matDatepicker]=\"picker\"\n                                       placeholder=\"Date of Screening\"\n                                       [(ngModel)]=\"entity.dateScreened\"\n                                       #visit=\"ngModel\"\n                                       [max]=\"today\"\n                                       [min]=\"patient.dateBirth\"\n                                       name=\"visit\"\n                                       required>\n                                <mat-datepicker-toggle\n                                        matSuffix\n                                        [for]=\"picker\">\n                                </mat-datepicker-toggle>\n                                <mat-datepicker #picker></mat-datepicker>\n                                <mat-error\n                                        *ngIf=\"visit.errors && (visit.dirty || visit.touched) && (visit.errors.required)\">\n                                    Date of Screening is required\n                                </mat-error>\n                                <mat-error\n                                        *ngIf=\"visit.errors && (visit.dirty || visit.touched) && (visit.errors.min)\">\n                                    Date of Screening cannot be before {{patient.dateBirth}}\n                                </mat-error>\n                                <mat-error\n                                        *ngIf=\"visit.errors && (visit.dirty || visit.touched) && (visit.errors.max)\">\n                                    Date of Screening cannot be in the future\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Screening Type</mat-label>\n                                <mat-select name=\"type\" [(ngModel)]=\"entity.screeningType\" #type=\"ngModel\" required>\n                                    <mat-option></mat-option>\n                                    <mat-option [value]=\"'FIRST_TIME'\">First Time</mat-option>\n                                    <mat-option [value]=\"'FOLLOWUP'\">Followup after previous negative result or\n                                        suspected cancer\n                                    </mat-option>\n                                    <mat-option [value]=\"'POST_TREATMENT_FOLLOWUP'\">Post-treatment Followup</mat-option>\n                                </mat-select>\n                                <mat-error\n                                        *ngIf=\"type.errors && (type.dirty || type.touched) && (type.errors.required)\">\n                                    Screening type is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Screening Method</mat-label>\n                                <mat-select name=\"method\" [(ngModel)]=\"entity.screeningMethod\" #method=\"ngModel\"\n                                            required>\n                                    <mat-option></mat-option>\n                                    <mat-option [value]=\"'VIA'\">Visual Inspection with Acetric Acid (VIA)</mat-option>\n                                    <mat-option [value]=\"'VILI'\">Visual Inspection with Lugos Iodine (VILI)</mat-option>\n                                    <mat-option [value]=\"'PAP_SMEAR'\">PAP Smear</mat-option>\n                                </mat-select>\n                                <mat-error\n                                        *ngIf=\"method.errors && (method.dirty || method.touched) && (method.errors.required)\">\n                                    Screening method is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Result of Screening</mat-label>\n                                <mat-select name=\"result\" [(ngModel)]=\"entity.screeningResult\" #result=\"ngModel\"\n                                            required>\n                                    <mat-option></mat-option>\n                                    <mat-option [value]=\"'NEGATIVE'\">Negative</mat-option>\n                                    <mat-option [value]=\"'POSITIVE'\">Positive</mat-option>\n                                    <mat-option [value]=\"'SUSPICIOUS'\">Suspicious Cancerous Lesions</mat-option>\n                                </mat-select>\n                                <mat-error\n                                        *ngIf=\"result.errors && (result.dirty || result.touched) && (result.errors.required)\">\n                                    Result of Screening is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\" *ngIf=\"entity.screeningResult === 'POSITIVE'\">\n                            <mat-checkbox [(ngModel)]=\"entity.referredForTreatment\"\n                                          name=\"uibn\"\n                            >\n                                Referred for Treatment?\n                            </mat-checkbox>\n                        </div>\n                    </div>\n                    <div class=\"row\" *ngIf=\"entity.referredForTreatment\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\" *ngIf=\"entity.dateScreened\">\n                                <input matInput [matDatepicker]=\"picker1\"\n                                       placeholder=\"Date Treated\"\n                                       [(ngModel)]=\"entity.dateTreated\"\n                                       #treat=\"ngModel\"\n                                       [max]=\"today\"\n                                       [min]=\"entity.dateScreened\"\n                                       name=\"treat\"\n                                       required>\n                                <mat-datepicker-toggle\n                                        matSuffix\n                                        [for]=\"picker1\">\n                                </mat-datepicker-toggle>\n                                <mat-datepicker #picker1></mat-datepicker>\n                                <mat-error\n                                        *ngIf=\"treat.errors && (treat.dirty || treat.touched) && (treat.errors.required)\">\n                                    Date Treated is required\n                                </mat-error>\n                                <mat-error\n                                        *ngIf=\"treat.errors && (treat.dirty || treat.touched) && (treat.errors.min)\">\n                                    Date Treated cannot be before {{entity.dateScreened}}\n                                </mat-error>\n                                <mat-error\n                                        *ngIf=\"treat.errors && (treat.dirty || treat.touched) && (treat.errors.max)\">\n                                    Date Treated cannot be in the future\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Precancerous Lesions Treatment Method</mat-label>\n                                <mat-select name=\"pc\" [(ngModel)]=\"entity.precancerousLesionsTreatmentMethod\"\n                                            #pc=\"ngModel\" required>\n                                    <mat-option></mat-option>\n                                    <mat-option [value]=\"'CRYOTHERAPY'\">Cryotherapy</mat-option>\n                                    <mat-option [value]=\"'THERMAL_ABLATION'\">Thermal Ablation/ Thermocoagulation\n                                    </mat-option>\n                                    <mat-option [value]=\"'LEETZ_LEEP'\">LEETZ/ LEEP</mat-option>\n                                    <mat-option [value]=\"'CONIZATION'\">Conization Knifer/ Lagor</mat-option>\n                                </mat-select>\n                                <mat-error\n                                        *ngIf=\"pc.errors && (pc.dirty || pc.touched) && (pc.errors.required)\">\n                                    Treatment method is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                </mat-card-content>\n                <mat-card-actions class=\"lamis-edit-form-actions\">\n                    <button mat-raised-button type=\"button\" (click)=\"previousState()\">Back</button>\n                    <button mat-raised-button color='primary'\n                            [disabled]=\"screeningForm.invalid || isSaving\"\n                            type=\"submit\">\n                        {{!!observation ? 'Update' : 'Save'}}\n                    </button>\n                </mat-card-actions>\n            </mat-card>\n        </form>\n    </div>\n</div>\n"
    }),
    __metadata("design:paramtypes", [ClinicService,
        CervicalCancerScreeningService,
        NotificationService,
        ActivatedRoute,
        AppLoaderService])
], CervicalCancerScreeningComponent);

const RESULT = {
    NEGATIVE: 'Negative',
    POSITIVE: 'Positive',
    SUSPICIOUS: 'Suspicious Cancerous Lesions'
};
const METHOD = {
    VIA: 'Visual Inspection with Acetric Acid (VIA)',
    VILI: 'Visual Inspection with Lugos Iodine (VILI)',
    PAP_SMEAR: 'PAP Smear'
};
const LESION_METHOD = {
    CRYOTHERAPY: 'Cryotherapy',
    THERMAL_ABLATION: 'Thermal Ablation/ Thermocoagulation',
    LEETZ_LEEP: 'LEETZ/ LEEP',
    CONIZATION: 'Conization Knifer/ Lagor'
};
const TYPE = {
    FIRST_TIME: 'First Time',
    FOLLOWUP: 'Followup after previous negative result or suspected cancer',
    POST_TREATMENT_FOLLOWUP: 'Post-treatment Followup'
};
let CervicalCancerScreeningDetailComponent = class CervicalCancerScreeningDetailComponent {
    constructor(router, route, screeningService, _dialogService, clinicService, notificationService) {
        this.router = router;
        this.route = route;
        this.screeningService = screeningService;
        this._dialogService = _dialogService;
        this.clinicService = clinicService;
        this.notificationService = notificationService;
        this.properties = [];
    }
    ngOnInit() {
        this.route.data.subscribe(({ entity }) => {
            this.entity = !!entity && entity.body ? entity.body.data.cervicalCancerScreening : entity.data.cervicalCancerScreening;
            this.observation = !!entity && entity.body ? entity.body : entity;
            const patientId = this.route.snapshot.paramMap.get('patientId');
            this.clinicService.getPatient(patientId).subscribe((res) => this.patient = res);
            this.buildProperties();
        });
    }
    edit() {
        this.router.navigate(['/', 'cervical-cancer-screening', this.observation.id, 'patient', this.patient.uuid, 'edit']);
    }
    delete() {
        this._dialogService.openConfirm({
            title: 'Confirm',
            message: 'Do you want to delete this Cervical cancer screening, action cannot be reversed?',
            cancelButton: 'No',
            acceptButton: 'Yes',
            width: '500px',
        }).afterClosed().subscribe((accept) => {
            if (accept) {
                this.screeningService.delete(this.observation.id).subscribe((res) => {
                    if (res.ok) {
                        this.router.navigate(['patients']);
                    }
                    else {
                        this.notificationService.showError('Error deleting screening, please try again');
                    }
                });
            }
            else {
                // DO SOMETHING ELSE
            }
        });
    }
    buildProperties() {
        this.properties.push(new CardViewDateItemModel({
            key: 'ds',
            value: this.observation.date,
            label: 'Date of Screening',
            format: 'dd MMM, yyyy'
        }));
        this.properties.push(new CardViewTextItemModel({
            key: 'na',
            value: TYPE[this.entity.screeningType],
            label: 'Screening Type',
        }));
        this.properties.push(new CardViewTextItemModel({
            label: 'Screening Method',
            key: 'fs',
            value: METHOD[this.entity.screeningMethod]
        }));
        this.properties.push(new CardViewTextItemModel({
            label: 'Result',
            key: 'adr',
            value: RESULT[this.entity.screeningResult]
        }));
        this.properties.push(new CardViewBoolItemModel({
            label: 'Referred for Treatment',
            key: 'bw',
            value: this.entity.referredForTreatment
        }));
        if (!!this.entity.referredForTreatment) {
            this.properties.push(new CardViewTextItemModel({
                label: 'Precancerous Lesions Treatment method',
                key: 'adr',
                value: LESION_METHOD[this.entity.precancerousLesionsTreatmentMethod]
            }));
            this.properties.push(new CardViewDateItemModel({
                key: 'ds',
                value: this.entity.dateTreated,
                label: 'Date of Treated',
                format: 'dd MMM, yyyy'
            }));
        }
    }
    previousState() {
        window.history.back();
    }
};
CervicalCancerScreeningDetailComponent.ctorParameters = () => [
    { type: Router },
    { type: ActivatedRoute },
    { type: CervicalCancerScreeningService },
    { type: TdDialogService },
    { type: ClinicService },
    { type: NotificationService }
];
CervicalCancerScreeningDetailComponent = __decorate([
    Component({
        selector: 'cervical-screening-detail',
        template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <mat-card>\n            <mat-card-header>\n            </mat-card-header>\n            <mat-card-content>\n                <adf-card-view [properties]=\"properties\" editable=\"false\"></adf-card-view>\n            </mat-card-content>\n            <mat-card-actions class=\"lamis-edit-form-actions\">\n                <button mat-button (click)=\"previousState()\">Back</button>\n                <button mat-raised-button color=\"warn\" (click)=\"delete()\">Delete</button>\n                <button mat-raised-button color=\"primary\" (click)=\"edit()\">Edit</button>\n            </mat-card-actions>\n        </mat-card>\n    </div>\n</div>\n"
    }),
    __metadata("design:paramtypes", [Router, ActivatedRoute, CervicalCancerScreeningService,
        TdDialogService, ClinicService,
        NotificationService])
], CervicalCancerScreeningDetailComponent);

let ObservationResolve = class ObservationResolve {
    constructor(service) {
        this.service = service;
    }
    resolve(route, state) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(filter((response) => response.ok), map((patient) => patient.body));
        }
        return of({});
    }
};
ObservationResolve.ctorParameters = () => [
    { type: CervicalCancerScreeningService }
];
ObservationResolve.ngInjectableDef = ɵɵdefineInjectable({ factory: function ObservationResolve_Factory() { return new ObservationResolve(ɵɵinject(CervicalCancerScreeningService)); }, token: ObservationResolve, providedIn: "root" });
ObservationResolve = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [CervicalCancerScreeningService])
], ObservationResolve);
const ɵ0$5 = {
    title: 'Cervical Cancer Screening',
    breadcrumb: 'CERVICAL CANCER SCREENING'
}, ɵ1$5 = {
    authorities: ['ROLE_USER'],
    title: 'Cervical Cancer Screening',
    breadcrumb: 'CERVICAL CANCER SCREENING'
}, ɵ2$5 = {
    authorities: ['ROLE_DEC'],
    title: 'Cervical Cancer Screening',
    breadcrumb: 'ADD CERVICAL CANCER SCREENING'
}, ɵ3$4 = {
    authorities: ['ROLE_DEC'],
    title: 'Cervical Cancer Screening',
    breadcrumb: 'CERVICAL CANCER SCREENING EDIT'
};
const ROUTES$5 = [
    {
        path: '',
        data: ɵ0$5,
        children: [
            {
                path: ':id/patient/:patientId/view',
                component: CervicalCancerScreeningDetailComponent,
                resolve: {
                    entity: ObservationResolve
                },
                data: ɵ1$5,
            },
            {
                path: 'patient/:patientId/new',
                component: CervicalCancerScreeningComponent,
                data: ɵ2$5,
            },
            {
                path: ':id/patient/:patientId/edit',
                component: CervicalCancerScreeningComponent,
                resolve: {
                    entity: ObservationResolve
                },
                data: ɵ3$4,
            }
        ]
    }
];

let CervicalCancerModule = class CervicalCancerModule {
};
CervicalCancerModule = __decorate([
    NgModule({
        imports: [
            MaterialModule,
            FormsModule,
            CommonModule,
            MatDateFormatModule,
            CoreModule,
            RouterModule.forChild(ROUTES$5),
            CovalentMessageModule,
            CovalentDialogsModule,
            CustomFormsModule,
            LamisSharedModule,
        ],
        declarations: [
            CervicalCancerScreeningComponent,
            CervicalCancerScreeningDetailComponent
        ],
        providers: [
        //ObservationResolve
        ]
    })
], CervicalCancerModule);

/*
 * Public API Surface of Clinic
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CaseManagementModule, CaseManagerModule, CervicalCancerModule, ChronicCareModule, ChronicCareService, ClinicModule, ClinicService, ClinicWidgetModule, EacModule, ClinicDetailsComponent as ɵa, ClinicEditComponent as ɵb, ROUTES$5 as ɵba, CervicalCancerScreeningDetailComponent as ɵbb, CervicalCancerScreeningService as ɵbc, CervicalCancerScreeningComponent as ɵbd, ClinicResolve as ɵc, ROUTES as ɵd, modules as ɵe, MaterialModule as ɵf, ClinicWidget as ɵg, ChronicCareDetailComponent as ɵh, ChronicCareEditComponent as ɵi, ChronicCareResolve as ɵj, ROUTES$1 as ɵk, EacResolve as ɵl, ROUTES$2 as ɵm, EacDetailsComponent as ɵn, EacService as ɵo, EacEditComponent as ɵp, ROUTES$3 as ɵq, PatientListComponent as ɵr, CaseManagementService as ɵs, CaseManagerResolve as ɵt, ROUTES$4 as ɵu, CaseManagerListComponent as ɵv, CaseManagerService as ɵw, CaseManagerDetailsComponent as ɵx, CaseManagerEditComponent as ɵy, ObservationResolve as ɵz };
//# sourceMappingURL=lamis-clinic-1.4.0.js.map
