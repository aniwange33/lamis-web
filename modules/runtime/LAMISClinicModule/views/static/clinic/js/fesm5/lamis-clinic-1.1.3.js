import {__decorate, __param, __metadata, __spread} from 'tslib';
import {
    Inject,
    ɵɵdefineInjectable,
    ɵɵinject,
    Injectable,
    ComponentFactoryResolver,
    Component,
    Input,
    NgModule
} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {
    DATE_FORMAT,
    SERVER_API_URL_CONFIG,
    entityCompare,
    AppLoaderService,
    MatDateFormatModule,
    LamisSharedModule,
    createRequestOption
} from '@lamis/web-core';
import {map, filter} from 'rxjs/operators';
import * as moment_ from 'moment';
import {
    CardViewDateItemModel,
    CardViewIntItemModel,
    CardViewFloatItemModel,
    CardViewTextItemModel,
    CardViewBoolItemModel,
    NotificationService,
    CoreModule
} from '@alfresco/adf-core';
import {CommonModule} from '@angular/common';
import {
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
    MatTooltipModule,
    MatStepperModule
} from '@angular/material';
import {Router, ActivatedRoute, RouterModule} from '@angular/router';
import {TdDialogService, CovalentMessageModule, CovalentDialogsModule, CovalentSearchModule} from '@covalent/core';
import {ColumnMode, NgxDatatableModule} from '@swimlane/ngx-datatable';
import {of} from 'rxjs';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CustomFormsModule} from 'ng2-validation';
import {RxStompService} from '@stomp/ng2-stompjs';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

var moment = moment_;
var ClinicService = /** @class */ (function () {
    function ClinicService(http, serverUrl) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.resourceUrl = '';
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/clinics';
    }

    ClinicService.prototype.create = function (vm) {
        var _this = this;
        vm['clinic'] = this.convertDateFromClient(vm.clinic);
        vm['oiScreened'] = !!vm.oiList ? 'Yes' : 'No';
        vm['adrScreened'] = !!vm.adrList ? 'Yes' : 'No';
        return this.http
            .post(this.resourceUrl, vm, {observe: 'response'})
            .pipe(map(function (res) {
                return _this.convertDateFromServer(res);
            }));
    };
    ClinicService.prototype.update = function (vm) {
        var _this = this;
        vm['clinic'] = this.convertDateFromClient(vm.clinic);
        vm['oiScreened'] = !!vm.oiList ? 'Yes' : 'No';
        vm['adrScreened'] = !!vm.adrList ? 'Yes' : 'No';
        return this.http
            .put(this.resourceUrl, vm, {observe: 'response'})
            .pipe(map(function (res) {
                return _this.convertDateFromServer(res);
            }));
    };
    ClinicService.prototype.find = function (id) {
        var _this = this;
        return this.http
            .get(this.resourceUrl + "/" + id, {observe: 'response'})
            .pipe(map(function (res) {
                return _this.convertDateFromServer(res);
            }));
    };
    ClinicService.prototype.findByUuid = function (id) {
        var _this = this;
        return this.http
            .get(this.resourceUrl + "/by-uuid/" + id, {observe: 'response'})
            .pipe(map(function (res) {
                return _this.convertDateFromServer(res);
            }));
    };
    ClinicService.prototype.delete = function (id) {
        return this.http.delete(this.resourceUrl + "/" + id, {observe: 'response'});
    };
    ClinicService.prototype.getVisitDatesByPatient = function (patientId) {
        return this.http.get(this.resourceUrl + "/patient/" + patientId + "/visit-dates")
            .pipe(map(function (res) {
                res.forEach(function (d) {
                    return moment(d);
                });
                return res;
            }));
    };
    ClinicService.prototype.getPatient = function (id) {
        return this.http.get("/api/patients/by-uuid/" + id, {observe: 'body'})
            .pipe(map(function (res) {
                if (res) {
                    res.dateRegistration = res.dateRegistration != null ? moment(res.dateRegistration) : null;
                    res.dateBirth = res.dateBirth != null ? moment(res.dateBirth) : null;
                }
                return res;
            }));
    };
    ClinicService.prototype.getRegimenLines = function () {
        return this.http.get(this.resourceUrl + "/regimen-types");
    };
    ClinicService.prototype.getRegimenByLine = function (id) {
        return this.http.get(this.resourceUrl + "/regimens/regimen-type/" + id);
    };
    ClinicService.prototype.adverseDrugReactions = function () {
        return this.http.get(this.resourceUrl + "/adverse-drug-reactions");
    };
    ClinicService.prototype.opportunisticInfections = function () {
        return this.http.get(this.resourceUrl + "/opportunistic-infections");
    };
    ClinicService.prototype.adheres = function () {
        return this.http.get(this.resourceUrl + "/adheres");
    };
    ClinicService.prototype.regimes = function (regimenType) {
        return this.http.get(this.resourceUrl + "/regimens/" + regimenType);
    };
    ClinicService.prototype.latestVisit = function (patientId) {
        return this.http.get(this.resourceUrl + "/patient/" + patientId + "/latest");
    };
    ClinicService.prototype.getOpportunisticInfectionsByClinic = function (clinicId) {
        return this.http.get(this.resourceUrl + "/" + clinicId + "/opportunistic-infections");
    };
    ClinicService.prototype.getAdverseDrugReactionsByClinic = function (clinicId) {
        return this.http.get(this.resourceUrl + "/" + clinicId + "/adverse-drug-reactions", {observe: 'response'});
    };
    ClinicService.prototype.getAdhereByClinic = function (clinicId) {
        return this.http.get(this.resourceUrl + "/" + clinicId + "/adheres");
    };
    ClinicService.prototype.convertDateFromClient = function (clinic) {
        var copy = Object.assign({}, clinic, {
            dateVisit: clinic.dateVisit != null && clinic.dateVisit.isValid() ? clinic.dateVisit.format(DATE_FORMAT) : null,
            lmp: clinic.lmp != null && clinic.lmp.isValid() ? clinic.lmp.format(DATE_FORMAT) : null,
            nextAppointment: clinic.nextAppointment != null && clinic.nextAppointment.isValid() ? clinic.nextAppointment.format(DATE_FORMAT) : null,
            pregnant: clinic.pregnancyStatus != null && clinic.pregnancyStatus === 2,
            breastfeeding: clinic.pregnancyStatus != null && clinic.pregnancyStatus === 3,
            bp: clinic.bp1 > 0 && clinic.bp2 > 0 ? clinic.bp1 + '/' + clinic.bp2 : null
        });
        return copy;
    };
    ClinicService.prototype.convertDateFromServer = function (res) {
        if (res.body) {
            res.body.nextAppointment = res.body.nextAppointment != null ? moment(res.body.nextAppointment) : null;
            res.body.dateVisit = res.body.dateVisit != null ? moment(res.body.dateVisit) : null;
            res.body.lmp = res.body.lmp != null ? moment(res.body.lmp) : null;
            res.body.pregnancyStatus = res.body.pregnant ? 2 : res.body.breastfeeding ? 3 : 1;
            if (res.body.bp) {
                var parts = res.body.bp.split('/');
                res.body.bp1 = parseInt(parts[0]);
                res.body.bp2 = parts.length === 2 ? parseInt(parts[1]) : null;
            }
        }
        return res;
    };
    ClinicService.prototype.convertDateArrayFromServer = function (res) {
        if (res.body) {
            res.body.forEach(function (clinic) {
                clinic.dateVisit = clinic.dateVisit != null ? moment(clinic.dateVisit) : null;
                clinic.lmp = clinic.lmp != null ? moment(clinic.lmp) : null;
                clinic.nextAppointment = clinic.nextAppointment != null ? moment(clinic.nextAppointment) : null;
                clinic.pregnancyStatus = clinic.pregnant ? 2 : clinic.breastfeeding ? 3 : 1;
            });
        }
        return res;
    };
    ClinicService.ctorParameters = function () {
        return [
            {type: HttpClient},
            {type: undefined, decorators: [{type: Inject, args: [SERVER_API_URL_CONFIG,]}]}
        ];
    };
    ClinicService.ngInjectableDef = ɵɵdefineInjectable({
        factory: function ClinicService_Factory() {
            return new ClinicService(ɵɵinject(HttpClient), ɵɵinject(SERVER_API_URL_CONFIG));
        }, token: ClinicService, providedIn: "root"
    });
    ClinicService = __decorate([
        Injectable({providedIn: 'root'}),
        __param(1, Inject(SERVER_API_URL_CONFIG)),
        __metadata("design:paramtypes", [HttpClient, Object])
    ], ClinicService);
    return ClinicService;
}());

var ClinicDetailsComponent = /** @class */ (function () {
    function ClinicDetailsComponent(router, route, clinicService, cfr, _dialogService, notificationService) {
        this.router = router;
        this.route = route;
        this.clinicService = clinicService;
        this.cfr = cfr;
        this._dialogService = _dialogService;
        this.notificationService = notificationService;
        this.properties = [];
    }

    ClinicDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (_a) {
            var entity = _a.entity;
            _this.entity = !!entity && entity.body ? entity.body : entity;
            var patientId = _this.route.snapshot.paramMap.get("patientId");
            _this.clinicService.getPatient(patientId).subscribe(function (res) {
                return _this.entity.patient = res;
            });
            _this.buildProperties();
        });
    };
    ClinicDetailsComponent.prototype.edit = function () {
        this.router.navigate(['/', 'clinics', this.entity.uuid, 'patient', this.entity.patient.uuid, 'edit']);
    };
    ClinicDetailsComponent.prototype.delete = function () {
        var _this = this;
        this._dialogService.openConfirm({
            title: 'Confirm',
            message: 'Do you want to delete this clinic visit, action cannot be reversed?',
            cancelButton: 'No',
            acceptButton: 'Yes',
            width: '500px',
        }).afterClosed().subscribe(function (accept) {
            if (accept) {
                _this.clinicService.delete(_this.entity.id).subscribe(function (res) {
                    if (res.ok) {
                        _this.router.navigate(['patients']);
                    } else {
                        _this.notificationService.showError('Error deleting visit, please try again');
                    }
                });
            } else {
                // DO SOMETHING ELSE
            }
        });
    };
    ClinicDetailsComponent.prototype.buildProperties = function () {
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
        this.properties.push(new CardViewDateItemModel({
            key: 'na',
            value: this.entity.nextAppointment,
            label: 'Next Appointment Date',
            format: 'dd MMM, yyyy'
        }));
    };
    ClinicDetailsComponent.prototype.previousState = function () {
        window.history.back();
    };
    ClinicDetailsComponent.prototype.ngOnDestroy = function () {
    };
    ClinicDetailsComponent.ctorParameters = function () {
        return [
            {type: Router},
            {type: ActivatedRoute},
            {type: ClinicService},
            {type: ComponentFactoryResolver},
            {type: TdDialogService},
            {type: NotificationService}
        ];
    };
    ClinicDetailsComponent = __decorate([
        Component({
            selector: 'lamis-clinic',
            template: "<div class=\"lamis-edit-form\">\r\n    <div class=\"lamis-edit-form-container\">\r\n        <mat-card>\r\n            <mat-card-header>\r\n            </mat-card-header>\r\n            <mat-card-content>\r\n                <adf-card-view [properties]=\"properties\" editable=\"false\"></adf-card-view>\r\n            </mat-card-content>\r\n            <mat-card-actions class=\"lamis-edit-form-actions\">\r\n                <button mat-button (click)=\"previousState()\">Back</button>\r\n                <button mat-raised-button color=\"warn\" (click)=\"delete()\">Delete</button>\r\n                <button mat-raised-button color=\"primary\" (click)=\"edit()\">Edit</button>\r\n            </mat-card-actions>\r\n        </mat-card>\r\n    </div>\r\n</div>\r\n"
        }),
        __metadata("design:paramtypes", [Router, ActivatedRoute, ClinicService,
            ComponentFactoryResolver, TdDialogService,
            NotificationService])
    ], ClinicDetailsComponent);
    return ClinicDetailsComponent;
}());

