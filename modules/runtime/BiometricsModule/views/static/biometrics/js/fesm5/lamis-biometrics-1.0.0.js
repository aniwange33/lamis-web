import {__decorate, __param, __metadata} from 'tslib';
import {Inject, ɵɵdefineInjectable, ɵɵinject, Injectable, Component, NgModule} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {
    DATE_FORMAT,
    SERVER_API_URL_CONFIG,
    AuthServerProvider,
    AppLoaderService,
    MatDateFormatModule
} from '@lamis/web-core';
import {map} from 'rxjs/operators';
import * as moment_ from 'moment';
import {NotificationService, CoreModule} from '@alfresco/adf-core';
import {CommonModule} from '@angular/common';
import {
    MatIconRegistry,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressBarModule,
    MatTableModule,
    MatListModule
} from '@angular/material';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {TdDialogService, CovalentMessageModule, CovalentDialogsModule} from '@covalent/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {CustomFormsModule} from 'ng2-validation';
import {DomSanitizer} from '@angular/platform-browser';

var Finger;
(function (Finger) {
    Finger["RIGHT_INDEX_FINGER"] = "Right Index Finger";
    Finger["LEFT_INDEX_FINGER"] = "Left Index Finger";
    Finger["RIGHT_THUMB"] = "Right Thumb";
    Finger["LEFT_THUMB"] = "Left Thumb";
    Finger["RIGHT_MIDDLE_FINGER"] = "Right Middle Finger";
    Finger["LEFT_MIDDLE_FINGER"] = "Left Middle Finger";
})(Finger || (Finger = {}));

var moment = moment_;
var BiometricService = /** @class */ (function () {
    function BiometricService(http, serverUrl, authServerProvider) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.authServerProvider = authServerProvider;
        this.resourceUrl = '';
        this.proxyUrl = 'http://localhost:8888/api/biometrics';
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/biometrics';
    }

    BiometricService.prototype.saveTemplates = function (biometrics) {
        var _this = this;
        biometrics = biometrics.map(function (biometric) {
            return _this.convertDateFromClient(biometric);
        });
        return this.http.post(this.resourceUrl + "/templates", biometrics, {observe: 'response'});
    };
    BiometricService.prototype.getBiometric = function (id) {
        return this.http.get(this.resourceUrl + "/" + id);
    };
    BiometricService.prototype.getPatient = function (id) {
        return this.http.get("/api/patients/by-uuid/" + id, {observe: 'body'})
            .pipe(map(function (res) {
                if (res) {
                    res.dateRegistration = res.dateRegistration != null ? moment(res.dateRegistration) : null;
                }
                return res;
            }));
    };
    BiometricService.prototype.getReaders = function () {
        return this.getObservableFromFetch(this.proxyUrl + "/readers");
    };
    BiometricService.prototype.findByPatient = function (id) {
        var _this = this;
        return this.http
            .get(this.resourceUrl + "/patient/" + id, {observe: 'response'})
            .pipe(map(function (res) {
                return _this.convertDateArrayFromServer(res);
            }));
    };
    BiometricService.prototype.delete = function (id) {
        return this.http.delete(this.resourceUrl + "/" + id, {observe: 'response'});
    };
    BiometricService.prototype.identify = function (reader) {
        var accessToken = this.authServerProvider.getToken();
        var url = new URL(this.proxyUrl + "/identify");
        url.searchParams.append('reader', reader);
        url.searchParams.append('server', window.location.host);
        url.searchParams.append('accessToken', accessToken);
        return this.getObservableFromFetch(url);
    };
    BiometricService.prototype.convertDateFromClient = function (biometric) {
        var copy = Object.assign({}, biometric, {
            date: biometric.date != null && biometric.date.isValid() ? biometric.date.format(DATE_FORMAT) : null,
        });
        return copy;
    };
    BiometricService.prototype.convertDateFromServer = function (res) {
        if (res.body) {
            res.body.date = res.body.date != null ? moment(res.body.date) : null;
        }
        return res;
    };
    BiometricService.prototype.convertDateArrayFromServer = function (res) {
        if (res.body) {
            res.body.forEach(function (biometric) {
                biometric.date = biometric.date != null ? moment(biometric.date) : null;
            });
        }
        return res;
    };
    BiometricService.prototype.getObservableFromFetch = function (url, opts) {
        //Create and return an Observable.
        return new Observable(function (observer) {
            //Make use of Fetch API to get data from URL
            fetch(url, opts || {})
                .then(function (res) {
                    /*The response.json() doesn't return json, it returns a "readable stream" which is a promise which needs to be resolved to get the actual data.*/
                    return res.json();
                })
                .then(function (body) {
                    observer.next(body);
                    /*Complete the Observable as it won't produce any more event */
                    observer.complete();
                })
                //Handle error
                .catch(function (err) {
                    return observer.error(err);
                });
        });
    };
    BiometricService.ctorParameters = function () {
        return [
            {type: HttpClient},
            {type: undefined, decorators: [{type: Inject, args: [SERVER_API_URL_CONFIG,]}]},
            {type: AuthServerProvider}
        ];
    };
    BiometricService.ngInjectableDef = ɵɵdefineInjectable({
        factory: function BiometricService_Factory() {
            return new BiometricService(ɵɵinject(HttpClient), ɵɵinject(SERVER_API_URL_CONFIG), ɵɵinject(AuthServerProvider));
        }, token: BiometricService, providedIn: "root"
    });
    BiometricService = __decorate([
        Injectable({providedIn: 'root'}),
        __param(1, Inject(SERVER_API_URL_CONFIG)),
        __metadata("design:paramtypes", [HttpClient, Object, AuthServerProvider])
    ], BiometricService);
    return BiometricService;
}());

