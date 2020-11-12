import * as tslib_1 from "tslib";
import {Component, Input} from '@angular/core';
import {PatientService} from '../services/patient.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '@alfresco/adf-core';

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
        } else {
            this.router.navigate(['..', 'patients', data.obj.uuid, 'view'], {relativeTo: this.activatedRoute});
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
        }, function (res) {
            return _this.onError(res);
        });
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
    PatientListComponent.ctorParameters = function () {
        return [
            {type: PatientService},
            {type: NotificationService},
            {type: Router},
            {type: ActivatedRoute}
        ];
    };
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
    return PatientListComponent;
}());
export {PatientListComponent};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aWVudC1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xhbWlzLXBhdGllbnQtMS4yLjAvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9wYXRpZW50LWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDcEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFRekQ7SUFZSSw4QkFBb0IsY0FBOEIsRUFDNUIsWUFBaUMsRUFDakMsTUFBYyxFQUNkLGNBQThCO1FBSGhDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM1QixpQkFBWSxHQUFaLFlBQVksQ0FBcUI7UUFDakMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQVpwRCxTQUFJLEdBQUcsQ0FBQyxDQUFDO1FBRVQsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNULGlCQUFZLEdBQVcsRUFBRSxDQUFDO1FBQzFCLGtCQUFhLEdBQVcsRUFBRSxDQUFDO1FBQ2xDLGVBQVUsR0FBRyxDQUFDLENBQUM7UUFDZixZQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ2pCLGFBQVEsR0FBYSxFQUFFLENBQUM7UUFNcEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELDBDQUFXLEdBQVg7SUFDQSxDQUFDO0lBRUQsdUNBQVEsR0FBUjtRQUFBLGlCQUtDO1FBSkcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFBLEdBQUc7WUFDakQsS0FBSSxDQUFDLFFBQVEsR0FBRyxHQUFH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QWYzQyxvQkFBb0IsQ0ErRWhDO0lBQUQsMkJBQUM7Q0FBQSxBQS9FRCxJQStFQztTQS9FWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBQYXRpZW50U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3BhdGllbnQuc2VydmljZSc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnQGFsZnJlc2NvL2FkZi1jb3JlJztcclxuaW1wb3J0IHsgUGF0aWVudCB9IGZyb20gJy4uL21vZGVsL3BhdGllbnQubW9kZWwnO1xyXG5pbXBvcnQgeyBGYWNpbGl0eSB9IGZyb20gJy4uL21vZGVsL2ZhY2lsaXR5Lm1vZGVsJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdsYW1pcy1wYXRpZW50cycsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vcGF0aWVudC1saXN0LmNvbXBvbmVudC5odG1sJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgUGF0aWVudExpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgICBASW5wdXQoKVxyXG4gICAgcGF0aDogc3RyaW5nO1xyXG4gICAgcGFnZSA9IDA7XHJcbiAgICBwYXRpZW50czogUGF0aWVudFtdO1xyXG4gICAgbG9hZGluZyA9IGZhbHNlO1xyXG4gICAgcHVibGljIGl0ZW1zUGVyUGFnZTogbnVtYmVyID0gMTA7XHJcbiAgICBwdWJsaWMgY3VycmVudFNlYXJjaDogc3RyaW5nID0gJyc7XHJcbiAgICB0b3RhbEl0ZW1zID0gMDtcclxuICAgIGRpc3BsYXkgPSAnbGlzdCc7XHJcbiAgICBmYWNpbGl0eTogRmFjaWxpdHkgPSB7fTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhdGllbnRTZXJ2aWNlOiBQYXRpZW50U2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByb3RlY3RlZCBub3RpZmljYXRpb246IE5vdGlmaWNhdGlvblNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcm90ZWN0ZWQgcm91dGVyOiBSb3V0ZXIsXHJcbiAgICAgICAgICAgICAgICBwcm90ZWN0ZWQgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2VhcmNoID0gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wYXRpZW50U2VydmljZS5nZXRBY3RpdmVGYWNpbGl0eSgpLnN1YnNjcmliZShyZXMgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmZhY2lsaXR5ID0gcmVzO1xyXG4gICAgICAgICAgICB0aGlzLm9uUGFnZUNoYW5nZSgwKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHNlYXJjaFBhdGllbnQoc2VhcmNoOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmN1cnJlbnRTZWFyY2ggPSBzZWFyY2g7XHJcbiAgICAgICAgdGhpcy5wYWdlID0gMDtcclxuICAgICAgICB0aGlzLmxvYWRBbGwoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHNlbGVjdChkYXRhOiBhbnkpOiBhbnkge1xyXG4gICAgICAgIGlmICghIXRoaXMucGF0aCkge1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKGAke3RoaXMucGF0aH0vJHtkYXRhLm9iai51dWlkfWApXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycuLicsICdwYXRpZW50cycsIGRhdGEub2JqLnV1aWQsICd2aWV3J10sIHtyZWxhdGl2ZVRvOiB0aGlzLmFjdGl2YXRlZFJvdXRlfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uUGFnZUNoYW5nZShwYWdlSW5mbykge1xyXG4gICAgICAgIHRoaXMucGFnZSA9IHBhZ2VJbmZvO1xyXG4gICAgICAgIHRoaXMubG9hZEFsbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWRQYWdlKHBhZ2U6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMubG9hZEFsbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWRBbGwoKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnBhdGllbnRTZXJ2aWNlLnF1ZXJ5KHtcclxuICAgICAgICAgICAga2V5d29yZDogdGhpcy5jdXJyZW50U2VhcmNoLFxyXG4gICAgICAgICAgICBwYWdlOiB0aGlzLnBhZ2UgPiAwID8gdGhpcy5wYWdlIC0gMSA6IDAsXHJcbiAgICAgICAgICAgIGZhY2lsaXR5SWQ6IHRoaXMuZmFjaWxpdHkuaWQgfHwgMCxcclxuICAgICAgICAgICAgc2l6ZTogdGhpcy5pdGVtc1BlclBhZ2UsXHJcbiAgICAgICAgICAgIHNvcnQ6IFsnaWQnLCAnYXNjJ11cclxuICAgICAgICB9KS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vblN1Y2Nlc3MocmVzLmJvZHksIHJlcy5oZWFkZXJzKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAocmVzOiBhbnkpID0+IHRoaXMub25FcnJvcihyZXMpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25TdWNjZXNzKGRhdGE6IGFueSwgaGVhZGVyczogYW55KSB7XHJcbiAgICAgICAgdGhpcy5wYXRpZW50cyA9IGRhdGE7XHJcbiAgICAgICAgdGhpcy50b3RhbEl0ZW1zID0gaGVhZGVycy5nZXQoJ1gtVG90YWwtQ291bnQnKTtcclxuICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uRXJyb3IoZXJyb3I6IGFueSkge1xyXG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9uLm9wZW5TbmFja01lc3NhZ2UoZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbiJdfQ==
