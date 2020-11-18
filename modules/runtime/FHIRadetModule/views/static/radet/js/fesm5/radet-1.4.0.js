import { __decorate, __param, __metadata } from 'tslib';
import { Inject, ɵɵdefineInjectable, ɵɵinject, Injectable, Component, NgModule } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { DATE_FORMAT, SERVER_API_URL_CONFIG } from '@lamis/web-core';
import * as moment_ from 'moment';
import { RxStompService } from '@stomp/ng2-stompjs';
import { DomSanitizer } from '@angular/platform-browser';
import { saveAs } from 'file-saver';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatIconModule, MatDividerModule, MatCardModule, MatSelectModule, MatButtonModule, MatTabsModule, MatProgressBarModule, MatListModule, MatCheckboxModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { DateRangePickerModule, DatePickerModule } from '@syncfusion/ej2-angular-calendars';

var moment = moment_;
var RadetConverterService = /** @class */ (function () {
    function RadetConverterService(http, serverUrl) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.resourceUrl = '';
        this.prepResourceUrl = '';
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/radet';
        this.prepResourceUrl = serverUrl.SERVER_API_URL + '/api/prep';
    }
    RadetConverterService.prototype.convert = function (start, end, reportingPeriod, ids, today) {
        var params = new HttpParams();
        params = params.append('cohortStart', moment(start).format(DATE_FORMAT));
        params = params.append('cohortEnd', moment(end).format(DATE_FORMAT));
        params = params.append('reportingPeriod', moment(reportingPeriod).format(DATE_FORMAT));
        params = params.append("today", today);
        ids.forEach(function (id) { return params = params.append("ids", id.toString()); });
        return this.http.get(this.resourceUrl + "/convert", { params: params });
    };
    RadetConverterService.prototype.listFacilities = function () {
        return this.http.get(this.resourceUrl + "/list-facilities");
    };
    RadetConverterService.prototype.download = function (name) {
        return this.http.get(this.resourceUrl + "/download/" + name, { responseType: 'blob' });
    };
    RadetConverterService.prototype.listFiles = function () {
        return this.http.get(this.resourceUrl + "/list-files");
    };
    RadetConverterService.prototype.convertPrep = function (start, end, reportingPeriod, ids, today) {
        var params = new HttpParams();
        params = params.append('cohortStart', moment(start).format(DATE_FORMAT));
        params = params.append('cohortEnd', moment(end).format(DATE_FORMAT));
        params = params.append('reportingPeriod', moment(reportingPeriod).format(DATE_FORMAT));
        params = params.append("today", today);
        ids.forEach(function (id) { return params = params.append("ids", id.toString()); });
        return this.http.get(this.prepResourceUrl + "/convert", { params: params });
    };
    RadetConverterService.prototype.downloadPrepFile = function (name) {
        return this.http.get(this.prepResourceUrl + "/download/" + name, { responseType: 'blob' });
    };
    RadetConverterService.prototype.listPrepFiles = function () {
        return this.http.get(this.prepResourceUrl + "/list-files");
    };
    RadetConverterService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: undefined, decorators: [{ type: Inject, args: [SERVER_API_URL_CONFIG,] }] }
    ]; };
    RadetConverterService.ngInjectableDef = ɵɵdefineInjectable({ factory: function RadetConverterService_Factory() { return new RadetConverterService(ɵɵinject(HttpClient), ɵɵinject(SERVER_API_URL_CONFIG)); }, token: RadetConverterService, providedIn: "root" });
    RadetConverterService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
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
        this.service.listFacilities().subscribe(function (res) { return _this.facilities = res; });
        this.topicSubscription = this.stompService.watch("/topic/radet/status").subscribe(function (msg) {
            if (msg.body === 'start') {
                _this.running = true;
            }
            else if (msg.body === 'end') {
                _this.running = false;
                _this.message = "Conversion finished; download files from Download tab";
                _this.finished = true;
                _this.service.listFiles().subscribe(function (res) {
                    _this.files = res;
                });
            }
            else {
                _this.message = msg.body;
                _this.running = true;
            }
        });
    };
    RadetConverterComponent.prototype.selected = function () {
        return this.facilities.filter(function (f) { return f.selected; }).length > 0;
    };
    RadetConverterComponent.prototype.download = function (name) {
        this.service.download(name).subscribe(function (res) {
            var file = new File([res], name + '_Radet.xlsx', { type: 'application/octet-stream' });
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
        var ids = this.facilities.filter(function (f) { return f.selected; })
            .map(function (f) { return f.id; });
        this.service.convert(this.dateRange.start, this.dateRange.end, this.reportingPeriod, ids, this.current).subscribe();
    };
    RadetConverterComponent.prototype.ngOnDestroy = function () {
        this.topicSubscription.unsubscribe();
    };
    RadetConverterComponent.ctorParameters = function () { return [
        { type: RadetConverterService },
        { type: RxStompService },
        { type: DomSanitizer }
    ]; };
    RadetConverterComponent = __decorate([
        Component({
            selector: 'radet-converter',
            template: "<mat-card>\n    <mat-card-content>\n        <mat-tab-group (selectedTabChange)=\"tabChanged($event)\">\n            <mat-tab label=\"Conversion\">\n                <mat-card>\n                    <mat-card-header class=\"full-width\">\n                        <ng-container *ngIf=\"running\">\n                            <div class=\"full-width\">\n                                <mat-progress-bar class=\"full-width\" mode=\"indeterminate\"></mat-progress-bar>\n                                <mat-form-field class=\"full-width\">\n                                    <input [disabled]=\"true\" matInput [value]=\"message\"/>\n                                </mat-form-field>\n                            </div>\n                        </ng-container>\n                        <ng-container *ngIf=\"finished\">\n                            <div class=\"full-width\">\n                                <mat-form-field class=\"full-width\">\n                                    <input [disabled]=\"true\" matInput [value]=\"message\"/>\n                                </mat-form-field>\n                            </div>\n                        </ng-container>\n                    </mat-card-header>\n                    <mat-card-content>\n                        <mat-list>\n                            <div mat-subheader>Available Facilities</div>\n                            <mat-list-item *ngFor=\"let facility of facilities\">\n                                <div mat-line>\n                                    <mat-checkbox\n                                            [(ngModel)]=\"facility.selected\"\n                                            labelPosition=\"after\">\n                                        {{facility.name}}\n                                    </mat-checkbox>\n                                </div>\n                            </mat-list-item>\n                        </mat-list>\n                        <mat-divider></mat-divider>\n                        <div class=\"row\">\n                            <div class=\"col-md-6\">\n                                <ejs-daterangepicker placeholder=\"Select Cohort\" [start]=\"'Year'\" [format]=\"'MMM yyyy'\"\n                                                     [max]=\"today\"\n                                                     [(value)]=\"dateRange\"\n                                                     [depth]=\"'Year'\">\n                                </ejs-daterangepicker>\n                            </div>\n                            <div class=\"col-md-6\">\n                                <ejs-datepicker placeholder=\"Select Reporting period\" [start]=\"'Year'\"\n                                                [format]=\"'MMMM y'\"\n                                                [(value)]=\"reportingPeriod\"\n                                                (valueChange)=\"monthChanged($event)\"\n                                                [depth]=\"'Year'\">\n                                </ejs-datepicker>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-md-6\">\n                                <mat-checkbox [(ngModel)]=\"current\" name=\"today\" *ngIf=\"todaySelectable\">As at today\n                                </mat-checkbox>\n                            </div>\n                        </div>\n                    </mat-card-content>\n                    <mat-card-actions>\n                        <button mat-raised-button color=\"primary\"\n                                (click)=\"convert()\"\n                                [disabled]=\"running || !selected() || !dateRange || !reportingPeriod\">Generate Radet\n                        </button>\n                    </mat-card-actions>\n                </mat-card>\n            </mat-tab>\n            <mat-tab label=\"Download\">\n                <mat-list>\n                    <div mat-subheader>Available Radet Files</div>\n                    <mat-list-item *ngFor=\"let file of files\">\n                        <div mat-line>\n                            {{file}}\n                            <button mat-list-icon\n                                    (click)=\"download(file)\">\n                                <mat-icon>file_download</mat-icon>\n                            </button>\n                        </div>\n                    </mat-list-item>\n                </mat-list>\n            </mat-tab>\n        </mat-tab-group>\n    </mat-card-content>\n</mat-card>\n"
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
            ]
        })
    ], RadetModule);
    return RadetModule;
}());

