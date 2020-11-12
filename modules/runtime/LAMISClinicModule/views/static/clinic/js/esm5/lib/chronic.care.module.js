import * as tslib_1 from "tslib";
import {NgModule} from '@angular/core';
import {ChronicCareDetailComponent} from './components/chronic-care/chronic.care.detail.component';
import {ChronicCareEditComponent} from './components/chronic-care/chronic.care.edit.component';
import {ChronicCareResolve} from './services/chronic.care.route';
import {MaterialModule} from './material.module';
import {CoreModule} from '@alfresco/adf-core';
import {CustomFormsModule} from 'ng2-validation';
import {CommonModule} from '@angular/common';
import {CovalentDialogsModule} from '@covalent/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LamisSharedModule, MatDateFormatModule} from '@lamis/web-core';
import {RouterModule} from '@angular/router';
import {ROUTES} from './services/chronic.care.route';
import {MatStepperModule} from "@angular/material";

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
export {ChronicCareModule};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hyb25pYy5jYXJlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xhbWlzLWNsaW5pYy0xLjEuMy8iLCJzb3VyY2VzIjpbImxpYi9jaHJvbmljLmNhcmUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHlEQUF5RCxDQUFDO0FBQ3JHLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHVEQUF1RCxDQUFDO0FBQ2pHLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDaEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBd0JyRDtJQUFBO0lBRUEsQ0FBQztJQUZZLGlCQUFpQjtRQXRCN0IsUUFBUSxDQUFDO1lBQ04sWUFBWSxFQUFFO2dCQUNWLDBCQUEwQjtnQkFDMUIsd0JBQXdCO2FBQzNCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLFlBQVk7Z0JBQ1oscUJBQXFCO2dCQUNyQixXQUFXO2dCQUNYLG1CQUFtQjtnQkFDbkIsaUJBQWlCO2dCQUNqQixjQUFjO2dCQUNkLFVBQVU7Z0JBQ1YsaUJBQWlCO2dCQUNqQixtQkFBbUI7Z0JBQ25CLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO2dCQUM3QixnQkFBZ0I7YUFDbkI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1Asa0JBQWtCO2FBQ3JCO1NBQ0osQ0FBQztPQUNXLGlCQUFpQixDQUU3QjtJQUFELHdCQUFDO0NBQUEsQUFGRCxJQUVDO1NBRlksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENocm9uaWNDYXJlRGV0YWlsQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2Nocm9uaWMtY2FyZS9jaHJvbmljLmNhcmUuZGV0YWlsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDaHJvbmljQ2FyZUVkaXRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY2hyb25pYy1jYXJlL2Nocm9uaWMuY2FyZS5lZGl0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDaHJvbmljQ2FyZVJlc29sdmUgfSBmcm9tICcuL3NlcnZpY2VzL2Nocm9uaWMuY2FyZS5yb3V0ZSc7XG5pbXBvcnQgeyBNYXRlcmlhbE1vZHVsZSB9IGZyb20gJy4vbWF0ZXJpYWwubW9kdWxlJztcbmltcG9ydCB7IENvcmVNb2R1bGUgfSBmcm9tICdAYWxmcmVzY28vYWRmLWNvcmUnO1xuaW1wb3J0IHsgQ3VzdG9tRm9ybXNNb2R1bGUgfSBmcm9tICduZzItdmFsaWRhdGlvbic7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ292YWxlbnREaWFsb2dzTW9kdWxlIH0gZnJvbSAnQGNvdmFsZW50L2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBMYW1pc1NoYXJlZE1vZHVsZSwgTWF0RGF0ZUZvcm1hdE1vZHVsZSB9IGZyb20gJ0BsYW1pcy93ZWItY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgUk9VVEVTIH0gZnJvbSAnLi9zZXJ2aWNlcy9jaHJvbmljLmNhcmUucm91dGUnO1xuaW1wb3J0IHsgTWF0U3RlcHBlck1vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9tYXRlcmlhbFwiO1xuXG5ATmdNb2R1bGUoe1xuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBDaHJvbmljQ2FyZURldGFpbENvbXBvbmVudCxcbiAgICAgICAgQ2hyb25pY0NhcmVFZGl0Q29tcG9uZW50XG4gICAgXSxcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgQ292YWxlbnREaWFsb2dzTW9kdWxlLFxuICAgICAgICBGb3Jtc01vZHVsZSxcbiAgICAgICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICAgICAgTGFtaXNTaGFyZWRNb2R1bGUsXG4gICAgICAgIE1hdGVyaWFsTW9kdWxlLFxuICAgICAgICBDb3JlTW9kdWxlLFxuICAgICAgICBDdXN0b21Gb3Jtc01vZHVsZSxcbiAgICAgICAgTWF0RGF0ZUZvcm1hdE1vZHVsZSxcbiAgICAgICAgUm91dGVyTW9kdWxlLmZvckNoaWxkKFJPVVRFUyksXG4gICAgICAgIE1hdFN0ZXBwZXJNb2R1bGVcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBDaHJvbmljQ2FyZVJlc29sdmVcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIENocm9uaWNDYXJlTW9kdWxlIHtcbiAgICBcbn1cbiJdfQ==
