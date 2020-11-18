import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PharmacyService } from '../services/pharmacy.service';
import { TdDialogService } from '@covalent/core';
import { CardViewBoolItemModel, CardViewDateItemModel, CardViewIntItemModel, CardViewItem, CardViewTextItemModel, NotificationService } from '@alfresco/adf-core';
import { IPT_TYPE } from './pharmacy-edit.component';
import * as moment_ from 'moment';
import { ColumnMode } from '@swimlane/ngx-datatable';
const moment = moment_;
let PharmacyDetailsComponent = class PharmacyDetailsComponent {
    constructor(router, route, pharmacyService, _dialogService, notificationService) {
        this.router = router;
        this.route = route;
        this.pharmacyService = pharmacyService;
        this._dialogService = _dialogService;
        this.notificationService = notificationService;
        this.properties = [];
        this.ColumnMode = ColumnMode;
    }
    ngOnInit() {
        this.route.data.subscribe(({ entity }) => {
            this.entity = !!entity && entity.body ? entity.body : entity;
            const patientId = this.route.snapshot.paramMap.get('patientId');
            this.pharmacyService.getPatient(patientId).subscribe((res) => this.entity.patient = res);
            this.buildProperties();
        });
    }
    edit() {
        this.router.navigate(['/', 'pharmacies', this.entity.uuid, 'patient', this.entity.patient.uuid, 'edit']);
    }
    delete() {
        this._dialogService.openConfirm({
            title: 'Confirm',
            message: 'Do you want to delete this pharmacy refill, action cannot be reversed?',
            cancelButton: 'No',
            acceptButton: 'Yes',
            width: '500px',
        }).afterClosed().subscribe((accept) => {
            if (accept) {
                this.pharmacyService.delete(this.entity.id).subscribe((res) => {
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
            label: 'Date of Dispensing',
            format: 'dd MMM, yyyy'
        }));
        /*this.pharmacyService.getLinesByPharmacy(this.entity.id)
            .subscribe(res => {
                this.dataSource = res;
                this.properties.push(new CardViewIntItemModel({
                    label: 'Refill Period (days)',
                    key: 'cs',
                    value: res.map(r => r.duration)
                        .sort((r1, r2) => r1 - r2)
                        .pop()
                }));
            });*/
        this.dataSource = [...this.entity.lines.map(r => {
                r.morning = r.morning || 0;
                r.afternoon = r.afternoon || 0;
                r.evening = r.evening || 0;
                r.quantity = ((r.morning) + (r.afternoon) + (r.evening)) * r.duration;
                this.pharmacyService.getDrugsByRegimen(r.regimen_id).subscribe((res) => {
                    r.description = res.find(d => d.regimenDrug.id === r.regimen_drug_id).drug.name;
                });
                return r;
            })];
        this.dataSource = [...this.dataSource];
        this.properties.push(new CardViewIntItemModel({
            label: 'Refill Period (days)',
            key: 'cs',
            value: this.entity.lines.map(r => r.duration)
                .sort((r1, r2) => r1 - r2)
                .pop()
        }));
        this.properties.push(new CardViewDateItemModel({
            key: 'na',
            value: this.entity.nextAppointment,
            label: 'Next Pharmacy Refill',
            format: 'dd MMM, yyyy'
        }));
        this.properties.push(new CardViewTextItemModel({
            label: 'MMD Type',
            key: 'fs',
            value: this.entity.mmdType
        }));
        this.properties.push(new CardViewBoolItemModel({
            label: 'Adverse Drug Reactions',
            key: 'adr',
            value: this.entity.adrScreened
        }));
        this.properties.push(new CardViewBoolItemModel({
            label: 'Prescription error',
            key: 'bw',
            value: this.entity.prescriptionError
        }));
        this.pharmacyService.regimenInfo(this.entity.patient.id)
            .subscribe((res) => {
            this.properties.push(new CardViewTextItemModel({
                label: 'Regimen Line',
                key: 'cs',
                value: res.regimenType
            }));
            this.properties.push(new CardViewTextItemModel({
                label: 'Regimen',
                key: 'ts',
                value: res.regimen
            }));
        });
        if (this.entity.extra && this.entity.extra.ipt) {
            this.properties.push(new CardViewTextItemModel({
                label: 'IPT Type',
                key: 'fs',
                value: IPT_TYPE[this.entity.extra.ipt.type]
            }));
            if (this.entity.extra.ipt.dateCompleted) {
                this.properties.push(new CardViewDateItemModel({
                    key: 'na',
                    value: moment(this.entity.extra.ipt.dateCompleted),
                    label: 'Date of Completion',
                    format: 'dd MMM, yyyy'
                }));
            }
        }
    }
    previousState() {
        window.history.back();
    }
    ngOnDestroy() {
    }
};
PharmacyDetailsComponent.ctorParameters = () => [
    { type: Router },
    { type: ActivatedRoute },
    { type: PharmacyService },
    { type: TdDialogService },
    { type: NotificationService }
];
PharmacyDetailsComponent = tslib_1.__decorate([
    Component({
        selector: 'lamis-pharmacy',
        template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <mat-card>\n            <mat-card-header>\n            </mat-card-header>\n            <mat-card-content>\n                <adf-card-view [properties]=\"properties\" editable=\"false\"></adf-card-view>\n                <mat-divider></mat-divider>\n                <ngx-datatable\n                    #mydatatable\n                    *ngIf=\"dataSource\"\n                    class=\"material\"\n                    [headerHeight]=\"50\"\n                    [limit]=\"8\"\n                    [columnMode]=\"ColumnMode.force\"\n                    [footerHeight]=\"50\"\n                    rowHeight=\"auto\"\n                    [rows]=\"dataSource\"\n                >\n                    <ngx-datatable-column name=\"Description\" [prop]=\"'description'\">\n                        <ng-template ngx-datatable-cell-template let-value=\"value\">\n                            <mat-form-field>\n                                <input matInput disabled [value]=\"value\" style=\"font-weight: 900\">\n                            </mat-form-field>\n                        </ng-template>\n                    </ngx-datatable-column>\n                    <ngx-datatable-column name=\"Morning\" [prop]=\"'morning'\">\n                        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\"\n                                     let-row=\"row\">\n                            <mat-form-field>\n                                <input matInput disabled [value]=\"value\" style=\"font-weight: 900\">\n                            </mat-form-field>\n                        </ng-template>\n                    </ngx-datatable-column>\n                    <ngx-datatable-column name=\"Afternoon\" [prop]=\"'afternoon'\">\n                        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\"\n                                     let-row=\"row\">\n                            <mat-form-field>\n                                <input matInput disabled [value]=\"value\" style=\"font-weight: 900\">\n                            </mat-form-field>\n                        </ng-template>\n                    </ngx-datatable-column>\n                    <ngx-datatable-column name=\"Evening\" [prop]=\"'evening'\">\n                        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\"\n                                     let-row=\"row\">\n                            <mat-form-field>\n                                <input matInput disabled [value]=\"value\" style=\"font-weight: 900\">\n                            </mat-form-field>\n                        </ng-template>\n                    </ngx-datatable-column>\n                    <ngx-datatable-column name=\"Duration\" [prop]=\"'duration'\">\n                        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\"\n                                     let-row=\"row\">\n                            <mat-form-field>\n                                <input matInput disabled [value]=\"value\" style=\"font-weight: 900\">\n                            </mat-form-field>\n                        </ng-template>\n                    </ngx-datatable-column>\n                    <ngx-datatable-column name=\"Quantity\" [prop]=\"'quantity'\">\n                        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\"\n                                     let-row=\"row\">\n                            <mat-form-field>\n                                <input matInput disabled [value]=\"value\" style=\"font-weight: 900\">\n                            </mat-form-field>\n                        </ng-template>\n                    </ngx-datatable-column>\n                </ngx-datatable>\n            </mat-card-content>\n            <mat-card-actions class=\"lamis-edit-form-actions\">\n                <button mat-button (click)=\"previousState()\">Back</button>\n                <button mat-raised-button color=\"warn\" (click)=\"delete()\">Delete</button>\n                <button mat-raised-button color=\"primary\" (click)=\"edit()\">Edit</button>\n            </mat-card-actions>\n        </mat-card>\n    </div>\n</div>\n"
    }),
    tslib_1.__metadata("design:paramtypes", [Router, ActivatedRoute, PharmacyService,
        TdDialogService,
        NotificationService])
], PharmacyDetailsComponent);
export { PharmacyDetailsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhhcm1hY3ktZGV0YWlscy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1waGFybWFjeS0xLjQuMC8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL3BoYXJtYWN5LWRldGFpbHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFvQixNQUFNLGVBQWUsQ0FBQztBQUUzRCxPQUFPLEVBQUMsY0FBYyxFQUFFLE1BQU0sRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUM3RCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0MsT0FBTyxFQUNILHFCQUFxQixFQUNyQixxQkFBcUIsRUFDckIsb0JBQW9CLEVBQ3BCLFlBQVksRUFDWixxQkFBcUIsRUFDckIsbUJBQW1CLEVBQ3RCLE1BQU0sb0JBQW9CLENBQUM7QUFDNUIsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ25ELE9BQU8sS0FBSyxPQUFPLE1BQU0sUUFBUSxDQUFDO0FBQ2xDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUVuRCxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUM7QUFNdkIsSUFBYSx3QkFBd0IsR0FBckMsTUFBYSx3QkFBd0I7SUFNakMsWUFBb0IsTUFBYyxFQUFVLEtBQXFCLEVBQVUsZUFBZ0MsRUFDdkYsY0FBK0IsRUFDL0IsbUJBQXdDO1FBRnhDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFVLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUN2RixtQkFBYyxHQUFkLGNBQWMsQ0FBaUI7UUFDL0Isd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQVA1RCxlQUFVLEdBQW1CLEVBQUUsQ0FBQztRQUVoQyxlQUFVLEdBQUcs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cEM7U0E3SVksd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uRGVzdHJveSwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RHJ1Z0RUTywgUGhhcm1hY3ksIFBoYXJtYWN5TGluZSwgUmVnaW1lbkluZm99IGZyb20gJy4uL21vZGVsL3BoYXJtYWN5Lm1vZGVsJztcbmltcG9ydCB7QWN0aXZhdGVkUm91dGUsIFJvdXRlcn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7UGhhcm1hY3lTZXJ2aWNlfSBmcm9tICcuLi9zZXJ2aWNlcy9waGFybWFjeS5zZXJ2aWNlJztcbmltcG9ydCB7VGREaWFsb2dTZXJ2aWNlfSBmcm9tICdAY292YWxlbnQvY29yZSc7XG5pbXBvcnQge1xuICAgIENhcmRWaWV3Qm9vbEl0ZW1Nb2RlbCxcbiAgICBDYXJkVmlld0RhdGVJdGVtTW9kZWwsXG4gICAgQ2FyZFZpZXdJbnRJdGVtTW9kZWwsXG4gICAgQ2FyZFZpZXdJdGVtLFxuICAgIENhcmRWaWV3VGV4dEl0ZW1Nb2RlbCxcbiAgICBOb3RpZmljYXRpb25TZXJ2aWNlXG59IGZyb20gJ0BhbGZyZXNjby9hZGYtY29yZSc7XG5pbXBvcnQge0lQVF9UWVBFfSBmcm9tICcuL3BoYXJtYWN5LWVkaXQuY29tcG9uZW50JztcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcbmltcG9ydCB7Q29sdW1uTW9kZX0gZnJvbSAnQHN3aW1sYW5lL25neC1kYXRhdGFibGUnO1xuXG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2xhbWlzLXBoYXJtYWN5JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vcGhhcm1hY3ktZGV0YWlscy5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgUGhhcm1hY3lEZXRhaWxzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIHByb3BlcnRpZXM6IENhcmRWaWV3SXRlbVtdID0gW107XG4gICAgZW50aXR5OiBQaGFybWFjeTtcbiAgICBDb2x1bW5Nb2RlID0gQ29sdW1uTW9kZTtcbiAgICBwdWJsaWMgZGF0YVNvdXJjZTogUGhhcm1hY3lMaW5lW107XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHJpdmF0ZSBwaGFybWFjeVNlcnZpY2U6IFBoYXJtYWN5U2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIF9kaWFsb2dTZXJ2aWNlOiBUZERpYWxvZ1NlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBub3RpZmljYXRpb25TZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMucm91dGUuZGF0YS5zdWJzY3JpYmUoKHtlbnRpdHl9KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVudGl0eSA9ICEhZW50aXR5ICYmIGVudGl0eS5ib2R5ID8gZW50aXR5LmJvZHkgOiBlbnRpdHk7XG4gICAgICAgICAgICBjb25zdCBwYXRpZW50SWQgPSB0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtTWFwLmdldCgncGF0aWVudElkJyk7XG4gICAgICAgICAgICB0aGlzLnBoYXJtYWN5U2VydmljZS5nZXRQYXRpZW50KHBhdGllbnRJZCkuc3Vic2NyaWJlKChyZXMpID0+IHRoaXMuZW50aXR5LnBhdGllbnQgPSByZXMpO1xuICAgICAgICAgICAgdGhpcy5idWlsZFByb3BlcnRpZXMoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZWRpdCgpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvJywgJ3BoYXJtYWNpZXMnLCB0aGlzLmVudGl0eS51dWlkLCAncGF0aWVudCcsIHRoaXMuZW50aXR5LnBhdGllbnQudXVpZCwgJ2VkaXQnXSk7XG4gICAgfVxuXG4gICAgZGVsZXRlKCkge1xuICAgICAgICB0aGlzLl9kaWFsb2dTZXJ2aWNlLm9wZW5Db25maXJtKHtcbiAgICAgICAgICAgIHRpdGxlOiAnQ29uZmlybScsXG4gICAgICAgICAgICBtZXNzYWdlOiAnRG8geW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgcGhhcm1hY3kgcmVmaWxsLCBhY3Rpb24gY2Fubm90IGJlIHJldmVyc2VkPycsXG4gICAgICAgICAgICBjYW5jZWxCdXR0b246ICdObycsXG4gICAgICAgICAgICBhY2NlcHRCdXR0b246ICdZZXMnLFxuICAgICAgICAgICAgd2lkdGg6ICc1MDBweCcsXG4gICAgICAgIH0pLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKChhY2NlcHQ6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgIGlmIChhY2NlcHQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBoYXJtYWN5U2VydmljZS5kZWxldGUodGhpcy5lbnRpdHkuaWQpLnN1YnNjcmliZSgocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsncGF0aWVudHMnXSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc2hvd0Vycm9yKCdFcnJvciBkZWxldGluZyB2aXNpdCwgcGxlYXNlIHRyeSBhZ2FpbicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIERPIFNPTUVUSElORyBFTFNFXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGJ1aWxkUHJvcGVydGllcygpIHtcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3RGF0ZUl0ZW1Nb2RlbCh7XG4gICAgICAgICAgICBrZXk6ICdkcycsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5lbnRpdHkuZGF0ZVZpc2l0LFxuICAgICAgICAgICAgbGFiZWw6ICdEYXRlIG9mIERpc3BlbnNpbmcnLFxuICAgICAgICAgICAgZm9ybWF0OiAnZGQgTU1NLCB5eXl5J1xuICAgICAgICB9KSk7XG4gICAgICAgIC8qdGhpcy5waGFybWFjeVNlcnZpY2UuZ2V0TGluZXNCeVBoYXJtYWN5KHRoaXMuZW50aXR5LmlkKVxuICAgICAgICAgICAgLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVNvdXJjZSA9IHJlcztcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdJbnRJdGVtTW9kZWwoe1xuICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ1JlZmlsbCBQZXJpb2QgKGRheXMpJyxcbiAgICAgICAgICAgICAgICAgICAga2V5OiAnY3MnLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcmVzLm1hcChyID0+IHIuZHVyYXRpb24pXG4gICAgICAgICAgICAgICAgICAgICAgICAuc29ydCgocjEsIHIyKSA9PiByMSAtIHIyKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnBvcCgpXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfSk7Ki9cbiAgICAgICAgdGhpcy5kYXRhU291cmNlID0gWy4uLnRoaXMuZW50aXR5LmxpbmVzLm1hcChyID0+IHtcbiAgICAgICAgICAgIHIubW9ybmluZyA9IHIubW9ybmluZyB8fCAwO1xuICAgICAgICAgICAgci5hZnRlcm5vb24gPSByLmFmdGVybm9vbiB8fCAwO1xuICAgICAgICAgICAgci5ldmVuaW5nID0gci5ldmVuaW5nIHx8IDA7XG4gICAgICAgICAgICByLnF1YW50aXR5ID0gKChyLm1vcm5pbmcpICsgKHIuYWZ0ZXJub29uKSArIChyLmV2ZW5pbmcpKSAqIHIuZHVyYXRpb247XG4gICAgICAgICAgICB0aGlzLnBoYXJtYWN5U2VydmljZS5nZXREcnVnc0J5UmVnaW1lbihyLnJlZ2ltZW5faWQpLnN1YnNjcmliZSgocmVzOiBEcnVnRFRPW10pID0+IHtcbiAgICAgICAgICAgICAgICByLmRlc2NyaXB0aW9uID0gcmVzLmZpbmQoZCA9PiBkLnJlZ2ltZW5EcnVnLmlkID09PSByLnJlZ2ltZW5fZHJ1Z19pZCkuZHJ1Zy5uYW1lO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gcjtcbiAgICAgICAgfSldO1xuICAgICAgICB0aGlzLmRhdGFTb3VyY2UgPSBbLi4udGhpcy5kYXRhU291cmNlXTtcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3SW50SXRlbU1vZGVsKHtcbiAgICAgICAgICAgIGxhYmVsOiAnUmVmaWxsIFBlcmlvZCAoZGF5cyknLFxuICAgICAgICAgICAga2V5OiAnY3MnLFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMuZW50aXR5LmxpbmVzLm1hcChyID0+IHIuZHVyYXRpb24pXG4gICAgICAgICAgICAgICAgLnNvcnQoKHIxLCByMikgPT4gcjEgLSByMilcbiAgICAgICAgICAgICAgICAucG9wKClcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIHRoaXMucHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld0RhdGVJdGVtTW9kZWwoe1xuICAgICAgICAgICAga2V5OiAnbmEnLFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMuZW50aXR5Lm5leHRBcHBvaW50bWVudCxcbiAgICAgICAgICAgIGxhYmVsOiAnTmV4dCBQaGFybWFjeSBSZWZpbGwnLFxuICAgICAgICAgICAgZm9ybWF0OiAnZGQgTU1NLCB5eXl5J1xuICAgICAgICB9KSk7XG4gICAgICAgIHRoaXMucHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld1RleHRJdGVtTW9kZWwoe1xuICAgICAgICAgICAgbGFiZWw6ICdNTUQgVHlwZScsXG4gICAgICAgICAgICBrZXk6ICdmcycsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5lbnRpdHkubW1kVHlwZVxuICAgICAgICB9KSk7XG4gICAgICAgIHRoaXMucHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld0Jvb2xJdGVtTW9kZWwoe1xuICAgICAgICAgICAgbGFiZWw6ICdBZHZlcnNlIERydWcgUmVhY3Rpb25zJyxcbiAgICAgICAgICAgIGtleTogJ2FkcicsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5lbnRpdHkuYWRyU2NyZWVuZWRcbiAgICAgICAgfSkpO1xuICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdCb29sSXRlbU1vZGVsKHtcbiAgICAgICAgICAgIGxhYmVsOiAnUHJlc2NyaXB0aW9uIGVycm9yJyxcbiAgICAgICAgICAgIGtleTogJ2J3JyxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLmVudGl0eS5wcmVzY3JpcHRpb25FcnJvclxuICAgICAgICB9KSk7XG4gICAgICAgIHRoaXMucGhhcm1hY3lTZXJ2aWNlLnJlZ2ltZW5JbmZvKHRoaXMuZW50aXR5LnBhdGllbnQuaWQpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXM6IFJlZ2ltZW5JbmZvKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3VGV4dEl0ZW1Nb2RlbCh7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnUmVnaW1lbiBMaW5lJyxcbiAgICAgICAgICAgICAgICAgICAga2V5OiAnY3MnLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcmVzLnJlZ2ltZW5UeXBlXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld1RleHRJdGVtTW9kZWwoe1xuICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ1JlZ2ltZW4nLFxuICAgICAgICAgICAgICAgICAgICBrZXk6ICd0cycsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiByZXMucmVnaW1lblxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBpZiAodGhpcy5lbnRpdHkuZXh0cmEgJiYgdGhpcy5lbnRpdHkuZXh0cmEuaXB0KSB7XG4gICAgICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdUZXh0SXRlbU1vZGVsKHtcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0lQVCBUeXBlJyxcbiAgICAgICAgICAgICAgICBrZXk6ICdmcycsXG4gICAgICAgICAgICAgICAgdmFsdWU6IElQVF9UWVBFW3RoaXMuZW50aXR5LmV4dHJhLmlwdC50eXBlXVxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5lbnRpdHkuZXh0cmEuaXB0LmRhdGVDb21wbGV0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdEYXRlSXRlbU1vZGVsKHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiAnbmEnLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogbW9tZW50KHRoaXMuZW50aXR5LmV4dHJhLmlwdC5kYXRlQ29tcGxldGVkKSxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdEYXRlIG9mIENvbXBsZXRpb24nLFxuICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6ICdkZCBNTU0sIHl5eXknXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJldmlvdXNTdGF0ZSgpIHtcbiAgICAgICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpIHtcbiAgICB9XG59XG4iXX0=