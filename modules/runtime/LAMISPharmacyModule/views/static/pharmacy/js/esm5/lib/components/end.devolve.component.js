import * as tslib_1 from "tslib";
import {Component} from '@angular/core';
import {PharmacyService} from '../services/pharmacy.service';
import {DevolveService} from '../services/devolve.service';
import {NotificationService} from '@alfresco/adf-core';
import {AppLoaderService} from '@lamis/web-core';
import {ActivatedRoute} from '@angular/router';
import * as moment_ from 'moment';

var moment = moment_;
var EndDevolveComponent = /** @class */ (function () {
    function EndDevolveComponent(pharmacyService, devolveService, notification, appLoaderService, activatedRoute) {
        this.pharmacyService = pharmacyService;
        this.devolveService = devolveService;
        this.notification = notification;
        this.appLoaderService = appLoaderService;
        this.activatedRoute = activatedRoute;
        this.entity = {};
        this.dmocType = '';
        this.isSaving = false;
        this.today = moment();
    }

    EndDevolveComponent.prototype.ngOnInit = function () {
        var _this = this;
        var patientId = this.activatedRoute.snapshot.paramMap.get('patientId');
        this.pharmacyService.getPatient(patientId).subscribe(function (res) {
            _this.pharmacyService.getDevolvement(res.id, moment()).subscribe(function (r) {
                _this.entity = r;
                if (_this.entity.dateDiscontinued) {
                    _this.minDate = r.dateDiscontinued.clone().add(2, 'day');
                } else {
                    _this.minDiscontinued = r.dateDevolved.clone().add(1, 'day');
                    _this.minDate = r.dateDevolved.clone().add(2, 'day');
                }
                var type = 'MMD';
                switch (r.dmocType) {
                    case 'ARC':
                        type = 'Adolescent Refill Club';
                        break;
                    case 'CPARP':
                        type = 'CPARP';
                        break;
                    case 'CARC':
                        type = 'CARC';
                        break;
                    case 'F_CARG':
                        type = 'F-CARG';
                        break;
                    case 'FAST_TRACK':
                        type = 'Fast Track';
                        break;
                    case 'S_CARG':
                        type = 'S-CARG';
                        break;
                    case 'MMS':
                        type = 'MMS';
                        break;
                }
                _this.dmocType = type;
            });
        });
        this.activatedRoute.data.subscribe(function (_a) {
            var entity = _a.entity;
            _this.entity = !!entity && entity.body ? entity.body : entity;
        });
    };
    EndDevolveComponent.prototype.dateDiscontinuedChanged = function () {
        if (this.entity.dateDiscontinued) {
            this.minDate = this.entity.dateDiscontinued.clone().add(1, 'day');
        }
    };
    EndDevolveComponent.prototype.previousState = function () {
        window.history.back();
    };
    EndDevolveComponent.prototype.save = function () {
        this.appLoaderService.open('Saving visit...');
        this.isSaving = true;
        if (this.entity.id !== undefined) {
            this.subscribeToSaveResponse(this.devolveService.update(this.entity));
        } else {
            this.subscribeToSaveResponse(this.devolveService.create(this.entity));
        }
    };
    EndDevolveComponent.prototype.subscribeToSaveResponse = function (result) {
        var _this = this;
        result.subscribe(function (res) {
            return _this.onSaveSuccess(res.body);
        }, function (res) {
            _this.appLoaderService.close();
            _this.onSaveError();
            _this.onError(res.message);
        });
    };
    EndDevolveComponent.prototype.onSaveSuccess = function (result) {
        this.appLoaderService.close();
        this.isSaving = false;
        this.notification.showInfo('Devolve successfully saved');
        this.previousState();
    };
    EndDevolveComponent.prototype.onSaveError = function () {
        this.isSaving = false;
        this.notification.showError('Error saving devolve');
    };
    EndDevolveComponent.prototype.onError = function (errorMessage) {
        this.isSaving = false;
        this.notification.showError(errorMessage);
    };
    EndDevolveComponent.ctorParameters = function () {
        return [
            {type: PharmacyService},
            {type: DevolveService},
            {type: NotificationService},
            {type: AppLoaderService},
            {type: ActivatedRoute}
        ];
    };
    EndDevolveComponent = tslib_1.__decorate([
        Component({
            selector: 'end-devolve',
            template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <form name=\"form\" role=\"form\" novalidate (ngSubmit)=\"save()\" #devolveForm=\"ngForm\">\n            <mat-card class=\"default\">\n                <mat-card-header>\n                </mat-card-header>\n                <mat-card-content *ngIf=\"entity\">\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Date of Devolvement</mat-label>\n                                <input matInput disabled value=\"{{entity.dateDevolved | date: 'dd MMM, yyyy'}}\">\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>DMOC Type</mat-label>\n                                <input matInput disabled [value]=\"dmocType\">\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Date Discontinued</mat-label>\n                                <input matInput [matDatepicker]=\"picker1\"\n                                       [(ngModel)]=\"entity.dateDiscontinued\"\n                                       #disc=\"ngModel\"\n                                       (dateChange)=\"dateDiscontinuedChanged()\"\n                                       [min]=\"minDiscontinued\"\n                                       [max]=\"today\"\n                                       name=\"disc\"\n                                       required>\n                                <mat-datepicker-toggle\n                                        matSuffix\n                                        [for]=\"picker1\">\n                                </mat-datepicker-toggle>\n                                <mat-datepicker #picker1></mat-datepicker>\n                                <mat-error\n                                        *ngIf=\"disc.errors && (disc.dirty || disc.touched) && (disc.errors.required)\">\n                                    Date Discontinued is required\n                                </mat-error>\n                                <mat-error\n                                        *ngIf=\"disc.errors && (disc.dirty || disc.touched) && (disc.errors.min)\">\n                                    Date Discontinued cannot be before {{minDiscontinued | date: 'dd MMM, yyyy'}}\n                                </mat-error>\n                                <mat-error\n                                        *ngIf=\"disc.errors && (disc.dirty || disc.touched) && (disc.errors.max)\">\n                                    Date Discontinued cannot be after {{today | date: 'dd MMM, yyyy'}}\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Reason Discontinued</mat-label>\n                                <mat-select name=\"reason\" #reason=\"ngModel\" [(ngModel)]=\"entity.reasonDiscontinued\" required>\n                                    <mat-option></mat-option>\n                                    <mat-option [value]=\"'Becomes pregnant'\">Becomes pregnant</mat-option>\n                                    <mat-option [value]=\"'Unable to pay service charge'\">Unable to pay service charge</mat-option>\n                                    <mat-option [value]=\"'Develops comorbidity'\">Develops comorbidity</mat-option>\n                                    <mat-option [value]=\"'Loss of viral suppression'\">Loss of viral suppression</mat-option>\n                                    <mat-option [value]=\"'Decides to go back to hospital'\">Decides to go back to hospital</mat-option>\n                                    <mat-option [value]=\"'Becomes non-adherent'\">Becomes non-adherent</mat-option>\n                                </mat-select>\n                                <mat-error\n                                        *ngIf=\"reason.errors && (reason.dirty || reason.touched) && (reason.errors.required)\">\n                                    Reason for Discontinuation is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\" *ngIf=\"minDate\">\n                                <input matInput [matDatepicker]=\"picker\"\n                                       placeholder=\"Date Returned to Facility\"\n                                       [(ngModel)]=\"entity.dateReturnedToFacility\"\n                                       #visit=\"ngModel\"\n                                       [min]=\"minDate\"\n                                       [max]=\"today\"\n                                       name=\"visit\"\n                                       required>\n                                <mat-datepicker-toggle\n                                        matSuffix\n                                        [for]=\"picker\">\n                                </mat-datepicker-toggle>\n                                <mat-datepicker #picker></mat-datepicker>\n                                <mat-error\n                                        *ngIf=\"visit.errors && (visit.dirty || visit.touched) && (visit.errors.required)\">\n                                    Date returned to Facility is required\n                                </mat-error>\n                                <mat-error\n                                        *ngIf=\"visit.errors && (visit.dirty || visit.touched) && (visit.errors.min)\">\n                                    Date returned to Facility cannot be before {{minDate | date: 'dd MMM, yyyy'}}\n                                </mat-error>\n                                <mat-error\n                                        *ngIf=\"visit.errors && (visit.dirty || visit.touched) && (visit.errors.max)\">\n                                    Date returned to Facility cannot be after {{today | date: 'dd MMM, yyyy'}}\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                </mat-card-content>\n                <mat-card-actions class=\"lamis-edit-form-actions\">\n                    <button mat-raised-button type=\"button\" (click)=\"previousState()\">Back</button>\n                    <button mat-raised-button color='primary'\n                            [disabled]=\"devolveForm.invalid || isSaving || !entity.dateDiscontinued\"\n                            type=\"submit\">\n                        Update\n                    </button>\n                </mat-card-actions>\n            </mat-card>\n        </form>\n    </div>\n</div>\n"
        }),
        tslib_1.__metadata("design:paramtypes", [PharmacyService,
            DevolveService,
            NotificationService,
            AppLoaderService,
            ActivatedRoute])
    ], EndDevolveComponent);
    return EndDevolveComponent;
}());
export {EndDevolveComponent};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5kLmRldm9sdmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGFtaXMtcGhhcm1hY3ktMS4xLjQvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9lbmQuZGV2b2x2ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFLakQsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFFbEMsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDO0FBTXZCO0lBUUksNkJBQW9CLGVBQWdDLEVBQ2hDLGNBQThCLEVBQzVCLFlBQWlDLEVBQ25DLGdCQUFrQyxFQUNoQyxjQUE4QjtRQUpoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzVCLGlCQUFZLEdBQVosWUFBWSxDQUFxQjtRQUNuQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2hDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQVhwRCxXQUFNLEdBQVksRUFBRSxDQUFDO1FBQ3JCLGFBQVEsR0FBVyxFQUFFLENBQUM7UUFDdEIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUdqQixVQUFLLEdBQUcsTUFBTSxFQUFFLENBQUM7SUFPakIsQ0FBQztJQUVELHNDQUFRLEdBQVI7UUFBQSxpQkEyQ0M7UUExQ0csSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxR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QUM5QyxDQUFDOztnQkFqR29DLGVBQWU7Z0JBQ2hCLGNBQWM7Z0JBQ2QsbUJBQW1CO2dCQUNqQixnQkFBZ0I7Z0JBQ2hCLGNBQWM7O0lBWjNDLG1CQUFtQjtRQUovQixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsYUFBYTtZQUN2Qiw4dk9BQTJDO1NBQzlDLENBQUM7aURBU3VDLGVBQWU7WUFDaEIsY0FBYztZQUNkLG1CQUFtQjtZQUNqQixnQkFBZ0I7WUFDaEIsY0FBYztPQVozQyxtQkFBbUIsQ0EwRy9CO0lBQUQsMEJBQUM7Q0FBQSxBQTFHRCxJQTBHQztTQTFHWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGhhcm1hY3lTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvcGhhcm1hY3kuc2VydmljZSc7XG5pbXBvcnQgeyBEZXZvbHZlU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2Rldm9sdmUuc2VydmljZSc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnQGFsZnJlc2NvL2FkZi1jb3JlJztcbmltcG9ydCB7IEFwcExvYWRlclNlcnZpY2UgfSBmcm9tICdAbGFtaXMvd2ViLWNvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgRGV2b2x2ZSB9IGZyb20gJy4uL21vZGVsL3BoYXJtYWN5Lm1vZGVsJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEh0dHBFcnJvclJlc3BvbnNlLCBIdHRwUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBNb21lbnQgfSBmcm9tICdtb21lbnQnO1xuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xuXG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2VuZC1kZXZvbHZlJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZW5kLmRldm9sdmUuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIEVuZERldm9sdmVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIGVudGl0eTogRGV2b2x2ZSA9IHt9O1xuICAgIGRtb2NUeXBlOiBzdHJpbmcgPSAnJztcbiAgICBpc1NhdmluZyA9IGZhbHNlO1xuICAgIG1pbkRhdGU6IE1vbWVudDtcbiAgICBtaW5EaXNjb250aW51ZWQ6IE1vbWVudDtcbiAgICB0b2RheSA9IG1vbWVudCgpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwaGFybWFjeVNlcnZpY2U6IFBoYXJtYWN5U2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGRldm9sdmVTZXJ2aWNlOiBEZXZvbHZlU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcm90ZWN0ZWQgbm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgYXBwTG9hZGVyU2VydmljZTogQXBwTG9hZGVyU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcm90ZWN0ZWQgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHBhdGllbnRJZCA9IHRoaXMuYWN0aXZhdGVkUm91dGUuc25hcHNob3QucGFyYW1NYXAuZ2V0KCdwYXRpZW50SWQnKTtcbiAgICAgICAgdGhpcy5waGFybWFjeVNlcnZpY2UuZ2V0UGF0aWVudChwYXRpZW50SWQpLnN1YnNjcmliZSgocmVzKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBoYXJtYWN5U2VydmljZS5nZXREZXZvbHZlbWVudChyZXMuaWQsIG1vbWVudCgpKS5zdWJzY3JpYmUociA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbnRpdHkgPSByO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmVudGl0eS5kYXRlRGlzY29udGludWVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWluRGF0ZSA9IHIuZGF0ZURpc2NvbnRpbnVlZC5jbG9uZSgpLmFkZCgyLCAnZGF5Jyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5taW5EaXNjb250aW51ZWQgPSByLmRhdGVEZXZvbHZlZC5jbG9uZSgpLmFkZCgxLCAnZGF5Jyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWluRGF0ZSA9IHIuZGF0ZURldm9sdmVkLmNsb25lKCkuYWRkKDIsICdkYXknKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgdHlwZSA9ICdNTUQnO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoci5kbW9jVHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdBUkMnOlxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSA9ICdBZG9sZXNjZW50IFJlZmlsbCBDbHViJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdDUEFSUCc6XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlID0gJ0NQQVJQJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdDQVJDJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgPSAnQ0FSQyc7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnRl9DQVJHJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgPSAnRi1DQVJHJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdGQVNUX1RSQUNLJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgPSAnRmFzdCBUcmFjayc7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnU19DQVJHJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgPSAnUy1DQVJHJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdNTVMnOlxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSA9ICdNTVMnO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuZG1vY1R5cGUgPSB0eXBlO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuYWN0aXZhdGVkUm91dGUuZGF0YS5zdWJzY3JpYmUoKHtlbnRpdHl9KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVudGl0eSA9ICEhZW50aXR5ICYmIGVudGl0eS5ib2R5ID8gZW50aXR5LmJvZHkgOiBlbnRpdHk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgZGF0ZURpc2NvbnRpbnVlZENoYW5nZWQoKSB7XG4gICAgICAgIGlmICh0aGlzLmVudGl0eS5kYXRlRGlzY29udGludWVkKSB7XG4gICAgICAgICAgICB0aGlzLm1pbkRhdGUgPSB0aGlzLmVudGl0eS5kYXRlRGlzY29udGludWVkLmNsb25lKCkuYWRkKDEsICdkYXknKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJldmlvdXNTdGF0ZSgpIHtcbiAgICAgICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xuICAgIH1cblxuICAgIHNhdmUoKSB7XG4gICAgICAgIHRoaXMuYXBwTG9hZGVyU2VydmljZS5vcGVuKCdTYXZpbmcgdmlzaXQuLi4nKTtcbiAgICAgICAgdGhpcy5pc1NhdmluZyA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLmVudGl0eS5pZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmliZVRvU2F2ZVJlc3BvbnNlKHRoaXMuZGV2b2x2ZVNlcnZpY2UudXBkYXRlKHRoaXMuZW50aXR5KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmliZVRvU2F2ZVJlc3BvbnNlKHRoaXMuZGV2b2x2ZVNlcnZpY2UuY3JlYXRlKHRoaXMuZW50aXR5KSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHN1YnNjcmliZVRvU2F2ZVJlc3BvbnNlKHJlc3VsdDogT2JzZXJ2YWJsZTxIdHRwUmVzcG9uc2U8YW55Pj4pIHtcbiAgICAgICAgcmVzdWx0LnN1YnNjcmliZShcbiAgICAgICAgICAgIChyZXM6IEh0dHBSZXNwb25zZTxhbnk+KSA9PiB0aGlzLm9uU2F2ZVN1Y2Nlc3MocmVzLmJvZHkpLFxuICAgICAgICAgICAgKHJlczogSHR0cEVycm9yUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcExvYWRlclNlcnZpY2UuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uU2F2ZUVycm9yKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkVycm9yKHJlcy5tZXNzYWdlKVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblNhdmVTdWNjZXNzKHJlc3VsdDogYW55KSB7XG4gICAgICAgIHRoaXMuYXBwTG9hZGVyU2VydmljZS5jbG9zZSgpO1xuICAgICAgICB0aGlzLmlzU2F2aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9uLnNob3dJbmZvKCdEZXZvbHZlIHN1Y2Nlc3NmdWxseSBzYXZlZCcpO1xuICAgICAgICB0aGlzLnByZXZpb3VzU3RhdGUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uU2F2ZUVycm9yKCkge1xuICAgICAgICB0aGlzLmlzU2F2aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9uLnNob3dFcnJvcignRXJyb3Igc2F2aW5nIGRldm9sdmUnKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25FcnJvcihlcnJvck1lc3NhZ2U6IHN0cmluZykge1xuICAgICAgICB0aGlzLmlzU2F2aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9uLnNob3dFcnJvcihlcnJvck1lc3NhZ2UpO1xuICAgIH1cbn1cbiJdfQ==
