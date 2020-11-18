import * as tslib_1 from "tslib";
import { CoreModule } from '@alfresco/adf-core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatListModule, MatProgressBarModule, MatSelectModule, MatTableModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { CovalentDialogsModule, CovalentMessageModule } from '@covalent/core';
import { PharmacyDetailsComponent } from './components/pharmacy-details.component';
import { PharmacyEditComponent } from './components/pharmacy-edit.component';
import { PharmacyResolve, ROUTES } from './services/pharmacy.route';
import { PharmacyWidgetModule } from './pharmacy.widget.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatDateFormatModule } from '@lamis/web-core';
import { CustomFormsModule } from 'ng2-validation';
var PharmacyModule = /** @class */ (function () {
    function PharmacyModule() {
    }
    PharmacyModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                PharmacyDetailsComponent,
                PharmacyEditComponent
            ],
            imports: [
                CommonModule,
                MatInputModule,
                MatIconModule,
                MatCardModule,
                MatSelectModule,
                MatButtonModule,
                RouterModule.forChild(ROUTES),
                MatProgressBarModule,
                FormsModule,
                CovalentMessageModule,
                CovalentDialogsModule,
                MatTableModule,
                MatListModule,
                CoreModule,
                PharmacyWidgetModule,
                NgxDatatableModule,
                ReactiveFormsModule,
                MatDateFormatModule,
                CustomFormsModule
            ],
            exports: [
                PharmacyDetailsComponent,
                PharmacyEditComponent
            ],
            entryComponents: [],
            providers: [
                PharmacyResolve
            ]
        })
    ], PharmacyModule);
    return PharmacyModule;
}());
export { PharmacyModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhhcm1hY3kubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGFtaXMtcGhhcm1hY3ktMS40LjAvIiwic291cmNlcyI6WyJsaWIvcGhhcm1hY3kubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDOUMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUNILGVBQWUsRUFDZixhQUFhLEVBQ2IsYUFBYSxFQUNiLGNBQWMsRUFDZCxhQUFhLEVBQ2Isb0JBQW9CLEVBQ3BCLGVBQWUsRUFDZixjQUFjLEVBQ2pCLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxxQkFBcUIsRUFBRSxxQkFBcUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzVFLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBQ2pGLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQzNFLE9BQU8sRUFBQyxlQUFlLEVBQUUsTUFBTSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDOUQsT0FBTyxFQUFDLFdBQVcsRUFBRSxtQkFBbUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2hFLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzNELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBcUNqRDtJQUFBO0lBQ0EsQ0FBQztJQURZLGNBQWM7UUFuQzFCLFFBQVEsQ0FBQztZQUNOLFlBQVksRUFBRTtnQkFDVix3QkFBd0I7Z0JBQ3hCLHFCQUFxQjthQUN4QjtZQUNELE9BQU8sRUFBRTtnQkFDTCxZQUFZO2dCQUNaLGNBQWM7Z0JBQ2QsYUFBYTtnQkFDYixhQUFhO2dCQUNiLGVBQWU7Z0JBQ2YsZUFBZTtnQkFDZixZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztnQkFDN0Isb0JBQW9CO2dCQUNwQixXQUFXO2dCQUNYLHFCQUFxQjtnQkFDckIscUJBQXFCO2dCQUNyQixjQUFjO2dCQUNkLGFBQWE7Z0JBQ2IsVUFBVTtnQkFDVixvQkFBb0I7Z0JBQ3BCLGtCQUFrQjtnQkFDbEIsbUJBQW1CO2dCQUNuQixtQkFBbUI7Z0JBQ25CLGlCQUFpQjthQUNwQjtZQUNELE9BQU8sRUFBRTtnQkFDTCx3QkFBd0I7Z0JBQ3hCLHFCQUFxQjthQUN4QjtZQUNELGVBQWUsRUFBRSxFQUFFO1lBQ25CLFNBQVMsRUFBRTtnQkFDUCxlQUFlO2FBQ2xCO1NBQ0osQ0FBQztPQUNXLGNBQWMsQ0FDMUI7SUFBRCxxQkFBQztDQUFBLEFBREQsSUFDQztTQURZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvcmVNb2R1bGV9IGZyb20gJ0BhbGZyZXNjby9hZGYtY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0Q2FyZE1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICAgIE1hdExpc3RNb2R1bGUsXG4gICAgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXG4gICAgTWF0U2VsZWN0TW9kdWxlLFxuICAgIE1hdFRhYmxlTW9kdWxlXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7Um91dGVyTW9kdWxlfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtDb3ZhbGVudERpYWxvZ3NNb2R1bGUsIENvdmFsZW50TWVzc2FnZU1vZHVsZX0gZnJvbSAnQGNvdmFsZW50L2NvcmUnO1xuaW1wb3J0IHtQaGFybWFjeURldGFpbHNDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9waGFybWFjeS1kZXRhaWxzLmNvbXBvbmVudCc7XG5pbXBvcnQge1BoYXJtYWN5RWRpdENvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL3BoYXJtYWN5LWVkaXQuY29tcG9uZW50JztcbmltcG9ydCB7UGhhcm1hY3lSZXNvbHZlLCBST1VURVN9IGZyb20gJy4vc2VydmljZXMvcGhhcm1hY3kucm91dGUnO1xuaW1wb3J0IHtQaGFybWFjeVdpZGdldE1vZHVsZX0gZnJvbSAnLi9waGFybWFjeS53aWRnZXQubW9kdWxlJztcbmltcG9ydCB7Rm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7Tmd4RGF0YXRhYmxlTW9kdWxlfSBmcm9tICdAc3dpbWxhbmUvbmd4LWRhdGF0YWJsZSc7XG5pbXBvcnQge01hdERhdGVGb3JtYXRNb2R1bGV9IGZyb20gJ0BsYW1pcy93ZWItY29yZSc7XG5pbXBvcnQge0N1c3RvbUZvcm1zTW9kdWxlfSBmcm9tICduZzItdmFsaWRhdGlvbic7XG5cbkBOZ01vZHVsZSh7XG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIFBoYXJtYWN5RGV0YWlsc0NvbXBvbmVudCxcbiAgICAgICAgUGhhcm1hY3lFZGl0Q29tcG9uZW50XG4gICAgXSxcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgICAgIE1hdEljb25Nb2R1bGUsXG4gICAgICAgIE1hdENhcmRNb2R1bGUsXG4gICAgICAgIE1hdFNlbGVjdE1vZHVsZSxcbiAgICAgICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgICAgICBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQoUk9VVEVTKSxcbiAgICAgICAgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBDb3ZhbGVudE1lc3NhZ2VNb2R1bGUsXG4gICAgICAgIENvdmFsZW50RGlhbG9nc01vZHVsZSxcbiAgICAgICAgTWF0VGFibGVNb2R1bGUsXG4gICAgICAgIE1hdExpc3RNb2R1bGUsXG4gICAgICAgIENvcmVNb2R1bGUsXG4gICAgICAgIFBoYXJtYWN5V2lkZ2V0TW9kdWxlLFxuICAgICAgICBOZ3hEYXRhdGFibGVNb2R1bGUsXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgICAgIE1hdERhdGVGb3JtYXRNb2R1bGUsXG4gICAgICAgIEN1c3RvbUZvcm1zTW9kdWxlXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIFBoYXJtYWN5RGV0YWlsc0NvbXBvbmVudCxcbiAgICAgICAgUGhhcm1hY3lFZGl0Q29tcG9uZW50XG4gICAgXSxcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBQaGFybWFjeVJlc29sdmVcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIFBoYXJtYWN5TW9kdWxlIHtcbn1cbiJdfQ==