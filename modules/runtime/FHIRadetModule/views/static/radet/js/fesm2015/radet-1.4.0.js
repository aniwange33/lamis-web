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

const moment = moment_;
let RadetConverterService = class RadetConverterService {
    constructor(http, serverUrl) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.resourceUrl = '';
        this.prepResourceUrl = '';
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/radet';
        this.prepResourceUrl = serverUrl.SERVER_API_URL + '/api/prep';
    }
    convert(start, end, reportingPeriod, ids, today) {
        let params = new HttpParams();
        params = params.append('cohortStart', moment(start).format(DATE_FORMAT));
        params = params.append('cohortEnd', moment(end).format(DATE_FORMAT));
        params = params.append('reportingPeriod', moment(reportingPeriod).format(DATE_FORMAT));
        params = params.append("today", today);
        ids.forEach(id => params = params.append("ids", id.toString()));
        return this.http.get(`${this.resourceUrl}/convert`, { params });
    }
    listFacilities() {
        return this.http.get(`${this.resourceUrl}/list-facilities`);
    }
    download(name) {
        return this.http.get(`${this.resourceUrl}/download/${name}`, { responseType: 'blob' });
    }
    listFiles() {
        return this.http.get(`${this.resourceUrl}/list-files`);
    }
    convertPrep(start, end, reportingPeriod, ids, today) {
        let params = new HttpParams();
        params = params.append('cohortStart', moment(start).format(DATE_FORMAT));
        params = params.append('cohortEnd', moment(end).format(DATE_FORMAT));
        params = params.append('reportingPeriod', moment(reportingPeriod).format(DATE_FORMAT));
        params = params.append("today", today);
        ids.forEach(id => params = params.append("ids", id.toString()));
        return this.http.get(`${this.prepResourceUrl}/convert`, { params });
    }
    downloadPrepFile(name) {
        return this.http.get(`${this.prepResourceUrl}/download/${name}`, { responseType: 'blob' });
    }
    listPrepFiles() {
        return this.http.get(`${this.prepResourceUrl}/list-files`);
    }
};
RadetConverterService.ctorParameters = () => [
    { type: HttpClient },
    { type: undefined, decorators: [{ type: Inject, args: [SERVER_API_URL_CONFIG,] }] }
];
RadetConverterService.ngInjectableDef = ɵɵdefineInjectable({ factory: function RadetConverterService_Factory() { return new RadetConverterService(ɵɵinject(HttpClient), ɵɵinject(SERVER_API_URL_CONFIG)); }, token: RadetConverterService, providedIn: "root" });
RadetConverterService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __param(1, Inject(SERVER_API_URL_CONFIG)),
    __metadata("design:paramtypes", [HttpClient, Object])
], RadetConverterService);

