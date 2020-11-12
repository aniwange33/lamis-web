import * as tslib_1 from "tslib";
import {Component} from '@angular/core';
import {NotificationService} from '@alfresco/adf-core';
import {ActivatedRoute} from '@angular/router';
import {AppLoaderService} from '@lamis/web-core';
import {CaseManagementService} from '../../services/case-management.service';
import {CaseManagerService} from '../../services/case-manager.service';

let CaseManagerEditComponent = class CaseManagerEditComponent {
    constructor(caseManagementService, caseManagerService, notification, activatedRoute, appLoaderService) {
        this.caseManagementService = caseManagementService;
        this.caseManagerService = caseManagerService;
        this.notification = notification;
        this.activatedRoute = activatedRoute;
        this.appLoaderService = appLoaderService;
    }

    createEntity() {
        return {};
    }

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({entity}) => {
            this.entity = !!entity && entity.body ? entity.body : entity;
            if (this.entity === undefined) {
                this.entity = this.createEntity();
            }
            this.caseManagementService.getActiveFacility().subscribe((res) => {
                this.entity.facility = res;
            });
        });
    }

    save() {
        this.isSaving = true;
        this.appLoaderService.open('Saving Case Manager..');
        if (this.entity.id !== undefined) {
            this.subscribeToSaveResponse(this.caseManagerService.update(this.entity));
        } else {
            this.subscribeToSaveResponse(this.caseManagerService.create(this.entity));
        }
    }

    previousState() {
        window.history.back();
    }

    subscribeToSaveResponse(result) {
        result.subscribe((res) => this.onSaveSuccess(res.body), (res) => {
            this.onSaveError();
            this.onError(res.message);
        });
    }

    onSaveSuccess(result) {
        this.appLoaderService.close();
        this.isSaving = false;
        this.notification.openSnackMessage('Case Manager successfully saved');
        this.previousState();
    }

    onSaveError() {
        this.isSaving = false;
        this.appLoaderService.close();
        //this.submitButton.disabled = true;
        this.notification.showError('Error occurred saving Case Manager; try again');
        //this.progressBar.mode = 'determinate';
    }

    onError(errorMessage) {
        this.appLoaderService.close();
        this.notification.showError(errorMessage);
    }
};
CaseManagerEditComponent.ctorParameters = () => [
    {type: CaseManagementService},
    {type: CaseManagerService},
    {type: NotificationService},
    {type: ActivatedRoute},
    {type: AppLoaderService}
];
CaseManagerEditComponent = tslib_1.__decorate([
    Component({
        selector: 'case-manager-edit',
        template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <form name=\"form\" role=\"form\" novalidate (ngSubmit)=\"save()\" #caseManagerForm=\"ngForm\">\n            <mat-card class=\"default\">\n                <mat-card-content>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Name</mat-label>\n                                <input matInput name=\"name\" #name=\"ngModel\"\n                                       required\n                                       [(ngModel)]=\"entity.name\"/>\n                                <mat-error\n                                        *ngIf=\"name.errors && (name.dirty || name.touched) && (name.errors.required)\">\n                                    Case Manager name is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Address</mat-label>\n                                <textarea matInput name=\"address\" [(ngModel)]=\"entity.address\" #address=\"ngModel\"\n                                          rows=\"2\" required>\n                                </textarea>\n                                <mat-error\n                                        *ngIf=\"address.errors && (address.dirty || address.touched) && (address.errors.required)\">\n                                    Case Manager address is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Sex</mat-label>\n                                <mat-select name=\"sex\" [(ngModel)]=\"entity.gender\" #sex=\"ngModel\" required>\n                                    <mat-option></mat-option>\n                                    <mat-option [value]=\"'FEMALE'\">Female</mat-option>\n                                    <mat-option [value]=\"'MALE'\">Male</mat-option>\n                                </mat-select>\n                                <mat-error\n                                        *ngIf=\"sex.errors && (sex.dirty || sex.touched) && (sex.errors.required)\">\n                                    Case Manager sex is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Telephone</mat-label>\n                                <input matInput name=\"phone\" phoneNumber [(ngModel)]=\"entity.phoneNumber\" required\n                                       #phone=\"ngModel\"/>\n                                <mat-error\n                                        *ngIf=\"phone.errors && (phone.dirty || phone.touched) && (phone.errors.required)\">\n                                    Case Manager Telephone number is required\n                                </mat-error>\n                                <mat-error\n                                        *ngIf=\"phone.errors && (phone.dirty || phone.touched) && (phone.errors.invalidPhone)\">\n                                    Invalid phone number\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                </mat-card-content>\n                <mat-card-actions class=\"lamis-edit-form-actions\">\n                    <button mat-raised-button type=\"button\" (click)=\"previousState()\">Back</button>\n                    <button mat-raised-button color='primary'\n                            [disabled]=\"caseManagerForm.invalid || isSaving\"\n                            type=\"submit\">\n                        {{entity.id !== undefined ? 'Update' : 'Save'}}\n                    </button>\n                </mat-card-actions>\n            </mat-card>\n        </form>\n    </div>\n</div>\n"
    }),
    tslib_1.__metadata("design:paramtypes", [CaseManagementService,
        CaseManagerService,
        NotificationService,
        ActivatedRoute,
        AppLoaderService])
], CaseManagerEditComponent);
export {CaseManagerEditComponent};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1tYW5hZ2VyLmVkaXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGFtaXMtY2xpbmljLTEuMS4zLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvY2FzZS1tYW5hZ2VtZW50L2Nhc2UtbWFuYWdlci5lZGl0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUVsRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDakQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDbkQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDL0UsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFRekUsSUFBYSx3QkFBd0IsR0FBckMsTUFBYSx3QkFBd0I7SUFJakMsWUFBb0IscUJBQTRDLEVBQzVDLGtCQUFzQyxFQUNwQyxZQUFpQyxFQUNqQyxjQUE4QixFQUNoQyxnQkFBa0M7UUFKbEMsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtRQUM1Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3BDLGlCQUFZLEdBQVosWUFBWSxDQUFxQjtRQUNqQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDaEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtJQUN0RCxDQUFDO0lBRUQsWUFBWTtRQUNSLE9BQW9CLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUUsRUFBRTtZQUM1QyxJQUFJLENB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Y2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FzZU1hbmFnZXIgfSBmcm9tICcuLi8uLi9tb2RlbC9jYXNlLW1hbmFnZW1lbnQubW9kZWwnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gJ0BhbGZyZXNjby9hZGYtY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBBcHBMb2FkZXJTZXJ2aWNlIH0gZnJvbSAnQGxhbWlzL3dlYi1jb3JlJztcbmltcG9ydCB7IENhc2VNYW5hZ2VtZW50U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2Nhc2UtbWFuYWdlbWVudC5zZXJ2aWNlJztcbmltcG9ydCB7IENhc2VNYW5hZ2VyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2Nhc2UtbWFuYWdlci5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEh0dHBFcnJvclJlc3BvbnNlLCBIdHRwUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnY2FzZS1tYW5hZ2VyLWVkaXQnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9jYXNlLW1hbmFnZXIuZWRpdC5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgQ2FzZU1hbmFnZXJFZGl0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBlbnRpdHk6IENhc2VNYW5hZ2VyO1xuICAgIGlzU2F2aW5nOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXNlTWFuYWdlbWVudFNlcnZpY2U6IENhc2VNYW5hZ2VtZW50U2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGNhc2VNYW5hZ2VyU2VydmljZTogQ2FzZU1hbmFnZXJTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByb3RlY3RlZCBub3RpZmljYXRpb246IE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJvdGVjdGVkIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGFwcExvYWRlclNlcnZpY2U6IEFwcExvYWRlclNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBjcmVhdGVFbnRpdHkoKTogQ2FzZU1hbmFnZXIge1xuICAgICAgICByZXR1cm4gPENhc2VNYW5hZ2VyPnt9O1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmlzU2F2aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYWN0aXZhdGVkUm91dGUuZGF0YS5zdWJzY3JpYmUoKHtlbnRpdHl9KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVudGl0eSA9ICEhZW50aXR5ICYmIGVudGl0eS5ib2R5ID8gZW50aXR5LmJvZHkgOiBlbnRpdHk7XG4gICAgICAgICAgICBpZiAodGhpcy5lbnRpdHkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZW50aXR5ID0gdGhpcy5jcmVhdGVFbnRpdHkoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jYXNlTWFuYWdlbWVudFNlcnZpY2UuZ2V0QWN0aXZlRmFjaWxpdHkoKS5zdWJzY3JpYmUoKHJlczogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbnRpdHkuZmFjaWxpdHkgPSByZXM7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2F2ZSgpIHtcbiAgICAgICAgdGhpcy5pc1NhdmluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuYXBwTG9hZGVyU2VydmljZS5vcGVuKCdTYXZpbmcgQ2FzZSBNYW5hZ2VyLi4nKTtcbiAgICAgICAgaWYgKHRoaXMuZW50aXR5LmlkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlVG9TYXZlUmVzcG9uc2UodGhpcy5jYXNlTWFuYWdlclNlcnZpY2UudXBkYXRlKHRoaXMuZW50aXR5KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmliZVRvU2F2ZVJlc3BvbnNlKHRoaXMuY2FzZU1hbmFnZXJTZXJ2aWNlLmNyZWF0ZSh0aGlzLmVudGl0eSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJldmlvdXNTdGF0ZSgpIHtcbiAgICAgICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3Vic2NyaWJlVG9TYXZlUmVzcG9uc2UocmVzdWx0OiBPYnNlcnZhYmxlPEh0dHBSZXNwb25zZTxhbnk+Pikge1xuICAgICAgICByZXN1bHQuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKHJlczogSHR0cFJlc3BvbnNlPGFueT4pID0+IHRoaXMub25TYXZlU3VjY2VzcyhyZXMuYm9keSksXG4gICAgICAgICAgICAocmVzOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25TYXZlRXJyb3IoKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uRXJyb3IocmVzLm1lc3NhZ2UpXG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uU2F2ZVN1Y2Nlc3MocmVzdWx0OiBhbnkpIHtcbiAgICAgICAgdGhpcy5hcHBMb2FkZXJTZXJ2aWNlLmNsb3NlKCk7XG4gICAgICAgIHRoaXMuaXNTYXZpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ub3RpZmljYXRpb24ub3BlblNuYWNrTWVzc2FnZSgnQ2FzZSBNYW5hZ2VyIHN1Y2Nlc3NmdWxseSBzYXZlZCcpO1xuICAgICAgICB0aGlzLnByZXZpb3VzU3RhdGUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uU2F2ZUVycm9yKCkge1xuICAgICAgICB0aGlzLmlzU2F2aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYXBwTG9hZGVyU2VydmljZS5jbG9zZSgpO1xuICAgICAgICAvL3RoaXMuc3VibWl0QnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5ub3RpZmljYXRpb24uc2hvd0Vycm9yKCdFcnJvciBvY2N1cnJlZCBzYXZpbmcgQ2FzZSBNYW5hZ2VyOyB0cnkgYWdhaW4nKTtcbiAgICAgICAgLy90aGlzLnByb2dyZXNzQmFyLm1vZGUgPSAnZGV0ZXJtaW5hdGUnO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkVycm9yKGVycm9yTWVzc2FnZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuYXBwTG9hZGVyU2VydmljZS5jbG9zZSgpO1xuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbi5zaG93RXJyb3IoZXJyb3JNZXNzYWdlKTtcbiAgICB9XG59XG4iXX0=
