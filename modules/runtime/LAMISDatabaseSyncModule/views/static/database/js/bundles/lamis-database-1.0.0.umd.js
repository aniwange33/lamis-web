(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@alfresco/adf-core'), require('@angular/common'), require('@angular/core'), require('@angular/material'), require('@angular/router'), require('@covalent/core'), require('@angular/common/http'), require('@lamis/web-core'), require('@angular/forms'), require('ng2-validation'), require('@stomp/ng2-stompjs'), require('moment')) :
        typeof define === 'function' && define.amd ? define('lamis-database-1.0.0', ['exports', '@alfresco/adf-core', '@angular/common', '@angular/core', '@angular/material', '@angular/router', '@covalent/core', '@angular/common/http', '@lamis/web-core', '@angular/forms', 'ng2-validation', '@stomp/ng2-stompjs', 'moment'], factory) :
            (global = global || self, factory((global['lamis-database-1'] = global['lamis-database-1'] || {}, global['lamis-database-1']['0'] = global['lamis-database-1']['0'] || {}, global['lamis-database-1']['0']['0'] = {}), global.adfCore, global.ng.common, global.ng.core, global.ng.material, global.ng.router, global.core$1, global.ng.common.http, global.webCore, global.ng.forms, global.ng2Validation, global.ng2Stompjs, global.moment_));
}(this, function (exports, adfCore, common, core, material, router, core$1, http, webCore, forms, ng2Validation, ng2Stompjs, moment_) {
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

    var ModuleUpdateService = /** @class */ (function () {
        function ModuleUpdateService(http, serverUrl) {
            this.http = http;
            this.serverUrl = serverUrl;
            this.resourceUrl = '';
            this.resourceUrl = serverUrl.SERVER_API_URL + '/api/module-update';
        }

        ModuleUpdateService.prototype.installUpdates = function () {
            return this.http.get(this.resourceUrl + "/install-updates");
        };
        ModuleUpdateService.prototype.availableUpdates = function () {
            return this.http.get(this.resourceUrl + "/available-updates");
        };
        ModuleUpdateService.ctorParameters = function () {
            return [
                {type: http.HttpClient},
                {type: undefined, decorators: [{type: core.Inject, args: [webCore.SERVER_API_URL_CONFIG,]}]}
            ];
        };
        ModuleUpdateService.ngInjectableDef = core.ɵɵdefineInjectable({
            factory: function ModuleUpdateService_Factory() {
                return new ModuleUpdateService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(webCore.SERVER_API_URL_CONFIG));
            }, token: ModuleUpdateService, providedIn: "root"
        });
        ModuleUpdateService = __decorate([
            core.Injectable({
                providedIn: 'root'
            }),
            __param(1, core.Inject(webCore.SERVER_API_URL_CONFIG)),
            __metadata("design:paramtypes", [http.HttpClient, Object])
        ], ModuleUpdateService);
        return ModuleUpdateService;
    }());

    var ModuleUpdatesComponent = /** @class */ (function () {
        function ModuleUpdatesComponent(service) {
            this.service = service;
            this.modules = [];
            this.isUpdating = false;
            this.installed = false;
        }

        ModuleUpdatesComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.service.availableUpdates().subscribe(function (res) {
                return _this.modules = res;
            });
        };
        ModuleUpdatesComponent.prototype.getProperties = function (module) {
            var properties = [];
            var description = new adfCore.CardViewTextItemModel({
                label: 'Description',
                value: module.description,
                key: 'desc',
            });
            properties.push(description);
            var active = new adfCore.CardViewBoolItemModel({
                label: 'Active',
                value: module.active,
                key: 'active',
            });
            properties.push(active);
            var version = new adfCore.CardViewTextItemModel({
                label: 'version',
                value: module.version,
                key: 'version',
            });
            properties.push(version);
            return properties;
        };
        ModuleUpdatesComponent.prototype.updateModules = function () {
            var _this = this;
            this.isUpdating = true;
            this.installed = false;
            this.service.installUpdates().subscribe(function (res) {
                _this.modules = res;
                _this.isUpdating = false;
                _this.installed = true;
            });
        };
        ModuleUpdatesComponent.prototype.previousState = function () {
            window.history.back();
        };
        ModuleUpdatesComponent.ctorParameters = function () {
            return [
                {type: ModuleUpdateService}
            ];
        };
        ModuleUpdatesComponent = __decorate([
            core.Component({
                selector: 'module-update',
                template: "<div class=\"layout\">\n    <div class=\"list-container\">\n        <mat-card>\n            <mat-card-header *ngIf=\"installed\">\n                Updates installed; please restart service or system\n            </mat-card-header>\n            <mat-card-content>\n                <div class=\"row\" *ngIf=\"modules\">\n                    <div class=\"col-sm-12 col-md-4 col-lg-6\"\n                         *ngFor=\"let module of modules\">\n                        <mat-card class=\"\">\n                            <mat-card-header>\n                                <mat-card-title>\n                                    {{module.name}}\n                                </mat-card-title>\n                            </mat-card-header>\n                            <mat-card-content>\n                                <adf-card-view [properties]=\"getProperties(module)\"></adf-card-view>\n                            </mat-card-content>\n                        </mat-card>\n                    </div>\n                </div>\n                <adf-empty-content\n                        *ngIf=\"!modules\"\n                        icon=\"group\"\n                        [title]=\"'No updates available'\">\n                </adf-empty-content>\n                <mat-divider></mat-divider>\n                <button mat-raised-button type=\"button\" (click)=\"previousState()\">Back</button>\n                <button mat-raised-button color='primary'\n                        (click)=\"updateModules()\"\n                        [disabled]=\"!modules || isUpdating\"\n                        type=\"submit\">\n                    Install Updates\n                </button>\n            </mat-card-content>\n        </mat-card>\n    </div>\n</div>\n"
            }),
            __metadata("design:paramtypes", [ModuleUpdateService])
        ], ModuleUpdatesComponent);
        return ModuleUpdatesComponent;
    }());

    var ɵ0 = {
        title: 'Module Updates',
        breadcrumb: 'MODULE UPDATES'
    }, ɵ1 = {
        authorities: ['ROLE_ADMIN'],
        title: 'Module Updates',
        breadcrumb: 'MODULE UPDATES'
    };
    var ROUTES = [
        {
            path: '',
            data: ɵ0,
            children: [
                {
                    path: '',
                    component: ModuleUpdatesComponent,
                    data: ɵ1,
                }
            ]
        }
    ];

    var moment = moment_;
    var DatabaseSyncComponent = /** @class */ (function () {
        function DatabaseSyncComponent(stompService) {
            this.stompService = stompService;
            this.syncing = false;
            this.tables = '';
            this.properties = [];
            this.statusProperties = [];
        }

        DatabaseSyncComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.statusSubscription = this.stompService.watch("/topic/server-status").subscribe(function (msg) {
                _this.properties = [];
                _this.properties.push(new adfCore.CardViewDateItemModel({
                    key: 'date',
                    value: moment(msg.body),
                    label: 'Last contact with Server',
                    format: 'DD MMM, YYYY HH:MM'
                }));
                _this.properties.push(new adfCore.CardViewDateItemModel({
                    key: 'date',
                    value: moment(msg.body),
                    label: 'Last successful upload to Server',
                    format: 'DD MMM, YYYY HH:MM'
                }));
            });
            this.syncSubscription = this.stompService.watch("/topic/server-status").subscribe(function (msg) {
                _this.properties = [];
                _this.properties.push(new adfCore.CardViewBoolItemModel({
                    key: 'date',
                    value: msg.body === 'true',
                    label: 'Upload Complete',
                }));
                _this.syncing = msg.body === 'false';
            });
            this.tableSubscription = this.stompService.watch("/topic/table-status").subscribe(function (msg) {
                _this.tables = msg.body;
            });
        };
        DatabaseSyncComponent.prototype.ngOnDestroy = function () {
            this.statusSubscription.unsubscribe();
            this.tableSubscription.unsubscribe();
            this.syncSubscription.unsubscribe();
        };
        DatabaseSyncComponent.prototype.sync = function () {
            this.syncing = true;
        };
        DatabaseSyncComponent.prototype.previousState = function () {
            window.history.back();
        };
        DatabaseSyncComponent.ctorParameters = function () {
            return [
                {type: ng2Stompjs.RxStompService}
            ];
        };
        DatabaseSyncComponent = __decorate([
            core.Component({
                selector: 'database-sync',
                template: "<mat-card>\n    <mat-card-content>\n        <adf-card-view [properties]=\"properties\" [editable]=\"false\"></adf-card-view>\n        <adf-card-view [properties]=\"statusProperties\" [editable]=\"false\"></adf-card-view>\n\n        <mat-form-field class=\"full-width\">\n            <mat-label>Synced Tables</mat-label>\n            <textarea matInput></textarea>\n        </mat-form-field>\n\n        <mat-divider></mat-divider>\n        <button mat-raised-button type=\"button\" (click)=\"previousState()\">Back</button>\n        <button mat-raised-button color='primary'\n                (click)=\"sync()\"\n                [disabled]=\"!syncing\"\n                type=\"submit\">\n            Upload to Server\n        </button>\n    </mat-card-content>\n</mat-card>\n"
            }),
            __metadata("design:paramtypes", [ng2Stompjs.RxStompService])
        ], DatabaseSyncComponent);
        return DatabaseSyncComponent;
    }());

    var ModuleUpdatesModule = /** @class */ (function () {
        function ModuleUpdatesModule() {
        }

        ModuleUpdatesModule = __decorate([
            core.NgModule({
                declarations: [
                    DatabaseSyncComponent,
                    ModuleUpdatesComponent
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
                    forms.ReactiveFormsModule,
                    webCore.MatDateFormatModule,
                    ng2Validation.CustomFormsModule
                ],
                exports: [],
                entryComponents: [],
                providers: []
            })
        ], ModuleUpdatesModule);
        return ModuleUpdatesModule;
    }());

    exports.ModuleUpdatesModule = ModuleUpdatesModule;
    exports.ɵa = DatabaseSyncComponent;
    exports.ɵb = ModuleUpdatesComponent;
    exports.ɵc = ModuleUpdateService;
    exports.ɵd = ROUTES;

    Object.defineProperty(exports, '__esModule', {value: true});

}));
//# sourceMappingURL=lamis-database-1.0.0.umd.js.map
