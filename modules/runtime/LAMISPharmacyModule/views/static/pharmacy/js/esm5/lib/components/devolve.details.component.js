import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { CardViewDateItemModel, CardViewItem, CardViewTextItemModel, NotificationService } from '@alfresco/adf-core';
import { ActivatedRoute, Router } from '@angular/router';
import { TdDialogService } from '@covalent/core';
import { DevolveService } from '../services/devolve.service';
var DevolveDetailsComponent = /** @class */ (function () {
    function DevolveDetailsComponent(router, route, devolveService, _dialogService, notificationService) {
        this.router = router;
        this.route = route;
        this.devolveService = devolveService;
        this._dialogService = _dialogService;
        this.notificationService = notificationService;
        this.properties = [];
    }
    DevolveDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (_a) {
            var entity = _a.entity;
            _this.entity = !!entity && entity.body ? entity.body : entity;
            _this.buildProperties();
        });
    };
    DevolveDetailsComponent.prototype.edit = function () {
        this.router.navigate(['/', 'devolves', this.entity.uuid, 'patient', this.entity.patient.uuid, 'edit']);
    };
    DevolveDetailsComponent.prototype.delete = function () {
        var _this = this;
        this._dialogService.openConfirm({
            title: 'Confirm',
            message: 'Do you want to delete this client devolve, action cannot be reversed?',
            cancelButton: 'No',
            acceptButton: 'Yes',
            width: '500px',
        }).afterClosed().subscribe(function (accept) {
            if (accept) {
                _this.devolveService.delete(_this.entity.id).subscribe(function (res) {
                    if (res.ok) {
                        _this.router.navigate(['patients']);
                    }
                    else {
                        _this.notificationService.showError('Error deleting devolve, please try again');
                    }
                });
            }
            else {
                // DO SOMETHING ELSE
            }
        });
    };
    DevolveDetailsComponent.prototype.buildProperties = function () {
        var _this = this;
        this.properties.push(new CardViewDateItemModel({
            key: 'ds',
            value: this.entity.dateDevolved,
            label: 'Date of Devolvement',
            format: 'dd MMM, yyyy'
        }));
        var type = 'MMD';
        switch (this.entity.dmocType) {
            case 'ARC':
                type = 'Adolescent Refill Club';
                break;
            case 'CPARP':
                type = 'CPARP';
                break;
            case 'CARC':
                type = 'CARC';
                break;
            case 'F_CARG':
                type = 'F-CARG';
                break;
            case 'FAST_TRACK':
                type = 'Fast Track';
                break;
            case 'S_CARG':
                type = 's-CARG';
                break;
            case 'MMS':
                type = 'MMS';
                break;
        }
        this.properties.push(new CardViewTextItemModel({
            key: 'ds',
            value: type,
            label: 'Type of DMOC'
        }));
        this.devolveService.getRelatedClinic(this.entity.id, this.entity.patient.id, this.entity.dateDevolved).subscribe(function (res) {
            _this.relatedClinic = res;
            console.log('Related clinic', res);
            if (_this.relatedClinic.dateVisit) {
                _this.properties.push(new CardViewTextItemModel({
                    key: 'ds',
                    value: _this.relatedClinic.dateVisit,
                    label: 'Date of Clinical Stage'
                }));
                _this.properties.push(new CardViewTextItemModel({
                    key: 'ds',
                    value: _this.relatedClinic && _this.relatedClinic.clinicStage,
                    label: 'Current Clinical Stage',
                }));
            }
        });
        this.devolveService.getRelatedPharmacy(this.entity.id, this.entity.patient.id, this.entity.dateDevolved).subscribe(function (res) {
            _this.relatedPharmacy = res;
            if (_this.relatedPharmacy.dateVisit) {
                _this.properties.push(new CardViewTextItemModel({
                    key: 'ds',
                    value: _this.relatedPharmacy.dateVisit,
                    label: 'Date of Current ARV Regimen'
                }));
                _this.properties.push(new CardViewTextItemModel({
                    key: 'ds',
                    value: _this.relatedPharmacy && _this.relatedPharmacy.regimen,
                    label: 'Current ARV Regimen',
                }));
            }
        });
        this.devolveService.getRelatedViralLoad(this.entity.id, this.entity.patient.id, this.entity.dateDevolved).subscribe(function (res) {
            _this.relatedViralLoad = res;
            if (_this.relatedViralLoad.dateResultReceived) {
                _this.properties.push(new CardViewTextItemModel({
                    key: 'ds',
                    value: _this.relatedViralLoad.dateResultReceived,
                    label: 'Date of Viral Load'
                }));
                _this.properties.push(new CardViewTextItemModel({
                    key: 'ds',
                    value: _this.relatedViralLoad && _this.relatedViralLoad.value,
                    label: 'Current Viral Load',
                }));
            }
        });
        this.devolveService.getRelatedCD4(this.entity.id, this.entity.patient.id, this.entity.dateDevolved).subscribe(function (res) {
            _this.relatedCD4 = res;
            if (_this.relatedCD4.dateResultReceived) {
                _this.properties.push(new CardViewTextItemModel({
                    key: 'ds',
                    value: _this.relatedCD4.dateResultReceived,
                    label: 'Date of CD4'
                }));
                _this.properties.push(new CardViewTextItemModel({
                    key: 'ds',
                    value: _this.relatedCD4 && _this.relatedCD4.value,
                    label: 'Current Viral Load',
                }));
            }
        });
        this.properties.push(new CardViewDateItemModel({
            key: 'ds',
            value: this.entity.dateNextClinic,
            label: 'Date of next Clinic/Lab',
            format: 'dd MMM, yyyy'
        }));
        this.properties.push(new CardViewDateItemModel({
            key: 'ds',
            value: this.entity.dateNextRefill,
            label: 'Date of Viral Load',
            format: 'dd MMM, yyyy'
        }));
        if (this.entity.communityPharmacy) {
            this.properties.push(new CardViewTextItemModel({
                key: 'ds',
                value: this.entity.communityPharmacy.name,
                label: 'Community Pharmacy'
            }));
        }
        if (this.entity.dateDiscontinued) {
            this.properties.push(new CardViewDateItemModel({
                key: 'ds',
                value: this.entity.dateDiscontinued,
                label: 'Date of Discontinuation',
                format: 'dd MMM, yyyy'
            }));
            this.properties.push(new CardViewTextItemModel({
                key: 'ds',
                value: this.entity.reasonDiscontinued,
                label: 'Reason of Discontinuation'
            }));
            if (this.entity.dateReturnedToFacility) {
                this.properties.push(new CardViewDateItemModel({
                    key: 'ds',
                    value: this.entity.dateReturnedToFacility,
                    label: 'Date Returned to Facility',
                    format: 'dd MMM, yyyy'
                }));
            }
        }
    };
    DevolveDetailsComponent.prototype.previousState = function () {
        window.history.back();
    };
    DevolveDetailsComponent.ctorParameters = function () { return [
        { type: Router },
        { type: ActivatedRoute },
        { type: DevolveService },
        { type: TdDialogService },
        { type: NotificationService }
    ]; };
    DevolveDetailsComponent = tslib_1.__decorate([
        Component({
            selector: 'devolve-details',
            template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <mat-card>\n            <mat-card-header>\n            </mat-card-header>\n            <mat-card-content>\n                <adf-card-view [properties]=\"properties\" editable=\"false\"></adf-card-view>\n                <mat-divider></mat-divider>\n            </mat-card-content>\n            <mat-card-actions class=\"lamis-edit-form-actions\">\n                <button mat-button (click)=\"previousState()\">Back</button>\n                <button mat-raised-button color=\"warn\" (click)=\"delete()\">Delete</button>\n                <button mat-raised-button color=\"primary\" (click)=\"edit()\">Edit</button>\n            </mat-card-actions>\n        </mat-card>\n    </div>\n</div>\n"
        }),
        tslib_1.__metadata("design:paramtypes", [Router, ActivatedRoute, DevolveService,
            TdDialogService,
            NotificationService])
    ], DevolveDetailsComponent);
    return DevolveDetailsComponent;
}());
export { DevolveDetailsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2b2x2ZS5kZXRhaWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xhbWlzLXBoYXJtYWN5LTEuNC4wLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGV2b2x2ZS5kZXRhaWxzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBUyxNQUFNLGVBQWUsQ0FBQztBQUNoRCxPQUFPLEVBQUMscUJBQXFCLEVBQUUsWUFBWSxFQUFFLHFCQUFxQixFQUFFLG1CQUFtQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFFbkgsT0FBTyxFQUFDLGNBQWMsRUFBRSxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0MsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBTTNEO0lBUUksaUNBQW9CLE1BQWMsRUFBVSxLQUFxQixFQUFVLGNBQThCLEVBQ3JGLGNBQStCLEVBQy9CLG1CQUF3QztRQUZ4QyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDckYsbUJBQWMsR0FBZCxjQUFjLENBQWlCO1FBQy9CLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFUNUQsZUFBVSxHQUFtQixFQUFFLENBQUM7SUFVaEMsQ0FBQztJQUVELDBDQUFRLEdBQVI7UUFBQSxpQkFLQztRQUpHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFDLEVBQVE7Z0JBQVAsa0JBQU07WUFDOUIsS0FBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUM3RCxLQUFJ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MkIsTUFBTTtnQkFBaUIsY0FBYztnQkFBMEIsY0FBYztnQkFDckUsZUFBZTtnQkFDVixtQkFBbUI7O0lBVm5ELHVCQUF1QjtRQUpuQyxTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLG94QkFBK0M7U0FDbEQsQ0FBQztpREFTOEIsTUFBTSxFQUFpQixjQUFjLEVBQTBCLGNBQWM7WUFDckUsZUFBZTtZQUNWLG1CQUFtQjtPQVZuRCx1QkFBdUIsQ0E4TG5DO0lBQUQsOEJBQUM7Q0FBQSxBQTlMRCxJQThMQztTQTlMWSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q2FyZFZpZXdEYXRlSXRlbU1vZGVsLCBDYXJkVmlld0l0ZW0sIENhcmRWaWV3VGV4dEl0ZW1Nb2RlbCwgTm90aWZpY2F0aW9uU2VydmljZX0gZnJvbSAnQGFsZnJlc2NvL2FkZi1jb3JlJztcbmltcG9ydCB7RGV2b2x2ZSwgUmVsYXRlZENENCwgUmVsYXRlZENsaW5pYywgUmVsYXRlZFBoYXJtYWN5LCBSZWxhdGVkVmlyYWxMb2FkfSBmcm9tICcuLi9tb2RlbC9waGFybWFjeS5tb2RlbCc7XG5pbXBvcnQge0FjdGl2YXRlZFJvdXRlLCBSb3V0ZXJ9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge1RkRGlhbG9nU2VydmljZX0gZnJvbSAnQGNvdmFsZW50L2NvcmUnO1xuaW1wb3J0IHtEZXZvbHZlU2VydmljZX0gZnJvbSAnLi4vc2VydmljZXMvZGV2b2x2ZS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdkZXZvbHZlLWRldGFpbHMnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9kZXZvbHZlLmRldGFpbHMuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIERldm9sdmVEZXRhaWxzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBwcm9wZXJ0aWVzOiBDYXJkVmlld0l0ZW1bXSA9IFtdO1xuICAgIGVudGl0eTogRGV2b2x2ZTtcbiAgICByZWxhdGVkQ2xpbmljOiBSZWxhdGVkQ2xpbmljO1xuICAgIHJlbGF0ZWRQaGFybWFjeTogUmVsYXRlZFBoYXJtYWN5O1xuICAgIHJlbGF0ZWRDRDQ6IFJlbGF0ZWRDRDQ7XG4gICAgcmVsYXRlZFZpcmFsTG9hZDogUmVsYXRlZFZpcmFsTG9hZDtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIGRldm9sdmVTZXJ2aWNlOiBEZXZvbHZlU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIF9kaWFsb2dTZXJ2aWNlOiBUZERpYWxvZ1NlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBub3RpZmljYXRpb25TZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMucm91dGUuZGF0YS5zdWJzY3JpYmUoKHtlbnRpdHl9KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVudGl0eSA9ICEhZW50aXR5ICYmIGVudGl0eS5ib2R5ID8gZW50aXR5LmJvZHkgOiBlbnRpdHk7XG4gICAgICAgICAgICB0aGlzLmJ1aWxkUHJvcGVydGllcygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBlZGl0KCkge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy8nLCAnZGV2b2x2ZXMnLCB0aGlzLmVudGl0eS51dWlkLCAncGF0aWVudCcsIHRoaXMuZW50aXR5LnBhdGllbnQudXVpZCwgJ2VkaXQnXSk7XG4gICAgfVxuXG4gICAgZGVsZXRlKCkge1xuICAgICAgICB0aGlzLl9kaWFsb2dTZXJ2aWNlLm9wZW5Db25maXJtKHtcbiAgICAgICAgICAgIHRpdGxlOiAnQ29uZmlybScsXG4gICAgICAgICAgICBtZXNzYWdlOiAnRG8geW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgY2xpZW50IGRldm9sdmUsIGFjdGlvbiBjYW5ub3QgYmUgcmV2ZXJzZWQ/JyxcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvbjogJ05vJyxcbiAgICAgICAgICAgIGFjY2VwdEJ1dHRvbjogJ1llcycsXG4gICAgICAgICAgICB3aWR0aDogJzUwMHB4JyxcbiAgICAgICAgfSkuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUoKGFjY2VwdDogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgaWYgKGFjY2VwdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGV2b2x2ZVNlcnZpY2UuZGVsZXRlKHRoaXMuZW50aXR5LmlkKS5zdWJzY3JpYmUoKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJ3BhdGllbnRzJ10pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnNob3dFcnJvcignRXJyb3IgZGVsZXRpbmcgZGV2b2x2ZSwgcGxlYXNlIHRyeSBhZ2FpbicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIERPIFNPTUVUSElORyBFTFNFXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGJ1aWxkUHJvcGVydGllcygpIHtcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3RGF0ZUl0ZW1Nb2RlbCh7XG4gICAgICAgICAgICBrZXk6ICdkcycsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5lbnRpdHkuZGF0ZURldm9sdmVkLFxuICAgICAgICAgICAgbGFiZWw6ICdEYXRlIG9mIERldm9sdmVtZW50JyxcbiAgICAgICAgICAgIGZvcm1hdDogJ2RkIE1NTSwgeXl5eSdcbiAgICAgICAgfSkpO1xuICAgICAgICBsZXQgdHlwZSA9ICdNTUQnO1xuICAgICAgICBzd2l0Y2ggKHRoaXMuZW50aXR5LmRtb2NUeXBlKSB7XG4gICAgICAgICAgICBjYXNlICdBUkMnOlxuICAgICAgICAgICAgICAgIHR5cGUgPSAnQWRvbGVzY2VudCBSZWZpbGwgQ2x1Yic7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdDUEFSUCc6XG4gICAgICAgICAgICAgICAgdHlwZSA9ICdDUEFSUCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdDQVJDJzpcbiAgICAgICAgICAgICAgICB0eXBlID0gJ0NBUkMnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnRl9DQVJHJzpcbiAgICAgICAgICAgICAgICB0eXBlID0gJ0YtQ0FSRyc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdGQVNUX1RSQUNLJzpcbiAgICAgICAgICAgICAgICB0eXBlID0gJ0Zhc3QgVHJhY2snO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnU19DQVJHJzpcbiAgICAgICAgICAgICAgICB0eXBlID0gJ3MtQ0FSRyc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdNTVMnOlxuICAgICAgICAgICAgICAgIHR5cGUgPSAnTU1TJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdUZXh0SXRlbU1vZGVsKHtcbiAgICAgICAgICAgIGtleTogJ2RzJyxcbiAgICAgICAgICAgIHZhbHVlOiB0eXBlLFxuICAgICAgICAgICAgbGFiZWw6ICdUeXBlIG9mIERNT0MnXG4gICAgICAgIH0pKTtcbiAgICAgICAgdGhpcy5kZXZvbHZlU2VydmljZS5nZXRSZWxhdGVkQ2xpbmljKHRoaXMuZW50aXR5LmlkLCB0aGlzLmVudGl0eS5wYXRpZW50LmlkLCB0aGlzLmVudGl0eS5kYXRlRGV2b2x2ZWQpLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZWxhdGVkQ2xpbmljID0gcmVzO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1JlbGF0ZWQgY2xpbmljJywgcmVzKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnJlbGF0ZWRDbGluaWMuZGF0ZVZpc2l0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3VGV4dEl0ZW1Nb2RlbCh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogJ2RzJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMucmVsYXRlZENsaW5pYy5kYXRlVmlzaXQsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnRGF0ZSBvZiBDbGluaWNhbCBTdGFnZSdcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3VGV4dEl0ZW1Nb2RlbCh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogJ2RzJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMucmVsYXRlZENsaW5pYyAmJiB0aGlzLnJlbGF0ZWRDbGluaWMuY2xpbmljU3RhZ2UsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnQ3VycmVudCBDbGluaWNhbCBTdGFnZScsXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5kZXZvbHZlU2VydmljZS5nZXRSZWxhdGVkUGhhcm1hY3kodGhpcy5lbnRpdHkuaWQsIHRoaXMuZW50aXR5LnBhdGllbnQuaWQsIHRoaXMuZW50aXR5LmRhdGVEZXZvbHZlZCkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlbGF0ZWRQaGFybWFjeSA9IHJlcztcbiAgICAgICAgICAgIGlmICh0aGlzLnJlbGF0ZWRQaGFybWFjeS5kYXRlVmlzaXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdUZXh0SXRlbU1vZGVsKHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiAnZHMnLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5yZWxhdGVkUGhhcm1hY3kuZGF0ZVZpc2l0LFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ0RhdGUgb2YgQ3VycmVudCBBUlYgUmVnaW1lbidcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3VGV4dEl0ZW1Nb2RlbCh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogJ2RzJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMucmVsYXRlZFBoYXJtYWN5ICYmIHRoaXMucmVsYXRlZFBoYXJtYWN5LnJlZ2ltZW4sXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnQ3VycmVudCBBUlYgUmVnaW1lbicsXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5kZXZvbHZlU2VydmljZS5nZXRSZWxhdGVkVmlyYWxMb2FkKHRoaXMuZW50aXR5LmlkLCB0aGlzLmVudGl0eS5wYXRpZW50LmlkLCB0aGlzLmVudGl0eS5kYXRlRGV2b2x2ZWQpLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZWxhdGVkVmlyYWxMb2FkID0gcmVzO1xuICAgICAgICAgICAgaWYgKHRoaXMucmVsYXRlZFZpcmFsTG9hZC5kYXRlUmVzdWx0UmVjZWl2ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdUZXh0SXRlbU1vZGVsKHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiAnZHMnLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5yZWxhdGVkVmlyYWxMb2FkLmRhdGVSZXN1bHRSZWNlaXZlZCxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdEYXRlIG9mIFZpcmFsIExvYWQnXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld1RleHRJdGVtTW9kZWwoe1xuICAgICAgICAgICAgICAgICAgICBrZXk6ICdkcycsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnJlbGF0ZWRWaXJhbExvYWQgJiYgdGhpcy5yZWxhdGVkVmlyYWxMb2FkLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ0N1cnJlbnQgVmlyYWwgTG9hZCcsXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5kZXZvbHZlU2VydmljZS5nZXRSZWxhdGVkQ0Q0KHRoaXMuZW50aXR5LmlkLCB0aGlzLmVudGl0eS5wYXRpZW50LmlkLCB0aGlzLmVudGl0eS5kYXRlRGV2b2x2ZWQpLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZWxhdGVkQ0Q0ID0gcmVzO1xuICAgICAgICAgICAgaWYgKHRoaXMucmVsYXRlZENENC5kYXRlUmVzdWx0UmVjZWl2ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdUZXh0SXRlbU1vZGVsKHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiAnZHMnLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5yZWxhdGVkQ0Q0LmRhdGVSZXN1bHRSZWNlaXZlZCxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdEYXRlIG9mIENENCdcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3VGV4dEl0ZW1Nb2RlbCh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogJ2RzJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMucmVsYXRlZENENCAmJiB0aGlzLnJlbGF0ZWRDRDQudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnQ3VycmVudCBWaXJhbCBMb2FkJyxcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdEYXRlSXRlbU1vZGVsKHtcbiAgICAgICAgICAgIGtleTogJ2RzJyxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLmVudGl0eS5kYXRlTmV4dENsaW5pYyxcbiAgICAgICAgICAgIGxhYmVsOiAnRGF0ZSBvZiBuZXh0IENsaW5pYy9MYWInLFxuICAgICAgICAgICAgZm9ybWF0OiAnZGQgTU1NLCB5eXl5J1xuICAgICAgICB9KSk7XG4gICAgICAgIHRoaXMucHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld0RhdGVJdGVtTW9kZWwoe1xuICAgICAgICAgICAga2V5OiAnZHMnLFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMuZW50aXR5LmRhdGVOZXh0UmVmaWxsLFxuICAgICAgICAgICAgbGFiZWw6ICdEYXRlIG9mIFZpcmFsIExvYWQnLFxuICAgICAgICAgICAgZm9ybWF0OiAnZGQgTU1NLCB5eXl5J1xuICAgICAgICB9KSk7XG4gICAgICAgIGlmICh0aGlzLmVudGl0eS5jb21tdW5pdHlQaGFybWFjeSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3VGV4dEl0ZW1Nb2RlbCh7XG4gICAgICAgICAgICAgICAga2V5OiAnZHMnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLmVudGl0eS5jb21tdW5pdHlQaGFybWFjeS5uYW1lLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnQ29tbXVuaXR5IFBoYXJtYWN5J1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmVudGl0eS5kYXRlRGlzY29udGludWVkKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdEYXRlSXRlbU1vZGVsKHtcbiAgICAgICAgICAgICAgICBrZXk6ICdkcycsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuZW50aXR5LmRhdGVEaXNjb250aW51ZWQsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdEYXRlIG9mIERpc2NvbnRpbnVhdGlvbicsXG4gICAgICAgICAgICAgICAgZm9ybWF0OiAnZGQgTU1NLCB5eXl5J1xuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdUZXh0SXRlbU1vZGVsKHtcbiAgICAgICAgICAgICAgICBrZXk6ICdkcycsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuZW50aXR5LnJlYXNvbkRpc2NvbnRpbnVlZCxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ1JlYXNvbiBvZiBEaXNjb250aW51YXRpb24nXG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmVudGl0eS5kYXRlUmV0dXJuZWRUb0ZhY2lsaXR5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3RGF0ZUl0ZW1Nb2RlbCh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogJ2RzJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuZW50aXR5LmRhdGVSZXR1cm5lZFRvRmFjaWxpdHksXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnRGF0ZSBSZXR1cm5lZCB0byBGYWNpbGl0eScsXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdDogJ2RkIE1NTSwgeXl5eSdcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcmV2aW91c1N0YXRlKCkge1xuICAgICAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XG4gICAgfVxufVxuIl19