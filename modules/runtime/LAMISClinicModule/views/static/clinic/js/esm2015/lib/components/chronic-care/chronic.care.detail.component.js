import * as tslib_1 from "tslib";
import {Component} from '@angular/core';
import {ClinicService} from '../../services/clinic.service';
import {CardViewItem, NotificationService} from '@alfresco/adf-core';
import {ActivatedRoute, Router} from '@angular/router';
import {TdDialogService} from '@covalent/core';
import {ChronicCareService} from '../../services/chronic.care.service';

let ChronicCareDetailComponent = class ChronicCareDetailComponent {
    constructor(router, route, chronicCareService, _dialogService, notificationService, clinicService) {
        this.router = router;
        this.route = route;
        this.chronicCareService = chronicCareService;
        this._dialogService = _dialogService;
        this.notificationService = notificationService;
        this.clinicService = clinicService;
        this.properties = [];
    }

    ngOnInit() {
        this.route.data.subscribe(({entity}) => {
            this.entity = !!entity && entity.body ? entity.body : entity;
            const patientId = this.route.snapshot.paramMap.get('patientId');
            this.clinicService.getPatient(patientId).subscribe((res) => this.entity.patient = res);
            this.buildProperties();
        });
    }

    edit() {
        this.router.navigate(['/', 'chronic-cares', this.entity.uuid, 'patient', this.entity.patient.uuid, 'edit']);
    }

    delete() {
        this._dialogService.openConfirm({
            title: 'Confirm',
            message: 'Do you want to delete this chronic care visit, action cannot be reversed?',
            cancelButton: 'No',
            acceptButton: 'Yes',
            width: '500px',
        }).afterClosed().subscribe((accept) => {
            if (accept) {
                this.chronicCareService.delete(this.entity.id).subscribe((res) => {
                    if (res.ok) {
                        this.router.navigate(['patients']);
                    } else {
                        this.notificationService.showError('Error deleting visit, please try again');
                    }
                });
            } else {
                // DO SOMETHING ELSE
            }
        });
    }

    buildProperties() {
    }

    previousState() {
        window.history.back();
    }
};
ChronicCareDetailComponent.ctorParameters = () => [
    {type: Router},
    {type: ActivatedRoute},
    {type: ChronicCareService},
    {type: TdDialogService},
    {type: NotificationService},
    {type: ClinicService}
];
ChronicCareDetailComponent = tslib_1.__decorate([
    Component({
        selector: 'chronic-care-detail',
        template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <mat-card>\n            <mat-card-header>\n            </mat-card-header>\n            <mat-card-content>\n                <adf-card-view [properties]=\"properties\" editable=\"false\"></adf-card-view>\n            </mat-card-content>\n            <mat-card-actions class=\"lamis-edit-form-actions\">\n                <button mat-button (click)=\"previousState()\">Back</button>\n                <button mat-raised-button color=\"warn\" (click)=\"delete()\">Delete</button>\n                <button mat-raised-button color=\"primary\" (click)=\"edit()\">Edit</button>\n            </mat-card-actions>\n        </mat-card>\n    </div>\n</div>\n"
    }),
    tslib_1.__metadata("design:paramtypes", [Router, ActivatedRoute, ChronicCareService,
        TdDialogService, NotificationService,
        ClinicService])
], ChronicCareDetailComponent);
export {ChronicCareDetailComponent};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hyb25pYy5jYXJlLmRldGFpbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1jbGluaWMtMS4xLjMvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9jaHJvbmljLWNhcmUvY2hyb25pYy5jYXJlLmRldGFpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN2RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXpELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQU16RSxJQUFhLDBCQUEwQixHQUF2QyxNQUFhLDBCQUEwQjtJQUluQyxZQUFvQixNQUFjLEVBQVUsS0FBcUIsRUFBVSxrQkFBc0MsRUFDN0YsY0FBK0IsRUFBVSxtQkFBd0MsRUFDakYsYUFBNEI7UUFGNUIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQVUsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUM3RixtQkFBYyxHQUFkLGNBQWMsQ0FBaUI7UUFBVSx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ2pGLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBTGhELGVBQVUsR0FBbUIsRUFBRSxDQUFDO0lBTWhDLENBQUM7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsRUFBRSxFQUFFO1lBQ25DLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDN0QsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNoRSxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZGLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxJQUFJO1FBQ0EsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUUsZUFBZSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNoSCxDQUFDO0lBRUQsTUFBTTtRQUNGLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDO1lBQzVCLEtBQUssRUFBRSxTQUFTO1lBQ2hCLE9BQU8sRUFBRSwyRUFBMkU7WUFDcEYsWUFBWSxFQUFFLElBQUk7WUFDbEIsWUFBWSxFQUFFLEtBQUs7WUFDbkIsS0FBSyxFQUFFLE9BQU87U0FDakIsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQWUsRUFBRSxFQUFFO1lBQzNDLElBQUksTUFBTSxFQUFFO2dCQUNSLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtvQkFDN0QsSUFBSSxHQUFHLENBQUMsRUFBRSxFQUFFO3dCQUNSLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQTtxQkFDckM7eUJBQU07d0JBQ0gsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFBO3FCQUMvRTtnQkFDTCxDQUFDLENBQUMsQ0FBQTthQUNMO2lCQUFNO2dCQUNILG9CQUFvQjthQUN2QjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELGVBQWU7SUFFZixDQUFDO0lBR0QsYUFBYTtRQUNULE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDMUIsQ0FBQztDQUNKLENBQUE7O1lBaEQrQixNQUFNO1lBQWlCLGNBQWM7WUFBOEIsa0JBQWtCO1lBQzdFLGVBQWU7WUFBK0IsbUJBQW1CO1lBQ2xFLGFBQWE7O0FBTnZDLDBCQUEwQjtJQUp0QyxTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUscUJBQXFCO1FBQy9CLHV1QkFBbUQ7S0FDdEQsQ0FBQzs2Q0FLOEIsTUFBTSxFQUFpQixjQUFjLEVBQThCLGtCQUFrQjtRQUM3RSxlQUFlLEVBQStCLG1CQUFtQjtRQUNsRSxhQUFhO0dBTnZDLDBCQUEwQixDQW9EdEM7U0FwRFksMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENsaW5pY1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jbGluaWMuc2VydmljZSc7XG5pbXBvcnQgeyBDYXJkVmlld0l0ZW0sIE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICdAYWxmcmVzY28vYWRmLWNvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBDaHJvbmljQ2FyZSB9IGZyb20gJy4uLy4uL21vZGVsL2NsaW5pYy5tb2RlbCc7XG5pbXBvcnQgeyBUZERpYWxvZ1NlcnZpY2UgfSBmcm9tICdAY292YWxlbnQvY29yZSc7XG5pbXBvcnQgeyBDaHJvbmljQ2FyZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jaHJvbmljLmNhcmUuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnY2hyb25pYy1jYXJlLWRldGFpbCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2Nocm9uaWMuY2FyZS5kZXRhaWwuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIENocm9uaWNDYXJlRGV0YWlsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBwcm9wZXJ0aWVzOiBDYXJkVmlld0l0ZW1bXSA9IFtdO1xuICAgIGVudGl0eTogQ2hyb25pY0NhcmU7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHJpdmF0ZSBjaHJvbmljQ2FyZVNlcnZpY2U6IENocm9uaWNDYXJlU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIF9kaWFsb2dTZXJ2aWNlOiBUZERpYWxvZ1NlcnZpY2UsIHByaXZhdGUgbm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGNsaW5pY1NlcnZpY2U6IENsaW5pY1NlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5yb3V0ZS5kYXRhLnN1YnNjcmliZSgoe2VudGl0eX0pID0+IHtcbiAgICAgICAgICAgIHRoaXMuZW50aXR5ID0gISFlbnRpdHkgJiYgZW50aXR5LmJvZHkgPyBlbnRpdHkuYm9keSA6IGVudGl0eTtcbiAgICAgICAgICAgIGNvbnN0IHBhdGllbnRJZCA9IHRoaXMucm91dGUuc25hcHNob3QucGFyYW1NYXAuZ2V0KCdwYXRpZW50SWQnKTtcbiAgICAgICAgICAgIHRoaXMuY2xpbmljU2VydmljZS5nZXRQYXRpZW50KHBhdGllbnRJZCkuc3Vic2NyaWJlKChyZXMpID0+IHRoaXMuZW50aXR5LnBhdGllbnQgPSByZXMpO1xuICAgICAgICAgICAgdGhpcy5idWlsZFByb3BlcnRpZXMoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZWRpdCgpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvJywgJ2Nocm9uaWMtY2FyZXMnLCB0aGlzLmVudGl0eS51dWlkLCAncGF0aWVudCcsIHRoaXMuZW50aXR5LnBhdGllbnQudXVpZCwgJ2VkaXQnXSk7XG4gICAgfVxuXG4gICAgZGVsZXRlKCkge1xuICAgICAgICB0aGlzLl9kaWFsb2dTZXJ2aWNlLm9wZW5Db25maXJtKHtcbiAgICAgICAgICAgIHRpdGxlOiAnQ29uZmlybScsXG4gICAgICAgICAgICBtZXNzYWdlOiAnRG8geW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgY2hyb25pYyBjYXJlIHZpc2l0LCBhY3Rpb24gY2Fubm90IGJlIHJldmVyc2VkPycsXG4gICAgICAgICAgICBjYW5jZWxCdXR0b246ICdObycsXG4gICAgICAgICAgICBhY2NlcHRCdXR0b246ICdZZXMnLFxuICAgICAgICAgICAgd2lkdGg6ICc1MDBweCcsXG4gICAgICAgIH0pLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKChhY2NlcHQ6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgIGlmIChhY2NlcHQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNocm9uaWNDYXJlU2VydmljZS5kZWxldGUodGhpcy5lbnRpdHkuaWQpLnN1YnNjcmliZSgocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsncGF0aWVudHMnXSlcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zaG93RXJyb3IoJ0Vycm9yIGRlbGV0aW5nIHZpc2l0LCBwbGVhc2UgdHJ5IGFnYWluJylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIERPIFNPTUVUSElORyBFTFNFXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGJ1aWxkUHJvcGVydGllcygpIHtcblxuICAgIH1cblxuXG4gICAgcHJldmlvdXNTdGF0ZSgpIHtcbiAgICAgICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xuICAgIH1cbn1cbiJdfQ==
