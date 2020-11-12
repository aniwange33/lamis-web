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

var CaseManagementModule = /** @class */ (function () {
    function CaseManagementModule() {
    }

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
    return CaseManagementModule;
}());
export {CaseManagementModule};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1tYW5hZ2VtZW50Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xhbWlzLWNsaW5pYy0xLjEuMy8iLCJzb3VyY2VzIjpbImxpYi9jYXNlLW1hbmFnZW1lbnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFEQUFxRCxDQUFDO0FBQzNGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDdkQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0UsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQzFELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQXFCcEQ7SUFBQTtJQUVBLENBQUM7SUFGWSxvQkFBb0I7UUFuQmhDLFFBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRTtnQkFDTCxjQUFjO2dCQUNkLFdBQVc7Z0JBQ1gsWUFBWTtnQkFDWixZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztnQkFDN0IsVUFBVTtnQkFDVixTQUFTO2dCQUNULG9CQUFvQjtnQkFDcEIscUJBQXFCO2dCQUNyQixpQkFBaUI7YUFDcEI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1Ysb0JBQW9CO2FBQ3ZCO1lBQ0QsU0FBUyxFQUFFLEVBRVY7U0FDSixDQUFDO09BQ1csb0JBQW9CLENBRWhDO0lBQUQsMkJBQUM7Q0FBQSxBQUZELElBRUM7U0FGWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGF0aWVudExpc3RDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY2FzZS1tYW5hZ2VtZW50L3BhdGllbnQubGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxNb2R1bGUgfSBmcm9tICcuL21hdGVyaWFsLm1vZHVsZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDb3JlTW9kdWxlIH0gZnJvbSAnQGFsZnJlc2NvL2FkZi1jb3JlJztcbmltcG9ydCB7IE5nYk1vZHVsZSB9IGZyb20gJ0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwJztcbmltcG9ydCB7IENvdmFsZW50RGlhbG9nc01vZHVsZSwgQ292YWxlbnRTZWFyY2hNb2R1bGUgfSBmcm9tICdAY292YWxlbnQvY29yZSc7XG5pbXBvcnQgeyBST1VURVMgfSBmcm9tICcuL3NlcnZpY2VzL2Nhc2UtbWFuYWdlbWVudC5yb3V0ZSc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgTGFtaXNTaGFyZWRNb2R1bGUgfSBmcm9tICdAbGFtaXMvd2ViLWNvcmUnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgTWF0ZXJpYWxNb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIFJvdXRlck1vZHVsZS5mb3JDaGlsZChST1VURVMpLFxuICAgICAgICBDb3JlTW9kdWxlLFxuICAgICAgICBOZ2JNb2R1bGUsXG4gICAgICAgIENvdmFsZW50U2VhcmNoTW9kdWxlLFxuICAgICAgICBDb3ZhbGVudERpYWxvZ3NNb2R1bGUsXG4gICAgICAgIExhbWlzU2hhcmVkTW9kdWxlLFxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIFBhdGllbnRMaXN0Q29tcG9uZW50XG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcblxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgQ2FzZU1hbmFnZW1lbnRNb2R1bGUge1xuXG59XG4iXX0=
