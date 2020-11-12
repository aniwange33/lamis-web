import * as tslib_1 from "tslib";
import {NgModule} from '@angular/core';
import {EacDetailsComponent} from './components/eac/eac.details.component';
import {EacEditComponent} from './components/eac/eac.edit.component';
import {EacResolve, ROUTES} from './services/eac.route';
import {CommonModule} from '@angular/common';
import {CovalentDialogsModule} from '@covalent/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LamisSharedModule, MatDateFormatModule} from '@lamis/web-core';
import {MaterialModule} from './material.module';
import {CoreModule} from '@alfresco/adf-core';
import {CustomFormsModule} from 'ng2-validation';
import {RouterModule} from '@angular/router';

var EacModule = /** @class */ (function () {
    function EacModule() {
    }

    EacModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                CovalentDialogsModule,
                FormsModule,
                ReactiveFormsModule,
                LamisSharedModule,
                MaterialModule,
                CoreModule,
                CustomFormsModule,
                MatDateFormatModule,
                RouterModule.forChild(ROUTES)
            ],
            declarations: [
                EacDetailsComponent,
                EacEditComponent
            ],
            providers: [
                EacResolve
            ]
        })
    ], EacModule);
    return EacModule;
}());
export {EacModule};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWFjLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xhbWlzLWNsaW5pYy0xLjEuMy8iLCJzb3VyY2VzIjpbImxpYi9lYWMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQXVCL0M7SUFBQTtJQUVBLENBQUM7SUFGWSxTQUFTO1FBckJyQixRQUFRLENBQUM7WUFDTixPQUFPLEVBQUU7Z0JBQ0wsWUFBWTtnQkFDWixxQkFBcUI7Z0JBQ3JCLFdBQVc7Z0JBQ1gsbUJBQW1CO2dCQUNuQixpQkFBaUI7Z0JBQ2pCLGNBQWM7Z0JBQ2QsVUFBVTtnQkFDVixpQkFBaUI7Z0JBQ2pCLG1CQUFtQjtnQkFDbkIsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7YUFDaEM7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsbUJBQW1CO2dCQUNuQixnQkFBZ0I7YUFDbkI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1AsVUFBVTthQUNiO1NBQ0osQ0FBQztPQUNXLFNBQVMsQ0FFckI7SUFBRCxnQkFBQztDQUFBLEFBRkQsSUFFQztTQUZZLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRWFjRGV0YWlsc0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9lYWMvZWFjLmRldGFpbHMuY29tcG9uZW50JztcbmltcG9ydCB7IEVhY0VkaXRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZWFjL2VhYy5lZGl0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBFYWNSZXNvbHZlLCBST1VURVMgfSBmcm9tICcuL3NlcnZpY2VzL2VhYy5yb3V0ZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ292YWxlbnREaWFsb2dzTW9kdWxlIH0gZnJvbSAnQGNvdmFsZW50L2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBMYW1pc1NoYXJlZE1vZHVsZSwgTWF0RGF0ZUZvcm1hdE1vZHVsZSB9IGZyb20gJ0BsYW1pcy93ZWItY29yZSc7XG5pbXBvcnQgeyBNYXRlcmlhbE1vZHVsZSB9IGZyb20gJy4vbWF0ZXJpYWwubW9kdWxlJztcbmltcG9ydCB7IENvcmVNb2R1bGUgfSBmcm9tICdAYWxmcmVzY28vYWRmLWNvcmUnO1xuaW1wb3J0IHsgQ3VzdG9tRm9ybXNNb2R1bGUgfSBmcm9tICduZzItdmFsaWRhdGlvbic7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBDb3ZhbGVudERpYWxvZ3NNb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgICAgICBMYW1pc1NoYXJlZE1vZHVsZSxcbiAgICAgICAgTWF0ZXJpYWxNb2R1bGUsXG4gICAgICAgIENvcmVNb2R1bGUsXG4gICAgICAgIEN1c3RvbUZvcm1zTW9kdWxlLFxuICAgICAgICBNYXREYXRlRm9ybWF0TW9kdWxlLFxuICAgICAgICBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQoUk9VVEVTKVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIEVhY0RldGFpbHNDb21wb25lbnQsXG4gICAgICAgIEVhY0VkaXRDb21wb25lbnRcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBFYWNSZXNvbHZlXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBFYWNNb2R1bGUge1xuXG59XG4iXX0=
