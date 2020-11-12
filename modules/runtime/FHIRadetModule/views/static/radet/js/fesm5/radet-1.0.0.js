import {__decorate, __param, __metadata} from 'tslib';
import {Inject, Injectable, Component, NgModule} from '@angular/core';
import {HttpParams, HttpClient} from '@angular/common/http';
import {DATE_FORMAT, SERVER_API_URL_CONFIG} from '@lamis/web-core';
import * as moment_ from 'moment';
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
import {DropDownListModule} from '@syncfusion/ej2-angular-dropdowns';
import {DateRangePickerModule, DatePickerModule} from '@syncfusion/ej2-angular-calendars';

var moment = moment_;
var RadetConverterService = /** @class */ (function () {
    function RadetConverterService(http, serverUrl) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.resourceUrl = '';
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/radet';
    }

    RadetConverterService.prototype.convert = function (start, end, reportingPeriod, ids, today) {
        var params = new HttpParams();
        params = params.append('cohortStart', moment(start).format(DATE_FORMAT));
        params = params.append('cohortEnd', moment(end).format(DATE_FORMAT));
        params = params.append('reportingPeriod', moment(reportingPeriod).format(DATE_FORMAT));
        params = params.append("today", today);
        ids.forEach(function (id) {
            return params = params.append("ids", id.toString());
        });
        return this.http.get(this.resourceUrl + "/convert", {params: params});
    };
    RadetConverterService.prototype.listFacilities = function () {
        return this.http.get(this.resourceUrl + "/list-facilities");
    };
    RadetConverterService.prototype.download = function (name) {
        return this.http.get(this.resourceUrl + "/download/" + name, {responseType: 'blob'});
    };
    RadetConverterService.prototype.listFiles = function () {
        return this.http.get(this.resourceUrl + "/list-files");
    };
    RadetConverterService.ctorParameters = function () {
        return [
            {type: HttpClient},
            {type: undefined, decorators: [{type: Inject, args: [SERVER_API_URL_CONFIG,]}]}
        ];
    };
    RadetConverterService = __decorate([
        Injectable(),
        __param(1, Inject(SERVER_API_URL_CONFIG)),
        __metadata("design:paramtypes", [HttpClient, Object])
    ], RadetConverterService);
    return RadetConverterService;
}());