var moment$1 = moment_;
var ClinicEditComponent = /** @class */ (function () {
    function ClinicEditComponent(clinicService, notification, activatedRoute, appLoaderService) {
        this.clinicService = clinicService;
        this.notification = notification;
        this.activatedRoute = activatedRoute;
        this.appLoaderService = appLoaderService;
        this.error = false;
        this.today = moment$1();
        this.visitDates = [];
        this.selectedClinicAdr = [];
        this.oiList = [];
        this.adhereList = [];
        this.ColumnMode = ColumnMode;
        this.adr = false;
    }

    ClinicEditComponent.prototype.createEntity = function () {
        return {};
    };
    ClinicEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.clinicService.opportunisticInfections().subscribe(function (res) {
            return _this.opportunisticInfections = res;
        });
        this.clinicService.adheres().subscribe(function (res) {
            return _this.adheres = res;
        });
        this.isSaving = false;
        this.clinicService.getRegimenLines().subscribe(function (res) {
            _this.regimenLines = res;
        });
        this.activatedRoute.data.subscribe(function (_a) {
            var entity = _a.entity;
            _this.commence = !!_this.activatedRoute.snapshot.data['commence'];
            _this.entity = !!entity && entity.body ? entity.body : entity;
            if (_this.entity === undefined) {
                _this.entity = _this.createEntity();
            }
            var patientId = _this.activatedRoute.snapshot.paramMap.get('patientId');
            _this.clinicService.getPatient(patientId).subscribe(function (res) {
                _this.entity.patient = res;
                _this.entity.facility = res.facility;
                _this.dateBirth = res.dateBirth;
                _this.dateRegistration = res.dateRegistration;
                _this.clinicService.getVisitDatesByPatient(_this.entity.patient.id).subscribe(function (res) {
                    _this.visitDates = res;
                });
            });
            if (_this.entity.commence && _this.entity.regimenType) {
                _this.regimenLineChange(_this.entity.regimenType);
            }
            _this.commence = _this.commence || _this.entity.commence;
            if (_this.commence) {
                _this.entity.commence = true;
                if (_this.entity.regimenType) {
                    _this.regimenLineChange(_this.entity.regimenType);
                }
                if (_this.entity.patient.statusAtRegistration === 'ART_TRANSFER_IN') {
                    _this.dateRegistration = _this.entity.patient.dateRegistration.clone().subtract(10, 'years');
                    if (_this.dateRegistration.isBefore(_this.entity.patient.dateBirth)) {
                        _this.dateRegistration = _this.entity.patient.dateBirth.clone().add(3, 'months');
                    }
                }
            }
            if (_this.entity.id) {
                _this.appointmentMin = _this.entity.dateVisit.clone().add(14, 'days');
                _this.appointmentMax = _this.entity.dateVisit.clone().add(6, 'months');
                _this.clinicService.getAdhereByClinic(_this.entity.id).subscribe(function (res) {
                    _this.adhereList = res.map(function (ca) {
                        return ca.adhere;
                    });
                });
                _this.clinicService.adverseDrugReactions().subscribe(function (res1) {
                    _this.adverseDrugReactions = res1;
                    _this.clinicService.getAdverseDrugReactionsByClinic(_this.entity.id).subscribe(function (res) {
                        if (res.body && res.body.length > 0) {
                            _this.adr = true;
                        }
                        _this.adverseDrugReactions.forEach(function (adr) {
                            var found = false;
                            if (res.body) {
                                res.body.forEach(function (cadr) {
                                    if (cadr.adverseDrugReaction.id === adr.id) {
                                        found = true;
                                        _this.selectedClinicAdr.push(cadr);
                                    }
                                });
                            }
                            if (!found) {
                                _this.selectedClinicAdr.push({
                                    adverseDrugReaction: adr
                                });
                            }
                        });
                        _this.selectedClinicAdr = __spread(_this.selectedClinicAdr);
                    });
                });
                _this.clinicService.getOpportunisticInfectionsByClinic(_this.entity.id).subscribe(function (res) {
                    _this.oiList = res.map(function (co) {
                        return co.opportunisticInfection;
                    });
                });
            } else {
                _this.clinicService.adverseDrugReactions().subscribe(function (res) {
                    _this.adverseDrugReactions = res;
                    _this.adverseDrugReactions.forEach(function (adr) {
                        _this.selectedClinicAdr.push({
                            adverseDrugReaction: adr
                        });
                    });
                });
                _this.selectedClinicAdr = __spread(_this.selectedClinicAdr);
            }
        });
    };
    ClinicEditComponent.prototype.updateValue = function (event, cell, row) {
        console.log('Edit', event, cell, row);
        this.selectedClinicAdr = __spread(this.selectedClinicAdr.map(function (cadr) {
            if (cadr.adverseDrugReaction.id === row.id) {
                cadr.severity = event;
            }
            return cadr;
        }));
        console.log('UPDATED!', row, event);
    };
    ClinicEditComponent.prototype.filterDates = function (date) {
        var exists = false;
        this.visitDates.forEach(function (d) {
            if (date.diff(d, 'days') === 0) {
                exists = true;
            }
        });
        return (this.entity.id && date.diff(this.entity.dateVisit, 'days') === 0) || !exists;
    };
    ClinicEditComponent.prototype.dateChanged = function (date) {
        this.appointmentMax = date.clone().add(6, 'months');
        this.lmpMin = date.clone().subtract(2, 'years');
        this.appointmentMin = date.clone().add(14, 'days');
    };
    ClinicEditComponent.prototype.entityCompare = function (e1, e2) {
        return entityCompare(e1, e2);
    };
    ClinicEditComponent.prototype.previousState = function () {
        window.history.back();
    };
    ClinicEditComponent.prototype.save = function () {
        this.isSaving = true;
        var vm = {
            clinic: this.entity,
            adrList: this.selectedClinicAdr.filter(function (cadr) {
                return !!cadr.severity;
            }),
            oiList: this.oiList,
            adhereList: this.adhereList
        };
        this.appLoaderService.open('Saving clinic visit..');
        if (this.entity.id !== undefined) {
            this.subscribeToSaveResponse(this.clinicService.update(vm));
        } else {
            this.subscribeToSaveResponse(this.clinicService.create(vm));
        }
    };
    ClinicEditComponent.prototype.regimenLineChange = function (type) {
        var _this = this;
        this.clinicService.getRegimenByLine(type.id).subscribe(function (res) {
            return _this.regimens = res;
        });
    };
    ClinicEditComponent.prototype.subscribeToSaveResponse = function (result) {
        var _this = this;
        result.subscribe(function (res) {
            return _this.onSaveSuccess(res.body);
        }, function (res) {
            _this.onSaveError();
            _this.onError(res.message);
        });
    };
    ClinicEditComponent.prototype.onSaveSuccess = function (result) {
        this.appLoaderService.close();
        this.isSaving = false;
        this.notification.openSnackMessage('Clinic visit successfully saved');
        this.previousState();
    };
    ClinicEditComponent.prototype.onSaveError = function () {
        this.isSaving = false;
        this.appLoaderService.close();
        this.error = true;
        //this.submitButton.disabled = true;
        this.notification.showError('Error occurred saving clinic visit; try again');
        //this.progressBar.mode = 'determinate';
    };
    ClinicEditComponent.prototype.onError = function (errorMessage) {
        this.appLoaderService.close();
        this.notification.showError(errorMessage);
    };
    ClinicEditComponent.ctorParameters = function () {
        return [
            {type: ClinicService},
            {type: NotificationService},
            {type: ActivatedRoute},
            {type: AppLoaderService}
        ];
    };
    ClinicEditComponent = __decorate([
        Component({
            selector: 'lamis-clinic-edit',
            template: "<div class=\"lamis-edit-form\">\r\n    <div class=\"lamis-edit-form-container\">\r\n        <form name=\"form\" role=\"form\" novalidate (ngSubmit)=\"save()\" #clinicForm=\"ngForm\">\r\n            <mat-card class=\"default\">\r\n                <mat-card-content>\r\n                    <ng-container *ngIf=\"commence === true\">\r\n                        <div>\r\n                            <mat-form-field class=\"full-width\">\r\n                                <input matInput [matDatepicker]=\"picker\"\r\n                                       placeholder=\"ART Start Date\"\r\n                                       [(ngModel)]=\"entity.dateVisit\"\r\n                                       #visit=\"ngModel\"\r\n                                       (dateChange)=\"dateChanged($event.value)\"\r\n                                       [matDatepickerFilter]=\"filterDates.bind(this)\"\r\n                                       [max]=\"today\"\r\n                                       [min]=\"dateRegistration\"\r\n                                       name=\"visit\"\r\n                                       required>\r\n                                <mat-datepicker-toggle\r\n                                        matSuffix\r\n                                        [for]=\"picker\">\r\n                                </mat-datepicker-toggle>\r\n                                <mat-datepicker #picker></mat-datepicker>\r\n                                <mat-error\r\n                                        *ngIf=\"visit.errors && (visit.dirty || visit.touched) && (visit.errors.required)\">\r\n                                    ART Start Date is required\r\n                                </mat-error>\r\n                                <mat-error\r\n                                        *ngIf=\"visit.errors && (visit.dirty || visit.touched) && (visit.errors.min)\">\r\n                                    Date of visit cannot be before {{dateRegistration | date: 'dd MMM, yyyy'}}\r\n                                </mat-error>\r\n                                <mat-error\r\n                                        *ngIf=\"visit.errors && (visit.dirty || visit.touched) && (visit.errors.max)\">\r\n                                    ART Start Date cannot be in the future\r\n                                </mat-error>\r\n                            </mat-form-field>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                            <div class=\"col-md-6\">\r\n                                <mat-form-field class=\"full-width\">\r\n                                    <input matInput placeholder=\"CD4 at start of ART\" [min]=\"0\" type=\"number\"\r\n                                           #cd4=\"ngModel\" name=\"cd4\" [(ngModel)]=\"entity.cd4\"/>\r\n                                    <mat-error\r\n                                            *ngIf=\"cd4.errors && (cd4.dirty || cd4.touched) && (cd4.errors.min)\">\r\n                                        Minimum CD4 is 0\r\n                                    </mat-error>\r\n                                </mat-form-field>\r\n                            </div>\r\n                            <div class=\"col-md-6\">\r\n                                <mat-form-field class=\"full-width\">\r\n                                    <input matInput placeholder=\"CD4 %\" [min]=\"0\" [max]=\"100\" type=\"number\"\r\n                                           #cd4p=\"ngModel\" name=\"cd4p\" [(ngModel)]=\"entity.cd4p\"/>\r\n                                    <mat-error\r\n                                            *ngIf=\"cd4p.errors && (cd4p.dirty || cd4p.touched) && (cd4p.errors.min)\">\r\n                                        Minimum CD4 % is 0\r\n                                    </mat-error>\r\n                                    <mat-error\r\n                                            *ngIf=\"cd4p.errors && (cd4p.dirty || cd4p.touched) && (cd4p.errors.max)\">\r\n                                        Maximum CD4 % is 100\r\n                                    </mat-error>\r\n                                </mat-form-field>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                            <div class=\"col-md-6\">\r\n                                <mat-form-field class=\"full-width\">\r\n                                    <mat-select [(ngModel)]=\"entity.regimenType\"\r\n                                                placeholder=\"Original Regimen Line\"\r\n                                                #rtype=\"ngModel\" required name=\"rt\"\r\n                                                [compareWith]=\"entityCompare\"\r\n                                                (selectionChange)=\"regimenLineChange($event.value)\">\r\n                                        <mat-option>None</mat-option>\r\n                                        <mat-option *ngFor=\"let line of regimenLines\"\r\n                                                    [value]=\"line\">{{line.description}}</mat-option>\r\n                                        <mat-error\r\n                                                *ngIf=\"rtype.errors && (rtype.dirty || rtype.touched) && (rtype.errors.required)\">\r\n                                            Regimen Line is required\r\n                                        </mat-error>\r\n                                    </mat-select>\r\n                                </mat-form-field>\r\n                            </div>\r\n                            <div class=\"col-md-6\">\r\n                                <mat-form-field class=\"full-width\">\r\n                                    <mat-select [(ngModel)]=\"entity.regimen\"\r\n                                                placeholder=\"Original Regimen\"\r\n                                                [compareWith]=\"entityCompare\"\r\n                                                #rm=\"ngModel\" required name=\"rm\">\r\n                                        <mat-option>None</mat-option>\r\n                                        <mat-option *ngFor=\"let regimen of regimens\"\r\n                                                    [value]=\"regimen\">{{regimen.description}}</mat-option>\r\n                                        <mat-error\r\n                                                *ngIf=\"rm.errors && (rm.dirty || rm.touched) && (rm.errors.required)\">\r\n                                            Regimen is required\r\n                                        </mat-error>\r\n                                    </mat-select>\r\n                                </mat-form-field>\r\n                            </div>\r\n                        </div>\r\n                    </ng-container>\r\n                    <div *ngIf=\"commence === false || commence === undefined\">\r\n                        <mat-form-field class=\"full-width\">\r\n                            <input matInput [matDatepicker]=\"picker\"\r\n                                   placeholder=\"Date of Visit\"\r\n                                   [(ngModel)]=\"entity.dateVisit\"\r\n                                   [matDatepickerFilter]=\"filterDates.bind(this)\"\r\n                                   #visit=\"ngModel\"\r\n                                   (dateChange)=\"dateChanged($event.value)\"\r\n                                   [max]=\"today\"\r\n                                   [min]=\"dateRegistration\"\r\n                                   name=\"visit\"\r\n                                   required>\r\n                            <mat-datepicker-toggle\r\n                                    matSuffix\r\n                                    [for]=\"picker\">\r\n                            </mat-datepicker-toggle>\r\n                            <mat-datepicker #picker></mat-datepicker>\r\n                            <mat-error\r\n                                    *ngIf=\"visit.errors && (visit.dirty || visit.touched) && (visit.errors.required)\">\r\n                                Date of visit is required\r\n                            </mat-error>\r\n                            <mat-error\r\n                                    *ngIf=\"visit.errors && (visit.dirty || visit.touched) && (visit.errors.min)\">\r\n                                Date of visit cannot be before {{dateRegistration | date: 'dd MMM, yyyy'}}\r\n                            </mat-error>\r\n                            <mat-error\r\n                                    *ngIf=\"visit.errors && (visit.dirty || visit.touched) && (visit.errors.max)\">\r\n                                Date of visit cannot be in the future\r\n                            </mat-error>\r\n                        </mat-form-field>\r\n                    </div>\r\n                    <div>\r\n                        <mat-form-field class=\"full-width\">\r\n                            <mat-select [(ngModel)]=\"entity.clinicStage\"\r\n                                        placeholder=\"Clinical Stage\"\r\n                                        #clinicStage=\"ngModel\" name=\"cs\">\r\n                                <mat-option>None</mat-option>\r\n                                <mat-option [value]=\"'Stage I'\">Stage I</mat-option>\r\n                                <mat-option [value]=\"'Stage II'\">Stage II</mat-option>\r\n                                <mat-option [value]=\"'Stage III'\">Stage III</mat-option>\r\n                                <mat-option [value]=\"'Stage IV'\">Stage IV</mat-option>\r\n                            </mat-select>\r\n                        </mat-form-field>\r\n                    </div>\r\n                    <div>\r\n                        <mat-form-field class=\"full-width\">\r\n                            <mat-select [(ngModel)]=\"entity.funcStatus\"\r\n                                        placeholder=\"Functional Status\"\r\n                                        #funcStatus=\"ngModel\" name=\"fs\">\r\n                                <mat-option>None</mat-option>\r\n                                <mat-option [value]=\"'Working'\">Working</mat-option>\r\n                                <mat-option [value]=\"'Ambulatory'\">Ambulatory</mat-option>\r\n                                <mat-option [value]=\"'Bedridden'\">Bedridden</mat-option>\r\n                            </mat-select>\r\n                        </mat-form-field>\r\n                    </div>\r\n                    <div>\r\n                        <mat-form-field class=\"full-width\">\r\n                            <mat-select [(ngModel)]=\"entity.tbStatus\"\r\n                                        placeholder=\"TB Status\"\r\n                                        name=\"tb\"\r\n                                        #tbStatus=\"ngModel\">\r\n                                <mat-option>None</mat-option>\r\n                                <mat-option [value]=\"'No sign or symptoms of TB'\">No sign or symptoms of TB</mat-option>\r\n                                <mat-option [value]=\"'TB suspected and referred for evaluation'\">TB suspected and\r\n                                    referred\r\n                                    for evaluation\r\n                                </mat-option>\r\n                                <mat-option [value]=\"'Currently on INH prophylaxis'\">Currently on INH prophylaxis\r\n                                </mat-option>\r\n                                <mat-option [value]=\"'Currently on TB treatment'\">Currently on TB treatment</mat-option>\r\n                                <mat-option [value]=\"'TB positive not on TB drugs'\">TB positive not on TB drugs\r\n                                </mat-option>\r\n                            </mat-select>\r\n                        </mat-form-field>\r\n                    </div>\r\n                    <div>\r\n                        <mat-form-field class=\"full-width\">\r\n                            <input matInput placeholder=\"Body weight(Kg)\" [min]=\"0\" [max]=\"250\" type=\"number\"\r\n                                   #weight=\"ngModel\" name=\"weight\" [(ngModel)]=\"entity.bodyWeight\"/>\r\n                            <mat-error\r\n                                    *ngIf=\"weight.errors && (weight.dirty || weight.touched) && (weight.errors.min)\">\r\n                                Minimum body weight is 0\r\n                            </mat-error>\r\n                            <mat-error\r\n                                    *ngIf=\"weight.errors && (weight.dirty || weight.touched) && (weight.errors.max)\">\r\n                                Maximum body weight is 250\r\n                            </mat-error>\r\n                        </mat-form-field>\r\n                    </div>\r\n                    <div>\r\n                        <mat-form-field class=\"full-width\">\r\n                            <input matInput placeholder=\"Height (m)\" [min]=\"0\" [max]=\"1.8\" type=\"number\"\r\n                                   #height=\"ngModel\" name=\"height\" [(ngModel)]=\"entity.height\"/>\r\n                            <mat-error\r\n                                    *ngIf=\"height.errors && (height.dirty || height.touched) && (height.errors.min)\">\r\n                                Minimum height is 0\r\n                            </mat-error>\r\n                            <mat-error\r\n                                    *ngIf=\"height.errors && (height.dirty || height.touched) && (height.errors.max)\">\r\n                                Maximum height is 1.8m\r\n                            </mat-error>\r\n                        </mat-form-field>\r\n                    </div>\r\n                    <fieldset>\r\n                        <h6>Blood Pressure(mmHg)</h6>\r\n                        <div class=\"row\">\r\n                            <div class=\"col-md-3\">\r\n                                <mat-form-field class=\"full-width\">\r\n                                    <input matInput placeholder=\"Systolic\"\r\n                                           name=\"bp1\" type=\"number\"\r\n                                           [max]=\"190\"\r\n                                           [min]=\"70\"\r\n                                           [required]=\"!!entity.bp2\"\r\n                                           #bp1=\"ngModel\" [(ngModel)]=\"entity.bp1\"/>\r\n                                    <mat-error\r\n                                            *ngIf=\"bp1.errors && (bp1.dirty || bp1.touched) && (bp1.errors.max)\">\r\n                                        Maximum Systolic is 190\r\n                                    </mat-error>\r\n                                    <mat-error\r\n                                            *ngIf=\"bp1.errors && (bp1.dirty || bp1.touched) && (bp1.errors.min)\">\r\n                                        Minimum Systolic is 70\r\n                                    </mat-error>\r\n                                    <mat-error\r\n                                            *ngIf=\"bp1.errors && (bp1.dirty || bp1.touched) && (bp1.errors.required)\">\r\n                                        Systolic is required\r\n                                    </mat-error>\r\n                                </mat-form-field>\r\n                            </div>\r\n                            <div class=\"col-md-3\">\r\n                                <mat-form-field class=\"full-width\">\r\n                                    <input matInput placeholder=\"Diastolic\"\r\n                                           name=\"bp2\" type=\"number\"\r\n                                           [max]=\"100\"\r\n                                           [min]=\"40\"\r\n                                           [required]=\"!!entity.bp1\"\r\n                                           #bp2=\"ngModel\" [(ngModel)]=\"entity.bp2\"/>\r\n                                    <mat-error\r\n                                            *ngIf=\"bp2.errors && (bp2.dirty || bp2.touched) && (bp2.errors.max)\">\r\n                                        Maximum Diastolic is 100\r\n                                    </mat-error>\r\n                                    <mat-error\r\n                                            *ngIf=\"bp2.errors && (bp2.dirty || bp2.touched) && (bp2.errors.min)\">\r\n                                        Minimum Diastolic is 40\r\n                                    </mat-error>\r\n                                    <mat-error\r\n                                            *ngIf=\"bp2.errors && (bp2.dirty || bp2.touched) && (bp2.errors.required)\">\r\n                                        Diastolic is required\r\n                                    </mat-error>\r\n                                </mat-form-field>\r\n                            </div>\r\n                        </div>\r\n                    </fieldset>\r\n                    <div *ngIf=\"entity.patient && entity.patient.gender === 'FEMALE'\">\r\n                        <mat-form-field class=\"full-width\">\r\n                            <mat-select [(ngModel)]=\"entity.pregnancyStatus\"\r\n                                        placeholder=\"Pregnancy Status\"\r\n                                        #pregStatus=\"ngModel\" name=\"ps\">\r\n                                <mat-option>None</mat-option>\r\n                                <mat-option [value]=\"1\">Not Pregnant</mat-option>\r\n                                <mat-option [value]=\"2\">Pregnant</mat-option>\r\n                                <mat-option [value]=\"3\">Breastfeeding</mat-option>\r\n                            </mat-select>\r\n                        </mat-form-field>\r\n                    </div>\r\n                    <div *ngIf=\"entity.patient && entity.patient.gender === 'FEMALE' && lmpMin\">\r\n                        <mat-form-field class=\"full-width\">\r\n                            <input matInput [matDatepicker]=\"picker1\"\r\n                                   placeholder=\"LMP\"\r\n                                   [(ngModel)]=\"entity.lmp\"\r\n                                   #lmp=\"ngModel\"\r\n                                   [max]=\"entity.dateVisit\"\r\n                                   [min]=\"lmpMin\"\r\n                                   name=\"lmp\">\r\n                            <mat-datepicker-toggle\r\n                                    matSuffix\r\n                                    [for]=\"picker1\">\r\n                            </mat-datepicker-toggle>\r\n                            <mat-datepicker #picker1></mat-datepicker>\r\n                            <mat-error\r\n                                    *ngIf=\"lmp.errors && (lmp.dirty || lmp.touched) && (lmp.errors.max)\">\r\n                                LMP cannot be after {{entity.dateVisit | date: 'dd MMM, yyyy'}}\r\n                            </mat-error>\r\n                            <mat-error\r\n                                    *ngIf=\"lmp.errors && (lmp.dirty || lmp.touched) && (lmp.errors.min)\">\r\n                                LMP cannot be before {{lmpMin | date: 'dd MMM, yyyy'}}\r\n                            </mat-error>\r\n                        </mat-form-field>\r\n                    </div>\r\n                    <div>\r\n                        <mat-form-field class=\"full-width\">\r\n                            <mat-select [(ngModel)]=\"oiList\"\r\n                                        placeholder=\"Opportunistic Infections\"\r\n                                        [compareWith]=\"entityCompare\"\r\n                                        name=\"ois\"\r\n                                        #oiIds=\"ngModel\" multiple>\r\n                                <mat-option>None</mat-option>\r\n                                <mat-option *ngFor=\"let oi of opportunisticInfections\"\r\n                                            [value]=\"oi\">{{oi.description}}</mat-option>\r\n                            </mat-select>\r\n                        </mat-form-field>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-4\">\r\n                            <mat-checkbox [(ngModel)]=\"adr\"\r\n                                          name=\"ad\">Adverse Drug Reaction Screened?\r\n                            </mat-checkbox>\r\n                        </div>\r\n                        <div style=\"height: 300px; overflow-y: auto;\" *ngIf=\"adr\" class=\"col-md-8\">\r\n                            <adf-datatable [rows]=\"selectedClinicAdr\"\r\n                                           [stickyHeader]=\"true\">\r\n                                <data-columns>\r\n                                    <data-column key=\"adverseDrugReaction.description\" title=\"Description\"\r\n                                                 sortable=\"true\"></data-column>\r\n                                    <data-column key=\"severity\" title=\"Severity\" sortable=\"false\">\r\n                                        <ng-template let-context=\"$implicit\">\r\n                                            <mat-form-field class=\"full-width\">\r\n                                                <mat-select autofocus\r\n                                                            [value]=\"context.row.getValue('severity')\"\r\n                                                            name=\"severity\"\r\n                                                            (valueChange)=\"updateValue($event, 'severity', context.row.getValue('adverseDrugReaction'))\">\r\n                                                    <mat-option>None</mat-option>\r\n                                                    <mat-option [value]=\"'Grade 1'\">Grade 1</mat-option>\r\n                                                    <mat-option [value]=\"'Grade 2'\">Grade 2</mat-option>\r\n                                                    <mat-option [value]=\"'Grade 3'\">Grade 3</mat-option>\r\n                                                    <mat-option [value]=\"'Grade 4'\">Grade 4</mat-option>\r\n                                                </mat-select>\r\n                                            </mat-form-field>\r\n                                        </ng-template>\r\n                                    </data-column>\r\n                                </data-columns>\r\n                            </adf-datatable>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <mat-form-field class=\"full-width\">\r\n                                <mat-select [(ngModel)]=\"entity.adherenceLevel\"\r\n                                            placeholder=\"Level of Adherence\"\r\n                                            #adherence=\"ngModel\" name=\"al\">\r\n                                    <mat-option>None</mat-option>\r\n                                    <mat-option [value]=\"'Good'\">Good</mat-option>\r\n                                    <mat-option [value]=\"'Fair'\">Fair</mat-option>\r\n                                    <mat-option [value]=\"'Poor'\">Poor</mat-option>\r\n                                </mat-select>\r\n                            </mat-form-field>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <mat-form-field class=\"full-width\"\r\n                                            *ngIf=\"entity.adherenceLevel === 'Fair' || entity.adherenceLevel === 'Poor'\">\r\n                                <mat-select [(ngModel)]=\"adhereList\"\r\n                                            placeholder=\"Adherence\"\r\n                                            name=\"ads\"\r\n                                            [compareWith]=\"entityCompare\"\r\n                                            #adrIds=\"ngModel\" multiple>\r\n                                    <mat-option>None</mat-option>\r\n                                    <mat-option *ngFor=\"let adhere of adheres\"\r\n                                                [value]=\"adhere\">{{adhere.description}}</mat-option>\r\n                                </mat-select>\r\n                            </mat-form-field>\r\n                        </div>\r\n                    </div>\r\n                    <div *ngIf=\"!!appointmentMin\">\r\n                        <mat-form-field class=\"full-width\">\r\n                            <input matInput [matDatepicker]=\"picker2\"\r\n                                   placeholder=\"Date of Next Appointment\"\r\n                                   [(ngModel)]=\"entity.nextAppointment\"\r\n                                   #na=\"ngModel\"\r\n                                   [min]=\"appointmentMin\"\r\n                                   [max]=\"appointmentMax\"\r\n                                   name=\"na\"\r\n                                   required>\r\n                            <mat-datepicker-toggle\r\n                                    matSuffix\r\n                                    [for]=\"picker2\">\r\n                            </mat-datepicker-toggle>\r\n                            <mat-datepicker #picker2></mat-datepicker>\r\n                            <mat-error\r\n                                    *ngIf=\"na.errors && (na.dirty || na.touched) && (na.errors.required)\">\r\n                                Date of next appointment is required\r\n                            </mat-error>\r\n                            <mat-error\r\n                                    *ngIf=\"na.errors && (na.dirty || na.touched) && (na.errors.max)\">\r\n                                Date of next appointment cannot be after {{appointmentMax | date: 'dd MMM, yyyy'}}\r\n                            </mat-error>\r\n                            <mat-error\r\n                                    *ngIf=\"na.errors && (na.dirty || na.touched) && (na.errors.min)\">\r\n                                Date of next appointment cannot be before {{appointmentMin | date: 'dd MMM, yyyy'}}\r\n                            </mat-error>\r\n                        </mat-form-field>\r\n                    </div>\r\n                    <div>\r\n                        <mat-form-field class=\"full-width\">\r\n                            <textarea matInput placeholder=\"Clinical Notes\"\r\n                                      cols=\"30\"\r\n                                      rows=\"3\"\r\n                                      name=\"notes\"\r\n                                      #note=\"ngModel\" [(ngModel)]=\"entity.notes\"></textarea>\r\n                        </mat-form-field>\r\n                    </div>\r\n                    <mat-card-actions class=\"lamis-edit-form-actions\">\r\n                        <button mat-raised-button type=\"button\" (click)=\"previousState()\">Back</button>\r\n                        <button mat-raised-button color='primary'\r\n                                [disabled]=\"clinicForm.invalid || isSaving\"\r\n                                type=\"submit\">\r\n                            {{entity.id !== undefined ? 'Update' : 'Save'}}\r\n                        </button>\r\n                    </mat-card-actions>\r\n                </mat-card-content>\r\n            </mat-card>\r\n        </form>\r\n    </div>\r\n</div>\r\n"
        }),
        __metadata("design:paramtypes", [ClinicService,
            NotificationService,
            ActivatedRoute,
            AppLoaderService])
    ], ClinicEditComponent);
    return ClinicEditComponent;
}());

