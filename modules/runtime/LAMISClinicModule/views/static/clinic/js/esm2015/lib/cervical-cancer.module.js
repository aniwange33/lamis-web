import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CervicalCancerScreeningComponent } from './components/cervical-cancer-screening/cervical-cancer-screening.component';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CervicalCancerScreeningDetailComponent } from './components/cervical-cancer-screening/cervical-cancer-screening-detail.component';
import { LamisSharedModule, MatDateFormatModule } from '@lamis/web-core';
import { CoreModule } from '@alfresco/adf-core';
import { RouterModule } from '@angular/router';
import { ROUTES } from './services/cervical-cancer-screening.route';
import { CovalentDialogsModule, CovalentMessageModule } from '@covalent/core';
import { CustomFormsModule } from 'ng2-validation';
let CervicalCancerModule = class CervicalCancerModule {
};
CervicalCancerModule = tslib_1.__decorate([
    NgModule({
        imports: [
            MaterialModule,
            FormsModule,
            CommonModule,
            MatDateFormatModule,
            CoreModule,
            RouterModule.forChild(ROUTES),
            CovalentMessageModule,
            CovalentDialogsModule,
            CustomFormsModule,
            LamisSharedModule,
        ],
        declarations: [
            CervicalCancerScreeningComponent,
            CervicalCancerScreeningDetailComponent
        ],
        providers: [
        //ObservationResolve
        ]
    })
], CervicalCancerModule);
export { CervicalCancerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VydmljYWwtY2FuY2VyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xhbWlzLWNsaW5pYy0xLjQuMC8iLCJzb3VyY2VzIjpbImxpYi9jZXJ2aWNhbC1jYW5jZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxnQ0FBZ0MsRUFBQyxNQUFNLDRFQUE0RSxDQUFDO0FBQzVILE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxzQ0FBc0MsRUFBQyxNQUFNLG1GQUFtRixDQUFDO0FBQ3pJLE9BQU8sRUFBQyxpQkFBaUIsRUFBRSxtQkFBbUIsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUM5QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFxQixNQUFNLEVBQUMsTUFBTSw0Q0FBNEMsQ0FBQztBQUN0RixPQUFPLEVBQUMscUJBQXFCLEVBQUUscUJBQXFCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1RSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQXVCakQsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBb0I7Q0FFaEMsQ0FBQTtBQUZZLG9CQUFvQjtJQXJCaEMsUUFBUSxDQUFDO1FBQ04sT0FBTyxFQUFFO1lBQ0wsY0FBYztZQUNkLFdBQVc7WUFDWCxZQUFZO1lBQ1osbUJBQW1CO1lBQ25CLFVBQVU7WUFDVixZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztZQUM3QixxQkFBcUI7WUFDckIscUJBQXFCO1lBQ3JCLGlCQUFpQjtZQUNqQixpQkFBaUI7U0FDcEI7UUFDRCxZQUFZLEVBQUU7WUFDVixnQ0FBZ0M7WUFDaEMsc0NBQXNDO1NBQ3pDO1FBQ0QsU0FBUyxFQUFFO1FBQ1Asb0JBQW9CO1NBQ3ZCO0tBQ0osQ0FBQztHQUNXLG9CQUFvQixDQUVoQztTQUZZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDZXJ2aWNhbENhbmNlclNjcmVlbmluZ0NvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL2NlcnZpY2FsLWNhbmNlci1zY3JlZW5pbmcvY2VydmljYWwtY2FuY2VyLXNjcmVlbmluZy5jb21wb25lbnQnO1xuaW1wb3J0IHtNYXRlcmlhbE1vZHVsZX0gZnJvbSAnLi9tYXRlcmlhbC5tb2R1bGUnO1xuaW1wb3J0IHtGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0NlcnZpY2FsQ2FuY2VyU2NyZWVuaW5nRGV0YWlsQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvY2VydmljYWwtY2FuY2VyLXNjcmVlbmluZy9jZXJ2aWNhbC1jYW5jZXItc2NyZWVuaW5nLWRldGFpbC5jb21wb25lbnQnO1xuaW1wb3J0IHtMYW1pc1NoYXJlZE1vZHVsZSwgTWF0RGF0ZUZvcm1hdE1vZHVsZX0gZnJvbSAnQGxhbWlzL3dlYi1jb3JlJztcbmltcG9ydCB7Q29yZU1vZHVsZX0gZnJvbSAnQGFsZnJlc2NvL2FkZi1jb3JlJztcbmltcG9ydCB7Um91dGVyTW9kdWxlfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtPYnNlcnZhdGlvblJlc29sdmUsIFJPVVRFU30gZnJvbSAnLi9zZXJ2aWNlcy9jZXJ2aWNhbC1jYW5jZXItc2NyZWVuaW5nLnJvdXRlJztcbmltcG9ydCB7Q292YWxlbnREaWFsb2dzTW9kdWxlLCBDb3ZhbGVudE1lc3NhZ2VNb2R1bGV9IGZyb20gJ0Bjb3ZhbGVudC9jb3JlJztcbmltcG9ydCB7Q3VzdG9tRm9ybXNNb2R1bGV9IGZyb20gJ25nMi12YWxpZGF0aW9uJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIE1hdGVyaWFsTW9kdWxlLFxuICAgICAgICBGb3Jtc01vZHVsZSxcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBNYXREYXRlRm9ybWF0TW9kdWxlLFxuICAgICAgICBDb3JlTW9kdWxlLFxuICAgICAgICBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQoUk9VVEVTKSxcbiAgICAgICAgQ292YWxlbnRNZXNzYWdlTW9kdWxlLFxuICAgICAgICBDb3ZhbGVudERpYWxvZ3NNb2R1bGUsXG4gICAgICAgIEN1c3RvbUZvcm1zTW9kdWxlLFxuICAgICAgICBMYW1pc1NoYXJlZE1vZHVsZSxcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBDZXJ2aWNhbENhbmNlclNjcmVlbmluZ0NvbXBvbmVudCxcbiAgICAgICAgQ2VydmljYWxDYW5jZXJTY3JlZW5pbmdEZXRhaWxDb21wb25lbnRcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICAvL09ic2VydmF0aW9uUmVzb2x2ZVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgQ2VydmljYWxDYW5jZXJNb2R1bGUge1xuXG59XG4iXX0=