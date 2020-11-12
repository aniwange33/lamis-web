import * as tslib_1 from "tslib";
import {NgModule} from '@angular/core';
import {EacDetailsComponent} from './components/eac/eac.details.component';
import {EacEditComponent} from './components/eac/eac.edit.component';
import {EacResolve, ROUTES} from './services/eac.route';
import {CommonModule} from '@angular/common';
import {CovalentDialogsModule} from '@covalent/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LamisSharedModule, MatDateFormatModule} from '@lamis/web-core';
import {MaterialModule} from './material.module';
import {CoreModule} from '@alfresco/adf-core';
import {CustomFormsModule} from 'ng2-validation';
import {RouterModule} from '@angular/router';

let EacModule = class EacModule {
};
EacModule = tslib_1.__decorate([
    NgModule({
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
            RouterModule.forChild(ROUTES)
        ],
        declarations: [
            EacDetailsComponent,
            EacEditComponent
        ],
        providers: [
            EacResolve
        ]
    })
], EacModule);
export {EacModule};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWFjLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xhbWlzLWNsaW5pYy0xLjEuMy8iLCJzb3VyY2VzIjpbImxpYi9lYWMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQXVCL0MsSUFBYSxTQUFTLEdBQXRCLE1BQWEsU0FBUztDQUVyQixDQUFBO0FBRlksU0FBUztJQXJCckIsUUFBUSxDQUFDO1FBQ04sT0FBTyxFQUFFO1lBQ0wsWUFBWTtZQUNaLHFCQUFxQjtZQUNyQixXQUFXO1lBQ1gsbUJBQW1CO1lBQ25CLGlCQUFpQjtZQUNqQixjQUFjO1lBQ2QsVUFBVTtZQUNWLGlCQUFpQjtZQUNqQixtQkFBbUI7WUFDbkIsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7U0FDaEM7UUFDRCxZQUFZLEVBQUU7WUFDVixtQkFBbUI7WUFDbkIsZ0JBQWdCO1NBQ25CO1FBQ0QsU0FBUyxFQUFFO1lBQ1AsVUFBVTtTQUNiO0tBQ0osQ0FBQztHQUNXLFNBQVMsQ0FFckI7U0FGWSxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEVhY0RldGFpbHNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZWFjL2VhYy5kZXRhaWxzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBFYWNFZGl0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2VhYy9lYWMuZWRpdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRWFjUmVzb2x2ZSwgUk9VVEVTIH0gZnJvbSAnLi9zZXJ2aWNlcy9lYWMucm91dGUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENvdmFsZW50RGlhbG9nc01vZHVsZSB9IGZyb20gJ0Bjb3ZhbGVudC9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTGFtaXNTaGFyZWRNb2R1bGUsIE1hdERhdGVGb3JtYXRNb2R1bGUgfSBmcm9tICdAbGFtaXMvd2ViLWNvcmUnO1xuaW1wb3J0IHsgTWF0ZXJpYWxNb2R1bGUgfSBmcm9tICcuL21hdGVyaWFsLm1vZHVsZSc7XG5pbXBvcnQgeyBDb3JlTW9kdWxlIH0gZnJvbSAnQGFsZnJlc2NvL2FkZi1jb3JlJztcbmltcG9ydCB7IEN1c3RvbUZvcm1zTW9kdWxlIH0gZnJvbSAnbmcyLXZhbGlkYXRpb24nO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgQ292YWxlbnREaWFsb2dzTW9kdWxlLFxuICAgICAgICBGb3Jtc01vZHVsZSxcbiAgICAgICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICAgICAgTGFtaXNTaGFyZWRNb2R1bGUsXG4gICAgICAgIE1hdGVyaWFsTW9kdWxlLFxuICAgICAgICBDb3JlTW9kdWxlLFxuICAgICAgICBDdXN0b21Gb3Jtc01vZHVsZSxcbiAgICAgICAgTWF0RGF0ZUZvcm1hdE1vZHVsZSxcbiAgICAgICAgUm91dGVyTW9kdWxlLmZvckNoaWxkKFJPVVRFUylcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBFYWNEZXRhaWxzQ29tcG9uZW50LFxuICAgICAgICBFYWNFZGl0Q29tcG9uZW50XG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgRWFjUmVzb2x2ZVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgRWFjTW9kdWxlIHtcblxufVxuIl19
