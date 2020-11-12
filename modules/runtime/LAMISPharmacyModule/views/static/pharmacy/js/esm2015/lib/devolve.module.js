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

let DevolveModule = class DevolveModule {
};
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
export {DevolveModule};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2b2x2ZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1waGFybWFjeS0xLjEuNC8iLCJzb3VyY2VzIjpbImxpYi9kZXZvbHZlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNqRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDaEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN0RCxPQUFPLEVBQ0gsZUFBZSxFQUNmLGFBQWEsRUFDYixtQkFBbUIsRUFDbkIsY0FBYyxFQUNkLGVBQWUsRUFDbEIsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQTRCekUsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtDQUV6QixDQUFBO0FBRlksYUFBYTtJQTFCekIsUUFBUSxDQUFDO1FBQ04sT0FBTyxFQUFFO1lBQ0wsWUFBWTtZQUNaLFdBQVc7WUFDWCxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztZQUM3QixtQkFBbUI7WUFDbkIsaUJBQWlCO1lBQ2pCLFVBQVU7WUFDVixtQkFBbUI7WUFDbkIsbUJBQW1CO1lBQ25CLGNBQWM7WUFDZCxlQUFlO1lBQ2YsYUFBYTtZQUNiLGVBQWU7WUFDZixvQkFBb0I7WUFDcEIscUJBQXFCO1NBQ3hCO1FBQ0QsWUFBWSxFQUFFO1lBQ1YsdUJBQXVCO1lBQ3ZCLG9CQUFvQjtZQUNwQixtQkFBbUI7U0FDdEI7UUFDRCxTQUFTLEVBQUU7WUFDUCxjQUFjO1NBQ2pCO0tBQ0osQ0FBQztHQUNXLGFBQWEsQ0FFekI7U0FGWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERldm9sdmVEZXRhaWxzQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2Rldm9sdmUuZGV0YWlscy5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGV2b2x2ZUVkaXRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZGV2b2x2ZS5lZGl0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb3JlTW9kdWxlIH0gZnJvbSAnQGFsZnJlc2NvL2FkZi1jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEN1c3RvbUZvcm1zTW9kdWxlIH0gZnJvbSAnbmcyLXZhbGlkYXRpb24nO1xuaW1wb3J0IHsgTWF0RGF0ZUZvcm1hdE1vZHVsZSB9IGZyb20gJ0BsYW1pcy93ZWItY29yZSc7XG5pbXBvcnQge1xuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXRDYXJkTW9kdWxlLFxuICAgIE1hdERhdGVwaWNrZXJNb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgTWF0U2VsZWN0TW9kdWxlXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IERldm9sdmVSZXNvbHZlLCBST1VURVMgfSBmcm9tICcuL3NlcnZpY2VzL2Rldm9sdmUucm91dGUnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IENvdmFsZW50Q29tbW9uTW9kdWxlLCBDb3ZhbGVudERpYWxvZ3NNb2R1bGUgfSBmcm9tICdAY292YWxlbnQvY29yZSc7XG5pbXBvcnQgeyBFbmREZXZvbHZlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2VuZC5kZXZvbHZlLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQoUk9VVEVTKSxcbiAgICAgICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICAgICAgQ3VzdG9tRm9ybXNNb2R1bGUsXG4gICAgICAgIENvcmVNb2R1bGUsXG4gICAgICAgIE1hdERhdGVwaWNrZXJNb2R1bGUsXG4gICAgICAgIE1hdERhdGVGb3JtYXRNb2R1bGUsXG4gICAgICAgIE1hdElucHV0TW9kdWxlLFxuICAgICAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgICAgIE1hdENhcmRNb2R1bGUsXG4gICAgICAgIE1hdFNlbGVjdE1vZHVsZSxcbiAgICAgICAgQ292YWxlbnRDb21tb25Nb2R1bGUsXG4gICAgICAgIENvdmFsZW50RGlhbG9nc01vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIERldm9sdmVEZXRhaWxzQ29tcG9uZW50LFxuICAgICAgICBEZXZvbHZlRWRpdENvbXBvbmVudCxcbiAgICAgICAgRW5kRGV2b2x2ZUNvbXBvbmVudFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIERldm9sdmVSZXNvbHZlXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZXZvbHZlTW9kdWxlIHtcblxufVxuIl19
