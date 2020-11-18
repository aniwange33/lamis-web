import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { CardViewBoolItemModel, CardViewItem, CardViewTextItemModel, NotificationService } from '@alfresco/adf-core';
import { ActivatedRoute, Router } from '@angular/router';
import { TdDialogService } from '@covalent/core';
import { CaseManagerService } from '../../services/case-manager.service';
var CaseManagerDetailsComponent = /** @class */ (function () {
    function CaseManagerDetailsComponent(router, route, service, _dialogService, notificationService) {
        this.router = router;
        this.route = route;
        this.service = service;
        this._dialogService = _dialogService;
        this.notificationService = notificationService;
        this.properties = [];
    }
    CaseManagerDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (_a) {
            var entity = _a.entity;
            _this.entity = !!entity && entity.body ? entity.body : entity;
            _this.buildProperties();
        });
    };
    CaseManagerDetailsComponent.prototype.edit = function () {
        this.router.navigate(['/', 'admin', 'case-managers', this.entity.uuid, 'edit']);
    };
    CaseManagerDetailsComponent.prototype.delete = function () {
        var _this = this;
        this._dialogService.openConfirm({
            title: 'Confirm',
            message: 'Do you want to delete this Case Manager, action cannot be reversed?',
            cancelButton: 'No',
            acceptButton: 'Yes',
            width: '500px',
        }).afterClosed().subscribe(function (accept) {
            if (accept) {
                _this.service.delete(_this.entity.id).subscribe(function (res) {
                    if (res.ok) {
                        _this.router.navigate(['admin', 'case-managers']);
                    }
                    else {
                        _this.notificationService.showError('Error deleting Case Manager, please try again');
                    }
                });
            }
            else {
                // DO SOMETHING ELSE
            }
        });
    };
    CaseManagerDetailsComponent.prototype.buildProperties = function () {
        this.properties.push(new CardViewTextItemModel({
            label: 'Name',
            key: 'cs',
            value: this.entity.name
        }));
        this.properties.push(new CardViewTextItemModel({
            label: 'Address',
            key: 'fs',
            value: this.entity.address
        }));
        this.properties.push(new CardViewTextItemModel({
            label: 'Gender',
            key: 'ts',
            value: this.entity.gender === 'FEMALE' ? 'Female' : 'Male'
        }));
        this.properties.push(new CardViewTextItemModel({
            label: 'Telephone',
            key: 'cd4p',
            value: this.entity.phoneNumber
        }));
        this.properties.push(new CardViewBoolItemModel({
            label: 'Active',
            key: 'cd4p',
            value: this.entity.active
        }));
    };
    CaseManagerDetailsComponent.prototype.previousState = function () {
        window.history.back();
    };
    CaseManagerDetailsComponent.ctorParameters = function () { return [
        { type: Router },
        { type: ActivatedRoute },
        { type: CaseManagerService },
        { type: TdDialogService },
        { type: NotificationService }
    ]; };
    CaseManagerDetailsComponent = tslib_1.__decorate([
        Component({
            selector: 'case-manager-details',
            template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <mat-card>\n            <mat-card-header>\n            </mat-card-header>\n            <mat-card-content>\n                <adf-card-view [properties]=\"properties\" editable=\"false\"></adf-card-view>\n            </mat-card-content>\n            <mat-card-actions class=\"lamis-edit-form-actions\">\n                <button mat-button (click)=\"previousState()\">Back</button>\n                <button mat-raised-button color=\"primary\" (click)=\"edit()\">Edit</button>\n            </mat-card-actions>\n        </mat-card>\n    </div>\n</div>\n"
        }),
        tslib_1.__metadata("design:paramtypes", [Router, ActivatedRoute, CaseManagerService,
            TdDialogService,
            NotificationService])
    ], CaseManagerDetailsComponent);
    return CaseManagerDetailsComponent;
}());
export { CaseManagerDetailsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1tYW5hZ2VyLmRldGFpbHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGFtaXMtY2xpbmljLTEuNC4wLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvY2FzZS1tYW5hZ2VtZW50L2Nhc2UtbWFuYWdlci5kZXRhaWxzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN4QyxPQUFPLEVBQUMscUJBQXFCLEVBQUUsWUFBWSxFQUFFLHFCQUFxQixFQUFFLG1CQUFtQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDbkgsT0FBTyxFQUFDLGNBQWMsRUFBRSxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFL0MsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFNdkU7SUFJSSxxQ0FBb0IsTUFBYyxFQUFVLEtBQXFCLEVBQVUsT0FBMkIsRUFDbEYsY0FBK0IsRUFDL0IsbUJBQXdDO1FBRnhDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQW9CO1FBQ2xGLG1CQUFjLEdBQWQsY0FBYyxDQUFpQjtRQUMvQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBTDVELGVBQVUsR0FBbUIsRUFBRSxDQUFDO0lBTWhDLENBQUM7SUFFRCw4Q0FBUSxHQUFSO1FBQUEsaUJBS0M7UUFKRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBQyxFQUFRO2dCQUFQLGtCQUFNO1lBQzlCLEtBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMs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Tm5ELDJCQUEyQjtRQUp2QyxTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsc0JBQXNCO1lBQ2hDLHdvQkFBb0Q7U0FDdkQsQ0FBQztpREFLOEIsTUFBTSxFQUFpQixjQUFjLEVBQW1CLGtCQUFrQjtZQUNsRSxlQUFlO1lBQ1YsbUJBQW1CO09BTm5ELDJCQUEyQixDQTBFdkM7SUFBRCxrQ0FBQztDQUFBLEFBMUVELElBMEVDO1NBMUVZLDJCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q2FyZFZpZXdCb29sSXRlbU1vZGVsLCBDYXJkVmlld0l0ZW0sIENhcmRWaWV3VGV4dEl0ZW1Nb2RlbCwgTm90aWZpY2F0aW9uU2VydmljZX0gZnJvbSAnQGFsZnJlc2NvL2FkZi1jb3JlJztcbmltcG9ydCB7QWN0aXZhdGVkUm91dGUsIFJvdXRlcn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7VGREaWFsb2dTZXJ2aWNlfSBmcm9tICdAY292YWxlbnQvY29yZSc7XG5pbXBvcnQge0Nhc2VNYW5hZ2VyfSBmcm9tICcuLi8uLi9tb2RlbC9jYXNlLW1hbmFnZW1lbnQubW9kZWwnO1xuaW1wb3J0IHtDYXNlTWFuYWdlclNlcnZpY2V9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2Nhc2UtbWFuYWdlci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdjYXNlLW1hbmFnZXItZGV0YWlscycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2Nhc2UtbWFuYWdlci5kZXRhaWxzLmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBDYXNlTWFuYWdlckRldGFpbHNDb21wb25lbnQge1xuICAgIHByb3BlcnRpZXM6IENhcmRWaWV3SXRlbVtdID0gW107XG4gICAgZW50aXR5OiBDYXNlTWFuYWdlcjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIHNlcnZpY2U6IENhc2VNYW5hZ2VyU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIF9kaWFsb2dTZXJ2aWNlOiBUZERpYWxvZ1NlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBub3RpZmljYXRpb25TZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMucm91dGUuZGF0YS5zdWJzY3JpYmUoKHtlbnRpdHl9KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVudGl0eSA9ICEhZW50aXR5ICYmIGVudGl0eS5ib2R5ID8gZW50aXR5LmJvZHkgOiBlbnRpdHk7XG4gICAgICAgICAgICB0aGlzLmJ1aWxkUHJvcGVydGllcygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBlZGl0KCkge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy8nLCAnYWRtaW4nLCAnY2FzZS1tYW5hZ2VycycsIHRoaXMuZW50aXR5LnV1aWQsICdlZGl0J10pO1xuICAgIH1cblxuICAgIGRlbGV0ZSgpIHtcbiAgICAgICAgdGhpcy5fZGlhbG9nU2VydmljZS5vcGVuQ29uZmlybSh7XG4gICAgICAgICAgICB0aXRsZTogJ0NvbmZpcm0nLFxuICAgICAgICAgICAgbWVzc2FnZTogJ0RvIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIENhc2UgTWFuYWdlciwgYWN0aW9uIGNhbm5vdCBiZSByZXZlcnNlZD8nLFxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uOiAnTm8nLFxuICAgICAgICAgICAgYWNjZXB0QnV0dG9uOiAnWWVzJyxcbiAgICAgICAgICAgIHdpZHRoOiAnNTAwcHgnLFxuICAgICAgICB9KS5hZnRlckNsb3NlZCgpLnN1YnNjcmliZSgoYWNjZXB0OiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgICBpZiAoYWNjZXB0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLmRlbGV0ZSh0aGlzLmVudGl0eS5pZCkuc3Vic2NyaWJlKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWydhZG1pbicsICdjYXNlLW1hbmFnZXJzJ10pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnNob3dFcnJvcignRXJyb3IgZGVsZXRpbmcgQ2FzZSBNYW5hZ2VyLCBwbGVhc2UgdHJ5IGFnYWluJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gRE8gU09NRVRISU5HIEVMU0VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYnVpbGRQcm9wZXJ0aWVzKCkge1xuICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdUZXh0SXRlbU1vZGVsKHtcbiAgICAgICAgICAgIGxhYmVsOiAnTmFtZScsXG4gICAgICAgICAgICBrZXk6ICdjcycsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5lbnRpdHkubmFtZVxuICAgICAgICB9KSk7XG4gICAgICAgIHRoaXMucHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld1RleHRJdGVtTW9kZWwoe1xuICAgICAgICAgICAgbGFiZWw6ICdBZGRyZXNzJyxcbiAgICAgICAgICAgIGtleTogJ2ZzJyxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLmVudGl0eS5hZGRyZXNzXG4gICAgICAgIH0pKTtcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3VGV4dEl0ZW1Nb2RlbCh7XG4gICAgICAgICAgICBsYWJlbDogJ0dlbmRlcicsXG4gICAgICAgICAgICBrZXk6ICd0cycsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5lbnRpdHkuZ2VuZGVyID09PSAnRkVNQUxFJyA/ICdGZW1hbGUnIDogJ01hbGUnXG4gICAgICAgIH0pKTtcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3VGV4dEl0ZW1Nb2RlbCh7XG4gICAgICAgICAgICBsYWJlbDogJ1RlbGVwaG9uZScsXG4gICAgICAgICAgICBrZXk6ICdjZDRwJyxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLmVudGl0eS5waG9uZU51bWJlclxuICAgICAgICB9KSk7XG4gICAgICAgIHRoaXMucHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld0Jvb2xJdGVtTW9kZWwoe1xuICAgICAgICAgICAgbGFiZWw6ICdBY3RpdmUnLFxuICAgICAgICAgICAga2V5OiAnY2Q0cCcsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5lbnRpdHkuYWN0aXZlXG4gICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBwcmV2aW91c1N0YXRlKCkge1xuICAgICAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XG4gICAgfVxuXG59XG4iXX0=