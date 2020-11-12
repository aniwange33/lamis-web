(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common/http'), require('@lamis/web-core'), require('moment'), require('@stomp/ng2-stompjs'), require('@angular/platform-browser'), require('file-saver'), require('@angular/common'), require('@angular/material'), require('@angular/router'), require('@angular/forms'), require('@syncfusion/ej2-angular-dropdowns'), require('@syncfusion/ej2-angular-calendars')) :
        typeof define === 'function' && define.amd ? define('lamis-reporting-1.0.0', ['exports', '@angular/core', '@angular/common/http', '@lamis/web-core', 'moment', '@stomp/ng2-stompjs', '@angular/platform-browser', 'file-saver', '@angular/common', '@angular/material', '@angular/router', '@angular/forms', '@syncfusion/ej2-angular-dropdowns', '@syncfusion/ej2-angular-calendars'], factory) :
            (global = global || self, factory((global['lamis-reporting-1'] = global['lamis-reporting-1'] || {}, global['lamis-reporting-1']['0'] = global['lamis-reporting-1']['0'] || {}, global['lamis-reporting-1']['0']['0'] = {}), global.ng.core, global.ng.common.http, global.webCore, global.moment_, global.ng2Stompjs, global.ng.platformBrowser, global.fileSaver, global.ng.common, global.ng.material, global.ng.router, global.ng.forms, global.ej2AngularDropdowns, global.ej2AngularCalendars));
}(this, function (exports, core, http, webCore, moment_, ng2Stompjs, platformBrowser, fileSaver, common, material, router, forms, ej2AngularDropdowns, ej2AngularCalendars) {
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

    var moment = moment_;
    var ReportService = /** @class */ (function () {
        function ReportService(http, serverUrl) {
            this.http = http;
            this.serverUrl = serverUrl;
            this.resourceUrl = '';
            this.resourceUrl = serverUrl.SERVER_API_URL + '/api/reporting';
        }

        ReportService.prototype.artSummary = function (reportingPeriod, id, today) {
            var params = new http.HttpParams();
            params = params.append('reportingPeriod', moment(reportingPeriod).format(webCore.DATE_FORMAT));
            params = params.append("id", id.toString());
            params = params.append("today", today.toString());
            return this.http.get(this.resourceUrl + "/art-summary", {params: params, responseType: 'blob'});
        };
        ReportService.prototype.patientLineList = function (params) {
            params.dateCurrentStatusBegin = params.dateCurrentStatusBegin != null && params.dateCurrentStatusBegin.isValid() ? params.dateCurrentStatusBegin.format(webCore.DATE_FORMAT) : null;
            params.dateCurrentStatusEnd = params.dateCurrentStatusEnd != null && params.dateCurrentStatusEnd.isValid() ? params.dateCurrentStatusEnd.format(webCore.DATE_FORMAT) : null;
            params.dateLastViralLoadBegin = params.dateLastViralLoadBegin != null && params.dateLastViralLoadBegin.isValid() ? params.dateLastViralLoadBegin.format(webCore.DATE_FORMAT) : null;
            params.dateLastViralLoadEnd = params.dateLastViralLoadEnd != null && params.dateLastViralLoadEnd.isValid() ? params.dateLastViralLoadEnd.format(webCore.DATE_FORMAT) : null;
            params.dateRegistrationBegin = params.dateRegistrationBegin != null && params.dateRegistrationBegin.isValid() ? params.dateRegistrationBegin.format(webCore.DATE_FORMAT) : null;
            params.dateRegistrationEnd = params.dateRegistrationEnd != null && params.dateRegistrationEnd.isValid() ? params.dateRegistrationEnd.format(webCore.DATE_FORMAT) : null;
            params.dateStartBegin = params.dateStartBegin != null && params.dateStartBegin.isValid() ? params.dateStartBegin.format(webCore.DATE_FORMAT) : null;
            params.dateStartEnd = params.dateStartEnd != null && params.dateStartEnd.isValid() ? params.dateStartEnd.format(webCore.DATE_FORMAT) : null;
            return this.http.post(this.resourceUrl + "/patient-line-list", params, {responseType: 'blob'});
        };
        ReportService.prototype.getRegimenTypes = function () {
            return this.http.get(this.resourceUrl + "/regimen-types");
        };
        ReportService.prototype.getStates = function () {
            return this.http.get('/api/states');
        };
        ReportService.prototype.getLgasByState = function (id) {
            return this.http.get("/api/provinces/state/" + id);
        };
        ReportService.prototype.getActiveFacility = function () {
            return this.http.get('/api/facilities/active');
        };
        ReportService.prototype.listFacilities = function () {
            return this.http.get(this.resourceUrl + "/list-facilities");
        };
        ReportService.prototype.download = function (name) {
            return this.http.get(this.resourceUrl + "/download/" + name, {responseType: 'blob'});
        };
        ReportService.prototype.listFiles = function () {
            return this.http.get(this.resourceUrl + "/list-files");
        };
        ReportService.ctorParameters = function () {
            return [
                {type: http.HttpClient},
                {type: undefined, decorators: [{type: core.Inject, args: [webCore.SERVER_API_URL_CONFIG,]}]}
            ];
        };
        ReportService.ngInjectableDef = core.ɵɵdefineInjectable({
            factory: function ReportService_Factory() {
                return new ReportService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(webCore.SERVER_API_URL_CONFIG));
            }, token: ReportService, providedIn: "root"
        });
        ReportService = __decorate([
            core.Injectable({
                providedIn: 'root'
            }),
            __param(1, core.Inject(webCore.SERVER_API_URL_CONFIG)),
            __metadata("design:paramtypes", [http.HttpClient, Object])
        ], ReportService);
        return ReportService;
    }());

    var ArtSummaryComponent = /** @class */ (function () {
        function ArtSummaryComponent(service, stompService, domSanitizer) {
            this.service = service;
            this.stompService = stompService;
            this.domSanitizer = domSanitizer;
            this.running = false;
            this.message = 'Running';
            this.finished = false;
            this.reportingPeriod = new Date();
            this.today = new Date();
            this.todaySelectable = true;
            this.current = false;
        }

        ArtSummaryComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.service.getActiveFacility().subscribe(function (res) {
                return _this.facility = res;
            });
            this.topicSubscription = this.stompService.watch('/topic/art-summary/status').subscribe(function (msg) {
                if (msg.body === 'start') {
                    _this.running = true;
                } else if (msg.body === 'end') {
                    _this.running = false;
                    _this.finished = true;
                    _this.message = 'Finished';
                    _this.service.listFiles().subscribe(function (res) {
                        _this.files = res;
                    });
                } else {
                    _this.message = msg.body;
                    _this.running = true;
                }
            });
        };
        ArtSummaryComponent.prototype.download = function (name) {
            this.service.download(name).subscribe(function (res) {
                var file = new File([res], name + 'ART Summary Report.pdf', {type: 'application/octet-stream'});
                fileSaver.saveAs(file);
            });
        };
        ArtSummaryComponent.prototype.tabChanged = function (event) {
            var _this = this;
            if (event.index === 1) {
                this.service.listFiles().subscribe(function (res) {
                    _this.files = res;
                });
            }
        };
        ArtSummaryComponent.prototype.monthChanged = function (month) {
            this.todaySelectable = new Date().getMonth() === month.getMonth();
        };
        ArtSummaryComponent.prototype.convert = function () {
            var _this = this;
            this.running = true;
            this.finished = false;
            this.service.artSummary(this.reportingPeriod, this.facility.id, this.current).subscribe(function (res) {
                var file = new File([res], _this.facility.name + '_ART Summary Report.pdf', {type: 'application/octet-stream'});
                fileSaver.saveAs(file);
            });
        };
        ArtSummaryComponent.prototype.ngOnDestroy = function () {
            this.topicSubscription.unsubscribe();
        };
        ArtSummaryComponent.ctorParameters = function () {
            return [
                {type: ReportService},
                {type: ng2Stompjs.RxStompService},
                {type: platformBrowser.DomSanitizer}
            ];
        };
        ArtSummaryComponent = __decorate([
            core.Component({
                selector: 'art-summary',
                template: "<mat-card>\r\n    <mat-card-header class=\"full-width\">\r\n        <ng-container *ngIf=\"running\">\r\n            <div class=\"full-width\">\r\n                <mat-progress-bar class=\"full-width\" mode=\"indeterminate\"></mat-progress-bar>\r\n                <mat-form-field class=\"full-width\">\r\n                    <input [disabled]=\"true\" matInput [value]=\"message\"/>\r\n                </mat-form-field>\r\n            </div>\r\n        </ng-container>\r\n        <ng-container *ngIf=\"finished\">\r\n            <div class=\"full-width\">\r\n                <mat-form-field class=\"full-width\">\r\n                    <input [disabled]=\"true\" matInput [value]=\"message\"/>\r\n                </mat-form-field>\r\n            </div>\r\n        </ng-container>\r\n    </mat-card-header>\r\n    <mat-card-content>\r\n        <div class=\"row\">\r\n            <div class=\"col-md-12\">\r\n                Facility:&nbsp;&nbsp;{{facility?.name}}\r\n            </div>\r\n        </div>\r\n        <div class=\"row\">\r\n            <div class=\"col-md-6\">\r\n                <ejs-datepicker placeholder=\"Select Reporting period\" [start]=\"'Year'\"\r\n                                [format]=\"'MMMM y'\"\r\n                                (valueChangeh)=\"monthChanged($event)\"\r\n                                [(value)]=\"reportingPeriod\"\r\n                                [depth]=\"'Year'\">\r\n                </ejs-datepicker>\r\n            </div>\r\n            <div class=\"col-md-6\">\r\n                <mat-checkbox [(ngModel)]=\"current\" name=\"today\" *ngIf=\"todaySelectable\">As at today</mat-checkbox>\r\n            </div>\r\n        </div>\r\n        <mat-card-actions>\r\n            <button mat-raised-button color=\"primary\"\r\n                    (click)=\"convert()\"\r\n                    [disabled]=\"running || !reportingPeriod || !facility\">Generate Report\r\n            </button>\r\n        </mat-card-actions>\r\n    </mat-card-content>\r\n</mat-card>\r\n\r\n"
            }),
            __metadata("design:paramtypes", [ReportService, ng2Stompjs.RxStompService, platformBrowser.DomSanitizer])
        ], ArtSummaryComponent);
        return ArtSummaryComponent;
    }());

    var moment$1 = moment_;
    var PatientLineListComponent = /** @class */ (function () {
        function PatientLineListComponent(service, stompService) {
            this.service = service;
            this.stompService = stompService;
            this.params = {};
            this.running = false;
            this.finished = false;
            this.today = moment$1();
            this.message = 'Running';
        }

        PatientLineListComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.service.getActiveFacility().subscribe(function (res) {
                _this.facility = res;
                _this.params['facilityId'] = _this.facility.id;
            });
            this.topicSubscription = this.stompService.watch('/topic/patient-line-list/status').subscribe(function (msg) {
                if (msg.body === 'start') {
                    _this.running = true;
                    _this.finished = false;
                    _this.message = 'Running';
                } else if (msg.body === 'end') {
                    _this.running = false;
                    _this.finished = true;
                    _this.message = 'Finished';
                } else {
                    _this.message = msg.body;
                    _this.running = true;
                }
            });
            this.service.getStates().subscribe(function (res) {
                return _this.states = res;
            });
            this.service.getRegimenTypes().subscribe(function (res) {
                return _this.regimenTypes = res;
            });
        };
        PatientLineListComponent.prototype.stateChanged = function (state) {
            var _this = this;
            if (state && state.id) {
                this.service.getLgasByState(state.id).subscribe(function (res) {
                    return _this.lgas = res;
                });
            }
        };
        PatientLineListComponent.prototype.convert = function () {
            var _this = this;
            this.running = true;
            this.service.patientLineList(this.params).subscribe(function (res) {
                var file = new File([res], _this.facility.name + '_Patient_Line_List.pdf', {type: 'application/octet-stream'});
                fileSaver.saveAs(file);
            });
        };
        PatientLineListComponent.prototype.ngOnDestroy = function () {
            this.topicSubscription.unsubscribe();
        };
        PatientLineListComponent.ctorParameters = function () {
            return [
                {type: ReportService},
                {type: ng2Stompjs.RxStompService}
            ];
        };
        PatientLineListComponent = __decorate([
            core.Component({
                selector: 'report-patient-line-list',
                template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <form name=\"form\" role=\"form\" novalidate (ngSubmit)=\"convert()\" #plForm=\"ngForm\">\n            <mat-card class=\"default\">\n                <mat-card-header>\n                    Patient Information Query\n                </mat-card-header>\n                <mat-card-content>\n                    <ng-container *ngIf=\"running\">\n                        <div class=\"full-width\">\n                            <mat-progress-bar class=\"full-width\" mode=\"indeterminate\"></mat-progress-bar>\n                            <mat-form-field class=\"full-width\">\n                                <input [disabled]=\"true\" matInput [value]=\"message\"/>\n                            </mat-form-field>\n                        </div>\n                    </ng-container>\n                    <ng-container *ngIf=\"finished\">\n                        <div class=\"full-width\">\n                            <mat-form-field class=\"full-width\">\n                                <input [disabled]=\"true\" matInput [value]=\"message\"/>\n                            </mat-form-field>\n                        </div>\n                    </ng-container>\n                    <fieldset>\n                        <h5>Demographic filters</h5>\n                        <div class=\"row\">\n                            <div class=\"col-md-6\">\n                                <mat-form-field class=\"full-width\">\n                                    <mat-label>Gender</mat-label>\n                                    <mat-select name=\"gender\" [(ngModel)]=\"params.gender\">\n                                        <mat-option></mat-option>\n                                        <mat-option value=\"MALE\">Male</mat-option>\n                                        <mat-option value=\"FEMALE\">Female</mat-option>\n                                    </mat-select>\n                                </mat-form-field>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-md-12\">\n                                <h5>Age Range</h5>\n                            </div>\n                            <div class=\"col-md-6\">\n                                <mat-form-field class=\"full-width\">\n                                    <mat-label>From</mat-label>\n                                    <input matInput name=\"ageBegin\" type=\"number\" [(ngModel)]=\"params.ageBegin\"/>\n                                </mat-form-field>\n                            </div>\n                            <div class=\"col-md-6\">\n                                <mat-form-field class=\"full-width\">\n                                    <mat-label>To</mat-label>\n                                    <input matInput name=\"ageEnd\" type=\"number\" [(ngModel)]=\"params.ageEnd\"/>\n                                </mat-form-field>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-md-6\">\n                                <mat-form-field class=\"full-width\">\n                                    <mat-label>State</mat-label>\n                                    <mat-select (valueChange)=\"stateChanged($event)\">\n                                        <mat-option></mat-option>\n                                        <mat-option *ngFor=\"let state of states\"\n                                                    [value]=\"state\">{{state.name}}</mat-option>\n                                    </mat-select>\n                                </mat-form-field>\n                            </div>\n                            <div class=\"col-md-6\">\n                                <mat-form-field class=\"full-width\">\n                                    <mat-label>LGA of residence</mat-label>\n                                    <mat-select name=\"lga\" [(ngModel)]=\"params.lgaId\">\n                                        <mat-option></mat-option>\n                                        <mat-option *ngFor=\"let lga of lgas\" [value]=\"lga.id\">{{lga.name}}</mat-option>\n                                    </mat-select>\n                                </mat-form-field>\n                            </div>\n                        </div>\n                    </fieldset>\n                    <fieldset>\n                        <h5>Clinical filters</h5>\n                        <div class=\"row\">\n                            <div class=\"col-md-6\">\n                                <mat-form-field class=\"full-width\">\n                                    <mat-label>Current Status</mat-label>\n                                    <mat-select name=\"currentStatus\" [(ngModel)]=\"params.currentStatus\">\n                                        <mat-option></mat-option>\n                                        <mat-option value=\"HIV_PLUS_NON_ART\">HIV+ non ART</mat-option>\n                                        <mat-option value=\"ART_START\">ART Start</mat-option>\n                                        <mat-option value=\"ART_RESTART\">ART Restart</mat-option>\n                                        <mat-option value=\"ART_TRANSFER_IN\">ART Transfer In</mat-option>\n                                        <mat-option value=\"ART_TRANSFER_OUT\">ART Transfer Out</mat-option>\n                                        <mat-option value=\"PRE_ART_TRANSFER_IN\">Pre-ART Transfer In</mat-option>\n                                        <mat-option value=\"PRE_ART_TRANSFER_OUT\">Pre-ART Transfer Out</mat-option>\n                                        <mat-option value=\"LOST_TO_FOLLOWUP\">Lost to Follow Up</mat-option>\n                                        <mat-option value=\"STOPPED_TREATMENT\">Stopped Treatment</mat-option>\n                                        <mat-option value=\"KNOWN_DEATH\">Known Death</mat-option>\n                                        <mat-option value=\"Currently Active\">Currently Active</mat-option>\n                                    </mat-select>\n                                </mat-form-field>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-md-12\">\n                                <h5>Date of Current Status</h5>\n                            </div>\n                            <div class=\"col-md-6\">\n                                <mat-form-field class=\"full-width\">\n                                    <mat-label>From</mat-label>\n                                    <input matInput [matDatepicker]=\"picker1\"\n                                           [max]=\"today\"\n                                           [(ngModel)]=\"params.dateCurrentStatusBegin\"\n                                           name=\"date1\">\n                                    <mat-datepicker-toggle\n                                            matSuffix\n                                            [for]=\"picker1\">\n                                    </mat-datepicker-toggle>\n                                    <mat-datepicker #picker1></mat-datepicker>\n                                </mat-form-field>\n                            </div>\n                            <div class=\"col-md-6\">\n                                <mat-form-field class=\"full-width\">\n                                    <mat-label>To</mat-label>\n                                    <input matInput [matDatepicker]=\"picker2\"\n                                           [(ngModel)]=\"params.dateCurrentStatusEnd\"\n                                           [max]=\"today\"\n                                           name=\"date2\">\n                                    <mat-datepicker-toggle\n                                            matSuffix\n                                            [for]=\"picker2\">\n                                    </mat-datepicker-toggle>\n                                    <mat-datepicker #picker2></mat-datepicker>\n                                </mat-form-field>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-md-6\">\n                                <mat-form-field class=\"full-width\">\n                                    <mat-label>Regimen Line</mat-label>\n                                    <mat-select name=\"regimenType\" [(ngModel)]=\"params.regimenType\">\n                                        <mat-option></mat-option>\n                                        <mat-option *ngFor=\"let type of regimenTypes\"\n                                                    [value]=\"type.description\">{{type.description}}</mat-option>\n                                    </mat-select>\n                                </mat-form-field>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-md-12\">\n                                <h5>Date of Registration</h5>\n                            </div>\n                            <div class=\"col-md-6\">\n                                <mat-form-field class=\"full-width\">\n                                    <mat-label>From</mat-label>\n                                    <input matInput [matDatepicker]=\"picker3\"\n                                           [max]=\"today\"\n                                           [(ngModel)]=\"params.dateRegistrationBegin\"\n                                           name=\"date3\">\n                                    <mat-datepicker-toggle\n                                            matSuffix\n                                            [for]=\"picker3\">\n                                    </mat-datepicker-toggle>\n                                    <mat-datepicker #picker3></mat-datepicker>\n                                </mat-form-field>\n                            </div>\n                            <div class=\"col-md-6\">\n                                <mat-form-field class=\"full-width\">\n                                    <mat-label>To</mat-label>\n                                    <input matInput [matDatepicker]=\"picker4\"\n                                           [max]=\"today\"\n                                           [(ngModel)]=\"params.dateRegistrationEnd\"\n                                           name=\"date4\">\n                                    <mat-datepicker-toggle\n                                            matSuffix\n                                            [for]=\"picker4\">\n                                    </mat-datepicker-toggle>\n                                    <mat-datepicker #picker4></mat-datepicker>\n                                </mat-form-field>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-md-12\">\n                                <h5>ART Start Date</h5>\n                            </div>\n                            <div class=\"col-md-6\">\n                                <mat-form-field class=\"full-width\">\n                                    <mat-label>From</mat-label>\n                                    <input matInput [matDatepicker]=\"picker5\"\n                                           [max]=\"today\"\n                                           [(ngModel)]=\"params.dateStartBegin\"\n                                           name=\"date5\">\n                                    <mat-datepicker-toggle\n                                            matSuffix\n                                            [for]=\"picker5\">\n                                    </mat-datepicker-toggle>\n                                    <mat-datepicker #picker5></mat-datepicker>\n                                </mat-form-field>\n                            </div>\n                            <div class=\"col-md-6\">\n                                <mat-form-field class=\"full-width\">\n                                    <mat-label>To</mat-label>\n                                    <input matInput [matDatepicker]=\"picker6\"\n                                           [max]=\"today\"\n                                           [(ngModel)]=\"params.dateStartEnd\"\n                                           name=\"date6\">\n                                    <mat-datepicker-toggle\n                                            matSuffix\n                                            [for]=\"picker6\">\n                                    </mat-datepicker-toggle>\n                                    <mat-datepicker #picker6></mat-datepicker>\n                                </mat-form-field>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-md-6\">\n                                <mat-form-field class=\"full-width\">\n                                    <mat-label>Current Clinical Stage</mat-label>\n                                    <mat-select name=\"clinicStage\" [(ngModel)]=\"params.clinicStage\">\n                                        <mat-option></mat-option>\n                                        <mat-option value=\"Stage I\">Stage I</mat-option>\n                                        <mat-option value=\"Stage II\">Stage II</mat-option>\n                                        <mat-option value=\"Stage III\">Stage III</mat-option>\n                                        <mat-option value=\"Stage IV\">Stage IV</mat-option>\n                                    </mat-select>\n                                </mat-form-field>\n                            </div>\n                        </div>\n                        <fieldset>\n                            <h5>Viral Load</h5>\n                            <div class=\"row\">\n                                <div class=\"col-md-12\">\n                                    <h5>Last Viral Load</h5>\n                                </div>\n                                <div class=\"col-md-6\">\n                                    <mat-form-field class=\"full-width\">\n                                        <mat-label>From</mat-label>\n                                        <input matInput name=\"viralLoadBegin\" type=\"number\"\n                                               [(ngModel)]=\"params.viralLoadBegin\"/>\n                                    </mat-form-field>\n                                </div>\n                                <div class=\"col-md-6\">\n                                    <mat-form-field class=\"full-width\">\n                                        <mat-label>To</mat-label>\n                                        <input matInput name=\"viralLoadEnd\" type=\"number\"\n                                               [(ngModel)]=\"params.viralLoadEnd\"/>\n                                    </mat-form-field>\n                                </div>\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col-md-12\">\n                                    <h5>Date of Last Viral Load</h5>\n                                </div>\n                                <div class=\"col-md-6\">\n                                    <mat-form-field class=\"full-width\">\n                                        <mat-label>From</mat-label>\n                                        <input matInput [matDatepicker]=\"picker7\"\n                                               [max]=\"today\"\n                                               [(ngModel)]=\"params.dateLastViralLoadBegin\"\n                                               name=\"date7\">\n                                        <mat-datepicker-toggle\n                                                matSuffix\n                                                [for]=\"picker7\">\n                                        </mat-datepicker-toggle>\n                                        <mat-datepicker #picker7></mat-datepicker>\n                                    </mat-form-field>\n                                </div>\n                                <div class=\"col-md-6\">\n                                    <mat-form-field class=\"full-width\">\n                                        <mat-label>To</mat-label>\n                                        <input matInput [matDatepicker]=\"picker8\"\n                                               [max]=\"today\"\n                                               [(ngModel)]=\"params.dateLastViralLoadEnd\"\n                                               name=\"date8\">\n                                        <mat-datepicker-toggle\n                                                matSuffix\n                                                [for]=\"picker8\">\n                                        </mat-datepicker-toggle>\n                                        <mat-datepicker #picker8></mat-datepicker>\n                                    </mat-form-field>\n                                </div>\n                            </div>\n                        </fieldset>\n                    </fieldset>\n                    <mat-card-actions>\n                        <button mat-raised-button color=\"primary\"\n                                [disabled]=\"running || !facility\">Generate Report\n                        </button>\n                    </mat-card-actions>\n                </mat-card-content>\n            </mat-card>\n        </form>\n    </div>\n</div>\n"
            }),
            __metadata("design:paramtypes", [ReportService, ng2Stompjs.RxStompService])
        ], PatientLineListComponent);
        return PatientLineListComponent;
    }());

    var ɵ0 = {
        title: 'Reports',
        breadcrumb: 'REPORTS'
    }, ɵ1 = {
        breadcrumb: 'ART SUMMARY REPORT',
        title: 'ART Summary Report'
    }, ɵ2 = {
        breadcrumb: 'PATIENT LINE LIST',
        title: 'Patient Line List'
    }, ɵ3 = {
        breadcrumb: 'PATIENT REPORTs',
        title: 'Patient Reports'
    };
    var ROUTES = [
        {
            path: '',
            data: ɵ0,
            children: [
                {
                    path: 'art-summary',
                    component: ArtSummaryComponent,
                    data: ɵ1,
                },
                {
                    path: 'patients',
                    children: [
                        {
                            path: 'line-list',
                            component: PatientLineListComponent,
                            data: ɵ2
                        }
                    ],
                    data: ɵ3
                }
            ]
        }
    ];

    var ReportsModule = /** @class */ (function () {
        function ReportsModule() {
        }

        ReportsModule = __decorate([
            core.NgModule({
                declarations: [
                    ArtSummaryComponent,
                    PatientLineListComponent
                ],
                imports: [
                    common.CommonModule,
                    forms.FormsModule,
                    material.MatInputModule,
                    material.MatIconModule,
                    material.MatDividerModule,
                    material.MatCardModule,
                    material.MatSelectModule,
                    material.MatButtonModule,
                    material.MatTabsModule,
                    material.MatDatepickerModule,
                    router.RouterModule.forChild(ROUTES),
                    material.MatProgressBarModule,
                    material.MatListModule,
                    material.MatCheckboxModule,
                    ej2AngularCalendars.DateRangePickerModule,
                    ej2AngularDropdowns.DropDownListModule,
                    ej2AngularCalendars.DatePickerModule,
                    webCore.MatDateFormatModule
                ],
                exports: [
                    ArtSummaryComponent,
                    PatientLineListComponent
                ],
                providers: []
            })
        ], ReportsModule);
        return ReportsModule;
    }());

    exports.ArtSummaryComponent = ArtSummaryComponent;
    exports.ROUTES = ROUTES;
    exports.ReportService = ReportService;
    exports.ReportsModule = ReportsModule;
    exports.ɵ0 = ɵ0;
    exports.ɵ1 = ɵ1;
    exports.ɵ2 = ɵ2;
    exports.ɵ3 = ɵ3;
    exports.ɵa = PatientLineListComponent;

    Object.defineProperty(exports, '__esModule', {value: true});

}));
//# sourceMappingURL=lamis-reporting-1.0.0.umd.js.map
