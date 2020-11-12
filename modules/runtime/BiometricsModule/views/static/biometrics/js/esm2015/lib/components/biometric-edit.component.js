import * as tslib_1 from "tslib";
import {Component} from '@angular/core';
import {Finger} from '../model/biometric.model';
import {BiometricService} from '../services/biometric.service';
import {NotificationService} from '@alfresco/adf-core';
import {ActivatedRoute} from '@angular/router';
import * as moment_ from 'moment';
import {AppLoaderService} from '@lamis/web-core';
import {TdDialogService} from '@covalent/core';

const moment = moment_;
let BiometricEditComponent = class BiometricEditComponent {
    constructor(biometricService, notification, appLoaderService, _dialogService, activatedRoute) {
        this.biometricService = biometricService;
        this.notification = notification;
        this.appLoaderService = appLoaderService;
        this._dialogService = _dialogService;
        this.activatedRoute = activatedRoute;
        this.biometrics = [];
        this.error = false;
        this.fingers = [];
    }

    ngOnInit() {
        this.fingers.push(Finger.LEFT_INDEX_FINGER);
        this.fingers.push(Finger.LEFT_MIDDLE_FINGER);
        this.fingers.push(Finger.LEFT_THUMB);
        this.fingers.push(Finger.RIGHT_INDEX_FINGER);
        this.fingers.push(Finger.RIGHT_MIDDLE_FINGER);
        this.fingers.push(Finger.RIGHT_THUMB);
        this.isSaving = false;
        const patientId = this.activatedRoute.snapshot.paramMap.get('patientId');
        this.biometricService.getPatient(patientId).subscribe((res) => {
            this.patient = res;
            this.biometricService.findByPatient(this.patient.id).subscribe((res) => {
                if (res.body) {
                    this.biometrics = res.body;
                    this.fingers = this.fingers.filter(f => !this.biometrics.map(b => b.templateType).includes(f));
                }
            });
        });
        this.biometricService.getReaders().subscribe(res => this.readers = res);
    }

    enroll() {
        const dialogRef = this._dialogService.openAlert({
            message: `Please put your ${this.finger.toString()} on the scanner.`,
            title: 'Enroll finger',
            disableClose: true
        });
        this.biometricService.identify(this.reader.id).subscribe(res => {
            dialogRef.close();
            if (res.message === 'PATIENT_NOT_IDENTIFIED') {
                const biometric = {
                    date: moment(),
                    facility: this.patient.facility,
                    patient: this.patient,
                    template: res.template,
                    templateType: this.finger,
                    biometricType: 'FINGERPRINT'
                };
                this.biometrics = this.biometrics.filter(b => b.templateType !== this.finger);
                this.biometrics.push(biometric);
                this._dialogService.openAlert({
                    message: `Finger ${this.finger.toString()} successfully enrolled.`,
                    title: 'Enrollment success'
                });
                this.message = 'Please remember to click \'Save Enrollment\' when through enrolling all fingers';
            } else if (res.message === 'PATIENT_IDENTIFIED') {
                const fingerId = res.id;
                this.biometricService.getBiometric(fingerId).subscribe(res => {
                    this._dialogService.openAlert({
                        message: `Finger already enrolled by patient ${res.patient.surname}, ${res.patient.otherNames} (${res.patient.hospitalNum})`,
                        title: 'Enrollment error'
                    });
                });
            } else {
                this._dialogService.openAlert({
                    message: 'There was an error enrolling finger, please try again',
                    title: 'Enrollment error'
                });
            }
        });
    }

    fingerToString(finger) {
        const fingers = {
            RIGHT_INDEX_FINGER: 'Right Index Finger',
            LEFT_INDEX_FINGER: 'Left Index Finger',
            RIGHT_THUMB: 'Right Thumb',
            LEFT_THUMB: 'Left Thumb',
            RIGHT_MIDDLE_FINGER: 'Right Middle Finger',
            LEFT_MIDDLE_FINGER: 'Left Middle Finger'
        };
        return fingers[finger];
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.appLoaderService.open('Saving visit...');
        this.isSaving = true;
        this.subscribeToSaveResponse(this.biometricService.saveTemplates(this.biometrics));
    }

    subscribeToSaveResponse(result) {
        result.subscribe((res) => this.onSaveSuccess(res.body), (res) => {
            this.appLoaderService.close();
            this.onSaveError();
            this.onError(res.message);
        });
    }

    onSaveSuccess(result) {
        this.appLoaderService.close();
        this.isSaving = false;
        this.notification.showInfo('Fingerprints successfully saved');
        this.previousState();
    }

    onSaveError() {
        this.isSaving = false;
        this.error = true;
        this.notification.showError('Error saving enrolling fingerprints');
    }

    onError(errorMessage) {
        this.isSaving = false;
        this.notification.showError(errorMessage);
    }
};
BiometricEditComponent.ctorParameters = () => [
    {type: BiometricService},
    {type: NotificationService},
    {type: AppLoaderService},
    {type: TdDialogService},
    {type: ActivatedRoute}
];
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
export {BiometricEditComponent};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmlvbWV0cmljLWVkaXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGFtaXMtYmlvbWV0cmljcy0xLjAuMC8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2Jpb21ldHJpYy1lZGl0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQWEsTUFBTSxFQUFXLE1BQU0sMEJBQTBCLENBQUM7QUFDdEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDakUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDekQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBR2pELE9BQU8sS0FBSyxPQUFPLE1BQU0sUUFBUSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVqRCxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUM7QUFNdkIsSUFBYSxzQkFBc0IsR0FBbkMsTUFBYSxzQkFBc0I7SUFXL0IsWUFBb0IsZ0JBQWtDLEVBQ2hDLFlBQWlDLEVBQ25DLGdCQUFrQyxFQUNsQyxjQUErQixFQUM3QixjQUE4QjtRQUpoQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2hDLGlCQUFZLEdBQVosWUFBWSxDQUFxQjtRQUNuQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLG1CQUFjLEdBQWQsY0FBYyxDQUFpQjtRQUM3QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFkcEQsZUFBVSxHQUFnQixFQUFFLENBQUM7UUFHN0IsVUFBSyxHQUFHLEtBQUssQ0FBQztRQUVkLFlBQU8sR0FBYSxFQUFFLENBQUM7SUFVdkIsQ0FBQztJQUVELFFBQVE7UUFD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QUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFUyxPQUFPLENBQUMsWUFBb0I7UUFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDOUMsQ0FBQztDQUNKLENBQUE7O1lBNUh5QyxnQkFBZ0I7WUFDbEIsbUJBQW1CO1lBQ2pCLGdCQUFnQjtZQUNsQixlQUFlO1lBQ2IsY0FBYzs7QUFmM0Msc0JBQXNCO0lBSmxDLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxzQkFBc0I7UUFDaEMsaTJHQUE4QztLQUNqRCxDQUFDOzZDQVl3QyxnQkFBZ0I7UUFDbEIsbUJBQW1CO1FBQ2pCLGdCQUFnQjtRQUNsQixlQUFlO1FBQ2IsY0FBYztHQWYzQyxzQkFBc0IsQ0F1SWxDO1NBdklZLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEJpb21ldHJpYywgRmluZ2VyLCBQYXRpZW50IH0gZnJvbSAnLi4vbW9kZWwvYmlvbWV0cmljLm1vZGVsJztcclxuaW1wb3J0IHsgQmlvbWV0cmljU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2Jpb21ldHJpYy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gJ0BhbGZyZXNjby9hZGYtY29yZSc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgSHR0cEVycm9yUmVzcG9uc2UsIEh0dHBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XHJcbmltcG9ydCB7IEFwcExvYWRlclNlcnZpY2UgfSBmcm9tICdAbGFtaXMvd2ViLWNvcmUnO1xyXG5pbXBvcnQgeyBUZERpYWxvZ1NlcnZpY2UgfSBmcm9tICdAY292YWxlbnQvY29yZSc7XHJcblxyXG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2xhbWlzLWJpb21ldHJpYy1lZGl0JyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9iaW9tZXRyaWMtZWRpdC5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEJpb21ldHJpY0VkaXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgYmlvbWV0cmljczogQmlvbWV0cmljW10gPSBbXTtcclxuICAgIHBhdGllbnQ6IFBhdGllbnQ7XHJcbiAgICBpc1NhdmluZzogYm9vbGVhbjtcclxuICAgIGVycm9yID0gZmFsc2U7XHJcbiAgICBmaW5nZXI6IEZpbmdlcjtcclxuICAgIGZpbmdlcnM6IEZpbmdlcltdID0gW107XHJcbiAgICByZWFkZXJzOiBhbnlbXTtcclxuICAgIHJlYWRlcjogYW55O1xyXG4gICAgbWVzc2FnZTogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYmlvbWV0cmljU2VydmljZTogQmlvbWV0cmljU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByb3RlY3RlZCBub3RpZmljYXRpb246IE5vdGlmaWNhdGlvblNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGFwcExvYWRlclNlcnZpY2U6IEFwcExvYWRlclNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIF9kaWFsb2dTZXJ2aWNlOiBUZERpYWxvZ1NlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcm90ZWN0ZWQgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5maW5nZXJzLnB1c2goRmluZ2VyLkxFRlRfSU5ERVhfRklOR0VSKTtcclxuICAgICAgICB0aGlzLmZpbmdlcnMucHVzaChGaW5nZXIuTEVGVF9NSURETEVfRklOR0VSKTtcclxuICAgICAgICB0aGlzLmZpbmdlcnMucHVzaChGaW5nZXIuTEVGVF9USFVNQik7XHJcbiAgICAgICAgdGhpcy5maW5nZXJzLnB1c2goRmluZ2VyLlJJR0hUX0lOREVYX0ZJTkdFUik7XHJcbiAgICAgICAgdGhpcy5maW5nZXJzLnB1c2goRmluZ2VyLlJJR0hUX01JRERMRV9GSU5HRVIpO1xyXG4gICAgICAgIHRoaXMuZmluZ2Vycy5wdXNoKEZpbmdlci5SSUdIVF9USFVNQik7XHJcblxyXG4gICAgICAgIHRoaXMuaXNTYXZpbmcgPSBmYWxzZTtcclxuICAgICAgICBjb25zdCBwYXRpZW50SWQgPSB0aGlzLmFjdGl2YXRlZFJvdXRlLnNuYXBzaG90LnBhcmFtTWFwLmdldCgncGF0aWVudElkJyk7XHJcblxyXG4gICAgICAgIHRoaXMuYmlvbWV0cmljU2VydmljZS5nZXRQYXRpZW50KHBhdGllbnRJZCkuc3Vic2NyaWJlKChyZXMpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wYXRpZW50ID0gcmVzO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5iaW9tZXRyaWNTZXJ2aWNlLmZpbmRCeVBhdGllbnQodGhpcy5wYXRpZW50LmlkKS5zdWJzY3JpYmUoKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5ib2R5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iaW9tZXRyaWNzID0gcmVzLmJvZHk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maW5nZXJzID0gdGhpcy5maW5nZXJzLmZpbHRlcihmID0+ICF0aGlzLmJpb21ldHJpY3MubWFwKGIgPT4gYi50ZW1wbGF0ZVR5cGUpLmluY2x1ZGVzKGYpKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmJpb21ldHJpY1NlcnZpY2UuZ2V0UmVhZGVycygpLnN1YnNjcmliZShyZXMgPT4gdGhpcy5yZWFkZXJzID0gcmVzKTtcclxuICAgIH1cclxuXHJcbiAgICBlbnJvbGwoKSB7XHJcbiAgICAgICAgY29uc3QgZGlhbG9nUmVmID0gdGhpcy5fZGlhbG9nU2VydmljZS5vcGVuQWxlcnQoe1xyXG4gICAgICAgICAgICBtZXNzYWdlOiBgUGxlYXNlIHB1dCB5b3VyICR7dGhpcy5maW5nZXIudG9TdHJpbmcoKX0gb24gdGhlIHNjYW5uZXIuYCxcclxuICAgICAgICAgICAgdGl0bGU6ICdFbnJvbGwgZmluZ2VyJyxcclxuICAgICAgICAgICAgZGlzYWJsZUNsb3NlOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5iaW9tZXRyaWNTZXJ2aWNlLmlkZW50aWZ5KHRoaXMucmVhZGVyLmlkKS5zdWJzY3JpYmUocmVzID0+IHtcclxuICAgICAgICAgICAgZGlhbG9nUmVmLmNsb3NlKCk7XHJcbiAgICAgICAgICAgIGlmIChyZXMubWVzc2FnZSA9PT0gJ1BBVElFTlRfTk9UX0lERU5USUZJRUQnKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBiaW9tZXRyaWM6IEJpb21ldHJpYyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRlOiBtb21lbnQoKSxcclxuICAgICAgICAgICAgICAgICAgICBmYWNpbGl0eTogdGhpcy5wYXRpZW50LmZhY2lsaXR5LFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdGllbnQ6IHRoaXMucGF0aWVudCxcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogcmVzLnRlbXBsYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVHlwZTogdGhpcy5maW5nZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgYmlvbWV0cmljVHlwZTogJ0ZJTkdFUlBSSU5UJ1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJpb21ldHJpY3MgPSB0aGlzLmJpb21ldHJpY3MuZmlsdGVyKGIgPT4gYi50ZW1wbGF0ZVR5cGUgIT09IHRoaXMuZmluZ2VyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmlvbWV0cmljcy5wdXNoKGJpb21ldHJpYyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGlhbG9nU2VydmljZS5vcGVuQWxlcnQoe1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGBGaW5nZXIgJHt0aGlzLmZpbmdlci50b1N0cmluZygpfSBzdWNjZXNzZnVsbHkgZW5yb2xsZWQuYCxcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ0Vucm9sbG1lbnQgc3VjY2VzcydcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gJ1BsZWFzZSByZW1lbWJlciB0byBjbGljayBcXCdTYXZlIEVucm9sbG1lbnRcXCcgd2hlbiB0aHJvdWdoIGVucm9sbGluZyBhbGwgZmluZ2Vycyc7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLm1lc3NhZ2UgPT09ICdQQVRJRU5UX0lERU5USUZJRUQnKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmaW5nZXJJZCA9IHJlcy5pZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmlvbWV0cmljU2VydmljZS5nZXRCaW9tZXRyaWMoZmluZ2VySWQpLnN1YnNjcmliZShyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RpYWxvZ1NlcnZpY2Uub3BlbkFsZXJ0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogYEZpbmdlciBhbHJlYWR5IGVucm9sbGVkIGJ5IHBhdGllbnQgJHtyZXMucGF0aWVudC5zdXJuYW1lfSwgJHtyZXMucGF0aWVudC5vdGhlck5hbWVzfSAoJHtyZXMucGF0aWVudC5ob3NwaXRhbE51bX0pYCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdFbnJvbGxtZW50IGVycm9yJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGlhbG9nU2VydmljZS5vcGVuQWxlcnQoe1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdUaGVyZSB3YXMgYW4gZXJyb3IgZW5yb2xsaW5nIGZpbmdlciwgcGxlYXNlIHRyeSBhZ2FpbicsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdFbnJvbGxtZW50IGVycm9yJ1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZpbmdlclRvU3RyaW5nKGZpbmdlcjogRmluZ2VyKSB7XHJcbiAgICAgICAgY29uc3QgZmluZ2VycyA9IHtcclxuICAgICAgICAgICAgUklHSFRfSU5ERVhfRklOR0VSOiAnUmlnaHQgSW5kZXggRmluZ2VyJyxcclxuICAgICAgICAgICAgTEVGVF9JTkRFWF9GSU5HRVI6ICdMZWZ0IEluZGV4IEZpbmdlcicsXHJcbiAgICAgICAgICAgIFJJR0hUX1RIVU1COiAnUmlnaHQgVGh1bWInLFxyXG4gICAgICAgICAgICBMRUZUX1RIVU1COiAnTGVmdCBUaHVtYicsXHJcbiAgICAgICAgICAgIFJJR0hUX01JRERMRV9GSU5HRVI6ICdSaWdodCBNaWRkbGUgRmluZ2VyJyxcclxuICAgICAgICAgICAgTEVGVF9NSURETEVfRklOR0VSOiAnTGVmdCBNaWRkbGUgRmluZ2VyJ1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIGZpbmdlcnNbZmluZ2VyXVxyXG4gICAgfVxyXG5cclxuICAgIHByZXZpb3VzU3RhdGUoKSB7XHJcbiAgICAgICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gICAgfVxyXG5cclxuICAgIHNhdmUoKSB7XHJcbiAgICAgICAgdGhpcy5hcHBMb2FkZXJTZXJ2aWNlLm9wZW4oJ1NhdmluZyB2aXNpdC4uLicpO1xyXG4gICAgICAgIHRoaXMuaXNTYXZpbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaWJlVG9TYXZlUmVzcG9uc2UodGhpcy5iaW9tZXRyaWNTZXJ2aWNlLnNhdmVUZW1wbGF0ZXModGhpcy5iaW9tZXRyaWNzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdWJzY3JpYmVUb1NhdmVSZXNwb25zZShyZXN1bHQ6IE9ic2VydmFibGU8SHR0cFJlc3BvbnNlPGFueT4+KSB7XHJcbiAgICAgICAgcmVzdWx0LnN1YnNjcmliZShcclxuICAgICAgICAgICAgKHJlczogSHR0cFJlc3BvbnNlPGFueT4pID0+IHRoaXMub25TYXZlU3VjY2VzcyhyZXMuYm9keSksXHJcbiAgICAgICAgICAgIChyZXM6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFwcExvYWRlclNlcnZpY2UuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMub25TYXZlRXJyb3IoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMub25FcnJvcihyZXMubWVzc2FnZSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblNhdmVTdWNjZXNzKHJlc3VsdDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5hcHBMb2FkZXJTZXJ2aWNlLmNsb3NlKCk7XHJcbiAgICAgICAgdGhpcy5pc1NhdmluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9uLnNob3dJbmZvKCdGaW5nZXJwcmludHMgc3VjY2Vzc2Z1bGx5IHNhdmVkJyk7XHJcbiAgICAgICAgdGhpcy5wcmV2aW91c1N0YXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblNhdmVFcnJvcigpIHtcclxuICAgICAgICB0aGlzLmlzU2F2aW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5lcnJvciA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5ub3RpZmljYXRpb24uc2hvd0Vycm9yKCdFcnJvciBzYXZpbmcgZW5yb2xsaW5nIGZpbmdlcnByaW50cycpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkVycm9yKGVycm9yTWVzc2FnZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5pc1NhdmluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9uLnNob3dFcnJvcihlcnJvck1lc3NhZ2UpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==