var RadetConverterComponent = /** @class */ (function () {
    function RadetConverterComponent(service, stompService, domSanitizer) {
        this.service = service;
        this.stompService = stompService;
        this.domSanitizer = domSanitizer;
        this.facilities = [];
        this.running = false;
        this.finished = false;
        this.dateRange = {
            start: new Date(1900, 0, 1),
            end: new Date()
        };
        this.reportingPeriod = new Date();
        this.todaySelectable = true;
        this.today = new Date();
        this.current = false;
    }

    RadetConverterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.listFacilities().subscribe(function (res) {
            return _this.facilities = res;
        });
        this.topicSubscription = this.stompService.watch("/topic/radet/status").subscribe(function (msg) {
            if (msg.body === 'start') {
                _this.running = true;
            } else if (msg.body === 'end') {
                _this.running = false;
                _this.message = "Conversion finished; download files from Download tab";
                _this.finished = true;
                _this.service.listFiles().subscribe(function (res) {
                    _this.files = res;
                });
            } else {
                _this.message = msg.body;
                _this.running = true;
            }
        });
    };
    RadetConverterComponent.prototype.selected = function () {
        return this.facilities.filter(function (f) {
            return f.selected;
        }).length > 0;
    };
    RadetConverterComponent.prototype.download = function (name) {
        this.service.download(name).subscribe(function (res) {
            var file = new File([res], name + '_Radet.xlsx', {type: 'application/octet-stream'});
            saveAs(file);
        });
    };
    RadetConverterComponent.prototype.tabChanged = function (event) {
        var _this = this;
        if (event.index === 1) {
            this.service.listFiles().subscribe(function (res) {
                _this.files = res;
            });
        }
    };
    RadetConverterComponent.prototype.monthChanged = function (month) {
        this.todaySelectable = new Date().getMonth() === month.getMonth();
    };
    RadetConverterComponent.prototype.convert = function () {
        this.running = true;
        this.finished = false;
        var ids = this.facilities.filter(function (f) {
            return f.selected;
        })
            .map(function (f) {
                return f.id;
            });
        this.service.convert(this.dateRange.start, this.dateRange.end, this.reportingPeriod, ids, this.current).subscribe();
    };
    RadetConverterComponent.prototype.ngOnDestroy = function () {
        this.topicSubscription.unsubscribe();
    };
    RadetConverterComponent.ctorParameters = function () {
        return [
            {type: RadetConverterService},
            {type: RxStompService},
            {type: DomSanitizer}
        ];
    };
    RadetConverterComponent = __decorate([
        Component({
            selector: 'radet-converter',
            template: "<mat-card>\r\n    <mat-card-content>\r\n        <mat-tab-group (selectedTabChange)=\"tabChanged($event)\">\r\n            <mat-tab label=\"Conversion\">\r\n                <mat-card>\r\n                    <mat-card-header class=\"full-width\">\r\n                        <ng-container *ngIf=\"running\">\r\n                            <div class=\"full-width\">\r\n                                <mat-progress-bar class=\"full-width\" mode=\"indeterminate\"></mat-progress-bar>\r\n                                <mat-form-field class=\"full-width\">\r\n                                    <input [disabled]=\"true\" matInput [value]=\"message\"/>\r\n                                </mat-form-field>\r\n                            </div>\r\n                        </ng-container>\r\n                        <ng-container *ngIf=\"finished\">\r\n                            <div class=\"full-width\">\r\n                                <mat-form-field class=\"full-width\">\r\n                                    <input [disabled]=\"true\" matInput [value]=\"message\"/>\r\n                                </mat-form-field>\r\n                            </div>\r\n                        </ng-container>\r\n                    </mat-card-header>\r\n                    <mat-card-content>\r\n                        <mat-list>\r\n                            <div mat-subheader>Available Facilities</div>\r\n                            <mat-list-item *ngFor=\"let facility of facilities\">\r\n                                <div mat-line>\r\n                                    <mat-checkbox\r\n                                            [(ngModel)]=\"facility.selected\"\r\n                                            labelPosition=\"after\">\r\n                                        {{facility.name}}\r\n                                    </mat-checkbox>\r\n                                </div>\r\n                            </mat-list-item>\r\n                        </mat-list>\r\n                        <mat-divider></mat-divider>\r\n                        <div class=\"row\">\r\n                            <div class=\"col-md-6\">\r\n                                <ejs-daterangepicker placeholder=\"Select Cohort\" [start]=\"'Year'\" [format]=\"'MMM yyyy'\"\r\n                                                     [max]=\"today\"\r\n                                                     [(value)]=\"dateRange\"\r\n                                                     [depth]=\"'Year'\">\r\n                                </ejs-daterangepicker>\r\n                            </div>\r\n                            <div class=\"col-md-6\">\r\n                                <ejs-datepicker placeholder=\"Select Reporting period\" [start]=\"'Year'\"\r\n                                                [format]=\"'MMMM y'\"\r\n                                                [(value)]=\"reportingPeriod\"\r\n                                                (valueChange)=\"monthChanged($event)\"\r\n                                                [depth]=\"'Year'\">\r\n                                </ejs-datepicker>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                            <div class=\"col-md-6\">\r\n                                <mat-checkbox [(ngModel)]=\"current\" name=\"today\" *ngIf=\"todaySelectable\">As at today</mat-checkbox>\r\n                            </div>\r\n                        </div>\r\n                    </mat-card-content>\r\n                    <mat-card-actions>\r\n                        <button mat-raised-button color=\"primary\"\r\n                                (click)=\"convert()\"\r\n                                [disabled]=\"running || !selected() || !dateRange || !reportingPeriod\">Generate Radet\r\n                        </button>\r\n                    </mat-card-actions>\r\n                </mat-card>\r\n            </mat-tab>\r\n            <mat-tab label=\"Download\">\r\n                <mat-list>\r\n                    <div mat-subheader>Available Radet Files</div>\r\n                    <mat-list-item *ngFor=\"let file of files\">\r\n                        <div mat-line>\r\n                            {{file}}\r\n                            <button mat-list-icon\r\n                                    (click)=\"download(file)\">\r\n                                <mat-icon>file_download</mat-icon>\r\n                            </button>\r\n                        </div>\r\n                    </mat-list-item>\r\n                </mat-list>\r\n            </mat-tab>\r\n        </mat-tab-group>\r\n    </mat-card-content>\r\n</mat-card>\r\n"
        }),
        __metadata("design:paramtypes", [RadetConverterService, RxStompService, DomSanitizer])
    ], RadetConverterComponent);
    return RadetConverterComponent;
}());

var ɵ0 = {
    title: 'Radet Converter',
    breadcrumb: 'RADET CONVERTER'
}, ɵ1 = {
    breadcrumb: 'RADET CONVERTER',
    title: 'Radet Converter'
};
var ROUTES = [
    {
        path: '',
        data: ɵ0,
        children: [
            {
                path: '',
                component: RadetConverterComponent,
                data: ɵ1,
            }
        ]
    }
];

var RadetModule = /** @class */ (function () {
    function RadetModule() {
    }

    RadetModule = __decorate([
        NgModule({
            declarations: [
                RadetConverterComponent
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
                MatCheckboxModule,
                DateRangePickerModule,
                DropDownListModule,
                DatePickerModule,
            ],
            exports: [
                RadetConverterComponent
            ],
            providers: [
                RadetConverterService
            ]
        })
    ], RadetModule);
    return RadetModule;
}());

/*
 * Public API Surface of Patient
 */

/**
 * Generated bundle index. Do not edit.
 */

export {ROUTES, RadetConverterComponent, RadetConverterService, RadetModule, ɵ0, ɵ1};
//# sourceMappingURL=radet-1.0.0.js.map
