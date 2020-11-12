import {__decorate, __param, __metadata, __spread} from 'tslib';
import {
    Inject,
    ɵɵdefineInjectable,
    ɵɵinject,
    Injectable,
    ComponentFactoryResolver,
    Component,
    ViewChild,
    NgModule
} from '@angular/core';
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
    CardViewTextItemModel,
    NotificationService,
    CardViewUpdateService,
    CoreModule
} from '@alfresco/adf-core';
import {CommonModule} from '@angular/common';
import {
    MatProgressBar,
    MatButton,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressBarModule,
    MatTableModule,
    MatListModule
} from '@angular/material';
import {Router, ActivatedRoute, RouterModule} from '@angular/router';
import {TdDialogService, CovalentMessageModule, CovalentDialogsModule} from '@covalent/core';
import {of} from 'rxjs';
import {ColumnMode, NgxDatatableModule} from '@swimlane/ngx-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CustomFormsModule} from 'ng2-validation';

var moment = moment_;
var LaboratoryService = /** @class */ (function () {
    function LaboratoryService(http, serverUrl) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.resourceUrl = '';
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/laboratories';
    }

    LaboratoryService.prototype.create = function (laboratory) {
        var _this = this;
        var copy = this.convertDateFromClient(laboratory);
        return this.http
            .post(this.resourceUrl, copy, {observe: 'response'})
            .pipe(map(function (res) {
                return _this.convertDateFromServer(res);
            }));
    };
    LaboratoryService.prototype.update = function (laboratory) {
        var _this = this;
        var copy = this.convertDateFromClient(laboratory);
        return this.http
            .put(this.resourceUrl, copy, {observe: 'response'})
            .pipe(map(function (res) {
                return _this.convertDateFromServer(res);
            }));
    };
    LaboratoryService.prototype.find = function (id) {
        var _this = this;
        return this.http
            .get(this.resourceUrl + "/" + id, {observe: 'response'})
            .pipe(map(function (res) {
                return _this.convertDateFromServer(res);
            }));
    };
    LaboratoryService.prototype.findByUuid = function (id) {
        var _this = this;
        return this.http
            .get(this.resourceUrl + "/by-uuid/" + id, {observe: 'response'})
            .pipe(map(function (res) {
                return _this.convertDateFromServer(res);
            }));
    };
    LaboratoryService.prototype.delete = function (id) {
        return this.http.delete(this.resourceUrl + "/" + id, {observe: 'response'});
    };
    LaboratoryService.prototype.getPatient = function (id) {
        return this.http.get("/api/patients/by-uuid/" + id, {observe: 'body'})
            .pipe(map(function (res) {
                if (res) {
                    res.dateRegistration = res.dateRegistration != null ? moment(res.dateRegistration) : null;
                }
                return res;
            }));
    };
    LaboratoryService.prototype.getVisitDatesByPatient = function (patientId) {
        return this.http.get(this.resourceUrl + "/patient/" + patientId + "/report-dates")
            .pipe(map(function (res) {
                res.forEach(function (d) {
                    return moment(d);
                });
                return res;
            }));
    };
    LaboratoryService.prototype.laboratoryCategories = function () {
        return this.http.get(this.resourceUrl + "/test-categories");
    };
    LaboratoryService.prototype.getLinesByLaboratory = function (laboratoryId) {
        return this.http.get(this.resourceUrl + "/" + laboratoryId + "/lines");
    };
    LaboratoryService.prototype.labTestsByCategory = function (id) {
        return this.http.get(this.resourceUrl + "/lab-tests/category/" + id);
    };
    LaboratoryService.prototype.getLabTestById = function (id) {
        return this.http.get(this.resourceUrl + "/lab-test/" + id);
    };
    LaboratoryService.prototype.latestVisit = function (patientId) {
        return this.http.get(this.resourceUrl + "/patient/" + patientId + "/latest");
    };
    LaboratoryService.prototype.convertDateFromClient = function (laboratory) {
        var copy = Object.assign({}, laboratory, {
            dateReported: laboratory.dateResultReceived != null && laboratory.dateResultReceived.isValid() ? laboratory.dateResultReceived.format(DATE_FORMAT) : null,
            dateAssay: laboratory.dateAssay != null && laboratory.dateAssay.isValid() ? laboratory.dateAssay.format(DATE_FORMAT) : null,
            dateSampleCollected: laboratory.dateSampleCollected != null && laboratory.dateSampleCollected.isValid() ? laboratory.dateSampleCollected.format(DATE_FORMAT) : null
        });
        return copy;
    };
    LaboratoryService.prototype.convertDateFromServer = function (res) {
        if (res.body) {
            res.body.dateSampleCollected = res.body.dateSampleCollected != null ? moment(res.body.dateSampleCollected) : null;
            res.body.dateResultReceived = res.body.dateResultReceived != null ? moment(res.body.dateResultReceived) : null;
            res.body.dateAssay = res.body.dateAssay != null ? moment(res.body.dateAssay) : null;
        }
        return res;
    };
    LaboratoryService.prototype.convertDateArrayFromServer = function (res) {
        if (res.body) {
            res.body.forEach(function (laboratory) {
                laboratory.dateResultReceived = laboratory.dateResultReceived != null ? moment(laboratory.dateResultReceived) : null;
                laboratory.dateAssay = laboratory.dateAssay != null ? moment(laboratory.dateAssay) : null;
                laboratory.dateSampleCollected = laboratory.dateSampleCollected != null ? moment(laboratory.dateSampleCollected) : null;
                1;
            });
        }
        return res;
    };
    LaboratoryService.ctorParameters = function () {
        return [
            {type: HttpClient},
            {type: undefined, decorators: [{type: Inject, args: [SERVER_API_URL_CONFIG,]}]}
        ];
    };
    LaboratoryService.ngInjectableDef = ɵɵdefineInjectable({
        factory: function LaboratoryService_Factory() {
            return new LaboratoryService(ɵɵinject(HttpClient), ɵɵinject(SERVER_API_URL_CONFIG));
        }, token: LaboratoryService, providedIn: "root"
    });
    LaboratoryService = __decorate([
        Injectable({providedIn: 'root'}),
        __param(1, Inject(SERVER_API_URL_CONFIG)),
        __metadata("design:paramtypes", [HttpClient, Object])
    ], LaboratoryService);
    return LaboratoryService;
}());

