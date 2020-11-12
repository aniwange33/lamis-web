import * as tslib_1 from "tslib";
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatSelectModule,
    MatTabsModule
} from '@angular/material';
import {RouterModule} from '@angular/router';
import {ArtSummaryComponent} from './components/art-summary.component';
import {ROUTES} from './services/reports.route';
import {FormsModule} from '@angular/forms';
import {DropDownListModule} from '@syncfusion/ej2-angular-dropdowns';
import {DatePickerModule, DateRangePickerModule} from '@syncfusion/ej2-angular-calendars';
import {PatientLineListComponent} from './components/patient-line-list.component';
import {MatDateFormatModule} from '@lamis/web-core';

let ReportsModule = class ReportsModule {
};
ReportsModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            ArtSummaryComponent,
            PatientLineListComponent
        ],
        imports: [
            CommonModule,
            FormsModule,
            MatInputModule,
            MatIconModule,
            MatDividerModule,
            MatCardModule,
            MatSelectModule,
            MatButtonModule,
            MatTabsModule,
            MatDatepickerModule,
            RouterModule.forChild(ROUTES),
            MatProgressBarModule,
            MatListModule,
            MatCheckboxModule,
            DateRangePickerModule,
            DropDownListModule,
            DatePickerModule,
            MatDateFormatModule
        ],
        exports: [
            ArtSummaryComponent,
            PatientLineListComponent
        ],
        providers: []
    })
], ReportsModule);
export {ReportsModule};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0cy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1yZXBvcnRpbmctMS4wLjAvIiwic291cmNlcyI6WyJsaWIvcmVwb3J0cy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFDSCxlQUFlLEVBQ2YsYUFBYSxFQUNiLGlCQUFpQixFQUNqQixtQkFBbUIsRUFDbkIsZ0JBQWdCLEVBQ2hCLGFBQWEsRUFDYixjQUFjLEVBQ2QsYUFBYSxFQUNiLG9CQUFvQixFQUNwQixlQUFlLEVBQ2YsYUFBYSxFQUNoQixNQUFNLG1CQUFtQixDQUFDO0FBQzNCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN6RSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQzVGLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBaUN0RCxJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFhO0NBQ3pCLENBQUE7QUFEWSxhQUFhO0lBL0J6QixRQUFRLENBQUM7UUFDTixZQUFZLEVBQUU7WUFDVixtQkFBbUI7WUFDbkIsd0JBQXdCO1NBQzNCO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsWUFBWTtZQUNaLFdBQVc7WUFDWCxjQUFjO1lBQ2QsYUFBYTtZQUNiLGdCQUFnQjtZQUNoQixhQUFhO1lBQ2IsZUFBZTtZQUNmLGVBQWU7WUFDZixhQUFhO1lBQ2IsbUJBQW1CO1lBQ25CLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1lBQzdCLG9CQUFvQjtZQUNwQixhQUFhO1lBQ2IsaUJBQWlCO1lBQ2pCLHFCQUFxQjtZQUNyQixrQkFBa0I7WUFDbEIsZ0JBQWdCO1lBQ2hCLG1CQUFtQjtTQUN0QjtRQUNELE9BQU8sRUFBRTtZQUNMLG1CQUFtQjtZQUNuQix3QkFBd0I7U0FDM0I7UUFDRCxTQUFTLEVBQUUsRUFBRTtLQUNoQixDQUFDO0dBQ1csYUFBYSxDQUN6QjtTQURZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gICAgTWF0Q2FyZE1vZHVsZSxcclxuICAgIE1hdENoZWNrYm94TW9kdWxlLFxyXG4gICAgTWF0RGF0ZXBpY2tlck1vZHVsZSxcclxuICAgIE1hdERpdmlkZXJNb2R1bGUsXHJcbiAgICBNYXRJY29uTW9kdWxlLFxyXG4gICAgTWF0SW5wdXRNb2R1bGUsXHJcbiAgICBNYXRMaXN0TW9kdWxlLFxyXG4gICAgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXHJcbiAgICBNYXRTZWxlY3RNb2R1bGUsXHJcbiAgICBNYXRUYWJzTW9kdWxlXHJcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBBcnRTdW1tYXJ5Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2FydC1zdW1tYXJ5LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFJPVVRFUyB9IGZyb20gJy4vc2VydmljZXMvcmVwb3J0cy5yb3V0ZSc7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBEcm9wRG93bkxpc3RNb2R1bGUgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1kcm9wZG93bnMnO1xyXG5pbXBvcnQgeyBEYXRlUGlja2VyTW9kdWxlLCBEYXRlUmFuZ2VQaWNrZXJNb2R1bGUgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1jYWxlbmRhcnMnO1xyXG5pbXBvcnQgeyBQYXRpZW50TGluZUxpc3RDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvcGF0aWVudC1saW5lLWxpc3QuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTWF0RGF0ZUZvcm1hdE1vZHVsZSB9IGZyb20gJ0BsYW1pcy93ZWItY29yZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgQXJ0U3VtbWFyeUNvbXBvbmVudCxcclxuICAgICAgICBQYXRpZW50TGluZUxpc3RDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgICAgIE1hdElucHV0TW9kdWxlLFxyXG4gICAgICAgIE1hdEljb25Nb2R1bGUsXHJcbiAgICAgICAgTWF0RGl2aWRlck1vZHVsZSxcclxuICAgICAgICBNYXRDYXJkTW9kdWxlLFxyXG4gICAgICAgIE1hdFNlbGVjdE1vZHVsZSxcclxuICAgICAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICAgICAgTWF0VGFic01vZHVsZSxcclxuICAgICAgICBNYXREYXRlcGlja2VyTW9kdWxlLFxyXG4gICAgICAgIFJvdXRlck1vZHVsZS5mb3JDaGlsZChST1VURVMpLFxyXG4gICAgICAgIE1hdFByb2dyZXNzQmFyTW9kdWxlLFxyXG4gICAgICAgIE1hdExpc3RNb2R1bGUsXHJcbiAgICAgICAgTWF0Q2hlY2tib3hNb2R1bGUsXHJcbiAgICAgICAgRGF0ZVJhbmdlUGlja2VyTW9kdWxlLFxyXG4gICAgICAgIERyb3BEb3duTGlzdE1vZHVsZSxcclxuICAgICAgICBEYXRlUGlja2VyTW9kdWxlLFxyXG4gICAgICAgIE1hdERhdGVGb3JtYXRNb2R1bGVcclxuICAgIF0sXHJcbiAgICBleHBvcnRzOiBbXHJcbiAgICAgICAgQXJ0U3VtbWFyeUNvbXBvbmVudCxcclxuICAgICAgICBQYXRpZW50TGluZUxpc3RDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBwcm92aWRlcnM6IFtdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBSZXBvcnRzTW9kdWxlIHtcclxufVxyXG4iXX0=
