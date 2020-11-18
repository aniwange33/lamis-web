import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '@alfresco/adf-core';
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
        }
        else {
            this.router.navigate(['..', 'patients', data.obj.uuid, 'view'], { relativeTo: this.activatedRoute });
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
    { type: PatientService },
    { type: NotificationService },
    { type: Router },
    { type: ActivatedRoute }
];
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], PatientListComponent.prototype, "path", void 0);
PatientListComponent = tslib_1.__decorate([
    Component({
        selector: 'lamis-patients',
        template: "<div class=\"layout\">\n    <div class=\"list-container\">\n        <div class=\"row\">\n            <div class=\"col-md-8 col-md-offset-4\">\n                <div class=\"adf-toolbar--spacer\"></div>\n                <td-search-box backIcon=\"arrow_back\" class=\"push-right-sm\"\n                               placeholder=\"Search here\" [debounce]=\"500\"\n                               [(ngModel)]=\"currentSearch\"\n                               (searchDebounce)=\"searchPatient($event)\"\n                               (search)=\"searchPatient($event)\"\n                               (clear)=\"currentSearch = ''\" flex>\n                </td-search-box>\n            </div>\n        </div>\n        <br/>\n        <adf-datatable *ngIf=\"patients\"\n                       [rows]=\"patients\"\n                       [loading]=\"loading\"\n                       [display]=\"display\"\n                       (rowClick)=\"select($event.value)\">\n            <data-columns>\n                <data-column key=\"name\" title=\"Name\" sortable=\"true\"></data-column>\n                <data-column key=\"hospitalNum\" title=\"Hospital Number\" sortable=\"true\"></data-column>\n                <data-column key=\"uniqueId\" title=\"Unique ID\" sortable=\"true\"></data-column>\n                <data-column key=\"gender\" title=\"Gender\" sortable=\"true\">\n                    <ng-template let-context=\"$implicit\">\n                        {{context.row.getValue('gender') === 'MALE' ? 'Male' : 'Female'}}\n                    </ng-template>\n                </data-column>\n                <data-column key=\"status\" title=\"Current Status\" sortable=\"true\"></data-column>\n                <data-column key=\"phone\" title=\"Telephone Number\" sortable=\"true\"></data-column>\n                <data-column key=\"address\" title=\"Address\" class=\"full-width ellipsis-cell\"></data-column>\n            </data-columns>\n            <adf-loading-content-template>\n                <ng-template>\n                    <mat-progress-spinner\n                            class=\"adf-document-list-loading-margin\"\n                            [color]=\"'primary'\"\n                            [mode]=\"'indeterminate'\">\n                    </mat-progress-spinner>\n                </ng-template>\n            </adf-loading-content-template>\n        </adf-datatable>\n    </div>\n    <adf-empty-content\n            *ngIf=\"!patients\"\n            icon=\"blur_on\"\n            [title]=\"'No Patients found'\"\n            [subtitle]=\"'No Patients matching search criteria or no Patients available'\">\n    </adf-empty-content>\n    <ngb-pagination [collectionSize]=\"totalItems\"\n                    [(page)]=\"page\"\n                    [pageSize]=\"itemsPerPage\"\n                    [maxSize]=\"5\"\n                    size=\"sm\"\n                    [rotate]=\"true\"\n                    [boundaryLinks]=\"true\"\n                    (pageChange)=\"loadPage(page)\">\n    </ngb-pagination>\n\n</div>\n<div class=\"fab-container\">\n    <button mat-fab\n            [matTooltip]=\"'Register New Patient'\"\n            [routerLink]=\"['new']\">\n        <mat-icon>add</mat-icon>\n    </button>\n</div>\n"
    }),
    tslib_1.__metadata("design:paramtypes", [PatientService,
        NotificationService,
        Router,
        ActivatedRoute])
], PatientListComponent);
export { PatientListComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aWVudC1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xhbWlzLXBhdGllbnQtMS40LjEvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9wYXRpZW50LWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBb0IsTUFBTSxlQUFlLENBQUM7QUFDbEUsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQzNELE9BQU8sRUFBQyxjQUFjLEVBQUUsTUFBTSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDdkQsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFRdkQsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBb0I7SUFZN0IsWUFBb0IsY0FBOEIsRUFDNUIsWUFBaUMsRUFDakMsTUFBYyxFQUNkLGNBQThCO1FBSGhDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM1QixpQkFBWSxHQUFaLFlBQVksQ0FBcUI7UUFDakMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQVpwRCxTQUFJLEdBQUcsQ0FBQyxDQUFDO1FBRVQsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNULGlCQUFZLEdBQVcsRUFBRSxDQUFDO1FBQzFCLGtCQUFhLEdBQVcsRUFBRSxDQUFDO1FBQ2xDLGVBQVUsR0FBRyxDQUFDLENBQUM7UUFDZixZQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ2pCLGFBQVEsR0FBYSxFQUFFLENBQUM7UUFNcEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELFdBQVc7SUFDWCxDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxjQUFjLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDcEQsSUFBSSxDQUFDLFFB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b0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1BhdGllbnRTZXJ2aWNlfSBmcm9tICcuLi9zZXJ2aWNlcy9wYXRpZW50LnNlcnZpY2UnO1xuaW1wb3J0IHtBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtOb3RpZmljYXRpb25TZXJ2aWNlfSBmcm9tICdAYWxmcmVzY28vYWRmLWNvcmUnO1xuaW1wb3J0IHtQYXRpZW50fSBmcm9tICcuLi9tb2RlbC9wYXRpZW50Lm1vZGVsJztcbmltcG9ydCB7RmFjaWxpdHl9IGZyb20gJy4uL21vZGVsL2ZhY2lsaXR5Lm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdsYW1pcy1wYXRpZW50cycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3BhdGllbnQtbGlzdC5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgUGF0aWVudExpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgQElucHV0KClcbiAgICBwYXRoOiBzdHJpbmc7XG4gICAgcGFnZSA9IDA7XG4gICAgcGF0aWVudHM6IFBhdGllbnRbXTtcbiAgICBsb2FkaW5nID0gZmFsc2U7XG4gICAgcHVibGljIGl0ZW1zUGVyUGFnZTogbnVtYmVyID0gMTA7XG4gICAgcHVibGljIGN1cnJlbnRTZWFyY2g6IHN0cmluZyA9ICcnO1xuICAgIHRvdGFsSXRlbXMgPSAwO1xuICAgIGRpc3BsYXkgPSAnbGlzdCc7XG4gICAgZmFjaWxpdHk6IEZhY2lsaXR5ID0ge307XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhdGllbnRTZXJ2aWNlOiBQYXRpZW50U2VydmljZSxcbiAgICAgICAgICAgICAgICBwcm90ZWN0ZWQgbm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByb3RlY3RlZCByb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgICAgICAgICBwcm90ZWN0ZWQgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFNlYXJjaCA9ICcnO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnBhdGllbnRTZXJ2aWNlLmdldEFjdGl2ZUZhY2lsaXR5KCkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICB0aGlzLmZhY2lsaXR5ID0gcmVzO1xuICAgICAgICAgICAgdGhpcy5vblBhZ2VDaGFuZ2UoMCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgc2VhcmNoUGF0aWVudChzZWFyY2g6IGFueSkge1xuICAgICAgICB0aGlzLmN1cnJlbnRTZWFyY2ggPSBzZWFyY2g7XG4gICAgICAgIHRoaXMucGFnZSA9IDA7XG4gICAgICAgIHRoaXMubG9hZEFsbCgpO1xuICAgIH1cblxuXG4gICAgcHVibGljIHNlbGVjdChkYXRhOiBhbnkpOiBhbnkge1xuICAgICAgICBpZiAoISF0aGlzLnBhdGgpIHtcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlQnlVcmwoYCR7dGhpcy5wYXRofS8ke2RhdGEub2JqLnV1aWR9YClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLi4nLCAncGF0aWVudHMnLCBkYXRhLm9iai51dWlkLCAndmlldyddLCB7cmVsYXRpdmVUbzogdGhpcy5hY3RpdmF0ZWRSb3V0ZX0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25QYWdlQ2hhbmdlKHBhZ2VJbmZvKSB7XG4gICAgICAgIHRoaXMucGFnZSA9IHBhZ2VJbmZvO1xuICAgICAgICB0aGlzLmxvYWRBbGwoKTtcbiAgICB9XG5cbiAgICBsb2FkUGFnZShwYWdlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5sb2FkQWxsKCk7XG4gICAgfVxuXG4gICAgbG9hZEFsbCgpIHtcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5wYXRpZW50U2VydmljZS5xdWVyeSh7XG4gICAgICAgICAgICBrZXl3b3JkOiB0aGlzLmN1cnJlbnRTZWFyY2gsXG4gICAgICAgICAgICBwYWdlOiB0aGlzLnBhZ2UgPiAwID8gdGhpcy5wYWdlIC0gMSA6IDAsXG4gICAgICAgICAgICBmYWNpbGl0eUlkOiB0aGlzLmZhY2lsaXR5LmlkIHx8IDAsXG4gICAgICAgICAgICBzaXplOiB0aGlzLml0ZW1zUGVyUGFnZSxcbiAgICAgICAgICAgIHNvcnQ6IFsnaWQnLCAnYXNjJ11cbiAgICAgICAgfSkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKHJlczogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vblN1Y2Nlc3MocmVzLmJvZHksIHJlcy5oZWFkZXJzKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChyZXM6IGFueSkgPT4gdGhpcy5vbkVycm9yKHJlcylcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25TdWNjZXNzKGRhdGE6IGFueSwgaGVhZGVyczogYW55KSB7XG4gICAgICAgIHRoaXMucGF0aWVudHMgPSBkYXRhO1xuICAgICAgICB0aGlzLnRvdGFsSXRlbXMgPSBoZWFkZXJzLmdldCgnWC1Ub3RhbC1Db3VudCcpO1xuICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uRXJyb3IoZXJyb3I6IGFueSkge1xuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbi5vcGVuU25hY2tNZXNzYWdlKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICB9XG59XG5cbiJdfQ==