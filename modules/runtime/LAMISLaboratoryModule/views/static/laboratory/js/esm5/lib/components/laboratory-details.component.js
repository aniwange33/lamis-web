import * as tslib_1 from "tslib";
import { Component, ComponentFactoryResolver, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LaboratoryService } from '../services/laboratory.service';
import { TdDialogService } from '@covalent/core';
import { CardViewDateItemModel, CardViewItem, CardViewTextItemModel, CardViewUpdateService, NotificationService } from '@alfresco/adf-core';
import { ColumnMode } from '@swimlane/ngx-datatable';
var LaboratoryDetailsComponent = /** @class */ (function () {
    function LaboratoryDetailsComponent(router, route, laboratoryService, cfr, _dialogService, notificationService, updateService) {
        this.router = router;
        this.route = route;
        this.laboratoryService = laboratoryService;
        this.cfr = cfr;
        this._dialogService = _dialogService;
        this.notificationService = notificationService;
        this.updateService = updateService;
        this.properties = [];
        this.ColumnMode = ColumnMode;
    }
    LaboratoryDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (_a) {
            var entity = _a.entity;
            _this.entity = !!entity && entity.body ? entity.body : entity;
            var patientId = _this.route.snapshot.paramMap.get('patientId');
            _this.laboratoryService.getPatient(patientId).subscribe(function (res) { return _this.entity.patient = res; });
            _this.buildProperties();
        });
    };
    LaboratoryDetailsComponent.prototype.edit = function () {
        this.router.navigate(['/', 'laboratories', this.entity.uuid, 'patient', this.entity.patient.uuid, 'edit']);
    };
    LaboratoryDetailsComponent.prototype.delete = function () {
        var _this = this;
        this._dialogService.openConfirm({
            title: 'Confirm',
            message: 'Do you want to delete this laboratory request, action cannot be reversed?',
            cancelButton: 'No',
            acceptButton: 'Yes',
            width: '500px',
        }).afterClosed().subscribe(function (accept) {
            if (accept) {
                _this.laboratoryService.delete(_this.entity.id).subscribe(function (res) {
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
    LaboratoryDetailsComponent.prototype.buildProperties = function () {
        var _this = this;
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
        /*this.laboratoryService.getLinesByLaboratory(this.entity.id)
            .subscribe(res => {
                this.dataSource = res;
            });*/
        this.dataSource = tslib_1.__spread(this.entity.lines.map(function (r) {
            _this.laboratoryService.getLabTestById(r.lab_test_id).subscribe(function (res) {
                r.description = res.description;
            });
            return r;
        }));
    };
    LaboratoryDetailsComponent.prototype.previousState = function () {
        window.history.back();
    };
    LaboratoryDetailsComponent.prototype.ngOnDestroy = function () {
    };
    LaboratoryDetailsComponent.ctorParameters = function () { return [
        { type: Router },
        { type: ActivatedRoute },
        { type: LaboratoryService },
        { type: ComponentFactoryResolver },
        { type: TdDialogService },
        { type: NotificationService },
        { type: CardViewUpdateService }
    ]; };
    LaboratoryDetailsComponent = tslib_1.__decorate([
        Component({
            selector: 'lamis-laboratory',
            template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <mat-card>\n            <mat-card-header>\n            </mat-card-header>\n            <mat-card-content>\n                <adf-card-view [properties]=\"properties\" editable=\"false\"></adf-card-view>\n                <mat-divider></mat-divider>\n                <ngx-datatable\n                    #mydatatable\n                    *ngIf=\"dataSource\"\n                    class=\"material full-width\"\n                    [headerHeight]=\"50\"\n                    [limit]=\"5\"\n                    [columnMode]=\"ColumnMode.force\"\n                    [footerHeight]=\"50\"\n                    rowHeight=\"auto\"\n                    [rows]=\"dataSource\"\n                >\n                    <ngx-datatable-column name=\"Test Description\" [prop]=\"'description'\"\n                                          [canAutoResize]=\"true\">\n                        <ng-template ngx-datatable-cell-template let-value=\"value\">\n                            <mat-form-field class=\"full-width\">\n                                <input matInput disabled [value]=\"value\" style=\"font-weight: 900\">\n                            </mat-form-field>\n                        </ng-template>\n                    </ngx-datatable-column>\n                    <ngx-datatable-column name=\"Result\" [prop]=\"'result'\" [canAutoResize]=\"true\">\n                        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\"\n                                     let-row=\"row\">\n                            <mat-form-field class=\"full-width\">\n                                <input matInput disabled [value]=\"value\" style=\"font-weight: 900\">\n                            </mat-form-field>\n                        </ng-template>\n                    </ngx-datatable-column>\n                    <ngx-datatable-column name=\"Comment\" [prop]=\"'comment'\" [canAutoResize]=\"true\">\n                        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\"\n                                     let-row=\"row\">\n                            <mat-form-field class=\"full-width\">\n                                <input matInput disabled [value]=\"value\" style=\"font-weight: 900\">\n                            </mat-form-field>\n                        </ng-template>\n                    </ngx-datatable-column>\n                    <ngx-datatable-column name=\"Indication\" [prop]=\"'indication'\" [canAutoResize]=\"true\">\n                        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\"\n                                     let-row=\"row\">\n                            <mat-form-field class=\"full-width\">\n                                <input matInput disabled [value]=\"value\" style=\"font-weight: 900\">\n                            </mat-form-field>\n                        </ng-template>\n                    </ngx-datatable-column>\n                </ngx-datatable>\n            </mat-card-content>\n            <mat-card-actions class=\"lamis-edit-form-actions\">\n                <button mat-button (click)=\"previousState()\">Back</button>\n                <button mat-raised-button color=\"warn\" (click)=\"delete()\">Delete</button>\n                <button mat-raised-button color=\"primary\" (click)=\"edit()\">Edit</button>\n            </mat-card-actions>\n        </mat-card>\n    </div>\n</div>\n"
        }),
        tslib_1.__metadata("design:paramtypes", [Router, ActivatedRoute, LaboratoryService,
            ComponentFactoryResolver, TdDialogService,
            NotificationService,
            CardViewUpdateService])
    ], LaboratoryDetailsComponent);
    return LaboratoryDetailsComponent;
}());
export { LaboratoryDetailsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFib3JhdG9yeS1kZXRhaWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xhbWlzLWxhYm9yYXRvcnktMS40LjAvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9sYWJvcmF0b3J5LWRldGFpbHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLHdCQUF3QixFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdkYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNuRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUNILHFCQUFxQixFQUNyQixZQUFZLEVBQ1oscUJBQXFCLEVBQ3JCLHFCQUFxQixFQUNyQixtQkFBbUIsRUFDdEIsTUFBTSxvQkFBb0IsQ0FBQztBQUM1QixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFNckQ7SUFNSSxvQ0FBb0IsTUFBYyxFQUFVLEtBQXFCLEVBQVUsaUJBQW9DLEVBQzNGLEdBQTZCLEVBQVUsY0FBK0IsRUFDdEUsbUJBQXdDLEVBQ3hDLGFBQW9DO1FBSHBDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDM0YsUUFBRyxHQUFILEdBQUcsQ0FBMEI7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBaUI7UUFDdEUsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxrQkFBYSxHQUFiLGFBQWEsQ0FBdUI7UUFSeEQsZUFBVSxHQUFtQixFQUFFLENBQUM7UUFFaEMsZUFBVSxHQUFHLFVBQVUsQ0FBQztJQU94QixDQUFDO0lBRUQsNkNBQVEs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dGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExhYm9yYXRvcnksIExhYm9yYXRvcnlMaW5lIH0gZnJvbSAnLi4vbW9kZWwvbGFib3JhdG9yeS5tb2RlbCc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IExhYm9yYXRvcnlTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbGFib3JhdG9yeS5zZXJ2aWNlJztcbmltcG9ydCB7IFRkRGlhbG9nU2VydmljZSB9IGZyb20gJ0Bjb3ZhbGVudC9jb3JlJztcbmltcG9ydCB7XG4gICAgQ2FyZFZpZXdEYXRlSXRlbU1vZGVsLFxuICAgIENhcmRWaWV3SXRlbSxcbiAgICBDYXJkVmlld1RleHRJdGVtTW9kZWwsXG4gICAgQ2FyZFZpZXdVcGRhdGVTZXJ2aWNlLFxuICAgIE5vdGlmaWNhdGlvblNlcnZpY2Vcbn0gZnJvbSAnQGFsZnJlc2NvL2FkZi1jb3JlJztcbmltcG9ydCB7IENvbHVtbk1vZGUgfSBmcm9tICdAc3dpbWxhbmUvbmd4LWRhdGF0YWJsZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbGFtaXMtbGFib3JhdG9yeScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2xhYm9yYXRvcnktZGV0YWlscy5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgTGFib3JhdG9yeURldGFpbHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgcHJvcGVydGllczogQ2FyZFZpZXdJdGVtW10gPSBbXTtcbiAgICBlbnRpdHk6IExhYm9yYXRvcnk7XG4gICAgQ29sdW1uTW9kZSA9IENvbHVtbk1vZGU7XG4gICAgcHVibGljIGRhdGFTb3VyY2U6IExhYm9yYXRvcnlMaW5lW107XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHJpdmF0ZSBsYWJvcmF0b3J5U2VydmljZTogTGFib3JhdG9yeVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBjZnI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgcHJpdmF0ZSBfZGlhbG9nU2VydmljZTogVGREaWFsb2dTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgbm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHVwZGF0ZVNlcnZpY2U6IENhcmRWaWV3VXBkYXRlU2VydmljZSkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnJvdXRlLmRhdGEuc3Vic2NyaWJlKCh7ZW50aXR5fSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5lbnRpdHkgPSAhIWVudGl0eSAmJiBlbnRpdHkuYm9keSA/IGVudGl0eS5ib2R5IDogZW50aXR5O1xuICAgICAgICAgICAgY29uc3QgcGF0aWVudElkID0gdGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbU1hcC5nZXQoJ3BhdGllbnRJZCcpO1xuICAgICAgICAgICAgdGhpcy5sYWJvcmF0b3J5U2VydmljZS5nZXRQYXRpZW50KHBhdGllbnRJZCkuc3Vic2NyaWJlKChyZXMpID0+IHRoaXMuZW50aXR5LnBhdGllbnQgPSByZXMpO1xuICAgICAgICAgICAgdGhpcy5idWlsZFByb3BlcnRpZXMoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZWRpdCgpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvJywgJ2xhYm9yYXRvcmllcycsIHRoaXMuZW50aXR5LnV1aWQsICdwYXRpZW50JywgdGhpcy5lbnRpdHkucGF0aWVudC51dWlkLCAnZWRpdCddKTtcbiAgICB9XG5cbiAgICBkZWxldGUoKSB7XG4gICAgICAgIHRoaXMuX2RpYWxvZ1NlcnZpY2Uub3BlbkNvbmZpcm0oe1xuICAgICAgICAgICAgdGl0bGU6ICdDb25maXJtJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdEbyB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBsYWJvcmF0b3J5IHJlcXVlc3QsIGFjdGlvbiBjYW5ub3QgYmUgcmV2ZXJzZWQ/JyxcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvbjogJ05vJyxcbiAgICAgICAgICAgIGFjY2VwdEJ1dHRvbjogJ1llcycsXG4gICAgICAgICAgICB3aWR0aDogJzUwMHB4JyxcbiAgICAgICAgfSkuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUoKGFjY2VwdDogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgaWYgKGFjY2VwdCkge1xuICAgICAgICAgICAgICAgIHRoaXMubGFib3JhdG9yeVNlcnZpY2UuZGVsZXRlKHRoaXMuZW50aXR5LmlkKS5zdWJzY3JpYmUoKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJ3BhdGllbnRzJ10pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnNob3dFcnJvcignRXJyb3IgZGVsZXRpbmcgdmlzaXQsIHBsZWFzZSB0cnkgYWdhaW4nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBETyBTT01FVEhJTkcgRUxTRVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBidWlsZFByb3BlcnRpZXMoKSB7XG4gICAgICAgIHRoaXMucHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld0RhdGVJdGVtTW9kZWwoe1xuICAgICAgICAgICAga2V5OiAnc2MnLFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMuZW50aXR5LmRhdGVTYW1wbGVDb2xsZWN0ZWQsXG4gICAgICAgICAgICBsYWJlbDogJ0RhdGUgb2YgU2FtcGxlIENvbGxlY3RlZCcsXG4gICAgICAgICAgICBmb3JtYXQ6ICdkZCBNTU0sIHl5eXknXG4gICAgICAgIH0pKTtcblxuICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdEYXRlSXRlbU1vZGVsKHtcbiAgICAgICAgICAgIGtleTogJ2RzJyxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLmVudGl0eS5kYXRlQXNzYXksXG4gICAgICAgICAgICBsYWJlbDogJ0RhdGUgb2YgQXNzYXknLFxuICAgICAgICAgICAgZm9ybWF0OiAnZGQgTU1NLCB5eXl5J1xuICAgICAgICB9KSk7XG5cbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3RGF0ZUl0ZW1Nb2RlbCh7XG4gICAgICAgICAgICBrZXk6ICduYScsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5lbnRpdHkuZGF0ZVJlc3VsdFJlY2VpdmVkLFxuICAgICAgICAgICAgbGFiZWw6ICdEYXRlIFJlc3VsdCBSZWNlaXZlZCcsXG4gICAgICAgICAgICBmb3JtYXQ6ICdkZCBNTU0sIHl5eXknXG4gICAgICAgIH0pKTtcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3VGV4dEl0ZW1Nb2RlbCh7XG4gICAgICAgICAgICBsYWJlbDogJ0xhYm9yYXRvcnkgTnVtYmVyJyxcbiAgICAgICAgICAgIGtleTogJ2ZzJyxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLmVudGl0eS5sYWJOb1xuICAgICAgICB9KSk7XG5cbiAgICAgICAgLyp0aGlzLmxhYm9yYXRvcnlTZXJ2aWNlLmdldExpbmVzQnlMYWJvcmF0b3J5KHRoaXMuZW50aXR5LmlkKVxuICAgICAgICAgICAgLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVNvdXJjZSA9IHJlcztcbiAgICAgICAgICAgIH0pOyovXG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZSA9IFsuLi50aGlzLmVudGl0eS5saW5lcy5tYXAociA9PiB7XG4gICAgICAgICAgICB0aGlzLmxhYm9yYXRvcnlTZXJ2aWNlLmdldExhYlRlc3RCeUlkKHIubGFiX3Rlc3RfaWQpLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgICAgIHIuZGVzY3JpcHRpb24gPSByZXMuZGVzY3JpcHRpb247XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiByO1xuICAgICAgICB9KV07XG4gICAgfVxuXG4gICAgcHJldmlvdXNTdGF0ZSgpIHtcbiAgICAgICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpIHtcbiAgICB9XG59XG4iXX0=