var PrepConverterComponent = /** @class */ (function () {
    function PrepConverterComponent(service, stompService, domSanitizer) {
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
    PrepConverterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.listFacilities().subscribe(function (res) { return _this.facilities = res; });
        this.topicSubscription = this.stompService.watch("/topic/prep/status").subscribe(function (msg) {
            if (msg.body === 'start') {
                _this.running = true;
            }
            else if (msg.body === 'end') {
                _this.running = false;
                _this.message = "Conversion finished; download files from Download tab";
                _this.finished = true;
                _this.service.listFiles().subscribe(function (res) {
                    _this.files = res;
                });
            }
            else {
                _this.message = msg.body;
                _this.running = true;
            }
        });
    };
    PrepConverterComponent.prototype.selected = function () {
        return this.facilities.filter(function (f) { return f.selected; }).length > 0;
    };
    PrepConverterComponent.prototype.download = function (name) {
        this.service.downloadPrepFile(name).subscribe(function (res) {
            var file = new File([res], name + '_PrEP.xlsx', { type: 'application/octet-stream' });
            saveAs(file);
        });
    };
    PrepConverterComponent.prototype.tabChanged = function (event) {
        var _this = this;
        if (event.index === 1) {
            this.service.listPrepFiles().subscribe(function (res) {
                _this.files = res;
            });
        }
    };
    PrepConverterComponent.prototype.monthChanged = function (month) {
        this.todaySelectable = new Date().getMonth() === month.getMonth();
    };
    PrepConverterComponent.prototype.convert = function () {
        this.running = true;
        this.finished = false;
        var ids = this.facilities.filter(function (f) { return f.selected; })
            .map(function (f) { return f.id; });
        this.service.convertPrep(this.dateRange.start, this.dateRange.end, this.reportingPeriod, ids, this.current).subscribe();
    };
    PrepConverterComponent.prototype.ngOnDestroy = function () {
        this.topicSubscription.unsubscribe();
    };
    PrepConverterComponent.ctorParameters = function () { return [
        { type: RadetConverterService },
        { type: RxStompService },
        { type: DomSanitizer }
    ]; };
    PrepConverterComponent = __decorate([
        Component({
            selector: 'prep-converter',
            template: "<mat-card>\n    <mat-card-content>\n        <mat-tab-group (selectedTabChange)=\"tabChanged($event)\">\n            <mat-tab label=\"Conversion\">\n                <mat-card>\n                    <mat-card-header class=\"full-width\">\n                        <ng-container *ngIf=\"running\">\n                            <div class=\"full-width\">\n                                <mat-progress-bar class=\"full-width\" mode=\"indeterminate\"></mat-progress-bar>\n                                <mat-form-field class=\"full-width\">\n                                    <input [disabled]=\"true\" matInput [value]=\"message\"/>\n                                </mat-form-field>\n                            </div>\n                        </ng-container>\n                        <ng-container *ngIf=\"finished\">\n                            <div class=\"full-width\">\n                                <mat-form-field class=\"full-width\">\n                                    <input [disabled]=\"true\" matInput [value]=\"message\"/>\n                                </mat-form-field>\n                            </div>\n                        </ng-container>\n                    </mat-card-header>\n                    <mat-card-content>\n                        <mat-list>\n                            <div mat-subheader>Available Facilities</div>\n                            <mat-list-item *ngFor=\"let facility of facilities\">\n                                <div mat-line>\n                                    <mat-checkbox\n                                            [(ngModel)]=\"facility.selected\"\n                                            labelPosition=\"after\">\n                                        {{facility.name}}\n                                    </mat-checkbox>\n                                </div>\n                            </mat-list-item>\n                        </mat-list>\n                        <mat-divider></mat-divider>\n                        <div class=\"row\">\n                            <div class=\"col-md-6\">\n                                <ejs-daterangepicker placeholder=\"Select Cohort\" [start]=\"'Year'\" [format]=\"'MMM yyyy'\"\n                                                     [max]=\"today\"\n                                                     [(value)]=\"dateRange\"\n                                                     [depth]=\"'Year'\">\n                                </ejs-daterangepicker>\n                            </div>\n                            <div class=\"col-md-6\">\n                                <ejs-datepicker placeholder=\"Select Reporting period\" [start]=\"'Year'\"\n                                                [format]=\"'MMMM y'\"\n                                                [(value)]=\"reportingPeriod\"\n                                                (valueChange)=\"monthChanged($event)\"\n                                                [depth]=\"'Year'\">\n                                </ejs-datepicker>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-md-6\">\n                                <mat-checkbox [(ngModel)]=\"current\" name=\"today\" *ngIf=\"todaySelectable\">As at today\n                                </mat-checkbox>\n                            </div>\n                        </div>\n                    </mat-card-content>\n                    <mat-card-actions>\n                        <button mat-raised-button color=\"primary\"\n                                (click)=\"convert()\"\n                                [disabled]=\"running || !selected() || !dateRange || !reportingPeriod\">Generate PrEP\n                            Report\n                        </button>\n                    </mat-card-actions>\n                </mat-card>\n            </mat-tab>\n            <mat-tab label=\"Download\">\n                <mat-list>\n                    <div mat-subheader>Available PrEP Files</div>\n                    <mat-list-item *ngFor=\"let file of files\">\n                        <div mat-line>\n                            {{file}}\n                            <button mat-list-icon\n                                    (click)=\"download(file)\">\n                                <mat-icon>file_download</mat-icon>\n                            </button>\n                        </div>\n                    </mat-list-item>\n                </mat-list>\n            </mat-tab>\n        </mat-tab-group>\n    </mat-card-content>\n</mat-card>\n"
        }),
        __metadata("design:paramtypes", [RadetConverterService, RxStompService, DomSanitizer])
    ], PrepConverterComponent);
    return PrepConverterComponent;
}());

