(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common/http'), require('@lamis/web-core'), require('@stomp/ng2-stompjs'), require('file-saver'), require('@angular/common'), require('@angular/material'), require('@angular/router'), require('@angular/forms'), require('@covalent/core')) :
        typeof define === 'function' && define.amd ? define('lamis-backup', ['exports', '@angular/core', '@angular/common/http', '@lamis/web-core', '@stomp/ng2-stompjs', 'file-saver', '@angular/common', '@angular/material', '@angular/router', '@angular/forms', '@covalent/core'], factory) :
            (global = global || self, factory(global['lamis-backup'] = {}, global.ng.core, global.ng.common.http, global.webCore, global.ng2Stompjs, global.fileSaver, global.ng.common, global.ng.material, global.ng.router, global.ng.forms, global.core$1));
}(this, function (exports, core, http, webCore, ng2Stompjs, fileSaver, common, material, router, forms, core$1) {
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

    var BackupService = /** @class */ (function () {
        function BackupService(http, serverUrl) {
            this.http = http;
            this.serverUrl = serverUrl;
            this.resourceUrl = '';
            this.resourceUrl = serverUrl.SERVER_API_URL + '/api/backup';
        }

        BackupService.prototype.uploadFile = function (form) {
            return this.http.post(this.resourceUrl + '/upload', form, {'observe': 'response'});
        };
        BackupService.prototype.download = function () {
            return this.http.get(this.resourceUrl + "/download", {responseType: 'blob'});
        };
        BackupService.prototype.restore = function () {
            return this.http.get(this.resourceUrl + "/restore");
        };
        BackupService.prototype.revert = function () {
            return this.http.get(this.resourceUrl + "/revert");
        };
        BackupService.prototype.backupAvailable = function () {
            return this.http.get(this.resourceUrl + "/backup-available");
        };
        BackupService.prototype.backup = function () {
            return this.http.get(this.resourceUrl + "/backup");
        };
        BackupService.ctorParameters = function () {
            return [
                {type: http.HttpClient},
                {type: undefined, decorators: [{type: core.Inject, args: [webCore.SERVER_API_URL_CONFIG,]}]}
            ];
        };
        BackupService = __decorate([
            core.Injectable(),
            __param(1, core.Inject(webCore.SERVER_API_URL_CONFIG)),
            __metadata("design:paramtypes", [http.HttpClient, Object])
        ], BackupService);
        return BackupService;
    }());

    var BackupComponent = /** @class */ (function () {
        function BackupComponent(backupService, stompService) {
            this.backupService = backupService;
            this.stompService = stompService;
            this.running = false;
            this.available = false;
            this.finished = false;
        }

        BackupComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.topicSubscription = this.stompService.watch('/topic/backup/status').subscribe(function (msg) {
                _this.status = msg.body + '\n' + _this.status;
                if (msg.body === 'Backup completed') {
                    _this.running = false;
                    _this.available = true;
                }
            });
            this.errorSubscription = this.stompService.watch('/topic/backup/error').subscribe(function (msg) {
                _this.status = 'Could not backup database; an error occurred';
                _this.running = false;
            });
            this.backupService.backupAvailable().subscribe(function (res) {
                return _this.available = res;
            });
        };
        BackupComponent.prototype.backup = function () {
            var _this = this;
            this.running = true;
            this.available = false;
            this.backupService.backup().subscribe(function (res) {
                return _this.running = false;
            });
        };
        BackupComponent.prototype.download = function () {
            this.backupService.download().subscribe(function (res) {
                var file = new File([res], name + 'backup.dump', {type: 'application/octet-stream'});
                fileSaver.saveAs(file);
            });
        };
        BackupComponent.prototype.ngOnDestroy = function () {
            this.topicSubscription.unsubscribe();
            this.errorSubscription.unsubscribe();
        };
        BackupComponent.ctorParameters = function () {
            return [
                {type: BackupService},
                {type: ng2Stompjs.RxStompService}
            ];
        };
        BackupComponent = __decorate([
            core.Component({
                selector: 'lamis-backup',
                template: "<div class=\"lamis-edit-form\">\r\n    <div class=\"lamis-edit-form-container\">\r\n        <mat-card>\r\n            <mat-card-content>\r\n                <mat-form-field *ngIf=\"!!status\">\r\n                    <textarea matInput placeholder=\"Status\" [value]=\"status\"\r\n                              rows=\"20\"\r\n                              [disabled]=\"true\"></textarea>\r\n                </mat-form-field>\r\n                <mat-divider></mat-divider>\r\n                <mat-card-actions>\r\n                    <button mat-raised-button color=\"primary\" [disabled]=\"running\"\r\n                            class=\"text-upper\"\r\n                            (click)=\"backup()\">Create New Backup\r\n                    </button>\r\n                    <button mat-button color=\"accent\" [disabled]=\"!available\" class=\"text-upper\"\r\n                            (click)=\"download()\">Download Backup\r\n                    </button>\r\n                </mat-card-actions>\r\n            </mat-card-content>\r\n        </mat-card>\r\n    </div>\r\n</div>"
            }),
            __metadata("design:paramtypes", [BackupService, ng2Stompjs.RxStompService])
        ], BackupComponent);
        return BackupComponent;
    }());

    var RestoreComponent = /** @class */ (function () {
        function RestoreComponent(backupService, stompService, loaderService) {
            this.backupService = backupService;
            this.stompService = stompService;
            this.loaderService = loaderService;
            this.submitted = false;
            this.running = false;
            this.available = false;
        }

        RestoreComponent.prototype.ngOnDestroy = function () {
            this.topicSubscription.unsubscribe();
            this.errorSubscription.unsubscribe();
        };
        RestoreComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.topicSubscription = this.stompService.watch('/topic/backup/status').subscribe(function (msg) {
                _this.status = msg.body + '\n' + _this.status;
                _this.running = msg.body !== 'Restore completed';
            });
            this.errorSubscription = this.stompService.watch('/topic/backup/error').subscribe(function (msg) {
                _this.status = 'Could not restore database; an error occurred';
                _this.running = false;
            });
            this.backupService.backupAvailable().subscribe(function (res) {
                return _this.available = res;
            });
        };
        RestoreComponent.prototype.upload = function () {
            var _this = this;
            var formData = new FormData();
            formData.append('file', this.files);
            this.loaderService.open('Uploading file: please wait...');
            this.backupService.uploadFile(formData).subscribe(function (res) {
                _this.loaderService.close();
                _this.submitted = true;
            });
        };
        RestoreComponent.prototype.restore = function () {
            this.status = 'Starting restore';
            this.submitted = false;
            this.backupService.restore().subscribe();
        };
        RestoreComponent.prototype.revert = function () {
            this.running = true;
            this.backupService.revert().subscribe();
        };
        RestoreComponent.ctorParameters = function () {
            return [
                {type: BackupService},
                {type: ng2Stompjs.RxStompService},
                {type: webCore.AppLoaderService}
            ];
        };
        RestoreComponent = __decorate([
            core.Component({
                selector: 'lamis-restore',
                template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <mat-card>\n            <mat-card-content>\n                <div layout=\"row\">\n                    <mat-form-field tdFileDrop\n                                    (fileDrop)=\"files = $event\"\n                                    (click)=\"fileInput.inputElement.click()\"\n                                    (keyup.enter)=\"fileInput.inputElement.click()\"\n                                    (keyup.delete)=\"fileInput.clear()\"\n                                    (keyup.backspace)=\"fileInput.clear()\"\n                                    flex>\n                        <input matInput\n                               placeholder=\"Select or drop a file\"\n                               [value]=\"files?.length ? (files?.length + ' files') : files?.name\"\n                               readonly/>\n                    </mat-form-field>\n                    <button mat-icon-button *ngIf=\"files\" (click)=\"fileInput.clear()\" (keyup.enter)=\"fileInput.clear()\">\n                        <mat-icon>cancel</mat-icon>\n                    </button>\n                    <td-file-input class=\"push-left-sm push-right-sm\" #fileInput [(ngModel)]=\"files\">\n                        <mat-icon>folder</mat-icon>\n                        <span class=\"text-upper\">Browse...</span>\n                    </td-file-input>\n                    <span>\n                <button mat-raised-button color=\"accent\" [disabled]=\"!files || running\" class=\"text-upper\"\n                        (click)=\"upload()\">Upload</button>\n            </span>\n                </div>\n                <mat-form-field *ngIf=\"!!status\">\n                    <textarea matInput placeholder=\"Status\" [value]=\"status\"\n                              rows=\"20\"\n                              [disabled]=\"true\"></textarea>\n                </mat-form-field>\n                <mat-divider></mat-divider>\n                <mat-card-actions>\n                    <button mat-button [disabled]=\"running || !available\" class=\"text-upper\"\n                    (click)=\"revert()\">Revert to Previous backup\n                    </button>\n                    <button mat-raised-button color=\"primary\" [disabled]=\"running || !submitted\" class=\"text-upper\"\n                            (click)=\"restore()\">Restore\n                    </button>\n                </mat-card-actions>\n            </mat-card-content>\n        </mat-card>\n    </div>\n</div>",
                styles: [".drop-zone{font-weight:600}.drop-zone ::ng-deep *{pointer-events:none}"]
            }),
            __metadata("design:paramtypes", [BackupService, ng2Stompjs.RxStompService,
                webCore.AppLoaderService])
        ], RestoreComponent);
        return RestoreComponent;
    }());

    var ɵ0 = {
        title: 'Backup/ Restore',
        breadcrumb: 'BACKUP/ RESTORE'
    }, ɵ1 = {
        breadcrumb: 'BACKUP'
    }, ɵ2 = {
        breadcrumb: 'RESTORE'
    };
    var ROUTES = [
        {
            path: '',
            data: ɵ0,
            children: [
                {
                    path: 'backup',
                    component: BackupComponent,
                    data: ɵ1,
                },
                {
                    path: 'restore',
                    component: RestoreComponent,
                    data: ɵ2,
                }
            ]
        }
    ];

    var BackupModule = /** @class */ (function () {
        function BackupModule() {
        }

        BackupModule = __decorate([
            core.NgModule({
                declarations: [
                    BackupComponent,
                    RestoreComponent
                ],
                imports: [
                    common.CommonModule,
                    forms.FormsModule,
                    material.MatInputModule,
                    material.MatIconModule,
                    material.MatDividerModule,
                    material.MatCardModule,
                    material.MatButtonModule,
                    material.MatTabsModule,
                    router.RouterModule.forChild(ROUTES),
                    core$1.CovalentCommonModule,
                    core$1.CovalentFileModule
                ],
                exports: [
                    BackupComponent,
                    RestoreComponent
                ],
                providers: [
                    BackupService
                ]
            })
        ], BackupModule);
        return BackupModule;
    }());

    exports.BackupComponent = BackupComponent;
    exports.BackupModule = BackupModule;
    exports.BackupService = BackupService;
    exports.ROUTES = ROUTES;
    exports.RestoreComponent = RestoreComponent;
    exports.ɵ0 = ɵ0;
    exports.ɵ1 = ɵ1;
    exports.ɵ2 = ɵ2;

    Object.defineProperty(exports, '__esModule', {value: true});

}));
//# sourceMappingURL=lamis-backup.umd.js.map
