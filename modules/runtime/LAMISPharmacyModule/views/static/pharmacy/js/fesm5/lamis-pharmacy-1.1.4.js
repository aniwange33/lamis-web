import {__decorate, __param, __metadata, __spread} from 'tslib';
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

var moment = moment_;
var PharmacyService = /** @class */ (function () {
    function PharmacyService(http, serverUrl) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.resourceUrl = '';
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/pharmacies';
    }

    PharmacyService.prototype.create = function (pharmacy) {
        var _this = this;
        var copy = this.convertDateFromClient(pharmacy);
        return this.http
            .post(this.resourceUrl, copy, {observe: 'response'})
            .pipe(map(function (res) {
                return _this.convertDateFromServer(res);
            }));
    };
    PharmacyService.prototype.update = function (pharmacy) {
        var _this = this;
        var copy = this.convertDateFromClient(pharmacy);
        return this.http
            .put(this.resourceUrl, copy, {observe: 'response'})
            .pipe(map(function (res) {
                return _this.convertDateFromServer(res);
            }));
    };
    PharmacyService.prototype.find = function (id) {
        var _this = this;
        return this.http
            .get(this.resourceUrl + "/" + id, {observe: 'response'})
            .pipe(map(function (res) {
                return _this.convertDateFromServer(res);
            }));
    };
    PharmacyService.prototype.findByUuid = function (id) {
        var _this = this;
        return this.http
            .get(this.resourceUrl + "/by-uuid/" + id, {observe: 'response'})
            .pipe(map(function (res) {
                return _this.convertDateFromServer(res);
            }));
    };
    PharmacyService.prototype.delete = function (id) {
        return this.http.delete(this.resourceUrl + "/" + id, {observe: 'response'});
    };
    PharmacyService.prototype.getPatient = function (id) {
        return this.http.get("/api/patients/by-uuid/" + id, {observe: 'body'})
            .pipe(map(function (res) {
                if (res) {
                    res.dateRegistration = res.dateRegistration != null ? moment(res.dateRegistration) : null;
                }
                return res;
            }));
    };
    PharmacyService.prototype.getVisitDatesByPatient = function (patientId) {
        return this.http.get(this.resourceUrl + "/patient/" + patientId + "/visit-dates")
            .pipe(map(function (res) {
                res.forEach(function (d) {
                    return moment(d);
                });
                return res;
            }));
    };
    PharmacyService.prototype.regimenTypes = function () {
        return this.http.get(this.resourceUrl + "/regimen-types");
    };
    PharmacyService.prototype.regimenInfo = function (patientId) {
        return this.http.get(this.resourceUrl + "/regimen-info/patient/" + patientId);
    };
    PharmacyService.prototype.adrs = function () {
        return this.http.get(this.resourceUrl + "/adrs");
    };
    PharmacyService.prototype.getLinesByPharmacy = function (pharmacyId) {
        return this.http.get(this.resourceUrl + "/" + pharmacyId + "/lines");
    };
    PharmacyService.prototype.regimesByRegimenType = function (id) {
        return this.http.get(this.resourceUrl + "/regimens/regimen-type/" + id);
    };
    PharmacyService.prototype.getDrugsByRegimen = function (id) {
        return this.http.get(this.resourceUrl + "/drugs/regimen/" + id);
    };
    PharmacyService.prototype.getRegimenById = function (id) {
        return this.http.get(this.resourceUrl + "/regimen/" + id);
    };
    PharmacyService.prototype.latestVisit = function (patientId) {
        return this.http.get(this.resourceUrl + "/patient/" + patientId + "/latest");
    };
    PharmacyService.prototype.getDevolvement = function (patientId, date) {
        var d = date.format(DATE_FORMAT);
        return this.http.get(this.resourceUrl + "/patient/" + patientId + "/devolvement/at/" + d)
            .pipe(map(function (res) {
                res.dateDevolved = res.dateDevolved != null ? moment(res.dateDevolved) : null;
                res.dateReturnedToFacility = res.dateReturnedToFacility != null ? moment(res.dateReturnedToFacility) : null;
                res.dateNextClinic = res.dateNextClinic != null ? moment(res.dateNextClinic) : null;
                res.dateNextRefill = res.dateNextRefill != null ? moment(res.dateNextRefill) : null;
                return res;
            }));
    };
    PharmacyService.prototype.convertDateFromClient = function (pharmacy) {
        var copy = Object.assign({}, pharmacy, {
            dateVisit: pharmacy.dateVisit != null && pharmacy.dateVisit.isValid() ? pharmacy.dateVisit.format(DATE_FORMAT) : null,
            nextAppointment: pharmacy.nextAppointment != null && pharmacy.nextAppointment.isValid() ? pharmacy.nextAppointment.format(DATE_FORMAT) : null
        });
        return copy;
    };
    PharmacyService.prototype.convertDateFromServer = function (res) {
        if (res.body) {
            res.body.nextAppointment = res.body.nextAppointment != null ? moment(res.body.nextAppointment) : null;
            res.body.dateVisit = res.body.dateVisit != null ? moment(res.body.dateVisit) : null;
        }
        return res;
    };
    PharmacyService.prototype.convertDateArrayFromServer = function (res) {
        if (res.body) {
            res.body.forEach(function (pharmacy) {
                pharmacy.dateVisit = pharmacy.dateVisit != null ? moment(pharmacy.dateVisit) : null;
                pharmacy.nextAppointment = pharmacy.nextAppointment != null ? moment(pharmacy.nextAppointment) : null;
                1;
            });
        }
        return res;
    };
    PharmacyService.ctorParameters = function () {
        return [
            {type: HttpClient},
            {type: undefined, decorators: [{type: Inject, args: [SERVER_API_URL_CONFIG,]}]}
        ];
    };
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
    return PharmacyService;
}());

