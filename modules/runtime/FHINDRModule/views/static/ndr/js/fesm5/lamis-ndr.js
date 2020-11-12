import {__decorate, __param, __metadata} from 'tslib';
import {Inject, Injectable, Component, NgModule} from '@angular/core';
import {HttpParams, HttpClient} from '@angular/common/http';
import {SERVER_API_URL_CONFIG} from '@lamis/web-core';
import {RxStompService} from '@stomp/ng2-stompjs';
import {DomSanitizer} from '@angular/platform-browser';
import {saveAs} from 'file-saver';
import {CommonModule} from '@angular/common';
import {
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatTabsModule,
    MatProgressBarModule,
    MatListModule,
    MatCheckboxModule
} from '@angular/material';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

var NdrConverterService = /** @class */ (function () {
    function NdrConverterService(http, serverUrl) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.resourceUrl = '';
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/ndr';
    }

    NdrConverterService.prototype.convert = function (ids) {
        var params = new HttpParams();
        ids.forEach(function (id) {
            return params = params.append("ids", id.toString());
        });
        return this.http.get(this.resourceUrl + "/run", {params: params});
    };
    NdrConverterService.prototype.listFacilities = function () {
        return this.http.get(this.resourceUrl + "/list-facilities");
    };
    NdrConverterService.prototype.download = function (name) {
        return this.http.get(this.resourceUrl + "/download/" + name, {responseType: 'blob'});
    };
    NdrConverterService.prototype.listFiles = function () {
        return this.http.get(this.resourceUrl + "/list-files");
    };
    NdrConverterService.prototype.deduplicate = function () {
        return this.http.get(this.resourceUrl + "/remove-duplicates");
    };
    NdrConverterService.ctorParameters = function () {
        return [
            {type: HttpClient},
            {type: undefined, decorators: [{type: Inject, args: [SERVER_API_URL_CONFIG,]}]}
        ];
    };
    NdrConverterService = __decorate([
        Injectable(),
        __param(1, Inject(SERVER_API_URL_CONFIG)),
        __metadata("design:paramtypes", [HttpClient, Object])
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
        this.ndrService.listFacilities().subscribe(function (res) {
            return _this.facilities = res;
        });
        this.topicSubscription = this.stompService.watch("/topic/ndr-status").subscribe(function (msg) {
            if (msg.body === 'start') {
                _this.running = true;
            } else if (msg.body === 'end') {
                _this.running = false;
                _this.message = "Conversion finished; download files from Download tab";
                _this.finished = true;
                _this.ndrService.listFiles().subscribe(function (res) {
                    _this.files = res;
                });
            } else {
                _this.message = msg.body;
                _this.running = true;
            }
        });
    };
    NdrConverterComponent.prototype.selected = function () {
        return this.facilities.filter(function (f) {
            return f.selected;
        }).length > 0;
    };
    NdrConverterComponent.prototype.download = function (name) {
        this.ndrService.download(name).subscribe(function (res) {
            var file = new File([res], name + '.zip', {type: 'application/octet-stream'});
            saveAs(file);
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
        var ids = this.facilities.filter(function (f) {
            return f.selected;
        })
            .map(function (f) {
                return f.id;
            });
        this.ndrService.convert(ids).subscribe();
    };
    NdrConverterComponent.prototype.deduplicate = function () {
        var _this = this;
        this.running = true;
        this.ndrService.deduplicate().subscribe(function (res) {
            return _this.running = false;
        });
    };
    NdrConverterComponent.prototype.ngOnDestroy = function () {
        this.topicSubscription.unsubscribe();
    };
    NdrConverterComponent.ctorParameters = function () {
        return [
            {type: NdrConverterService},
            {type: RxStompService},
            {type: DomSanitizer}
        ];
    };
    NdrConverterComponent = __decorate([
        Component({
            selector: 'ndr-converter',
            template: "<mat-card>\r\n    <mat-card-content>\r\n        <mat-tab-group (selectedTabChange)=\"tabChanged($event)\">\r\n            <mat-tab label=\"Conversion\">\r\n                <ng-container *ngIf=\"running\">\r\n                    <mat-progress-bar mode=\"indeterminate\"></mat-progress-bar>\r\n                    <mat-form-field style=\"width: 100%\">\r\n                        <input [disabled]=\"true\" matInput [value]=\"message\"/>\r\n                    </mat-form-field>\r\n                </ng-container>\r\n                <ng-container *ngIf=\"finished\">\r\n                    <mat-form-field style=\"width: 100%\">\r\n                        <input [disabled]=\"true\" matInput [value]=\"message\"/>\r\n                    </mat-form-field>\r\n                </ng-container>\r\n                <mat-list>\r\n                    <div mat-subheader>Available Facilities</div>\r\n                    <mat-list-item *ngFor=\"let facility of facilities\">\r\n                        <mat-icon mat-list-icon>account_balance</mat-icon>\r\n                        <div mat-line>\r\n                            <mat-checkbox\r\n                                    [(ngModel)]=\"facility.selected\"\r\n                                    labelPosition=\"before\">\r\n                                {{facility.name}}\r\n                            </mat-checkbox>\r\n                        </div>\r\n                    </mat-list-item>\r\n                    <mat-divider></mat-divider>\r\n                    <button mat-button\r\n                            (click)=\"deduplicate()\"\r\n                            [disabled]=\"running\">Remove Duplicate Records\r\n                    </button>\r\n                    <button mat-raised-button color=\"primary\"\r\n                            (click)=\"convert()\"\r\n                            [disabled]=\"running || !selected()\">Generate NDR\r\n                    </button>\r\n                </mat-list>\r\n            </mat-tab>\r\n            <mat-tab label=\"Download\">\r\n                <mat-list>\r\n                    <div mat-subheader>Available NDR Files</div>\r\n                    <mat-list-item *ngFor=\"let file of files\">\r\n                        <div mat-line>\r\n                            {{file}}\r\n                            <button mat-list-icon\r\n                                    (click)=\"download(file)\">\r\n                                <mat-icon>file_download</mat-icon>\r\n                            </button>\r\n                        </div>\r\n                    </mat-list-item>\r\n                </mat-list>\r\n            </mat-tab>\r\n        </mat-tab-group>\r\n    </mat-card-content>\r\n</mat-card>"
        }),
        __metadata("design:paramtypes", [NdrConverterService, RxStompService, DomSanitizer])
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
        NgModule({
            declarations: [
                NdrConverterComponent
            ],
            imports: [
                CommonModule,
                FormsModule,
                MatInputModule,
                MatIconModule,
                MatDividerModule,
                MatCardModule,
                MatSelectModule,
                MatButtonModule,
                MatTabsModule,
                RouterModule.forChild(ROUTES),
                MatProgressBarModule,
                MatListModule,
                MatCheckboxModule
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

/*
 * Public API Surface of Patient
 */

/**
 * Generated bundle index. Do not edit.
 */

export {NdrConverterComponent, NdrConverterService, NdrModule, ROUTES, ɵ0, ɵ1};
//# sourceMappingURL=lamis-ndr.js.map
