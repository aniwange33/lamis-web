import * as tslib_1 from "tslib";
import {CoreModule} from '@alfresco/adf-core';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatSelectModule,
    MatTableModule
} from '@angular/material';
import {RouterModule} from '@angular/router';
import {CovalentDialogsModule, CovalentMessageModule} from '@covalent/core';
import {PharmacyDetailsComponent} from './components/pharmacy-details.component';
import {PharmacyEditComponent} from './components/pharmacy-edit.component';
import {PharmacyResolve, ROUTES} from './services/pharmacy.route';
import {PharmacyWidgetModule} from './pharmacy.widget.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {MatDateFormatModule} from '@lamis/web-core';
import {CustomFormsModule} from 'ng2-validation';

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
export {PharmacyModule};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhhcm1hY3kubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGFtaXMtcGhhcm1hY3ktMS4xLjQvIiwic291cmNlcyI6WyJsaWIvcGhhcm1hY3kubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDaEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUNILGVBQWUsRUFDZixhQUFhLEVBQ2IsYUFBYSxFQUNiLGNBQWMsRUFDZCxhQUFhLEVBQ2Isb0JBQW9CLEVBQ3BCLGVBQWUsRUFDZixjQUFjLEVBQ2pCLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDcEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDaEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzdELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBcUNuRDtJQUFBO0lBQ0EsQ0FBQztJQURZLGNBQWM7UUFuQzFCLFFBQVEsQ0FBQztZQUNOLFlBQVksRUFBRTtnQkFDVix3QkFBd0I7Z0JBQ3hCLHFCQUFxQjthQUN4QjtZQUNELE9BQU8sRUFBRTtnQkFDTCxZQUFZO2dCQUNaLGNBQWM7Z0JBQ2QsYUFBYTtnQkFDYixhQUFhO2dCQUNiLGVBQWU7Z0JBQ2YsZUFBZTtnQkFDZixZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztnQkFDN0Isb0JBQW9CO2dCQUNwQixXQUFXO2dCQUNYLHFCQUFxQjtnQkFDckIscUJBQXFCO2dCQUNyQixjQUFjO2dCQUNkLGFBQWE7Z0JBQ2IsVUFBVTtnQkFDVixvQkFBb0I7Z0JBQ3BCLGtCQUFrQjtnQkFDbEIsbUJBQW1CO2dCQUNuQixtQkFBbUI7Z0JBQ25CLGlCQUFpQjthQUNwQjtZQUNELE9BQU8sRUFBRTtnQkFDTCx3QkFBd0I7Z0JBQ3hCLHFCQUFxQjthQUN4QjtZQUNELGVBQWUsRUFBRSxFQUFFO1lBQ25CLFNBQVMsRUFBRTtnQkFDUCxlQUFlO2FBQ2xCO1NBQ0osQ0FBQztPQUNXLGNBQWMsQ0FDMUI7SUFBRCxxQkFBQztDQUFBLEFBREQsSUFDQztTQURZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb3JlTW9kdWxlIH0gZnJvbSAnQGFsZnJlc2NvL2FkZi1jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtcclxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcclxuICAgIE1hdENhcmRNb2R1bGUsXHJcbiAgICBNYXRJY29uTW9kdWxlLFxyXG4gICAgTWF0SW5wdXRNb2R1bGUsXHJcbiAgICBNYXRMaXN0TW9kdWxlLFxyXG4gICAgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXHJcbiAgICBNYXRTZWxlY3RNb2R1bGUsXHJcbiAgICBNYXRUYWJsZU1vZHVsZVxyXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQ292YWxlbnREaWFsb2dzTW9kdWxlLCBDb3ZhbGVudE1lc3NhZ2VNb2R1bGUgfSBmcm9tICdAY292YWxlbnQvY29yZSc7XHJcbmltcG9ydCB7IFBoYXJtYWN5RGV0YWlsc0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9waGFybWFjeS1kZXRhaWxzLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFBoYXJtYWN5RWRpdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9waGFybWFjeS1lZGl0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFBoYXJtYWN5UmVzb2x2ZSwgUk9VVEVTIH0gZnJvbSAnLi9zZXJ2aWNlcy9waGFybWFjeS5yb3V0ZSc7XHJcbmltcG9ydCB7IFBoYXJtYWN5V2lkZ2V0TW9kdWxlIH0gZnJvbSAnLi9waGFybWFjeS53aWRnZXQubW9kdWxlJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IE5neERhdGF0YWJsZU1vZHVsZSB9IGZyb20gJ0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlJztcclxuaW1wb3J0IHsgTWF0RGF0ZUZvcm1hdE1vZHVsZSB9IGZyb20gJ0BsYW1pcy93ZWItY29yZSc7XHJcbmltcG9ydCB7IEN1c3RvbUZvcm1zTW9kdWxlIH0gZnJvbSAnbmcyLXZhbGlkYXRpb24nO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIFBoYXJtYWN5RGV0YWlsc0NvbXBvbmVudCxcclxuICAgICAgICBQaGFybWFjeUVkaXRDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgICAgIE1hdElucHV0TW9kdWxlLFxyXG4gICAgICAgIE1hdEljb25Nb2R1bGUsXHJcbiAgICAgICAgTWF0Q2FyZE1vZHVsZSxcclxuICAgICAgICBNYXRTZWxlY3RNb2R1bGUsXHJcbiAgICAgICAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gICAgICAgIFJvdXRlck1vZHVsZS5mb3JDaGlsZChST1VURVMpLFxyXG4gICAgICAgIE1hdFByb2dyZXNzQmFyTW9kdWxlLFxyXG4gICAgICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgICAgIENvdmFsZW50TWVzc2FnZU1vZHVsZSxcclxuICAgICAgICBDb3ZhbGVudERpYWxvZ3NNb2R1bGUsXHJcbiAgICAgICAgTWF0VGFibGVNb2R1bGUsXHJcbiAgICAgICAgTWF0TGlzdE1vZHVsZSxcclxuICAgICAgICBDb3JlTW9kdWxlLFxyXG4gICAgICAgIFBoYXJtYWN5V2lkZ2V0TW9kdWxlLFxyXG4gICAgICAgIE5neERhdGF0YWJsZU1vZHVsZSxcclxuICAgICAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgICAgIE1hdERhdGVGb3JtYXRNb2R1bGUsXHJcbiAgICAgICAgQ3VzdG9tRm9ybXNNb2R1bGVcclxuICAgIF0sXHJcbiAgICBleHBvcnRzOiBbXHJcbiAgICAgICAgUGhhcm1hY3lEZXRhaWxzQ29tcG9uZW50LFxyXG4gICAgICAgIFBoYXJtYWN5RWRpdENvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIGVudHJ5Q29tcG9uZW50czogW10sXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICBQaGFybWFjeVJlc29sdmVcclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFBoYXJtYWN5TW9kdWxlIHtcclxufVxyXG4iXX0=
