import * as tslib_1 from "tslib";
import {Component, Input} from '@angular/core';
import {PharmacyService} from '../services/pharmacy.service';
import {CardViewDateItemModel, CardViewTextItemModel} from "@alfresco/adf-core";

var PharmacyWidget = /** @class */ (function () {
    function PharmacyWidget(pharmacyService) {
        this.pharmacyService = pharmacyService;
        this.properties = [];
    }

    PharmacyWidget.prototype.ngOnInit = function () {
        var _this = this;
        this.pharmacyService.latestVisit(this.patientId).subscribe(function (res) {
            _this.pharmacy = res;
            _this.buildProperties();
        });
    };
    PharmacyWidget.prototype.buildProperties = function () {
        var _this = this;
        this.properties.push(new CardViewDateItemModel({
            key: 'dv',
            value: this.pharmacy.dateVisit,
            label: 'Last Pharmacy Refill',
            format: 'dd MMM, yyyy'
        }));
        this.properties.push(new CardViewDateItemModel({
            key: 'nv',
            value: this.pharmacy.nextAppointment,
            label: 'Next Pharmacy Refill',
            format: 'dd MMM, yyyy'
        }));
        this.properties.push(new CardViewTextItemModel({
            label: 'MMD Type',
            key: 'fs',
            value: this.pharmacy.mmdType
        }));
        this.pharmacyService.regimenInfo(this.pharmacy.patient.id)
            .subscribe(function (res) {
                _this.properties.push(new CardViewTextItemModel({
                    label: 'Regimen Line',
                    key: 'cs',
                    value: res.regimenType
                }));
                _this.properties.push(new CardViewTextItemModel({
                    label: 'Regimen',
                    key: 'ts',
                    value: res.regimen
                }));
            });
    };
    PharmacyWidget.ctorParameters = function () {
        return [
            {type: PharmacyService}
        ];
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], PharmacyWidget.prototype, "patientId", void 0);
    PharmacyWidget = tslib_1.__decorate([
        Component({
            selector: 'pharmacy-widget',
            template: "<adf-card-view [properties]=\"properties\"></adf-card-view>\n"
        }),
        tslib_1.__metadata("design:paramtypes", [PharmacyService])
    ], PharmacyWidget);
    return PharmacyWidget;
}());
export {PharmacyWidget};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhhcm1hY3kud2lkZ2V0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGFtaXMtcGhhcm1hY3ktMS4xLjQvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9waGFybWFjeS53aWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ3pELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUUvRCxPQUFPLEVBQUUscUJBQXFCLEVBQXdDLHFCQUFxQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFNeEg7SUFNSSx3QkFBb0IsZUFBZ0M7UUFBaEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBRnBELGVBQVUsR0FBbUIsRUFBRSxDQUFDO0lBR2hDLENBQUM7SUFFRCxpQ0FBUSxHQUFSO1FBQUEsaUJBS0M7UUFKRyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUMsR0FBRztZQUMzRCxLQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztZQUNwQixLQUFJLENBQUMsZUFBZSxFQUFFLENBQUE7UUFDMUIsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQsd0NBQWUsR0FBZjtRQUFBLGlCQWdDQztRQS9CRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLHFCQUFxQixDQUFDO1lBQzNDLEdBQUcsRUFBRSxJQUFJO1lBQ1QsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUztZQUM5QixLQUFLLEVBQUUsc0JBQXNCO1lBQzdCLE1BQU0sRUFBRSxjQUFjO1NBQ3pCLENBQUMsQ0FBQyxDQUFDO1FBQ0osSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxxQkFBcUIsQ0FBQztZQUMzQyxHQUFHLEVBQUUsSUFBSTtZQUNULEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWU7WUFDcEMsS0FBSyxFQUFFLHNCQUFzQjtZQUM3QixNQUFNLEVBQUUsY0FBYztTQUN6QixDQUFDLENBQUMsQ0FBQztRQUNKLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUkscUJBQXFCLENBQUM7WUFDM0MsS0FBSyxFQUFFLFVBQVU7WUFDakIsR0FBRyxFQUFFLElBQUk7WUFDVCxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPO1NBQy9CLENBQUMsQ0FBQyxDQUFDO1FBRUosSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO2FBQ3JELFNBQVMsQ0FBQyxVQUFDLEdBQWdCO1lBQ3hCLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUkscUJBQXFCLENBQUM7Z0JBQzNDLEtBQUssRUFBRSxjQUFjO2dCQUNyQixHQUFHLEVBQUUsSUFBSTtnQkFDVCxLQUFLLEVBQUUsR0FBRyxDQUFDLFdBQVc7YUFDekIsQ0FBQyxDQUFDLENBQUM7WUFDSixLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLHFCQUFxQixDQUFDO2dCQUMzQyxLQUFLLEVBQUUsU0FBUztnQkFDaEIsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsS0FBSyxFQUFFLEdBQUcsQ0FBQyxPQUFPO2FBQ3JCLENBQUMsQ0FBQyxDQUFDO1FBQ1IsQ0FBQyxDQUFDLENBQUE7SUFDVixDQUFDOztnQkExQ29DLGVBQWU7O0lBSnBEO1FBREMsS0FBSyxFQUFFOztxREFDVTtJQUZULGNBQWM7UUFKMUIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQix5RUFBcUM7U0FDeEMsQ0FBQztpREFPdUMsZUFBZTtPQU4zQyxjQUFjLENBa0QxQjtJQUFELHFCQUFDO0NBQUEsQUFsREQsSUFrREM7U0FsRFksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGhhcm1hY3lTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvcGhhcm1hY3kuc2VydmljZSc7XG5pbXBvcnQgeyBQaGFybWFjeSwgUmVnaW1lbkluZm8gfSBmcm9tICcuLi9tb2RlbC9waGFybWFjeS5tb2RlbCc7XG5pbXBvcnQgeyBDYXJkVmlld0RhdGVJdGVtTW9kZWwsIENhcmRWaWV3RmxvYXRJdGVtTW9kZWwsIENhcmRWaWV3SXRlbSwgQ2FyZFZpZXdUZXh0SXRlbU1vZGVsIH0gZnJvbSBcIkBhbGZyZXNjby9hZGYtY29yZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3BoYXJtYWN5LXdpZGdldCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3BoYXJtYWN5LndpZGdldC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBQaGFybWFjeVdpZGdldCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQElucHV0KClcbiAgICBwYXRpZW50SWQ6IG51bWJlcjtcbiAgICBwaGFybWFjeTogUGhhcm1hY3k7XG4gICAgcHJvcGVydGllczogQ2FyZFZpZXdJdGVtW10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcGhhcm1hY3lTZXJ2aWNlOiBQaGFybWFjeVNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5waGFybWFjeVNlcnZpY2UubGF0ZXN0VmlzaXQodGhpcy5wYXRpZW50SWQpLnN1YnNjcmliZSgocmVzKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBoYXJtYWN5ID0gcmVzO1xuICAgICAgICAgICAgdGhpcy5idWlsZFByb3BlcnRpZXMoKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGJ1aWxkUHJvcGVydGllcygpIHtcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3RGF0ZUl0ZW1Nb2RlbCh7XG4gICAgICAgICAgICBrZXk6ICdkdicsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5waGFybWFjeS5kYXRlVmlzaXQsXG4gICAgICAgICAgICBsYWJlbDogJ0xhc3QgUGhhcm1hY3kgUmVmaWxsJyxcbiAgICAgICAgICAgIGZvcm1hdDogJ2RkIE1NTSwgeXl5eSdcbiAgICAgICAgfSkpO1xuICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdEYXRlSXRlbU1vZGVsKHtcbiAgICAgICAgICAgIGtleTogJ252JyxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnBoYXJtYWN5Lm5leHRBcHBvaW50bWVudCxcbiAgICAgICAgICAgIGxhYmVsOiAnTmV4dCBQaGFybWFjeSBSZWZpbGwnLFxuICAgICAgICAgICAgZm9ybWF0OiAnZGQgTU1NLCB5eXl5J1xuICAgICAgICB9KSk7XG4gICAgICAgIHRoaXMucHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld1RleHRJdGVtTW9kZWwoe1xuICAgICAgICAgICAgbGFiZWw6ICdNTUQgVHlwZScsXG4gICAgICAgICAgICBrZXk6ICdmcycsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5waGFybWFjeS5tbWRUeXBlXG4gICAgICAgIH0pKTtcblxuICAgICAgICB0aGlzLnBoYXJtYWN5U2VydmljZS5yZWdpbWVuSW5mbyh0aGlzLnBoYXJtYWN5LnBhdGllbnQuaWQpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXM6IFJlZ2ltZW5JbmZvKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3VGV4dEl0ZW1Nb2RlbCh7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnUmVnaW1lbiBMaW5lJyxcbiAgICAgICAgICAgICAgICAgICAga2V5OiAnY3MnLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcmVzLnJlZ2ltZW5UeXBlXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld1RleHRJdGVtTW9kZWwoe1xuICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ1JlZ2ltZW4nLFxuICAgICAgICAgICAgICAgICAgICBrZXk6ICd0cycsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiByZXMucmVnaW1lblxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH0pXG4gICAgfVxuXG59XG4iXX0=
