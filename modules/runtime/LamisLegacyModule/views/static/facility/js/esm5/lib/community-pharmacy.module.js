import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommunityPharmacyResolve, ROUTES } from './services/cp.routes';
import { MatButtonModule, MatCardModule, MatDividerModule, MatIconModule, MatInputModule, MatSelectModule } from '@angular/material';
import { CommunityPharmacyDetailsComponent } from './components/community-pharmacy/community-pharmacy.details.component';
import { CommunityPharmacyEditComponent } from './components/community-pharmacy/community-pharmacy.edit.component';
import { CommunityPharmacyListComponent } from './components/community-pharmacy/community-pharmacy-list.component';
import { CoreModule } from '@alfresco/adf-core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LamisCoreModule } from '@lamis/web-core';
import { CovalentCommonModule, CovalentDialogsModule } from '@covalent/core';
var CommunityPharmacyModule = /** @class */ (function () {
    function CommunityPharmacyModule() {
    }
    CommunityPharmacyModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                CommunityPharmacyDetailsComponent,
                CommunityPharmacyEditComponent,
                CommunityPharmacyListComponent
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
                RouterModule.forChild(ROUTES),
                CoreModule,
                CovalentCommonModule,
                CovalentDialogsModule,
                NgbModule,
                LamisCoreModule
            ],
            exports: [],
            providers: [
                CommunityPharmacyResolve
            ]
        })
    ], CommunityPharmacyModule);
    return CommunityPharmacyModule;
}());
export { CommunityPharmacyModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbXVuaXR5LXBoYXJtYWN5Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xhbWlzLWZhY2lsaXR5LTEuMi4wLyIsInNvdXJjZXMiOlsibGliL2NvbW11bml0eS1waGFybWFjeS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hFLE9BQU8sRUFDSCxlQUFlLEVBQ2YsYUFBYSxFQUNiLGdCQUFnQixFQUNoQixhQUFhLEVBQ2IsY0FBYyxFQUNkLGVBQWUsRUFDbEIsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQixPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSxzRUFBc0UsQ0FBQztBQUN6SCxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxtRUFBbUUsQ0FBQztBQUNuSCxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxtRUFBbUUsQ0FBQztBQUNuSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDaEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQThCN0U7SUFBQTtJQUVBLENBQUM7SUFGWSx1QkFBdUI7UUE1Qm5DLFFBQVEsQ0FBQztZQUNOLFlBQVksRUFBRTtnQkFDVixpQ0FBaUM7Z0JBQ2pDLDhCQUE4QjtnQkFDOUIsOEJBQThCO2FBQ2pDO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLFlBQVk7Z0JBQ1osY0FBYztnQkFDZCxhQUFhO2dCQUNiLGdCQUFnQjtnQkFDaEIsYUFBYTtnQkFDYixlQUFlO2dCQUNmLGVBQWU7Z0JBQ2YsV0FBVztnQkFDWCxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztnQkFDN0IsVUFBVTtnQkFDVixvQkFBb0I7Z0JBQ3BCLHFCQUFxQjtnQkFDckIsU0FBUztnQkFDVCxlQUFlO2FBQ2xCO1lBQ0QsT0FBTyxFQUFFLEVBQ1I7WUFDRCxTQUFTLEVBQUU7Z0JBQ1Asd0JBQXdCO2FBQzNCO1NBQ0osQ0FBQztPQUNXLHVCQUF1QixDQUVuQztJQUFELDhCQUFDO0NBQUEsQUFGRCxJQUVDO1NBRlksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBDb21tdW5pdHlQaGFybWFjeVJlc29sdmUsIFJPVVRFUyB9IGZyb20gJy4vc2VydmljZXMvY3Aucm91dGVzJztcbmltcG9ydCB7XG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdENhcmRNb2R1bGUsXG4gICAgTWF0RGl2aWRlck1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICAgIE1hdFNlbGVjdE1vZHVsZVxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBDb21tdW5pdHlQaGFybWFjeURldGFpbHNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY29tbXVuaXR5LXBoYXJtYWN5L2NvbW11bml0eS1waGFybWFjeS5kZXRhaWxzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb21tdW5pdHlQaGFybWFjeUVkaXRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY29tbXVuaXR5LXBoYXJtYWN5L2NvbW11bml0eS1waGFybWFjeS5lZGl0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb21tdW5pdHlQaGFybWFjeUxpc3RDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY29tbXVuaXR5LXBoYXJtYWN5L2NvbW11bml0eS1waGFybWFjeS1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb3JlTW9kdWxlIH0gZnJvbSAnQGFsZnJlc2NvL2FkZi1jb3JlJztcbmltcG9ydCB7IE5nYk1vZHVsZSB9IGZyb20gJ0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwJztcbmltcG9ydCB7IExhbWlzQ29yZU1vZHVsZSB9IGZyb20gJ0BsYW1pcy93ZWItY29yZSc7XG5pbXBvcnQgeyBDb3ZhbGVudENvbW1vbk1vZHVsZSwgQ292YWxlbnREaWFsb2dzTW9kdWxlIH0gZnJvbSAnQGNvdmFsZW50L2NvcmUnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBDb21tdW5pdHlQaGFybWFjeURldGFpbHNDb21wb25lbnQsXG4gICAgICAgIENvbW11bml0eVBoYXJtYWN5RWRpdENvbXBvbmVudCxcbiAgICAgICAgQ29tbXVuaXR5UGhhcm1hY3lMaXN0Q29tcG9uZW50XG4gICAgXSxcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgICAgIE1hdEljb25Nb2R1bGUsXG4gICAgICAgIE1hdERpdmlkZXJNb2R1bGUsXG4gICAgICAgIE1hdENhcmRNb2R1bGUsXG4gICAgICAgIE1hdFNlbGVjdE1vZHVsZSxcbiAgICAgICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgICAgICBGb3Jtc01vZHVsZSxcbiAgICAgICAgUm91dGVyTW9kdWxlLmZvckNoaWxkKFJPVVRFUyksXG4gICAgICAgIENvcmVNb2R1bGUsXG4gICAgICAgIENvdmFsZW50Q29tbW9uTW9kdWxlLFxuICAgICAgICBDb3ZhbGVudERpYWxvZ3NNb2R1bGUsXG4gICAgICAgIE5nYk1vZHVsZSxcbiAgICAgICAgTGFtaXNDb3JlTW9kdWxlXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgQ29tbXVuaXR5UGhhcm1hY3lSZXNvbHZlXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBDb21tdW5pdHlQaGFybWFjeU1vZHVsZSB7XG5cbn1cbiJdfQ==