import * as tslib_1 from "tslib";
import {NgModule} from '@angular/core';
import {CaseManagerDetailsComponent} from './components/case-management/case-manager.details.component';
import {CaseManagerEditComponent} from './components/case-management/case-manager.edit.component';
import {CaseManagerListComponent} from './components/case-management/case-manager.list.component';
import {MaterialModule} from './material.module';
import {CoreModule} from '@alfresco/adf-core';
import {CaseManagerResolve, ROUTES} from './services/case-manager.route';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CovalentDialogsModule, CovalentSearchModule} from '@covalent/core';
import {LamisSharedModule} from '@lamis/web-core';

var CaseManagerModule = /** @class */ (function () {
    function CaseManagerModule() {
    }

    CaseManagerModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                MaterialModule,
                CoreModule,
                FormsModule,
                RouterModule.forChild(ROUTES),
                CoreModule,
                NgbModule,
                CovalentSearchModule,
                CovalentDialogsModule,
                LamisSharedModule,
            ],
            declarations: [
                CaseManagerDetailsComponent,
                CaseManagerEditComponent,
                CaseManagerListComponent
            ],
            providers: [
                CaseManagerResolve
            ]
        })
    ], CaseManagerModule);
    return CaseManagerModule;
}());
export {CaseManagerModule};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1tYW5hZ2VyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xhbWlzLWNsaW5pYy0xLjEuMy8iLCJzb3VyY2VzIjpbImxpYi9jYXNlLW1hbmFnZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDZEQUE2RCxDQUFDO0FBQzFHLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDBEQUEwRCxDQUFDO0FBQ3BHLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDBEQUEwRCxDQUFDO0FBQ3BHLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDaEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzNFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQXdCcEQ7SUFBQTtJQUNBLENBQUM7SUFEWSxpQkFBaUI7UUF0QjdCLFFBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRTtnQkFDTCxZQUFZO2dCQUNaLGNBQWM7Z0JBQ2QsVUFBVTtnQkFDVixXQUFXO2dCQUNYLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO2dCQUM3QixVQUFVO2dCQUNWLFNBQVM7Z0JBQ1Qsb0JBQW9CO2dCQUNwQixxQkFBcUI7Z0JBQ3JCLGlCQUFpQjthQUNwQjtZQUNELFlBQVksRUFBRTtnQkFDViwyQkFBMkI7Z0JBQzNCLHdCQUF3QjtnQkFDeEIsd0JBQXdCO2FBQzNCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLGtCQUFrQjthQUNyQjtTQUNKLENBQUM7T0FDVyxpQkFBaUIsQ0FDN0I7SUFBRCx3QkFBQztDQUFBLEFBREQsSUFDQztTQURZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYXNlTWFuYWdlckRldGFpbHNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY2FzZS1tYW5hZ2VtZW50L2Nhc2UtbWFuYWdlci5kZXRhaWxzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDYXNlTWFuYWdlckVkaXRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY2FzZS1tYW5hZ2VtZW50L2Nhc2UtbWFuYWdlci5lZGl0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDYXNlTWFuYWdlckxpc3RDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY2FzZS1tYW5hZ2VtZW50L2Nhc2UtbWFuYWdlci5saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbE1vZHVsZSB9IGZyb20gJy4vbWF0ZXJpYWwubW9kdWxlJztcbmltcG9ydCB7IENvcmVNb2R1bGUgfSBmcm9tICdAYWxmcmVzY28vYWRmLWNvcmUnO1xuaW1wb3J0IHsgQ2FzZU1hbmFnZXJSZXNvbHZlLCBST1VURVMgfSBmcm9tICcuL3NlcnZpY2VzL2Nhc2UtbWFuYWdlci5yb3V0ZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgTmdiTW9kdWxlIH0gZnJvbSAnQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAnO1xuaW1wb3J0IHsgQ292YWxlbnREaWFsb2dzTW9kdWxlLCBDb3ZhbGVudFNlYXJjaE1vZHVsZSB9IGZyb20gJ0Bjb3ZhbGVudC9jb3JlJztcbmltcG9ydCB7IExhbWlzU2hhcmVkTW9kdWxlIH0gZnJvbSAnQGxhbWlzL3dlYi1jb3JlJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgTWF0ZXJpYWxNb2R1bGUsXG4gICAgICAgIENvcmVNb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQoUk9VVEVTKSxcbiAgICAgICAgQ29yZU1vZHVsZSxcbiAgICAgICAgTmdiTW9kdWxlLFxuICAgICAgICBDb3ZhbGVudFNlYXJjaE1vZHVsZSxcbiAgICAgICAgQ292YWxlbnREaWFsb2dzTW9kdWxlLFxuICAgICAgICBMYW1pc1NoYXJlZE1vZHVsZSxcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBDYXNlTWFuYWdlckRldGFpbHNDb21wb25lbnQsXG4gICAgICAgIENhc2VNYW5hZ2VyRWRpdENvbXBvbmVudCxcbiAgICAgICAgQ2FzZU1hbmFnZXJMaXN0Q29tcG9uZW50XG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgQ2FzZU1hbmFnZXJSZXNvbHZlXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBDYXNlTWFuYWdlck1vZHVsZSB7XG59XG4iXX0=
