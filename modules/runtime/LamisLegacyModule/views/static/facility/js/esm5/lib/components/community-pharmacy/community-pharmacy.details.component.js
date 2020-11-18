import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { CardViewBoolItemModel, CardViewItem, CardViewTextItemModel, NotificationService } from '@alfresco/adf-core';
import { ActivatedRoute, Router } from '@angular/router';
import { TdDialogService } from '@covalent/core';
import { CommunityPharmacyService } from '../../services/community-pharmacy.service';
var CommunityPharmacyDetailsComponent = /** @class */ (function () {
    function CommunityPharmacyDetailsComponent(router, route, service, _dialogService, notificationService) {
        this.router = router;
        this.route = route;
        this.service = service;
        this._dialogService = _dialogService;
        this.notificationService = notificationService;
        this.properties = [];
    }
    CommunityPharmacyDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (_a) {
            var entity = _a.entity;
            _this.entity = !!entity && entity.body ? entity.body : entity;
            _this.buildProperties();
        });
    };
    CommunityPharmacyDetailsComponent.prototype.edit = function () {
        this.router.navigate(['/', 'admin', 'config', 'community-pharmacies', this.entity.id, 'edit']);
    };
    CommunityPharmacyDetailsComponent.prototype.delete = function () {
        var _this = this;
        this._dialogService.openConfirm({
            title: 'Confirm',
            message: 'Do you want to delete this Community Pharmacy, action cannot be reversed?',
            cancelButton: 'No',
            acceptButton: 'Yes',
            width: '500px',
        }).afterClosed().subscribe(function (accept) {
            if (accept) {
                _this.service.delete(_this.entity.id).subscribe(function (res) {
                    if (res.ok) {
                        _this.router.navigate(['admin', 'config', 'community-pharmacies']);
                    }
                    else {
                        _this.notificationService.showError('Error deleting Community Pharmacy, please try again');
                    }
                });
            }
            else {
                // DO SOMETHING ELSE
            }
        });
    };
    CommunityPharmacyDetailsComponent.prototype.buildProperties = function () {
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
            label: 'PIN',
            key: 'fs',
            value: this.entity.pin
        }));
        this.properties.push(new CardViewTextItemModel({
            label: 'Phone',
            key: 'ts',
            value: this.entity.phone
        }));
        this.properties.push(new CardViewTextItemModel({
            label: 'Email',
            key: 'cd4p',
            value: this.entity.email
        }));
        this.properties.push(new CardViewBoolItemModel({
            label: 'Active',
            key: 'cd4p',
            value: this.entity.active
        }));
    };
    CommunityPharmacyDetailsComponent.prototype.previousState = function () {
        window.history.back();
    };
    CommunityPharmacyDetailsComponent.ctorParameters = function () { return [
        { type: Router },
        { type: ActivatedRoute },
        { type: CommunityPharmacyService },
        { type: TdDialogService },
        { type: NotificationService }
    ]; };
    CommunityPharmacyDetailsComponent = tslib_1.__decorate([
        Component({
            selector: 'community-pharmacy-details',
            template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <mat-card>\n            <mat-card-header>\n            </mat-card-header>\n            <mat-card-content>\n                <adf-card-view [properties]=\"properties\" editable=\"false\"></adf-card-view>\n            </mat-card-content>\n            <mat-card-actions class=\"lamis-edit-form-actions\">\n                <button mat-button (click)=\"previousState()\">Back</button>\n                <button mat-raised-button color=\"primary\" (click)=\"edit()\">Edit</button>\n            </mat-card-actions>\n        </mat-card>\n    </div>\n</div>\n"
        })
    ], CommunityPharmacyDetailsComponent);
    return CommunityPharmacyDetailsComponent;
}());
export { CommunityPharmacyDetailsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbXVuaXR5LXBoYXJtYWN5LmRldGFpbHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGFtaXMtZmFjaWxpdHktMS4yLjAvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9jb21tdW5pdHktcGhhcm1hY3kvY29tbXVuaXR5LXBoYXJtYWN5LmRldGFpbHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxZQUFZLEVBQUUscUJBQXFCLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNySCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVqRCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQU1yRjtJQUlJLDJDQUFvQixNQUFjLEVBQVUsS0FBcUIsRUFBVSxPQUFpQyxFQUN4RixjQUErQixFQUMvQixtQkFBd0M7UUFGeEMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBMEI7UUFDeEYsbUJBQWMsR0FBZCxjQUFjLENBQWlCO1FBQy9CLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFMNUQsZUFBVSxHQUFtQixFQUFFLENBQUM7SUFNaEMsQ0FBQztJQUVELG9EQUFRLEdBQVI7UUFBQSxpQkFLQztRQUpHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFDLEVBQVE7Z0JBQVAsa0JBQU07WUFDOUIsS0FBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FB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QUNSLENBQUM7SUFFRCx5REFBYSxHQUFiO1FBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMxQixDQUFDOztnQkF6RTJCLE1BQU07Z0JBQWlCLGNBQWM7Z0JBQW1CLHdCQUF3QjtnQkFDeEUsZUFBZTtnQkFDVixtQkFBbUI7O0lBTm5ELGlDQUFpQztRQUo3QyxTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsNEJBQTRCO1lBQ3RDLHdvQkFBMEQ7U0FDN0QsQ0FBQztPQUNXLGlDQUFpQyxDQStFN0M7SUFBRCx3Q0FBQztDQUFBLEFBL0VELElBK0VDO1NBL0VZLGlDQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYXJkVmlld0Jvb2xJdGVtTW9kZWwsIENhcmRWaWV3SXRlbSwgQ2FyZFZpZXdUZXh0SXRlbU1vZGVsLCBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnQGFsZnJlc2NvL2FkZi1jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgVGREaWFsb2dTZXJ2aWNlIH0gZnJvbSAnQGNvdmFsZW50L2NvcmUnO1xuaW1wb3J0IHsgQ29tbXVuaXR5UGhhcm1hY3kgfSBmcm9tICcuLi8uLi9tb2RlbC9jb21tdW5pdHktcGhhcm1hY3kubW9kZWwnO1xuaW1wb3J0IHsgQ29tbXVuaXR5UGhhcm1hY3lTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvY29tbXVuaXR5LXBoYXJtYWN5LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2NvbW11bml0eS1waGFybWFjeS1kZXRhaWxzJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY29tbXVuaXR5LXBoYXJtYWN5LmRldGFpbHMuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIENvbW11bml0eVBoYXJtYWN5RGV0YWlsc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdHtcbiAgICBwcm9wZXJ0aWVzOiBDYXJkVmlld0l0ZW1bXSA9IFtdO1xuICAgIGVudGl0eTogQ29tbXVuaXR5UGhhcm1hY3k7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHJpdmF0ZSBzZXJ2aWNlOiBDb21tdW5pdHlQaGFybWFjeVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBfZGlhbG9nU2VydmljZTogVGREaWFsb2dTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgbm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnJvdXRlLmRhdGEuc3Vic2NyaWJlKCh7ZW50aXR5fSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5lbnRpdHkgPSAhIWVudGl0eSAmJiBlbnRpdHkuYm9keSA/IGVudGl0eS5ib2R5IDogZW50aXR5O1xuICAgICAgICAgICAgdGhpcy5idWlsZFByb3BlcnRpZXMoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZWRpdCgpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvJywgJ2FkbWluJywgJ2NvbmZpZycsICdjb21tdW5pdHktcGhhcm1hY2llcycsIHRoaXMuZW50aXR5LmlkLCAnZWRpdCddKTtcbiAgICB9XG5cbiAgICBkZWxldGUoKSB7XG4gICAgICAgIHRoaXMuX2RpYWxvZ1NlcnZpY2Uub3BlbkNvbmZpcm0oe1xuICAgICAgICAgICAgdGl0bGU6ICdDb25maXJtJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdEbyB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBDb21tdW5pdHkgUGhhcm1hY3ksIGFjdGlvbiBjYW5ub3QgYmUgcmV2ZXJzZWQ/JyxcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvbjogJ05vJyxcbiAgICAgICAgICAgIGFjY2VwdEJ1dHRvbjogJ1llcycsXG4gICAgICAgICAgICB3aWR0aDogJzUwMHB4JyxcbiAgICAgICAgfSkuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUoKGFjY2VwdDogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgaWYgKGFjY2VwdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VydmljZS5kZWxldGUodGhpcy5lbnRpdHkuaWQpLnN1YnNjcmliZSgocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnYWRtaW4nLCAnY29uZmlnJywgJ2NvbW11bml0eS1waGFybWFjaWVzJ10pXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc2hvd0Vycm9yKCdFcnJvciBkZWxldGluZyBDb21tdW5pdHkgUGhhcm1hY3ksIHBsZWFzZSB0cnkgYWdhaW4nKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gRE8gU09NRVRISU5HIEVMU0VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYnVpbGRQcm9wZXJ0aWVzKCkge1xuICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdUZXh0SXRlbU1vZGVsKHtcbiAgICAgICAgICAgIGxhYmVsOiAnTmFtZScsXG4gICAgICAgICAgICBrZXk6ICdjcycsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5lbnRpdHkubmFtZVxuICAgICAgICB9KSk7XG4gICAgICAgIHRoaXMucHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld1RleHRJdGVtTW9kZWwoe1xuICAgICAgICAgICAgbGFiZWw6ICdBZGRyZXNzJyxcbiAgICAgICAgICAgIGtleTogJ2ZzJyxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLmVudGl0eS5hZGRyZXNzXG4gICAgICAgIH0pKTtcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3VGV4dEl0ZW1Nb2RlbCh7XG4gICAgICAgICAgICBsYWJlbDogJ1BJTicsXG4gICAgICAgICAgICBrZXk6ICdmcycsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5lbnRpdHkucGluXG4gICAgICAgIH0pKTtcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3VGV4dEl0ZW1Nb2RlbCh7XG4gICAgICAgICAgICBsYWJlbDogJ1Bob25lJyxcbiAgICAgICAgICAgIGtleTogJ3RzJyxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLmVudGl0eS5waG9uZVxuICAgICAgICB9KSk7XG4gICAgICAgIHRoaXMucHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld1RleHRJdGVtTW9kZWwoe1xuICAgICAgICAgICAgbGFiZWw6ICdFbWFpbCcsXG4gICAgICAgICAgICBrZXk6ICdjZDRwJyxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLmVudGl0eS5lbWFpbFxuICAgICAgICB9KSk7XG4gICAgICAgIHRoaXMucHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld0Jvb2xJdGVtTW9kZWwoe1xuICAgICAgICAgICAgbGFiZWw6ICdBY3RpdmUnLFxuICAgICAgICAgICAga2V5OiAnY2Q0cCcsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5lbnRpdHkuYWN0aXZlXG4gICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBwcmV2aW91c1N0YXRlKCkge1xuICAgICAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XG4gICAgfVxuXG59XG4iXX0=