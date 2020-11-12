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
import {PharmacyDetailsComponent} from './components/pharmacy-details.component';
import {PharmacyEditComponent} from './components/pharmacy-edit.component';
import {PharmacyResolve, ROUTES} from './services/pharmacy.route';
import {PharmacyWidgetModule} from './pharmacy.widget.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {MatDateFormatModule} from '@lamis/web-core';
import {CustomFormsModule} from 'ng2-validation';

let PharmacyModule = class PharmacyModule {
};
PharmacyModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            PharmacyDetailsComponent,
            PharmacyEditComponent
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
            PharmacyWidgetModule,
            NgxDatatableModule,
            ReactiveFormsModule,
            MatDateFormatModule,
            CustomFormsModule
        ],
        exports: [
            PharmacyDetailsComponent,
            PharmacyEditComponent
        ],
        entryComponents: [],
        providers: [
            PharmacyResolve
        ]
    })
], PharmacyModule);
export {PharmacyModule};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhhcm1hY3kubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGFtaXMtcGhhcm1hY3ktMS4xLjQvIiwic291cmNlcyI6WyJsaWIvcGhhcm1hY3kubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDaEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUNILGVBQWUsRUFDZixhQUFhLEVBQ2IsYUFBYSxFQUNiLGNBQWMsRUFDZCxhQUFhLEVBQ2Isb0JBQW9CLEVBQ3BCLGVBQWUsRUFDZixjQUFjLEVBQ2pCLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDcEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDaEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzdELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBcUNuRCxJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFjO0NBQzFCLENBQUE7QUFEWSxjQUFjO0lBbkMxQixRQUFRLENBQUM7UUFDTixZQUFZLEVBQUU7WUFDVix3QkFBd0I7WUFDeEIscUJBQXFCO1NBQ3hCO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsWUFBWTtZQUNaLGNBQWM7WUFDZCxhQUFhO1lBQ2IsYUFBYTtZQUNiLGVBQWU7WUFDZixlQUFlO1lBQ2YsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7WUFDN0Isb0JBQW9CO1lBQ3BCLFdBQVc7WUFDWCxxQkFBcUI7WUFDckIscUJBQXFCO1lBQ3JCLGNBQWM7WUFDZCxhQUFhO1lBQ2IsVUFBVTtZQUNWLG9CQUFvQjtZQUNwQixrQkFBa0I7WUFDbEIsbUJBQW1CO1lBQ25CLG1CQUFtQjtZQUNuQixpQkFBaUI7U0FDcEI7UUFDRCxPQUFPLEVBQUU7WUFDTCx3QkFBd0I7WUFDeEIscUJBQXFCO1NBQ3hCO1FBQ0QsZUFBZSxFQUFFLEVBQUU7UUFDbkIsU0FBUyxFQUFFO1lBQ1AsZUFBZTtTQUNsQjtLQUNKLENBQUM7R0FDVyxjQUFjLENBQzFCO1NBRFksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvcmVNb2R1bGUgfSBmcm9tICdAYWxmcmVzY28vYWRmLWNvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gICAgTWF0Q2FyZE1vZHVsZSxcclxuICAgIE1hdEljb25Nb2R1bGUsXHJcbiAgICBNYXRJbnB1dE1vZHVsZSxcclxuICAgIE1hdExpc3RNb2R1bGUsXHJcbiAgICBNYXRQcm9ncmVzc0Jhck1vZHVsZSxcclxuICAgIE1hdFNlbGVjdE1vZHVsZSxcclxuICAgIE1hdFRhYmxlTW9kdWxlXHJcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBDb3ZhbGVudERpYWxvZ3NNb2R1bGUsIENvdmFsZW50TWVzc2FnZU1vZHVsZSB9IGZyb20gJ0Bjb3ZhbGVudC9jb3JlJztcclxuaW1wb3J0IHsgUGhhcm1hY3lEZXRhaWxzQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3BoYXJtYWN5LWRldGFpbHMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgUGhhcm1hY3lFZGl0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3BoYXJtYWN5LWVkaXQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgUGhhcm1hY3lSZXNvbHZlLCBST1VURVMgfSBmcm9tICcuL3NlcnZpY2VzL3BoYXJtYWN5LnJvdXRlJztcclxuaW1wb3J0IHsgUGhhcm1hY3lXaWRnZXRNb2R1bGUgfSBmcm9tICcuL3BoYXJtYWN5LndpZGdldC5tb2R1bGUnO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgTmd4RGF0YXRhYmxlTW9kdWxlIH0gZnJvbSAnQHN3aW1sYW5lL25neC1kYXRhdGFibGUnO1xyXG5pbXBvcnQgeyBNYXREYXRlRm9ybWF0TW9kdWxlIH0gZnJvbSAnQGxhbWlzL3dlYi1jb3JlJztcclxuaW1wb3J0IHsgQ3VzdG9tRm9ybXNNb2R1bGUgfSBmcm9tICduZzItdmFsaWRhdGlvbic7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgUGhhcm1hY3lEZXRhaWxzQ29tcG9uZW50LFxyXG4gICAgICAgIFBoYXJtYWN5RWRpdENvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBDb21tb25Nb2R1bGUsXHJcbiAgICAgICAgTWF0SW5wdXRNb2R1bGUsXHJcbiAgICAgICAgTWF0SWNvbk1vZHVsZSxcclxuICAgICAgICBNYXRDYXJkTW9kdWxlLFxyXG4gICAgICAgIE1hdFNlbGVjdE1vZHVsZSxcclxuICAgICAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICAgICAgUm91dGVyTW9kdWxlLmZvckNoaWxkKFJPVVRFUyksXHJcbiAgICAgICAgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXHJcbiAgICAgICAgRm9ybXNNb2R1bGUsXHJcbiAgICAgICAgQ292YWxlbnRNZXNzYWdlTW9kdWxlLFxyXG4gICAgICAgIENvdmFsZW50RGlhbG9nc01vZHVsZSxcclxuICAgICAgICBNYXRUYWJsZU1vZHVsZSxcclxuICAgICAgICBNYXRMaXN0TW9kdWxlLFxyXG4gICAgICAgIENvcmVNb2R1bGUsXHJcbiAgICAgICAgUGhhcm1hY3lXaWRnZXRNb2R1bGUsXHJcbiAgICAgICAgTmd4RGF0YXRhYmxlTW9kdWxlLFxyXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgICAgICAgTWF0RGF0ZUZvcm1hdE1vZHVsZSxcclxuICAgICAgICBDdXN0b21Gb3Jtc01vZHVsZVxyXG4gICAgXSxcclxuICAgIGV4cG9ydHM6IFtcclxuICAgICAgICBQaGFybWFjeURldGFpbHNDb21wb25lbnQsXHJcbiAgICAgICAgUGhhcm1hY3lFZGl0Q29tcG9uZW50XHJcbiAgICBdLFxyXG4gICAgZW50cnlDb21wb25lbnRzOiBbXSxcclxuICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIFBoYXJtYWN5UmVzb2x2ZVxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUGhhcm1hY3lNb2R1bGUge1xyXG59XHJcbiJdfQ==