var ClinicResolve = /** @class */ (function () {
    function ClinicResolve(service) {
        this.service = service;
    }

    ClinicResolve.prototype.resolve = function (route, state) {
        var id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.findByUuid(id).pipe(filter(function (response) {
                return response.ok;
            }), map(function (patient) {
                return patient.body;
            }));
        }
        return of({});
    };
    ClinicResolve.ctorParameters = function () {
        return [
            {type: ClinicService}
        ];
    };
    ClinicResolve = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [ClinicService])
    ], ClinicResolve);
    return ClinicResolve;
}());
var ɵ0 = {
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
    title: 'ART Commencement',
    breadcrumb: 'ADD ART COMMENCEMENT',
    commence: true
}, ɵ4 = {
    authorities: ['ROLE_DEC'],
    title: 'Clinic Visit Edit',
    breadcrumb: 'CLINIC VISIT EDIT'
};
var ROUTES = [
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

var ClinicWidget = /** @class */ (function () {
    function ClinicWidget(clinicService) {
        this.clinicService = clinicService;
        this.properties = [];
    }

    ClinicWidget.prototype.ngOnInit = function () {
        var _this = this;
        this.clinicService.latestVisit(this.patientId).subscribe(function (res) {
            _this.clinic = res;
            _this.buildProperties();
        });
    };
    ClinicWidget.prototype.buildProperties = function () {
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
    };
    ClinicWidget.ctorParameters = function () {
        return [
            {type: ClinicService}
        ];
    };
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
    return ClinicWidget;
}());

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

var MaterialModule = /** @class */ (function () {
    function MaterialModule() {
    }

    MaterialModule = __decorate([
        NgModule({
            imports: modules(),
            exports: modules()
        })
    ], MaterialModule);
    return MaterialModule;
}());

var ClinicWidgetModule = /** @class */ (function () {
    function ClinicWidgetModule() {
    }

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
    return ClinicWidgetModule;
}());

var ClinicModule = /** @class */ (function () {
    function ClinicModule() {
    }

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
    return ClinicModule;
}());

var moment$2 = moment_;
var ChronicCareService = /** @class */ (function () {
    function ChronicCareService(http, serverUrl) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.resourceUrl = '';
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/chronic-cares';
    }

    ChronicCareService.prototype.create = function (chronicCare) {
        var _this = this;
        var copy = this.convertDateFromClient(chronicCare);
        return this.http
            .post(this.resourceUrl, copy, {observe: 'response'})
            .pipe(map(function (res) {
                return _this.convertDateFromServer(res);
            }));
    };
    ChronicCareService.prototype.update = function (chronicCare) {
        var _this = this;
        var copy = this.convertDateFromClient(chronicCare);
        return this.http
            .put(this.resourceUrl, copy, {observe: 'response'})
            .pipe(map(function (res) {
                return _this.convertDateFromServer(res);
            }));
    };
    ChronicCareService.prototype.find = function (id) {
        var _this = this;
        return this.http
            .get(this.resourceUrl + "/" + id, {observe: 'response'})
            .pipe(map(function (res) {
                return _this.convertDateFromServer(res);
            }));
    };
    ChronicCareService.prototype.findByUuid = function (id) {
        var _this = this;
        return this.http
            .get(this.resourceUrl + "/by-uuid/" + id, {observe: 'response'})
            .pipe(map(function (res) {
                return _this.convertDateFromServer(res);
            }));
    };
    ChronicCareService.prototype.delete = function (id) {
        return this.http.delete(this.resourceUrl + "/" + id, {observe: 'response'});
    };
    ChronicCareService.prototype.getDmScreens = function () {
        return this.http.get(this.resourceUrl + "/dm-screens");
    };
    ChronicCareService.prototype.getTbScreens = function () {
        return this.http.get(this.resourceUrl + "/tb-screens");
    };
    ChronicCareService.prototype.getDmScreenByChronicCare = function (id) {
        return this.http.get(this.resourceUrl + "/" + id + "/dm-screens");
    };
    ChronicCareService.prototype.getTbScreenByChronicCare = function (id) {
        return this.http.get(this.resourceUrl + "/" + id + "/tb-screens");
    };
    ChronicCareService.prototype.getVisitDatesByPatient = function (patientId) {
        return this.http.get(this.resourceUrl + "/patient/" + patientId + "/visit-dates")
            .pipe(map(function (res) {
                res.forEach(function (d) {
                    return moment$2(d);
                });
                return res;
            }));
    };
    ChronicCareService.prototype.convertDateFromServer = function (res) {
        if (res.body) {
            res.body.dateLastCd4 = res.body.dateLastCd4 != null ? moment$2(res.body.dateLastCd4) : null;
            res.body.dateVisit = res.body.dateVisit != null ? moment$2(res.body.dateVisit) : null;
            res.body.dateLastViralLoad = res.body.dateLastViralLoad != null ? moment$2(res.body.dateLastViralLoad) : null;
            res.body.dateStartedTbTreatment = res.body.dateStartedTbTreatment != null ? moment$2(res.body.dateStartedTbTreatment) : null;
        }
        return res;
    };
    ChronicCareService.prototype.convertDateFromClient = function (vm) {
        vm.chronicCare = Object.assign({}, vm.chronicCare, {
            dateLastViralLoad: vm.chronicCare.dateLastViralLoad != null && vm.chronicCare.dateLastViralLoad.isValid() ?
                vm.chronicCare.dateLastViralLoad.format(DATE_FORMAT) : null,
            dateVisit: vm.chronicCare.dateVisit != null && vm.chronicCare.dateVisit.isValid() ?
                vm.chronicCare.dateVisit.format(DATE_FORMAT) : null,
            dateLastCd4: vm.chronicCare.dateLastCd4 != null && vm.chronicCare.dateLastCd4.isValid() ?
                vm.chronicCare.dateLastCd4.format(DATE_FORMAT) : null,
            dateStartedTbTreatment: vm.chronicCare.dateStartedTbTreatment != null &&
            vm.chronicCare.dateStartedTbTreatment.isValid() ? vm.chronicCare.dateStartedTbTreatment.format(DATE_FORMAT) : null
        });
        return vm;
    };
    ChronicCareService.ctorParameters = function () {
        return [
            {type: HttpClient},
            {type: undefined, decorators: [{type: Inject, args: [SERVER_API_URL_CONFIG,]}]}
        ];
    };
    ChronicCareService.ngInjectableDef = ɵɵdefineInjectable({
        factory: function ChronicCareService_Factory() {
            return new ChronicCareService(ɵɵinject(HttpClient), ɵɵinject(SERVER_API_URL_CONFIG));
        }, token: ChronicCareService, providedIn: "root"
    });
    ChronicCareService = __decorate([
        Injectable({providedIn: 'root'}),
        __param(1, Inject(SERVER_API_URL_CONFIG)),
        __metadata("design:paramtypes", [HttpClient, Object])
    ], ChronicCareService);
    return ChronicCareService;
}());

var ChronicCareDetailComponent = /** @class */ (function () {
    function ChronicCareDetailComponent(router, route, chronicCareService, _dialogService, notificationService, clinicService) {
        this.router = router;
        this.route = route;
        this.chronicCareService = chronicCareService;
        this._dialogService = _dialogService;
        this.notificationService = notificationService;
        this.clinicService = clinicService;
        this.properties = [];
    }

    ChronicCareDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (_a) {
            var entity = _a.entity;
            _this.entity = !!entity && entity.body ? entity.body : entity;
            var patientId = _this.route.snapshot.paramMap.get('patientId');
            _this.clinicService.getPatient(patientId).subscribe(function (res) {
                return _this.entity.patient = res;
            });
            _this.buildProperties();
        });
    };
    ChronicCareDetailComponent.prototype.edit = function () {
        this.router.navigate(['/', 'chronic-cares', this.entity.uuid, 'patient', this.entity.patient.uuid, 'edit']);
    };
    ChronicCareDetailComponent.prototype.delete = function () {
        var _this = this;
        this._dialogService.openConfirm({
            title: 'Confirm',
            message: 'Do you want to delete this chronic care visit, action cannot be reversed?',
            cancelButton: 'No',
            acceptButton: 'Yes',
            width: '500px',
        }).afterClosed().subscribe(function (accept) {
            if (accept) {
                _this.chronicCareService.delete(_this.entity.id).subscribe(function (res) {
                    if (res.ok) {
                        _this.router.navigate(['patients']);
                    } else {
                        _this.notificationService.showError('Error deleting visit, please try again');
                    }
                });
            } else {
                // DO SOMETHING ELSE
            }
        });
    };
    ChronicCareDetailComponent.prototype.buildProperties = function () {
    };
    ChronicCareDetailComponent.prototype.previousState = function () {
        window.history.back();
    };
    ChronicCareDetailComponent.ctorParameters = function () {
        return [
            {type: Router},
            {type: ActivatedRoute},
            {type: ChronicCareService},
            {type: TdDialogService},
            {type: NotificationService},
            {type: ClinicService}
        ];
    };
    ChronicCareDetailComponent = __decorate([
        Component({
            selector: 'chronic-care-detail',
            template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <mat-card>\n            <mat-card-header>\n            </mat-card-header>\n            <mat-card-content>\n                <adf-card-view [properties]=\"properties\" editable=\"false\"></adf-card-view>\n            </mat-card-content>\n            <mat-card-actions class=\"lamis-edit-form-actions\">\n                <button mat-button (click)=\"previousState()\">Back</button>\n                <button mat-raised-button color=\"warn\" (click)=\"delete()\">Delete</button>\n                <button mat-raised-button color=\"primary\" (click)=\"edit()\">Edit</button>\n            </mat-card-actions>\n        </mat-card>\n    </div>\n</div>\n"
        }),
        __metadata("design:paramtypes", [Router, ActivatedRoute, ChronicCareService,
            TdDialogService, NotificationService,
            ClinicService])
    ], ChronicCareDetailComponent);
    return ChronicCareDetailComponent;
}());

