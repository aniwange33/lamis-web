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

let ClinicModule = class ClinicModule {
};
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
export {ClinicModule};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpbmljLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xhbWlzLWNsaW5pYy0xLjEuMy8iLCJzb3VyY2VzIjpbImxpYi9jbGluaWMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDaEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUNILGVBQWUsRUFDZixhQUFhLEVBQ2IsYUFBYSxFQUNiLGNBQWMsRUFDZCxhQUFhLEVBQ2Isb0JBQW9CLEVBQ3BCLGVBQWUsRUFDbEIsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHFCQUFxQixFQUFFLHFCQUFxQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDdEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDaEYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLG1CQUFtQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFzQzdELElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQVk7Q0FDeEIsQ0FBQTtBQURZLFlBQVk7SUFwQ3hCLFFBQVEsQ0FBQztRQUNOLFlBQVksRUFBRTtZQUNWLHNCQUFzQjtZQUN0QixtQkFBbUI7U0FDdEI7UUFDRCxPQUFPLEVBQUU7WUFDTCxZQUFZO1lBQ1osY0FBYztZQUNkLGFBQWE7WUFDYixhQUFhO1lBQ2IsZUFBZTtZQUNmLGVBQWU7WUFDZixZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztZQUM3QixvQkFBb0I7WUFDcEIscUJBQXFCO1lBQ3JCLHFCQUFxQjtZQUNyQixhQUFhO1lBQ2IsVUFBVTtZQUNWLGtCQUFrQjtZQUNsQixXQUFXO1lBQ1gsbUJBQW1CO1lBQ25CLG1CQUFtQjtZQUNuQixpQkFBaUI7WUFDakIsaUJBQWlCO1lBQ2pCLGtCQUFrQjtTQUNyQjtRQUNELE9BQU8sRUFBRTtZQUNMLHNCQUFzQjtZQUN0QixtQkFBbUI7U0FDdEI7UUFDRCxlQUFlLEVBQUUsRUFDaEI7UUFDRCxTQUFTLEVBQUU7WUFDUCxhQUFhO1NBQ2hCO0tBQ0osQ0FBQztHQUNXLFlBQVksQ0FDeEI7U0FEWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29yZU1vZHVsZSB9IGZyb20gJ0BhbGZyZXNjby9hZGYtY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICBNYXRDYXJkTW9kdWxlLFxyXG4gICAgTWF0SWNvbk1vZHVsZSxcclxuICAgIE1hdElucHV0TW9kdWxlLFxyXG4gICAgTWF0TGlzdE1vZHVsZSxcclxuICAgIE1hdFByb2dyZXNzQmFyTW9kdWxlLFxyXG4gICAgTWF0U2VsZWN0TW9kdWxlXHJcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBDb3ZhbGVudERpYWxvZ3NNb2R1bGUsIENvdmFsZW50TWVzc2FnZU1vZHVsZSB9IGZyb20gJ0Bjb3ZhbGVudC9jb3JlJztcclxuaW1wb3J0IHsgQ2xpbmljRGV0YWlsc0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jbGluaWMvY2xpbmljLWRldGFpbHMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ2xpbmljRWRpdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jbGluaWMvY2xpbmljLWVkaXQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ2xpbmljUmVzb2x2ZSwgUk9VVEVTIH0gZnJvbSAnLi9zZXJ2aWNlcy9jbGluaWMucm91dGUnO1xyXG5pbXBvcnQgeyBDbGluaWNXaWRnZXRNb2R1bGUgfSBmcm9tICcuL2NsaW5pYy53aWRnZXQubW9kdWxlJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IExhbWlzU2hhcmVkTW9kdWxlLCBNYXREYXRlRm9ybWF0TW9kdWxlIH0gZnJvbSAnQGxhbWlzL3dlYi1jb3JlJztcclxuaW1wb3J0IHsgQ3VzdG9tRm9ybXNNb2R1bGUgfSBmcm9tICduZzItdmFsaWRhdGlvbic7XHJcbmltcG9ydCB7IE5neERhdGF0YWJsZU1vZHVsZSB9IGZyb20gJ0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICBDbGluaWNEZXRhaWxzQ29tcG9uZW50LFxyXG4gICAgICAgIENsaW5pY0VkaXRDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgICAgIE1hdElucHV0TW9kdWxlLFxyXG4gICAgICAgIE1hdEljb25Nb2R1bGUsXHJcbiAgICAgICAgTWF0Q2FyZE1vZHVsZSxcclxuICAgICAgICBNYXRTZWxlY3RNb2R1bGUsXHJcbiAgICAgICAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gICAgICAgIFJvdXRlck1vZHVsZS5mb3JDaGlsZChST1VURVMpLFxyXG4gICAgICAgIE1hdFByb2dyZXNzQmFyTW9kdWxlLFxyXG4gICAgICAgIENvdmFsZW50TWVzc2FnZU1vZHVsZSxcclxuICAgICAgICBDb3ZhbGVudERpYWxvZ3NNb2R1bGUsXHJcbiAgICAgICAgTWF0TGlzdE1vZHVsZSxcclxuICAgICAgICBDb3JlTW9kdWxlLFxyXG4gICAgICAgIENsaW5pY1dpZGdldE1vZHVsZSxcclxuICAgICAgICBGb3Jtc01vZHVsZSxcclxuICAgICAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgICAgIE1hdERhdGVGb3JtYXRNb2R1bGUsXHJcbiAgICAgICAgQ3VzdG9tRm9ybXNNb2R1bGUsXHJcbiAgICAgICAgTGFtaXNTaGFyZWRNb2R1bGUsXHJcbiAgICAgICAgTmd4RGF0YXRhYmxlTW9kdWxlLFxyXG4gICAgXSxcclxuICAgIGV4cG9ydHM6IFtcclxuICAgICAgICBDbGluaWNEZXRhaWxzQ29tcG9uZW50LFxyXG4gICAgICAgIENsaW5pY0VkaXRDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtcclxuICAgIF0sXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICBDbGluaWNSZXNvbHZlXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDbGluaWNNb2R1bGUge1xyXG59XHJcbiJdfQ==
