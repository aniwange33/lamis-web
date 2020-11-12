import * as tslib_1 from "tslib";
import {
    Component,
    ComponentFactory,
    ComponentFactoryResolver,
    OnDestroy,
    OnInit,
    Renderer2,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PatientObservation, PatientService, PatientWidget} from '../services/patient.service';
import {TdDialogService} from '@covalent/core';
import {CardViewItem, NotificationService} from '@alfresco/adf-core';
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
        this.router.navigate(['..', 'edit'], {relativeTo: this.route});
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
                    } else {
                        _this.notificationService.showError('Error deleting patient, please try again');
                    }
                });
            } else {
                // DO SOMETHING ELSE
            }
        });
    };
    PatientDetailsComponent.prototype.previousState = function () {
        window.history.back();
    };
    PatientDetailsComponent.prototype.getComponentFactory = function (name) {
        var factories = Array.from(this.cfr['_factories'].values());
        return factories.find(function (x) {
            return x.componentType.name === name;
        });
    };
    PatientDetailsComponent.prototype.getObservations = function () {
        var _this = this;
        this.patientService.observations(this.entity.id).subscribe(function (res) {
            return _this.observations = res;
        });
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
            } catch (e) {
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
    PatientDetailsComponent.ctorParameters = function () {
        return [
            {type: Router},
            {type: ActivatedRoute},
            {type: PatientService},
            {type: ComponentFactoryResolver},
            {type: TdDialogService},
            {type: NotificationService},
            {type: ViewContainerRef},
            {type: Renderer2}
        ];
    };
    tslib_1.__decorate([
        ViewChild('container', {read: ViewContainerRef, static: true}),
        tslib_1.__metadata("design:type", ViewContainerRef)
    ], PatientDetailsComponent.prototype, "container", void 0);
    PatientDetailsComponent = tslib_1.__decorate([
        Component({
            selector: 'lamis-patient',
            template: "<div>\r\n    <mat-card>\r\n        <mat-card class=\"dark-blue-100 full-width\">\r\n            <mat-card-content>\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-9\">\r\n                        <div class=\"row\">\r\n                            <mat-form-field class=\"col-md-3\">\r\n                                <mat-label>Surname</mat-label>\r\n                                <input matInput [value]=\"entity.surname\" disabled style=\"font-weight: 900\">\r\n                            </mat-form-field>\r\n                            <mat-form-field class=\"col-md-3\">\r\n                                <mat-label>Other Names</mat-label>\r\n                                <input matInput [value]=\"entity.otherNames\" disabled style=\"font-weight: 900\">\r\n                            </mat-form-field>\r\n                            <div class=\"col-md-1\"></div>\r\n                            <div class=\"col-md-3\">\r\n                                <span style=\"font-size: 12px\">\r\n                                    {{entity.gender === 'FEMALE' ? 'Female' : 'Male'}} {{age(entity.dateBirth)}}\r\n                                    ({{entity.dateBirth | date: 'dd MMM, yyyy'}})\r\n                                </span>\r\n                            </div>\r\n                            <mat-form-field class=\"col-md-2\">\r\n                                <mat-label>Hospital Number</mat-label>\r\n                                <input matInput [value]=\"entity.hospitalNum\" disabled style=\"font-weight: 900\">\r\n                            </mat-form-field>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                            <mat-form-field class=\"col-md-8\">\r\n                                <mat-label>Address</mat-label>\r\n                                <input matInput [value]=\"entity.address\" disabled style=\"font-weight: 800\">\r\n                            </mat-form-field>\r\n                            <mat-form-field class=\"col-md-4\">\r\n                                <mat-label>Telephone Number</mat-label>\r\n                                <input matInput [value]=\"entity.phone || ' '\" disabled style=\"font-weight: 700\">\r\n                            </mat-form-field>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"col-md-3\">\r\n                        <mat-form-field class=\"col-md-12\">\r\n                            <mat-label>Current Status</mat-label>\r\n                            <input matInput [value]=\"status\" disabled style=\"font-weight: 800\">\r\n                        </mat-form-field>\r\n                        <a (click)=\"previousState()\" class=\"dark-blue-200\">BACK</a>\r\n                    </div>\r\n                </div>\r\n            </mat-card-content>\r\n        </mat-card>\r\n        <div class=\"\">\r\n            <div class=\"row\">\r\n                <div class=\"col-md-9\">\r\n                    <div class=\"row\">\r\n                        <div #container></div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"col-md-3\">\r\n                    <mat-card class=\"dark-blue-200\">\r\n                        <mat-card-header>\r\n                            General Actions\r\n                        </mat-card-header>\r\n                        <mat-divider></mat-divider>\r\n                        <mat-card-content>\r\n                            <mat-nav-list>\r\n                                <mat-list-item *ngFor=\"let action of observations\">\r\n                                    <mat-icon mat-list-icon>{{action.icon || 'dashboard'}}</mat-icon>\r\n                                    <a mat-line matTooltip=\"{{action.tooltip || ''}}\"\r\n                                       (click)=\"addObservation(action)\">{{action.name}}</a>\r\n                                </mat-list-item>\r\n                                <mat-list-item>\r\n                                    <mat-icon mat-list-icon>edit</mat-icon>\r\n                                    <a mat-line matTooltip=\"Update Patient Status\" (click)=\"updateStatus()\">Update\r\n                                        Client Status</a>\r\n                                </mat-list-item>\r\n                                <mat-list-item>\r\n                                    <mat-icon mat-list-icon>edit</mat-icon>\r\n                                    <a mat-line matTooltip=\"Edit Patient registration information\"\r\n                                       (click)=\"edit()\">Edit Registration\r\n                                        Information</a>\r\n                                </mat-list-item>\r\n                                <mat-list-item>\r\n                                    <mat-icon mat-list-icon>delete</mat-icon>\r\n                                    <a mat-line matTooltip=\"Delete patient\" (click)=\"delete()\">Delete Patient</a>\r\n                                </mat-list-item>\r\n                            </mat-nav-list>\r\n                        </mat-card-content>\r\n                    </mat-card>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </mat-card>\r\n</div>\r\n",
            styles: [".bold{font-weight:700}"]
        }),
        tslib_1.__metadata("design:paramtypes", [Router, ActivatedRoute, PatientService,
            ComponentFactoryResolver, TdDialogService,
            NotificationService, ViewContainerRef,
            Renderer2])
    ], PatientDetailsComponent);
    return PatientDetailsComponent;
}());
export {PatientDetailsComponent};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aWVudC1kZXRhaWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xhbWlzLXBhdGllbnQtMS4yLjAvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9wYXRpZW50LWRldGFpbHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULGdCQUFnQixFQUNoQix3QkFBd0IsRUFDeEIsU0FBUyxFQUNULE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNULGdCQUFnQixFQUNuQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxjQUFjLEVBQUUsYUFBYSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDaEcsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxZQUFZLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUV2RSxPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQztBQUVsQyxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUM7QUFPdkI7SUFRSSxpQ0FBb0IsTUFBYyxFQUFVLEtBQXFCLEVBQVUsY0FBOEIsRUFDckYsR0FBNkIsRUFBVSxjQUErQixFQUN0RSxtQkFBd0MsRUFBVSxpQkFBbUMsRUFDckYsU0FBb0I7UUFIcEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQ3JGLFFBQUcsR0FBSCxHQUFHLENBQTBCO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWlCO1FBQ3RFLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFBVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ3JGLGNBQVMsR0FBVCxTQUFTLENB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LEdBQUcsR0FBRyxXQUFXLENBQUM7U0FDNUI7UUFDRCxPQUFPLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsVUFBVSxDQUFDO0lBQ3BELENBQUM7O2dCQW5IMkIsTUFBTTtnQkFBaUIsY0FBYztnQkFBMEIsY0FBYztnQkFDaEYsd0JBQXdCO2dCQUEwQixlQUFlO2dCQUNqRCxtQkFBbUI7Z0JBQTZCLGdCQUFnQjtnQkFDMUUsU0FBUzs7SUFQd0I7UUFBL0QsU0FBUyxDQUFDLFdBQVcsRUFBRSxFQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFDLENBQUM7MENBQVksZ0JBQWdCOzhEQUFDO0lBSm5GLHVCQUF1QjtRQUxuQyxTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZUFBZTtZQUN6Qiw0c0tBQStDOztTQUVsRCxDQUFDO2lEQVM4QixNQUFNLEVBQWlCLGNBQWMsRUFBMEIsY0FBYztZQUNoRix3QkFBd0IsRUFBMEIsZUFBZTtZQUNqRCxtQkFBbUIsRUFBNkIsZ0JBQWdCO1lBQzFFLFNBQVM7T0FYL0IsdUJBQXVCLENBNEhuQztJQUFELDhCQUFDO0NBQUEsQUE1SEQsSUE0SEM7U0E1SFksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIENvbXBvbmVudCxcclxuICAgIENvbXBvbmVudEZhY3RvcnksXHJcbiAgICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgICBPbkRlc3Ryb3ksXHJcbiAgICBPbkluaXQsXHJcbiAgICBSZW5kZXJlcjIsXHJcbiAgICBWaWV3Q2hpbGQsXHJcbiAgICBWaWV3Q29udGFpbmVyUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFBhdGllbnQgfSBmcm9tICcuLi9tb2RlbC9wYXRpZW50Lm1vZGVsJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IFBhdGllbnRPYnNlcnZhdGlvbiwgUGF0aWVudFNlcnZpY2UsIFBhdGllbnRXaWRnZXQgfSBmcm9tICcuLi9zZXJ2aWNlcy9wYXRpZW50LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBUZERpYWxvZ1NlcnZpY2UgfSBmcm9tICdAY292YWxlbnQvY29yZSc7XHJcbmltcG9ydCB7IENhcmRWaWV3SXRlbSwgTm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gJ0BhbGZyZXNjby9hZGYtY29yZSc7XHJcbmltcG9ydCB7IE1vbWVudCB9IGZyb20gJ21vbWVudCc7XHJcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcclxuXHJcbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbGFtaXMtcGF0aWVudCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vcGF0aWVudC1kZXRhaWxzLmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWycuL3BhdGllbnQtZGV0YWlscy5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQYXRpZW50RGV0YWlsc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICAgIHRlbXBsYXRlID0gJ3BhdGllbnQtZGV0YWlscyc7XHJcbiAgICBlbnRpdHk6IFBhdGllbnQ7XHJcbiAgICBvYnNlcnZhdGlvbnM6IFBhdGllbnRPYnNlcnZhdGlvbltdO1xyXG4gICAgQFZpZXdDaGlsZCgnY29udGFpbmVyJywge3JlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZX0pIGNvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZjtcclxuICAgIHByb3BlcnRpZXM6IENhcmRWaWV3SXRlbVtdID0gW107XHJcbiAgICBzdGF0dXM6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHJpdmF0ZSBwYXRpZW50U2VydmljZTogUGF0aWVudFNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGNmcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBwcml2YXRlIF9kaWFsb2dTZXJ2aWNlOiBUZERpYWxvZ1NlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIG5vdGlmaWNhdGlvblNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UsIHByaXZhdGUgX3ZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJlbmRlcmVyMjogUmVuZGVyZXIyKSB7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZS5kYXRhLnN1YnNjcmliZSgoe2VudGl0eX0pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5lbnRpdHkgPSAhIWVudGl0eSAmJiBlbnRpdHkuYm9keSA/IGVudGl0eS5ib2R5IDogZW50aXR5O1xyXG4gICAgICAgICAgICB0aGlzLnBhdGllbnRTZXJ2aWNlLmN1cnJlbnRDbGllbnRTdGF0dXMoZW50aXR5LnV1aWQpLnN1YnNjcmliZShyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0dXMgPSByZXM7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmF0dGFjaGVXaWRnZXRzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0T2JzZXJ2YXRpb25zKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZWRpdCgpIHtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy4uJywgJ2VkaXQnXSwge3JlbGF0aXZlVG86IHRoaXMucm91dGV9KTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVTdGF0dXMoKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvJywgJ2NsaWVudC1zdGF0dXNlcycsICdwYXRpZW50JywgdGhpcy5lbnRpdHkudXVpZCwgJ25ldyddKTtcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGUoKSB7XHJcbiAgICAgICAgdGhpcy5fZGlhbG9nU2VydmljZS5vcGVuQ29uZmlybSh7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnQ29uZmlybScsXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdEbyB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBwYXRpZW50LCBhY3Rpb24gY2Fubm90IGJlIHJldmVyc2VkPycsXHJcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvbjogJ05vJyxcclxuICAgICAgICAgICAgYWNjZXB0QnV0dG9uOiAnWWVzJyxcclxuICAgICAgICAgICAgd2lkdGg6ICc1MDBweCcsXHJcbiAgICAgICAgfSkuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUoKGFjY2VwdDogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoYWNjZXB0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhdGllbnRTZXJ2aWNlLmRlbGV0ZSh0aGlzLmVudGl0eS5pZCkuc3Vic2NyaWJlKChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLm9rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsncGF0aWVudHMnXSlcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc2hvd0Vycm9yKCdFcnJvciBkZWxldGluZyBwYXRpZW50LCBwbGVhc2UgdHJ5IGFnYWluJylcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gRE8gU09NRVRISU5HIEVMU0VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByZXZpb3VzU3RhdGUoKSB7XHJcbiAgICAgICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0Q29tcG9uZW50RmFjdG9yeShuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCBmYWN0b3JpZXMgPSBBcnJheS5mcm9tKHRoaXMuY2ZyWydfZmFjdG9yaWVzJ10udmFsdWVzKCkpO1xyXG4gICAgICAgIHJldHVybiA8Q29tcG9uZW50RmFjdG9yeTxhbnk+PmZhY3Rvcmllcy5maW5kKCh4OiBhbnkpID0+IHguY29tcG9uZW50VHlwZS5uYW1lID09PSBuYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRPYnNlcnZhdGlvbnMoKSB7XHJcbiAgICAgICAgdGhpcy5wYXRpZW50U2VydmljZS5vYnNlcnZhdGlvbnModGhpcy5lbnRpdHkuaWQpLnN1YnNjcmliZSgocmVzOiBQYXRpZW50T2JzZXJ2YXRpb25bXSkgPT4gdGhpcy5vYnNlcnZhdGlvbnMgPSByZXMpXHJcbiAgICB9XHJcblxyXG4gICAgYWRkT2JzZXJ2YXRpb24oYWN0aW9uOiBQYXRpZW50T2JzZXJ2YXRpb24pIHtcclxuICAgICAgICBjb25zdCBwYXRoID0gYWN0aW9uLnBhdGguc3BsaXQoJy8nKTtcclxuICAgICAgICBjb25zdCBwYXJ0cyA9IFsnLyddO1xyXG4gICAgICAgIHBhcnRzLnB1c2goLi4ucGF0aCk7XHJcbiAgICAgICAgcGFydHMucHVzaCgncGF0aWVudCcsIHRoaXMuZW50aXR5LnV1aWQsICduZXcnKTtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbLi4ucGFydHNdKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGF0dGFjaGVXaWRnZXRzKCkge1xyXG4gICAgICAgIHRoaXMuYnVpbGRXaWRnZXQoJ1RpbWVsaW5lQ29tcG9uZW50JywgJ1JlY2VudCBBY3Rpdml0aWVzJywgJ3RpbWVsaW5lJyk7XHJcbiAgICAgICAgdGhpcy5idWlsZFdpZGdldCgnU3VtbWFyeVdpZGdldENvbXBvbmVudCcsICdQYXRpZW50IFN1bW1hcnknLCAnYWNjb3VudF9iYWxhbmNlX3dhbGxldCcpO1xyXG4gICAgICAgIC8qdGhpcy5wYXRpZW50U2VydmljZS53aWRnZXRzKHRoaXMuZW50aXR5LmlkKS5zdWJzY3JpYmUoKHJlczogUGF0aWVudFdpZGdldFtdKSA9PiB7XHJcbiAgICAgICAgICAgIHJlcy5mb3JFYWNoKCh3aWRnZXQ6IFBhdGllbnRXaWRnZXQpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnVpbGRXaWRnZXQod2lkZ2V0LmNvbXBvbmVudE5hbWUsIHdpZGdldC50aXRsZSwgd2lkZ2V0Lmljb24pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pOyovXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5nT25EZXN0cm95KCkge1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYnVpbGRXaWRnZXQoY29tcG9uZW50TmFtZTogc3RyaW5nLCB0aXRsZTogc3RyaW5nLCBpY29uOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5nZXRDb21wb25lbnRGYWN0b3J5KGNvbXBvbmVudE5hbWUpO1xyXG4gICAgICAgIGlmIChmYWN0b3J5ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgY29uc3QgcGFyZW50RmFjdG9yeSA9IHRoaXMuZ2V0Q29tcG9uZW50RmFjdG9yeSgnV2lkZ2V0Q29udGFpbmVyQ29tcG9uZW50Jyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IHRoaXMuY29udGFpbmVyLmNyZWF0ZUNvbXBvbmVudChwYXJlbnRGYWN0b3J5KTtcclxuICAgICAgICAgICAgaWYgKCFjb21wb25lbnRSZWYuaW5zdGFuY2UuZW1iZWRkZWRDb250YWluZXIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNtcE5hbWUgPSBjb21wb25lbnRSZWYuaW5zdGFuY2UuY29uc3RydWN0b3IubmFtZTtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYFRyeWluZyB0byByZW5kZXIgZW1iZWRkZWQgY29udGVudC4gJHtjbXBOYW1lfSBtdXN0IGhhdmUgQFZpZXdDaGlsZCgpIGVtYmVkZGVkQ29udGFpbmVyIGRlZmluZWRgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQ3JlYXRlZCBjb21wb25lbnQnLCBjb21wb25lbnRSZWYpO1xyXG4gICAgICAgICAgICBjb25zdCBpbnN0YW5jZVJlZiA9IGNvbXBvbmVudFJlZi5pbnN0YW5jZS5lbWJlZGRlZENvbnRhaW5lci5jcmVhdGVDb21wb25lbnQoZmFjdG9yeSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIyLmFkZENsYXNzKGNvbXBvbmVudFJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50LCAnY29sLW1kLTYnKTtcclxuICAgICAgICAgICAgY29tcG9uZW50UmVmLmluc3RhbmNlLmljb24gPSBpY29uO1xyXG4gICAgICAgICAgICBjb21wb25lbnRSZWYuaW5zdGFuY2UudGl0bGUgPSB0aXRsZTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlUmVmLmluc3RhbmNlLnBhdGllbnRJZCA9IHRoaXMuZW50aXR5LmlkO1xyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2VSZWYuaW5zdGFuY2UucGF0aWVudFV1aWQgPSB0aGlzLmVudGl0eS51dWlkO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFnZShkb2I6IE1vbWVudCkge1xyXG4gICAgICAgIGxldCBhZ2UgPSBtb21lbnQoKS5kaWZmKGRvYiwgJ3llYXJzJyk7XHJcbiAgICAgICAgaWYgKGFnZSA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFnZSArICcgeWVhcihzKSdcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFnZSA9IG1vbWVudCgpLmRpZmYoZG9iLCAnbW9udGhzJyk7XHJcbiAgICAgICAgaWYgKGFnZSA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFnZSArICcgbW9udGgocyknO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbW9tZW50KCkuZGlmZihkb2IsICd3ZWVrcycpICsgJyB3ZWVrKHMpJztcclxuICAgIH1cclxufVxyXG4iXX0=
