import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PharmacyService } from '../services/pharmacy.service';
import { TdDialogService } from '@covalent/core';
import { CardViewBoolItemModel, CardViewDateItemModel, CardViewIntItemModel, CardViewItem, CardViewTextItemModel, NotificationService } from '@alfresco/adf-core';
import { IPT_TYPE } from './pharmacy-edit.component';
import * as moment_ from 'moment';
import { ColumnMode } from '@swimlane/ngx-datatable';
var moment = moment_;
var PharmacyDetailsComponent = /** @class */ (function () {
    function PharmacyDetailsComponent(router, route, pharmacyService, _dialogService, notificationService) {
        this.router = router;
        this.route = route;
        this.pharmacyService = pharmacyService;
        this._dialogService = _dialogService;
        this.notificationService = notificationService;
        this.properties = [];
        this.ColumnMode = ColumnMode;
    }
    PharmacyDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (_a) {
            var entity = _a.entity;
            _this.entity = !!entity && entity.body ? entity.body : entity;
            var patientId = _this.route.snapshot.paramMap.get('patientId');
            _this.pharmacyService.getPatient(patientId).subscribe(function (res) { return _this.entity.patient = res; });
            _this.buildProperties();
        });
    };
    PharmacyDetailsComponent.prototype.edit = function () {
        this.router.navigate(['/', 'pharmacies', this.entity.uuid, 'patient', this.entity.patient.uuid, 'edit']);
    };
    PharmacyDetailsComponent.prototype.delete = function () {
        var _this = this;
        this._dialogService.openConfirm({
            title: 'Confirm',
            message: 'Do you want to delete this pharmacy refill, action cannot be reversed?',
            cancelButton: 'No',
            acceptButton: 'Yes',
            width: '500px',
        }).afterClosed().subscribe(function (accept) {
            if (accept) {
                _this.pharmacyService.delete(_this.entity.id).subscribe(function (res) {
                    if (res.ok) {
                        _this.router.navigate(['patients']);
                    }
                    else {
                        _this.notificationService.showError('Error deleting visit, please try again');
                    }
                });
            }
            else {
                // DO SOMETHING ELSE
            }
        });
    };
    PharmacyDetailsComponent.prototype.buildProperties = function () {
        var _this = this;
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
        this.dataSource = tslib_1.__spread(this.entity.lines.map(function (r) {
            r.morning = r.morning || 0;
            r.afternoon = r.afternoon || 0;
            r.evening = r.evening || 0;
            r.quantity = ((r.morning) + (r.afternoon) + (r.evening)) * r.duration;
            _this.pharmacyService.getDrugsByRegimen(r.regimen_id).subscribe(function (res) {
                r.description = res.find(function (d) { return d.regimenDrug.id === r.regimen_drug_id; }).drug.name;
            });
            return r;
        }));
        this.dataSource = tslib_1.__spread(this.dataSource);
        this.properties.push(new CardViewIntItemModel({
            label: 'Refill Period (days)',
            key: 'cs',
            value: this.entity.lines.map(function (r) { return r.duration; })
                .sort(function (r1, r2) { return r1 - r2; })
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
            .subscribe(function (res) {
            _this.properties.push(new CardViewTextItemModel({
                label: 'Regimen Line',
                key: 'cs',
                value: res.regimenType
            }));
            _this.properties.push(new CardViewTextItemModel({
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
    };
    PharmacyDetailsComponent.prototype.previousState = function () {
        window.history.back();
    };
    PharmacyDetailsComponent.prototype.ngOnDestroy = function () {
    };
    PharmacyDetailsComponent.ctorParameters = function () { return [
        { type: Router },
        { type: ActivatedRoute },
        { type: PharmacyService },
        { type: TdDialogService },
        { type: NotificationService }
    ]; };
    PharmacyDetailsComponent = tslib_1.__decorate([
        Component({
            selector: 'lamis-pharmacy',
            template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <mat-card>\n            <mat-card-header>\n            </mat-card-header>\n            <mat-card-content>\n                <adf-card-view [properties]=\"properties\" editable=\"false\"></adf-card-view>\n                <mat-divider></mat-divider>\n                <ngx-datatable\n                    #mydatatable\n                    *ngIf=\"dataSource\"\n                    class=\"material\"\n                    [headerHeight]=\"50\"\n                    [limit]=\"8\"\n                    [columnMode]=\"ColumnMode.force\"\n                    [footerHeight]=\"50\"\n                    rowHeight=\"auto\"\n                    [rows]=\"dataSource\"\n                >\n                    <ngx-datatable-column name=\"Description\" [prop]=\"'description'\">\n                        <ng-template ngx-datatable-cell-template let-value=\"value\">\n                            <mat-form-field>\n                                <input matInput disabled [value]=\"value\" style=\"font-weight: 900\">\n                            </mat-form-field>\n                        </ng-template>\n                    </ngx-datatable-column>\n                    <ngx-datatable-column name=\"Morning\" [prop]=\"'morning'\">\n                        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\"\n                                     let-row=\"row\">\n                            <mat-form-field>\n                                <input matInput disabled [value]=\"value\" style=\"font-weight: 900\">\n                            </mat-form-field>\n                        </ng-template>\n                    </ngx-datatable-column>\n                    <ngx-datatable-column name=\"Afternoon\" [prop]=\"'afternoon'\">\n                        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\"\n                                     let-row=\"row\">\n                            <mat-form-field>\n                                <input matInput disabled [value]=\"value\" style=\"font-weight: 900\">\n                            </mat-form-field>\n                        </ng-template>\n                    </ngx-datatable-column>\n                    <ngx-datatable-column name=\"Evening\" [prop]=\"'evening'\">\n                        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\"\n                                     let-row=\"row\">\n                            <mat-form-field>\n                                <input matInput disabled [value]=\"value\" style=\"font-weight: 900\">\n                            </mat-form-field>\n                        </ng-template>\n                    </ngx-datatable-column>\n                    <ngx-datatable-column name=\"Duration\" [prop]=\"'duration'\">\n                        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\"\n                                     let-row=\"row\">\n                            <mat-form-field>\n                                <input matInput disabled [value]=\"value\" style=\"font-weight: 900\">\n                            </mat-form-field>\n                        </ng-template>\n                    </ngx-datatable-column>\n                    <ngx-datatable-column name=\"Quantity\" [prop]=\"'quantity'\">\n                        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\"\n                                     let-row=\"row\">\n                            <mat-form-field>\n                                <input matInput disabled [value]=\"value\" style=\"font-weight: 900\">\n                            </mat-form-field>\n                        </ng-template>\n                    </ngx-datatable-column>\n                </ngx-datatable>\n            </mat-card-content>\n            <mat-card-actions class=\"lamis-edit-form-actions\">\n                <button mat-button (click)=\"previousState()\">Back</button>\n                <button mat-raised-button color=\"warn\" (click)=\"delete()\">Delete</button>\n                <button mat-raised-button color=\"primary\" (click)=\"edit()\">Edit</button>\n            </mat-card-actions>\n        </mat-card>\n    </div>\n</div>\n"
        }),
        tslib_1.__metadata("design:paramtypes", [Router, ActivatedRoute, PharmacyService,
            TdDialogService,
            NotificationService])
    ], PharmacyDetailsComponent);
    return PharmacyDetailsComponent;
}());
export { PharmacyDetailsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhhcm1hY3ktZGV0YWlscy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1waGFybWFjeS0xLjQuMC8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL3BoYXJtYWN5LWRldGFpbHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFvQixNQUFNLGVBQWUsQ0FBQztBQUUzRCxPQUFPLEVBQUMsY0FBYyxFQUFFLE1BQU0sRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUM3RCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0MsT0FBTyxFQUNILHFCQUFxQixFQUNyQixxQkFBcUIsRUFDckIsb0JBQW9CLEVBQ3BCLFlBQVksRUFDWixxQkFBcUIsRUFDckIsbUJBQW1CLEVBQ3RCLE1BQU0sb0JBQW9CLENBQUM7QUFDNUIsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ25ELE9BQU8sS0FBSyxPQUFPLE1BQU0sUUFBUSxDQUFDO0FBQ2xDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUVuRCxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUM7QUFNdkI7SUFNSSxrQ0FBb0IsTUFBYyxFQUFVLEtBQXFCLEVBQVUsZUFBZ0MsRUFDdkYsY0FBK0IsRUFDL0IsbUJBQXdDO1FBRnhDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFVLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUN2RixtQkFBYyxHQUFkLGNBQWMsQ0FBaUI7UUFDL0Isd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQVA1RCxlQUFVLEdBQW1CLEVBQUUsQ0FBQztRQUVoQyxlQUFVLEdBQUcsVUFBVSxDQUFDO0lBTXhCLENBQUM7SUFFRCwyQ0FB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RCwrQkFBQztDQUFBLEFBN0lELElBNklDO1NBN0lZLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkRlc3Ryb3ksIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RydWdEVE8sIFBoYXJtYWN5LCBQaGFybWFjeUxpbmUsIFJlZ2ltZW5JbmZvfSBmcm9tICcuLi9tb2RlbC9waGFybWFjeS5tb2RlbCc7XG5pbXBvcnQge0FjdGl2YXRlZFJvdXRlLCBSb3V0ZXJ9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge1BoYXJtYWN5U2VydmljZX0gZnJvbSAnLi4vc2VydmljZXMvcGhhcm1hY3kuc2VydmljZSc7XG5pbXBvcnQge1RkRGlhbG9nU2VydmljZX0gZnJvbSAnQGNvdmFsZW50L2NvcmUnO1xuaW1wb3J0IHtcbiAgICBDYXJkVmlld0Jvb2xJdGVtTW9kZWwsXG4gICAgQ2FyZFZpZXdEYXRlSXRlbU1vZGVsLFxuICAgIENhcmRWaWV3SW50SXRlbU1vZGVsLFxuICAgIENhcmRWaWV3SXRlbSxcbiAgICBDYXJkVmlld1RleHRJdGVtTW9kZWwsXG4gICAgTm90aWZpY2F0aW9uU2VydmljZVxufSBmcm9tICdAYWxmcmVzY28vYWRmLWNvcmUnO1xuaW1wb3J0IHtJUFRfVFlQRX0gZnJvbSAnLi9waGFybWFjeS1lZGl0LmNvbXBvbmVudCc7XG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XG5pbXBvcnQge0NvbHVtbk1vZGV9IGZyb20gJ0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlJztcblxuY29uc3QgbW9tZW50ID0gbW9tZW50XztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdsYW1pcy1waGFybWFjeScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3BoYXJtYWN5LWRldGFpbHMuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIFBoYXJtYWN5RGV0YWlsc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBwcm9wZXJ0aWVzOiBDYXJkVmlld0l0ZW1bXSA9IFtdO1xuICAgIGVudGl0eTogUGhhcm1hY3k7XG4gICAgQ29sdW1uTW9kZSA9IENvbHVtbk1vZGU7XG4gICAgcHVibGljIGRhdGFTb3VyY2U6IFBoYXJtYWN5TGluZVtdO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsIHByaXZhdGUgcGhhcm1hY3lTZXJ2aWNlOiBQaGFybWFjeVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBfZGlhbG9nU2VydmljZTogVGREaWFsb2dTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgbm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnJvdXRlLmRhdGEuc3Vic2NyaWJlKCh7ZW50aXR5fSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5lbnRpdHkgPSAhIWVudGl0eSAmJiBlbnRpdHkuYm9keSA/IGVudGl0eS5ib2R5IDogZW50aXR5O1xuICAgICAgICAgICAgY29uc3QgcGF0aWVudElkID0gdGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbU1hcC5nZXQoJ3BhdGllbnRJZCcpO1xuICAgICAgICAgICAgdGhpcy5waGFybWFjeVNlcnZpY2UuZ2V0UGF0aWVudChwYXRpZW50SWQpLnN1YnNjcmliZSgocmVzKSA9PiB0aGlzLmVudGl0eS5wYXRpZW50ID0gcmVzKTtcbiAgICAgICAgICAgIHRoaXMuYnVpbGRQcm9wZXJ0aWVzKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGVkaXQoKSB7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLycsICdwaGFybWFjaWVzJywgdGhpcy5lbnRpdHkudXVpZCwgJ3BhdGllbnQnLCB0aGlzLmVudGl0eS5wYXRpZW50LnV1aWQsICdlZGl0J10pO1xuICAgIH1cblxuICAgIGRlbGV0ZSgpIHtcbiAgICAgICAgdGhpcy5fZGlhbG9nU2VydmljZS5vcGVuQ29uZmlybSh7XG4gICAgICAgICAgICB0aXRsZTogJ0NvbmZpcm0nLFxuICAgICAgICAgICAgbWVzc2FnZTogJ0RvIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIHBoYXJtYWN5IHJlZmlsbCwgYWN0aW9uIGNhbm5vdCBiZSByZXZlcnNlZD8nLFxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uOiAnTm8nLFxuICAgICAgICAgICAgYWNjZXB0QnV0dG9uOiAnWWVzJyxcbiAgICAgICAgICAgIHdpZHRoOiAnNTAwcHgnLFxuICAgICAgICB9KS5hZnRlckNsb3NlZCgpLnN1YnNjcmliZSgoYWNjZXB0OiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgICBpZiAoYWNjZXB0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5waGFybWFjeVNlcnZpY2UuZGVsZXRlKHRoaXMuZW50aXR5LmlkKS5zdWJzY3JpYmUoKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJ3BhdGllbnRzJ10pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnNob3dFcnJvcignRXJyb3IgZGVsZXRpbmcgdmlzaXQsIHBsZWFzZSB0cnkgYWdhaW4nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBETyBTT01FVEhJTkcgRUxTRVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBidWlsZFByb3BlcnRpZXMoKSB7XG4gICAgICAgIHRoaXMucHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld0RhdGVJdGVtTW9kZWwoe1xuICAgICAgICAgICAga2V5OiAnZHMnLFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMuZW50aXR5LmRhdGVWaXNpdCxcbiAgICAgICAgICAgIGxhYmVsOiAnRGF0ZSBvZiBEaXNwZW5zaW5nJyxcbiAgICAgICAgICAgIGZvcm1hdDogJ2RkIE1NTSwgeXl5eSdcbiAgICAgICAgfSkpO1xuICAgICAgICAvKnRoaXMucGhhcm1hY3lTZXJ2aWNlLmdldExpbmVzQnlQaGFybWFjeSh0aGlzLmVudGl0eS5pZClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFTb3VyY2UgPSByZXM7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3SW50SXRlbU1vZGVsKHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdSZWZpbGwgUGVyaW9kIChkYXlzKScsXG4gICAgICAgICAgICAgICAgICAgIGtleTogJ2NzJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJlcy5tYXAociA9PiByLmR1cmF0aW9uKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnNvcnQoKHIxLCByMikgPT4gcjEgLSByMilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wb3AoKVxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH0pOyovXG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZSA9IFsuLi50aGlzLmVudGl0eS5saW5lcy5tYXAociA9PiB7XG4gICAgICAgICAgICByLm1vcm5pbmcgPSByLm1vcm5pbmcgfHwgMDtcbiAgICAgICAgICAgIHIuYWZ0ZXJub29uID0gci5hZnRlcm5vb24gfHwgMDtcbiAgICAgICAgICAgIHIuZXZlbmluZyA9IHIuZXZlbmluZyB8fCAwO1xuICAgICAgICAgICAgci5xdWFudGl0eSA9ICgoci5tb3JuaW5nKSArIChyLmFmdGVybm9vbikgKyAoci5ldmVuaW5nKSkgKiByLmR1cmF0aW9uO1xuICAgICAgICAgICAgdGhpcy5waGFybWFjeVNlcnZpY2UuZ2V0RHJ1Z3NCeVJlZ2ltZW4oci5yZWdpbWVuX2lkKS5zdWJzY3JpYmUoKHJlczogRHJ1Z0RUT1tdKSA9PiB7XG4gICAgICAgICAgICAgICAgci5kZXNjcmlwdGlvbiA9IHJlcy5maW5kKGQgPT4gZC5yZWdpbWVuRHJ1Zy5pZCA9PT0gci5yZWdpbWVuX2RydWdfaWQpLmRydWcubmFtZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHI7XG4gICAgICAgIH0pXTtcbiAgICAgICAgdGhpcy5kYXRhU291cmNlID0gWy4uLnRoaXMuZGF0YVNvdXJjZV07XG4gICAgICAgIHRoaXMucHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld0ludEl0ZW1Nb2RlbCh7XG4gICAgICAgICAgICBsYWJlbDogJ1JlZmlsbCBQZXJpb2QgKGRheXMpJyxcbiAgICAgICAgICAgIGtleTogJ2NzJyxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLmVudGl0eS5saW5lcy5tYXAociA9PiByLmR1cmF0aW9uKVxuICAgICAgICAgICAgICAgIC5zb3J0KChyMSwgcjIpID0+IHIxIC0gcjIpXG4gICAgICAgICAgICAgICAgLnBvcCgpXG4gICAgICAgIH0pKTtcblxuICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdEYXRlSXRlbU1vZGVsKHtcbiAgICAgICAgICAgIGtleTogJ25hJyxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLmVudGl0eS5uZXh0QXBwb2ludG1lbnQsXG4gICAgICAgICAgICBsYWJlbDogJ05leHQgUGhhcm1hY3kgUmVmaWxsJyxcbiAgICAgICAgICAgIGZvcm1hdDogJ2RkIE1NTSwgeXl5eSdcbiAgICAgICAgfSkpO1xuICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdUZXh0SXRlbU1vZGVsKHtcbiAgICAgICAgICAgIGxhYmVsOiAnTU1EIFR5cGUnLFxuICAgICAgICAgICAga2V5OiAnZnMnLFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMuZW50aXR5Lm1tZFR5cGVcbiAgICAgICAgfSkpO1xuICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdCb29sSXRlbU1vZGVsKHtcbiAgICAgICAgICAgIGxhYmVsOiAnQWR2ZXJzZSBEcnVnIFJlYWN0aW9ucycsXG4gICAgICAgICAgICBrZXk6ICdhZHInLFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMuZW50aXR5LmFkclNjcmVlbmVkXG4gICAgICAgIH0pKTtcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3Qm9vbEl0ZW1Nb2RlbCh7XG4gICAgICAgICAgICBsYWJlbDogJ1ByZXNjcmlwdGlvbiBlcnJvcicsXG4gICAgICAgICAgICBrZXk6ICdidycsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5lbnRpdHkucHJlc2NyaXB0aW9uRXJyb3JcbiAgICAgICAgfSkpO1xuICAgICAgICB0aGlzLnBoYXJtYWN5U2VydmljZS5yZWdpbWVuSW5mbyh0aGlzLmVudGl0eS5wYXRpZW50LmlkKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzOiBSZWdpbWVuSW5mbykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld1RleHRJdGVtTW9kZWwoe1xuICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ1JlZ2ltZW4gTGluZScsXG4gICAgICAgICAgICAgICAgICAgIGtleTogJ2NzJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJlcy5yZWdpbWVuVHlwZVxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdUZXh0SXRlbU1vZGVsKHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdSZWdpbWVuJyxcbiAgICAgICAgICAgICAgICAgICAga2V5OiAndHMnLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcmVzLnJlZ2ltZW5cbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgaWYgKHRoaXMuZW50aXR5LmV4dHJhICYmIHRoaXMuZW50aXR5LmV4dHJhLmlwdCkge1xuICAgICAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3VGV4dEl0ZW1Nb2RlbCh7XG4gICAgICAgICAgICAgICAgbGFiZWw6ICdJUFQgVHlwZScsXG4gICAgICAgICAgICAgICAga2V5OiAnZnMnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBJUFRfVFlQRVt0aGlzLmVudGl0eS5leHRyYS5pcHQudHlwZV1cbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZW50aXR5LmV4dHJhLmlwdC5kYXRlQ29tcGxldGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3RGF0ZUl0ZW1Nb2RlbCh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogJ25hJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IG1vbWVudCh0aGlzLmVudGl0eS5leHRyYS5pcHQuZGF0ZUNvbXBsZXRlZCksXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnRGF0ZSBvZiBDb21wbGV0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiAnZGQgTU1NLCB5eXl5J1xuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByZXZpb3VzU3RhdGUoKSB7XG4gICAgICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKSB7XG4gICAgfVxufVxuIl19