import * as tslib_1 from "tslib";
import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TdDialogService} from '@covalent/core';
import {CardViewDateItemModel, CardViewItem, CardViewTextItemModel, NotificationService} from '@alfresco/adf-core';
import {EacService} from '../../services/eac.service';

var EacDetailsComponent = /** @class */ (function () {
    function EacDetailsComponent(router, route, _dialogService, notificationService, eacService) {
        this.router = router;
        this.route = route;
        this._dialogService = _dialogService;
        this.notificationService = notificationService;
        this.eacService = eacService;
        this.properties = [];
    }

    EacDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (_a) {
            var entity = _a.entity;
            _this.entity = !!entity && entity.body ? entity.body : entity;
            _this.buildProperties();
        });
    };
    EacDetailsComponent.prototype.edit = function () {
        this.router.navigate(['/', 'eacs', this.entity.uuid, 'patient', this.entity.patient.uuid, 'edit']);
    };
    EacDetailsComponent.prototype.delete = function () {
        var _this = this;
        this._dialogService.openConfirm({
            title: 'Confirm',
            message: 'Do you want to delete this EAC Record, action cannot be reversed?',
            cancelButton: 'No',
            acceptButton: 'Yes',
            width: '500px',
        }).afterClosed().subscribe(function (accept) {
            if (accept) {
                _this.eacService.delete(_this.entity.id).subscribe(function (res) {
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
    EacDetailsComponent.prototype.buildProperties = function () {
        this.properties.push(new CardViewDateItemModel({
            key: 'ds',
            value: this.entity.dateLastViralLoad,
            label: 'Date Last Viral Load',
            format: 'dd MMM, yyyy'
        }));
        this.properties.push(new CardViewTextItemModel({
            key: 'vl',
            value: this.entity.lastViralLoad,
            label: 'Last Viral Load'
        }));
        this.properties.push(new CardViewDateItemModel({
            key: 'ds',
            value: this.entity.dateEac1,
            label: 'Date of 1st EAC Session',
            format: 'dd MMM, yyyy'
        }));
        if (this.entity.dateEac2) {
            this.properties.push(new CardViewDateItemModel({
                key: 'ds',
                value: this.entity.dateEac2,
                label: 'Date of 2nd EAC Session',
                format: 'dd MMM, yyyy'
            }));
        }
        if (this.entity.dateEac3) {
            this.properties.push(new CardViewDateItemModel({
                key: 'ds',
                value: this.entity.dateEac3,
                label: 'Date of 3rd EAC Session',
                format: 'dd MMM, yyyy'
            }));
        }
        if (this.entity.dateEac3) {
            this.properties.push(new CardViewDateItemModel({
                key: 'ds',
                value: this.entity.dateSampleCollected,
                label: 'Date of Repeat VL Sample Collection',
                format: 'dd MMM, yyyy'
            }));
        }
        this.properties.push(new CardViewTextItemModel({
            label: 'Notes',
            key: 'ts',
            value: this.entity.notes
        }));
    };
    EacDetailsComponent.prototype.previousState = function () {
        window.history.back();
    };
    EacDetailsComponent.ctorParameters = function () {
        return [
            {type: Router},
            {type: ActivatedRoute},
            {type: TdDialogService},
            {type: NotificationService},
            {type: EacService}
        ];
    };
    EacDetailsComponent = tslib_1.__decorate([
        Component({
            selector: 'eac-details',
            template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <mat-card>\n            <mat-card-header>\n            </mat-card-header>\n            <mat-card-content>\n                <adf-card-view [properties]=\"properties\" editable=\"false\"></adf-card-view>\n            </mat-card-content>\n            <mat-card-actions class=\"lamis-edit-form-actions\">\n                <button mat-button (click)=\"previousState()\">Back</button>\n                <button mat-raised-button color=\"warn\" (click)=\"delete()\">Delete</button>\n                <button mat-raised-button color=\"primary\" (click)=\"edit()\">Edit</button>\n            </mat-card-actions>\n        </mat-card>\n    </div>\n</div>\n"
        }),
        tslib_1.__metadata("design:paramtypes", [Router, ActivatedRoute,
            TdDialogService, NotificationService,
            EacService])
    ], EacDetailsComponent);
    return EacDetailsComponent;
}());
export {EacDetailsComponent};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWFjLmRldGFpbHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGFtaXMtY2xpbmljLTEuMS4zLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZWFjL2VhYy5kZXRhaWxzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUVsRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsWUFBWSxFQUFFLHFCQUFxQixFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDckgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBTXhEO0lBSUksNkJBQW9CLE1BQWMsRUFBVSxLQUFxQixFQUM3QyxjQUErQixFQUFVLG1CQUF3QyxFQUNqRixVQUFzQjtRQUZ0QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDN0MsbUJBQWMsR0FBZCxjQUFjLENBQWlCO1FBQVUsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUNqRixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBTDFDLGVBQVUsR0FBbUIsRUFBRSxDQUFDO0lBTWhDLENBQUM7SUFFRCxzQ0FBUSxHQUFSO1FBQUEsaUJBS0M7UUFKRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBQyxFQUFRO2dCQUFQLGtCQUFNO1lBQzlCLEtBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDN0QsS0FBSSxDQUFDLGVB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O1FBQ0QsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtZQUN0QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLHFCQUFxQixDQUFDO2dCQUMzQyxHQUFHLEVBQUUsSUFBSTtnQkFDVCxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUI7Z0JBQ3RDLEtBQUssRUFBRSxxQ0FBcUM7Z0JBQzVDLE1BQU0sRUFBRSxjQUFjO2FBQ3pCLENBQUMsQ0FBQyxDQUFDO1NBQ1A7UUFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLHFCQUFxQixDQUFDO1lBQzNDLEtBQUssRUFBRSxPQUFPO1lBQ2QsR0FBRyxFQUFFLElBQUk7WUFDVCxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLO1NBQzNCLENBQUMsQ0FBQyxDQUFDO0lBQ1IsQ0FBQztJQUVELDJDQUFhLEdBQWI7UUFDSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzFCLENBQUM7O2dCQXpGMkIsTUFBTTtnQkFBaUIsY0FBYztnQkFDN0IsZUFBZTtnQkFBK0IsbUJBQW1CO2dCQUNyRSxVQUFVOztJQU5qQyxtQkFBbUI7UUFKL0IsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGFBQWE7WUFDdkIsdXVCQUEyQztTQUM5QyxDQUFDO2lEQUs4QixNQUFNLEVBQWlCLGNBQWM7WUFDN0IsZUFBZSxFQUErQixtQkFBbUI7WUFDckUsVUFBVTtPQU5qQyxtQkFBbUIsQ0E4Ri9CO0lBQUQsMEJBQUM7Q0FBQSxBQTlGRCxJQThGQztTQTlGWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRUFDIH0gZnJvbSAnLi4vLi4vbW9kZWwvY2xpbmljLm1vZGVsJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgVGREaWFsb2dTZXJ2aWNlIH0gZnJvbSAnQGNvdmFsZW50L2NvcmUnO1xuaW1wb3J0IHsgQ2FyZFZpZXdEYXRlSXRlbU1vZGVsLCBDYXJkVmlld0l0ZW0sIENhcmRWaWV3VGV4dEl0ZW1Nb2RlbCwgTm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gJ0BhbGZyZXNjby9hZGYtY29yZSc7XG5pbXBvcnQgeyBFYWNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZWFjLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2VhYy1kZXRhaWxzJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZWFjLmRldGFpbHMuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIEVhY0RldGFpbHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHByb3BlcnRpZXM6IENhcmRWaWV3SXRlbVtdID0gW107XG4gICAgZW50aXR5OiBFQUM7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIF9kaWFsb2dTZXJ2aWNlOiBUZERpYWxvZ1NlcnZpY2UsIHByaXZhdGUgbm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGVhY1NlcnZpY2U6IEVhY1NlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5yb3V0ZS5kYXRhLnN1YnNjcmliZSgoe2VudGl0eX0pID0+IHtcbiAgICAgICAgICAgIHRoaXMuZW50aXR5ID0gISFlbnRpdHkgJiYgZW50aXR5LmJvZHkgPyBlbnRpdHkuYm9keSA6IGVudGl0eTtcbiAgICAgICAgICAgIHRoaXMuYnVpbGRQcm9wZXJ0aWVzKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGVkaXQoKSB7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLycsICdlYWNzJywgdGhpcy5lbnRpdHkudXVpZCwgJ3BhdGllbnQnLCB0aGlzLmVudGl0eS5wYXRpZW50LnV1aWQsICdlZGl0J10pO1xuICAgIH1cblxuICAgIGRlbGV0ZSgpIHtcbiAgICAgICAgdGhpcy5fZGlhbG9nU2VydmljZS5vcGVuQ29uZmlybSh7XG4gICAgICAgICAgICB0aXRsZTogJ0NvbmZpcm0nLFxuICAgICAgICAgICAgbWVzc2FnZTogJ0RvIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIEVBQyBSZWNvcmQsIGFjdGlvbiBjYW5ub3QgYmUgcmV2ZXJzZWQ/JyxcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvbjogJ05vJyxcbiAgICAgICAgICAgIGFjY2VwdEJ1dHRvbjogJ1llcycsXG4gICAgICAgICAgICB3aWR0aDogJzUwMHB4JyxcbiAgICAgICAgfSkuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUoKGFjY2VwdDogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgaWYgKGFjY2VwdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZWFjU2VydmljZS5kZWxldGUodGhpcy5lbnRpdHkuaWQpLnN1YnNjcmliZSgocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsncGF0aWVudHMnXSlcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zaG93RXJyb3IoJ0Vycm9yIGRlbGV0aW5nIHZpc2l0LCBwbGVhc2UgdHJ5IGFnYWluJylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIERPIFNPTUVUSElORyBFTFNFXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGJ1aWxkUHJvcGVydGllcygpIHtcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3RGF0ZUl0ZW1Nb2RlbCh7XG4gICAgICAgICAgICBrZXk6ICdkcycsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5lbnRpdHkuZGF0ZUxhc3RWaXJhbExvYWQsXG4gICAgICAgICAgICBsYWJlbDogJ0RhdGUgTGFzdCBWaXJhbCBMb2FkJyxcbiAgICAgICAgICAgIGZvcm1hdDogJ2RkIE1NTSwgeXl5eSdcbiAgICAgICAgfSkpO1xuICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdUZXh0SXRlbU1vZGVsKHtcbiAgICAgICAgICAgIGtleTogJ3ZsJyxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLmVudGl0eS5sYXN0VmlyYWxMb2FkLFxuICAgICAgICAgICAgbGFiZWw6ICdMYXN0IFZpcmFsIExvYWQnXG4gICAgICAgIH0pKTtcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3RGF0ZUl0ZW1Nb2RlbCh7XG4gICAgICAgICAgICBrZXk6ICdkcycsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5lbnRpdHkuZGF0ZUVhYzEsXG4gICAgICAgICAgICBsYWJlbDogJ0RhdGUgb2YgMXN0IEVBQyBTZXNzaW9uJyxcbiAgICAgICAgICAgIGZvcm1hdDogJ2RkIE1NTSwgeXl5eSdcbiAgICAgICAgfSkpO1xuICAgICAgICBpZiAodGhpcy5lbnRpdHkuZGF0ZUVhYzIpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld0RhdGVJdGVtTW9kZWwoe1xuICAgICAgICAgICAgICAgIGtleTogJ2RzJyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5lbnRpdHkuZGF0ZUVhYzIsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdEYXRlIG9mIDJuZCBFQUMgU2Vzc2lvbicsXG4gICAgICAgICAgICAgICAgZm9ybWF0OiAnZGQgTU1NLCB5eXl5J1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmVudGl0eS5kYXRlRWFjMykge1xuICAgICAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3RGF0ZUl0ZW1Nb2RlbCh7XG4gICAgICAgICAgICAgICAga2V5OiAnZHMnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLmVudGl0eS5kYXRlRWFjMyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0RhdGUgb2YgM3JkIEVBQyBTZXNzaW9uJyxcbiAgICAgICAgICAgICAgICBmb3JtYXQ6ICdkZCBNTU0sIHl5eXknXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZW50aXR5LmRhdGVFYWMzKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdEYXRlSXRlbU1vZGVsKHtcbiAgICAgICAgICAgICAgICBrZXk6ICdkcycsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuZW50aXR5LmRhdGVTYW1wbGVDb2xsZWN0ZWQsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdEYXRlIG9mIFJlcGVhdCBWTCBTYW1wbGUgQ29sbGVjdGlvbicsXG4gICAgICAgICAgICAgICAgZm9ybWF0OiAnZGQgTU1NLCB5eXl5J1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld1RleHRJdGVtTW9kZWwoe1xuICAgICAgICAgICAgbGFiZWw6ICdOb3RlcycsXG4gICAgICAgICAgICBrZXk6ICd0cycsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5lbnRpdHkubm90ZXNcbiAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIHByZXZpb3VzU3RhdGUoKSB7XG4gICAgICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcbiAgICB9XG59XG4iXX0=
