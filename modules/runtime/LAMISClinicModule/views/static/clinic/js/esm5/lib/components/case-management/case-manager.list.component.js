import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { CaseManagerService } from '../../services/case-manager.service';
import { NotificationService } from '@alfresco/adf-core';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseManagementService } from '../../services/case-management.service';
var CaseManagerListComponent = /** @class */ (function () {
    function CaseManagerListComponent(caseManagerService, caseManagementService, notification, router, activatedRoute) {
        this.caseManagerService = caseManagerService;
        this.caseManagementService = caseManagementService;
        this.notification = notification;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.page = 0;
        this.loading = false;
        this.itemsPerPage = 200;
        this.currentSearch = '';
        this.totalItems = 0;
        this.display = 'list';
    }
    CaseManagerListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.caseManagementService.getActiveFacility().subscribe(function (res) {
            _this.facility = res;
            _this.onPageChange(0);
        });
    };
    CaseManagerListComponent.prototype.select = function (data) {
        this.router.navigate(['..', 'case-managers', data.obj.uuid, 'view'], { relativeTo: this.activatedRoute });
    };
    CaseManagerListComponent.prototype.onPageChange = function (pageInfo) {
        this.page = pageInfo;
        this.loadAll();
    };
    CaseManagerListComponent.prototype.loadPage = function (page) {
        this.page = page;
        this.loadAll();
    };
    CaseManagerListComponent.prototype.loadAll = function () {
        var _this = this;
        this.loading = true;
        this.caseManagerService.query({
            keyword: this.currentSearch,
            page: 0,
            id: this.facility && this.facility.id || 0,
            size: this.itemsPerPage,
            sort: ['id', 'asc']
        }).subscribe(function (res) {
            _this.onSuccess(res.body, res.headers);
        }, function (res) { return _this.onError(res); });
    };
    CaseManagerListComponent.prototype.onSuccess = function (data, headers) {
        this.caseManagers = data;
        this.totalItems = headers.get('X-Total-Count');
        this.loading = false;
    };
    CaseManagerListComponent.prototype.onError = function (error) {
        this.notification.openSnackMessage(error.message);
        this.loading = false;
    };
    CaseManagerListComponent.ctorParameters = function () { return [
        { type: CaseManagerService },
        { type: CaseManagementService },
        { type: NotificationService },
        { type: Router },
        { type: ActivatedRoute }
    ]; };
    CaseManagerListComponent = tslib_1.__decorate([
        Component({
            selector: 'case-managers',
            template: "<div class=\"layout\">\n    <div class=\"list-container\">\n        <adf-datatable *ngIf=\"caseManagers\"\n                       [rows]=\"caseManagers\"\n                       [loading]=\"loading\"\n                       [display]=\"display\"\n                       (rowClick)=\"select($event.value)\">\n            <data-columns>\n                <data-column key=\"name\" title=\"Name\" sortable=\"true\"></data-column>\n                <data-column key=\"gender\" title=\"Gender\" sortable=\"true\">\n                    <ng-template let-context=\"$implicit\">\n                        {{context.row.getValue('gender') === 'MALE' ? 'Male' : context.row.getValue('gender') === 'FEMALE' ? 'Female' : ''}}\n                    </ng-template>\n                </data-column>\n                <data-column key=\"phoneNumber\" title=\"Telephone Number\" sortable=\"true\"></data-column>\n                <data-column key=\"address\" title=\"Address\" class=\"full-width ellipsis-cell\"></data-column>\n                <data-column key=\"active\" title=\"Active\" sortable=\"true\">\n                    <ng-template let-context=\"$implicit\">\n                        <mat-checkbox [checked]=\"context.row.getValue('active')\"></mat-checkbox>\n                    </ng-template>\n                </data-column>\n            </data-columns>\n            <adf-loading-content-template>\n                <ng-template>\n                    <mat-progress-spinner\n                            class=\"adf-document-list-loading-margin\"\n                            [color]=\"'primary'\"\n                            [mode]=\"'indeterminate'\">\n                    </mat-progress-spinner>\n                </ng-template>\n            </adf-loading-content-template>\n        </adf-datatable>\n    </div>\n    <adf-empty-content\n            *ngIf=\"!caseManagers\"\n            icon=\"blur_on\"\n            [title]=\"'No Case Managers found'\"\n            [subtitle]=\"'No Case Managers matching search criteria or no Case Managers available'\">\n    </adf-empty-content>\n    <ngb-pagination [collectionSize]=\"totalItems\"\n                    [(page)]=\"page\"\n                    [pageSize]=\"itemsPerPage\"\n                    [maxSize]=\"5\"\n                    size=\"sm\"\n                    [rotate]=\"true\"\n                    [boundaryLinks]=\"true\"\n                    (pageChange)=\"loadPage(page)\">\n    </ngb-pagination>\n\n</div>\n<div class=\"fab-container\">\n    <button mat-fab\n            [matTooltip]=\"'Add New Case Manager'\"\n            [routerLink]=\"['new']\">\n        <mat-icon>add</mat-icon>\n    </button>\n</div>\n"
        }),
        tslib_1.__metadata("design:paramtypes", [CaseManagerService,
            CaseManagementService,
            NotificationService,
            Router,
            ActivatedRoute])
    ], CaseManagerListComponent);
    return CaseManagerListComponent;
}());
export { CaseManagerListComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1tYW5hZ2VyLmxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGFtaXMtY2xpbmljLTEuNC4wLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvY2FzZS1tYW5hZ2VtZW50L2Nhc2UtbWFuYWdlci5saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBUyxNQUFNLGVBQWUsQ0FBQztBQUVoRCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQUN2RSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUN2RCxPQUFPLEVBQUMsY0FBYyxFQUFFLE1BQU0sRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHdDQUF3QyxDQUFDO0FBTzdFO0lBVUksa0NBQW9CLGtCQUFzQyxFQUN0QyxxQkFBNEMsRUFDMUMsWUFBaUMsRUFDakMsTUFBYyxFQUNkLGNBQThCO1FBSmhDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtRQUMxQyxpQkFBWSxHQUFaLFlBQVksQ0FBcUI7UUFDakMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQWJwRCxTQUFJLEdBQUcsQ0FBQyxDQUFDO1FBRVQsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNULGlCQUFZLEdBQVcsR0FBRyxDQUFDO1FBQzNCLGtCQUFhLEdBQVcsRUFBRSxDQUFDO1FBQ2xDLGVBQVUsR0FBRyxDQUFDLENBQUM7UUFDZixZQUFPLEdBQUcsTUFBTSxDQUFDO0lBUWpCLENBQUM7SUFFRCwyQ0FBUSxHQUFSO1FBQUEsaUJBS0M7UUFKRyxJQUFJLENBQUMscUJBQXFCLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHO1lBQ3hELEtBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO1lBQ3BCLEtBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0seUNBQU0sR0FBYixVQUFjLElBQVM7UUFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLEVBQUUsZUFBZSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUMsQ0FBQyxDQUFDO0lBQzVHLENBQUM7SUFFRCwrQ0FBWSxHQUFaLFVBQWEsUUFBUTtRQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztRQUNyQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELDJDQUFRLEdBQVIsVUFBUyxJQUFZO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQsMENBQU8sR0FBUDtRQUFBLGlCQWNDO1FBYkcsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQztZQUMxQixPQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWE7WUFDM0IsSUFBSSxFQUFFLENBQUM7WUFDUCxFQUFFLEVBQUUsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxDQUFDO1lBQzFDLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWTtZQUN2QixJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDO1NBQ3RCLENBQUMsQ0FBQyxTQUFTLENBQ1IsVUFBQyxHQUFRO1lBQ0wsS0FBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxQyxDQUFDLEVBQ0QsVUFBQyxHQUFRLElBQUssT0FBQSxLQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFqQixDQUFpQixDQUNsQyxDQUFDO0lBQ04sQ0FBQztJQUVTLDRDQUFTLEdBQW5CLFVBQW9CLElBQVMsRUFBRSxPQUFZO1FBQ3ZDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUN6QixDQUFDO0lBRU8sMENBQU8sR0FBZixVQUFnQixLQUFVO1FBQ3RCLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLENBQUM7O2dCQXJEdUMsa0JBQWtCO2dCQUNmLHFCQUFxQjtnQkFDNUIsbUJBQW1CO2dCQUN6QixNQUFNO2dCQUNFLGNBQWM7O0lBZDNDLHdCQUF3QjtRQUpwQyxTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZUFBZTtZQUN6QiwwbUZBQWlEO1NBQ3BELENBQUM7aURBVzBDLGtCQUFrQjtZQUNmLHFCQUFxQjtZQUM1QixtQkFBbUI7WUFDekIsTUFBTTtZQUNFLGNBQWM7T0FkM0Msd0JBQXdCLENBZ0VwQztJQUFELCtCQUFDO0NBQUEsQUFoRUQsSUFnRUM7U0FoRVksd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Nhc2VNYW5hZ2VyfSBmcm9tICcuLi8uLi9tb2RlbC9jYXNlLW1hbmFnZW1lbnQubW9kZWwnO1xuaW1wb3J0IHtDYXNlTWFuYWdlclNlcnZpY2V9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2Nhc2UtbWFuYWdlci5zZXJ2aWNlJztcbmltcG9ydCB7Tm90aWZpY2F0aW9uU2VydmljZX0gZnJvbSAnQGFsZnJlc2NvL2FkZi1jb3JlJztcbmltcG9ydCB7QWN0aXZhdGVkUm91dGUsIFJvdXRlcn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7Q2FzZU1hbmFnZW1lbnRTZXJ2aWNlfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jYXNlLW1hbmFnZW1lbnQuc2VydmljZSc7XG5pbXBvcnQge0ZhY2lsaXR5fSBmcm9tICcuLi8uLi9tb2RlbC9mYWNpbGl0eS5tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnY2FzZS1tYW5hZ2VycycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2Nhc2UtbWFuYWdlci5saXN0LmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBDYXNlTWFuYWdlckxpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHBhZ2UgPSAwO1xuICAgIGNhc2VNYW5hZ2VyczogQ2FzZU1hbmFnZXJbXTtcbiAgICBsb2FkaW5nID0gZmFsc2U7XG4gICAgcHVibGljIGl0ZW1zUGVyUGFnZTogbnVtYmVyID0gMjAwO1xuICAgIHB1YmxpYyBjdXJyZW50U2VhcmNoOiBzdHJpbmcgPSAnJztcbiAgICB0b3RhbEl0ZW1zID0gMDtcbiAgICBkaXNwbGF5ID0gJ2xpc3QnO1xuICAgIGZhY2lsaXR5OiBGYWNpbGl0eTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY2FzZU1hbmFnZXJTZXJ2aWNlOiBDYXNlTWFuYWdlclNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBjYXNlTWFuYWdlbWVudFNlcnZpY2U6IENhc2VNYW5hZ2VtZW50U2VydmljZSxcbiAgICAgICAgICAgICAgICBwcm90ZWN0ZWQgbm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByb3RlY3RlZCByb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgICAgICAgICBwcm90ZWN0ZWQgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY2FzZU1hbmFnZW1lbnRTZXJ2aWNlLmdldEFjdGl2ZUZhY2lsaXR5KCkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICB0aGlzLmZhY2lsaXR5ID0gcmVzO1xuICAgICAgICAgICAgdGhpcy5vblBhZ2VDaGFuZ2UoMCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZWxlY3QoZGF0YTogYW55KTogYW55IHtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycuLicsICdjYXNlLW1hbmFnZXJzJywgZGF0YS5vYmoudXVpZCwgJ3ZpZXcnXSwge3JlbGF0aXZlVG86IHRoaXMuYWN0aXZhdGVkUm91dGV9KTtcbiAgICB9XG5cbiAgICBvblBhZ2VDaGFuZ2UocGFnZUluZm8pIHtcbiAgICAgICAgdGhpcy5wYWdlID0gcGFnZUluZm87XG4gICAgICAgIHRoaXMubG9hZEFsbCgpO1xuICAgIH1cblxuICAgIGxvYWRQYWdlKHBhZ2U6IG51bWJlcikge1xuICAgICAgICB0aGlzLnBhZ2UgPSBwYWdlO1xuICAgICAgICB0aGlzLmxvYWRBbGwoKTtcbiAgICB9XG5cbiAgICBsb2FkQWxsKCkge1xuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmNhc2VNYW5hZ2VyU2VydmljZS5xdWVyeSh7XG4gICAgICAgICAgICBrZXl3b3JkOiB0aGlzLmN1cnJlbnRTZWFyY2gsXG4gICAgICAgICAgICBwYWdlOiAwLFxuICAgICAgICAgICAgaWQ6IHRoaXMuZmFjaWxpdHkgJiYgdGhpcy5mYWNpbGl0eS5pZCB8fCAwLFxuICAgICAgICAgICAgc2l6ZTogdGhpcy5pdGVtc1BlclBhZ2UsXG4gICAgICAgICAgICBzb3J0OiBbJ2lkJywgJ2FzYyddXG4gICAgICAgIH0pLnN1YnNjcmliZShcbiAgICAgICAgICAgIChyZXM6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25TdWNjZXNzKHJlcy5ib2R5LCByZXMuaGVhZGVycyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKHJlczogYW55KSA9PiB0aGlzLm9uRXJyb3IocmVzKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblN1Y2Nlc3MoZGF0YTogYW55LCBoZWFkZXJzOiBhbnkpIHtcbiAgICAgICAgdGhpcy5jYXNlTWFuYWdlcnMgPSBkYXRhO1xuICAgICAgICB0aGlzLnRvdGFsSXRlbXMgPSBoZWFkZXJzLmdldCgnWC1Ub3RhbC1Db3VudCcpO1xuICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uRXJyb3IoZXJyb3I6IGFueSkge1xuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbi5vcGVuU25hY2tNZXNzYWdlKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICB9XG59XG4iXX0=