var moment$3 = moment_;
var ChronicCareEditComponent = /** @class */ (function () {
    function ChronicCareEditComponent(clinicService, chronicCareService, notification, activatedRoute, appLoaderService) {
        this.clinicService = clinicService;
        this.chronicCareService = chronicCareService;
        this.notification = notification;
        this.activatedRoute = activatedRoute;
        this.appLoaderService = appLoaderService;
        this.today = moment$3();
        this.tbs = [];
        this.dms = [];
        this.visitDates = [];
        this.isSaving = false;
        this.bmi = '';
        this.bmiCalculated = '';
    }

    ChronicCareEditComponent.prototype.createEntity = function () {
        return {};
    };
    ChronicCareEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.data.subscribe(function (_a) {
            var entity = _a.entity;
            _this.entity = !!entity && entity.body ? entity.body : entity;
            if (_this.entity === undefined) {
                _this.entity = _this.createEntity();
            }
            var patientId = _this.activatedRoute.snapshot.paramMap.get('patientId');
            _this.clinicService.getPatient(patientId).subscribe(function (res) {
                _this.entity.patient = res;
                _this.entity.facility = res.facility;
                _this.chronicCareService.getVisitDatesByPatient(_this.entity.patient.id).subscribe(function (res) {
                    _this.visitDates = res;
                });
            });
            _this.calculateBmi();
        });
    };
    ChronicCareEditComponent.prototype.filterDates = function (date) {
        var exists = false;
        this.visitDates.forEach(function (d) {
            if (date.diff(d, 'days') === 0) {
                exists = true;
            }
        });
        return (this.entity.id && date.diff(this.entity.dateVisit, 'days') === 0) || !exists;
    };
    ChronicCareEditComponent.prototype.previousState = function () {
        window.history.back();
    };
    ChronicCareEditComponent.prototype.calculateBmi = function () {
        if (this.entity.bodyWeight && this.entity.height) {
            var bmi = this.entity.bodyWeight / Math.pow(this.entity.height, 2);
            if (bmi < 18.5) {
                this.bmi = '<18.5 (Underweight)';
            } else if (bmi < 24.9) {
                this.bmi = '18.5 - 24.9 (Healthy)';
            } else if (bmi < 29.9) {
                this.bmi = '25.0 - 29.9 (Overweight)';
            } else if (bmi < 40) {
                this.bmi = '30 - 40 (Obesity)';
            } else {
                this.bmi = '>40 (Morbid Obesity)';
            }
            this.bmiCalculated = bmi.toFixed(1);
        } else {
            this.bmi = '';
        }
    };
    ChronicCareEditComponent.prototype.save = function () {
        //this.submitButton.disabled = true;
        //this.progressBar.mode = 'indeterminate';
        this.isSaving = true;
        this.appLoaderService.open('Saving chronic care visit..');
        if (this.entity.id !== undefined) {
            this.subscribeToSaveResponse(this.chronicCareService.update({
                chronicCare: this.entity,
                tbs: this.tbs,
                dms: this.dms
            }));
        } else {
            this.subscribeToSaveResponse(this.chronicCareService.create({
                chronicCare: this.entity,
                tbs: this.tbs,
                dms: this.dms
            }));
        }
    };
    ChronicCareEditComponent.prototype.subscribeToSaveResponse = function (result) {
        var _this = this;
        result.subscribe(function (res) {
            return _this.onSaveSuccess(res.body);
        }, function (res) {
            _this.onSaveError();
            _this.onError(res.message);
        });
    };
    ChronicCareEditComponent.prototype.onSaveSuccess = function (result) {
        this.appLoaderService.close();
        this.isSaving = false;
        this.notification.openSnackMessage('Chronic Care visit successfully saved');
        this.previousState();
    };
    ChronicCareEditComponent.prototype.onSaveError = function () {
        this.isSaving = false;
        this.appLoaderService.close();
        //this.submitButton.disabled = true;
        this.notification.showError('Error occurred saving chronic care visit; try again');
        //this.progressBar.mode = 'determinate';
    };
    ChronicCareEditComponent.prototype.onError = function (errorMessage) {
        this.appLoaderService.close();
        this.notification.showError(errorMessage);
    };
    ChronicCareEditComponent.ctorParameters = function () {
        return [
            {type: ClinicService},
            {type: ChronicCareService},
            {type: NotificationService},
            {type: ActivatedRoute},
            {type: AppLoaderService}
        ];
    };
    ChronicCareEditComponent = __decorate([
        Component({
            selector: 'chronic-care-edit',
            template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <form name=\"form\" role=\"form\" novalidate (ngSubmit)=\"save()\" #careForm=\"ngForm\">\n            <mat-card class=\"default\">\n                <mat-card-content>\n                    <mat-vertical-stepper #stepper *ngIf=\"entity.patient\">\n                        <mat-step>\n                            <ng-template matStepLabel>Details</ng-template>\n                            <div class=\"row\">\n                                <div class=\"col-md-6\">\n                                    <mat-form-field class=\"full-width\">\n                                        <input matInput [matDatepicker]=\"picker\"\n                                               placeholder=\"Date of Visit\"\n                                               [(ngModel)]=\"entity.dateVisit\"\n                                               #visit=\"ngModel\"\n                                               [matDatepickerFilter]=\"filterDates.bind(this)\"\n                                               [max]=\"today\"\n                                               [min]=\"entity.patient.dateRegistration\"\n                                               name=\"visit\"\n                                               required>\n                                        <mat-datepicker-toggle\n                                                matSuffix\n                                                [for]=\"picker\">\n                                        </mat-datepicker-toggle>\n                                        <mat-datepicker #picker></mat-datepicker>\n                                        <mat-error\n                                                *ngIf=\"visit.errors && (visit.dirty || visit.touched) && (visit.errors.required)\">\n                                            Date of Visit is required\n                                        </mat-error>\n                                        <mat-error\n                                                *ngIf=\"visit.errors && (visit.dirty || visit.touched) && (visit.errors.min)\">\n                                            Date of Visit cannot be before {{entity.patient.dateRegistration}}\n                                        </mat-error>\n                                        <mat-error\n                                                *ngIf=\"visit.errors && (visit.dirty || visit.touched) && (visit.errors.max)\">\n                                            Date of Visit cannot be in the future\n                                        </mat-error>\n                                    </mat-form-field>\n                                </div>\n                            </div>\n                            <div class=\"row \">\n                                <div class=\"col-md-6\">\n                                    <mat-form-field class=\"full-width\">\n                                        <mat-label class=\"form-label\">Type of Client:</mat-label>\n                                        <mat-select name=\"clinicType\" [(ngModel)]=\"entity.clientType\" name=\"type\">\n                                            <mat-option></mat-option>\n                                            <mat-option [value]=\"'PLHIV newly enrolled into HIV Care & treatment'\">PLHIV\n                                                newly enrolled into HIV Care & treatment\n                                            </mat-option>\n                                            <mat-option [value]=\"'Registered PLHIV on first time visit this FY'\">\n                                                Registered PLHIV on first time visit this FY\n                                            </mat-option>\n                                            <mat-option\n                                                    [value]=\"'Registered PLHIV on follow up/subsequent visit this FY'\">\n                                                Registered PLHIV on follow up/subsequent visit this FY\n                                            </mat-option>\n                                        </mat-select>\n                                    </mat-form-field>\n                                </div>\n                                <div class=\"col-md-6\">\n                                    <mat-form-field class=\"full-width\">\n                                        <mat-label class=\"form-label\">ART Status</mat-label>\n                                        <mat-select name=\"currentStatus\" [(ngModel)]=\"entity.currentStatus\"\n                                                    name=\"status\">\n                                            <mat-option></mat-option>\n                                            <mat-option [value]=\"'Pre-ART'\">Pre-ART</mat-option>\n                                            <mat-option [value]=\"'ART'\">ART</mat-option>\n                                        </mat-select>\n                                    </mat-form-field>\n                                </div>\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col-md-6\" *ngIf=\"entity.patient.gender === 'Female'\">\n                                    <mat-form-field class=\"full-width\">\n                                        <mat-label class=\"form-label\">Pregnancy Status:</mat-label>\n                                        <mat-select name=\"pregnancyStatus\" [(ngModel)]=\"entity.pregnancyStatus\"\n                                                    name=\"preg\">\n                                            <mat-option></mat-option>\n                                            <mat-option [value]=\"'Pregnant'\">Pregnant</mat-option>\n                                            <mat-option [value]=\"'Non-Pregnant'\">Non-Pregnant</mat-option>\n                                            <mat-option [value]=\"'Post Partum'\">Post Partum</mat-option>\n                                        </mat-select>\n                                    </mat-form-field>\n                                </div>\n                                <div class=\"col-md-6\">\n                                    <mat-form-field class=\"full-width\">\n                                        <mat-label class=\"form-label\">Clinical Stage:</mat-label>\n                                        <mat-select name=\"clinicStage\" [(ngModel)]=\"entity.clinicStage\" name=\"stage\">\n                                            <mat-option></mat-option>\n                                            <mat-option [value]=\"'Stage I'\">Stage I</mat-option>\n                                            <mat-option [value]=\"'Stage II'\">Stage II</mat-option>\n                                            <mat-option [value]=\"'Stage III'\">Stage III</mat-option>\n                                            <mat-option [value]=\"'Stage IV'\">Stage IV</mat-option>\n                                        </mat-select>\n                                    </mat-form-field>\n                                </div>\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col-md-6\">\n                                    <mat-form-field class=\"full-width\">\n                                        <mat-label class=\"form-label\">Last CD4 Count:</mat-label>\n                                        <input matInput type=\"number\" name=\"lastCd4\"\n                                               #lastCd4=\"ngModel\"\n                                               [(ngModel)]=\"entity.lastCd4\"\n                                               [required]=\"!!entity.dateLastCd4\"\n                                               [min]=\"1\"/>\n                                        <mat-error\n                                                *ngIf=\"lastCd4.errors && (lastCd4.dirty || lastCd4.touched) && (lastCd4.errors.min)\">\n                                            Minimum value is 1\n                                        </mat-error>\n                                    </mat-form-field>\n                                </div>\n                                <div class=\"col-md-6\">\n                                    <mat-form-field class=\"full-width\">\n                                        <input matInput [matDatepicker]=\"picker1\"\n                                               placeholder=\"Date of Last CD4\"\n                                               [(ngModel)]=\"entity.dateLastCd4\"\n                                               [required]=\"!!entity.lastCd4\"\n                                               #cd4=\"ngModel\"\n                                               name=\"cd4\"\n                                               [max]=\"today\"\n                                               [min]=\"entity.patient.dateRegistration\">\n                                        <mat-datepicker-toggle\n                                                matSuffix\n                                                [for]=\"picker1\">\n                                        </mat-datepicker-toggle>\n                                        <mat-datepicker #picker1></mat-datepicker>\n                                    </mat-form-field>\n                                </div>\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col-md-6\">\n                                    <mat-form-field class=\"full-width\">\n                                        <mat-label class=\"form-label\">Last Viral Load Count:</mat-label>\n                                        <input matInput type=\"number\" name=\"lastViral\"\n                                               #lastViral=\"ngModel\"\n                                               [(ngModel)]=\"entity.lastViralLoad\"\n                                               [required]=\"!!entity.dateLastViralLoad\"\n                                               [min]=\"1\"/>\n                                        <mat-error\n                                                *ngIf=\"lastViral.errors && (lastViral.dirty || lastViral.touched) && (lastViral.errors.min)\">\n                                            Minimum value is 1\n                                        </mat-error>\n                                    </mat-form-field>\n                                </div>\n                                <div class=\"col-md-6\">\n                                    <mat-form-field class=\"full-width\">\n                                        <input matInput [matDatepicker]=\"picker2\"\n                                               placeholder=\"Date of Last Viral Load\"\n                                               [(ngModel)]=\"entity.dateLastViralLoad\"\n                                               [required]=\"!!entity.lastViralLoad\"\n                                               #viral=\"ngModel\"\n                                               name=\"viral\"\n                                               [max]=\"today\"\n                                               [min]=\"entity.patient.dateRegistration\">\n                                        <mat-datepicker-toggle\n                                                matSuffix\n                                                [for]=\"picker2\">\n                                        </mat-datepicker-toggle>\n                                        <mat-datepicker #picker2></mat-datepicker>\n                                    </mat-form-field>\n                                </div>\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col-md-6\">\n                                    <mat-checkbox [(ngModel)]=\"entity.eligibleCd4\" [indeterminate]=\"true\" name=\"cd\">\n                                        Eligible for CD4\n                                    </mat-checkbox>\n                                </div>\n                                <div class=\"col-md-6\">\n                                    <mat-checkbox [(ngModel)]=\"entity.eligibleViralLoad\" [indeterminate]=\"true\"\n                                                  name=\"vr\">\n                                        Eligible for Viral Load\n                                    </mat-checkbox>\n                                </div>\n                            </div>\n                            <div>\n                                <button mat-button type=\"button\" matStepperNext>Next</button>\n                            </div>\n                        </mat-step>\n                        <mat-step>\n                            <ng-template matStepLabel>Co-trimoxazole Eligibility Assessment</ng-template>\n                            <div class=\"row\">\n                                <div class=\"col-md-6\">\n                                    <mat-list>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.plhivSymtomaticHiv\"\n                                                          name=\"symt\"\n                                                          [indeterminate]=\"true\">\n                                                PLHIV with symptomatic HIV\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.plhivAsymtomaticCD4L500\"\n                                                          name=\"sdym\"\n                                                          [indeterminate]=\"true\">\n                                                Asymptomatic PLHIV with CD4 count &lt;500 cells/mm<sup>3</sup>\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.plhivActiveTb\"\n                                                          name=\"activeTb\"\n                                                          [indeterminate]=\"true\">\n                                                PLHIV with active TB\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item *ngIf=\"entity.patient.gender === 'Female'\">\n                                            <mat-checkbox [(ngModel)]=\"entity.plhivPregnantAfter1stTrimester\"\n                                                          name=\"ftm\"\n                                                          [indeterminate]=\"true\">\n                                                Pregnant PLHIV after the first trimester\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.plhivL5Years\"\n                                                          name=\"l5\"\n                                                          [indeterminate]=\"true\">\n                                                LHIV &le; 5 years\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                    </mat-list>\n                                </div>\n                            </div>\n                            <div>\n                                <button mat-button type=\"button\" matStepperPrevious>Back</button>\n                                <button mat-button type=\"button\" matStepperNext>Next</button>\n                            </div>\n                        </mat-step>\n                        <mat-step>\n                            <ng-template matStepLabel>TB Screening</ng-template>\n                            <div class=\"row \">\n                                <div class=\"col-md-6\">\n                                    <mat-checkbox [(ngModel)]=\"entity.tbTreatment\" [indeterminate]=\"true\"\n                                                  name=\"tbTreatment\">\n                                        Are you currently on TB Treatment?\n                                    </mat-checkbox>\n                                    <div>\n                                    </div>\n                                </div>\n                                <div class=\"col-md-6\">\n                                    <mat-form-field class=\"full-width\">\n                                        <input matInput [matDatepicker]=\"picker3\"\n                                               placeholder=\"Date Started\"\n                                               [(ngModel)]=\"entity.dateStartedTbTreatment\"\n                                               [required]=\"entity.tbTreatment\"\n                                               #started=\"ngModel\"\n                                               name=\"started\"\n                                               [max]=\"today\"\n                                               [min]=\"entity.patient.dateRegistration\">\n                                        <mat-datepicker-toggle\n                                                matSuffix\n                                                [for]=\"picker3\">\n                                        </mat-datepicker-toggle>\n                                        <mat-datepicker #picker3></mat-datepicker>\n                                    </mat-form-field>\n                                </div>\n                            </div>\n                            <div class=\"row \">\n                                <div class=\"col-md-6\">\n                                    <mat-list>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.tbReferred\"\n                                                          name=\"tbReferred\" [indeterminate]=\"true\">\n                                                Referred for TB Diagnosis\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.ipt\"\n                                                          name=\"ipt\"\n                                                          [indeterminate]=\"true\">\n                                                Are you currently on Isoniazid Preventive Therapy (IPT)?\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.inh\"\n                                                          name=\"inh\"\n                                                          [indeterminate]=\"true\">\n                                                Have you received INH within the past 2 year?\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.eligibleIpt\"\n                                                          name=\"iptEl\"\n                                                          [indeterminate]=\"true\">\n                                                Eligible for IPT\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                    </mat-list>\n                                </div>\n                            </div>\n                        </mat-step>\n                        <mat-step>\n                            <ng-template matStepLabel>Nutritional Assessment</ng-template>\n                            <div class=\"row\">\n                                <div class=\"col-md-3\">\n                                    <mat-form-field class=\"full-width\">\n                                        <input matInput placeholder=\"Body weight(Kg)\" [min]=\"1\" [max]=\"250\"\n                                               type=\"number\"\n                                               (change)=\"calculateBmi()\"\n                                               #weight=\"ngModel\" name=\"weight\" [(ngModel)]=\"entity.bodyWeight\"/>\n                                        <mat-error\n                                                *ngIf=\"weight.errors && (weight.dirty || weight.touched) && (weight.errors.min)\">\n                                            Minimum body weight is 1\n                                        </mat-error>\n                                        <mat-error\n                                                *ngIf=\"weight.errors && (weight.dirty || weight.touched) && (weight.errors.max)\">\n                                            Maximum body weight is 250\n                                        </mat-error>\n                                    </mat-form-field>\n                                </div>\n                                <div class=\"col-md-3\">\n                                    <mat-form-field class=\"full-width\">\n                                        <input matInput placeholder=\"Height (m)\" [min]=\"0.2\" [max]=\"1.8\" type=\"number\"\n                                               #height=\"ngModel\" name=\"height\" [(ngModel)]=\"entity.height\"\n                                               (change)=\"calculateBmi()\"/>\n                                        <mat-error\n                                                *ngIf=\"height.errors && (height.dirty || height.touched) && (height.errors.min)\">\n                                            Minimum height is 0.2\n                                        </mat-error>\n                                        <mat-error\n                                                *ngIf=\"height.errors && (height.dirty || height.touched) && (height.errors.max)\">\n                                            Maximum height is 1.8m\n                                        </mat-error>\n                                    </mat-form-field>\n                                </div>\n                                <div class=\"col-md-3\">\n                                    <mat-form-field class=\"full-width\">\n                                        <mat-label>BMI Calculated</mat-label>\n                                        <input matInput disabled [value]=\"bmiCalculated\">\n                                    </mat-form-field>\n                                </div>\n                                <div class=\"col-md-3\">\n                                    <mat-form-field class=\"full-width\">\n                                        <mat-label>BMI Range</mat-label>\n                                        <input matInput disabled [value]=\"bmi\">\n                                    </mat-form-field>\n                                </div>\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col-md-4\">\n                                    <mat-form-field class=\"full-width\">\n                                        <mat-label> MUAC (cm) (under 5yrs):</mat-label>\n                                        <input matInput [min]=\"2\" [max]=\"26.5\"\n                                               type=\"number\"\n                                               #muac=\"ngModel\" name=\"muac\" [(ngModel)]=\"entity.muac\"/>\n                                        <mat-error\n                                                *ngIf=\"muac.errors && (muac.dirty || muac.touched) && (muac.errors.min)\">\n                                            Minimum Mid Upper Arm Circumference is 2\n                                        </mat-error>\n                                        <mat-error\n                                                *ngIf=\"muac.errors && (muac.dirty || muac.touched) && (muac.errors.max)\">\n                                            Maximum Mid Upper Arm Circumference is 26.5\n                                        </mat-error>\n                                    </mat-form-field>\n                                </div>\n                                <div class=\"col-md-4\">\n                                    <mat-form-field class=\"full-width\">\n                                        <mat-label>UAC Pediatrics</mat-label>\n                                        <mat-select name=\"muacPediatrics\"\n                                                    [(ngModel)]=\"entity.muacPediatrics\">\n                                            <mat-option></mat-option>\n                                            <mat-option [value]=\"'<11.5cm (Severe Acute Malnutrition)'\">&lt;11.5cm\n                                                (Severe Acute Malnutrition)\n                                            </mat-option>\n                                            <mat-option [value]=\"'11.5-12.5cm (Moderate Acute Malnutrition)'\">\n                                                11.5-12.5cm (Moderate Acute Malnutrition)\n                                            </mat-option>\n                                            <mat-option [value]=\"'>12.5cm (Well nourished)'\">&gt;12.5cm (Well\n                                                nourished)\n                                            </mat-option>\n                                        </mat-select>\n                                    </mat-form-field>\n                                </div>\n                                <div class=\"col-md-4\" *ngIf=\"entity.patient.gender === 'Female'\">\n                                    <mat-form-field class=\"full-width\">\n                                        <mat-label>MUAC Pregnant:</mat-label>\n                                        <mat-select name=\"muacPregnant\" [(ngModel)]=\"entity.muacPregnant\">\n                                            <mat-option></mat-option>\n                                            <mat-option [value]=\"'<23cm (Underweight)'\">&lt;23cm (Underweight)\n                                            </mat-option>\n                                        </mat-select>\n                                    </mat-form-field>\n                                </div>\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col-md-6\">\n                                    <mat-list>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.supplementaryFood\"\n                                                          name=\"supp\"\n                                                          [indeterminate]=\"true\">\n                                                Provided with Therapeutic/Supplementary\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.nutritionalStatusReferred\"\n                                                          name=\"nutr\"\n                                                          [indeterminate]=\"true\">\n                                                Referred\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                    </mat-list>\n                                </div>\n                            </div>\n                            <div>\n                                <button mat-button type=\"button\" matStepperPrevious>Back</button>\n                                <button mat-button type=\"button\" matStepperNext>Next</button>\n                            </div>\n                        </mat-step>\n                        <mat-step>\n                            <ng-template matStepLabel>Gender Based Violence Screening</ng-template>\n                            <div class=\"row\">\n                                <div class=\"col-md-6\">\n                                    <mat-list>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.sexuallyAbused\"\n                                                          name=\"sexuallyAbused\"\n                                                          [indeterminate]=\"true\">\n                                                Have you been beaten, sexually coerced, raped or threatened or any of\n                                                these by your partner or anyone else?\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.sexuallyAbusedReferred\"\n                                                          *ngIf=\"entity.sexuallyAbused\"\n                                                          name=\"sexuallyAbusedReferred\"\n                                                          [indeterminate]=\"true\">\n                                                Referred for Post GBV Care\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.essentialsDeniedByPartner\"\n                                                          name=\"denied\"\n                                                          [indeterminate]=\"true\">\n                                                Does your partner/family deny you food, shelter, freedom of movement,\n                                                livelihood or finance to access health care?\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.essentialsDeniedByPartnerReferred\"\n                                                          *ngIf=\"entity.essentialsDeniedByPartner\"\n                                                          name=\"deniedReferred\"\n                                                          [indeterminate]=\"true\">\n                                                Referred for Post GBV Care\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                    </mat-list>\n                                </div>\n                            </div>\n                            <div>\n                                <button mat-button type=\"button\" matStepperPrevious>Back</button>\n                                <button mat-button type=\"button\" matStepperNext>Next</button>\n                            </div>\n                        </mat-step>\n                        <mat-step>\n                            <ng-template matStepLabel>Screening for Chronic Conditions</ng-template>\n                            <div class=\"row\">\n                                <div class=\"col-md-6\">\n                                    <mat-checkbox [(ngModel)]=\"entity.hypertensive\"\n                                                  name=\"hyper\"\n                                                  [indeterminate]=\"true\">\n                                        Known Hypertensive?\n                                    </mat-checkbox>\n                                </div>\n                                <div class=\"col-md-6\">\n                                    <mat-checkbox [(ngModel)]=\"entity.firstHypertensive\"\n                                                  *ngIf=\"entity.hypertensive\"\n                                                  name=\"hyper1s\"\n                                                  [indeterminate]=\"true\">\n                                        First time identified within the programme\n                                    </mat-checkbox>\n                                </div>\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col-md-6\">\n                                    <mat-checkbox [(ngModel)]=\"entity.bpAbove14090\"\n                                                  name=\"bpAbove\"\n                                                  [indeterminate]=\"true\">\n                                        BP above 140/90mmHg\n                                    </mat-checkbox>\n                                </div>\n                                <div class=\"col-md-6\">\n                                    <mat-checkbox [(ngModel)]=\"entity.bpReferred\"\n                                                  *ngIf=\"entity.bpAbove14090\"\n                                                  name=\"bpReferred\"\n                                                  [indeterminate]=\"true\">\n                                        Referred for further care\n                                    </mat-checkbox>\n                                </div>\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col-md-6\">\n                                    <mat-checkbox [(ngModel)]=\"entity.diabetic\"\n                                                  name=\"diabetic\"\n                                                  [indeterminate]=\"true\">\n                                        Known Diabetic?\n                                    </mat-checkbox>\n                                </div>\n                                <div class=\"col-md-6\">\n                                    <mat-checkbox [(ngModel)]=\"entity.firstDiabetic\"\n                                                  *ngIf=\"entity.diabetic\"\n                                                  name=\"diabetic1st\"\n                                                  [indeterminate]=\"true\">\n                                        First Time Identified Within the Programme?\n                                    </mat-checkbox>\n                                </div>\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col-md-6\">\n                                </div>\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col-md-6\">\n                                    <mat-checkbox [(ngModel)]=\"entity.dmReferred\"\n                                                  name=\"dm\"\n                                                  [indeterminate]=\"true\">\n                                        Referred for further care\n                                    </mat-checkbox>\n                                </div>\n                            </div>\n                            <div>\n                                <button mat-button type=\"button\" matStepperPrevious>Back</button>\n                                <button mat-button type=\"button\" matStepperNext>Next</button>\n                            </div>\n                        </mat-step>\n                        <mat-step>\n                            <ng-template matStepLabel>Positive Health Dignity and Prevention(PHDP)</ng-template>\n                            <h5>A)Prevent HIV Transmission</h5>\n                            <div class=\"row\">\n                                <div class=\"col-md-6\">\n                                    <mat-form-field class=\"full-width\">\n                                        <mat-label>How many doses of ARVs have you missed since the last appointment?(If\n                                            on ART)\n                                        </mat-label>\n                                        <mat-select name=\"missed1\" [(ngModel)]=\"entity.missedArvs\">\n                                            <mat-option></mat-option>\n                                            <mat-option [value]=\"'<=3'\">&le;3</mat-option>\n                                            <mat-option [value]=\"'4-8'\">4-8</mat-option>\n                                            <mat-option [value]=\"'>=9'\">&ge;9</mat-option>\n                                        </mat-select>\n                                    </mat-form-field>\n                                </div>\n                                <mat-list>\n                                    <mat-list-item>\n                                        <mat-checkbox [(ngModel)]=\"entity.missedArvsServicesProvided\"\n                                                      name=\"missed1Referred\"\n                                                      [indeterminate]=\"true\">\n                                            Medication adherence counselling done?\n                                        </mat-checkbox>\n                                    </mat-list-item>\n                                    <mat-list-item>\n                                        <mat-checkbox [(ngModel)]=\"entity.statusDisclosedToPartner\"\n                                                      name=\"sdtp\"\n                                                      [indeterminate]=\"true\">\n                                            Have you disclosed your status to your partner(s)?\n                                        </mat-checkbox>\n                                    </mat-list-item>\n                                    >\n                                    <mat-list-item>\n                                        <mat-checkbox [(ngModel)]=\"entity.partnerStatusKnown\"\n                                                      name=\"psk\"\n                                                      [indeterminate]=\"true\">\n                                            Do you know the status of your partner(s)?\n                                        </mat-checkbox>\n                                    </mat-list-item>\n                                    <mat-list-item>\n                                        <mat-checkbox [(ngModel)]=\"entity.useCondomsAlways\"\n                                                      name=\"uca\"\n                                                      [indeterminate]=\"true\">\n                                            Do you use condoms during every sexual encounter?\n                                        </mat-checkbox>\n                                    </mat-list-item>\n                                    <mat-list-item>\n                                        <mat-checkbox [(ngModel)]=\"entity.useCondomsAlwaysServicesProvided\"\n                                                      name=\"ucasp\"\n                                                      [indeterminate]=\"true\">\n                                            Condom use counselling done?\n                                        </mat-checkbox>\n                                    </mat-list-item>\n                                </mat-list>\n                            </div>\n                            <mat-divider class=\"pb-1\"></mat-divider>\n                            <h5>B)Prevent Diseases/Opportunistic Infections</h5>\n                            <div class=\"row\">\n                                <div class=\"col-md-6\">\n                                    <mat-checkbox [(ngModel)]=\"entity.opportunisticInfections\"\n                                                  name=\"oi\"\n                                                  [indeterminate]=\"true\">\n                                        Do you/partner have genital sores/rash/pain/discharge/bleeding?\n                                    </mat-checkbox>\n                                </div>\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col-md-6\">\n                                    <mat-form-field class=\"full-width\">\n                                        <mat-label>How many doses of Co-trimoxazole have you missed since the last\n                                            appointment?\n                                        </mat-label>\n                                        <input matInput type=\"number\" [(ngModel)]=\"entity.missedCotrim\" [min]=\"1\"\n                                               #missed=\"ngModel\"\n                                               name=\"missed\"/>\n                                        <mat-error\n                                                *ngIf=\"missed.errors && (missed.dirty || missed.touched) && (missed.errors.min)\">\n                                            Minimum value is 1\n                                        </mat-error>\n                                    </mat-form-field>\n                                </div>\n                            </div>\n                            <mat-divider class=\"pb-1\"></mat-divider>\n                            <h5>C)Promote Healthy Living</h5>\n                            <div class=\"row\">\n                                <div class=\"col-md-6\">\n                                    <mat-form-field class=\"full-width\">\n                                        <mat-label>How regularly do you take alcohol in a week?</mat-label>\n                                        <input matInput type=\"number\" [(ngModel)]=\"entity.weeklyAlcoholConsumption\"\n                                               [min]=\"1\" #alcohol=\"ngModel\"\n                                               name=\"alcohol\"/>\n                                        <mat-error\n                                                *ngIf=\"alcohol.errors && (alcohol.dirty || alcohol.touched) && (alcohol.errors.min)\">\n                                            Minimum value is 1\n                                        </mat-error>\n                                    </mat-form-field>\n                                    <mat-list>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.weeklyAlcoholConsumptionServicesProvided\"\n                                                          name=\"alcolR\"\n                                                          [indeterminate]=\"true\">\n                                                Nutritional counseling done?\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.washServicesProvided\"\n                                                          name=\"wash\"\n                                                          [indeterminate]=\"true\">\n                                                WASH counseling done?\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                    </mat-list>\n                                </div>\n                            </div>\n                            <mat-divider class=\"pb-1\"></mat-divider>\n                            <h5>Additional PHDP Services provided</h5>\n                            <div class=\"row\">\n                                <div class=\"col-md-6\">\n                                    <mat-list>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.useInsecticideNets\"\n                                                          name=\"uin\"\n                                                          [indeterminate]=\"true\">\n                                                Insecticide treated nets\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item *ngIf=\"entity.patient.gender === 'Female'\">\n                                            <mat-checkbox [(ngModel)]=\"entity.cervicalCancerScreening\"\n                                                          name=\"ccs\"\n                                                          [indeterminate]=\"true\">\n                                                Cervical Cancer Screening\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.activeMemberOfSG\"\n                                                          name=\"amsg\"\n                                                          [indeterminate]=\"true\">\n                                                Active member of SG\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.familyPlanning\"\n                                                          name=\"fp\"\n                                                          [indeterminate]=\"true\">\n                                                Family Planning\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.basicCareKits\"\n                                                          name=\"bck\"\n                                                          [indeterminate]=\"true\">\n                                                Basic care kits\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.disclosureCounseling\"\n                                                          name=\"dc\"\n                                                          [indeterminate]=\"true\">\n                                                Disclosure counseling\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.socialServices\"\n                                                          name=\"sc\"\n                                                          [indeterminate]=\"true\">\n                                                Social Services\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.linkageToIGA\"\n                                                          name=\"liga\"\n                                                          [indeterminate]=\"true\">\n                                                Linkage to IGAs\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.legalServices\"\n                                                          name=\"ls\"\n                                                          [indeterminate]=\"true\">\n                                                Legal Services\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.otherServices\"\n                                                          name=\"ots\"\n                                                          [indeterminate]=\"true\">\n                                                Others\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                    </mat-list>\n                                </div>\n                            </div>\n                            <div>\n                                <button mat-button type=\"button\" matStepperPrevious>Back</button>\n                                <button mat-button type=\"button\" matStepperNext>Next</button>\n                            </div>\n                        </mat-step>\n                        <mat-step>\n                            <ng-template matStepLabel>Reproductive Intentions</ng-template>\n                            <div class=\"row \">\n                                <div class=\"col-md-6\">\n                                    <mat-list>\n                                        <mat-list-item *ngIf=\"entity.patient.gender === 'Female'\">\n                                            <mat-checkbox [(ngModel)]=\"entity.cervicalCancerScreeningWithinPastYear\"\n                                                          name=\"ccswpy\"\n                                                          [indeterminate]=\"true\">\n                                                Have you been screened for cervical cancer in the last one year?\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item *ngIf=\"entity.patient.gender === 'Female'\">\n                                            <mat-checkbox\n                                                    [(ngModel)]=\"entity.cervicalCancerScreeningWithinPastYearReferred\"\n                                                    name=\"ccswpyr\"\n                                                    [indeterminate]=\"true\">\n                                                Referred for further care\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item *ngIf=\"entity.patient.gender === 'Female'\">\n                                            <mat-checkbox [(ngModel)]=\"entity.wantPregnancyWithinAYear\"\n                                                          name=\"wpwy\"\n                                                          [indeterminate]=\"true\">\n                                                Do you want a pregnancy in the next one year?\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item *ngIf=\"entity.patient.gender === 'Female'\">\n                                            <mat-checkbox [(ngModel)]=\"entity.wantPregnancyWithinAYearReferred\"\n                                                          name=\"wpwar\"\n                                                          [indeterminate]=\"true\">\n                                                Referred for further care?\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.currentlyUsingContraceptive\"\n                                                          name=\"cuc\"\n                                                          [indeterminate]=\"true\">\n                                                If no, are you currently using a contraceptive?\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.currentlyUsingContraceptiveReferred\"\n                                                          name=\"cucr\"\n                                                          [indeterminate]=\"true\">\n                                                Referred for further care?\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                    </mat-list>\n                                    <mat-divider class=\"pb-1\"></mat-divider>\n                                    <h5>Malaria Prevention</h5>\n                                    <mat-list>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.useInsecticideBedNet\"\n                                                          name=\"uibn\"\n                                                          [indeterminate]=\"true\">\n                                                Do you use insecticide treated bed net?\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item>\n                                            <mat-checkbox [(ngModel)]=\"entity.useInsecticideBedNetReferred\"\n                                                          name=\"uibnr\"\n                                                          [indeterminate]=\"true\">\n                                                Referred?\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item *ngIf=\"entity.patient.gender === 'Female'\">\n                                            <mat-checkbox [(ngModel)]=\"entity.pregnantIntermittentPreventiveTherapy\"\n                                                          name=\"pipt\"\n                                                          [indeterminate]=\"true\">\n                                                If pregnant: have you been on intermittent preventive therapy?\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                        <mat-list-item *ngIf=\"entity.patient.gender === 'Female'\">\n                                            <mat-checkbox\n                                                    [(ngModel)]=\"entity.pregnantIntermittentPreventiveTherapyReferred\"\n                                                    name=\"piptr\"\n                                                    [indeterminate]=\"true\">\n                                                Referred\n                                            </mat-checkbox>\n                                        </mat-list-item>\n                                    </mat-list>\n                                </div>\n                            </div>\n                            <div>\n                                <button mat-button type=\"button\" matStepperPrevious>Back</button>\n                            </div>\n                        </mat-step>\n                    </mat-vertical-stepper>\n                    <mat-divider></mat-divider>\n                </mat-card-content>\n                <mat-card-actions class=\"lamis-edit-form-actions\">\n                    <button mat-raised-button type=\"button\" (click)=\"previousState()\">Back</button>\n                    <button mat-raised-button color='primary'\n                            [disabled]=\"careForm.invalid || isSaving\"\n                            type=\"submit\">\n                        {{entity.id !== undefined ? 'Update' : 'Save'}}\n                    </button>\n                </mat-card-actions>\n            </mat-card>\n        </form>\n    </div>\n</div>\n"
        }),
        __metadata("design:paramtypes", [ClinicService,
            ChronicCareService,
            NotificationService,
            ActivatedRoute,
            AppLoaderService])
    ], ChronicCareEditComponent);
    return ChronicCareEditComponent;
}());

