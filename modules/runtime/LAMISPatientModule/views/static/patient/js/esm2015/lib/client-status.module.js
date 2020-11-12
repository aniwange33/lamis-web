import * as tslib_1 from "tslib";
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CovalentDialogsModule} from '@covalent/core';
import {CoreModule} from '@alfresco/adf-core';
import {JsonFormModule, LamisSharedModule, MatDateFormatModule} from '@lamis/web-core';
import {MatFormioModule} from 'angular-material-formio';
import {RouterModule} from '@angular/router';
import {ROUTES, StatusResolve} from './services/status.route';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatSelectModule,
    MatTabsModule
} from '@angular/material';
import {ClientStatusComponent} from './components/client-status.component';

let ClientStatusModule = class ClientStatusModule {
};
ClientStatusModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            CovalentDialogsModule,
            LamisSharedModule,
            JsonFormModule,
            MatFormioModule,
            MatInputModule,
            MatIconModule,
            MatDividerModule,
            MatCardModule,
            MatSelectModule,
            MatButtonModule,
            MatCheckboxModule,
            MatTabsModule,
            RouterModule.forChild(ROUTES),
            MatProgressBarModule,
            CoreModule,
            MatDateFormatModule
        ],
        declarations: [
            ClientStatusComponent
        ],
        exports: [
            ClientStatusComponent
        ],
        providers: [
            StatusResolve
        ]
    })
], ClientStatusModule);
export {ClientStatusModule};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LXN0YXR1cy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1wYXRpZW50LTEuMi4wLyIsInNvdXJjZXMiOlsibGliL2NsaWVudC1zdGF0dXMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxjQUFjLEVBQUUsaUJBQWlCLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDaEUsT0FBTyxFQUNILGVBQWUsRUFDZixhQUFhLEVBQ2IsaUJBQWlCLEVBQ2pCLGdCQUFnQixFQUNoQixhQUFhLEVBQ2IsY0FBYyxFQUNkLG9CQUFvQixFQUNwQixlQUFlLEVBQ2YsYUFBYSxFQUNoQixNQUFNLG1CQUFtQixDQUFDO0FBQzNCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBa0M3RSxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFrQjtDQUU5QixDQUFBO0FBRlksa0JBQWtCO0lBaEM5QixRQUFRLENBQUM7UUFDTixPQUFPLEVBQUU7WUFDTCxZQUFZO1lBQ1osV0FBVztZQUNYLG1CQUFtQjtZQUNuQixxQkFBcUI7WUFDckIsaUJBQWlCO1lBQ2pCLGNBQWM7WUFDZCxlQUFlO1lBQ2YsY0FBYztZQUNkLGFBQWE7WUFDYixnQkFBZ0I7WUFDaEIsYUFBYTtZQUNiLGVBQWU7WUFDZixlQUFlO1lBQ2YsaUJBQWlCO1lBQ2pCLGFBQWE7WUFDYixZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztZQUM3QixvQkFBb0I7WUFDcEIsVUFBVTtZQUNWLG1CQUFtQjtTQUN0QjtRQUNELFlBQVksRUFBRTtZQUNWLHFCQUFxQjtTQUN4QjtRQUNELE9BQU8sRUFBRTtZQUNMLHFCQUFxQjtTQUN4QjtRQUNELFNBQVMsRUFBRTtZQUNQLGFBQWE7U0FDaEI7S0FDSixDQUFDO0dBQ1csa0JBQWtCLENBRTlCO1NBRlksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENvdmFsZW50RGlhbG9nc01vZHVsZSB9IGZyb20gJ0Bjb3ZhbGVudC9jb3JlJztcbmltcG9ydCB7IENvcmVNb2R1bGUgfSBmcm9tICdAYWxmcmVzY28vYWRmLWNvcmUnO1xuaW1wb3J0IHsgSnNvbkZvcm1Nb2R1bGUsIExhbWlzU2hhcmVkTW9kdWxlLCBNYXREYXRlRm9ybWF0TW9kdWxlIH0gZnJvbSAnQGxhbWlzL3dlYi1jb3JlJztcbmltcG9ydCB7IE1hdEZvcm1pb01vZHVsZSB9IGZyb20gJ2FuZ3VsYXItbWF0ZXJpYWwtZm9ybWlvJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBST1VURVMsIFN0YXR1c1Jlc29sdmUgfSBmcm9tICcuL3NlcnZpY2VzL3N0YXR1cy5yb3V0ZSc7XG5pbXBvcnQge1xuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXRDYXJkTW9kdWxlLFxuICAgIE1hdENoZWNrYm94TW9kdWxlLFxuICAgIE1hdERpdmlkZXJNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBNYXRQcm9ncmVzc0Jhck1vZHVsZSxcbiAgICBNYXRTZWxlY3RNb2R1bGUsXG4gICAgTWF0VGFic01vZHVsZVxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBDbGllbnRTdGF0dXNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY2xpZW50LXN0YXR1cy5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBGb3Jtc01vZHVsZSxcbiAgICAgICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICAgICAgQ292YWxlbnREaWFsb2dzTW9kdWxlLFxuICAgICAgICBMYW1pc1NoYXJlZE1vZHVsZSxcbiAgICAgICAgSnNvbkZvcm1Nb2R1bGUsXG4gICAgICAgIE1hdEZvcm1pb01vZHVsZSxcbiAgICAgICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgICAgIE1hdEljb25Nb2R1bGUsXG4gICAgICAgIE1hdERpdmlkZXJNb2R1bGUsXG4gICAgICAgIE1hdENhcmRNb2R1bGUsXG4gICAgICAgIE1hdFNlbGVjdE1vZHVsZSxcbiAgICAgICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgICAgICBNYXRDaGVja2JveE1vZHVsZSxcbiAgICAgICAgTWF0VGFic01vZHVsZSxcbiAgICAgICAgUm91dGVyTW9kdWxlLmZvckNoaWxkKFJPVVRFUyksXG4gICAgICAgIE1hdFByb2dyZXNzQmFyTW9kdWxlLFxuICAgICAgICBDb3JlTW9kdWxlLFxuICAgICAgICBNYXREYXRlRm9ybWF0TW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgQ2xpZW50U3RhdHVzQ29tcG9uZW50XG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIENsaWVudFN0YXR1c0NvbXBvbmVudFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIFN0YXR1c1Jlc29sdmVcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIENsaWVudFN0YXR1c01vZHVsZSB7XG5cbn1cbiJdfQ==
