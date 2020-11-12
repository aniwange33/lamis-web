import * as tslib_1 from "tslib";
import {NG_ASYNC_VALIDATORS} from '@angular/forms';
import {Directive} from '@angular/core';
import {PatientService} from '../services/patient.service';
import {debounceTime, switchMap, take} from 'rxjs/operators';

var UniqueHospitalNumValidator = /** @class */ (function () {
    function UniqueHospitalNumValidator(patientService) {
        this.patientService = patientService;
    }

    UniqueHospitalNumValidator_1 = UniqueHospitalNumValidator;
    UniqueHospitalNumValidator.prototype.validate = function (control) {
        var _this = this;
        return control.valueChanges
            .pipe(debounceTime(300), take(1), switchMap(function (value) {
                return _this.patientService.existsByHospitalNumber(value);
            }));
    };
    var UniqueHospitalNumValidator_1;
    UniqueHospitalNumValidator.ctorParameters = function () {
        return [
            {type: PatientService}
        ];
    };
    UniqueHospitalNumValidator = UniqueHospitalNumValidator_1 = tslib_1.__decorate([
        Directive({
            selector: '[uniqueHospitalNum]',
            providers: [{
                provide: NG_ASYNC_VALIDATORS,
                useExisting: UniqueHospitalNumValidator_1,
                multi: true
            }]
        }),
        tslib_1.__metadata("design:paramtypes", [PatientService])
    ], UniqueHospitalNumValidator);
    return UniqueHospitalNumValidator;
}());
export {UniqueHospitalNumValidator};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pcXVlLWhvc3BpdGFsLW51bS52YWxpZGF0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1wYXRpZW50LTEuMi4wLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvdW5pcXVlLWhvc3BpdGFsLW51bS52YWxpZGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBbUMsbUJBQW1CLEVBQW9CLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEcsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFVL0Q7SUFDSSxvQ0FBb0IsY0FBOEI7UUFBOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO0lBQ2xELENBQUM7bUNBRlEsMEJBQTBCO0lBSW5DLDZDQUFRLEdBQVIsVUFBUyxPQUF3QjtRQUFqQyxpQkFPQztRQU5HLE9BQU8sT0FBTyxDQUFDLFlBQVk7YUFDdEIsSUFBSSxDQUNELFlBQVksQ0FBQyxHQUFHLENBQUMsRUFDakIsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNQLFNBQVMsQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxjQUFjLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLEVBQWpELENBQWlELENBQUMsQ0FDeEUsQ0FBQztJQUNWLENBQUM7OztnQkFWbUMsY0FBYzs7SUFEekMsMEJBQTBCO1FBUnRDLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxxQkFBcUI7WUFDL0IsU0FBUyxFQUFFLENBQUM7b0JBQ1IsT0FBTyxFQUFFLG1CQUFtQjtvQkFDNUIsV0FBVyxFQUFFLDRCQUEwQjtvQkFDdkMsS0FBSyxFQUFFLElBQUk7aUJBQ2QsQ0FBQztTQUNMLENBQUM7aURBRXNDLGNBQWM7T0FEekMsMEJBQTBCLENBWXRDO0lBQUQsaUNBQUM7Q0FBQSxBQVpELElBWUM7U0FaWSwwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wsIEFzeW5jVmFsaWRhdG9yLCBOR19BU1lOQ19WQUxJREFUT1JTLCBWYWxpZGF0aW9uRXJyb3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGlyZWN0aXZlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYXRpZW50U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3BhdGllbnQuc2VydmljZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBzd2l0Y2hNYXAsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3VuaXF1ZUhvc3BpdGFsTnVtXScsXG4gICAgcHJvdmlkZXJzOiBbe1xuICAgICAgICBwcm92aWRlOiBOR19BU1lOQ19WQUxJREFUT1JTLFxuICAgICAgICB1c2VFeGlzdGluZzogVW5pcXVlSG9zcGl0YWxOdW1WYWxpZGF0b3IsXG4gICAgICAgIG11bHRpOiB0cnVlXG4gICAgfV1cbn0pXG5leHBvcnQgY2xhc3MgVW5pcXVlSG9zcGl0YWxOdW1WYWxpZGF0b3IgaW1wbGVtZW50cyBBc3luY1ZhbGlkYXRvciB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwYXRpZW50U2VydmljZTogUGF0aWVudFNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZShjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBPYnNlcnZhYmxlPFZhbGlkYXRpb25FcnJvcnMgfCBudWxsPiB7XG4gICAgICAgIHJldHVybiBjb250cm9sLnZhbHVlQ2hhbmdlc1xuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgZGVib3VuY2VUaW1lKDMwMCksXG4gICAgICAgICAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgICAgICAgICBzd2l0Y2hNYXAodmFsdWUgPT4gdGhpcy5wYXRpZW50U2VydmljZS5leGlzdHNCeUhvc3BpdGFsTnVtYmVyKHZhbHVlKSlcbiAgICAgICAgICAgICk7XG4gICAgfVxufVxuIl19
