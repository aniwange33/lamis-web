import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { PatientService, PatientTimeline } from '../services/patient.service';
import { Router } from '@angular/router';
import { TdDialogService } from '@covalent/core';
import { NotificationService } from '@alfresco/adf-core';
import { ObservationService } from '../services/observation.service';
var TimelineComponent = /** @class */ (function () {
    function TimelineComponent(patientService, router, observationService, _dialogService, notificationService) {
        this.patientService = patientService;
        this.router = router;
        this.observationService = observationService;
        this._dialogService = _dialogService;
        this.notificationService = notificationService;
        this.detailed = false;
    }
    TimelineComponent.prototype.ngOnInit = function () {
        this.loadActivities();
    };
    TimelineComponent.prototype.view = function (path, id) {
        this.router.navigate(['/', path, id, 'patient', this.patientUuid, 'view']);
    };
    TimelineComponent.prototype.edit = function (path, id) {
        this.router.navigate(['/', path, id, 'patient', this.patientUuid, 'edit']);
    };
    TimelineComponent.prototype.delete = function (path, id) {
        var _this = this;
        this._dialogService.openConfirm({
            title: 'Confirm',
            message: 'Do you want to delete this event, action cannot be reversed?',
            cancelButton: 'No',
            acceptButton: 'Yes',
            width: '500px',
        }).afterClosed().subscribe(function (accept) {
            if (accept) {
                _this.observationService.getObservation(path, id).subscribe(function (obj) {
                    if (obj.body) {
                        _this.observationService.deleteObservation(path, obj.body.id).subscribe(function (res) {
                            if (res.ok) {
                                _this.patientService.activities(_this.patientId, _this.detailed).subscribe(function (res) { return _this.timeLine = res; });
                            }
                            else {
                                _this.notificationService.showError('Error deleting event, please try again');
                            }
                        });
                    }
                });
            }
            else {
                // DO SOMETHING ELSE
            }
        });
    };
    TimelineComponent.prototype.loadActivities = function () {
        var _this = this;
        this.patientService.activities(this.patientId, this.detailed).subscribe(function (res) { return _this.timeLine = res; });
    };
    TimelineComponent.ctorParameters = function () { return [
        { type: PatientService },
        { type: Router },
        { type: ObservationService },
        { type: TdDialogService },
        { type: NotificationService }
    ]; };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], TimelineComponent.prototype, "patientId", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], TimelineComponent.prototype, "patientUuid", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], TimelineComponent.prototype, "detailed", void 0);
    TimelineComponent = tslib_1.__decorate([
        Component({
            selector: 'patient-timeline',
            template: "<a class=\"mb-1 pb-1 underlined\" [routerLink]=\"['/', 'patients', patientUuid, 'timeline']\" *ngIf=\"!detailed\">Click here\n    to view detailed History</a>\n<mat-divider></mat-divider>\n<timeline>\n    <timeline-event *ngFor=\"let period of timeLine\" side=\"right\">\n        <timeline-badge>\n            <mat-icon>insert_invitation</mat-icon>\n        </timeline-badge>\n        <timeline-panel>\n            <timeline-header>\n                <h4>{{period.date}}</h4>\n            </timeline-header>\n            <mat-list>\n                <mat-list-item>\n                    <div matLine>\n                        <ng-container *ngFor=\"let event of period.activities\">\n                            <div matLine>\n                                <button mat-icon-button aria-label=\"Delete event\"\n                                        *ngIf=\"event.deletable\"\n                                        (click)=\"delete(event.path, event.uuid)\">\n                                    <mat-icon>delete</mat-icon>\n                                </button>\n                                <button mat-icon-button aria-label=\"View event\"\n                                        *ngIf=\"event.viewable\"\n                                        (click)=\"view(event.path, event.uuid)\">\n                                    <mat-icon>remove_red_eye</mat-icon>\n                                </button>\n                                <button mat-icon-button aria-label=\"Edit event\"\n                                        *ngIf=\"event.editable\"\n                                        (click)=\"edit(event.path, event.uuid)\">\n                                    <mat-icon>edit</mat-icon>\n                                </button>\n                            </div>\n                            <a mat-line matTooltip=\"{{event.name}}\">{{event.name}}</a>\n                            <mat-divider></mat-divider>\n                        </ng-container>\n                    </div>\n                </mat-list-item>\n            </mat-list>\n        </timeline-panel>\n    </timeline-event>\n</timeline>\n"
        }),
        tslib_1.__metadata("design:paramtypes", [PatientService, Router, ObservationService,
            TdDialogService, NotificationService])
    ], TimelineComponent);
    return TimelineComponent;
}());
export { TimelineComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGFtaXMtcGF0aWVudC0xLjQuMS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL3RpbWVsaW5lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFDdkQsT0FBTyxFQUFDLGNBQWMsRUFBRSxlQUFlLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUM1RSxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDdkMsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBTW5FO0lBU0ksMkJBQW9CLGNBQThCLEVBQVUsTUFBYyxFQUFVLGtCQUFzQyxFQUN0RyxjQUErQixFQUFVLG1CQUF3QztRQURqRixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0RyxtQkFBYyxHQUFkLGNBQWMsQ0FBaUI7UUFBVSx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBSnJHLGFBQVEsR0FBWSxLQUFLLENBQUM7SUFLMUIsQ0FBQztJQUVELG9DQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUE7SUFDekIsQ0FBQztJQUVELGdDQUFJLEdBQUosVUFBSyxJQUFZLEVBQUUsRUFBVTtRQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUE7SUFDOUUsQ0FBQztJQUVELGdDQUFJLEdBQUosVUFBSyxJQUFZLEVBQUUsRUFBVTtRQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUE7SUFDOUUsQ0FBQztJQUVELGtDQUFNLEdBQU4sVUFBTyxJQUFZLEVBQUUsRUFBVTtRQUEvQixpQkF3QkM7UUF2QkcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUM7WUFDNUIsS0FBSyxFQUFFLFNBQVM7WUFDaEIsT0FBTyxFQUFFLDhEQUE4RDtZQUN2RSxZQUFZLEVBQUUsSUFBSTtZQUNsQixZQUFZLEVBQUUsS0FBSztZQUNuQixLQUFLLEVBQUUsT0FBTztTQUNqQixDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLFVBQUMsTUFBZTtZQUN2QyxJQUFJLE1BQU0sRUFBRTtnQkFDUixLQUFJLENBQUMsa0JBQWtCLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHO29CQUMxRCxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUU7d0JBQ1YsS0FBSSxDQUFDLGtCQUFrQixDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFDLEdBQUc7NEJBQ3ZFLElBQUksR0FBRyxDQUFDLEVBQUUsRUFBRTtnQ0FDUixLQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxLQUFJLENBQUMsU0FBUyxFQUFFLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQyxHQUFHLElBQUssT0FBQSxLQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsRUFBbkIsQ0FBbUIsQ0FBQyxDQUFBOzZCQUN4RztpQ0FBTTtnQ0FDSCxLQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLHdDQUF3QyxDQUFDLENBQUE7NkJBQy9FO3dCQUNMLENBQUMsQ0FBQyxDQUFBO3FCQUNMO2dCQUNMLENBQUMsQ0FBQyxDQUFBO2FBQ0w7aUJBQU07Z0JBQ0gsb0JBQW9CO2FBQ3ZCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsMENBQWMsR0FBZDtRQUFBLGlCQUVDO1FBREcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUMsR0FBRyxJQUFLLE9BQUEsS0FBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLEVBQW5CLENBQW1CLENBQUMsQ0FBQTtJQUN6RyxDQUFDOztnQkE1Q21DLGNBQWM7Z0JBQWtCLE1BQU07Z0JBQThCLGtCQUFrQjtnQkFDdEYsZUFBZTtnQkFBK0IsbUJBQW1COztJQVJyRztRQURDLEtBQUssRUFBRTs7d0RBQ1U7SUFFbEI7UUFEQyxLQUFLLEVBQUU7OzBEQUNZO0lBRXBCO1FBREMsS0FBSyxFQUFFOzt1REFDa0I7SUFOakIsaUJBQWlCO1FBSjdCLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsOGxFQUF3QztTQUMzQyxDQUFDO2lEQVVzQyxjQUFjLEVBQWtCLE1BQU0sRUFBOEIsa0JBQWtCO1lBQ3RGLGVBQWUsRUFBK0IsbUJBQW1CO09BVjVGLGlCQUFpQixDQXNEN0I7SUFBRCx3QkFBQztDQUFBLEFBdERELElBc0RDO1NBdERZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7UGF0aWVudFNlcnZpY2UsIFBhdGllbnRUaW1lbGluZX0gZnJvbSAnLi4vc2VydmljZXMvcGF0aWVudC5zZXJ2aWNlJztcbmltcG9ydCB7Um91dGVyfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtUZERpYWxvZ1NlcnZpY2V9IGZyb20gJ0Bjb3ZhbGVudC9jb3JlJztcbmltcG9ydCB7Tm90aWZpY2F0aW9uU2VydmljZX0gZnJvbSAnQGFsZnJlc2NvL2FkZi1jb3JlJztcbmltcG9ydCB7T2JzZXJ2YXRpb25TZXJ2aWNlfSBmcm9tICcuLi9zZXJ2aWNlcy9vYnNlcnZhdGlvbi5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwYXRpZW50LXRpbWVsaW5lJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vdGltZWxpbmUuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIFRpbWVsaW5lQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoKVxuICAgIHBhdGllbnRJZDogbnVtYmVyO1xuICAgIEBJbnB1dCgpXG4gICAgcGF0aWVudFV1aWQ6IHN0cmluZztcbiAgICBASW5wdXQoKVxuICAgIGRldGFpbGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgdGltZUxpbmU6IFBhdGllbnRUaW1lbGluZVtdO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwYXRpZW50U2VydmljZTogUGF0aWVudFNlcnZpY2UsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgb2JzZXJ2YXRpb25TZXJ2aWNlOiBPYnNlcnZhdGlvblNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBfZGlhbG9nU2VydmljZTogVGREaWFsb2dTZXJ2aWNlLCBwcml2YXRlIG5vdGlmaWNhdGlvblNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sb2FkQWN0aXZpdGllcygpXG4gICAgfVxuXG4gICAgdmlldyhwYXRoOiBzdHJpbmcsIGlkOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvJywgcGF0aCwgaWQsICdwYXRpZW50JywgdGhpcy5wYXRpZW50VXVpZCwgJ3ZpZXcnXSlcbiAgICB9XG5cbiAgICBlZGl0KHBhdGg6IHN0cmluZywgaWQ6IHN0cmluZykge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy8nLCBwYXRoLCBpZCwgJ3BhdGllbnQnLCB0aGlzLnBhdGllbnRVdWlkLCAnZWRpdCddKVxuICAgIH1cblxuICAgIGRlbGV0ZShwYXRoOiBzdHJpbmcsIGlkOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fZGlhbG9nU2VydmljZS5vcGVuQ29uZmlybSh7XG4gICAgICAgICAgICB0aXRsZTogJ0NvbmZpcm0nLFxuICAgICAgICAgICAgbWVzc2FnZTogJ0RvIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGV2ZW50LCBhY3Rpb24gY2Fubm90IGJlIHJldmVyc2VkPycsXG4gICAgICAgICAgICBjYW5jZWxCdXR0b246ICdObycsXG4gICAgICAgICAgICBhY2NlcHRCdXR0b246ICdZZXMnLFxuICAgICAgICAgICAgd2lkdGg6ICc1MDBweCcsXG4gICAgICAgIH0pLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKChhY2NlcHQ6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgIGlmIChhY2NlcHQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9ic2VydmF0aW9uU2VydmljZS5nZXRPYnNlcnZhdGlvbihwYXRoLCBpZCkuc3Vic2NyaWJlKG9iaiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmouYm9keSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vYnNlcnZhdGlvblNlcnZpY2UuZGVsZXRlT2JzZXJ2YXRpb24ocGF0aCwgb2JqLmJvZHkuaWQpLnN1YnNjcmliZSgocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhdGllbnRTZXJ2aWNlLmFjdGl2aXRpZXModGhpcy5wYXRpZW50SWQsIHRoaXMuZGV0YWlsZWQpLnN1YnNjcmliZSgocmVzKSA9PiB0aGlzLnRpbWVMaW5lID0gcmVzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zaG93RXJyb3IoJ0Vycm9yIGRlbGV0aW5nIGV2ZW50LCBwbGVhc2UgdHJ5IGFnYWluJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gRE8gU09NRVRISU5HIEVMU0VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbG9hZEFjdGl2aXRpZXMoKSB7XG4gICAgICAgIHRoaXMucGF0aWVudFNlcnZpY2UuYWN0aXZpdGllcyh0aGlzLnBhdGllbnRJZCwgdGhpcy5kZXRhaWxlZCkuc3Vic2NyaWJlKChyZXMpID0+IHRoaXMudGltZUxpbmUgPSByZXMpXG4gICAgfVxufVxuIl19