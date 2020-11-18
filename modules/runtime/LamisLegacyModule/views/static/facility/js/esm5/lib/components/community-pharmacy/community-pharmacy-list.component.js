import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NotificationService } from '@alfresco/adf-core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunityPharmacyService } from '../../services/community-pharmacy.service';
import { FacilityService } from '../../services/facility.service';
var CommunityPharmacyListComponent = /** @class */ (function () {
    function CommunityPharmacyListComponent(service, facilityService, notification, router, activatedRoute) {
        this.service = service;
        this.facilityService = facilityService;
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
    CommunityPharmacyListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.facilityService.getActive().subscribe(function (res) {
            _this.facility = res.body;
            _this.onPageChange(0);
        });
    };
    CommunityPharmacyListComponent.prototype.select = function (data) {
        this.router.navigate(['..', 'community-pharmacies', data.obj.id, 'view'], { relativeTo: this.activatedRoute });
    };
    CommunityPharmacyListComponent.prototype.onPageChange = function (pageInfo) {
        this.page = pageInfo;
        this.loadAll(pageInfo - 1);
    };
    CommunityPharmacyListComponent.prototype.loadPage = function (page) {
        this.page = page;
        this.loadAll(page - 1);
    };
    CommunityPharmacyListComponent.prototype.loadAll = function (page) {
        var _this = this;
        this.loading = true;
        this.service.query({
            keyword: this.currentSearch,
            page: page < 0 ? 0 : page,
            stateId: this.facility && this.facility.state && this.facility.state.id || 0,
            size: this.itemsPerPage,
            sort: ['id', 'asc']
        }).subscribe(function (res) {
            _this.onSuccess(res.body, res.headers);
        }, function (res) { return _this.onError(res); });
    };
    CommunityPharmacyListComponent.prototype.onSuccess = function (data, headers) {
        this.communityPharmacies = data;
        this.totalItems = headers.get('X-Total-Count');
        this.loading = false;
    };
    CommunityPharmacyListComponent.prototype.onError = function (error) {
        this.notification.openSnackMessage(error.message);
        this.loading = false;
    };
    CommunityPharmacyListComponent.ctorParameters = function () { return [
        { type: CommunityPharmacyService },
        { type: FacilityService },
        { type: NotificationService },
        { type: Router },
        { type: ActivatedRoute }
    ]; };
    CommunityPharmacyListComponent = tslib_1.__decorate([
        Component({
            selector: 'community-pharmacies',
            template: "<div class=\"layout\">\n    <div class=\"list-container\">\n        <adf-datatable *ngIf=\"communityPharmacies\"\n                       [rows]=\"communityPharmacies\"\n                       [loading]=\"loading\"\n                       [display]=\"display\"\n                       (rowClick)=\"select($event.value)\">\n            <data-columns>\n                <data-column key=\"name\" title=\"Name\" sortable=\"true\"></data-column>\n                <data-column key=\"pin\" title=\"PIN\" sortable=\"true\"></data-column>\n                <data-column key=\"phone\" title=\"Telephone Number\" sortable=\"true\"></data-column>\n                <data-column key=\"address\" title=\"Address\" class=\"full-width ellipsis-cell\"></data-column>\n                <data-column key=\"active\" title=\"Active\" sortable=\"true\">\n                    <ng-template let-context=\"$implicit\">\n                        <mat-checkbox [checked]=\"context.row.getValue('active')\"></mat-checkbox>\n                    </ng-template>\n                </data-column>\n            </data-columns>\n            <adf-loading-content-template>\n                <ng-template>\n                    <mat-progress-spinner\n                            class=\"adf-document-list-loading-margin\"\n                            [color]=\"'primary'\"\n                            [mode]=\"'indeterminate'\">\n                    </mat-progress-spinner>\n                </ng-template>\n            </adf-loading-content-template>\n        </adf-datatable>\n    </div>\n    <adf-empty-content\n            *ngIf=\"!communityPharmacies\"\n            icon=\"blur_on\"\n            [title]=\"'No Community Pharmacies found'\"\n            [subtitle]=\"'No Community Pharmacies matching search criteria or no Community Pharmacies available'\">\n    </adf-empty-content>\n    <ngb-pagination [collectionSize]=\"totalItems\"\n                    [(page)]=\"page\"\n                    [pageSize]=\"itemsPerPage\"\n                    [maxSize]=\"5\"\n                    size=\"sm\"\n                    [rotate]=\"true\"\n                    [boundaryLinks]=\"true\"\n                    (pageChange)=\"loadPage(page)\">\n    </ngb-pagination>\n\n</div>\n<div class=\"fab-container\">\n    <button mat-fab\n            [matTooltip]=\"'Add New Community Pharmacy'\"\n            [routerLink]=\"['new']\">\n        <mat-icon>add</mat-icon>\n    </button>\n</div>\n"
        })
    ], CommunityPharmacyListComponent);
    return CommunityPharmacyListComponent;
}());
export { CommunityPharmacyListComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbXVuaXR5LXBoYXJtYWN5LWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGFtaXMtZmFjaWxpdHktMS4yLjAvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9jb21tdW5pdHktcGhhcm1hY3kvY29tbXVuaXR5LXBoYXJtYWN5LWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHekQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDckYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBTWxFO0lBVUksd0NBQW9CLE9BQWlDLEVBQ2pDLGVBQWdDLEVBQzlCLFlBQWlDLEVBQ2pDLE1BQWMsRUFDZCxjQUE4QjtRQUpoQyxZQUFPLEdBQVAsT0FBTyxDQUEwQjtRQUNqQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDOUIsaUJBQVksR0FBWixZQUFZLENBQXFCO1FBQ2pDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFicEQsU0FBSSxHQUFHLENBQUMsQ0FBQztRQUVULFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDVCxpQkFBWSxHQUFXLEVBQUUsQ0FBQztRQUMxQixrQkFBYSxHQUFXLEVBQUUsQ0FBQztRQUNsQyxlQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsWUFBTyxHQUFHLE1BQU0sQ0FBQztJQVFqQixDQUFDO0lBRUQsaURBQVEsR0FBUjtRQUFBLGlCQUtDO1FBSkcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQyxHQUFRO1lBQ2hELEtBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztZQUN6QixLQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVNLCtDQUFNLEdBQWIsVUFBYyxJQUFTO1FBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxFQUFFLHNCQUFzQixFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUMsQ0FBQyxDQUFDO0lBQ2pILENBQUM7SUFFRCxxREFBWSxHQUFaLFVBQWEsUUFBUTtRQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztRQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsaURBQVEsR0FBUixVQUFTLElBQVk7UUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVELGdEQUFPLEdBQVAsVUFBUSxJQUFZO1FBQXBCLGlCQWNDO1FBYkcsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDZixPQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWE7WUFDM0IsSUFBSSxFQUFFLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSTtZQUN6QixPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQztZQUM1RSxJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVk7WUFDdkIsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQztTQUN0QixDQUFDLENBQUMsU0FBUyxDQUNSLFVBQUMsR0FBUTtZQUNMLEtBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDekMsQ0FBQyxFQUNELFVBQUMsR0FBUSxJQUFLLE9BQUEsS0FBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBakIsQ0FBaUIsQ0FDbEMsQ0FBQztJQUNOLENBQUM7SUFFUyxrREFBUyxHQUFuQixVQUFvQixJQUFTLEVBQUUsT0FBWTtRQUN2QyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUN6QixDQUFDO0lBRU8sZ0RBQU8sR0FBZixVQUFnQixLQUFVO1FBQ3RCLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLENBQUM7O2dCQXJENEIsd0JBQXdCO2dCQUNoQixlQUFlO2dCQUNoQixtQkFBbUI7Z0JBQ3pCLE1BQU07Z0JBQ0UsY0FBYzs7SUFkM0MsOEJBQThCO1FBSjFDLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxzQkFBc0I7WUFDaEMsNjRFQUF1RDtTQUMxRCxDQUFDO09BQ1csOEJBQThCLENBZ0UxQztJQUFELHFDQUFDO0NBQUEsQUFoRUQsSUFnRUM7U0FoRVksOEJBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICdAYWxmcmVzY28vYWRmLWNvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBGYWNpbGl0eSB9IGZyb20gJy4uLy4uL21vZGVsL2ZhY2lsaXR5Lm1vZGVsJztcbmltcG9ydCB7IENvbW11bml0eVBoYXJtYWN5IH0gZnJvbSAnLi4vLi4vbW9kZWwvY29tbXVuaXR5LXBoYXJtYWN5Lm1vZGVsJztcbmltcG9ydCB7IENvbW11bml0eVBoYXJtYWN5U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2NvbW11bml0eS1waGFybWFjeS5zZXJ2aWNlJztcbmltcG9ydCB7IEZhY2lsaXR5U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2ZhY2lsaXR5LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2NvbW11bml0eS1waGFybWFjaWVzJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY29tbXVuaXR5LXBoYXJtYWN5LWxpc3QuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIENvbW11bml0eVBoYXJtYWN5TGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgcGFnZSA9IDA7XG4gICAgY29tbXVuaXR5UGhhcm1hY2llczogQ29tbXVuaXR5UGhhcm1hY3lbXTtcbiAgICBsb2FkaW5nID0gZmFsc2U7XG4gICAgcHVibGljIGl0ZW1zUGVyUGFnZTogbnVtYmVyID0gMTA7XG4gICAgcHVibGljIGN1cnJlbnRTZWFyY2g6IHN0cmluZyA9ICcnO1xuICAgIHRvdGFsSXRlbXMgPSAwO1xuICAgIGRpc3BsYXkgPSAnbGlzdCc7XG4gICAgZmFjaWxpdHk6IEZhY2lsaXR5O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzZXJ2aWNlOiBDb21tdW5pdHlQaGFybWFjeVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBmYWNpbGl0eVNlcnZpY2U6IEZhY2lsaXR5U2VydmljZSxcbiAgICAgICAgICAgICAgICBwcm90ZWN0ZWQgbm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByb3RlY3RlZCByb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgICAgICAgICBwcm90ZWN0ZWQgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZmFjaWxpdHlTZXJ2aWNlLmdldEFjdGl2ZSgpLnN1YnNjcmliZSgocmVzOiBhbnkpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZmFjaWxpdHkgPSByZXMuYm9keTtcbiAgICAgICAgICAgIHRoaXMub25QYWdlQ2hhbmdlKDApO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHB1YmxpYyBzZWxlY3QoZGF0YTogYW55KTogYW55IHtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycuLicsICdjb21tdW5pdHktcGhhcm1hY2llcycsIGRhdGEub2JqLmlkLCAndmlldyddLCB7cmVsYXRpdmVUbzogdGhpcy5hY3RpdmF0ZWRSb3V0ZX0pO1xuICAgIH1cblxuICAgIG9uUGFnZUNoYW5nZShwYWdlSW5mbykge1xuICAgICAgICB0aGlzLnBhZ2UgPSBwYWdlSW5mbztcbiAgICAgICAgdGhpcy5sb2FkQWxsKHBhZ2VJbmZvIC0gMSk7XG4gICAgfVxuXG4gICAgbG9hZFBhZ2UocGFnZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMucGFnZSA9IHBhZ2U7XG4gICAgICAgIHRoaXMubG9hZEFsbChwYWdlIC0gMSk7XG4gICAgfVxuXG4gICAgbG9hZEFsbChwYWdlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zZXJ2aWNlLnF1ZXJ5KHtcbiAgICAgICAgICAgIGtleXdvcmQ6IHRoaXMuY3VycmVudFNlYXJjaCxcbiAgICAgICAgICAgIHBhZ2U6IHBhZ2UgPCAwID8gMCA6IHBhZ2UsXG4gICAgICAgICAgICBzdGF0ZUlkOiB0aGlzLmZhY2lsaXR5ICYmIHRoaXMuZmFjaWxpdHkuc3RhdGUgJiYgdGhpcy5mYWNpbGl0eS5zdGF0ZS5pZCB8fCAwLFxuICAgICAgICAgICAgc2l6ZTogdGhpcy5pdGVtc1BlclBhZ2UsXG4gICAgICAgICAgICBzb3J0OiBbJ2lkJywgJ2FzYyddXG4gICAgICAgIH0pLnN1YnNjcmliZShcbiAgICAgICAgICAgIChyZXM6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25TdWNjZXNzKHJlcy5ib2R5LCByZXMuaGVhZGVycylcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAocmVzOiBhbnkpID0+IHRoaXMub25FcnJvcihyZXMpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uU3VjY2VzcyhkYXRhOiBhbnksIGhlYWRlcnM6IGFueSkge1xuICAgICAgICB0aGlzLmNvbW11bml0eVBoYXJtYWNpZXMgPSBkYXRhO1xuICAgICAgICB0aGlzLnRvdGFsSXRlbXMgPSBoZWFkZXJzLmdldCgnWC1Ub3RhbC1Db3VudCcpO1xuICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uRXJyb3IoZXJyb3I6IGFueSkge1xuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbi5vcGVuU25hY2tNZXNzYWdlKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICB9XG59XG4iXX0=