(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common/http'), require('@lamis/web-core'), require('@angular/common'), require('@angular/material'), require('@angular/router'), require('@alfresco/adf-core'), require('@angular/forms'), require('rxjs'), require('rxjs/operators'), require('@covalent/core'), require('@ng-bootstrap/ng-bootstrap')) :
    typeof define === 'function' && define.amd ? define('lamis-facility-1.2.0', ['exports', '@angular/core', '@angular/common/http', '@lamis/web-core', '@angular/common', '@angular/material', '@angular/router', '@alfresco/adf-core', '@angular/forms', 'rxjs', 'rxjs/operators', '@covalent/core', '@ng-bootstrap/ng-bootstrap'], factory) :
    (global = global || self, factory((global['lamis-facility-1'] = global['lamis-facility-1'] || {}, global['lamis-facility-1']['2'] = global['lamis-facility-1']['2'] || {}, global['lamis-facility-1']['2']['0'] = {}), global.ng.core, global.ng.common.http, global.webCore, global.ng.common, global.ng.material, global.ng.router, global.adfCore, global.ng.forms, global.rxjs, global.rxjs.operators, global.core$1, global.ngBootstrap));
}(this, (function (exports, core, http, webCore, common, material, router, adfCore, forms, rxjs, operators, core$1, ngBootstrap) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
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
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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

    function __createBinding(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    }

    function __exportStar(m, exports) {
        for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
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

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    var FacilityService = /** @class */ (function () {
        function FacilityService(http, serverUrl) {
            this.http = http;
            this.serverUrl = serverUrl;
            this.resourceUrl = '';
            this.resourceUrl = serverUrl.SERVER_API_URL + '/api/facilities';
        }
        FacilityService.prototype.update = function (facility) {
            return this.http
                .post(this.resourceUrl + "/switch", facility, { observe: 'response' });
        };
        FacilityService.prototype.getFacilitiesByLga = function (id) {
            return this.http
                .get(this.resourceUrl + "/lga/" + id, { observe: 'body' });
        };
        FacilityService.prototype.getStates = function () {
            return this.http.get('/api/states');
        };
        FacilityService.prototype.getLgaByState = function (id) {
            return this.http.get("/api/provinces/state/" + id);
        };
        FacilityService.prototype.getActive = function () {
            return this.http
                .get(this.resourceUrl + "/active", { observe: 'response' });
        };
        FacilityService.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: undefined, decorators: [{ type: core.Inject, args: [webCore.SERVER_API_URL_CONFIG,] }] }
        ]; };
        FacilityService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function FacilityService_Factory() { return new FacilityService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(webCore.SERVER_API_URL_CONFIG)); }, token: FacilityService, providedIn: "root" });
        FacilityService = __decorate([
            core.Injectable({ providedIn: 'root' }),
            __param(1, core.Inject(webCore.SERVER_API_URL_CONFIG))
        ], FacilityService);
        return FacilityService;
    }());

    var FacilityComponent = /** @class */ (function () {
        function FacilityComponent(facilityService, notification) {
            this.facilityService = facilityService;
            this.notification = notification;
        }
        FacilityComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.facilityService.getStates().subscribe(function (res) { return _this.states = res; });
            this.facility = this.facilityService.getActive().subscribe(function (res) {
                if (res.body) {
                    _this.facility = res.body;
                }
            });
        };
        FacilityComponent.prototype.entityCompare = function (e1, e2) {
            return webCore.entityCompare(e1, e2);
        };
        FacilityComponent.prototype.stateChanged = function (id) {
            var _this = this;
            this.facilityService.getLgaByState(id).subscribe(function (res) { return _this.lgas = res; });
        };
        FacilityComponent.prototype.lgaChanged = function (id) {
            var _this = this;
            this.facilityService.getFacilitiesByLga(id).subscribe(function (res) { return _this.facilities = res; });
        };
        FacilityComponent.prototype.setActive = function () {
            var _this = this;
            this.facilityService.update(this.active).subscribe(function (res) {
                if (res.ok && res.body) {
                    _this.facilityService.getActive().subscribe(function (r) {
                        if (r.body) {
                            _this.facility = r.body;
                        }
                    });
                    _this.notification.showInfo("Facility switched to " + res.body.name);
                }
            });
        };
        FacilityComponent.ctorParameters = function () { return [
            { type: FacilityService },
            { type: adfCore.NotificationService }
        ]; };
        FacilityComponent = __decorate([
            core.Component({
                selector: 'lamis-facility',
                template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <mat-card>\n            <mat-card-header>\n                Switch Facility\n            </mat-card-header>\n            <form name=\"form\" role=\"form\" novalidate (ngSubmit)=\"setActive()\" #facilityForm=\"ngForm\">\n                <mat-card-content>\n                    <div class=\"row\">\n                        <div class=\"col-md-12\">\n                            Active Facility: {{facility.name}}\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-select placeholder=\"State\"\n                                            (selectionChange)=\"stateChanged($event.value)\">\n                                    <mat-option *ngFor=\"let state of states\"\n                                                [value]=\"state.id\">{{state.name}}</mat-option>\n                                </mat-select>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-select placeholder=\"LGA\"\n                                            (selectionChange)=\"lgaChanged($event.value)\">\n                                    <mat-option *ngFor=\"let lga of lgas\"\n                                                [value]=\"lga.id\">{{lga.name}}</mat-option>\n                                </mat-select>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-select placeholder=\"Facility\"\n                                            [(ngModel)]=\"active\"\n                                            required\n                                            [compareWith]=\"entityCompare\"\n                                            #fac=\"ngModel\"\n                                            name=\"facility\">\n                                    <mat-option></mat-option>\n                                    <mat-option *ngFor=\"let facility of facilities\"\n                                                [value]=\"facility\">{{facility.name}}</mat-option>\n                                </mat-select>\n                                <mat-error *ngIf=\"fac.errors\">\n                                    Facility is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <mat-divider></mat-divider>\n                </mat-card-content>\n                <mat-card-actions class=\"lamis-edit-form-actions\">\n                    <button mat-raised-button color=\"primary\" [disabled]=\"facilityForm.invalid\">Switch Facility</button>\n                </mat-card-actions>\n            </form>\n        </mat-card>\n    </div>\n</div>\n",
                styles: [".bold{font-weight:700}"]
            })
        ], FacilityComponent);
        return FacilityComponent;
    }());

    var ɵ0 = {
        title: 'Facility Switch',
        breadcrumb: 'FACILITY SWITCH'
    }, ɵ1 = {
        authorities: ['ROLE_USER'],
        title: 'Facility Switch',
        breadcrumb: 'FACILITY SWITCH'
    };
    var ROUTES = [
        {
            path: '',
            data: ɵ0,
            children: [
                {
                    path: '',
                    component: FacilityComponent,
                    data: ɵ1,
                },
            ]
        }
    ];

    var FacilityModule = /** @class */ (function () {
        function FacilityModule() {
        }
        FacilityModule = __decorate([
            core.NgModule({
                declarations: [
                    FacilityComponent
                ],
                imports: [
                    common.CommonModule,
                    material.MatInputModule,
                    material.MatIconModule,
                    material.MatDividerModule,
                    material.MatCardModule,
                    material.MatSelectModule,
                    material.MatButtonModule,
                    forms.FormsModule,
                    router.RouterModule.forChild(ROUTES)
                ],
                exports: [
                    FacilityComponent
                ],
                entryComponents: [],
                providers: []
            })
        ], FacilityModule);
        return FacilityModule;
    }());

    var CommunityPharmacyService = /** @class */ (function () {
        function CommunityPharmacyService(http, serverUrl) {
            this.http = http;
            this.serverUrl = serverUrl;
            this.resourceUrl = '';
            this.resourceUrl = serverUrl.SERVER_API_URL + '/api/community-pharmacies';
        }
        CommunityPharmacyService.prototype.create = function (caseManager) {
            return this.http
                .post(this.resourceUrl, caseManager, { observe: 'response' });
        };
        CommunityPharmacyService.prototype.update = function (caseManager) {
            return this.http
                .put(this.resourceUrl, caseManager, { observe: 'response' });
        };
        CommunityPharmacyService.prototype.find = function (id) {
            return this.http
                .get(this.resourceUrl + "/" + id, { observe: 'response' });
        };
        CommunityPharmacyService.prototype.delete = function (id) {
            return this.http.delete(this.resourceUrl + "/" + id, { observe: 'response' });
        };
        CommunityPharmacyService.prototype.query = function (req) {
            var options = webCore.createRequestOption(req);
            return this.http
                .get(this.resourceUrl, { params: options, observe: 'response' });
        };
        CommunityPharmacyService.prototype.getLgasByState = function (id) {
            return this.http.get("/api/provinces/state/" + id);
        };
        CommunityPharmacyService.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: undefined, decorators: [{ type: core.Inject, args: [webCore.SERVER_API_URL_CONFIG,] }] }
        ]; };
        CommunityPharmacyService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function CommunityPharmacyService_Factory() { return new CommunityPharmacyService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(webCore.SERVER_API_URL_CONFIG)); }, token: CommunityPharmacyService, providedIn: "root" });
        CommunityPharmacyService = __decorate([
            core.Injectable({
                providedIn: 'root'
            }),
            __param(1, core.Inject(webCore.SERVER_API_URL_CONFIG))
        ], CommunityPharmacyService);
        return CommunityPharmacyService;
    }());

    var CommunityPharmacyListComponent = /** @class */ (function () {
        function CommunityPharmacyListComponent(service, facilityService, notification, router, activatedRoute) {
            this.service = service;
            this.facilityService = facilityService;
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
        CommunityPharmacyListComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.facilityService.getActive().subscribe(function (res) {
                _this.facility = res.body;
                _this.onPageChange(0);
            });
        };
        CommunityPharmacyListComponent.prototype.select = function (data) {
            this.router.navigate(['..', 'community-pharmacies', data.obj.id, 'view'], { relativeTo: this.activatedRoute });
        };
        CommunityPharmacyListComponent.prototype.onPageChange = function (pageInfo) {
            this.page = pageInfo;
            this.loadAll(pageInfo - 1);
        };
        CommunityPharmacyListComponent.prototype.loadPage = function (page) {
            this.page = page;
            this.loadAll(page - 1);
        };
        CommunityPharmacyListComponent.prototype.loadAll = function (page) {
            var _this = this;
            this.loading = true;
            this.service.query({
                keyword: this.currentSearch,
                page: page < 0 ? 0 : page,
                stateId: this.facility && this.facility.state && this.facility.state.id || 0,
                size: this.itemsPerPage,
                sort: ['id', 'asc']
            }).subscribe(function (res) {
                _this.onSuccess(res.body, res.headers);
            }, function (res) { return _this.onError(res); });
        };
        CommunityPharmacyListComponent.prototype.onSuccess = function (data, headers) {
            this.communityPharmacies = data;
            this.totalItems = headers.get('X-Total-Count');
            this.loading = false;
        };
        CommunityPharmacyListComponent.prototype.onError = function (error) {
            this.notification.openSnackMessage(error.message);
            this.loading = false;
        };
        CommunityPharmacyListComponent.ctorParameters = function () { return [
            { type: CommunityPharmacyService },
            { type: FacilityService },
            { type: adfCore.NotificationService },
            { type: router.Router },
            { type: router.ActivatedRoute }
        ]; };
        CommunityPharmacyListComponent = __decorate([
            core.Component({
                selector: 'community-pharmacies',
                template: "<div class=\"layout\">\n    <div class=\"list-container\">\n        <adf-datatable *ngIf=\"communityPharmacies\"\n                       [rows]=\"communityPharmacies\"\n                       [loading]=\"loading\"\n                       [display]=\"display\"\n                       (rowClick)=\"select($event.value)\">\n            <data-columns>\n                <data-column key=\"name\" title=\"Name\" sortable=\"true\"></data-column>\n                <data-column key=\"pin\" title=\"PIN\" sortable=\"true\"></data-column>\n                <data-column key=\"phone\" title=\"Telephone Number\" sortable=\"true\"></data-column>\n                <data-column key=\"address\" title=\"Address\" class=\"full-width ellipsis-cell\"></data-column>\n                <data-column key=\"active\" title=\"Active\" sortable=\"true\">\n                    <ng-template let-context=\"$implicit\">\n                        <mat-checkbox [checked]=\"context.row.getValue('active')\"></mat-checkbox>\n                    </ng-template>\n                </data-column>\n            </data-columns>\n            <adf-loading-content-template>\n                <ng-template>\n                    <mat-progress-spinner\n                            class=\"adf-document-list-loading-margin\"\n                            [color]=\"'primary'\"\n                            [mode]=\"'indeterminate'\">\n                    </mat-progress-spinner>\n                </ng-template>\n            </adf-loading-content-template>\n        </adf-datatable>\n    </div>\n    <adf-empty-content\n            *ngIf=\"!communityPharmacies\"\n            icon=\"blur_on\"\n            [title]=\"'No Community Pharmacies found'\"\n            [subtitle]=\"'No Community Pharmacies matching search criteria or no Community Pharmacies available'\">\n    </adf-empty-content>\n    <ngb-pagination [collectionSize]=\"totalItems\"\n                    [(page)]=\"page\"\n                    [pageSize]=\"itemsPerPage\"\n                    [maxSize]=\"5\"\n                    size=\"sm\"\n                    [rotate]=\"true\"\n                    [boundaryLinks]=\"true\"\n                    (pageChange)=\"loadPage(page)\">\n    </ngb-pagination>\n\n</div>\n<div class=\"fab-container\">\n    <button mat-fab\n            [matTooltip]=\"'Add New Community Pharmacy'\"\n            [routerLink]=\"['new']\">\n        <mat-icon>add</mat-icon>\n    </button>\n</div>\n"
            })
        ], CommunityPharmacyListComponent);
        return CommunityPharmacyListComponent;
    }());

    var CommunityPharmacyDetailsComponent = /** @class */ (function () {
        function CommunityPharmacyDetailsComponent(router, route, service, _dialogService, notificationService) {
            this.router = router;
            this.route = route;
            this.service = service;
            this._dialogService = _dialogService;
            this.notificationService = notificationService;
            this.properties = [];
        }
        CommunityPharmacyDetailsComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.route.data.subscribe(function (_a) {
                var entity = _a.entity;
                _this.entity = !!entity && entity.body ? entity.body : entity;
                _this.buildProperties();
            });
        };
        CommunityPharmacyDetailsComponent.prototype.edit = function () {
            this.router.navigate(['/', 'admin', 'config', 'community-pharmacies', this.entity.id, 'edit']);
        };
        CommunityPharmacyDetailsComponent.prototype.delete = function () {
            var _this = this;
            this._dialogService.openConfirm({
                title: 'Confirm',
                message: 'Do you want to delete this Community Pharmacy, action cannot be reversed?',
                cancelButton: 'No',
                acceptButton: 'Yes',
                width: '500px',
            }).afterClosed().subscribe(function (accept) {
                if (accept) {
                    _this.service.delete(_this.entity.id).subscribe(function (res) {
                        if (res.ok) {
                            _this.router.navigate(['admin', 'config', 'community-pharmacies']);
                        }
                        else {
                            _this.notificationService.showError('Error deleting Community Pharmacy, please try again');
                        }
                    });
                }
                else {
                    // DO SOMETHING ELSE
                }
            });
        };
        CommunityPharmacyDetailsComponent.prototype.buildProperties = function () {
            this.properties.push(new adfCore.CardViewTextItemModel({
                label: 'Name',
                key: 'cs',
                value: this.entity.name
            }));
            this.properties.push(new adfCore.CardViewTextItemModel({
                label: 'Address',
                key: 'fs',
                value: this.entity.address
            }));
            this.properties.push(new adfCore.CardViewTextItemModel({
                label: 'PIN',
                key: 'fs',
                value: this.entity.pin
            }));
            this.properties.push(new adfCore.CardViewTextItemModel({
                label: 'Phone',
                key: 'ts',
                value: this.entity.phone
            }));
            this.properties.push(new adfCore.CardViewTextItemModel({
                label: 'Email',
                key: 'cd4p',
                value: this.entity.email
            }));
            this.properties.push(new adfCore.CardViewBoolItemModel({
                label: 'Active',
                key: 'cd4p',
                value: this.entity.active
            }));
        };
        CommunityPharmacyDetailsComponent.prototype.previousState = function () {
            window.history.back();
        };
        CommunityPharmacyDetailsComponent.ctorParameters = function () { return [
            { type: router.Router },
            { type: router.ActivatedRoute },
            { type: CommunityPharmacyService },
            { type: core$1.TdDialogService },
            { type: adfCore.NotificationService }
        ]; };
        CommunityPharmacyDetailsComponent = __decorate([
            core.Component({
                selector: 'community-pharmacy-details',
                template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <mat-card>\n            <mat-card-header>\n            </mat-card-header>\n            <mat-card-content>\n                <adf-card-view [properties]=\"properties\" editable=\"false\"></adf-card-view>\n            </mat-card-content>\n            <mat-card-actions class=\"lamis-edit-form-actions\">\n                <button mat-button (click)=\"previousState()\">Back</button>\n                <button mat-raised-button color=\"primary\" (click)=\"edit()\">Edit</button>\n            </mat-card-actions>\n        </mat-card>\n    </div>\n</div>\n"
            })
        ], CommunityPharmacyDetailsComponent);
        return CommunityPharmacyDetailsComponent;
    }());

    var CommunityPharmacyEditComponent = /** @class */ (function () {
        function CommunityPharmacyEditComponent(service, notification, facilityService, activatedRoute, appLoaderService) {
            this.service = service;
            this.notification = notification;
            this.facilityService = facilityService;
            this.activatedRoute = activatedRoute;
            this.appLoaderService = appLoaderService;
            this.states = [];
            this.lgas = [];
        }
        CommunityPharmacyEditComponent.prototype.createEntity = function () {
            return {};
        };
        CommunityPharmacyEditComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.isSaving = false;
            this.activatedRoute.data.subscribe(function (_a) {
                var entity = _a.entity;
                _this.entity = !!entity && entity.body ? entity.body : entity;
                if (_this.entity === undefined) {
                    _this.entity = _this.createEntity();
                    _this.entity.active = true;
                }
            });
            this.facilityService.getActive().subscribe(function (res) {
                var facility = res.body;
                _this.entity.state = facility.state;
                _this.states.push(_this.entity.state);
                _this.stateChange(facility.state.id);
            });
        };
        CommunityPharmacyEditComponent.prototype.save = function () {
            this.isSaving = true;
            this.appLoaderService.open('Saving Community Pharmacy..');
            if (this.entity.id !== undefined) {
                this.subscribeToSaveResponse(this.service.update(this.entity));
            }
            else {
                this.subscribeToSaveResponse(this.service.create(this.entity));
            }
        };
        CommunityPharmacyEditComponent.prototype.previousState = function () {
            window.history.back();
        };
        CommunityPharmacyEditComponent.prototype.subscribeToSaveResponse = function (result) {
            var _this = this;
            result.subscribe(function (res) { return _this.onSaveSuccess(res.body); }, function (res) {
                _this.onSaveError();
                _this.onError(res.message);
            });
        };
        CommunityPharmacyEditComponent.prototype.onSaveSuccess = function (result) {
            this.appLoaderService.close();
            this.isSaving = false;
            this.notification.openSnackMessage('Community Pharmacy successfully saved');
            this.previousState();
        };
        CommunityPharmacyEditComponent.prototype.onSaveError = function () {
            this.isSaving = false;
            this.appLoaderService.close();
            //this.submitButton.disabled = true;
            this.notification.showError('Error occurred saving Community Pharmacy; try again');
            //this.progressBar.mode = 'determinate';
        };
        CommunityPharmacyEditComponent.prototype.onError = function (errorMessage) {
            this.appLoaderService.close();
            this.notification.showError(errorMessage);
        };
        CommunityPharmacyEditComponent.prototype.stateChange = function (id) {
            var _this = this;
            this.service.getLgasByState(id).subscribe(function (res) { return _this.lgas = res; });
        };
        CommunityPharmacyEditComponent.prototype.entityCompare = function (e1, e2) {
            return webCore.entityCompare(e1, e2);
        };
        CommunityPharmacyEditComponent.ctorParameters = function () { return [
            { type: CommunityPharmacyService },
            { type: adfCore.NotificationService },
            { type: FacilityService },
            { type: router.ActivatedRoute },
            { type: webCore.AppLoaderService }
        ]; };
        CommunityPharmacyEditComponent = __decorate([
            core.Component({
                selector: 'community-pharmacy-edit',
                template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <form name=\"form\" role=\"form\" novalidate (ngSubmit)=\"save()\" #cpForm=\"ngForm\">\n            <mat-card class=\"default\">\n                <mat-card-content>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Name</mat-label>\n                                <input matInput name=\"name\" #name=\"ngModel\"\n                                       required\n                                       [(ngModel)]=\"entity.name\"/>\n                                <mat-error\n                                        *ngIf=\"name.errors && (name.dirty || name.touched) && (name.errors.required)\">\n                                    Community Pharmacy name is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>PIN</mat-label>\n                                <input matInput name=\"pin\" #pin=\"ngModel\"\n                                       required\n                                       [(ngModel)]=\"entity.pin\"/>\n                                <mat-error\n                                        *ngIf=\"pin.errors && (pin.dirty || pin.touched) && (pin.errors.required)\">\n                                    PIN is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>State</mat-label>\n                                <mat-select name=\"state\" [(ngModel)]=\"entity.state\"\n                                            [compareWith]=\"entityCompare\"\n                                            required\n                                            #s=\"ngModel\"\n                                            (selectionChange)=\"stateChange($event.value.id)\">\n                                    <mat-option></mat-option>\n                                    <mat-option *ngFor=\"let state of states\" [value]=\"state\">{{state.name}}</mat-option>\n                                </mat-select>\n                                <mat-error\n                                        *ngIf=\"s.errors && (s.dirty || s.touched || !!entity.id) && (s.errors.required)\">\n                                    State is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>LGA</mat-label>\n                                <mat-select name=\"lga\" [(ngModel)]=\"entity.lga\" required #l=\"ngModel\"\n                                            [compareWith]=\"entityCompare\">\n                                    <mat-option></mat-option>\n                                    <mat-option *ngFor=\"let lga of lgas\" [value]=\"lga\">{{lga.name}}</mat-option>\n                                </mat-select>\n                                <mat-error\n                                        *ngIf=\"l.errors && (l.dirty || l.touched || !!entity.id) && (l.errors.required)\">\n                                    LGA is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Address</mat-label>\n                                <textarea matInput name=\"address\" [(ngModel)]=\"entity.address\" #address=\"ngModel\"\n                                          rows=\"2\" >\n                                </textarea>\n                                <mat-error\n                                        *ngIf=\"address.errors && (address.dirty || address.touched) && (address.errors.required)\">\n                                    Community Pharmacy address is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Email</mat-label>\n                                <input matInput name=\"email\" type=\"email\" #email=\"ngModel\"\n                                       [(ngModel)]=\"entity.email\"/>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Telephone</mat-label>\n                                <input matInput name=\"phone\" phoneNumber [(ngModel)]=\"entity.phone\"\n                                       #phone=\"ngModel\"/>\n                                <mat-error\n                                        *ngIf=\"phone.errors && (phone.dirty || phone.touched) && (phone.errors.invalidPhone)\">\n                                    Invalid phone number\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-checkbox name=\"active\" [(ngModel)]=\"entity.active\">Active</mat-checkbox>\n                        </div>\n                    </div>\n                </mat-card-content>\n                <mat-card-actions class=\"lamis-edit-form-actions\">\n                    <button mat-raised-button type=\"button\" (click)=\"previousState()\">Back</button>\n                    <button mat-raised-button color='primary'\n                            [disabled]=\"cpForm.invalid || isSaving\"\n                            type=\"submit\">\n                        {{entity.id !== undefined ? 'Update' : 'Save'}}\n                    </button>\n                </mat-card-actions>\n            </mat-card>\n        </form>\n    </div>\n</div>\n"
            })
        ], CommunityPharmacyEditComponent);
        return CommunityPharmacyEditComponent;
    }());

    var CommunityPharmacyResolve = /** @class */ (function () {
        function CommunityPharmacyResolve(service) {
            this.service = service;
        }
        CommunityPharmacyResolve.prototype.resolve = function (route, state) {
            var id = route.params['id'] ? route.params['id'] : null;
            if (id) {
                return this.service.find(id).pipe(operators.filter(function (response) { return response.ok; }), operators.map(function (patient) { return patient.body; }));
            }
            return rxjs.of({});
        };
        CommunityPharmacyResolve.ctorParameters = function () { return [
            { type: CommunityPharmacyService }
        ]; };
        CommunityPharmacyResolve = __decorate([
            core.Injectable()
        ], CommunityPharmacyResolve);
        return CommunityPharmacyResolve;
    }());
    var ɵ0$1 = {
        title: 'Community Pharmacies',
        breadcrumb: 'COMMUNITY PHARMACIES'
    }, ɵ1$1 = {
        authorities: ['ROLE_USER'],
        title: 'Community Pharmacies',
        breadcrumb: 'COMMUNITY PHARMACIES'
    }, ɵ2 = {
        authorities: ['ROLE_USER'],
        title: 'Community Pharmacy',
        breadcrumb: 'COMMUNITY PHARMACY'
    }, ɵ3 = {
        authorities: ['ROLE_DEC'],
        title: 'Add Community Pharmacy',
        breadcrumb: 'ADD COMMUNITY PHARMACY'
    }, ɵ4 = {
        authorities: ['ROLE_DEC'],
        title: 'Community Pharmacy Edit',
        breadcrumb: 'COMMUNITY PHARMACY EDIT'
    };
    var ROUTES$1 = [
        {
            path: '',
            data: ɵ0$1,
            children: [
                {
                    path: '',
                    component: CommunityPharmacyListComponent,
                    data: ɵ1$1,
                },
                {
                    path: ':id/view',
                    component: CommunityPharmacyDetailsComponent,
                    resolve: {
                        entity: CommunityPharmacyResolve
                    },
                    data: ɵ2,
                },
                {
                    path: 'new',
                    component: CommunityPharmacyEditComponent,
                    data: ɵ3,
                },
                {
                    path: ':id/edit',
                    component: CommunityPharmacyEditComponent,
                    resolve: {
                        entity: CommunityPharmacyResolve
                    },
                    data: ɵ4,
                }
            ]
        }
    ];

    var CommunityPharmacyModule = /** @class */ (function () {
        function CommunityPharmacyModule() {
        }
        CommunityPharmacyModule = __decorate([
            core.NgModule({
                declarations: [
                    CommunityPharmacyDetailsComponent,
                    CommunityPharmacyEditComponent,
                    CommunityPharmacyListComponent
                ],
                imports: [
                    common.CommonModule,
                    material.MatInputModule,
                    material.MatIconModule,
                    material.MatDividerModule,
                    material.MatCardModule,
                    material.MatSelectModule,
                    material.MatButtonModule,
                    forms.FormsModule,
                    router.RouterModule.forChild(ROUTES$1),
                    adfCore.CoreModule,
                    core$1.CovalentCommonModule,
                    core$1.CovalentDialogsModule,
                    ngBootstrap.NgbModule,
                    webCore.LamisCoreModule
                ],
                exports: [],
                providers: [
                    CommunityPharmacyResolve
                ]
            })
        ], CommunityPharmacyModule);
        return CommunityPharmacyModule;
    }());

    exports.CommunityPharmacyModule = CommunityPharmacyModule;
    exports.FacilityModule = FacilityModule;
    exports.FacilityService = FacilityService;
    exports.ɵa = FacilityComponent;
    exports.ɵb = ROUTES;
    exports.ɵc = CommunityPharmacyDetailsComponent;
    exports.ɵd = CommunityPharmacyService;
    exports.ɵe = CommunityPharmacyEditComponent;
    exports.ɵf = CommunityPharmacyListComponent;
    exports.ɵg = CommunityPharmacyResolve;
    exports.ɵh = ROUTES$1;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=lamis-facility-1.2.0.umd.js.map