var ɵ0$1 = {
    breadcrumb: 'PREP CONVERTER',
    title: 'PrEP Converter'
}, ɵ1$1 = {
    breadcrumb: 'PREP CONVERTER',
    title: 'PrEP Converter'
};
var PREP_ROUTES = [
    {
        path: '',
        data: ɵ0$1,
        children: [
            {
                path: '',
                component: PrepConverterComponent,
                data: ɵ1$1,
            }
        ]
    }
];
var PrepModule = /** @class */ (function () {
    function PrepModule() {
    }
    PrepModule = __decorate([
        NgModule({
            declarations: [
                PrepConverterComponent
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
                RouterModule.forChild(PREP_ROUTES),
                MatProgressBarModule,
                MatListModule,
                MatCheckboxModule,
                DateRangePickerModule,
                DropDownListModule,
                DatePickerModule,
            ]
        })
    ], PrepModule);
    return PrepModule;
}());

/*
 * Public API Surface of Patient
 */

/**
 * Generated bundle index. Do not edit.
 */

export { PREP_ROUTES, PrepModule, ROUTES, RadetConverterComponent, RadetConverterService, RadetModule, ɵ0$1 as ɵ0, ɵ1$1 as ɵ1, PrepConverterComponent as ɵa };
//# sourceMappingURL=radet-1.4.0.js.map
