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
var PatientModule = /** @class */ (function () {
    function PatientModule() {
    }
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
    return PatientModule;
}());
export { PatientModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aWVudC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1wYXRpZW50LTEuNC4xLyIsInNvdXJjZXMiOlsibGliL3BhdGllbnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDOUMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUNILHFCQUFxQixFQUNyQixlQUFlLEVBQ2YsYUFBYSxFQUNiLGlCQUFpQixFQUNqQixjQUFjLEVBQ2QsZ0JBQWdCLEVBQ2hCLGFBQWEsRUFDYixjQUFjLEVBQ2QsYUFBYSxFQUNiLG9CQUFvQixFQUNwQixlQUFlLEVBQ2YsYUFBYSxFQUNoQixNQUFNLG1CQUFtQixDQUFDO0FBQzNCLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMscUJBQXFCLEVBQUUscUJBQXFCLEVBQUUsb0JBQW9CLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRyxPQUFPLEVBQUMsY0FBYyxFQUFFLGlCQUFpQixFQUFFLG1CQUFtQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDdkYsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDL0QsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQzdDLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLHdDQUF3QyxDQUFDO0FBQy9FLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBQ3pFLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBQ3pFLE9BQU8sRUFBQyxjQUFjLEVBQUUsTUFBTSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDaEUsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0seUNBQXlDLENBQUM7QUFDakYsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDbEUsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDckUsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3hELE9BQU8sRUFBQyxXQUFXLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRSxPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSw0Q0FBNEMsQ0FBQztBQUN0RixPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMseUJBQXlCLEVBQUMsTUFBTSwwQ0FBMEMsQ0FBQztBQUNuRixPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQTJEN0U7SUFBQTtJQUNBLENBQUM7SUFEWSxhQUFhO1FBekR6QixRQUFRLENBQUM7WUFDTixZQUFZLEVBQUU7Z0JBQ1Ysb0JBQW9CO2dCQUNwQix1QkFBdUI7Z0JBQ3ZCLG9CQUFvQjtnQkFDcEIsd0JBQXdCO2dCQUN4QixpQkFBaUI7Z0JBQ2pCLHlCQUF5QjtnQkFDekIsc0JBQXNCO2dCQUN0QiwwQkFBMEI7YUFDN0I7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsWUFBWTtnQkFDWixnQkFBZ0I7Z0JBQ2hCLGlCQUFpQjtnQkFDakIsY0FBYztnQkFDZCxlQUFlO2dCQUNmLGNBQWM7Z0JBQ2QsYUFBYTtnQkFDYixnQkFBZ0I7Z0JBQ2hCLGFBQWE7Z0JBQ2IsZUFBZTtnQkFDZixlQUFlO2dCQUNmLGlCQUFpQjtnQkFDakIsYUFBYTtnQkFDYixZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztnQkFDN0Isb0JBQW9CO2dCQUNwQixxQkFBcUI7Z0JBQ3JCLGFBQWE7Z0JBQ2IsY0FBYztnQkFDZCxVQUFVO2dCQUNWLHFCQUFxQjtnQkFDckIsb0JBQW9CO2dCQUNwQixtQkFBbUI7Z0JBQ25CLG9CQUFvQjtnQkFDcEIsV0FBVztnQkFDWCxtQkFBbUI7Z0JBQ25CLG1CQUFtQjtnQkFDbkIsaUJBQWlCO2dCQUNqQixxQkFBcUI7YUFDeEI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsb0JBQW9CO2dCQUNwQix1QkFBdUI7Z0JBQ3ZCLG9CQUFvQjthQUN2QjtZQUNELGVBQWUsRUFBRTtnQkFDYix3QkFBd0I7Z0JBQ3hCLGlCQUFpQjtnQkFDakIsc0JBQXNCO2FBQ3pCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLGlCQUFpQjtnQkFDakIscUJBQXFCO2dCQUNyQixjQUFjO2FBQ2pCO1NBQ0osQ0FBQztPQUNXLGFBQWEsQ0FDekI7SUFBRCxvQkFBQztDQUFBLEFBREQsSUFDQztTQURZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvcmVNb2R1bGV9IGZyb20gJ0BhbGZyZXNjby9hZGYtY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBNYXRBdXRvY29tcGxldGVNb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdENhcmRNb2R1bGUsXG4gICAgTWF0Q2hlY2tib3hNb2R1bGUsXG4gICAgTWF0Q2hpcHNNb2R1bGUsXG4gICAgTWF0RGl2aWRlck1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICAgIE1hdExpc3RNb2R1bGUsXG4gICAgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXG4gICAgTWF0U2VsZWN0TW9kdWxlLFxuICAgIE1hdFRhYnNNb2R1bGVcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHtSb3V0ZXJNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge0NvdmFsZW50RGlhbG9nc01vZHVsZSwgQ292YWxlbnRNZXNzYWdlTW9kdWxlLCBDb3ZhbGVudFNlYXJjaE1vZHVsZX0gZnJvbSAnQGNvdmFsZW50L2NvcmUnO1xuaW1wb3J0IHtKc29uRm9ybU1vZHVsZSwgTGFtaXNTaGFyZWRNb2R1bGUsIE1hdERhdGVGb3JtYXRNb2R1bGV9IGZyb20gJ0BsYW1pcy93ZWItY29yZSc7XG5pbXBvcnQge05nYlBhZ2luYXRpb25Nb2R1bGV9IGZyb20gJ0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwJztcbmltcG9ydCB7TmdKaGlwc3Rlck1vZHVsZX0gZnJvbSAnbmctamhpcHN0ZXInO1xuaW1wb3J0IHtQYXRpZW50RGV0YWlsc0NvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL3BhdGllbnQtZGV0YWlscy5jb21wb25lbnQnO1xuaW1wb3J0IHtQYXRpZW50RWRpdENvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL3BhdGllbnQtZWRpdC5jb21wb25lbnQnO1xuaW1wb3J0IHtQYXRpZW50TGlzdENvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL3BhdGllbnQtbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHtQYXRpZW50UmVzb2x2ZSwgUk9VVEVTfSBmcm9tICcuL3NlcnZpY2VzL3BhdGllbnQucm91dGUnO1xuaW1wb3J0IHtXaWRnZXRDb250YWluZXJDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy93aWRnZXQtY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQge1RpbWVsaW5lQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvdGltZWxpbmUuY29tcG9uZW50JztcbmltcG9ydCB7VGltZWxpbmVXaWRnZXRNb2R1bGV9IGZyb20gJy4vd2lkZ2V0L3RpbWVsaW5lLndpZGdldC5tb2R1bGUnO1xuaW1wb3J0IHtNYXRGb3JtaW9Nb2R1bGV9IGZyb20gJ2FuZ3VsYXItbWF0ZXJpYWwtZm9ybWlvJztcbmltcG9ydCB7Rm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7VW5pcXVlSG9zcGl0YWxOdW1WYWxpZGF0b3J9IGZyb20gJy4vY29tcG9uZW50cy91bmlxdWUtaG9zcGl0YWwtbnVtLnZhbGlkYXRvcic7XG5pbXBvcnQge0N1c3RvbUZvcm1zTW9kdWxlfSBmcm9tICduZzItdmFsaWRhdGlvbic7XG5pbXBvcnQge0RldGFpbGVkVGltZWxpbmVDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9kZXRhaWxlZC50aW1lbGluZS5jb21wb25lbnQnO1xuaW1wb3J0IHtTdW1tYXJ5V2lkZ2V0Q29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvc3VtbWFyeS53aWRnZXQuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgUGF0aWVudExpc3RDb21wb25lbnQsXG4gICAgICAgIFBhdGllbnREZXRhaWxzQ29tcG9uZW50LFxuICAgICAgICBQYXRpZW50RWRpdENvbXBvbmVudCxcbiAgICAgICAgV2lkZ2V0Q29udGFpbmVyQ29tcG9uZW50LFxuICAgICAgICBUaW1lbGluZUNvbXBvbmVudCxcbiAgICAgICAgRGV0YWlsZWRUaW1lbGluZUNvbXBvbmVudCxcbiAgICAgICAgU3VtbWFyeVdpZGdldENvbXBvbmVudCxcbiAgICAgICAgVW5pcXVlSG9zcGl0YWxOdW1WYWxpZGF0b3JcbiAgICBdLFxuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBOZ0poaXBzdGVyTW9kdWxlLFxuICAgICAgICBMYW1pc1NoYXJlZE1vZHVsZSxcbiAgICAgICAgSnNvbkZvcm1Nb2R1bGUsXG4gICAgICAgIE1hdEZvcm1pb01vZHVsZSxcbiAgICAgICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgICAgIE1hdEljb25Nb2R1bGUsXG4gICAgICAgIE1hdERpdmlkZXJNb2R1bGUsXG4gICAgICAgIE1hdENhcmRNb2R1bGUsXG4gICAgICAgIE1hdFNlbGVjdE1vZHVsZSxcbiAgICAgICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgICAgICBNYXRDaGVja2JveE1vZHVsZSxcbiAgICAgICAgTWF0VGFic01vZHVsZSxcbiAgICAgICAgUm91dGVyTW9kdWxlLmZvckNoaWxkKFJPVVRFUyksXG4gICAgICAgIE1hdFByb2dyZXNzQmFyTW9kdWxlLFxuICAgICAgICBDb3ZhbGVudE1lc3NhZ2VNb2R1bGUsXG4gICAgICAgIE1hdExpc3RNb2R1bGUsXG4gICAgICAgIE1hdENoaXBzTW9kdWxlLFxuICAgICAgICBDb3JlTW9kdWxlLFxuICAgICAgICBDb3ZhbGVudERpYWxvZ3NNb2R1bGUsXG4gICAgICAgIENvdmFsZW50U2VhcmNoTW9kdWxlLFxuICAgICAgICBOZ2JQYWdpbmF0aW9uTW9kdWxlLFxuICAgICAgICBUaW1lbGluZVdpZGdldE1vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgICAgIE1hdERhdGVGb3JtYXRNb2R1bGUsXG4gICAgICAgIEN1c3RvbUZvcm1zTW9kdWxlLFxuICAgICAgICBNYXRBdXRvY29tcGxldGVNb2R1bGVcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgUGF0aWVudExpc3RDb21wb25lbnQsXG4gICAgICAgIFBhdGllbnREZXRhaWxzQ29tcG9uZW50LFxuICAgICAgICBQYXRpZW50RWRpdENvbXBvbmVudFxuICAgIF0sXG4gICAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgICAgIFdpZGdldENvbnRhaW5lckNvbXBvbmVudCxcbiAgICAgICAgVGltZWxpbmVDb21wb25lbnQsXG4gICAgICAgIFN1bW1hcnlXaWRnZXRDb21wb25lbnRcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICAvL1BhdGllbnRTZXJ2aWNlLFxuICAgICAgICAvL09ic2VydmF0aW9uU2VydmljZSxcbiAgICAgICAgUGF0aWVudFJlc29sdmVcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIFBhdGllbnRNb2R1bGUge1xufVxuIl19