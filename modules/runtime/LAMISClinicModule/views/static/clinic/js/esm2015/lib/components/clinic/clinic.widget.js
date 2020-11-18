import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { ClinicService } from '../../services/clinic.service';
import { CardViewDateItemModel, CardViewFloatItemModel, CardViewTextItemModel } from '@alfresco/adf-core';
let ClinicWidget = class ClinicWidget {
    constructor(clinicService) {
        this.clinicService = clinicService;
        this.properties = [];
    }
    ngOnInit() {
        this.clinicService.latestVisit(this.patientId).subscribe((res) => {
            this.clinic = res;
            this.buildProperties();
        });
    }
    buildProperties() {
        this.properties.push(new CardViewDateItemModel({
            key: 'dv',
            value: this.clinic.dateVisit,
            label: 'Last Clinic Visit',
            format: 'dd MMM, yyyy'
        }));
        this.properties.push(new CardViewDateItemModel({
            key: 'nv',
            value: this.clinic.nextAppointment,
            label: 'Next Clinic Visit',
            format: 'dd MMM, yyyy'
        }));
        this.properties.push(new CardViewTextItemModel({
            label: 'Functional Status',
            key: 'fs',
            value: this.clinic.funcStatus
        }));
        this.properties.push(new CardViewTextItemModel({
            label: 'Clinical Stage',
            key: 'cs',
            value: this.clinic.clinicStage
        }));
        this.properties.push(new CardViewTextItemModel({
            label: 'TB Status',
            key: 'ts',
            value: this.clinic.tbStatus
        }));
        this.properties.push(new CardViewFloatItemModel({
            label: 'Body Weight(Kg)',
            key: 'bw',
            value: this.clinic.bodyWeight
        }));
    }
};
ClinicWidget.ctorParameters = () => [
    { type: ClinicService }
];
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], ClinicWidget.prototype, "patientId", void 0);
ClinicWidget = tslib_1.__decorate([
    Component({
        selector: 'clinic-widget',
        template: "<adf-card-view [properties]=\"properties\"></adf-card-view>\n"
    }),
    tslib_1.__metadata("design:paramtypes", [ClinicService])
], ClinicWidget);
export { ClinicWidget };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpbmljLndpZGdldC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xhbWlzLWNsaW5pYy0xLjQuMC8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2NsaW5pYy9jbGluaWMud2lkZ2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBUyxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFFNUQsT0FBTyxFQUFDLHFCQUFxQixFQUFFLHNCQUFzQixFQUFnQixxQkFBcUIsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBTXRILElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQVk7SUFNckIsWUFBb0IsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFGaEQsZUFBVSxHQUFtQixFQUFFLENBQUM7SUFHaEMsQ0FBQztJQUVELFFBQVE7UUFDSixJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDN0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7WUFDbEIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELGVBQWU7UUFDWCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLHFCQUFxQixDQUFDO1lBQzNDLEdBQUcsRUFBRSxJQUFJO1lBQ1QsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUztZQUM1QixLQUFLLEVBQUUsbUJBQW1CO1lBQzFCLE1BQU0sRUFBRSxjQUFjO1NBQ3pCLENBQUMsQ0FBQyxDQUFDO1FBQ0osSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxxQkFBcUIsQ0FBQztZQUMzQyxHQUFHLEVBQUUsSUFBSTtZQUNULEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWU7WUFDbEMsS0FBSyxFQUFFLG1CQUFtQjtZQUMxQixNQUFNLEVBQUUsY0FBYztTQUN6QixDQUFDLENBQUMsQ0FBQztRQUNKLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUkscUJBQXFCLENBQUM7WUFDM0MsS0FBSyxFQUFFLG1CQUFtQjtZQUMxQixHQUFHLEVBQUUsSUFBSTtZQUNULEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVU7U0FDaEMsQ0FBQyxDQUFDLENBQUM7UUFDSixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLHFCQUFxQixDQUFDO1lBQzNDLEtBQUssRUFBRSxnQkFBZ0I7WUFDdkIsR0FBRyxFQUFFLElBQUk7WUFDVCxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXO1NBQ2pDLENBQUMsQ0FBQyxDQUFDO1FBQ0osSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxxQkFBcUIsQ0FBQztZQUMzQyxLQUFLLEVBQUUsV0FBVztZQUNsQixHQUFHLEVBQUUsSUFBSTtZQUNULEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVE7U0FDOUIsQ0FBQyxDQUFDLENBQUM7UUFDSixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLHNCQUFzQixDQUFDO1lBQzVDLEtBQUssRUFBRSxpQkFBaUI7WUFDeEIsR0FBRyxFQUFFLElBQUk7WUFDVCxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVO1NBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBQ1IsQ0FBQztDQUVKLENBQUE7O1lBN0NzQyxhQUFhOztBQUpoRDtJQURDLEtBQUssRUFBRTs7K0NBQ1U7QUFGVCxZQUFZO0lBSnhCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxlQUFlO1FBQ3pCLHlFQUFtQztLQUN0QyxDQUFDOzZDQU9xQyxhQUFhO0dBTnZDLFlBQVksQ0FtRHhCO1NBbkRZLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NsaW5pY1NlcnZpY2V9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2NsaW5pYy5zZXJ2aWNlJztcbmltcG9ydCB7Q2xpbmljfSBmcm9tICcuLi8uLi9tb2RlbC9jbGluaWMubW9kZWwnO1xuaW1wb3J0IHtDYXJkVmlld0RhdGVJdGVtTW9kZWwsIENhcmRWaWV3RmxvYXRJdGVtTW9kZWwsIENhcmRWaWV3SXRlbSwgQ2FyZFZpZXdUZXh0SXRlbU1vZGVsfSBmcm9tICdAYWxmcmVzY28vYWRmLWNvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2NsaW5pYy13aWRnZXQnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9jbGluaWMud2lkZ2V0Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIENsaW5pY1dpZGdldCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQElucHV0KClcbiAgICBwYXRpZW50SWQ6IG51bWJlcjtcbiAgICBjbGluaWM6IENsaW5pYztcbiAgICBwcm9wZXJ0aWVzOiBDYXJkVmlld0l0ZW1bXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjbGluaWNTZXJ2aWNlOiBDbGluaWNTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY2xpbmljU2VydmljZS5sYXRlc3RWaXNpdCh0aGlzLnBhdGllbnRJZCkuc3Vic2NyaWJlKChyZXMpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2xpbmljID0gcmVzO1xuICAgICAgICAgICAgdGhpcy5idWlsZFByb3BlcnRpZXMoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYnVpbGRQcm9wZXJ0aWVzKCkge1xuICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdEYXRlSXRlbU1vZGVsKHtcbiAgICAgICAgICAgIGtleTogJ2R2JyxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLmNsaW5pYy5kYXRlVmlzaXQsXG4gICAgICAgICAgICBsYWJlbDogJ0xhc3QgQ2xpbmljIFZpc2l0JyxcbiAgICAgICAgICAgIGZvcm1hdDogJ2RkIE1NTSwgeXl5eSdcbiAgICAgICAgfSkpO1xuICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdEYXRlSXRlbU1vZGVsKHtcbiAgICAgICAgICAgIGtleTogJ252JyxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLmNsaW5pYy5uZXh0QXBwb2ludG1lbnQsXG4gICAgICAgICAgICBsYWJlbDogJ05leHQgQ2xpbmljIFZpc2l0JyxcbiAgICAgICAgICAgIGZvcm1hdDogJ2RkIE1NTSwgeXl5eSdcbiAgICAgICAgfSkpO1xuICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdUZXh0SXRlbU1vZGVsKHtcbiAgICAgICAgICAgIGxhYmVsOiAnRnVuY3Rpb25hbCBTdGF0dXMnLFxuICAgICAgICAgICAga2V5OiAnZnMnLFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMuY2xpbmljLmZ1bmNTdGF0dXNcbiAgICAgICAgfSkpO1xuICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdUZXh0SXRlbU1vZGVsKHtcbiAgICAgICAgICAgIGxhYmVsOiAnQ2xpbmljYWwgU3RhZ2UnLFxuICAgICAgICAgICAga2V5OiAnY3MnLFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMuY2xpbmljLmNsaW5pY1N0YWdlXG4gICAgICAgIH0pKTtcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3VGV4dEl0ZW1Nb2RlbCh7XG4gICAgICAgICAgICBsYWJlbDogJ1RCIFN0YXR1cycsXG4gICAgICAgICAgICBrZXk6ICd0cycsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5jbGluaWMudGJTdGF0dXNcbiAgICAgICAgfSkpO1xuICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdGbG9hdEl0ZW1Nb2RlbCh7XG4gICAgICAgICAgICBsYWJlbDogJ0JvZHkgV2VpZ2h0KEtnKScsXG4gICAgICAgICAgICBrZXk6ICdidycsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5jbGluaWMuYm9keVdlaWdodFxuICAgICAgICB9KSk7XG4gICAgfVxuXG59XG4iXX0=