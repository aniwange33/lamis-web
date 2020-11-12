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

var ReportsModule = /** @class */ (function () {
    function ReportsModule() {
    }

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
    return ReportsModule;
}());
export {ReportsModule};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0cy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1yZXBvcnRpbmctMS4wLjAvIiwic291cmNlcyI6WyJsaWIvcmVwb3J0cy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFDSCxlQUFlLEVBQ2YsYUFBYSxFQUNiLGlCQUFpQixFQUNqQixtQkFBbUIsRUFDbkIsZ0JBQWdCLEVBQ2hCLGFBQWEsRUFDYixjQUFjLEVBQ2QsYUFBYSxFQUNiLG9CQUFvQixFQUNwQixlQUFlLEVBQ2YsYUFBYSxFQUNoQixNQUFNLG1CQUFtQixDQUFDO0FBQzNCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN6RSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQzVGLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBaUN0RDtJQUFBO0lBQ0EsQ0FBQztJQURZLGFBQWE7UUEvQnpCLFFBQVEsQ0FBQztZQUNOLFlBQVksRUFBRTtnQkFDVixtQkFBbUI7Z0JBQ25CLHdCQUF3QjthQUMzQjtZQUNELE9BQU8sRUFBRTtnQkFDTCxZQUFZO2dCQUNaLFdBQVc7Z0JBQ1gsY0FBYztnQkFDZCxhQUFhO2dCQUNiLGdCQUFnQjtnQkFDaEIsYUFBYTtnQkFDYixlQUFlO2dCQUNmLGVBQWU7Z0JBQ2YsYUFBYTtnQkFDYixtQkFBbUI7Z0JBQ25CLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO2dCQUM3QixvQkFBb0I7Z0JBQ3BCLGFBQWE7Z0JBQ2IsaUJBQWlCO2dCQUNqQixxQkFBcUI7Z0JBQ3JCLGtCQUFrQjtnQkFDbEIsZ0JBQWdCO2dCQUNoQixtQkFBbUI7YUFDdEI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsbUJBQW1CO2dCQUNuQix3QkFBd0I7YUFDM0I7WUFDRCxTQUFTLEVBQUUsRUFBRTtTQUNoQixDQUFDO09BQ1csYUFBYSxDQUN6QjtJQUFELG9CQUFDO0NBQUEsQUFERCxJQUNDO1NBRFksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICBNYXRDYXJkTW9kdWxlLFxyXG4gICAgTWF0Q2hlY2tib3hNb2R1bGUsXHJcbiAgICBNYXREYXRlcGlja2VyTW9kdWxlLFxyXG4gICAgTWF0RGl2aWRlck1vZHVsZSxcclxuICAgIE1hdEljb25Nb2R1bGUsXHJcbiAgICBNYXRJbnB1dE1vZHVsZSxcclxuICAgIE1hdExpc3RNb2R1bGUsXHJcbiAgICBNYXRQcm9ncmVzc0Jhck1vZHVsZSxcclxuICAgIE1hdFNlbGVjdE1vZHVsZSxcclxuICAgIE1hdFRhYnNNb2R1bGVcclxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEFydFN1bW1hcnlDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvYXJ0LXN1bW1hcnkuY29tcG9uZW50JztcclxuaW1wb3J0IHsgUk9VVEVTIH0gZnJvbSAnLi9zZXJ2aWNlcy9yZXBvcnRzLnJvdXRlJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IERyb3BEb3duTGlzdE1vZHVsZSB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWRyb3Bkb3ducyc7XHJcbmltcG9ydCB7IERhdGVQaWNrZXJNb2R1bGUsIERhdGVSYW5nZVBpY2tlck1vZHVsZSB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWNhbGVuZGFycyc7XHJcbmltcG9ydCB7IFBhdGllbnRMaW5lTGlzdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9wYXRpZW50LWxpbmUtbGlzdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNYXREYXRlRm9ybWF0TW9kdWxlIH0gZnJvbSAnQGxhbWlzL3dlYi1jb3JlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICBBcnRTdW1tYXJ5Q29tcG9uZW50LFxyXG4gICAgICAgIFBhdGllbnRMaW5lTGlzdENvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBDb21tb25Nb2R1bGUsXHJcbiAgICAgICAgRm9ybXNNb2R1bGUsXHJcbiAgICAgICAgTWF0SW5wdXRNb2R1bGUsXHJcbiAgICAgICAgTWF0SWNvbk1vZHVsZSxcclxuICAgICAgICBNYXREaXZpZGVyTW9kdWxlLFxyXG4gICAgICAgIE1hdENhcmRNb2R1bGUsXHJcbiAgICAgICAgTWF0U2VsZWN0TW9kdWxlLFxyXG4gICAgICAgIE1hdEJ1dHRvbk1vZHVsZSxcclxuICAgICAgICBNYXRUYWJzTW9kdWxlLFxyXG4gICAgICAgIE1hdERhdGVwaWNrZXJNb2R1bGUsXHJcbiAgICAgICAgUm91dGVyTW9kdWxlLmZvckNoaWxkKFJPVVRFUyksXHJcbiAgICAgICAgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXHJcbiAgICAgICAgTWF0TGlzdE1vZHVsZSxcclxuICAgICAgICBNYXRDaGVja2JveE1vZHVsZSxcclxuICAgICAgICBEYXRlUmFuZ2VQaWNrZXJNb2R1bGUsXHJcbiAgICAgICAgRHJvcERvd25MaXN0TW9kdWxlLFxyXG4gICAgICAgIERhdGVQaWNrZXJNb2R1bGUsXHJcbiAgICAgICAgTWF0RGF0ZUZvcm1hdE1vZHVsZVxyXG4gICAgXSxcclxuICAgIGV4cG9ydHM6IFtcclxuICAgICAgICBBcnRTdW1tYXJ5Q29tcG9uZW50LFxyXG4gICAgICAgIFBhdGllbnRMaW5lTGlzdENvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIHByb3ZpZGVyczogW11cclxufSlcclxuZXhwb3J0IGNsYXNzIFJlcG9ydHNNb2R1bGUge1xyXG59XHJcbiJdfQ==
