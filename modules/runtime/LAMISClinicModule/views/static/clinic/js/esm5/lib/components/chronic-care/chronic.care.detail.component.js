import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ClinicService } from '../../services/clinic.service';
import { CardViewItem, NotificationService } from '@alfresco/adf-core';
import { ActivatedRoute, Router } from '@angular/router';
import { TdDialogService } from '@covalent/core';
import { ChronicCareService } from '../../services/chronic.care.service';
var ChronicCareDetailComponent = /** @class */ (function () {
    function ChronicCareDetailComponent(router, route, chronicCareService, _dialogService, notificationService, clinicService) {
        this.router = router;
        this.route = route;
        this.chronicCareService = chronicCareService;
        this._dialogService = _dialogService;
        this.notificationService = notificationService;
        this.clinicService = clinicService;
        this.properties = [];
    }
    ChronicCareDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (_a) {
            var entity = _a.entity;
            _this.entity = !!entity && entity.body ? entity.body : entity;
            var patientId = _this.route.snapshot.paramMap.get('patientId');
            _this.clinicService.getPatient(patientId).subscribe(function (res) { return _this.entity.patient = res; });
            _this.buildProperties();
        });
    };
    ChronicCareDetailComponent.prototype.edit = function () {
        this.router.navigate(['/', 'chronic-cares', this.entity.uuid, 'patient', this.entity.patient.uuid, 'edit']);
    };
    ChronicCareDetailComponent.prototype.delete = function () {
        var _this = this;
        this._dialogService.openConfirm({
            title: 'Confirm',
            message: 'Do you want to delete this chronic care visit, action cannot be reversed?',
            cancelButton: 'No',
            acceptButton: 'Yes',
            width: '500px',
        }).afterClosed().subscribe(function (accept) {
            if (accept) {
                _this.chronicCareService.delete(_this.entity.id).subscribe(function (res) {
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
    ChronicCareDetailComponent.prototype.buildProperties = function () {
    };
    ChronicCareDetailComponent.prototype.previousState = function () {
        window.history.back();
    };
    ChronicCareDetailComponent.ctorParameters = function () { return [
        { type: Router },
        { type: ActivatedRoute },
        { type: ChronicCareService },
        { type: TdDialogService },
        { type: NotificationService },
        { type: ClinicService }
    ]; };
    ChronicCareDetailComponent = tslib_1.__decorate([
        Component({
            selector: 'chronic-care-detail',
            template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <mat-card>\n            <mat-card-header>\n            </mat-card-header>\n            <mat-card-content>\n                <adf-card-view [properties]=\"properties\" editable=\"false\"></adf-card-view>\n            </mat-card-content>\n            <mat-card-actions class=\"lamis-edit-form-actions\">\n                <button mat-button (click)=\"previousState()\">Back</button>\n                <button mat-raised-button color=\"warn\" (click)=\"delete()\">Delete</button>\n                <button mat-raised-button color=\"primary\" (click)=\"edit()\">Edit</button>\n            </mat-card-actions>\n        </mat-card>\n    </div>\n</div>\n"
        }),
        tslib_1.__metadata("design:paramtypes", [Router, ActivatedRoute, ChronicCareService,
            TdDialogService, NotificationService,
            ClinicService])
    ], ChronicCareDetailComponent);
    return ChronicCareDetailComponent;
}());
export { ChronicCareDetailComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hyb25pYy5jYXJlLmRldGFpbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1jbGluaWMtMS40LjAvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9jaHJvbmljLWNhcmUvY2hyb25pYy5jYXJlLmRldGFpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFDaEQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQzVELE9BQU8sRUFBQyxZQUFZLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRSxPQUFPLEVBQUMsY0FBYyxFQUFFLE1BQU0sRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRXZELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMvQyxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQU12RTtJQUlJLG9DQUFvQixNQUFjLEVBQVUsS0FBcUIsRUFBVSxrQkFBc0MsRUFDN0YsY0FBK0IsRUFBVSxtQkFBd0MsRUFDakYsYUFBNEI7UUFGNUIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQVUsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUM3RixtQkFBYyxHQUFkLGNBQWMsQ0FBaUI7UUFBVSx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ2pGLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBTGhELGVBQVUsR0FBbUIsRUFBRSxDQUFDO0lBTWhDLENBQUM7SUFFRCw2Q0FBUSxHQUFSO1FBQUEsaUJBT0M7UUFORyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBQyxFQUFRO2dCQUFQLGtCQUFNO1lBQzlCLEtBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDN0QsSUFBTSxTQUFTLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNoRSxLQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQyxHQUFHLElBQUssT0FBQSxLQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxHQUFHLEVBQXpCLENBQXlCLENBQUMsQ0FBQztZQUN2RixLQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQseUNBQUksR0FBSjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFFLGVBQWUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDaEgsQ0FBQztJQUVELDJDQUFNLEdBQU47UUFBQSxpQkFvQkM7UUFuQkcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUM7WUFDNUIsS0FBSyxFQUFFLFNBQVM7WUFDaEIsT0FBTyxFQUFFLDJFQUEyRTtZQUNwRixZQUFZLEVBQUUsSUFBSTtZQUNsQixZQUFZLEVBQUUsS0FBSztZQUNuQixLQUFLLEVBQUUsT0FBTztTQUNqQixDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLFVBQUMsTUFBZTtZQUN2QyxJQUFJLE1BQU0sRUFBRTtnQkFDUixLQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUMsR0FBRztvQkFDekQsSUFBSSxHQUFHLENBQUMsRUFBRSxFQUFFO3dCQUNSLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztxQkFDdEM7eUJBQU07d0JBQ0gsS0FBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO3FCQUNoRjtnQkFDTCxDQUFDLENBQUMsQ0FBQzthQUNOO2lCQUFNO2dCQUNILG9CQUFvQjthQUN2QjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELG9EQUFlLEdBQWY7SUFFQSxDQUFDO0lBR0Qsa0RBQWEsR0FBYjtRQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDMUIsQ0FBQzs7Z0JBL0MyQixNQUFNO2dCQUFpQixjQUFjO2dCQUE4QixrQkFBa0I7Z0JBQzdFLGVBQWU7Z0JBQStCLG1CQUFtQjtnQkFDbEUsYUFBYTs7SUFOdkMsMEJBQTBCO1FBSnRDLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxxQkFBcUI7WUFDL0IsdXVCQUFtRDtTQUN0RCxDQUFDO2lEQUs4QixNQUFNLEVBQWlCLGNBQWMsRUFBOEIsa0JBQWtCO1lBQzdFLGVBQWUsRUFBK0IsbUJBQW1CO1lBQ2xFLGFBQWE7T0FOdkMsMEJBQTBCLENBb0R0QztJQUFELGlDQUFDO0NBQUEsQUFwREQsSUFvREM7U0FwRFksMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NsaW5pY1NlcnZpY2V9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2NsaW5pYy5zZXJ2aWNlJztcbmltcG9ydCB7Q2FyZFZpZXdJdGVtLCBOb3RpZmljYXRpb25TZXJ2aWNlfSBmcm9tICdAYWxmcmVzY28vYWRmLWNvcmUnO1xuaW1wb3J0IHtBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtDaHJvbmljQ2FyZX0gZnJvbSAnLi4vLi4vbW9kZWwvY2xpbmljLm1vZGVsJztcbmltcG9ydCB7VGREaWFsb2dTZXJ2aWNlfSBmcm9tICdAY292YWxlbnQvY29yZSc7XG5pbXBvcnQge0Nocm9uaWNDYXJlU2VydmljZX0gZnJvbSAnLi4vLi4vc2VydmljZXMvY2hyb25pYy5jYXJlLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2Nocm9uaWMtY2FyZS1kZXRhaWwnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9jaHJvbmljLmNhcmUuZGV0YWlsLmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBDaHJvbmljQ2FyZURldGFpbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgcHJvcGVydGllczogQ2FyZFZpZXdJdGVtW10gPSBbXTtcbiAgICBlbnRpdHk6IENocm9uaWNDYXJlO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsIHByaXZhdGUgY2hyb25pY0NhcmVTZXJ2aWNlOiBDaHJvbmljQ2FyZVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBfZGlhbG9nU2VydmljZTogVGREaWFsb2dTZXJ2aWNlLCBwcml2YXRlIG5vdGlmaWNhdGlvblNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBjbGluaWNTZXJ2aWNlOiBDbGluaWNTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMucm91dGUuZGF0YS5zdWJzY3JpYmUoKHtlbnRpdHl9KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVudGl0eSA9ICEhZW50aXR5ICYmIGVudGl0eS5ib2R5ID8gZW50aXR5LmJvZHkgOiBlbnRpdHk7XG4gICAgICAgICAgICBjb25zdCBwYXRpZW50SWQgPSB0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtTWFwLmdldCgncGF0aWVudElkJyk7XG4gICAgICAgICAgICB0aGlzLmNsaW5pY1NlcnZpY2UuZ2V0UGF0aWVudChwYXRpZW50SWQpLnN1YnNjcmliZSgocmVzKSA9PiB0aGlzLmVudGl0eS5wYXRpZW50ID0gcmVzKTtcbiAgICAgICAgICAgIHRoaXMuYnVpbGRQcm9wZXJ0aWVzKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGVkaXQoKSB7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLycsICdjaHJvbmljLWNhcmVzJywgdGhpcy5lbnRpdHkudXVpZCwgJ3BhdGllbnQnLCB0aGlzLmVudGl0eS5wYXRpZW50LnV1aWQsICdlZGl0J10pO1xuICAgIH1cblxuICAgIGRlbGV0ZSgpIHtcbiAgICAgICAgdGhpcy5fZGlhbG9nU2VydmljZS5vcGVuQ29uZmlybSh7XG4gICAgICAgICAgICB0aXRsZTogJ0NvbmZpcm0nLFxuICAgICAgICAgICAgbWVzc2FnZTogJ0RvIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGNocm9uaWMgY2FyZSB2aXNpdCwgYWN0aW9uIGNhbm5vdCBiZSByZXZlcnNlZD8nLFxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uOiAnTm8nLFxuICAgICAgICAgICAgYWNjZXB0QnV0dG9uOiAnWWVzJyxcbiAgICAgICAgICAgIHdpZHRoOiAnNTAwcHgnLFxuICAgICAgICB9KS5hZnRlckNsb3NlZCgpLnN1YnNjcmliZSgoYWNjZXB0OiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgICBpZiAoYWNjZXB0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaHJvbmljQ2FyZVNlcnZpY2UuZGVsZXRlKHRoaXMuZW50aXR5LmlkKS5zdWJzY3JpYmUoKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJ3BhdGllbnRzJ10pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnNob3dFcnJvcignRXJyb3IgZGVsZXRpbmcgdmlzaXQsIHBsZWFzZSB0cnkgYWdhaW4nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBETyBTT01FVEhJTkcgRUxTRVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBidWlsZFByb3BlcnRpZXMoKSB7XG5cbiAgICB9XG5cblxuICAgIHByZXZpb3VzU3RhdGUoKSB7XG4gICAgICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcbiAgICB9XG59XG4iXX0=