var ChronicCareResolve = /** @class */ (function () {
    function ChronicCareResolve(service) {
        this.service = service;
    }

    ChronicCareResolve.prototype.resolve = function (route, state) {
        var id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.findByUuid(id).pipe(filter(function (response) {
                return response.ok;
            }), map(function (patient) {
                return patient.body;
            }));
        }
        return of({});
    };
    ChronicCareResolve.ctorParameters = function () {
        return [
            {type: ChronicCareService}
        ];
    };
    ChronicCareResolve = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [ChronicCareService])
    ], ChronicCareResolve);
    return ChronicCareResolve;
}());
var ɵ0$1 = {
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
var ROUTES$1 = [
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

var ChronicCareModule = /** @class */ (function () {
    function ChronicCareModule() {
    }

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
    return ChronicCareModule;
}());

var moment$4 = moment_;
var EacService = /** @class */ (function () {
    function EacService(http, serverUrl) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.resourceUrl = '';
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/eacs';
    }

    EacService.prototype.create = function (eac) {
        var _this = this;
        var copy = this.convertDateFromClient(eac);
        return this.http
            .post(this.resourceUrl, copy, {observe: 'response'})
            .pipe(map(function (res) {
                return _this.convertDateFromServer(res);
            }));
    };
    EacService.prototype.update = function (eac) {
        var _this = this;
        var copy = this.convertDateFromClient(eac);
        return this.http
            .put(this.resourceUrl, copy, {observe: 'response'})
            .pipe(map(function (res) {
                return _this.convertDateFromServer(res);
            }));
    };
    EacService.prototype.find = function (id) {
        var _this = this;
        return this.http
            .get(this.resourceUrl + "/" + id, {observe: 'response'})
            .pipe(map(function (res) {
                return _this.convertDateFromServer(res);
            }));
    };
    EacService.prototype.findByUuid = function (id) {
        var _this = this;
        return this.http
            .get(this.resourceUrl + "/by-uuid/" + id, {observe: 'response'})
            .pipe(map(function (res) {
                return _this.convertDateFromServer(res);
            }));
    };
    EacService.prototype.delete = function (id) {
        return this.http.delete(this.resourceUrl + "/" + id, {observe: 'response'});
    };
    EacService.prototype.getLatestByPatient = function (uuid) {
        var _this = this;
        return this.http
            .get(this.resourceUrl + "/patient/" + uuid, {observe: 'response'})
            .pipe(map(function (res) {
                return _this.convertDateFromServer(res);
            }));
    };
    EacService.prototype.getLatestViralLoadByPatient = function (id) {
        return this.http
            .get(this.resourceUrl + "/patient/" + id + "/viral-load-result", {observe: 'response'})
            .pipe(map(function (res) {
                if (res.body) {
                    res.body.laboratory.dateReported = res.body.laboratory.dateReported != null ?
                        moment$4(res.body.laboratory.dateReported) : null;
                }
                return res;
            }));
    };
    EacService.prototype.convertDateFromClient = function (eac) {
        var copy = Object.assign({}, eac, {
            dateEac1: eac.dateEac1 != null && eac.dateEac1.isValid() ? eac.dateEac1.format(DATE_FORMAT) : null,
            dateEac2: eac.dateEac2 != null && eac.dateEac2.isValid() ? eac.dateEac2.format(DATE_FORMAT) : null,
            dateEac3: eac.dateEac3 != null && eac.dateEac3.isValid() ? eac.dateEac3.format(DATE_FORMAT) : null,
            dateSampleCollected: eac.dateSampleCollected != null && eac.dateSampleCollected.isValid() ? eac.dateSampleCollected.format(DATE_FORMAT) : null,
            dateLastViralLoad: eac.dateLastViralLoad != null && eac.dateLastViralLoad.isValid() ? eac.dateLastViralLoad.format(DATE_FORMAT) : null,
        });
        return copy;
    };
    EacService.prototype.convertDateFromServer = function (res) {
        if (res.body) {
            res.body.dateLastViralLoad = res.body.dateLastViralLoad != null ? moment$4(res.body.dateLastViralLoad) : null;
            res.body.dateEac1 = res.body.dateEac1 != null ? moment$4(res.body.dateEac1) : null;
            res.body.dateEac2 = res.body.dateEac2 != null ? moment$4(res.body.dateEac2) : null;
            res.body.dateEac3 = res.body.dateEac3 != null ? moment$4(res.body.dateEac3) : null;
            res.body.dateSampleCollected = res.body.dateSampleCollected != null ? moment$4(res.body.dateSampleCollected) : null;
        }
        return res;
    };
    EacService.ctorParameters = function () {
        return [
            {type: HttpClient},
            {type: undefined, decorators: [{type: Inject, args: [SERVER_API_URL_CONFIG,]}]}
        ];
    };
    EacService.ngInjectableDef = ɵɵdefineInjectable({
        factory: function EacService_Factory() {
            return new EacService(ɵɵinject(HttpClient), ɵɵinject(SERVER_API_URL_CONFIG));
        }, token: EacService, providedIn: "root"
    });
    EacService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __param(1, Inject(SERVER_API_URL_CONFIG)),
        __metadata("design:paramtypes", [HttpClient, Object])
    ], EacService);
    return EacService;
}());

