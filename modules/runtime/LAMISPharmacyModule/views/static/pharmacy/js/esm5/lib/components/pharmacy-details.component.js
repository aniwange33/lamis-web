import * as tslib_1 from "tslib";
import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PharmacyService} from '../services/pharmacy.service';
import {TdDialogService} from '@covalent/core';
import {
    CardViewBoolItemModel,
    CardViewDateItemModel,
    CardViewIntItemModel,
    CardViewItem,
    CardViewTextItemModel,
    NotificationService
} from '@alfresco/adf-core';

var PharmacyDetailsComponent = /** @class */ (function () {
    function PharmacyDetailsComponent(router, route, pharmacyService, _dialogService, notificationService) {
        this.router = router;
        this.route = route;
        this.pharmacyService = pharmacyService;
        this._dialogService = _dialogService;
        this.notificationService = notificationService;
        this.properties = [];
    }

    PharmacyDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (_a) {
            var entity = _a.entity;
            _this.entity = !!entity && entity.body ? entity.body : entity;
            var patientId = _this.route.snapshot.paramMap.get('patientId');
            _this.pharmacyService.getPatient(patientId).subscribe(function (res) {
                return _this.entity.patient = res;
            });
            _this.buildProperties();
        });
    };
    PharmacyDetailsComponent.prototype.edit = function () {
        this.router.navigate(['/', 'pharmacies', this.entity.uuid, 'patient', this.entity.patient.id, 'edit']);
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
                    } else {
                        _this.notificationService.showError('Error deleting visit, please try again');
                    }
                });
            } else {
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
        this.pharmacyService.getLinesByPharmacy(this.entity.id)
            .subscribe(function (res) {
                _this.dataSource = res;
                _this.properties.push(new CardViewIntItemModel({
                    label: 'Refill Period (days)',
                    key: 'cs',
                    value: res.map(function (r) {
                        return r.duration;
                    })
                        .sort(function (r1, r2) {
                            return r1 - r2;
                        })
                        .pop()
                }));
            });
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
    };
    PharmacyDetailsComponent.prototype.previousState = function () {
        window.history.back();
    };
    PharmacyDetailsComponent.prototype.ngOnDestroy = function () {
    };
    PharmacyDetailsComponent.ctorParameters = function () {
        return [
            {type: Router},
            {type: ActivatedRoute},
            {type: PharmacyService},
            {type: TdDialogService},
            {type: NotificationService}
        ];
    };
    PharmacyDetailsComponent = tslib_1.__decorate([
        Component({
            selector: 'lamis-pharmacy',
            template: "<div class=\"lamis-edit-form\">\r\n    <div class=\"lamis-edit-form-container\">\r\n        <mat-card>\r\n            <mat-card-header>\r\n            </mat-card-header>\r\n            <mat-card-content>\r\n                <adf-card-view [properties]=\"properties\" editable=\"false\"></adf-card-view>\r\n                <mat-divider></mat-divider>\r\n                <adf-datatable *ngIf=\"dataSource\"\r\n                               [rows]=\"dataSource\">\r\n                    <data-columns>\r\n                        <data-column key=\"description\" title=\"Description\" sortable=\"true\"></data-column>\r\n                        <data-column key=\"morning\" title=\"Morning\" sortable=\"false\"></data-column>\r\n                        <data-column key=\"afternoon\" title=\"Afternoon\" sortable=\"false\"></data-column>\r\n                        <data-column key=\"evening\" title=\"Evening\" sortable=\"false\"></data-column>\r\n                        <data-column key=\"duration\" title=\"Duration\" sortable=\"false\"></data-column>\r\n                    </data-columns>\r\n                </adf-datatable>\r\n            </mat-card-content>\r\n            <mat-card-actions class=\"lamis-edit-form-actions\">\r\n                <button mat-button (click)=\"previousState()\">Back</button>\r\n                <button mat-raised-button color=\"warn\" (click)=\"delete()\">Delete</button>\r\n                <button mat-raised-button color=\"primary\" (click)=\"edit()\">Edit</button>\r\n            </mat-card-actions>\r\n        </mat-card>\r\n    </div>\r\n</div>\r\n"
        }),
        tslib_1.__metadata("design:paramtypes", [Router, ActivatedRoute, PharmacyService,
            TdDialogService,
            NotificationService])
    ], PharmacyDetailsComponent);
    return PharmacyDetailsComponent;
}());
export {PharmacyDetailsComponent};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhhcm1hY3ktZGV0YWlscy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1waGFybWFjeS0xLjEuNC8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL3BoYXJtYWN5LWRldGFpbHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUErQyxNQUFNLGVBQWUsQ0FBQztBQUV2RixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUNILHFCQUFxQixFQUNyQixxQkFBcUIsRUFDckIsb0JBQW9CLEVBQ3BCLFlBQVksRUFDWixxQkFBcUIsRUFDckIsbUJBQW1CLEVBQ3RCLE1BQU0sb0JBQW9CLENBQUM7QUFNNUI7SUFLSSxrQ0FBb0IsTUFBYyxFQUFVLEtBQXFCLEVBQVUsZUFBZ0MsRUFDdkYsY0FBK0IsRUFDL0IsbUJBQXdDO1FBRnhDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFVLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUN2RixtQkFBYyxHQUFkLGNBQWMsQ0FBaUI7UUFDL0Isd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQU41RCxlQUFVLEdBQW1CLEVBQUUsQ0FBQztJQU9oQyxDQUFDO0lBRUQsMkNBQVEsR0FBUjtRQUFBLGlCQU9DO1FBTkcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQUMsRUFBUTtnQkFBUCxrQkFBTTtZQUM5QixLQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FB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LFNBQVM7Z0JBQ2hCLEdBQUcsRUFBRSxJQUFJO2dCQUNULEtBQUssRUFBRSxHQUFHLENBQUMsT0FBTzthQUNyQixDQUFDLENBQUMsQ0FBQztRQUNSLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELGdEQUFhLEdBQWI7UUFDSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFTSw4Q0FBVyxHQUFsQjtJQUNBLENBQUM7O2dCQXBHMkIsTUFBTTtnQkFBaUIsY0FBYztnQkFBMkIsZUFBZTtnQkFDdkUsZUFBZTtnQkFDVixtQkFBbUI7O0lBUG5ELHdCQUF3QjtRQUpwQyxTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLGdrREFBZ0Q7U0FDbkQsQ0FBQztpREFNOEIsTUFBTSxFQUFpQixjQUFjLEVBQTJCLGVBQWU7WUFDdkUsZUFBZTtZQUNWLG1CQUFtQjtPQVBuRCx3QkFBd0IsQ0EwR3BDO0lBQUQsK0JBQUM7Q0FBQSxBQTFHRCxJQTBHQztTQTFHWSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUGhhcm1hY3ksIFBoYXJtYWN5TGluZSwgUmVnaW1lbkluZm8gfSBmcm9tICcuLi9tb2RlbC9waGFybWFjeS5tb2RlbCc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBQaGFybWFjeVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9waGFybWFjeS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVGREaWFsb2dTZXJ2aWNlIH0gZnJvbSAnQGNvdmFsZW50L2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gICAgQ2FyZFZpZXdCb29sSXRlbU1vZGVsLFxyXG4gICAgQ2FyZFZpZXdEYXRlSXRlbU1vZGVsLFxyXG4gICAgQ2FyZFZpZXdJbnRJdGVtTW9kZWwsXHJcbiAgICBDYXJkVmlld0l0ZW0sXHJcbiAgICBDYXJkVmlld1RleHRJdGVtTW9kZWwsXHJcbiAgICBOb3RpZmljYXRpb25TZXJ2aWNlXHJcbn0gZnJvbSAnQGFsZnJlc2NvL2FkZi1jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdsYW1pcy1waGFybWFjeScsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vcGhhcm1hY3ktZGV0YWlscy5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFBoYXJtYWN5RGV0YWlsc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICAgIHByb3BlcnRpZXM6IENhcmRWaWV3SXRlbVtdID0gW107XHJcbiAgICBlbnRpdHk6IFBoYXJtYWN5O1xyXG4gICAgcHVibGljIGRhdGFTb3VyY2U6IFBoYXJtYWN5TGluZVtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIHBoYXJtYWN5U2VydmljZTogUGhhcm1hY3lTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBfZGlhbG9nU2VydmljZTogVGREaWFsb2dTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBub3RpZmljYXRpb25TZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlKSB7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZS5kYXRhLnN1YnNjcmliZSgoe2VudGl0eX0pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5lbnRpdHkgPSAhIWVudGl0eSAmJiBlbnRpdHkuYm9keSA/IGVudGl0eS5ib2R5IDogZW50aXR5O1xyXG4gICAgICAgICAgICBjb25zdCBwYXRpZW50SWQgPSB0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtTWFwLmdldCgncGF0aWVudElkJyk7XHJcbiAgICAgICAgICAgIHRoaXMucGhhcm1hY3lTZXJ2aWNlLmdldFBhdGllbnQocGF0aWVudElkKS5zdWJzY3JpYmUoKHJlcykgPT4gdGhpcy5lbnRpdHkucGF0aWVudCA9IHJlcyk7XHJcbiAgICAgICAgICAgIHRoaXMuYnVpbGRQcm9wZXJ0aWVzKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZWRpdCgpIHtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy8nLCAncGhhcm1hY2llcycsIHRoaXMuZW50aXR5LnV1aWQsICdwYXRpZW50JywgdGhpcy5lbnRpdHkucGF0aWVudC5pZCwgJ2VkaXQnXSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlKCkge1xyXG4gICAgICAgIHRoaXMuX2RpYWxvZ1NlcnZpY2Uub3BlbkNvbmZpcm0oe1xyXG4gICAgICAgICAgICB0aXRsZTogJ0NvbmZpcm0nLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiAnRG8geW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgcGhhcm1hY3kgcmVmaWxsLCBhY3Rpb24gY2Fubm90IGJlIHJldmVyc2VkPycsXHJcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvbjogJ05vJyxcclxuICAgICAgICAgICAgYWNjZXB0QnV0dG9uOiAnWWVzJyxcclxuICAgICAgICAgICAgd2lkdGg6ICc1MDBweCcsXHJcbiAgICAgICAgfSkuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUoKGFjY2VwdDogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoYWNjZXB0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBoYXJtYWN5U2VydmljZS5kZWxldGUodGhpcy5lbnRpdHkuaWQpLnN1YnNjcmliZSgocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5vaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJ3BhdGllbnRzJ10pXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnNob3dFcnJvcignRXJyb3IgZGVsZXRpbmcgdmlzaXQsIHBsZWFzZSB0cnkgYWdhaW4nKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBETyBTT01FVEhJTkcgRUxTRVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYnVpbGRQcm9wZXJ0aWVzKCkge1xyXG4gICAgICAgIHRoaXMucHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld0RhdGVJdGVtTW9kZWwoe1xyXG4gICAgICAgICAgICBrZXk6ICdkcycsXHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLmVudGl0eS5kYXRlVmlzaXQsXHJcbiAgICAgICAgICAgIGxhYmVsOiAnRGF0ZSBvZiBEaXNwZW5zaW5nJyxcclxuICAgICAgICAgICAgZm9ybWF0OiAnZGQgTU1NLCB5eXl5J1xyXG4gICAgICAgIH0pKTtcclxuICAgICAgICB0aGlzLnBoYXJtYWN5U2VydmljZS5nZXRMaW5lc0J5UGhhcm1hY3kodGhpcy5lbnRpdHkuaWQpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUocmVzID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVNvdXJjZSA9IHJlcztcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld0ludEl0ZW1Nb2RlbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdSZWZpbGwgUGVyaW9kIChkYXlzKScsXHJcbiAgICAgICAgICAgICAgICAgICAga2V5OiAnY3MnLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiByZXMubWFwKHIgPT4gci5kdXJhdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNvcnQoKHIxLCByMikgPT4gcjEgLSByMilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnBvcCgpXHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdEYXRlSXRlbU1vZGVsKHtcclxuICAgICAgICAgICAga2V5OiAnbmEnLFxyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5lbnRpdHkubmV4dEFwcG9pbnRtZW50LFxyXG4gICAgICAgICAgICBsYWJlbDogJ05leHQgUGhhcm1hY3kgUmVmaWxsJyxcclxuICAgICAgICAgICAgZm9ybWF0OiAnZGQgTU1NLCB5eXl5J1xyXG4gICAgICAgIH0pKTtcclxuICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdUZXh0SXRlbU1vZGVsKHtcclxuICAgICAgICAgICAgbGFiZWw6ICdNTUQgVHlwZScsXHJcbiAgICAgICAgICAgIGtleTogJ2ZzJyxcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMuZW50aXR5Lm1tZFR5cGVcclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3Qm9vbEl0ZW1Nb2RlbCh7XHJcbiAgICAgICAgICAgIGxhYmVsOiAnQWR2ZXJzZSBEcnVnIFJlYWN0aW9ucycsXHJcbiAgICAgICAgICAgIGtleTogJ2FkcicsXHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLmVudGl0eS5hZHJTY3JlZW5lZFxyXG4gICAgICAgIH0pKTtcclxuICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdCb29sSXRlbU1vZGVsKHtcclxuICAgICAgICAgICAgbGFiZWw6ICdQcmVzY3JpcHRpb24gZXJyb3InLFxyXG4gICAgICAgICAgICBrZXk6ICdidycsXHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLmVudGl0eS5wcmVzY3JpcHRpb25FcnJvclxyXG4gICAgICAgIH0pKTtcclxuICAgICAgICB0aGlzLnBoYXJtYWN5U2VydmljZS5yZWdpbWVuSW5mbyh0aGlzLmVudGl0eS5wYXRpZW50LmlkKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXM6IFJlZ2ltZW5JbmZvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdUZXh0SXRlbU1vZGVsKHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ1JlZ2ltZW4gTGluZScsXHJcbiAgICAgICAgICAgICAgICAgICAga2V5OiAnY3MnLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiByZXMucmVnaW1lblR5cGVcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld1RleHRJdGVtTW9kZWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnUmVnaW1lbicsXHJcbiAgICAgICAgICAgICAgICAgICAga2V5OiAndHMnLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiByZXMucmVnaW1lblxyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcmV2aW91c1N0YXRlKCkge1xyXG4gICAgICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB9XHJcbn1cclxuIl19
