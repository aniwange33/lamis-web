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

var ClientStatusModule = /** @class */ (function () {
    function ClientStatusModule() {
    }

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
    return ClientStatusModule;
}());
export {ClientStatusModule};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LXN0YXR1cy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1wYXRpZW50LTEuMi4wLyIsInNvdXJjZXMiOlsibGliL2NsaWVudC1zdGF0dXMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxjQUFjLEVBQUUsaUJBQWlCLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDaEUsT0FBTyxFQUNILGVBQWUsRUFDZixhQUFhLEVBQ2IsaUJBQWlCLEVBQ2pCLGdCQUFnQixFQUNoQixhQUFhLEVBQ2IsY0FBYyxFQUNkLG9CQUFvQixFQUNwQixlQUFlLEVBQ2YsYUFBYSxFQUNoQixNQUFNLG1CQUFtQixDQUFDO0FBQzNCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBa0M3RTtJQUFBO0lBRUEsQ0FBQztJQUZZLGtCQUFrQjtRQWhDOUIsUUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFO2dCQUNMLFlBQVk7Z0JBQ1osV0FBVztnQkFDWCxtQkFBbUI7Z0JBQ25CLHFCQUFxQjtnQkFDckIsaUJBQWlCO2dCQUNqQixjQUFjO2dCQUNkLGVBQWU7Z0JBQ2YsY0FBYztnQkFDZCxhQUFhO2dCQUNiLGdCQUFnQjtnQkFDaEIsYUFBYTtnQkFDYixlQUFlO2dCQUNmLGVBQWU7Z0JBQ2YsaUJBQWlCO2dCQUNqQixhQUFhO2dCQUNiLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO2dCQUM3QixvQkFBb0I7Z0JBQ3BCLFVBQVU7Z0JBQ1YsbUJBQW1CO2FBQ3RCO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLHFCQUFxQjthQUN4QjtZQUNELE9BQU8sRUFBRTtnQkFDTCxxQkFBcUI7YUFDeEI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1AsYUFBYTthQUNoQjtTQUNKLENBQUM7T0FDVyxrQkFBa0IsQ0FFOUI7SUFBRCx5QkFBQztDQUFBLEFBRkQsSUFFQztTQUZZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb3ZhbGVudERpYWxvZ3NNb2R1bGUgfSBmcm9tICdAY292YWxlbnQvY29yZSc7XG5pbXBvcnQgeyBDb3JlTW9kdWxlIH0gZnJvbSAnQGFsZnJlc2NvL2FkZi1jb3JlJztcbmltcG9ydCB7IEpzb25Gb3JtTW9kdWxlLCBMYW1pc1NoYXJlZE1vZHVsZSwgTWF0RGF0ZUZvcm1hdE1vZHVsZSB9IGZyb20gJ0BsYW1pcy93ZWItY29yZSc7XG5pbXBvcnQgeyBNYXRGb3JtaW9Nb2R1bGUgfSBmcm9tICdhbmd1bGFyLW1hdGVyaWFsLWZvcm1pbyc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgUk9VVEVTLCBTdGF0dXNSZXNvbHZlIH0gZnJvbSAnLi9zZXJ2aWNlcy9zdGF0dXMucm91dGUnO1xuaW1wb3J0IHtcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0Q2FyZE1vZHVsZSxcbiAgICBNYXRDaGVja2JveE1vZHVsZSxcbiAgICBNYXREaXZpZGVyTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXG4gICAgTWF0U2VsZWN0TW9kdWxlLFxuICAgIE1hdFRhYnNNb2R1bGVcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgQ2xpZW50U3RhdHVzQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2NsaWVudC1zdGF0dXMuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgICAgIENvdmFsZW50RGlhbG9nc01vZHVsZSxcbiAgICAgICAgTGFtaXNTaGFyZWRNb2R1bGUsXG4gICAgICAgIEpzb25Gb3JtTW9kdWxlLFxuICAgICAgICBNYXRGb3JtaW9Nb2R1bGUsXG4gICAgICAgIE1hdElucHV0TW9kdWxlLFxuICAgICAgICBNYXRJY29uTW9kdWxlLFxuICAgICAgICBNYXREaXZpZGVyTW9kdWxlLFxuICAgICAgICBNYXRDYXJkTW9kdWxlLFxuICAgICAgICBNYXRTZWxlY3RNb2R1bGUsXG4gICAgICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICAgICAgTWF0Q2hlY2tib3hNb2R1bGUsXG4gICAgICAgIE1hdFRhYnNNb2R1bGUsXG4gICAgICAgIFJvdXRlck1vZHVsZS5mb3JDaGlsZChST1VURVMpLFxuICAgICAgICBNYXRQcm9ncmVzc0Jhck1vZHVsZSxcbiAgICAgICAgQ29yZU1vZHVsZSxcbiAgICAgICAgTWF0RGF0ZUZvcm1hdE1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIENsaWVudFN0YXR1c0NvbXBvbmVudFxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBDbGllbnRTdGF0dXNDb21wb25lbnRcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBTdGF0dXNSZXNvbHZlXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBDbGllbnRTdGF0dXNNb2R1bGUge1xuXG59XG4iXX0=
