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
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

var BiometricsModule = /** @class */ (function () {
    function BiometricsModule(_iconRegistry, _domSanitizer) {
        this._iconRegistry = _iconRegistry;
        this._domSanitizer = _domSanitizer;
        /*this._iconRegistry.addSvgIconInNamespace('fingerprint', 'right_index',
            this._domSanitizer.bypassSecurityTrustResourceUrl('/across/resources/static/fingerprint/img/right_index.svg'));
        this._iconRegistry.addSvgIconInNamespace('fingerprint', 'left_index',
            this._domSanitizer.bypassSecurityTrustResourceUrl('/across/resources/static/fingerprint/img/left_index.svg'));
        this._iconRegistry.addSvgIconInNamespace('fingerprint', 'right_thumb',
            this._domSanitizer.bypassSecurityTrustResourceUrl('/across/resources/static/fingerprint/img/right_thumb.svg'));
        this._iconRegistry.addSvgIconInNamespace('fingerprint', 'left_thumb',
            this._domSanitizer.bypassSecurityTrustResourceUrl('/across/resources/static/fingerprint/img/left_thumb.svg'));*/
    }

    BiometricsModule.ctorParameters = function () {
        return [
            {type: MatIconRegistry},
            {type: DomSanitizer}
        ];
    };
    BiometricsModule = tslib_1.__decorate([
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
    ], BiometricsModule);
    return BiometricsModule;
}());
export {BiometricsModule};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmlvbWV0cmljcy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1iaW9tZXRyaWNzLTEuMC4wLyIsInNvdXJjZXMiOlsibGliL2Jpb21ldHJpY3MubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDaEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUNILGVBQWUsRUFDZixhQUFhLEVBQ2IsYUFBYSxFQUNiLGNBQWMsRUFDZCxhQUFhLEVBQ2Isb0JBQW9CLEVBQ3BCLGVBQWUsRUFDZixjQUFjLEVBQ2pCLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDN0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQWlDekQ7SUFDSSwwQkFBb0IsYUFBOEIsRUFDOUIsYUFBMkI7UUFEM0Isa0JBQWEsR0FBYixhQUFhLENBQWlCO1FBQzlCLGtCQUFhLEdBQWIsYUFBYSxDQUFjO1FBQzNDOzs7Ozs7OzRIQU9vSDtJQUN4SCxDQUFDOztnQkFWa0MsZUFBZTtnQkFDZixZQUFZOztJQUZ0QyxnQkFBZ0I7UUEvQjVCLFFBQVEsQ0FBQztZQUNOLFlBQVksRUFBRTtnQkFDVixzQkFBc0I7YUFDekI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsWUFBWTtnQkFDWixjQUFjO2dCQUNkLGFBQWE7Z0JBQ2IsYUFBYTtnQkFDYixlQUFlO2dCQUNmLGVBQWU7Z0JBQ2YsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7Z0JBQzdCLG9CQUFvQjtnQkFDcEIsV0FBVztnQkFDWCxxQkFBcUI7Z0JBQ3JCLHFCQUFxQjtnQkFDckIsY0FBYztnQkFDZCxhQUFhO2dCQUNiLFVBQVU7Z0JBQ1Ysa0JBQWtCO2dCQUNsQixtQkFBbUI7Z0JBQ25CLG1CQUFtQjtnQkFDbkIsaUJBQWlCO2FBQ3BCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLHNCQUFzQjthQUN6QjtZQUNELGVBQWUsRUFBRSxFQUFFO1lBQ25CLFNBQVMsRUFBRSxFQUNWO1NBQ0osQ0FBQztpREFFcUMsZUFBZTtZQUNmLFlBQVk7T0FGdEMsZ0JBQWdCLENBWTVCO0lBQUQsdUJBQUM7Q0FBQSxBQVpELElBWUM7U0FaWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb3JlTW9kdWxlIH0gZnJvbSAnQGFsZnJlc2NvL2FkZi1jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtcclxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcclxuICAgIE1hdENhcmRNb2R1bGUsXHJcbiAgICBNYXRJY29uTW9kdWxlLFxyXG4gICAgTWF0SW5wdXRNb2R1bGUsXHJcbiAgICBNYXRMaXN0TW9kdWxlLFxyXG4gICAgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXHJcbiAgICBNYXRTZWxlY3RNb2R1bGUsXHJcbiAgICBNYXRUYWJsZU1vZHVsZVxyXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQ292YWxlbnREaWFsb2dzTW9kdWxlLCBDb3ZhbGVudE1lc3NhZ2VNb2R1bGUgfSBmcm9tICdAY292YWxlbnQvY29yZSc7XHJcbmltcG9ydCB7IEJpb21ldHJpY0VkaXRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvYmlvbWV0cmljLWVkaXQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgUk9VVEVTIH0gZnJvbSAnLi9zZXJ2aWNlcy9iaW9tZXRyaWMucm91dGUnO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgTmd4RGF0YXRhYmxlTW9kdWxlIH0gZnJvbSAnQHN3aW1sYW5lL25neC1kYXRhdGFibGUnO1xyXG5pbXBvcnQgeyBNYXREYXRlRm9ybWF0TW9kdWxlIH0gZnJvbSAnQGxhbWlzL3dlYi1jb3JlJztcclxuaW1wb3J0IHsgQ3VzdG9tRm9ybXNNb2R1bGUgfSBmcm9tICduZzItdmFsaWRhdGlvbic7XHJcbmltcG9ydCB7IE1hdEljb25SZWdpc3RyeSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgQmlvbWV0cmljRWRpdENvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBDb21tb25Nb2R1bGUsXHJcbiAgICAgICAgTWF0SW5wdXRNb2R1bGUsXHJcbiAgICAgICAgTWF0SWNvbk1vZHVsZSxcclxuICAgICAgICBNYXRDYXJkTW9kdWxlLFxyXG4gICAgICAgIE1hdFNlbGVjdE1vZHVsZSxcclxuICAgICAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICAgICAgUm91dGVyTW9kdWxlLmZvckNoaWxkKFJPVVRFUyksXHJcbiAgICAgICAgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXHJcbiAgICAgICAgRm9ybXNNb2R1bGUsXHJcbiAgICAgICAgQ292YWxlbnRNZXNzYWdlTW9kdWxlLFxyXG4gICAgICAgIENvdmFsZW50RGlhbG9nc01vZHVsZSxcclxuICAgICAgICBNYXRUYWJsZU1vZHVsZSxcclxuICAgICAgICBNYXRMaXN0TW9kdWxlLFxyXG4gICAgICAgIENvcmVNb2R1bGUsXHJcbiAgICAgICAgTmd4RGF0YXRhYmxlTW9kdWxlLFxyXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgICAgICAgTWF0RGF0ZUZvcm1hdE1vZHVsZSxcclxuICAgICAgICBDdXN0b21Gb3Jtc01vZHVsZVxyXG4gICAgXSxcclxuICAgIGV4cG9ydHM6IFtcclxuICAgICAgICBCaW9tZXRyaWNFZGl0Q29tcG9uZW50XHJcbiAgICBdLFxyXG4gICAgZW50cnlDb21wb25lbnRzOiBbXSxcclxuICAgIHByb3ZpZGVyczogW1xyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQmlvbWV0cmljc01vZHVsZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9pY29uUmVnaXN0cnk6IE1hdEljb25SZWdpc3RyeSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgX2RvbVNhbml0aXplcjogRG9tU2FuaXRpemVyKSB7XHJcbiAgICAgICAgLyp0aGlzLl9pY29uUmVnaXN0cnkuYWRkU3ZnSWNvbkluTmFtZXNwYWNlKCdmaW5nZXJwcmludCcsICdyaWdodF9pbmRleCcsXHJcbiAgICAgICAgICAgIHRoaXMuX2RvbVNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwoJy9hY3Jvc3MvcmVzb3VyY2VzL3N0YXRpYy9maW5nZXJwcmludC9pbWcvcmlnaHRfaW5kZXguc3ZnJykpO1xyXG4gICAgICAgIHRoaXMuX2ljb25SZWdpc3RyeS5hZGRTdmdJY29uSW5OYW1lc3BhY2UoJ2ZpbmdlcnByaW50JywgJ2xlZnRfaW5kZXgnLFxyXG4gICAgICAgICAgICB0aGlzLl9kb21TYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKCcvYWNyb3NzL3Jlc291cmNlcy9zdGF0aWMvZmluZ2VycHJpbnQvaW1nL2xlZnRfaW5kZXguc3ZnJykpO1xyXG4gICAgICAgIHRoaXMuX2ljb25SZWdpc3RyeS5hZGRTdmdJY29uSW5OYW1lc3BhY2UoJ2ZpbmdlcnByaW50JywgJ3JpZ2h0X3RodW1iJyxcclxuICAgICAgICAgICAgdGhpcy5fZG9tU2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybCgnL2Fjcm9zcy9yZXNvdXJjZXMvc3RhdGljL2ZpbmdlcnByaW50L2ltZy9yaWdodF90aHVtYi5zdmcnKSk7XHJcbiAgICAgICAgdGhpcy5faWNvblJlZ2lzdHJ5LmFkZFN2Z0ljb25Jbk5hbWVzcGFjZSgnZmluZ2VycHJpbnQnLCAnbGVmdF90aHVtYicsXHJcbiAgICAgICAgICAgIHRoaXMuX2RvbVNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwoJy9hY3Jvc3MvcmVzb3VyY2VzL3N0YXRpYy9maW5nZXJwcmludC9pbWcvbGVmdF90aHVtYi5zdmcnKSk7Ki9cclxuICAgIH1cclxufVxyXG4iXX0=
