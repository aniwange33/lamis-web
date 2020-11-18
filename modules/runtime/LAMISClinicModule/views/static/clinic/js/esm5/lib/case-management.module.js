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
export { CaseManagementModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1tYW5hZ2VtZW50Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xhbWlzLWNsaW5pYy0xLjQuMC8iLCJzb3VyY2VzIjpbImxpYi9jYXNlLW1hbmFnZW1lbnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHFEQUFxRCxDQUFDO0FBQ3pGLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUM5QyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDckQsT0FBTyxFQUFDLHFCQUFxQixFQUFFLG9CQUFvQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0UsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBQ3hELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQW1CbEQ7SUFBQTtJQUVBLENBQUM7SUFGWSxvQkFBb0I7UUFqQmhDLFFBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRTtnQkFDTCxjQUFjO2dCQUNkLFdBQVc7Z0JBQ1gsWUFBWTtnQkFDWixZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztnQkFDN0IsVUFBVTtnQkFDVixTQUFTO2dCQUNULG9CQUFvQjtnQkFDcEIscUJBQXFCO2dCQUNyQixpQkFBaUI7YUFDcEI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1Ysb0JBQW9CO2FBQ3ZCO1lBQ0QsU0FBUyxFQUFFLEVBQUU7U0FDaEIsQ0FBQztPQUNXLG9CQUFvQixDQUVoQztJQUFELDJCQUFDO0NBQUEsQUFGRCxJQUVDO1NBRlksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1BhdGllbnRMaXN0Q29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvY2FzZS1tYW5hZ2VtZW50L3BhdGllbnQubGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHtNYXRlcmlhbE1vZHVsZX0gZnJvbSAnLi9tYXRlcmlhbC5tb2R1bGUnO1xuaW1wb3J0IHtGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0NvcmVNb2R1bGV9IGZyb20gJ0BhbGZyZXNjby9hZGYtY29yZSc7XG5pbXBvcnQge05nYk1vZHVsZX0gZnJvbSAnQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAnO1xuaW1wb3J0IHtDb3ZhbGVudERpYWxvZ3NNb2R1bGUsIENvdmFsZW50U2VhcmNoTW9kdWxlfSBmcm9tICdAY292YWxlbnQvY29yZSc7XG5pbXBvcnQge1JPVVRFU30gZnJvbSAnLi9zZXJ2aWNlcy9jYXNlLW1hbmFnZW1lbnQucm91dGUnO1xuaW1wb3J0IHtSb3V0ZXJNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge0xhbWlzU2hhcmVkTW9kdWxlfSBmcm9tICdAbGFtaXMvd2ViLWNvcmUnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgTWF0ZXJpYWxNb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIFJvdXRlck1vZHVsZS5mb3JDaGlsZChST1VURVMpLFxuICAgICAgICBDb3JlTW9kdWxlLFxuICAgICAgICBOZ2JNb2R1bGUsXG4gICAgICAgIENvdmFsZW50U2VhcmNoTW9kdWxlLFxuICAgICAgICBDb3ZhbGVudERpYWxvZ3NNb2R1bGUsXG4gICAgICAgIExhbWlzU2hhcmVkTW9kdWxlLFxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIFBhdGllbnRMaXN0Q29tcG9uZW50XG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIENhc2VNYW5hZ2VtZW50TW9kdWxlIHtcblxufVxuIl19