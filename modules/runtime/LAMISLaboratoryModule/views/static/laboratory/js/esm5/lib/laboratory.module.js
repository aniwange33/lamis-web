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
import {LaboratoryResolve, ROUTES} from './services/laboratory.route';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {MatDateFormatModule} from '@lamis/web-core';
import {CustomFormsModule} from 'ng2-validation';
import {LaboratoryDetailsComponent} from './components/laboratory-details.component';
import {LaboratoryEditComponent} from './components/laboratory-edit.component';

var LaboratoryModule = /** @class */ (function () {
    function LaboratoryModule() {
    }

    LaboratoryModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                LaboratoryDetailsComponent,
                LaboratoryEditComponent
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
                NgxDatatableModule,
                ReactiveFormsModule,
                MatDateFormatModule,
                CustomFormsModule
            ],
            exports: [
                LaboratoryDetailsComponent,
                LaboratoryEditComponent
            ],
            entryComponents: [],
            providers: [
                LaboratoryResolve
            ]
        })
    ], LaboratoryModule);
    return LaboratoryModule;
}());
export {LaboratoryModule};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFib3JhdG9yeS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1sYWJvcmF0b3J5LTEuMS4xLyIsInNvdXJjZXMiOlsibGliL2xhYm9yYXRvcnkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDaEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUNILGVBQWUsRUFDZixhQUFhLEVBQ2IsYUFBYSxFQUNiLGNBQWMsRUFDZCxhQUFhLEVBQ2Isb0JBQW9CLEVBQ3BCLGVBQWUsRUFDZixjQUFjLEVBQ2pCLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDN0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDdkYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFvQ2pGO0lBQUE7SUFDQSxDQUFDO0lBRFksZ0JBQWdCO1FBbEM1QixRQUFRLENBQUM7WUFDTixZQUFZLEVBQUU7Z0JBQ1YsMEJBQTBCO2dCQUMxQix1QkFBdUI7YUFDMUI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsWUFBWTtnQkFDWixjQUFjO2dCQUNkLGFBQWE7Z0JBQ2IsYUFBYTtnQkFDYixlQUFlO2dCQUNmLGVBQWU7Z0JBQ2YsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7Z0JBQzdCLG9CQUFvQjtnQkFDcEIsV0FBVztnQkFDWCxxQkFBcUI7Z0JBQ3JCLHFCQUFxQjtnQkFDckIsY0FBYztnQkFDZCxhQUFhO2dCQUNiLFVBQVU7Z0JBQ1Ysa0JBQWtCO2dCQUNsQixtQkFBbUI7Z0JBQ25CLG1CQUFtQjtnQkFDbkIsaUJBQWlCO2FBQ3BCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLDBCQUEwQjtnQkFDMUIsdUJBQXVCO2FBQzFCO1lBQ0QsZUFBZSxFQUFFLEVBQUU7WUFDbkIsU0FBUyxFQUFFO2dCQUNQLGlCQUFpQjthQUNwQjtTQUNKLENBQUM7T0FDVyxnQkFBZ0IsQ0FDNUI7SUFBRCx1QkFBQztDQUFBLEFBREQsSUFDQztTQURZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvcmVNb2R1bGUgfSBmcm9tICdAYWxmcmVzY28vYWRmLWNvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gICAgTWF0Q2FyZE1vZHVsZSxcclxuICAgIE1hdEljb25Nb2R1bGUsXHJcbiAgICBNYXRJbnB1dE1vZHVsZSxcclxuICAgIE1hdExpc3RNb2R1bGUsXHJcbiAgICBNYXRQcm9ncmVzc0Jhck1vZHVsZSxcclxuICAgIE1hdFNlbGVjdE1vZHVsZSxcclxuICAgIE1hdFRhYmxlTW9kdWxlXHJcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBDb3ZhbGVudERpYWxvZ3NNb2R1bGUsIENvdmFsZW50TWVzc2FnZU1vZHVsZSB9IGZyb20gJ0Bjb3ZhbGVudC9jb3JlJztcclxuaW1wb3J0IHsgTGFib3JhdG9yeVJlc29sdmUsIFJPVVRFUyB9IGZyb20gJy4vc2VydmljZXMvbGFib3JhdG9yeS5yb3V0ZSc7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBOZ3hEYXRhdGFibGVNb2R1bGUgfSBmcm9tICdAc3dpbWxhbmUvbmd4LWRhdGF0YWJsZSc7XHJcbmltcG9ydCB7IE1hdERhdGVGb3JtYXRNb2R1bGUgfSBmcm9tICdAbGFtaXMvd2ViLWNvcmUnO1xyXG5pbXBvcnQgeyBDdXN0b21Gb3Jtc01vZHVsZSB9IGZyb20gJ25nMi12YWxpZGF0aW9uJztcclxuaW1wb3J0IHsgTGFib3JhdG9yeURldGFpbHNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbGFib3JhdG9yeS1kZXRhaWxzLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IExhYm9yYXRvcnlFZGl0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2xhYm9yYXRvcnktZWRpdC5jb21wb25lbnQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIExhYm9yYXRvcnlEZXRhaWxzQ29tcG9uZW50LFxyXG4gICAgICAgIExhYm9yYXRvcnlFZGl0Q29tcG9uZW50XHJcbiAgICBdLFxyXG4gICAgaW1wb3J0czogW1xyXG4gICAgICAgIENvbW1vbk1vZHVsZSxcclxuICAgICAgICBNYXRJbnB1dE1vZHVsZSxcclxuICAgICAgICBNYXRJY29uTW9kdWxlLFxyXG4gICAgICAgIE1hdENhcmRNb2R1bGUsXHJcbiAgICAgICAgTWF0U2VsZWN0TW9kdWxlLFxyXG4gICAgICAgIE1hdEJ1dHRvbk1vZHVsZSxcclxuICAgICAgICBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQoUk9VVEVTKSxcclxuICAgICAgICBNYXRQcm9ncmVzc0Jhck1vZHVsZSxcclxuICAgICAgICBGb3Jtc01vZHVsZSxcclxuICAgICAgICBDb3ZhbGVudE1lc3NhZ2VNb2R1bGUsXHJcbiAgICAgICAgQ292YWxlbnREaWFsb2dzTW9kdWxlLFxyXG4gICAgICAgIE1hdFRhYmxlTW9kdWxlLFxyXG4gICAgICAgIE1hdExpc3RNb2R1bGUsXHJcbiAgICAgICAgQ29yZU1vZHVsZSxcclxuICAgICAgICBOZ3hEYXRhdGFibGVNb2R1bGUsXHJcbiAgICAgICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuICAgICAgICBNYXREYXRlRm9ybWF0TW9kdWxlLFxyXG4gICAgICAgIEN1c3RvbUZvcm1zTW9kdWxlXHJcbiAgICBdLFxyXG4gICAgZXhwb3J0czogW1xyXG4gICAgICAgIExhYm9yYXRvcnlEZXRhaWxzQ29tcG9uZW50LFxyXG4gICAgICAgIExhYm9yYXRvcnlFZGl0Q29tcG9uZW50XHJcbiAgICBdLFxyXG4gICAgZW50cnlDb21wb25lbnRzOiBbXSxcclxuICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIExhYm9yYXRvcnlSZXNvbHZlXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMYWJvcmF0b3J5TW9kdWxlIHtcclxufVxyXG4iXX0=
