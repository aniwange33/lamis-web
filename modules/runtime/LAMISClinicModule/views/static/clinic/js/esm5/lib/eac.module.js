import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { EacDetailsComponent } from './components/eac/eac.details.component';
import { EacEditComponent } from './components/eac/eac.edit.component';
import { EacResolve, ROUTES } from './services/eac.route';
import { CommonModule } from '@angular/common';
import { CovalentDialogsModule } from '@covalent/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LamisSharedModule, MatDateFormatModule } from '@lamis/web-core';
import { MaterialModule } from './material.module';
import { CoreModule } from '@alfresco/adf-core';
import { CustomFormsModule } from 'ng2-validation';
import { RouterModule } from '@angular/router';
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
export { EacModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWFjLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xhbWlzLWNsaW5pYy0xLjQuMC8iLCJzb3VyY2VzIjpbImxpYi9lYWMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHdDQUF3QyxDQUFDO0FBQzNFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBQ3JFLE9BQU8sRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3JELE9BQU8sRUFBQyxXQUFXLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRSxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN2RSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQzlDLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQXVCN0M7SUFBQTtJQUVBLENBQUM7SUFGWSxTQUFTO1FBckJyQixRQUFRLENBQUM7WUFDTixPQUFPLEVBQUU7Z0JBQ0wsWUFBWTtnQkFDWixxQkFBcUI7Z0JBQ3JCLFdBQVc7Z0JBQ1gsbUJBQW1CO2dCQUNuQixpQkFBaUI7Z0JBQ2pCLGNBQWM7Z0JBQ2QsVUFBVTtnQkFDVixpQkFBaUI7Z0JBQ2pCLG1CQUFtQjtnQkFDbkIsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7YUFDaEM7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsbUJBQW1CO2dCQUNuQixnQkFBZ0I7YUFDbkI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1AsVUFBVTthQUNiO1NBQ0osQ0FBQztPQUNXLFNBQVMsQ0FFckI7SUFBRCxnQkFBQztDQUFBLEFBRkQsSUFFQztTQUZZLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RWFjRGV0YWlsc0NvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL2VhYy9lYWMuZGV0YWlscy5jb21wb25lbnQnO1xuaW1wb3J0IHtFYWNFZGl0Q29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvZWFjL2VhYy5lZGl0LmNvbXBvbmVudCc7XG5pbXBvcnQge0VhY1Jlc29sdmUsIFJPVVRFU30gZnJvbSAnLi9zZXJ2aWNlcy9lYWMucm91dGUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0NvdmFsZW50RGlhbG9nc01vZHVsZX0gZnJvbSAnQGNvdmFsZW50L2NvcmUnO1xuaW1wb3J0IHtGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtMYW1pc1NoYXJlZE1vZHVsZSwgTWF0RGF0ZUZvcm1hdE1vZHVsZX0gZnJvbSAnQGxhbWlzL3dlYi1jb3JlJztcbmltcG9ydCB7TWF0ZXJpYWxNb2R1bGV9IGZyb20gJy4vbWF0ZXJpYWwubW9kdWxlJztcbmltcG9ydCB7Q29yZU1vZHVsZX0gZnJvbSAnQGFsZnJlc2NvL2FkZi1jb3JlJztcbmltcG9ydCB7Q3VzdG9tRm9ybXNNb2R1bGV9IGZyb20gJ25nMi12YWxpZGF0aW9uJztcbmltcG9ydCB7Um91dGVyTW9kdWxlfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBDb3ZhbGVudERpYWxvZ3NNb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgICAgICBMYW1pc1NoYXJlZE1vZHVsZSxcbiAgICAgICAgTWF0ZXJpYWxNb2R1bGUsXG4gICAgICAgIENvcmVNb2R1bGUsXG4gICAgICAgIEN1c3RvbUZvcm1zTW9kdWxlLFxuICAgICAgICBNYXREYXRlRm9ybWF0TW9kdWxlLFxuICAgICAgICBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQoUk9VVEVTKVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIEVhY0RldGFpbHNDb21wb25lbnQsXG4gICAgICAgIEVhY0VkaXRDb21wb25lbnRcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBFYWNSZXNvbHZlXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBFYWNNb2R1bGUge1xuXG59XG4iXX0=