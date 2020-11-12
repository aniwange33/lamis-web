import * as tslib_1 from "tslib";
import {Component, Input} from '@angular/core';
import {PatientService} from '../services/patient.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '@alfresco/adf-core';

let PatientListComponent = class PatientListComponent {
    constructor(patientService, notification, router, activatedRoute) {
        this.patientService = patientService;
        this.notification = notification;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.page = 0;
        this.loading = false;
        this.itemsPerPage = 10;
        this.currentSearch = '';
        this.totalItems = 0;
        this.display = 'list';
        this.facility = {};
        this.currentSearch = '';
    }

    ngOnDestroy() {
    }

    ngOnInit() {
        this.patientService.getActiveFacility().subscribe(res => {
            this.facility = res;
            this.onPageChange(0);
        });
    }

    searchPatient(search) {
        this.currentSearch = search;
        this.page = 0;
        this.loadAll();
    }

    select(data) {
        if (!!this.path) {
            this.router.navigateByUrl(`${this.path}/${data.obj.uuid}`);
        } else {
            this.router.navigate(['..', 'patients', data.obj.uuid, 'view'], {relativeTo: this.activatedRoute});
        }
    }

    onPageChange(pageInfo) {
        this.page = pageInfo;
        this.loadAll();
    }

    loadPage(page) {
        this.loadAll();
    }

    loadAll() {
        this.loading = true;
        this.patientService.query({
            keyword: this.currentSearch,
            page: this.page > 0 ? this.page - 1 : 0,
            facilityId: this.facility.id || 0,
            size: this.itemsPerPage,
            sort: ['id', 'asc']
        }).subscribe((res) => {
            this.onSuccess(res.body, res.headers);
        }, (res) => this.onError(res));
    }

    onSuccess(data, headers) {
        this.patients = data;
        this.totalItems = headers.get('X-Total-Count');
        this.loading = false;
    }

    onError(error) {
        this.notification.openSnackMessage(error.message);
        this.loading = false;
    }
};
PatientListComponent.ctorParameters = () => [
    {type: PatientService},
    {type: NotificationService},
    {type: Router},
    {type: ActivatedRoute}
];
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], PatientListComponent.prototype, "path", void 0);
PatientListComponent = tslib_1.__decorate([
    Component({
        selector: 'lamis-patients',
        template: "<div class=\"layout\">\r\n    <div class=\"list-container\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-8 col-md-offset-4\">\r\n                <div class=\"adf-toolbar--spacer\"></div>\r\n                <td-search-box backIcon=\"arrow_back\" class=\"push-right-sm\"\r\n                               placeholder=\"Search here\" [debounce]=\"500\"\r\n                               [(ngModel)]=\"currentSearch\"\r\n                               (searchDebounce)=\"searchPatient($event)\"\r\n                               (search)=\"searchPatient($event)\"\r\n                               (clear)=\"currentSearch = ''\" flex>\r\n                </td-search-box>\r\n            </div>\r\n        </div>\r\n        <br/>\r\n        <adf-datatable *ngIf=\"patients\"\r\n                       [rows]=\"patients\"\r\n                       [loading]=\"loading\"\r\n                       [display]=\"display\"\r\n                       (rowClick)=\"select($event.value)\">\r\n            <data-columns>\r\n                <data-column key=\"name\" title=\"Name\" sortable=\"true\"></data-column>\r\n                <data-column key=\"hospitalNum\" title=\"Hospital Number\" sortable=\"true\"></data-column>\r\n                <data-column key=\"uniqueId\" title=\"Unique ID\" sortable=\"true\"></data-column>\r\n                <data-column key=\"gender\" title=\"Gender\" sortable=\"true\">\r\n                    <ng-template let-context=\"$implicit\">\r\n                        {{context.row.getValue('gender') === 'MALE' ? 'Male' : 'Female'}}\r\n                    </ng-template>\r\n                </data-column>\r\n                <data-column key=\"status\" title=\"Current Status\" sortable=\"true\"></data-column>\r\n                <data-column key=\"phone\" title=\"Telephone Number\" sortable=\"true\"></data-column>\r\n                <data-column key=\"address\" title=\"Address\" class=\"full-width ellipsis-cell\"></data-column>\r\n            </data-columns>\r\n            <adf-loading-content-template>\r\n                <ng-template>\r\n                    <mat-progress-spinner\r\n                            class=\"adf-document-list-loading-margin\"\r\n                            [color]=\"'primary'\"\r\n                            [mode]=\"'indeterminate'\">\r\n                    </mat-progress-spinner>\r\n                </ng-template>\r\n            </adf-loading-content-template>\r\n        </adf-datatable>\r\n    </div>\r\n    <adf-empty-content\r\n            *ngIf=\"!patients\"\r\n            icon=\"blur_on\"\r\n            [title]=\"'No Patients found'\"\r\n            [subtitle]=\"'No Patients matching search criteria or no Patients available'\">\r\n    </adf-empty-content>\r\n        <ngb-pagination [collectionSize]=\"totalItems\"\r\n                        [(page)]=\"page\"\r\n                        [pageSize]=\"itemsPerPage\"\r\n                        [maxSize]=\"5\"\r\n                        size=\"sm\"\r\n                        [rotate]=\"true\"\r\n                        [boundaryLinks]=\"true\"\r\n                        (pageChange)=\"loadPage(page)\">\r\n        </ngb-pagination>\r\n\r\n</div>\r\n<div class=\"fab-container\">\r\n    <button mat-fab\r\n            [matTooltip]=\"'Register New Patient'\"\r\n            [routerLink]=\"['new']\">\r\n        <mat-icon>add</mat-icon>\r\n    </button>\r\n</div>\r\n"
    }),
    tslib_1.__metadata("design:paramtypes", [PatientService,
        NotificationService,
        Router,
        ActivatedRoute])
], PatientListComponent);
export {PatientListComponent};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aWVudC1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xhbWlzLXBhdGllbnQtMS4yLjAvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9wYXRpZW50LWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDcEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFRekQsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBb0I7SUFZN0IsWUFBb0IsY0FBOEIsRUFDNUIsWUFBaUMsRUFDakMsTUFBYyxFQUNkLGNBQThCO1FBSGhDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM1QixpQkFBWSxHQUFaLFlBQVksQ0FBcUI7UUFDakMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQVpwRCxTQUFJLEdBQUcsQ0FBQyxDQUFDO1FBRVQsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNULGlCQUFZLEdBQVcsRUFBRSxDQUFDO1FBQzFCLGtCQUFhLEdBQVcsRUFBRSxDQUFDO1FBQ2xDLGVBQVUsR0FBRyxDQUFDLENBQUM7UUFDZixZQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ2pCLGFBQVEsR0FBYSxFQUFFLENBQUM7UUFNcEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELFdBQVc7SUFDWCxDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxjQUFjLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDcEQsSUFBSSxDQUFDLFFB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b0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUGF0aWVudFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9wYXRpZW50LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgTm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gJ0BhbGZyZXNjby9hZGYtY29yZSc7XHJcbmltcG9ydCB7IFBhdGllbnQgfSBmcm9tICcuLi9tb2RlbC9wYXRpZW50Lm1vZGVsJztcclxuaW1wb3J0IHsgRmFjaWxpdHkgfSBmcm9tICcuLi9tb2RlbC9mYWNpbGl0eS5tb2RlbCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbGFtaXMtcGF0aWVudHMnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL3BhdGllbnQtbGlzdC5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFBhdGllbnRMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gICAgQElucHV0KClcclxuICAgIHBhdGg6IHN0cmluZztcclxuICAgIHBhZ2UgPSAwO1xyXG4gICAgcGF0aWVudHM6IFBhdGllbnRbXTtcclxuICAgIGxvYWRpbmcgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBpdGVtc1BlclBhZ2U6IG51bWJlciA9IDEwO1xyXG4gICAgcHVibGljIGN1cnJlbnRTZWFyY2g6IHN0cmluZyA9ICcnO1xyXG4gICAgdG90YWxJdGVtcyA9IDA7XHJcbiAgICBkaXNwbGF5ID0gJ2xpc3QnO1xyXG4gICAgZmFjaWxpdHk6IEZhY2lsaXR5ID0ge307XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwYXRpZW50U2VydmljZTogUGF0aWVudFNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcm90ZWN0ZWQgbm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb25TZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJvdGVjdGVkIHJvdXRlcjogUm91dGVyLFxyXG4gICAgICAgICAgICAgICAgcHJvdGVjdGVkIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge1xyXG4gICAgICAgIHRoaXMuY3VycmVudFNlYXJjaCA9ICcnO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucGF0aWVudFNlcnZpY2UuZ2V0QWN0aXZlRmFjaWxpdHkoKS5zdWJzY3JpYmUocmVzID0+IHtcclxuICAgICAgICAgICAgdGhpcy5mYWNpbGl0eSA9IHJlcztcclxuICAgICAgICAgICAgdGhpcy5vblBhZ2VDaGFuZ2UoMCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBzZWFyY2hQYXRpZW50KHNlYXJjaDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2VhcmNoID0gc2VhcmNoO1xyXG4gICAgICAgIHRoaXMucGFnZSA9IDA7XHJcbiAgICAgICAgdGhpcy5sb2FkQWxsKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBzZWxlY3QoZGF0YTogYW55KTogYW55IHtcclxuICAgICAgICBpZiAoISF0aGlzLnBhdGgpIHtcclxuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGVCeVVybChgJHt0aGlzLnBhdGh9LyR7ZGF0YS5vYmoudXVpZH1gKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLi4nLCAncGF0aWVudHMnLCBkYXRhLm9iai51dWlkLCAndmlldyddLCB7cmVsYXRpdmVUbzogdGhpcy5hY3RpdmF0ZWRSb3V0ZX0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvblBhZ2VDaGFuZ2UocGFnZUluZm8pIHtcclxuICAgICAgICB0aGlzLnBhZ2UgPSBwYWdlSW5mbztcclxuICAgICAgICB0aGlzLmxvYWRBbGwoKTtcclxuICAgIH1cclxuXHJcbiAgICBsb2FkUGFnZShwYWdlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmxvYWRBbGwoKTtcclxuICAgIH1cclxuXHJcbiAgICBsb2FkQWxsKCkge1xyXG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5wYXRpZW50U2VydmljZS5xdWVyeSh7XHJcbiAgICAgICAgICAgIGtleXdvcmQ6IHRoaXMuY3VycmVudFNlYXJjaCxcclxuICAgICAgICAgICAgcGFnZTogdGhpcy5wYWdlID4gMCA/IHRoaXMucGFnZSAtIDEgOiAwLFxyXG4gICAgICAgICAgICBmYWNpbGl0eUlkOiB0aGlzLmZhY2lsaXR5LmlkIHx8IDAsXHJcbiAgICAgICAgICAgIHNpemU6IHRoaXMuaXRlbXNQZXJQYWdlLFxyXG4gICAgICAgICAgICBzb3J0OiBbJ2lkJywgJ2FzYyddXHJcbiAgICAgICAgfSkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25TdWNjZXNzKHJlcy5ib2R5LCByZXMuaGVhZGVycylcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgKHJlczogYW55KSA9PiB0aGlzLm9uRXJyb3IocmVzKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uU3VjY2VzcyhkYXRhOiBhbnksIGhlYWRlcnM6IGFueSkge1xyXG4gICAgICAgIHRoaXMucGF0aWVudHMgPSBkYXRhO1xyXG4gICAgICAgIHRoaXMudG90YWxJdGVtcyA9IGhlYWRlcnMuZ2V0KCdYLVRvdGFsLUNvdW50Jyk7XHJcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkVycm9yKGVycm9yOiBhbnkpIHtcclxuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbi5vcGVuU25hY2tNZXNzYWdlKGVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgfVxyXG59XHJcblxyXG4iXX0=
