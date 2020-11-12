import {__decorate, __param, __metadata} from 'tslib';
import {Inject, ɵɵdefineInjectable, ɵɵinject, Injectable, Component, NgModule} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SERVER_API_URL_CONFIG, entityCompare} from '@lamis/web-core';
import {CommonModule} from '@angular/common';
import {
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule
} from '@angular/material';
import {RouterModule} from '@angular/router';
import {NotificationService} from '@alfresco/adf-core';
import {FormsModule} from '@angular/forms';

var FacilityService = /** @class */ (function () {
    function FacilityService(http, serverUrl) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.resourceUrl = '';
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/facilities';
    }

    FacilityService.prototype.update = function (facility) {
        return this.http
            .post(this.resourceUrl + "/switch", facility, {observe: 'response'});
    };
    FacilityService.prototype.getFacilitiesByLga = function (id) {
        return this.http
            .get(this.resourceUrl + "/lga/" + id, {observe: 'body'});
    };
    FacilityService.prototype.getStates = function () {
        return this.http.get('/api/states');
    };
    FacilityService.prototype.getLgaByState = function (id) {
        return this.http.get("/api/provinces/state/" + id);
    };
    FacilityService.prototype.getActive = function () {
        return this.http
            .get(this.resourceUrl + "/active", {observe: 'response'});
    };
    FacilityService.ctorParameters = function () {
        return [
            {type: HttpClient},
            {type: undefined, decorators: [{type: Inject, args: [SERVER_API_URL_CONFIG,]}]}
        ];
    };
    FacilityService.ngInjectableDef = ɵɵdefineInjectable({
        factory: function FacilityService_Factory() {
            return new FacilityService(ɵɵinject(HttpClient), ɵɵinject(SERVER_API_URL_CONFIG));
        }, token: FacilityService, providedIn: "root"
    });
    FacilityService = __decorate([
        Injectable({providedIn: 'root'}),
        __param(1, Inject(SERVER_API_URL_CONFIG)),
        __metadata("design:paramtypes", [HttpClient, Object])
    ], FacilityService);
    return FacilityService;
}());

var FacilityComponent = /** @class */ (function () {
    function FacilityComponent(facilityService, notification) {
        this.facilityService = facilityService;
        this.notification = notification;
    }

    FacilityComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.facilityService.getStates().subscribe(function (res) {
            return _this.states = res;
        });
        this.facility = this.facilityService.getActive().subscribe(function (res) {
            if (res.body) {
                _this.facility = res.body;
            }
        });
    };
    FacilityComponent.prototype.entityCompare = function (e1, e2) {
        return entityCompare(e1, e2);
    };
    FacilityComponent.prototype.stateChanged = function (id) {
        var _this = this;
        this.facilityService.getLgaByState(id).subscribe(function (res) {
            return _this.lgas = res;
        });
    };
    FacilityComponent.prototype.lgaChanged = function (id) {
        var _this = this;
        this.facilityService.getFacilitiesByLga(id).subscribe(function (res) {
            return _this.facilities = res;
        });
    };
    FacilityComponent.prototype.setActive = function () {
        var _this = this;
        this.facilityService.update(this.active).subscribe(function (res) {
            if (res.ok && res.body) {
                _this.notification.showInfo("Facility switched to " + res.body.name);
            }
        });
    };
    FacilityComponent.ctorParameters = function () {
        return [
            {type: FacilityService},
            {type: NotificationService}
        ];
    };
    FacilityComponent = __decorate([
        Component({
            selector: 'lamis-facility',
            template: "<div class=\"lamis-edit-form\">\r\n    <div class=\"lamis-edit-form-container\">\r\n        <mat-card>\r\n            <mat-card-header>\r\n                Switch Facility\r\n            </mat-card-header>\r\n            <form name=\"form\" role=\"form\" novalidate (ngSubmit)=\"setActive()\" #facilityForm=\"ngForm\">\r\n                <mat-card-content>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-12\">\r\n                            Active Facility: {{facility.name}}\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <mat-form-field class=\"full-width\">\r\n                                <mat-select placeholder=\"State\"\r\n                                            (selectionChange)=\"stateChanged($event.value)\">\r\n                                    <mat-option *ngFor=\"let state of states\"\r\n                                                [value]=\"state.id\">{{state.name}}</mat-option>\r\n                                </mat-select>\r\n                            </mat-form-field>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <mat-form-field class=\"full-width\">\r\n                                <mat-select placeholder=\"LGA\"\r\n                                            (selectionChange)=\"lgaChanged($event.value)\">\r\n                                    <mat-option *ngFor=\"let lga of lgas\"\r\n                                                [value]=\"lga.id\">{{lga.name}}</mat-option>\r\n                                </mat-select>\r\n                            </mat-form-field>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <mat-form-field class=\"full-width\">\r\n                                <mat-select placeholder=\"Facility\"\r\n                                            [(ngModel)]=\"active\"\r\n                                            required\r\n                                            [compareWith]=\"entityCompare\"\r\n                                            #fac=\"ngModel\"\r\n                                            name=\"facility\">\r\n                                    <mat-option></mat-option>\r\n                                    <mat-option *ngFor=\"let facility of facilities\"\r\n                                                [value]=\"facility\">{{facility.name}}</mat-option>\r\n                                </mat-select>\r\n                                <mat-error *ngIf=\"fac.errors\">\r\n                                    Facility is required\r\n                                </mat-error>\r\n                            </mat-form-field>\r\n                        </div>\r\n                    </div>\r\n                    <mat-divider></mat-divider>\r\n                </mat-card-content>\r\n                <mat-card-actions class=\"lamis-edit-form-actions\">\r\n                    <button mat-raised-button color=\"primary\" [disabled]=\"facilityForm.invalid\">Switch Facility</button>\r\n                </mat-card-actions>\r\n            </form>\r\n        </mat-card>\r\n    </div>\r\n</div>\r\n",
            styles: [".bold{font-weight:700}"]
        }),
        __metadata("design:paramtypes", [FacilityService, NotificationService])
    ], FacilityComponent);
    return FacilityComponent;
}());

var ɵ0 = {
    title: 'Facility Switch',
    breadcrumb: 'FACILITY SWITCH'
}, ɵ1 = {
    authorities: ['ROLE_USER'],
    title: 'Facility Switch',
    breadcrumb: 'FACILITY SWITCH'
};
var ROUTES = [
    {
        path: '',
        data: ɵ0,
        children: [
            {
                path: '',
                component: FacilityComponent,
                data: ɵ1,
            },
        ]
    }
];

var FacilityModule = /** @class */ (function () {
    function FacilityModule() {
    }

    FacilityModule = __decorate([
        NgModule({
            declarations: [
                FacilityComponent
            ],
            imports: [
                CommonModule,
                MatInputModule,
                MatIconModule,
                MatDividerModule,
                MatCardModule,
                MatSelectModule,
                MatButtonModule,
                FormsModule,
                RouterModule.forChild(ROUTES)
            ],
            exports: [
                FacilityComponent
            ],
            entryComponents: [],
            providers: []
        })
    ], FacilityModule);
    return FacilityModule;
}());

/*
 * Public API Surface of Patient
 */

/**
 * Generated bundle index. Do not edit.
 */

export {FacilityModule, FacilityService, FacilityComponent as ɵa, ROUTES as ɵb};
//# sourceMappingURL=lamis-facility.js.map
