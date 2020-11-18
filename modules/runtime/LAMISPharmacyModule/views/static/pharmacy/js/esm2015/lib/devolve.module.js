import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { DevolveDetailsComponent } from './components/devolve.details.component';
import { DevolveEditComponent } from './components/devolve.edit.component';
import { CoreModule } from '@alfresco/adf-core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { MatDateFormatModule } from '@lamis/web-core';
import { MatButtonModule, MatCardModule, MatDatepickerModule, MatInputModule, MatSelectModule } from '@angular/material';
import { DevolveResolve, ROUTES } from './services/devolve.route';
import { RouterModule } from '@angular/router';
import { CovalentCommonModule, CovalentDialogsModule } from '@covalent/core';
import { EndDevolveComponent } from './components/end.devolve.component';
let DevolveModule = class DevolveModule {
};
DevolveModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            RouterModule.forChild(ROUTES),
            ReactiveFormsModule,
            CustomFormsModule,
            CoreModule,
            MatDatepickerModule,
            MatDateFormatModule,
            MatInputModule,
            MatButtonModule,
            MatCardModule,
            MatSelectModule,
            CovalentCommonModule,
            CovalentDialogsModule
        ],
        declarations: [
            DevolveDetailsComponent,
            DevolveEditComponent,
            EndDevolveComponent
        ],
        providers: [
            DevolveResolve
        ]
    })
], DevolveModule);
export { DevolveModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2b2x2ZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1waGFybWFjeS0xLjQuMC8iLCJzb3VyY2VzIjpbImxpYi9kZXZvbHZlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSx3Q0FBd0MsQ0FBQztBQUMvRSxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQUN6RSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDOUMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxXQUFXLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRCxPQUFPLEVBQ0gsZUFBZSxFQUNmLGFBQWEsRUFDYixtQkFBbUIsRUFDbkIsY0FBYyxFQUNkLGVBQWUsRUFDbEIsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQixPQUFPLEVBQUMsY0FBYyxFQUFFLE1BQU0sRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ2hFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsb0JBQW9CLEVBQUUscUJBQXFCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzRSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxvQ0FBb0MsQ0FBQztBQTRCdkUsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtDQUV6QixDQUFBO0FBRlksYUFBYTtJQTFCekIsUUFBUSxDQUFDO1FBQ04sT0FBTyxFQUFFO1lBQ0wsWUFBWTtZQUNaLFdBQVc7WUFDWCxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztZQUM3QixtQkFBbUI7WUFDbkIsaUJBQWlCO1lBQ2pCLFVBQVU7WUFDVixtQkFBbUI7WUFDbkIsbUJBQW1CO1lBQ25CLGNBQWM7WUFDZCxlQUFlO1lBQ2YsYUFBYTtZQUNiLGVBQWU7WUFDZixvQkFBb0I7WUFDcEIscUJBQXFCO1NBQ3hCO1FBQ0QsWUFBWSxFQUFFO1lBQ1YsdUJBQXVCO1lBQ3ZCLG9CQUFvQjtZQUNwQixtQkFBbUI7U0FDdEI7UUFDRCxTQUFTLEVBQUU7WUFDUCxjQUFjO1NBQ2pCO0tBQ0osQ0FBQztHQUNXLGFBQWEsQ0FFekI7U0FGWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Rldm9sdmVEZXRhaWxzQ29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvZGV2b2x2ZS5kZXRhaWxzLmNvbXBvbmVudCc7XG5pbXBvcnQge0Rldm9sdmVFZGl0Q29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudHMvZGV2b2x2ZS5lZGl0LmNvbXBvbmVudCc7XG5pbXBvcnQge0NvcmVNb2R1bGV9IGZyb20gJ0BhbGZyZXNjby9hZGYtY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7Rm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7Q3VzdG9tRm9ybXNNb2R1bGV9IGZyb20gJ25nMi12YWxpZGF0aW9uJztcbmltcG9ydCB7TWF0RGF0ZUZvcm1hdE1vZHVsZX0gZnJvbSAnQGxhbWlzL3dlYi1jb3JlJztcbmltcG9ydCB7XG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdENhcmRNb2R1bGUsXG4gICAgTWF0RGF0ZXBpY2tlck1vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBNYXRTZWxlY3RNb2R1bGVcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHtEZXZvbHZlUmVzb2x2ZSwgUk9VVEVTfSBmcm9tICcuL3NlcnZpY2VzL2Rldm9sdmUucm91dGUnO1xuaW1wb3J0IHtSb3V0ZXJNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge0NvdmFsZW50Q29tbW9uTW9kdWxlLCBDb3ZhbGVudERpYWxvZ3NNb2R1bGV9IGZyb20gJ0Bjb3ZhbGVudC9jb3JlJztcbmltcG9ydCB7RW5kRGV2b2x2ZUNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL2VuZC5kZXZvbHZlLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQoUk9VVEVTKSxcbiAgICAgICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICAgICAgQ3VzdG9tRm9ybXNNb2R1bGUsXG4gICAgICAgIENvcmVNb2R1bGUsXG4gICAgICAgIE1hdERhdGVwaWNrZXJNb2R1bGUsXG4gICAgICAgIE1hdERhdGVGb3JtYXRNb2R1bGUsXG4gICAgICAgIE1hdElucHV0TW9kdWxlLFxuICAgICAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgICAgIE1hdENhcmRNb2R1bGUsXG4gICAgICAgIE1hdFNlbGVjdE1vZHVsZSxcbiAgICAgICAgQ292YWxlbnRDb21tb25Nb2R1bGUsXG4gICAgICAgIENvdmFsZW50RGlhbG9nc01vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIERldm9sdmVEZXRhaWxzQ29tcG9uZW50LFxuICAgICAgICBEZXZvbHZlRWRpdENvbXBvbmVudCxcbiAgICAgICAgRW5kRGV2b2x2ZUNvbXBvbmVudFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIERldm9sdmVSZXNvbHZlXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZXZvbHZlTW9kdWxlIHtcblxufVxuIl19