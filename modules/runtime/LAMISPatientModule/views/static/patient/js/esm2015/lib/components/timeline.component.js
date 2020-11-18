import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { PatientService, PatientTimeline } from '../services/patient.service';
import { Router } from '@angular/router';
import { TdDialogService } from '@covalent/core';
import { NotificationService } from '@alfresco/adf-core';
import { ObservationService } from '../services/observation.service';
let TimelineComponent = class TimelineComponent {
    constructor(patientService, router, observationService, _dialogService, notificationService) {
        this.patientService = patientService;
        this.router = router;
        this.observationService = observationService;
        this._dialogService = _dialogService;
        this.notificationService = notificationService;
        this.detailed = false;
    }
    ngOnInit() {
        this.loadActivities();
    }
    view(path, id) {
        this.router.navigate(['/', path, id, 'patient', this.patientUuid, 'view']);
    }
    edit(path, id) {
        this.router.navigate(['/', path, id, 'patient', this.patientUuid, 'edit']);
    }
    delete(path, id) {
        this._dialogService.openConfirm({
            title: 'Confirm',
            message: 'Do you want to delete this event, action cannot be reversed?',
            cancelButton: 'No',
            acceptButton: 'Yes',
            width: '500px',
        }).afterClosed().subscribe((accept) => {
            if (accept) {
                this.observationService.getObservation(path, id).subscribe(obj => {
                    if (obj.body) {
                        this.observationService.deleteObservation(path, obj.body.id).subscribe((res) => {
                            if (res.ok) {
                                this.patientService.activities(this.patientId, this.detailed).subscribe((res) => this.timeLine = res);
                            }
                            else {
                                this.notificationService.showError('Error deleting event, please try again');
                            }
                        });
                    }
                });
            }
            else {
                // DO SOMETHING ELSE
            }
        });
    }
    loadActivities() {
        this.patientService.activities(this.patientId, this.detailed).subscribe((res) => this.timeLine = res);
    }
};
TimelineComponent.ctorParameters = () => [
    { type: PatientService },
    { type: Router },
    { type: ObservationService },
    { type: TdDialogService },
    { type: NotificationService }
];
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
export { TimelineComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGFtaXMtcGF0aWVudC0xLjQuMS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL3RpbWVsaW5lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFDdkQsT0FBTyxFQUFDLGNBQWMsRUFBRSxlQUFlLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUM1RSxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDdkMsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBTW5FLElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWlCO0lBUzFCLFlBQW9CLGNBQThCLEVBQVUsTUFBYyxFQUFVLGtCQUFzQyxFQUN0RyxjQUErQixFQUFVLG1CQUF3QztRQURqRixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0RyxtQkFBYyxHQUFkLGNBQWMsQ0FBaUI7UUFBVSx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBSnJHLGFBQVEsR0FBWSxLQUFLLENBQUM7SUFLMUIsQ0FBQztJQUVELFFBQVE7UUFDSixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUE7SUFDekIsQ0FBQztJQUVELElBQUksQ0FBQyxJQUFZLEVBQUUsRUFBVTtRQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUE7SUFDOUUsQ0FBQztJQUVELElBQUksQ0FBQyxJQUFZLEVBQUUsRUFBVTtRQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUE7SUFDOUUsQ0FBQztJQUVELE1BQU0sQ0FBQyxJQUFZLEVBQUUsRUFBVTtRQUMzQixJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQztZQUM1QixLQUFLLEVBQUUsU0FBUztZQUNoQixPQUFPLEVBQUUsOERBQThEO1lBQ3ZFLFlBQVksRUFBRSxJQUFJO1lBQ2xCLFlBQVksRUFBRSxLQUFLO1lBQ25CLEtBQUssRUFBRSxPQUFPO1NBQ2pCLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFlLEVBQUUsRUFBRTtZQUMzQyxJQUFJLE1BQU0sRUFBRTtnQkFDUixJQUFJLENBQUMsa0JBQWtCLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQzdELElBQUksR0FBRyxDQUFDLElBQUksRUFBRTt3QkFDVixJQUFJLENBQUMsa0JBQWtCLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7NEJBQzNFLElBQUksR0FBRyxDQUFDLEVBQUUsRUFBRTtnQ0FDUixJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLENBQUE7NkJBQ3hHO2lDQUFNO2dDQUNILElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsd0NBQXdDLENBQUMsQ0FBQTs2QkFDL0U7d0JBQ0wsQ0FBQyxDQUFDLENBQUE7cUJBQ0w7Z0JBQ0wsQ0FBQyxDQUFDLENBQUE7YUFDTDtpQkFBTTtnQkFDSCxvQkFBb0I7YUFDdkI7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxjQUFjO1FBQ1YsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxDQUFBO0lBQ3pHLENBQUM7Q0FDSixDQUFBOztZQTdDdUMsY0FBYztZQUFrQixNQUFNO1lBQThCLGtCQUFrQjtZQUN0RixlQUFlO1lBQStCLG1CQUFtQjs7QUFSckc7SUFEQyxLQUFLLEVBQUU7O29EQUNVO0FBRWxCO0lBREMsS0FBSyxFQUFFOztzREFDWTtBQUVwQjtJQURDLEtBQUssRUFBRTs7bURBQ2tCO0FBTmpCLGlCQUFpQjtJQUo3QixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLDhsRUFBd0M7S0FDM0MsQ0FBQzs2Q0FVc0MsY0FBYyxFQUFrQixNQUFNLEVBQThCLGtCQUFrQjtRQUN0RixlQUFlLEVBQStCLG1CQUFtQjtHQVY1RixpQkFBaUIsQ0FzRDdCO1NBdERZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7UGF0aWVudFNlcnZpY2UsIFBhdGllbnRUaW1lbGluZX0gZnJvbSAnLi4vc2VydmljZXMvcGF0aWVudC5zZXJ2aWNlJztcbmltcG9ydCB7Um91dGVyfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtUZERpYWxvZ1NlcnZpY2V9IGZyb20gJ0Bjb3ZhbGVudC9jb3JlJztcbmltcG9ydCB7Tm90aWZpY2F0aW9uU2VydmljZX0gZnJvbSAnQGFsZnJlc2NvL2FkZi1jb3JlJztcbmltcG9ydCB7T2JzZXJ2YXRpb25TZXJ2aWNlfSBmcm9tICcuLi9zZXJ2aWNlcy9vYnNlcnZhdGlvbi5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwYXRpZW50LXRpbWVsaW5lJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vdGltZWxpbmUuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIFRpbWVsaW5lQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoKVxuICAgIHBhdGllbnRJZDogbnVtYmVyO1xuICAgIEBJbnB1dCgpXG4gICAgcGF0aWVudFV1aWQ6IHN0cmluZztcbiAgICBASW5wdXQoKVxuICAgIGRldGFpbGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgdGltZUxpbmU6IFBhdGllbnRUaW1lbGluZVtdO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwYXRpZW50U2VydmljZTogUGF0aWVudFNlcnZpY2UsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgb2JzZXJ2YXRpb25TZXJ2aWNlOiBPYnNlcnZhdGlvblNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBfZGlhbG9nU2VydmljZTogVGREaWFsb2dTZXJ2aWNlLCBwcml2YXRlIG5vdGlmaWNhdGlvblNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sb2FkQWN0aXZpdGllcygpXG4gICAgfVxuXG4gICAgdmlldyhwYXRoOiBzdHJpbmcsIGlkOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvJywgcGF0aCwgaWQsICdwYXRpZW50JywgdGhpcy5wYXRpZW50VXVpZCwgJ3ZpZXcnXSlcbiAgICB9XG5cbiAgICBlZGl0KHBhdGg6IHN0cmluZywgaWQ6IHN0cmluZykge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy8nLCBwYXRoLCBpZCwgJ3BhdGllbnQnLCB0aGlzLnBhdGllbnRVdWlkLCAnZWRpdCddKVxuICAgIH1cblxuICAgIGRlbGV0ZShwYXRoOiBzdHJpbmcsIGlkOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fZGlhbG9nU2VydmljZS5vcGVuQ29uZmlybSh7XG4gICAgICAgICAgICB0aXRsZTogJ0NvbmZpcm0nLFxuICAgICAgICAgICAgbWVzc2FnZTogJ0RvIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGV2ZW50LCBhY3Rpb24gY2Fubm90IGJlIHJldmVyc2VkPycsXG4gICAgICAgICAgICBjYW5jZWxCdXR0b246ICdObycsXG4gICAgICAgICAgICBhY2NlcHRCdXR0b246ICdZZXMnLFxuICAgICAgICAgICAgd2lkdGg6ICc1MDBweCcsXG4gICAgICAgIH0pLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKChhY2NlcHQ6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgIGlmIChhY2NlcHQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9ic2VydmF0aW9uU2VydmljZS5nZXRPYnNlcnZhdGlvbihwYXRoLCBpZCkuc3Vic2NyaWJlKG9iaiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmouYm9keSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vYnNlcnZhdGlvblNlcnZpY2UuZGVsZXRlT2JzZXJ2YXRpb24ocGF0aCwgb2JqLmJvZHkuaWQpLnN1YnNjcmliZSgocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhdGllbnRTZXJ2aWNlLmFjdGl2aXRpZXModGhpcy5wYXRpZW50SWQsIHRoaXMuZGV0YWlsZWQpLnN1YnNjcmliZSgocmVzKSA9PiB0aGlzLnRpbWVMaW5lID0gcmVzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zaG93RXJyb3IoJ0Vycm9yIGRlbGV0aW5nIGV2ZW50LCBwbGVhc2UgdHJ5IGFnYWluJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gRE8gU09NRVRISU5HIEVMU0VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbG9hZEFjdGl2aXRpZXMoKSB7XG4gICAgICAgIHRoaXMucGF0aWVudFNlcnZpY2UuYWN0aXZpdGllcyh0aGlzLnBhdGllbnRJZCwgdGhpcy5kZXRhaWxlZCkuc3Vic2NyaWJlKChyZXMpID0+IHRoaXMudGltZUxpbmUgPSByZXMpXG4gICAgfVxufVxuIl19