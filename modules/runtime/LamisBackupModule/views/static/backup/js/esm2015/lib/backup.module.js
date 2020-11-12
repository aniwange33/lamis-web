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

let BackupModule = class BackupModule {
};
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
export {BackupModule};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja3VwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xhbWlzLWJhY2t1cC8iLCJzb3VyY2VzIjpbImxpYi9iYWNrdXAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQ0gsZUFBZSxFQUNmLGFBQWEsRUFDYixnQkFBZ0IsRUFDaEIsYUFBYSxFQUNiLGNBQWMsRUFDZCxhQUFhLEVBQ2hCLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNoRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDMUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQTRCMUUsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBWTtDQUN4QixDQUFBO0FBRFksWUFBWTtJQTFCeEIsUUFBUSxDQUFDO1FBQ04sWUFBWSxFQUFFO1lBQ1YsZUFBZTtZQUNmLGdCQUFnQjtTQUNuQjtRQUNELE9BQU8sRUFBRTtZQUNMLFlBQVk7WUFDWixXQUFXO1lBQ1gsY0FBYztZQUNkLGFBQWE7WUFDYixnQkFBZ0I7WUFDaEIsYUFBYTtZQUNiLGVBQWU7WUFDZixhQUFhO1lBQ2IsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7WUFDN0Isb0JBQW9CO1lBQ3BCLGtCQUFrQjtTQUNyQjtRQUNELE9BQU8sRUFBRTtZQUNMLGVBQWU7WUFDZixnQkFBZ0I7U0FDbkI7UUFDRCxTQUFTLEVBQUU7WUFDUCxhQUFhO1NBQ2hCO0tBQ0osQ0FBQztHQUNXLFlBQVksQ0FDeEI7U0FEWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtcclxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcclxuICAgIE1hdENhcmRNb2R1bGUsXHJcbiAgICBNYXREaXZpZGVyTW9kdWxlLFxyXG4gICAgTWF0SWNvbk1vZHVsZSxcclxuICAgIE1hdElucHV0TW9kdWxlLFxyXG4gICAgTWF0VGFic01vZHVsZVxyXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQmFja3VwQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2JhY2t1cC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBCYWNrdXBTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvYmFja3VwLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgUk9VVEVTIH0gZnJvbSBcIi4vc2VydmljZXMvYmFja3VwLnJvdXRlXCI7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XHJcbmltcG9ydCB7IFJlc3RvcmVDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL3Jlc3RvcmUuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IENvdmFsZW50Q29tbW9uTW9kdWxlLCBDb3ZhbGVudEZpbGVNb2R1bGUgfSBmcm9tIFwiQGNvdmFsZW50L2NvcmVcIjtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICBCYWNrdXBDb21wb25lbnQsXHJcbiAgICAgICAgUmVzdG9yZUNvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBDb21tb25Nb2R1bGUsXHJcbiAgICAgICAgRm9ybXNNb2R1bGUsXHJcbiAgICAgICAgTWF0SW5wdXRNb2R1bGUsXHJcbiAgICAgICAgTWF0SWNvbk1vZHVsZSxcclxuICAgICAgICBNYXREaXZpZGVyTW9kdWxlLFxyXG4gICAgICAgIE1hdENhcmRNb2R1bGUsXHJcbiAgICAgICAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gICAgICAgIE1hdFRhYnNNb2R1bGUsXHJcbiAgICAgICAgUm91dGVyTW9kdWxlLmZvckNoaWxkKFJPVVRFUyksXHJcbiAgICAgICAgQ292YWxlbnRDb21tb25Nb2R1bGUsXHJcbiAgICAgICAgQ292YWxlbnRGaWxlTW9kdWxlXHJcbiAgICBdLFxyXG4gICAgZXhwb3J0czogW1xyXG4gICAgICAgIEJhY2t1cENvbXBvbmVudCxcclxuICAgICAgICBSZXN0b3JlQ29tcG9uZW50XHJcbiAgICBdLFxyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgQmFja3VwU2VydmljZVxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQmFja3VwTW9kdWxlIHtcclxufVxyXG4iXX0=
