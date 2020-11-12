import * as tslib_1 from "tslib";
import {Component} from '@angular/core';
import {Finger} from '../model/biometric.model';
import {BiometricService} from '../services/biometric.service';
import {NotificationService} from '@alfresco/adf-core';
import {ActivatedRoute} from '@angular/router';
import * as moment_ from 'moment';
import {AppLoaderService} from '@lamis/web-core';
import {TdDialogService} from '@covalent/core';

var moment = moment_;
var BiometricEditComponent = /** @class */ (function () {
    function BiometricEditComponent(biometricService, notification, appLoaderService, _dialogService, activatedRoute) {
        this.biometricService = biometricService;
        this.notification = notification;
        this.appLoaderService = appLoaderService;
        this._dialogService = _dialogService;
        this.activatedRoute = activatedRoute;
        this.biometrics = [];
        this.error = false;
        this.fingers = [];
    }

    BiometricEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.fingers.push(Finger.LEFT_INDEX_FINGER);
        this.fingers.push(Finger.LEFT_MIDDLE_FINGER);
        this.fingers.push(Finger.LEFT_THUMB);
        this.fingers.push(Finger.RIGHT_INDEX_FINGER);
        this.fingers.push(Finger.RIGHT_MIDDLE_FINGER);
        this.fingers.push(Finger.RIGHT_THUMB);
        this.isSaving = false;
        var patientId = this.activatedRoute.snapshot.paramMap.get('patientId');
        this.biometricService.getPatient(patientId).subscribe(function (res) {
            _this.patient = res;
            _this.biometricService.findByPatient(_this.patient.id).subscribe(function (res) {
                if (res.body) {
                    _this.biometrics = res.body;
                    _this.fingers = _this.fingers.filter(function (f) {
                        return !_this.biometrics.map(function (b) {
                            return b.templateType;
                        }).includes(f);
                    });
                }
            });
        });
        this.biometricService.getReaders().subscribe(function (res) {
            return _this.readers = res;
        });
    };
    BiometricEditComponent.prototype.enroll = function () {
        var _this = this;
        var dialogRef = this._dialogService.openAlert({
            message: "Please put your " + this.finger.toString() + " on the scanner.",
            title: 'Enroll finger',
            disableClose: true
        });
        this.biometricService.identify(this.reader.id).subscribe(function (res) {
            dialogRef.close();
            if (res.message === 'PATIENT_NOT_IDENTIFIED') {
                var biometric = {
                    date: moment(),
                    facility: _this.patient.facility,
                    patient: _this.patient,
                    template: res.template,
                    templateType: _this.finger,
                    biometricType: 'FINGERPRINT'
                };
                _this.biometrics = _this.biometrics.filter(function (b) {
                    return b.templateType !== _this.finger;
                });
                _this.biometrics.push(biometric);
                _this._dialogService.openAlert({
                    message: "Finger " + _this.finger.toString() + " successfully enrolled.",
                    title: 'Enrollment success'
                });
                _this.message = 'Please remember to click \'Save Enrollment\' when through enrolling all fingers';
            } else if (res.message === 'PATIENT_IDENTIFIED') {
                var fingerId = res.id;
                _this.biometricService.getBiometric(fingerId).subscribe(function (res) {
                    _this._dialogService.openAlert({
                        message: "Finger already enrolled by patient " + res.patient.surname + ", " + res.patient.otherNames + " (" + res.patient.hospitalNum + ")",
                        title: 'Enrollment error'
                    });
                });
            } else {
                _this._dialogService.openAlert({
                    message: 'There was an error enrolling finger, please try again',
                    title: 'Enrollment error'
                });
            }
        });
    };
    BiometricEditComponent.prototype.fingerToString = function (finger) {
        var fingers = {
            RIGHT_INDEX_FINGER: 'Right Index Finger',
            LEFT_INDEX_FINGER: 'Left Index Finger',
            RIGHT_THUMB: 'Right Thumb',
            LEFT_THUMB: 'Left Thumb',
            RIGHT_MIDDLE_FINGER: 'Right Middle Finger',
            LEFT_MIDDLE_FINGER: 'Left Middle Finger'
        };
        return fingers[finger];
    };
    BiometricEditComponent.prototype.previousState = function () {
        window.history.back();
    };
    BiometricEditComponent.prototype.save = function () {
        this.appLoaderService.open('Saving visit...');
        this.isSaving = true;
        this.subscribeToSaveResponse(this.biometricService.saveTemplates(this.biometrics));
    };
    BiometricEditComponent.prototype.subscribeToSaveResponse = function (result) {
        var _this = this;
        result.subscribe(function (res) {
            return _this.onSaveSuccess(res.body);
        }, function (res) {
            _this.appLoaderService.close();
            _this.onSaveError();
            _this.onError(res.message);
        });
    };
    BiometricEditComponent.prototype.onSaveSuccess = function (result) {
        this.appLoaderService.close();
        this.isSaving = false;
        this.notification.showInfo('Fingerprints successfully saved');
        this.previousState();
    };
    BiometricEditComponent.prototype.onSaveError = function () {
        this.isSaving = false;
        this.error = true;
        this.notification.showError('Error saving enrolling fingerprints');
    };
    BiometricEditComponent.prototype.onError = function (errorMessage) {
        this.isSaving = false;
        this.notification.showError(errorMessage);
    };
    BiometricEditComponent.ctorParameters = function () {
        return [
            {type: BiometricService},
            {type: NotificationService},
            {type: AppLoaderService},
            {type: TdDialogService},
            {type: ActivatedRoute}
        ];
    };
    BiometricEditComponent = tslib_1.__decorate([
        Component({
            selector: 'lamis-biometric-edit',
            template: "<div class=\"lamis-edit-form\">\r\n    <div class=\"lamis-edit-form-container\">\r\n        <form name=\"form\" role=\"form\" novalidate (ngSubmit)=\"save()\" #biometricForm=\"ngForm\">\r\n            <mat-card class=\"default\">\r\n                <mat-card-header>\r\n                </mat-card-header>\r\n                <mat-card-content>\r\n                    <div>\r\n                        <p class=\"mat-warn\">{{message}}</p>\r\n                    </div>\r\n                    <div>\r\n                        <mat-form-field>\r\n                            <mat-label>Fingerprint Scanner</mat-label>\r\n                            <mat-select [(value)]=\"reader\">\r\n                                <mat-option></mat-option>\r\n                                <mat-option *ngFor=\"let r of readers\" [value]=\"r\">{{r.name}}</mat-option>\r\n                            </mat-select>\r\n                        </mat-form-field>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <mat-form-field class=\"full-width\">\r\n                                <mat-label>Finger</mat-label>\r\n                                <mat-select [(value)]=\"finger\">\r\n                                    <mat-option></mat-option>\r\n                                    <mat-option *ngFor=\"let r of fingers\" [value]=\"r\">{{r.toString()}}</mat-option>\r\n                                </mat-select>\r\n                            </mat-form-field>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                            <button mat-raised-button type=\"button\"\r\n                                    [disabled]=\"!reader || !finger\"\r\n                                    (click)=\"enroll()\">Enroll Finger\r\n                            </button>\r\n                        </div>\r\n                    </div>\r\n                    <mat-divider></mat-divider>\r\n                    <mat-card>\r\n                        <mat-card-header class=\"mat-bg-accent\">\r\n                            <mat-card-title>\r\n                                Enrolled Fingers\r\n                            </mat-card-title>\r\n                        </mat-card-header>\r\n                        <mat-divider></mat-divider>\r\n                        <mat-card-content>\r\n                            <mat-list dense>\r\n                                <mat-list-item\r\n                                        *ngFor=\"let b of biometrics\">{{fingerToString(b.templateType)}}</mat-list-item>\r\n                            </mat-list>\r\n                        </mat-card-content>\r\n                    </mat-card>\r\n                    <mat-divider></mat-divider>\r\n                </mat-card-content>\r\n                <mat-card-actions class=\"lamis-edit-form-actions\">\r\n                    <button mat-raised-button type=\"button\" (click)=\"previousState()\">Back</button>\r\n                    <button mat-raised-button color='primary'\r\n                            [disabled]=\"!biometrics.length || isSaving\"\r\n                            type=\"submit\">\r\n                        Save Enrollment\r\n                    </button>\r\n                </mat-card-actions>\r\n            </mat-card>\r\n        </form>\r\n    </div>\r\n</div>\r\n"
        }),
        tslib_1.__metadata("design:paramtypes", [BiometricService,
            NotificationService,
            AppLoaderService,
            TdDialogService,
            ActivatedRoute])
    ], BiometricEditComponent);
    return BiometricEditComponent;
}());
export {BiometricEditComponent};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmlvbWV0cmljLWVkaXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGFtaXMtYmlvbWV0cmljcy0xLjAuMC8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2Jpb21ldHJpYy1lZGl0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQWEsTUFBTSxFQUFXLE1BQU0sMEJBQTBCLENBQUM7QUFDdEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDakUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDekQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBR2pELE9BQU8sS0FBSyxPQUFPLE1BQU0sUUFBUSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVqRCxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUM7QUFNdkI7SUFXSSxnQ0FBb0IsZ0JBQWtDLEVBQ2hDLFlBQWlDLEVBQ25DLGdCQUFrQyxFQUNsQyxjQUErQixFQUM3QixjQUE4QjtRQUpoQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2hDLGlCQUFZLEdBQVosWUFBWSxDQUFxQjtRQUNuQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLG1CQUFjLEdBQWQsY0FBYyxDQUFpQjtRQUM3QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFkcEQsZUFBVSxHQUFnQixFQUFFLENBQUM7UUFHN0IsVUFBSyxHQUFHLEtBQUssQ0FBQztRQUVkLFlBQU8sR0FBYSxFQUFFLENBQUM7SUFVdkIsQ0FBQztJQUVELHlDQUFRLEdBQVI7UUFBQSxpQkF1QkM7UUF0QkcsSUFBSSxDQUFD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QyxDQUFDO1FBQzlELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRU8sNENBQVcsR0FBbkI7UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFUyx3Q0FBTyxHQUFqQixVQUFrQixZQUFvQjtRQUNsQyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM5QyxDQUFDOztnQkEzSHFDLGdCQUFnQjtnQkFDbEIsbUJBQW1CO2dCQUNqQixnQkFBZ0I7Z0JBQ2xCLGVBQWU7Z0JBQ2IsY0FBYzs7SUFmM0Msc0JBQXNCO1FBSmxDLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxzQkFBc0I7WUFDaEMsaTJHQUE4QztTQUNqRCxDQUFDO2lEQVl3QyxnQkFBZ0I7WUFDbEIsbUJBQW1CO1lBQ2pCLGdCQUFnQjtZQUNsQixlQUFlO1lBQ2IsY0FBYztPQWYzQyxzQkFBc0IsQ0F1SWxDO0lBQUQsNkJBQUM7Q0FBQSxBQXZJRCxJQXVJQztTQXZJWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBCaW9tZXRyaWMsIEZpbmdlciwgUGF0aWVudCB9IGZyb20gJy4uL21vZGVsL2Jpb21ldHJpYy5tb2RlbCc7XHJcbmltcG9ydCB7IEJpb21ldHJpY1NlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9iaW9tZXRyaWMuc2VydmljZSc7XHJcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICdAYWxmcmVzY28vYWRmLWNvcmUnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEh0dHBFcnJvclJlc3BvbnNlLCBIdHRwUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xyXG5pbXBvcnQgeyBBcHBMb2FkZXJTZXJ2aWNlIH0gZnJvbSAnQGxhbWlzL3dlYi1jb3JlJztcclxuaW1wb3J0IHsgVGREaWFsb2dTZXJ2aWNlIH0gZnJvbSAnQGNvdmFsZW50L2NvcmUnO1xyXG5cclxuY29uc3QgbW9tZW50ID0gbW9tZW50XztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdsYW1pcy1iaW9tZXRyaWMtZWRpdCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vYmlvbWV0cmljLWVkaXQuY29tcG9uZW50Lmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCaW9tZXRyaWNFZGl0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIGJpb21ldHJpY3M6IEJpb21ldHJpY1tdID0gW107XHJcbiAgICBwYXRpZW50OiBQYXRpZW50O1xyXG4gICAgaXNTYXZpbmc6IGJvb2xlYW47XHJcbiAgICBlcnJvciA9IGZhbHNlO1xyXG4gICAgZmluZ2VyOiBGaW5nZXI7XHJcbiAgICBmaW5nZXJzOiBGaW5nZXJbXSA9IFtdO1xyXG4gICAgcmVhZGVyczogYW55W107XHJcbiAgICByZWFkZXI6IGFueTtcclxuICAgIG1lc3NhZ2U6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGJpb21ldHJpY1NlcnZpY2U6IEJpb21ldHJpY1NlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcm90ZWN0ZWQgbm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb25TZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBhcHBMb2FkZXJTZXJ2aWNlOiBBcHBMb2FkZXJTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBfZGlhbG9nU2VydmljZTogVGREaWFsb2dTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJvdGVjdGVkIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZmluZ2Vycy5wdXNoKEZpbmdlci5MRUZUX0lOREVYX0ZJTkdFUik7XHJcbiAgICAgICAgdGhpcy5maW5nZXJzLnB1c2goRmluZ2VyLkxFRlRfTUlERExFX0ZJTkdFUik7XHJcbiAgICAgICAgdGhpcy5maW5nZXJzLnB1c2goRmluZ2VyLkxFRlRfVEhVTUIpO1xyXG4gICAgICAgIHRoaXMuZmluZ2Vycy5wdXNoKEZpbmdlci5SSUdIVF9JTkRFWF9GSU5HRVIpO1xyXG4gICAgICAgIHRoaXMuZmluZ2Vycy5wdXNoKEZpbmdlci5SSUdIVF9NSURETEVfRklOR0VSKTtcclxuICAgICAgICB0aGlzLmZpbmdlcnMucHVzaChGaW5nZXIuUklHSFRfVEhVTUIpO1xyXG5cclxuICAgICAgICB0aGlzLmlzU2F2aW5nID0gZmFsc2U7XHJcbiAgICAgICAgY29uc3QgcGF0aWVudElkID0gdGhpcy5hY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdC5wYXJhbU1hcC5nZXQoJ3BhdGllbnRJZCcpO1xyXG5cclxuICAgICAgICB0aGlzLmJpb21ldHJpY1NlcnZpY2UuZ2V0UGF0aWVudChwYXRpZW50SWQpLnN1YnNjcmliZSgocmVzKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucGF0aWVudCA9IHJlcztcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYmlvbWV0cmljU2VydmljZS5maW5kQnlQYXRpZW50KHRoaXMucGF0aWVudC5pZCkuc3Vic2NyaWJlKChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXMuYm9keSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmlvbWV0cmljcyA9IHJlcy5ib2R5O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmluZ2VycyA9IHRoaXMuZmluZ2Vycy5maWx0ZXIoZiA9PiAhdGhpcy5iaW9tZXRyaWNzLm1hcChiID0+IGIudGVtcGxhdGVUeXBlKS5pbmNsdWRlcyhmKSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5iaW9tZXRyaWNTZXJ2aWNlLmdldFJlYWRlcnMoKS5zdWJzY3JpYmUocmVzID0+IHRoaXMucmVhZGVycyA9IHJlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgZW5yb2xsKCkge1xyXG4gICAgICAgIGNvbnN0IGRpYWxvZ1JlZiA9IHRoaXMuX2RpYWxvZ1NlcnZpY2Uub3BlbkFsZXJ0KHtcclxuICAgICAgICAgICAgbWVzc2FnZTogYFBsZWFzZSBwdXQgeW91ciAke3RoaXMuZmluZ2VyLnRvU3RyaW5nKCl9IG9uIHRoZSBzY2FubmVyLmAsXHJcbiAgICAgICAgICAgIHRpdGxlOiAnRW5yb2xsIGZpbmdlcicsXHJcbiAgICAgICAgICAgIGRpc2FibGVDbG9zZTogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuYmlvbWV0cmljU2VydmljZS5pZGVudGlmeSh0aGlzLnJlYWRlci5pZCkuc3Vic2NyaWJlKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGRpYWxvZ1JlZi5jbG9zZSgpO1xyXG4gICAgICAgICAgICBpZiAocmVzLm1lc3NhZ2UgPT09ICdQQVRJRU5UX05PVF9JREVOVElGSUVEJykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYmlvbWV0cmljOiBCaW9tZXRyaWMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0ZTogbW9tZW50KCksXHJcbiAgICAgICAgICAgICAgICAgICAgZmFjaWxpdHk6IHRoaXMucGF0aWVudC5mYWNpbGl0eSxcclxuICAgICAgICAgICAgICAgICAgICBwYXRpZW50OiB0aGlzLnBhdGllbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6IHJlcy50ZW1wbGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVR5cGU6IHRoaXMuZmluZ2VyLFxyXG4gICAgICAgICAgICAgICAgICAgIGJpb21ldHJpY1R5cGU6ICdGSU5HRVJQUklOVCdcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5iaW9tZXRyaWNzID0gdGhpcy5iaW9tZXRyaWNzLmZpbHRlcihiID0+IGIudGVtcGxhdGVUeXBlICE9PSB0aGlzLmZpbmdlcik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJpb21ldHJpY3MucHVzaChiaW9tZXRyaWMpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuX2RpYWxvZ1NlcnZpY2Uub3BlbkFsZXJ0KHtcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBgRmluZ2VyICR7dGhpcy5maW5nZXIudG9TdHJpbmcoKX0gc3VjY2Vzc2Z1bGx5IGVucm9sbGVkLmAsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdFbnJvbGxtZW50IHN1Y2Nlc3MnXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9ICdQbGVhc2UgcmVtZW1iZXIgdG8gY2xpY2sgXFwnU2F2ZSBFbnJvbGxtZW50XFwnIHdoZW4gdGhyb3VnaCBlbnJvbGxpbmcgYWxsIGZpbmdlcnMnO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5tZXNzYWdlID09PSAnUEFUSUVOVF9JREVOVElGSUVEJykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZmluZ2VySWQgPSByZXMuaWQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJpb21ldHJpY1NlcnZpY2UuZ2V0QmlvbWV0cmljKGZpbmdlcklkKS5zdWJzY3JpYmUocmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kaWFsb2dTZXJ2aWNlLm9wZW5BbGVydCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGBGaW5nZXIgYWxyZWFkeSBlbnJvbGxlZCBieSBwYXRpZW50ICR7cmVzLnBhdGllbnQuc3VybmFtZX0sICR7cmVzLnBhdGllbnQub3RoZXJOYW1lc30gKCR7cmVzLnBhdGllbnQuaG9zcGl0YWxOdW19KWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnRW5yb2xsbWVudCBlcnJvcidcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2RpYWxvZ1NlcnZpY2Uub3BlbkFsZXJ0KHtcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnVGhlcmUgd2FzIGFuIGVycm9yIGVucm9sbGluZyBmaW5nZXIsIHBsZWFzZSB0cnkgYWdhaW4nLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnRW5yb2xsbWVudCBlcnJvcidcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmaW5nZXJUb1N0cmluZyhmaW5nZXI6IEZpbmdlcikge1xyXG4gICAgICAgIGNvbnN0IGZpbmdlcnMgPSB7XHJcbiAgICAgICAgICAgIFJJR0hUX0lOREVYX0ZJTkdFUjogJ1JpZ2h0IEluZGV4IEZpbmdlcicsXHJcbiAgICAgICAgICAgIExFRlRfSU5ERVhfRklOR0VSOiAnTGVmdCBJbmRleCBGaW5nZXInLFxyXG4gICAgICAgICAgICBSSUdIVF9USFVNQjogJ1JpZ2h0IFRodW1iJyxcclxuICAgICAgICAgICAgTEVGVF9USFVNQjogJ0xlZnQgVGh1bWInLFxyXG4gICAgICAgICAgICBSSUdIVF9NSURETEVfRklOR0VSOiAnUmlnaHQgTWlkZGxlIEZpbmdlcicsXHJcbiAgICAgICAgICAgIExFRlRfTUlERExFX0ZJTkdFUjogJ0xlZnQgTWlkZGxlIEZpbmdlcidcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBmaW5nZXJzW2Zpbmdlcl1cclxuICAgIH1cclxuXHJcbiAgICBwcmV2aW91c1N0YXRlKCkge1xyXG4gICAgICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICAgIH1cclxuXHJcbiAgICBzYXZlKCkge1xyXG4gICAgICAgIHRoaXMuYXBwTG9hZGVyU2VydmljZS5vcGVuKCdTYXZpbmcgdmlzaXQuLi4nKTtcclxuICAgICAgICB0aGlzLmlzU2F2aW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnN1YnNjcmliZVRvU2F2ZVJlc3BvbnNlKHRoaXMuYmlvbWV0cmljU2VydmljZS5zYXZlVGVtcGxhdGVzKHRoaXMuYmlvbWV0cmljcykpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3Vic2NyaWJlVG9TYXZlUmVzcG9uc2UocmVzdWx0OiBPYnNlcnZhYmxlPEh0dHBSZXNwb25zZTxhbnk+Pikge1xyXG4gICAgICAgIHJlc3VsdC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIChyZXM6IEh0dHBSZXNwb25zZTxhbnk+KSA9PiB0aGlzLm9uU2F2ZVN1Y2Nlc3MocmVzLmJvZHkpLFxyXG4gICAgICAgICAgICAocmVzOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcHBMb2FkZXJTZXJ2aWNlLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uU2F2ZUVycm9yKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uRXJyb3IocmVzLm1lc3NhZ2UpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25TYXZlU3VjY2VzcyhyZXN1bHQ6IGFueSkge1xyXG4gICAgICAgIHRoaXMuYXBwTG9hZGVyU2VydmljZS5jbG9zZSgpO1xyXG4gICAgICAgIHRoaXMuaXNTYXZpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbi5zaG93SW5mbygnRmluZ2VycHJpbnRzIHN1Y2Nlc3NmdWxseSBzYXZlZCcpO1xyXG4gICAgICAgIHRoaXMucHJldmlvdXNTdGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25TYXZlRXJyb3IoKSB7XHJcbiAgICAgICAgdGhpcy5pc1NhdmluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZXJyb3IgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9uLnNob3dFcnJvcignRXJyb3Igc2F2aW5nIGVucm9sbGluZyBmaW5nZXJwcmludHMnKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25FcnJvcihlcnJvck1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuaXNTYXZpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbi5zaG93RXJyb3IoZXJyb3JNZXNzYWdlKTtcclxuICAgIH1cclxufVxyXG4iXX0=
