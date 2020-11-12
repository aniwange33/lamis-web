import * as tslib_1 from "tslib";
import {Component, Input} from '@angular/core';
import {ClinicService} from '../../services/clinic.service';
import {CardViewDateItemModel, CardViewFloatItemModel, CardViewTextItemModel} from "@alfresco/adf-core";

var ClinicWidget = /** @class */ (function () {
    function ClinicWidget(clinicService) {
        this.clinicService = clinicService;
        this.properties = [];
    }

    ClinicWidget.prototype.ngOnInit = function () {
        var _this = this;
        this.clinicService.latestVisit(this.patientId).subscribe(function (res) {
            _this.clinic = res;
            _this.buildProperties();
        });
    };
    ClinicWidget.prototype.buildProperties = function () {
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
    };
    ClinicWidget.ctorParameters = function () {
        return [
            {type: ClinicService}
        ];
    };
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
    return ClinicWidget;
}());
export {ClinicWidget};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpbmljLndpZGdldC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xhbWlzLWNsaW5pYy0xLjEuMy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2NsaW5pYy9jbGluaWMud2lkZ2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFFOUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLHNCQUFzQixFQUFnQixxQkFBcUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBTXhIO0lBTUksc0JBQW9CLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBRmhELGVBQVUsR0FBbUIsRUFBRSxDQUFDO0lBR2hDLENBQUM7SUFFRCwrQkFBUSxHQUFSO1FBQUEsaUJBS0M7UUFKRyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUMsR0FBRztZQUN6RCxLQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztZQUNsQixLQUFJLENBQUMsZUFBZSxFQUFFLENBQUE7UUFDMUIsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQsc0NBQWUsR0FBZjtRQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUkscUJBQXFCLENBQUM7WUFDM0MsR0FBRyxFQUFFLElBQUk7WUFDVCxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTO1lBQzVCLEtBQUssRUFBRSxtQkFBbUI7WUFDMUIsTUFBTSxFQUFFLGNBQWM7U0FDekIsQ0FBQyxDQUFDLENBQUM7UUFDSixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLHFCQUFxQixDQUFDO1lBQzNDLEdBQUcsRUFBRSxJQUFJO1lBQ1QsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZTtZQUNsQyxLQUFLLEVBQUUsbUJBQW1CO1lBQzFCLE1BQU0sRUFBRSxjQUFjO1NBQ3pCLENBQUMsQ0FBQyxDQUFDO1FBQ0osSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxxQkFBcUIsQ0FBQztZQUMzQyxLQUFLLEVBQUUsbUJBQW1CO1lBQzFCLEdBQUcsRUFBRSxJQUFJO1lBQ1QsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVTtTQUNoQyxDQUFDLENBQUMsQ0FBQztRQUNKLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUkscUJBQXFCLENBQUM7WUFDM0MsS0FBSyxFQUFFLGdCQUFnQjtZQUN2QixHQUFHLEVBQUUsSUFBSTtZQUNULEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVc7U0FDakMsQ0FBQyxDQUFDLENBQUM7UUFDSixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLHFCQUFxQixDQUFDO1lBQzNDLEtBQUssRUFBRSxXQUFXO1lBQ2xCLEdBQUcsRUFBRSxJQUFJO1lBQ1QsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUTtTQUM5QixDQUFDLENBQUMsQ0FBQztRQUNKLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksc0JBQXNCLENBQUM7WUFDNUMsS0FBSyxFQUFFLGlCQUFpQjtZQUN4QixHQUFHLEVBQUUsSUFBSTtZQUNULEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVU7U0FDaEMsQ0FBQyxDQUFDLENBQUM7SUFDUixDQUFDOztnQkEzQ2tDLGFBQWE7O0lBSmhEO1FBREMsS0FBSyxFQUFFOzttREFDVTtJQUZULFlBQVk7UUFKeEIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGVBQWU7WUFDekIseUVBQW1DO1NBQ3RDLENBQUM7aURBT3FDLGFBQWE7T0FOdkMsWUFBWSxDQW1EeEI7SUFBRCxtQkFBQztDQUFBLEFBbkRELElBbURDO1NBbkRZLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENsaW5pY1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jbGluaWMuc2VydmljZSc7XG5pbXBvcnQgeyBDbGluaWMgfSBmcm9tICcuLi8uLi9tb2RlbC9jbGluaWMubW9kZWwnO1xuaW1wb3J0IHsgQ2FyZFZpZXdEYXRlSXRlbU1vZGVsLCBDYXJkVmlld0Zsb2F0SXRlbU1vZGVsLCBDYXJkVmlld0l0ZW0sIENhcmRWaWV3VGV4dEl0ZW1Nb2RlbCB9IGZyb20gXCJAYWxmcmVzY28vYWRmLWNvcmVcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdjbGluaWMtd2lkZ2V0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY2xpbmljLndpZGdldC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBDbGluaWNXaWRnZXQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgpXG4gICAgcGF0aWVudElkOiBudW1iZXI7XG4gICAgY2xpbmljOiBDbGluaWM7XG4gICAgcHJvcGVydGllczogQ2FyZFZpZXdJdGVtW10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY2xpbmljU2VydmljZTogQ2xpbmljU2VydmljZSkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNsaW5pY1NlcnZpY2UubGF0ZXN0VmlzaXQodGhpcy5wYXRpZW50SWQpLnN1YnNjcmliZSgocmVzKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNsaW5pYyA9IHJlcztcbiAgICAgICAgICAgIHRoaXMuYnVpbGRQcm9wZXJ0aWVzKClcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBidWlsZFByb3BlcnRpZXMoKSB7XG4gICAgICAgIHRoaXMucHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld0RhdGVJdGVtTW9kZWwoe1xuICAgICAgICAgICAga2V5OiAnZHYnLFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMuY2xpbmljLmRhdGVWaXNpdCxcbiAgICAgICAgICAgIGxhYmVsOiAnTGFzdCBDbGluaWMgVmlzaXQnLFxuICAgICAgICAgICAgZm9ybWF0OiAnZGQgTU1NLCB5eXl5J1xuICAgICAgICB9KSk7XG4gICAgICAgIHRoaXMucHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld0RhdGVJdGVtTW9kZWwoe1xuICAgICAgICAgICAga2V5OiAnbnYnLFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMuY2xpbmljLm5leHRBcHBvaW50bWVudCxcbiAgICAgICAgICAgIGxhYmVsOiAnTmV4dCBDbGluaWMgVmlzaXQnLFxuICAgICAgICAgICAgZm9ybWF0OiAnZGQgTU1NLCB5eXl5J1xuICAgICAgICB9KSk7XG4gICAgICAgIHRoaXMucHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld1RleHRJdGVtTW9kZWwoe1xuICAgICAgICAgICAgbGFiZWw6ICdGdW5jdGlvbmFsIFN0YXR1cycsXG4gICAgICAgICAgICBrZXk6ICdmcycsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5jbGluaWMuZnVuY1N0YXR1c1xuICAgICAgICB9KSk7XG4gICAgICAgIHRoaXMucHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld1RleHRJdGVtTW9kZWwoe1xuICAgICAgICAgICAgbGFiZWw6ICdDbGluaWNhbCBTdGFnZScsXG4gICAgICAgICAgICBrZXk6ICdjcycsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5jbGluaWMuY2xpbmljU3RhZ2VcbiAgICAgICAgfSkpO1xuICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdUZXh0SXRlbU1vZGVsKHtcbiAgICAgICAgICAgIGxhYmVsOiAnVEIgU3RhdHVzJyxcbiAgICAgICAgICAgIGtleTogJ3RzJyxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLmNsaW5pYy50YlN0YXR1c1xuICAgICAgICB9KSk7XG4gICAgICAgIHRoaXMucHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld0Zsb2F0SXRlbU1vZGVsKHtcbiAgICAgICAgICAgIGxhYmVsOiAnQm9keSBXZWlnaHQoS2cpJyxcbiAgICAgICAgICAgIGtleTogJ2J3JyxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLmNsaW5pYy5ib2R5V2VpZ2h0XG4gICAgICAgIH0pKTtcbiAgICB9XG5cbn1cbiJdfQ==
