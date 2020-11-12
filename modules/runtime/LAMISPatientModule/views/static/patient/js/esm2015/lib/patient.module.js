import * as tslib_1 from "tslib";
import {CoreModule} from '@alfresco/adf-core';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatSelectModule,
    MatTabsModule
} from '@angular/material';
import {RouterModule} from '@angular/router';
import {CovalentDialogsModule, CovalentMessageModule, CovalentSearchModule} from '@covalent/core';
import {JsonFormModule, LamisSharedModule, MatDateFormatModule} from '@lamis/web-core';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {NgJhipsterModule} from 'ng-jhipster';
import {PatientDetailsComponent} from './components/patient-details.component';
import {PatientEditComponent} from './components/patient-edit.component';
import {PatientListComponent} from './components/patient-list.component';
import {PatientResolve, ROUTES} from './services/patient.route';
import {WidgetContainerComponent} from './components/widget-container.component';
import {TimelineComponent} from './components/timeline.component';
import {TimelineWidgetModule} from './widget/timeline.widget.module';
import {MatFormioModule} from 'angular-material-formio';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UniqueHospitalNumValidator} from './components/unique-hospital-num.validator';
import {CustomFormsModule} from 'ng2-validation';
import {DetailedTimelineComponent} from './components/detailed.timeline.component';
import {SummaryWidgetComponent} from './components/summary.widget.component';

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
export {PatientModule};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aWVudC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1wYXRpZW50LTEuMi4wLyIsInNvdXJjZXMiOlsibGliL3BhdGllbnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDaEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUNILGVBQWUsRUFDZixhQUFhLEVBQ2IsaUJBQWlCLEVBQ2pCLGNBQWMsRUFDZCxnQkFBZ0IsRUFDaEIsYUFBYSxFQUNiLGNBQWMsRUFDZCxhQUFhLEVBQ2Isb0JBQW9CLEVBQ3BCLGVBQWUsRUFDZixhQUFhLEVBQ2hCLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxxQkFBcUIsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3BHLE9BQU8sRUFBRSxjQUFjLEVBQUUsaUJBQWlCLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDL0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDakYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDM0UsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDM0UsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNuRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUV2RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ3JGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBMEQvRSxJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFhO0NBQ3pCLENBQUE7QUFEWSxhQUFhO0lBeER6QixRQUFRLENBQUM7UUFDTixZQUFZLEVBQUU7WUFDVixvQkFBb0I7WUFDcEIsdUJBQXVCO1lBQ3ZCLG9CQUFvQjtZQUNwQix3QkFBd0I7WUFDeEIsaUJBQWlCO1lBQ2pCLHlCQUF5QjtZQUN6QixzQkFBc0I7WUFDdEIsMEJBQTBCO1NBQzdCO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsWUFBWTtZQUNaLGdCQUFnQjtZQUNoQixpQkFBaUI7WUFDakIsY0FBYztZQUNkLGVBQWU7WUFDZixjQUFjO1lBQ2QsYUFBYTtZQUNiLGdCQUFnQjtZQUNoQixhQUFhO1lBQ2IsZUFBZTtZQUNmLGVBQWU7WUFDZixpQkFBaUI7WUFDakIsYUFBYTtZQUNiLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1lBQzdCLG9CQUFvQjtZQUNwQixxQkFBcUI7WUFDckIsYUFBYTtZQUNiLGNBQWM7WUFDZCxVQUFVO1lBQ1YscUJBQXFCO1lBQ3JCLG9CQUFvQjtZQUNwQixtQkFBbUI7WUFDbkIsb0JBQW9CO1lBQ3BCLFdBQVc7WUFDWCxtQkFBbUI7WUFDbkIsbUJBQW1CO1lBQ25CLGlCQUFpQjtTQUNwQjtRQUNELE9BQU8sRUFBRTtZQUNMLG9CQUFvQjtZQUNwQix1QkFBdUI7WUFDdkIsb0JBQW9CO1NBQ3ZCO1FBQ0QsZUFBZSxFQUFFO1lBQ2Isd0JBQXdCO1lBQ3hCLGlCQUFpQjtZQUNqQixzQkFBc0I7U0FDekI7UUFDRCxTQUFTLEVBQUU7WUFDUCxpQkFBaUI7WUFDakIscUJBQXFCO1lBQ3JCLGNBQWM7U0FDakI7S0FDSixDQUFDO0dBQ1csYUFBYSxDQUN6QjtTQURZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb3JlTW9kdWxlIH0gZnJvbSAnQGFsZnJlc2NvL2FkZi1jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtcclxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcclxuICAgIE1hdENhcmRNb2R1bGUsXHJcbiAgICBNYXRDaGVja2JveE1vZHVsZSxcclxuICAgIE1hdENoaXBzTW9kdWxlLFxyXG4gICAgTWF0RGl2aWRlck1vZHVsZSxcclxuICAgIE1hdEljb25Nb2R1bGUsXHJcbiAgICBNYXRJbnB1dE1vZHVsZSxcclxuICAgIE1hdExpc3RNb2R1bGUsXHJcbiAgICBNYXRQcm9ncmVzc0Jhck1vZHVsZSxcclxuICAgIE1hdFNlbGVjdE1vZHVsZSxcclxuICAgIE1hdFRhYnNNb2R1bGVcclxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IENvdmFsZW50RGlhbG9nc01vZHVsZSwgQ292YWxlbnRNZXNzYWdlTW9kdWxlLCBDb3ZhbGVudFNlYXJjaE1vZHVsZSB9IGZyb20gJ0Bjb3ZhbGVudC9jb3JlJztcclxuaW1wb3J0IHsgSnNvbkZvcm1Nb2R1bGUsIExhbWlzU2hhcmVkTW9kdWxlLCBNYXREYXRlRm9ybWF0TW9kdWxlIH0gZnJvbSAnQGxhbWlzL3dlYi1jb3JlJztcclxuaW1wb3J0IHsgTmdiUGFnaW5hdGlvbk1vZHVsZSB9IGZyb20gJ0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwJztcclxuaW1wb3J0IHsgTmdKaGlwc3Rlck1vZHVsZSB9IGZyb20gJ25nLWpoaXBzdGVyJztcclxuaW1wb3J0IHsgUGF0aWVudERldGFpbHNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvcGF0aWVudC1kZXRhaWxzLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFBhdGllbnRFZGl0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3BhdGllbnQtZWRpdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBQYXRpZW50TGlzdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9wYXRpZW50LWxpc3QuY29tcG9uZW50JztcclxuaW1wb3J0IHsgUGF0aWVudFJlc29sdmUsIFJPVVRFUyB9IGZyb20gJy4vc2VydmljZXMvcGF0aWVudC5yb3V0ZSc7XHJcbmltcG9ydCB7IFdpZGdldENvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy93aWRnZXQtY29udGFpbmVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFRpbWVsaW5lQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3RpbWVsaW5lLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFRpbWVsaW5lV2lkZ2V0TW9kdWxlIH0gZnJvbSAnLi93aWRnZXQvdGltZWxpbmUud2lkZ2V0Lm1vZHVsZSc7XHJcbmltcG9ydCB7IE9ic2VydmF0aW9uU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvb2JzZXJ2YXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IE1hdEZvcm1pb01vZHVsZSB9IGZyb20gJ2FuZ3VsYXItbWF0ZXJpYWwtZm9ybWlvJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IFVuaXF1ZUhvc3BpdGFsTnVtVmFsaWRhdG9yIH0gZnJvbSAnLi9jb21wb25lbnRzL3VuaXF1ZS1ob3NwaXRhbC1udW0udmFsaWRhdG9yJztcclxuaW1wb3J0IHsgQ3VzdG9tRm9ybXNNb2R1bGUgfSBmcm9tICduZzItdmFsaWRhdGlvbic7XHJcbmltcG9ydCB7IERldGFpbGVkVGltZWxpbmVDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZGV0YWlsZWQudGltZWxpbmUuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU3VtbWFyeVdpZGdldENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9zdW1tYXJ5LndpZGdldC5jb21wb25lbnQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIFBhdGllbnRMaXN0Q29tcG9uZW50LFxyXG4gICAgICAgIFBhdGllbnREZXRhaWxzQ29tcG9uZW50LFxyXG4gICAgICAgIFBhdGllbnRFZGl0Q29tcG9uZW50LFxyXG4gICAgICAgIFdpZGdldENvbnRhaW5lckNvbXBvbmVudCxcclxuICAgICAgICBUaW1lbGluZUNvbXBvbmVudCxcclxuICAgICAgICBEZXRhaWxlZFRpbWVsaW5lQ29tcG9uZW50LFxyXG4gICAgICAgIFN1bW1hcnlXaWRnZXRDb21wb25lbnQsXHJcbiAgICAgICAgVW5pcXVlSG9zcGl0YWxOdW1WYWxpZGF0b3JcclxuICAgIF0sXHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgICAgIE5nSmhpcHN0ZXJNb2R1bGUsXHJcbiAgICAgICAgTGFtaXNTaGFyZWRNb2R1bGUsXHJcbiAgICAgICAgSnNvbkZvcm1Nb2R1bGUsXHJcbiAgICAgICAgTWF0Rm9ybWlvTW9kdWxlLFxyXG4gICAgICAgIE1hdElucHV0TW9kdWxlLFxyXG4gICAgICAgIE1hdEljb25Nb2R1bGUsXHJcbiAgICAgICAgTWF0RGl2aWRlck1vZHVsZSxcclxuICAgICAgICBNYXRDYXJkTW9kdWxlLFxyXG4gICAgICAgIE1hdFNlbGVjdE1vZHVsZSxcclxuICAgICAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICAgICAgTWF0Q2hlY2tib3hNb2R1bGUsXHJcbiAgICAgICAgTWF0VGFic01vZHVsZSxcclxuICAgICAgICBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQoUk9VVEVTKSxcclxuICAgICAgICBNYXRQcm9ncmVzc0Jhck1vZHVsZSxcclxuICAgICAgICBDb3ZhbGVudE1lc3NhZ2VNb2R1bGUsXHJcbiAgICAgICAgTWF0TGlzdE1vZHVsZSxcclxuICAgICAgICBNYXRDaGlwc01vZHVsZSxcclxuICAgICAgICBDb3JlTW9kdWxlLFxyXG4gICAgICAgIENvdmFsZW50RGlhbG9nc01vZHVsZSxcclxuICAgICAgICBDb3ZhbGVudFNlYXJjaE1vZHVsZSxcclxuICAgICAgICBOZ2JQYWdpbmF0aW9uTW9kdWxlLFxyXG4gICAgICAgIFRpbWVsaW5lV2lkZ2V0TW9kdWxlLFxyXG4gICAgICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgICAgICAgTWF0RGF0ZUZvcm1hdE1vZHVsZSxcclxuICAgICAgICBDdXN0b21Gb3Jtc01vZHVsZSxcclxuICAgIF0sXHJcbiAgICBleHBvcnRzOiBbXHJcbiAgICAgICAgUGF0aWVudExpc3RDb21wb25lbnQsXHJcbiAgICAgICAgUGF0aWVudERldGFpbHNDb21wb25lbnQsXHJcbiAgICAgICAgUGF0aWVudEVkaXRDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtcclxuICAgICAgICBXaWRnZXRDb250YWluZXJDb21wb25lbnQsXHJcbiAgICAgICAgVGltZWxpbmVDb21wb25lbnQsXHJcbiAgICAgICAgU3VtbWFyeVdpZGdldENvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIC8vUGF0aWVudFNlcnZpY2UsXHJcbiAgICAgICAgLy9PYnNlcnZhdGlvblNlcnZpY2UsXHJcbiAgICAgICAgUGF0aWVudFJlc29sdmVcclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFBhdGllbnRNb2R1bGUge1xyXG59XHJcbiJdfQ==