var moment$1 = moment_;
var BiometricEditComponent = /** @class */ (function () {
    function BiometricEditComponent(biometricService, notification, appLoaderService, _dialogService, activatedRoute) {
        this.biometricService = biometricService;
        this.notification = notification;
        this.appLoaderService = appLoaderService;
        this._dialogService = _dialogService;
        this.activatedRoute = activatedRoute;
        this.biometrics = [];
        this.error = false;
        this.fingers = [];
    }

    BiometricEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.fingers.push(Finger.LEFT_INDEX_FINGER);
        this.fingers.push(Finger.LEFT_MIDDLE_FINGER);
        this.fingers.push(Finger.LEFT_THUMB);
        this.fingers.push(Finger.RIGHT_INDEX_FINGER);
        this.fingers.push(Finger.RIGHT_MIDDLE_FINGER);
        this.fingers.push(Finger.RIGHT_THUMB);
        this.isSaving = false;
        var patientId = this.activatedRoute.snapshot.paramMap.get('patientId');
        this.biometricService.getPatient(patientId).subscribe(function (res) {
            _this.patient = res;
            _this.biometricService.findByPatient(_this.patient.id).subscribe(function (res) {
                if (res.body) {
                    _this.biometrics = res.body;
                    _this.fingers = _this.fingers.filter(function (f) {
                        return !_this.biometrics.map(function (b) {
                            return b.templateType;
                        }).includes(f);
                    });
                }
            });
        });
        this.biometricService.getReaders().subscribe(function (res) {
            return _this.readers = res;
        });
    };
    BiometricEditComponent.prototype.enroll = function () {
        var _this = this;
        var dialogRef = this._dialogService.openAlert({
            message: "Please put your " + this.finger.toString() + " on the scanner.",
            title: 'Enroll finger',
            disableClose: true
        });
        this.biometricService.identify(this.reader.id).subscribe(function (res) {
            dialogRef.close();
            if (res.message === 'PATIENT_NOT_IDENTIFIED') {
                var biometric = {
                    date: moment$1(),
                    facility: _this.patient.facility,
                    patient: _this.patient,
                    template: res.template,
                    templateType: _this.finger,
                    biometricType: 'FINGERPRINT'
                };
                _this.biometrics = _this.biometrics.filter(function (b) {
                    return b.templateType !== _this.finger;
                });
                _this.biometrics.push(biometric);
                _this._dialogService.openAlert({
                    message: "Finger " + _this.finger.toString() + " successfully enrolled.",
                    title: 'Enrollment success'
                });
                _this.message = 'Please remember to click \'Save Enrollment\' when through enrolling all fingers';
            } else if (res.message === 'PATIENT_IDENTIFIED') {
                var fingerId = res.id;
                _this.biometricService.getBiometric(fingerId).subscribe(function (res) {
                    _this._dialogService.openAlert({
                        message: "Finger already enrolled by patient " + res.patient.surname + ", " + res.patient.otherNames + " (" + res.patient.hospitalNum + ")",
                        title: 'Enrollment error'
                    });
                });
            } else {
                _this._dialogService.openAlert({
                    message: 'There was an error enrolling finger, please try again',
                    title: 'Enrollment error'
                });
            }
        });
    };
    BiometricEditComponent.prototype.fingerToString = function (finger) {
        var fingers = {
            RIGHT_INDEX_FINGER: 'Right Index Finger',
            LEFT_INDEX_FINGER: 'Left Index Finger',
            RIGHT_THUMB: 'Right Thumb',
            LEFT_THUMB: 'Left Thumb',
            RIGHT_MIDDLE_FINGER: 'Right Middle Finger',
            LEFT_MIDDLE_FINGER: 'Left Middle Finger'
        };
        return fingers[finger];
    };
    BiometricEditComponent.prototype.previousState = function () {
        window.history.back();
    };
    BiometricEditComponent.prototype.save = function () {
        this.appLoaderService.open('Saving visit...');
        this.isSaving = true;
        this.subscribeToSaveResponse(this.biometricService.saveTemplates(this.biometrics));
    };
    BiometricEditComponent.prototype.subscribeToSaveResponse = function (result) {
        var _this = this;
        result.subscribe(function (res) {
            return _this.onSaveSuccess(res.body);
        }, function (res) {
            _this.appLoaderService.close();
            _this.onSaveError();
            _this.onError(res.message);
        });
    };
    BiometricEditComponent.prototype.onSaveSuccess = function (result) {
        this.appLoaderService.close();
        this.isSaving = false;
        this.notification.showInfo('Fingerprints successfully saved');
        this.previousState();
    };
    BiometricEditComponent.prototype.onSaveError = function () {
        this.isSaving = false;
        this.error = true;
        this.notification.showError('Error saving enrolling fingerprints');
    };
    BiometricEditComponent.prototype.onError = function (errorMessage) {
        this.isSaving = false;
        this.notification.showError(errorMessage);
    };
    BiometricEditComponent.ctorParameters = function () {
        return [
            {type: BiometricService},
            {type: NotificationService},
            {type: AppLoaderService},
            {type: TdDialogService},
            {type: ActivatedRoute}
        ];
    };
    BiometricEditComponent = __decorate([
        Component({
            selector: 'lamis-biometric-edit',
            template: "<div class=\"lamis-edit-form\">\r\n    <div class=\"lamis-edit-form-container\">\r\n        <form name=\"form\" role=\"form\" novalidate (ngSubmit)=\"save()\" #biometricForm=\"ngForm\">\r\n            <mat-card class=\"default\">\r\n                <mat-card-header>\r\n                </mat-card-header>\r\n                <mat-card-content>\r\n                    <div>\r\n                        <p class=\"mat-warn\">{{message}}</p>\r\n                    </div>\r\n                    <div>\r\n                        <mat-form-field>\r\n                            <mat-label>Fingerprint Scanner</mat-label>\r\n                            <mat-select [(value)]=\"reader\">\r\n                                <mat-option></mat-option>\r\n                                <mat-option *ngFor=\"let r of readers\" [value]=\"r\">{{r.name}}</mat-option>\r\n                            </mat-select>\r\n                        </mat-form-field>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <mat-form-field class=\"full-width\">\r\n                                <mat-label>Finger</mat-label>\r\n                                <mat-select [(value)]=\"finger\">\r\n                                    <mat-option></mat-option>\r\n                                    <mat-option *ngFor=\"let r of fingers\" [value]=\"r\">{{r.toString()}}</mat-option>\r\n                                </mat-select>\r\n                            </mat-form-field>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                            <button mat-raised-button type=\"button\"\r\n                                    [disabled]=\"!reader || !finger\"\r\n                                    (click)=\"enroll()\">Enroll Finger\r\n                            </button>\r\n                        </div>\r\n                    </div>\r\n                    <mat-divider></mat-divider>\r\n                    <mat-card>\r\n                        <mat-card-header class=\"mat-bg-accent\">\r\n                            <mat-card-title>\r\n                                Enrolled Fingers\r\n                            </mat-card-title>\r\n                        </mat-card-header>\r\n                        <mat-divider></mat-divider>\r\n                        <mat-card-content>\r\n                            <mat-list dense>\r\n                                <mat-list-item\r\n                                        *ngFor=\"let b of biometrics\">{{fingerToString(b.templateType)}}</mat-list-item>\r\n                            </mat-list>\r\n                        </mat-card-content>\r\n                    </mat-card>\r\n                    <mat-divider></mat-divider>\r\n                </mat-card-content>\r\n                <mat-card-actions class=\"lamis-edit-form-actions\">\r\n                    <button mat-raised-button type=\"button\" (click)=\"previousState()\">Back</button>\r\n                    <button mat-raised-button color='primary'\r\n                            [disabled]=\"!biometrics.length || isSaving\"\r\n                            type=\"submit\">\r\n                        Save Enrollment\r\n                    </button>\r\n                </mat-card-actions>\r\n            </mat-card>\r\n        </form>\r\n    </div>\r\n</div>\r\n"
        }),
        __metadata("design:paramtypes", [BiometricService,
            NotificationService,
            AppLoaderService,
            TdDialogService,
            ActivatedRoute])
    ], BiometricEditComponent);
    return BiometricEditComponent;
}());

