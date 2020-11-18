import * as tslib_1 from "tslib";
import { Component, ComponentFactory, ComponentFactoryResolver, OnDestroy, OnInit, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientObservation, PatientService, PatientWidget } from '../services/patient.service';
import { TdDialogService } from '@covalent/core';
import { CardViewItem, NotificationService } from '@alfresco/adf-core';
import * as moment_ from 'moment';
var moment = moment_;
var PatientDetailsComponent = /** @class */ (function () {
    function PatientDetailsComponent(router, route, patientService, cfr, _dialogService, notificationService, _viewContainerRef, renderer2) {
        this.router = router;
        this.route = route;
        this.patientService = patientService;
        this.cfr = cfr;
        this._dialogService = _dialogService;
        this.notificationService = notificationService;
        this._viewContainerRef = _viewContainerRef;
        this.renderer2 = renderer2;
        this.template = 'patient-details';
        this.properties = [];
    }
    PatientDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (_a) {
            var entity = _a.entity;
            _this.entity = !!entity && entity.body ? entity.body : entity;
            _this.patientService.currentClientStatus(entity.uuid).subscribe(function (res) {
                _this.status = res;
            });
            _this.attacheWidgets();
            _this.getObservations();
        });
    };
    PatientDetailsComponent.prototype.edit = function () {
        this.router.navigate(['..', 'edit'], { relativeTo: this.route });
    };
    PatientDetailsComponent.prototype.updateStatus = function () {
        this.router.navigate(['/', 'client-statuses', 'patient', this.entity.uuid, 'new']);
    };
    PatientDetailsComponent.prototype.delete = function () {
        var _this = this;
        this._dialogService.openConfirm({
            title: 'Confirm',
            message: 'Do you want to delete this patient, action cannot be reversed?',
            cancelButton: 'No',
            acceptButton: 'Yes',
            width: '500px',
        }).afterClosed().subscribe(function (accept) {
            if (accept) {
                _this.patientService.delete(_this.entity.id).subscribe(function (res) {
                    if (res.ok) {
                        _this.router.navigate(['patients']);
                    }
                    else {
                        _this.notificationService.showError('Error deleting patient, please try again');
                    }
                });
            }
            else {
                // DO SOMETHING ELSE
            }
        });
    };
    PatientDetailsComponent.prototype.previousState = function () {
        window.history.back();
    };
    PatientDetailsComponent.prototype.getComponentFactory = function (name) {
        var factories = Array.from(this.cfr['_factories'].values());
        return factories.find(function (x) { return x.componentType.name === name; });
    };
    PatientDetailsComponent.prototype.getObservations = function () {
        var _this = this;
        this.patientService.observations(this.entity.id).subscribe(function (res) { return _this.observations = res; });
    };
    PatientDetailsComponent.prototype.addObservation = function (action) {
        var path = action.path.split('/');
        var parts = ['/'];
        parts.push.apply(parts, tslib_1.__spread(path));
        parts.push('patient', this.entity.uuid, 'new');
        this.router.navigate(tslib_1.__spread(parts));
    };
    PatientDetailsComponent.prototype.attacheWidgets = function () {
        this.buildWidget('TimelineComponent', 'Recent Activities', 'timeline');
        this.buildWidget('SummaryWidgetComponent', 'Patient Summary', 'account_balance_wallet');
        /*this.patientService.widgets(this.entity.id).subscribe((res: PatientWidget[]) => {
            res.forEach((widget: PatientWidget) => {
                this.buildWidget(widget.componentName, widget.title, widget.icon);
            })
        });*/
    };
    PatientDetailsComponent.prototype.ngOnDestroy = function () {
    };
    PatientDetailsComponent.prototype.buildWidget = function (componentName, title, icon) {
        var factory = this.getComponentFactory(componentName);
        if (factory !== undefined) {
            var parentFactory = this.getComponentFactory('WidgetContainerComponent');
            var componentRef = this.container.createComponent(parentFactory);
            if (!componentRef.instance.embeddedContainer) {
                var cmpName = componentRef.instance.constructor.name;
                throw new TypeError("Trying to render embedded content. " + cmpName + " must have @ViewChild() embeddedContainer defined");
            }
            console.log('Created component', componentRef);
            var instanceRef = componentRef.instance.embeddedContainer.createComponent(factory);
            this.renderer2.addClass(componentRef.location.nativeElement, 'col-md-6');
            componentRef.instance.icon = icon;
            componentRef.instance.title = title;
            try {
                instanceRef.instance.patientId = this.entity.id;
                instanceRef.instance.patientUuid = this.entity.uuid;
            }
            catch (e) {
            }
        }
    };
    PatientDetailsComponent.prototype.age = function (dob) {
        var age = moment().diff(dob, 'years');
        if (age > 0) {
            return age + ' year(s)';
        }
        age = moment().diff(dob, 'months');
        if (age > 0) {
            return age + ' month(s)';
        }
        return moment().diff(dob, 'weeks') + ' week(s)';
    };
    PatientDetailsComponent.ctorParameters = function () { return [
        { type: Router },
        { type: ActivatedRoute },
        { type: PatientService },
        { type: ComponentFactoryResolver },
        { type: TdDialogService },
        { type: NotificationService },
        { type: ViewContainerRef },
        { type: Renderer2 }
    ]; };
    tslib_1.__decorate([
        ViewChild('container', { read: ViewContainerRef, static: true }),
        tslib_1.__metadata("design:type", ViewContainerRef)
    ], PatientDetailsComponent.prototype, "container", void 0);
    PatientDetailsComponent = tslib_1.__decorate([
        Component({
            selector: 'lamis-patient',
            template: "<div>\n    <mat-card>\n        <mat-card class=\"dark-blue-100 full-width\">\n            <mat-card-content>\n                <div class=\"row\">\n                    <div class=\"col-md-9\">\n                        <div class=\"row\">\n                            <mat-form-field class=\"col-md-3\">\n                                <mat-label>Surname</mat-label>\n                                <input matInput [value]=\"entity.surname\" disabled style=\"font-weight: 900\">\n                            </mat-form-field>\n                            <mat-form-field class=\"col-md-3\">\n                                <mat-label>Other Names</mat-label>\n                                <input matInput [value]=\"entity.otherNames\" disabled style=\"font-weight: 900\">\n                            </mat-form-field>\n                            <div class=\"col-md-1\"></div>\n                            <div class=\"col-md-3\">\n                                <span style=\"font-size: 12px\">\n                                    {{entity.gender === 'FEMALE' ? 'Female' : 'Male'}} {{age(entity.dateBirth)}}\n                                    ({{entity.dateBirth | date: 'dd MMM, yyyy'}})\n                                </span>\n                            </div>\n                            <mat-form-field class=\"col-md-2\">\n                                <mat-label>Hospital Number</mat-label>\n                                <input matInput [value]=\"entity.hospitalNum\" disabled style=\"font-weight: 900\">\n                            </mat-form-field>\n                        </div>\n                        <div class=\"row\">\n                            <mat-form-field class=\"col-md-8\">\n                                <mat-label>Address</mat-label>\n                                <input matInput [value]=\"entity.address\" disabled style=\"font-weight: 800\">\n                            </mat-form-field>\n                            <mat-form-field class=\"col-md-4\">\n                                <mat-label>Telephone Number</mat-label>\n                                <input matInput [value]=\"entity.phone || ' '\" disabled style=\"font-weight: 700\">\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div class=\"col-md-3\">\n                        <mat-form-field class=\"col-md-12\">\n                            <mat-label>Current Status</mat-label>\n                            <input matInput [value]=\"status\" disabled style=\"font-weight: 800\">\n                        </mat-form-field>\n                        <a (click)=\"previousState()\" class=\"dark-blue-200\">BACK</a>\n                    </div>\n                </div>\n            </mat-card-content>\n        </mat-card>\n        <div class=\"\">\n            <div class=\"row\">\n                <div class=\"col-md-9\">\n                    <div class=\"row\">\n                        <div #container></div>\n                    </div>\n                </div>\n                <div class=\"col-md-3\">\n                    <mat-card class=\"dark-blue-200\">\n                        <mat-card-header>\n                            General Actions\n                        </mat-card-header>\n                        <mat-divider></mat-divider>\n                        <mat-card-content>\n                            <mat-nav-list>\n                                <mat-list-item *ngFor=\"let action of observations\">\n                                    <mat-icon mat-list-icon>{{action.icon || 'dashboard'}}</mat-icon>\n                                    <a mat-line matTooltip=\"{{action.tooltip || ''}}\"\n                                       (click)=\"addObservation(action)\">{{action.name}}</a>\n                                </mat-list-item>\n                                <mat-list-item>\n                                    <mat-icon mat-list-icon>edit</mat-icon>\n                                    <a mat-line matTooltip=\"Update Patient Status\" (click)=\"updateStatus()\">Update\n                                        Client Status</a>\n                                </mat-list-item>\n                                <mat-list-item>\n                                    <mat-icon mat-list-icon>edit</mat-icon>\n                                    <a mat-line matTooltip=\"Edit Patient registration information\"\n                                       (click)=\"edit()\">Edit Registration\n                                        Information</a>\n                                </mat-list-item>\n                                <mat-list-item>\n                                    <mat-icon mat-list-icon>delete</mat-icon>\n                                    <a mat-line matTooltip=\"Delete patient\" (click)=\"delete()\">Delete Patient</a>\n                                </mat-list-item>\n                            </mat-nav-list>\n                        </mat-card-content>\n                    </mat-card>\n                </div>\n            </div>\n        </div>\n    </mat-card>\n</div>\n",
            styles: [".bold{font-weight:700}"]
        }),
        tslib_1.__metadata("design:paramtypes", [Router, ActivatedRoute, PatientService,
            ComponentFactoryResolver, TdDialogService,
            NotificationService, ViewContainerRef,
            Renderer2])
    ], PatientDetailsComponent);
    return PatientDetailsComponent;
}());
export { PatientDetailsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aWVudC1kZXRhaWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xhbWlzLXBhdGllbnQtMS40LjEvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9wYXRpZW50LWRldGFpbHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULGdCQUFnQixFQUNoQix3QkFBd0IsRUFDeEIsU0FBUyxFQUNULE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNULGdCQUFnQixFQUNuQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsY0FBYyxFQUFFLE1BQU0sRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxrQkFBa0IsRUFBRSxjQUFjLEVBQUUsYUFBYSxFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDOUYsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxZQUFZLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUVyRSxPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQztBQUVsQyxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUM7QUFPdkI7SUFRSSxpQ0FBb0IsTUFBYyxFQUFVLEtBQXFCLEVBQVUsY0FBOEIsRUFDckYsR0FBNkIsRUFBVSxjQUErQixFQUN0RSxtQkFBd0MsRUFBVSxpQkFBbUMsRUFDckYsU0FBb0I7UUFIcEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQ3JGLFFBQUcsR0FBSCxHQUFHLENBQTBCO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWlCO1FBQ3RFLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFBVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ3JGLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFWeEMsYUFBUSxHQUFHLGlCQUFpQixDQUFDO1FBSTdCLGVBQVUsR0FBbUIsRUFBRSxDQUFDO0lBT2hDLENBQUM7SUFFRCwwQ0FBUSxHQUFSO1FBQUEsaUJBU0M7UUFSRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBQyxFQUFRO2dCQUFQLGtCQUFNO1lBQzlCLEtBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDN0QsS0FBSSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsR0FBRztnQkFDOUQsS0FBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7WUFDdEIsQ0FBQyxDQUFDLENBQUM7WUFDSCxLQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdEIsS0FBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHNDQUFJLEdBQUo7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQsOENBQVksR0FBWjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3ZGLENBQUM7SUFFRCx3Q0FBTSxHQUFOO1FBQUEsaUJBb0JDO1FBbkJHLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDO1lBQzVCLEtBQUssRUFBRSxTQUFTO1lBQ2hCLE9BQU8sRUFBRSxnRUFBZ0U7WUFDekUsWUFBWSxFQUFFLElBQUk7WUFDbEIsWUFBWSxFQUFFLEtBQUs7WUFDbkIsS0FBSyxFQUFFLE9BQU87U0FDakIsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFDLE1BQWU7WUFDdkMsSUFBSSxNQUFNLEVBQUU7Z0JBQ1IsS0FBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQyxHQUFHO29CQUNyRCxJQUFJLEdBQUcsQ0FBQyxFQUFFLEVBQUU7d0JBQ1IsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFBO3FCQUNyQzt5QkFBTTt3QkFDSCxLQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLDBDQUEwQyxDQUFDLENBQUE7cUJBQ2pGO2dCQUNMLENBQUMsQ0FBQyxDQUFBO2FBQ0w7aUJBQU07Z0JBQ0gsb0JBQW9CO2FBQ3ZCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsK0NBQWEsR0FBYjtRQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVPLHFEQUFtQixHQUEzQixVQUE0QixJQUFZO1FBQ3BDLElBQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQzlELE9BQThCLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFNLElBQUssT0FBQSxDQUFDLENBQUMsYUFBYSxDQUFDLElBQUksS0FBSyxJQUFJLEVBQTdCLENBQTZCLENBQUMsQ0FBQztJQUM1RixDQUFDO0lBRUQsaURBQWUsR0FBZjtRQUFBLGlCQUVDO1FBREcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQyxHQUF5QixJQUFLLE9BQUEsS0FBSSxDQUFDLFlBQVksR0FBRyxHQUFHLEVBQXZCLENBQXVCLENBQUMsQ0FBQTtJQUN0SCxDQUFDO0lBRUQsZ0RBQWMsR0FBZCxVQUFlLE1BQTBCO1FBQ3JDLElBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BDLElBQU0sS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEIsS0FBSyxDQUFDLElBQUksT0FBVixLQUFLLG1CQUFTLElBQUksR0FBRTtRQUNwQixLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsa0JBQUssS0FBSyxFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVPLGdEQUFjLEdBQXRCO1FBQ0ksSUFBSSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsRUFBRSxtQkFBbUIsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsV0FBVyxDQUFDLHdCQUF3QixFQUFFLGlCQUFpQixFQUFFLHdCQUF3QixDQUFDLENBQUM7UUFDeEY7Ozs7YUFJSztJQUNULENBQUM7SUFFTSw2Q0FBVyxHQUFsQjtJQUNBLENBQUM7SUFFTyw2Q0FBVyxHQUFuQixVQUFvQixhQUFxQixFQUFFLEtBQWEsRUFBRSxJQUFZO1FBQ2xFLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN4RCxJQUFJLE9BQU8sS0FBSyxTQUFTLEVBQUU7WUFDdkIsSUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLDBCQUEwQixDQUFDLENBQUM7WUFDM0UsSUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDbkUsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUU7Z0JBQzFDLElBQU0sT0FBTyxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztnQkFDdkQsTUFBTSxJQUFJLFNBQVMsQ0FBQyx3Q0FBc0MsT0FBTyxzREFBbUQsQ0FBQyxDQUFDO2FBQ3pIO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxZQUFZLENBQUMsQ0FBQztZQUMvQyxJQUFNLFdBQVcsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNyRixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUN6RSxZQUFZLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDbEMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ3BDLElBQUk7Z0JBQ0EsV0FBVyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7Z0JBQ2hELFdBQVcsQ0FBQyxRQUFRLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO2FBQ3ZEO1lBQUMsT0FBTyxDQUFDLEVBQUU7YUFFWDtTQUNKO0lBQ0wsQ0FBQztJQUVELHFDQUFHLEdBQUgsVUFBSSxHQUFXO1FBQ1gsSUFBSSxHQUFHLEdBQUcsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN0QyxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUU7WUFDVCxPQUFPLEdBQUcsR0FBRyxVQUFVLENBQUE7U0FDMUI7UUFFRCxHQUFHLEdBQUcsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNuQyxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUU7WUFDVCxPQUFPLEdBQUcsR0FBRyxXQUFXLENBQUM7U0FDNUI7UUFDRCxPQUFPLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsVUFBVSxDQUFDO0lBQ3BELENBQUM7O2dCQW5IMkIsTUFBTTtnQkFBaUIsY0FBYztnQkFBMEIsY0FBYztnQkFDaEYsd0JBQXdCO2dCQUEwQixlQUFlO2dCQUNqRCxtQkFBbUI7Z0JBQTZCLGdCQUFnQjtnQkFDMUUsU0FBUzs7SUFQd0I7UUFBL0QsU0FBUyxDQUFDLFdBQVcsRUFBRSxFQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFDLENBQUM7MENBQVksZ0JBQWdCOzhEQUFDO0lBSm5GLHVCQUF1QjtRQUxuQyxTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZUFBZTtZQUN6QixzaEtBQStDOztTQUVsRCxDQUFDO2lEQVM4QixNQUFNLEVBQWlCLGNBQWMsRUFBMEIsY0FBYztZQUNoRix3QkFBd0IsRUFBMEIsZUFBZTtZQUNqRCxtQkFBbUIsRUFBNkIsZ0JBQWdCO1lBQzFFLFNBQVM7T0FYL0IsdUJBQXVCLENBNEhuQztJQUFELDhCQUFDO0NBQUEsQUE1SEQsSUE0SEM7U0E1SFksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgQ29tcG9uZW50RmFjdG9yeSxcbiAgICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBSZW5kZXJlcjIsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdDb250YWluZXJSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1BhdGllbnR9IGZyb20gJy4uL21vZGVsL3BhdGllbnQubW9kZWwnO1xuaW1wb3J0IHtBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtQYXRpZW50T2JzZXJ2YXRpb24sIFBhdGllbnRTZXJ2aWNlLCBQYXRpZW50V2lkZ2V0fSBmcm9tICcuLi9zZXJ2aWNlcy9wYXRpZW50LnNlcnZpY2UnO1xuaW1wb3J0IHtUZERpYWxvZ1NlcnZpY2V9IGZyb20gJ0Bjb3ZhbGVudC9jb3JlJztcbmltcG9ydCB7Q2FyZFZpZXdJdGVtLCBOb3RpZmljYXRpb25TZXJ2aWNlfSBmcm9tICdAYWxmcmVzY28vYWRmLWNvcmUnO1xuaW1wb3J0IHtNb21lbnR9IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XG5cbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbGFtaXMtcGF0aWVudCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3BhdGllbnQtZGV0YWlscy5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vcGF0aWVudC1kZXRhaWxzLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUGF0aWVudERldGFpbHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgdGVtcGxhdGUgPSAncGF0aWVudC1kZXRhaWxzJztcbiAgICBlbnRpdHk6IFBhdGllbnQ7XG4gICAgb2JzZXJ2YXRpb25zOiBQYXRpZW50T2JzZXJ2YXRpb25bXTtcbiAgICBAVmlld0NoaWxkKCdjb250YWluZXInLCB7cmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiB0cnVlfSkgY29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmO1xuICAgIHByb3BlcnRpZXM6IENhcmRWaWV3SXRlbVtdID0gW107XG4gICAgc3RhdHVzOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHJpdmF0ZSBwYXRpZW50U2VydmljZTogUGF0aWVudFNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBjZnI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgcHJpdmF0ZSBfZGlhbG9nU2VydmljZTogVGREaWFsb2dTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgbm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSwgcHJpdmF0ZSBfdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJlbmRlcmVyMjogUmVuZGVyZXIyKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMucm91dGUuZGF0YS5zdWJzY3JpYmUoKHtlbnRpdHl9KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVudGl0eSA9ICEhZW50aXR5ICYmIGVudGl0eS5ib2R5ID8gZW50aXR5LmJvZHkgOiBlbnRpdHk7XG4gICAgICAgICAgICB0aGlzLnBhdGllbnRTZXJ2aWNlLmN1cnJlbnRDbGllbnRTdGF0dXMoZW50aXR5LnV1aWQpLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gcmVzO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmF0dGFjaGVXaWRnZXRzKCk7XG4gICAgICAgICAgICB0aGlzLmdldE9ic2VydmF0aW9ucygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBlZGl0KCkge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy4uJywgJ2VkaXQnXSwge3JlbGF0aXZlVG86IHRoaXMucm91dGV9KTtcbiAgICB9XG5cbiAgICB1cGRhdGVTdGF0dXMoKSB7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLycsICdjbGllbnQtc3RhdHVzZXMnLCAncGF0aWVudCcsIHRoaXMuZW50aXR5LnV1aWQsICduZXcnXSk7XG4gICAgfVxuXG4gICAgZGVsZXRlKCkge1xuICAgICAgICB0aGlzLl9kaWFsb2dTZXJ2aWNlLm9wZW5Db25maXJtKHtcbiAgICAgICAgICAgIHRpdGxlOiAnQ29uZmlybScsXG4gICAgICAgICAgICBtZXNzYWdlOiAnRG8geW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgcGF0aWVudCwgYWN0aW9uIGNhbm5vdCBiZSByZXZlcnNlZD8nLFxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uOiAnTm8nLFxuICAgICAgICAgICAgYWNjZXB0QnV0dG9uOiAnWWVzJyxcbiAgICAgICAgICAgIHdpZHRoOiAnNTAwcHgnLFxuICAgICAgICB9KS5hZnRlckNsb3NlZCgpLnN1YnNjcmliZSgoYWNjZXB0OiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgICBpZiAoYWNjZXB0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXRpZW50U2VydmljZS5kZWxldGUodGhpcy5lbnRpdHkuaWQpLnN1YnNjcmliZSgocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsncGF0aWVudHMnXSlcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zaG93RXJyb3IoJ0Vycm9yIGRlbGV0aW5nIHBhdGllbnQsIHBsZWFzZSB0cnkgYWdhaW4nKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gRE8gU09NRVRISU5HIEVMU0VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJldmlvdXNTdGF0ZSgpIHtcbiAgICAgICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Q29tcG9uZW50RmFjdG9yeShuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgZmFjdG9yaWVzID0gQXJyYXkuZnJvbSh0aGlzLmNmclsnX2ZhY3RvcmllcyddLnZhbHVlcygpKTtcbiAgICAgICAgcmV0dXJuIDxDb21wb25lbnRGYWN0b3J5PGFueT4+ZmFjdG9yaWVzLmZpbmQoKHg6IGFueSkgPT4geC5jb21wb25lbnRUeXBlLm5hbWUgPT09IG5hbWUpO1xuICAgIH1cblxuICAgIGdldE9ic2VydmF0aW9ucygpIHtcbiAgICAgICAgdGhpcy5wYXRpZW50U2VydmljZS5vYnNlcnZhdGlvbnModGhpcy5lbnRpdHkuaWQpLnN1YnNjcmliZSgocmVzOiBQYXRpZW50T2JzZXJ2YXRpb25bXSkgPT4gdGhpcy5vYnNlcnZhdGlvbnMgPSByZXMpXG4gICAgfVxuXG4gICAgYWRkT2JzZXJ2YXRpb24oYWN0aW9uOiBQYXRpZW50T2JzZXJ2YXRpb24pIHtcbiAgICAgICAgY29uc3QgcGF0aCA9IGFjdGlvbi5wYXRoLnNwbGl0KCcvJyk7XG4gICAgICAgIGNvbnN0IHBhcnRzID0gWycvJ107XG4gICAgICAgIHBhcnRzLnB1c2goLi4ucGF0aCk7XG4gICAgICAgIHBhcnRzLnB1c2goJ3BhdGllbnQnLCB0aGlzLmVudGl0eS51dWlkLCAnbmV3Jyk7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsuLi5wYXJ0c10pO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXR0YWNoZVdpZGdldHMoKSB7XG4gICAgICAgIHRoaXMuYnVpbGRXaWRnZXQoJ1RpbWVsaW5lQ29tcG9uZW50JywgJ1JlY2VudCBBY3Rpdml0aWVzJywgJ3RpbWVsaW5lJyk7XG4gICAgICAgIHRoaXMuYnVpbGRXaWRnZXQoJ1N1bW1hcnlXaWRnZXRDb21wb25lbnQnLCAnUGF0aWVudCBTdW1tYXJ5JywgJ2FjY291bnRfYmFsYW5jZV93YWxsZXQnKTtcbiAgICAgICAgLyp0aGlzLnBhdGllbnRTZXJ2aWNlLndpZGdldHModGhpcy5lbnRpdHkuaWQpLnN1YnNjcmliZSgocmVzOiBQYXRpZW50V2lkZ2V0W10pID0+IHtcbiAgICAgICAgICAgIHJlcy5mb3JFYWNoKCh3aWRnZXQ6IFBhdGllbnRXaWRnZXQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1aWxkV2lkZ2V0KHdpZGdldC5jb21wb25lbnROYW1lLCB3aWRnZXQudGl0bGUsIHdpZGdldC5pY29uKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pOyovXG4gICAgfVxuXG4gICAgcHVibGljIG5nT25EZXN0cm95KCkge1xuICAgIH1cblxuICAgIHByaXZhdGUgYnVpbGRXaWRnZXQoY29tcG9uZW50TmFtZTogc3RyaW5nLCB0aXRsZTogc3RyaW5nLCBpY29uOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgZmFjdG9yeSA9IHRoaXMuZ2V0Q29tcG9uZW50RmFjdG9yeShjb21wb25lbnROYW1lKTtcbiAgICAgICAgaWYgKGZhY3RvcnkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc3QgcGFyZW50RmFjdG9yeSA9IHRoaXMuZ2V0Q29tcG9uZW50RmFjdG9yeSgnV2lkZ2V0Q29udGFpbmVyQ29tcG9uZW50Jyk7XG4gICAgICAgICAgICBjb25zdCBjb21wb25lbnRSZWYgPSB0aGlzLmNvbnRhaW5lci5jcmVhdGVDb21wb25lbnQocGFyZW50RmFjdG9yeSk7XG4gICAgICAgICAgICBpZiAoIWNvbXBvbmVudFJlZi5pbnN0YW5jZS5lbWJlZGRlZENvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNtcE5hbWUgPSBjb21wb25lbnRSZWYuaW5zdGFuY2UuY29uc3RydWN0b3IubmFtZTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBUcnlpbmcgdG8gcmVuZGVyIGVtYmVkZGVkIGNvbnRlbnQuICR7Y21wTmFtZX0gbXVzdCBoYXZlIEBWaWV3Q2hpbGQoKSBlbWJlZGRlZENvbnRhaW5lciBkZWZpbmVkYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQ3JlYXRlZCBjb21wb25lbnQnLCBjb21wb25lbnRSZWYpO1xuICAgICAgICAgICAgY29uc3QgaW5zdGFuY2VSZWYgPSBjb21wb25lbnRSZWYuaW5zdGFuY2UuZW1iZWRkZWRDb250YWluZXIuY3JlYXRlQ29tcG9uZW50KGZhY3RvcnkpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlcjIuYWRkQ2xhc3MoY29tcG9uZW50UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQsICdjb2wtbWQtNicpO1xuICAgICAgICAgICAgY29tcG9uZW50UmVmLmluc3RhbmNlLmljb24gPSBpY29uO1xuICAgICAgICAgICAgY29tcG9uZW50UmVmLmluc3RhbmNlLnRpdGxlID0gdGl0bGU7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlUmVmLmluc3RhbmNlLnBhdGllbnRJZCA9IHRoaXMuZW50aXR5LmlkO1xuICAgICAgICAgICAgICAgIGluc3RhbmNlUmVmLmluc3RhbmNlLnBhdGllbnRVdWlkID0gdGhpcy5lbnRpdHkudXVpZDtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWdlKGRvYjogTW9tZW50KSB7XG4gICAgICAgIGxldCBhZ2UgPSBtb21lbnQoKS5kaWZmKGRvYiwgJ3llYXJzJyk7XG4gICAgICAgIGlmIChhZ2UgPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYWdlICsgJyB5ZWFyKHMpJ1xuICAgICAgICB9XG5cbiAgICAgICAgYWdlID0gbW9tZW50KCkuZGlmZihkb2IsICdtb250aHMnKTtcbiAgICAgICAgaWYgKGFnZSA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiBhZ2UgKyAnIG1vbnRoKHMpJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbW9tZW50KCkuZGlmZihkb2IsICd3ZWVrcycpICsgJyB3ZWVrKHMpJztcbiAgICB9XG59XG4iXX0=