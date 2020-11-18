import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FacilityService } from '../../services/facility.service';
import { NotificationService } from '@alfresco/adf-core';
import { entityCompare } from '@lamis/web-core';
var FacilityComponent = /** @class */ (function () {
    function FacilityComponent(facilityService, notification) {
        this.facilityService = facilityService;
        this.notification = notification;
    }
    FacilityComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.facilityService.getStates().subscribe(function (res) { return _this.states = res; });
        this.facility = this.facilityService.getActive().subscribe(function (res) {
            if (res.body) {
                _this.facility = res.body;
            }
        });
    };
    FacilityComponent.prototype.entityCompare = function (e1, e2) {
        return entityCompare(e1, e2);
    };
    FacilityComponent.prototype.stateChanged = function (id) {
        var _this = this;
        this.facilityService.getLgaByState(id).subscribe(function (res) { return _this.lgas = res; });
    };
    FacilityComponent.prototype.lgaChanged = function (id) {
        var _this = this;
        this.facilityService.getFacilitiesByLga(id).subscribe(function (res) { return _this.facilities = res; });
    };
    FacilityComponent.prototype.setActive = function () {
        var _this = this;
        this.facilityService.update(this.active).subscribe(function (res) {
            if (res.ok && res.body) {
                _this.facilityService.getActive().subscribe(function (r) {
                    if (r.body) {
                        _this.facility = r.body;
                    }
                });
                _this.notification.showInfo("Facility switched to " + res.body.name);
            }
        });
    };
    FacilityComponent.ctorParameters = function () { return [
        { type: FacilityService },
        { type: NotificationService }
    ]; };
    FacilityComponent = tslib_1.__decorate([
        Component({
            selector: 'lamis-facility',
            template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <mat-card>\n            <mat-card-header>\n                Switch Facility\n            </mat-card-header>\n            <form name=\"form\" role=\"form\" novalidate (ngSubmit)=\"setActive()\" #facilityForm=\"ngForm\">\n                <mat-card-content>\n                    <div class=\"row\">\n                        <div class=\"col-md-12\">\n                            Active Facility: {{facility.name}}\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-select placeholder=\"State\"\n                                            (selectionChange)=\"stateChanged($event.value)\">\n                                    <mat-option *ngFor=\"let state of states\"\n                                                [value]=\"state.id\">{{state.name}}</mat-option>\n                                </mat-select>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-select placeholder=\"LGA\"\n                                            (selectionChange)=\"lgaChanged($event.value)\">\n                                    <mat-option *ngFor=\"let lga of lgas\"\n                                                [value]=\"lga.id\">{{lga.name}}</mat-option>\n                                </mat-select>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-select placeholder=\"Facility\"\n                                            [(ngModel)]=\"active\"\n                                            required\n                                            [compareWith]=\"entityCompare\"\n                                            #fac=\"ngModel\"\n                                            name=\"facility\">\n                                    <mat-option></mat-option>\n                                    <mat-option *ngFor=\"let facility of facilities\"\n                                                [value]=\"facility\">{{facility.name}}</mat-option>\n                                </mat-select>\n                                <mat-error *ngIf=\"fac.errors\">\n                                    Facility is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <mat-divider></mat-divider>\n                </mat-card-content>\n                <mat-card-actions class=\"lamis-edit-form-actions\">\n                    <button mat-raised-button color=\"primary\" [disabled]=\"facilityForm.invalid\">Switch Facility</button>\n                </mat-card-actions>\n            </form>\n        </mat-card>\n    </div>\n</div>\n",
            styles: [".bold{font-weight:700}"]
        })
    ], FacilityComponent);
    return FacilityComponent;
}());
export { FacilityComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjaWxpdHkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGFtaXMtZmFjaWxpdHktMS4yLjAvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9mYWNpbGl0eS9mYWNpbGl0eS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQVFoRDtJQVFJLDJCQUFvQixlQUFnQyxFQUFVLFlBQWlDO1FBQTNFLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFxQjtJQUMvRixDQUFDO0lBRUQsb0NBQVEsR0FBUjtRQUFBLGlCQU9DO1FBTkcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxLQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBakIsQ0FBaUIsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHO1lBQzFELElBQUksR0FBRyxDQUFDLElBQUksRUFBRTtnQkFDVixLQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUE7YUFDM0I7UUFDTCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCx5Q0FBYSxHQUFiLFVBQWMsRUFBRSxFQUFFLEVBQUU7UUFDaEIsT0FBTyxhQUFhLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCx3Q0FBWSxHQUFaLFVBQWEsRUFBRTtRQUFmLGlCQUVDO1FBREcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsS0FBSSxDQUFDLElBQUksR0FBRyxHQUFHLEVBQWYsQ0FBZSxDQUFDLENBQUE7SUFDNUUsQ0FBQztJQUVELHNDQUFVLEdBQVYsVUFBVyxFQUFFO1FBQWIsaUJBRUM7UUFERyxJQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEtBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxFQUFyQixDQUFxQixDQUFDLENBQUE7SUFDdkYsQ0FBQztJQUVELHFDQUFTLEdBQVQ7UUFBQSxpQkFXQztRQVZHLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHO1lBQ2xELElBQUksR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFO2dCQUNwQixLQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFBLENBQUM7b0JBQ3hDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRTt3QkFDUixLQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUE7cUJBQ3pCO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2dCQUNILEtBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLDBCQUF3QixHQUFHLENBQUMsSUFBSSxDQUFDLElBQU0sQ0FBQyxDQUFBO2FBQ3RFO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDOztnQkFuQ29DLGVBQWU7Z0JBQXdCLG1CQUFtQjs7SUFSdEYsaUJBQWlCO1FBTDdCLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsa3FHQUF3Qzs7U0FFM0MsQ0FBQztPQUNXLGlCQUFpQixDQTRDN0I7SUFBRCx3QkFBQztDQUFBLEFBNUNELElBNENDO1NBNUNZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGYWNpbGl0eVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9mYWNpbGl0eS5zZXJ2aWNlJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICdAYWxmcmVzY28vYWRmLWNvcmUnO1xuaW1wb3J0IHsgZW50aXR5Q29tcGFyZSB9IGZyb20gJ0BsYW1pcy93ZWItY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbGFtaXMtZmFjaWxpdHknLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9mYWNpbGl0eS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vZmFjaWxpdHkuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBGYWNpbGl0eUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgc3RhdGVzOiBhbnlbXTtcbiAgICBsZ2FzOiBhbnlbXTtcbiAgICBmYWNpbGl0aWVzOiBhbnlbXTtcbiAgICBhY3RpdmU6IGFueTtcblxuICAgIGZhY2lsaXR5OiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZhY2lsaXR5U2VydmljZTogRmFjaWxpdHlTZXJ2aWNlLCBwcml2YXRlIG5vdGlmaWNhdGlvbjogTm90aWZpY2F0aW9uU2VydmljZSkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmZhY2lsaXR5U2VydmljZS5nZXRTdGF0ZXMoKS5zdWJzY3JpYmUocmVzID0+IHRoaXMuc3RhdGVzID0gcmVzKTtcbiAgICAgICAgdGhpcy5mYWNpbGl0eSA9IHRoaXMuZmFjaWxpdHlTZXJ2aWNlLmdldEFjdGl2ZSgpLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcy5ib2R5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mYWNpbGl0eSA9IHJlcy5ib2R5XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZW50aXR5Q29tcGFyZShlMSwgZTIpIHtcbiAgICAgICAgcmV0dXJuIGVudGl0eUNvbXBhcmUoZTEsIGUyKTtcbiAgICB9XG5cbiAgICBzdGF0ZUNoYW5nZWQoaWQpIHtcbiAgICAgICAgdGhpcy5mYWNpbGl0eVNlcnZpY2UuZ2V0TGdhQnlTdGF0ZShpZCkuc3Vic2NyaWJlKHJlcyA9PiB0aGlzLmxnYXMgPSByZXMpXG4gICAgfVxuXG4gICAgbGdhQ2hhbmdlZChpZCkge1xuICAgICAgICB0aGlzLmZhY2lsaXR5U2VydmljZS5nZXRGYWNpbGl0aWVzQnlMZ2EoaWQpLnN1YnNjcmliZShyZXMgPT4gdGhpcy5mYWNpbGl0aWVzID0gcmVzKVxuICAgIH1cblxuICAgIHNldEFjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5mYWNpbGl0eVNlcnZpY2UudXBkYXRlKHRoaXMuYWN0aXZlKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICAgIGlmIChyZXMub2sgJiYgcmVzLmJvZHkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZhY2lsaXR5U2VydmljZS5nZXRBY3RpdmUoKS5zdWJzY3JpYmUociA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyLmJvZHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmFjaWxpdHkgPSByLmJvZHlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uLnNob3dJbmZvKGBGYWNpbGl0eSBzd2l0Y2hlZCB0byAke3Jlcy5ib2R5Lm5hbWV9YClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19