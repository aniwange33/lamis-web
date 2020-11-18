import * as tslib_1 from "tslib";
import { RouterModule } from '@angular/router';
import { PrepConverterComponent } from './components/prep/prep-converter.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePickerModule, DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatDividerModule, MatIconModule, MatInputModule, MatListModule, MatProgressBarModule, MatSelectModule, MatTabsModule } from '@angular/material';
const ɵ0 = {
    breadcrumb: 'PREP CONVERTER',
    title: 'PrEP Converter'
}, ɵ1 = {
    breadcrumb: 'PREP CONVERTER',
    title: 'PrEP Converter'
};
export const PREP_ROUTES = [
    {
        path: '',
        data: ɵ0,
        children: [
            {
                path: '',
                component: PrepConverterComponent,
                data: ɵ1,
            }
        ]
    }
];
let PrepModule = class PrepModule {
};
PrepModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            PrepConverterComponent
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
            RouterModule.forChild(PREP_ROUTES),
            MatProgressBarModule,
            MatListModule,
            MatCheckboxModule,
            DateRangePickerModule,
            DropDownListModule,
            DatePickerModule,
        ]
    })
], PrepModule);
export { PrepModule };
export { ɵ0, ɵ1 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlcC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9yYWRldC0xLjQuMC8iLCJzb3VyY2VzIjpbImxpYi9wcmVwLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFlBQVksRUFBUyxNQUFNLGlCQUFpQixDQUFDO0FBQ3JELE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLDRDQUE0QyxDQUFDO0FBQ2xGLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUscUJBQXFCLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUMxRixPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUNyRSxPQUFPLEVBQ0gsZUFBZSxFQUNmLGFBQWEsRUFDYixpQkFBaUIsRUFDakIsZ0JBQWdCLEVBQ2hCLGFBQWEsRUFDYixjQUFjLEVBQ2QsYUFBYSxFQUNiLG9CQUFvQixFQUNwQixlQUFlLEVBQ2YsYUFBYSxFQUNoQixNQUFNLG1CQUFtQixDQUFDO1dBS2I7SUFDRixVQUFVLEVBQUUsZ0JBQWdCO0lBQzVCLEtBQUssRUFBRSxnQkFBZ0I7Q0FDMUIsT0FLYTtJQUNGLFVBQVUsRUFBRSxnQkFBZ0I7SUFDNUIsS0FBSyxFQUFFLGdCQUFnQjtDQUMxQjtBQWRqQixNQUFNLENBQUMsTUFBTSxXQUFXLEdBQVc7SUFDL0I7UUFDSSxJQUFJLEVBQUUsRUFBRTtRQUNSLElBQUksSUFHSDtRQUNELFFBQVEsRUFBRTtZQUNOO2dCQUNJLElBQUksRUFBRSxFQUFFO2dCQUNSLFNBQVMsRUFBRSxzQkFBc0I7Z0JBQ2pDLElBQUksSUFHSDthQUNKO1NBQ0o7S0FDSjtDQUNKLENBQUM7QUF5QkYsSUFBYSxVQUFVLEdBQXZCLE1BQWEsVUFBVTtDQUV0QixDQUFBO0FBRlksVUFBVTtJQXZCdEIsUUFBUSxDQUFDO1FBQ04sWUFBWSxFQUFFO1lBQ1Ysc0JBQXNCO1NBQ3pCO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsWUFBWTtZQUNaLFdBQVc7WUFDWCxjQUFjO1lBQ2QsYUFBYTtZQUNiLGdCQUFnQjtZQUNoQixhQUFhO1lBQ2IsZUFBZTtZQUNmLGVBQWU7WUFDZixhQUFhO1lBQ2IsWUFBWSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUM7WUFDbEMsb0JBQW9CO1lBQ3BCLGFBQWE7WUFDYixpQkFBaUI7WUFDakIscUJBQXFCO1lBQ3JCLGtCQUFrQjtZQUNsQixnQkFBZ0I7U0FDbkI7S0FDSixDQUFDO0dBQ1csVUFBVSxDQUV0QjtTQUZZLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1JvdXRlck1vZHVsZSwgUm91dGVzfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtQcmVwQ29udmVydGVyQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvcHJlcC9wcmVwLWNvbnZlcnRlci5jb21wb25lbnQnO1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7Rm9ybXNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7RGF0ZVBpY2tlck1vZHVsZSwgRGF0ZVJhbmdlUGlja2VyTW9kdWxlfSBmcm9tICdAc3luY2Z1c2lvbi9lajItYW5ndWxhci1jYWxlbmRhcnMnO1xuaW1wb3J0IHtEcm9wRG93bkxpc3RNb2R1bGV9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWRyb3Bkb3ducyc7XG5pbXBvcnQge1xuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXRDYXJkTW9kdWxlLFxuICAgIE1hdENoZWNrYm94TW9kdWxlLFxuICAgIE1hdERpdmlkZXJNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBNYXRMaXN0TW9kdWxlLFxuICAgIE1hdFByb2dyZXNzQmFyTW9kdWxlLFxuICAgIE1hdFNlbGVjdE1vZHVsZSxcbiAgICBNYXRUYWJzTW9kdWxlXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuZXhwb3J0IGNvbnN0IFBSRVBfUk9VVEVTOiBSb3V0ZXMgPSBbXG4gICAge1xuICAgICAgICBwYXRoOiAnJyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgYnJlYWRjcnVtYjogJ1BSRVAgQ09OVkVSVEVSJyxcbiAgICAgICAgICAgIHRpdGxlOiAnUHJFUCBDb252ZXJ0ZXInXG4gICAgICAgIH0sXG4gICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcGF0aDogJycsXG4gICAgICAgICAgICAgICAgY29tcG9uZW50OiBQcmVwQ29udmVydGVyQ29tcG9uZW50LFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWRjcnVtYjogJ1BSRVAgQ09OVkVSVEVSJyxcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdQckVQIENvbnZlcnRlcidcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfVxuXTtcblxuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgUHJlcENvbnZlcnRlckNvbXBvbmVudFxuICAgIF0sXG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICAgICAgTWF0SWNvbk1vZHVsZSxcbiAgICAgICAgTWF0RGl2aWRlck1vZHVsZSxcbiAgICAgICAgTWF0Q2FyZE1vZHVsZSxcbiAgICAgICAgTWF0U2VsZWN0TW9kdWxlLFxuICAgICAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgICAgIE1hdFRhYnNNb2R1bGUsXG4gICAgICAgIFJvdXRlck1vZHVsZS5mb3JDaGlsZChQUkVQX1JPVVRFUyksXG4gICAgICAgIE1hdFByb2dyZXNzQmFyTW9kdWxlLFxuICAgICAgICBNYXRMaXN0TW9kdWxlLFxuICAgICAgICBNYXRDaGVja2JveE1vZHVsZSxcbiAgICAgICAgRGF0ZVJhbmdlUGlja2VyTW9kdWxlLFxuICAgICAgICBEcm9wRG93bkxpc3RNb2R1bGUsXG4gICAgICAgIERhdGVQaWNrZXJNb2R1bGUsXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBQcmVwTW9kdWxlIHtcblxufVxuIl19