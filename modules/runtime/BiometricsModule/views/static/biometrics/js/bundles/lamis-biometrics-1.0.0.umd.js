(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common/http'), require('rxjs'), require('@lamis/web-core'), require('rxjs/operators'), require('moment'), require('@alfresco/adf-core'), require('@angular/common'), require('@angular/material'), require('@angular/router'), require('@covalent/core'), require('@angular/forms'), require('@swimlane/ngx-datatable'), require('ng2-validation'), require('@angular/platform-browser')) :
        typeof define === 'function' && define.amd ? define('lamis-biometrics-1.0.0', ['exports', '@angular/core', '@angular/common/http', 'rxjs', '@lamis/web-core', 'rxjs/operators', 'moment', '@alfresco/adf-core', '@angular/common', '@angular/material', '@angular/router', '@covalent/core', '@angular/forms', '@swimlane/ngx-datatable', 'ng2-validation', '@angular/platform-browser'], factory) :
            (global = global || self, factory((global['lamis-biometrics-1'] = global['lamis-biometrics-1'] || {}, global['lamis-biometrics-1']['0'] = global['lamis-biometrics-1']['0'] || {}, global['lamis-biometrics-1']['0']['0'] = {}), global.ng.core, global.ng.common.http, global.rxjs, global.webCore, global.rxjs.operators, global.moment_, global.adfCore, global.ng.common, global.ng.material, global.ng.router, global.core$1, global.ng.forms, global.ngxDatatable, global.ng2Validation, global.ng.platformBrowser));
}(this, function (exports, core, http, rxjs, webCore, operators, moment_, adfCore, common, material, router, core$1, forms, ngxDatatable, ng2Validation, platformBrowser) {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({__proto__: []} instanceof Array && function (d, b) {
                d.__proto__ = b;
            }) ||
            function (d, b) {
                for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
            };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);

        function __() {
            this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) {
            decorator(target, key, paramIndex);
        }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }

            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }

            function step(result) {
                result.done ? resolve(result.value) : new P(function (resolve) {
                    resolve(result.value);
                }).then(fulfilled, rejected);
            }

            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = {
            label: 0, sent: function () {
                if (t[0] & 1) throw t[1];
                return t[1];
            }, trys: [], ops: []
        }, f, y, t, g;
        return g = {
            next: verb(0),
            "throw": verb(1),
            "return": verb(2)
        }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
            return this;
        }), g;

        function verb(n) {
            return function (v) {
                return step([n, v]);
            };
        }

        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0:
                    case 1:
                        t = op;
                        break;
                    case 4:
                        _.label++;
                        return {value: op[1], done: false};
                    case 5:
                        _.label++;
                        y = op[1];
                        op = [0];
                        continue;
                    case 7:
                        op = _.ops.pop();
                        _.trys.pop();
                        continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;
                            continue;
                        }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                            _.label = op[1];
                            break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];
                            t = op;
                            break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];
                            _.ops.push(op);
                            break;
                        }
                        if (t[2]) _.ops.pop();
                        _.trys.pop();
                        continue;
                }
                op = body.call(thisArg, _);
            } catch (e) {
                op = [6, e];
                y = 0;
            } finally {
                f = t = 0;
            }
            if (op[0] & 5) throw op[1];
            return {value: op[0] ? op[1] : void 0, done: true};
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return {value: o && o[i++], done: !o};
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        } catch (error) {
            e = {error: error};
        } finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            } finally {
                if (e) throw e.error;
            }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
            return this;
        }, i;

        function verb(n) {
            if (g[n]) i[n] = function (v) {
                return new Promise(function (a, b) {
                    q.push([n, v, a, b]) > 1 || resume(n, v);
                });
            };
        }

        function resume(n, v) {
            try {
                step(g[n](v));
            } catch (e) {
                settle(q[0][3], e);
            }
        }

        function step(r) {
            r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
        }

        function fulfill(value) {
            resume("next", value);
        }

        function reject(value) {
            resume("throw", value);
        }

        function settle(f, v) {
            if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
        }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) {
            throw e;
        }), verb("return"), i[Symbol.iterator] = function () {
            return this;
        }, i;

        function verb(n, f) {
            i[n] = o[n] ? function (v) {
                return (p = !p) ? {value: __await(o[n](v)), done: n === "return"} : f ? f(v) : v;
            } : f;
        }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
            return this;
        }, i);

        function verb(n) {
            i[n] = o[n] && function (v) {
                return new Promise(function (resolve, reject) {
                    v = o[n](v), settle(resolve, reject, v.done, v.value);
                });
            };
        }

        function settle(resolve, reject, d, v) {
            Promise.resolve(v).then(function (v) {
                resolve({value: v, done: d});
            }, reject);
        }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", {value: raw});
        } else {
            cooked.raw = raw;
        }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : {default: mod};
    }

    (function (Finger) {
        Finger["RIGHT_INDEX_FINGER"] = "Right Index Finger";
        Finger["LEFT_INDEX_FINGER"] = "Left Index Finger";
        Finger["RIGHT_THUMB"] = "Right Thumb";
        Finger["LEFT_THUMB"] = "Left Thumb";
        Finger["RIGHT_MIDDLE_FINGER"] = "Right Middle Finger";
        Finger["LEFT_MIDDLE_FINGER"] = "Left Middle Finger";
    })(exports.Finger || (exports.Finger = {}));

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
                .pipe(operators.map(function (res) {
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
                .pipe(operators.map(function (res) {
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
                date: biometric.date != null && biometric.date.isValid() ? biometric.date.format(webCore.DATE_FORMAT) : null,
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
            return new rxjs.Observable(function (observer) {
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
                {type: http.HttpClient},
                {type: undefined, decorators: [{type: core.Inject, args: [webCore.SERVER_API_URL_CONFIG,]}]},
                {type: webCore.AuthServerProvider}
            ];
        };
        BiometricService.ngInjectableDef = core.ɵɵdefineInjectable({
            factory: function BiometricService_Factory() {
                return new BiometricService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(webCore.SERVER_API_URL_CONFIG), core.ɵɵinject(webCore.AuthServerProvider));
            }, token: BiometricService, providedIn: "root"
        });
        BiometricService = __decorate([
            core.Injectable({providedIn: 'root'}),
            __param(1, core.Inject(webCore.SERVER_API_URL_CONFIG)),
            __metadata("design:paramtypes", [http.HttpClient, Object, webCore.AuthServerProvider])
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
            this.fingers.push(exports.Finger.LEFT_INDEX_FINGER);
            this.fingers.push(exports.Finger.LEFT_MIDDLE_FINGER);
            this.fingers.push(exports.Finger.LEFT_THUMB);
            this.fingers.push(exports.Finger.RIGHT_INDEX_FINGER);
            this.fingers.push(exports.Finger.RIGHT_MIDDLE_FINGER);
            this.fingers.push(exports.Finger.RIGHT_THUMB);
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
                {type: adfCore.NotificationService},
                {type: webCore.AppLoaderService},
                {type: core$1.TdDialogService},
                {type: router.ActivatedRoute}
            ];
        };
        BiometricEditComponent = __decorate([
            core.Component({
                selector: 'lamis-biometric-edit',
                template: "<div class=\"lamis-edit-form\">\r\n    <div class=\"lamis-edit-form-container\">\r\n        <form name=\"form\" role=\"form\" novalidate (ngSubmit)=\"save()\" #biometricForm=\"ngForm\">\r\n            <mat-card class=\"default\">\r\n                <mat-card-header>\r\n                </mat-card-header>\r\n                <mat-card-content>\r\n                    <div>\r\n                        <p class=\"mat-warn\">{{message}}</p>\r\n                    </div>\r\n                    <div>\r\n                        <mat-form-field>\r\n                            <mat-label>Fingerprint Scanner</mat-label>\r\n                            <mat-select [(value)]=\"reader\">\r\n                                <mat-option></mat-option>\r\n                                <mat-option *ngFor=\"let r of readers\" [value]=\"r\">{{r.name}}</mat-option>\r\n                            </mat-select>\r\n                        </mat-form-field>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <mat-form-field class=\"full-width\">\r\n                                <mat-label>Finger</mat-label>\r\n                                <mat-select [(value)]=\"finger\">\r\n                                    <mat-option></mat-option>\r\n                                    <mat-option *ngFor=\"let r of fingers\" [value]=\"r\">{{r.toString()}}</mat-option>\r\n                                </mat-select>\r\n                            </mat-form-field>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                            <button mat-raised-button type=\"button\"\r\n                                    [disabled]=\"!reader || !finger\"\r\n                                    (click)=\"enroll()\">Enroll Finger\r\n                            </button>\r\n                        </div>\r\n                    </div>\r\n                    <mat-divider></mat-divider>\r\n                    <mat-card>\r\n                        <mat-card-header class=\"mat-bg-accent\">\r\n                            <mat-card-title>\r\n                                Enrolled Fingers\r\n                            </mat-card-title>\r\n                        </mat-card-header>\r\n                        <mat-divider></mat-divider>\r\n                        <mat-card-content>\r\n                            <mat-list dense>\r\n                                <mat-list-item\r\n                                        *ngFor=\"let b of biometrics\">{{fingerToString(b.templateType)}}</mat-list-item>\r\n                            </mat-list>\r\n                        </mat-card-content>\r\n                    </mat-card>\r\n                    <mat-divider></mat-divider>\r\n                </mat-card-content>\r\n                <mat-card-actions class=\"lamis-edit-form-actions\">\r\n                    <button mat-raised-button type=\"button\" (click)=\"previousState()\">Back</button>\r\n                    <button mat-raised-button color='primary'\r\n                            [disabled]=\"!biometrics.length || isSaving\"\r\n                            type=\"submit\">\r\n                        Save Enrollment\r\n                    </button>\r\n                </mat-card-actions>\r\n            </mat-card>\r\n        </form>\r\n    </div>\r\n</div>\r\n"
            }),
            __metadata("design:paramtypes", [BiometricService,
                adfCore.NotificationService,
                webCore.AppLoaderService,
                core$1.TdDialogService,
                router.ActivatedRoute])
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
                {type: material.MatIconRegistry},
                {type: platformBrowser.DomSanitizer}
            ];
        };
        BiometricsModule = __decorate([
            core.NgModule({
                declarations: [
                    BiometricEditComponent
                ],
                imports: [
                    common.CommonModule,
                    material.MatInputModule,
                    material.MatIconModule,
                    material.MatCardModule,
                    material.MatSelectModule,
                    material.MatButtonModule,
                    router.RouterModule.forChild(ROUTES),
                    material.MatProgressBarModule,
                    forms.FormsModule,
                    core$1.CovalentMessageModule,
                    core$1.CovalentDialogsModule,
                    material.MatTableModule,
                    material.MatListModule,
                    adfCore.CoreModule,
                    ngxDatatable.NgxDatatableModule,
                    forms.ReactiveFormsModule,
                    webCore.MatDateFormatModule,
                    ng2Validation.CustomFormsModule
                ],
                exports: [
                    BiometricEditComponent
                ],
                entryComponents: [],
                providers: []
            }),
            __metadata("design:paramtypes", [material.MatIconRegistry,
                platformBrowser.DomSanitizer])
        ], BiometricsModule);
        return BiometricsModule;
    }());

    exports.BiometricService = BiometricService;
    exports.BiometricsModule = BiometricsModule;
    exports.ɵa = BiometricEditComponent;
    exports.ɵb = ROUTES;

    Object.defineProperty(exports, '__esModule', {value: true});

}));
//# sourceMappingURL=lamis-biometrics-1.0.0.umd.js.map
