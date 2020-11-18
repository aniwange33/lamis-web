import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NotificationService } from '@alfresco/adf-core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunityPharmacyService } from '../../services/community-pharmacy.service';
import { FacilityService } from '../../services/facility.service';
let CommunityPharmacyListComponent = class CommunityPharmacyListComponent {
    constructor(service, facilityService, notification, router, activatedRoute) {
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
    ngOnInit() {
        this.facilityService.getActive().subscribe((res) => {
            this.facility = res.body;
            this.onPageChange(0);
        });
    }
    select(data) {
        this.router.navigate(['..', 'community-pharmacies', data.obj.id, 'view'], { relativeTo: this.activatedRoute });
    }
    onPageChange(pageInfo) {
        this.page = pageInfo;
        this.loadAll(pageInfo - 1);
    }
    loadPage(page) {
        this.page = page;
        this.loadAll(page - 1);
    }
    loadAll(page) {
        this.loading = true;
        this.service.query({
            keyword: this.currentSearch,
            page: page < 0 ? 0 : page,
            stateId: this.facility && this.facility.state && this.facility.state.id || 0,
            size: this.itemsPerPage,
            sort: ['id', 'asc']
        }).subscribe((res) => {
            this.onSuccess(res.body, res.headers);
        }, (res) => this.onError(res));
    }
    onSuccess(data, headers) {
        this.communityPharmacies = data;
        this.totalItems = headers.get('X-Total-Count');
        this.loading = false;
    }
    onError(error) {
        this.notification.openSnackMessage(error.message);
        this.loading = false;
    }
};
CommunityPharmacyListComponent.ctorParameters = () => [
    { type: CommunityPharmacyService },
    { type: FacilityService },
    { type: NotificationService },
    { type: Router },
    { type: ActivatedRoute }
];
CommunityPharmacyListComponent = tslib_1.__decorate([
    Component({
        selector: 'community-pharmacies',
        template: "<div class=\"layout\">\n    <div class=\"list-container\">\n        <adf-datatable *ngIf=\"communityPharmacies\"\n                       [rows]=\"communityPharmacies\"\n                       [loading]=\"loading\"\n                       [display]=\"display\"\n                       (rowClick)=\"select($event.value)\">\n            <data-columns>\n                <data-column key=\"name\" title=\"Name\" sortable=\"true\"></data-column>\n                <data-column key=\"pin\" title=\"PIN\" sortable=\"true\"></data-column>\n                <data-column key=\"phone\" title=\"Telephone Number\" sortable=\"true\"></data-column>\n                <data-column key=\"address\" title=\"Address\" class=\"full-width ellipsis-cell\"></data-column>\n                <data-column key=\"active\" title=\"Active\" sortable=\"true\">\n                    <ng-template let-context=\"$implicit\">\n                        <mat-checkbox [checked]=\"context.row.getValue('active')\"></mat-checkbox>\n                    </ng-template>\n                </data-column>\n            </data-columns>\n            <adf-loading-content-template>\n                <ng-template>\n                    <mat-progress-spinner\n                            class=\"adf-document-list-loading-margin\"\n                            [color]=\"'primary'\"\n                            [mode]=\"'indeterminate'\">\n                    </mat-progress-spinner>\n                </ng-template>\n            </adf-loading-content-template>\n        </adf-datatable>\n    </div>\n    <adf-empty-content\n            *ngIf=\"!communityPharmacies\"\n            icon=\"blur_on\"\n            [title]=\"'No Community Pharmacies found'\"\n            [subtitle]=\"'No Community Pharmacies matching search criteria or no Community Pharmacies available'\">\n    </adf-empty-content>\n    <ngb-pagination [collectionSize]=\"totalItems\"\n                    [(page)]=\"page\"\n                    [pageSize]=\"itemsPerPage\"\n                    [maxSize]=\"5\"\n                    size=\"sm\"\n                    [rotate]=\"true\"\n                    [boundaryLinks]=\"true\"\n                    (pageChange)=\"loadPage(page)\">\n    </ngb-pagination>\n\n</div>\n<div class=\"fab-container\">\n    <button mat-fab\n            [matTooltip]=\"'Add New Community Pharmacy'\"\n            [routerLink]=\"['new']\">\n        <mat-icon>add</mat-icon>\n    </button>\n</div>\n"
    })
], CommunityPharmacyListComponent);
export { CommunityPharmacyListComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbXVuaXR5LXBoYXJtYWN5LWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGFtaXMtZmFjaWxpdHktMS4yLjAvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9jb21tdW5pdHktcGhhcm1hY3kvY29tbXVuaXR5LXBoYXJtYWN5LWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHekQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDckYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBTWxFLElBQWEsOEJBQThCLEdBQTNDLE1BQWEsOEJBQThCO0lBVXZDLFlBQW9CLE9BQWlDLEVBQ2pDLGVBQWdDLEVBQzlCLFlBQWlDLEVBQ2pDLE1BQWMsRUFDZCxjQUE4QjtRQUpoQyxZQUFPLEdBQVAsT0FBTyxDQUEwQjtRQUNqQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDOUIsaUJBQVksR0FBWixZQUFZLENBQXFCO1FBQ2pDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFicEQsU0FBSSxHQUFHLENBQUMsQ0FBQztRQUVULFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDVCxpQkFBWSxHQUFXLEVBQUUsQ0FBQztRQUMxQixrQkFBYSxHQUFXLEVBQUUsQ0FBQztRQUNsQyxlQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsWUFBTyxHQUFHLE1BQU0sQ0FBQztJQVFqQixDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBUSxFQUFFLEVBQUU7WUFDcEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRU0sTUFBTSxDQUFDLElBQVM7UUFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLEVBQUUsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLEVBQUUsRUFBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBQyxDQUFDLENBQUM7SUFDakgsQ0FBQztJQUVELFlBQVksQ0FBQyxRQUFRO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxRQUFRLENBQUMsSUFBWTtRQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQsT0FBTyxDQUFDLElBQVk7UUFDaEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDZixPQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWE7WUFDM0IsSUFBSSxFQUFFLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSTtZQUN6QixPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQztZQUM1RSxJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVk7WUFDdkIsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQztTQUN0QixDQUFDLENBQUMsU0FBUyxDQUNSLENBQUMsR0FBUSxFQUFFLEVBQUU7WUFDVCxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ3pDLENBQUMsRUFDRCxDQUFDLEdBQVEsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FDbEMsQ0FBQztJQUNOLENBQUM7SUFFUyxTQUFTLENBQUMsSUFBUyxFQUFFLE9BQVk7UUFDdkMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztRQUNoQyxJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQztJQUVPLE9BQU8sQ0FBQyxLQUFVO1FBQ3RCLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLENBQUM7Q0FDSixDQUFBOztZQXREZ0Msd0JBQXdCO1lBQ2hCLGVBQWU7WUFDaEIsbUJBQW1CO1lBQ3pCLE1BQU07WUFDRSxjQUFjOztBQWQzQyw4QkFBOEI7SUFKMUMsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLHNCQUFzQjtRQUNoQyw2NEVBQXVEO0tBQzFELENBQUM7R0FDVyw4QkFBOEIsQ0FnRTFDO1NBaEVZLDhCQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnQGFsZnJlc2NvL2FkZi1jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgRmFjaWxpdHkgfSBmcm9tICcuLi8uLi9tb2RlbC9mYWNpbGl0eS5tb2RlbCc7XG5pbXBvcnQgeyBDb21tdW5pdHlQaGFybWFjeSB9IGZyb20gJy4uLy4uL21vZGVsL2NvbW11bml0eS1waGFybWFjeS5tb2RlbCc7XG5pbXBvcnQgeyBDb21tdW5pdHlQaGFybWFjeVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jb21tdW5pdHktcGhhcm1hY3kuc2VydmljZSc7XG5pbXBvcnQgeyBGYWNpbGl0eVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9mYWNpbGl0eS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdjb21tdW5pdHktcGhhcm1hY2llcycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2NvbW11bml0eS1waGFybWFjeS1saXN0LmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBDb21tdW5pdHlQaGFybWFjeUxpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHBhZ2UgPSAwO1xuICAgIGNvbW11bml0eVBoYXJtYWNpZXM6IENvbW11bml0eVBoYXJtYWN5W107XG4gICAgbG9hZGluZyA9IGZhbHNlO1xuICAgIHB1YmxpYyBpdGVtc1BlclBhZ2U6IG51bWJlciA9IDEwO1xuICAgIHB1YmxpYyBjdXJyZW50U2VhcmNoOiBzdHJpbmcgPSAnJztcbiAgICB0b3RhbEl0ZW1zID0gMDtcbiAgICBkaXNwbGF5ID0gJ2xpc3QnO1xuICAgIGZhY2lsaXR5OiBGYWNpbGl0eTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc2VydmljZTogQ29tbXVuaXR5UGhhcm1hY3lTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgZmFjaWxpdHlTZXJ2aWNlOiBGYWNpbGl0eVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJvdGVjdGVkIG5vdGlmaWNhdGlvbjogTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcm90ZWN0ZWQgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgICAgICAgICAgcHJvdGVjdGVkIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmZhY2lsaXR5U2VydmljZS5nZXRBY3RpdmUoKS5zdWJzY3JpYmUoKHJlczogYW55KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmZhY2lsaXR5ID0gcmVzLmJvZHk7XG4gICAgICAgICAgICB0aGlzLm9uUGFnZUNoYW5nZSgwKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBwdWJsaWMgc2VsZWN0KGRhdGE6IGFueSk6IGFueSB7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLi4nLCAnY29tbXVuaXR5LXBoYXJtYWNpZXMnLCBkYXRhLm9iai5pZCwgJ3ZpZXcnXSwge3JlbGF0aXZlVG86IHRoaXMuYWN0aXZhdGVkUm91dGV9KTtcbiAgICB9XG5cbiAgICBvblBhZ2VDaGFuZ2UocGFnZUluZm8pIHtcbiAgICAgICAgdGhpcy5wYWdlID0gcGFnZUluZm87XG4gICAgICAgIHRoaXMubG9hZEFsbChwYWdlSW5mbyAtIDEpO1xuICAgIH1cblxuICAgIGxvYWRQYWdlKHBhZ2U6IG51bWJlcikge1xuICAgICAgICB0aGlzLnBhZ2UgPSBwYWdlO1xuICAgICAgICB0aGlzLmxvYWRBbGwocGFnZSAtIDEpO1xuICAgIH1cblxuICAgIGxvYWRBbGwocGFnZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuc2VydmljZS5xdWVyeSh7XG4gICAgICAgICAgICBrZXl3b3JkOiB0aGlzLmN1cnJlbnRTZWFyY2gsXG4gICAgICAgICAgICBwYWdlOiBwYWdlIDwgMCA/IDAgOiBwYWdlLFxuICAgICAgICAgICAgc3RhdGVJZDogdGhpcy5mYWNpbGl0eSAmJiB0aGlzLmZhY2lsaXR5LnN0YXRlICYmIHRoaXMuZmFjaWxpdHkuc3RhdGUuaWQgfHwgMCxcbiAgICAgICAgICAgIHNpemU6IHRoaXMuaXRlbXNQZXJQYWdlLFxuICAgICAgICAgICAgc29ydDogWydpZCcsICdhc2MnXVxuICAgICAgICB9KS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAocmVzOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uU3VjY2VzcyhyZXMuYm9keSwgcmVzLmhlYWRlcnMpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKHJlczogYW55KSA9PiB0aGlzLm9uRXJyb3IocmVzKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblN1Y2Nlc3MoZGF0YTogYW55LCBoZWFkZXJzOiBhbnkpIHtcbiAgICAgICAgdGhpcy5jb21tdW5pdHlQaGFybWFjaWVzID0gZGF0YTtcbiAgICAgICAgdGhpcy50b3RhbEl0ZW1zID0gaGVhZGVycy5nZXQoJ1gtVG90YWwtQ291bnQnKTtcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkVycm9yKGVycm9yOiBhbnkpIHtcbiAgICAgICAgdGhpcy5ub3RpZmljYXRpb24ub3BlblNuYWNrTWVzc2FnZShlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgfVxufVxuIl19