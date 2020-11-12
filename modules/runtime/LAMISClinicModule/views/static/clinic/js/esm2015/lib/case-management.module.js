import * as tslib_1 from "tslib";
import {NgModule} from '@angular/core';
import {PatientListComponent} from './components/case-management/patient.list.component';
import {MaterialModule} from './material.module';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {CoreModule} from '@alfresco/adf-core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CovalentDialogsModule, CovalentSearchModule} from '@covalent/core';
import {ROUTES} from './services/case-management.route';
import {RouterModule} from '@angular/router';
import {LamisSharedModule} from '@lamis/web-core';

let CaseManagementModule = class CaseManagementModule {
};
CaseManagementModule = tslib_1.__decorate([
    NgModule({
        imports: [
            MaterialModule,
            FormsModule,
            CommonModule,
            RouterModule.forChild(ROUTES),
            CoreModule,
            NgbModule,
            CovalentSearchModule,
            CovalentDialogsModule,
            LamisSharedModule,
        ],
        declarations: [
            PatientListComponent
        ],
        providers: []
    })
], CaseManagementModule);
export {CaseManagementModule};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1tYW5hZ2VtZW50Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xhbWlzLWNsaW5pYy0xLjEuMy8iLCJzb3VyY2VzIjpbImxpYi9jYXNlLW1hbmFnZW1lbnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFEQUFxRCxDQUFDO0FBQzNGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDdkQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0UsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQzFELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQXFCcEQsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBb0I7Q0FFaEMsQ0FBQTtBQUZZLG9CQUFvQjtJQW5CaEMsUUFBUSxDQUFDO1FBQ04sT0FBTyxFQUFFO1lBQ0wsY0FBYztZQUNkLFdBQVc7WUFDWCxZQUFZO1lBQ1osWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7WUFDN0IsVUFBVTtZQUNWLFNBQVM7WUFDVCxvQkFBb0I7WUFDcEIscUJBQXFCO1lBQ3JCLGlCQUFpQjtTQUNwQjtRQUNELFlBQVksRUFBRTtZQUNWLG9CQUFvQjtTQUN2QjtRQUNELFNBQVMsRUFBRSxFQUVWO0tBQ0osQ0FBQztHQUNXLG9CQUFvQixDQUVoQztTQUZZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYXRpZW50TGlzdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jYXNlLW1hbmFnZW1lbnQvcGF0aWVudC5saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbE1vZHVsZSB9IGZyb20gJy4vbWF0ZXJpYWwubW9kdWxlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENvcmVNb2R1bGUgfSBmcm9tICdAYWxmcmVzY28vYWRmLWNvcmUnO1xuaW1wb3J0IHsgTmdiTW9kdWxlIH0gZnJvbSAnQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAnO1xuaW1wb3J0IHsgQ292YWxlbnREaWFsb2dzTW9kdWxlLCBDb3ZhbGVudFNlYXJjaE1vZHVsZSB9IGZyb20gJ0Bjb3ZhbGVudC9jb3JlJztcbmltcG9ydCB7IFJPVVRFUyB9IGZyb20gJy4vc2VydmljZXMvY2FzZS1tYW5hZ2VtZW50LnJvdXRlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBMYW1pc1NoYXJlZE1vZHVsZSB9IGZyb20gJ0BsYW1pcy93ZWItY29yZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBNYXRlcmlhbE1vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgUm91dGVyTW9kdWxlLmZvckNoaWxkKFJPVVRFUyksXG4gICAgICAgIENvcmVNb2R1bGUsXG4gICAgICAgIE5nYk1vZHVsZSxcbiAgICAgICAgQ292YWxlbnRTZWFyY2hNb2R1bGUsXG4gICAgICAgIENvdmFsZW50RGlhbG9nc01vZHVsZSxcbiAgICAgICAgTGFtaXNTaGFyZWRNb2R1bGUsXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgUGF0aWVudExpc3RDb21wb25lbnRcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBDYXNlTWFuYWdlbWVudE1vZHVsZSB7XG5cbn1cbiJdfQ==
