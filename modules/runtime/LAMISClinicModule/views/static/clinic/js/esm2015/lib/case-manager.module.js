import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CaseManagerDetailsComponent } from './components/case-management/case-manager.details.component';
import { CaseManagerEditComponent } from './components/case-management/case-manager.edit.component';
import { CaseManagerListComponent } from './components/case-management/case-manager.list.component';
import { MaterialModule } from './material.module';
import { CoreModule } from '@alfresco/adf-core';
import { CaseManagerResolve, ROUTES } from './services/case-manager.route';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CovalentDialogsModule, CovalentSearchModule } from '@covalent/core';
import { LamisSharedModule } from '@lamis/web-core';
let CaseManagerModule = class CaseManagerModule {
};
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
export { CaseManagerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1tYW5hZ2VyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xhbWlzLWNsaW5pYy0xLjQuMC8iLCJzb3VyY2VzIjpbImxpYi9jYXNlLW1hbmFnZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQywyQkFBMkIsRUFBQyxNQUFNLDZEQUE2RCxDQUFDO0FBQ3hHLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLDBEQUEwRCxDQUFDO0FBQ2xHLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLDBEQUEwRCxDQUFDO0FBQ2xHLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDOUMsT0FBTyxFQUFDLGtCQUFrQixFQUFFLE1BQU0sRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQ3pFLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUNyRCxPQUFPLEVBQUMscUJBQXFCLEVBQUUsb0JBQW9CLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzRSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQXdCbEQsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBaUI7Q0FDN0IsQ0FBQTtBQURZLGlCQUFpQjtJQXRCN0IsUUFBUSxDQUFDO1FBQ04sT0FBTyxFQUFFO1lBQ0wsWUFBWTtZQUNaLGNBQWM7WUFDZCxVQUFVO1lBQ1YsV0FBVztZQUNYLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1lBQzdCLFVBQVU7WUFDVixTQUFTO1lBQ1Qsb0JBQW9CO1lBQ3BCLHFCQUFxQjtZQUNyQixpQkFBaUI7U0FDcEI7UUFDRCxZQUFZLEVBQUU7WUFDViwyQkFBMkI7WUFDM0Isd0JBQXdCO1lBQ3hCLHdCQUF3QjtTQUMzQjtRQUNELFNBQVMsRUFBRTtZQUNQLGtCQUFrQjtTQUNyQjtLQUNKLENBQUM7R0FDVyxpQkFBaUIsQ0FDN0I7U0FEWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q2FzZU1hbmFnZXJEZXRhaWxzQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvY2FzZS1tYW5hZ2VtZW50L2Nhc2UtbWFuYWdlci5kZXRhaWxzLmNvbXBvbmVudCc7XG5pbXBvcnQge0Nhc2VNYW5hZ2VyRWRpdENvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL2Nhc2UtbWFuYWdlbWVudC9jYXNlLW1hbmFnZXIuZWRpdC5jb21wb25lbnQnO1xuaW1wb3J0IHtDYXNlTWFuYWdlckxpc3RDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9jYXNlLW1hbmFnZW1lbnQvY2FzZS1tYW5hZ2VyLmxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7TWF0ZXJpYWxNb2R1bGV9IGZyb20gJy4vbWF0ZXJpYWwubW9kdWxlJztcbmltcG9ydCB7Q29yZU1vZHVsZX0gZnJvbSAnQGFsZnJlc2NvL2FkZi1jb3JlJztcbmltcG9ydCB7Q2FzZU1hbmFnZXJSZXNvbHZlLCBST1VURVN9IGZyb20gJy4vc2VydmljZXMvY2FzZS1tYW5hZ2VyLnJvdXRlJztcbmltcG9ydCB7Rm9ybXNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtSb3V0ZXJNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge05nYk1vZHVsZX0gZnJvbSAnQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAnO1xuaW1wb3J0IHtDb3ZhbGVudERpYWxvZ3NNb2R1bGUsIENvdmFsZW50U2VhcmNoTW9kdWxlfSBmcm9tICdAY292YWxlbnQvY29yZSc7XG5pbXBvcnQge0xhbWlzU2hhcmVkTW9kdWxlfSBmcm9tICdAbGFtaXMvd2ViLWNvcmUnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBNYXRlcmlhbE1vZHVsZSxcbiAgICAgICAgQ29yZU1vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIFJvdXRlck1vZHVsZS5mb3JDaGlsZChST1VURVMpLFxuICAgICAgICBDb3JlTW9kdWxlLFxuICAgICAgICBOZ2JNb2R1bGUsXG4gICAgICAgIENvdmFsZW50U2VhcmNoTW9kdWxlLFxuICAgICAgICBDb3ZhbGVudERpYWxvZ3NNb2R1bGUsXG4gICAgICAgIExhbWlzU2hhcmVkTW9kdWxlLFxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIENhc2VNYW5hZ2VyRGV0YWlsc0NvbXBvbmVudCxcbiAgICAgICAgQ2FzZU1hbmFnZXJFZGl0Q29tcG9uZW50LFxuICAgICAgICBDYXNlTWFuYWdlckxpc3RDb21wb25lbnRcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBDYXNlTWFuYWdlclJlc29sdmVcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIENhc2VNYW5hZ2VyTW9kdWxlIHtcbn1cbiJdfQ==