var EacDetailsComponent = /** @class */ (function () {
    function EacDetailsComponent(router, route, _dialogService, notificationService, eacService) {
        this.router = router;
        this.route = route;
        this._dialogService = _dialogService;
        this.notificationService = notificationService;
        this.eacService = eacService;
        this.properties = [];
    }

    EacDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (_a) {
            var entity = _a.entity;
            _this.entity = !!entity && entity.body ? entity.body : entity;
            _this.buildProperties();
        });
    };
    EacDetailsComponent.prototype.edit = function () {
        this.router.navigate(['/', 'eacs', this.entity.uuid, 'patient', this.entity.patient.uuid, 'edit']);
    };
    EacDetailsComponent.prototype.delete = function () {
        var _this = this;
        this._dialogService.openConfirm({
            title: 'Confirm',
            message: 'Do you want to delete this EAC Record, action cannot be reversed?',
            cancelButton: 'No',
            acceptButton: 'Yes',
            width: '500px',
        }).afterClosed().subscribe(function (accept) {
            if (accept) {
                _this.eacService.delete(_this.entity.id).subscribe(function (res) {
                    if (res.ok) {
                        _this.router.navigate(['patients']);
                    } else {
                        _this.notificationService.showError('Error deleting visit, please try again');
                    }
                });
            } else {
                // DO SOMETHING ELSE
            }
        });
    };
    EacDetailsComponent.prototype.buildProperties = function () {
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
    };
    EacDetailsComponent.prototype.previousState = function () {
        window.history.back();
    };
    EacDetailsComponent.ctorParameters = function () {
        return [
            {type: Router},
            {type: ActivatedRoute},
            {type: TdDialogService},
            {type: NotificationService},
            {type: EacService}
        ];
    };
    EacDetailsComponent = __decorate([
        Component({
            selector: 'eac-details',
            template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <mat-card>\n            <mat-card-header>\n            </mat-card-header>\n            <mat-card-content>\n                <adf-card-view [properties]=\"properties\" editable=\"false\"></adf-card-view>\n            </mat-card-content>\n            <mat-card-actions class=\"lamis-edit-form-actions\">\n                <button mat-button (click)=\"previousState()\">Back</button>\n                <button mat-raised-button color=\"warn\" (click)=\"delete()\">Delete</button>\n                <button mat-raised-button color=\"primary\" (click)=\"edit()\">Edit</button>\n            </mat-card-actions>\n        </mat-card>\n    </div>\n</div>\n"
        }),
        __metadata("design:paramtypes", [Router, ActivatedRoute,
            TdDialogService, NotificationService,
            EacService])
    ], EacDetailsComponent);
    return EacDetailsComponent;
}());

var moment$5 = moment_;
var EacEditComponent = /** @class */ (function () {
    function EacEditComponent(clinicService, eacService, notification, activatedRoute, appLoaderService) {
        this.clinicService = clinicService;
        this.eacService = eacService;
        this.notification = notification;
        this.activatedRoute = activatedRoute;
        this.appLoaderService = appLoaderService;
        this.today = moment$5();
        this.isSaving = false;
    }

    EacEditComponent.prototype.createEntity = function () {
        return {};
    };
    EacEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.data.subscribe(function (_a) {
            var entity = _a.entity;
            _this.entity = !!entity && entity.body ? entity.body : entity;
            if (_this.entity === undefined) {
                _this.entity = _this.createEntity();
            }
            var patientId = _this.activatedRoute.snapshot.paramMap.get('patientId');
            _this.clinicService.getPatient(patientId).subscribe(function (res) {
                _this.entity.patient = res;
                _this.entity.facility = res.facility;
                _this.dateRegistration = res.dateRegistration;
                _this.eacService.getLatestViralLoadByPatient(res.id).subscribe(function (r) {
                    if (r.body) {
                        _this.entity.dateLastViralLoad = r.body.laboratory.dateReported;
                        _this.entity.lastViralLoad = r.body.resultAB;
                        _this.eac1Min = _this.entity.dateLastViralLoad.clone().add(1, 'day');
                    }
                    _this.eac2Min = _this.entity.dateEac1 ? _this.entity.dateEac1.clone().add(2, 'week') :
                        _this.entity.dateLastViralLoad;
                    _this.eac3Min = _this.entity.dateEac2 ? _this.entity.dateEac2.clone().add(2, 'week') :
                        _this.entity.dateLastViralLoad;
                    _this.repeatVLMin = _this.entity.dateEac3 ? _this.entity.dateEac3.clone().add(1, 'day') :
                        _this.entity.dateLastViralLoad;
                });
                if (!_this.entity.id) {
                    _this.eacService.getLatestByPatient(res.uuid).subscribe(function (r) {
                        _this.entity = r.ok ? r.body : _this.createEntity();
                        _this.repeatVLMin = _this.entity.dateEac3 ? _this.entity.dateEac3.clone().add(1, 'day') :
                            _this.entity.dateLastViralLoad;
                        _this.eac2Min = _this.entity.dateEac1 ? _this.entity.dateEac1.clone().add(2, 'week') :
                            _this.entity.dateLastViralLoad;
                        _this.eac3Min = _this.entity.dateEac2 ? _this.entity.dateEac2.clone().add(2, 'week') :
                            _this.entity.dateLastViralLoad;
                    });
                }
            });
        });
    };
    EacEditComponent.prototype.dateEac1Changed = function (date) {
        this.eac2Min = date.clone().add(2, 'weeks');
    };
    EacEditComponent.prototype.dateEac2Changed = function (date) {
        this.eac3Min = date.clone().add(2, 'weeks');
    };
    EacEditComponent.prototype.dateEac3Changed = function (date) {
        this.repeatVLMin = date.clone().add(1, 'days');
        this.repeatVLMax = date.clone().add(6, 'months');
    };
    EacEditComponent.prototype.save = function () {
        //this.submitButton.disabled = true;
        //this.progressBar.mode = 'indeterminate';
        this.isSaving = true;
        this.appLoaderService.open('Saving EAC session..');
        if (this.entity.id !== undefined) {
            this.subscribeToSaveResponse(this.eacService.update(this.entity));
        } else {
            this.subscribeToSaveResponse(this.eacService.create(this.entity));
        }
    };
    EacEditComponent.prototype.previousState = function () {
        window.history.back();
    };
    EacEditComponent.prototype.subscribeToSaveResponse = function (result) {
        var _this = this;
        result.subscribe(function (res) {
            return _this.onSaveSuccess(res.body);
        }, function (res) {
            _this.onSaveError();
            _this.onError(res.message);
        });
    };
    EacEditComponent.prototype.onSaveSuccess = function (result) {
        this.appLoaderService.close();
        this.isSaving = false;
        this.notification.openSnackMessage('EAC session successfully saved');
        this.previousState();
    };
    EacEditComponent.prototype.onSaveError = function () {
        this.isSaving = false;
        this.appLoaderService.close();
        //this.submitButton.disabled = true;
        this.notification.showError('Error occurred saving EAC session; try again');
        //this.progressBar.mode = 'determinate';
    };
    EacEditComponent.prototype.onError = function (errorMessage) {
        this.appLoaderService.close();
        this.notification.showError(errorMessage);
    };
    EacEditComponent.ctorParameters = function () {
        return [
            {type: ClinicService},
            {type: EacService},
            {type: NotificationService},
            {type: ActivatedRoute},
            {type: AppLoaderService}
        ];
    };
    EacEditComponent = __decorate([
        Component({
            selector: 'eac-edit',
            template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <mat-card class=\"default\">\n            <mat-card-content>\n                <mat-progress-bar mode=\"determinate\" class=\"session-progress\"></mat-progress-bar>\n            </mat-card-content>\n        </mat-card>\n        <form name=\"form\" role=\"form\" novalidate (ngSubmit)=\"save()\" #clinicForm=\"ngForm\">\n            <mat-card class=\"default\">\n                <mat-card-content *ngIf=\"entity.patient\">\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field>\n                                <mat-label>Date Last Viral Load</mat-label>\n                                <input matInput\n                                       [value]=\"entity.dateLastViralLoad && entity.dateLastViralLoad.format('DD MMM, YYYY')\"\n                                       disabled>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field>\n                                <input matInput [value]=\"entity.lastViralLoad\" disabled>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div>\n                        <mat-form-field class=\"full-width\">\n                            <input matInput [matDatepicker]=\"picker\"\n                                   placeholder=\"Date of 1st EAC Session\"\n                                   [(ngModel)]=\"entity.dateEac1\"\n                                   #visit=\"ngModel\"\n                                   (dateChange)=\"dateEac1Changed($event.value)\"\n                                   [max]=\"today\"\n                                   [min]=\"eac1Min\"\n                                   name=\"visit\"\n                                   required>\n                            <mat-datepicker-toggle\n                                    matSuffix\n                                    [for]=\"picker\">\n                            </mat-datepicker-toggle>\n                            <mat-datepicker #picker></mat-datepicker>\n                            <mat-error\n                                    *ngIf=\"visit.errors && (visit.dirty || visit.touched) && (visit.errors.required)\">\n                                Date of first EAC session is required\n                            </mat-error>\n                            <mat-error\n                                    *ngIf=\"visit.errors && (visit.dirty || visit.touched) && (visit.errors.min)\">\n                                Date of first EAC session cannot be before {{eac1Min | date: 'dd MMM, yyyy'}}\n                            </mat-error>\n                            <mat-error\n                                    *ngIf=\"visit.errors && (visit.dirty || visit.touched) && (visit.errors.max)\">\n                                Date of first EAC session cannot be after {{today | date: 'dd MMM, yyyy'}}\n                            </mat-error>\n                        </mat-form-field>\n                    </div>\n                    <div>\n                        <mat-form-field class=\"full-width\" *ngIf=\"entity.id && !!eac2Min\">\n                            <input matInput [matDatepicker]=\"picker2\"\n                                   placeholder=\"Date of 2nd EAC Session\"\n                                   [(ngModel)]=\"entity.dateEac2\"\n                                   #visit2=\"ngModel\"\n                                   (dateChange)=\"dateEac2Changed($event.value)\"\n                                   [max]=\"today\"\n                                   [min]=\"eac2Min\"\n                                   name=\"visit2\">\n                            <mat-datepicker-toggle\n                                    matSuffix\n                                    [for]=\"picker2\">\n                            </mat-datepicker-toggle>\n                            <mat-datepicker #picker2></mat-datepicker>\n                            <mat-error\n                                    *ngIf=\"visit2.errors && (visit2.dirty || visit2.touched) && (visit2.errors.required)\">\n                                Date of second EAC session is required\n                            </mat-error>\n                            <mat-error\n                                    *ngIf=\"visit2.errors && (visit2.dirty || visit2.touched) && (visit2.errors.min)\">\n                                Date of second EAC session cannot be before {{eac2Min | date: 'dd MMM, yyyy'}}\n                            </mat-error>\n                            <mat-error\n                                    *ngIf=\"visit2.errors && (visit2.dirty || visit2.touched) && (visit2.errors.max)\">\n                                Date of second EAC session cannot be after {{today | date: 'dd MMM, yyyy'}}\n                            </mat-error>\n                        </mat-form-field>\n                    </div>\n                    <div>\n                        <mat-form-field class=\"full-width\" *ngIf=\"entity.dateEac2 && !!eac3Min\">\n                            <input matInput [matDatepicker]=\"picker3\"\n                                   placeholder=\"Date of 3rd EAC Session\"\n                                   [(ngModel)]=\"entity.dateEac3\"\n                                   #visit3=\"ngModel\"\n                                   (dateChange)=\"dateEac3Changed($event.value)\"\n                                   [max]=\"today\"\n                                   [min]=\"eac3Min\"\n                                   name=\"visit3\">\n                            <mat-datepicker-toggle\n                                    matSuffix\n                                    [for]=\"picker3\">\n                            </mat-datepicker-toggle>\n                            <mat-datepicker #picker3></mat-datepicker>\n                            <mat-error\n                                    *ngIf=\"visit3.errors && (visit3.dirty || visit3.touched) && (visit3.errors.required)\">\n                                Date of third EAC session is required\n                            </mat-error>\n                            <mat-error\n                                    *ngIf=\"visit3.errors && (visit3.dirty || visit3.touched) && (visit3.errors.min)\">\n                                Date of third EAC session cannot be before {{eac3Min | date: 'dd MMM, yyyy'}}\n                            </mat-error>\n                            <mat-error\n                                    *ngIf=\"visit3.errors && (visit3.dirty || visit3.touched) && (visit3.errors.max)\">\n                                Date of third EAC session cannot be after {{today | date: 'dd MMM, yyyy'}}\n                            </mat-error>\n                        </mat-form-field>\n                    </div>\n                    <div>\n                        <mat-form-field class=\"full-width\" *ngIf=\"entity.dateEac3 && !!repeatVLMin\">\n                            <input matInput [matDatepicker]=\"picker4\"\n                                   placeholder=\"Date of Repeat VL Sample Collection\"\n                                   [(ngModel)]=\"entity.dateSampleCollected\"\n                                   #visit4=\"ngModel\"\n                                   [max]=\"repeatVLMax\"\n                                   [min]=\"repeatVLMin\"\n                                   name=\"repeat\">\n                            <mat-datepicker-toggle\n                                    matSuffix\n                                    [for]=\"picker4\">\n                            </mat-datepicker-toggle>\n                            <mat-datepicker #picker4></mat-datepicker>\n                            <mat-error\n                                    *ngIf=\"visit4.errors && (visit4.dirty || visit4.touched) && (visit4.errors.required)\">\n                                Date of Repeat VL Sample Collection is required\n                            </mat-error>\n                            <mat-error\n                                    *ngIf=\"visit4.errors && (visit4.dirty || visit4.touched) && (visit4.errors.min)\">\n                                Date of Repeat VL Sample Collection cannot be before {{repeatVLMin | date:'dd MMM, yyyy'}}\n                            </mat-error>\n                            <mat-error\n                                    *ngIf=\"visit4.errors && (visit4.dirty || visit4.touched) && (visit4.errors.max)\">\n                                Date of Repeat VL Sample Collection cannot be after {{repeatVLMax | date:'dd MMM, yyyy'}}\n                            </mat-error>\n                        </mat-form-field>\n                    </div>\n                    <div>\n                        <mat-form-field class=\"full-width\">\n                            <textarea matInput placeholder=\"Notes\"\n                                      cols=\"30\"\n                                      rows=\"3\"\n                                      name=\"notes\"\n                                      #note=\"ngModel\" [(ngModel)]=\"entity.notes\"></textarea>\n                        </mat-form-field>\n                    </div>\n                    <mat-card-actions class=\"lamis-edit-form-actions\">\n                        <button mat-raised-button type=\"button\" (click)=\"previousState()\">Back</button>\n                        <button mat-raised-button color='primary'\n                                [disabled]=\"clinicForm.invalid || isSaving\"\n                                type=\"submit\">\n                            {{entity.id !== undefined ? 'Update' : 'Save'}}\n                        </button>\n                    </mat-card-actions>\n                </mat-card-content>\n            </mat-card>\n        </form>\n    </div>\n</div>\n"
        }),
        __metadata("design:paramtypes", [ClinicService,
            EacService,
            NotificationService,
            ActivatedRoute,
            AppLoaderService])
    ], EacEditComponent);
    return EacEditComponent;
}());

