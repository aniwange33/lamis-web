import * as tslib_1 from "tslib";
import {Component} from '@angular/core';
import {PatientService} from '../services/patient.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '@alfresco/adf-core';
import {AppLoaderService} from '@lamis/web-core';
import * as moment_ from 'moment';

var moment = moment_;
var ClientStatusComponent = /** @class */ (function () {
    function ClientStatusComponent(patientService, activatedRoute, router, notification, appLoaderService) {
        this.patientService = patientService;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.notification = notification;
        this.appLoaderService = appLoaderService;
        this.statusDates = [];
        this.today = moment();
        this.statuses = ['TRACED_UNABLE_TO_LOCATE', 'TRACED_AGREED_TO_RETURN_TO_CARE', 'DID_NOT_ATTEMPT_TO_TRACE'];
    }

    ClientStatusComponent.prototype.createEntity = function () {
        return {};
    };
    ClientStatusComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isSaving = false;
        this.activatedRoute.data.subscribe(function (_a) {
            var entity = _a.entity;
            _this.entity = !!entity && entity.body ? entity.body : entity;
            if (_this.entity === undefined) {
                _this.entity = _this.createEntity();
            }
            var patientId = _this.activatedRoute.snapshot.paramMap.get('patientId');
            _this.patientService.findByUuid(patientId).subscribe(function (res) {
                _this.entity.patient = res.body;
                _this.patient = res.body;
                _this.entity.facility = res.body.facility;
                _this.patientService.getStatusDatesByPatient(res.body.id).subscribe(function (res) {
                    _this.statusDates = res;
                });
            });
            if (_this.entity.id) {
                _this.patientService.getStatusName(_this.entity.id).subscribe(function (res) {
                    return _this.status = res;
                });
            }
        });
    };
    ClientStatusComponent.prototype.filterDates = function (date) {
        var exists = false;
        this.statusDates.forEach(function (d) {
            if (date.diff(d, 'days') === 0) {
                exists = true;
            }
        });
        return (this.entity.id && date.diff(this.entity.dateStatus, 'days') === 0) || !exists;
    };
    ClientStatusComponent.prototype.previousState = function () {
        window.history.back();
    };
    ClientStatusComponent.prototype.save = function () {
        this.appLoaderService.open('Saving Client status update...');
        this.isSaving = true;
        if (this.statuses.includes(this.entity.status)) {
            this.entity.outcome = this.entity.status;
            this.entity.status = null;
            console.log('Clearing status');
        }
        if (this.entity.id !== undefined) {
            this.subscribeToSaveResponse(this.patientService.updateClientStatus(this.entity));
        } else {
            this.subscribeToSaveResponse(this.patientService.saveClientStatus(this.entity));
        }
    };
    ClientStatusComponent.prototype.subscribeToSaveResponse = function (result) {
        var _this = this;
        result.subscribe(function (res) {
            return _this.onSaveSuccess(res.body);
        }, function (res) {
            _this.appLoaderService.close();
            _this.onSaveError();
            _this.onError(res.message);
        });
    };
    ClientStatusComponent.prototype.onSaveSuccess = function (result) {
        this.appLoaderService.close();
        this.isSaving = false;
        this.notification.openSnackMessage('Client status update successfully saved');
        this.previousState();
    };
    ClientStatusComponent.prototype.onSaveError = function () {
        this.isSaving = false;
        this.notification.openSnackMessage('Error saving status update');
    };
    ClientStatusComponent.prototype.onError = function (errorMessage) {
        this.isSaving = false;
        this.notification.showError(errorMessage);
    };
    ClientStatusComponent.ctorParameters = function () {
        return [
            {type: PatientService},
            {type: ActivatedRoute},
            {type: Router},
            {type: NotificationService},
            {type: AppLoaderService}
        ];
    };
    ClientStatusComponent = tslib_1.__decorate([
        Component({
            selector: 'client-status',
            template: "<script src=\"patient-details.component.ts\"></script>\n<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <form name=\"form\" role=\"form\" novalidate (ngSubmit)=\"save()\" #statusForm=\"ngForm\">\n            <mat-card class=\"default\">\n                <mat-card-content *ngIf=\"patient\">\n                    <div>\n                        <mat-form-field class=\"full-width\" *ngIf=\"entity\">\n                            <input matInput [matDatepicker]=\"picker\"\n                                   placeholder=\"{{entity.id ? 'Date of Status' : 'Date of New Status'}}\"\n                                   [(ngModel)]=\"entity.dateStatus\"\n                                   [matDatepickerFilter]=\"filterDates.bind(this)\"\n                                   #visit=\"ngModel\"\n                                   [max]=\"today\"\n                                   [min]=\"patient.dateRegistration\"\n                                   name=\"visit\"\n                                   required>\n                            <mat-datepicker-toggle\n                                    matSuffix\n                                    [for]=\"picker\">\n                            </mat-datepicker-toggle>\n                            <mat-datepicker #picker></mat-datepicker>\n                            <mat-error\n                                    *ngIf=\"visit.errors && (visit.dirty || visit.touched) && (visit.errors.required)\">\n                                Date of new status is required\n                            </mat-error>\n                            <mat-error\n                                    *ngIf=\"visit.errors && (visit.dirty || visit.touched) && (visit.errors.min)\">\n                                Date of new status cannot be before {{entity.patient.dateRegistration}}\n                            </mat-error>\n                            <mat-error\n                                    *ngIf=\"visit.errors && (visit.dirty || visit.touched) && (visit.errors.max)\">\n                                Date of new status cannot be in the future\n                            </mat-error>\n                        </mat-form-field>\n                    </div>\n                    <div>\n                        <mat-form-field class=\"full-width\">\n                            <mat-select [(ngModel)]=\"entity.status\"\n                                        placeholder=\"{{entity.id ? 'Status' : 'New Status'}}\"\n                                        #outcome=\"ngModel\" required name=\"outcome\">\n                                <mat-option></mat-option>\n                                <mat-option [value]=\"'ART_TRANSFER_OUT'\">ART Transfer Out</mat-option>\n                                <mat-option [value]=\"'PRE_ART_TRANSFER_OUT'\">Pre-ART Transfer Out</mat-option>\n                                <mat-option [value]=\"'STOPPED_TREATMENT'\">Stopped Treatment</mat-option>\n                                <mat-option [value]=\"'KNOWN_DEATH'\">Died (Confirmed)</mat-option>\n                                <mat-option [value]=\"'PREVIOUSLY_UNDOCUMENTED_TRANSFER_CONFIRMED'\">Previously\n                                    Undocumented Patient Transfer (Confirmed)\n                                </mat-option>\n                                <mat-option [value]=\"'TRACED_UNABLE_TO_LOCATE'\">Traced Patient (Unable to locate)\n                                </mat-option>\n                                <mat-option [value]=\"'TRACED_AGREED_TO_RETURN_TO_CARE'\">Traced Patient and agreed to\n                                    return to care\n                                </mat-option>\n                                <mat-option [value]=\"'DID_NOT_ATTEMPT_TO_TRACE'\">Did Not Attempt to Trace Patient\n                                </mat-option>\n                            </mat-select>\n                            <mat-error\n                                    *ngIf=\"outcome.errors && (outcome.dirty || outcome.touched) && (outcome.errors.required)\">\n                                New Status is required\n                            </mat-error>\n                        </mat-form-field>\n                    </div>\n                    <div class=\"row\" *ngIf=\"entity.outcome && entity.outcome.indexOf('TRACE') !== -1\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <input matInput [matDatepicker]=\"picker1\"\n                                       placeholder=\"Date of Tracked\"\n                                       [(ngModel)]=\"entity.dateTracked\"\n                                       #tracked=\"ngModel\"\n                                       [min]=\"entity.patient.dateRegistration\"\n                                       [max]=\"entity.dateStatus\"\n                                       name=\"tracked\"\n                                       required>\n                                <mat-datepicker-toggle\n                                        matSuffix\n                                        [for]=\"picker1\">\n                                </mat-datepicker-toggle>\n                                <mat-datepicker #picker1></mat-datepicker>\n                                <mat-error\n                                        *ngIf=\"tracked.errors && (tracked.dirty || tracked.touched) && (tracked.errors.required)\">\n                                    Date tracked is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\" *ngIf=\"entity.outcome === 'TRACED_AGREED_TO_RETURN_TO_CARE'\">\n                            <mat-form-field class=\"full-width\">\n                                <input matInput [matDatepicker]=\"picker2\"\n                                       placeholder=\"Date Agreed to Return\"\n                                       [(ngModel)]=\"entity.agreedDate\"\n                                       #agreed=\"ngModel\"\n                                       [min]=\"entity.dateStatus\"\n                                       name=\"agreed\"\n                                       required>\n                                <mat-datepicker-toggle\n                                        matSuffix\n                                        [for]=\"picker2\">\n                                </mat-datepicker-toggle>\n                                <mat-datepicker #picker2></mat-datepicker>\n                                <mat-error\n                                        *ngIf=\"agreed.errors && (agreed.dirty || agreed.touched) && (agreed.errors.required)\">\n                                    Date of agreed to return is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div *ngIf=\"entity.outcome === 'KNOWN_DEATH'\">\n                        <mat-form-field class=\"full-width\">\n                            <mat-select [(ngModel)]=\"entity.causeOfDeath\"\n                                        placeholder=\"Cause of Death\"\n                                        #death=\"ngModel\" required name=\"death\">\n                                <mat-option></mat-option>\n                                <mat-option [value]=\"'HIV disease resulting in TB'\">HIV disease resulting in TB</mat-option>\n                                <mat-option [value]=\"'HIV disease resulting in cancer'\">HIV disease resulting in cancer</mat-option>\n                                <mat-option [value]=\"'HIV disease resulting in other infectious and parasitic disease'\">HIV disease resulting in other infectious and parasitic disease</mat-option>\n                                <mat-option [value]=\"'Other HIV disease resulting in other disease or conditions leading to death'\">Other HIV disease resulting in other disease or conditions leading to death</mat-option>\n                                <mat-option [value]=\"'Other natural causes'\">Other natural causes</mat-option>\n                                <mat-option [value]=\"'Non-natural causes'\">Non-natural causes</mat-option>\n                                <mat-option [value]=\"'Unknown cause'\">Unknown cause</mat-option>\n                            </mat-select>\n                            <mat-error\n                                    *ngIf=\"death.errors && (death.dirty || death.touched) && (death.errors.required)\">\n                                Cause of death is required\n                            </mat-error>\n                        </mat-form-field>\n                    </div>\n                    <div *ngIf=\"entity.outcome === 'STOPPED_TREATMENT'\">\n                        <mat-form-field class=\"full-width\">\n                            <mat-select [(ngModel)]=\"entity.reasonForInterruption\"\n                                        placeholder=\"Reason for Interruption\"\n                                        #interrupt=\"ngModel\" required name=\"interrupt\">\n                                <mat-option></mat-option>\n                                <mat-option [value]=\"'Toxicity/side effect'\">Toxicity /side effect</mat-option>\n                                <mat-option [value]=\"'Pregnancy'\">Pregnancy</mat-option>\n                                <mat-option [value]=\"'Treatment failure'\">Treatment failure</mat-option>\n                                <mat-option [value]=\"'Poor adherence'\">Poor adherence</mat-option>\n                                <mat-option [value]=\"'Illness, hospitalization'\">Illness, hospitalization</mat-option>\n                                <mat-option [value]=\"'Drug out of stock'\">Drug out of stock</mat-option>\n                                <mat-option [value]=\"'Patient lacks finances'\">Patient lacks finances</mat-option>\n                                <mat-option [value]=\"'Other patient decision'\">Other patient decision</mat-option>\n                                <mat-option [value]=\"'Planned Rx interruption'\">Planned Rx interruption</mat-option>\n                                <mat-option [value]=\"'Other'\">Other</mat-option>\n                            </mat-select>\n                            <mat-error\n                                    *ngIf=\"interrupt.errors && (interrupt.dirty || interrupt.touched) && (interrupt.errors.required)\">\n                                Reason for interruption is required\n                            </mat-error>\n                        </mat-form-field>\n                    </div>\n                    <mat-divider></mat-divider>\n                </mat-card-content>\n                <mat-card-actions class=\"lamis-edit-form-actions\">\n                    <button mat-raised-button type=\"button\" (click)=\"previousState()\">Back</button>\n                    <button mat-raised-button color='primary'\n                            [disabled]=\"statusForm.invalid\"\n                            type=\"submit\">\n                        {{entity.id !== undefined ? 'Update' : 'Save'}}\n                    </button>\n                </mat-card-actions>\n            </mat-card>\n        </form>\n    </div>\n</div>\n"
        }),
        tslib_1.__metadata("design:paramtypes", [PatientService, ActivatedRoute, Router,
            NotificationService, AppLoaderService])
    ], ClientStatusComponent);
    return ClientStatusComponent;
}());
export {ClientStatusComponent};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LXN0YXR1cy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1wYXRpZW50LTEuMi4wLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvY2xpZW50LXN0YXR1cy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDekQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFbkQsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFLbEMsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDO0FBTXZCO0lBU0ksK0JBQW9CLGNBQThCLEVBQVUsY0FBOEIsRUFBVSxNQUFjLEVBQzlGLFlBQWlDLEVBQVUsZ0JBQWtDO1FBRDdFLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDOUYsaUJBQVksR0FBWixZQUFZLENBQXFCO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUxqRyxnQkFBVyxHQUFhLEVBQUUsQ0FBQztRQUMzQixVQUFLLEdBQUcsTUFBTSxFQUFFLENBQUM7UUFDakIsYUFBUSxHQUFHLENBQUMseUJBQXlCLEVBQUUsaUNBQWlDLEVBQUUsMEJBQTBCLENBQUMsQ0FBQztJQUl0RyxDQUFDO0lBRUQsNENBQVksR0FBWjtRQUNJLE9BQXNCLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsd0NBQVEsR0FBUjtRQUFBLGlCQXFCQztRQXBCRyxJQUFJLENBQUMsUUFBUSxH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LHVDQUFPLEdBQWpCLFVBQWtCLFlBQW9CO1FBQ2xDLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzlDLENBQUM7O2dCQXZGbUMsY0FBYztnQkFBMEIsY0FBYztnQkFBa0IsTUFBTTtnQkFDaEYsbUJBQW1CO2dCQUE0QixnQkFBZ0I7O0lBVnhGLHFCQUFxQjtRQUpqQyxTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZUFBZTtZQUN6QiwrcVdBQTZDO1NBQ2hELENBQUM7aURBVXNDLGNBQWMsRUFBMEIsY0FBYyxFQUFrQixNQUFNO1lBQ2hGLG1CQUFtQixFQUE0QixnQkFBZ0I7T0FWeEYscUJBQXFCLENBaUdqQztJQUFELDRCQUFDO0NBQUEsQUFqR0QsSUFpR0M7U0FqR1kscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBhdGllbnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvcGF0aWVudC5zZXJ2aWNlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gJ0BhbGZyZXNjby9hZGYtY29yZSc7XG5pbXBvcnQgeyBBcHBMb2FkZXJTZXJ2aWNlIH0gZnJvbSAnQGxhbWlzL3dlYi1jb3JlJztcbmltcG9ydCB7IFBhdGllbnQsIFN0YXR1c0hpc3RvcnkgfSBmcm9tICcuLi9tb2RlbC9wYXRpZW50Lm1vZGVsJztcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcbmltcG9ydCB7IE1vbWVudCB9IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgeyBIdHRwRXJyb3JSZXNwb25zZSwgSHR0cFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2NsaWVudC1zdGF0dXMnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9jbGllbnQtc3RhdHVzLmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBDbGllbnRTdGF0dXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIGlzU2F2aW5nOiBib29sZWFuO1xuICAgIGVudGl0eTogU3RhdHVzSGlzdG9yeTtcbiAgICBwYXRpZW50OiBQYXRpZW50O1xuICAgIHN0YXR1czogc3RyaW5nO1xuICAgIHN0YXR1c0RhdGVzOiBNb21lbnRbXSA9IFtdO1xuICAgIHRvZGF5ID0gbW9tZW50KCk7XG4gICAgc3RhdHVzZXMgPSBbJ1RSQUNFRF9VTkFCTEVfVE9fTE9DQVRFJywgJ1RSQUNFRF9BR1JFRURfVE9fUkVUVVJOX1RPX0NBUkUnLCAnRElEX05PVF9BVFRFTVBUX1RPX1RSQUNFJ107XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhdGllbnRTZXJ2aWNlOiBQYXRpZW50U2VydmljZSwgcHJpdmF0ZSBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBub3RpZmljYXRpb246IE5vdGlmaWNhdGlvblNlcnZpY2UsIHByaXZhdGUgYXBwTG9hZGVyU2VydmljZTogQXBwTG9hZGVyU2VydmljZSkge1xuICAgIH1cblxuICAgIGNyZWF0ZUVudGl0eSgpOiBTdGF0dXNIaXN0b3J5IHtcbiAgICAgICAgcmV0dXJuIDxTdGF0dXNIaXN0b3J5Pnt9O1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmlzU2F2aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYWN0aXZhdGVkUm91dGUuZGF0YS5zdWJzY3JpYmUoKHtlbnRpdHl9KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVudGl0eSA9ICEhZW50aXR5ICYmIGVudGl0eS5ib2R5ID8gZW50aXR5LmJvZHkgOiBlbnRpdHk7XG4gICAgICAgICAgICBpZiAodGhpcy5lbnRpdHkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZW50aXR5ID0gdGhpcy5jcmVhdGVFbnRpdHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHBhdGllbnRJZCA9IHRoaXMuYWN0aXZhdGVkUm91dGUuc25hcHNob3QucGFyYW1NYXAuZ2V0KCdwYXRpZW50SWQnKTtcbiAgICAgICAgICAgIHRoaXMucGF0aWVudFNlcnZpY2UuZmluZEJ5VXVpZChwYXRpZW50SWQpLnN1YnNjcmliZSgocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbnRpdHkucGF0aWVudCA9IHJlcy5ib2R5O1xuICAgICAgICAgICAgICAgIHRoaXMucGF0aWVudCA9IHJlcy5ib2R5O1xuICAgICAgICAgICAgICAgIHRoaXMuZW50aXR5LmZhY2lsaXR5ID0gcmVzLmJvZHkuZmFjaWxpdHk7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXRpZW50U2VydmljZS5nZXRTdGF0dXNEYXRlc0J5UGF0aWVudChyZXMuYm9keS5pZCkuc3Vic2NyaWJlKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0dXNEYXRlcyA9IHJlcztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5lbnRpdHkuaWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhdGllbnRTZXJ2aWNlLmdldFN0YXR1c05hbWUodGhpcy5lbnRpdHkuaWQpLnN1YnNjcmliZShyZXMgPT4gdGhpcy5zdGF0dXMgPSByZXMpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZpbHRlckRhdGVzKGRhdGU6IE1vbWVudCk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgZXhpc3RzID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5zdGF0dXNEYXRlcy5mb3JFYWNoKGQgPT4ge1xuICAgICAgICAgICAgaWYgKGRhdGUuZGlmZihkLCAnZGF5cycpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgZXhpc3RzID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiAodGhpcy5lbnRpdHkuaWQgJiYgZGF0ZS5kaWZmKHRoaXMuZW50aXR5LmRhdGVTdGF0dXMsICdkYXlzJykgPT09IDApIHx8ICFleGlzdHM7XG4gICAgfVxuXG4gICAgcHJldmlvdXNTdGF0ZSgpIHtcbiAgICAgICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xuICAgIH1cblxuICAgIHNhdmUoKSB7XG4gICAgICAgIHRoaXMuYXBwTG9hZGVyU2VydmljZS5vcGVuKCdTYXZpbmcgQ2xpZW50IHN0YXR1cyB1cGRhdGUuLi4nKTtcbiAgICAgICAgdGhpcy5pc1NhdmluZyA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLnN0YXR1c2VzLmluY2x1ZGVzKHRoaXMuZW50aXR5LnN0YXR1cykpIHtcbiAgICAgICAgICAgIHRoaXMuZW50aXR5Lm91dGNvbWUgPSB0aGlzLmVudGl0eS5zdGF0dXM7XG4gICAgICAgICAgICB0aGlzLmVudGl0eS5zdGF0dXMgPSBudWxsO1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQ2xlYXJpbmcgc3RhdHVzJylcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5lbnRpdHkuaWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpYmVUb1NhdmVSZXNwb25zZSh0aGlzLnBhdGllbnRTZXJ2aWNlLnVwZGF0ZUNsaWVudFN0YXR1cyh0aGlzLmVudGl0eSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpYmVUb1NhdmVSZXNwb25zZSh0aGlzLnBhdGllbnRTZXJ2aWNlLnNhdmVDbGllbnRTdGF0dXModGhpcy5lbnRpdHkpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc3Vic2NyaWJlVG9TYXZlUmVzcG9uc2UocmVzdWx0OiBPYnNlcnZhYmxlPEh0dHBSZXNwb25zZTxhbnk+Pikge1xuICAgICAgICByZXN1bHQuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKHJlczogSHR0cFJlc3BvbnNlPGFueT4pID0+IHRoaXMub25TYXZlU3VjY2VzcyhyZXMuYm9keSksXG4gICAgICAgICAgICAocmVzOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwTG9hZGVyU2VydmljZS5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMub25TYXZlRXJyb3IoKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uRXJyb3IocmVzLm1lc3NhZ2UpXG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uU2F2ZVN1Y2Nlc3MocmVzdWx0OiBhbnkpIHtcbiAgICAgICAgdGhpcy5hcHBMb2FkZXJTZXJ2aWNlLmNsb3NlKCk7XG4gICAgICAgIHRoaXMuaXNTYXZpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ub3RpZmljYXRpb24ub3BlblNuYWNrTWVzc2FnZSgnQ2xpZW50IHN0YXR1cyB1cGRhdGUgc3VjY2Vzc2Z1bGx5IHNhdmVkJyk7XG4gICAgICAgIHRoaXMucHJldmlvdXNTdGF0ZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25TYXZlRXJyb3IoKSB7XG4gICAgICAgIHRoaXMuaXNTYXZpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ub3RpZmljYXRpb24ub3BlblNuYWNrTWVzc2FnZSgnRXJyb3Igc2F2aW5nIHN0YXR1cyB1cGRhdGUnKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25FcnJvcihlcnJvck1lc3NhZ2U6IHN0cmluZykge1xuICAgICAgICB0aGlzLmlzU2F2aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9uLnNob3dFcnJvcihlcnJvck1lc3NhZ2UpO1xuICAgIH1cbn1cbiJdfQ==