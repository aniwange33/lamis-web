import * as tslib_1 from "tslib";
import {NgModule} from '@angular/core';
import {CaseManagerDetailsComponent} from './components/case-management/case-manager.details.component';
import {CaseManagerEditComponent} from './components/case-management/case-manager.edit.component';
import {CaseManagerListComponent} from './components/case-management/case-manager.list.component';
import {MaterialModule} from './material.module';
import {CoreModule} from '@alfresco/adf-core';
import {CaseManagerResolve, ROUTES} from './services/case-manager.route';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CovalentDialogsModule, CovalentSearchModule} from '@covalent/core';
import {LamisSharedModule} from '@lamis/web-core';

let CaseManagerModule = class CaseManagerModule {
};
CaseManagerModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            MaterialModule,
            CoreModule,
            FormsModule,
            RouterModule.forChild(ROUTES),
            CoreModule,
            NgbModule,
            CovalentSearchModule,
            CovalentDialogsModule,
            LamisSharedModule,
        ],
        declarations: [
            CaseManagerDetailsComponent,
            CaseManagerEditComponent,
            CaseManagerListComponent
        ],
        providers: [
            CaseManagerResolve
        ]
    })
], CaseManagerModule);
export {CaseManagerModule};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1tYW5hZ2VyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xhbWlzLWNsaW5pYy0xLjEuMy8iLCJzb3VyY2VzIjpbImxpYi9jYXNlLW1hbmFnZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDZEQUE2RCxDQUFDO0FBQzFHLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDBEQUEwRCxDQUFDO0FBQ3BHLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDBEQUEwRCxDQUFDO0FBQ3BHLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDaEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzNFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQXdCcEQsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBaUI7Q0FDN0IsQ0FBQTtBQURZLGlCQUFpQjtJQXRCN0IsUUFBUSxDQUFDO1FBQ04sT0FBTyxFQUFFO1lBQ0wsWUFBWTtZQUNaLGNBQWM7WUFDZCxVQUFVO1lBQ1YsV0FBVztZQUNYLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1lBQzdCLFVBQVU7WUFDVixTQUFTO1lBQ1Qsb0JBQW9CO1lBQ3BCLHFCQUFxQjtZQUNyQixpQkFBaUI7U0FDcEI7UUFDRCxZQUFZLEVBQUU7WUFDViwyQkFBMkI7WUFDM0Isd0JBQXdCO1lBQ3hCLHdCQUF3QjtTQUMzQjtRQUNELFNBQVMsRUFBRTtZQUNQLGtCQUFrQjtTQUNyQjtLQUNKLENBQUM7R0FDVyxpQkFBaUIsQ0FDN0I7U0FEWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FzZU1hbmFnZXJEZXRhaWxzQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2Nhc2UtbWFuYWdlbWVudC9jYXNlLW1hbmFnZXIuZGV0YWlscy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2FzZU1hbmFnZXJFZGl0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2Nhc2UtbWFuYWdlbWVudC9jYXNlLW1hbmFnZXIuZWRpdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2FzZU1hbmFnZXJMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2Nhc2UtbWFuYWdlbWVudC9jYXNlLW1hbmFnZXIubGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxNb2R1bGUgfSBmcm9tICcuL21hdGVyaWFsLm1vZHVsZSc7XG5pbXBvcnQgeyBDb3JlTW9kdWxlIH0gZnJvbSAnQGFsZnJlc2NvL2FkZi1jb3JlJztcbmltcG9ydCB7IENhc2VNYW5hZ2VyUmVzb2x2ZSwgUk9VVEVTIH0gZnJvbSAnLi9zZXJ2aWNlcy9jYXNlLW1hbmFnZXIucm91dGUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE5nYk1vZHVsZSB9IGZyb20gJ0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwJztcbmltcG9ydCB7IENvdmFsZW50RGlhbG9nc01vZHVsZSwgQ292YWxlbnRTZWFyY2hNb2R1bGUgfSBmcm9tICdAY292YWxlbnQvY29yZSc7XG5pbXBvcnQgeyBMYW1pc1NoYXJlZE1vZHVsZSB9IGZyb20gJ0BsYW1pcy93ZWItY29yZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIE1hdGVyaWFsTW9kdWxlLFxuICAgICAgICBDb3JlTW9kdWxlLFxuICAgICAgICBGb3Jtc01vZHVsZSxcbiAgICAgICAgUm91dGVyTW9kdWxlLmZvckNoaWxkKFJPVVRFUyksXG4gICAgICAgIENvcmVNb2R1bGUsXG4gICAgICAgIE5nYk1vZHVsZSxcbiAgICAgICAgQ292YWxlbnRTZWFyY2hNb2R1bGUsXG4gICAgICAgIENvdmFsZW50RGlhbG9nc01vZHVsZSxcbiAgICAgICAgTGFtaXNTaGFyZWRNb2R1bGUsXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgQ2FzZU1hbmFnZXJEZXRhaWxzQ29tcG9uZW50LFxuICAgICAgICBDYXNlTWFuYWdlckVkaXRDb21wb25lbnQsXG4gICAgICAgIENhc2VNYW5hZ2VyTGlzdENvbXBvbmVudFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIENhc2VNYW5hZ2VyUmVzb2x2ZVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgQ2FzZU1hbmFnZXJNb2R1bGUge1xufVxuIl19
