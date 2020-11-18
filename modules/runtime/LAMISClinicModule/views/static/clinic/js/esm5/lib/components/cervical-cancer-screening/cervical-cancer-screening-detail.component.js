import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { CardViewBoolItemModel, CardViewDateItemModel, CardViewItem, CardViewTextItemModel, NotificationService } from '@alfresco/adf-core';
import { ActivatedRoute, Router } from '@angular/router';
import { TdDialogService } from '@covalent/core';
import { CervicalCancerScreeningService } from '../../services/cervical-cancer-screening.service';
import { ClinicService } from '../../services/clinic.service';
var RESULT = {
    NEGATIVE: 'Negative',
    POSITIVE: 'Positive',
    SUSPICIOUS: 'Suspicious Cancerous Lesions'
};
var METHOD = {
    VIA: 'Visual Inspection with Acetric Acid (VIA)',
    VILI: 'Visual Inspection with Lugos Iodine (VILI)',
    PAP_SMEAR: 'PAP Smear'
};
var LESION_METHOD = {
    CRYOTHERAPY: 'Cryotherapy',
    THERMAL_ABLATION: 'Thermal Ablation/ Thermocoagulation',
    LEETZ_LEEP: 'LEETZ/ LEEP',
    CONIZATION: 'Conization Knifer/ Lagor'
};
var TYPE = {
    FIRST_TIME: 'First Time',
    FOLLOWUP: 'Followup after previous negative result or suspected cancer',
    POST_TREATMENT_FOLLOWUP: 'Post-treatment Followup'
};
var CervicalCancerScreeningDetailComponent = /** @class */ (function () {
    function CervicalCancerScreeningDetailComponent(router, route, screeningService, _dialogService, clinicService, notificationService) {
        this.router = router;
        this.route = route;
        this.screeningService = screeningService;
        this._dialogService = _dialogService;
        this.clinicService = clinicService;
        this.notificationService = notificationService;
        this.properties = [];
    }
    CervicalCancerScreeningDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (_a) {
            var entity = _a.entity;
            _this.entity = !!entity && entity.body ? entity.body.data.cervicalCancerScreening : entity.data.cervicalCancerScreening;
            _this.observation = !!entity && entity.body ? entity.body : entity;
            var patientId = _this.route.snapshot.paramMap.get('patientId');
            _this.clinicService.getPatient(patientId).subscribe(function (res) { return _this.patient = res; });
            _this.buildProperties();
        });
    };
    CervicalCancerScreeningDetailComponent.prototype.edit = function () {
        this.router.navigate(['/', 'cervical-cancer-screening', this.observation.id, 'patient', this.patient.uuid, 'edit']);
    };
    CervicalCancerScreeningDetailComponent.prototype.delete = function () {
        var _this = this;
        this._dialogService.openConfirm({
            title: 'Confirm',
            message: 'Do you want to delete this Cervical cancer screening, action cannot be reversed?',
            cancelButton: 'No',
            acceptButton: 'Yes',
            width: '500px',
        }).afterClosed().subscribe(function (accept) {
            if (accept) {
                _this.screeningService.delete(_this.observation.id).subscribe(function (res) {
                    if (res.ok) {
                        _this.router.navigate(['patients']);
                    }
                    else {
                        _this.notificationService.showError('Error deleting screening, please try again');
                    }
                });
            }
            else {
                // DO SOMETHING ELSE
            }
        });
    };
    CervicalCancerScreeningDetailComponent.prototype.buildProperties = function () {
        this.properties.push(new CardViewDateItemModel({
            key: 'ds',
            value: this.observation.date,
            label: 'Date of Screening',
            format: 'dd MMM, yyyy'
        }));
        this.properties.push(new CardViewTextItemModel({
            key: 'na',
            value: TYPE[this.entity.screeningType],
            label: 'Screening Type',
        }));
        this.properties.push(new CardViewTextItemModel({
            label: 'Screening Method',
            key: 'fs',
            value: METHOD[this.entity.screeningMethod]
        }));
        this.properties.push(new CardViewTextItemModel({
            label: 'Result',
            key: 'adr',
            value: RESULT[this.entity.screeningResult]
        }));
        this.properties.push(new CardViewBoolItemModel({
            label: 'Referred for Treatment',
            key: 'bw',
            value: this.entity.referredForTreatment
        }));
        if (!!this.entity.referredForTreatment) {
            this.properties.push(new CardViewTextItemModel({
                label: 'Precancerous Lesions Treatment method',
                key: 'adr',
                value: LESION_METHOD[this.entity.precancerousLesionsTreatmentMethod]
            }));
            this.properties.push(new CardViewDateItemModel({
                key: 'ds',
                value: this.entity.dateTreated,
                label: 'Date of Treated',
                format: 'dd MMM, yyyy'
            }));
        }
    };
    CervicalCancerScreeningDetailComponent.prototype.previousState = function () {
        window.history.back();
    };
    CervicalCancerScreeningDetailComponent.ctorParameters = function () { return [
        { type: Router },
        { type: ActivatedRoute },
        { type: CervicalCancerScreeningService },
        { type: TdDialogService },
        { type: ClinicService },
        { type: NotificationService }
    ]; };
    CervicalCancerScreeningDetailComponent = tslib_1.__decorate([
        Component({
            selector: 'cervical-screening-detail',
            template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <mat-card>\n            <mat-card-header>\n            </mat-card-header>\n            <mat-card-content>\n                <adf-card-view [properties]=\"properties\" editable=\"false\"></adf-card-view>\n            </mat-card-content>\n            <mat-card-actions class=\"lamis-edit-form-actions\">\n                <button mat-button (click)=\"previousState()\">Back</button>\n                <button mat-raised-button color=\"warn\" (click)=\"delete()\">Delete</button>\n                <button mat-raised-button color=\"primary\" (click)=\"edit()\">Edit</button>\n            </mat-card-actions>\n        </mat-card>\n    </div>\n</div>\n"
        }),
        tslib_1.__metadata("design:paramtypes", [Router, ActivatedRoute, CervicalCancerScreeningService,
            TdDialogService, ClinicService,
            NotificationService])
    ], CervicalCancerScreeningDetailComponent);
    return CervicalCancerScreeningDetailComponent;
}());
export { CervicalCancerScreeningDetailComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VydmljYWwtY2FuY2VyLXNjcmVlbmluZy1kZXRhaWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGFtaXMtY2xpbmljLTEuNC4wLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvY2VydmljYWwtY2FuY2VyLXNjcmVlbmluZy9jZXJ2aWNhbC1jYW5jZXItc2NyZWVuaW5nLWRldGFpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFDaEQsT0FBTyxFQUNILHFCQUFxQixFQUNyQixxQkFBcUIsRUFDckIsWUFBWSxFQUNaLHFCQUFxQixFQUNyQixtQkFBbUIsRUFDdEIsTUFBTSxvQkFBb0IsQ0FBQztBQUU1QixPQUFPLEVBQUMsY0FBYyxFQUFFLE1BQU0sRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMvQyxPQUFPLEVBQUMsOEJBQThCLEVBQUMsTUFBTSxrREFBa0QsQ0FBQztBQUNoRyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFFNUQsSUFBTSxNQUFNLEdBQUc7SUFDWCxRQUFRLEVBQUUsVUFBVTtJQUNwQixRQUFRLEVBQUUsVUFBVTtJQUNwQixVQUFVLEVBQUUsOEJBQThCO0NBQzdDLENBQUM7QUFFRixJQUFNLE1BQU0sR0FBRztJQUNYLEdBQUcsRUFBRSwyQ0FBMkM7SUFDaEQsSUFBSSxFQUFFLDRDQUE0QztJQUNsRCxTQUFTLEVBQUUsV0FBVztDQUN6QixDQUFDO0FBQ0YsSUFBTSxhQUFhLEdBQUc7SUFDbEIsV0FBVyxFQUFFLGFBQWE7SUFDMUIsZ0JBQWdCLEVBQUUscUNBQXFDO0lBQ3ZELFVBQVUsRUFBRSxhQUFhO0lBQ3pCLFVBQVUsRUFBRSwwQkFBMEI7Q0FDekMsQ0FBQztBQUVGLElBQU0sSUFBSSxHQUFHO0lBQ1QsVUFBVSxFQUFF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VSxDQUFDLElBQUksQ0FBQyxJQUFJLHFCQUFxQixDQUFDO2dCQUMzQyxLQUFLLEVBQUUsdUNBQXVDO2dCQUM5QyxHQUFHLEVBQUUsS0FBSztnQkFDVixLQUFLLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsa0NBQWtDLENBQUM7YUFDdkUsQ0FBQyxDQUFDLENBQUM7WUFFSixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLHFCQUFxQixDQUFDO2dCQUMzQyxHQUFHLEVBQUUsSUFBSTtnQkFDVCxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXO2dCQUM5QixLQUFLLEVBQUUsaUJBQWlCO2dCQUN4QixNQUFNLEVBQUUsY0FBYzthQUN6QixDQUFDLENBQUMsQ0FBQztTQUNQO0lBRUwsQ0FBQztJQUVELDhEQUFhLEdBQWI7UUFDSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzFCLENBQUM7O2dCQXpGMkIsTUFBTTtnQkFBaUIsY0FBYztnQkFBNEIsOEJBQThCO2dCQUN2RixlQUFlO2dCQUF5QixhQUFhO2dCQUNoRCxtQkFBbUI7O0lBVG5ELHNDQUFzQztRQUpsRCxTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsMkJBQTJCO1lBQ3JDLHV1QkFBZ0U7U0FDbkUsQ0FBQztpREFROEIsTUFBTSxFQUFpQixjQUFjLEVBQTRCLDhCQUE4QjtZQUN2RixlQUFlLEVBQXlCLGFBQWE7WUFDaEQsbUJBQW1CO09BVG5ELHNDQUFzQyxDQWtHbEQ7SUFBRCw2Q0FBQztDQUFBLEFBbEdELElBa0dDO1NBbEdZLHNDQUFzQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBDYXJkVmlld0Jvb2xJdGVtTW9kZWwsXG4gICAgQ2FyZFZpZXdEYXRlSXRlbU1vZGVsLFxuICAgIENhcmRWaWV3SXRlbSxcbiAgICBDYXJkVmlld1RleHRJdGVtTW9kZWwsXG4gICAgTm90aWZpY2F0aW9uU2VydmljZVxufSBmcm9tICdAYWxmcmVzY28vYWRmLWNvcmUnO1xuaW1wb3J0IHtDZXJ2aWNhbENhbmNlclNjcmVlbmluZywgT2JzZXJ2YXRpb24sIFBhdGllbnR9IGZyb20gJy4uLy4uL21vZGVsL2NsaW5pYy5tb2RlbCc7XG5pbXBvcnQge0FjdGl2YXRlZFJvdXRlLCBSb3V0ZXJ9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge1RkRGlhbG9nU2VydmljZX0gZnJvbSAnQGNvdmFsZW50L2NvcmUnO1xuaW1wb3J0IHtDZXJ2aWNhbENhbmNlclNjcmVlbmluZ1NlcnZpY2V9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2NlcnZpY2FsLWNhbmNlci1zY3JlZW5pbmcuc2VydmljZSc7XG5pbXBvcnQge0NsaW5pY1NlcnZpY2V9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2NsaW5pYy5zZXJ2aWNlJztcblxuY29uc3QgUkVTVUxUID0ge1xuICAgIE5FR0FUSVZFOiAnTmVnYXRpdmUnLFxuICAgIFBPU0lUSVZFOiAnUG9zaXRpdmUnLFxuICAgIFNVU1BJQ0lPVVM6ICdTdXNwaWNpb3VzIENhbmNlcm91cyBMZXNpb25zJ1xufTtcblxuY29uc3QgTUVUSE9EID0ge1xuICAgIFZJQTogJ1Zpc3VhbCBJbnNwZWN0aW9uIHdpdGggQWNldHJpYyBBY2lkIChWSUEpJyxcbiAgICBWSUxJOiAnVmlzdWFsIEluc3BlY3Rpb24gd2l0aCBMdWdvcyBJb2RpbmUgKFZJTEkpJyxcbiAgICBQQVBfU01FQVI6ICdQQVAgU21lYXInXG59O1xuY29uc3QgTEVTSU9OX01FVEhPRCA9IHtcbiAgICBDUllPVEhFUkFQWTogJ0NyeW90aGVyYXB5JyxcbiAgICBUSEVSTUFMX0FCTEFUSU9OOiAnVGhlcm1hbCBBYmxhdGlvbi8gVGhlcm1vY29hZ3VsYXRpb24nLFxuICAgIExFRVRaX0xFRVA6ICdMRUVUWi8gTEVFUCcsXG4gICAgQ09OSVpBVElPTjogJ0Nvbml6YXRpb24gS25pZmVyLyBMYWdvcidcbn07XG5cbmNvbnN0IFRZUEUgPSB7XG4gICAgRklSU1RfVElNRTogJ0ZpcnN0IFRpbWUnLFxuICAgIEZPTExPV1VQOiAnRm9sbG93dXAgYWZ0ZXIgcHJldmlvdXMgbmVnYXRpdmUgcmVzdWx0IG9yIHN1c3BlY3RlZCBjYW5jZXInLFxuICAgIFBPU1RfVFJFQVRNRU5UX0ZPTExPV1VQOiAnUG9zdC10cmVhdG1lbnQgRm9sbG93dXAnXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2NlcnZpY2FsLXNjcmVlbmluZy1kZXRhaWwnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9jZXJ2aWNhbC1jYW5jZXItc2NyZWVuaW5nLWRldGFpbC5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgQ2VydmljYWxDYW5jZXJTY3JlZW5pbmdEZXRhaWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgcHJvcGVydGllczogQ2FyZFZpZXdJdGVtW10gPSBbXTtcbiAgICBlbnRpdHk6IENlcnZpY2FsQ2FuY2VyU2NyZWVuaW5nO1xuICAgIG9ic2VydmF0aW9uOiBPYnNlcnZhdGlvbjtcbiAgICBwYXRpZW50OiBQYXRpZW50O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsIHByaXZhdGUgc2NyZWVuaW5nU2VydmljZTogQ2VydmljYWxDYW5jZXJTY3JlZW5pbmdTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgX2RpYWxvZ1NlcnZpY2U6IFRkRGlhbG9nU2VydmljZSwgcHJpdmF0ZSBjbGluaWNTZXJ2aWNlOiBDbGluaWNTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgbm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnJvdXRlLmRhdGEuc3Vic2NyaWJlKCh7ZW50aXR5fSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5lbnRpdHkgPSAhIWVudGl0eSAmJiBlbnRpdHkuYm9keSA/IGVudGl0eS5ib2R5LmRhdGEuY2VydmljYWxDYW5jZXJTY3JlZW5pbmcgOiBlbnRpdHkuZGF0YS5jZXJ2aWNhbENhbmNlclNjcmVlbmluZztcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2YXRpb24gPSAhIWVudGl0eSAmJiBlbnRpdHkuYm9keSA/IGVudGl0eS5ib2R5IDogZW50aXR5O1xuXG4gICAgICAgICAgICBjb25zdCBwYXRpZW50SWQgPSB0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtTWFwLmdldCgncGF0aWVudElkJyk7XG4gICAgICAgICAgICB0aGlzLmNsaW5pY1NlcnZpY2UuZ2V0UGF0aWVudChwYXRpZW50SWQpLnN1YnNjcmliZSgocmVzKSA9PiB0aGlzLnBhdGllbnQgPSByZXMpO1xuICAgICAgICAgICAgdGhpcy5idWlsZFByb3BlcnRpZXMoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZWRpdCgpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvJywgJ2NlcnZpY2FsLWNhbmNlci1zY3JlZW5pbmcnLCB0aGlzLm9ic2VydmF0aW9uLmlkLCAncGF0aWVudCcsIHRoaXMucGF0aWVudC51dWlkLCAnZWRpdCddKTtcbiAgICB9XG5cbiAgICBkZWxldGUoKSB7XG4gICAgICAgIHRoaXMuX2RpYWxvZ1NlcnZpY2Uub3BlbkNvbmZpcm0oe1xuICAgICAgICAgICAgdGl0bGU6ICdDb25maXJtJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdEbyB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBDZXJ2aWNhbCBjYW5jZXIgc2NyZWVuaW5nLCBhY3Rpb24gY2Fubm90IGJlIHJldmVyc2VkPycsXG4gICAgICAgICAgICBjYW5jZWxCdXR0b246ICdObycsXG4gICAgICAgICAgICBhY2NlcHRCdXR0b246ICdZZXMnLFxuICAgICAgICAgICAgd2lkdGg6ICc1MDBweCcsXG4gICAgICAgIH0pLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKChhY2NlcHQ6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgIGlmIChhY2NlcHQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjcmVlbmluZ1NlcnZpY2UuZGVsZXRlKHRoaXMub2JzZXJ2YXRpb24uaWQpLnN1YnNjcmliZSgocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsncGF0aWVudHMnXSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc2hvd0Vycm9yKCdFcnJvciBkZWxldGluZyBzY3JlZW5pbmcsIHBsZWFzZSB0cnkgYWdhaW4nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBETyBTT01FVEhJTkcgRUxTRVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBidWlsZFByb3BlcnRpZXMoKSB7XG4gICAgICAgIHRoaXMucHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld0RhdGVJdGVtTW9kZWwoe1xuICAgICAgICAgICAga2V5OiAnZHMnLFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMub2JzZXJ2YXRpb24uZGF0ZSxcbiAgICAgICAgICAgIGxhYmVsOiAnRGF0ZSBvZiBTY3JlZW5pbmcnLFxuICAgICAgICAgICAgZm9ybWF0OiAnZGQgTU1NLCB5eXl5J1xuICAgICAgICB9KSk7XG4gICAgICAgIHRoaXMucHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld1RleHRJdGVtTW9kZWwoe1xuICAgICAgICAgICAga2V5OiAnbmEnLFxuICAgICAgICAgICAgdmFsdWU6IFRZUEVbdGhpcy5lbnRpdHkuc2NyZWVuaW5nVHlwZV0sXG4gICAgICAgICAgICBsYWJlbDogJ1NjcmVlbmluZyBUeXBlJyxcbiAgICAgICAgfSkpO1xuICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdUZXh0SXRlbU1vZGVsKHtcbiAgICAgICAgICAgIGxhYmVsOiAnU2NyZWVuaW5nIE1ldGhvZCcsXG4gICAgICAgICAgICBrZXk6ICdmcycsXG4gICAgICAgICAgICB2YWx1ZTogTUVUSE9EW3RoaXMuZW50aXR5LnNjcmVlbmluZ01ldGhvZF1cbiAgICAgICAgfSkpO1xuICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdUZXh0SXRlbU1vZGVsKHtcbiAgICAgICAgICAgIGxhYmVsOiAnUmVzdWx0JyxcbiAgICAgICAgICAgIGtleTogJ2FkcicsXG4gICAgICAgICAgICB2YWx1ZTogUkVTVUxUW3RoaXMuZW50aXR5LnNjcmVlbmluZ1Jlc3VsdF1cbiAgICAgICAgfSkpO1xuICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdCb29sSXRlbU1vZGVsKHtcbiAgICAgICAgICAgIGxhYmVsOiAnUmVmZXJyZWQgZm9yIFRyZWF0bWVudCcsXG4gICAgICAgICAgICBrZXk6ICdidycsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5lbnRpdHkucmVmZXJyZWRGb3JUcmVhdG1lbnRcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIGlmICghIXRoaXMuZW50aXR5LnJlZmVycmVkRm9yVHJlYXRtZW50KSB7XG4gICAgICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdUZXh0SXRlbU1vZGVsKHtcbiAgICAgICAgICAgICAgICBsYWJlbDogJ1ByZWNhbmNlcm91cyBMZXNpb25zIFRyZWF0bWVudCBtZXRob2QnLFxuICAgICAgICAgICAgICAgIGtleTogJ2FkcicsXG4gICAgICAgICAgICAgICAgdmFsdWU6IExFU0lPTl9NRVRIT0RbdGhpcy5lbnRpdHkucHJlY2FuY2Vyb3VzTGVzaW9uc1RyZWF0bWVudE1ldGhvZF1cbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3RGF0ZUl0ZW1Nb2RlbCh7XG4gICAgICAgICAgICAgICAga2V5OiAnZHMnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLmVudGl0eS5kYXRlVHJlYXRlZCxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0RhdGUgb2YgVHJlYXRlZCcsXG4gICAgICAgICAgICAgICAgZm9ybWF0OiAnZGQgTU1NLCB5eXl5J1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBwcmV2aW91c1N0YXRlKCkge1xuICAgICAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XG4gICAgfVxuXG59XG4iXX0=