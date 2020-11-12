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

let BiometricsModule = class BiometricsModule {
    constructor(_iconRegistry, _domSanitizer) {
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
};
BiometricsModule.ctorParameters = () => [
    {type: MatIconRegistry},
    {type: DomSanitizer}
];
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
export {BiometricsModule};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmlvbWV0cmljcy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1iaW9tZXRyaWNzLTEuMC4wLyIsInNvdXJjZXMiOlsibGliL2Jpb21ldHJpY3MubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDaEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUNILGVBQWUsRUFDZixhQUFhLEVBQ2IsYUFBYSxFQUNiLGNBQWMsRUFDZCxhQUFhLEVBQ2Isb0JBQW9CLEVBQ3BCLGVBQWUsRUFDZixjQUFjLEVBQ2pCLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDN0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQWlDekQsSUFBYSxnQkFBZ0IsR0FBN0IsTUFBYSxnQkFBZ0I7SUFDekIsWUFBb0IsYUFBOEIsRUFDOUIsYUFBMkI7UUFEM0Isa0JBQWEsR0FBYixhQUFhLENBQWlCO1FBQzlCLGtCQUFhLEdBQWIsYUFBYSxDQUFjO1FBQzNDOzs7Ozs7OzRIQU9vSDtJQUN4SCxDQUFDO0NBQ0osQ0FBQTs7WUFYc0MsZUFBZTtZQUNmLFlBQVk7O0FBRnRDLGdCQUFnQjtJQS9CNUIsUUFBUSxDQUFDO1FBQ04sWUFBWSxFQUFFO1lBQ1Ysc0JBQXNCO1NBQ3pCO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsWUFBWTtZQUNaLGNBQWM7WUFDZCxhQUFhO1lBQ2IsYUFBYTtZQUNiLGVBQWU7WUFDZixlQUFlO1lBQ2YsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7WUFDN0Isb0JBQW9CO1lBQ3BCLFdBQVc7WUFDWCxxQkFBcUI7WUFDckIscUJBQXFCO1lBQ3JCLGNBQWM7WUFDZCxhQUFhO1lBQ2IsVUFBVTtZQUNWLGtCQUFrQjtZQUNsQixtQkFBbUI7WUFDbkIsbUJBQW1CO1lBQ25CLGlCQUFpQjtTQUNwQjtRQUNELE9BQU8sRUFBRTtZQUNMLHNCQUFzQjtTQUN6QjtRQUNELGVBQWUsRUFBRSxFQUFFO1FBQ25CLFNBQVMsRUFBRSxFQUNWO0tBQ0osQ0FBQzs2Q0FFcUMsZUFBZTtRQUNmLFlBQVk7R0FGdEMsZ0JBQWdCLENBWTVCO1NBWlksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29yZU1vZHVsZSB9IGZyb20gJ0BhbGZyZXNjby9hZGYtY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICBNYXRDYXJkTW9kdWxlLFxyXG4gICAgTWF0SWNvbk1vZHVsZSxcclxuICAgIE1hdElucHV0TW9kdWxlLFxyXG4gICAgTWF0TGlzdE1vZHVsZSxcclxuICAgIE1hdFByb2dyZXNzQmFyTW9kdWxlLFxyXG4gICAgTWF0U2VsZWN0TW9kdWxlLFxyXG4gICAgTWF0VGFibGVNb2R1bGVcclxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IENvdmFsZW50RGlhbG9nc01vZHVsZSwgQ292YWxlbnRNZXNzYWdlTW9kdWxlIH0gZnJvbSAnQGNvdmFsZW50L2NvcmUnO1xyXG5pbXBvcnQgeyBCaW9tZXRyaWNFZGl0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2Jpb21ldHJpYy1lZGl0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFJPVVRFUyB9IGZyb20gJy4vc2VydmljZXMvYmlvbWV0cmljLnJvdXRlJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IE5neERhdGF0YWJsZU1vZHVsZSB9IGZyb20gJ0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlJztcclxuaW1wb3J0IHsgTWF0RGF0ZUZvcm1hdE1vZHVsZSB9IGZyb20gJ0BsYW1pcy93ZWItY29yZSc7XHJcbmltcG9ydCB7IEN1c3RvbUZvcm1zTW9kdWxlIH0gZnJvbSAnbmcyLXZhbGlkYXRpb24nO1xyXG5pbXBvcnQgeyBNYXRJY29uUmVnaXN0cnkgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIEJpb21ldHJpY0VkaXRDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgICAgIE1hdElucHV0TW9kdWxlLFxyXG4gICAgICAgIE1hdEljb25Nb2R1bGUsXHJcbiAgICAgICAgTWF0Q2FyZE1vZHVsZSxcclxuICAgICAgICBNYXRTZWxlY3RNb2R1bGUsXHJcbiAgICAgICAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gICAgICAgIFJvdXRlck1vZHVsZS5mb3JDaGlsZChST1VURVMpLFxyXG4gICAgICAgIE1hdFByb2dyZXNzQmFyTW9kdWxlLFxyXG4gICAgICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgICAgIENvdmFsZW50TWVzc2FnZU1vZHVsZSxcclxuICAgICAgICBDb3ZhbGVudERpYWxvZ3NNb2R1bGUsXHJcbiAgICAgICAgTWF0VGFibGVNb2R1bGUsXHJcbiAgICAgICAgTWF0TGlzdE1vZHVsZSxcclxuICAgICAgICBDb3JlTW9kdWxlLFxyXG4gICAgICAgIE5neERhdGF0YWJsZU1vZHVsZSxcclxuICAgICAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgICAgIE1hdERhdGVGb3JtYXRNb2R1bGUsXHJcbiAgICAgICAgQ3VzdG9tRm9ybXNNb2R1bGVcclxuICAgIF0sXHJcbiAgICBleHBvcnRzOiBbXHJcbiAgICAgICAgQmlvbWV0cmljRWRpdENvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIGVudHJ5Q29tcG9uZW50czogW10sXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEJpb21ldHJpY3NNb2R1bGUge1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfaWNvblJlZ2lzdHJ5OiBNYXRJY29uUmVnaXN0cnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIF9kb21TYW5pdGl6ZXI6IERvbVNhbml0aXplcikge1xyXG4gICAgICAgIC8qdGhpcy5faWNvblJlZ2lzdHJ5LmFkZFN2Z0ljb25Jbk5hbWVzcGFjZSgnZmluZ2VycHJpbnQnLCAncmlnaHRfaW5kZXgnLFxyXG4gICAgICAgICAgICB0aGlzLl9kb21TYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKCcvYWNyb3NzL3Jlc291cmNlcy9zdGF0aWMvZmluZ2VycHJpbnQvaW1nL3JpZ2h0X2luZGV4LnN2ZycpKTtcclxuICAgICAgICB0aGlzLl9pY29uUmVnaXN0cnkuYWRkU3ZnSWNvbkluTmFtZXNwYWNlKCdmaW5nZXJwcmludCcsICdsZWZ0X2luZGV4JyxcclxuICAgICAgICAgICAgdGhpcy5fZG9tU2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybCgnL2Fjcm9zcy9yZXNvdXJjZXMvc3RhdGljL2ZpbmdlcnByaW50L2ltZy9sZWZ0X2luZGV4LnN2ZycpKTtcclxuICAgICAgICB0aGlzLl9pY29uUmVnaXN0cnkuYWRkU3ZnSWNvbkluTmFtZXNwYWNlKCdmaW5nZXJwcmludCcsICdyaWdodF90aHVtYicsXHJcbiAgICAgICAgICAgIHRoaXMuX2RvbVNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwoJy9hY3Jvc3MvcmVzb3VyY2VzL3N0YXRpYy9maW5nZXJwcmludC9pbWcvcmlnaHRfdGh1bWIuc3ZnJykpO1xyXG4gICAgICAgIHRoaXMuX2ljb25SZWdpc3RyeS5hZGRTdmdJY29uSW5OYW1lc3BhY2UoJ2ZpbmdlcnByaW50JywgJ2xlZnRfdGh1bWInLFxyXG4gICAgICAgICAgICB0aGlzLl9kb21TYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKCcvYWNyb3NzL3Jlc291cmNlcy9zdGF0aWMvZmluZ2VycHJpbnQvaW1nL2xlZnRfdGh1bWIuc3ZnJykpOyovXHJcbiAgICB9XHJcbn1cclxuIl19
