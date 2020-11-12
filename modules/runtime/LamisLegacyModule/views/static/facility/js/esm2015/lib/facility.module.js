import * as tslib_1 from "tslib";
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule
} from '@angular/material';
import {RouterModule} from '@angular/router';
import {FacilityComponent} from './components/facility.component';
import {ROUTES} from './services/facility.routes';
import {FormsModule} from '@angular/forms';

let FacilityModule = class FacilityModule {
};
FacilityModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            FacilityComponent
        ],
        imports: [
            CommonModule,
            MatInputModule,
            MatIconModule,
            MatDividerModule,
            MatCardModule,
            MatSelectModule,
            MatButtonModule,
            FormsModule,
            RouterModule.forChild(ROUTES)
        ],
        exports: [
            FacilityComponent
        ],
        entryComponents: [],
        providers: []
    })
], FacilityModule);
export {FacilityModule};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjaWxpdHkubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGFtaXMtZmFjaWxpdHkvIiwic291cmNlcyI6WyJsaWIvZmFjaWxpdHkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQ0gsZUFBZSxFQUNmLGFBQWEsRUFDYixnQkFBZ0IsRUFDaEIsYUFBYSxFQUNiLGNBQWMsRUFDZCxlQUFlLEVBQ2xCLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUEwQjdDLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7Q0FDMUIsQ0FBQTtBQURZLGNBQWM7SUF2QjFCLFFBQVEsQ0FBQztRQUNOLFlBQVksRUFBRTtZQUNWLGlCQUFpQjtTQUNwQjtRQUNELE9BQU8sRUFBRTtZQUNMLFlBQVk7WUFDWixjQUFjO1lBQ2QsYUFBYTtZQUNiLGdCQUFnQjtZQUNoQixhQUFhO1lBQ2IsZUFBZTtZQUNmLGVBQWU7WUFDZixXQUFXO1lBQ1gsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7U0FDaEM7UUFDRCxPQUFPLEVBQUU7WUFDTCxpQkFBaUI7U0FDcEI7UUFDRCxlQUFlLEVBQUUsRUFDaEI7UUFDRCxTQUFTLEVBQUUsRUFDVjtLQUNKLENBQUM7R0FDVyxjQUFjLENBQzFCO1NBRFksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICBNYXRDYXJkTW9kdWxlLFxyXG4gICAgTWF0RGl2aWRlck1vZHVsZSxcclxuICAgIE1hdEljb25Nb2R1bGUsXHJcbiAgICBNYXRJbnB1dE1vZHVsZSxcclxuICAgIE1hdFNlbGVjdE1vZHVsZVxyXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgRmFjaWxpdHlDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZmFjaWxpdHkuY29tcG9uZW50JztcclxuaW1wb3J0IHsgUk9VVEVTIH0gZnJvbSAnLi9zZXJ2aWNlcy9mYWNpbGl0eS5yb3V0ZXMnO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgRmFjaWxpdHlDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgICAgIE1hdElucHV0TW9kdWxlLFxyXG4gICAgICAgIE1hdEljb25Nb2R1bGUsXHJcbiAgICAgICAgTWF0RGl2aWRlck1vZHVsZSxcclxuICAgICAgICBNYXRDYXJkTW9kdWxlLFxyXG4gICAgICAgIE1hdFNlbGVjdE1vZHVsZSxcclxuICAgICAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICAgICAgRm9ybXNNb2R1bGUsXHJcbiAgICAgICAgUm91dGVyTW9kdWxlLmZvckNoaWxkKFJPVVRFUylcclxuICAgIF0sXHJcbiAgICBleHBvcnRzOiBbXHJcbiAgICAgICAgRmFjaWxpdHlDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtcclxuICAgIF0sXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEZhY2lsaXR5TW9kdWxlIHtcclxufVxyXG4iXX0=