var PharmacyDetailsComponent = /** @class */ (function () {
    function PharmacyDetailsComponent(router, route, pharmacyService, _dialogService, notificationService) {
        this.router = router;
        this.route = route;
        this.pharmacyService = pharmacyService;
        this._dialogService = _dialogService;
        this.notificationService = notificationService;
        this.properties = [];
    }

    PharmacyDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (_a) {
            var entity = _a.entity;
            _this.entity = !!entity && entity.body ? entity.body : entity;
            var patientId = _this.route.snapshot.paramMap.get('patientId');
            _this.pharmacyService.getPatient(patientId).subscribe(function (res) {
                return _this.entity.patient = res;
            });
            _this.buildProperties();
        });
    };
    PharmacyDetailsComponent.prototype.edit = function () {
        this.router.navigate(['/', 'pharmacies', this.entity.uuid, 'patient', this.entity.patient.id, 'edit']);
    };
    PharmacyDetailsComponent.prototype.delete = function () {
        var _this = this;
        this._dialogService.openConfirm({
            title: 'Confirm',
            message: 'Do you want to delete this pharmacy refill, action cannot be reversed?',
            cancelButton: 'No',
            acceptButton: 'Yes',
            width: '500px',
        }).afterClosed().subscribe(function (accept) {
            if (accept) {
                _this.pharmacyService.delete(_this.entity.id).subscribe(function (res) {
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
    PharmacyDetailsComponent.prototype.buildProperties = function () {
        var _this = this;
        this.properties.push(new CardViewDateItemModel({
            key: 'ds',
            value: this.entity.dateVisit,
            label: 'Date of Dispensing',
            format: 'dd MMM, yyyy'
        }));
        this.pharmacyService.getLinesByPharmacy(this.entity.id)
            .subscribe(function (res) {
                _this.dataSource = res;
                _this.properties.push(new CardViewIntItemModel({
                    label: 'Refill Period (days)',
                    key: 'cs',
                    value: res.map(function (r) {
                        return r.duration;
                    })
                        .sort(function (r1, r2) {
                            return r1 - r2;
                        })
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
            .subscribe(function (res) {
                _this.properties.push(new CardViewTextItemModel({
                    label: 'Regimen Line',
                    key: 'cs',
                    value: res.regimenType
                }));
                _this.properties.push(new CardViewTextItemModel({
                    label: 'Regimen',
                    key: 'ts',
                    value: res.regimen
                }));
            });
    };
    PharmacyDetailsComponent.prototype.previousState = function () {
        window.history.back();
    };
    PharmacyDetailsComponent.prototype.ngOnDestroy = function () {
    };
    PharmacyDetailsComponent.ctorParameters = function () {
        return [
            {type: Router},
            {type: ActivatedRoute},
            {type: PharmacyService},
            {type: TdDialogService},
            {type: NotificationService}
        ];
    };
    PharmacyDetailsComponent = __decorate([
        Component({
            selector: 'lamis-pharmacy',
            template: "<div class=\"lamis-edit-form\">\r\n    <div class=\"lamis-edit-form-container\">\r\n        <mat-card>\r\n            <mat-card-header>\r\n            </mat-card-header>\r\n            <mat-card-content>\r\n                <adf-card-view [properties]=\"properties\" editable=\"false\"></adf-card-view>\r\n                <mat-divider></mat-divider>\r\n                <adf-datatable *ngIf=\"dataSource\"\r\n                               [rows]=\"dataSource\">\r\n                    <data-columns>\r\n                        <data-column key=\"description\" title=\"Description\" sortable=\"true\"></data-column>\r\n                        <data-column key=\"morning\" title=\"Morning\" sortable=\"false\"></data-column>\r\n                        <data-column key=\"afternoon\" title=\"Afternoon\" sortable=\"false\"></data-column>\r\n                        <data-column key=\"evening\" title=\"Evening\" sortable=\"false\"></data-column>\r\n                        <data-column key=\"duration\" title=\"Duration\" sortable=\"false\"></data-column>\r\n                    </data-columns>\r\n                </adf-datatable>\r\n            </mat-card-content>\r\n            <mat-card-actions class=\"lamis-edit-form-actions\">\r\n                <button mat-button (click)=\"previousState()\">Back</button>\r\n                <button mat-raised-button color=\"warn\" (click)=\"delete()\">Delete</button>\r\n                <button mat-raised-button color=\"primary\" (click)=\"edit()\">Edit</button>\r\n            </mat-card-actions>\r\n        </mat-card>\r\n    </div>\r\n</div>\r\n"
        }),
        __metadata("design:paramtypes", [Router, ActivatedRoute, PharmacyService,
            TdDialogService,
            NotificationService])
    ], PharmacyDetailsComponent);
    return PharmacyDetailsComponent;
}());

var moment$1 = moment_;
var PharmacyEditComponent = /** @class */ (function () {
    function PharmacyEditComponent(pharmacyService, notification, appLoaderService, activatedRoute) {
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

    PharmacyEditComponent.prototype.createEntity = function () {
        return {};
    };
    PharmacyEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isSaving = false;
        this.activatedRoute.data.subscribe(function (_a) {
            var entity = _a.entity;
            _this.entity = !!entity && entity.body ? entity.body : entity;
            if (_this.entity === undefined) {
                _this.entity = _this.createEntity();
            }
            var patientId = _this.activatedRoute.snapshot.paramMap.get('patientId');
            _this.pharmacyService.getPatient(patientId).subscribe(function (res) {
                _this.entity.patient = res;
                _this.patient = res;
                _this.dateRegistration = res.dateRegistration;
                _this.entity.facility = res.facility;
                _this.minNextAppointment = _this.dateRegistration.clone().add(15, 'days');
                _this.pharmacyService.getVisitDatesByPatient(res.id).subscribe(function (res) {
                    _this.visitDates = res;
                });
            });
            if (_this.entity.id) {
                _this.pharmacyService.getLinesByPharmacy(_this.entity.id)
                    .subscribe(function (res) {
                        _this.rows = res.map(function (r) {
                            r.quantity = (r.morning + r.afternoon + r.evening) * r.duration;
                            _this.pharmacyService.getRegimenById(r.regimen.id).subscribe(function (res) {
                                if (!_this.regimens.map(function (r) {
                                    return r.id;
                                }).includes(r.regimen.id)) {
                                    _this.regimens.push(res);
                                    _this.selectedRegimens.push(res);
                                    _this.regimens = __spread(_this.regimens);
                                    _this.selectedRegimens = __spread(_this.selectedRegimens);
                                }
                            });
                            return r;
                        });
                        _this.entity.duration = res.map(function (r) {
                            return r.duration;
                        })
                            .sort(function (r1, r2) {
                                return r1 - r2;
                            })
                            .pop();
                    });
                _this.pharmacyService.getDevolvement(_this.entity.patient.id, _this.entity.dateVisit).subscribe(function (res) {
                    _this.devolve = res;
                    _this.updateDmocType();
                });
            }
            _this.pharmacyService.regimenTypes().subscribe(function (res) {
                return _this.regimenTypes = res;
            });
        });
    };
    PharmacyEditComponent.prototype.dateVisitChanged = function (date) {
        var _this = this;
        this.entity.nextAppointment = this.suggestedNextAppointment();
        this.minNextAppointment = this.entity.nextAppointment.clone().subtract(7, 'days');
        this.maxNextVisit = this.entity.nextAppointment.clone().add(180, 'days');
        this.pharmacyService.getDevolvement(this.entity.patient.id, this.entity.dateVisit).subscribe(function (res) {
            _this.devolve = res;
            _this.updateDmocType();
        });
    };
    PharmacyEditComponent.prototype.suggestedNextAppointment = function () {
        if (this.entity.dateVisit) {
            var nextAppointment = this.entity.dateVisit.clone().add(this.entity.duration - 2 || 13, 'days');
            var weekday = nextAppointment.isoWeekday();
            if (weekday === 6) {
                nextAppointment = nextAppointment.clone().add(2, 'days');
            } else if (weekday === 7) {
                nextAppointment = nextAppointment.clone().add(1, 'days');
            }
            return nextAppointment;
        }
        return null;
    };
    PharmacyEditComponent.prototype.updateDmocType = function () {
        var type = 'MMD';
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
    };
    PharmacyEditComponent.prototype.filterDates = function (date) {
        var exists = false;
        this.visitDates.forEach(function (d) {
            if (date.diff(d, 'days') === 0) {
                exists = true;
            }
        });
        return (this.entity.id && date.diff(this.entity.dateVisit, 'days') === 0) || !exists;
    };
    PharmacyEditComponent.prototype.previousState = function () {
        window.history.back();
    };
    PharmacyEditComponent.prototype.entityCompare = function (e1, e2) {
        return entityCompare(e1, e2);
    };
    PharmacyEditComponent.prototype.save = function () {
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
    };
    PharmacyEditComponent.prototype.regimenTypeChange = function (type) {
        var _this = this;
        this.pharmacyService.regimesByRegimenType(type.id).subscribe(function (res) {
            res.forEach(function (regimen) {
                if (!_this.regimens.map(function (r) {
                    return r.id;
                }).includes(regimen.id)) {
                    _this.regimens.push(regimen);
                    _this.regimens = __spread(_this.regimens);
                }
            });
        });
    };
    PharmacyEditComponent.prototype.durationChanged = function (duration) {
        this.rows = this.rows.map(function (r) {
            r.duration = duration;
            r.quantity = (r.morning + r.afternoon + r.evening) * duration;
            return r;
        });
        this.rows = __spread(this.rows);
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
    };
    PharmacyEditComponent.prototype.regimenChange = function (event) {
        var _this = this;
        this.selectedRegimens.forEach(function (regimen) {
            _this.pharmacyService.getDrugsByRegimen(regimen.id).subscribe(function (res) {
                res.forEach(function (drug) {
                    console.log('Drug', drug, _this.rows);
                    if (!_this.rows.map(function (r) {
                        return r.drug.id;
                    }).includes(drug.drug.id)) {
                        _this.rows.push({
                            drug: drug.drug,
                            description: drug.drug.name,
                            morning: drug.drug.morning,
                            afternoon: drug.drug.afternoon,
                            evening: drug.drug.evening,
                            regimen: regimen,
                            duration: _this.entity.duration,
                            quantity: _this.entity.duration * (drug.drug.morning + drug.drug.afternoon + drug.drug.evening),
                            regimenType: regimen.regimenType,
                            regimenDrug: drug.regimenDrug
                        });
                        _this.rows = __spread(_this.rows);
                        //this.drugs.push(drug.drug);
                    }
                    _this.rows = _this.rows.filter(function (row) {
                        return _this.selectedRegimens.map(function (regimen) {
                            return regimen.id;
                        }).includes(row.regimen.id);
                    });
                    _this.drugs.forEach(function (drug) {
                        if (!_this.rows.map(function (r) {
                            return r.drug.id;
                        }).includes(drug.id)) {
                            _this.drugs = _this.drugs.filter(function (d) {
                                return d.id !== drug.id;
                            });
                        }
                    });
                });
            });
        });
    };
    PharmacyEditComponent.prototype.updateValue = function (event, cell, rowIndex) {
        this.editing[rowIndex + '-' + cell] = false;
        this.rows[rowIndex][cell] = event.target.value;
        if (this.entity.duration) {
            var total = parseInt(this.rows[rowIndex]['morning'] + '' || '0') + parseInt(this.rows[rowIndex]['afternoon'] + '' || '0') +
                parseInt(this.rows[rowIndex]['evening'] + '' || '0');
            this.rows[rowIndex]['quantity'] = (total * this.entity.duration);
        }
        this.rows = __spread(this.rows);
    };
    PharmacyEditComponent.prototype.subscribeToSaveResponse = function (result) {
        var _this = this;
        result.subscribe(function (res) {
            return _this.onSaveSuccess(res.body);
        }, function (res) {
            _this.appLoaderService.close();
            _this.onSaveError();
            _this.onError(res.message);
        });
    };
    PharmacyEditComponent.prototype.onSaveSuccess = function (result) {
        this.appLoaderService.close();
        this.isSaving = false;
        this.notification.showInfo('Pharmacy visit successfully saved');
        this.previousState();
    };
    PharmacyEditComponent.prototype.onSaveError = function () {
        this.isSaving = false;
        this.error = true;
        this.notification.showError('Error saving pharmacy visit');
    };
    PharmacyEditComponent.prototype.onError = function (errorMessage) {
        this.isSaving = false;
        this.notification.showError(errorMessage);
    };
    PharmacyEditComponent.ctorParameters = function () {
        return [
            {type: PharmacyService},
            {type: NotificationService},
            {type: AppLoaderService},
            {type: ActivatedRoute}
        ];
    };
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
    return PharmacyEditComponent;
}());

var PharmacyResolve = /** @class */ (function () {
    function PharmacyResolve(service) {
        this.service = service;
    }

    PharmacyResolve.prototype.resolve = function (route, state) {
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
    PharmacyResolve.ctorParameters = function () {
        return [
            {type: PharmacyService}
        ];
    };
    PharmacyResolve = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [PharmacyService])
    ], PharmacyResolve);
    return PharmacyResolve;
}());
var ɵ0 = {
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
var ROUTES = [
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

var PharmacyWidget = /** @class */ (function () {
    function PharmacyWidget(pharmacyService) {
        this.pharmacyService = pharmacyService;
        this.properties = [];
    }

    PharmacyWidget.prototype.ngOnInit = function () {
        var _this = this;
        this.pharmacyService.latestVisit(this.patientId).subscribe(function (res) {
            _this.pharmacy = res;
            _this.buildProperties();
        });
    };
    PharmacyWidget.prototype.buildProperties = function () {
        var _this = this;
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
            .subscribe(function (res) {
                _this.properties.push(new CardViewTextItemModel({
                    label: 'Regimen Line',
                    key: 'cs',
                    value: res.regimenType
                }));
                _this.properties.push(new CardViewTextItemModel({
                    label: 'Regimen',
                    key: 'ts',
                    value: res.regimen
                }));
            });
    };
    PharmacyWidget.ctorParameters = function () {
        return [
            {type: PharmacyService}
        ];
    };
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
    return PharmacyWidget;
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

var PharmacyWidgetModule = /** @class */ (function () {
    function PharmacyWidgetModule() {
    }

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
    return PharmacyWidgetModule;
}());

var PharmacyModule = /** @class */ (function () {
    function PharmacyModule() {
    }

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
    return PharmacyModule;
}());

var moment$2 = moment_;
var DevolveService = /** @class */ (function () {
    function DevolveService(http, serverUrl) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.resourceUrl = '';
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/devolves';
    }

    DevolveService.prototype.create = function (devolve) {
        var _this = this;
        var copy = this.convertDateFromClient(devolve);
        return this.http
            .post(this.resourceUrl, copy, {observe: 'response'})
            .pipe(map(function (res) {
                return _this.convertDateFromServer(res);
            }));
    };
    DevolveService.prototype.update = function (devolve) {
        var _this = this;
        var copy = this.convertDateFromClient(devolve);
        return this.http
            .put(this.resourceUrl, copy, {observe: 'response'})
            .pipe(map(function (res) {
                return _this.convertDateFromServer(res);
            }));
    };
    DevolveService.prototype.find = function (id) {
        var _this = this;
        return this.http
            .get(this.resourceUrl + "/" + id, {observe: 'response'})
            .pipe(map(function (res) {
                return _this.convertDateFromServer(res);
            }));
    };
    DevolveService.prototype.findByUuid = function (id) {
        var _this = this;
        return this.http
            .get(this.resourceUrl + "/by-uuid/" + id, {observe: 'response'})
            .pipe(map(function (res) {
                return _this.convertDateFromServer(res);
            }));
    };
    DevolveService.prototype.delete = function (id) {
        return this.http.delete(this.resourceUrl + "/" + id, {observe: 'response'});
    };
    DevolveService.prototype.getDevolveDatesByPatient = function (patientId) {
        return this.http.get(this.resourceUrl + "/patient/" + patientId + "/visit-dates")
            .pipe(map(function (res) {
                res.forEach(function (d) {
                    return moment$2(d);
                });
                return res;
            }));
    };
    DevolveService.prototype.getStates = function () {
        return this.http.get('/api/states');
    };
    DevolveService.prototype.getLgasByState = function (id) {
        return this.http.get("/api/provinces/state/" + id);
    };
    DevolveService.prototype.getCommunityPharmaciesByLga = function (id) {
        return this.http.get(this.resourceUrl + "/community-pharmacies/lga/" + id);
    };
    DevolveService.prototype.getRelatedPharmacy = function (devolveId, patientId, date) {
        var d = date.format(DATE_FORMAT);
        return this.http.get(this.resourceUrl + "/" + devolveId + "/patient/" + patientId + "/related-pharmacy/at/" + d)
            .pipe(map(function (res) {
                if (res.dateVisit) {
                    res.dateVisit = moment$2(res.dateVisit).format('DD MMM, YYYY');
                }
                return res;
            }));
    };
    DevolveService.prototype.getRelatedClinic = function (devolveId, patientId, date) {
        var d = date.format(DATE_FORMAT);
        return this.http.get(this.resourceUrl + "/" + devolveId + "/patient/" + patientId + "/related-clinic/at/" + d)
            .pipe(map(function (res) {
                if (res.dateVisit) {
                    res.dateVisit = moment$2(res.dateVisit).format('DD MMM, YYYY');
                }
                return res;
            }));
    };
    DevolveService.prototype.getRelatedViralLoad = function (devolveId, patientId, date) {
        var d = date.format(DATE_FORMAT);
        return this.http.get(this.resourceUrl + "/" + devolveId + "/patient/" + patientId + "/related-viral-load/at/" + d)
            .pipe(map(function (res) {
                if (res.dateResultReceived) {
                    res.dateResultReceived = moment$2(res.dateResultReceived).format('DD MMM, YYYY');
                }
                return res;
            }));
    };
    DevolveService.prototype.getRelatedCD4 = function (devolveId, patientId, date) {
        var d = date.format(DATE_FORMAT);
        return this.http.get(this.resourceUrl + "/" + devolveId + "/patient/" + patientId + "/related-cd4/at/" + d)
            .pipe(map(function (res) {
                if (res.dateResultReceived) {
                    res.dateResultReceived = moment$2(res.dateResultReceived).format('DD MMM, YYYY');
                }
                return res;
            }));
    };
    DevolveService.prototype.getStateByLga = function (id) {
        return this.http.get("/api/provinces/" + id + "/state");
    };
    DevolveService.prototype.convertDateFromClient = function (devolve) {
        var copy = Object.assign({}, devolve, {
            dateDevolved: devolve.dateDevolved != null && devolve.dateDevolved.isValid() ? devolve.dateDevolved.format(DATE_FORMAT) : null,
            dateNextClinic: devolve.dateNextClinic != null && devolve.dateNextClinic.isValid() ? devolve.dateNextClinic.format(DATE_FORMAT) : null,
            dateNextRefill: devolve.dateNextRefill != null && devolve.dateNextRefill.isValid() ? devolve.dateNextRefill.format(DATE_FORMAT) : null,
            dateDiscontinued: devolve.dateDiscontinued != null && devolve.dateDiscontinued.isValid() ? devolve.dateDiscontinued.format(DATE_FORMAT) : null,
            dateReturnedToFacility: devolve.dateReturnedToFacility != null && devolve.dateReturnedToFacility.isValid() ? devolve.dateReturnedToFacility.format(DATE_FORMAT) : null
        });
        return copy;
    };
    DevolveService.prototype.convertDateFromServer = function (res) {
        if (res.body) {
            res.body.dateReturnedToFacility = res.body.dateReturnedToFacility != null ? moment$2(res.body.dateReturnedToFacility) : null;
            res.body.dateNextRefill = res.body.dateNextRefill != null ? moment$2(res.body.dateNextRefill) : null;
            res.body.dateNextClinic = res.body.dateNextClinic != null ? moment$2(res.body.dateNextClinic) : null;
            res.body.dateDevolved = res.body.dateDevolved != null ? moment$2(res.body.dateDevolved) : null;
            res.body.dateDiscontinued = res.body.dateDiscontinued != null ? moment$2(res.body.dateDiscontinued) : null;
        }
        return res;
    };
    DevolveService.ctorParameters = function () {
        return [
            {type: HttpClient},
            {type: undefined, decorators: [{type: Inject, args: [SERVER_API_URL_CONFIG,]}]}
        ];
    };
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
    return DevolveService;
}());

var DevolveDetailsComponent = /** @class */ (function () {
    function DevolveDetailsComponent(router, route, devolveService, _dialogService, notificationService) {
        this.router = router;
        this.route = route;
        this.devolveService = devolveService;
        this._dialogService = _dialogService;
        this.notificationService = notificationService;
        this.properties = [];
    }

    DevolveDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (_a) {
            var entity = _a.entity;
            _this.entity = !!entity && entity.body ? entity.body : entity;
            _this.buildProperties();
        });
    };
    DevolveDetailsComponent.prototype.edit = function () {
        this.router.navigate(['/', 'devolves', this.entity.uuid, 'patient', this.entity.patient.uuid, 'edit']);
    };
    DevolveDetailsComponent.prototype.delete = function () {
        var _this = this;
        this._dialogService.openConfirm({
            title: 'Confirm',
            message: 'Do you want to delete this client devolve, action cannot be reversed?',
            cancelButton: 'No',
            acceptButton: 'Yes',
            width: '500px',
        }).afterClosed().subscribe(function (accept) {
            if (accept) {
                _this.devolveService.delete(_this.entity.id).subscribe(function (res) {
                    if (res.ok) {
                        _this.router.navigate(['patients']);
                    } else {
                        _this.notificationService.showError('Error deleting devolve, please try again');
                    }
                });
            } else {
                // DO SOMETHING ELSE
            }
        });
    };
    DevolveDetailsComponent.prototype.buildProperties = function () {
        var _this = this;
        this.properties.push(new CardViewDateItemModel({
            key: 'ds',
            value: this.entity.dateDevolved,
            label: 'Date of Devolvement',
            format: 'dd MMM, yyyy'
        }));
        var type = 'MMD';
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
        this.devolveService.getRelatedClinic(this.entity.id, this.entity.patient.id, this.entity.dateDevolved).subscribe(function (res) {
            _this.relatedClinic = res;
            console.log('Related clinic', res);
            if (_this.relatedClinic.dateVisit) {
                _this.properties.push(new CardViewTextItemModel({
                    key: 'ds',
                    value: _this.relatedClinic.dateVisit,
                    label: 'Date of Clinical Stage'
                }));
                _this.properties.push(new CardViewTextItemModel({
                    key: 'ds',
                    value: _this.relatedClinic && _this.relatedClinic.clinicStage,
                    label: 'Current Clinical Stage',
                }));
            }
        });
        this.devolveService.getRelatedPharmacy(this.entity.id, this.entity.patient.id, this.entity.dateDevolved).subscribe(function (res) {
            _this.relatedPharmacy = res;
            if (_this.relatedPharmacy.dateVisit) {
                _this.properties.push(new CardViewTextItemModel({
                    key: 'ds',
                    value: _this.relatedPharmacy.dateVisit,
                    label: 'Date of Current ARV Regimen'
                }));
                _this.properties.push(new CardViewTextItemModel({
                    key: 'ds',
                    value: _this.relatedPharmacy && _this.relatedPharmacy.regimen,
                    label: 'Current ARV Regimen',
                }));
            }
        });
        this.devolveService.getRelatedViralLoad(this.entity.id, this.entity.patient.id, this.entity.dateDevolved).subscribe(function (res) {
            _this.relatedViralLoad = res;
            if (_this.relatedViralLoad.dateResultReceived) {
                _this.properties.push(new CardViewTextItemModel({
                    key: 'ds',
                    value: _this.relatedViralLoad.dateResultReceived,
                    label: 'Date of Viral Load'
                }));
                _this.properties.push(new CardViewTextItemModel({
                    key: 'ds',
                    value: _this.relatedViralLoad && _this.relatedViralLoad.value,
                    label: 'Current Viral Load',
                }));
            }
        });
        this.devolveService.getRelatedCD4(this.entity.id, this.entity.patient.id, this.entity.dateDevolved).subscribe(function (res) {
            _this.relatedCD4 = res;
            if (_this.relatedCD4.dateResultReceived) {
                _this.properties.push(new CardViewTextItemModel({
                    key: 'ds',
                    value: _this.relatedCD4.dateResultReceived,
                    label: 'Date of CD4'
                }));
                _this.properties.push(new CardViewTextItemModel({
                    key: 'ds',
                    value: _this.relatedCD4 && _this.relatedCD4.value,
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
    };
    DevolveDetailsComponent.prototype.previousState = function () {
        window.history.back();
    };
    DevolveDetailsComponent.ctorParameters = function () {
        return [
            {type: Router},
            {type: ActivatedRoute},
            {type: DevolveService},
            {type: TdDialogService},
            {type: NotificationService}
        ];
    };
    DevolveDetailsComponent = __decorate([
        Component({
            selector: 'devolve-details',
            template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <mat-card>\n            <mat-card-header>\n            </mat-card-header>\n            <mat-card-content>\n                <adf-card-view [properties]=\"properties\" editable=\"false\"></adf-card-view>\n                <mat-divider></mat-divider>\n            </mat-card-content>\n            <mat-card-actions class=\"lamis-edit-form-actions\">\n                <button mat-button (click)=\"previousState()\">Back</button>\n                <button mat-raised-button color=\"warn\" (click)=\"delete()\">Delete</button>\n                <button mat-raised-button color=\"primary\" (click)=\"edit()\">Edit</button>\n            </mat-card-actions>\n        </mat-card>\n    </div>\n</div>\n"
        }),
        __metadata("design:paramtypes", [Router, ActivatedRoute, DevolveService,
            TdDialogService,
            NotificationService])
    ], DevolveDetailsComponent);
    return DevolveDetailsComponent;
}());

var moment$3 = moment_;
var DevolveEditComponent = /** @class */ (function () {
    function DevolveEditComponent(pharmacyService, devolveService, notification, appLoaderService, activatedRoute) {
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

    DevolveEditComponent.prototype.createEntity = function () {
        return {};
    };
    DevolveEditComponent.prototype.ngOnInit = function () {
        var _this = this;
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
        this.activatedRoute.data.subscribe(function (_a) {
            var entity = _a.entity;
            _this.entity = !!entity && entity.body ? entity.body : entity;
            if (_this.entity === undefined) {
                _this.entity = _this.createEntity();
            }
            var patientId = _this.activatedRoute.snapshot.paramMap.get('patientId');
            _this.pharmacyService.getPatient(patientId).subscribe(function (res) {
                _this.entity.patient = res;
                _this.patient = res;
                _this.dateRegistration = res.dateRegistration;
                _this.entity.facility = res.facility;
                _this.minNextAppointment = _this.dateRegistration.add(15, 'days');
                /*this.devolveService.getDevolveDatesByPatient(res.id).subscribe((res) => {
                    this.devolveDates = res;
                });*/
                _this.updateRelated();
            });
            if (_this.entity.id) {
                var dmoc = _this.entity.dmocType;
                if (dmoc === 'MMD') {
                    _this.dmocTypes.push({
                        name: 'MMD',
                        value: 'MMD'
                    });
                } else if (dmoc === 'MMS') {
                    _this.dmocTypes.push({
                        name: 'MMS',
                        value: 'MMS'
                    });
                }
                if (_this.entity.communityPharmacy) {
                    _this.enableCommunityPharmacy = true;
                    _this.devolveService.getStateByLga(_this.entity.communityPharmacy.lga.id).subscribe(function (res) {
                        _this.state = res;
                        _this.lga = _this.entity.communityPharmacy.lga;
                        _this.lgaChanged(_this.lga.id);
                        _this.stateChanged(_this.state.id);
                    });
                }
                if (_this.entity.dateDiscontinued) {
                    _this.minDate = _this.entity.dateDiscontinued.clone().add(2, 'day');
                } else {
                    _this.minDiscontinued = _this.entity.dateDevolved.clone().add(1, 'day');
                    _this.minDate = _this.entity.dateDevolved.clone().add(2, 'day');
                }
            }
            _this.devolveService.getStates().subscribe(function (res) {
                return _this.states = res;
            });
        });
    };
    DevolveEditComponent.prototype.dateDiscontinuedChanged = function () {
        if (this.entity.dateDiscontinued) {
            this.minDate = this.entity.dateDiscontinued.clone().add(1, 'day');
        }
    };
    DevolveEditComponent.prototype.filterDates = function (date) {
        var exists = false;
        this.devolveDates.forEach(function (d) {
            if (date.diff(d, 'days') === 0) {
                exists = true;
            }
        });
        return (this.entity.id && date.diff(this.entity.dateDevolved, 'days') === 0) || !exists;
    };
    DevolveEditComponent.prototype.stateChanged = function (id) {
        var _this = this;
        this.devolveService.getLgasByState(id).subscribe(function (res) {
            return _this.lgas = res;
        });
    };
    DevolveEditComponent.prototype.lgaChanged = function (id) {
        var _this = this;
        this.devolveService.getCommunityPharmaciesByLga(id).subscribe(function (res) {
            return _this.communityPharmacies = res;
        });
    };
    DevolveEditComponent.prototype.communityPharmacyChanged = function (communityPharmacy) {
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
    };
    DevolveEditComponent.prototype.dmocChanged = function (dmocType) {
        this.enableCommunityPharmacy = dmocType === 'CPARP';
    };
    DevolveEditComponent.prototype.dateDevolvedChanged = function (date) {
        this.minNextAppointment = date.clone().add(7, 'days');
        this.maxNextVisit = date.clone().add(3, 'months');
        console.log('Dates', this.minNextAppointment, this.maxNextVisit);
        this.updateRelated();
    };
    DevolveEditComponent.prototype.updateRelated = function () {
        var _this = this;
        this.entity.relatedViralLoad = null;
        this.entity.relatedClinic = null;
        this.entity.relatedCd4 = null;
        this.entity.relatedPharmacy = null;
        if (this.entity.dateDevolved) {
            this.devolveService.getRelatedClinic(this.entity.id || 0, this.patient.id, this.entity.dateDevolved).subscribe(function (res) {
                _this.relatedClinic = res;
                _this.entity.relatedClinic = {id: res.id};
            });
            this.devolveService.getRelatedPharmacy(this.entity.id || 0, this.patient.id, this.entity.dateDevolved).subscribe(function (res) {
                _this.relatedPharmacy = res;
                _this.entity.relatedPharmacy = {id: res.id};
            });
            this.devolveService.getRelatedCD4(this.entity.id || 0, this.patient.id, this.entity.dateDevolved).subscribe(function (res) {
                _this.relatedCD4 = res;
                _this.entity.relatedCd4 = {id: res.id};
            });
            this.devolveService.getRelatedViralLoad(this.entity.id || 0, this.patient.id, this.entity.dateDevolved).subscribe(function (res) {
                _this.relatedViralLoad = res;
                _this.entity.relatedViralLoad = {id: res.id};
            });
        }
    };
    DevolveEditComponent.prototype.entityCompare = function (e1, e2) {
        return entityCompare(e1, e2);
    };
    DevolveEditComponent.prototype.previousState = function () {
        window.history.back();
    };
    DevolveEditComponent.prototype.save = function () {
        //this.progressBar.mode = 'indeterminate';
        this.appLoaderService.open('Saving visit...');
        this.isSaving = true;
        if (this.entity.id !== undefined) {
            this.subscribeToSaveResponse(this.devolveService.update(this.entity));
        } else {
            this.subscribeToSaveResponse(this.devolveService.create(this.entity));
        }
    };
    DevolveEditComponent.prototype.subscribeToSaveResponse = function (result) {
        var _this = this;
        result.subscribe(function (res) {
            return _this.onSaveSuccess(res.body);
        }, function (res) {
            _this.appLoaderService.close();
            _this.onSaveError();
            _this.onError(res.message);
        });
    };
    DevolveEditComponent.prototype.onSaveSuccess = function (result) {
        this.appLoaderService.close();
        this.isSaving = false;
        this.notification.showInfo('Devolve successfully saved');
        this.previousState();
    };
    DevolveEditComponent.prototype.onSaveError = function () {
        this.isSaving = false;
        this.error = true;
        this.notification.showError('Error saving devolve');
    };
    DevolveEditComponent.prototype.onError = function (errorMessage) {
        this.isSaving = false;
        this.notification.showError(errorMessage);
    };
    DevolveEditComponent.ctorParameters = function () {
        return [
            {type: PharmacyService},
            {type: DevolveService},
            {type: NotificationService},
            {type: AppLoaderService},
            {type: ActivatedRoute}
        ];
    };
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
    return DevolveEditComponent;
}());

var moment$4 = moment_;
var EndDevolveComponent = /** @class */ (function () {
    function EndDevolveComponent(pharmacyService, devolveService, notification, appLoaderService, activatedRoute) {
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

    EndDevolveComponent.prototype.ngOnInit = function () {
        var _this = this;
        var patientId = this.activatedRoute.snapshot.paramMap.get('patientId');
        this.pharmacyService.getPatient(patientId).subscribe(function (res) {
            _this.pharmacyService.getDevolvement(res.id, moment$4()).subscribe(function (r) {
                _this.entity = r;
                if (_this.entity.dateDiscontinued) {
                    _this.minDate = r.dateDiscontinued.clone().add(2, 'day');
                } else {
                    _this.minDiscontinued = r.dateDevolved.clone().add(1, 'day');
                    _this.minDate = r.dateDevolved.clone().add(2, 'day');
                }
                var type = 'MMD';
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
                _this.dmocType = type;
            });
        });
        this.activatedRoute.data.subscribe(function (_a) {
            var entity = _a.entity;
            _this.entity = !!entity && entity.body ? entity.body : entity;
        });
    };
    EndDevolveComponent.prototype.dateDiscontinuedChanged = function () {
        if (this.entity.dateDiscontinued) {
            this.minDate = this.entity.dateDiscontinued.clone().add(1, 'day');
        }
    };
    EndDevolveComponent.prototype.previousState = function () {
        window.history.back();
    };
    EndDevolveComponent.prototype.save = function () {
        this.appLoaderService.open('Saving visit...');
        this.isSaving = true;
        if (this.entity.id !== undefined) {
            this.subscribeToSaveResponse(this.devolveService.update(this.entity));
        } else {
            this.subscribeToSaveResponse(this.devolveService.create(this.entity));
        }
    };
    EndDevolveComponent.prototype.subscribeToSaveResponse = function (result) {
        var _this = this;
        result.subscribe(function (res) {
            return _this.onSaveSuccess(res.body);
        }, function (res) {
            _this.appLoaderService.close();
            _this.onSaveError();
            _this.onError(res.message);
        });
    };
    EndDevolveComponent.prototype.onSaveSuccess = function (result) {
        this.appLoaderService.close();
        this.isSaving = false;
        this.notification.showInfo('Devolve successfully saved');
        this.previousState();
    };
    EndDevolveComponent.prototype.onSaveError = function () {
        this.isSaving = false;
        this.notification.showError('Error saving devolve');
    };
    EndDevolveComponent.prototype.onError = function (errorMessage) {
        this.isSaving = false;
        this.notification.showError(errorMessage);
    };
    EndDevolveComponent.ctorParameters = function () {
        return [
            {type: PharmacyService},
            {type: DevolveService},
            {type: NotificationService},
            {type: AppLoaderService},
            {type: ActivatedRoute}
        ];
    };
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
    return EndDevolveComponent;
}());

var DevolveResolve = /** @class */ (function () {
    function DevolveResolve(service) {
        this.service = service;
    }

    DevolveResolve.prototype.resolve = function (route, state) {
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
    DevolveResolve.ctorParameters = function () {
        return [
            {type: DevolveService}
        ];
    };
    DevolveResolve = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [DevolveService])
    ], DevolveResolve);
    return DevolveResolve;
}());
var ɵ0$1 = {
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
var ROUTES$1 = [
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

var DevolveModule = /** @class */ (function () {
    function DevolveModule() {
    }

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
    return DevolveModule;
}());

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