let RadetConverterComponent = class RadetConverterComponent {
    constructor(service, stompService, domSanitizer) {
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
    ngOnInit() {
        this.service.listFacilities().subscribe(res => this.facilities = res);
        this.topicSubscription = this.stompService.watch("/topic/radet/status").subscribe((msg) => {
            if (msg.body === 'start') {
                this.running = true;
            }
            else if (msg.body === 'end') {
                this.running = false;
                this.message = "Conversion finished; download files from Download tab";
                this.finished = true;
                this.service.listFiles().subscribe(res => {
                    this.files = res;
                });
            }
            else {
                this.message = msg.body;
                this.running = true;
            }
        });
    }
    selected() {
        return this.facilities.filter(f => f.selected).length > 0;
    }
    download(name) {
        this.service.download(name).subscribe(res => {
            const file = new File([res], name + '_Radet.xlsx', { type: 'application/octet-stream' });
            saveAs(file);
        });
    }
    tabChanged(event) {
        if (event.index === 1) {
            this.service.listFiles().subscribe(res => {
                this.files = res;
            });
        }
    }
    monthChanged(month) {
        this.todaySelectable = new Date().getMonth() === month.getMonth();
    }
    convert() {
        this.running = true;
        this.finished = false;
        let ids = this.facilities.filter(f => f.selected)
            .map(f => f.id);
        this.service.convert(this.dateRange.start, this.dateRange.end, this.reportingPeriod, ids, this.current).subscribe();
    }
    ngOnDestroy() {
        this.topicSubscription.unsubscribe();
    }
};
RadetConverterComponent.ctorParameters = () => [
    { type: RadetConverterService },
    { type: RxStompService },
    { type: DomSanitizer }
];
RadetConverterComponent = __decorate([
    Component({
        selector: 'radet-converter',
        template: "<mat-card>\n    <mat-card-content>\n        <mat-tab-group (selectedTabChange)=\"tabChanged($event)\">\n            <mat-tab label=\"Conversion\">\n                <mat-card>\n                    <mat-card-header class=\"full-width\">\n                        <ng-container *ngIf=\"running\">\n                            <div class=\"full-width\">\n                                <mat-progress-bar class=\"full-width\" mode=\"indeterminate\"></mat-progress-bar>\n                                <mat-form-field class=\"full-width\">\n                                    <input [disabled]=\"true\" matInput [value]=\"message\"/>\n                                </mat-form-field>\n                            </div>\n                        </ng-container>\n                        <ng-container *ngIf=\"finished\">\n                            <div class=\"full-width\">\n                                <mat-form-field class=\"full-width\">\n                                    <input [disabled]=\"true\" matInput [value]=\"message\"/>\n                                </mat-form-field>\n                            </div>\n                        </ng-container>\n                    </mat-card-header>\n                    <mat-card-content>\n                        <mat-list>\n                            <div mat-subheader>Available Facilities</div>\n                            <mat-list-item *ngFor=\"let facility of facilities\">\n                                <div mat-line>\n                                    <mat-checkbox\n                                            [(ngModel)]=\"facility.selected\"\n                                            labelPosition=\"after\">\n                                        {{facility.name}}\n                                    </mat-checkbox>\n                                </div>\n                            </mat-list-item>\n                        </mat-list>\n                        <mat-divider></mat-divider>\n                        <div class=\"row\">\n                            <div class=\"col-md-6\">\n                                <ejs-daterangepicker placeholder=\"Select Cohort\" [start]=\"'Year'\" [format]=\"'MMM yyyy'\"\n                                                     [max]=\"today\"\n                                                     [(value)]=\"dateRange\"\n                                                     [depth]=\"'Year'\">\n                                </ejs-daterangepicker>\n                            </div>\n                            <div class=\"col-md-6\">\n                                <ejs-datepicker placeholder=\"Select Reporting period\" [start]=\"'Year'\"\n                                                [format]=\"'MMMM y'\"\n                                                [(value)]=\"reportingPeriod\"\n                                                (valueChange)=\"monthChanged($event)\"\n                                                [depth]=\"'Year'\">\n                                </ejs-datepicker>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-md-6\">\n                                <mat-checkbox [(ngModel)]=\"current\" name=\"today\" *ngIf=\"todaySelectable\">As at today\n                                </mat-checkbox>\n                            </div>\n                        </div>\n                    </mat-card-content>\n                    <mat-card-actions>\n                        <button mat-raised-button color=\"primary\"\n                                (click)=\"convert()\"\n                                [disabled]=\"running || !selected() || !dateRange || !reportingPeriod\">Generate Radet\n                        </button>\n                    </mat-card-actions>\n                </mat-card>\n            </mat-tab>\n            <mat-tab label=\"Download\">\n                <mat-list>\n                    <div mat-subheader>Available Radet Files</div>\n                    <mat-list-item *ngFor=\"let file of files\">\n                        <div mat-line>\n                            {{file}}\n                            <button mat-list-icon\n                                    (click)=\"download(file)\">\n                                <mat-icon>file_download</mat-icon>\n                            </button>\n                        </div>\n                    </mat-list-item>\n                </mat-list>\n            </mat-tab>\n        </mat-tab-group>\n    </mat-card-content>\n</mat-card>\n"
    }),
    __metadata("design:paramtypes", [RadetConverterService, RxStompService, DomSanitizer])
], RadetConverterComponent);

const ɵ0 = {
    title: 'Radet Converter',
    breadcrumb: 'RADET CONVERTER'
}, ɵ1 = {
    breadcrumb: 'RADET CONVERTER',
    title: 'Radet Converter'
};
const ROUTES = [
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

let RadetModule = class RadetModule {
};
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

let PrepConverterComponent = class PrepConverterComponent {
    constructor(service, stompService, domSanitizer) {
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
    ngOnInit() {
        this.service.listFacilities().subscribe(res => this.facilities = res);
        this.topicSubscription = this.stompService.watch("/topic/prep/status").subscribe((msg) => {
            if (msg.body === 'start') {
                this.running = true;
            }
            else if (msg.body === 'end') {
                this.running = false;
                this.message = "Conversion finished; download files from Download tab";
                this.finished = true;
                this.service.listFiles().subscribe(res => {
                    this.files = res;
                });
            }
            else {
                this.message = msg.body;
                this.running = true;
            }
        });
    }
    selected() {
        return this.facilities.filter(f => f.selected).length > 0;
    }
    download(name) {
        this.service.downloadPrepFile(name).subscribe(res => {
            const file = new File([res], name + '_PrEP.xlsx', { type: 'application/octet-stream' });
            saveAs(file);
        });
    }
    tabChanged(event) {
        if (event.index === 1) {
            this.service.listPrepFiles().subscribe(res => {
                this.files = res;
            });
        }
    }
    monthChanged(month) {
        this.todaySelectable = new Date().getMonth() === month.getMonth();
    }
    convert() {
        this.running = true;
        this.finished = false;
        let ids = this.facilities.filter(f => f.selected)
            .map(f => f.id);
        this.service.convertPrep(this.dateRange.start, this.dateRange.end, this.reportingPeriod, ids, this.current).subscribe();
    }
    ngOnDestroy() {
        this.topicSubscription.unsubscribe();
    }
};
PrepConverterComponent.ctorParameters = () => [
    { type: RadetConverterService },
    { type: RxStompService },
    { type: DomSanitizer }
];
PrepConverterComponent = __decorate([
    Component({
        selector: 'prep-converter',
        template: "<mat-card>\n    <mat-card-content>\n        <mat-tab-group (selectedTabChange)=\"tabChanged($event)\">\n            <mat-tab label=\"Conversion\">\n                <mat-card>\n                    <mat-card-header class=\"full-width\">\n                        <ng-container *ngIf=\"running\">\n                            <div class=\"full-width\">\n                                <mat-progress-bar class=\"full-width\" mode=\"indeterminate\"></mat-progress-bar>\n                                <mat-form-field class=\"full-width\">\n                                    <input [disabled]=\"true\" matInput [value]=\"message\"/>\n                                </mat-form-field>\n                            </div>\n                        </ng-container>\n                        <ng-container *ngIf=\"finished\">\n                            <div class=\"full-width\">\n                                <mat-form-field class=\"full-width\">\n                                    <input [disabled]=\"true\" matInput [value]=\"message\"/>\n                                </mat-form-field>\n                            </div>\n                        </ng-container>\n                    </mat-card-header>\n                    <mat-card-content>\n                        <mat-list>\n                            <div mat-subheader>Available Facilities</div>\n                            <mat-list-item *ngFor=\"let facility of facilities\">\n                                <div mat-line>\n                                    <mat-checkbox\n                                            [(ngModel)]=\"facility.selected\"\n                                            labelPosition=\"after\">\n                                        {{facility.name}}\n                                    </mat-checkbox>\n                                </div>\n                            </mat-list-item>\n                        </mat-list>\n                        <mat-divider></mat-divider>\n                        <div class=\"row\">\n                            <div class=\"col-md-6\">\n                                <ejs-daterangepicker placeholder=\"Select Cohort\" [start]=\"'Year'\" [format]=\"'MMM yyyy'\"\n                                                     [max]=\"today\"\n                                                     [(value)]=\"dateRange\"\n                                                     [depth]=\"'Year'\">\n                                </ejs-daterangepicker>\n                            </div>\n                            <div class=\"col-md-6\">\n                                <ejs-datepicker placeholder=\"Select Reporting period\" [start]=\"'Year'\"\n                                                [format]=\"'MMMM y'\"\n                                                [(value)]=\"reportingPeriod\"\n                                                (valueChange)=\"monthChanged($event)\"\n                                                [depth]=\"'Year'\">\n                                </ejs-datepicker>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-md-6\">\n                                <mat-checkbox [(ngModel)]=\"current\" name=\"today\" *ngIf=\"todaySelectable\">As at today\n                                </mat-checkbox>\n                            </div>\n                        </div>\n                    </mat-card-content>\n                    <mat-card-actions>\n                        <button mat-raised-button color=\"primary\"\n                                (click)=\"convert()\"\n                                [disabled]=\"running || !selected() || !dateRange || !reportingPeriod\">Generate PrEP\n                            Report\n                        </button>\n                    </mat-card-actions>\n                </mat-card>\n            </mat-tab>\n            <mat-tab label=\"Download\">\n                <mat-list>\n                    <div mat-subheader>Available PrEP Files</div>\n                    <mat-list-item *ngFor=\"let file of files\">\n                        <div mat-line>\n                            {{file}}\n                            <button mat-list-icon\n                                    (click)=\"download(file)\">\n                                <mat-icon>file_download</mat-icon>\n                            </button>\n                        </div>\n                    </mat-list-item>\n                </mat-list>\n            </mat-tab>\n        </mat-tab-group>\n    </mat-card-content>\n</mat-card>\n"
    }),
    __metadata("design:paramtypes", [RadetConverterService, RxStompService, DomSanitizer])
], PrepConverterComponent);

const ɵ0$1 = {
    breadcrumb: 'PREP CONVERTER',
    title: 'PrEP Converter'
}, ɵ1$1 = {
    breadcrumb: 'PREP CONVERTER',
    title: 'PrEP Converter'
};
const PREP_ROUTES = [
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
let PrepModule = class PrepModule {
};
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

/*
 * Public API Surface of Patient
 */

/**
 * Generated bundle index. Do not edit.
 */

export { PREP_ROUTES, PrepModule, ROUTES, RadetConverterComponent, RadetConverterService, RadetModule, ɵ0$1 as ɵ0, ɵ1$1 as ɵ1, PrepConverterComponent as ɵa };
//# sourceMappingURL=radet-1.4.0.js.map
