import * as tslib_1 from "tslib";
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatTabsModule
} from '@angular/material';
import {RouterModule} from '@angular/router';
import {BackupComponent} from './components/backup.component';
import {BackupService} from "./services/backup.service";
import {ROUTES} from "./services/backup.route";
import {FormsModule} from "@angular/forms";
import {RestoreComponent} from "./components/restore.component";
import {CovalentCommonModule, CovalentFileModule} from "@covalent/core";

var BackupModule = /** @class */ (function () {
    function BackupModule() {
    }

    BackupModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                BackupComponent,
                RestoreComponent
            ],
            imports: [
                CommonModule,
                FormsModule,
                MatInputModule,
                MatIconModule,
                MatDividerModule,
                MatCardModule,
                MatButtonModule,
                MatTabsModule,
                RouterModule.forChild(ROUTES),
                CovalentCommonModule,
                CovalentFileModule
            ],
            exports: [
                BackupComponent,
                RestoreComponent
            ],
            providers: [
                BackupService
            ]
        })
    ], BackupModule);
    return BackupModule;
}());
export {BackupModule};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja3VwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xhbWlzLWJhY2t1cC8iLCJzb3VyY2VzIjpbImxpYi9iYWNrdXAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQ0gsZUFBZSxFQUNmLGFBQWEsRUFDYixnQkFBZ0IsRUFDaEIsYUFBYSxFQUNiLGNBQWMsRUFDZCxhQUFhLEVBQ2hCLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNoRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDMUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQTRCMUU7SUFBQTtJQUNBLENBQUM7SUFEWSxZQUFZO1FBMUJ4QixRQUFRLENBQUM7WUFDTixZQUFZLEVBQUU7Z0JBQ1YsZUFBZTtnQkFDZixnQkFBZ0I7YUFDbkI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsWUFBWTtnQkFDWixXQUFXO2dCQUNYLGNBQWM7Z0JBQ2QsYUFBYTtnQkFDYixnQkFBZ0I7Z0JBQ2hCLGFBQWE7Z0JBQ2IsZUFBZTtnQkFDZixhQUFhO2dCQUNiLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO2dCQUM3QixvQkFBb0I7Z0JBQ3BCLGtCQUFrQjthQUNyQjtZQUNELE9BQU8sRUFBRTtnQkFDTCxlQUFlO2dCQUNmLGdCQUFnQjthQUNuQjtZQUNELFNBQVMsRUFBRTtnQkFDUCxhQUFhO2FBQ2hCO1NBQ0osQ0FBQztPQUNXLFlBQVksQ0FDeEI7SUFBRCxtQkFBQztDQUFBLEFBREQsSUFDQztTQURZLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gICAgTWF0Q2FyZE1vZHVsZSxcclxuICAgIE1hdERpdmlkZXJNb2R1bGUsXHJcbiAgICBNYXRJY29uTW9kdWxlLFxyXG4gICAgTWF0SW5wdXRNb2R1bGUsXHJcbiAgICBNYXRUYWJzTW9kdWxlXHJcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBCYWNrdXBDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvYmFja3VwLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEJhY2t1cFNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9iYWNrdXAuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBST1VURVMgfSBmcm9tIFwiLi9zZXJ2aWNlcy9iYWNrdXAucm91dGVcIjtcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcclxuaW1wb3J0IHsgUmVzdG9yZUNvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvcmVzdG9yZS5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgQ292YWxlbnRDb21tb25Nb2R1bGUsIENvdmFsZW50RmlsZU1vZHVsZSB9IGZyb20gXCJAY292YWxlbnQvY29yZVwiO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIEJhY2t1cENvbXBvbmVudCxcclxuICAgICAgICBSZXN0b3JlQ29tcG9uZW50XHJcbiAgICBdLFxyXG4gICAgaW1wb3J0czogW1xyXG4gICAgICAgIENvbW1vbk1vZHVsZSxcclxuICAgICAgICBGb3Jtc01vZHVsZSxcclxuICAgICAgICBNYXRJbnB1dE1vZHVsZSxcclxuICAgICAgICBNYXRJY29uTW9kdWxlLFxyXG4gICAgICAgIE1hdERpdmlkZXJNb2R1bGUsXHJcbiAgICAgICAgTWF0Q2FyZE1vZHVsZSxcclxuICAgICAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICAgICAgTWF0VGFic01vZHVsZSxcclxuICAgICAgICBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQoUk9VVEVTKSxcclxuICAgICAgICBDb3ZhbGVudENvbW1vbk1vZHVsZSxcclxuICAgICAgICBDb3ZhbGVudEZpbGVNb2R1bGVcclxuICAgIF0sXHJcbiAgICBleHBvcnRzOiBbXHJcbiAgICAgICAgQmFja3VwQ29tcG9uZW50LFxyXG4gICAgICAgIFJlc3RvcmVDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICBCYWNrdXBTZXJ2aWNlXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCYWNrdXBNb2R1bGUge1xyXG59XHJcbiJdfQ==
