(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common/http'), require('@lamis/web-core'), require('@stomp/ng2-stompjs'), require('@angular/platform-browser'), require('file-saver'), require('@angular/common'), require('@angular/material'), require('@angular/router'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('lamis-ndr', ['exports', '@angular/core', '@angular/common/http', '@lamis/web-core', '@stomp/ng2-stompjs', '@angular/platform-browser', 'file-saver', '@angular/common', '@angular/material', '@angular/router', '@angular/forms'], factory) :
    (global = global || self, factory(global['lamis-ndr'] = {}, global.ng.core, global.ng.common.http, global.webCore, global.ng2Stompjs, global.ng.platformBrowser, global.fileSaver, global.ng.common, global.ng.material, global.ng.router, global.ng.forms));
}(this, function (exports, core, http, webCore, ng2Stompjs, platformBrowser, fileSaver, common, material, router, forms) { 'use strict';

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

    var NdrConverterService = /** @class */ (function () {
        function NdrConverterService(http, serverUrl) {
            this.http = http;
            this.serverUrl = serverUrl;
            this.resourceUrl = '';
            this.resourceUrl = serverUrl.SERVER_API_URL + '/api/ndr';
        }
        NdrConverterService.prototype.convert = function (ids) {
            var params = new http.HttpParams();
            ids.forEach(function (id) { return params = params.append("ids", id.toString()); });
            return this.http.get(this.resourceUrl + "/run", { params: params });
        };
        NdrConverterService.prototype.listFacilities = function () {
            return this.http.get(this.resourceUrl + "/list-facilities");
        };
        NdrConverterService.prototype.download = function (name) {
            return this.http.get(this.resourceUrl + "/download/" + name, { responseType: 'blob' });
        };
        NdrConverterService.prototype.listFiles = function () {
            return this.http.get(this.resourceUrl + "/list-files");
        };
        NdrConverterService.prototype.deduplicate = function () {
            return this.http.get(this.resourceUrl + "/remove-duplicates");
        };
        NdrConverterService.ctorParameters = function () { return [
            { type: http.HttpClient },
            { type: undefined, decorators: [{ type: core.Inject, args: [webCore.SERVER_API_URL_CONFIG,] }] }
        ]; };
        NdrConverterService = __decorate([
            core.Injectable(),
            __param(1, core.Inject(webCore.SERVER_API_URL_CONFIG)),
            __metadata("design:paramtypes", [http.HttpClient, Object])
        ], NdrConverterService);
        return NdrConverterService;
    }());

    var NdrConverterComponent = /** @class */ (function () {
        function NdrConverterComponent(ndrService, stompService, domSanitizer) {
            this.ndrService = ndrService;
            this.stompService = stompService;
            this.domSanitizer = domSanitizer;
            this.facilities = [];
            this.running = false;
            this.finished = false;
        }
        NdrConverterComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.ndrService.listFacilities().subscribe(function (res) { return _this.facilities = res; });
            this.topicSubscription = this.stompService.watch("/topic/ndr-status").subscribe(function (msg) {
                if (msg.body === 'start') {
                    _this.running = true;
                }
                else if (msg.body === 'end') {
                    _this.running = false;
                    _this.message = "Conversion finished; download files from Download tab";
                    _this.finished = true;
                    _this.ndrService.listFiles().subscribe(function (res) {
                        _this.files = res;
                    });
                }
                else {
                    _this.message = msg.body;
                    _this.running = true;
                }
            });
        };
        NdrConverterComponent.prototype.selected = function () {
            return this.facilities.filter(function (f) { return f.selected; }).length > 0;
        };
        NdrConverterComponent.prototype.download = function (name) {
            this.ndrService.download(name).subscribe(function (res) {
                var file = new File([res], name + '.zip', { type: 'application/octet-stream' });
                fileSaver.saveAs(file);
            });
        };
        NdrConverterComponent.prototype.tabChanged = function (event) {
            var _this = this;
            if (event.index === 1) {
                this.ndrService.listFiles().subscribe(function (res) {
                    _this.files = res;
                });
            }
        };
        NdrConverterComponent.prototype.convert = function () {
            var ids = this.facilities.filter(function (f) { return f.selected; })
                .map(function (f) { return f.id; });
            this.ndrService.convert(ids).subscribe();
        };
        NdrConverterComponent.prototype.deduplicate = function () {
            var _this = this;
            this.running = true;
            this.ndrService.deduplicate().subscribe(function (res) { return _this.running = false; });
        };
        NdrConverterComponent.prototype.ngOnDestroy = function () {
            this.topicSubscription.unsubscribe();
        };
        NdrConverterComponent.ctorParameters = function () { return [
            { type: NdrConverterService },
            { type: ng2Stompjs.RxStompService },
            { type: platformBrowser.DomSanitizer }
        ]; };
        NdrConverterComponent = __decorate([
            core.Component({
                selector: 'ndr-converter',
                template: "<mat-card>\n    <mat-card-content>\n        <mat-tab-group (selectedTabChange)=\"tabChanged($event)\">\n            <mat-tab label=\"Conversion\">\n                <ng-container *ngIf=\"running\">\n                    <mat-progress-bar mode=\"indeterminate\"></mat-progress-bar>\n                    <mat-form-field style=\"width: 100%\">\n                        <input [disabled]=\"true\" matInput [value]=\"message\"/>\n                    </mat-form-field>\n                </ng-container>\n                <ng-container *ngIf=\"finished\">\n                    <mat-form-field style=\"width: 100%\">\n                        <input [disabled]=\"true\" matInput [value]=\"message\"/>\n                    </mat-form-field>\n                </ng-container>\n                <mat-list>\n                    <div mat-subheader>Available Facilities</div>\n                    <mat-list-item *ngFor=\"let facility of facilities\">\n                        <mat-icon mat-list-icon>account_balance</mat-icon>\n                        <div mat-line>\n                            <mat-checkbox\n                                    [(ngModel)]=\"facility.selected\"\n                                    labelPosition=\"before\">\n                                {{facility.name}}\n                            </mat-checkbox>\n                        </div>\n                    </mat-list-item>\n                    <mat-divider></mat-divider>\n                    <button mat-button\n                            (click)=\"deduplicate()\"\n                            [disabled]=\"running\">Remove Duplicate Records\n                    </button>\n                    <button mat-raised-button color=\"primary\"\n                            (click)=\"convert()\"\n                            [disabled]=\"running || !selected()\">Generate NDR\n                    </button>\n                </mat-list>\n            </mat-tab>\n            <mat-tab label=\"Download\">\n                <mat-list>\n                    <div mat-subheader>Available NDR Files</div>\n                    <mat-list-item *ngFor=\"let file of files\">\n                        <div mat-line>\n                            {{file}}\n                            <button mat-list-icon\n                                    (click)=\"download(file)\">\n                                <mat-icon>file_download</mat-icon>\n                            </button>\n                        </div>\n                    </mat-list-item>\n                </mat-list>\n            </mat-tab>\n        </mat-tab-group>\n    </mat-card-content>\n</mat-card>"
            }),
            __metadata("design:paramtypes", [NdrConverterService, ng2Stompjs.RxStompService, platformBrowser.DomSanitizer])
        ], NdrConverterComponent);
        return NdrConverterComponent;
    }());

    var ɵ0 = {
        title: 'NDR Converter',
        breadcrumb: 'NDR CONVERTER'
    }, ɵ1 = {
        breadcrumb: 'NDR CONVERTER'
    };
    var ROUTES = [
        {
            path: '',
            data: ɵ0,
            children: [
                {
                    path: '',
                    component: NdrConverterComponent,
                    data: ɵ1,
                }
            ]
        }
    ];

    var NdrModule = /** @class */ (function () {
        function NdrModule() {
        }
        NdrModule = __decorate([
            core.NgModule({
                declarations: [
                    NdrConverterComponent
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
                    router.RouterModule.forChild(ROUTES),
                    material.MatProgressBarModule,
                    material.MatListModule,
                    material.MatCheckboxModule
                ],
                exports: [
                    NdrConverterComponent
                ],
                providers: [
                    NdrConverterService
                ]
            })
        ], NdrModule);
        return NdrModule;
    }());

    exports.NdrConverterComponent = NdrConverterComponent;
    exports.NdrConverterService = NdrConverterService;
    exports.NdrModule = NdrModule;
    exports.ROUTES = ROUTES;
    exports.ɵ0 = ɵ0;
    exports.ɵ1 = ɵ1;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=lamis-ndr.umd.js.map
