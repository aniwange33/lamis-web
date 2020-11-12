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
import {ROUTES} from './services/module-updates.route';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDateFormatModule} from '@lamis/web-core';
import {CustomFormsModule} from 'ng2-validation';
import {ModuleUpdatesComponent} from './components/module-updates.component';
import {DatabaseSyncComponent} from './components/database.sync.component';

var ModuleUpdatesModule = /** @class */ (function () {
    function ModuleUpdatesModule() {
    }

    ModuleUpdatesModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                DatabaseSyncComponent,
                ModuleUpdatesComponent
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
                ReactiveFormsModule,
                MatDateFormatModule,
                CustomFormsModule
            ],
            exports: [],
            entryComponents: [],
            providers: []
        })
    ], ModuleUpdatesModule);
    return ModuleUpdatesModule;
}());
export {ModuleUpdatesModule};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLnVwZGF0ZXMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGFtaXMtZGF0YWJhc2UtMS4wLjAvIiwic291cmNlcyI6WyJsaWIvbW9kdWxlLnVwZGF0ZXMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDaEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUNILGVBQWUsRUFDZixhQUFhLEVBQ2IsYUFBYSxFQUNiLGNBQWMsRUFDZCxhQUFhLEVBQ2Isb0JBQW9CLEVBQ3BCLGVBQWUsRUFDZixjQUFjLEVBQ2pCLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN6RCxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDL0UsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFnQzdFO0lBQUE7SUFDQSxDQUFDO0lBRFksbUJBQW1CO1FBOUIvQixRQUFRLENBQUM7WUFDTixZQUFZLEVBQUU7Z0JBQ1YscUJBQXFCO2dCQUNyQixzQkFBc0I7YUFDekI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsWUFBWTtnQkFDWixjQUFjO2dCQUNkLGFBQWE7Z0JBQ2IsYUFBYTtnQkFDYixlQUFlO2dCQUNmLGVBQWU7Z0JBQ2YsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7Z0JBQzdCLG9CQUFvQjtnQkFDcEIsV0FBVztnQkFDWCxxQkFBcUI7Z0JBQ3JCLHFCQUFxQjtnQkFDckIsY0FBYztnQkFDZCxhQUFhO2dCQUNiLFVBQVU7Z0JBQ1YsbUJBQW1CO2dCQUNuQixtQkFBbUI7Z0JBQ25CLGlCQUFpQjthQUNwQjtZQUNELE9BQU8sRUFBRSxFQUNSO1lBQ0QsZUFBZSxFQUFFLEVBQUU7WUFDbkIsU0FBUyxFQUFFLEVBQ1Y7U0FDSixDQUFDO09BQ1csbUJBQW1CLENBQy9CO0lBQUQsMEJBQUM7Q0FBQSxBQURELElBQ0M7U0FEWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb3JlTW9kdWxlIH0gZnJvbSAnQGFsZnJlc2NvL2FkZi1jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtcclxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcclxuICAgIE1hdENhcmRNb2R1bGUsXHJcbiAgICBNYXRJY29uTW9kdWxlLFxyXG4gICAgTWF0SW5wdXRNb2R1bGUsXHJcbiAgICBNYXRMaXN0TW9kdWxlLFxyXG4gICAgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXHJcbiAgICBNYXRTZWxlY3RNb2R1bGUsXHJcbiAgICBNYXRUYWJsZU1vZHVsZVxyXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQ292YWxlbnREaWFsb2dzTW9kdWxlLCBDb3ZhbGVudE1lc3NhZ2VNb2R1bGUgfSBmcm9tICdAY292YWxlbnQvY29yZSc7XHJcbmltcG9ydCB7IFJPVVRFUyB9IGZyb20gJy4vc2VydmljZXMvbW9kdWxlLXVwZGF0ZXMucm91dGUnO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgTWF0RGF0ZUZvcm1hdE1vZHVsZSB9IGZyb20gJ0BsYW1pcy93ZWItY29yZSc7XHJcbmltcG9ydCB7IEN1c3RvbUZvcm1zTW9kdWxlIH0gZnJvbSAnbmcyLXZhbGlkYXRpb24nO1xyXG5pbXBvcnQgeyBNb2R1bGVVcGRhdGVzQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL21vZHVsZS11cGRhdGVzLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IERhdGFiYXNlU3luY0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9kYXRhYmFzZS5zeW5jLmNvbXBvbmVudCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgRGF0YWJhc2VTeW5jQ29tcG9uZW50LFxyXG4gICAgICAgIE1vZHVsZVVwZGF0ZXNDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgICAgIE1hdElucHV0TW9kdWxlLFxyXG4gICAgICAgIE1hdEljb25Nb2R1bGUsXHJcbiAgICAgICAgTWF0Q2FyZE1vZHVsZSxcclxuICAgICAgICBNYXRTZWxlY3RNb2R1bGUsXHJcbiAgICAgICAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gICAgICAgIFJvdXRlck1vZHVsZS5mb3JDaGlsZChST1VURVMpLFxyXG4gICAgICAgIE1hdFByb2dyZXNzQmFyTW9kdWxlLFxyXG4gICAgICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgICAgIENvdmFsZW50TWVzc2FnZU1vZHVsZSxcclxuICAgICAgICBDb3ZhbGVudERpYWxvZ3NNb2R1bGUsXHJcbiAgICAgICAgTWF0VGFibGVNb2R1bGUsXHJcbiAgICAgICAgTWF0TGlzdE1vZHVsZSxcclxuICAgICAgICBDb3JlTW9kdWxlLFxyXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgICAgICAgTWF0RGF0ZUZvcm1hdE1vZHVsZSxcclxuICAgICAgICBDdXN0b21Gb3Jtc01vZHVsZVxyXG4gICAgXSxcclxuICAgIGV4cG9ydHM6IFtcclxuICAgIF0sXHJcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtdLFxyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNb2R1bGVVcGRhdGVzTW9kdWxlIHtcclxufVxyXG4iXX0=
