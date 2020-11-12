import * as tslib_1 from "tslib";
import {NgModule} from '@angular/core';
import {DevolveDetailsComponent} from './components/devolve.details.component';
import {DevolveEditComponent} from './components/devolve.edit.component';
import {CoreModule} from '@alfresco/adf-core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CustomFormsModule} from 'ng2-validation';
import {MatDateFormatModule} from '@lamis/web-core';
import {MatButtonModule, MatCardModule, MatDatepickerModule, MatInputModule, MatSelectModule} from '@angular/material';
import {DevolveResolve, ROUTES} from './services/devolve.route';
import {RouterModule} from '@angular/router';
import {CovalentCommonModule, CovalentDialogsModule} from '@covalent/core';
import {EndDevolveComponent} from './components/end.devolve.component';

var DevolveModule = /** @class */ (function () {
    function DevolveModule() {
    }

    DevolveModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                RouterModule.forChild(ROUTES),
                ReactiveFormsModule,
                CustomFormsModule,
                CoreModule,
                MatDatepickerModule,
                MatDateFormatModule,
                MatInputModule,
                MatButtonModule,
                MatCardModule,
                MatSelectModule,
                CovalentCommonModule,
                CovalentDialogsModule
            ],
            declarations: [
                DevolveDetailsComponent,
                DevolveEditComponent,
                EndDevolveComponent
            ],
            providers: [
                DevolveResolve
            ]
        })
    ], DevolveModule);
    return DevolveModule;
}());
export {DevolveModule};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2b2x2ZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1waGFybWFjeS0xLjEuNC8iLCJzb3VyY2VzIjpbImxpYi9kZXZvbHZlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNqRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDaEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN0RCxPQUFPLEVBQ0gsZUFBZSxFQUNmLGFBQWEsRUFDYixtQkFBbUIsRUFDbkIsY0FBYyxFQUNkLGVBQWUsRUFDbEIsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQTRCekU7SUFBQTtJQUVBLENBQUM7SUFGWSxhQUFhO1FBMUJ6QixRQUFRLENBQUM7WUFDTixPQUFPLEVBQUU7Z0JBQ0wsWUFBWTtnQkFDWixXQUFXO2dCQUNYLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO2dCQUM3QixtQkFBbUI7Z0JBQ25CLGlCQUFpQjtnQkFDakIsVUFBVTtnQkFDVixtQkFBbUI7Z0JBQ25CLG1CQUFtQjtnQkFDbkIsY0FBYztnQkFDZCxlQUFlO2dCQUNmLGFBQWE7Z0JBQ2IsZUFBZTtnQkFDZixvQkFBb0I7Z0JBQ3BCLHFCQUFxQjthQUN4QjtZQUNELFlBQVksRUFBRTtnQkFDVix1QkFBdUI7Z0JBQ3ZCLG9CQUFvQjtnQkFDcEIsbUJBQW1CO2FBQ3RCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLGNBQWM7YUFDakI7U0FDSixDQUFDO09BQ1csYUFBYSxDQUV6QjtJQUFELG9CQUFDO0NBQUEsQUFGRCxJQUVDO1NBRlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZXZvbHZlRGV0YWlsc0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9kZXZvbHZlLmRldGFpbHMuY29tcG9uZW50JztcbmltcG9ydCB7IERldm9sdmVFZGl0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2Rldm9sdmUuZWRpdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29yZU1vZHVsZSB9IGZyb20gJ0BhbGZyZXNjby9hZGYtY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDdXN0b21Gb3Jtc01vZHVsZSB9IGZyb20gJ25nMi12YWxpZGF0aW9uJztcbmltcG9ydCB7IE1hdERhdGVGb3JtYXRNb2R1bGUgfSBmcm9tICdAbGFtaXMvd2ViLWNvcmUnO1xuaW1wb3J0IHtcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0Q2FyZE1vZHVsZSxcbiAgICBNYXREYXRlcGlja2VyTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICAgIE1hdFNlbGVjdE1vZHVsZVxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBEZXZvbHZlUmVzb2x2ZSwgUk9VVEVTIH0gZnJvbSAnLi9zZXJ2aWNlcy9kZXZvbHZlLnJvdXRlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBDb3ZhbGVudENvbW1vbk1vZHVsZSwgQ292YWxlbnREaWFsb2dzTW9kdWxlIH0gZnJvbSAnQGNvdmFsZW50L2NvcmUnO1xuaW1wb3J0IHsgRW5kRGV2b2x2ZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9lbmQuZGV2b2x2ZS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBGb3Jtc01vZHVsZSxcbiAgICAgICAgUm91dGVyTW9kdWxlLmZvckNoaWxkKFJPVVRFUyksXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgICAgIEN1c3RvbUZvcm1zTW9kdWxlLFxuICAgICAgICBDb3JlTW9kdWxlLFxuICAgICAgICBNYXREYXRlcGlja2VyTW9kdWxlLFxuICAgICAgICBNYXREYXRlRm9ybWF0TW9kdWxlLFxuICAgICAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICAgICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgICAgICBNYXRDYXJkTW9kdWxlLFxuICAgICAgICBNYXRTZWxlY3RNb2R1bGUsXG4gICAgICAgIENvdmFsZW50Q29tbW9uTW9kdWxlLFxuICAgICAgICBDb3ZhbGVudERpYWxvZ3NNb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBEZXZvbHZlRGV0YWlsc0NvbXBvbmVudCxcbiAgICAgICAgRGV2b2x2ZUVkaXRDb21wb25lbnQsXG4gICAgICAgIEVuZERldm9sdmVDb21wb25lbnRcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBEZXZvbHZlUmVzb2x2ZVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgRGV2b2x2ZU1vZHVsZSB7XG5cbn1cbiJdfQ==
