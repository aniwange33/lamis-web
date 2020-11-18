import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { PatientListComponent } from './components/case-management/patient.list.component';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@alfresco/adf-core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CovalentDialogsModule, CovalentSearchModule } from '@covalent/core';
import { ROUTES } from './services/case-management.route';
import { RouterModule } from '@angular/router';
import { LamisSharedModule } from '@lamis/web-core';
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
export { CaseManagementModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1tYW5hZ2VtZW50Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xhbWlzLWNsaW5pYy0xLjQuMC8iLCJzb3VyY2VzIjpbImxpYi9jYXNlLW1hbmFnZW1lbnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHFEQUFxRCxDQUFDO0FBQ3pGLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUM5QyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDckQsT0FBTyxFQUFDLHFCQUFxQixFQUFFLG9CQUFvQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0UsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBQ3hELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQW1CbEQsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBb0I7Q0FFaEMsQ0FBQTtBQUZZLG9CQUFvQjtJQWpCaEMsUUFBUSxDQUFDO1FBQ04sT0FBTyxFQUFFO1lBQ0wsY0FBYztZQUNkLFdBQVc7WUFDWCxZQUFZO1lBQ1osWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7WUFDN0IsVUFBVTtZQUNWLFNBQVM7WUFDVCxvQkFBb0I7WUFDcEIscUJBQXFCO1lBQ3JCLGlCQUFpQjtTQUNwQjtRQUNELFlBQVksRUFBRTtZQUNWLG9CQUFvQjtTQUN2QjtRQUNELFNBQVMsRUFBRSxFQUFFO0tBQ2hCLENBQUM7R0FDVyxvQkFBb0IsQ0FFaEM7U0FGWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7UGF0aWVudExpc3RDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9jYXNlLW1hbmFnZW1lbnQvcGF0aWVudC5saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQge01hdGVyaWFsTW9kdWxlfSBmcm9tICcuL21hdGVyaWFsLm1vZHVsZSc7XG5pbXBvcnQge0Zvcm1zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7Q29yZU1vZHVsZX0gZnJvbSAnQGFsZnJlc2NvL2FkZi1jb3JlJztcbmltcG9ydCB7TmdiTW9kdWxlfSBmcm9tICdAbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcCc7XG5pbXBvcnQge0NvdmFsZW50RGlhbG9nc01vZHVsZSwgQ292YWxlbnRTZWFyY2hNb2R1bGV9IGZyb20gJ0Bjb3ZhbGVudC9jb3JlJztcbmltcG9ydCB7Uk9VVEVTfSBmcm9tICcuL3NlcnZpY2VzL2Nhc2UtbWFuYWdlbWVudC5yb3V0ZSc7XG5pbXBvcnQge1JvdXRlck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7TGFtaXNTaGFyZWRNb2R1bGV9IGZyb20gJ0BsYW1pcy93ZWItY29yZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBNYXRlcmlhbE1vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgUm91dGVyTW9kdWxlLmZvckNoaWxkKFJPVVRFUyksXG4gICAgICAgIENvcmVNb2R1bGUsXG4gICAgICAgIE5nYk1vZHVsZSxcbiAgICAgICAgQ292YWxlbnRTZWFyY2hNb2R1bGUsXG4gICAgICAgIENvdmFsZW50RGlhbG9nc01vZHVsZSxcbiAgICAgICAgTGFtaXNTaGFyZWRNb2R1bGUsXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgUGF0aWVudExpc3RDb21wb25lbnRcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW11cbn0pXG5leHBvcnQgY2xhc3MgQ2FzZU1hbmFnZW1lbnRNb2R1bGUge1xuXG59XG4iXX0=