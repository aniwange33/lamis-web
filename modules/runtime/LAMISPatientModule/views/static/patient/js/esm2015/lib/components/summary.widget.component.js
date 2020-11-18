import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { CardViewBoolItemModel, CardViewDateItemModel, CardViewDatetimeItemModel, CardViewFloatItemModel, CardViewIntItemModel, CardViewTextItemModel } from '@alfresco/adf-core';
import { FieldType } from '@lamis/web-core';
import { PatientService } from '../services/patient.service';
import * as moment_ from 'moment';
const moment = moment_;
let SummaryWidgetComponent = class SummaryWidgetComponent {
    constructor(patientService) {
        this.patientService = patientService;
    }
    ngOnInit() {
        this.patientService.getSummaryForPatient(this.patientId).subscribe(res => this.summaries = res);
    }
    propertiesForSummary(summary) {
        const properties = [];
        for (const field of summary.fields) {
            const dataType = field.type.toLowerCase();
            let item;
            switch (dataType) {
                case FieldType.boolean:
                    item = new CardViewBoolItemModel({
                        value: field.value,
                        key: '',
                        label: field.label
                    });
                    break;
                case FieldType.int:
                    item = new CardViewIntItemModel({
                        value: field.value,
                        key: '',
                        label: field.label,
                    });
                    break;
                case FieldType.float:
                    item = new CardViewFloatItemModel({
                        value: field.value,
                        key: '',
                        label: field.label,
                    });
                    break;
                case FieldType.date:
                    item = new CardViewDateItemModel({
                        value: field.value ? moment(field.value) : null,
                        key: '',
                        label: field.label,
                        format: 'dd MMM, yyyy'
                    });
                    break;
                case FieldType.datetime:
                    item = new CardViewDatetimeItemModel({
                        value: field.value ? moment(field.value) : null,
                        key: '',
                        label: field.label,
                        format: 'dd MMM, yyyy HH:mm'
                    });
                    break;
                default:
                    item = new CardViewTextItemModel({
                        value: field.value,
                        key: '',
                        label: field.label,
                    });
            }
            properties.push(item);
        }
        return properties;
    }
};
SummaryWidgetComponent.ctorParameters = () => [
    { type: PatientService }
];
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], SummaryWidgetComponent.prototype, "patientId", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], SummaryWidgetComponent.prototype, "patientUuid", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array)
], SummaryWidgetComponent.prototype, "summaries", void 0);
SummaryWidgetComponent = tslib_1.__decorate([
    Component({
        selector: 'patient-summary-widget',
        template: "<ng-container *ngIf=\"summaries\">\n    <mat-card *ngFor=\"let summary of summaries\" class=\"default mb-1 pb-0\">\n        <ng-container *ngIf=\"!!summary.header\">\n            <mat-card-title>{{summary.header}}</mat-card-title>\n            <mat-divider></mat-divider>\n        </ng-container>\n        <mat-card-content>\n            <adf-card-view [properties]=\"propertiesForSummary(summary)\"></adf-card-view>\n        </mat-card-content>\n    </mat-card>\n</ng-container>\n"
    }),
    tslib_1.__metadata("design:paramtypes", [PatientService])
], SummaryWidgetComponent);
export { SummaryWidgetComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VtbWFyeS53aWRnZXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGFtaXMtcGF0aWVudC0xLjQuMS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL3N1bW1hcnkud2lkZ2V0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFDdkQsT0FBTyxFQUNILHFCQUFxQixFQUNyQixxQkFBcUIsRUFDckIseUJBQXlCLEVBQ3pCLHNCQUFzQixFQUN0QixvQkFBb0IsRUFFcEIscUJBQXFCLEVBQ3hCLE1BQU0sb0JBQW9CLENBQUM7QUFDNUIsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzFDLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUMzRCxPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQztBQUVsQyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUM7QUFrQnZCLElBQWEsc0JBQXNCLEdBQW5DLE1BQWEsc0JBQXNCO0lBUy9CLFlBQW9CLGNBQThCO1FBQTlCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtJQUNsRCxDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxjQUFjLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLENBQUE7SUFDbkcsQ0FBQztJQUVNLG9CQUFvQixDQUFDLE9BQWdCO1FBQ3hDLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUN0QixLQUFLLE1BQU0sS0FBSyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDaEMsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUMxQyxJQUFJLElBQWtCLENBQUM7WUFDdkIsUUFBUSxRQUFRLEVBQUU7Z0JBQ2QsS0FBSyxTQUFTLENBQUMsT0FBTztvQkFDbEIsSUFBSSxHQUFHLElBQUkscUJBQXFCLENBQUM7d0JBQzdCLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSzt3QkFDbEIsR0FBRyxFQUFFLEVBQUU7d0JBQ1AsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLO3FCQUNyQixDQUFDLENBQUM7b0JBQ0gsTUFBTTtnQkFDVixLQUFLLFNBQVMsQ0FBQyxHQUFHO29CQUNkLElBQUksR0FBRyxJQUFJLG9CQUFvQixDQUFDO3dCQUM1QixLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUs7d0JBQ2xCLEdBQUcsRUFBRSxFQUFFO3dCQUNQLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSztxQkFDckIsQ0FBQyxDQUFDO29CQUNILE1BQU07Z0JBQ1YsS0FBSyxTQUFTLENBQUMsS0FBSztvQkFDaEIsSUFBSSxHQUFHLElBQUksc0JBQXNCLENBQUM7d0JBQzlCLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSzt3QkFDbEIsR0FBRyxFQUFFLEVBQUU7d0JBQ1AsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLO3FCQUNyQixDQUFDLENBQUM7b0JBQ0gsTUFBTTtnQkFDVixLQUFLLFNBQVMsQ0FBQyxJQUFJO29CQUNmLElBQUksR0FBRyxJQUFJLHFCQUFxQixDQUFDO3dCQUM3QixLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSTt3QkFDL0MsR0FBRyxFQUFFLEVBQUU7d0JBQ1AsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLO3dCQUNsQixNQUFNLEVBQUUsY0FBYztxQkFDekIsQ0FBQyxDQUFDO29CQUNILE1BQU07Z0JBQ1YsS0FBSyxTQUFTLENBQUMsUUFBUTtvQkFDbkIsSUFBSSxHQUFHLElBQUkseUJBQXlCLENBQUM7d0JBQ2pDLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO3dCQUMvQyxHQUFHLEVBQUUsRUFBRTt3QkFDUCxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUs7d0JBQ2xCLE1BQU0sRUFBRSxvQkFBb0I7cUJBQy9CLENBQUMsQ0FBQztvQkFDSCxNQUFNO2dCQUNWO29CQUNJLElBQUksR0FBRyxJQUFJLHFCQUFxQixDQUFDO3dCQUM3QixLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUs7d0JBQ2xCLEdBQUcsRUFBRSxFQUFFO3dCQUNQLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSztxQkFDckIsQ0FBQyxDQUFDO2FBQ1Y7WUFDRCxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxVQUFVLENBQUM7SUFDdEIsQ0FBQztDQUNKLENBQUE7O1lBN0R1QyxjQUFjOztBQVBsRDtJQURDLEtBQUssRUFBRTs7eURBQ1U7QUFFbEI7SUFEQyxLQUFLLEVBQUU7OzJEQUNZO0FBR3BCO0lBRkMsS0FBSyxFQUFFOzt5REFFYTtBQVBaLHNCQUFzQjtJQUpsQyxTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsd0JBQXdCO1FBQ2xDLDZlQUE4QztLQUNqRCxDQUFDOzZDQVVzQyxjQUFjO0dBVHpDLHNCQUFzQixDQXNFbEM7U0F0RVksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBDYXJkVmlld0Jvb2xJdGVtTW9kZWwsXG4gICAgQ2FyZFZpZXdEYXRlSXRlbU1vZGVsLFxuICAgIENhcmRWaWV3RGF0ZXRpbWVJdGVtTW9kZWwsXG4gICAgQ2FyZFZpZXdGbG9hdEl0ZW1Nb2RlbCxcbiAgICBDYXJkVmlld0ludEl0ZW1Nb2RlbCxcbiAgICBDYXJkVmlld0l0ZW0sXG4gICAgQ2FyZFZpZXdUZXh0SXRlbU1vZGVsXG59IGZyb20gJ0BhbGZyZXNjby9hZGYtY29yZSc7XG5pbXBvcnQge0ZpZWxkVHlwZX0gZnJvbSAnQGxhbWlzL3dlYi1jb3JlJztcbmltcG9ydCB7UGF0aWVudFNlcnZpY2V9IGZyb20gJy4uL3NlcnZpY2VzL3BhdGllbnQuc2VydmljZSc7XG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XG5cbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3VtbWFyeSB7XG4gICAgaGVhZGVyPzogc3RyaW5nO1xuICAgIGhlYWRlckNsYXNzPzogc3RyaW5nO1xuICAgIGZpZWxkczogRmllbGRbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGaWVsZCB7XG4gICAgdHlwZTogRmllbGRUeXBlO1xuICAgIGxhYmVsOiBzdHJpbmc7XG4gICAgdmFsdWU6IGFueTtcbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwYXRpZW50LXN1bW1hcnktd2lkZ2V0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vc3VtbWFyeS53aWRnZXQuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIFN1bW1hcnlXaWRnZXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgpXG4gICAgcGF0aWVudElkOiBudW1iZXI7XG4gICAgQElucHV0KClcbiAgICBwYXRpZW50VXVpZDogc3RyaW5nO1xuICAgIEBJbnB1dCgpXG5cbiAgICBzdW1tYXJpZXM6IFN1bW1hcnlbXTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcGF0aWVudFNlcnZpY2U6IFBhdGllbnRTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucGF0aWVudFNlcnZpY2UuZ2V0U3VtbWFyeUZvclBhdGllbnQodGhpcy5wYXRpZW50SWQpLnN1YnNjcmliZShyZXMgPT4gdGhpcy5zdW1tYXJpZXMgPSByZXMpXG4gICAgfVxuXG4gICAgcHVibGljIHByb3BlcnRpZXNGb3JTdW1tYXJ5KHN1bW1hcnk6IFN1bW1hcnkpOiBBcnJheTxDYXJkVmlld0l0ZW0+IHtcbiAgICAgICAgY29uc3QgcHJvcGVydGllcyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IGZpZWxkIG9mIHN1bW1hcnkuZmllbGRzKSB7XG4gICAgICAgICAgICBjb25zdCBkYXRhVHlwZSA9IGZpZWxkLnR5cGUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGxldCBpdGVtOiBDYXJkVmlld0l0ZW07XG4gICAgICAgICAgICBzd2l0Y2ggKGRhdGFUeXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBGaWVsZFR5cGUuYm9vbGVhbjpcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IG5ldyBDYXJkVmlld0Jvb2xJdGVtTW9kZWwoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZpZWxkLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBmaWVsZC5sYWJlbFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBGaWVsZFR5cGUuaW50OlxuICAgICAgICAgICAgICAgICAgICBpdGVtID0gbmV3IENhcmRWaWV3SW50SXRlbU1vZGVsKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmaWVsZC52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogZmllbGQubGFiZWwsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIEZpZWxkVHlwZS5mbG9hdDpcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IG5ldyBDYXJkVmlld0Zsb2F0SXRlbU1vZGVsKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmaWVsZC52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogZmllbGQubGFiZWwsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIEZpZWxkVHlwZS5kYXRlOlxuICAgICAgICAgICAgICAgICAgICBpdGVtID0gbmV3IENhcmRWaWV3RGF0ZUl0ZW1Nb2RlbCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZmllbGQudmFsdWUgPyBtb21lbnQoZmllbGQudmFsdWUpIDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogZmllbGQubGFiZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6ICdkZCBNTU0sIHl5eXknXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIEZpZWxkVHlwZS5kYXRldGltZTpcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IG5ldyBDYXJkVmlld0RhdGV0aW1lSXRlbU1vZGVsKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmaWVsZC52YWx1ZSA/IG1vbWVudChmaWVsZC52YWx1ZSkgOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBmaWVsZC5sYWJlbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdDogJ2RkIE1NTSwgeXl5eSBISDptbSdcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0gPSBuZXcgQ2FyZFZpZXdUZXh0SXRlbU1vZGVsKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmaWVsZC52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogZmllbGQubGFiZWwsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJvcGVydGllcy5wdXNoKGl0ZW0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwcm9wZXJ0aWVzO1xuICAgIH1cbn1cbiJdfQ==