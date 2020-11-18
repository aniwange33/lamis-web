import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { CardViewBoolItemModel, CardViewDateItemModel, CardViewDatetimeItemModel, CardViewFloatItemModel, CardViewIntItemModel, CardViewTextItemModel } from '@alfresco/adf-core';
import { FieldType } from '@lamis/web-core';
import { PatientService } from '../services/patient.service';
import * as moment_ from 'moment';
var moment = moment_;
var SummaryWidgetComponent = /** @class */ (function () {
    function SummaryWidgetComponent(patientService) {
        this.patientService = patientService;
    }
    SummaryWidgetComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.patientService.getSummaryForPatient(this.patientId).subscribe(function (res) { return _this.summaries = res; });
    };
    SummaryWidgetComponent.prototype.propertiesForSummary = function (summary) {
        var e_1, _a;
        var properties = [];
        try {
            for (var _b = tslib_1.__values(summary.fields), _c = _b.next(); !_c.done; _c = _b.next()) {
                var field = _c.value;
                var dataType = field.type.toLowerCase();
                var item = void 0;
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
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return properties;
    };
    SummaryWidgetComponent.ctorParameters = function () { return [
        { type: PatientService }
    ]; };
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
    return SummaryWidgetComponent;
}());
export { SummaryWidgetComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VtbWFyeS53aWRnZXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGFtaXMtcGF0aWVudC0xLjQuMS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL3N1bW1hcnkud2lkZ2V0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFDdkQsT0FBTyxFQUNILHFCQUFxQixFQUNyQixxQkFBcUIsRUFDckIseUJBQXlCLEVBQ3pCLHNCQUFzQixFQUN0QixvQkFBb0IsRUFFcEIscUJBQXFCLEVBQ3hCLE1BQU0sb0JBQW9CLENBQUM7QUFDNUIsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzFDLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUMzRCxPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQztBQUVsQyxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUM7QUFrQnZCO0lBU0ksZ0NBQW9CLGNBQThCO1FBQTlCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtJQUNsRCxDQUFDO0lBRUQseUNBQVEsR0FBUjtRQUFBLGlCQUVDO1FBREcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsS0FBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLEVBQXBCLENBQW9CLENBQUMsQ0FBQTtJQUNuRyxDQUFDO0lBRU0scURBQW9CLEdBQTNCLFVBQTRCLE9BQWdCOztRQUN4QyxJQUFNLFVBQVUsR0FBRyxFQUFFLENBQUM7O1lBQ3RCLEtBQW9CLElBQUEsS0FBQSxpQkFBQSxPQUFPLENBQUMsTUFBTSxDQUFBLGdCQUFBLDRCQUFFO2dCQUEvQixJQUFNLEtBQUssV0FBQTtnQkFDWixJQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUMxQyxJQUFJLElBQUksU0FBYyxDQUFDO2dCQUN2QixRQUFRLFFBQVEsRUFBRTtvQkFDZCxLQUFLLFNBQVMsQ0FBQyxPQUFPO3dCQUNsQixJQUFJLEdBQUcsSUFBSSxxQkFBcUIsQ0FBQzs0QkFDN0IsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLOzRCQUNsQixHQUFHLEVBQUUsRUFBRTs0QkFDUCxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUs7eUJBQ3JCLENBQUMsQ0FBQzt3QkFDSCxNQUFNO29CQUNWLEtBQUssU0FBUyxDQUFDLEdBQUc7d0JBQ2QsSUFBSSxHQUFHLElBQUksb0JBQW9CLENBQUM7NEJBQzVCLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSzs0QkFDbEIsR0FBRyxFQUFFLEVBQUU7NEJBQ1AsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLO3lCQUNyQixDQUFDLENBQUM7d0JBQ0gsTUFBTTtvQkFDVixLQUFLLFNBQVMsQ0FBQyxLQUFLO3dCQUNoQixJQUFJLEdBQUcsSUFBSSxzQkFBc0IsQ0FBQzs0QkFDOUIsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLOzRCQUNsQixHQUFHLEVBQUUsRUFBRTs0QkFDUCxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUs7eUJBQ3JCLENBQUMsQ0FBQzt3QkFDSCxNQUFNO29CQUNWLEtBQUssU0FBUyxDQUFDLElBQUk7d0JBQ2YsSUFBSSxHQUFHLElBQUkscUJBQXFCLENBQUM7NEJBQzdCLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJOzRCQUMvQyxHQUFHLEVBQUUsRUFBRTs0QkFDUCxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUs7NEJBQ2xCLE1BQU0sRUFBRSxjQUFjO3lCQUN6QixDQUFDLENBQUM7d0JBQ0gsTUFBTTtvQkFDVixLQUFLLFNBQVMsQ0FBQyxRQUFRO3dCQUNuQixJQUFJLEdBQUcsSUFBSSx5QkFBeUIsQ0FBQzs0QkFDakMsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUk7NEJBQy9DLEdBQUcsRUFBRSxFQUFFOzRCQUNQLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSzs0QkFDbEIsTUFBTSxFQUFFLG9CQUFvQjt5QkFDL0IsQ0FBQyxDQUFDO3dCQUNILE1BQU07b0JBQ1Y7d0JBQ0ksSUFBSSxHQUFHLElBQUkscUJBQXFCLENBQUM7NEJBQzdCLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSzs0QkFDbEIsR0FBRyxFQUFFLEVBQUU7NEJBQ1AsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLO3lCQUNyQixDQUFDLENBQUM7aUJBQ1Y7Z0JBQ0QsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN6Qjs7Ozs7Ozs7O1FBQ0QsT0FBTyxVQUFVLENBQUM7SUFDdEIsQ0FBQzs7Z0JBNURtQyxjQUFjOztJQVBsRDtRQURDLEtBQUssRUFBRTs7NkRBQ1U7SUFFbEI7UUFEQyxLQUFLLEVBQUU7OytEQUNZO0lBR3BCO1FBRkMsS0FBSyxFQUFFOzs2REFFYTtJQVBaLHNCQUFzQjtRQUpsQyxTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsd0JBQXdCO1lBQ2xDLDZlQUE4QztTQUNqRCxDQUFDO2lEQVVzQyxjQUFjO09BVHpDLHNCQUFzQixDQXNFbEM7SUFBRCw2QkFBQztDQUFBLEFBdEVELElBc0VDO1NBdEVZLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgQ2FyZFZpZXdCb29sSXRlbU1vZGVsLFxuICAgIENhcmRWaWV3RGF0ZUl0ZW1Nb2RlbCxcbiAgICBDYXJkVmlld0RhdGV0aW1lSXRlbU1vZGVsLFxuICAgIENhcmRWaWV3RmxvYXRJdGVtTW9kZWwsXG4gICAgQ2FyZFZpZXdJbnRJdGVtTW9kZWwsXG4gICAgQ2FyZFZpZXdJdGVtLFxuICAgIENhcmRWaWV3VGV4dEl0ZW1Nb2RlbFxufSBmcm9tICdAYWxmcmVzY28vYWRmLWNvcmUnO1xuaW1wb3J0IHtGaWVsZFR5cGV9IGZyb20gJ0BsYW1pcy93ZWItY29yZSc7XG5pbXBvcnQge1BhdGllbnRTZXJ2aWNlfSBmcm9tICcuLi9zZXJ2aWNlcy9wYXRpZW50LnNlcnZpY2UnO1xuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xuXG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xuXG5leHBvcnQgaW50ZXJmYWNlIFN1bW1hcnkge1xuICAgIGhlYWRlcj86IHN0cmluZztcbiAgICBoZWFkZXJDbGFzcz86IHN0cmluZztcbiAgICBmaWVsZHM6IEZpZWxkW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmllbGQge1xuICAgIHR5cGU6IEZpZWxkVHlwZTtcbiAgICBsYWJlbDogc3RyaW5nO1xuICAgIHZhbHVlOiBhbnk7XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncGF0aWVudC1zdW1tYXJ5LXdpZGdldCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3N1bW1hcnkud2lkZ2V0LmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBTdW1tYXJ5V2lkZ2V0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoKVxuICAgIHBhdGllbnRJZDogbnVtYmVyO1xuICAgIEBJbnB1dCgpXG4gICAgcGF0aWVudFV1aWQ6IHN0cmluZztcbiAgICBASW5wdXQoKVxuXG4gICAgc3VtbWFyaWVzOiBTdW1tYXJ5W107XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhdGllbnRTZXJ2aWNlOiBQYXRpZW50U2VydmljZSkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnBhdGllbnRTZXJ2aWNlLmdldFN1bW1hcnlGb3JQYXRpZW50KHRoaXMucGF0aWVudElkKS5zdWJzY3JpYmUocmVzID0+IHRoaXMuc3VtbWFyaWVzID0gcmVzKVxuICAgIH1cblxuICAgIHB1YmxpYyBwcm9wZXJ0aWVzRm9yU3VtbWFyeShzdW1tYXJ5OiBTdW1tYXJ5KTogQXJyYXk8Q2FyZFZpZXdJdGVtPiB7XG4gICAgICAgIGNvbnN0IHByb3BlcnRpZXMgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBmaWVsZCBvZiBzdW1tYXJ5LmZpZWxkcykge1xuICAgICAgICAgICAgY29uc3QgZGF0YVR5cGUgPSBmaWVsZC50eXBlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBsZXQgaXRlbTogQ2FyZFZpZXdJdGVtO1xuICAgICAgICAgICAgc3dpdGNoIChkYXRhVHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgRmllbGRUeXBlLmJvb2xlYW46XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0gPSBuZXcgQ2FyZFZpZXdCb29sSXRlbU1vZGVsKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmaWVsZC52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogZmllbGQubGFiZWxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgRmllbGRUeXBlLmludDpcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IG5ldyBDYXJkVmlld0ludEl0ZW1Nb2RlbCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZmllbGQudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGZpZWxkLmxhYmVsLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBGaWVsZFR5cGUuZmxvYXQ6XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0gPSBuZXcgQ2FyZFZpZXdGbG9hdEl0ZW1Nb2RlbCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZmllbGQudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGZpZWxkLmxhYmVsLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBGaWVsZFR5cGUuZGF0ZTpcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IG5ldyBDYXJkVmlld0RhdGVJdGVtTW9kZWwoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZpZWxkLnZhbHVlID8gbW9tZW50KGZpZWxkLnZhbHVlKSA6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGZpZWxkLmxhYmVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiAnZGQgTU1NLCB5eXl5J1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBGaWVsZFR5cGUuZGF0ZXRpbWU6XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0gPSBuZXcgQ2FyZFZpZXdEYXRldGltZUl0ZW1Nb2RlbCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZmllbGQudmFsdWUgPyBtb21lbnQoZmllbGQudmFsdWUpIDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogZmllbGQubGFiZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6ICdkZCBNTU0sIHl5eXkgSEg6bW0nXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpdGVtID0gbmV3IENhcmRWaWV3VGV4dEl0ZW1Nb2RlbCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZmllbGQudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGZpZWxkLmxhYmVsLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByb3BlcnRpZXMucHVzaChpdGVtKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcHJvcGVydGllcztcbiAgICB9XG59XG4iXX0=