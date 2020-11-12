import {__decorate, __param, __metadata} from 'tslib';
import {Inject, ɵɵdefineInjectable, ɵɵinject, Injectable, Component, NgModule} from '@angular/core';
import {HttpParams, HttpClient} from '@angular/common/http';
import {DATE_FORMAT, SERVER_API_URL_CONFIG, MatDateFormatModule} from '@lamis/web-core';
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
    MatDatepickerModule,
    MatProgressBarModule,
    MatListModule,
    MatCheckboxModule
} from '@angular/material';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {DropDownListModule} from '@syncfusion/ej2-angular-dropdowns';
import {DateRangePickerModule, DatePickerModule} from '@syncfusion/ej2-angular-calendars';

const moment = moment_;
let ReportService = class ReportService {
    constructor(http, serverUrl) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.resourceUrl = '';
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/reporting';
    }

    artSummary(reportingPeriod, id, today) {
        let params = new HttpParams();
        params = params.append('reportingPeriod', moment(reportingPeriod).format(DATE_FORMAT));
        params = params.append("id", id.toString());
        params = params.append("today", today.toString());
        return this.http.get(`${this.resourceUrl}/art-summary`, {params, responseType: 'blob'});
    }

    patientLineList(params) {
        params.dateCurrentStatusBegin = params.dateCurrentStatusBegin != null && params.dateCurrentStatusBegin.isValid() ? params.dateCurrentStatusBegin.format(DATE_FORMAT) : null;
        params.dateCurrentStatusEnd = params.dateCurrentStatusEnd != null && params.dateCurrentStatusEnd.isValid() ? params.dateCurrentStatusEnd.format(DATE_FORMAT) : null;
        params.dateLastViralLoadBegin = params.dateLastViralLoadBegin != null && params.dateLastViralLoadBegin.isValid() ? params.dateLastViralLoadBegin.format(DATE_FORMAT) : null;
        params.dateLastViralLoadEnd = params.dateLastViralLoadEnd != null && params.dateLastViralLoadEnd.isValid() ? params.dateLastViralLoadEnd.format(DATE_FORMAT) : null;
        params.dateRegistrationBegin = params.dateRegistrationBegin != null && params.dateRegistrationBegin.isValid() ? params.dateRegistrationBegin.format(DATE_FORMAT) : null;
        params.dateRegistrationEnd = params.dateRegistrationEnd != null && params.dateRegistrationEnd.isValid() ? params.dateRegistrationEnd.format(DATE_FORMAT) : null;
        params.dateStartBegin = params.dateStartBegin != null && params.dateStartBegin.isValid() ? params.dateStartBegin.format(DATE_FORMAT) : null;
        params.dateStartEnd = params.dateStartEnd != null && params.dateStartEnd.isValid() ? params.dateStartEnd.format(DATE_FORMAT) : null;
        return this.http.post(`${this.resourceUrl}/patient-line-list`, params, {responseType: 'blob'});
    }

    getRegimenTypes() {
        return this.http.get(`${this.resourceUrl}/regimen-types`);
    }

    getStates() {
        return this.http.get('/api/states');
    }

    getLgasByState(id) {
        return this.http.get(`/api/provinces/state/${id}`);
    }

    getActiveFacility() {
        return this.http.get('/api/facilities/active');
    }

    listFacilities() {
        return this.http.get(`${this.resourceUrl}/list-facilities`);
    }

    download(name) {
        return this.http.get(`${this.resourceUrl}/download/${name}`, {responseType: 'blob'});
    }

    listFiles() {
        return this.http.get(`${this.resourceUrl}/list-files`);
    }
};
ReportService.ctorParameters = () => [
    {type: HttpClient},
    {type: undefined, decorators: [{type: Inject, args: [SERVER_API_URL_CONFIG,]}]}
];
ReportService.ngInjectableDef = ɵɵdefineInjectable({
    factory: function ReportService_Factory() {
        return new ReportService(ɵɵinject(HttpClient), ɵɵinject(SERVER_API_URL_CONFIG));
    }, token: ReportService, providedIn: "root"
});
ReportService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __param(1, Inject(SERVER_API_URL_CONFIG)),
    __metadata("design:paramtypes", [HttpClient, Object])
], ReportService);