var LaboratoryDetailsComponent = /** @class */ (function () {
    function LaboratoryDetailsComponent(router, route, laboratoryService, cfr, _dialogService, notificationService, updateService) {
        this.router = router;
        this.route = route;
        this.laboratoryService = laboratoryService;
        this.cfr = cfr;
        this._dialogService = _dialogService;
        this.notificationService = notificationService;
        this.updateService = updateService;
        this.properties = [];
    }

    LaboratoryDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (_a) {
            var entity = _a.entity;
            _this.entity = !!entity && entity.body ? entity.body : entity;
            var patientId = _this.route.snapshot.paramMap.get('patientId');
            _this.laboratoryService.getPatient(patientId).subscribe(function (res) {
                return _this.entity.patient = res;
            });
            _this.buildProperties();
        });
    };
    LaboratoryDetailsComponent.prototype.edit = function () {
        this.router.navigate(['/', 'laboratories', this.entity.uuid, 'patient', this.entity.patient.uuid, 'edit']);
    };
    LaboratoryDetailsComponent.prototype.delete = function () {
        var _this = this;
        this._dialogService.openConfirm({
            title: 'Confirm',
            message: 'Do you want to delete this laboratory request, action cannot be reversed?',
            cancelButton: 'No',
            acceptButton: 'Yes',
            width: '500px',
        }).afterClosed().subscribe(function (accept) {
            if (accept) {
                _this.laboratoryService.delete(_this.entity.id).subscribe(function (res) {
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
    LaboratoryDetailsComponent.prototype.buildProperties = function () {
        var _this = this;
        this.properties.push(new CardViewDateItemModel({
            key: 'sc',
            value: this.entity.dateSampleCollected,
            label: 'Date of Sample Collected',
            format: 'dd MMM, yyyy'
        }));
        this.properties.push(new CardViewDateItemModel({
            key: 'ds',
            value: this.entity.dateAssay,
            label: 'Date of Assay',
            format: 'dd MMM, yyyy'
        }));
        this.properties.push(new CardViewDateItemModel({
            key: 'na',
            value: this.entity.dateResultReceived,
            label: 'Date Result Received',
            format: 'dd MMM, yyyy'
        }));
        this.properties.push(new CardViewTextItemModel({
            label: 'Laboratory Number',
            key: 'fs',
            value: this.entity.labNo
        }));
        this.laboratoryService.getLinesByLaboratory(this.entity.id)
            .subscribe(function (res) {
                _this.dataSource = res;
            });
    };
    LaboratoryDetailsComponent.prototype.previousState = function () {
        window.history.back();
    };
    LaboratoryDetailsComponent.prototype.ngOnDestroy = function () {
    };
    LaboratoryDetailsComponent.ctorParameters = function () {
        return [
            {type: Router},
            {type: ActivatedRoute},
            {type: LaboratoryService},
            {type: ComponentFactoryResolver},
            {type: TdDialogService},
            {type: NotificationService},
            {type: CardViewUpdateService}
        ];
    };
    LaboratoryDetailsComponent = __decorate([
        Component({
            selector: 'lamis-laboratory',
            template: "<div class=\"lamis-edit-form\">\r\n    <div class=\"lamis-edit-form-container\">\r\n        <mat-card>\r\n            <mat-card-header>\r\n            </mat-card-header>\r\n            <mat-card-content>\r\n                <adf-card-view [properties]=\"properties\" editable=\"false\"></adf-card-view>\r\n                <mat-divider></mat-divider>\r\n                <adf-datatable *ngIf=\"dataSource\"\r\n                               [rows]=\"dataSource\">\r\n                    <data-columns>\r\n                        <data-column key=\"labTest.description\" title=\"Description\" sortable=\"true\"></data-column>\r\n                        <data-column key=\"result\" title=\"Result\" sortable=\"false\"></data-column>\r\n                        <data-column key=\"labTest.measure\" title=\"Unit\" sortable=\"false\"></data-column>\r\n                        <data-column key=\"comment\" title=\"Comment\" sortable=\"false\"></data-column>\r\n                    </data-columns>\r\n                </adf-datatable>\r\n            </mat-card-content>\r\n            <mat-card-actions class=\"lamis-edit-form-actions\">\r\n                <button mat-button (click)=\"previousState()\">Back</button>\r\n                <button mat-raised-button color=\"warn\" (click)=\"delete()\">Delete</button>\r\n                <button mat-raised-button color=\"primary\" (click)=\"edit()\">Edit</button>\r\n            </mat-card-actions>\r\n        </mat-card>\r\n    </div>\r\n</div>\r\n"
        }),
        __metadata("design:paramtypes", [Router, ActivatedRoute, LaboratoryService,
            ComponentFactoryResolver, TdDialogService,
            NotificationService,
            CardViewUpdateService])
    ], LaboratoryDetailsComponent);
    return LaboratoryDetailsComponent;
}());

var moment$1 = moment_;
var LaboratoryEditComponent = /** @class */ (function () {
    function LaboratoryEditComponent(laboratoryService, notification, appLoaderService, _dialogService, activatedRoute) {
        this.laboratoryService = laboratoryService;
        this.notification = notification;
        this.appLoaderService = appLoaderService;
        this._dialogService = _dialogService;
        this.activatedRoute = activatedRoute;
        this.entity = {};
        this.maxNextVisit = moment$1().add(200, 'days');
        this.categories = [];
        this.tests = [];
        this.selectedTests = [];
        this.error = false;
        this.tomorrow = moment$1().add(1, 'days');
        this.today = moment$1();
        this.ColumnMode = ColumnMode;
        this.editing = {};
        this.errors = {};
        this.rows = [];
        this.labTestIds = new Set();
        this.visitDates = [];
    }

    LaboratoryEditComponent.prototype.createEntity = function () {
        return {};
    };
    LaboratoryEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isSaving = false;
        this.activatedRoute.data.subscribe(function (_a) {
            var entity = _a.entity;
            _this.entity = !!entity && entity.body ? entity.body : entity;
            if (_this.entity === undefined) {
                _this.entity = _this.createEntity();
            }
            var patientId = _this.activatedRoute.snapshot.paramMap.get('patientId');
            _this.laboratoryService.getPatient(patientId).subscribe(function (res) {
                _this.entity.patient = res;
                _this.patient = res;
                _this.dateRegistration = res.dateRegistration;
                _this.entity.facility = res.facility;
                _this.laboratoryService.getVisitDatesByPatient(res.id).subscribe(function (res) {
                    _this.visitDates = res;
                });
                _this.minReportedDate = _this.entity.patient.dateRegistration.clone().add(3, 'days');
                _this.minAssayDate = _this.entity.patient.dateRegistration.clone().add(2, 'days');
                if (_this.entity.id) {
                    _this.updateMinDates();
                }
            });
            if (_this.entity.id) {
                _this.updateMinDates();
                _this.laboratoryService.getLinesByLaboratory(_this.entity.id)
                    .subscribe(function (res) {
                        _this.rows = res.map(function (r) {
                            _this.laboratoryService.getLabTestById(r.labTest.id).subscribe(function (res) {
                                if (!_this.tests.map(function (r) {
                                    return r.id;
                                }).includes(r.labTest.id)) {
                                    _this.tests.push(res);
                                    _this.selectedTests.push(res);
                                    _this.tests = __spread(_this.tests);
                                    _this.selectedTests = __spread(_this.selectedTests);
                                }
                                r.result = r.result || '';
                            });
                            return r;
                        });
                    });
            }
            _this.laboratoryService.laboratoryCategories().subscribe(function (res) {
                return _this.categories = res;
            });
        });
    };
    LaboratoryEditComponent.prototype.updateMinDates = function () {
        this.minAssayDate = this.entity.dateSampleCollected.clone().add(2, 'days');
        if (this.entity.dateAssay) {
            this.minReportedDate = this.entity.dateAssay.clone().add(2, 'days');
        } else {
            this.minReportedDate = this.entity.dateSampleCollected.clone().add(7, 'days');
        }
    };
    LaboratoryEditComponent.prototype.filterDates = function (date) {
        var exists = false;
        this.visitDates.forEach(function (d) {
            if (date.diff(d, 'days') === 0) {
                exists = true;
            }
        });
        return (this.entity.id && date.diff(this.entity.dateSampleCollected, 'days') === 0) || !exists;
    };
    LaboratoryEditComponent.prototype.previousState = function () {
        window.history.back();
    };
    LaboratoryEditComponent.prototype.entityCompare = function (e1, e2) {
        return entityCompare(e1, e2);
    };
    LaboratoryEditComponent.prototype.sampleDateChanged = function (date) {
        this.minAssayDate = date.clone().add(2, 'days');
    };
    LaboratoryEditComponent.prototype.assayDateChanged = function (date) {
        this.minReportedDate = date.clone().add(2, 'days');
    };
    LaboratoryEditComponent.prototype.edit = function (rowIndex) {
        this.editing[rowIndex + ''] = true;
    };
    LaboratoryEditComponent.prototype.save = function () {
        var _this = this;
        this.isSaving = true;
        var abort = false;
        //this.progressBar.mode = 'indeterminate';
        this.rows.forEach(function (line) {
            if (line.labTest.id === 16 && !line.indication) {
                _this._dialogService.openAlert({
                    title: 'Indication is required',
                    message: 'Please select indication for Viral Load Test',
                    disableClose: true
                });
                _this.isSaving = false;
                abort = true;
            }
            if (line.labTest.id !== 16 && line.indication) {
                line.indication = null;
            }
            if (_this.entity.dateAssay && !line.result) {
                _this._dialogService.openAlert({
                    title: 'Result is required',
                    message: 'Please provide test result',
                    disableClose: true
                });
                _this.isSaving = false;
                abort = true;
            }
            if (line.result && !_this.entity.dateAssay) {
                _this.isSaving = false;
                abort = true;
                _this._dialogService.openAlert({
                    title: 'Form not complete',
                    message: 'Please provide Date of Test Assay',
                    disableClose: true
                });
            }
            var result = parseInt(line.result);
            if ((line.labTest.id === 16 || line.labTest.id === 1) && _this.entity.dateAssay && !result) {
                _this._dialogService.openAlert({
                    title: 'Result is invalid',
                    message: 'Please provide numeric result for test',
                    disableClose: true
                });
                _this.isSaving = false;
                abort = true;
            } else {
                line.result = result.toString();
            }
        });
        if (abort) {
            return;
        }
        this.appLoaderService.open('Saving request...');
        this.entity.lines = this.rows;
        if (this.entity.id !== undefined) {
            this.subscribeToSaveResponse(this.laboratoryService.update(this.entity));
        } else {
            this.subscribeToSaveResponse(this.laboratoryService.create(this.entity));
        }
    };
    LaboratoryEditComponent.prototype.categoryChanged = function (type) {
        var _this = this;
        this.laboratoryService.labTestsByCategory(type.id).subscribe(function (res) {
            res.forEach(function (labTest) {
                if (!_this.tests.map(function (r) {
                    return r.id;
                }).includes(labTest.id)) {
                    _this.tests.push(labTest);
                    _this.tests = __spread(_this.tests);
                }
            });
        });
    };
    LaboratoryEditComponent.prototype.testChanged = function (event) {
        var _this = this;
        this.selectedTests.forEach(function (labTest) {
            if (!_this.labTestIds.has(labTest.id)) {
                _this.rows.push({
                    labTest: labTest,
                    result: ''
                });
                _this.rows = __spread(_this.rows);
                _this.labTestIds.add(labTest.id);
            }
            _this.rows = _this.rows.filter(function (row) {
                return _this.selectedTests.map(function (test) {
                    return test.id;
                }).includes(row.labTest.id);
            });
            _this.labTestIds.forEach(function (id) {
                if (!_this.rows.map(function (r) {
                    return r.labTest.id;
                }).includes(id)) {
                    _this.labTestIds.delete(id);
                }
            });
        });
    };
    LaboratoryEditComponent.prototype.updateValue = function (event, cell, rowIndex) {
        console.log('inline editing rowIndex', rowIndex);
        this.editing[rowIndex + '-' + cell] = false;
        this.rows[rowIndex][cell] = cell === 'indication' ? event : event.target.value;
        this.errors[rowIndex + '-result'] = this.entity.dateAssay && !this.rows[rowIndex][cell];
        this.errors[rowIndex + '-indication'] = this.rows[rowIndex].labTest.id === 16 && !this.rows[rowIndex]['indication'];
        this.rows = __spread(this.rows);
        console.log('UPDATED!', this.rows[rowIndex][cell]);
    };
    LaboratoryEditComponent.prototype.subscribeToSaveResponse = function (result) {
        var _this = this;
        result.subscribe(function (res) {
            return _this.onSaveSuccess(res.body);
        }, function (res) {
            _this.appLoaderService.close();
            _this.onSaveError();
            _this.onError(res.message);
        });
    };
    LaboratoryEditComponent.prototype.onSaveSuccess = function (result) {
        this.appLoaderService.close();
        this.isSaving = false;
        this.notification.showInfo('Laboratory request successfully saved');
        this.previousState();
    };
    LaboratoryEditComponent.prototype.onSaveError = function () {
        this.isSaving = false;
        this.error = true;
        this.notification.showError('Error saving laboratory request');
    };
    LaboratoryEditComponent.prototype.onError = function (errorMessage) {
        this.isSaving = false;
        this.notification.showError(errorMessage);
    };
    LaboratoryEditComponent.ctorParameters = function () {
        return [
            {type: LaboratoryService},
            {type: NotificationService},
            {type: AppLoaderService},
            {type: TdDialogService},
            {type: ActivatedRoute}
        ];
    };
    __decorate([
        ViewChild(MatProgressBar, {static: true}),
        __metadata("design:type", MatProgressBar)
    ], LaboratoryEditComponent.prototype, "progressBar", void 0);
    __decorate([
        ViewChild(MatButton, {static: true}),
        __metadata("design:type", MatButton)
    ], LaboratoryEditComponent.prototype, "submitButton", void 0);
    LaboratoryEditComponent = __decorate([
        Component({
            selector: 'lamis-laboratory-edit',
            template: "<div class=\"lamis-edit-form\">\r\n    <div class=\"lamis-edit-form-container\">\r\n        <form name=\"form\" role=\"form\" novalidate (ngSubmit)=\"save()\" #laboratoryForm=\"ngForm\">\r\n            <mat-card class=\"default\">\r\n                <mat-card-header>\r\n                </mat-card-header>\r\n                <mat-card-content *ngIf=\"patient\">\r\n                    <div>\r\n                        <mat-form-field class=\"full-width\" *ngIf=\"entity && dateRegistration\">\r\n                            <input matInput [matDatepicker]=\"picker\"\r\n                                   placeholder=\"Date of Sample Collection\"\r\n                                   [(ngModel)]=\"entity.dateSampleCollected\"\r\n                                   #dateCollected=\"ngModel\"\r\n                                   (dateChange)=\"sampleDateChanged($event.value)\"\r\n                                   [max]=\"today\"\r\n                                   [min]=\"dateRegistration\"\r\n                                   required\r\n                                   name=\"dateCollected\">\r\n                            <mat-datepicker-toggle\r\n                                    matSuffix\r\n                                    [for]=\"picker\">\r\n                            </mat-datepicker-toggle>\r\n                            <mat-datepicker #picker></mat-datepicker>\r\n                            <mat-error\r\n                                    *ngIf=\"dateCollected.errors && (dateCollected.dirty || dateCollected.touched) && (dateCollected.errors.required)\">\r\n                                Date of Sample Collection is required\r\n                            </mat-error>\r\n                            <mat-error\r\n                                    *ngIf=\"dateCollected.errors && (dateCollected.dirty || dateCollected.touched) && (dateCollected.errors.min)\">\r\n                                Date of Sample Collection cannot be\r\n                                before {{entity.patient.dateRegistration | date: 'dd MMM, yyyy'}}\r\n                            </mat-error>\r\n                            <mat-error\r\n                                    *ngIf=\"dateCollected.errors && (dateCollected.dirty || dateCollected.touched) && (dateCollected.errors.max)\">\r\n                                Date of Sample Collection cannot be in the future\r\n                            </mat-error>\r\n                        </mat-form-field>\r\n                    </div>\r\n                    <div>\r\n                        <mat-form-field class=\"full-width\">\r\n                            <input matInput [(ngModel)]=\"entity.labNo\"\r\n                                   placeholder=\"Laboratory Number\"\r\n                                   #labNo=\"ngModel\" required name=\"labNo\"/>\r\n                            <mat-error\r\n                                    *ngIf=\"labNo.errors && (labNo.dirty || labNo.touched) && (labNo.errors.required)\">\r\n                                Lab Number is required\r\n                            </mat-error>\r\n                        </mat-form-field>\r\n                    </div>\r\n                    <div *ngIf=\"minAssayDate\">\r\n                        <mat-form-field class=\"full-width\">\r\n                            <input matInput [matDatepicker]=\"picker1\"\r\n                                   placeholder=\"Date Assay\"\r\n                                   [(ngModel)]=\"entity.dateAssay\"\r\n                                   [matDatepickerFilter]=\"filterDates.bind(this)\"\r\n                                   (dateChange)=\"assayDateChanged($event.value)\"\r\n                                   #dateAssay=\"ngModel\"\r\n                                   [min]=\"minAssayDate\"\r\n                                   [max]=\"today\"\r\n                                   name=\"dateAssay\">\r\n                            <mat-datepicker-toggle\r\n                                    matSuffix\r\n                                    [for]=\"picker1\">\r\n                            </mat-datepicker-toggle>\r\n                            <mat-datepicker #picker1></mat-datepicker>\r\n                            <mat-error\r\n                                    *ngIf=\"dateAssay.errors && (dateAssay.dirty || dateAssay.touched) && (dateAssay.errors.required)\">\r\n                                Date Assay is required\r\n                            </mat-error>\r\n                            <mat-error\r\n                                    *ngIf=\"dateAssay.errors && (dateAssay.dirty || dateAssay.touched) && (dateAssay.errors.max)\">\r\n                                Date Assay must be after {{today | date: 'dd MMM, yyyy'}}\r\n                            </mat-error>\r\n                            <mat-error\r\n                                    *ngIf=\"dateAssay.errors && (dateAssay.dirty || dateAssay.touched) && (dateAssay.errors.min)\">\r\n                                Date Assay must be after {{minAssayDate}}\r\n                            </mat-error>\r\n                        </mat-form-field>\r\n                    </div>\r\n                    <div *ngIf=\"minReportedDate\">\r\n                        <mat-form-field class=\"full-width\">\r\n                            <input matInput [matDatepicker]=\"picker2\"\r\n                                   placeholder=\"Date Result Received\"\r\n                                   [(ngModel)]=\"entity.dateResultReceived\"\r\n                                   [matDatepickerFilter]=\"filterDates.bind(this)\"\r\n                                   #dateReported=\"ngModel\"\r\n                                   [min]=\"minReportedDate\"\r\n                                   [max]=\"today\"\r\n                                   [required]=\"!!entity.dateAssay\"\r\n                                   name=\"dateReported\">\r\n                            <mat-datepicker-toggle\r\n                                    matSuffix\r\n                                    [for]=\"picker2\">\r\n                            </mat-datepicker-toggle>\r\n                            <mat-datepicker #picker2></mat-datepicker>\r\n                            <mat-error\r\n                                    *ngIf=\"dateReported.errors && (dateReported.dirty || dateReported.touched) && (dateReported.errors.required)\">\r\n                                Date Result Received is required\r\n                            </mat-error>\r\n                            <mat-error\r\n                                    *ngIf=\"dateReported.errors && (dateReported.dirty || dateReported.touched) && (dateReported.errors.max)\">\r\n                                Date Result Received must be after {{today | date: 'dd MMM, yyyy'}}\r\n                            </mat-error>\r\n                            <mat-error\r\n                                    *ngIf=\"dateReported.errors && (dateReported.dirty || dateReported.touched) && (dateReported.errors.min)\">\r\n                                Date Result Received must not be before {{minReportedDate | date : 'dd MMM, yyyy'}}\r\n                            </mat-error>\r\n                        </mat-form-field>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <mat-form-field>\r\n                                <mat-select placeholder=\"Laboratory Test Category\"\r\n                                            (selectionChange)=\"categoryChanged($event.value)\">\r\n                                    <mat-option></mat-option>\r\n                                    <mat-option *ngFor=\"let category of categories\"\r\n                                                [value]=\"category\">{{category.category}}</mat-option>\r\n                                </mat-select>\r\n                            </mat-form-field>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <mat-form-field>\r\n                                <mat-select placeholder=\"Laboratory Test\"\r\n                                            multiple\r\n                                            name=\"regimen\"\r\n                                            [(ngModel)]=\"selectedTests\"\r\n                                            [compareWith]=\"entityCompare\"\r\n                                            (selectionChange)=\"testChanged($event.value)\">\r\n                                    <mat-option *ngFor=\"let test of tests\"\r\n                                                [value]=\"test\">{{test.description}}</mat-option>\r\n                                </mat-select>\r\n                            </mat-form-field>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        Selected Test\r\n                        <mat-divider></mat-divider>\r\n                        <ngx-datatable\r\n                            #mydatatable\r\n                            class=\"material full-width\"\r\n                            [headerHeight]=\"50\"\r\n                            [limit]=\"5\"\r\n                            [columnMode]=\"ColumnMode.force\"\r\n                            [footerHeight]=\"50\"\r\n                            rowHeight=\"auto\"\r\n                            [rows]=\"rows\"\r\n                        >\r\n                            <ngx-datatable-column name=\"Test Description\" [prop]=\"'labTest.description'\"\r\n                                                  [canAutoResize]=\"true\">\r\n                                <ng-template ngx-datatable-cell-template let-value=\"value\">\r\n                                    <mat-form-field class=\"full-width\">\r\n                                        <input matInput disabled [value]=\"value\" style=\"font-weight: 900\">\r\n                                    </mat-form-field>\r\n                                </ng-template>\r\n                            </ngx-datatable-column>\r\n                            <ngx-datatable-column name=\"Result\" [prop]=\"'result'\" [canAutoResize]=\"true\">\r\n                                <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\"\r\n                                             let-row=\"row\">\r\n                                    <!--<mat-form-field *ngIf=\"!editing[rowIndex + '']\" class=\"full-width\">\r\n                                        <input matInput [value]=\"value\" disabled>\r\n                                    </mat-form-field>\r\n                                    <mat-form-field *ngIf=\"editing[rowIndex + '']\">-->\r\n                                    <mat-form-field class=\"full-width\">\r\n                                        <input\r\n                                                autofocus\r\n                                                matInput\r\n                                                name=\"result\"\r\n                                                [required]=\"!!entity.dateAssay\"\r\n                                                (blur)=\"updateValue($event, 'result', rowIndex)\"\r\n                                                [value]=\"value || ''\"\r\n                                        >\r\n                                        <span matSuffix>&nbsp;{{row.labTest.unit}}</span>\r\n                                        <mat-error *ngIf=\"errors[rowIndex + '-result']\">\r\n                                            Result value is required\r\n                                        </mat-error>\r\n                                    </mat-form-field>\r\n                                </ng-template>\r\n                            </ngx-datatable-column>\r\n                            <ngx-datatable-column [maxWidth]=\"1\">\r\n                                <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\"\r\n                                             let-row=\"row\">\r\n                                </ng-template>\r\n                            </ngx-datatable-column>\r\n                            <ngx-datatable-column name=\"Comment\" [prop]=\"'comment'\" [canAutoResize]=\"true\">\r\n                                <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\"\r\n                                             let-row=\"row\">\r\n                                    <!--<mat-form-field *ngIf=\"!editing[rowIndex + '']\" class=\"full-width\">\r\n                                        <textarea matInput [value]=\"value\" disabled rows=\"2\"></textarea>\r\n                                    </mat-form-field>\r\n                                    <mat-form-field *ngIf=\"editing[rowIndex + '']\">-->\r\n                                    <mat-form-field class=\"full-width\">\r\n                                        <textarea\r\n                                                autofocus\r\n                                                matInput\r\n                                                rows=\"2\"\r\n                                                (blur)=\"updateValue($event, 'comment', rowIndex)\"\r\n                                                [value]=\"value\"\r\n                                        ></textarea>\r\n                                    </mat-form-field>\r\n                                </ng-template>\r\n                            </ngx-datatable-column>\r\n                            <ngx-datatable-column name=\"Indication\" [canAutoResize]=\"true\">\r\n                                <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\"\r\n                                             let-row=\"row\">\r\n                                    <!--<mat-form-field *ngIf=\"!editing[rowIndex + '']\" class=\"full-width\">\r\n                                        <input matInput [value]=\"value\" disabled>\r\n                                    </mat-form-field>\r\n                                    <mat-form-field *ngIf=\"editing[rowIndex + '']\">-->\r\n                                    <mat-form-field class=\"full-width\">\r\n                                        <mat-select autofocus\r\n                                                    [value]=\"value\"\r\n                                                    [required]=\"row.labTest.id === 16\"\r\n                                                    name=\"ind\"\r\n                                                    (valueChange)=\"updateValue($event, 'indication', rowIndex)\">\r\n                                            <mat-option></mat-option>\r\n                                            <mat-option [value]=\"'Routine Monitoring'\">Routine Monitoring</mat-option>\r\n                                            <mat-option [value]=\"'Targeted Monitoring'\">Targeted Monitoring</mat-option>\r\n                                        </mat-select>\r\n                                        <mat-error *ngIf=\"errors[rowIndex + '-indication']\">\r\n                                            Viral Load indication is required\r\n                                        </mat-error>\r\n                                    </mat-form-field>\r\n                                </ng-template>\r\n                            </ngx-datatable-column>\r\n                            <!--<ngx-datatable-column name=\"Action\" prop=\"id\" [canAutoResize]=\"true\">\r\n                                <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\"\r\n                                             let-row=\"row\">\r\n                                    <button type=\"button\" mat-icon-button\r\n                                            *ngIf=\"!editing[rowIndex + '']\"\r\n                                            (click)=\"edit(rowIndex)\"\r\n                                            (mouseenter)=\"edit(rowIndex)\"\r\n                                            title=\"Click to edit\">\r\n                                        <mat-icon>edit</mat-icon>\r\n                                    </button>\r\n                                    <button type=\"button\" mat-icon-button\r\n                                            *ngIf=\"editing[rowIndex + '']\"\r\n                                            (dblclick)=\"editing[rowIndex + ''] = false\"\r\n                                            title=\"Click to save\">\r\n                                        <mat-icon>save</mat-icon>\r\n                                    </button>\r\n                                </ng-template>\r\n                            </ngx-datatable-column>-->\r\n                        </ngx-datatable>\r\n                    </div>\r\n                    <mat-divider></mat-divider>\r\n                </mat-card-content>\r\n                <mat-card-actions class=\"lamis-edit-form-actions\">\r\n                    <button mat-raised-button type=\"button\" (click)=\"previousState()\">Back</button>\r\n                    <button mat-raised-button color='primary'\r\n                            [disabled]=\"laboratoryForm.invalid || rows.length === 0 || isSaving\"\r\n                            type=\"submit\">\r\n                        {{entity.id !== undefined ? 'Update' : 'Save'}}\r\n                    </button>\r\n                </mat-card-actions>\r\n            </mat-card>\r\n        </form>\r\n    </div>\r\n</div>\r\n"
        }),
        __metadata("design:paramtypes", [LaboratoryService,
            NotificationService,
            AppLoaderService,
            TdDialogService,
            ActivatedRoute])
    ], LaboratoryEditComponent);
    return LaboratoryEditComponent;
}());

var LaboratoryResolve = /** @class */ (function () {
    function LaboratoryResolve(service) {
        this.service = service;
    }

    LaboratoryResolve.prototype.resolve = function (route, state) {
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
    LaboratoryResolve.ctorParameters = function () {
        return [
            {type: LaboratoryService}
        ];
    };
    LaboratoryResolve = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [LaboratoryService])
    ], LaboratoryResolve);
    return LaboratoryResolve;
}());
var ɵ0 = {
    title: 'Laboratory Request',
    breadcrumb: 'LABORATORY REQUEST'
}, ɵ1 = {
    authorities: ['ROLE_USER'],
    title: 'Laboratory Request',
    breadcrumb: 'LABORATORY REQUEST'
}, ɵ2 = {
    authorities: ['ROLE_DEC'],
    title: 'LABORATORY REQUEST',
    breadcrumb: 'ADD LABORATORY REQUEST'
}, ɵ3 = {
    authorities: ['ROLE_DEC'],
    title: 'Laboratory Request Edit',
    breadcrumb: 'LABORATORY REQUEST EDIT'
};
var ROUTES = [
    {
        path: '',
        data: ɵ0,
        children: [
            {
                path: ':id/patient/:patientId/view',
                component: LaboratoryDetailsComponent,
                resolve: {
                    entity: LaboratoryResolve
                },
                data: ɵ1,
            },
            {
                path: 'patient/:patientId/new',
                component: LaboratoryEditComponent,
                data: ɵ2,
            },
            {
                path: ':id/patient/:patientId/edit',
                component: LaboratoryEditComponent,
                resolve: {
                    entity: LaboratoryResolve
                },
                data: ɵ3,
            }
        ]
    }
];

var LaboratoryModule = /** @class */ (function () {
    function LaboratoryModule() {
    }

    LaboratoryModule = __decorate([
        NgModule({
            declarations: [
                LaboratoryDetailsComponent,
                LaboratoryEditComponent
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
                NgxDatatableModule,
                ReactiveFormsModule,
                MatDateFormatModule,
                CustomFormsModule
            ],
            exports: [
                LaboratoryDetailsComponent,
                LaboratoryEditComponent
            ],
            entryComponents: [],
            providers: [
                LaboratoryResolve
            ]
        })
    ], LaboratoryModule);
    return LaboratoryModule;
}());

/*
 * Public API Surface of Clinic
 */

/**
 * Generated bundle index. Do not edit.
 */

export {
    LaboratoryModule,
    LaboratoryService,
    LaboratoryDetailsComponent as ɵa,
    LaboratoryEditComponent as ɵb,
    LaboratoryResolve as ɵc,
    ROUTES as ɵd
};
//# sourceMappingURL=lamis-laboratory-1.1.1.js.map
