import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { PatientService } from "../services/patient.service";
import { ActivatedRoute } from "@angular/router";
var DetailedTimelineComponent = /** @class */ (function () {
    function DetailedTimelineComponent(patientService, route) {
        this.patientService = patientService;
        this.route = route;
    }
    DetailedTimelineComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (_a) {
            var entity = _a.entity;
            var patient = !!entity && entity.body ? entity.body : entity;
            _this.id = patient.id;
            _this.uuid = patient.uuid;
        });
    };
    DetailedTimelineComponent.prototype.previousState = function () {
        window.history.back();
    };
    DetailedTimelineComponent.ctorParameters = function () { return [
        { type: PatientService },
        { type: ActivatedRoute }
    ]; };
    DetailedTimelineComponent = tslib_1.__decorate([
        Component({
            selector: 'detailed-timeline',
            template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <mat-card>\n            <mat-card-header>\n                <mat-card-title>Patient Activity History</mat-card-title>\n            </mat-card-header>\n            <mat-card-content>\n                <patient-timeline [patientId]=\"id\" [patientUuid]=\"uuid\" [detailed]=\"true\"></patient-timeline>\n            </mat-card-content>\n            <mat-card-actions class=\"lamis-edit-form-actions\">\n                <button mat-button type=\"button\" (click)=\"previousState()\">Back</button>\n            </mat-card-actions>\n        </mat-card>\n    </div>\n</div>\n"
        }),
        tslib_1.__metadata("design:paramtypes", [PatientService, ActivatedRoute])
    ], DetailedTimelineComponent);
    return DetailedTimelineComponent;
}());
export { DetailedTimelineComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0YWlsZWQudGltZWxpbmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGFtaXMtcGF0aWVudC0xLjQuMS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2RldGFpbGVkLnRpbWVsaW5lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBUyxNQUFNLGVBQWUsQ0FBQztBQUNoRCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDM0QsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBTS9DO0lBSUksbUNBQW9CLGNBQThCLEVBQVUsS0FBcUI7UUFBN0QsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7SUFDakYsQ0FBQztJQUVELDRDQUFRLEdBQVI7UUFBQSxpQkFNQztRQUxHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFDLEVBQVE7Z0JBQVAsa0JBQU07WUFDOUIsSUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDL0QsS0FBSSxDQUFDLEVBQUUsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQ3JCLEtBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxpREFBYSxHQUFiO1FBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMxQixDQUFDOztnQkFibUMsY0FBYztnQkFBaUIsY0FBYzs7SUFKeEUseUJBQXlCO1FBSnJDLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxtQkFBbUI7WUFDN0IsMHBCQUFpRDtTQUNwRCxDQUFDO2lEQUtzQyxjQUFjLEVBQWlCLGNBQWM7T0FKeEUseUJBQXlCLENBa0JyQztJQUFELGdDQUFDO0NBQUEsQUFsQkQsSUFrQkM7U0FsQlkseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7UGF0aWVudFNlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy9wYXRpZW50LnNlcnZpY2VcIjtcbmltcG9ydCB7QWN0aXZhdGVkUm91dGV9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdkZXRhaWxlZC10aW1lbGluZScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2RldGFpbGVkLnRpbWVsaW5lLmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBEZXRhaWxlZFRpbWVsaW5lQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBpZDogbnVtYmVyO1xuICAgIHV1aWQ6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcGF0aWVudFNlcnZpY2U6IFBhdGllbnRTZXJ2aWNlLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnJvdXRlLmRhdGEuc3Vic2NyaWJlKCh7ZW50aXR5fSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGF0aWVudCA9ICEhZW50aXR5ICYmIGVudGl0eS5ib2R5ID8gZW50aXR5LmJvZHkgOiBlbnRpdHk7XG4gICAgICAgICAgICB0aGlzLmlkID0gcGF0aWVudC5pZDtcbiAgICAgICAgICAgIHRoaXMudXVpZCA9IHBhdGllbnQudXVpZDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJldmlvdXNTdGF0ZSgpIHtcbiAgICAgICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xuICAgIH1cbn1cbiJdfQ==