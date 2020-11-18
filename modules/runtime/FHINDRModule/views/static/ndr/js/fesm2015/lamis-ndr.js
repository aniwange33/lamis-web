import { __decorate, __param, __metadata } from 'tslib';
import { Inject, Injectable, Component, NgModule } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { SERVER_API_URL_CONFIG } from '@lamis/web-core';
import { RxStompService } from '@stomp/ng2-stompjs';
import { DomSanitizer } from '@angular/platform-browser';
import { saveAs } from 'file-saver';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatIconModule, MatDividerModule, MatCardModule, MatSelectModule, MatButtonModule, MatTabsModule, MatProgressBarModule, MatListModule, MatCheckboxModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

let NdrConverterService = class NdrConverterService {
    constructor(http, serverUrl) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.resourceUrl = '';
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/ndr';
    }
    convert(ids) {
        let params = new HttpParams();
        ids.forEach(id => params = params.append("ids", id.toString()));
        return this.http.get(`${this.resourceUrl}/run`, { params });
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
    deduplicate() {
        return this.http.get(`${this.resourceUrl}/remove-duplicates`);
    }
};
NdrConverterService.ctorParameters = () => [
    { type: HttpClient },
    { type: undefined, decorators: [{ type: Inject, args: [SERVER_API_URL_CONFIG,] }] }
];
NdrConverterService = __decorate([
    Injectable(),
    __param(1, Inject(SERVER_API_URL_CONFIG)),
    __metadata("design:paramtypes", [HttpClient, Object])
], NdrConverterService);

let NdrConverterComponent = class NdrConverterComponent {
    constructor(ndrService, stompService, domSanitizer) {
        this.ndrService = ndrService;
        this.stompService = stompService;
        this.domSanitizer = domSanitizer;
        this.facilities = [];
        this.running = false;
        this.finished = false;
    }
    ngOnInit() {
        this.ndrService.listFacilities().subscribe(res => this.facilities = res);
        this.topicSubscription = this.stompService.watch("/topic/ndr-status").subscribe((msg) => {
            if (msg.body === 'start') {
                this.running = true;
            }
            else if (msg.body === 'end') {
                this.running = false;
                this.message = "Conversion finished; download files from Download tab";
                this.finished = true;
                this.ndrService.listFiles().subscribe(res => {
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
        this.ndrService.download(name).subscribe(res => {
            const file = new File([res], name + '.zip', { type: 'application/octet-stream' });
            saveAs(file);
        });
    }
    tabChanged(event) {
        if (event.index === 1) {
            this.ndrService.listFiles().subscribe(res => {
                this.files = res;
            });
        }
    }
    convert() {
        let ids = this.facilities.filter(f => f.selected)
            .map(f => f.id);
        this.ndrService.convert(ids).subscribe();
    }
    deduplicate() {
        this.running = true;
        this.ndrService.deduplicate().subscribe(res => this.running = false);
    }
    ngOnDestroy() {
        this.topicSubscription.unsubscribe();
    }
};
NdrConverterComponent.ctorParameters = () => [
    { type: NdrConverterService },
    { type: RxStompService },
    { type: DomSanitizer }
];
NdrConverterComponent = __decorate([
    Component({
        selector: 'ndr-converter',
        template: "<mat-card>\n    <mat-card-content>\n        <mat-tab-group (selectedTabChange)=\"tabChanged($event)\">\n            <mat-tab label=\"Conversion\">\n                <ng-container *ngIf=\"running\">\n                    <mat-progress-bar mode=\"indeterminate\"></mat-progress-bar>\n                    <mat-form-field style=\"width: 100%\">\n                        <input [disabled]=\"true\" matInput [value]=\"message\"/>\n                    </mat-form-field>\n                </ng-container>\n                <ng-container *ngIf=\"finished\">\n                    <mat-form-field style=\"width: 100%\">\n                        <input [disabled]=\"true\" matInput [value]=\"message\"/>\n                    </mat-form-field>\n                </ng-container>\n                <mat-list>\n                    <div mat-subheader>Available Facilities</div>\n                    <mat-list-item *ngFor=\"let facility of facilities\">\n                        <mat-icon mat-list-icon>account_balance</mat-icon>\n                        <div mat-line>\n                            <mat-checkbox\n                                    [(ngModel)]=\"facility.selected\"\n                                    labelPosition=\"before\">\n                                {{facility.name}}\n                            </mat-checkbox>\n                        </div>\n                    </mat-list-item>\n                    <mat-divider></mat-divider>\n                    <button mat-button\n                            (click)=\"deduplicate()\"\n                            [disabled]=\"running\">Remove Duplicate Records\n                    </button>\n                    <button mat-raised-button color=\"primary\"\n                            (click)=\"convert()\"\n                            [disabled]=\"running || !selected()\">Generate NDR\n                    </button>\n                </mat-list>\n            </mat-tab>\n            <mat-tab label=\"Download\">\n                <mat-list>\n                    <div mat-subheader>Available NDR Files</div>\n                    <mat-list-item *ngFor=\"let file of files\">\n                        <div mat-line>\n                            {{file}}\n                            <button mat-list-icon\n                                    (click)=\"download(file)\">\n                                <mat-icon>file_download</mat-icon>\n                            </button>\n                        </div>\n                    </mat-list-item>\n                </mat-list>\n            </mat-tab>\n        </mat-tab-group>\n    </mat-card-content>\n</mat-card>"
    }),
    __metadata("design:paramtypes", [NdrConverterService, RxStompService, DomSanitizer])
], NdrConverterComponent);

const ɵ0 = {
    title: 'NDR Converter',
    breadcrumb: 'NDR CONVERTER'
}, ɵ1 = {
    breadcrumb: 'NDR CONVERTER'
};
const ROUTES = [
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

let NdrModule = class NdrModule {
};
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

/*
 * Public API Surface of Patient
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NdrConverterComponent, NdrConverterService, NdrModule, ROUTES, ɵ0, ɵ1 };
//# sourceMappingURL=lamis-ndr.js.map
