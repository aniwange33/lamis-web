import * as tslib_1 from "tslib";
import { CoreModule } from '@alfresco/adf-core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDividerModule, MatIconModule, MatInputModule, MatListModule, MatProgressBarModule, MatSelectModule, MatTabsModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { CovalentDialogsModule, CovalentMessageModule, CovalentSearchModule } from '@covalent/core';
import { JsonFormModule, LamisSharedModule, MatDateFormatModule } from '@lamis/web-core';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgJhipsterModule } from 'ng-jhipster';
import { PatientDetailsComponent } from './components/patient-details.component';
import { PatientEditComponent } from './components/patient-edit.component';
import { PatientListComponent } from './components/patient-list.component';
import { PatientResolve, ROUTES } from './services/patient.route';
import { WidgetContainerComponent } from './components/widget-container.component';
import { TimelineComponent } from './components/timeline.component';
import { TimelineWidgetModule } from './widget/timeline.widget.module';
import { MatFormioModule } from 'angular-material-formio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UniqueHospitalNumValidator } from './components/unique-hospital-num.validator';
import { CustomFormsModule } from 'ng2-validation';
import { DetailedTimelineComponent } from './components/detailed.timeline.component';
import { SummaryWidgetComponent } from './components/summary.widget.component';
let PatientModule = class PatientModule {
};
PatientModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            PatientListComponent,
            PatientDetailsComponent,
            PatientEditComponent,
            WidgetContainerComponent,
            TimelineComponent,
            DetailedTimelineComponent,
            SummaryWidgetComponent,
            UniqueHospitalNumValidator
        ],
        imports: [
            CommonModule,
            NgJhipsterModule,
            LamisSharedModule,
            JsonFormModule,
            MatFormioModule,
            MatInputModule,
            MatIconModule,
            MatDividerModule,
            MatCardModule,
            MatSelectModule,
            MatButtonModule,
            MatCheckboxModule,
            MatTabsModule,
            RouterModule.forChild(ROUTES),
            MatProgressBarModule,
            CovalentMessageModule,
            MatListModule,
            MatChipsModule,
            CoreModule,
            CovalentDialogsModule,
            CovalentSearchModule,
            NgbPaginationModule,
            TimelineWidgetModule,
            FormsModule,
            ReactiveFormsModule,
            MatDateFormatModule,
            CustomFormsModule,
            MatAutocompleteModule
        ],
        exports: [
            PatientListComponent,
            PatientDetailsComponent,
            PatientEditComponent
        ],
        entryComponents: [
            WidgetContainerComponent,
            TimelineComponent,
            SummaryWidgetComponent
        ],
        providers: [
            //PatientService,
            //ObservationService,
            PatientResolve
        ]
    })
], PatientModule);
export { PatientModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aWVudC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1wYXRpZW50LTEuNC4xLyIsInNvdXJjZXMiOlsibGliL3BhdGllbnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDOUMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUNILHFCQUFxQixFQUNyQixlQUFlLEVBQ2YsYUFBYSxFQUNiLGlCQUFpQixFQUNqQixjQUFjLEVBQ2QsZ0JBQWdCLEVBQ2hCLGFBQWEsRUFDYixjQUFjLEVBQ2QsYUFBYSxFQUNiLG9CQUFvQixFQUNwQixlQUFlLEVBQ2YsYUFBYSxFQUNoQixNQUFNLG1CQUFtQixDQUFDO0FBQzNCLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMscUJBQXFCLEVBQUUscUJBQXFCLEVBQUUsb0JBQW9CLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRyxPQUFPLEVBQUMsY0FBYyxFQUFFLGlCQUFpQixFQUFFLG1CQUFtQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDdkYsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDL0QsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQzdDLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLHdDQUF3QyxDQUFDO0FBQy9FLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBQ3pFLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBQ3pFLE9BQU8sRUFBQyxjQUFjLEVBQUUsTUFBTSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDaEUsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0seUNBQXlDLENBQUM7QUFDakYsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDbEUsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDckUsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3hELE9BQU8sRUFBQyxXQUFXLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRSxPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSw0Q0FBNEMsQ0FBQztBQUN0RixPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMseUJBQXlCLEVBQUMsTUFBTSwwQ0FBMEMsQ0FBQztBQUNuRixPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQTJEN0UsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtDQUN6QixDQUFBO0FBRFksYUFBYTtJQXpEekIsUUFBUSxDQUFDO1FBQ04sWUFBWSxFQUFFO1lBQ1Ysb0JBQW9CO1lBQ3BCLHVCQUF1QjtZQUN2QixvQkFBb0I7WUFDcEIsd0JBQXdCO1lBQ3hCLGlCQUFpQjtZQUNqQix5QkFBeUI7WUFDekIsc0JBQXNCO1lBQ3RCLDBCQUEwQjtTQUM3QjtRQUNELE9BQU8sRUFBRTtZQUNMLFlBQVk7WUFDWixnQkFBZ0I7WUFDaEIsaUJBQWlCO1lBQ2pCLGNBQWM7WUFDZCxlQUFlO1lBQ2YsY0FBYztZQUNkLGFBQWE7WUFDYixnQkFBZ0I7WUFDaEIsYUFBYTtZQUNiLGVBQWU7WUFDZixlQUFlO1lBQ2YsaUJBQWlCO1lBQ2pCLGFBQWE7WUFDYixZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztZQUM3QixvQkFBb0I7WUFDcEIscUJBQXFCO1lBQ3JCLGFBQWE7WUFDYixjQUFjO1lBQ2QsVUFBVTtZQUNWLHFCQUFxQjtZQUNyQixvQkFBb0I7WUFDcEIsbUJBQW1CO1lBQ25CLG9CQUFvQjtZQUNwQixXQUFXO1lBQ1gsbUJBQW1CO1lBQ25CLG1CQUFtQjtZQUNuQixpQkFBaUI7WUFDakIscUJBQXFCO1NBQ3hCO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsb0JBQW9CO1lBQ3BCLHVCQUF1QjtZQUN2QixvQkFBb0I7U0FDdkI7UUFDRCxlQUFlLEVBQUU7WUFDYix3QkFBd0I7WUFDeEIsaUJBQWlCO1lBQ2pCLHNCQUFzQjtTQUN6QjtRQUNELFNBQVMsRUFBRTtZQUNQLGlCQUFpQjtZQUNqQixxQkFBcUI7WUFDckIsY0FBYztTQUNqQjtLQUNKLENBQUM7R0FDVyxhQUFhLENBQ3pCO1NBRFksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29yZU1vZHVsZX0gZnJvbSAnQGFsZnJlc2NvL2FkZi1jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIE1hdEF1dG9jb21wbGV0ZU1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0Q2FyZE1vZHVsZSxcbiAgICBNYXRDaGVja2JveE1vZHVsZSxcbiAgICBNYXRDaGlwc01vZHVsZSxcbiAgICBNYXREaXZpZGVyTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgTWF0TGlzdE1vZHVsZSxcbiAgICBNYXRQcm9ncmVzc0Jhck1vZHVsZSxcbiAgICBNYXRTZWxlY3RNb2R1bGUsXG4gICAgTWF0VGFic01vZHVsZVxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQge1JvdXRlck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7Q292YWxlbnREaWFsb2dzTW9kdWxlLCBDb3ZhbGVudE1lc3NhZ2VNb2R1bGUsIENvdmFsZW50U2VhcmNoTW9kdWxlfSBmcm9tICdAY292YWxlbnQvY29yZSc7XG5pbXBvcnQge0pzb25Gb3JtTW9kdWxlLCBMYW1pc1NoYXJlZE1vZHVsZSwgTWF0RGF0ZUZvcm1hdE1vZHVsZX0gZnJvbSAnQGxhbWlzL3dlYi1jb3JlJztcbmltcG9ydCB7TmdiUGFnaW5hdGlvbk1vZHVsZX0gZnJvbSAnQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAnO1xuaW1wb3J0IHtOZ0poaXBzdGVyTW9kdWxlfSBmcm9tICduZy1qaGlwc3Rlcic7XG5pbXBvcnQge1BhdGllbnREZXRhaWxzQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvcGF0aWVudC1kZXRhaWxzLmNvbXBvbmVudCc7XG5pbXBvcnQge1BhdGllbnRFZGl0Q29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvcGF0aWVudC1lZGl0LmNvbXBvbmVudCc7XG5pbXBvcnQge1BhdGllbnRMaXN0Q29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvcGF0aWVudC1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQge1BhdGllbnRSZXNvbHZlLCBST1VURVN9IGZyb20gJy4vc2VydmljZXMvcGF0aWVudC5yb3V0ZSc7XG5pbXBvcnQge1dpZGdldENvbnRhaW5lckNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL3dpZGdldC1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7VGltZWxpbmVDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy90aW1lbGluZS5jb21wb25lbnQnO1xuaW1wb3J0IHtUaW1lbGluZVdpZGdldE1vZHVsZX0gZnJvbSAnLi93aWRnZXQvdGltZWxpbmUud2lkZ2V0Lm1vZHVsZSc7XG5pbXBvcnQge01hdEZvcm1pb01vZHVsZX0gZnJvbSAnYW5ndWxhci1tYXRlcmlhbC1mb3JtaW8nO1xuaW1wb3J0IHtGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtVbmlxdWVIb3NwaXRhbE51bVZhbGlkYXRvcn0gZnJvbSAnLi9jb21wb25lbnRzL3VuaXF1ZS1ob3NwaXRhbC1udW0udmFsaWRhdG9yJztcbmltcG9ydCB7Q3VzdG9tRm9ybXNNb2R1bGV9IGZyb20gJ25nMi12YWxpZGF0aW9uJztcbmltcG9ydCB7RGV0YWlsZWRUaW1lbGluZUNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL2RldGFpbGVkLnRpbWVsaW5lLmNvbXBvbmVudCc7XG5pbXBvcnQge1N1bW1hcnlXaWRnZXRDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9zdW1tYXJ5LndpZGdldC5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBQYXRpZW50TGlzdENvbXBvbmVudCxcbiAgICAgICAgUGF0aWVudERldGFpbHNDb21wb25lbnQsXG4gICAgICAgIFBhdGllbnRFZGl0Q29tcG9uZW50LFxuICAgICAgICBXaWRnZXRDb250YWluZXJDb21wb25lbnQsXG4gICAgICAgIFRpbWVsaW5lQ29tcG9uZW50LFxuICAgICAgICBEZXRhaWxlZFRpbWVsaW5lQ29tcG9uZW50LFxuICAgICAgICBTdW1tYXJ5V2lkZ2V0Q29tcG9uZW50LFxuICAgICAgICBVbmlxdWVIb3NwaXRhbE51bVZhbGlkYXRvclxuICAgIF0sXG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIE5nSmhpcHN0ZXJNb2R1bGUsXG4gICAgICAgIExhbWlzU2hhcmVkTW9kdWxlLFxuICAgICAgICBKc29uRm9ybU1vZHVsZSxcbiAgICAgICAgTWF0Rm9ybWlvTW9kdWxlLFxuICAgICAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICAgICAgTWF0SWNvbk1vZHVsZSxcbiAgICAgICAgTWF0RGl2aWRlck1vZHVsZSxcbiAgICAgICAgTWF0Q2FyZE1vZHVsZSxcbiAgICAgICAgTWF0U2VsZWN0TW9kdWxlLFxuICAgICAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgICAgIE1hdENoZWNrYm94TW9kdWxlLFxuICAgICAgICBNYXRUYWJzTW9kdWxlLFxuICAgICAgICBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQoUk9VVEVTKSxcbiAgICAgICAgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXG4gICAgICAgIENvdmFsZW50TWVzc2FnZU1vZHVsZSxcbiAgICAgICAgTWF0TGlzdE1vZHVsZSxcbiAgICAgICAgTWF0Q2hpcHNNb2R1bGUsXG4gICAgICAgIENvcmVNb2R1bGUsXG4gICAgICAgIENvdmFsZW50RGlhbG9nc01vZHVsZSxcbiAgICAgICAgQ292YWxlbnRTZWFyY2hNb2R1bGUsXG4gICAgICAgIE5nYlBhZ2luYXRpb25Nb2R1bGUsXG4gICAgICAgIFRpbWVsaW5lV2lkZ2V0TW9kdWxlLFxuICAgICAgICBGb3Jtc01vZHVsZSxcbiAgICAgICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICAgICAgTWF0RGF0ZUZvcm1hdE1vZHVsZSxcbiAgICAgICAgQ3VzdG9tRm9ybXNNb2R1bGUsXG4gICAgICAgIE1hdEF1dG9jb21wbGV0ZU1vZHVsZVxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBQYXRpZW50TGlzdENvbXBvbmVudCxcbiAgICAgICAgUGF0aWVudERldGFpbHNDb21wb25lbnQsXG4gICAgICAgIFBhdGllbnRFZGl0Q29tcG9uZW50XG4gICAgXSxcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICAgICAgV2lkZ2V0Q29udGFpbmVyQ29tcG9uZW50LFxuICAgICAgICBUaW1lbGluZUNvbXBvbmVudCxcbiAgICAgICAgU3VtbWFyeVdpZGdldENvbXBvbmVudFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIC8vUGF0aWVudFNlcnZpY2UsXG4gICAgICAgIC8vT2JzZXJ2YXRpb25TZXJ2aWNlLFxuICAgICAgICBQYXRpZW50UmVzb2x2ZVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgUGF0aWVudE1vZHVsZSB7XG59XG4iXX0=