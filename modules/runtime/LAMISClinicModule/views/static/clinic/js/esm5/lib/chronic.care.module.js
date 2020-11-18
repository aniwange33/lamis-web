import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { ChronicCareDetailComponent } from './components/chronic-care/chronic.care.detail.component';
import { ChronicCareEditComponent } from './components/chronic-care/chronic.care.edit.component';
import { ChronicCareResolve } from './services/chronic.care.route';
import { MaterialModule } from './material.module';
import { CoreModule } from '@alfresco/adf-core';
import { CustomFormsModule } from 'ng2-validation';
import { CommonModule } from '@angular/common';
import { CovalentDialogsModule } from '@covalent/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LamisSharedModule, MatDateFormatModule } from '@lamis/web-core';
import { RouterModule } from '@angular/router';
import { ROUTES } from './services/chronic.care.route';
import { MatStepperModule } from '@angular/material';
var ChronicCareModule = /** @class */ (function () {
    function ChronicCareModule() {
    }
    ChronicCareModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                ChronicCareDetailComponent,
                ChronicCareEditComponent
            ],
            imports: [
                CommonModule,
                CovalentDialogsModule,
                FormsModule,
                ReactiveFormsModule,
                LamisSharedModule,
                MaterialModule,
                CoreModule,
                CustomFormsModule,
                MatDateFormatModule,
                RouterModule.forChild(ROUTES),
                MatStepperModule
            ],
            providers: [
                ChronicCareResolve
            ]
        })
    ], ChronicCareModule);
    return ChronicCareModule;
}());
export { ChronicCareModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hyb25pYy5jYXJlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xhbWlzLWNsaW5pYy0xLjQuMC8iLCJzb3VyY2VzIjpbImxpYi9jaHJvbmljLmNhcmUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLHlEQUF5RCxDQUFDO0FBQ25HLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLHVEQUF1RCxDQUFDO0FBQy9GLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDOUMsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3JELE9BQU8sRUFBQyxXQUFXLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRSxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN2RSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQ3JELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBd0JuRDtJQUFBO0lBRUEsQ0FBQztJQUZZLGlCQUFpQjtRQXRCN0IsUUFBUSxDQUFDO1lBQ04sWUFBWSxFQUFFO2dCQUNWLDBCQUEwQjtnQkFDMUIsd0JBQXdCO2FBQzNCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLFlBQVk7Z0JBQ1oscUJBQXFCO2dCQUNyQixXQUFXO2dCQUNYLG1CQUFtQjtnQkFDbkIsaUJBQWlCO2dCQUNqQixjQUFjO2dCQUNkLFVBQVU7Z0JBQ1YsaUJBQWlCO2dCQUNqQixtQkFBbUI7Z0JBQ25CLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO2dCQUM3QixnQkFBZ0I7YUFDbkI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1Asa0JBQWtCO2FBQ3JCO1NBQ0osQ0FBQztPQUNXLGlCQUFpQixDQUU3QjtJQUFELHdCQUFDO0NBQUEsQUFGRCxJQUVDO1NBRlksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Nocm9uaWNDYXJlRGV0YWlsQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvY2hyb25pYy1jYXJlL2Nocm9uaWMuY2FyZS5kZXRhaWwuY29tcG9uZW50JztcbmltcG9ydCB7Q2hyb25pY0NhcmVFZGl0Q29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvY2hyb25pYy1jYXJlL2Nocm9uaWMuY2FyZS5lZGl0LmNvbXBvbmVudCc7XG5pbXBvcnQge0Nocm9uaWNDYXJlUmVzb2x2ZX0gZnJvbSAnLi9zZXJ2aWNlcy9jaHJvbmljLmNhcmUucm91dGUnO1xuaW1wb3J0IHtNYXRlcmlhbE1vZHVsZX0gZnJvbSAnLi9tYXRlcmlhbC5tb2R1bGUnO1xuaW1wb3J0IHtDb3JlTW9kdWxlfSBmcm9tICdAYWxmcmVzY28vYWRmLWNvcmUnO1xuaW1wb3J0IHtDdXN0b21Gb3Jtc01vZHVsZX0gZnJvbSAnbmcyLXZhbGlkYXRpb24nO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0NvdmFsZW50RGlhbG9nc01vZHVsZX0gZnJvbSAnQGNvdmFsZW50L2NvcmUnO1xuaW1wb3J0IHtGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtMYW1pc1NoYXJlZE1vZHVsZSwgTWF0RGF0ZUZvcm1hdE1vZHVsZX0gZnJvbSAnQGxhbWlzL3dlYi1jb3JlJztcbmltcG9ydCB7Um91dGVyTW9kdWxlfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtST1VURVN9IGZyb20gJy4vc2VydmljZXMvY2hyb25pYy5jYXJlLnJvdXRlJztcbmltcG9ydCB7TWF0U3RlcHBlck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBDaHJvbmljQ2FyZURldGFpbENvbXBvbmVudCxcbiAgICAgICAgQ2hyb25pY0NhcmVFZGl0Q29tcG9uZW50XG4gICAgXSxcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgQ292YWxlbnREaWFsb2dzTW9kdWxlLFxuICAgICAgICBGb3Jtc01vZHVsZSxcbiAgICAgICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICAgICAgTGFtaXNTaGFyZWRNb2R1bGUsXG4gICAgICAgIE1hdGVyaWFsTW9kdWxlLFxuICAgICAgICBDb3JlTW9kdWxlLFxuICAgICAgICBDdXN0b21Gb3Jtc01vZHVsZSxcbiAgICAgICAgTWF0RGF0ZUZvcm1hdE1vZHVsZSxcbiAgICAgICAgUm91dGVyTW9kdWxlLmZvckNoaWxkKFJPVVRFUyksXG4gICAgICAgIE1hdFN0ZXBwZXJNb2R1bGVcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBDaHJvbmljQ2FyZVJlc29sdmVcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIENocm9uaWNDYXJlTW9kdWxlIHtcblxufVxuIl19