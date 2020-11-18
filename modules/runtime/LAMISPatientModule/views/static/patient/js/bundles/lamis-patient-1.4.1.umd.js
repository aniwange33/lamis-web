(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common/http'), require('@lamis/web-core'), require('rxjs/operators'), require('moment'), require('@angular/router'), require('@alfresco/adf-core'), require('@angular/common'), require('@angular/material'), require('@covalent/core'), require('@ng-bootstrap/ng-bootstrap'), require('ng-jhipster'), require('@angular/forms'), require('rxjs'), require('angular-material-formio'), require('ng2-validation')) :
    typeof define === 'function' && define.amd ? define('lamis-patient-1.4.1', ['exports', '@angular/core', '@angular/common/http', '@lamis/web-core', 'rxjs/operators', 'moment', '@angular/router', '@alfresco/adf-core', '@angular/common', '@angular/material', '@covalent/core', '@ng-bootstrap/ng-bootstrap', 'ng-jhipster', '@angular/forms', 'rxjs', 'angular-material-formio', 'ng2-validation'], factory) :
    (global = global || self, factory((global['lamis-patient-1'] = global['lamis-patient-1'] || {}, global['lamis-patient-1']['4'] = global['lamis-patient-1']['4'] || {}, global['lamis-patient-1']['4']['1'] = {}), global.ng.core, global.ng.common.http, global.webCore, global.rxjs.operators, global.moment_, global.ng.router, global.adfCore, global.ng.common, global.ng.material, global.core$1, global.ngBootstrap, global.ngJhipster, global.ng.forms, global.rxjs, global.angularMaterialFormio, global.ng2Validation));
}(this, function (exports, core, http, webCore, operators, moment_, router, adfCore, common, material, core$1, ngBootstrap, ngJhipster, forms, rxjs, angularMaterialFormio, ng2Validation) { 'use strict';

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

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
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
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
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
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
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
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
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
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    var moment = moment_;
    var PatientService = /** @class */ (function () {
        function PatientService(http, serverUrl, authServerProvider) {
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
        PatientService_1 = PatientService;
        PatientService.prototype.create = function (data) {
            var _this = this;
            var patient = this.convertDateFromClient(data);
            return this.http
                .post(this.resourceUrl, patient, { observe: 'response' })
                .pipe(operators.map(function (res) { return _this.convertDateFromServer(res); }));
        };
        PatientService.prototype.update = function (data) {
            var _this = this;
            var patient = this.convertDateFromClient(data);
            return this.http
                .put(this.resourceUrl, patient, { observe: 'response' })
                .pipe(operators.map(function (res) { return _this.convertDateFromServer(res); }), operators.share());
        };
        PatientService.prototype.find = function (id) {
            var _this = this;
            return this.http
                .get(this.resourceUrl + "/" + id, { observe: 'response' })
                .pipe(operators.map(function (res) { return _this.convertDateFromServer(res); }));
        };
        PatientService.prototype.findByUuid = function (id) {
            var _this = this;
            return this.http
                .get(this.resourceUrl + "/by-uuid/" + id, { observe: 'response' })
                .pipe(operators.map(function (res) { return _this.convertDateFromServer(res); }));
        };
        PatientService.prototype.query = function (req) {
            var _this = this;
            var options = webCore.createRequestOption(req);
            return this.http
                .get(this.resourceUrl, { params: options, observe: 'response' })
                .pipe(operators.map(function (res) { return _this.convertDateArrayFromServer(res); }));
        };
        PatientService.prototype.delete = function (id) {
            return this.http.delete(this.resourceUrl + "/" + id, { observe: 'response' });
        };
        PatientService.prototype.getOVCByPatient = function (id) {
            return this.http.get(this.ovcResourceUrl + "/patient/" + id);
        };
        PatientService.prototype.widgets = function (patientId) {
            return this.http.get(this.resourceUrl + "/" + patientId + "/widgets", { observe: 'body' });
        };
        PatientService.prototype.observations = function (patientId) {
            return this.http.get(this.resourceUrl + "/" + patientId + "/observations", {
                observe: 'body'
            });
        };
        PatientService.prototype.activities = function (patientId, detailed) {
            return this.http.get(this.resourceUrl + "/" + patientId + "/activities?full=" + detailed, { observe: 'body' })
                .pipe(operators.map(function (res) {
                res.sort(function (t1, t2) {
                    var d1 = moment(t1.date, 'DD MMM, YYYY');
                    var d2 = moment(t2.date, 'DD MMM, YYYY');
                    return d2.diff(d1);
                });
                return res;
            }));
        };
        PatientService.prototype.getActiveFacility = function () {
            return this.http.get('/api/facilities/active');
        };
        PatientService.prototype.getAllFacility = function () {
            return this.http.get('/api/facilities');
        };
        PatientService.prototype.getStates = function () {
            return this.http.get('/api/states');
        };
        PatientService.prototype.getLgasByState = function (id) {
            return this.http.get("/api/provinces/state/" + id);
        };
        PatientService.prototype.getStateByLga = function (id) {
            return this.http.get("/api/provinces/" + id + "/state");
        };
        PatientService.prototype.getFacility = function (id) {
            return this.http.get("/api/facilities/" + id);
        };
        PatientService.prototype.existsByHospitalNumber = function (hospitalNum) {
            return this.http.post(this.resourceUrl + "/exists/hospital-number", { number: hospitalNum })
                .pipe(operators.map((function (res) { return res ? { 'numberExists': true } : null; })));
        };
        PatientService.prototype.getStatusDatesByPatient = function (patientId) {
            return this.http.get("/api/client-statuses/patient/" + patientId + "/status-dates")
                .pipe(operators.map(function (res) {
                res.forEach(function (d) { return moment(d); });
                return res;
            }));
        };
        PatientService.prototype.getSummaryForPatient = function (id) {
            return this.http.get(this.resourceUrl + "/" + id + "/summary");
        };
        PatientService.prototype.saveClientStatus = function (status) {
            console.log('Status', status);
            var copy = PatientService_1.convertStatusFromClient(status);
            console.log('Copy', copy);
            return this.http.post('/api/client-statuses', copy, { observe: 'response' });
        };
        PatientService.prototype.updateClientStatus = function (status) {
            var copy = PatientService_1.convertStatusFromClient(status);
            return this.http.put('/api/client-statuses', copy, { observe: 'response' });
        };
        PatientService.prototype.findClientStatus = function (id) {
            return this.http.get("/api/client-statuses/by-uuid/" + id, { observe: 'response' })
                .pipe(operators.map(function (res) {
                res.body.dateTracked = res.body.dateTracked != null ? moment(res.body.dateTracked) : null;
                res.body.dateStatus = res.body.dateStatus != null ? moment(res.body.dateStatus) : null;
                res.body.agreedDate = res.body.agreedDate != null ? moment(res.body.agreedDate) : null;
                return res;
            }));
        };
        PatientService.prototype.currentClientStatus = function (patientId) {
            return this.http.get("/api/client-statuses/patient/" + patientId + "/current", { responseType: 'text' });
        };
        PatientService.prototype.getStatusName = function (id) {
            return this.http.get("/api/client-statuses/" + id + "/name", { responseType: 'text' });
        };
        PatientService.convertStatusFromClient = function (status) {
            var copy = Object.assign({}, status, {
                dateStatus: status.dateStatus != null && status.dateStatus.isValid() ? status.dateStatus.format(webCore.DATE_FORMAT) : null,
                agreedDate: status.agreedDate != null && status.agreedDate.isValid() ? status.agreedDate.format(webCore.DATE_FORMAT) : null,
                dateTracked: status.dateTracked != null && status.dateTracked.isValid() ? status.dateTracked.format(webCore.DATE_FORMAT) : null,
            });
            return copy;
        };
        PatientService.prototype.convertDateFromClient = function (patient) {
            var copy = Object.assign({}, patient, {
                dateBirth: patient.dateBirth != null && patient.dateBirth.isValid() ? patient.dateBirth.format(webCore.DATE_FORMAT) : null,
                dateRegistration: patient.dateRegistration != null && patient.dateRegistration.isValid() ? patient.dateRegistration.format(webCore.DATE_FORMAT) : null,
                dateStarted: patient.dateStarted != null && patient.dateStarted.isValid() ? patient.dateStarted.format(webCore.DATE_FORMAT) : null,
                dateConfirmedHiv: patient.dateConfirmedHiv != null && patient.dateConfirmedHiv.isValid() ? patient.dateConfirmedHiv.format(webCore.DATE_FORMAT) : null,
                dateEnrolledPMTCT: patient.dateEnrolledPMTCT != null && patient.dateEnrolledPMTCT.isValid() ? patient.dateEnrolledPMTCT.format(webCore.DATE_FORMAT) : null,
                pregnant: patient.pregnancyStatus === 2,
                breastfeeding: patient.pregnancyStatus === 3
            });
            return copy;
        };
        PatientService.prototype.convertDateFromServer = function (res) {
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
        };
        PatientService.prototype.convertDateArrayFromServer = function (res) {
            if (res.body) {
                res.body.forEach(function (patient) {
                    patient.name = patient.surname + ', ' + patient.otherNames;
                    patient.dateBirth = patient.dateBirth != null ? moment(patient.dateBirth) : null;
                    patient.dateRegistration = patient.dateRegistration != null ? moment(patient.dateRegistration) : null;
                    patient.dateStarted = patient.dateStarted != null ? moment(patient.dateStarted) : null;
                });
            }
            return res;
        };
        var PatientService_1;
        PatientService.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: undefined, decorators: [{ type: core.Inject, args: [webCore.SERVER_API_URL_CONFIG,] }] },
            { type: webCore.AuthServerProvider }
        ]; };
        PatientService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function PatientService_Factory() { return new PatientService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(webCore.SERVER_API_URL_CONFIG), core.ɵɵinject(webCore.AuthServerProvider)); }, token: PatientService, providedIn: "root" });
        PatientService = PatientService_1 = __decorate([
            core.Injectable({ providedIn: 'root' }),
            __param(1, core.Inject(webCore.SERVER_API_URL_CONFIG)),
            __metadata("design:paramtypes", [http.HttpClient, Object, webCore.AuthServerProvider])
        ], PatientService);
        return PatientService;
    }());

    var PatientListComponent = /** @class */ (function () {
        function PatientListComponent(patientService, notification, router, activatedRoute) {
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
        PatientListComponent.prototype.ngOnDestroy = function () {
        };
        PatientListComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.patientService.getActiveFacility().subscribe(function (res) {
                _this.facility = res;
                _this.onPageChange(0);
            });
        };
        PatientListComponent.prototype.searchPatient = function (search) {
            this.currentSearch = search;
            this.page = 0;
            this.loadAll();
        };
        PatientListComponent.prototype.select = function (data) {
            if (!!this.path) {
                this.router.navigateByUrl(this.path + "/" + data.obj.uuid);
            }
            else {
                this.router.navigate(['..', 'patients', data.obj.uuid, 'view'], { relativeTo: this.activatedRoute });
            }
        };
        PatientListComponent.prototype.onPageChange = function (pageInfo) {
            this.page = pageInfo;
            this.loadAll();
        };
        PatientListComponent.prototype.loadPage = function (page) {
            this.loadAll();
        };
        PatientListComponent.prototype.loadAll = function () {
            var _this = this;
            this.loading = true;
            this.patientService.query({
                keyword: this.currentSearch,
                page: this.page > 0 ? this.page - 1 : 0,
                facilityId: this.facility.id || 0,
                size: this.itemsPerPage,
                sort: ['id', 'asc']
            }).subscribe(function (res) {
                _this.onSuccess(res.body, res.headers);
            }, function (res) { return _this.onError(res); });
        };
        PatientListComponent.prototype.onSuccess = function (data, headers) {
            this.patients = data;
            this.totalItems = headers.get('X-Total-Count');
            this.loading = false;
        };
        PatientListComponent.prototype.onError = function (error) {
            this.notification.openSnackMessage(error.message);
            this.loading = false;
        };
        PatientListComponent.ctorParameters = function () { return [
            { type: PatientService },
            { type: adfCore.NotificationService },
            { type: router.Router },
            { type: router.ActivatedRoute }
        ]; };
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], PatientListComponent.prototype, "path", void 0);
        PatientListComponent = __decorate([
            core.Component({
                selector: 'lamis-patients',
                template: "<div class=\"layout\">\n    <div class=\"list-container\">\n        <div class=\"row\">\n            <div class=\"col-md-8 col-md-offset-4\">\n                <div class=\"adf-toolbar--spacer\"></div>\n                <td-search-box backIcon=\"arrow_back\" class=\"push-right-sm\"\n                               placeholder=\"Search here\" [debounce]=\"500\"\n                               [(ngModel)]=\"currentSearch\"\n                               (searchDebounce)=\"searchPatient($event)\"\n                               (search)=\"searchPatient($event)\"\n                               (clear)=\"currentSearch = ''\" flex>\n                </td-search-box>\n            </div>\n        </div>\n        <br/>\n        <adf-datatable *ngIf=\"patients\"\n                       [rows]=\"patients\"\n                       [loading]=\"loading\"\n                       [display]=\"display\"\n                       (rowClick)=\"select($event.value)\">\n            <data-columns>\n                <data-column key=\"name\" title=\"Name\" sortable=\"true\"></data-column>\n                <data-column key=\"hospitalNum\" title=\"Hospital Number\" sortable=\"true\"></data-column>\n                <data-column key=\"uniqueId\" title=\"Unique ID\" sortable=\"true\"></data-column>\n                <data-column key=\"gender\" title=\"Gender\" sortable=\"true\">\n                    <ng-template let-context=\"$implicit\">\n                        {{context.row.getValue('gender') === 'MALE' ? 'Male' : 'Female'}}\n                    </ng-template>\n                </data-column>\n                <data-column key=\"status\" title=\"Current Status\" sortable=\"true\"></data-column>\n                <data-column key=\"phone\" title=\"Telephone Number\" sortable=\"true\"></data-column>\n                <data-column key=\"address\" title=\"Address\" class=\"full-width ellipsis-cell\"></data-column>\n            </data-columns>\n            <adf-loading-content-template>\n                <ng-template>\n                    <mat-progress-spinner\n                            class=\"adf-document-list-loading-margin\"\n                            [color]=\"'primary'\"\n                            [mode]=\"'indeterminate'\">\n                    </mat-progress-spinner>\n                </ng-template>\n            </adf-loading-content-template>\n        </adf-datatable>\n    </div>\n    <adf-empty-content\n            *ngIf=\"!patients\"\n            icon=\"blur_on\"\n            [title]=\"'No Patients found'\"\n            [subtitle]=\"'No Patients matching search criteria or no Patients available'\">\n    </adf-empty-content>\n    <ngb-pagination [collectionSize]=\"totalItems\"\n                    [(page)]=\"page\"\n                    [pageSize]=\"itemsPerPage\"\n                    [maxSize]=\"5\"\n                    size=\"sm\"\n                    [rotate]=\"true\"\n                    [boundaryLinks]=\"true\"\n                    (pageChange)=\"loadPage(page)\">\n    </ngb-pagination>\n\n</div>\n<div class=\"fab-container\">\n    <button mat-fab\n            [matTooltip]=\"'Register New Patient'\"\n            [routerLink]=\"['new']\">\n        <mat-icon>add</mat-icon>\n    </button>\n</div>\n"
            }),
            __metadata("design:paramtypes", [PatientService,
                adfCore.NotificationService,
                router.Router,
                router.ActivatedRoute])
        ], PatientListComponent);
        return PatientListComponent;
    }());

    var moment$1 = moment_;
    var PatientDetailsComponent = /** @class */ (function () {
        function PatientDetailsComponent(router, route, patientService, cfr, _dialogService, notificationService, _viewContainerRef, renderer2) {
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
        PatientDetailsComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.route.data.subscribe(function (_a) {
                var entity = _a.entity;
                _this.entity = !!entity && entity.body ? entity.body : entity;
                _this.patientService.currentClientStatus(entity.uuid).subscribe(function (res) {
                    _this.status = res;
                });
                _this.attacheWidgets();
                _this.getObservations();
            });
        };
        PatientDetailsComponent.prototype.edit = function () {
            this.router.navigate(['..', 'edit'], { relativeTo: this.route });
        };
        PatientDetailsComponent.prototype.updateStatus = function () {
            this.router.navigate(['/', 'client-statuses', 'patient', this.entity.uuid, 'new']);
        };
        PatientDetailsComponent.prototype.delete = function () {
            var _this = this;
            this._dialogService.openConfirm({
                title: 'Confirm',
                message: 'Do you want to delete this patient, action cannot be reversed?',
                cancelButton: 'No',
                acceptButton: 'Yes',
                width: '500px',
            }).afterClosed().subscribe(function (accept) {
                if (accept) {
                    _this.patientService.delete(_this.entity.id).subscribe(function (res) {
                        if (res.ok) {
                            _this.router.navigate(['patients']);
                        }
                        else {
                            _this.notificationService.showError('Error deleting patient, please try again');
                        }
                    });
                }
                else {
                    // DO SOMETHING ELSE
                }
            });
        };
        PatientDetailsComponent.prototype.previousState = function () {
            window.history.back();
        };
        PatientDetailsComponent.prototype.getComponentFactory = function (name) {
            var factories = Array.from(this.cfr['_factories'].values());
            return factories.find(function (x) { return x.componentType.name === name; });
        };
        PatientDetailsComponent.prototype.getObservations = function () {
            var _this = this;
            this.patientService.observations(this.entity.id).subscribe(function (res) { return _this.observations = res; });
        };
        PatientDetailsComponent.prototype.addObservation = function (action) {
            var path = action.path.split('/');
            var parts = ['/'];
            parts.push.apply(parts, __spread(path));
            parts.push('patient', this.entity.uuid, 'new');
            this.router.navigate(__spread(parts));
        };
        PatientDetailsComponent.prototype.attacheWidgets = function () {
            this.buildWidget('TimelineComponent', 'Recent Activities', 'timeline');
            this.buildWidget('SummaryWidgetComponent', 'Patient Summary', 'account_balance_wallet');
            /*this.patientService.widgets(this.entity.id).subscribe((res: PatientWidget[]) => {
                res.forEach((widget: PatientWidget) => {
                    this.buildWidget(widget.componentName, widget.title, widget.icon);
                })
            });*/
        };
        PatientDetailsComponent.prototype.ngOnDestroy = function () {
        };
        PatientDetailsComponent.prototype.buildWidget = function (componentName, title, icon) {
            var factory = this.getComponentFactory(componentName);
            if (factory !== undefined) {
                var parentFactory = this.getComponentFactory('WidgetContainerComponent');
                var componentRef = this.container.createComponent(parentFactory);
                if (!componentRef.instance.embeddedContainer) {
                    var cmpName = componentRef.instance.constructor.name;
                    throw new TypeError("Trying to render embedded content. " + cmpName + " must have @ViewChild() embeddedContainer defined");
                }
                console.log('Created component', componentRef);
                var instanceRef = componentRef.instance.embeddedContainer.createComponent(factory);
                this.renderer2.addClass(componentRef.location.nativeElement, 'col-md-6');
                componentRef.instance.icon = icon;
                componentRef.instance.title = title;
                try {
                    instanceRef.instance.patientId = this.entity.id;
                    instanceRef.instance.patientUuid = this.entity.uuid;
                }
                catch (e) {
                }
            }
        };
        PatientDetailsComponent.prototype.age = function (dob) {
            var age = moment$1().diff(dob, 'years');
            if (age > 0) {
                return age + ' year(s)';
            }
            age = moment$1().diff(dob, 'months');
            if (age > 0) {
                return age + ' month(s)';
            }
            return moment$1().diff(dob, 'weeks') + ' week(s)';
        };
        PatientDetailsComponent.ctorParameters = function () { return [
            { type: router.Router },
            { type: router.ActivatedRoute },
            { type: PatientService },
            { type: core.ComponentFactoryResolver },
            { type: core$1.TdDialogService },
            { type: adfCore.NotificationService },
            { type: core.ViewContainerRef },
            { type: core.Renderer2 }
        ]; };
        __decorate([
            core.ViewChild('container', { read: core.ViewContainerRef, static: true }),
            __metadata("design:type", core.ViewContainerRef)
        ], PatientDetailsComponent.prototype, "container", void 0);
        PatientDetailsComponent = __decorate([
            core.Component({
                selector: 'lamis-patient',
                template: "<div>\n    <mat-card>\n        <mat-card class=\"dark-blue-100 full-width\">\n            <mat-card-content>\n                <div class=\"row\">\n                    <div class=\"col-md-9\">\n                        <div class=\"row\">\n                            <mat-form-field class=\"col-md-3\">\n                                <mat-label>Surname</mat-label>\n                                <input matInput [value]=\"entity.surname\" disabled style=\"font-weight: 900\">\n                            </mat-form-field>\n                            <mat-form-field class=\"col-md-3\">\n                                <mat-label>Other Names</mat-label>\n                                <input matInput [value]=\"entity.otherNames\" disabled style=\"font-weight: 900\">\n                            </mat-form-field>\n                            <div class=\"col-md-1\"></div>\n                            <div class=\"col-md-3\">\n                                <span style=\"font-size: 12px\">\n                                    {{entity.gender === 'FEMALE' ? 'Female' : 'Male'}} {{age(entity.dateBirth)}}\n                                    ({{entity.dateBirth | date: 'dd MMM, yyyy'}})\n                                </span>\n                            </div>\n                            <mat-form-field class=\"col-md-2\">\n                                <mat-label>Hospital Number</mat-label>\n                                <input matInput [value]=\"entity.hospitalNum\" disabled style=\"font-weight: 900\">\n                            </mat-form-field>\n                        </div>\n                        <div class=\"row\">\n                            <mat-form-field class=\"col-md-8\">\n                                <mat-label>Address</mat-label>\n                                <input matInput [value]=\"entity.address\" disabled style=\"font-weight: 800\">\n                            </mat-form-field>\n                            <mat-form-field class=\"col-md-4\">\n                                <mat-label>Telephone Number</mat-label>\n                                <input matInput [value]=\"entity.phone || ' '\" disabled style=\"font-weight: 700\">\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div class=\"col-md-3\">\n                        <mat-form-field class=\"col-md-12\">\n                            <mat-label>Current Status</mat-label>\n                            <input matInput [value]=\"status\" disabled style=\"font-weight: 800\">\n                        </mat-form-field>\n                        <a (click)=\"previousState()\" class=\"dark-blue-200\">BACK</a>\n                    </div>\n                </div>\n            </mat-card-content>\n        </mat-card>\n        <div class=\"\">\n            <div class=\"row\">\n                <div class=\"col-md-9\">\n                    <div class=\"row\">\n                        <div #container></div>\n                    </div>\n                </div>\n                <div class=\"col-md-3\">\n                    <mat-card class=\"dark-blue-200\">\n                        <mat-card-header>\n                            General Actions\n                        </mat-card-header>\n                        <mat-divider></mat-divider>\n                        <mat-card-content>\n                            <mat-nav-list>\n                                <mat-list-item *ngFor=\"let action of observations\">\n                                    <mat-icon mat-list-icon>{{action.icon || 'dashboard'}}</mat-icon>\n                                    <a mat-line matTooltip=\"{{action.tooltip || ''}}\"\n                                       (click)=\"addObservation(action)\">{{action.name}}</a>\n                                </mat-list-item>\n                                <mat-list-item>\n                                    <mat-icon mat-list-icon>edit</mat-icon>\n                                    <a mat-line matTooltip=\"Update Patient Status\" (click)=\"updateStatus()\">Update\n                                        Client Status</a>\n                                </mat-list-item>\n                                <mat-list-item>\n                                    <mat-icon mat-list-icon>edit</mat-icon>\n                                    <a mat-line matTooltip=\"Edit Patient registration information\"\n                                       (click)=\"edit()\">Edit Registration\n                                        Information</a>\n                                </mat-list-item>\n                                <mat-list-item>\n                                    <mat-icon mat-list-icon>delete</mat-icon>\n                                    <a mat-line matTooltip=\"Delete patient\" (click)=\"delete()\">Delete Patient</a>\n                                </mat-list-item>\n                            </mat-nav-list>\n                        </mat-card-content>\n                    </mat-card>\n                </div>\n            </div>\n        </div>\n    </mat-card>\n</div>\n",
                styles: [".bold{font-weight:700}"]
            }),
            __metadata("design:paramtypes", [router.Router, router.ActivatedRoute, PatientService,
                core.ComponentFactoryResolver, core$1.TdDialogService,
                adfCore.NotificationService, core.ViewContainerRef,
                core.Renderer2])
        ], PatientDetailsComponent);
        return PatientDetailsComponent;
    }());

    var moment$2 = moment_;
    var PatientEditComponent = /** @class */ (function () {
        function PatientEditComponent(patientService, notification, loaderService, _dialogService, activatedRoute) {
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
        PatientEditComponent.prototype.createEntity = function () {
            return {};
        };
        PatientEditComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.patientService.getActiveFacility().subscribe(function (res) {
                _this.entity.facility = res;
            });
            this.isSaving = false;
            this.activatedRoute.data.subscribe(function (_a) {
                var entity = _a.entity;
                _this.entity = !!entity && entity.body ? entity.body : entity;
                if (_this.entity === undefined) {
                    _this.entity = _this.createEntity();
                    _this.entity.extra = {
                        art: true
                    };
                }
                if (_this.entity.id) {
                    _this.ovcMin = _this.entity.dateBirth.clone();
                }
                if (_this.entity.id && _this.entity.lga) {
                    _this.minDateRegistration = _this.entity.dateBirth.clone().add(2, 'month');
                    _this.minDateConfirmed = _this.entity.dateBirth.clone().add(1, 'month');
                    _this.patientService.getStateByLga(_this.entity.lga.id).subscribe(function (res) {
                        _this.state = res;
                        _this.stateChange(_this.state.id);
                    });
                }
                if (_this.entity.extra) {
                    _this.targetGroup = _this.entity.extra.targetGroup;
                }
                if (_this.entity.extra && _this.entity.extra.prep) {
                    _this.prep = true;
                    _this.indicationForPrep = _this.entity.extra.prep.indicationForPrep;
                    _this.prepId = _this.entity.extra.prep.prepId;
                    _this.onDemandIndication = _this.entity.extra.prep.onDemandIndication;
                }
                if (_this.entity.extra && _this.entity.extra.ovc) {
                    _this.ovc.householdUniqueNo = _this.entity.extra.ovc.householdUniqueNo;
                    _this.ovc.referredTo = _this.entity.extra.ovc.referredTo;
                    _this.ovc.referredFrom = _this.entity.extra.ovc.referredFrom;
                    if (!!_this.entity.extra.ovc.dateReferredTo) {
                        _this.ovc.dateReferredTo = moment$2(_this.entity.extra.ovc.dateReferredTo);
                    }
                    if (!!_this.entity.extra.ovc.dateReferredFrom) {
                        _this.ovc.dateReferredFrom = moment$2(_this.entity.extra.ovc.dateReferredFrom);
                    }
                    if (!_this.entity.extra.ovc.servicesProvided) {
                        _this.ovc.servicesProvided = [];
                    }
                }
                var date = _this.entity.dateBirth && _this.entity.dateBirth.clone() || moment$2('1998-01-01', 'YYYY-MM-DD');
                if (!moment$2().subtract(17, 'years').isAfter(date)) {
                    _this.ovcApplicable = true;
                }
                _this.patientForm.form.setErrors({ 'invalid': true });
                _this.patientForm.form.markAllAsTouched();
            });
            this.patientService.getStates().subscribe(function (res) { return _this.states = res; });
        };
        PatientEditComponent.prototype.entityCompare = function (e1, e2) {
            return webCore.entityCompare(e1, e2);
        };
        PatientEditComponent.prototype.estimateDob = function () {
            if (this.age && this.ageUnit && this.entity.dateRegistration) {
                var dateRegistration = this.entity.dateRegistration;
                this.entity.dateBirth = dateRegistration.clone().subtract(this.age, this.ageUnit);
                this.ovcMin = this.entity.dateBirth.clone();
                this.minDateConfirmed = this.entity.dateBirth.clone().add(1, 'months');
                this.ovcApplicable = !this.entity.dateRegistration.clone().subtract(17, 'years').isAfter(this.entity.dateBirth);
            }
        };
        PatientEditComponent.prototype.stateChange = function (id) {
            var _this = this;
            this.patientService.getLgasByState(id).subscribe(function (res) { return _this.lgas = res; });
        };
        PatientEditComponent.prototype.statusChanged = function () {
            this.prep = this.entity.statusAtRegistration === 'HIV_NEGATIVE';
            if (this.prep) {
                this.entity.extra['art'] = false;
                this.entity.extra.prep = {
                    registered: true
                };
            }
            else {
                this.entity.extra['art'] = true;
                this.entity.extra.prep = {
                    registered: false
                };
            }
        };
        PatientEditComponent.prototype.previousState = function () {
            window.history.back();
        };
        PatientEditComponent.prototype.dateBirthChanged = function (date) {
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
        };
        PatientEditComponent.prototype.dateRegistrationChanged = function (date) {
            this.maxDateBirth = date.clone().subtract(2, 'months');
            this.maxDateConfirmed = date.clone();
            if (!!this.entity.dateBirth) {
                this.ovcApplicable = !this.entity.dateRegistration.clone().subtract(17, 'years').isAfter(this.entity.dateBirth);
            }
        };
        PatientEditComponent.prototype.save = function () {
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
            }
            else {
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
                    this.ovc.dateReferredFrom.format(webCore.DATE_FORMAT) : null;
                this.entity.extra.ovc.dateReferredTo = this.ovc.dateReferredTo != null && this.ovc.dateReferredTo.isValid() ?
                    this.ovc.dateReferredTo.format(webCore.DATE_FORMAT) : null;
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
            if (this.targetGroup) {
                this.entity.extra.targetGroup = this.targetGroup;
            }
            this.loaderService.open('Saving patient...');
            if (!this.entity.id) {
                if (this.entity.dobEstimated) {
                    this.entity.dateBirth = this.entity.dateRegistration.clone().subtract(this.age, this.ageUnit);
                }
                this.subscribeToSaveResponse(this.patientService.create(this.entity));
            }
            else {
                this.subscribeToSaveResponse(this.patientService.update(this.entity));
            }
        };
        PatientEditComponent.prototype.subscribeToSaveResponse = function (result) {
            var _this = this;
            this.loaderService.close();
            result.subscribe(function (res) { return _this.onSaveSuccess(res.body); }, function (res) {
                _this.onSaveError();
                _this.onError(res.message);
            });
        };
        PatientEditComponent.prototype.onSaveSuccess = function (result) {
            this.isSaving = false;
            this.notification.showInfo('Patient successfully saved');
            this.previousState();
        };
        PatientEditComponent.prototype.onSaveError = function () {
            this.isSaving = false;
            this.error = true;
            //this.progressBar.mode = 'determinate';
        };
        PatientEditComponent.prototype.onError = function (errorMessage) {
            this.notification.showError(errorMessage);
        };
        PatientEditComponent.prototype.isOVCAge = function () {
            if (this.age && this.ageUnit === 'years') {
                if (this.age >= 10 && this.age <= 24) {
                    return true;
                }
            }
            var dob = this.entity.dateBirth.clone();
            var diff = this.entity.dateRegistration.clone().diff(dob);
            return diff >= 10 && diff <= 24;
        };
        PatientEditComponent.ctorParameters = function () { return [
            { type: PatientService },
            { type: adfCore.NotificationService },
            { type: webCore.AppLoaderService },
            { type: core$1.TdDialogService },
            { type: router.ActivatedRoute }
        ]; };
        __decorate([
            core.ViewChild('patientForm', { static: true }),
            __metadata("design:type", forms.NgForm)
        ], PatientEditComponent.prototype, "patientForm", void 0);
        PatientEditComponent = __decorate([
            core.Component({
                selector: 'lamis-patient-edit',
                template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <form name=\"form\" role=\"form\" novalidate (ngSubmit)=\"save()\" #patientForm=\"ngForm\">\n            <mat-card class=\"default\">\n                <mat-card-content>\n                    <mat-divider></mat-divider>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Hospital Number</mat-label>\n                                <input matInput [(ngModel)]=\"entity.hospitalNum\" #hospitalNum=\"ngModel\"\n                                       [required]=\"!entity.id\"\n                                       uniqueHospitalNum\n                                       [disabled]=\"!!entity.id\"\n                                       name=\"hospitalNum\"/>\n                                <mat-error\n                                        *ngIf=\"hospitalNum.errors && (hospitalNum.dirty || hospitalNum.touched) && (hospitalNum.errors.required)\">\n                                    Hospital Number is required\n                                </mat-error>\n                                <mat-error\n                                        *ngIf=\"hospitalNum.errors && (hospitalNum.dirty || hospitalNum.touched) && (hospitalNum.errors.numberExists)\">\n                                    Hospital Number is used by another patient\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Unique ID</mat-label>\n                                <input matInput [(ngModel)]=\"entity.uniqueId\" name=\"uniqueId\"/>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\" *ngIf=\"!!minDateRegistration\">\n                            <mat-form-field class=\"full-width\">\n                                <input matInput [matDatepicker]=\"picker\"\n                                       placeholder=\"Date of Registration/Transfer-In\"\n                                       [(ngModel)]=\"entity.dateRegistration\"\n                                       #registration=\"ngModel\"\n                                       [max]=\"today\"\n                                       [min]=\"minDateRegistration\"\n                                       (dateChange)=\"dateRegistrationChanged($event.value)\"\n                                       name=\"registration\"\n                                       required>\n                                <mat-datepicker-toggle\n                                        matSuffix\n                                        [for]=\"picker\">\n                                </mat-datepicker-toggle>\n                                <mat-datepicker #picker></mat-datepicker>\n                                <mat-error\n                                        *ngIf=\"registration.errors && (registration.dirty || registration.touched || !!entity.id) && (registration.errors.required)\">\n                                    Date of Registration is required\n                                </mat-error>\n                                <mat-error\n                                        *ngIf=\"registration.errors && (registration.dirty || registration.touched || !!entity.id) && (registration.errors.min)\">\n                                    Date of Registration cannot be before {{minDateRegistration | date: 'dd MMM, yyyy'}}\n                                </mat-error>\n                                <mat-error\n                                        *ngIf=\"registration.errors && (registration.dirty || registration.touched || !!entity.id) && (registration.errors.max)\">\n                                    Date of Registration cannot be in the future\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Surname</mat-label>\n                                <input matInput [(ngModel)]=\"entity.surname\" #sn=\"ngModel\"\n                                       required\n                                       [minLength]=\"2\"\n                                       name=\"sn\"/>\n                                <mat-error\n                                        *ngIf=\"sn.errors && (sn.dirty || sn.touched || !!entity.id) && (sn.errors.required)\">\n                                    Surname is required\n                                </mat-error>\n                                <mat-error\n                                        *ngIf=\"sn.errors && (sn.dirty || sn.touched || !!entity.id) && (sn.errors.minLength)\">\n                                    Minimum length for Surname is 2 characters\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Other Names</mat-label>\n                                <input matInput [(ngModel)]=\"entity.otherNames\" #on=\"ngModel\"\n                                       required\n                                       [minLength]=\"5\"\n                                       name=\"on\"/>\n                                <mat-error\n                                        *ngIf=\"on.errors && (on.dirty || on.touched || !!entity.id) && (on.errors.required)\">\n                                    Other Names required\n                                </mat-error>\n                                <mat-error\n                                        *ngIf=\"on.errors && (on.dirty || on.touched || !!entity.id) && (on.errors.minLength)\">\n                                    Minimum length for Other Names is 5 characters\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div *ngIf=\"!entity.id\">\n                        <fieldset>\n                            <div class=\"row\">\n                                <div class=\"col-md-6\">\n                                    <mat-checkbox [(ngModel)]=\"entity.dobEstimated\" name=\"est\">Age Estimated?\n                                    </mat-checkbox>\n                                </div>\n                                <div class=\"col-md-6\">\n                                    <div *ngIf=\"entity.dobEstimated\" class=\"row\">\n                                        <div class=\"col-md-6\">\n                                            <mat-form-field class=\"full-width\">\n                                                <mat-label>Age at Registration</mat-label>\n                                                <input matInput [(ngModel)]=\"age\" required\n                                                       [min]=\"2\"\n                                                       [max]=\"70\"\n                                                       (change)=\"estimateDob()\"\n                                                       name=\"age\" #age1=\"ngModel\">\n                                                <mat-error\n                                                        *ngIf=\"age1.errors && (age1.dirty || age1.touched) && (age1.errors.min)\">\n                                                    Minimum age is 2\n                                                </mat-error>\n                                                <mat-error\n                                                        *ngIf=\"age1.errors && (age1.dirty || age1.touched) && (age1.errors.max)\">\n                                                    Maximum age is 70\n                                                </mat-error>\n                                                <mat-error\n                                                        *ngIf=\"age1.errors && (age1.dirty || age1.touched) && (age1.errors.required)\">\n                                                    Estimated age is required\n                                                </mat-error>\n                                            </mat-form-field>\n                                        </div>\n                                        <div class=\"col-md-6\">\n                                            <mat-form-field class=\"full-width\">\n                                                <mat-label>Age Units</mat-label>\n                                                <mat-select [(ngModel)]=\"ageUnit\"\n                                                            (selectionChange)=\"estimateDob()\"\n                                                            required name=\"units\" #units=\"ngModel\">\n                                                    <mat-option></mat-option>\n                                                    <mat-option [value]=\"'years'\">Year(s)</mat-option>\n                                                    <mat-option [value]=\"'months'\">Month(s)</mat-option>\n                                                </mat-select>\n                                                <mat-error\n                                                        *ngIf=\"units.errors && (units.dirty || units.touched) && (units.errors.required)\">\n                                                    Age units is required\n                                                </mat-error>\n                                            </mat-form-field>\n                                        </div>\n                                    </div>\n                                    <div>\n                                        <mat-form-field class=\"full-width\" *ngIf=\"!entity.dobEstimated\">\n                                            <input matInput [matDatepicker]=\"picker1\"\n                                                   placeholder=\"Date of Birth\"\n                                                   [(ngModel)]=\"entity.dateBirth\"\n                                                   [min]=\"minDob\"\n                                                   (dateChange)=\"dateBirthChanged($event.value)\"\n                                                   required\n                                                   [max]=\"maxDateBirth\"\n                                                   #dob1=\"ngModel\"\n                                                   name=\"dob\">\n                                            <mat-datepicker-toggle\n                                                    matSuffix\n                                                    [for]=\"picker1\">\n                                            </mat-datepicker-toggle>\n                                            <mat-datepicker #picker1></mat-datepicker>\n                                            <mat-error\n                                                    *ngIf=\"dob1.errors && (dob1.dirty || dob1.touched) && (dob1.errors.required)\">\n                                                Date of Birth is required\n                                            </mat-error>\n                                        </mat-form-field>\n                                    </div>\n                                </div>\n                            </div>\n                        </fieldset>\n                    </div>\n                    <div *ngIf=\"entity.id\">\n                        <div class=\"row\">\n                            <div class=\"col-md-6\">\n                                <mat-form-field class=\"full-width\" *ngIf=\"minDob\">\n                                    <input matInput [matDatepicker]=\"picker2\"\n                                           placeholder=\"Date of Birth\"\n                                           [(ngModel)]=\"entity.dateBirth\"\n                                           #birth=\"ngModel\"\n                                           (dateChange)=\"dateBirthChanged($event.value)\"\n                                           [max]=\"maxDateBirth\"\n                                           [min]=\"minDob\"\n                                           name=\"dob\"\n                                           required>\n                                    <mat-datepicker-toggle\n                                            matSuffix\n                                            [for]=\"picker2\">\n                                    </mat-datepicker-toggle>\n                                    <mat-datepicker #picker2></mat-datepicker>\n                                    <mat-error\n                                            *ngIf=\"birth.errors && (birth.dirty || birth.touched || !!entity.id) && (birth.errors.required)\">\n                                        Date of Birth is required\n                                    </mat-error>\n                                    <mat-error\n                                            *ngIf=\"birth.errors && (birth.dirty || birth.touched || !!entity.id) && (birth.errors.max)\">\n                                        Date of Birth cannot be after Date of Registration\n                                    </mat-error>\n                                </mat-form-field>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Gender</mat-label>\n                                <mat-select [(ngModel)]=\"entity.gender\"\n                                            required name=\"gender\" #gender=\"ngModel\">\n                                    <mat-option></mat-option>\n                                    <mat-option [value]=\"'FEMALE'\">Female</mat-option>\n                                    <mat-option [value]=\"'MALE'\">Male</mat-option>\n                                </mat-select>\n                                <mat-error\n                                        *ngIf=\"gender.errors && (gender.dirty || gender.touched || !!entity.id) && (gender.errors.required)\">\n                                    Gender is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Marital Status</mat-label>\n                                <mat-select [(ngModel)]=\"entity.maritalStatus\"\n                                            required name=\"status\" #status=\"ngModel\">\n                                    <mat-option></mat-option>\n                                    <mat-option [value]=\"'Single'\">Single</mat-option>\n                                    <mat-option [value]=\"'Married'\">Married</mat-option>\n                                    <mat-option [value]=\"'Widowed'\">Widowed</mat-option>\n                                    <mat-option [value]=\"'Separated'\">Separated</mat-option>\n                                    <mat-option [value]=\"'Divorced'\">Divorced</mat-option>\n                                </mat-select>\n                                <mat-error\n                                        *ngIf=\"status.errors && (status.dirty || status.touched || !!entity.id) && (status.errors.required)\">\n                                    Marital Status is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Job /Occupation Status</mat-label>\n                                <mat-select name=\"occupation\" [(ngModel)]=\"entity.occupation\">\n                                    <mat-option></mat-option>\n                                    <mat-option [value]=\"'Unemployed'\">Unemployed</mat-option>\n                                    <mat-option [value]=\"'Employed'\">Employed</mat-option>\n                                    <mat-option [value]=\"'Student'\">Student</mat-option>\n                                    <mat-option [value]=\"'Retired'\">Retired</mat-option>\n                                </mat-select>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Educational Level</mat-label>\n                                <mat-select name=\"education\" [(ngModel)]=\"entity.education\">\n                                    <mat-option></mat-option>\n                                    <mat-option [value]=\"'None'\">None</mat-option>\n                                    <mat-option [value]=\"'Primary'\">Primary</mat-option>\n                                    <mat-option [value]=\"'Senior Secondary'\">Senior Secondary</mat-option>\n                                    <mat-option [value]=\"'Quranic'\">Quranic</mat-option>\n                                    <mat-option [value]=\"'Junior Secondary'\">Junior Secondary</mat-option>\n                                    <mat-option [value]=\"'Post Secondary'\">Post Secondary</mat-option>\n                                </mat-select>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>State of Residence</mat-label>\n                                <mat-select name=\"state\" [(ngModel)]=\"state\"\n                                            [compareWith]=\"entityCompare\"\n                                            (selectionChange)=\"stateChange($event.value.id)\">\n                                    <mat-option></mat-option>\n                                    <mat-option *ngFor=\"let state of states\" [value]=\"state\">{{state.name}}</mat-option>\n                                </mat-select>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>LGA of Residence</mat-label>\n                                <mat-select name=\"lga\" [(ngModel)]=\"entity.lga\" required #lga=\"ngModel\"\n                                            [compareWith]=\"entityCompare\">\n                                    <mat-option></mat-option>\n                                    <mat-option *ngFor=\"let lga of lgas\" [value]=\"lga\">{{lga.name}}</mat-option>\n                                </mat-select>\n                                <mat-error\n                                        *ngIf=\"lga.errors && (lga.dirty || lga.touched || !!entity.id) && (lga.errors.required)\">\n                                    LGA of Residence is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label class=\"form-label\">Address</mat-label>\n                                <textarea name=\"address\" matInput [(ngModel)]=\"entity.address\"\n                                          rows=\"3\"\n                                          required #address=\"ngModel\"></textarea>\n                                <mat-error\n                                        *ngIf=\"address.errors && (address.dirty || address.touched || !!entity.id) && (address.errors.required)\">\n                                    Address is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Telephone Number</mat-label>\n                                <input matInput name=\"phone\" phoneNumber [(ngModel)]=\"entity.phone\" #phone=\"ngModel\"/>\n                                <mat-error\n                                        *ngIf=\"phone.errors && (phone.dirty || phone.touched || !!entity.id) && (phone.errors.invalidPhone)\">\n                                    Invalid phone number\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Target group</mat-label>\n                                <mat-select name=\"tg\" [(ngModel)]=\"targetGroup\"\n                                            required #tg=\"ngModel\">\n                                    <mat-option></mat-option>\n                                    <mat-option [value]=\"'CSW'\">CSW</mat-option>\n                                    <mat-option [value]=\"'FSW'\">FSW</mat-option>\n                                    <mat-option [value]=\"'TRANSGENDER'\">Transgender</mat-option>\n                                    <mat-option [value]=\"'MSM'\">MSM</mat-option>\n                                    <mat-option [value]=\"'PWID'\">PWID</mat-option>\n                                    <mat-option [value]=\"'PRISON'\">Prison</mat-option>\n                                </mat-select>\n                                <mat-error\n                                        *ngIf=\"tg.errors && (tg.dirty || tg.touched || !!entity.id) && (tg.errors.required)\">\n                                    Target Group is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>HIV Status at Registration</mat-label>\n                                <mat-select name=\"statusRegistration\" [(ngModel)]=\"entity.statusAtRegistration\"\n                                            (selectionChange)=\"statusChanged()\"\n                                            required #status=\"ngModel\">\n                                    <mat-option></mat-option>\n                                    <mat-option [value]=\"'HIV_EXPOSED_STATUS_UNKNOWN'\">HIV Exposed Status Unknown\n                                    </mat-option>\n                                    <mat-option [value]=\"'HIV_PLUS_NON_ART'\">HIV+ non ART</mat-option>\n                                    <mat-option [value]=\"'ART_TRANSFER_IN'\">ART Transfer In</mat-option>\n                                    <mat-option [value]=\"'PRE_ART_TRANSFER_IN'\">Pre-ART Transfer In</mat-option>\n                                    <mat-option [value]=\"'HIV_NEGATIVE'\">HIV Negative</mat-option>\n                                </mat-select>\n                                <mat-error\n                                        *ngIf=\"status.errors && (status.dirty || status.touched || !!entity.id) && (status.errors.required)\">\n                                    HIV Status at Registration is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Care Entry Point</mat-label>\n                                <mat-select name=\"entryPoint\" [(ngModel)]=\"entity.entryPoint\"\n                                            #entryPoint=\"ngModel\">\n                                    <mat-option></mat-option>\n                                    <mat-option [value]=\"'OPD'\">OPD</mat-option>\n                                    <mat-option [value]=\"'In-patient'\">In-patient</mat-option>\n                                    <mat-option [value]=\"'HCT'\">HCT</mat-option>\n                                    <mat-option [value]=\"'TB DOTS'\">TB DOTS</mat-option>\n                                    <mat-option [value]=\"'STI Clinic'\">STI Clinic</mat-option>\n                                    <mat-option [value]=\"'PMTCT'\">PMTCT</mat-option>\n                                    <mat-option [value]=\"'Transfer-in'\">Transfer-in</mat-option>\n                                    <mat-option [value]=\"'Outreach'\">Outreach</mat-option>\n                                    <mat-option [value]=\"'OVC Partner'\">OVC Partner</mat-option>\n                                    <mat-option [value]=\"'Others'\">Others</mat-option>\n                                </mat-select>\n                                <mat-error\n                                        *ngIf=\"entryPoint.errors && (entryPoint.dirty || entryPoint.touched || !!entity.id) && (entryPoint.errors.required)\">\n                                    Care Entry Point is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <ng-container *ngIf=\"prep\">\n                        <fieldset>\n                            <legend>PrEP</legend>\n                            <div class=\"row\">\n                                <div class=\"col-md-6\">\n                                    <mat-form-field class=\"full-width\">\n                                        <mat-label>PrEP ID</mat-label>\n                                        <input matInput name=\"prepId\" required [(ngModel)]=\"prepId\" #prepID=\"ngModel\"/>\n                                        <mat-error\n                                                *ngIf=\"prepID.errors && (prepID.dirty || prepID.touched || !!entity.id) && (prepID.errors.required)\">\n                                            PrEP ID is required\n                                        </mat-error>\n                                    </mat-form-field>\n                                </div>\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col-md-6\">\n                                    <mat-form-field class=\"full-width\">\n                                        <mat-label>Indication for PrEP</mat-label>\n                                        <mat-select name=\"indication\" required #indication=\"ngModel\"\n                                                    [(ngModel)]=\"indicationForPrep\">\n                                            <mat-option></mat-option>\n                                            <mat-option [value]=\"'Sero-Discordant Relationship'\">Sero-Discordant\n                                                Relationship\n                                            </mat-option>\n                                            <mat-option [value]=\"'On Demand'\">On Demand</mat-option>\n                                        </mat-select>\n                                        <mat-error\n                                                *ngIf=\"indication.errors && (indication.dirty || indication.touched || !!entity.id) && (indication.errors.required)\">\n                                            Indication for PrEP is required\n                                        </mat-error>\n                                    </mat-form-field>\n                                </div>\n                                <div class=\"col-md-6\" *ngIf=\"indicationForPrep === 'On Demand'\">\n                                    <mat-form-field class=\"full-width\">\n                                        <mat-label>On Demand Type</mat-label>\n                                        <mat-select name=\"type\" required #type=\"ngModel\"\n                                                    [(ngModel)]=\"onDemandIndication\">\n                                            <mat-option></mat-option>\n                                            <mat-option [value]=\"'Partner Non-disclosure'\">Partner Non-disclosure\n                                            </mat-option>\n                                            <mat-option [value]=\"'Partner unwilling to undergo HIV testing'\">Partner\n                                                unwilling to undergo HIV testing\n                                            </mat-option>\n                                            <mat-option [value]=\"'Client unable to negotiate condom use'\">Client unable\n                                                to negotiate condom use\n                                            </mat-option>\n                                            <mat-option [value]=\"'Individuals with high risk sexual behaviors'\">\n                                                Individuals with high risk sexual behaviors\n                                            </mat-option>\n                                            <mat-option [value]=\"'Others'\">Others</mat-option>\n                                        </mat-select>\n                                        <mat-error\n                                                *ngIf=\"type.errors && (type.dirty || type.touched || !!entity.id) && (type.errors.required)\">\n                                            On Demand is required\n                                        </mat-error>\n                                    </mat-form-field>\n                                </div>\n                            </div>\n                        </fieldset>\n                    </ng-container>\n                    <div class=\"row\" *ngIf=\"entity.gender === 'FEMALE'\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Time of HIV Diagnosis</mat-label>\n                                <mat-select name=\"timeHivDiagnosis\" [(ngModel)]=\"entity.timeHivDiagnosis\">\n                                    <mat-option></mat-option>\n                                    <mat-option [value]=\"'Previous - Non pregnant'\">Previous - Non pregnant</mat-option>\n                                    <mat-option [value]=\"'Previous pregnancy (ANC)'\">Previous pregnancy (ANC)\n                                    </mat-option>\n                                    <mat-option [value]=\"'Previous pregnancy (L&amp;D)'\">Previous pregnancy (L&amp;D)\n                                    </mat-option>\n                                    <mat-option [value]=\"'Previous pregnancy (PP &lt;72hrs)'\">Previous pregnancy (PP\n                                        &lt;72hrs)\n                                    </mat-option>\n                                    <mat-option [value]=\"'ANC'\">ANC</mat-option>\n                                    <mat-option [value]=\"'Labour'\">Labour</mat-option>\n                                    <mat-option [value]=\"'Post Partum &lt;=72hrs'\">Post Partum &lt;=72hrs</mat-option>\n                                    <mat-option [value]=\"'Post Partum &gt;72hrs'\">Post Partum &gt;72hrs</mat-option>\n                                </mat-select>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Date enrolled into PMTCT</mat-label>\n                                <input matInput [matDatepicker]=\"picker3\"\n                                       [(ngModel)]=\"entity.dateEnrolledPMTCT\"\n                                       #pmtct=\"ngModel\"\n                                       [max]=\"entity.dateRegistration\"\n                                       [min]=\"entity.dateBirth\"\n                                       name=\"pmtct\">\n                                <mat-datepicker-toggle\n                                        matSuffix\n                                        [for]=\"picker3\">\n                                </mat-datepicker-toggle>\n                                <mat-datepicker #picker3></mat-datepicker>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div class=\"row\" *ngIf=\"entity.gender === 'FEMALE'\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Pregnancy Status</mat-label>\n                                <mat-select name=\"pregnancyStatus\" [(ngModel)]=\"entity.pregnancyStatus\">\n                                    <mat-option></mat-option>\n                                    <mat-option value=\"1\">Not Pregnant</mat-option>\n                                    <mat-option value=\"2\">Pregnant</mat-option>\n                                    <mat-option value=\"3\">Breastfeeding</mat-option>\n                                </mat-select>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Source of Referral</mat-label>\n                                <mat-select name=\"sourceReferral\" [(ngModel)]=\"entity.sourceReferral\">\n                                    <mat-option></mat-option>\n                                    <mat-option [value]=\"'PMTCT outreach'\">PMTCT outreach</mat-option>\n                                    <mat-option [value]=\"'Sex worker outreach'\">Sex worker outreach</mat-option>\n                                    <mat-option [value]=\"'Medical outpatient'\">Medical outpatient</mat-option>\n                                    <mat-option [value]=\"'Youth/Adolescent outreach'\">Youth/Adolescent outreach\n                                    </mat-option>\n                                    <mat-option [value]=\"'Private/Commercial Health facility'\">Private/Commercial Health\n                                        facility\n                                    </mat-option>\n                                    <mat-option [value]=\"'Under-fives/Immunization clinic'\">Under-fives/Immunization\n                                        clinic\n                                    </mat-option>\n                                    <mat-option [value]=\"'External HCT centre'\">External HCT centre</mat-option>\n                                    <mat-option [value]=\"'OVC Partner'\">OVC Partner</mat-option>\n                                    <mat-option [value]=\"'In-patients'\">In-patients</mat-option>\n                                    <mat-option [value]=\"'Self-referral'\">Self-referral</mat-option>\n                                </mat-select>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Enrollment Setting</mat-label>\n                                <mat-select name=\"enrollmentSetting\" [(ngModel)]=\"entity.enrollmentSetting\"\n                                            [required]=\"true\" #setting=\"ngModel\">\n                                    <mat-option></mat-option>\n                                    <mat-option [value]=\"'Facility'\">Facility</mat-option>\n                                    <mat-option [value]=\"'Community'\">Community</mat-option>\n                                </mat-select>\n                                <mat-error\n                                        *ngIf=\"setting.errors && (setting.dirty || setting.touched || !!entity.id) && (setting.errors.required)\">\n                                    Enrollment Setting is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\"\n                                            *ngIf=\"minDateConfirmed && entity.statusAtRegistration !== 'HIV_NEGATIVE'\">\n                                <mat-label>Date of Confirmed HIV Test</mat-label>\n                                <input matInput [matDatepicker]=\"picker2\"\n                                       [(ngModel)]=\"entity.dateConfirmedHiv\"\n                                       #time=\"ngModel\"\n                                       [max]=\"maxDateConfirmed\"\n                                       [min]=\"minDateConfirmed\"\n                                       required\n                                       name=\"time\">\n                                <mat-datepicker-toggle\n                                        matSuffix\n                                        [for]=\"picker2\">\n                                </mat-datepicker-toggle>\n                                <mat-datepicker #picker2></mat-datepicker>\n                                <mat-error\n                                        *ngIf=\"time.errors && (time.dirty || time.touched || !!entity.id) && (time.errors.required)\">\n                                    Date of Confirmed HIV Test is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>TB Status</mat-label>\n                                <mat-select name=\"tbStatus\" [(ngModel)]=\"entity.tbStatus\">\n                                    <mat-option></mat-option>\n                                    <mat-option [value]=\"'No sign or symptoms of TB'\">No sign or symptoms of TB\n                                    </mat-option>\n                                    <mat-option [value]=\"'TB suspected and referred for evaluation'\">TB suspected and\n                                        referred for evaluation\n                                    </mat-option>\n                                    <mat-option [value]=\"'Currently on INH prophylaxis'\">Currently on INH prophylaxis\n                                    </mat-option>\n                                    <mat-option [value]=\"'Currently on TB treatment'\">Currently on TB treatment\n                                    </mat-option>\n                                    <mat-option [value]=\"'TB positive not on TB drugs'\">TB positive not on TB drugs\n                                    </mat-option>\n                                </mat-select>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <fieldset>\n                        <legend>Next of kin/Treatment Supporter</legend>\n                        <div class=\"row\">\n                            <div class=\"col-md-6\">\n                                <mat-form-field class=\"full-width\">\n                                    <mat-label>Name</mat-label>\n                                    <input matInput name=\"nextKin\" [(ngModel)]=\"entity.nextOfKin\"/>\n                                </mat-form-field>\n                            </div>\n                            <div class=\"col-md-6\">\n                                <mat-form-field class=\"full-width\">\n                                    <mat-label>Relationship</mat-label>\n                                    <mat-select name=\"relationKin\" [(ngModel)]=\"entity.nextOfKinRelationship\">\n                                        <mat-option></mat-option>\n                                        <mat-option [value]=\"'Aunt'\">Aunt</mat-option>\n                                        <mat-option [value]=\"'Brother'\">Brother</mat-option>\n                                        <mat-option [value]=\"'Cousin'\">Cousin</mat-option>\n                                        <mat-option [value]=\"'Daughter'\">Daughter</mat-option>\n                                        <mat-option [value]=\"'Father'\">Father</mat-option>\n                                        <mat-option [value]=\"'Friend'\">Friend</mat-option>\n                                        <mat-option [value]=\"'Grand parent'\">Grand parent</mat-option>\n                                        <mat-option [value]=\"'Mother'\">Mother</mat-option>\n                                        <mat-option [value]=\"'Sister'\">Sister</mat-option>\n                                        <mat-option [value]=\"'Son'\">Son</mat-option>\n                                        <mat-option [value]=\"'Spouse'\">Spouse</mat-option>\n                                        <mat-option [value]=\"'Treatment Supporter'\">Treatment Supporter</mat-option>\n                                        <mat-option [value]=\"'Uncle'\">Uncle</mat-option>\n                                    </mat-select>\n                                </mat-form-field>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-md-6\">\n                                <mat-form-field class=\"full-width\">\n                                    <mat-label>Address</mat-label>\n                                    <input matInput name=\"addressKin\" [(ngModel)]=\"entity.nextOfKinAddress\"/>\n                                </mat-form-field>\n                            </div>\n                            <div class=\"col-md-6\">\n                                <mat-form-field class=\"full-width\">\n                                    <mat-label>Telephone Number</mat-label>\n                                    <input matInput name=\"phoneKin\" phoneNumber [(ngModel)]=\"entity.nextOfKinPhone\"\n                                           #phone1=\"ngModel\"/>\n                                    <mat-error\n                                            *ngIf=\"phone1.errors && (phone1.dirty || phone1.touched || !!entity.id) && (phone1.errors.invalidPhone)\">\n                                        Invalid phone number\n                                    </mat-error>\n                                </mat-form-field>\n                            </div>\n                        </div>\n                    </fieldset>\n                    <ng-container *ngIf=\"ovcApplicable\">\n                        <fieldset>\n                            <legend>OVC</legend>\n                            <div class=\"row\">\n                                <div class=\"col-md-6\">\n                                    <mat-form-field class=\"full-width\">\n                                        <mat-label>Household Unique No</mat-label>\n                                        <input matInput name=\"householdUniqueNo\" [(ngModel)]=\"ovc.householdUniqueNo\"\n                                               [required]=\"!!ovc.referredTo || !!ovc.referredFrom\"\n                                               #hun=\"ngModel\"/>\n                                        <mat-error\n                                                *ngIf=\"hun.errors && (hun.dirty || hun.touched || !!entity.id) && (hun.errors.required)\">\n                                            Household Unique No is required\n                                        </mat-error>\n                                    </mat-form-field>\n                                </div>\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col-md-6\">\n                                    <mat-form-field class=\"full-width\"\n                                                    *ngIf=\"!!ovc.referredFrom || !!ovc.dateReferredFrom || ovcMin\">\n                                        <mat-label>Referred To OVC Partner</mat-label>\n                                        <input matInput name=\"referredTo\" [(ngModel)]=\"ovc.referredTo\"\n                                               [required]=\"!!ovc.dateReferredTo\"\n                                               [disabled]=\"!!ovc.referredFrom || !!ovc.dateReferredFrom\"\n                                               #rt=\"ngModel\"/>\n                                        <mat-error\n                                                *ngIf=\"rt.errors && (rt.dirty || rt.touched) && (rt.errors.required)\">\n                                            OVC Partner referred to is required\n                                        </mat-error>\n                                    </mat-form-field>\n                                </div>\n                                <div class=\"col-md-6\">\n                                    <mat-form-field class=\"full-width\"\n                                                    *ngIf=\"!!ovc.referredFrom || !!ovc.dateReferredFrom || ovcMin\">\n                                        <mat-label>Date Referred to OVC Partner</mat-label>\n                                        <input matInput [matDatepicker]=\"picker8\"\n                                               [(ngModel)]=\"ovc.dateReferredTo\"\n                                               #drt=\"ngModel\"\n                                               [max]=\"today\"\n                                               [min]=\"ovcMin\"\n                                               [disabled]=\"!!ovc.referredFrom || !!ovc.dateReferredFrom\"\n                                               [required]=\"!!ovc.referredTo\"\n                                               name=\"drt\">\n                                        <mat-datepicker-toggle\n                                                matSuffix\n                                                [for]=\"picker8\">\n                                        </mat-datepicker-toggle>\n                                        <mat-datepicker #picker8></mat-datepicker>\n                                        <mat-error\n                                                *ngIf=\"drt.errors && (drt.dirty || drt.touched) && (drt.errors.required)\">\n                                            Date Referred to OVC Partner is required\n                                        </mat-error>\n                                    </mat-form-field>\n                                </div>\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col-md-6\">\n                                    <mat-form-field class=\"full-width\"\n                                                    *ngIf=\"!!ovc.referredTo || !!ovc.dateReferredTo || ovcMin\">\n                                        <mat-label>Referred From OVC Partner</mat-label>\n                                        <input matInput name=\"referredFrom\" [(ngModel)]=\"ovc.referredFrom\"\n                                               [required]=\"!!ovc.dateReferredFrom\"\n                                               [disabled]=\"!!ovc.referredTo || !!ovc.dateReferredTo\"\n                                               #rf=\"ngModel\"/>\n                                        <mat-error\n                                                *ngIf=\"rf.errors && (rf.dirty || rf.touched) && (rf.errors.required)\">\n                                            OVC Partner referred from is required\n                                        </mat-error>\n                                    </mat-form-field>\n                                </div>\n                                <div class=\"col-md-6\">\n                                    <mat-form-field class=\"full-width\"\n                                                    *ngIf=\"!!ovc.referredTo || !!ovc.dateReferredTo || ovcMin\">\n                                        <mat-label>Date Referred From OVC Partner</mat-label>\n                                        <input matInput [matDatepicker]=\"picker9\"\n                                               [(ngModel)]=\"ovc.dateReferredFrom\"\n                                               #drf=\"ngModel\"\n                                               [max]=\"today\"\n                                               [min]=\"ovcMin\"\n                                               [disabled]=\"!!ovc.referredTo || !!ovc.dateReferredTo\"\n                                               [required]=\"!!ovc.referredFrom\"\n                                               name=\"drf\">\n                                        <mat-datepicker-toggle\n                                                matSuffix\n                                                [for]=\"picker9\">\n                                        </mat-datepicker-toggle>\n                                        <mat-datepicker #picker9></mat-datepicker>\n                                        <mat-error\n                                                *ngIf=\"drf.errors && (drf.dirty || drf.touched) && (drf.errors.required)\">\n                                            Date Referred to OVC Partner is required\n                                        </mat-error>\n                                    </mat-form-field>\n                                </div>\n                            </div>\n                            <div class=\"row\" *ngIf=\"ovc.householdUniqueNo\">\n                                <div class=\"col-md-12\">\n                                    <mat-form-field class=\"full-width\">\n                                        <mat-label>Services Provided</mat-label>\n                                        <mat-select name=\"services\" [(ngModel)]=\"ovc.servicesProvided\" multiple>\n                                            <mat-option [value]=\"'Emergency Health Services'\">Emergency Health\n                                                Services\n                                            </mat-option>\n                                            <mat-option [value]=\"'Educational Support'\">Educational Support</mat-option>\n                                            <mat-option [value]=\"'Household Economic Strengthening'\">Household Economic\n                                                Strengthening\n                                            </mat-option>\n                                            <mat-option [value]=\"'Nutritional Support'\">Nutritional Support</mat-option>\n                                            <mat-option [value]=\"'Health Education'\">Health Education</mat-option>\n                                            <mat-option [value]=\"'Water, Sanitation &amp; Hygiene Messaging (WASH)'\">\n                                                Water, Sanitation &amp; Hygiene Messaging (WASH)\n                                            </mat-option>\n                                            <mat-option [value]=\"'ART Adherence Support'\">ART Adherence Support\n                                            </mat-option>\n                                            <mat-option [value]=\"'Nutrition Assessment, Counseling and Support'\">\n                                                Nutrition Assessment, Counseling and Support\n                                            </mat-option>\n                                            <mat-option [value]=\"'Growth Monitoring'\">Growth Monitoring</mat-option>\n                                            <mat-option [value]=\"'Emergency Support'\">Emergency Support</mat-option>\n                                            <mat-option [value]=\"'School Enrollment/ Re-enrollment'\">School Enrollment/\n                                                Re-enrollment\n                                            </mat-option>\n                                            <mat-option [value]=\"'Psychosocial Support'\">Psychosocial Support\n                                            </mat-option>\n                                        </mat-select>\n                                    </mat-form-field>\n                                </div>\n                            </div>\n                        </fieldset>\n                    </ng-container>\n                </mat-card-content>\n                <mat-card-actions class=\"lamis-edit-form-actions\">\n                    <button mat-button type=\"button\" (click)=\"previousState()\">Back</button>\n                    <button mat-raised-button color=\"primary\" (click)=\"save()\"\n                            [disabled]=\"patientForm.invalid || isSaving || (!!ovc.householdUniqueNo && !(!!ovc.referredFrom || !!ovc.referredTo))\">\n                        {{entity.id ? 'Update' : 'Save'}}\n                    </button>\n                </mat-card-actions>\n            </mat-card>\n        </form>\n    </div>\n</div>\n"
            }),
            __metadata("design:paramtypes", [PatientService,
                adfCore.NotificationService,
                webCore.AppLoaderService,
                core$1.TdDialogService,
                router.ActivatedRoute])
        ], PatientEditComponent);
        return PatientEditComponent;
    }());

    var DetailedTimelineComponent = /** @class */ (function () {
        function DetailedTimelineComponent(patientService, route) {
            this.patientService = patientService;
            this.route = route;
        }
        DetailedTimelineComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.route.data.subscribe(function (_a) {
                var entity = _a.entity;
                var patient = !!entity && entity.body ? entity.body : entity;
                _this.id = patient.id;
                _this.uuid = patient.uuid;
            });
        };
        DetailedTimelineComponent.prototype.previousState = function () {
            window.history.back();
        };
        DetailedTimelineComponent.ctorParameters = function () { return [
            { type: PatientService },
            { type: router.ActivatedRoute }
        ]; };
        DetailedTimelineComponent = __decorate([
            core.Component({
                selector: 'detailed-timeline',
                template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <mat-card>\n            <mat-card-header>\n                <mat-card-title>Patient Activity History</mat-card-title>\n            </mat-card-header>\n            <mat-card-content>\n                <patient-timeline [patientId]=\"id\" [patientUuid]=\"uuid\" [detailed]=\"true\"></patient-timeline>\n            </mat-card-content>\n            <mat-card-actions class=\"lamis-edit-form-actions\">\n                <button mat-button type=\"button\" (click)=\"previousState()\">Back</button>\n            </mat-card-actions>\n        </mat-card>\n    </div>\n</div>\n"
            }),
            __metadata("design:paramtypes", [PatientService, router.ActivatedRoute])
        ], DetailedTimelineComponent);
        return DetailedTimelineComponent;
    }());

    var PatientResolve = /** @class */ (function () {
        function PatientResolve(service) {
            this.service = service;
        }
        PatientResolve.prototype.resolve = function (route, state) {
            var id = route.params['id'] ? route.params['id'] : null;
            if (id) {
                return this.service.findByUuid(id).pipe(operators.filter(function (response) { return response.ok; }), operators.map(function (patient) { return patient.body; }));
            }
            return rxjs.of({});
        };
        PatientResolve.ctorParameters = function () { return [
            { type: PatientService }
        ]; };
        PatientResolve = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [PatientService])
        ], PatientResolve);
        return PatientResolve;
    }());
    var ɵ0 = {
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
    var ROUTES = [
        {
            path: '',
            data: ɵ0,
            children: [
                {
                    path: '',
                    component: PatientListComponent,
                    resolve: {
                        pagingParams: webCore.PagingParamsResolve
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

    var WidgetContainerComponent = /** @class */ (function () {
        function WidgetContainerComponent() {
        }
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], WidgetContainerComponent.prototype, "title", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], WidgetContainerComponent.prototype, "icon", void 0);
        __decorate([
            core.ViewChild('container', { read: core.ViewContainerRef, static: true }),
            __metadata("design:type", core.ViewContainerRef)
        ], WidgetContainerComponent.prototype, "embeddedContainer", void 0);
        WidgetContainerComponent = __decorate([
            core.Component({
                selector: 'widget-container',
                template: "<mat-card class=\"dark-blue-100\">\n    <mat-card-header>\n        <mat-icon mat-card-avatar>{{icon || 'dashboard'}}</mat-icon>\n        <mat-card-title>{{title}}</mat-card-title>\n    </mat-card-header>\n    <mat-divider></mat-divider>\n    <mat-card-content>\n        <ng-container #container></ng-container>\n    </mat-card-content>\n</mat-card>\n",
                styles: ["mat-icon.mat-card-avatar{width:30px;height:30px;font-size:30px}mat-card-title{padding-top:5px!important}"]
            })
        ], WidgetContainerComponent);
        return WidgetContainerComponent;
    }());

    var ObservationService = /** @class */ (function () {
        function ObservationService(http, serverUrl) {
            this.http = http;
            this.serverUrl = serverUrl;
            this.resourceUrl = '';
            this.resourceUrl = serverUrl.SERVER_API_URL + '/api';
        }
        ObservationService.prototype.deleteObservation = function (path, id) {
            return this.http.delete(this.resourceUrl + "/" + path + "/" + id, { observe: 'response' });
        };
        ObservationService.prototype.getObservation = function (path, id) {
            return this.http.get(this.resourceUrl + "/" + path + "/by-uuid/" + id, { observe: 'response' });
        };
        ObservationService.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: undefined, decorators: [{ type: core.Inject, args: [webCore.SERVER_API_URL_CONFIG,] }] }
        ]; };
        ObservationService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function ObservationService_Factory() { return new ObservationService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(webCore.SERVER_API_URL_CONFIG)); }, token: ObservationService, providedIn: "root" });
        ObservationService = __decorate([
            core.Injectable({ providedIn: 'root' }),
            __param(1, core.Inject(webCore.SERVER_API_URL_CONFIG)),
            __metadata("design:paramtypes", [http.HttpClient, Object])
        ], ObservationService);
        return ObservationService;
    }());

    var TimelineComponent = /** @class */ (function () {
        function TimelineComponent(patientService, router, observationService, _dialogService, notificationService) {
            this.patientService = patientService;
            this.router = router;
            this.observationService = observationService;
            this._dialogService = _dialogService;
            this.notificationService = notificationService;
            this.detailed = false;
        }
        TimelineComponent.prototype.ngOnInit = function () {
            this.loadActivities();
        };
        TimelineComponent.prototype.view = function (path, id) {
            this.router.navigate(['/', path, id, 'patient', this.patientUuid, 'view']);
        };
        TimelineComponent.prototype.edit = function (path, id) {
            this.router.navigate(['/', path, id, 'patient', this.patientUuid, 'edit']);
        };
        TimelineComponent.prototype.delete = function (path, id) {
            var _this = this;
            this._dialogService.openConfirm({
                title: 'Confirm',
                message: 'Do you want to delete this event, action cannot be reversed?',
                cancelButton: 'No',
                acceptButton: 'Yes',
                width: '500px',
            }).afterClosed().subscribe(function (accept) {
                if (accept) {
                    _this.observationService.getObservation(path, id).subscribe(function (obj) {
                        if (obj.body) {
                            _this.observationService.deleteObservation(path, obj.body.id).subscribe(function (res) {
                                if (res.ok) {
                                    _this.patientService.activities(_this.patientId, _this.detailed).subscribe(function (res) { return _this.timeLine = res; });
                                }
                                else {
                                    _this.notificationService.showError('Error deleting event, please try again');
                                }
                            });
                        }
                    });
                }
                else {
                    // DO SOMETHING ELSE
                }
            });
        };
        TimelineComponent.prototype.loadActivities = function () {
            var _this = this;
            this.patientService.activities(this.patientId, this.detailed).subscribe(function (res) { return _this.timeLine = res; });
        };
        TimelineComponent.ctorParameters = function () { return [
            { type: PatientService },
            { type: router.Router },
            { type: ObservationService },
            { type: core$1.TdDialogService },
            { type: adfCore.NotificationService }
        ]; };
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], TimelineComponent.prototype, "patientId", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], TimelineComponent.prototype, "patientUuid", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], TimelineComponent.prototype, "detailed", void 0);
        TimelineComponent = __decorate([
            core.Component({
                selector: 'patient-timeline',
                template: "<a class=\"mb-1 pb-1 underlined\" [routerLink]=\"['/', 'patients', patientUuid, 'timeline']\" *ngIf=\"!detailed\">Click here\n    to view detailed History</a>\n<mat-divider></mat-divider>\n<timeline>\n    <timeline-event *ngFor=\"let period of timeLine\" side=\"right\">\n        <timeline-badge>\n            <mat-icon>insert_invitation</mat-icon>\n        </timeline-badge>\n        <timeline-panel>\n            <timeline-header>\n                <h4>{{period.date}}</h4>\n            </timeline-header>\n            <mat-list>\n                <mat-list-item>\n                    <div matLine>\n                        <ng-container *ngFor=\"let event of period.activities\">\n                            <div matLine>\n                                <button mat-icon-button aria-label=\"Delete event\"\n                                        *ngIf=\"event.deletable\"\n                                        (click)=\"delete(event.path, event.uuid)\">\n                                    <mat-icon>delete</mat-icon>\n                                </button>\n                                <button mat-icon-button aria-label=\"View event\"\n                                        *ngIf=\"event.viewable\"\n                                        (click)=\"view(event.path, event.uuid)\">\n                                    <mat-icon>remove_red_eye</mat-icon>\n                                </button>\n                                <button mat-icon-button aria-label=\"Edit event\"\n                                        *ngIf=\"event.editable\"\n                                        (click)=\"edit(event.path, event.uuid)\">\n                                    <mat-icon>edit</mat-icon>\n                                </button>\n                            </div>\n                            <a mat-line matTooltip=\"{{event.name}}\">{{event.name}}</a>\n                            <mat-divider></mat-divider>\n                        </ng-container>\n                    </div>\n                </mat-list-item>\n            </mat-list>\n        </timeline-panel>\n    </timeline-event>\n</timeline>\n"
            }),
            __metadata("design:paramtypes", [PatientService, router.Router, ObservationService,
                core$1.TdDialogService, adfCore.NotificationService])
        ], TimelineComponent);
        return TimelineComponent;
    }());

    var TimelineWidget = /** @class */ (function () {
        function TimelineWidget() {
        }
        TimelineWidget.prototype.ngOnInit = function () {
        };
        TimelineWidget = __decorate([
            core.Component({
                selector: 'timeline',
                template: "<ul class=\"timeline\">\n    <ng-content></ng-content>\n</ul>\n"
            })
        ], TimelineWidget);
        return TimelineWidget;
    }());

    var TimelineEvent = /** @class */ (function () {
        function TimelineEvent(parent) {
            this.parent = parent;
            this._side = 'left';
        }
        Object.defineProperty(TimelineEvent.prototype, "side", {
            set: function (side) {
                this._side = side;
                this.updateRowClasses(this._side);
            },
            enumerable: true,
            configurable: true
        });
        TimelineEvent.prototype.ngOnInit = function () {
            this.updateRowClasses(this._side);
        };
        TimelineEvent.prototype.checkClass = function (side, leftSide) {
            var leftClass = '';
            var rightClass = 'timeline-inverted';
            if (side === 'left' || (!side && leftSide === true)) {
                return leftClass;
            }
            else if ((side === 'alternate' || !side) && leftSide === false) {
                return rightClass;
            }
            else if (side === 'right') {
                return rightClass;
            }
            else {
                return leftClass;
            }
        };
        TimelineEvent.prototype.updateRowClasses = function (value) {
            this.oddClass = this.checkClass(value, true);
            this.evenClass = this.checkClass(value, false);
        };
        TimelineEvent.ctorParameters = function () { return [
            { type: TimelineWidget }
        ]; };
        __decorate([
            core.Input(),
            __metadata("design:type", String),
            __metadata("design:paramtypes", [String])
        ], TimelineEvent.prototype, "side", null);
        TimelineEvent = __decorate([
            core.Component({
                selector: 'timeline-event',
                template: "<li class=\"timeline-event\" ng-class-odd=\"oddClass\" ng-class-even=\"evenClass\">\n    <ng-content></ng-content>\n</li>\n"
            }),
            __metadata("design:paramtypes", [TimelineWidget])
        ], TimelineEvent);
        return TimelineEvent;
    }());

    var TimelineBadge = /** @class */ (function () {
        function TimelineBadge(event) {
            this.event = event;
        }
        TimelineBadge.ctorParameters = function () { return [
            { type: TimelineEvent }
        ]; };
        TimelineBadge = __decorate([
            core.Component({
                selector: 'timeline-badge',
                template: "\n        <div class='timeline-badge'>\n            <ng-content></ng-content>\n        </div>\n    "
            }),
            __metadata("design:paramtypes", [TimelineEvent])
        ], TimelineBadge);
        return TimelineBadge;
    }());

    var TimelineFooter = /** @class */ (function () {
        function TimelineFooter() {
        }
        TimelineFooter = __decorate([
            core.Component({
                selector: 'timeline-footer',
                template: "\n        <div class='timeline-footer'>\n            <ng-content></ng-content>\n        </div>\n    "
            })
        ], TimelineFooter);
        return TimelineFooter;
    }());

    var TimelineHeader = /** @class */ (function () {
        function TimelineHeader() {
        }
        TimelineHeader = __decorate([
            core.Component({
                selector: 'timeline-header',
                template: "\n        <div class='timeline-header'>\n            <ng-content></ng-content>\n        </div>\n    "
            })
        ], TimelineHeader);
        return TimelineHeader;
    }());

    var TimelinePanel = /** @class */ (function () {
        function TimelinePanel(event) {
            this.event = event;
        }
        TimelinePanel.ctorParameters = function () { return [
            { type: TimelineEvent }
        ]; };
        TimelinePanel = __decorate([
            core.Component({
                selector: 'timeline-panel',
                template: "\n        <div class='timeline-panel'>\n            <ng-content></ng-content>\n        </div>"
            }),
            __metadata("design:paramtypes", [TimelineEvent])
        ], TimelinePanel);
        return TimelinePanel;
    }());

    var COMPONENTS = [TimelineBadge, TimelineEvent, TimelineFooter, TimelineHeader, TimelinePanel, TimelineWidget];
    var TimelineWidgetModule = /** @class */ (function () {
        function TimelineWidgetModule() {
        }
        TimelineWidgetModule = __decorate([
            core.NgModule({
                declarations: __spread(COMPONENTS),
                exports: __spread(COMPONENTS)
            })
        ], TimelineWidgetModule);
        return TimelineWidgetModule;
    }());

    var UniqueHospitalNumValidator = /** @class */ (function () {
        function UniqueHospitalNumValidator(patientService) {
            this.patientService = patientService;
        }
        UniqueHospitalNumValidator_1 = UniqueHospitalNumValidator;
        UniqueHospitalNumValidator.prototype.validate = function (control) {
            var _this = this;
            return control.valueChanges
                .pipe(operators.debounceTime(300), operators.take(1), operators.switchMap(function (value) { return _this.patientService.existsByHospitalNumber(value); }));
        };
        var UniqueHospitalNumValidator_1;
        UniqueHospitalNumValidator.ctorParameters = function () { return [
            { type: PatientService }
        ]; };
        UniqueHospitalNumValidator = UniqueHospitalNumValidator_1 = __decorate([
            core.Directive({
                selector: '[uniqueHospitalNum]',
                providers: [{
                        provide: forms.NG_ASYNC_VALIDATORS,
                        useExisting: UniqueHospitalNumValidator_1,
                        multi: true
                    }]
            }),
            __metadata("design:paramtypes", [PatientService])
        ], UniqueHospitalNumValidator);
        return UniqueHospitalNumValidator;
    }());

    var moment$3 = moment_;
    var SummaryWidgetComponent = /** @class */ (function () {
        function SummaryWidgetComponent(patientService) {
            this.patientService = patientService;
        }
        SummaryWidgetComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.patientService.getSummaryForPatient(this.patientId).subscribe(function (res) { return _this.summaries = res; });
        };
        SummaryWidgetComponent.prototype.propertiesForSummary = function (summary) {
            var e_1, _a;
            var properties = [];
            try {
                for (var _b = __values(summary.fields), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var field = _c.value;
                    var dataType = field.type.toLowerCase();
                    var item = void 0;
                    switch (dataType) {
                        case webCore.FieldType.boolean:
                            item = new adfCore.CardViewBoolItemModel({
                                value: field.value,
                                key: '',
                                label: field.label
                            });
                            break;
                        case webCore.FieldType.int:
                            item = new adfCore.CardViewIntItemModel({
                                value: field.value,
                                key: '',
                                label: field.label,
                            });
                            break;
                        case webCore.FieldType.float:
                            item = new adfCore.CardViewFloatItemModel({
                                value: field.value,
                                key: '',
                                label: field.label,
                            });
                            break;
                        case webCore.FieldType.date:
                            item = new adfCore.CardViewDateItemModel({
                                value: field.value ? moment$3(field.value) : null,
                                key: '',
                                label: field.label,
                                format: 'dd MMM, yyyy'
                            });
                            break;
                        case webCore.FieldType.datetime:
                            item = new adfCore.CardViewDatetimeItemModel({
                                value: field.value ? moment$3(field.value) : null,
                                key: '',
                                label: field.label,
                                format: 'dd MMM, yyyy HH:mm'
                            });
                            break;
                        default:
                            item = new adfCore.CardViewTextItemModel({
                                value: field.value,
                                key: '',
                                label: field.label,
                            });
                    }
                    properties.push(item);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return properties;
        };
        SummaryWidgetComponent.ctorParameters = function () { return [
            { type: PatientService }
        ]; };
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], SummaryWidgetComponent.prototype, "patientId", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], SummaryWidgetComponent.prototype, "patientUuid", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], SummaryWidgetComponent.prototype, "summaries", void 0);
        SummaryWidgetComponent = __decorate([
            core.Component({
                selector: 'patient-summary-widget',
                template: "<ng-container *ngIf=\"summaries\">\n    <mat-card *ngFor=\"let summary of summaries\" class=\"default mb-1 pb-0\">\n        <ng-container *ngIf=\"!!summary.header\">\n            <mat-card-title>{{summary.header}}</mat-card-title>\n            <mat-divider></mat-divider>\n        </ng-container>\n        <mat-card-content>\n            <adf-card-view [properties]=\"propertiesForSummary(summary)\"></adf-card-view>\n        </mat-card-content>\n    </mat-card>\n</ng-container>\n"
            }),
            __metadata("design:paramtypes", [PatientService])
        ], SummaryWidgetComponent);
        return SummaryWidgetComponent;
    }());

    var PatientModule = /** @class */ (function () {
        function PatientModule() {
        }
        PatientModule = __decorate([
            core.NgModule({
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
                    common.CommonModule,
                    ngJhipster.NgJhipsterModule,
                    webCore.LamisSharedModule,
                    webCore.JsonFormModule,
                    angularMaterialFormio.MatFormioModule,
                    material.MatInputModule,
                    material.MatIconModule,
                    material.MatDividerModule,
                    material.MatCardModule,
                    material.MatSelectModule,
                    material.MatButtonModule,
                    material.MatCheckboxModule,
                    material.MatTabsModule,
                    router.RouterModule.forChild(ROUTES),
                    material.MatProgressBarModule,
                    core$1.CovalentMessageModule,
                    material.MatListModule,
                    material.MatChipsModule,
                    adfCore.CoreModule,
                    core$1.CovalentDialogsModule,
                    core$1.CovalentSearchModule,
                    ngBootstrap.NgbPaginationModule,
                    TimelineWidgetModule,
                    forms.FormsModule,
                    forms.ReactiveFormsModule,
                    webCore.MatDateFormatModule,
                    ng2Validation.CustomFormsModule,
                    material.MatAutocompleteModule
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
        return PatientModule;
    }());

    var moment$4 = moment_;
    var ClientStatusComponent = /** @class */ (function () {
        function ClientStatusComponent(patientService, activatedRoute, router, notification, appLoaderService) {
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
        ClientStatusComponent.prototype.createEntity = function () {
            return {};
        };
        ClientStatusComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.isSaving = false;
            this.patientService.getActiveFacility().subscribe(function (fac) {
                _this.patientService.getAllFacility().subscribe(function (res) {
                    _this.facilities = res.map(function (f) { return f.name; }).filter(function (f) { return f != fac.name; });
                });
            });
            this.activatedRoute.data.subscribe(function (_a) {
                var entity = _a.entity;
                _this.entity = !!entity && entity.body ? entity.body : entity;
                if (_this.entity === undefined) {
                    _this.entity = _this.createEntity();
                }
                var patientId = _this.activatedRoute.snapshot.paramMap.get('patientId');
                _this.patientService.findByUuid(patientId).subscribe(function (res) {
                    _this.entity.patient = res.body;
                    _this.patient = res.body;
                    _this.entity.facility = res.body.facility;
                    _this.patientService.getStatusDatesByPatient(res.body.id).subscribe(function (res) {
                        _this.statusDates = res;
                    });
                });
                if (_this.entity.id) {
                    _this.patientService.getStatusName(_this.entity.id).subscribe(function (res) { return _this.status = res; });
                    if (_this.entity && _this.entity.extra) {
                        _this.facilityTransferredTo = _this.entity.extra.facilityTransferredTo;
                    }
                }
            });
        };
        ClientStatusComponent.prototype.change = function (input) {
            if (input) {
                this.facilities = this.facilities.filter(function (f) { return f.toLowerCase().includes(input.toLowerCase()); });
            }
        };
        ClientStatusComponent.prototype.filterDates = function (date) {
            var exists = false;
            this.statusDates.forEach(function (d) {
                if (date.diff(d, 'days') === 0) {
                    exists = true;
                }
            });
            return (this.entity.id && date.diff(this.entity.dateStatus, 'days') === 0) || !exists;
        };
        ClientStatusComponent.prototype.previousState = function () {
            window.history.back();
        };
        ClientStatusComponent.prototype.save = function () {
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
            }
            else {
                this.subscribeToSaveResponse(this.patientService.saveClientStatus(this.entity));
            }
        };
        ClientStatusComponent.prototype.subscribeToSaveResponse = function (result) {
            var _this = this;
            result.subscribe(function (res) { return _this.onSaveSuccess(res.body); }, function (res) {
                _this.appLoaderService.close();
                _this.onSaveError();
                _this.onError(res.message);
            });
        };
        ClientStatusComponent.prototype.onSaveSuccess = function (result) {
            this.appLoaderService.close();
            this.isSaving = false;
            this.notification.showInfo('Client status update successfully saved');
            this.previousState();
        };
        ClientStatusComponent.prototype.onSaveError = function () {
            this.isSaving = false;
            this.notification.showError('Error saving status update');
        };
        ClientStatusComponent.prototype.onError = function (errorMessage) {
            this.isSaving = false;
            this.notification.showError(errorMessage);
        };
        ClientStatusComponent.ctorParameters = function () { return [
            { type: PatientService },
            { type: router.ActivatedRoute },
            { type: router.Router },
            { type: adfCore.NotificationService },
            { type: webCore.AppLoaderService }
        ]; };
        ClientStatusComponent = __decorate([
            core.Component({
                selector: 'client-status',
                template: "<script src=\"patient-details.component.ts\"></script>\n<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <form name=\"form\" role=\"form\" novalidate (ngSubmit)=\"save()\" #statusForm=\"ngForm\">\n            <mat-card class=\"default\">\n                <mat-card-content *ngIf=\"patient\">\n                    <div>\n                        <mat-form-field class=\"full-width\" *ngIf=\"entity\">\n                            <input matInput [matDatepicker]=\"picker\"\n                                   placeholder=\"{{entity.id ? 'Date of Status' : 'Date of New Status'}}\"\n                                   [(ngModel)]=\"entity.dateStatus\"\n                                   [matDatepickerFilter]=\"filterDates.bind(this)\"\n                                   #visit=\"ngModel\"\n                                   [max]=\"today\"\n                                   [min]=\"patient.dateRegistration\"\n                                   name=\"visit\"\n                                   required>\n                            <mat-datepicker-toggle\n                                    matSuffix\n                                    [for]=\"picker\">\n                            </mat-datepicker-toggle>\n                            <mat-datepicker #picker></mat-datepicker>\n                            <mat-error\n                                    *ngIf=\"visit.errors && (visit.dirty || visit.touched) && (visit.errors.required)\">\n                                Date of new status is required\n                            </mat-error>\n                            <mat-error\n                                    *ngIf=\"visit.errors && (visit.dirty || visit.touched) && (visit.errors.min)\">\n                                Date of new status cannot be before {{entity.patient.dateRegistration}}\n                            </mat-error>\n                            <mat-error\n                                    *ngIf=\"visit.errors && (visit.dirty || visit.touched) && (visit.errors.max)\">\n                                Date of new status cannot be in the future\n                            </mat-error>\n                        </mat-form-field>\n                    </div>\n                    <div>\n                        <mat-form-field class=\"full-width\">\n                            <mat-select [(ngModel)]=\"entity.status\"\n                                        placeholder=\"{{entity.id ? 'Status' : 'New Status'}}\"\n                                        #outcome=\"ngModel\" required name=\"outcome\">\n                                <mat-option></mat-option>\n                                <mat-option [value]=\"'ART_TRANSFER_OUT'\">ART Transfer Out</mat-option>\n                                <mat-option [value]=\"'PRE_ART_TRANSFER_OUT'\">Pre-ART Transfer Out</mat-option>\n                                <mat-option [value]=\"'STOPPED_TREATMENT'\">Stopped Treatment</mat-option>\n                                <mat-option [value]=\"'KNOWN_DEATH'\">Died (Confirmed)</mat-option>\n                                <mat-option [value]=\"'PREVIOUSLY_UNDOCUMENTED_TRANSFER_CONFIRMED'\">Previously\n                                    Undocumented Patient Transfer (Confirmed)\n                                </mat-option>\n                                <mat-option [value]=\"'TRACED_UNABLE_TO_LOCATE'\">Traced Patient (Unable to locate)\n                                </mat-option>\n                                <mat-option [value]=\"'TRACED_AGREED_TO_RETURN_TO_CARE'\">Traced Patient and agreed to\n                                    return to care\n                                </mat-option>\n                                <mat-option [value]=\"'DID_NOT_ATTEMPT_TO_TRACE'\">Did Not Attempt to Trace Patient\n                                </mat-option>\n                            </mat-select>\n                            <mat-error\n                                    *ngIf=\"outcome.errors && (outcome.dirty || outcome.touched) && (outcome.errors.required)\">\n                                New Status is required\n                            </mat-error>\n                        </mat-form-field>\n                    </div>\n                    <div class=\"row\" *ngIf=\"entity.outcome && entity.outcome.indexOf('TRACE') !== -1\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <input matInput [matDatepicker]=\"picker1\"\n                                       placeholder=\"Date of Tracked\"\n                                       [(ngModel)]=\"entity.dateTracked\"\n                                       #tracked=\"ngModel\"\n                                       [min]=\"entity.patient.dateRegistration\"\n                                       [max]=\"entity.dateStatus\"\n                                       name=\"tracked\"\n                                       required>\n                                <mat-datepicker-toggle\n                                        matSuffix\n                                        [for]=\"picker1\">\n                                </mat-datepicker-toggle>\n                                <mat-datepicker #picker1></mat-datepicker>\n                                <mat-error\n                                        *ngIf=\"tracked.errors && (tracked.dirty || tracked.touched) && (tracked.errors.required)\">\n                                    Date tracked is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\" *ngIf=\"entity.outcome === 'TRACED_AGREED_TO_RETURN_TO_CARE'\">\n                            <mat-form-field class=\"full-width\">\n                                <input matInput [matDatepicker]=\"picker2\"\n                                       placeholder=\"Date Agreed to Return\"\n                                       [(ngModel)]=\"entity.agreedDate\"\n                                       #agreed=\"ngModel\"\n                                       [min]=\"entity.dateStatus\"\n                                       name=\"agreed\"\n                                       required>\n                                <mat-datepicker-toggle\n                                        matSuffix\n                                        [for]=\"picker2\">\n                                </mat-datepicker-toggle>\n                                <mat-datepicker #picker2></mat-datepicker>\n                                <mat-error\n                                        *ngIf=\"agreed.errors && (agreed.dirty || agreed.touched) && (agreed.errors.required)\">\n                                    Date of agreed to return is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div *ngIf=\"entity.status === 'ART_TRANSFER_OUT'\">\n                        <mat-form-field class=\"full-width\">\n                            <input matInput type=\"text\" placeholder=\"Facility Transferred To\"\n                                   required name=\"fac\" #fac=\"ngModel\"\n                                   [(ngModel)]=\"facilityTransferredTo\"\n                                   (input)=\"change($event.target.value)\"\n                                   [matAutocomplete]=\"auto\">\n                            <mat-autocomplete #auto=\"matAutocomplete\">\n                                <mat-option *ngFor=\"let facility of facilities\"\n                                            [value]=\"facility\">{{facility}}</mat-option>\n                            </mat-autocomplete>\n                            <mat-error\n                                    *ngIf=\"fac.errors && (fac.dirty || fac.touched) && (fac.errors.required)\">\n                                Facility transferred to is required\n                            </mat-error>\n                        </mat-form-field>\n                    </div>\n                    <div *ngIf=\"entity.status === 'KNOWN_DEATH'\">\n                        <mat-form-field class=\"full-width\">\n                            <mat-select [(ngModel)]=\"entity.causeOfDeath\"\n                                        placeholder=\"Cause of Death\"\n                                        #death=\"ngModel\" required name=\"death\">\n                                <mat-option></mat-option>\n                                <mat-option [value]=\"'HIV disease resulting in TB'\">HIV disease resulting in TB\n                                </mat-option>\n                                <mat-option [value]=\"'HIV disease resulting in cancer'\">HIV disease resulting in\n                                    cancer\n                                </mat-option>\n                                <mat-option [value]=\"'HIV disease resulting in other infectious and parasitic disease'\">\n                                    HIV disease resulting in other infectious and parasitic disease\n                                </mat-option>\n                                <mat-option\n                                        [value]=\"'Other HIV disease resulting in other disease or conditions leading to death'\">\n                                    Other HIV disease resulting in other disease or conditions leading to death\n                                </mat-option>\n                                <mat-option [value]=\"'Other natural causes'\">Other natural causes</mat-option>\n                                <mat-option [value]=\"'Non-natural causes'\">Non-natural causes</mat-option>\n                                <mat-option [value]=\"'Unknown cause'\">Unknown cause</mat-option>\n                            </mat-select>\n                            <mat-error\n                                    *ngIf=\"death.errors && (death.dirty || death.touched) && (death.errors.required)\">\n                                Cause of death is required\n                            </mat-error>\n                        </mat-form-field>\n                    </div>\n                    <div *ngIf=\"entity.status === 'STOPPED_TREATMENT'\">\n                        <mat-form-field class=\"full-width\">\n                            <mat-select [(ngModel)]=\"entity.reasonForInterruption\"\n                                        placeholder=\"Reason for Interruption\"\n                                        #interrupt=\"ngModel\" required name=\"interrupt\">\n                                <mat-option></mat-option>\n                                <mat-option [value]=\"'Toxicity/side effect'\">Toxicity /side effect</mat-option>\n                                <mat-option [value]=\"'Pregnancy'\">Pregnancy</mat-option>\n                                <mat-option [value]=\"'Treatment failure'\">Treatment failure</mat-option>\n                                <mat-option [value]=\"'Poor adherence'\">Poor adherence</mat-option>\n                                <mat-option [value]=\"'Illness, hospitalization'\">Illness, hospitalization</mat-option>\n                                <mat-option [value]=\"'Drug out of stock'\">Drug out of stock</mat-option>\n                                <mat-option [value]=\"'Patient lacks finances'\">Patient lacks finances</mat-option>\n                                <mat-option [value]=\"'Other patient decision'\">Other patient decision</mat-option>\n                                <mat-option [value]=\"'Planned Rx interruption'\">Planned Rx interruption</mat-option>\n                                <mat-option [value]=\"'Other'\">Other</mat-option>\n                            </mat-select>\n                            <mat-error\n                                    *ngIf=\"interrupt.errors && (interrupt.dirty || interrupt.touched) && (interrupt.errors.required)\">\n                                Reason for interruption is required\n                            </mat-error>\n                        </mat-form-field>\n                    </div>\n                    <mat-divider></mat-divider>\n                </mat-card-content>\n                <mat-card-actions class=\"lamis-edit-form-actions\">\n                    <button mat-raised-button type=\"button\" (click)=\"previousState()\">Back</button>\n                    <button mat-raised-button color='primary'\n                            [disabled]=\"statusForm.invalid\"\n                            type=\"submit\">\n                        {{entity.id !== undefined ? 'Update' : 'Save'}}\n                    </button>\n                </mat-card-actions>\n            </mat-card>\n        </form>\n    </div>\n</div>\n"
            }),
            __metadata("design:paramtypes", [PatientService, router.ActivatedRoute, router.Router,
                adfCore.NotificationService, webCore.AppLoaderService])
        ], ClientStatusComponent);
        return ClientStatusComponent;
    }());

    var StatusResolve = /** @class */ (function () {
        function StatusResolve(service) {
            this.service = service;
        }
        StatusResolve.prototype.resolve = function (route, state) {
            var id = route.params['id'] ? route.params['id'] : null;
            if (id) {
                return this.service.findClientStatus(id).pipe(operators.filter(function (response) { return response.ok; }), operators.map(function (patient) { return patient.body; }));
            }
            return rxjs.of({});
        };
        StatusResolve.ctorParameters = function () { return [
            { type: PatientService }
        ]; };
        StatusResolve = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [PatientService])
        ], StatusResolve);
        return StatusResolve;
    }());
    var ɵ0$1 = {
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
    var ROUTES$1 = [
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

    var ClientStatusModule = /** @class */ (function () {
        function ClientStatusModule() {
        }
        ClientStatusModule = __decorate([
            core.NgModule({
                imports: [
                    common.CommonModule,
                    forms.FormsModule,
                    forms.ReactiveFormsModule,
                    core$1.CovalentDialogsModule,
                    webCore.LamisSharedModule,
                    webCore.JsonFormModule,
                    angularMaterialFormio.MatFormioModule,
                    material.MatInputModule,
                    material.MatIconModule,
                    material.MatDividerModule,
                    material.MatCardModule,
                    material.MatSelectModule,
                    material.MatButtonModule,
                    material.MatCheckboxModule,
                    material.MatTabsModule,
                    router.RouterModule.forChild(ROUTES$1),
                    material.MatProgressBarModule,
                    adfCore.CoreModule,
                    webCore.MatDateFormatModule
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
        return ClientStatusModule;
    }());

    exports.ClientStatusModule = ClientStatusModule;
    exports.PatientListComponent = PatientListComponent;
    exports.PatientModule = PatientModule;
    exports.PatientService = PatientService;
    exports.ɵa = PatientDetailsComponent;
    exports.ɵb = PatientEditComponent;
    exports.ɵc = WidgetContainerComponent;
    exports.ɵd = TimelineComponent;
    exports.ɵe = ObservationService;
    exports.ɵf = DetailedTimelineComponent;
    exports.ɵg = SummaryWidgetComponent;
    exports.ɵh = UniqueHospitalNumValidator;
    exports.ɵi = PatientResolve;
    exports.ɵj = ROUTES;
    exports.ɵk = TimelineWidgetModule;
    exports.ɵl = TimelineBadge;
    exports.ɵm = TimelineEvent;
    exports.ɵn = TimelineWidget;
    exports.ɵo = TimelineFooter;
    exports.ɵp = TimelineHeader;
    exports.ɵq = TimelinePanel;
    exports.ɵr = StatusResolve;
    exports.ɵs = ROUTES$1;
    exports.ɵt = ClientStatusComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=lamis-patient-1.4.1.umd.js.map
