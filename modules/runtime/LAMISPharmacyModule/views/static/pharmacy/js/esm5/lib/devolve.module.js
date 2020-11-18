import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { DevolveDetailsComponent } from './components/devolve.details.component';
import { DevolveEditComponent } from './components/devolve.edit.component';
import { CoreModule } from '@alfresco/adf-core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { MatDateFormatModule } from '@lamis/web-core';
import { MatButtonModule, MatCardModule, MatDatepickerModule, MatInputModule, MatSelectModule } from '@angular/material';
import { DevolveResolve, ROUTES } from './services/devolve.route';
import { RouterModule } from '@angular/router';
import { CovalentCommonModule, CovalentDialogsModule } from '@covalent/core';
import { EndDevolveComponent } from './components/end.devolve.component';
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
export { DevolveModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2b2x2ZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1waGFybWFjeS0xLjQuMC8iLCJzb3VyY2VzIjpbImxpYi9kZXZvbHZlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSx3Q0FBd0MsQ0FBQztBQUMvRSxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQUN6RSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDOUMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxXQUFXLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRCxPQUFPLEVBQ0gsZUFBZSxFQUNmLGFBQWEsRUFDYixtQkFBbUIsRUFDbkIsY0FBYyxFQUNkLGVBQWUsRUFDbEIsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQixPQUFPLEVBQUMsY0FBYyxFQUFFLE1BQU0sRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ2hFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsb0JBQW9CLEVBQUUscUJBQXFCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzRSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxvQ0FBb0MsQ0FBQztBQTRCdkU7SUFBQTtJQUVBLENBQUM7SUFGWSxhQUFhO1FBMUJ6QixRQUFRLENBQUM7WUFDTixPQUFPLEVBQUU7Z0JBQ0wsWUFBWTtnQkFDWixXQUFXO2dCQUNYLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO2dCQUM3QixtQkFBbUI7Z0JBQ25CLGlCQUFpQjtnQkFDakIsVUFBVTtnQkFDVixtQkFBbUI7Z0JBQ25CLG1CQUFtQjtnQkFDbkIsY0FBYztnQkFDZCxlQUFlO2dCQUNmLGFBQWE7Z0JBQ2IsZUFBZTtnQkFDZixvQkFBb0I7Z0JBQ3BCLHFCQUFxQjthQUN4QjtZQUNELFlBQVksRUFBRTtnQkFDVix1QkFBdUI7Z0JBQ3ZCLG9CQUFvQjtnQkFDcEIsbUJBQW1CO2FBQ3RCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLGNBQWM7YUFDakI7U0FDSixDQUFDO09BQ1csYUFBYSxDQUV6QjtJQUFELG9CQUFDO0NBQUEsQUFGRCxJQUVDO1NBRlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtEZXZvbHZlRGV0YWlsc0NvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL2Rldm9sdmUuZGV0YWlscy5jb21wb25lbnQnO1xuaW1wb3J0IHtEZXZvbHZlRWRpdENvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL2Rldm9sdmUuZWRpdC5jb21wb25lbnQnO1xuaW1wb3J0IHtDb3JlTW9kdWxlfSBmcm9tICdAYWxmcmVzY28vYWRmLWNvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0Zvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0N1c3RvbUZvcm1zTW9kdWxlfSBmcm9tICduZzItdmFsaWRhdGlvbic7XG5pbXBvcnQge01hdERhdGVGb3JtYXRNb2R1bGV9IGZyb20gJ0BsYW1pcy93ZWItY29yZSc7XG5pbXBvcnQge1xuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXRDYXJkTW9kdWxlLFxuICAgIE1hdERhdGVwaWNrZXJNb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgTWF0U2VsZWN0TW9kdWxlXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7RGV2b2x2ZVJlc29sdmUsIFJPVVRFU30gZnJvbSAnLi9zZXJ2aWNlcy9kZXZvbHZlLnJvdXRlJztcbmltcG9ydCB7Um91dGVyTW9kdWxlfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtDb3ZhbGVudENvbW1vbk1vZHVsZSwgQ292YWxlbnREaWFsb2dzTW9kdWxlfSBmcm9tICdAY292YWxlbnQvY29yZSc7XG5pbXBvcnQge0VuZERldm9sdmVDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9lbmQuZGV2b2x2ZS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBGb3Jtc01vZHVsZSxcbiAgICAgICAgUm91dGVyTW9kdWxlLmZvckNoaWxkKFJPVVRFUyksXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgICAgIEN1c3RvbUZvcm1zTW9kdWxlLFxuICAgICAgICBDb3JlTW9kdWxlLFxuICAgICAgICBNYXREYXRlcGlja2VyTW9kdWxlLFxuICAgICAgICBNYXREYXRlRm9ybWF0TW9kdWxlLFxuICAgICAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICAgICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgICAgICBNYXRDYXJkTW9kdWxlLFxuICAgICAgICBNYXRTZWxlY3RNb2R1bGUsXG4gICAgICAgIENvdmFsZW50Q29tbW9uTW9kdWxlLFxuICAgICAgICBDb3ZhbGVudERpYWxvZ3NNb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBEZXZvbHZlRGV0YWlsc0NvbXBvbmVudCxcbiAgICAgICAgRGV2b2x2ZUVkaXRDb21wb25lbnQsXG4gICAgICAgIEVuZERldm9sdmVDb21wb25lbnRcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBEZXZvbHZlUmVzb2x2ZVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgRGV2b2x2ZU1vZHVsZSB7XG5cbn1cbiJdfQ==