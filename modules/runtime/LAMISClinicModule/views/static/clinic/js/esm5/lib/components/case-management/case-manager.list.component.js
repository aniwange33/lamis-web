import * as tslib_1 from "tslib";
import {Component} from '@angular/core';
import {CaseManagerService} from '../../services/case-manager.service';
import {NotificationService} from '@alfresco/adf-core';
import {ActivatedRoute, Router} from '@angular/router';
import {CaseManagementService} from '../../services/case-management.service';

var CaseManagerListComponent = /** @class */ (function () {
    function CaseManagerListComponent(caseManagerService, caseManagementService, notification, router, activatedRoute) {
        this.caseManagerService = caseManagerService;
        this.caseManagementService = caseManagementService;
        this.notification = notification;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.page = 0;
        this.loading = false;
        this.itemsPerPage = 10;
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
        this.router.navigate(['..', 'case-managers', data.obj.uuid, 'view'], {relativeTo: this.activatedRoute});
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
            page: this.page,
            id: this.facility.id || 0,
            size: this.itemsPerPage,
            sort: ['id', 'asc']
        }).subscribe(function (res) {
            _this.onSuccess(res.body, res.headers);
        }, function (res) {
            return _this.onError(res);
        });
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
    CaseManagerListComponent.ctorParameters = function () {
        return [
            {type: CaseManagerService},
            {type: CaseManagementService},
            {type: NotificationService},
            {type: Router},
            {type: ActivatedRoute}
        ];
    };
    CaseManagerListComponent = tslib_1.__decorate([
        Component({
            selector: 'case-managers',
            template: "<div class=\"layout\">\n    <div class=\"list-container\">\n        <adf-datatable *ngIf=\"caseManagers\"\n                       [rows]=\"caseManagers\"\n                       [loading]=\"loading\"\n                       [display]=\"display\"\n                       (rowClick)=\"select($event.value)\">\n            <data-columns>\n                <data-column key=\"name\" title=\"Name\" sortable=\"true\"></data-column>\n                <data-column key=\"gender\" title=\"Gender\" sortable=\"true\">\n                    <ng-template let-context=\"$implicit\">\n                        {{context.row.getValue('gender') === 'MALE' ? 'Male' : context.row.getValue('gender') === 'FEMALE' ? 'Female' : ''}}\n                    </ng-template>\n                </data-column>\n                <data-column key=\"phoneNumber\" title=\"Telephone Number\" sortable=\"true\"></data-column>\n                <data-column key=\"address\" title=\"Address\" class=\"full-width ellipsis-cell\"></data-column>\n            </data-columns>\n            <adf-loading-content-template>\n                <ng-template>\n                    <mat-progress-spinner\n                            class=\"adf-document-list-loading-margin\"\n                            [color]=\"'primary'\"\n                            [mode]=\"'indeterminate'\">\n                    </mat-progress-spinner>\n                </ng-template>\n            </adf-loading-content-template>\n        </adf-datatable>\n    </div>\n    <adf-empty-content\n            *ngIf=\"!caseManagers\"\n            icon=\"blur_on\"\n            [title]=\"'No Case Managers found'\"\n            [subtitle]=\"'No Case Managers matching search criteria or no Case Managers available'\">\n    </adf-empty-content>\n    <ngb-pagination [collectionSize]=\"totalItems\"\n                    [(page)]=\"page\"\n                    [pageSize]=\"itemsPerPage\"\n                    [maxSize]=\"5\"\n                    size=\"sm\"\n                    [rotate]=\"true\"\n                    [boundaryLinks]=\"true\"\n                    (pageChange)=\"loadPage(page)\">\n    </ngb-pagination>\n\n</div>\n<div class=\"fab-container\">\n    <button mat-fab\n            [matTooltip]=\"'Add New Case Manager'\"\n            [routerLink]=\"['new']\">\n        <mat-icon>add</mat-icon>\n    </button>\n</div>\n"
        }),
        tslib_1.__metadata("design:paramtypes", [CaseManagerService,
            CaseManagementService,
            NotificationService,
            Router,
            ActivatedRoute])
    ], CaseManagerListComponent);
    return CaseManagerListComponent;
}());
export {CaseManagerListComponent};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1tYW5hZ2VyLmxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGFtaXMtY2xpbmljLTEuMS4zLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvY2FzZS1tYW5hZ2VtZW50L2Nhc2UtbWFuYWdlci5saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUVsRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUN6RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBTy9FO0lBVUksa0NBQW9CLGtCQUFzQyxFQUN0QyxxQkFBNEMsRUFDMUMsWUFBaUMsRUFDakMsTUFBYyxFQUNkLGNBQThCO1FBSmhDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtRQUMxQyxpQkFBWSxHQUFaLFlBQVksQ0FBcUI7UUFDakMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQWJwRCxTQUFJLEdBQUcsQ0FBQyxDQUFDO1FBRVQsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNULGlCQUFZLEdBQVcsRUFBRSxDQUFDO1FBQzFCLGtCQUFhLEdBQVcsRUFBRSxDQUFDO1FBQ2xDLGVBQVUsR0FBRyxDQUFDLENBQUM7UUFDZixZQUFPLEdBQUcsTUFBTSxDQUFDO0lBUWpCLENBQUM7SUFFRCwyQ0FBUSxHQUFSO1FBQUEsaUJBS0M7UUFKRyxJQUFJLENBQUMscUJBQXFCLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHO1lBQ3hELEtBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO1lBQ3BCLEtBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRU0seUNBQU0sR0FBYixVQUFjLElBQVM7UUFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLEVBQUUsZUFBZSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUMsQ0FBQyxDQUFDO0lBQzVHLENBQUM7SUFFRCwrQ0FBWSxHQUFaLFVBQWEsUUFBUTtRQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztRQUNyQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELDJDQUFRLEdBQVIsVUFBUyxJQUFZO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQsMENBQU8sR0FBUDtRQUFBLGlCQWNDO1FBYkcsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQztZQUMxQixPQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWE7WUFDM0IsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLENBQUM7WUFDekIsSUFBSSxFQUFFLElBQUksQ0FBQyxZQUFZO1lBQ3ZCLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUM7U0FDdEIsQ0FBQyxDQUFDLFNBQVMsQ0FDUixVQUFDLEdBQVE7WUFDTCxLQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ3pDLENBQUMsRUFDRCxVQUFDLEdBQVEsSUFBSyxPQUFBLEtBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQWpCLENBQWlCLENBQ2xDLENBQUM7SUFDTixDQUFDO0lBRVMsNENBQVMsR0FBbkIsVUFBb0IsSUFBUyxFQUFFLE9BQVk7UUFDdkMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDekIsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLENBQUM7SUFFTywwQ0FBTyxHQUFmLFVBQWdCLEtBQVU7UUFDdEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQzs7Z0JBckR1QyxrQkFBa0I7Z0JBQ2YscUJBQXFCO2dCQUM1QixtQkFBbUI7Z0JBQ3pCLE1BQU07Z0JBQ0UsY0FBYzs7SUFkM0Msd0JBQXdCO1FBSnBDLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxlQUFlO1lBQ3pCLG96RUFBaUQ7U0FDcEQsQ0FBQztpREFXMEMsa0JBQWtCO1lBQ2YscUJBQXFCO1lBQzVCLG1CQUFtQjtZQUN6QixNQUFNO1lBQ0UsY0FBYztPQWQzQyx3QkFBd0IsQ0FnRXBDO0lBQUQsK0JBQUM7Q0FBQSxBQWhFRCxJQWdFQztTQWhFWSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FzZU1hbmFnZXIgfSBmcm9tICcuLi8uLi9tb2RlbC9jYXNlLW1hbmFnZW1lbnQubW9kZWwnO1xuaW1wb3J0IHsgQ2FzZU1hbmFnZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvY2FzZS1tYW5hZ2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gJ0BhbGZyZXNjby9hZGYtY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IENhc2VNYW5hZ2VtZW50U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2Nhc2UtbWFuYWdlbWVudC5zZXJ2aWNlJztcbmltcG9ydCB7IEZhY2lsaXR5IH0gZnJvbSAnLi4vLi4vbW9kZWwvZmFjaWxpdHkubW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2Nhc2UtbWFuYWdlcnMnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9jYXNlLW1hbmFnZXIubGlzdC5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgQ2FzZU1hbmFnZXJMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBwYWdlID0gMDtcbiAgICBjYXNlTWFuYWdlcnM6IENhc2VNYW5hZ2VyW107XG4gICAgbG9hZGluZyA9IGZhbHNlO1xuICAgIHB1YmxpYyBpdGVtc1BlclBhZ2U6IG51bWJlciA9IDEwO1xuICAgIHB1YmxpYyBjdXJyZW50U2VhcmNoOiBzdHJpbmcgPSAnJztcbiAgICB0b3RhbEl0ZW1zID0gMDtcbiAgICBkaXNwbGF5ID0gJ2xpc3QnO1xuICAgIGZhY2lsaXR5OiBGYWNpbGl0eTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY2FzZU1hbmFnZXJTZXJ2aWNlOiBDYXNlTWFuYWdlclNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBjYXNlTWFuYWdlbWVudFNlcnZpY2U6IENhc2VNYW5hZ2VtZW50U2VydmljZSxcbiAgICAgICAgICAgICAgICBwcm90ZWN0ZWQgbm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByb3RlY3RlZCByb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgICAgICAgICBwcm90ZWN0ZWQgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY2FzZU1hbmFnZW1lbnRTZXJ2aWNlLmdldEFjdGl2ZUZhY2lsaXR5KCkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICB0aGlzLmZhY2lsaXR5ID0gcmVzO1xuICAgICAgICAgICAgdGhpcy5vblBhZ2VDaGFuZ2UoMCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcHVibGljIHNlbGVjdChkYXRhOiBhbnkpOiBhbnkge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy4uJywgJ2Nhc2UtbWFuYWdlcnMnLCBkYXRhLm9iai51dWlkLCAndmlldyddLCB7cmVsYXRpdmVUbzogdGhpcy5hY3RpdmF0ZWRSb3V0ZX0pO1xuICAgIH1cblxuICAgIG9uUGFnZUNoYW5nZShwYWdlSW5mbykge1xuICAgICAgICB0aGlzLnBhZ2UgPSBwYWdlSW5mbztcbiAgICAgICAgdGhpcy5sb2FkQWxsKCk7XG4gICAgfVxuXG4gICAgbG9hZFBhZ2UocGFnZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMucGFnZSA9IHBhZ2U7XG4gICAgICAgIHRoaXMubG9hZEFsbCgpO1xuICAgIH1cblxuICAgIGxvYWRBbGwoKSB7XG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuY2FzZU1hbmFnZXJTZXJ2aWNlLnF1ZXJ5KHtcbiAgICAgICAgICAgIGtleXdvcmQ6IHRoaXMuY3VycmVudFNlYXJjaCxcbiAgICAgICAgICAgIHBhZ2U6IHRoaXMucGFnZSxcbiAgICAgICAgICAgIGlkOiB0aGlzLmZhY2lsaXR5LmlkIHx8IDAsXG4gICAgICAgICAgICBzaXplOiB0aGlzLml0ZW1zUGVyUGFnZSxcbiAgICAgICAgICAgIHNvcnQ6IFsnaWQnLCAnYXNjJ11cbiAgICAgICAgfSkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKHJlczogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vblN1Y2Nlc3MocmVzLmJvZHksIHJlcy5oZWFkZXJzKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChyZXM6IGFueSkgPT4gdGhpcy5vbkVycm9yKHJlcylcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25TdWNjZXNzKGRhdGE6IGFueSwgaGVhZGVyczogYW55KSB7XG4gICAgICAgIHRoaXMuY2FzZU1hbmFnZXJzID0gZGF0YTtcbiAgICAgICAgdGhpcy50b3RhbEl0ZW1zID0gaGVhZGVycy5nZXQoJ1gtVG90YWwtQ291bnQnKTtcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkVycm9yKGVycm9yOiBhbnkpIHtcbiAgICAgICAgdGhpcy5ub3RpZmljYXRpb24ub3BlblNuYWNrTWVzc2FnZShlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgfVxufVxuIl19
