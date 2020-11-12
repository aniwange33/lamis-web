import * as tslib_1 from "tslib";
import {Component} from '@angular/core';
import {FacilityService} from '../services/facility.service';
import {NotificationService} from '@alfresco/adf-core';
import {entityCompare} from '@lamis/web-core';

var FacilityComponent = /** @class */ (function () {
    function FacilityComponent(facilityService, notification) {
        this.facilityService = facilityService;
        this.notification = notification;
    }

    FacilityComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.facilityService.getStates().subscribe(function (res) {
            return _this.states = res;
        });
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
        this.facilityService.getLgaByState(id).subscribe(function (res) {
            return _this.lgas = res;
        });
    };
    FacilityComponent.prototype.lgaChanged = function (id) {
        var _this = this;
        this.facilityService.getFacilitiesByLga(id).subscribe(function (res) {
            return _this.facilities = res;
        });
    };
    FacilityComponent.prototype.setActive = function () {
        var _this = this;
        this.facilityService.update(this.active).subscribe(function (res) {
            if (res.ok && res.body) {
                _this.notification.showInfo("Facility switched to " + res.body.name);
            }
        });
    };
    FacilityComponent.ctorParameters = function () {
        return [
            {type: FacilityService},
            {type: NotificationService}
        ];
    };
    FacilityComponent = tslib_1.__decorate([
        Component({
            selector: 'lamis-facility',
            template: "<div class=\"lamis-edit-form\">\r\n    <div class=\"lamis-edit-form-container\">\r\n        <mat-card>\r\n            <mat-card-header>\r\n                Switch Facility\r\n            </mat-card-header>\r\n            <form name=\"form\" role=\"form\" novalidate (ngSubmit)=\"setActive()\" #facilityForm=\"ngForm\">\r\n                <mat-card-content>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-12\">\r\n                            Active Facility: {{facility.name}}\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <mat-form-field class=\"full-width\">\r\n                                <mat-select placeholder=\"State\"\r\n                                            (selectionChange)=\"stateChanged($event.value)\">\r\n                                    <mat-option *ngFor=\"let state of states\"\r\n                                                [value]=\"state.id\">{{state.name}}</mat-option>\r\n                                </mat-select>\r\n                            </mat-form-field>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <mat-form-field class=\"full-width\">\r\n                                <mat-select placeholder=\"LGA\"\r\n                                            (selectionChange)=\"lgaChanged($event.value)\">\r\n                                    <mat-option *ngFor=\"let lga of lgas\"\r\n                                                [value]=\"lga.id\">{{lga.name}}</mat-option>\r\n                                </mat-select>\r\n                            </mat-form-field>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <mat-form-field class=\"full-width\">\r\n                                <mat-select placeholder=\"Facility\"\r\n                                            [(ngModel)]=\"active\"\r\n                                            required\r\n                                            [compareWith]=\"entityCompare\"\r\n                                            #fac=\"ngModel\"\r\n                                            name=\"facility\">\r\n                                    <mat-option></mat-option>\r\n                                    <mat-option *ngFor=\"let facility of facilities\"\r\n                                                [value]=\"facility\">{{facility.name}}</mat-option>\r\n                                </mat-select>\r\n                                <mat-error *ngIf=\"fac.errors\">\r\n                                    Facility is required\r\n                                </mat-error>\r\n                            </mat-form-field>\r\n                        </div>\r\n                    </div>\r\n                    <mat-divider></mat-divider>\r\n                </mat-card-content>\r\n                <mat-card-actions class=\"lamis-edit-form-actions\">\r\n                    <button mat-raised-button color=\"primary\" [disabled]=\"facilityForm.invalid\">Switch Facility</button>\r\n                </mat-card-actions>\r\n            </form>\r\n        </mat-card>\r\n    </div>\r\n</div>\r\n",
            styles: [".bold{font-weight:700}"]
        }),
        tslib_1.__metadata("design:paramtypes", [FacilityService, NotificationService])
    ], FacilityComponent);
    return FacilityComponent;
}());
export {FacilityComponent};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjaWxpdHkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGFtaXMtZmFjaWxpdHkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9mYWNpbGl0eS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQVFoRDtJQVFJLDJCQUFvQixlQUFnQyxFQUFVLFlBQWlDO1FBQTNFLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFxQjtJQUMvRixDQUFDO0lBRUQsb0NBQVEsR0FBUjtRQUFBLGlCQU9DO1FBTkcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxLQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBakIsQ0FBaUIsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHO1lBQzFELElBQUksR0FBRyxDQUFDLElBQUksRUFBRTtnQkFDVixLQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUE7YUFDM0I7UUFDTCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCx5Q0FBYSxHQUFiLFVBQWMsRUFBRSxFQUFFLEVBQUU7UUFDaEIsT0FBTyxhQUFhLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCx3Q0FBWSxHQUFaLFVBQWEsRUFBRTtRQUFmLGlCQUVDO1FBREcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsS0FBSSxDQUFDLElBQUksR0FBRyxHQUFHLEVBQWYsQ0FBZSxDQUFDLENBQUE7SUFDNUUsQ0FBQztJQUVELHNDQUFVLEdBQVYsVUFBVyxFQUFFO1FBQWIsaUJBRUM7UUFERyxJQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEtBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxFQUFyQixDQUFxQixDQUFDLENBQUE7SUFDdkYsQ0FBQztJQUVELHFDQUFTLEdBQVQ7UUFBQSxpQkFNQztRQUxHLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHO1lBQ2xELElBQUksR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFO2dCQUNwQixLQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQywwQkFBd0IsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFNLENBQUMsQ0FBQTthQUN0RTtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7Z0JBOUJvQyxlQUFlO2dCQUF3QixtQkFBbUI7O0lBUnRGLGlCQUFpQjtRQUw3QixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLHd4R0FBd0M7O1NBRTNDLENBQUM7aURBU3VDLGVBQWUsRUFBd0IsbUJBQW1CO09BUnRGLGlCQUFpQixDQXVDN0I7SUFBRCx3QkFBQztDQUFBLEFBdkNELElBdUNDO1NBdkNZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZhY2lsaXR5U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2ZhY2lsaXR5LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnQGFsZnJlc2NvL2FkZi1jb3JlJztcclxuaW1wb3J0IHsgZW50aXR5Q29tcGFyZSB9IGZyb20gJ0BsYW1pcy93ZWItY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdsYW1pcy1mYWNpbGl0eScsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vZmFjaWxpdHkuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vZmFjaWxpdHkuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRmFjaWxpdHlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgc3RhdGVzOiBhbnlbXTtcclxuICAgIGxnYXM6IGFueVtdO1xyXG4gICAgZmFjaWxpdGllczogYW55W107XHJcbiAgICBhY3RpdmU6IGFueTtcclxuXHJcbiAgICBmYWNpbGl0eTogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZmFjaWxpdHlTZXJ2aWNlOiBGYWNpbGl0eVNlcnZpY2UsIHByaXZhdGUgbm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb25TZXJ2aWNlKSB7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5mYWNpbGl0eVNlcnZpY2UuZ2V0U3RhdGVzKCkuc3Vic2NyaWJlKHJlcyA9PiB0aGlzLnN0YXRlcyA9IHJlcyk7XHJcbiAgICAgICAgdGhpcy5mYWNpbGl0eSA9IHRoaXMuZmFjaWxpdHlTZXJ2aWNlLmdldEFjdGl2ZSgpLnN1YnNjcmliZShyZXMgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzLmJvZHkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmFjaWxpdHkgPSByZXMuYm9keVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBlbnRpdHlDb21wYXJlKGUxLCBlMikge1xyXG4gICAgICAgIHJldHVybiBlbnRpdHlDb21wYXJlKGUxLCBlMik7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGVDaGFuZ2VkKGlkKSB7XHJcbiAgICAgICAgdGhpcy5mYWNpbGl0eVNlcnZpY2UuZ2V0TGdhQnlTdGF0ZShpZCkuc3Vic2NyaWJlKHJlcyA9PiB0aGlzLmxnYXMgPSByZXMpXHJcbiAgICB9XHJcblxyXG4gICAgbGdhQ2hhbmdlZChpZCkge1xyXG4gICAgICAgIHRoaXMuZmFjaWxpdHlTZXJ2aWNlLmdldEZhY2lsaXRpZXNCeUxnYShpZCkuc3Vic2NyaWJlKHJlcyA9PiB0aGlzLmZhY2lsaXRpZXMgPSByZXMpXHJcbiAgICB9XHJcblxyXG4gICAgc2V0QWN0aXZlKCkge1xyXG4gICAgICAgIHRoaXMuZmFjaWxpdHlTZXJ2aWNlLnVwZGF0ZSh0aGlzLmFjdGl2ZSkuc3Vic2NyaWJlKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXMub2sgJiYgcmVzLmJvZHkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uLnNob3dJbmZvKGBGYWNpbGl0eSBzd2l0Y2hlZCB0byAke3Jlcy5ib2R5Lm5hbWV9YClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==