let ArtSummaryComponent = class ArtSummaryComponent {
    constructor(service, stompService, domSanitizer) {
        this.service = service;
        this.stompService = stompService;
        this.domSanitizer = domSanitizer;
        this.running = false;
        this.message = 'Running';
        this.finished = false;
        this.reportingPeriod = new Date();
        this.today = new Date();
        this.todaySelectable = true;
        this.current = false;
    }

    ngOnInit() {
        this.service.getActiveFacility().subscribe(res => this.facility = res);
        this.topicSubscription = this.stompService.watch('/topic/art-summary/status').subscribe((msg) => {
            if (msg.body === 'start') {
                this.running = true;
            } else if (msg.body === 'end') {
                this.running = false;
                this.finished = true;
                this.message = 'Finished';
                this.service.listFiles().subscribe(res => {
                    this.files = res;
                });
            } else {
                this.message = msg.body;
                this.running = true;
            }
        });
    }

    download(name) {
        this.service.download(name).subscribe(res => {
            const file = new File([res], name + 'ART Summary Report.pdf', {type: 'application/octet-stream'});
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
        this.service.artSummary(this.reportingPeriod, this.facility.id, this.current).subscribe((res) => {
            const file = new File([res], this.facility.name + '_ART Summary Report.pdf', {type: 'application/octet-stream'});
            saveAs(file);
        });
    }

    ngOnDestroy() {
        this.topicSubscription.unsubscribe();
    }
};
ArtSummaryComponent.ctorParameters = () => [
    {type: ReportService},
    {type: RxStompService},
    {type: DomSanitizer}
];
ArtSummaryComponent = __decorate([
    Component({
        selector: 'art-summary',
        template: "<mat-card>\r\n    <mat-card-header class=\"full-width\">\r\n        <ng-container *ngIf=\"running\">\r\n            <div class=\"full-width\">\r\n                <mat-progress-bar class=\"full-width\" mode=\"indeterminate\"></mat-progress-bar>\r\n                <mat-form-field class=\"full-width\">\r\n                    <input [disabled]=\"true\" matInput [value]=\"message\"/>\r\n                </mat-form-field>\r\n            </div>\r\n        </ng-container>\r\n        <ng-container *ngIf=\"finished\">\r\n            <div class=\"full-width\">\r\n                <mat-form-field class=\"full-width\">\r\n                    <input [disabled]=\"true\" matInput [value]=\"message\"/>\r\n                </mat-form-field>\r\n            </div>\r\n        </ng-container>\r\n    </mat-card-header>\r\n    <mat-card-content>\r\n        <div class=\"row\">\r\n            <div class=\"col-md-12\">\r\n                Facility:&nbsp;&nbsp;{{facility?.name}}\r\n            </div>\r\n        </div>\r\n        <div class=\"row\">\r\n            <div class=\"col-md-6\">\r\n                <ejs-datepicker placeholder=\"Select Reporting period\" [start]=\"'Year'\"\r\n                                [format]=\"'MMMM y'\"\r\n                                (valueChangeh)=\"monthChanged($event)\"\r\n                                [(value)]=\"reportingPeriod\"\r\n                                [depth]=\"'Year'\">\r\n                </ejs-datepicker>\r\n            </div>\r\n            <div class=\"col-md-6\">\r\n                <mat-checkbox [(ngModel)]=\"current\" name=\"today\" *ngIf=\"todaySelectable\">As at today</mat-checkbox>\r\n            </div>\r\n        </div>\r\n        <mat-card-actions>\r\n            <button mat-raised-button color=\"primary\"\r\n                    (click)=\"convert()\"\r\n                    [disabled]=\"running || !reportingPeriod || !facility\">Generate Report\r\n            </button>\r\n        </mat-card-actions>\r\n    </mat-card-content>\r\n</mat-card>\r\n\r\n"
    }),
    __metadata("design:paramtypes", [ReportService, RxStompService, DomSanitizer])
], ArtSummaryComponent);

const moment$1 = moment_;
let PatientLineListComponent = class PatientLineListComponent {
    constructor(service, stompService) {
        this.service = service;
        this.stompService = stompService;
        this.params = {};
        this.running = false;
        this.finished = false;
        this.today = moment$1();
        this.message = 'Running';
    }

    ngOnInit() {
        this.service.getActiveFacility().subscribe(res => {
            this.facility = res;
            this.params['facilityId'] = this.facility.id;
        });
        this.topicSubscription = this.stompService.watch('/topic/patient-line-list/status').subscribe((msg) => {
            if (msg.body === 'start') {
                this.running = true;
                this.finished = false;
                this.message = 'Running';
            } else if (msg.body === 'end') {
                this.running = false;
                this.finished = true;
                this.message = 'Finished';
            } else {
                this.message = msg.body;
                this.running = true;
            }
        });
        this.service.getStates().subscribe(res => this.states = res);
        this.service.getRegimenTypes().subscribe(res => this.regimenTypes = res);
    }

    stateChanged(state) {
        if (state && state.id) {
            this.service.getLgasByState(state.id).subscribe(res => this.lgas = res);
        }
    }

    convert() {
        this.running = true;
        this.service.patientLineList(this.params).subscribe((res) => {
            const file = new File([res], this.facility.name + '_Patient_Line_List.pdf', {type: 'application/octet-stream'});
            saveAs(file);
        });
    }

    ngOnDestroy() {
        this.topicSubscription.unsubscribe();
    }
};
PatientLineListComponent.ctorParameters = () => [
    {type: ReportService},
    {type: RxStompService}
];
PatientLineListComponent = __decorate([
    Component({
        selector: 'report-patient-line-list',
        template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <form name=\"form\" role=\"form\" novalidate (ngSubmit)=\"convert()\" #plForm=\"ngForm\">\n            <mat-card class=\"default\">\n                <mat-card-header>\n                    Patient Information Query\n                </mat-card-header>\n                <mat-card-content>\n                    <ng-container *ngIf=\"running\">\n                        <div class=\"full-width\">\n                            <mat-progress-bar class=\"full-width\" mode=\"indeterminate\"></mat-progress-bar>\n                            <mat-form-field class=\"full-width\">\n                                <input [disabled]=\"true\" matInput [value]=\"message\"/>\n                            </mat-form-field>\n                        </div>\n                    </ng-container>\n                    <ng-container *ngIf=\"finished\">\n                        <div class=\"full-width\">\n                            <mat-form-field class=\"full-width\">\n                                <input [disabled]=\"true\" matInput [value]=\"message\"/>\n                            </mat-form-field>\n                        </div>\n                    </ng-container>\n                    <fieldset>\n                        <h5>Demographic filters</h5>\n                        <div class=\"row\">\n                            <div class=\"col-md-6\">\n                                <mat-form-field class=\"full-width\">\n                                    <mat-label>Gender</mat-label>\n                                    <mat-select name=\"gender\" [(ngModel)]=\"params.gender\">\n                                        <mat-option></mat-option>\n                                        <mat-option value=\"MALE\">Male</mat-option>\n                                        <mat-option value=\"FEMALE\">Female</mat-option>\n                                    </mat-select>\n                                </mat-form-field>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-md-12\">\n                                <h5>Age Range</h5>\n                            </div>\n                            <div class=\"col-md-6\">\n                                <mat-form-field class=\"full-width\">\n                                    <mat-label>From</mat-label>\n                                    <input matInput name=\"ageBegin\" type=\"number\" [(ngModel)]=\"params.ageBegin\"/>\n                                </mat-form-field>\n                            </div>\n                            <div class=\"col-md-6\">\n                                <mat-form-field class=\"full-width\">\n                                    <mat-label>To</mat-label>\n                                    <input matInput name=\"ageEnd\" type=\"number\" [(ngModel)]=\"params.ageEnd\"/>\n                                </mat-form-field>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-md-6\">\n                                <mat-form-field class=\"full-width\">\n                                    <mat-label>State</mat-label>\n                                    <mat-select (valueChange)=\"stateChanged($event)\">\n                                        <mat-option></mat-option>\n                                        <mat-option *ngFor=\"let state of states\"\n                                                    [value]=\"state\">{{state.name}}</mat-option>\n                                    </mat-select>\n                                </mat-form-field>\n                            </div>\n                            <div class=\"col-md-6\">\n                                <mat-form-field class=\"full-width\">\n                                    <mat-label>LGA of residence</mat-label>\n                                    <mat-select name=\"lga\" [(ngModel)]=\"params.lgaId\">\n                                        <mat-option></mat-option>\n                                        <mat-option *ngFor=\"let lga of lgas\" [value]=\"lga.id\">{{lga.name}}</mat-option>\n                                    </mat-select>\n                                </mat-form-field>\n                            </div>\n                        </div>\n                    </fieldset>\n                    <fieldset>\n                        <h5>Clinical filters</h5>\n                        <div class=\"row\">\n                            <div class=\"col-md-6\">\n                                <mat-form-field class=\"full-width\">\n                                    <mat-label>Current Status</mat-label>\n                                    <mat-select name=\"currentStatus\" [(ngModel)]=\"params.currentStatus\">\n                                        <mat-option></mat-option>\n                                        <mat-option value=\"HIV_PLUS_NON_ART\">HIV+ non ART</mat-option>\n                                        <mat-option value=\"ART_START\">ART Start</mat-option>\n                                        <mat-option value=\"ART_RESTART\">ART Restart</mat-option>\n                                        <mat-option value=\"ART_TRANSFER_IN\">ART Transfer In</mat-option>\n                                        <mat-option value=\"ART_TRANSFER_OUT\">ART Transfer Out</mat-option>\n                                        <mat-option value=\"PRE_ART_TRANSFER_IN\">Pre-ART Transfer In</mat-option>\n                                        <mat-option value=\"PRE_ART_TRANSFER_OUT\">Pre-ART Transfer Out</mat-option>\n                                        <mat-option value=\"LOST_TO_FOLLOWUP\">Lost to Follow Up</mat-option>\n                                        <mat-option value=\"STOPPED_TREATMENT\">Stopped Treatment</mat-option>\n                                        <mat-option value=\"KNOWN_DEATH\">Known Death</mat-option>\n                                        <mat-option value=\"Currently Active\">Currently Active</mat-option>\n                                    </mat-select>\n                                </mat-form-field>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-md-12\">\n                                <h5>Date of Current Status</h5>\n                            </div>\n                            <div class=\"col-md-6\">\n                                <mat-form-field class=\"full-width\">\n                                    <mat-label>From</mat-label>\n                                    <input matInput [matDatepicker]=\"picker1\"\n                                           [max]=\"today\"\n                                           [(ngModel)]=\"params.dateCurrentStatusBegin\"\n                                           name=\"date1\">\n                                    <mat-datepicker-toggle\n                                            matSuffix\n                                            [for]=\"picker1\">\n                                    </mat-datepicker-toggle>\n                                    <mat-datepicker #picker1></mat-datepicker>\n                                </mat-form-field>\n                            </div>\n                            <div class=\"col-md-6\">\n                                <mat-form-field class=\"full-width\">\n                                    <mat-label>To</mat-label>\n                                    <input matInput [matDatepicker]=\"picker2\"\n                                           [(ngModel)]=\"params.dateCurrentStatusEnd\"\n                                           [max]=\"today\"\n                                           name=\"date2\">\n                                    <mat-datepicker-toggle\n                                            matSuffix\n                                            [for]=\"picker2\">\n                                    </mat-datepicker-toggle>\n                                    <mat-datepicker #picker2></mat-datepicker>\n                                </mat-form-field>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-md-6\">\n                                <mat-form-field class=\"full-width\">\n                                    <mat-label>Regimen Line</mat-label>\n                                    <mat-select name=\"regimenType\" [(ngModel)]=\"params.regimenType\">\n                                        <mat-option></mat-option>\n                                        <mat-option *ngFor=\"let type of regimenTypes\"\n                                                    [value]=\"type.description\">{{type.description}}</mat-option>\n                                    </mat-select>\n                                </mat-form-field>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-md-12\">\n                                <h5>Date of Registration</h5>\n                            </div>\n                            <div class=\"col-md-6\">\n                                <mat-form-field class=\"full-width\">\n                                    <mat-label>From</mat-label>\n                                    <input matInput [matDatepicker]=\"picker3\"\n                                           [max]=\"today\"\n                                           [(ngModel)]=\"params.dateRegistrationBegin\"\n                                           name=\"date3\">\n                                    <mat-datepicker-toggle\n                                            matSuffix\n                                            [for]=\"picker3\">\n                                    </mat-datepicker-toggle>\n                                    <mat-datepicker #picker3></mat-datepicker>\n                                </mat-form-field>\n                            </div>\n                            <div class=\"col-md-6\">\n                                <mat-form-field class=\"full-width\">\n                                    <mat-label>To</mat-label>\n                                    <input matInput [matDatepicker]=\"picker4\"\n                                           [max]=\"today\"\n                                           [(ngModel)]=\"params.dateRegistrationEnd\"\n                                           name=\"date4\">\n                                    <mat-datepicker-toggle\n                                            matSuffix\n                                            [for]=\"picker4\">\n                                    </mat-datepicker-toggle>\n                                    <mat-datepicker #picker4></mat-datepicker>\n                                </mat-form-field>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-md-12\">\n                                <h5>ART Start Date</h5>\n                            </div>\n                            <div class=\"col-md-6\">\n                                <mat-form-field class=\"full-width\">\n                                    <mat-label>From</mat-label>\n                                    <input matInput [matDatepicker]=\"picker5\"\n                                           [max]=\"today\"\n                                           [(ngModel)]=\"params.dateStartBegin\"\n                                           name=\"date5\">\n                                    <mat-datepicker-toggle\n                                            matSuffix\n                                            [for]=\"picker5\">\n                                    </mat-datepicker-toggle>\n                                    <mat-datepicker #picker5></mat-datepicker>\n                                </mat-form-field>\n                            </div>\n                            <div class=\"col-md-6\">\n                                <mat-form-field class=\"full-width\">\n                                    <mat-label>To</mat-label>\n                                    <input matInput [matDatepicker]=\"picker6\"\n                                           [max]=\"today\"\n                                           [(ngModel)]=\"params.dateStartEnd\"\n                                           name=\"date6\">\n                                    <mat-datepicker-toggle\n                                            matSuffix\n                                            [for]=\"picker6\">\n                                    </mat-datepicker-toggle>\n                                    <mat-datepicker #picker6></mat-datepicker>\n                                </mat-form-field>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-md-6\">\n                                <mat-form-field class=\"full-width\">\n                                    <mat-label>Current Clinical Stage</mat-label>\n                                    <mat-select name=\"clinicStage\" [(ngModel)]=\"params.clinicStage\">\n                                        <mat-option></mat-option>\n                                        <mat-option value=\"Stage I\">Stage I</mat-option>\n                                        <mat-option value=\"Stage II\">Stage II</mat-option>\n                                        <mat-option value=\"Stage III\">Stage III</mat-option>\n                                        <mat-option value=\"Stage IV\">Stage IV</mat-option>\n                                    </mat-select>\n                                </mat-form-field>\n                            </div>\n                        </div>\n                        <fieldset>\n                            <h5>Viral Load</h5>\n                            <div class=\"row\">\n                                <div class=\"col-md-12\">\n                                    <h5>Last Viral Load</h5>\n                                </div>\n                                <div class=\"col-md-6\">\n                                    <mat-form-field class=\"full-width\">\n                                        <mat-label>From</mat-label>\n                                        <input matInput name=\"viralLoadBegin\" type=\"number\"\n                                               [(ngModel)]=\"params.viralLoadBegin\"/>\n                                    </mat-form-field>\n                                </div>\n                                <div class=\"col-md-6\">\n                                    <mat-form-field class=\"full-width\">\n                                        <mat-label>To</mat-label>\n                                        <input matInput name=\"viralLoadEnd\" type=\"number\"\n                                               [(ngModel)]=\"params.viralLoadEnd\"/>\n                                    </mat-form-field>\n                                </div>\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col-md-12\">\n                                    <h5>Date of Last Viral Load</h5>\n                                </div>\n                                <div class=\"col-md-6\">\n                                    <mat-form-field class=\"full-width\">\n                                        <mat-label>From</mat-label>\n                                        <input matInput [matDatepicker]=\"picker7\"\n                                               [max]=\"today\"\n                                               [(ngModel)]=\"params.dateLastViralLoadBegin\"\n                                               name=\"date7\">\n                                        <mat-datepicker-toggle\n                                                matSuffix\n                                                [for]=\"picker7\">\n                                        </mat-datepicker-toggle>\n                                        <mat-datepicker #picker7></mat-datepicker>\n                                    </mat-form-field>\n                                </div>\n                                <div class=\"col-md-6\">\n                                    <mat-form-field class=\"full-width\">\n                                        <mat-label>To</mat-label>\n                                        <input matInput [matDatepicker]=\"picker8\"\n                                               [max]=\"today\"\n                                               [(ngModel)]=\"params.dateLastViralLoadEnd\"\n                                               name=\"date8\">\n                                        <mat-datepicker-toggle\n                                                matSuffix\n                                                [for]=\"picker8\">\n                                        </mat-datepicker-toggle>\n                                        <mat-datepicker #picker8></mat-datepicker>\n                                    </mat-form-field>\n                                </div>\n                            </div>\n                        </fieldset>\n                    </fieldset>\n                    <mat-card-actions>\n                        <button mat-raised-button color=\"primary\"\n                                [disabled]=\"running || !facility\">Generate Report\n                        </button>\n                    </mat-card-actions>\n                </mat-card-content>\n            </mat-card>\n        </form>\n    </div>\n</div>\n"
    }),
    __metadata("design:paramtypes", [ReportService, RxStompService])
], PatientLineListComponent);

const ɵ0 = {
    title: 'Reports',
    breadcrumb: 'REPORTS'
}, ɵ1 = {
    breadcrumb: 'ART SUMMARY REPORT',
    title: 'ART Summary Report'
}, ɵ2 = {
    breadcrumb: 'PATIENT LINE LIST',
    title: 'Patient Line List'
}, ɵ3 = {
    breadcrumb: 'PATIENT REPORTs',
    title: 'Patient Reports'
};
const ROUTES = [
    {
        path: '',
        data: ɵ0,
        children: [
            {
                path: 'art-summary',
                component: ArtSummaryComponent,
                data: ɵ1,
            },
            {
                path: 'patients',
                children: [
                    {
                        path: 'line-list',
                        component: PatientLineListComponent,
                        data: ɵ2
                    }
                ],
                data: ɵ3
            }
        ]
    }
];

let ReportsModule = class ReportsModule {
};
ReportsModule = __decorate([
    NgModule({
        declarations: [
            ArtSummaryComponent,
            PatientLineListComponent
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
            MatDatepickerModule,
            RouterModule.forChild(ROUTES),
            MatProgressBarModule,
            MatListModule,
            MatCheckboxModule,
            DateRangePickerModule,
            DropDownListModule,
            DatePickerModule,
            MatDateFormatModule
        ],
        exports: [
            ArtSummaryComponent,
            PatientLineListComponent
        ],
        providers: []
    })
], ReportsModule);

/*
 * Public API Surface of Patient
 */

/**
 * Generated bundle index. Do not edit.
 */

export {ArtSummaryComponent, ROUTES, ReportService, ReportsModule, ɵ0, ɵ1, ɵ2, ɵ3, PatientLineListComponent as ɵa};
//# sourceMappingURL=lamis-reporting-1.0.0.js.map
