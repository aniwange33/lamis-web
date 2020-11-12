import * as tslib_1 from "tslib";
import {Component} from '@angular/core';
import {NotificationService} from '@alfresco/adf-core';
import {ActivatedRoute} from '@angular/router';
import {AppLoaderService} from '@lamis/web-core';
import {CaseManagementService} from '../../services/case-management.service';
import {CaseManagerService} from '../../services/case-manager.service';

var CaseManagerEditComponent = /** @class */ (function () {
    function CaseManagerEditComponent(caseManagementService, caseManagerService, notification, activatedRoute, appLoaderService) {
        this.caseManagementService = caseManagementService;
        this.caseManagerService = caseManagerService;
        this.notification = notification;
        this.activatedRoute = activatedRoute;
        this.appLoaderService = appLoaderService;
    }

    CaseManagerEditComponent.prototype.createEntity = function () {
        return {};
    };
    CaseManagerEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isSaving = false;
        this.activatedRoute.data.subscribe(function (_a) {
            var entity = _a.entity;
            _this.entity = !!entity && entity.body ? entity.body : entity;
            if (_this.entity === undefined) {
                _this.entity = _this.createEntity();
            }
            _this.caseManagementService.getActiveFacility().subscribe(function (res) {
                _this.entity.facility = res;
            });
        });
    };
    CaseManagerEditComponent.prototype.save = function () {
        this.isSaving = true;
        this.appLoaderService.open('Saving Case Manager..');
        if (this.entity.id !== undefined) {
            this.subscribeToSaveResponse(this.caseManagerService.update(this.entity));
        } else {
            this.subscribeToSaveResponse(this.caseManagerService.create(this.entity));
        }
    };
    CaseManagerEditComponent.prototype.previousState = function () {
        window.history.back();
    };
    CaseManagerEditComponent.prototype.subscribeToSaveResponse = function (result) {
        var _this = this;
        result.subscribe(function (res) {
            return _this.onSaveSuccess(res.body);
        }, function (res) {
            _this.onSaveError();
            _this.onError(res.message);
        });
    };
    CaseManagerEditComponent.prototype.onSaveSuccess = function (result) {
        this.appLoaderService.close();
        this.isSaving = false;
        this.notification.openSnackMessage('Case Manager successfully saved');
        this.previousState();
    };
    CaseManagerEditComponent.prototype.onSaveError = function () {
        this.isSaving = false;
        this.appLoaderService.close();
        //this.submitButton.disabled = true;
        this.notification.showError('Error occurred saving Case Manager; try again');
        //this.progressBar.mode = 'determinate';
    };
    CaseManagerEditComponent.prototype.onError = function (errorMessage) {
        this.appLoaderService.close();
        this.notification.showError(errorMessage);
    };
    CaseManagerEditComponent.ctorParameters = function () {
        return [
            {type: CaseManagementService},
            {type: CaseManagerService},
            {type: NotificationService},
            {type: ActivatedRoute},
            {type: AppLoaderService}
        ];
    };
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
    return CaseManagerEditComponent;
}());
export {CaseManagerEditComponent};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1tYW5hZ2VyLmVkaXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGFtaXMtY2xpbmljLTEuMS4zLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvY2FzZS1tYW5hZ2VtZW50L2Nhc2UtbWFuYWdlci5lZGl0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUVsRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDakQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDbkQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDL0UsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFRekU7SUFJSSxrQ0FBb0IscUJBQTRDLEVBQzVDLGtCQUFzQyxFQUNwQyxZQUFpQyxFQUNqQyxjQUE4QixFQUNoQyxnQkFBa0M7UUFKbEMsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtRQUM1Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3BDLGlCQUFZLEdBQVosWUFBWSxDQUFxQjtRQUNqQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDaEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtJQUN0RCxDQUFDO0lBRUQsK0NBQVksR0FBWjtRQUNJLE9BQW9CLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsMkNBQVEsR0FBUjtRQUFBLGlCQVlDO1FBWEcsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQUMsRUFBUTtnQkFBUCxrQkFBTTtZQUN2QyxLQUFJLENBQUMsTUFBTSxHQUFHLENB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O0lBQUQsK0JBQUM7Q0FBQSxBQXZFRCxJQXVFQztTQXZFWSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FzZU1hbmFnZXIgfSBmcm9tICcuLi8uLi9tb2RlbC9jYXNlLW1hbmFnZW1lbnQubW9kZWwnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gJ0BhbGZyZXNjby9hZGYtY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBBcHBMb2FkZXJTZXJ2aWNlIH0gZnJvbSAnQGxhbWlzL3dlYi1jb3JlJztcbmltcG9ydCB7IENhc2VNYW5hZ2VtZW50U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2Nhc2UtbWFuYWdlbWVudC5zZXJ2aWNlJztcbmltcG9ydCB7IENhc2VNYW5hZ2VyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2Nhc2UtbWFuYWdlci5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEh0dHBFcnJvclJlc3BvbnNlLCBIdHRwUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnY2FzZS1tYW5hZ2VyLWVkaXQnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9jYXNlLW1hbmFnZXIuZWRpdC5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgQ2FzZU1hbmFnZXJFZGl0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBlbnRpdHk6IENhc2VNYW5hZ2VyO1xuICAgIGlzU2F2aW5nOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXNlTWFuYWdlbWVudFNlcnZpY2U6IENhc2VNYW5hZ2VtZW50U2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGNhc2VNYW5hZ2VyU2VydmljZTogQ2FzZU1hbmFnZXJTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByb3RlY3RlZCBub3RpZmljYXRpb246IE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJvdGVjdGVkIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGFwcExvYWRlclNlcnZpY2U6IEFwcExvYWRlclNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBjcmVhdGVFbnRpdHkoKTogQ2FzZU1hbmFnZXIge1xuICAgICAgICByZXR1cm4gPENhc2VNYW5hZ2VyPnt9O1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmlzU2F2aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYWN0aXZhdGVkUm91dGUuZGF0YS5zdWJzY3JpYmUoKHtlbnRpdHl9KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVudGl0eSA9ICEhZW50aXR5ICYmIGVudGl0eS5ib2R5ID8gZW50aXR5LmJvZHkgOiBlbnRpdHk7XG4gICAgICAgICAgICBpZiAodGhpcy5lbnRpdHkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZW50aXR5ID0gdGhpcy5jcmVhdGVFbnRpdHkoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jYXNlTWFuYWdlbWVudFNlcnZpY2UuZ2V0QWN0aXZlRmFjaWxpdHkoKS5zdWJzY3JpYmUoKHJlczogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbnRpdHkuZmFjaWxpdHkgPSByZXM7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2F2ZSgpIHtcbiAgICAgICAgdGhpcy5pc1NhdmluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuYXBwTG9hZGVyU2VydmljZS5vcGVuKCdTYXZpbmcgQ2FzZSBNYW5hZ2VyLi4nKTtcbiAgICAgICAgaWYgKHRoaXMuZW50aXR5LmlkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlVG9TYXZlUmVzcG9uc2UodGhpcy5jYXNlTWFuYWdlclNlcnZpY2UudXBkYXRlKHRoaXMuZW50aXR5KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmliZVRvU2F2ZVJlc3BvbnNlKHRoaXMuY2FzZU1hbmFnZXJTZXJ2aWNlLmNyZWF0ZSh0aGlzLmVudGl0eSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJldmlvdXNTdGF0ZSgpIHtcbiAgICAgICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3Vic2NyaWJlVG9TYXZlUmVzcG9uc2UocmVzdWx0OiBPYnNlcnZhYmxlPEh0dHBSZXNwb25zZTxhbnk+Pikge1xuICAgICAgICByZXN1bHQuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKHJlczogSHR0cFJlc3BvbnNlPGFueT4pID0+IHRoaXMub25TYXZlU3VjY2VzcyhyZXMuYm9keSksXG4gICAgICAgICAgICAocmVzOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25TYXZlRXJyb3IoKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uRXJyb3IocmVzLm1lc3NhZ2UpXG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uU2F2ZVN1Y2Nlc3MocmVzdWx0OiBhbnkpIHtcbiAgICAgICAgdGhpcy5hcHBMb2FkZXJTZXJ2aWNlLmNsb3NlKCk7XG4gICAgICAgIHRoaXMuaXNTYXZpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ub3RpZmljYXRpb24ub3BlblNuYWNrTWVzc2FnZSgnQ2FzZSBNYW5hZ2VyIHN1Y2Nlc3NmdWxseSBzYXZlZCcpO1xuICAgICAgICB0aGlzLnByZXZpb3VzU3RhdGUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uU2F2ZUVycm9yKCkge1xuICAgICAgICB0aGlzLmlzU2F2aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYXBwTG9hZGVyU2VydmljZS5jbG9zZSgpO1xuICAgICAgICAvL3RoaXMuc3VibWl0QnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5ub3RpZmljYXRpb24uc2hvd0Vycm9yKCdFcnJvciBvY2N1cnJlZCBzYXZpbmcgQ2FzZSBNYW5hZ2VyOyB0cnkgYWdhaW4nKTtcbiAgICAgICAgLy90aGlzLnByb2dyZXNzQmFyLm1vZGUgPSAnZGV0ZXJtaW5hdGUnO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkVycm9yKGVycm9yTWVzc2FnZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuYXBwTG9hZGVyU2VydmljZS5jbG9zZSgpO1xuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbi5zaG93RXJyb3IoZXJyb3JNZXNzYWdlKTtcbiAgICB9XG59XG4iXX0=
