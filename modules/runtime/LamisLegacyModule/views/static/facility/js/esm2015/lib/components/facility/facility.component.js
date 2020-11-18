import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FacilityService } from '../../services/facility.service';
import { NotificationService } from '@alfresco/adf-core';
import { entityCompare } from '@lamis/web-core';
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
                this.facilityService.getActive().subscribe(r => {
                    if (r.body) {
                        this.facility = r.body;
                    }
                });
                this.notification.showInfo(`Facility switched to ${res.body.name}`);
            }
        });
    }
};
FacilityComponent.ctorParameters = () => [
    { type: FacilityService },
    { type: NotificationService }
];
FacilityComponent = tslib_1.__decorate([
    Component({
        selector: 'lamis-facility',
        template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <mat-card>\n            <mat-card-header>\n                Switch Facility\n            </mat-card-header>\n            <form name=\"form\" role=\"form\" novalidate (ngSubmit)=\"setActive()\" #facilityForm=\"ngForm\">\n                <mat-card-content>\n                    <div class=\"row\">\n                        <div class=\"col-md-12\">\n                            Active Facility: {{facility.name}}\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-select placeholder=\"State\"\n                                            (selectionChange)=\"stateChanged($event.value)\">\n                                    <mat-option *ngFor=\"let state of states\"\n                                                [value]=\"state.id\">{{state.name}}</mat-option>\n                                </mat-select>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-select placeholder=\"LGA\"\n                                            (selectionChange)=\"lgaChanged($event.value)\">\n                                    <mat-option *ngFor=\"let lga of lgas\"\n                                                [value]=\"lga.id\">{{lga.name}}</mat-option>\n                                </mat-select>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-select placeholder=\"Facility\"\n                                            [(ngModel)]=\"active\"\n                                            required\n                                            [compareWith]=\"entityCompare\"\n                                            #fac=\"ngModel\"\n                                            name=\"facility\">\n                                    <mat-option></mat-option>\n                                    <mat-option *ngFor=\"let facility of facilities\"\n                                                [value]=\"facility\">{{facility.name}}</mat-option>\n                                </mat-select>\n                                <mat-error *ngIf=\"fac.errors\">\n                                    Facility is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <mat-divider></mat-divider>\n                </mat-card-content>\n                <mat-card-actions class=\"lamis-edit-form-actions\">\n                    <button mat-raised-button color=\"primary\" [disabled]=\"facilityForm.invalid\">Switch Facility</button>\n                </mat-card-actions>\n            </form>\n        </mat-card>\n    </div>\n</div>\n",
        styles: [".bold{font-weight:700}"]
    })
], FacilityComponent);
export { FacilityComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjaWxpdHkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGFtaXMtZmFjaWxpdHktMS4yLjAvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9mYWNpbGl0eS9mYWNpbGl0eS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQVFoRCxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFpQjtJQVExQixZQUFvQixlQUFnQyxFQUFVLFlBQWlDO1FBQTNFLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFxQjtJQUMvRixDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzdELElBQUksR0FBRyxDQUFDLElBQUksRUFBRTtnQkFDVixJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUE7YUFDM0I7UUFDTCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxhQUFhLENBQUMsRUFBRSxFQUFFLEVBQUU7UUFDaEIsT0FBTyxhQUFhLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxZQUFZLENBQUMsRUFBRTtRQUNYLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUE7SUFDNUUsQ0FBQztJQUVELFVBQVUsQ0FBQyxFQUFFO1FBQ1QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxDQUFBO0lBQ3ZGLENBQUM7SUFFRCxTQUFTO1FBQ0wsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNyRCxJQUFJLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLElBQUksRUFBRTtnQkFDcEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQzNDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRTt3QkFDUixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUE7cUJBQ3pCO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLHdCQUF3QixHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7YUFDdEU7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSixDQUFBOztZQXBDd0MsZUFBZTtZQUF3QixtQkFBbUI7O0FBUnRGLGlCQUFpQjtJQUw3QixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsZ0JBQWdCO1FBQzFCLGtxR0FBd0M7O0tBRTNDLENBQUM7R0FDVyxpQkFBaUIsQ0E0QzdCO1NBNUNZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGYWNpbGl0eVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9mYWNpbGl0eS5zZXJ2aWNlJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICdAYWxmcmVzY28vYWRmLWNvcmUnO1xuaW1wb3J0IHsgZW50aXR5Q29tcGFyZSB9IGZyb20gJ0BsYW1pcy93ZWItY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbGFtaXMtZmFjaWxpdHknLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9mYWNpbGl0eS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vZmFjaWxpdHkuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBGYWNpbGl0eUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgc3RhdGVzOiBhbnlbXTtcbiAgICBsZ2FzOiBhbnlbXTtcbiAgICBmYWNpbGl0aWVzOiBhbnlbXTtcbiAgICBhY3RpdmU6IGFueTtcblxuICAgIGZhY2lsaXR5OiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZhY2lsaXR5U2VydmljZTogRmFjaWxpdHlTZXJ2aWNlLCBwcml2YXRlIG5vdGlmaWNhdGlvbjogTm90aWZpY2F0aW9uU2VydmljZSkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmZhY2lsaXR5U2VydmljZS5nZXRTdGF0ZXMoKS5zdWJzY3JpYmUocmVzID0+IHRoaXMuc3RhdGVzID0gcmVzKTtcbiAgICAgICAgdGhpcy5mYWNpbGl0eSA9IHRoaXMuZmFjaWxpdHlTZXJ2aWNlLmdldEFjdGl2ZSgpLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcy5ib2R5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mYWNpbGl0eSA9IHJlcy5ib2R5XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZW50aXR5Q29tcGFyZShlMSwgZTIpIHtcbiAgICAgICAgcmV0dXJuIGVudGl0eUNvbXBhcmUoZTEsIGUyKTtcbiAgICB9XG5cbiAgICBzdGF0ZUNoYW5nZWQoaWQpIHtcbiAgICAgICAgdGhpcy5mYWNpbGl0eVNlcnZpY2UuZ2V0TGdhQnlTdGF0ZShpZCkuc3Vic2NyaWJlKHJlcyA9PiB0aGlzLmxnYXMgPSByZXMpXG4gICAgfVxuXG4gICAgbGdhQ2hhbmdlZChpZCkge1xuICAgICAgICB0aGlzLmZhY2lsaXR5U2VydmljZS5nZXRGYWNpbGl0aWVzQnlMZ2EoaWQpLnN1YnNjcmliZShyZXMgPT4gdGhpcy5mYWNpbGl0aWVzID0gcmVzKVxuICAgIH1cblxuICAgIHNldEFjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5mYWNpbGl0eVNlcnZpY2UudXBkYXRlKHRoaXMuYWN0aXZlKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICAgIGlmIChyZXMub2sgJiYgcmVzLmJvZHkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZhY2lsaXR5U2VydmljZS5nZXRBY3RpdmUoKS5zdWJzY3JpYmUociA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyLmJvZHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmFjaWxpdHkgPSByLmJvZHlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uLnNob3dJbmZvKGBGYWNpbGl0eSBzd2l0Y2hlZCB0byAke3Jlcy5ib2R5Lm5hbWV9YClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19