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
    MatSelectModule,
    MatTableModule
} from '@angular/material';
import {RouterModule} from '@angular/router';
import {CovalentDialogsModule, CovalentMessageModule} from '@covalent/core';
import {LaboratoryResolve, ROUTES} from './services/laboratory.route';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {MatDateFormatModule} from '@lamis/web-core';
import {CustomFormsModule} from 'ng2-validation';
import {LaboratoryDetailsComponent} from './components/laboratory-details.component';
import {LaboratoryEditComponent} from './components/laboratory-edit.component';

let LaboratoryModule = class LaboratoryModule {
};
LaboratoryModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            LaboratoryDetailsComponent,
            LaboratoryEditComponent
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
            FormsModule,
            CovalentMessageModule,
            CovalentDialogsModule,
            MatTableModule,
            MatListModule,
            CoreModule,
            NgxDatatableModule,
            ReactiveFormsModule,
            MatDateFormatModule,
            CustomFormsModule
        ],
        exports: [
            LaboratoryDetailsComponent,
            LaboratoryEditComponent
        ],
        entryComponents: [],
        providers: [
            LaboratoryResolve
        ]
    })
], LaboratoryModule);
export {LaboratoryModule};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFib3JhdG9yeS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1sYWJvcmF0b3J5LTEuMS4xLyIsInNvdXJjZXMiOlsibGliL2xhYm9yYXRvcnkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDaEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUNILGVBQWUsRUFDZixhQUFhLEVBQ2IsYUFBYSxFQUNiLGNBQWMsRUFDZCxhQUFhLEVBQ2Isb0JBQW9CLEVBQ3BCLGVBQWUsRUFDZixjQUFjLEVBQ2pCLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDN0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDdkYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFvQ2pGLElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWdCO0NBQzVCLENBQUE7QUFEWSxnQkFBZ0I7SUFsQzVCLFFBQVEsQ0FBQztRQUNOLFlBQVksRUFBRTtZQUNWLDBCQUEwQjtZQUMxQix1QkFBdUI7U0FDMUI7UUFDRCxPQUFPLEVBQUU7WUFDTCxZQUFZO1lBQ1osY0FBYztZQUNkLGFBQWE7WUFDYixhQUFhO1lBQ2IsZUFBZTtZQUNmLGVBQWU7WUFDZixZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztZQUM3QixvQkFBb0I7WUFDcEIsV0FBVztZQUNYLHFCQUFxQjtZQUNyQixxQkFBcUI7WUFDckIsY0FBYztZQUNkLGFBQWE7WUFDYixVQUFVO1lBQ1Ysa0JBQWtCO1lBQ2xCLG1CQUFtQjtZQUNuQixtQkFBbUI7WUFDbkIsaUJBQWlCO1NBQ3BCO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsMEJBQTBCO1lBQzFCLHVCQUF1QjtTQUMxQjtRQUNELGVBQWUsRUFBRSxFQUFFO1FBQ25CLFNBQVMsRUFBRTtZQUNQLGlCQUFpQjtTQUNwQjtLQUNKLENBQUM7R0FDVyxnQkFBZ0IsQ0FDNUI7U0FEWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb3JlTW9kdWxlIH0gZnJvbSAnQGFsZnJlc2NvL2FkZi1jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtcclxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcclxuICAgIE1hdENhcmRNb2R1bGUsXHJcbiAgICBNYXRJY29uTW9kdWxlLFxyXG4gICAgTWF0SW5wdXRNb2R1bGUsXHJcbiAgICBNYXRMaXN0TW9kdWxlLFxyXG4gICAgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXHJcbiAgICBNYXRTZWxlY3RNb2R1bGUsXHJcbiAgICBNYXRUYWJsZU1vZHVsZVxyXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQ292YWxlbnREaWFsb2dzTW9kdWxlLCBDb3ZhbGVudE1lc3NhZ2VNb2R1bGUgfSBmcm9tICdAY292YWxlbnQvY29yZSc7XHJcbmltcG9ydCB7IExhYm9yYXRvcnlSZXNvbHZlLCBST1VURVMgfSBmcm9tICcuL3NlcnZpY2VzL2xhYm9yYXRvcnkucm91dGUnO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgTmd4RGF0YXRhYmxlTW9kdWxlIH0gZnJvbSAnQHN3aW1sYW5lL25neC1kYXRhdGFibGUnO1xyXG5pbXBvcnQgeyBNYXREYXRlRm9ybWF0TW9kdWxlIH0gZnJvbSAnQGxhbWlzL3dlYi1jb3JlJztcclxuaW1wb3J0IHsgQ3VzdG9tRm9ybXNNb2R1bGUgfSBmcm9tICduZzItdmFsaWRhdGlvbic7XHJcbmltcG9ydCB7IExhYm9yYXRvcnlEZXRhaWxzQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2xhYm9yYXRvcnktZGV0YWlscy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBMYWJvcmF0b3J5RWRpdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9sYWJvcmF0b3J5LWVkaXQuY29tcG9uZW50JztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICBMYWJvcmF0b3J5RGV0YWlsc0NvbXBvbmVudCxcclxuICAgICAgICBMYWJvcmF0b3J5RWRpdENvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBDb21tb25Nb2R1bGUsXHJcbiAgICAgICAgTWF0SW5wdXRNb2R1bGUsXHJcbiAgICAgICAgTWF0SWNvbk1vZHVsZSxcclxuICAgICAgICBNYXRDYXJkTW9kdWxlLFxyXG4gICAgICAgIE1hdFNlbGVjdE1vZHVsZSxcclxuICAgICAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICAgICAgUm91dGVyTW9kdWxlLmZvckNoaWxkKFJPVVRFUyksXHJcbiAgICAgICAgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXHJcbiAgICAgICAgRm9ybXNNb2R1bGUsXHJcbiAgICAgICAgQ292YWxlbnRNZXNzYWdlTW9kdWxlLFxyXG4gICAgICAgIENvdmFsZW50RGlhbG9nc01vZHVsZSxcclxuICAgICAgICBNYXRUYWJsZU1vZHVsZSxcclxuICAgICAgICBNYXRMaXN0TW9kdWxlLFxyXG4gICAgICAgIENvcmVNb2R1bGUsXHJcbiAgICAgICAgTmd4RGF0YXRhYmxlTW9kdWxlLFxyXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgICAgICAgTWF0RGF0ZUZvcm1hdE1vZHVsZSxcclxuICAgICAgICBDdXN0b21Gb3Jtc01vZHVsZVxyXG4gICAgXSxcclxuICAgIGV4cG9ydHM6IFtcclxuICAgICAgICBMYWJvcmF0b3J5RGV0YWlsc0NvbXBvbmVudCxcclxuICAgICAgICBMYWJvcmF0b3J5RWRpdENvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIGVudHJ5Q29tcG9uZW50czogW10sXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICBMYWJvcmF0b3J5UmVzb2x2ZVxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTGFib3JhdG9yeU1vZHVsZSB7XHJcbn1cclxuIl19
