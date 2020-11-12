import * as tslib_1 from "tslib";
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatSelectModule,
    MatTabsModule
} from '@angular/material';
import {RouterModule} from '@angular/router';
import {RadetConverterComponent} from './components/radet-converter.component';
import {RadetConverterService} from './services/radet-converter.service';
import {ROUTES} from './services/radet.route';
import {FormsModule} from '@angular/forms';
import {DropDownListModule} from '@syncfusion/ej2-angular-dropdowns';
import {DatePickerModule, DateRangePickerModule} from '@syncfusion/ej2-angular-calendars';

let RadetModule = class RadetModule {
};
RadetModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            RadetConverterComponent
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
            RouterModule.forChild(ROUTES),
            MatProgressBarModule,
            MatListModule,
            MatCheckboxModule,
            DateRangePickerModule,
            DropDownListModule,
            DatePickerModule,
        ],
        exports: [
            RadetConverterComponent
        ],
        providers: [
            RadetConverterService
        ]
    })
], RadetModule);
export {RadetModule};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkZXQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcmFkZXQtMS4xLjAvIiwic291cmNlcyI6WyJsaWIvcmFkZXQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQ0gsZUFBZSxFQUNmLGFBQWEsRUFDYixpQkFBaUIsRUFDakIsZ0JBQWdCLEVBQ2hCLGFBQWEsRUFDYixjQUFjLEVBQ2QsYUFBYSxFQUNiLG9CQUFvQixFQUNwQixlQUFlLEVBQ2YsYUFBYSxFQUNoQixNQUFNLG1CQUFtQixDQUFDO0FBQzNCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNqRixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBK0I1RixJQUFhLFdBQVcsR0FBeEIsTUFBYSxXQUFXO0NBQ3ZCLENBQUE7QUFEWSxXQUFXO0lBN0J2QixRQUFRLENBQUM7UUFDTixZQUFZLEVBQUU7WUFDVix1QkFBdUI7U0FDMUI7UUFDRCxPQUFPLEVBQUU7WUFDTCxZQUFZO1lBQ1osV0FBVztZQUNYLGNBQWM7WUFDZCxhQUFhO1lBQ2IsZ0JBQWdCO1lBQ2hCLGFBQWE7WUFDYixlQUFlO1lBQ2YsZUFBZTtZQUNmLGFBQWE7WUFDYixZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztZQUM3QixvQkFBb0I7WUFDcEIsYUFBYTtZQUNiLGlCQUFpQjtZQUNqQixxQkFBcUI7WUFDckIsa0JBQWtCO1lBQ2xCLGdCQUFnQjtTQUNuQjtRQUNELE9BQU8sRUFBRTtZQUNMLHVCQUF1QjtTQUMxQjtRQUNELFNBQVMsRUFBRTtZQUNQLHFCQUFxQjtTQUN4QjtLQUNKLENBQUM7R0FDVyxXQUFXLENBQ3ZCO1NBRFksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICBNYXRDYXJkTW9kdWxlLFxyXG4gICAgTWF0Q2hlY2tib3hNb2R1bGUsXHJcbiAgICBNYXREaXZpZGVyTW9kdWxlLFxyXG4gICAgTWF0SWNvbk1vZHVsZSxcclxuICAgIE1hdElucHV0TW9kdWxlLFxyXG4gICAgTWF0TGlzdE1vZHVsZSxcclxuICAgIE1hdFByb2dyZXNzQmFyTW9kdWxlLFxyXG4gICAgTWF0U2VsZWN0TW9kdWxlLFxyXG4gICAgTWF0VGFic01vZHVsZVxyXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgUmFkZXRDb252ZXJ0ZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvcmFkZXQtY29udmVydGVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFJhZGV0Q29udmVydGVyU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvcmFkZXQtY29udmVydGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBST1VURVMgfSBmcm9tICcuL3NlcnZpY2VzL3JhZGV0LnJvdXRlJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IERyb3BEb3duTGlzdE1vZHVsZSB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWRyb3Bkb3ducyc7XHJcbmltcG9ydCB7IERhdGVQaWNrZXJNb2R1bGUsIERhdGVSYW5nZVBpY2tlck1vZHVsZSB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWNhbGVuZGFycyc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgUmFkZXRDb252ZXJ0ZXJDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgICAgIE1hdElucHV0TW9kdWxlLFxyXG4gICAgICAgIE1hdEljb25Nb2R1bGUsXHJcbiAgICAgICAgTWF0RGl2aWRlck1vZHVsZSxcclxuICAgICAgICBNYXRDYXJkTW9kdWxlLFxyXG4gICAgICAgIE1hdFNlbGVjdE1vZHVsZSxcclxuICAgICAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICAgICAgTWF0VGFic01vZHVsZSxcclxuICAgICAgICBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQoUk9VVEVTKSxcclxuICAgICAgICBNYXRQcm9ncmVzc0Jhck1vZHVsZSxcclxuICAgICAgICBNYXRMaXN0TW9kdWxlLFxyXG4gICAgICAgIE1hdENoZWNrYm94TW9kdWxlLFxyXG4gICAgICAgIERhdGVSYW5nZVBpY2tlck1vZHVsZSxcclxuICAgICAgICBEcm9wRG93bkxpc3RNb2R1bGUsXHJcbiAgICAgICAgRGF0ZVBpY2tlck1vZHVsZSxcclxuICAgIF0sXHJcbiAgICBleHBvcnRzOiBbXHJcbiAgICAgICAgUmFkZXRDb252ZXJ0ZXJDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICBSYWRldENvbnZlcnRlclNlcnZpY2VcclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFJhZGV0TW9kdWxlIHtcclxufVxyXG4iXX0=
