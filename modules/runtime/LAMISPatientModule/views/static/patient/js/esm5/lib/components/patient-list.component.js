import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '@alfresco/adf-core';
var PatientListComponent = /** @class */ (function () {
    function PatientListComponent(patientService, notification, router, activatedRoute) {
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
    PatientListComponent.prototype.ngOnDestroy = function () {
    };
    PatientListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.patientService.getActiveFacility().subscribe(function (res) {
            _this.facility = res;
            _this.onPageChange(0);
        });
    };
    PatientListComponent.prototype.searchPatient = function (search) {
        this.currentSearch = search;
        this.page = 0;
        this.loadAll();
    };
    PatientListComponent.prototype.select = function (data) {
        if (!!this.path) {
            this.router.navigateByUrl(this.path + "/" + data.obj.uuid);
        }
        else {
            this.router.navigate(['..', 'patients', data.obj.uuid, 'view'], { relativeTo: this.activatedRoute });
        }
    };
    PatientListComponent.prototype.onPageChange = function (pageInfo) {
        this.page = pageInfo;
        this.loadAll();
    };
    PatientListComponent.prototype.loadPage = function (page) {
        this.loadAll();
    };
    PatientListComponent.prototype.loadAll = function () {
        var _this = this;
        this.loading = true;
        this.patientService.query({
            keyword: this.currentSearch,
            page: this.page > 0 ? this.page - 1 : 0,
            facilityId: this.facility.id || 0,
            size: this.itemsPerPage,
            sort: ['id', 'asc']
        }).subscribe(function (res) {
            _this.onSuccess(res.body, res.headers);
        }, function (res) { return _this.onError(res); });
    };
    PatientListComponent.prototype.onSuccess = function (data, headers) {
        this.patients = data;
        this.totalItems = headers.get('X-Total-Count');
        this.loading = false;
    };
    PatientListComponent.prototype.onError = function (error) {
        this.notification.openSnackMessage(error.message);
        this.loading = false;
    };
    PatientListComponent.ctorParameters = function () { return [
        { type: PatientService },
        { type: NotificationService },
        { type: Router },
        { type: ActivatedRoute }
    ]; };
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
    return PatientListComponent;
}());
export { PatientListComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aWVudC1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xhbWlzLXBhdGllbnQtMS40LjEvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9wYXRpZW50LWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBb0IsTUFBTSxlQUFlLENBQUM7QUFDbEUsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQzNELE9BQU8sRUFBQyxjQUFjLEVBQUUsTUFBTSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDdkQsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFRdkQ7SUFZSSw4QkFBb0IsY0FBOEIsRUFDNUIsWUFBaUMsRUFDakMsTUFBYyxFQUNkLGNBQThCO1FBSGhDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM1QixpQkFBWSxHQUFaLFlBQVksQ0FBcUI7UUFDakMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQVpwRCxTQUFJLEdBQUcsQ0FBQyxDQUFDO1FBRVQsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNULGlCQUFZLEdBQVcsRUFBRSxDQUFDO1FBQzFCLGtCQUFhLEdBQVcsRUFBRSxDQUFDO1FBQ2xDLGVBQVUsR0FBRyxDQUFDLENBQUM7UUFDZixZQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ2pCLGFBQVEsR0FBYSxFQUFFLENBQUM7UUFNcEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELDBDQUFXLEdBQVg7SUFDQSxDQUFDO0lBRUQsdUNBQVEsR0FBUjtRQUFBLGlCQUtDO1FBSkcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFBLEdBQUc7WUFDakQsS0FBSSxDQUFDLFFBQVEsR0FBRyxHQUFH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QWYzQyxvQkFBb0IsQ0ErRWhDO0lBQUQsMkJBQUM7Q0FBQSxBQS9FRCxJQStFQztTQS9FWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7UGF0aWVudFNlcnZpY2V9IGZyb20gJy4uL3NlcnZpY2VzL3BhdGllbnQuc2VydmljZSc7XG5pbXBvcnQge0FjdGl2YXRlZFJvdXRlLCBSb3V0ZXJ9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge05vdGlmaWNhdGlvblNlcnZpY2V9IGZyb20gJ0BhbGZyZXNjby9hZGYtY29yZSc7XG5pbXBvcnQge1BhdGllbnR9IGZyb20gJy4uL21vZGVsL3BhdGllbnQubW9kZWwnO1xuaW1wb3J0IHtGYWNpbGl0eX0gZnJvbSAnLi4vbW9kZWwvZmFjaWxpdHkubW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2xhbWlzLXBhdGllbnRzJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vcGF0aWVudC1saXN0LmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBQYXRpZW50TGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBASW5wdXQoKVxuICAgIHBhdGg6IHN0cmluZztcbiAgICBwYWdlID0gMDtcbiAgICBwYXRpZW50czogUGF0aWVudFtdO1xuICAgIGxvYWRpbmcgPSBmYWxzZTtcbiAgICBwdWJsaWMgaXRlbXNQZXJQYWdlOiBudW1iZXIgPSAxMDtcbiAgICBwdWJsaWMgY3VycmVudFNlYXJjaDogc3RyaW5nID0gJyc7XG4gICAgdG90YWxJdGVtcyA9IDA7XG4gICAgZGlzcGxheSA9ICdsaXN0JztcbiAgICBmYWNpbGl0eTogRmFjaWxpdHkgPSB7fTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcGF0aWVudFNlcnZpY2U6IFBhdGllbnRTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByb3RlY3RlZCBub3RpZmljYXRpb246IE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJvdGVjdGVkIHJvdXRlcjogUm91dGVyLFxuICAgICAgICAgICAgICAgIHByb3RlY3RlZCBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50U2VhcmNoID0gJyc7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucGF0aWVudFNlcnZpY2UuZ2V0QWN0aXZlRmFjaWxpdHkoKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICAgIHRoaXMuZmFjaWxpdHkgPSByZXM7XG4gICAgICAgICAgICB0aGlzLm9uUGFnZUNoYW5nZSgwKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBzZWFyY2hQYXRpZW50KHNlYXJjaDogYW55KSB7XG4gICAgICAgIHRoaXMuY3VycmVudFNlYXJjaCA9IHNlYXJjaDtcbiAgICAgICAgdGhpcy5wYWdlID0gMDtcbiAgICAgICAgdGhpcy5sb2FkQWxsKCk7XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgc2VsZWN0KGRhdGE6IGFueSk6IGFueSB7XG4gICAgICAgIGlmICghIXRoaXMucGF0aCkge1xuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGVCeVVybChgJHt0aGlzLnBhdGh9LyR7ZGF0YS5vYmoudXVpZH1gKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycuLicsICdwYXRpZW50cycsIGRhdGEub2JqLnV1aWQsICd2aWV3J10sIHtyZWxhdGl2ZVRvOiB0aGlzLmFjdGl2YXRlZFJvdXRlfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblBhZ2VDaGFuZ2UocGFnZUluZm8pIHtcbiAgICAgICAgdGhpcy5wYWdlID0gcGFnZUluZm87XG4gICAgICAgIHRoaXMubG9hZEFsbCgpO1xuICAgIH1cblxuICAgIGxvYWRQYWdlKHBhZ2U6IG51bWJlcikge1xuICAgICAgICB0aGlzLmxvYWRBbGwoKTtcbiAgICB9XG5cbiAgICBsb2FkQWxsKCkge1xuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLnBhdGllbnRTZXJ2aWNlLnF1ZXJ5KHtcbiAgICAgICAgICAgIGtleXdvcmQ6IHRoaXMuY3VycmVudFNlYXJjaCxcbiAgICAgICAgICAgIHBhZ2U6IHRoaXMucGFnZSA+IDAgPyB0aGlzLnBhZ2UgLSAxIDogMCxcbiAgICAgICAgICAgIGZhY2lsaXR5SWQ6IHRoaXMuZmFjaWxpdHkuaWQgfHwgMCxcbiAgICAgICAgICAgIHNpemU6IHRoaXMuaXRlbXNQZXJQYWdlLFxuICAgICAgICAgICAgc29ydDogWydpZCcsICdhc2MnXVxuICAgICAgICB9KS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAocmVzOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uU3VjY2VzcyhyZXMuYm9keSwgcmVzLmhlYWRlcnMpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKHJlczogYW55KSA9PiB0aGlzLm9uRXJyb3IocmVzKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblN1Y2Nlc3MoZGF0YTogYW55LCBoZWFkZXJzOiBhbnkpIHtcbiAgICAgICAgdGhpcy5wYXRpZW50cyA9IGRhdGE7XG4gICAgICAgIHRoaXMudG90YWxJdGVtcyA9IGhlYWRlcnMuZ2V0KCdYLVRvdGFsLUNvdW50Jyk7XG4gICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25FcnJvcihlcnJvcjogYW55KSB7XG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9uLm9wZW5TbmFja01lc3NhZ2UoZXJyb3IubWVzc2FnZSk7XG4gICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgIH1cbn1cblxuIl19