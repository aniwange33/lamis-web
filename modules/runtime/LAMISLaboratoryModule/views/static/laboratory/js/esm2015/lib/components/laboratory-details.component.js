import * as tslib_1 from "tslib";
import {Component, ComponentFactoryResolver, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LaboratoryService} from '../services/laboratory.service';
import {TdDialogService} from '@covalent/core';
import {
    CardViewDateItemModel,
    CardViewItem,
    CardViewTextItemModel,
    CardViewUpdateService,
    NotificationService
} from '@alfresco/adf-core';

let LaboratoryDetailsComponent = class LaboratoryDetailsComponent {
    constructor(router, route, laboratoryService, cfr, _dialogService, notificationService, updateService) {
        this.router = router;
        this.route = route;
        this.laboratoryService = laboratoryService;
        this.cfr = cfr;
        this._dialogService = _dialogService;
        this.notificationService = notificationService;
        this.updateService = updateService;
        this.properties = [];
    }

    ngOnInit() {
        this.route.data.subscribe(({entity}) => {
            this.entity = !!entity && entity.body ? entity.body : entity;
            const patientId = this.route.snapshot.paramMap.get('patientId');
            this.laboratoryService.getPatient(patientId).subscribe((res) => this.entity.patient = res);
            this.buildProperties();
        });
    }

    edit() {
        this.router.navigate(['/', 'laboratories', this.entity.uuid, 'patient', this.entity.patient.uuid, 'edit']);
    }

    delete() {
        this._dialogService.openConfirm({
            title: 'Confirm',
            message: 'Do you want to delete this laboratory request, action cannot be reversed?',
            cancelButton: 'No',
            acceptButton: 'Yes',
            width: '500px',
        }).afterClosed().subscribe((accept) => {
            if (accept) {
                this.laboratoryService.delete(this.entity.id).subscribe((res) => {
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
        this.properties.push(new CardViewDateItemModel({
            key: 'sc',
            value: this.entity.dateSampleCollected,
            label: 'Date of Sample Collected',
            format: 'dd MMM, yyyy'
        }));
        this.properties.push(new CardViewDateItemModel({
            key: 'ds',
            value: this.entity.dateAssay,
            label: 'Date of Assay',
            format: 'dd MMM, yyyy'
        }));
        this.properties.push(new CardViewDateItemModel({
            key: 'na',
            value: this.entity.dateResultReceived,
            label: 'Date Result Received',
            format: 'dd MMM, yyyy'
        }));
        this.properties.push(new CardViewTextItemModel({
            label: 'Laboratory Number',
            key: 'fs',
            value: this.entity.labNo
        }));
        this.laboratoryService.getLinesByLaboratory(this.entity.id)
            .subscribe(res => {
                this.dataSource = res;
            });
    }

    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
    }
};
LaboratoryDetailsComponent.ctorParameters = () => [
    {type: Router},
    {type: ActivatedRoute},
    {type: LaboratoryService},
    {type: ComponentFactoryResolver},
    {type: TdDialogService},
    {type: NotificationService},
    {type: CardViewUpdateService}
];
LaboratoryDetailsComponent = tslib_1.__decorate([
    Component({
        selector: 'lamis-laboratory',
        template: "<div class=\"lamis-edit-form\">\r\n    <div class=\"lamis-edit-form-container\">\r\n        <mat-card>\r\n            <mat-card-header>\r\n            </mat-card-header>\r\n            <mat-card-content>\r\n                <adf-card-view [properties]=\"properties\" editable=\"false\"></adf-card-view>\r\n                <mat-divider></mat-divider>\r\n                <adf-datatable *ngIf=\"dataSource\"\r\n                               [rows]=\"dataSource\">\r\n                    <data-columns>\r\n                        <data-column key=\"labTest.description\" title=\"Description\" sortable=\"true\"></data-column>\r\n                        <data-column key=\"result\" title=\"Result\" sortable=\"false\"></data-column>\r\n                        <data-column key=\"labTest.measure\" title=\"Unit\" sortable=\"false\"></data-column>\r\n                        <data-column key=\"comment\" title=\"Comment\" sortable=\"false\"></data-column>\r\n                    </data-columns>\r\n                </adf-datatable>\r\n            </mat-card-content>\r\n            <mat-card-actions class=\"lamis-edit-form-actions\">\r\n                <button mat-button (click)=\"previousState()\">Back</button>\r\n                <button mat-raised-button color=\"warn\" (click)=\"delete()\">Delete</button>\r\n                <button mat-raised-button color=\"primary\" (click)=\"edit()\">Edit</button>\r\n            </mat-card-actions>\r\n        </mat-card>\r\n    </div>\r\n</div>\r\n"
    }),
    tslib_1.__metadata("design:paramtypes", [Router, ActivatedRoute, LaboratoryService,
        ComponentFactoryResolver, TdDialogService,
        NotificationService,
        CardViewUpdateService])
], LaboratoryDetailsComponent);
export {LaboratoryDetailsComponent};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFib3JhdG9yeS1kZXRhaWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xhbWlzLWxhYm9yYXRvcnktMS4xLjEvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9sYWJvcmF0b3J5LWRldGFpbHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLHdCQUF3QixFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdkYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNuRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUNILHFCQUFxQixFQUNyQixZQUFZLEVBQ1oscUJBQXFCLEVBQ3JCLHFCQUFxQixFQUNyQixtQkFBbUIsRUFDdEIsTUFBTSxvQkFBb0IsQ0FBQztBQU01QixJQUFhLDBCQUEwQixHQUF2QyxNQUFhLDBCQUEwQjtJQUtuQyxZQUFvQixNQUFjLEVBQVUsS0FBcUIsRUFBVSxpQkFBb0MsRUFDM0YsR0FBNkIsRUFBVSxjQUErQixFQUN0RSxtQkFBd0MsRUFDeEMsYUFBb0M7UUFIcEMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQVUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUMzRixRQUFHLEdBQUgsR0FBRyxDQUEwQjtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFpQjtRQUN0RSx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLGtCQUFhLEdBQWIsYUFBYSxDQUF1QjtRQVB4RCxlQUFVLEdBQW1CLEVBQUUsQ0FBQztJQVFoQyxDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMs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M0MsS0FBSyxFQUFFLG1CQUFtQjtZQUMxQixHQUFHLEVBQUUsSUFBSTtZQUNULEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUs7U0FDM0IsQ0FBQyxDQUFDLENBQUM7UUFFSixJQUFJLENBQUMsaUJBQWlCLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7YUFDdEQsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2IsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRUQsYUFBYTtRQUNULE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVNLFdBQVc7SUFDbEIsQ0FBQztDQUNKLENBQUE7O1lBaEYrQixNQUFNO1lBQWlCLGNBQWM7WUFBNkIsaUJBQWlCO1lBQ3RGLHdCQUF3QjtZQUEwQixlQUFlO1lBQ2pELG1CQUFtQjtZQUN6QixxQkFBcUI7O0FBUi9DLDBCQUEwQjtJQUp0QyxTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLHk5Q0FBa0Q7S0FDckQsQ0FBQzs2Q0FNOEIsTUFBTSxFQUFpQixjQUFjLEVBQTZCLGlCQUFpQjtRQUN0Rix3QkFBd0IsRUFBMEIsZUFBZTtRQUNqRCxtQkFBbUI7UUFDekIscUJBQXFCO0dBUi9DLDBCQUEwQixDQXFGdEM7U0FyRlksMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IExhYm9yYXRvcnksIExhYm9yYXRvcnlMaW5lIH0gZnJvbSAnLi4vbW9kZWwvbGFib3JhdG9yeS5tb2RlbCc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBMYWJvcmF0b3J5U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2xhYm9yYXRvcnkuc2VydmljZSc7XHJcbmltcG9ydCB7IFRkRGlhbG9nU2VydmljZSB9IGZyb20gJ0Bjb3ZhbGVudC9jb3JlJztcclxuaW1wb3J0IHtcclxuICAgIENhcmRWaWV3RGF0ZUl0ZW1Nb2RlbCxcclxuICAgIENhcmRWaWV3SXRlbSxcclxuICAgIENhcmRWaWV3VGV4dEl0ZW1Nb2RlbCxcclxuICAgIENhcmRWaWV3VXBkYXRlU2VydmljZSxcclxuICAgIE5vdGlmaWNhdGlvblNlcnZpY2VcclxufSBmcm9tICdAYWxmcmVzY28vYWRmLWNvcmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2xhbWlzLWxhYm9yYXRvcnknLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2xhYm9yYXRvcnktZGV0YWlscy5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIExhYm9yYXRvcnlEZXRhaWxzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gICAgcHJvcGVydGllczogQ2FyZFZpZXdJdGVtW10gPSBbXTtcclxuICAgIGVudGl0eTogTGFib3JhdG9yeTtcclxuICAgIHB1YmxpYyBkYXRhU291cmNlOiBMYWJvcmF0b3J5TGluZVtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIGxhYm9yYXRvcnlTZXJ2aWNlOiBMYWJvcmF0b3J5U2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgY2ZyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIHByaXZhdGUgX2RpYWxvZ1NlcnZpY2U6IFRkRGlhbG9nU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgbm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgdXBkYXRlU2VydmljZTogQ2FyZFZpZXdVcGRhdGVTZXJ2aWNlKSB7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZS5kYXRhLnN1YnNjcmliZSgoe2VudGl0eX0pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5lbnRpdHkgPSAhIWVudGl0eSAmJiBlbnRpdHkuYm9keSA/IGVudGl0eS5ib2R5IDogZW50aXR5O1xyXG4gICAgICAgICAgICBjb25zdCBwYXRpZW50SWQgPSB0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtTWFwLmdldCgncGF0aWVudElkJyk7XHJcbiAgICAgICAgICAgIHRoaXMubGFib3JhdG9yeVNlcnZpY2UuZ2V0UGF0aWVudChwYXRpZW50SWQpLnN1YnNjcmliZSgocmVzKSA9PiB0aGlzLmVudGl0eS5wYXRpZW50ID0gcmVzKTtcclxuICAgICAgICAgICAgdGhpcy5idWlsZFByb3BlcnRpZXMoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBlZGl0KCkge1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLycsICdsYWJvcmF0b3JpZXMnLCB0aGlzLmVudGl0eS51dWlkLCAncGF0aWVudCcsIHRoaXMuZW50aXR5LnBhdGllbnQudXVpZCwgJ2VkaXQnXSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlKCkge1xyXG4gICAgICAgIHRoaXMuX2RpYWxvZ1NlcnZpY2Uub3BlbkNvbmZpcm0oe1xyXG4gICAgICAgICAgICB0aXRsZTogJ0NvbmZpcm0nLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiAnRG8geW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgbGFib3JhdG9yeSByZXF1ZXN0LCBhY3Rpb24gY2Fubm90IGJlIHJldmVyc2VkPycsXHJcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvbjogJ05vJyxcclxuICAgICAgICAgICAgYWNjZXB0QnV0dG9uOiAnWWVzJyxcclxuICAgICAgICAgICAgd2lkdGg6ICc1MDBweCcsXHJcbiAgICAgICAgfSkuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUoKGFjY2VwdDogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoYWNjZXB0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYm9yYXRvcnlTZXJ2aWNlLmRlbGV0ZSh0aGlzLmVudGl0eS5pZCkuc3Vic2NyaWJlKChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLm9rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsncGF0aWVudHMnXSlcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc2hvd0Vycm9yKCdFcnJvciBkZWxldGluZyB2aXNpdCwgcGxlYXNlIHRyeSBhZ2FpbicpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIERPIFNPTUVUSElORyBFTFNFXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBidWlsZFByb3BlcnRpZXMoKSB7XHJcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3RGF0ZUl0ZW1Nb2RlbCh7XHJcbiAgICAgICAgICAgIGtleTogJ3NjJyxcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMuZW50aXR5LmRhdGVTYW1wbGVDb2xsZWN0ZWQsXHJcbiAgICAgICAgICAgIGxhYmVsOiAnRGF0ZSBvZiBTYW1wbGUgQ29sbGVjdGVkJyxcclxuICAgICAgICAgICAgZm9ybWF0OiAnZGQgTU1NLCB5eXl5J1xyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3RGF0ZUl0ZW1Nb2RlbCh7XHJcbiAgICAgICAgICAgIGtleTogJ2RzJyxcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMuZW50aXR5LmRhdGVBc3NheSxcclxuICAgICAgICAgICAgbGFiZWw6ICdEYXRlIG9mIEFzc2F5JyxcclxuICAgICAgICAgICAgZm9ybWF0OiAnZGQgTU1NLCB5eXl5J1xyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3RGF0ZUl0ZW1Nb2RlbCh7XHJcbiAgICAgICAgICAgIGtleTogJ25hJyxcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMuZW50aXR5LmRhdGVSZXN1bHRSZWNlaXZlZCxcclxuICAgICAgICAgICAgbGFiZWw6ICdEYXRlIFJlc3VsdCBSZWNlaXZlZCcsXHJcbiAgICAgICAgICAgIGZvcm1hdDogJ2RkIE1NTSwgeXl5eSdcclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3VGV4dEl0ZW1Nb2RlbCh7XHJcbiAgICAgICAgICAgIGxhYmVsOiAnTGFib3JhdG9yeSBOdW1iZXInLFxyXG4gICAgICAgICAgICBrZXk6ICdmcycsXHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLmVudGl0eS5sYWJOb1xyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgdGhpcy5sYWJvcmF0b3J5U2VydmljZS5nZXRMaW5lc0J5TGFib3JhdG9yeSh0aGlzLmVudGl0eS5pZClcclxuICAgICAgICAgICAgLnN1YnNjcmliZShyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhU291cmNlID0gcmVzO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcmV2aW91c1N0YXRlKCkge1xyXG4gICAgICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB9XHJcbn1cclxuIl19
