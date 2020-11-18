import { __decorate, __param, __metadata, __spread } from 'tslib';
import { Inject, ɵɵdefineInjectable, ɵɵinject, Injectable, ComponentFactoryResolver, Component, ViewChild, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DATE_FORMAT, SERVER_API_URL_CONFIG, entityCompare, AppLoaderService, MatDateFormatModule } from '@lamis/web-core';
import { map, filter } from 'rxjs/operators';
import * as moment_ from 'moment';
import { CardViewDateItemModel, CardViewTextItemModel, NotificationService, CardViewUpdateService, CoreModule } from '@alfresco/adf-core';
import { CommonModule } from '@angular/common';
import { MatProgressBar, MatButton, MatInputModule, MatIconModule, MatCardModule, MatSelectModule, MatButtonModule, MatProgressBarModule, MatTableModule, MatListModule } from '@angular/material';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { TdDialogService, CovalentMessageModule, CovalentDialogsModule } from '@covalent/core';
import { of } from 'rxjs';
import { ColumnMode, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';

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
            .post(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map(function (res) { return _this.convertDateFromServer(res); }));
    };
    LaboratoryService.prototype.update = function (laboratory) {
        var _this = this;
        var copy = this.convertDateFromClient(laboratory);
        return this.http
            .put(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map(function (res) { return _this.convertDateFromServer(res); }));
    };
    LaboratoryService.prototype.find = function (id) {
        var _this = this;
        return this.http
            .get(this.resourceUrl + "/" + id, { observe: 'response' })
            .pipe(map(function (res) { return _this.convertDateFromServer(res); }));
    };
    LaboratoryService.prototype.findByUuid = function (id) {
        var _this = this;
        return this.http
            .get(this.resourceUrl + "/by-uuid/" + id, { observe: 'response' })
            .pipe(map(function (res) { return _this.convertDateFromServer(res); }));
    };
    LaboratoryService.prototype.delete = function (id) {
        return this.http.delete(this.resourceUrl + "/" + id, { observe: 'response' });
    };
    LaboratoryService.prototype.getPatient = function (id) {
        return this.http.get("/api/patients/by-uuid/" + id, { observe: 'body' })
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
            res.forEach(function (d) { return moment(d); });
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
            dateResultReceived: laboratory.dateResultReceived != null && laboratory.dateResultReceived.isValid() ? laboratory.dateResultReceived.format(DATE_FORMAT) : null,
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
    LaboratoryService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: undefined, decorators: [{ type: Inject, args: [SERVER_API_URL_CONFIG,] }] }
    ]; };
    LaboratoryService.ngInjectableDef = ɵɵdefineInjectable({ factory: function LaboratoryService_Factory() { return new LaboratoryService(ɵɵinject(HttpClient), ɵɵinject(SERVER_API_URL_CONFIG)); }, token: LaboratoryService, providedIn: "root" });
    LaboratoryService = __decorate([
        Injectable({ providedIn: 'root' }),
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
        this.ColumnMode = ColumnMode;
    }
    LaboratoryDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (_a) {
            var entity = _a.entity;
            _this.entity = !!entity && entity.body ? entity.body : entity;
            var patientId = _this.route.snapshot.paramMap.get('patientId');
            _this.laboratoryService.getPatient(patientId).subscribe(function (res) { return _this.entity.patient = res; });
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
                    }
                    else {
                        _this.notificationService.showError('Error deleting visit, please try again');
                    }
                });
            }
            else {
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
        /*this.laboratoryService.getLinesByLaboratory(this.entity.id)
            .subscribe(res => {
                this.dataSource = res;
            });*/
        this.dataSource = __spread(this.entity.lines.map(function (r) {
            _this.laboratoryService.getLabTestById(r.lab_test_id).subscribe(function (res) {
                r.description = res.description;
            });
            return r;
        }));
    };
    LaboratoryDetailsComponent.prototype.previousState = function () {
        window.history.back();
    };
    LaboratoryDetailsComponent.prototype.ngOnDestroy = function () {
    };
    LaboratoryDetailsComponent.ctorParameters = function () { return [
        { type: Router },
        { type: ActivatedRoute },
        { type: LaboratoryService },
        { type: ComponentFactoryResolver },
        { type: TdDialogService },
        { type: NotificationService },
        { type: CardViewUpdateService }
    ]; };
    LaboratoryDetailsComponent = __decorate([
        Component({
            selector: 'lamis-laboratory',
            template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <mat-card>\n            <mat-card-header>\n            </mat-card-header>\n            <mat-card-content>\n                <adf-card-view [properties]=\"properties\" editable=\"false\"></adf-card-view>\n                <mat-divider></mat-divider>\n                <ngx-datatable\n                    #mydatatable\n                    *ngIf=\"dataSource\"\n                    class=\"material full-width\"\n                    [headerHeight]=\"50\"\n                    [limit]=\"5\"\n                    [columnMode]=\"ColumnMode.force\"\n                    [footerHeight]=\"50\"\n                    rowHeight=\"auto\"\n                    [rows]=\"dataSource\"\n                >\n                    <ngx-datatable-column name=\"Test Description\" [prop]=\"'description'\"\n                                          [canAutoResize]=\"true\">\n                        <ng-template ngx-datatable-cell-template let-value=\"value\">\n                            <mat-form-field class=\"full-width\">\n                                <input matInput disabled [value]=\"value\" style=\"font-weight: 900\">\n                            </mat-form-field>\n                        </ng-template>\n                    </ngx-datatable-column>\n                    <ngx-datatable-column name=\"Result\" [prop]=\"'result'\" [canAutoResize]=\"true\">\n                        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\"\n                                     let-row=\"row\">\n                            <mat-form-field class=\"full-width\">\n                                <input matInput disabled [value]=\"value\" style=\"font-weight: 900\">\n                            </mat-form-field>\n                        </ng-template>\n                    </ngx-datatable-column>\n                    <ngx-datatable-column name=\"Comment\" [prop]=\"'comment'\" [canAutoResize]=\"true\">\n                        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\"\n                                     let-row=\"row\">\n                            <mat-form-field class=\"full-width\">\n                                <input matInput disabled [value]=\"value\" style=\"font-weight: 900\">\n                            </mat-form-field>\n                        </ng-template>\n                    </ngx-datatable-column>\n                    <ngx-datatable-column name=\"Indication\" [prop]=\"'indication'\" [canAutoResize]=\"true\">\n                        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\"\n                                     let-row=\"row\">\n                            <mat-form-field class=\"full-width\">\n                                <input matInput disabled [value]=\"value\" style=\"font-weight: 900\">\n                            </mat-form-field>\n                        </ng-template>\n                    </ngx-datatable-column>\n                </ngx-datatable>\n            </mat-card-content>\n            <mat-card-actions class=\"lamis-edit-form-actions\">\n                <button mat-button (click)=\"previousState()\">Back</button>\n                <button mat-raised-button color=\"warn\" (click)=\"delete()\">Delete</button>\n                <button mat-raised-button color=\"primary\" (click)=\"edit()\">Edit</button>\n            </mat-card-actions>\n        </mat-card>\n    </div>\n</div>\n"
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
                _this.laboratoryService.getVisitDatesByPatient(res.id).subscribe(function (res1) {
                    _this.visitDates = res1;
                });
                _this.minReportedDate = _this.entity.patient.dateRegistration.clone().add(0, 'days');
                _this.minAssayDate = _this.entity.patient.dateRegistration.clone().add(0, 'days');
                if (_this.entity.id) {
                    _this.updateMinDates();
                }
            });
            if (_this.entity.id) {
                _this.updateMinDates();
                _this.rows = __spread(_this.entity.lines.map(function (r) {
                    _this.laboratoryService.getLabTestById(r.lab_test_id).subscribe(function (res) {
                        r.description = res.description;
                        r.unit = res.unit;
                        if (!_this.tests.map(function (r1) { return r1.id; }).includes(r.lab_test_id)) {
                            _this.tests.push(res);
                            _this.selectedTests.push(res);
                            _this.tests = __spread(_this.tests);
                            _this.selectedTests = __spread(_this.selectedTests);
                        }
                        r.result = r.result || '';
                    });
                    return r;
                }));
                _this.rows = __spread(_this.rows);
            }
            _this.laboratoryService.laboratoryCategories().subscribe(function (res) { return _this.categories = res; });
        });
    };
    LaboratoryEditComponent.prototype.updateMinDates = function () {
        this.minAssayDate = this.entity.dateSampleCollected.clone().add(0, 'days');
        if (this.entity.dateAssay) {
            this.minReportedDate = this.entity.dateAssay.clone().add(0, 'days');
        }
        else {
            this.minReportedDate = this.entity.dateSampleCollected.clone().add(1, 'days');
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
        this.minAssayDate = date.clone().add(0, 'days');
    };
    LaboratoryEditComponent.prototype.assayDateChanged = function (date) {
        this.minReportedDate = date.clone().add(0, 'days');
    };
    LaboratoryEditComponent.prototype.edit = function (rowIndex) {
        this.editing[rowIndex + ''] = true;
    };
    LaboratoryEditComponent.prototype.save = function () {
        var _this = this;
        this.isSaving = true;
        var abort = false;
        // this.progressBar.mode = 'indeterminate';
        this.rows = this.rows.map(function (line) {
            if (line.lab_test_id === 16 && !line.indication) {
                _this._dialogService.openAlert({
                    title: 'Indication is required',
                    message: 'Please select indication for Viral Load Test',
                    disableClose: true
                });
                _this.isSaving = false;
                abort = true;
            }
            if (line.lab_test_id !== 16 && line.indication) {
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
            var result = parseInt(line.result, 10);
            if ((line.lab_test_id === 16 || line.lab_test_id === 1) && _this.entity.dateAssay) {
                if (!result) {
                    var zero = false;
                    if (result === 0) {
                        zero = true;
                    }
                    if (!zero) {
                        _this._dialogService.openAlert({
                            title: 'Result is invalid',
                            message: 'Please provide numeric result for test',
                            disableClose: true
                        });
                        _this.isSaving = false;
                        abort = true;
                    }
                }
                else if (result < 0) {
                    _this._dialogService.openAlert({
                        title: 'Result is invalid',
                        message: 'Please provide value >=0 for test result',
                        disableClose: true
                    });
                    _this.isSaving = false;
                    abort = true;
                }
                else {
                    line.result = result.toString();
                }
            }
            if (!!line.result && line.result.toUpperCase() === 'NAN') {
                line.result = null;
            }
            return line;
        });
        if (abort) {
            return;
        }
        this.appLoaderService.open('Saving request...');
        this.entity.lines = this.rows;
        if (this.entity.id !== undefined) {
            this.subscribeToSaveResponse(this.laboratoryService.update(this.entity));
        }
        else {
            this.subscribeToSaveResponse(this.laboratoryService.create(this.entity));
        }
    };
    LaboratoryEditComponent.prototype.categoryChanged = function (type) {
        var _this = this;
        this.laboratoryService.labTestsByCategory(type.id).subscribe(function (res) {
            res.forEach(function (labTest) {
                if (!_this.tests.map(function (r) { return r.id; }).includes(labTest.id)) {
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
                    lab_test_id: labTest.id,
                    description: labTest.description,
                    unit: labTest.unit,
                    result: null
                });
                _this.rows = _this.rows.map(function (line) {
                    if ((!!line.result && line.result.toUpperCase() === 'NAN') || !line.result) {
                        line.result = null;
                    }
                    return line;
                });
                _this.rows = __spread(_this.rows);
                _this.labTestIds.add(labTest.id);
            }
            _this.rows = _this.rows.filter(function (row) { return _this.selectedTests.map(function (test) { return test.id; }).includes(row.lab_test_id); });
            _this.labTestIds.forEach(function (id) {
                if (!_this.rows.map(function (r) { return r.lab_test_id; }).includes(id)) {
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
        this.errors[rowIndex + '-indication'] = this.rows[rowIndex].lab_test_id === 16 && !this.rows[rowIndex]['indication'];
        this.rows = __spread(this.rows);
        console.log('UPDATED!', this.rows[rowIndex][cell]);
    };
    LaboratoryEditComponent.prototype.subscribeToSaveResponse = function (result) {
        var _this = this;
        result.subscribe(function (res) { return _this.onSaveSuccess(res.body); }, function (res) {
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
    LaboratoryEditComponent.ctorParameters = function () { return [
        { type: LaboratoryService },
        { type: NotificationService },
        { type: AppLoaderService },
        { type: TdDialogService },
        { type: ActivatedRoute }
    ]; };
    __decorate([
        ViewChild(MatProgressBar, { static: true }),
        __metadata("design:type", MatProgressBar)
    ], LaboratoryEditComponent.prototype, "progressBar", void 0);
    __decorate([
        ViewChild(MatButton, { static: true }),
        __metadata("design:type", MatButton)
    ], LaboratoryEditComponent.prototype, "submitButton", void 0);
    LaboratoryEditComponent = __decorate([
        Component({
            selector: 'lamis-laboratory-edit',
            template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <form name=\"form\" role=\"form\" novalidate (ngSubmit)=\"save()\" #laboratoryForm=\"ngForm\">\n            <mat-card class=\"default\">\n                <mat-card-header>\n                </mat-card-header>\n                <mat-card-content *ngIf=\"patient\">\n                    <div>\n                        <mat-form-field class=\"full-width\" *ngIf=\"entity && dateRegistration\">\n                            <input matInput [matDatepicker]=\"picker\"\n                                   placeholder=\"Date of Sample Collection\"\n                                   [(ngModel)]=\"entity.dateSampleCollected\"\n                                   #dateCollected=\"ngModel\"\n                                   (dateChange)=\"sampleDateChanged($event.value)\"\n                                   [max]=\"today\"\n                                   [min]=\"dateRegistration\"\n                                   required\n                                   name=\"dateCollected\">\n                            <mat-datepicker-toggle\n                                    matSuffix\n                                    [for]=\"picker\">\n                            </mat-datepicker-toggle>\n                            <mat-datepicker #picker></mat-datepicker>\n                            <mat-error\n                                    *ngIf=\"dateCollected.errors && (dateCollected.dirty || dateCollected.touched) && (dateCollected.errors.required)\">\n                                Date of Sample Collection is required\n                            </mat-error>\n                            <mat-error\n                                    *ngIf=\"dateCollected.errors && (dateCollected.dirty || dateCollected.touched) && (dateCollected.errors.min)\">\n                                Date of Sample Collection cannot be\n                                before {{entity.patient.dateRegistration | date: 'dd MMM, yyyy'}}\n                            </mat-error>\n                            <mat-error\n                                    *ngIf=\"dateCollected.errors && (dateCollected.dirty || dateCollected.touched) && (dateCollected.errors.max)\">\n                                Date of Sample Collection cannot be in the future\n                            </mat-error>\n                        </mat-form-field>\n                    </div>\n                    <div>\n                        <mat-form-field class=\"full-width\">\n                            <input matInput [(ngModel)]=\"entity.labNo\"\n                                   placeholder=\"Laboratory Number\"\n                                   #labNo=\"ngModel\" required name=\"labNo\"/>\n                            <mat-error\n                                    *ngIf=\"labNo.errors && (labNo.dirty || labNo.touched) && (labNo.errors.required)\">\n                                Lab Number is required\n                            </mat-error>\n                        </mat-form-field>\n                    </div>\n                    <div *ngIf=\"minAssayDate\">\n                        <mat-form-field class=\"full-width\">\n                            <input matInput [matDatepicker]=\"picker1\"\n                                   placeholder=\"Date Assay\"\n                                   [(ngModel)]=\"entity.dateAssay\"\n                                   [matDatepickerFilter]=\"filterDates.bind(this)\"\n                                   (dateChange)=\"assayDateChanged($event.value)\"\n                                   #dateAssay=\"ngModel\"\n                                   [min]=\"minAssayDate\"\n                                   [max]=\"today\"\n                                   name=\"dateAssay\">\n                            <mat-datepicker-toggle\n                                    matSuffix\n                                    [for]=\"picker1\">\n                            </mat-datepicker-toggle>\n                            <mat-datepicker #picker1></mat-datepicker>\n                            <mat-error\n                                    *ngIf=\"dateAssay.errors && (dateAssay.dirty || dateAssay.touched) && (dateAssay.errors.required)\">\n                                Date Assay is required\n                            </mat-error>\n                            <mat-error\n                                    *ngIf=\"dateAssay.errors && (dateAssay.dirty || dateAssay.touched) && (dateAssay.errors.max)\">\n                                Date Assay must be after {{today | date: 'dd MMM, yyyy'}}\n                            </mat-error>\n                            <mat-error\n                                    *ngIf=\"dateAssay.errors && (dateAssay.dirty || dateAssay.touched) && (dateAssay.errors.min)\">\n                                Date Assay must be after {{minAssayDate}}\n                            </mat-error>\n                        </mat-form-field>\n                    </div>\n                    <div *ngIf=\"minReportedDate\">\n                        <mat-form-field class=\"full-width\">\n                            <input matInput [matDatepicker]=\"picker2\"\n                                   placeholder=\"Date Result Received\"\n                                   [(ngModel)]=\"entity.dateResultReceived\"\n                                   [matDatepickerFilter]=\"filterDates.bind(this)\"\n                                   #dateReported=\"ngModel\"\n                                   [min]=\"minReportedDate\"\n                                   [max]=\"today\"\n                                   [required]=\"!!entity.dateAssay\"\n                                   name=\"dateReported\">\n                            <mat-datepicker-toggle\n                                    matSuffix\n                                    [for]=\"picker2\">\n                            </mat-datepicker-toggle>\n                            <mat-datepicker #picker2></mat-datepicker>\n                            <mat-error\n                                    *ngIf=\"dateReported.errors && (dateReported.dirty || dateReported.touched) && (dateReported.errors.required)\">\n                                Date Result Received is required\n                            </mat-error>\n                            <mat-error\n                                    *ngIf=\"dateReported.errors && (dateReported.dirty || dateReported.touched) && (dateReported.errors.max)\">\n                                Date Result Received must be after {{today | date: 'dd MMM, yyyy'}}\n                            </mat-error>\n                            <mat-error\n                                    *ngIf=\"dateReported.errors && (dateReported.dirty || dateReported.touched) && (dateReported.errors.min)\">\n                                Date Result Received must not be before {{minReportedDate | date : 'dd MMM, yyyy'}}\n                            </mat-error>\n                        </mat-form-field>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field>\n                                <mat-select placeholder=\"Laboratory Test Category\"\n                                            (selectionChange)=\"categoryChanged($event.value)\">\n                                    <mat-option></mat-option>\n                                    <mat-option *ngFor=\"let category of categories\"\n                                                [value]=\"category\">{{category.category}}</mat-option>\n                                </mat-select>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field>\n                                <mat-select placeholder=\"Laboratory Test\"\n                                            multiple\n                                            name=\"regimen\"\n                                            [(ngModel)]=\"selectedTests\"\n                                            [compareWith]=\"entityCompare\"\n                                            (selectionChange)=\"testChanged($event.value)\">\n                                    <mat-option *ngFor=\"let test of tests\"\n                                                [value]=\"test\">{{test.description}}</mat-option>\n                                </mat-select>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        Selected Test\n                        <mat-divider></mat-divider>\n                        <ngx-datatable\n                            #mydatatable\n                            class=\"material full-width\"\n                            [headerHeight]=\"50\"\n                            [limit]=\"5\"\n                            [columnMode]=\"ColumnMode.force\"\n                            [footerHeight]=\"50\"\n                            rowHeight=\"auto\"\n                            [rows]=\"rows\"\n                        >\n                            <ngx-datatable-column name=\"Test Description\" [prop]=\"'description'\"\n                                                  [canAutoResize]=\"true\">\n                                <ng-template ngx-datatable-cell-template let-value=\"value\">\n                                    <mat-form-field class=\"full-width\">\n                                        <input matInput disabled [value]=\"value\" style=\"font-weight: 900\">\n                                    </mat-form-field>\n                                </ng-template>\n                            </ngx-datatable-column>\n                            <ngx-datatable-column name=\"Result\" [prop]=\"'result'\" [canAutoResize]=\"true\">\n                                <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\"\n                                             let-row=\"row\">\n                                    <!--<mat-form-field *ngIf=\"!editing[rowIndex + '']\" class=\"full-width\">\n                                        <input matInput [value]=\"value\" disabled>\n                                    </mat-form-field>\n                                    <mat-form-field *ngIf=\"editing[rowIndex + '']\">-->\n                                    <mat-form-field class=\"full-width\">\n                                        <input\n                                                autofocus\n                                                matInput\n                                                type=\"text\"\n                                                name=\"result\"\n                                                [required]=\"!!entity.dateAssay\"\n                                                (blur)=\"updateValue($event, 'result', rowIndex)\"\n                                                [value]=\"value || ''\"\n                                        >\n                                        <span matSuffix>&nbsp;{{row.unit}}</span>\n                                        <mat-error *ngIf=\"errors[rowIndex + '-result']\">\n                                            Result value is required\n                                        </mat-error>\n                                    </mat-form-field>\n                                </ng-template>\n                            </ngx-datatable-column>\n                            <ngx-datatable-column [maxWidth]=\"1\">\n                                <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\"\n                                             let-row=\"row\">\n                                </ng-template>\n                            </ngx-datatable-column>\n                            <ngx-datatable-column name=\"Comment\" [prop]=\"'comment'\" [canAutoResize]=\"true\">\n                                <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\"\n                                             let-row=\"row\">\n                                    <!--<mat-form-field *ngIf=\"!editing[rowIndex + '']\" class=\"full-width\">\n                                        <textarea matInput [value]=\"value\" disabled rows=\"2\"></textarea>\n                                    </mat-form-field>\n                                    <mat-form-field *ngIf=\"editing[rowIndex + '']\">-->\n                                    <mat-form-field class=\"full-width\">\n                                        <textarea\n                                                autofocus\n                                                matInput\n                                                rows=\"2\"\n                                                (blur)=\"updateValue($event, 'comment', rowIndex)\"\n                                                [value]=\"value\"\n                                        ></textarea>\n                                    </mat-form-field>\n                                </ng-template>\n                            </ngx-datatable-column>\n                            <ngx-datatable-column name=\"Indication\" [canAutoResize]=\"true\">\n                                <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\"\n                                             let-row=\"row\">\n                                    <!--<mat-form-field *ngIf=\"!editing[rowIndex + '']\" class=\"full-width\">\n                                        <input matInput [value]=\"value\" disabled>\n                                    </mat-form-field>\n                                    <mat-form-field *ngIf=\"editing[rowIndex + '']\">-->\n                                    <mat-form-field class=\"full-width\">\n                                        <mat-select autofocus\n                                                    [value]=\"value\"\n                                                    [required]=\"row.lab_test_id === 16\"\n                                                    name=\"ind\"\n                                                    (valueChange)=\"updateValue($event, 'indication', rowIndex)\">\n                                            <mat-option></mat-option>\n                                            <mat-option [value]=\"'Routine Monitoring'\">Routine Monitoring</mat-option>\n                                            <mat-option [value]=\"'Targeted Monitoring'\">Targeted Monitoring</mat-option>\n                                        </mat-select>\n                                        <mat-error *ngIf=\"errors[rowIndex + '-indication']\">\n                                            Viral Load indication is required\n                                        </mat-error>\n                                    </mat-form-field>\n                                </ng-template>\n                            </ngx-datatable-column>\n                            <!--<ngx-datatable-column name=\"Action\" prop=\"id\" [canAutoResize]=\"true\">\n                                <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\"\n                                             let-row=\"row\">\n                                    <button type=\"button\" mat-icon-button\n                                            *ngIf=\"!editing[rowIndex + '']\"\n                                            (click)=\"edit(rowIndex)\"\n                                            (mouseenter)=\"edit(rowIndex)\"\n                                            title=\"Click to edit\">\n                                        <mat-icon>edit</mat-icon>\n                                    </button>\n                                    <button type=\"button\" mat-icon-button\n                                            *ngIf=\"editing[rowIndex + '']\"\n                                            (dblclick)=\"editing[rowIndex + ''] = false\"\n                                            title=\"Click to save\">\n                                        <mat-icon>save</mat-icon>\n                                    </button>\n                                </ng-template>\n                            </ngx-datatable-column>-->\n                        </ngx-datatable>\n                    </div>\n                    <mat-divider></mat-divider>\n                </mat-card-content>\n                <mat-card-actions class=\"lamis-edit-form-actions\">\n                    <button mat-raised-button type=\"button\" (click)=\"previousState()\">Back</button>\n                    <button mat-raised-button color='primary'\n                            [disabled]=\"laboratoryForm.invalid || rows.length === 0 || isSaving\"\n                            type=\"submit\">\n                        {{entity.id !== undefined ? 'Update' : 'Save'}}\n                    </button>\n                </mat-card-actions>\n            </mat-card>\n        </form>\n    </div>\n</div>\n"
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
            return this.service.findByUuid(id).pipe(filter(function (response) { return response.ok; }), map(function (patient) { return patient.body; }));
        }
        return of({});
    };
    LaboratoryResolve.ctorParameters = function () { return [
        { type: LaboratoryService }
    ]; };
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

export { LaboratoryModule, LaboratoryService, LaboratoryDetailsComponent as ɵa, LaboratoryEditComponent as ɵb, LaboratoryResolve as ɵc, ROUTES as ɵd };
//# sourceMappingURL=lamis-laboratory-1.4.0.js.map
