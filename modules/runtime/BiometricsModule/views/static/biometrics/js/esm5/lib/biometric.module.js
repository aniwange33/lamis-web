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
import {BiometricEditComponent} from './components/biometric-edit.component';
import {ROUTES} from './services/biometric.route';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {MatDateFormatModule} from '@lamis/web-core';
import {CustomFormsModule} from 'ng2-validation';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

var BiometricModule = /** @class */ (function () {
    function BiometricModule(_iconRegistry, _domSanitizer) {
        this._iconRegistry = _iconRegistry;
        this._domSanitizer = _domSanitizer;
        this._iconRegistry.addSvgIconInNamespace('fingerprint', 'right_index', this._domSanitizer.bypassSecurityTrustResourceUrl('/across/resources/static/fingerprint/img/right_index.svg'));
        this._iconRegistry.addSvgIconInNamespace('fingerprint', 'left_index', this._domSanitizer.bypassSecurityTrustResourceUrl('/across/resources/static/fingerprint/img/left_index.svg'));
        this._iconRegistry.addSvgIconInNamespace('fingerprint', 'right_thumb', this._domSanitizer.bypassSecurityTrustResourceUrl('/across/resources/static/fingerprint/img/right_thumb.svg'));
        this._iconRegistry.addSvgIconInNamespace('fingerprint', 'left_thumb', this._domSanitizer.bypassSecurityTrustResourceUrl('/across/resources/static/fingerprint/img/left_thumb.svg'));
    }

    BiometricModule.ctorParameters = function () {
        return [
            {type: MatIconRegistry},
            {type: DomSanitizer}
        ];
    };
    BiometricModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                BiometricEditComponent
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
                BiometricEditComponent
            ],
            entryComponents: [],
            providers: []
        }),
        tslib_1.__metadata("design:paramtypes", [MatIconRegistry,
            DomSanitizer])
    ], BiometricModule);
    return BiometricModule;
}());
export {BiometricModule};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmlvbWV0cmljLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xhbWlzLWJpb21ldHJpY3MtMS4wLjAvIiwic291cmNlcyI6WyJsaWIvYmlvbWV0cmljLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFDSCxlQUFlLEVBQ2YsYUFBYSxFQUNiLGFBQWEsRUFDYixjQUFjLEVBQ2QsYUFBYSxFQUNiLG9CQUFvQixFQUNwQixlQUFlLEVBQ2YsY0FBYyxFQUNqQixNQUFNLG1CQUFtQixDQUFDO0FBQzNCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMvRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzdELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFpQ3pEO0lBQ0kseUJBQW9CLGFBQThCLEVBQzlCLGFBQTJCO1FBRDNCLGtCQUFhLEdBQWIsYUFBYSxDQUFpQjtRQUM5QixrQkFBYSxHQUFiLGFBQWEsQ0FBYztRQUMzQyxJQUFJLENBQUMsYUFBYSxDQUFDLHFCQUFxQixDQUFDLGFBQWEsRUFBRSxhQUFhLEVBQ2pFLElBQUksQ0FBQyxhQUFhLENBQUMsOEJBQThCLENBQUMsMERBQTBELENBQUMsQ0FBQyxDQUFDO1FBQ25ILElBQUksQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQUMsYUFBYSxFQUFFLFlBQVksRUFDaEUsSUFBSSxDQUFDLGFBQWEsQ0FBQyw4QkFBOEIsQ0FBQyx5REFBeUQsQ0FBQyxDQUFDLENBQUM7UUFDbEgsSUFBSSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxhQUFhLEVBQUUsYUFBYSxFQUNqRSxJQUFJLENBQUMsYUFBYSxDQUFDLDhCQUE4QixDQUFDLDBEQUEwRCxDQUFDLENBQUMsQ0FBQztRQUNuSCxJQUFJLENBQUMsYUFBYSxDQUFDLHFCQUFxQixDQUFDLGFBQWEsRUFBRSxZQUFZLEVBQ2hFLElBQUksQ0FBQyxhQUFhLENBQUMsOEJBQThCLENBQUMseURBQXlELENBQUMsQ0FBQyxDQUFDO0lBQ3RILENBQUM7O2dCQVZrQyxlQUFlO2dCQUNmLFlBQVk7O0lBRnRDLGVBQWU7UUEvQjNCLFFBQVEsQ0FBQztZQUNOLFlBQVksRUFBRTtnQkFDVixzQkFBc0I7YUFDekI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsWUFBWTtnQkFDWixjQUFjO2dCQUNkLGFBQWE7Z0JBQ2IsYUFBYTtnQkFDYixlQUFlO2dCQUNmLGVBQWU7Z0JBQ2YsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7Z0JBQzdCLG9CQUFvQjtnQkFDcEIsV0FBVztnQkFDWCxxQkFBcUI7Z0JBQ3JCLHFCQUFxQjtnQkFDckIsY0FBYztnQkFDZCxhQUFhO2dCQUNiLFVBQVU7Z0JBQ1Ysa0JBQWtCO2dCQUNsQixtQkFBbUI7Z0JBQ25CLG1CQUFtQjtnQkFDbkIsaUJBQWlCO2FBQ3BCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLHNCQUFzQjthQUN6QjtZQUNELGVBQWUsRUFBRSxFQUFFO1lBQ25CLFNBQVMsRUFBRSxFQUNWO1NBQ0osQ0FBQztpREFFcUMsZUFBZTtZQUNmLFlBQVk7T0FGdEMsZUFBZSxDQVkzQjtJQUFELHNCQUFDO0NBQUEsQUFaRCxJQVlDO1NBWlksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvcmVNb2R1bGUgfSBmcm9tICdAYWxmcmVzY28vYWRmLWNvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gICAgTWF0Q2FyZE1vZHVsZSxcclxuICAgIE1hdEljb25Nb2R1bGUsXHJcbiAgICBNYXRJbnB1dE1vZHVsZSxcclxuICAgIE1hdExpc3RNb2R1bGUsXHJcbiAgICBNYXRQcm9ncmVzc0Jhck1vZHVsZSxcclxuICAgIE1hdFNlbGVjdE1vZHVsZSxcclxuICAgIE1hdFRhYmxlTW9kdWxlXHJcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBDb3ZhbGVudERpYWxvZ3NNb2R1bGUsIENvdmFsZW50TWVzc2FnZU1vZHVsZSB9IGZyb20gJ0Bjb3ZhbGVudC9jb3JlJztcclxuaW1wb3J0IHsgQmlvbWV0cmljRWRpdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9iaW9tZXRyaWMtZWRpdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBST1VURVMgfSBmcm9tICcuL3NlcnZpY2VzL2Jpb21ldHJpYy5yb3V0ZSc7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBOZ3hEYXRhdGFibGVNb2R1bGUgfSBmcm9tICdAc3dpbWxhbmUvbmd4LWRhdGF0YWJsZSc7XHJcbmltcG9ydCB7IE1hdERhdGVGb3JtYXRNb2R1bGUgfSBmcm9tICdAbGFtaXMvd2ViLWNvcmUnO1xyXG5pbXBvcnQgeyBDdXN0b21Gb3Jtc01vZHVsZSB9IGZyb20gJ25nMi12YWxpZGF0aW9uJztcclxuaW1wb3J0IHsgTWF0SWNvblJlZ2lzdHJ5IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaWNvbic7XHJcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIEJpb21ldHJpY0VkaXRDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgICAgIE1hdElucHV0TW9kdWxlLFxyXG4gICAgICAgIE1hdEljb25Nb2R1bGUsXHJcbiAgICAgICAgTWF0Q2FyZE1vZHVsZSxcclxuICAgICAgICBNYXRTZWxlY3RNb2R1bGUsXHJcbiAgICAgICAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gICAgICAgIFJvdXRlck1vZHVsZS5mb3JDaGlsZChST1VURVMpLFxyXG4gICAgICAgIE1hdFByb2dyZXNzQmFyTW9kdWxlLFxyXG4gICAgICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgICAgIENvdmFsZW50TWVzc2FnZU1vZHVsZSxcclxuICAgICAgICBDb3ZhbGVudERpYWxvZ3NNb2R1bGUsXHJcbiAgICAgICAgTWF0VGFibGVNb2R1bGUsXHJcbiAgICAgICAgTWF0TGlzdE1vZHVsZSxcclxuICAgICAgICBDb3JlTW9kdWxlLFxyXG4gICAgICAgIE5neERhdGF0YWJsZU1vZHVsZSxcclxuICAgICAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgICAgIE1hdERhdGVGb3JtYXRNb2R1bGUsXHJcbiAgICAgICAgQ3VzdG9tRm9ybXNNb2R1bGVcclxuICAgIF0sXHJcbiAgICBleHBvcnRzOiBbXHJcbiAgICAgICAgQmlvbWV0cmljRWRpdENvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIGVudHJ5Q29tcG9uZW50czogW10sXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEJpb21ldHJpY01vZHVsZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9pY29uUmVnaXN0cnk6IE1hdEljb25SZWdpc3RyeSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgX2RvbVNhbml0aXplcjogRG9tU2FuaXRpemVyKSB7XHJcbiAgICAgICAgdGhpcy5faWNvblJlZ2lzdHJ5LmFkZFN2Z0ljb25Jbk5hbWVzcGFjZSgnZmluZ2VycHJpbnQnLCAncmlnaHRfaW5kZXgnLFxyXG4gICAgICAgICAgICB0aGlzLl9kb21TYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKCcvYWNyb3NzL3Jlc291cmNlcy9zdGF0aWMvZmluZ2VycHJpbnQvaW1nL3JpZ2h0X2luZGV4LnN2ZycpKTtcclxuICAgICAgICB0aGlzLl9pY29uUmVnaXN0cnkuYWRkU3ZnSWNvbkluTmFtZXNwYWNlKCdmaW5nZXJwcmludCcsICdsZWZ0X2luZGV4JyxcclxuICAgICAgICAgICAgdGhpcy5fZG9tU2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybCgnL2Fjcm9zcy9yZXNvdXJjZXMvc3RhdGljL2ZpbmdlcnByaW50L2ltZy9sZWZ0X2luZGV4LnN2ZycpKTtcclxuICAgICAgICB0aGlzLl9pY29uUmVnaXN0cnkuYWRkU3ZnSWNvbkluTmFtZXNwYWNlKCdmaW5nZXJwcmludCcsICdyaWdodF90aHVtYicsXHJcbiAgICAgICAgICAgIHRoaXMuX2RvbVNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwoJy9hY3Jvc3MvcmVzb3VyY2VzL3N0YXRpYy9maW5nZXJwcmludC9pbWcvcmlnaHRfdGh1bWIuc3ZnJykpO1xyXG4gICAgICAgIHRoaXMuX2ljb25SZWdpc3RyeS5hZGRTdmdJY29uSW5OYW1lc3BhY2UoJ2ZpbmdlcnByaW50JywgJ2xlZnRfdGh1bWInLFxyXG4gICAgICAgICAgICB0aGlzLl9kb21TYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKCcvYWNyb3NzL3Jlc291cmNlcy9zdGF0aWMvZmluZ2VycHJpbnQvaW1nL2xlZnRfdGh1bWIuc3ZnJykpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==
