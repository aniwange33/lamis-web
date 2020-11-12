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

const moment = moment_;
let PatientDetailsComponent = class PatientDetailsComponent {
    constructor(router, route, patientService, cfr, _dialogService, notificationService, _viewContainerRef, renderer2) {
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

    ngOnInit() {
        this.route.data.subscribe(({entity}) => {
            this.entity = !!entity && entity.body ? entity.body : entity;
            this.patientService.currentClientStatus(entity.uuid).subscribe(res => {
                this.status = res;
            });
            this.attacheWidgets();
            this.getObservations();
        });
    }

    edit() {
        this.router.navigate(['..', 'edit'], {relativeTo: this.route});
    }

    updateStatus() {
        this.router.navigate(['/', 'client-statuses', 'patient', this.entity.uuid, 'new']);
    }

    delete() {
        this._dialogService.openConfirm({
            title: 'Confirm',
            message: 'Do you want to delete this patient, action cannot be reversed?',
            cancelButton: 'No',
            acceptButton: 'Yes',
            width: '500px',
        }).afterClosed().subscribe((accept) => {
            if (accept) {
                this.patientService.delete(this.entity.id).subscribe((res) => {
                    if (res.ok) {
                        this.router.navigate(['patients']);
                    } else {
                        this.notificationService.showError('Error deleting patient, please try again');
                    }
                });
            } else {
                // DO SOMETHING ELSE
            }
        });
    }

    previousState() {
        window.history.back();
    }

    getComponentFactory(name) {
        const factories = Array.from(this.cfr['_factories'].values());
        return factories.find((x) => x.componentType.name === name);
    }

    getObservations() {
        this.patientService.observations(this.entity.id).subscribe((res) => this.observations = res);
    }

    addObservation(action) {
        const path = action.path.split('/');
        const parts = ['/'];
        parts.push(...path);
        parts.push('patient', this.entity.uuid, 'new');
        this.router.navigate([...parts]);
    }

    attacheWidgets() {
        this.buildWidget('TimelineComponent', 'Recent Activities', 'timeline');
        this.buildWidget('SummaryWidgetComponent', 'Patient Summary', 'account_balance_wallet');
        /*this.patientService.widgets(this.entity.id).subscribe((res: PatientWidget[]) => {
            res.forEach((widget: PatientWidget) => {
                this.buildWidget(widget.componentName, widget.title, widget.icon);
            })
        });*/
    }

    ngOnDestroy() {
    }

    buildWidget(componentName, title, icon) {
        const factory = this.getComponentFactory(componentName);
        if (factory !== undefined) {
            const parentFactory = this.getComponentFactory('WidgetContainerComponent');
            const componentRef = this.container.createComponent(parentFactory);
            if (!componentRef.instance.embeddedContainer) {
                const cmpName = componentRef.instance.constructor.name;
                throw new TypeError(`Trying to render embedded content. ${cmpName} must have @ViewChild() embeddedContainer defined`);
            }
            console.log('Created component', componentRef);
            const instanceRef = componentRef.instance.embeddedContainer.createComponent(factory);
            this.renderer2.addClass(componentRef.location.nativeElement, 'col-md-6');
            componentRef.instance.icon = icon;
            componentRef.instance.title = title;
            try {
                instanceRef.instance.patientId = this.entity.id;
                instanceRef.instance.patientUuid = this.entity.uuid;
            } catch (e) {
            }
        }
    }

    age(dob) {
        let age = moment().diff(dob, 'years');
        if (age > 0) {
            return age + ' year(s)';
        }
        age = moment().diff(dob, 'months');
        if (age > 0) {
            return age + ' month(s)';
        }
        return moment().diff(dob, 'weeks') + ' week(s)';
    }
};
PatientDetailsComponent.ctorParameters = () => [
    {type: Router},
    {type: ActivatedRoute},
    {type: PatientService},
    {type: ComponentFactoryResolver},
    {type: TdDialogService},
    {type: NotificationService},
    {type: ViewContainerRef},
    {type: Renderer2}
];
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
export {PatientDetailsComponent};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aWVudC1kZXRhaWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xhbWlzLXBhdGllbnQtMS4yLjAvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9wYXRpZW50LWRldGFpbHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULGdCQUFnQixFQUNoQix3QkFBd0IsRUFDeEIsU0FBUyxFQUNULE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNULGdCQUFnQixFQUNuQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxjQUFjLEVBQUUsYUFBYSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDaEcsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxZQUFZLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUV2RSxPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQztBQUVsQyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUM7QUFPdkIsSUFBYSx1QkFBdUIsR0FBcEMsTUFBYSx1QkFBdUI7SUFRaEMsWUFBb0IsTUFBYyxFQUFVLEtBQXFCLEVBQVUsY0FBOEIsRUFDckYsR0FBNkIsRUFBVSxjQUErQixFQUN0RSxtQkFBd0MsRUFBVSxpQkFBbUMsRUFDckYsU0FBb0I7UUFIcEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQ3JGLFFBQUcsR0FBSCxHQUFHLENBQTBCO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWlCO1FBQ3RFLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFBVSxzQkFBaUIsR0FBakIsaUJBQWlC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QUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsVUFBVSxDQUFDO0lBQ3BELENBQUM7Q0FDSixDQUFBOztZQXBIK0IsTUFBTTtZQUFpQixjQUFjO1lBQTBCLGNBQWM7WUFDaEYsd0JBQXdCO1lBQTBCLGVBQWU7WUFDakQsbUJBQW1CO1lBQTZCLGdCQUFnQjtZQUMxRSxTQUFTOztBQVB3QjtJQUEvRCxTQUFTLENBQUMsV0FBVyxFQUFFLEVBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQztzQ0FBWSxnQkFBZ0I7MERBQUM7QUFKbkYsdUJBQXVCO0lBTG5DLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxlQUFlO1FBQ3pCLDRzS0FBK0M7O0tBRWxELENBQUM7NkNBUzhCLE1BQU0sRUFBaUIsY0FBYyxFQUEwQixjQUFjO1FBQ2hGLHdCQUF3QixFQUEwQixlQUFlO1FBQ2pELG1CQUFtQixFQUE2QixnQkFBZ0I7UUFDMUUsU0FBUztHQVgvQix1QkFBdUIsQ0E0SG5DO1NBNUhZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBDb21wb25lbnQsXHJcbiAgICBDb21wb25lbnRGYWN0b3J5LFxyXG4gICAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gICAgT25EZXN0cm95LFxyXG4gICAgT25Jbml0LFxyXG4gICAgUmVuZGVyZXIyLFxyXG4gICAgVmlld0NoaWxkLFxyXG4gICAgVmlld0NvbnRhaW5lclJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBQYXRpZW50IH0gZnJvbSAnLi4vbW9kZWwvcGF0aWVudC5tb2RlbCc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBQYXRpZW50T2JzZXJ2YXRpb24sIFBhdGllbnRTZXJ2aWNlLCBQYXRpZW50V2lkZ2V0IH0gZnJvbSAnLi4vc2VydmljZXMvcGF0aWVudC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVGREaWFsb2dTZXJ2aWNlIH0gZnJvbSAnQGNvdmFsZW50L2NvcmUnO1xyXG5pbXBvcnQgeyBDYXJkVmlld0l0ZW0sIE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICdAYWxmcmVzY28vYWRmLWNvcmUnO1xyXG5pbXBvcnQgeyBNb21lbnQgfSBmcm9tICdtb21lbnQnO1xyXG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XHJcblxyXG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2xhbWlzLXBhdGllbnQnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL3BhdGllbnQtZGV0YWlscy5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9wYXRpZW50LWRldGFpbHMuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUGF0aWVudERldGFpbHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgICB0ZW1wbGF0ZSA9ICdwYXRpZW50LWRldGFpbHMnO1xyXG4gICAgZW50aXR5OiBQYXRpZW50O1xyXG4gICAgb2JzZXJ2YXRpb25zOiBQYXRpZW50T2JzZXJ2YXRpb25bXTtcclxuICAgIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicsIHtyZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IHRydWV9KSBjb250YWluZXI6IFZpZXdDb250YWluZXJSZWY7XHJcbiAgICBwcm9wZXJ0aWVzOiBDYXJkVmlld0l0ZW1bXSA9IFtdO1xyXG4gICAgc3RhdHVzOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsIHByaXZhdGUgcGF0aWVudFNlcnZpY2U6IFBhdGllbnRTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBjZnI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgcHJpdmF0ZSBfZGlhbG9nU2VydmljZTogVGREaWFsb2dTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBub3RpZmljYXRpb25TZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlLCBwcml2YXRlIF92aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjI6IFJlbmRlcmVyMikge1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMucm91dGUuZGF0YS5zdWJzY3JpYmUoKHtlbnRpdHl9KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZW50aXR5ID0gISFlbnRpdHkgJiYgZW50aXR5LmJvZHkgPyBlbnRpdHkuYm9keSA6IGVudGl0eTtcclxuICAgICAgICAgICAgdGhpcy5wYXRpZW50U2VydmljZS5jdXJyZW50Q2xpZW50U3RhdHVzKGVudGl0eS51dWlkKS5zdWJzY3JpYmUocmVzID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gcmVzO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5hdHRhY2hlV2lkZ2V0cygpO1xyXG4gICAgICAgICAgICB0aGlzLmdldE9ic2VydmF0aW9ucygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGVkaXQoKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycuLicsICdlZGl0J10sIHtyZWxhdGl2ZVRvOiB0aGlzLnJvdXRlfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlU3RhdHVzKCkge1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLycsICdjbGllbnQtc3RhdHVzZXMnLCAncGF0aWVudCcsIHRoaXMuZW50aXR5LnV1aWQsICduZXcnXSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlKCkge1xyXG4gICAgICAgIHRoaXMuX2RpYWxvZ1NlcnZpY2Uub3BlbkNvbmZpcm0oe1xyXG4gICAgICAgICAgICB0aXRsZTogJ0NvbmZpcm0nLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiAnRG8geW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgcGF0aWVudCwgYWN0aW9uIGNhbm5vdCBiZSByZXZlcnNlZD8nLFxyXG4gICAgICAgICAgICBjYW5jZWxCdXR0b246ICdObycsXHJcbiAgICAgICAgICAgIGFjY2VwdEJ1dHRvbjogJ1llcycsXHJcbiAgICAgICAgICAgIHdpZHRoOiAnNTAwcHgnLFxyXG4gICAgICAgIH0pLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKChhY2NlcHQ6IGJvb2xlYW4pID0+IHtcclxuICAgICAgICAgICAgaWYgKGFjY2VwdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXRpZW50U2VydmljZS5kZWxldGUodGhpcy5lbnRpdHkuaWQpLnN1YnNjcmliZSgocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5vaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJ3BhdGllbnRzJ10pXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnNob3dFcnJvcignRXJyb3IgZGVsZXRpbmcgcGF0aWVudCwgcGxlYXNlIHRyeSBhZ2FpbicpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIERPIFNPTUVUSElORyBFTFNFXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcmV2aW91c1N0YXRlKCkge1xyXG4gICAgICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldENvbXBvbmVudEZhY3RvcnkobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3QgZmFjdG9yaWVzID0gQXJyYXkuZnJvbSh0aGlzLmNmclsnX2ZhY3RvcmllcyddLnZhbHVlcygpKTtcclxuICAgICAgICByZXR1cm4gPENvbXBvbmVudEZhY3Rvcnk8YW55Pj5mYWN0b3JpZXMuZmluZCgoeDogYW55KSA9PiB4LmNvbXBvbmVudFR5cGUubmFtZSA9PT0gbmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0T2JzZXJ2YXRpb25zKCkge1xyXG4gICAgICAgIHRoaXMucGF0aWVudFNlcnZpY2Uub2JzZXJ2YXRpb25zKHRoaXMuZW50aXR5LmlkKS5zdWJzY3JpYmUoKHJlczogUGF0aWVudE9ic2VydmF0aW9uW10pID0+IHRoaXMub2JzZXJ2YXRpb25zID0gcmVzKVxyXG4gICAgfVxyXG5cclxuICAgIGFkZE9ic2VydmF0aW9uKGFjdGlvbjogUGF0aWVudE9ic2VydmF0aW9uKSB7XHJcbiAgICAgICAgY29uc3QgcGF0aCA9IGFjdGlvbi5wYXRoLnNwbGl0KCcvJyk7XHJcbiAgICAgICAgY29uc3QgcGFydHMgPSBbJy8nXTtcclxuICAgICAgICBwYXJ0cy5wdXNoKC4uLnBhdGgpO1xyXG4gICAgICAgIHBhcnRzLnB1c2goJ3BhdGllbnQnLCB0aGlzLmVudGl0eS51dWlkLCAnbmV3Jyk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWy4uLnBhcnRzXSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhdHRhY2hlV2lkZ2V0cygpIHtcclxuICAgICAgICB0aGlzLmJ1aWxkV2lkZ2V0KCdUaW1lbGluZUNvbXBvbmVudCcsICdSZWNlbnQgQWN0aXZpdGllcycsICd0aW1lbGluZScpO1xyXG4gICAgICAgIHRoaXMuYnVpbGRXaWRnZXQoJ1N1bW1hcnlXaWRnZXRDb21wb25lbnQnLCAnUGF0aWVudCBTdW1tYXJ5JywgJ2FjY291bnRfYmFsYW5jZV93YWxsZXQnKTtcclxuICAgICAgICAvKnRoaXMucGF0aWVudFNlcnZpY2Uud2lkZ2V0cyh0aGlzLmVudGl0eS5pZCkuc3Vic2NyaWJlKChyZXM6IFBhdGllbnRXaWRnZXRbXSkgPT4ge1xyXG4gICAgICAgICAgICByZXMuZm9yRWFjaCgod2lkZ2V0OiBQYXRpZW50V2lkZ2V0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ1aWxkV2lkZ2V0KHdpZGdldC5jb21wb25lbnROYW1lLCB3aWRnZXQudGl0bGUsIHdpZGdldC5pY29uKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTsqL1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpIHtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGJ1aWxkV2lkZ2V0KGNvbXBvbmVudE5hbWU6IHN0cmluZywgdGl0bGU6IHN0cmluZywgaWNvbjogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3QgZmFjdG9yeSA9IHRoaXMuZ2V0Q29tcG9uZW50RmFjdG9yeShjb21wb25lbnROYW1lKTtcclxuICAgICAgICBpZiAoZmFjdG9yeSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhcmVudEZhY3RvcnkgPSB0aGlzLmdldENvbXBvbmVudEZhY3RvcnkoJ1dpZGdldENvbnRhaW5lckNvbXBvbmVudCcpO1xyXG4gICAgICAgICAgICBjb25zdCBjb21wb25lbnRSZWYgPSB0aGlzLmNvbnRhaW5lci5jcmVhdGVDb21wb25lbnQocGFyZW50RmFjdG9yeSk7XHJcbiAgICAgICAgICAgIGlmICghY29tcG9uZW50UmVmLmluc3RhbmNlLmVtYmVkZGVkQ29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjbXBOYW1lID0gY29tcG9uZW50UmVmLmluc3RhbmNlLmNvbnN0cnVjdG9yLm5hbWU7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBUcnlpbmcgdG8gcmVuZGVyIGVtYmVkZGVkIGNvbnRlbnQuICR7Y21wTmFtZX0gbXVzdCBoYXZlIEBWaWV3Q2hpbGQoKSBlbWJlZGRlZENvbnRhaW5lciBkZWZpbmVkYCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0NyZWF0ZWQgY29tcG9uZW50JywgY29tcG9uZW50UmVmKTtcclxuICAgICAgICAgICAgY29uc3QgaW5zdGFuY2VSZWYgPSBjb21wb25lbnRSZWYuaW5zdGFuY2UuZW1iZWRkZWRDb250YWluZXIuY3JlYXRlQ29tcG9uZW50KGZhY3RvcnkpO1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyMi5hZGRDbGFzcyhjb21wb25lbnRSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCwgJ2NvbC1tZC02Jyk7XHJcbiAgICAgICAgICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZS5pY29uID0gaWNvbjtcclxuICAgICAgICAgICAgY29tcG9uZW50UmVmLmluc3RhbmNlLnRpdGxlID0gdGl0bGU7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZVJlZi5pbnN0YW5jZS5wYXRpZW50SWQgPSB0aGlzLmVudGl0eS5pZDtcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlUmVmLmluc3RhbmNlLnBhdGllbnRVdWlkID0gdGhpcy5lbnRpdHkudXVpZDtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhZ2UoZG9iOiBNb21lbnQpIHtcclxuICAgICAgICBsZXQgYWdlID0gbW9tZW50KCkuZGlmZihkb2IsICd5ZWFycycpO1xyXG4gICAgICAgIGlmIChhZ2UgPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhZ2UgKyAnIHllYXIocyknXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhZ2UgPSBtb21lbnQoKS5kaWZmKGRvYiwgJ21vbnRocycpO1xyXG4gICAgICAgIGlmIChhZ2UgPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhZ2UgKyAnIG1vbnRoKHMpJztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1vbWVudCgpLmRpZmYoZG9iLCAnd2Vla3MnKSArICcgd2VlayhzKSc7XHJcbiAgICB9XHJcbn1cclxuIl19
