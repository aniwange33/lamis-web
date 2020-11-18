import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { PharmacyService } from '../services/pharmacy.service';
import { CardViewDateItemModel, CardViewTextItemModel } from '@alfresco/adf-core';
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
    PharmacyWidget.ctorParameters = function () { return [
        { type: PharmacyService }
    ]; };
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
export { PharmacyWidget };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhhcm1hY3kud2lkZ2V0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGFtaXMtcGhhcm1hY3ktMS40LjAvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9waGFybWFjeS53aWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFTLE1BQU0sZUFBZSxDQUFDO0FBQ3ZELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUU3RCxPQUFPLEVBQUMscUJBQXFCLEVBQXdDLHFCQUFxQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFNdEg7SUFNSSx3QkFBb0IsZUFBZ0M7UUFBaEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBRnBELGVBQVUsR0FBbUIsRUFBRSxDQUFDO0lBR2hDLENBQUM7SUFFRCxpQ0FBUSxHQUFSO1FBQUEsaUJBS0M7UUFKRyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUMsR0FBRztZQUMzRCxLQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztZQUNwQixLQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsd0NBQWUsR0FBZjtRQUFBLGlCQWdDQztRQS9CRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLHFCQUFxQixDQUFDO1lBQzNDLEdBQUcsRUFBRSxJQUFJO1lBQ1QsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUztZQUM5QixLQUFLLEVBQUUsc0JBQXNCO1lBQzdCLE1BQU0sRUFBRSxjQUFjO1NBQ3pCLENBQUMsQ0FBQyxDQUFDO1FBQ0osSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxxQkFBcUIsQ0FBQztZQUMzQyxHQUFHLEVBQUUsSUFBSTtZQUNULEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWU7WUFDcEMsS0FBSyxFQUFFLHNCQUFzQjtZQUM3QixNQUFNLEVBQUUsY0FBYztTQUN6QixDQUFDLENBQUMsQ0FBQztRQUNKLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUkscUJBQXFCLENBQUM7WUFDM0MsS0FBSyxFQUFFLFVBQVU7WUFDakIsR0FBRyxFQUFFLElBQUk7WUFDVCxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPO1NBQy9CLENBQUMsQ0FBQyxDQUFDO1FBRUosSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO2FBQ3JELFNBQVMsQ0FBQyxVQUFDLEdBQWdCO1lBQ3hCLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUkscUJBQXFCLENBQUM7Z0JBQzNDLEtBQUssRUFBRSxjQUFjO2dCQUNyQixHQUFHLEVBQUUsSUFBSTtnQkFDVCxLQUFLLEVBQUUsR0FBRyxDQUFDLFdBQVc7YUFDekIsQ0FBQyxDQUFDLENBQUM7WUFDSixLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLHFCQUFxQixDQUFDO2dCQUMzQyxLQUFLLEVBQUUsU0FBUztnQkFDaEIsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsS0FBSyxFQUFFLEdBQUcsQ0FBQyxPQUFPO2FBQ3JCLENBQUMsQ0FBQyxDQUFDO1FBQ1IsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDOztnQkExQ29DLGVBQWU7O0lBSnBEO1FBREMsS0FBSyxFQUFFOztxREFDVTtJQUZULGNBQWM7UUFKMUIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQix5RUFBcUM7U0FDeEMsQ0FBQztpREFPdUMsZUFBZTtPQU4zQyxjQUFjLENBa0QxQjtJQUFELHFCQUFDO0NBQUEsQUFsREQsSUFrREM7U0FsRFksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7UGhhcm1hY3lTZXJ2aWNlfSBmcm9tICcuLi9zZXJ2aWNlcy9waGFybWFjeS5zZXJ2aWNlJztcbmltcG9ydCB7UGhhcm1hY3ksIFJlZ2ltZW5JbmZvfSBmcm9tICcuLi9tb2RlbC9waGFybWFjeS5tb2RlbCc7XG5pbXBvcnQge0NhcmRWaWV3RGF0ZUl0ZW1Nb2RlbCwgQ2FyZFZpZXdGbG9hdEl0ZW1Nb2RlbCwgQ2FyZFZpZXdJdGVtLCBDYXJkVmlld1RleHRJdGVtTW9kZWx9IGZyb20gJ0BhbGZyZXNjby9hZGYtY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncGhhcm1hY3ktd2lkZ2V0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vcGhhcm1hY3kud2lkZ2V0Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIFBoYXJtYWN5V2lkZ2V0IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoKVxuICAgIHBhdGllbnRJZDogbnVtYmVyO1xuICAgIHBoYXJtYWN5OiBQaGFybWFjeTtcbiAgICBwcm9wZXJ0aWVzOiBDYXJkVmlld0l0ZW1bXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwaGFybWFjeVNlcnZpY2U6IFBoYXJtYWN5U2VydmljZSkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnBoYXJtYWN5U2VydmljZS5sYXRlc3RWaXNpdCh0aGlzLnBhdGllbnRJZCkuc3Vic2NyaWJlKChyZXMpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGhhcm1hY3kgPSByZXM7XG4gICAgICAgICAgICB0aGlzLmJ1aWxkUHJvcGVydGllcygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBidWlsZFByb3BlcnRpZXMoKSB7XG4gICAgICAgIHRoaXMucHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld0RhdGVJdGVtTW9kZWwoe1xuICAgICAgICAgICAga2V5OiAnZHYnLFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMucGhhcm1hY3kuZGF0ZVZpc2l0LFxuICAgICAgICAgICAgbGFiZWw6ICdMYXN0IFBoYXJtYWN5IFJlZmlsbCcsXG4gICAgICAgICAgICBmb3JtYXQ6ICdkZCBNTU0sIHl5eXknXG4gICAgICAgIH0pKTtcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IENhcmRWaWV3RGF0ZUl0ZW1Nb2RlbCh7XG4gICAgICAgICAgICBrZXk6ICdudicsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5waGFybWFjeS5uZXh0QXBwb2ludG1lbnQsXG4gICAgICAgICAgICBsYWJlbDogJ05leHQgUGhhcm1hY3kgUmVmaWxsJyxcbiAgICAgICAgICAgIGZvcm1hdDogJ2RkIE1NTSwgeXl5eSdcbiAgICAgICAgfSkpO1xuICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdUZXh0SXRlbU1vZGVsKHtcbiAgICAgICAgICAgIGxhYmVsOiAnTU1EIFR5cGUnLFxuICAgICAgICAgICAga2V5OiAnZnMnLFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMucGhhcm1hY3kubW1kVHlwZVxuICAgICAgICB9KSk7XG5cbiAgICAgICAgdGhpcy5waGFybWFjeVNlcnZpY2UucmVnaW1lbkluZm8odGhpcy5waGFybWFjeS5wYXRpZW50LmlkKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzOiBSZWdpbWVuSW5mbykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld1RleHRJdGVtTW9kZWwoe1xuICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ1JlZ2ltZW4gTGluZScsXG4gICAgICAgICAgICAgICAgICAgIGtleTogJ2NzJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJlcy5yZWdpbWVuVHlwZVxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdUZXh0SXRlbU1vZGVsKHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdSZWdpbWVuJyxcbiAgICAgICAgICAgICAgICAgICAga2V5OiAndHMnLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcmVzLnJlZ2ltZW5cbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbn1cbiJdfQ==