var EacResolve = /** @class */ (function () {
    function EacResolve(service) {
        this.service = service;
    }

    EacResolve.prototype.resolve = function (route, state) {
        var id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.findByUuid(id).pipe(filter(function (response) {
                return response.ok;
            }), map(function (patient) {
                return patient.body;
            }));
        }
        return of({});
    };
    EacResolve.ctorParameters = function () {
        return [
            {type: EacService}
        ];
    };
    EacResolve = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [EacService])
    ], EacResolve);
    return EacResolve;
}());
var ɵ0$2 = {
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
var ROUTES$2 = [
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

var EacModule = /** @class */ (function () {
    function EacModule() {
    }

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
    return EacModule;
}());

var CaseManagementService = /** @class */ (function () {
    function CaseManagementService(http, serverUrl) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.resourceUrl = '';
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/case-management';
    }

    CaseManagementService.prototype.initClients = function (facilityId) {
        return this.http.get(this.resourceUrl + "/init-clients/" + facilityId);
    };
    CaseManagementService.prototype.getClientList = function (req) {
        return this.http.post(this.resourceUrl + "/client-list", req, {observe: 'response'});
    };
    CaseManagementService.prototype.getCaseManagerStats = function (caseManagerId, facilityId) {
        return this.http.get(this.resourceUrl + "/facility/" + facilityId + "/case-manager/" + caseManagerId + "/stats");
    };
    CaseManagementService.prototype.getActiveFacility = function () {
        return this.http.get('/api/facilities/active');
    };
    CaseManagementService.prototype.getCaseManagers = function (facilityId) {
        return this.http.get(this.resourceUrl + "/facility/" + facilityId + "/case-managers");
    };
    CaseManagementService.prototype.assignToCaseManager = function (caseManagerId, ids) {
        var params = new HttpParams();
        ids.forEach(function (id) {
            return params = params.append("ids", id.toString());
        });
        return this.http.get(this.resourceUrl + "/case-manager/" + caseManagerId + "/assign-clients", {
            params: params,
            observe: 'response'
        });
    };
    CaseManagementService.prototype.deAssignClients = function (ids) {
        var params = new HttpParams();
        ids.forEach(function (id) {
            return params = params.append("ids", id.toString());
        });
        return this.http.get(this.resourceUrl + "/de-assign-clients", {
            params: params,
            observe: 'response'
        });
    };
    CaseManagementService.prototype.getStates = function () {
        return this.http.get('/api/states');
    };
    CaseManagementService.prototype.getLgasByState = function (id) {
        return this.http.get("/api/provinces/state/" + id);
    };
    CaseManagementService.ctorParameters = function () {
        return [
            {type: HttpClient},
            {type: undefined, decorators: [{type: Inject, args: [SERVER_API_URL_CONFIG,]}]}
        ];
    };
    CaseManagementService.ngInjectableDef = ɵɵdefineInjectable({
        factory: function CaseManagementService_Factory() {
            return new CaseManagementService(ɵɵinject(HttpClient), ɵɵinject(SERVER_API_URL_CONFIG));
        }, token: CaseManagementService, providedIn: "root"
    });
    CaseManagementService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __param(1, Inject(SERVER_API_URL_CONFIG)),
        __metadata("design:paramtypes", [HttpClient, Object])
    ], CaseManagementService);
    return CaseManagementService;
}());

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
    PatientListComponent = __decorate([
        Component({
            selector: 'case-management-patient-list',
            template: "<div class=\"layout\">\n    <div class=\"list-container\">\n        <mat-card>\n            <mat-card-content>\n                <div class=\"row\">\n                    <div class=\"col-md-6\">\n                        <mat-form-field class=\"full-width\">\n                            <mat-label>Facility Case Manager:</mat-label>\n                            <mat-select [(ngModel)]=\"caseManager\" name=\"caseManager\"\n                                        (selectionChange)=\"caseManagerChanged()\">\n                                <mat-option></mat-option>\n                                <mat-option *ngFor=\"let c of caseManagers\" [value]=\"c\">{{c.name}}\n                                </mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n                    <div class=\"col-md-6\">\n                        <div *ngIf=\"caseManager\">\n                            <div class=\"row\">\n                                <div class=\"col-md-2\">\n                                    Clients(s) Assigned:\n                                </div>\n                                <div class=\"col-md-2\">\n                                    {{stats.assigned | number: '1.'}}\n                                </div>\n                                <div class=\"col-md-2\">\n                                    Stable 1 Year:\n                                </div>\n                                <div class=\"col-md-2\">\n                                    {{stats.stable | number: '1.'}}\n                                </div>\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col-md-2\">\n                                    Unstable less than 1 Year:\n                                </div>\n                                <div class=\"col-md-2\">\n                                    {{stats.unstableLessThan1year | number: '1.'}}\n                                </div>\n                                <div class=\"col-md-2\">\n                                    Unstable more than 1 Year:\n                                </div>\n                                <div class=\"col-md-2\">\n                                    {{stats.unstableMoreThan1Year | number: '1.'}}\n                                </div>\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col-md-2\">\n                                    Awaiting ART:\n                                </div>\n                                <div class=\"col-md-2\">\n                                    {{stats.preArt | number: '1.'}}\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <h5> Demographic/Clinic filters</h5>\n                <p></p>\n                <div class=\"row\">\n                    <div class=\"col-md-6\">\n                        <mat-form-field class=\"full-width\">\n                            <mat-label>Client Categorization</mat-label>\n                            <mat-select name=\"categoryId\" [(ngModel)]=\"filter.status\" (selectionChange)=\"updateList()\">\n                                <mat-option>--All--</mat-option>\n                                <mat-option value='STABLE'>Stable One Year</mat-option>\n                                <mat-option value='UNSTABLE_LESS_THAN_1_YEAR'>Unstable less than One Year</mat-option>\n                                <mat-option value='UNSTABLE_MORE_THAN_1_YEAR'>Unstable One Year or more</mat-option>\n                                <mat-option value='PRE_ART'>Awaiting ART</mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n                    <div class=\"col-md-6\">\n                        <mat-form-field class=\"full-width\">\n                            <mat-label>Age Group</mat-label>\n                            <mat-select name=\"ageGroup\" [(ngModel)]=\"ageLimit\" (selectionChange)=\"ageGroupChanged()\">\n                                <mat-option>--All--</mat-option>\n                                <mat-option value='9'>Children (0-9 Years)</mat-option>\n                                <mat-option value='14'>Younger Adolescent (10 to 14 Years)</mat-option>\n                                <mat-option value='19'>Older Adolescent (15 to 19 Years)</mat-option>\n                                <mat-option value='24'>Young People (20 to 24 Years)</mat-option>\n                                <mat-option value='100'>Adults (25 and Above)</mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"col-md-6\">\n                        <mat-form-field class=\"full-width\">\n                            <mat-label>Gender</mat-label>\n                            <mat-select name=\"gender\" [(ngModel)]=\"filter.gender\" (selectionChange)=\"updateList()\">\n                                <mat-option>--All--</mat-option>\n                                <mat-option [value]=\"'FEMALE'\">Female</mat-option>\n                                <mat-option [value]=\"'MALE'\">Male</mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n                    <div class=\"col-md-6\">\n                        <mat-form-field class=\"full-width\">\n                            <mat-label>Pregnancy Status</mat-label>\n                            <mat-select name=\"pregnancyStatus\" [(ngModel)]=\"pregnancyStatus\"\n                                        (selectionChange)=\"pregnancyStatusChanged()\">\n                                <mat-option>--All--</mat-option>\n                                <mat-option value='1'>Pregnant</mat-option>\n                                <mat-option value='2'>Breastfeeding</mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"col-md-6\">\n                        <mat-form-field class=\"full-width\">\n                            <mat-label>State of Residence</mat-label>\n                            <mat-select name=\"state\" (selectionChange)=\"stateChanged($event.value.id)\">\n                                <mat-option></mat-option>\n                                <mat-option *ngFor=\"let state of states\" [value]=\"state\">{{state.name}}</mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n                    <div class=\"col-md-6\">\n                        <mat-form-field class=\"full-width\">\n                            <mat-label>LGA of Residence</mat-label>\n                            <mat-select name=\"lga\" (selectionChange)=\"lgaChanged($event.value.id)\">\n                                <mat-option></mat-option>\n                                <mat-option *ngFor=\"let lga of lgas\" [value]=\"lga\">{{lga.name}}</mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n                </div>\n                <div *ngIf=\"patients?.length\">\n                    <div class=\"row\">\n                        <div class=\"col-md-2\">\n                            Clients(s) Assigned:\n                        </div>\n                        <div class=\"col-md-2\">\n                            {{globalStats.assigned | number: '1.'}}\n                        </div>\n                        <div class=\"col-md-2\">\n                            Stable 1 Year:\n                        </div>\n                        <div class=\"col-md-2\">\n                            {{globalStats.stable | number: '1.'}}\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-2\">\n                            Unstable less than 1 Year:\n                        </div>\n                        <div class=\"col-md-2\">\n                            {{globalStats.unstableLessThan1year | number: '1.'}}\n                        </div>\n                        <div class=\"col-md-2\">\n                            Unstable more than 1 Year:\n                        </div>\n                        <div class=\"col-md-2\">\n                            {{globalStats.unstableMoreThan1Year | number: '1.'}}\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-2\">\n                            Awaiting ART:\n                        </div>\n                        <div class=\"col-md-2\">\n                            {{globalStats.preArt | number: '1.'}}\n                        </div>\n                    </div>\n                </div>\n                <div>\n                    <div class=\"row\">\n                        <div class=\"col-md-8 col-md-offset-4\">\n                            <div class=\"adf-toolbar--spacer\"></div>\n                            <td-search-box backIcon=\"arrow_back\" class=\"push-right-sm\"\n                                           placeholder=\"Search hospital number\" [debounce]=\"500\"\n                                           [(ngModel)]=\"hospitalNum\"\n                                           (searchDebounce)=\"search()\"\n                                           (search)=\"search()\"\n                                           (clear)=\"clearHospitalNum()\" flex>\n                            </td-search-box>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-sm-1 col-sm-offset-11\">\n                            <button mat-raised-button color=\"primary\"\n                                    *ngIf=\"caseManager && selections()\"\n                                    (click)=\"assignClients()\">Assign to Case Manager\n                            </button>\n                            <button mat-raised-button color=\"primary\" *ngIf=\"selections()\"\n                                    (click)=\"deAssignClients()\">De-assign Client(s)\n                            </button>\n                        </div>\n                    </div>\n                    <mat-progress-spinner\n                            *ngIf=\"initializing\"\n                            class=\"adf-document-list-loading-margin\"\n                            [color]=\"'primary'\"\n                            [mode]=\"'indeterminate'\">\n                    </mat-progress-spinner>\n                    <adf-datatable *ngIf=\"patients || loading\"\n                                   [rows]=\"patients\"\n                                   (rowClick)=\"select($event.value)\">\n                        <data-columns>\n                            <data-column key=\"selected\" title=\"\">\n                                <ng-template let-context=\"$implicit\">\n                                    <mat-checkbox [checked]=\"context.row.getValue('selected')\"></mat-checkbox>\n                                </ng-template>\n                            </data-column>\n                            <data-column key=\"name\" title=\"Name\" sortable=\"true\"></data-column>\n                            <data-column key=\"hospitalNum\" title=\"Hospital Number\" sortable=\"true\"></data-column>\n                            <data-column key=\"gender\" title=\"Gender\" sortable=\"true\">\n                                <ng-template let-context=\"$implicit\">\n                                    {{context.row.getValue('gender') === 'MALE' ? 'Male' : context.row.getValue('gender') === 'FEMALE' ? 'Female' : ''}}\n                                </ng-template>\n                            </data-column>\n                            <data-column key=\"dateBirth\" title=\"Date of Birth\" sortable=\"true\">\n                                <ng-template let-context=\"$implicit\">\n                                    {{context.row.getValue('dateBirth') | date: 'dd MMM, yyyy'}}\n                                </ng-template>\n                            </data-column>\n                            <data-column key=\"address\" title=\"Address\" class=\"full-width ellipsis-cell\"></data-column>\n                            <data-column key=\"currentStatus\" title=\"ART Status\" sortable=\"true\"></data-column>\n                            <data-column key=\"caseManager.name\" title=\"Assigned to\" sortable=\"true\"></data-column>\n                        </data-columns>\n                        <adf-loading-content-template>\n                            <ng-template>\n                                <mat-progress-spinner\n                                        class=\"adf-document-list-loading-margin\"\n                                        [color]=\"'primary'\"\n                                        [mode]=\"'indeterminate'\">\n                                </mat-progress-spinner>\n                            </ng-template>\n                        </adf-loading-content-template>\n                    </adf-datatable>\n                </div>\n                <adf-empty-content\n                        *ngIf=\"!patients\"\n                        icon=\"blur_on\"\n                        [title]=\"'No Patients found'\"\n                        [subtitle]=\"'No Patients matching search criteria or no Patients available'\">\n                </adf-empty-content>\n                <div class=\"row\">\n                    <div class=\"col-md-8\">\n                        <ngb-pagination [collectionSize]=\"totalItems\"\n                                        [(page)]=\"page\"\n                                        [pageSize]=\"itemsPerPage\"\n                                        [maxSize]=\"5\"\n                                        size=\"sm\"\n                                        [rotate]=\"true\"\n                                        [boundaryLinks]=\"true\"\n                                        (pageChange)=\"loadPage(page)\">\n                        </ngb-pagination>\n                    </div>\n                    <div class=\"col-md-4\">\n                        <mat-form-field>\n                            <mat-label>Assignment Filter</mat-label>\n                            <mat-select (selectionChange)=\"assigned($event.value)\">\n                                <mat-option></mat-option>\n                                <mat-option [value]=\"1\">Only assigned clients</mat-option>\n                                <mat-option [value]=\"2\">Only clients not assigned</mat-option>\n                            </mat-select>\n                        </mat-form-field>\n                    </div>\n                </div>\n            </mat-card-content>\n        </mat-card>\n    </div>\n</div>\n"
        }),
        __metadata("design:paramtypes", [CaseManagementService, TdDialogService,
            NotificationService, RxStompService])
    ], PatientListComponent);
    return PatientListComponent;
}());

