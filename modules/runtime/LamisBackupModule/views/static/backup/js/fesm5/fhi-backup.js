import {__decorate, __param, __metadata} from 'tslib';
import {Inject, Injectable, Component, NgModule} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SERVER_API_URL_CONFIG, AppLoaderService} from '@lamis/web-core';
import {RxStompService} from '@stomp/ng2-stompjs';
import {saveAs} from 'file-saver';
import {CommonModule} from '@angular/common';
import {
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule
} from '@angular/material';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CovalentCommonModule, CovalentFileModule} from '@covalent/core';

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
            {type: HttpClient},
            {type: undefined, decorators: [{type: Inject, args: [SERVER_API_URL_CONFIG,]}]}
        ];
    };
    BackupService = __decorate([
        Injectable(),
        __param(1, Inject(SERVER_API_URL_CONFIG)),
        __metadata("design:paramtypes", [HttpClient, Object])
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
            _this.status = _this.status + '\n' + msg.body;
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
            saveAs(file);
        });
    };
    BackupComponent.prototype.ngOnDestroy = function () {
        this.topicSubscription.unsubscribe();
        this.errorSubscription.unsubscribe();
    };
    BackupComponent.ctorParameters = function () {
        return [
            {type: BackupService},
            {type: RxStompService}
        ];
    };
    BackupComponent = __decorate([
        Component({
            selector: 'lamis-backup',
            template: "<div class=\"lamis-edit-form\">\r\n    <div class=\"lamis-edit-form-container\">\r\n        <mat-card>\r\n            <mat-card-content>\r\n                <mat-form-field *ngIf=\"!!status\">\r\n                    <textarea matInput placeholder=\"Status\" [value]=\"status\"\r\n                              rows=\"20\"\r\n                              [disabled]=\"true\"></textarea>\r\n                </mat-form-field>\r\n                <mat-divider></mat-divider>\r\n                <mat-card-actions>\r\n                    <button mat-raised-button color=\"primary\" [disabled]=\"running\"\r\n                            class=\"text-upper\"\r\n                            (click)=\"backup()\">Create New Backup\r\n                    </button>\r\n                    <button mat-button color=\"accent\" [disabled]=\"!available\" class=\"text-upper\"\r\n                            (click)=\"download()\">Download Backup\r\n                    </button>\r\n                </mat-card-actions>\r\n            </mat-card-content>\r\n        </mat-card>\r\n    </div>\r\n</div>"
        }),
        __metadata("design:paramtypes", [BackupService, RxStompService])
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
            _this.status = _this.status + '\n' + msg.body;
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
            {type: RxStompService},
            {type: AppLoaderService}
        ];
    };
    RestoreComponent = __decorate([
        Component({
            selector: 'lamis-restore',
            template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <mat-card>\n            <mat-card-content>\n                <div layout=\"row\">\n                    <mat-form-field tdFileDrop\n                                    (fileDrop)=\"files = $event\"\n                                    (click)=\"fileInput.inputElement.click()\"\n                                    (keyup.enter)=\"fileInput.inputElement.click()\"\n                                    (keyup.delete)=\"fileInput.clear()\"\n                                    (keyup.backspace)=\"fileInput.clear()\"\n                                    flex>\n                        <input matInput\n                               placeholder=\"Select or drop a file\"\n                               [value]=\"files?.length ? (files?.length + ' files') : files?.name\"\n                               readonly/>\n                    </mat-form-field>\n                    <button mat-icon-button *ngIf=\"files\" (click)=\"fileInput.clear()\" (keyup.enter)=\"fileInput.clear()\">\n                        <mat-icon>cancel</mat-icon>\n                    </button>\n                    <td-file-input class=\"push-left-sm push-right-sm\" #fileInput [(ngModel)]=\"files\">\n                        <mat-icon>folder</mat-icon>\n                        <span class=\"text-upper\">Browse...</span>\n                    </td-file-input>\n                    <span>\n                <button mat-raised-button color=\"accent\" [disabled]=\"!files || running\" class=\"text-upper\"\n                        (click)=\"upload()\">Upload</button>\n            </span>\n                </div>\n                <mat-form-field *ngIf=\"!!status\">\n                    <textarea matInput placeholder=\"Status\" [value]=\"status\"\n                              rows=\"20\"\n                              [disabled]=\"true\"></textarea>\n                </mat-form-field>\n                <mat-divider></mat-divider>\n                <mat-card-actions>\n                    <button mat-button [disabled]=\"running || !available\" class=\"text-upper\"\n                    (click)=\"revert()\">Revert to Previous backup\n                    </button>\n                    <button mat-raised-button color=\"primary\" [disabled]=\"running || !submitted\" class=\"text-upper\"\n                            (click)=\"restore()\">Restore\n                    </button>\n                </mat-card-actions>\n            </mat-card-content>\n        </mat-card>\n    </div>\n</div>",
            styles: [".drop-zone{font-weight:600}.drop-zone ::ng-deep *{pointer-events:none}"]
        }),
        __metadata("design:paramtypes", [BackupService, RxStompService,
            AppLoaderService])
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
        NgModule({
            declarations: [
                BackupComponent,
                RestoreComponent
            ],
            imports: [
                CommonModule,
                FormsModule,
                MatInputModule,
                MatIconModule,
                MatDividerModule,
                MatCardModule,
                MatButtonModule,
                MatTabsModule,
                RouterModule.forChild(ROUTES),
                CovalentCommonModule,
                CovalentFileModule
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

/*
 * Public API Surface of Backup Module
 */

/**
 * Generated bundle index. Do not edit.
 */

export {BackupComponent, BackupModule, BackupService, ROUTES, RestoreComponent, ɵ0, ɵ1, ɵ2};
//# sourceMappingURL=fhi-backup.js.map
