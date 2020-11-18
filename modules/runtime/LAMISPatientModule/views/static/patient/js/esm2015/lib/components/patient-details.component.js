import * as tslib_1 from "tslib";
import { Component, ComponentFactory, ComponentFactoryResolver, OnDestroy, OnInit, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientObservation, PatientService, PatientWidget } from '../services/patient.service';
import { TdDialogService } from '@covalent/core';
import { CardViewItem, NotificationService } from '@alfresco/adf-core';
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
        this.route.data.subscribe(({ entity }) => {
            this.entity = !!entity && entity.body ? entity.body : entity;
            this.patientService.currentClientStatus(entity.uuid).subscribe(res => {
                this.status = res;
            });
            this.attacheWidgets();
            this.getObservations();
        });
    }
    edit() {
        this.router.navigate(['..', 'edit'], { relativeTo: this.route });
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
                    }
                    else {
                        this.notificationService.showError('Error deleting patient, please try again');
                    }
                });
            }
            else {
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
            }
            catch (e) {
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
    { type: Router },
    { type: ActivatedRoute },
    { type: PatientService },
    { type: ComponentFactoryResolver },
    { type: TdDialogService },
    { type: NotificationService },
    { type: ViewContainerRef },
    { type: Renderer2 }
];
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
export { PatientDetailsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aWVudC1kZXRhaWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xhbWlzLXBhdGllbnQtMS40LjEvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9wYXRpZW50LWRldGFpbHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULGdCQUFnQixFQUNoQix3QkFBd0IsRUFDeEIsU0FBUyxFQUNULE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNULGdCQUFnQixFQUNuQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsY0FBYyxFQUFFLE1BQU0sRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxrQkFBa0IsRUFBRSxjQUFjLEVBQUUsYUFBYSxFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDOUYsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxZQUFZLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUVyRSxPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQztBQUVsQyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUM7QUFPdkIsSUFBYSx1QkFBdUIsR0FBcEMsTUFBYSx1QkFBdUI7SUFRaEMsWUFBb0IsTUFBYyxFQUFVLEtBQXFCLEVBQVUsY0FBOEIsRUFDckYsR0FBNkIsRUFBVSxjQUErQixFQUN0RSxtQkFBd0MsRUFBVSxpQkFBbUMsRUFDckYsU0FBb0I7UUFIcEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQ3JGLFFBQUcsR0FBSCxHQUFHLENBQTBCO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWlCO1FBQ3RFLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFBVSxzQkFBaUIsR0FBakIsaUJBQWlC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QUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsVUFBVSxDQUFDO0lBQ3BELENBQUM7Q0FDSixDQUFBOztZQXBIK0IsTUFBTTtZQUFpQixjQUFjO1lBQTBCLGNBQWM7WUFDaEYsd0JBQXdCO1lBQTBCLGVBQWU7WUFDakQsbUJBQW1CO1lBQTZCLGdCQUFnQjtZQUMxRSxTQUFTOztBQVB3QjtJQUEvRCxTQUFTLENBQUMsV0FBVyxFQUFFLEVBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQztzQ0FBWSxnQkFBZ0I7MERBQUM7QUFKbkYsdUJBQXVCO0lBTG5DLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxlQUFlO1FBQ3pCLHNoS0FBK0M7O0tBRWxELENBQUM7NkNBUzhCLE1BQU0sRUFBaUIsY0FBYyxFQUEwQixjQUFjO1FBQ2hGLHdCQUF3QixFQUEwQixlQUFlO1FBQ2pELG1CQUFtQixFQUE2QixnQkFBZ0I7UUFDMUUsU0FBUztHQVgvQix1QkFBdUIsQ0E0SG5DO1NBNUhZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIENvbXBvbmVudEZhY3RvcnksXG4gICAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgUmVuZGVyZXIyLFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3Q29udGFpbmVyUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtQYXRpZW50fSBmcm9tICcuLi9tb2RlbC9wYXRpZW50Lm1vZGVsJztcbmltcG9ydCB7QWN0aXZhdGVkUm91dGUsIFJvdXRlcn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7UGF0aWVudE9ic2VydmF0aW9uLCBQYXRpZW50U2VydmljZSwgUGF0aWVudFdpZGdldH0gZnJvbSAnLi4vc2VydmljZXMvcGF0aWVudC5zZXJ2aWNlJztcbmltcG9ydCB7VGREaWFsb2dTZXJ2aWNlfSBmcm9tICdAY292YWxlbnQvY29yZSc7XG5pbXBvcnQge0NhcmRWaWV3SXRlbSwgTm90aWZpY2F0aW9uU2VydmljZX0gZnJvbSAnQGFsZnJlc2NvL2FkZi1jb3JlJztcbmltcG9ydCB7TW9tZW50fSBmcm9tICdtb21lbnQnO1xuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xuXG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2xhbWlzLXBhdGllbnQnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9wYXRpZW50LWRldGFpbHMuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3BhdGllbnQtZGV0YWlscy5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFBhdGllbnREZXRhaWxzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIHRlbXBsYXRlID0gJ3BhdGllbnQtZGV0YWlscyc7XG4gICAgZW50aXR5OiBQYXRpZW50O1xuICAgIG9ic2VydmF0aW9uczogUGF0aWVudE9ic2VydmF0aW9uW107XG4gICAgQFZpZXdDaGlsZCgnY29udGFpbmVyJywge3JlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZX0pIGNvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZjtcbiAgICBwcm9wZXJ0aWVzOiBDYXJkVmlld0l0ZW1bXSA9IFtdO1xuICAgIHN0YXR1czogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsIHByaXZhdGUgcGF0aWVudFNlcnZpY2U6IFBhdGllbnRTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgY2ZyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIHByaXZhdGUgX2RpYWxvZ1NlcnZpY2U6IFRkRGlhbG9nU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIG5vdGlmaWNhdGlvblNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UsIHByaXZhdGUgX3ZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjI6IFJlbmRlcmVyMikge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnJvdXRlLmRhdGEuc3Vic2NyaWJlKCh7ZW50aXR5fSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5lbnRpdHkgPSAhIWVudGl0eSAmJiBlbnRpdHkuYm9keSA/IGVudGl0eS5ib2R5IDogZW50aXR5O1xuICAgICAgICAgICAgdGhpcy5wYXRpZW50U2VydmljZS5jdXJyZW50Q2xpZW50U3RhdHVzKGVudGl0eS51dWlkKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXR1cyA9IHJlcztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5hdHRhY2hlV2lkZ2V0cygpO1xuICAgICAgICAgICAgdGhpcy5nZXRPYnNlcnZhdGlvbnMoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZWRpdCgpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycuLicsICdlZGl0J10sIHtyZWxhdGl2ZVRvOiB0aGlzLnJvdXRlfSk7XG4gICAgfVxuXG4gICAgdXBkYXRlU3RhdHVzKCkge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy8nLCAnY2xpZW50LXN0YXR1c2VzJywgJ3BhdGllbnQnLCB0aGlzLmVudGl0eS51dWlkLCAnbmV3J10pO1xuICAgIH1cblxuICAgIGRlbGV0ZSgpIHtcbiAgICAgICAgdGhpcy5fZGlhbG9nU2VydmljZS5vcGVuQ29uZmlybSh7XG4gICAgICAgICAgICB0aXRsZTogJ0NvbmZpcm0nLFxuICAgICAgICAgICAgbWVzc2FnZTogJ0RvIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIHBhdGllbnQsIGFjdGlvbiBjYW5ub3QgYmUgcmV2ZXJzZWQ/JyxcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvbjogJ05vJyxcbiAgICAgICAgICAgIGFjY2VwdEJ1dHRvbjogJ1llcycsXG4gICAgICAgICAgICB3aWR0aDogJzUwMHB4JyxcbiAgICAgICAgfSkuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUoKGFjY2VwdDogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgaWYgKGFjY2VwdCkge1xuICAgICAgICAgICAgICAgIHRoaXMucGF0aWVudFNlcnZpY2UuZGVsZXRlKHRoaXMuZW50aXR5LmlkKS5zdWJzY3JpYmUoKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJ3BhdGllbnRzJ10pXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc2hvd0Vycm9yKCdFcnJvciBkZWxldGluZyBwYXRpZW50LCBwbGVhc2UgdHJ5IGFnYWluJylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIERPIFNPTUVUSElORyBFTFNFXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByZXZpb3VzU3RhdGUoKSB7XG4gICAgICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldENvbXBvbmVudEZhY3RvcnkobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGZhY3RvcmllcyA9IEFycmF5LmZyb20odGhpcy5jZnJbJ19mYWN0b3JpZXMnXS52YWx1ZXMoKSk7XG4gICAgICAgIHJldHVybiA8Q29tcG9uZW50RmFjdG9yeTxhbnk+PmZhY3Rvcmllcy5maW5kKCh4OiBhbnkpID0+IHguY29tcG9uZW50VHlwZS5uYW1lID09PSBuYW1lKTtcbiAgICB9XG5cbiAgICBnZXRPYnNlcnZhdGlvbnMoKSB7XG4gICAgICAgIHRoaXMucGF0aWVudFNlcnZpY2Uub2JzZXJ2YXRpb25zKHRoaXMuZW50aXR5LmlkKS5zdWJzY3JpYmUoKHJlczogUGF0aWVudE9ic2VydmF0aW9uW10pID0+IHRoaXMub2JzZXJ2YXRpb25zID0gcmVzKVxuICAgIH1cblxuICAgIGFkZE9ic2VydmF0aW9uKGFjdGlvbjogUGF0aWVudE9ic2VydmF0aW9uKSB7XG4gICAgICAgIGNvbnN0IHBhdGggPSBhY3Rpb24ucGF0aC5zcGxpdCgnLycpO1xuICAgICAgICBjb25zdCBwYXJ0cyA9IFsnLyddO1xuICAgICAgICBwYXJ0cy5wdXNoKC4uLnBhdGgpO1xuICAgICAgICBwYXJ0cy5wdXNoKCdwYXRpZW50JywgdGhpcy5lbnRpdHkudXVpZCwgJ25ldycpO1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbLi4ucGFydHNdKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGF0dGFjaGVXaWRnZXRzKCkge1xuICAgICAgICB0aGlzLmJ1aWxkV2lkZ2V0KCdUaW1lbGluZUNvbXBvbmVudCcsICdSZWNlbnQgQWN0aXZpdGllcycsICd0aW1lbGluZScpO1xuICAgICAgICB0aGlzLmJ1aWxkV2lkZ2V0KCdTdW1tYXJ5V2lkZ2V0Q29tcG9uZW50JywgJ1BhdGllbnQgU3VtbWFyeScsICdhY2NvdW50X2JhbGFuY2Vfd2FsbGV0Jyk7XG4gICAgICAgIC8qdGhpcy5wYXRpZW50U2VydmljZS53aWRnZXRzKHRoaXMuZW50aXR5LmlkKS5zdWJzY3JpYmUoKHJlczogUGF0aWVudFdpZGdldFtdKSA9PiB7XG4gICAgICAgICAgICByZXMuZm9yRWFjaCgod2lkZ2V0OiBQYXRpZW50V2lkZ2V0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5idWlsZFdpZGdldCh3aWRnZXQuY29tcG9uZW50TmFtZSwgd2lkZ2V0LnRpdGxlLCB3aWRnZXQuaWNvbik7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTsqL1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpIHtcbiAgICB9XG5cbiAgICBwcml2YXRlIGJ1aWxkV2lkZ2V0KGNvbXBvbmVudE5hbWU6IHN0cmluZywgdGl0bGU6IHN0cmluZywgaWNvbjogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGZhY3RvcnkgPSB0aGlzLmdldENvbXBvbmVudEZhY3RvcnkoY29tcG9uZW50TmFtZSk7XG4gICAgICAgIGlmIChmYWN0b3J5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhcmVudEZhY3RvcnkgPSB0aGlzLmdldENvbXBvbmVudEZhY3RvcnkoJ1dpZGdldENvbnRhaW5lckNvbXBvbmVudCcpO1xuICAgICAgICAgICAgY29uc3QgY29tcG9uZW50UmVmID0gdGhpcy5jb250YWluZXIuY3JlYXRlQ29tcG9uZW50KHBhcmVudEZhY3RvcnkpO1xuICAgICAgICAgICAgaWYgKCFjb21wb25lbnRSZWYuaW5zdGFuY2UuZW1iZWRkZWRDb250YWluZXIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjbXBOYW1lID0gY29tcG9uZW50UmVmLmluc3RhbmNlLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgVHJ5aW5nIHRvIHJlbmRlciBlbWJlZGRlZCBjb250ZW50LiAke2NtcE5hbWV9IG11c3QgaGF2ZSBAVmlld0NoaWxkKCkgZW1iZWRkZWRDb250YWluZXIgZGVmaW5lZGApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0NyZWF0ZWQgY29tcG9uZW50JywgY29tcG9uZW50UmVmKTtcbiAgICAgICAgICAgIGNvbnN0IGluc3RhbmNlUmVmID0gY29tcG9uZW50UmVmLmluc3RhbmNlLmVtYmVkZGVkQ29udGFpbmVyLmNyZWF0ZUNvbXBvbmVudChmYWN0b3J5KTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIyLmFkZENsYXNzKGNvbXBvbmVudFJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50LCAnY29sLW1kLTYnKTtcbiAgICAgICAgICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZS5pY29uID0gaWNvbjtcbiAgICAgICAgICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZS50aXRsZSA9IHRpdGxlO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZVJlZi5pbnN0YW5jZS5wYXRpZW50SWQgPSB0aGlzLmVudGl0eS5pZDtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZVJlZi5pbnN0YW5jZS5wYXRpZW50VXVpZCA9IHRoaXMuZW50aXR5LnV1aWQ7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFnZShkb2I6IE1vbWVudCkge1xuICAgICAgICBsZXQgYWdlID0gbW9tZW50KCkuZGlmZihkb2IsICd5ZWFycycpO1xuICAgICAgICBpZiAoYWdlID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGFnZSArICcgeWVhcihzKSdcbiAgICAgICAgfVxuXG4gICAgICAgIGFnZSA9IG1vbWVudCgpLmRpZmYoZG9iLCAnbW9udGhzJyk7XG4gICAgICAgIGlmIChhZ2UgPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYWdlICsgJyBtb250aChzKSc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1vbWVudCgpLmRpZmYoZG9iLCAnd2Vla3MnKSArICcgd2VlayhzKSc7XG4gICAgfVxufVxuIl19