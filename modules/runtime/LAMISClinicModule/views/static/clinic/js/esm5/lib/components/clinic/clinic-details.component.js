import * as tslib_1 from "tslib";
import {Component, ComponentFactoryResolver, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ClinicService} from '../../services/clinic.service';
import {TdDialogService} from '@covalent/core';
import {
    CardViewBoolItemModel,
    CardViewDateItemModel,
    CardViewFloatItemModel,
    CardViewIntItemModel,
    CardViewItem,
    CardViewTextItemModel,
    NotificationService
} from '@alfresco/adf-core';

var ClinicDetailsComponent = /** @class */ (function () {
    function ClinicDetailsComponent(router, route, clinicService, cfr, _dialogService, notificationService) {
        this.router = router;
        this.route = route;
        this.clinicService = clinicService;
        this.cfr = cfr;
        this._dialogService = _dialogService;
        this.notificationService = notificationService;
        this.properties = [];
    }

    ClinicDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (_a) {
            var entity = _a.entity;
            _this.entity = !!entity && entity.body ? entity.body : entity;
            var patientId = _this.route.snapshot.paramMap.get("patientId");
            _this.clinicService.getPatient(patientId).subscribe(function (res) {
                return _this.entity.patient = res;
            });
            _this.buildProperties();
        });
    };
    ClinicDetailsComponent.prototype.edit = function () {
        this.router.navigate(['/', 'clinics', this.entity.uuid, 'patient', this.entity.patient.uuid, 'edit']);
    };
    ClinicDetailsComponent.prototype.delete = function () {
        var _this = this;
        this._dialogService.openConfirm({
            title: 'Confirm',
            message: 'Do you want to delete this clinic visit, action cannot be reversed?',
            cancelButton: 'No',
            acceptButton: 'Yes',
            width: '500px',
        }).afterClosed().subscribe(function (accept) {
            if (accept) {
                _this.clinicService.delete(_this.entity.id).subscribe(function (res) {
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
    ClinicDetailsComponent.prototype.buildProperties = function () {
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
        this.properties.push(new CardViewDateItemModel({
            key: 'na',
            value: this.entity.nextAppointment,
            label: 'Next Appointment Date',
            format: 'dd MMM, yyyy'
        }));
    };
    ClinicDetailsComponent.prototype.previousState = function () {
        window.history.back();
    };
    ClinicDetailsComponent.prototype.ngOnDestroy = function () {
    };
    ClinicDetailsComponent.ctorParameters = function () {
        return [
            {type: Router},
            {type: ActivatedRoute},
            {type: ClinicService},
            {type: ComponentFactoryResolver},
            {type: TdDialogService},
            {type: NotificationService}
        ];
    };
    ClinicDetailsComponent = tslib_1.__decorate([
        Component({
            selector: 'lamis-clinic',
            template: "<div class=\"lamis-edit-form\">\r\n    <div class=\"lamis-edit-form-container\">\r\n        <mat-card>\r\n            <mat-card-header>\r\n            </mat-card-header>\r\n            <mat-card-content>\r\n                <adf-card-view [properties]=\"properties\" editable=\"false\"></adf-card-view>\r\n            </mat-card-content>\r\n            <mat-card-actions class=\"lamis-edit-form-actions\">\r\n                <button mat-button (click)=\"previousState()\">Back</button>\r\n                <button mat-raised-button color=\"warn\" (click)=\"delete()\">Delete</button>\r\n                <button mat-raised-button color=\"primary\" (click)=\"edit()\">Edit</button>\r\n            </mat-card-actions>\r\n        </mat-card>\r\n    </div>\r\n</div>\r\n"
        }),
        tslib_1.__metadata("design:paramtypes", [Router, ActivatedRoute, ClinicService,
            ComponentFactoryResolver, TdDialogService,
            NotificationService])
    ], ClinicDetailsComponent);
    return ClinicDetailsComponent;
}());
export {ClinicDetailsComponent};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpbmljLWRldGFpbHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGFtaXMtY2xpbmljLTEuMS4zLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvY2xpbmljL2NsaW5pYy1kZXRhaWxzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSx3QkFBd0IsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXZGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzlELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQ0gscUJBQXFCLEVBQ3JCLHFCQUFxQixFQUNyQixzQkFBc0IsRUFDdEIsb0JBQW9CLEVBQ3BCLFlBQVksRUFDWixxQkFBcUIsRUFDckIsbUJBQW1CLEVBQ3RCLE1BQU0sb0JBQW9CLENBQUM7QUFNNUI7SUFJSSxnQ0FBb0IsTUFBYyxFQUFVLEtBQXFCLEVBQVUsYUFBNEIsRUFDbkYsR0FBNkIsRUFBVSxjQUErQixFQUN0RSxtQkFBd0M7UUFGeEMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDbkYsUUFBRyxHQUFILEdBQUcsQ0FBMEI7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBaUI7UUFDdEUsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUw1RCxlQUFVLEdBQW1CLEVBQUUsQ0FBQztJQU1oQyxDQUFDO0lBRUQseUNBQVEsR0FBUjtRQUFBLGlCQU9DO1FBTkcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQUMsRUFBUTtnQkFBUCxrQkFBTTtZQUM5QixLQUFJLENB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SUE0SUM7U0E1SVksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENsaW5pYyB9IGZyb20gJy4uLy4uL21vZGVsL2NsaW5pYy5tb2RlbCc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBDbGluaWNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvY2xpbmljLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBUZERpYWxvZ1NlcnZpY2UgfSBmcm9tICdAY292YWxlbnQvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgICBDYXJkVmlld0Jvb2xJdGVtTW9kZWwsXHJcbiAgICBDYXJkVmlld0RhdGVJdGVtTW9kZWwsXHJcbiAgICBDYXJkVmlld0Zsb2F0SXRlbU1vZGVsLFxyXG4gICAgQ2FyZFZpZXdJbnRJdGVtTW9kZWwsXHJcbiAgICBDYXJkVmlld0l0ZW0sXHJcbiAgICBDYXJkVmlld1RleHRJdGVtTW9kZWwsXHJcbiAgICBOb3RpZmljYXRpb25TZXJ2aWNlXHJcbn0gZnJvbSAnQGFsZnJlc2NvL2FkZi1jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdsYW1pcy1jbGluaWMnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2NsaW5pYy1kZXRhaWxzLmNvbXBvbmVudC5odG1sJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2xpbmljRGV0YWlsc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICAgIHByb3BlcnRpZXM6IENhcmRWaWV3SXRlbVtdID0gW107XHJcbiAgICBlbnRpdHk6IENsaW5pYztcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHJpdmF0ZSBjbGluaWNTZXJ2aWNlOiBDbGluaWNTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBjZnI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgcHJpdmF0ZSBfZGlhbG9nU2VydmljZTogVGREaWFsb2dTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBub3RpZmljYXRpb25TZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlKSB7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZS5kYXRhLnN1YnNjcmliZSgoe2VudGl0eX0pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5lbnRpdHkgPSAhIWVudGl0eSAmJiBlbnRpdHkuYm9keSA/IGVudGl0eS5ib2R5IDogZW50aXR5O1xyXG4gICAgICAgICAgICBjb25zdCBwYXRpZW50SWQgPSB0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtTWFwLmdldChcInBhdGllbnRJZFwiKTtcclxuICAgICAgICAgICAgdGhpcy5jbGluaWNTZXJ2aWNlLmdldFBhdGllbnQocGF0aWVudElkKS5zdWJzY3JpYmUoKHJlcykgPT4gdGhpcy5lbnRpdHkucGF0aWVudCA9IHJlcyk7XHJcbiAgICAgICAgICAgIHRoaXMuYnVpbGRQcm9wZXJ0aWVzKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZWRpdCgpIHtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy8nLCAnY2xpbmljcycsIHRoaXMuZW50aXR5LnV1aWQsICdwYXRpZW50JywgdGhpcy5lbnRpdHkucGF0aWVudC51dWlkLCAnZWRpdCddKTtcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGUoKSB7XHJcbiAgICAgICAgdGhpcy5fZGlhbG9nU2VydmljZS5vcGVuQ29uZmlybSh7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnQ29uZmlybScsXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdEbyB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBjbGluaWMgdmlzaXQsIGFjdGlvbiBjYW5ub3QgYmUgcmV2ZXJzZWQ/JyxcclxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uOiAnTm8nLFxyXG4gICAgICAgICAgICBhY2NlcHRCdXR0b246ICdZZXMnLFxyXG4gICAgICAgICAgICB3aWR0aDogJzUwMHB4JyxcclxuICAgICAgICB9KS5hZnRlckNsb3NlZCgpLnN1YnNjcmliZSgoYWNjZXB0OiBib29sZWFuKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChhY2NlcHQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xpbmljU2VydmljZS5kZWxldGUodGhpcy5lbnRpdHkuaWQpLnN1YnNjcmliZSgocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5vaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJ3BhdGllbnRzJ10pXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnNob3dFcnJvcignRXJyb3IgZGVsZXRpbmcgdmlzaXQsIHBsZWFzZSB0cnkgYWdhaW4nKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBETyBTT01FVEhJTkcgRUxTRVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYnVpbGRQcm9wZXJ0aWVzKCkge1xyXG4gICAgICAgIHRoaXMucHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld0RhdGVJdGVtTW9kZWwoe1xyXG4gICAgICAgICAgICBrZXk6ICdkcycsXHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLmVudGl0eS5kYXRlVmlzaXQsXHJcbiAgICAgICAgICAgIGxhYmVsOiB0aGlzLmVudGl0eS5jb21tZW5jZSA/ICdBUlQgU3RhcnQgRGF0ZScgOiAnRGF0ZSBWaXNpdCcsXHJcbiAgICAgICAgICAgIGZvcm1hdDogJ2RkIE1NTSwgeXl5eSdcclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgaWYgKHRoaXMuZW50aXR5LmNvbW1lbmNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld0ludEl0ZW1Nb2RlbCh7XHJcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0NENCBhdCBzdGFydCBvZiBBUlQnLFxyXG4gICAgICAgICAgICAgICAga2V5OiAnY2Q0JyxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLmVudGl0eS5jZDRwIHx8IG51bGxcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdGbG9hdEl0ZW1Nb2RlbCh7XHJcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0NENCUnLFxyXG4gICAgICAgICAgICAgICAga2V5OiAnY2Q0cCcsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5lbnRpdHkuY2Q0cCB8fCBudWxsXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3VGV4dEl0ZW1Nb2RlbCh7XHJcbiAgICAgICAgICAgICAgICBsYWJlbDogJ09yaWdpbmFsIFJlZ2ltZW4gTGluZScsXHJcbiAgICAgICAgICAgICAgICBrZXk6ICdybCcsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5lbnRpdHkucmVnaW1lblR5cGUgIT0gbnVsbCA/IHRoaXMuZW50aXR5LnJlZ2ltZW5UeXBlLmRlc2NyaXB0aW9uIDogJydcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdUZXh0SXRlbU1vZGVsKHtcclxuICAgICAgICAgICAgICAgIGxhYmVsOiAnT3JpZ2luYWwgUmVnaW1lbicsXHJcbiAgICAgICAgICAgICAgICBrZXk6ICdybCcsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5lbnRpdHkucmVnaW1lbiAhPSBudWxsID8gdGhpcy5lbnRpdHkucmVnaW1lbi5kZXNjcmlwdGlvbiA6ICcnXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3VGV4dEl0ZW1Nb2RlbCh7XHJcbiAgICAgICAgICAgIGxhYmVsOiAnQ2xpbmljYWwgU3RhZ2UnLFxyXG4gICAgICAgICAgICBrZXk6ICdjcycsXHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLmVudGl0eS5jbGluaWNTdGFnZVxyXG4gICAgICAgIH0pKTtcclxuICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdUZXh0SXRlbU1vZGVsKHtcclxuICAgICAgICAgICAgbGFiZWw6ICdGdW5jdGlvbmFsIFN0YXR1cycsXHJcbiAgICAgICAgICAgIGtleTogJ2ZzJyxcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMuZW50aXR5LmZ1bmNTdGF0dXNcclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3VGV4dEl0ZW1Nb2RlbCh7XHJcbiAgICAgICAgICAgIGxhYmVsOiAnVEIgU3RhdHVzJyxcclxuICAgICAgICAgICAga2V5OiAndHMnLFxyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5lbnRpdHkudGJTdGF0dXNcclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3RmxvYXRJdGVtTW9kZWwoe1xyXG4gICAgICAgICAgICBsYWJlbDogJ0JvZHkgV2VpZ2h0KEtnKScsXHJcbiAgICAgICAgICAgIGtleTogJ2J3JyxcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMuZW50aXR5LmJvZHlXZWlnaHQgfHwgbnVsbFxyXG4gICAgICAgIH0pKTtcclxuICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdGbG9hdEl0ZW1Nb2RlbCh7XHJcbiAgICAgICAgICAgIGxhYmVsOiAnSGVpZ2h0KG0pJyxcclxuICAgICAgICAgICAga2V5OiAnaCcsXHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLmVudGl0eS5oZWlnaHQgfHwgbnVsbFxyXG4gICAgICAgIH0pKTtcclxuICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdUZXh0SXRlbU1vZGVsKHtcclxuICAgICAgICAgICAgbGFiZWw6ICdCbG9vZCBQcmVzc3VyZScsXHJcbiAgICAgICAgICAgIGtleTogJ2NkNHAnLFxyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5lbnRpdHkuYnBcclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgaWYgKHRoaXMuZW50aXR5LnBhdGllbnQuZ2VuZGVyID09PSAnRmVtYWxlJykge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdCb29sSXRlbU1vZGVsKHtcclxuICAgICAgICAgICAgICAgIGxhYmVsOiAnUHJlZ25hbnQnLFxyXG4gICAgICAgICAgICAgICAga2V5OiAncGcnLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuZW50aXR5LnByZWduYW50XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3Qm9vbEl0ZW1Nb2RlbCh7XHJcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0JyZWFzdGZlZWRpbmcnLFxyXG4gICAgICAgICAgICAgICAga2V5OiAnYmYnLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuZW50aXR5LmJyZWFzdGZlZWRpbmdcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdEYXRlSXRlbU1vZGVsKHtcclxuICAgICAgICAgICAgICAgIGtleTogJ2xwbScsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5lbnRpdHkubG1wLFxyXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdMTVAnLFxyXG4gICAgICAgICAgICAgICAgZm9ybWF0OiAnZGQgTU1NLCB5eXl5J1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld1RleHRJdGVtTW9kZWwoe1xyXG4gICAgICAgICAgICBsYWJlbDogJ0xldmVsIG9mIEFkaGVyZW5jZScsXHJcbiAgICAgICAgICAgIGtleTogJ3RzJyxcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMuZW50aXR5LnRiU3RhdHVzXHJcbiAgICAgICAgfSkpO1xyXG4gICAgICAgIHRoaXMucHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld0RhdGVJdGVtTW9kZWwoe1xyXG4gICAgICAgICAgICBrZXk6ICduYScsXHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLmVudGl0eS5uZXh0QXBwb2ludG1lbnQsXHJcbiAgICAgICAgICAgIGxhYmVsOiAnTmV4dCBBcHBvaW50bWVudCBEYXRlJyxcclxuICAgICAgICAgICAgZm9ybWF0OiAnZGQgTU1NLCB5eXl5J1xyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxuXHJcbiAgICBwcmV2aW91c1N0YXRlKCkge1xyXG4gICAgICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB9XHJcbn1cclxuIl19