var ɵ0$3 = {
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
var ROUTES$3 = [
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

var CaseManagementModule = /** @class */ (function () {
    function CaseManagementModule() {
    }

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
    return CaseManagementModule;
}());

var CaseManagerService = /** @class */ (function () {
    function CaseManagerService(http, serverUrl) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.resourceUrl = '';
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/case-managers';
    }

    CaseManagerService.prototype.create = function (caseManager) {
        return this.http
            .post(this.resourceUrl, caseManager, {observe: 'response'});
    };
    CaseManagerService.prototype.update = function (caseManager) {
        return this.http
            .put(this.resourceUrl, caseManager, {observe: 'response'});
    };
    CaseManagerService.prototype.find = function (id) {
        return this.http
            .get(this.resourceUrl + "/" + id, {observe: 'response'});
    };
    CaseManagerService.prototype.findByUuid = function (id) {
        return this.http
            .get(this.resourceUrl + "/by-uuid/" + id, {observe: 'response'});
    };
    CaseManagerService.prototype.delete = function (id) {
        return this.http.delete(this.resourceUrl + "/" + id, {observe: 'response'});
    };
    CaseManagerService.prototype.query = function (req) {
        var options = createRequestOption(req);
        return this.http
            .get(this.resourceUrl, {params: options, observe: 'response'});
    };
    CaseManagerService.ctorParameters = function () {
        return [
            {type: HttpClient},
            {type: undefined, decorators: [{type: Inject, args: [SERVER_API_URL_CONFIG,]}]}
        ];
    };
    CaseManagerService.ngInjectableDef = ɵɵdefineInjectable({
        factory: function CaseManagerService_Factory() {
            return new CaseManagerService(ɵɵinject(HttpClient), ɵɵinject(SERVER_API_URL_CONFIG));
        }, token: CaseManagerService, providedIn: "root"
    });
    CaseManagerService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __param(1, Inject(SERVER_API_URL_CONFIG)),
        __metadata("design:paramtypes", [HttpClient, Object])
    ], CaseManagerService);
    return CaseManagerService;
}());

var CaseManagerDetailsComponent = /** @class */ (function () {
    function CaseManagerDetailsComponent(router, route, service, _dialogService, notificationService) {
        this.router = router;
        this.route = route;
        this.service = service;
        this._dialogService = _dialogService;
        this.notificationService = notificationService;
        this.properties = [];
    }

    CaseManagerDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (_a) {
            var entity = _a.entity;
            _this.entity = !!entity && entity.body ? entity.body : entity;
            _this.buildProperties();
        });
    };
    CaseManagerDetailsComponent.prototype.edit = function () {
        this.router.navigate(['/', 'admin', 'case-managers', this.entity.uuid, 'edit']);
    };
    CaseManagerDetailsComponent.prototype.delete = function () {
        var _this = this;
        this._dialogService.openConfirm({
            title: 'Confirm',
            message: 'Do you want to delete this Case Manager, action cannot be reversed?',
            cancelButton: 'No',
            acceptButton: 'Yes',
            width: '500px',
        }).afterClosed().subscribe(function (accept) {
            if (accept) {
                _this.service.delete(_this.entity.id).subscribe(function (res) {
                    if (res.ok) {
                        _this.router.navigate(['admin', 'case-managers']);
                    } else {
                        _this.notificationService.showError('Error deleting Case Manager, please try again');
                    }
                });
            } else {
                // DO SOMETHING ELSE
            }
        });
    };
    CaseManagerDetailsComponent.prototype.buildProperties = function () {
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
    };
    CaseManagerDetailsComponent.prototype.previousState = function () {
        window.history.back();
    };
    CaseManagerDetailsComponent.ctorParameters = function () {
        return [
            {type: Router},
            {type: ActivatedRoute},
            {type: CaseManagerService},
            {type: TdDialogService},
            {type: NotificationService}
        ];
    };
    CaseManagerDetailsComponent = __decorate([
        Component({
            selector: 'case-manager-details',
            template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <mat-card>\n            <mat-card-header>\n            </mat-card-header>\n            <mat-card-content>\n                <adf-card-view [properties]=\"properties\" editable=\"false\"></adf-card-view>\n            </mat-card-content>\n            <mat-card-actions class=\"lamis-edit-form-actions\">\n                <button mat-button (click)=\"previousState()\">Back</button>\n                <button mat-raised-button color=\"warn\" (click)=\"delete()\">Delete</button>\n                <button mat-raised-button color=\"primary\" (click)=\"edit()\">Edit</button>\n            </mat-card-actions>\n        </mat-card>\n    </div>\n</div>\n"
        }),
        __metadata("design:paramtypes", [Router, ActivatedRoute, CaseManagerService,
            TdDialogService,
            NotificationService])
    ], CaseManagerDetailsComponent);
    return CaseManagerDetailsComponent;
}());

var CaseManagerEditComponent = /** @class */ (function () {
    function CaseManagerEditComponent(caseManagementService, caseManagerService, notification, activatedRoute, appLoaderService) {
        this.caseManagementService = caseManagementService;
        this.caseManagerService = caseManagerService;
        this.notification = notification;
        this.activatedRoute = activatedRoute;
        this.appLoaderService = appLoaderService;
    }

    CaseManagerEditComponent.prototype.createEntity = function () {
        return {};
    };
    CaseManagerEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isSaving = false;
        this.activatedRoute.data.subscribe(function (_a) {
            var entity = _a.entity;
            _this.entity = !!entity && entity.body ? entity.body : entity;
            if (_this.entity === undefined) {
                _this.entity = _this.createEntity();
            }
            _this.caseManagementService.getActiveFacility().subscribe(function (res) {
                _this.entity.facility = res;
            });
        });
    };
    CaseManagerEditComponent.prototype.save = function () {
        this.isSaving = true;
        this.appLoaderService.open('Saving Case Manager..');
        if (this.entity.id !== undefined) {
            this.subscribeToSaveResponse(this.caseManagerService.update(this.entity));
        } else {
            this.subscribeToSaveResponse(this.caseManagerService.create(this.entity));
        }
    };
    CaseManagerEditComponent.prototype.previousState = function () {
        window.history.back();
    };
    CaseManagerEditComponent.prototype.subscribeToSaveResponse = function (result) {
        var _this = this;
        result.subscribe(function (res) {
            return _this.onSaveSuccess(res.body);
        }, function (res) {
            _this.onSaveError();
            _this.onError(res.message);
        });
    };
    CaseManagerEditComponent.prototype.onSaveSuccess = function (result) {
        this.appLoaderService.close();
        this.isSaving = false;
        this.notification.openSnackMessage('Case Manager successfully saved');
        this.previousState();
    };
    CaseManagerEditComponent.prototype.onSaveError = function () {
        this.isSaving = false;
        this.appLoaderService.close();
        //this.submitButton.disabled = true;
        this.notification.showError('Error occurred saving Case Manager; try again');
        //this.progressBar.mode = 'determinate';
    };
    CaseManagerEditComponent.prototype.onError = function (errorMessage) {
        this.appLoaderService.close();
        this.notification.showError(errorMessage);
    };
    CaseManagerEditComponent.ctorParameters = function () {
        return [
            {type: CaseManagementService},
            {type: CaseManagerService},
            {type: NotificationService},
            {type: ActivatedRoute},
            {type: AppLoaderService}
        ];
    };
    CaseManagerEditComponent = __decorate([
        Component({
            selector: 'case-manager-edit',
            template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <form name=\"form\" role=\"form\" novalidate (ngSubmit)=\"save()\" #caseManagerForm=\"ngForm\">\n            <mat-card class=\"default\">\n                <mat-card-content>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Name</mat-label>\n                                <input matInput name=\"name\" #name=\"ngModel\"\n                                       required\n                                       [(ngModel)]=\"entity.name\"/>\n                                <mat-error\n                                        *ngIf=\"name.errors && (name.dirty || name.touched) && (name.errors.required)\">\n                                    Case Manager name is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Address</mat-label>\n                                <textarea matInput name=\"address\" [(ngModel)]=\"entity.address\" #address=\"ngModel\"\n                                          rows=\"2\" required>\n                                </textarea>\n                                <mat-error\n                                        *ngIf=\"address.errors && (address.dirty || address.touched) && (address.errors.required)\">\n                                    Case Manager address is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Sex</mat-label>\n                                <mat-select name=\"sex\" [(ngModel)]=\"entity.gender\" #sex=\"ngModel\" required>\n                                    <mat-option></mat-option>\n                                    <mat-option [value]=\"'FEMALE'\">Female</mat-option>\n                                    <mat-option [value]=\"'MALE'\">Male</mat-option>\n                                </mat-select>\n                                <mat-error\n                                        *ngIf=\"sex.errors && (sex.dirty || sex.touched) && (sex.errors.required)\">\n                                    Case Manager sex is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Telephone</mat-label>\n                                <input matInput name=\"phone\" phoneNumber [(ngModel)]=\"entity.phoneNumber\" required\n                                       #phone=\"ngModel\"/>\n                                <mat-error\n                                        *ngIf=\"phone.errors && (phone.dirty || phone.touched) && (phone.errors.required)\">\n                                    Case Manager Telephone number is required\n                                </mat-error>\n                                <mat-error\n                                        *ngIf=\"phone.errors && (phone.dirty || phone.touched) && (phone.errors.invalidPhone)\">\n                                    Invalid phone number\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                </mat-card-content>\n                <mat-card-actions class=\"lamis-edit-form-actions\">\n                    <button mat-raised-button type=\"button\" (click)=\"previousState()\">Back</button>\n                    <button mat-raised-button color='primary'\n                            [disabled]=\"caseManagerForm.invalid || isSaving\"\n                            type=\"submit\">\n                        {{entity.id !== undefined ? 'Update' : 'Save'}}\n                    </button>\n                </mat-card-actions>\n            </mat-card>\n        </form>\n    </div>\n</div>\n"
        }),
        __metadata("design:paramtypes", [CaseManagementService,
            CaseManagerService,
            NotificationService,
            ActivatedRoute,
            AppLoaderService])
    ], CaseManagerEditComponent);
    return CaseManagerEditComponent;
}());

var CaseManagerListComponent = /** @class */ (function () {
    function CaseManagerListComponent(caseManagerService, caseManagementService, notification, router, activatedRoute) {
        this.caseManagerService = caseManagerService;
        this.caseManagementService = caseManagementService;
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

    CaseManagerListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.caseManagementService.getActiveFacility().subscribe(function (res) {
            _this.facility = res;
            _this.onPageChange(0);
        });
    };
    CaseManagerListComponent.prototype.select = function (data) {
        this.router.navigate(['..', 'case-managers', data.obj.uuid, 'view'], {relativeTo: this.activatedRoute});
    };
    CaseManagerListComponent.prototype.onPageChange = function (pageInfo) {
        this.page = pageInfo;
        this.loadAll();
    };
    CaseManagerListComponent.prototype.loadPage = function (page) {
        this.page = page;
        this.loadAll();
    };
    CaseManagerListComponent.prototype.loadAll = function () {
        var _this = this;
        this.loading = true;
        this.caseManagerService.query({
            keyword: this.currentSearch,
            page: this.page,
            id: this.facility.id || 0,
            size: this.itemsPerPage,
            sort: ['id', 'asc']
        }).subscribe(function (res) {
            _this.onSuccess(res.body, res.headers);
        }, function (res) {
            return _this.onError(res);
        });
    };
    CaseManagerListComponent.prototype.onSuccess = function (data, headers) {
        this.caseManagers = data;
        this.totalItems = headers.get('X-Total-Count');
        this.loading = false;
    };
    CaseManagerListComponent.prototype.onError = function (error) {
        this.notification.openSnackMessage(error.message);
        this.loading = false;
    };
    CaseManagerListComponent.ctorParameters = function () {
        return [
            {type: CaseManagerService},
            {type: CaseManagementService},
            {type: NotificationService},
            {type: Router},
            {type: ActivatedRoute}
        ];
    };
    CaseManagerListComponent = __decorate([
        Component({
            selector: 'case-managers',
            template: "<div class=\"layout\">\n    <div class=\"list-container\">\n        <adf-datatable *ngIf=\"caseManagers\"\n                       [rows]=\"caseManagers\"\n                       [loading]=\"loading\"\n                       [display]=\"display\"\n                       (rowClick)=\"select($event.value)\">\n            <data-columns>\n                <data-column key=\"name\" title=\"Name\" sortable=\"true\"></data-column>\n                <data-column key=\"gender\" title=\"Gender\" sortable=\"true\">\n                    <ng-template let-context=\"$implicit\">\n                        {{context.row.getValue('gender') === 'MALE' ? 'Male' : context.row.getValue('gender') === 'FEMALE' ? 'Female' : ''}}\n                    </ng-template>\n                </data-column>\n                <data-column key=\"phoneNumber\" title=\"Telephone Number\" sortable=\"true\"></data-column>\n                <data-column key=\"address\" title=\"Address\" class=\"full-width ellipsis-cell\"></data-column>\n            </data-columns>\n            <adf-loading-content-template>\n                <ng-template>\n                    <mat-progress-spinner\n                            class=\"adf-document-list-loading-margin\"\n                            [color]=\"'primary'\"\n                            [mode]=\"'indeterminate'\">\n                    </mat-progress-spinner>\n                </ng-template>\n            </adf-loading-content-template>\n        </adf-datatable>\n    </div>\n    <adf-empty-content\n            *ngIf=\"!caseManagers\"\n            icon=\"blur_on\"\n            [title]=\"'No Case Managers found'\"\n            [subtitle]=\"'No Case Managers matching search criteria or no Case Managers available'\">\n    </adf-empty-content>\n    <ngb-pagination [collectionSize]=\"totalItems\"\n                    [(page)]=\"page\"\n                    [pageSize]=\"itemsPerPage\"\n                    [maxSize]=\"5\"\n                    size=\"sm\"\n                    [rotate]=\"true\"\n                    [boundaryLinks]=\"true\"\n                    (pageChange)=\"loadPage(page)\">\n    </ngb-pagination>\n\n</div>\n<div class=\"fab-container\">\n    <button mat-fab\n            [matTooltip]=\"'Add New Case Manager'\"\n            [routerLink]=\"['new']\">\n        <mat-icon>add</mat-icon>\n    </button>\n</div>\n"
        }),
        __metadata("design:paramtypes", [CaseManagerService,
            CaseManagementService,
            NotificationService,
            Router,
            ActivatedRoute])
    ], CaseManagerListComponent);
    return CaseManagerListComponent;
}());

var CaseManagerResolve = /** @class */ (function () {
    function CaseManagerResolve(service) {
        this.service = service;
    }

    CaseManagerResolve.prototype.resolve = function (route, state) {
        var id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.findByUuid(id).pipe(filter(function (response) {
                return response.ok;
            }), map(function (patient) {
                return patient.body;
            }));
        }
        return of({});
    };
    CaseManagerResolve.ctorParameters = function () {
        return [
            {type: CaseManagerService}
        ];
    };
    CaseManagerResolve = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [CaseManagerService])
    ], CaseManagerResolve);
    return CaseManagerResolve;
}());
var ɵ0$4 = {
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
var ROUTES$4 = [
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

var CaseManagerModule = /** @class */ (function () {
    function CaseManagerModule() {
    }

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
    return CaseManagerModule;
}());

/*
 * Public API Surface of Clinic
 */

/**
 * Generated bundle index. Do not edit.
 */

export {
    CaseManagementModule,
    CaseManagerModule,
    ChronicCareModule,
    ChronicCareService,
    ClinicModule,
    ClinicService,
    ClinicWidgetModule,
    EacModule,
    ClinicDetailsComponent as ɵa,
    ClinicEditComponent as ɵb,
    ClinicResolve as ɵc,
    ROUTES as ɵd,
    modules as ɵe,
    MaterialModule as ɵf,
    ClinicWidget as ɵg,
    ChronicCareDetailComponent as ɵh,
    ChronicCareEditComponent as ɵi,
    ChronicCareResolve as ɵj,
    ROUTES$1 as ɵk,
    EacResolve as ɵl,
    ROUTES$2 as ɵm,
    EacDetailsComponent as ɵn,
    EacService as ɵo,
    EacEditComponent as ɵp,
    ROUTES$3 as ɵq,
    PatientListComponent as ɵr,
    CaseManagementService as ɵs,
    CaseManagerResolve as ɵt,
    ROUTES$4 as ɵu,
    CaseManagerListComponent as ɵv,
    CaseManagerService as ɵw,
    CaseManagerDetailsComponent as ɵx,
    CaseManagerEditComponent as ɵy
};
//# sourceMappingURL=lamis-clinic-1.1.3.js.map
