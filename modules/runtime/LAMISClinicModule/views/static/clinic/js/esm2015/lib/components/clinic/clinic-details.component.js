import * as tslib_1 from "tslib";
import { Component, ComponentFactoryResolver, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClinicService } from '../../services/clinic.service';
import { TdDialogService } from '@covalent/core';
import { CardViewBoolItemModel, CardViewDateItemModel, CardViewFloatItemModel, CardViewIntItemModel, CardViewItem, CardViewTextItemModel, NotificationService } from '@alfresco/adf-core';
import * as moment_ from 'moment';
const moment = moment_;
let ClinicDetailsComponent = class ClinicDetailsComponent {
    constructor(router, route, clinicService, cfr, _dialogService, notificationService) {
        this.router = router;
        this.route = route;
        this.clinicService = clinicService;
        this.cfr = cfr;
        this._dialogService = _dialogService;
        this.notificationService = notificationService;
        this.properties = [];
    }
    ngOnInit() {
        this.route.data.subscribe(({ entity }) => {
            this.entity = !!entity && entity.body ? entity.body : entity;
            const patientId = this.route.snapshot.paramMap.get('patientId');
            this.clinicService.getPatient(patientId).subscribe((res) => this.entity.patient = res);
            this.buildProperties();
        });
    }
    edit() {
        this.router.navigate(['/', 'clinics', this.entity.uuid, 'patient', this.entity.patient.uuid, 'edit']);
    }
    delete() {
        this._dialogService.openConfirm({
            title: 'Confirm',
            message: 'Do you want to delete this clinic visit, action cannot be reversed?',
            cancelButton: 'No',
            acceptButton: 'Yes',
            width: '500px',
        }).afterClosed().subscribe((accept) => {
            if (accept) {
                this.clinicService.delete(this.entity.id).subscribe((res) => {
                    if (res.ok) {
                        this.router.navigate(['patients']);
                    }
                    else {
                        this.notificationService.showError('Error deleting visit, please try again');
                    }
                });
            }
            else {
                // DO SOMETHING ELSE
            }
        });
    }
    buildProperties() {
        this.properties.push(new CardViewDateItemModel({
            key: 'ds',
            value: this.entity.dateVisit,
            label: this.entity.commence ? 'ART Start Date' : 'Date Visit',
            format: 'dd MMM, yyyy'
        }));
        if (this.entity.commence) {
            this.properties.push(new CardViewIntItemModel({
                label: 'CD4 at start of ART',
                key: 'cd4',
                value: this.entity.cd4p || null
            }));
            this.properties.push(new CardViewFloatItemModel({
                label: 'CD4%',
                key: 'cd4p',
                value: this.entity.cd4p || null
            }));
            this.properties.push(new CardViewTextItemModel({
                label: 'Original Regimen Line',
                key: 'rl',
                value: this.entity.regimenType != null ? this.entity.regimenType.description : ''
            }));
            this.properties.push(new CardViewTextItemModel({
                label: 'Original Regimen',
                key: 'rl',
                value: this.entity.regimen != null ? this.entity.regimen.description : ''
            }));
        }
        if (this.entity.extra && this.entity.patient.extra.prep && this.entity.patient.extra.prep.registered) {
            if (this.entity.commence) {
                this.properties.push(new CardViewTextItemModel({
                    label: 'HIV Status at PrEP Initiation',
                    key: 'cs',
                    value: this.entity.extra.prep.hivTestResult
                }));
                this.properties.push(new CardViewTextItemModel({
                    label: 'Creatinine Clearance (mL/min)',
                    key: 'cs',
                    value: this.entity.extra.prep.creatinineClearance
                }));
                this.properties.push(new CardViewTextItemModel({
                    label: 'Urinalysis',
                    key: 'cs',
                    value: this.entity.extra.prep.urinalysis
                }));
                this.properties.push(new CardViewTextItemModel({
                    label: 'Hepatitis B Screening',
                    key: 'cs',
                    value: this.entity.extra.prep.hepatitisB
                }));
                this.properties.push(new CardViewTextItemModel({
                    label: 'Hepatitis C Screening',
                    key: 'cs',
                    value: this.entity.extra.prep.hepatitisC
                }));
            }
            else {
                this.properties.push(new CardViewTextItemModel({
                    label: 'HIV Status /Test Result',
                    key: 'cs',
                    value: this.entity.extra.prep.hivTestResult
                }));
            }
        }
        if (this.entity.extra && this.entity.extra.otz && this.entity.extra.otz.dateEnrolledOnOTZ) {
            this.properties.push(new CardViewDateItemModel({
                key: 'ds',
                value: moment(this.entity.extra.dateEnrolledOnOTZ),
                label: 'Date Enrolled on OTZ',
                format: 'dd MMM, yyyy'
            }));
        }
        this.properties.push(new CardViewTextItemModel({
            label: 'Clinical Stage',
            key: 'cs',
            value: this.entity.clinicStage
        }));
        this.properties.push(new CardViewTextItemModel({
            label: 'Functional Status',
            key: 'fs',
            value: this.entity.funcStatus
        }));
        this.properties.push(new CardViewTextItemModel({
            label: 'TB Status',
            key: 'ts',
            value: this.entity.tbStatus
        }));
        this.properties.push(new CardViewFloatItemModel({
            label: 'Body Weight(Kg)',
            key: 'bw',
            value: this.entity.bodyWeight || null
        }));
        this.properties.push(new CardViewFloatItemModel({
            label: 'Height(m)',
            key: 'h',
            value: this.entity.height || null
        }));
        this.properties.push(new CardViewTextItemModel({
            label: 'Blood Pressure',
            key: 'cd4p',
            value: this.entity.bp
        }));
        if (this.entity.patient.gender === 'Female') {
            this.properties.push(new CardViewBoolItemModel({
                label: 'Pregnant',
                key: 'pg',
                value: this.entity.pregnant
            }));
            this.properties.push(new CardViewBoolItemModel({
                label: 'Breastfeeding',
                key: 'bf',
                value: this.entity.breastfeeding
            }));
            this.properties.push(new CardViewDateItemModel({
                key: 'lpm',
                value: this.entity.lmp,
                label: 'LMP',
                format: 'dd MMM, yyyy'
            }));
        }
        this.properties.push(new CardViewTextItemModel({
            label: 'Level of Adherence',
            key: 'ts',
            value: this.entity.tbStatus
        }));
        if (this.entity.extra && this.entity.extra.otz && this.entity.extra.otz.dateLastOTZMeeting) {
            this.properties.push(new CardViewDateItemModel({
                key: 'ds',
                value: moment(this.entity.extra.dateLastOTZMeeting),
                label: 'Date of Last OTZ Meeting',
                format: 'dd MMM, yyyy'
            }));
        }
        this.properties.push(new CardViewDateItemModel({
            key: 'na',
            value: this.entity.nextAppointment,
            label: 'Next Appointment Date',
            format: 'dd MMM, yyyy'
        }));
    }
    previousState() {
        window.history.back();
    }
    ngOnDestroy() {
    }
};
ClinicDetailsComponent.ctorParameters = () => [
    { type: Router },
    { type: ActivatedRoute },
    { type: ClinicService },
    { type: ComponentFactoryResolver },
    { type: TdDialogService },
    { type: NotificationService }
];
ClinicDetailsComponent = tslib_1.__decorate([
    Component({
        selector: 'lamis-clinic',
        template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <mat-card>\n            <mat-card-header>\n            </mat-card-header>\n            <mat-card-content>\n                <adf-card-view [properties]=\"properties\" editable=\"false\"></adf-card-view>\n            </mat-card-content>\n            <mat-card-actions class=\"lamis-edit-form-actions\">\n                <button mat-button (click)=\"previousState()\">Back</button>\n                <button mat-raised-button color=\"warn\" (click)=\"delete()\">Delete</button>\n                <button mat-raised-button color=\"primary\" (click)=\"edit()\">Edit</button>\n            </mat-card-actions>\n        </mat-card>\n    </div>\n</div>\n"
    }),
    tslib_1.__metadata("design:paramtypes", [Router, ActivatedRoute, ClinicService,
        ComponentFactoryResolver, TdDialogService,
        NotificationService])
], ClinicDetailsComponent);
export { ClinicDetailsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpbmljLWRldGFpbHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGFtaXMtY2xpbmljLTEuNC4wLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvY2xpbmljL2NsaW5pYy1kZXRhaWxzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSx3QkFBd0IsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXJGLE9BQU8sRUFBQyxjQUFjLEVBQUUsTUFBTSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDdkQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQzVELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMvQyxPQUFPLEVBQ0gscUJBQXFCLEVBQ3JCLHFCQUFxQixFQUNyQixzQkFBc0IsRUFDdEIsb0JBQW9CLEVBQ3BCLFlBQVksRUFDWixxQkFBcUIsRUFDckIsbUJBQW1CLEVBQ3RCLE1BQU0sb0JBQW9CLENBQUM7QUFFNUIsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFFbEMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDO0FBTXZCLElBQWEsc0JBQXNCLEdBQW5DLE1BQWEsc0JBQXNCO0lBSS9CLFlBQW9CLE1BQWMsRUFBVSxLQUFxQixFQUFVLGFBQTRCLEVBQ25GLEdBQTZCLEVBQVUsY0FBK0IsRUFDdEUsbUJBQXdDO1FBRnhDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQ25GLFFBQUcsR0FBSCxHQUFHLENBQTBCO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWlCO1FBQ3RFLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFMNUQsZUFBVSxHQUFtQixFQUFFLENBQUM7SUFNaEMsQ0FBQztJQUVELFFBQVE7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OztZQTNMK0IsTUFBTTtZQUFpQixjQUFjO1lBQXlCLGFBQWE7WUFDOUUsd0JBQXdCO1lBQTBCLGVBQWU7WUFDakQsbUJBQW1COztBQU5uRCxzQkFBc0I7SUFKbEMsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLGNBQWM7UUFDeEIsdXVCQUE4QztLQUNqRCxDQUFDOzZDQUs4QixNQUFNLEVBQWlCLGNBQWMsRUFBeUIsYUFBYTtRQUM5RSx3QkFBd0IsRUFBMEIsZUFBZTtRQUNqRCxtQkFBbUI7R0FObkQsc0JBQXNCLENBK0xsQztTQS9MWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBPbkRlc3Ryb3ksIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NsaW5pY30gZnJvbSAnLi4vLi4vbW9kZWwvY2xpbmljLm1vZGVsJztcbmltcG9ydCB7QWN0aXZhdGVkUm91dGUsIFJvdXRlcn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7Q2xpbmljU2VydmljZX0gZnJvbSAnLi4vLi4vc2VydmljZXMvY2xpbmljLnNlcnZpY2UnO1xuaW1wb3J0IHtUZERpYWxvZ1NlcnZpY2V9IGZyb20gJ0Bjb3ZhbGVudC9jb3JlJztcbmltcG9ydCB7XG4gICAgQ2FyZFZpZXdCb29sSXRlbU1vZGVsLFxuICAgIENhcmRWaWV3RGF0ZUl0ZW1Nb2RlbCxcbiAgICBDYXJkVmlld0Zsb2F0SXRlbU1vZGVsLFxuICAgIENhcmRWaWV3SW50SXRlbU1vZGVsLFxuICAgIENhcmRWaWV3SXRlbSxcbiAgICBDYXJkVmlld1RleHRJdGVtTW9kZWwsXG4gICAgTm90aWZpY2F0aW9uU2VydmljZVxufSBmcm9tICdAYWxmcmVzY28vYWRmLWNvcmUnO1xuXG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XG5cbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbGFtaXMtY2xpbmljJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY2xpbmljLWRldGFpbHMuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIENsaW5pY0RldGFpbHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgcHJvcGVydGllczogQ2FyZFZpZXdJdGVtW10gPSBbXTtcbiAgICBlbnRpdHk6IENsaW5pYztcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIGNsaW5pY1NlcnZpY2U6IENsaW5pY1NlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBjZnI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgcHJpdmF0ZSBfZGlhbG9nU2VydmljZTogVGREaWFsb2dTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgbm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnJvdXRlLmRhdGEuc3Vic2NyaWJlKCh7ZW50aXR5fSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5lbnRpdHkgPSAhIWVudGl0eSAmJiBlbnRpdHkuYm9keSA/IGVudGl0eS5ib2R5IDogZW50aXR5O1xuICAgICAgICAgICAgY29uc3QgcGF0aWVudElkID0gdGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbU1hcC5nZXQoJ3BhdGllbnRJZCcpO1xuICAgICAgICAgICAgdGhpcy5jbGluaWNTZXJ2aWNlLmdldFBhdGllbnQocGF0aWVudElkKS5zdWJzY3JpYmUoKHJlcykgPT4gdGhpcy5lbnRpdHkucGF0aWVudCA9IHJlcyk7XG4gICAgICAgICAgICB0aGlzLmJ1aWxkUHJvcGVydGllcygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBlZGl0KCkge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy8nLCAnY2xpbmljcycsIHRoaXMuZW50aXR5LnV1aWQsICdwYXRpZW50JywgdGhpcy5lbnRpdHkucGF0aWVudC51dWlkLCAnZWRpdCddKTtcbiAgICB9XG5cbiAgICBkZWxldGUoKSB7XG4gICAgICAgIHRoaXMuX2RpYWxvZ1NlcnZpY2Uub3BlbkNvbmZpcm0oe1xuICAgICAgICAgICAgdGl0bGU6ICdDb25maXJtJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdEbyB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBjbGluaWMgdmlzaXQsIGFjdGlvbiBjYW5ub3QgYmUgcmV2ZXJzZWQ/JyxcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvbjogJ05vJyxcbiAgICAgICAgICAgIGFjY2VwdEJ1dHRvbjogJ1llcycsXG4gICAgICAgICAgICB3aWR0aDogJzUwMHB4JyxcbiAgICAgICAgfSkuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUoKGFjY2VwdDogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgaWYgKGFjY2VwdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xpbmljU2VydmljZS5kZWxldGUodGhpcy5lbnRpdHkuaWQpLnN1YnNjcmliZSgocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsncGF0aWVudHMnXSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc2hvd0Vycm9yKCdFcnJvciBkZWxldGluZyB2aXNpdCwgcGxlYXNlIHRyeSBhZ2FpbicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIERPIFNPTUVUSElORyBFTFNFXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGJ1aWxkUHJvcGVydGllcygpIHtcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3RGF0ZUl0ZW1Nb2RlbCh7XG4gICAgICAgICAgICBrZXk6ICdkcycsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5lbnRpdHkuZGF0ZVZpc2l0LFxuICAgICAgICAgICAgbGFiZWw6IHRoaXMuZW50aXR5LmNvbW1lbmNlID8gJ0FSVCBTdGFydCBEYXRlJyA6ICdEYXRlIFZpc2l0JyxcbiAgICAgICAgICAgIGZvcm1hdDogJ2RkIE1NTSwgeXl5eSdcbiAgICAgICAgfSkpO1xuICAgICAgICBpZiAodGhpcy5lbnRpdHkuY29tbWVuY2UpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld0ludEl0ZW1Nb2RlbCh7XG4gICAgICAgICAgICAgICAgbGFiZWw6ICdDRDQgYXQgc3RhcnQgb2YgQVJUJyxcbiAgICAgICAgICAgICAgICBrZXk6ICdjZDQnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLmVudGl0eS5jZDRwIHx8IG51bGxcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIHRoaXMucHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld0Zsb2F0SXRlbU1vZGVsKHtcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0NENCUnLFxuICAgICAgICAgICAgICAgIGtleTogJ2NkNHAnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLmVudGl0eS5jZDRwIHx8IG51bGxcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIHRoaXMucHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld1RleHRJdGVtTW9kZWwoe1xuICAgICAgICAgICAgICAgIGxhYmVsOiAnT3JpZ2luYWwgUmVnaW1lbiBMaW5lJyxcbiAgICAgICAgICAgICAgICBrZXk6ICdybCcsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuZW50aXR5LnJlZ2ltZW5UeXBlICE9IG51bGwgPyB0aGlzLmVudGl0eS5yZWdpbWVuVHlwZS5kZXNjcmlwdGlvbiA6ICcnXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdUZXh0SXRlbU1vZGVsKHtcbiAgICAgICAgICAgICAgICBsYWJlbDogJ09yaWdpbmFsIFJlZ2ltZW4nLFxuICAgICAgICAgICAgICAgIGtleTogJ3JsJyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5lbnRpdHkucmVnaW1lbiAhPSBudWxsID8gdGhpcy5lbnRpdHkucmVnaW1lbi5kZXNjcmlwdGlvbiA6ICcnXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZW50aXR5LmV4dHJhICYmIHRoaXMuZW50aXR5LnBhdGllbnQuZXh0cmEucHJlcCAmJiB0aGlzLmVudGl0eS5wYXRpZW50LmV4dHJhLnByZXAucmVnaXN0ZXJlZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZW50aXR5LmNvbW1lbmNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3VGV4dEl0ZW1Nb2RlbCh7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnSElWIFN0YXR1cyBhdCBQckVQIEluaXRpYXRpb24nLFxuICAgICAgICAgICAgICAgICAgICBrZXk6ICdjcycsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLmVudGl0eS5leHRyYS5wcmVwLmhpdlRlc3RSZXN1bHRcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3VGV4dEl0ZW1Nb2RlbCh7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnQ3JlYXRpbmluZSBDbGVhcmFuY2UgKG1ML21pbiknLFxuICAgICAgICAgICAgICAgICAgICBrZXk6ICdjcycsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLmVudGl0eS5leHRyYS5wcmVwLmNyZWF0aW5pbmVDbGVhcmFuY2VcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3VGV4dEl0ZW1Nb2RlbCh7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnVXJpbmFseXNpcycsXG4gICAgICAgICAgICAgICAgICAgIGtleTogJ2NzJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuZW50aXR5LmV4dHJhLnByZXAudXJpbmFseXNpc1xuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdUZXh0SXRlbU1vZGVsKHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdIZXBhdGl0aXMgQiBTY3JlZW5pbmcnLFxuICAgICAgICAgICAgICAgICAgICBrZXk6ICdjcycsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLmVudGl0eS5leHRyYS5wcmVwLmhlcGF0aXRpc0JcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3VGV4dEl0ZW1Nb2RlbCh7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnSGVwYXRpdGlzIEMgU2NyZWVuaW5nJyxcbiAgICAgICAgICAgICAgICAgICAga2V5OiAnY3MnLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5lbnRpdHkuZXh0cmEucHJlcC5oZXBhdGl0aXNDXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdUZXh0SXRlbU1vZGVsKHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdISVYgU3RhdHVzIC9UZXN0IFJlc3VsdCcsXG4gICAgICAgICAgICAgICAgICAgIGtleTogJ2NzJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuZW50aXR5LmV4dHJhLnByZXAuaGl2VGVzdFJlc3VsdFxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5lbnRpdHkuZXh0cmEgJiYgdGhpcy5lbnRpdHkuZXh0cmEub3R6ICYmIHRoaXMuZW50aXR5LmV4dHJhLm90ei5kYXRlRW5yb2xsZWRPbk9UWikge1xuICAgICAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3RGF0ZUl0ZW1Nb2RlbCh7XG4gICAgICAgICAgICAgICAga2V5OiAnZHMnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBtb21lbnQodGhpcy5lbnRpdHkuZXh0cmEuZGF0ZUVucm9sbGVkT25PVFopLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnRGF0ZSBFbnJvbGxlZCBvbiBPVFonLFxuICAgICAgICAgICAgICAgIGZvcm1hdDogJ2RkIE1NTSwgeXl5eSdcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdUZXh0SXRlbU1vZGVsKHtcbiAgICAgICAgICAgIGxhYmVsOiAnQ2xpbmljYWwgU3RhZ2UnLFxuICAgICAgICAgICAga2V5OiAnY3MnLFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMuZW50aXR5LmNsaW5pY1N0YWdlXG4gICAgICAgIH0pKTtcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3VGV4dEl0ZW1Nb2RlbCh7XG4gICAgICAgICAgICBsYWJlbDogJ0Z1bmN0aW9uYWwgU3RhdHVzJyxcbiAgICAgICAgICAgIGtleTogJ2ZzJyxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLmVudGl0eS5mdW5jU3RhdHVzXG4gICAgICAgIH0pKTtcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3VGV4dEl0ZW1Nb2RlbCh7XG4gICAgICAgICAgICBsYWJlbDogJ1RCIFN0YXR1cycsXG4gICAgICAgICAgICBrZXk6ICd0cycsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5lbnRpdHkudGJTdGF0dXNcbiAgICAgICAgfSkpO1xuICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdGbG9hdEl0ZW1Nb2RlbCh7XG4gICAgICAgICAgICBsYWJlbDogJ0JvZHkgV2VpZ2h0KEtnKScsXG4gICAgICAgICAgICBrZXk6ICdidycsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5lbnRpdHkuYm9keVdlaWdodCB8fCBudWxsXG4gICAgICAgIH0pKTtcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3RmxvYXRJdGVtTW9kZWwoe1xuICAgICAgICAgICAgbGFiZWw6ICdIZWlnaHQobSknLFxuICAgICAgICAgICAga2V5OiAnaCcsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5lbnRpdHkuaGVpZ2h0IHx8IG51bGxcbiAgICAgICAgfSkpO1xuICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdUZXh0SXRlbU1vZGVsKHtcbiAgICAgICAgICAgIGxhYmVsOiAnQmxvb2QgUHJlc3N1cmUnLFxuICAgICAgICAgICAga2V5OiAnY2Q0cCcsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5lbnRpdHkuYnBcbiAgICAgICAgfSkpO1xuICAgICAgICBpZiAodGhpcy5lbnRpdHkucGF0aWVudC5nZW5kZXIgPT09ICdGZW1hbGUnKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdCb29sSXRlbU1vZGVsKHtcbiAgICAgICAgICAgICAgICBsYWJlbDogJ1ByZWduYW50JyxcbiAgICAgICAgICAgICAgICBrZXk6ICdwZycsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuZW50aXR5LnByZWduYW50XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdCb29sSXRlbU1vZGVsKHtcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0JyZWFzdGZlZWRpbmcnLFxuICAgICAgICAgICAgICAgIGtleTogJ2JmJyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5lbnRpdHkuYnJlYXN0ZmVlZGluZ1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3RGF0ZUl0ZW1Nb2RlbCh7XG4gICAgICAgICAgICAgICAga2V5OiAnbHBtJyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5lbnRpdHkubG1wLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnTE1QJyxcbiAgICAgICAgICAgICAgICBmb3JtYXQ6ICdkZCBNTU0sIHl5eXknXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3VGV4dEl0ZW1Nb2RlbCh7XG4gICAgICAgICAgICBsYWJlbDogJ0xldmVsIG9mIEFkaGVyZW5jZScsXG4gICAgICAgICAgICBrZXk6ICd0cycsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5lbnRpdHkudGJTdGF0dXNcbiAgICAgICAgfSkpO1xuICAgICAgICBpZiAodGhpcy5lbnRpdHkuZXh0cmEgJiYgdGhpcy5lbnRpdHkuZXh0cmEub3R6ICYmIHRoaXMuZW50aXR5LmV4dHJhLm90ei5kYXRlTGFzdE9UWk1lZXRpbmcpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld0RhdGVJdGVtTW9kZWwoe1xuICAgICAgICAgICAgICAgIGtleTogJ2RzJyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogbW9tZW50KHRoaXMuZW50aXR5LmV4dHJhLmRhdGVMYXN0T1RaTWVldGluZyksXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdEYXRlIG9mIExhc3QgT1RaIE1lZXRpbmcnLFxuICAgICAgICAgICAgICAgIGZvcm1hdDogJ2RkIE1NTSwgeXl5eSdcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdEYXRlSXRlbU1vZGVsKHtcbiAgICAgICAgICAgIGtleTogJ25hJyxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLmVudGl0eS5uZXh0QXBwb2ludG1lbnQsXG4gICAgICAgICAgICBsYWJlbDogJ05leHQgQXBwb2ludG1lbnQgRGF0ZScsXG4gICAgICAgICAgICBmb3JtYXQ6ICdkZCBNTU0sIHl5eXknXG4gICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBwcmV2aW91c1N0YXRlKCkge1xuICAgICAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25EZXN0cm95KCkge1xuICAgIH1cbn1cbiJdfQ==