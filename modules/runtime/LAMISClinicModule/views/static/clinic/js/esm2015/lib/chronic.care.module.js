import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { ChronicCareDetailComponent } from './components/chronic-care/chronic.care.detail.component';
import { ChronicCareEditComponent } from './components/chronic-care/chronic.care.edit.component';
import { ChronicCareResolve } from './services/chronic.care.route';
import { MaterialModule } from './material.module';
import { CoreModule } from '@alfresco/adf-core';
import { CustomFormsModule } from 'ng2-validation';
import { CommonModule } from '@angular/common';
import { CovalentDialogsModule } from '@covalent/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LamisSharedModule, MatDateFormatModule } from '@lamis/web-core';
import { RouterModule } from '@angular/router';
import { ROUTES } from './services/chronic.care.route';
import { MatStepperModule } from '@angular/material';
let ChronicCareModule = class ChronicCareModule {
};
ChronicCareModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            ChronicCareDetailComponent,
            ChronicCareEditComponent
        ],
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
            RouterModule.forChild(ROUTES),
            MatStepperModule
        ],
        providers: [
            ChronicCareResolve
        ]
    })
], ChronicCareModule);
export { ChronicCareModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hyb25pYy5jYXJlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xhbWlzLWNsaW5pYy0xLjQuMC8iLCJzb3VyY2VzIjpbImxpYi9jaHJvbmljLmNhcmUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLHlEQUF5RCxDQUFDO0FBQ25HLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLHVEQUF1RCxDQUFDO0FBQy9GLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDOUMsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3JELE9BQU8sRUFBQyxXQUFXLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRSxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN2RSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQ3JELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBd0JuRCxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFpQjtDQUU3QixDQUFBO0FBRlksaUJBQWlCO0lBdEI3QixRQUFRLENBQUM7UUFDTixZQUFZLEVBQUU7WUFDViwwQkFBMEI7WUFDMUIsd0JBQXdCO1NBQzNCO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsWUFBWTtZQUNaLHFCQUFxQjtZQUNyQixXQUFXO1lBQ1gsbUJBQW1CO1lBQ25CLGlCQUFpQjtZQUNqQixjQUFjO1lBQ2QsVUFBVTtZQUNWLGlCQUFpQjtZQUNqQixtQkFBbUI7WUFDbkIsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7WUFDN0IsZ0JBQWdCO1NBQ25CO1FBQ0QsU0FBUyxFQUFFO1lBQ1Asa0JBQWtCO1NBQ3JCO0tBQ0osQ0FBQztHQUNXLGlCQUFpQixDQUU3QjtTQUZZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDaHJvbmljQ2FyZURldGFpbENvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL2Nocm9uaWMtY2FyZS9jaHJvbmljLmNhcmUuZGV0YWlsLmNvbXBvbmVudCc7XG5pbXBvcnQge0Nocm9uaWNDYXJlRWRpdENvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL2Nocm9uaWMtY2FyZS9jaHJvbmljLmNhcmUuZWRpdC5jb21wb25lbnQnO1xuaW1wb3J0IHtDaHJvbmljQ2FyZVJlc29sdmV9IGZyb20gJy4vc2VydmljZXMvY2hyb25pYy5jYXJlLnJvdXRlJztcbmltcG9ydCB7TWF0ZXJpYWxNb2R1bGV9IGZyb20gJy4vbWF0ZXJpYWwubW9kdWxlJztcbmltcG9ydCB7Q29yZU1vZHVsZX0gZnJvbSAnQGFsZnJlc2NvL2FkZi1jb3JlJztcbmltcG9ydCB7Q3VzdG9tRm9ybXNNb2R1bGV9IGZyb20gJ25nMi12YWxpZGF0aW9uJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtDb3ZhbGVudERpYWxvZ3NNb2R1bGV9IGZyb20gJ0Bjb3ZhbGVudC9jb3JlJztcbmltcG9ydCB7Rm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7TGFtaXNTaGFyZWRNb2R1bGUsIE1hdERhdGVGb3JtYXRNb2R1bGV9IGZyb20gJ0BsYW1pcy93ZWItY29yZSc7XG5pbXBvcnQge1JvdXRlck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7Uk9VVEVTfSBmcm9tICcuL3NlcnZpY2VzL2Nocm9uaWMuY2FyZS5yb3V0ZSc7XG5pbXBvcnQge01hdFN0ZXBwZXJNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgQ2hyb25pY0NhcmVEZXRhaWxDb21wb25lbnQsXG4gICAgICAgIENocm9uaWNDYXJlRWRpdENvbXBvbmVudFxuICAgIF0sXG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIENvdmFsZW50RGlhbG9nc01vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgICAgIExhbWlzU2hhcmVkTW9kdWxlLFxuICAgICAgICBNYXRlcmlhbE1vZHVsZSxcbiAgICAgICAgQ29yZU1vZHVsZSxcbiAgICAgICAgQ3VzdG9tRm9ybXNNb2R1bGUsXG4gICAgICAgIE1hdERhdGVGb3JtYXRNb2R1bGUsXG4gICAgICAgIFJvdXRlck1vZHVsZS5mb3JDaGlsZChST1VURVMpLFxuICAgICAgICBNYXRTdGVwcGVyTW9kdWxlXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgQ2hyb25pY0NhcmVSZXNvbHZlXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBDaHJvbmljQ2FyZU1vZHVsZSB7XG5cbn1cbiJdfQ==