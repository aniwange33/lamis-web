import {__decorate, __param, __metadata} from 'tslib';
import {CardViewTextItemModel, CardViewBoolItemModel, CardViewDateItemModel, CoreModule} from '@alfresco/adf-core';
import {CommonModule} from '@angular/common';
import {Inject, ɵɵdefineInjectable, ɵɵinject, Injectable, Component, NgModule} from '@angular/core';
import {
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressBarModule,
    MatTableModule,
    MatListModule
} from '@angular/material';
import {RouterModule} from '@angular/router';
import {CovalentMessageModule, CovalentDialogsModule} from '@covalent/core';
import {HttpClient} from '@angular/common/http';
import {SERVER_API_URL_CONFIG, MatDateFormatModule} from '@lamis/web-core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CustomFormsModule} from 'ng2-validation';
import {RxStompService} from '@stomp/ng2-stompjs';
import * as moment_ from 'moment';

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
            {type: HttpClient},
            {type: undefined, decorators: [{type: Inject, args: [SERVER_API_URL_CONFIG,]}]}
        ];
    };
    ModuleUpdateService.ngInjectableDef = ɵɵdefineInjectable({
        factory: function ModuleUpdateService_Factory() {
            return new ModuleUpdateService(ɵɵinject(HttpClient), ɵɵinject(SERVER_API_URL_CONFIG));
        }, token: ModuleUpdateService, providedIn: "root"
    });
    ModuleUpdateService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __param(1, Inject(SERVER_API_URL_CONFIG)),
        __metadata("design:paramtypes", [HttpClient, Object])
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
        var description = new CardViewTextItemModel({
            label: 'Description',
            value: module.description,
            key: 'desc',
        });
        properties.push(description);
        var active = new CardViewBoolItemModel({
            label: 'Active',
            value: module.active,
            key: 'active',
        });
        properties.push(active);
        var version = new CardViewTextItemModel({
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
        Component({
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
            _this.properties.push(new CardViewDateItemModel({
                key: 'date',
                value: moment(msg.body),
                label: 'Last contact with Server',
                format: 'DD MMM, YYYY HH:MM'
            }));
            _this.properties.push(new CardViewDateItemModel({
                key: 'date',
                value: moment(msg.body),
                label: 'Last successful upload to Server',
                format: 'DD MMM, YYYY HH:MM'
            }));
        });
        this.syncSubscription = this.stompService.watch("/topic/server-status").subscribe(function (msg) {
            _this.properties = [];
            _this.properties.push(new CardViewBoolItemModel({
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
            {type: RxStompService}
        ];
    };
    DatabaseSyncComponent = __decorate([
        Component({
            selector: 'database-sync',
            template: "<mat-card>\n    <mat-card-content>\n        <adf-card-view [properties]=\"properties\" [editable]=\"false\"></adf-card-view>\n        <adf-card-view [properties]=\"statusProperties\" [editable]=\"false\"></adf-card-view>\n\n        <mat-form-field class=\"full-width\">\n            <mat-label>Synced Tables</mat-label>\n            <textarea matInput></textarea>\n        </mat-form-field>\n\n        <mat-divider></mat-divider>\n        <button mat-raised-button type=\"button\" (click)=\"previousState()\">Back</button>\n        <button mat-raised-button color='primary'\n                (click)=\"sync()\"\n                [disabled]=\"!syncing\"\n                type=\"submit\">\n            Upload to Server\n        </button>\n    </mat-card-content>\n</mat-card>\n"
        }),
        __metadata("design:paramtypes", [RxStompService])
    ], DatabaseSyncComponent);
    return DatabaseSyncComponent;
}());

var ModuleUpdatesModule = /** @class */ (function () {
    function ModuleUpdatesModule() {
    }

    ModuleUpdatesModule = __decorate([
        NgModule({
            declarations: [
                DatabaseSyncComponent,
                ModuleUpdatesComponent
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
                ReactiveFormsModule,
                MatDateFormatModule,
                CustomFormsModule
            ],
            exports: [],
            entryComponents: [],
            providers: []
        })
    ], ModuleUpdatesModule);
    return ModuleUpdatesModule;
}());

/*
 * Public API Surface of Clinic
 */

/**
 * Generated bundle index. Do not edit.
 */

export {
    ModuleUpdatesModule,
    DatabaseSyncComponent as ɵa,
    ModuleUpdatesComponent as ɵb,
    ModuleUpdateService as ɵc,
    ROUTES as ɵd
};
//# sourceMappingURL=lamis-database-1.0.0.js.map