var ɵ0 = {
    title: 'Biometric Enrollment',
    breadcrumb: 'BIOMETRIC ENROLLMENT'
}, ɵ1 = {
    authorities: ['ROLE_DEC'],
    title: 'Biometrics Enrollment',
    breadcrumb: 'BIOMETRIC ENROLLMENT'
};
var ROUTES = [
    {
        path: '',
        data: ɵ0,
        children: [
            {
                path: 'patient/:patientId/new',
                component: BiometricEditComponent,
                data: ɵ1,
            }
        ]
    }
];

var BiometricsModule = /** @class */ (function () {
    function BiometricsModule(_iconRegistry, _domSanitizer) {
        this._iconRegistry = _iconRegistry;
        this._domSanitizer = _domSanitizer;
        /*this._iconRegistry.addSvgIconInNamespace('fingerprint', 'right_index',
            this._domSanitizer.bypassSecurityTrustResourceUrl('/across/resources/static/fingerprint/img/right_index.svg'));
        this._iconRegistry.addSvgIconInNamespace('fingerprint', 'left_index',
            this._domSanitizer.bypassSecurityTrustResourceUrl('/across/resources/static/fingerprint/img/left_index.svg'));
        this._iconRegistry.addSvgIconInNamespace('fingerprint', 'right_thumb',
            this._domSanitizer.bypassSecurityTrustResourceUrl('/across/resources/static/fingerprint/img/right_thumb.svg'));
        this._iconRegistry.addSvgIconInNamespace('fingerprint', 'left_thumb',
            this._domSanitizer.bypassSecurityTrustResourceUrl('/across/resources/static/fingerprint/img/left_thumb.svg'));*/
    }

    BiometricsModule.ctorParameters = function () {
        return [
            {type: MatIconRegistry},
            {type: DomSanitizer}
        ];
    };
    BiometricsModule = __decorate([
        NgModule({
            declarations: [
                BiometricEditComponent
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
                BiometricEditComponent
            ],
            entryComponents: [],
            providers: []
        }),
        __metadata("design:paramtypes", [MatIconRegistry,
            DomSanitizer])
    ], BiometricsModule);
    return BiometricsModule;
}());

/*
 * Public API Surface of Clinic
 */

/**
 * Generated bundle index. Do not edit.
 */

export {BiometricService, BiometricsModule, Finger, BiometricEditComponent as ɵa, ROUTES as ɵb};
//# sourceMappingURL=lamis-biometrics-1.0.0.js.map
