import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CaseManagerDetailsComponent } from './components/case-management/case-manager.details.component';
import { CaseManagerEditComponent } from './components/case-management/case-manager.edit.component';
import { CaseManagerListComponent } from './components/case-management/case-manager.list.component';
import { MaterialModule } from './material.module';
import { CoreModule } from '@alfresco/adf-core';
import { CaseManagerResolve, ROUTES } from './services/case-manager.route';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CovalentDialogsModule, CovalentSearchModule } from '@covalent/core';
import { LamisSharedModule } from '@lamis/web-core';
var CaseManagerModule = /** @class */ (function () {
    function CaseManagerModule() {
    }
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
    return CaseManagerModule;
}());
export { CaseManagerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1tYW5hZ2VyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xhbWlzLWNsaW5pYy0xLjQuMC8iLCJzb3VyY2VzIjpbImxpYi9jYXNlLW1hbmFnZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQywyQkFBMkIsRUFBQyxNQUFNLDZEQUE2RCxDQUFDO0FBQ3hHLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLDBEQUEwRCxDQUFDO0FBQ2xHLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLDBEQUEwRCxDQUFDO0FBQ2xHLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDOUMsT0FBTyxFQUFDLGtCQUFrQixFQUFFLE1BQU0sRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQ3pFLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUNyRCxPQUFPLEVBQUMscUJBQXFCLEVBQUUsb0JBQW9CLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzRSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQXdCbEQ7SUFBQTtJQUNBLENBQUM7SUFEWSxpQkFBaUI7UUF0QjdCLFFBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRTtnQkFDTCxZQUFZO2dCQUNaLGNBQWM7Z0JBQ2QsVUFBVTtnQkFDVixXQUFXO2dCQUNYLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO2dCQUM3QixVQUFVO2dCQUNWLFNBQVM7Z0JBQ1Qsb0JBQW9CO2dCQUNwQixxQkFBcUI7Z0JBQ3JCLGlCQUFpQjthQUNwQjtZQUNELFlBQVksRUFBRTtnQkFDViwyQkFBMkI7Z0JBQzNCLHdCQUF3QjtnQkFDeEIsd0JBQXdCO2FBQzNCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLGtCQUFrQjthQUNyQjtTQUNKLENBQUM7T0FDVyxpQkFBaUIsQ0FDN0I7SUFBRCx3QkFBQztDQUFBLEFBREQsSUFDQztTQURZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDYXNlTWFuYWdlckRldGFpbHNDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9jYXNlLW1hbmFnZW1lbnQvY2FzZS1tYW5hZ2VyLmRldGFpbHMuY29tcG9uZW50JztcbmltcG9ydCB7Q2FzZU1hbmFnZXJFZGl0Q29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvY2FzZS1tYW5hZ2VtZW50L2Nhc2UtbWFuYWdlci5lZGl0LmNvbXBvbmVudCc7XG5pbXBvcnQge0Nhc2VNYW5hZ2VyTGlzdENvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL2Nhc2UtbWFuYWdlbWVudC9jYXNlLW1hbmFnZXIubGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHtNYXRlcmlhbE1vZHVsZX0gZnJvbSAnLi9tYXRlcmlhbC5tb2R1bGUnO1xuaW1wb3J0IHtDb3JlTW9kdWxlfSBmcm9tICdAYWxmcmVzY28vYWRmLWNvcmUnO1xuaW1wb3J0IHtDYXNlTWFuYWdlclJlc29sdmUsIFJPVVRFU30gZnJvbSAnLi9zZXJ2aWNlcy9jYXNlLW1hbmFnZXIucm91dGUnO1xuaW1wb3J0IHtGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1JvdXRlck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7TmdiTW9kdWxlfSBmcm9tICdAbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcCc7XG5pbXBvcnQge0NvdmFsZW50RGlhbG9nc01vZHVsZSwgQ292YWxlbnRTZWFyY2hNb2R1bGV9IGZyb20gJ0Bjb3ZhbGVudC9jb3JlJztcbmltcG9ydCB7TGFtaXNTaGFyZWRNb2R1bGV9IGZyb20gJ0BsYW1pcy93ZWItY29yZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIE1hdGVyaWFsTW9kdWxlLFxuICAgICAgICBDb3JlTW9kdWxlLFxuICAgICAgICBGb3Jtc01vZHVsZSxcbiAgICAgICAgUm91dGVyTW9kdWxlLmZvckNoaWxkKFJPVVRFUyksXG4gICAgICAgIENvcmVNb2R1bGUsXG4gICAgICAgIE5nYk1vZHVsZSxcbiAgICAgICAgQ292YWxlbnRTZWFyY2hNb2R1bGUsXG4gICAgICAgIENvdmFsZW50RGlhbG9nc01vZHVsZSxcbiAgICAgICAgTGFtaXNTaGFyZWRNb2R1bGUsXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgQ2FzZU1hbmFnZXJEZXRhaWxzQ29tcG9uZW50LFxuICAgICAgICBDYXNlTWFuYWdlckVkaXRDb21wb25lbnQsXG4gICAgICAgIENhc2VNYW5hZ2VyTGlzdENvbXBvbmVudFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIENhc2VNYW5hZ2VyUmVzb2x2ZVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgQ2FzZU1hbmFnZXJNb2R1bGUge1xufVxuIl19