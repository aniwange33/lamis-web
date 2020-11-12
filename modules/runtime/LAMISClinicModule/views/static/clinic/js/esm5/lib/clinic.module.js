import * as tslib_1 from "tslib";
import {CoreModule} from '@alfresco/adf-core';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatSelectModule
} from '@angular/material';
import {RouterModule} from '@angular/router';
import {CovalentDialogsModule, CovalentMessageModule} from '@covalent/core';
import {ClinicDetailsComponent} from './components/clinic/clinic-details.component';
import {ClinicEditComponent} from './components/clinic/clinic-edit.component';
import {ClinicResolve, ROUTES} from './services/clinic.route';
import {ClinicWidgetModule} from './clinic.widget.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LamisSharedModule, MatDateFormatModule} from '@lamis/web-core';
import {CustomFormsModule} from 'ng2-validation';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

var ClinicModule = /** @class */ (function () {
    function ClinicModule() {
    }

    ClinicModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                ClinicDetailsComponent,
                ClinicEditComponent
            ],
            imports: [
                CommonModule,
                MatInputModule,
                MatIconModule,
                MatCardModule,
                MatSelectModule,
                MatButtonModule,
                RouterModule.forChild(ROUTES),
                MatProgressBarModule,
                CovalentMessageModule,
                CovalentDialogsModule,
                MatListModule,
                CoreModule,
                ClinicWidgetModule,
                FormsModule,
                ReactiveFormsModule,
                MatDateFormatModule,
                CustomFormsModule,
                LamisSharedModule,
                NgxDatatableModule,
            ],
            exports: [
                ClinicDetailsComponent,
                ClinicEditComponent
            ],
            entryComponents: [],
            providers: [
                ClinicResolve
            ]
        })
    ], ClinicModule);
    return ClinicModule;
}());
export {ClinicModule};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpbmljLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xhbWlzLWNsaW5pYy0xLjEuMy8iLCJzb3VyY2VzIjpbImxpYi9jbGluaWMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDaEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUNILGVBQWUsRUFDZixhQUFhLEVBQ2IsYUFBYSxFQUNiLGNBQWMsRUFDZCxhQUFhLEVBQ2Isb0JBQW9CLEVBQ3BCLGVBQWUsRUFDbEIsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHFCQUFxQixFQUFFLHFCQUFxQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDdEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDaEYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLG1CQUFtQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFzQzdEO0lBQUE7SUFDQSxDQUFDO0lBRFksWUFBWTtRQXBDeEIsUUFBUSxDQUFDO1lBQ04sWUFBWSxFQUFFO2dCQUNWLHNCQUFzQjtnQkFDdEIsbUJBQW1CO2FBQ3RCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLFlBQVk7Z0JBQ1osY0FBYztnQkFDZCxhQUFhO2dCQUNiLGFBQWE7Z0JBQ2IsZUFBZTtnQkFDZixlQUFlO2dCQUNmLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO2dCQUM3QixvQkFBb0I7Z0JBQ3BCLHFCQUFxQjtnQkFDckIscUJBQXFCO2dCQUNyQixhQUFhO2dCQUNiLFVBQVU7Z0JBQ1Ysa0JBQWtCO2dCQUNsQixXQUFXO2dCQUNYLG1CQUFtQjtnQkFDbkIsbUJBQW1CO2dCQUNuQixpQkFBaUI7Z0JBQ2pCLGlCQUFpQjtnQkFDakIsa0JBQWtCO2FBQ3JCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLHNCQUFzQjtnQkFDdEIsbUJBQW1CO2FBQ3RCO1lBQ0QsZUFBZSxFQUFFLEVBQ2hCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLGFBQWE7YUFDaEI7U0FDSixDQUFDO09BQ1csWUFBWSxDQUN4QjtJQUFELG1CQUFDO0NBQUEsQUFERCxJQUNDO1NBRFksWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvcmVNb2R1bGUgfSBmcm9tICdAYWxmcmVzY28vYWRmLWNvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gICAgTWF0Q2FyZE1vZHVsZSxcclxuICAgIE1hdEljb25Nb2R1bGUsXHJcbiAgICBNYXRJbnB1dE1vZHVsZSxcclxuICAgIE1hdExpc3RNb2R1bGUsXHJcbiAgICBNYXRQcm9ncmVzc0Jhck1vZHVsZSxcclxuICAgIE1hdFNlbGVjdE1vZHVsZVxyXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQ292YWxlbnREaWFsb2dzTW9kdWxlLCBDb3ZhbGVudE1lc3NhZ2VNb2R1bGUgfSBmcm9tICdAY292YWxlbnQvY29yZSc7XHJcbmltcG9ydCB7IENsaW5pY0RldGFpbHNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY2xpbmljL2NsaW5pYy1kZXRhaWxzLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENsaW5pY0VkaXRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY2xpbmljL2NsaW5pYy1lZGl0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENsaW5pY1Jlc29sdmUsIFJPVVRFUyB9IGZyb20gJy4vc2VydmljZXMvY2xpbmljLnJvdXRlJztcclxuaW1wb3J0IHsgQ2xpbmljV2lkZ2V0TW9kdWxlIH0gZnJvbSAnLi9jbGluaWMud2lkZ2V0Lm1vZHVsZSc7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBMYW1pc1NoYXJlZE1vZHVsZSwgTWF0RGF0ZUZvcm1hdE1vZHVsZSB9IGZyb20gJ0BsYW1pcy93ZWItY29yZSc7XHJcbmltcG9ydCB7IEN1c3RvbUZvcm1zTW9kdWxlIH0gZnJvbSAnbmcyLXZhbGlkYXRpb24nO1xyXG5pbXBvcnQgeyBOZ3hEYXRhdGFibGVNb2R1bGUgfSBmcm9tICdAc3dpbWxhbmUvbmd4LWRhdGF0YWJsZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgQ2xpbmljRGV0YWlsc0NvbXBvbmVudCxcclxuICAgICAgICBDbGluaWNFZGl0Q29tcG9uZW50XHJcbiAgICBdLFxyXG4gICAgaW1wb3J0czogW1xyXG4gICAgICAgIENvbW1vbk1vZHVsZSxcclxuICAgICAgICBNYXRJbnB1dE1vZHVsZSxcclxuICAgICAgICBNYXRJY29uTW9kdWxlLFxyXG4gICAgICAgIE1hdENhcmRNb2R1bGUsXHJcbiAgICAgICAgTWF0U2VsZWN0TW9kdWxlLFxyXG4gICAgICAgIE1hdEJ1dHRvbk1vZHVsZSxcclxuICAgICAgICBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQoUk9VVEVTKSxcclxuICAgICAgICBNYXRQcm9ncmVzc0Jhck1vZHVsZSxcclxuICAgICAgICBDb3ZhbGVudE1lc3NhZ2VNb2R1bGUsXHJcbiAgICAgICAgQ292YWxlbnREaWFsb2dzTW9kdWxlLFxyXG4gICAgICAgIE1hdExpc3RNb2R1bGUsXHJcbiAgICAgICAgQ29yZU1vZHVsZSxcclxuICAgICAgICBDbGluaWNXaWRnZXRNb2R1bGUsXHJcbiAgICAgICAgRm9ybXNNb2R1bGUsXHJcbiAgICAgICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuICAgICAgICBNYXREYXRlRm9ybWF0TW9kdWxlLFxyXG4gICAgICAgIEN1c3RvbUZvcm1zTW9kdWxlLFxyXG4gICAgICAgIExhbWlzU2hhcmVkTW9kdWxlLFxyXG4gICAgICAgIE5neERhdGF0YWJsZU1vZHVsZSxcclxuICAgIF0sXHJcbiAgICBleHBvcnRzOiBbXHJcbiAgICAgICAgQ2xpbmljRGV0YWlsc0NvbXBvbmVudCxcclxuICAgICAgICBDbGluaWNFZGl0Q29tcG9uZW50XHJcbiAgICBdLFxyXG4gICAgZW50cnlDb21wb25lbnRzOiBbXHJcbiAgICBdLFxyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgQ2xpbmljUmVzb2x2ZVxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2xpbmljTW9kdWxlIHtcclxufVxyXG4iXX0=
