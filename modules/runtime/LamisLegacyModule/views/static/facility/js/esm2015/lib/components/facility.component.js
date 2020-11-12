import * as tslib_1 from "tslib";
import {Component} from '@angular/core';
import {FacilityService} from '../services/facility.service';
import {NotificationService} from '@alfresco/adf-core';
import {entityCompare} from '@lamis/web-core';

let FacilityComponent = class FacilityComponent {
    constructor(facilityService, notification) {
        this.facilityService = facilityService;
        this.notification = notification;
    }

    ngOnInit() {
        this.facilityService.getStates().subscribe(res => this.states = res);
        this.facility = this.facilityService.getActive().subscribe(res => {
            if (res.body) {
                this.facility = res.body;
            }
        });
    }

    entityCompare(e1, e2) {
        return entityCompare(e1, e2);
    }

    stateChanged(id) {
        this.facilityService.getLgaByState(id).subscribe(res => this.lgas = res);
    }

    lgaChanged(id) {
        this.facilityService.getFacilitiesByLga(id).subscribe(res => this.facilities = res);
    }

    setActive() {
        this.facilityService.update(this.active).subscribe(res => {
            if (res.ok && res.body) {
                this.notification.showInfo(`Facility switched to ${res.body.name}`);
            }
        });
    }
};
FacilityComponent.ctorParameters = () => [
    {type: FacilityService},
    {type: NotificationService}
];
FacilityComponent = tslib_1.__decorate([
    Component({
        selector: 'lamis-facility',
        template: "<div class=\"lamis-edit-form\">\r\n    <div class=\"lamis-edit-form-container\">\r\n        <mat-card>\r\n            <mat-card-header>\r\n                Switch Facility\r\n            </mat-card-header>\r\n            <form name=\"form\" role=\"form\" novalidate (ngSubmit)=\"setActive()\" #facilityForm=\"ngForm\">\r\n                <mat-card-content>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-12\">\r\n                            Active Facility: {{facility.name}}\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <mat-form-field class=\"full-width\">\r\n                                <mat-select placeholder=\"State\"\r\n                                            (selectionChange)=\"stateChanged($event.value)\">\r\n                                    <mat-option *ngFor=\"let state of states\"\r\n                                                [value]=\"state.id\">{{state.name}}</mat-option>\r\n                                </mat-select>\r\n                            </mat-form-field>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <mat-form-field class=\"full-width\">\r\n                                <mat-select placeholder=\"LGA\"\r\n                                            (selectionChange)=\"lgaChanged($event.value)\">\r\n                                    <mat-option *ngFor=\"let lga of lgas\"\r\n                                                [value]=\"lga.id\">{{lga.name}}</mat-option>\r\n                                </mat-select>\r\n                            </mat-form-field>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <mat-form-field class=\"full-width\">\r\n                                <mat-select placeholder=\"Facility\"\r\n                                            [(ngModel)]=\"active\"\r\n                                            required\r\n                                            [compareWith]=\"entityCompare\"\r\n                                            #fac=\"ngModel\"\r\n                                            name=\"facility\">\r\n                                    <mat-option></mat-option>\r\n                                    <mat-option *ngFor=\"let facility of facilities\"\r\n                                                [value]=\"facility\">{{facility.name}}</mat-option>\r\n                                </mat-select>\r\n                                <mat-error *ngIf=\"fac.errors\">\r\n                                    Facility is required\r\n                                </mat-error>\r\n                            </mat-form-field>\r\n                        </div>\r\n                    </div>\r\n                    <mat-divider></mat-divider>\r\n                </mat-card-content>\r\n                <mat-card-actions class=\"lamis-edit-form-actions\">\r\n                    <button mat-raised-button color=\"primary\" [disabled]=\"facilityForm.invalid\">Switch Facility</button>\r\n                </mat-card-actions>\r\n            </form>\r\n        </mat-card>\r\n    </div>\r\n</div>\r\n",
        styles: [".bold{font-weight:700}"]
    }),
    tslib_1.__metadata("design:paramtypes", [FacilityService, NotificationService])
], FacilityComponent);
export {FacilityComponent};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjaWxpdHkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGFtaXMtZmFjaWxpdHkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9mYWNpbGl0eS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQVFoRCxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFpQjtJQVExQixZQUFvQixlQUFnQyxFQUFVLFlBQWlDO1FBQTNFLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFxQjtJQUMvRixDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzdELElBQUksR0FBRyxDQUFDLElBQUksRUFBRTtnQkFDVixJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUE7YUFDM0I7UUFDTCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxhQUFhLENBQUMsRUFBRSxFQUFFLEVBQUU7UUFDaEIsT0FBTyxhQUFhLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxZQUFZLENBQUMsRUFBRTtRQUNYLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUE7SUFDNUUsQ0FBQztJQUVELFVBQVUsQ0FBQyxFQUFFO1FBQ1QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxDQUFBO0lBQ3ZGLENBQUM7SUFFRCxTQUFTO1FBQ0wsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNyRCxJQUFJLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLElBQUksRUFBRTtnQkFDcEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsd0JBQXdCLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTthQUN0RTtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKLENBQUE7O1lBL0J3QyxlQUFlO1lBQXdCLG1CQUFtQjs7QUFSdEYsaUJBQWlCO0lBTDdCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsd3hHQUF3Qzs7S0FFM0MsQ0FBQzs2Q0FTdUMsZUFBZSxFQUF3QixtQkFBbUI7R0FSdEYsaUJBQWlCLENBdUM3QjtTQXZDWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGYWNpbGl0eVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9mYWNpbGl0eS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gJ0BhbGZyZXNjby9hZGYtY29yZSc7XHJcbmltcG9ydCB7IGVudGl0eUNvbXBhcmUgfSBmcm9tICdAbGFtaXMvd2ViLWNvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbGFtaXMtZmFjaWxpdHknLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2ZhY2lsaXR5LmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWycuL2ZhY2lsaXR5LmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEZhY2lsaXR5Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIHN0YXRlczogYW55W107XHJcbiAgICBsZ2FzOiBhbnlbXTtcclxuICAgIGZhY2lsaXRpZXM6IGFueVtdO1xyXG4gICAgYWN0aXZlOiBhbnk7XHJcblxyXG4gICAgZmFjaWxpdHk6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZhY2lsaXR5U2VydmljZTogRmFjaWxpdHlTZXJ2aWNlLCBwcml2YXRlIG5vdGlmaWNhdGlvbjogTm90aWZpY2F0aW9uU2VydmljZSkge1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuZmFjaWxpdHlTZXJ2aWNlLmdldFN0YXRlcygpLnN1YnNjcmliZShyZXMgPT4gdGhpcy5zdGF0ZXMgPSByZXMpO1xyXG4gICAgICAgIHRoaXMuZmFjaWxpdHkgPSB0aGlzLmZhY2lsaXR5U2VydmljZS5nZXRBY3RpdmUoKS5zdWJzY3JpYmUocmVzID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlcy5ib2R5KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZhY2lsaXR5ID0gcmVzLmJvZHlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZW50aXR5Q29tcGFyZShlMSwgZTIpIHtcclxuICAgICAgICByZXR1cm4gZW50aXR5Q29tcGFyZShlMSwgZTIpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRlQ2hhbmdlZChpZCkge1xyXG4gICAgICAgIHRoaXMuZmFjaWxpdHlTZXJ2aWNlLmdldExnYUJ5U3RhdGUoaWQpLnN1YnNjcmliZShyZXMgPT4gdGhpcy5sZ2FzID0gcmVzKVxyXG4gICAgfVxyXG5cclxuICAgIGxnYUNoYW5nZWQoaWQpIHtcclxuICAgICAgICB0aGlzLmZhY2lsaXR5U2VydmljZS5nZXRGYWNpbGl0aWVzQnlMZ2EoaWQpLnN1YnNjcmliZShyZXMgPT4gdGhpcy5mYWNpbGl0aWVzID0gcmVzKVxyXG4gICAgfVxyXG5cclxuICAgIHNldEFjdGl2ZSgpIHtcclxuICAgICAgICB0aGlzLmZhY2lsaXR5U2VydmljZS51cGRhdGUodGhpcy5hY3RpdmUpLnN1YnNjcmliZShyZXMgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzLm9rICYmIHJlcy5ib2R5KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbi5zaG93SW5mbyhgRmFjaWxpdHkgc3dpdGNoZWQgdG8gJHtyZXMuYm9keS5uYW1lfWApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXX0=
