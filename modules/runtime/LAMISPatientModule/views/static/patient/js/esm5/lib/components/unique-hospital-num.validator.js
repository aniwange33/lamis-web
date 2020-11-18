import * as tslib_1 from "tslib";
import { NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Directive } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { debounceTime, switchMap, take } from 'rxjs/operators';
var UniqueHospitalNumValidator = /** @class */ (function () {
    function UniqueHospitalNumValidator(patientService) {
        this.patientService = patientService;
    }
    UniqueHospitalNumValidator_1 = UniqueHospitalNumValidator;
    UniqueHospitalNumValidator.prototype.validate = function (control) {
        var _this = this;
        return control.valueChanges
            .pipe(debounceTime(300), take(1), switchMap(function (value) { return _this.patientService.existsByHospitalNumber(value); }));
    };
    var UniqueHospitalNumValidator_1;
    UniqueHospitalNumValidator.ctorParameters = function () { return [
        { type: PatientService }
    ]; };
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
export { UniqueHospitalNumValidator };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pcXVlLWhvc3BpdGFsLW51bS52YWxpZGF0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1wYXRpZW50LTEuNC4xLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvdW5pcXVlLWhvc3BpdGFsLW51bS52YWxpZGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBa0MsbUJBQW1CLEVBQW1CLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEcsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN4QyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFFM0QsT0FBTyxFQUFDLFlBQVksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFVN0Q7SUFDSSxvQ0FBb0IsY0FBOEI7UUFBOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO0lBQ2xELENBQUM7bUNBRlEsMEJBQTBCO0lBSW5DLDZDQUFRLEdBQVIsVUFBUyxPQUF3QjtRQUFqQyxpQkFPQztRQU5HLE9BQU8sT0FBTyxDQUFDLFlBQVk7YUFDdEIsSUFBSSxDQUNELFlBQVksQ0FBQyxHQUFHLENBQUMsRUFDakIsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNQLFNBQVMsQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxjQUFjLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLEVBQWpELENBQWlELENBQUMsQ0FDeEUsQ0FBQztJQUNWLENBQUM7OztnQkFWbUMsY0FBYzs7SUFEekMsMEJBQTBCO1FBUnRDLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxxQkFBcUI7WUFDL0IsU0FBUyxFQUFFLENBQUM7b0JBQ1IsT0FBTyxFQUFFLG1CQUFtQjtvQkFDNUIsV0FBVyxFQUFFLDRCQUEwQjtvQkFDdkMsS0FBSyxFQUFFLElBQUk7aUJBQ2QsQ0FBQztTQUNMLENBQUM7aURBRXNDLGNBQWM7T0FEekMsMEJBQTBCLENBWXRDO0lBQUQsaUNBQUM7Q0FBQSxBQVpELElBWUM7U0FaWSwwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Fic3RyYWN0Q29udHJvbCwgQXN5bmNWYWxpZGF0b3IsIE5HX0FTWU5DX1ZBTElEQVRPUlMsIFZhbGlkYXRpb25FcnJvcnN9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7RGlyZWN0aXZlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7UGF0aWVudFNlcnZpY2V9IGZyb20gJy4uL3NlcnZpY2VzL3BhdGllbnQuc2VydmljZSc7XG5pbXBvcnQge09ic2VydmFibGUsIG9mfSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZGVib3VuY2VUaW1lLCBzd2l0Y2hNYXAsIHRha2V9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdW5pcXVlSG9zcGl0YWxOdW1dJyxcbiAgICBwcm92aWRlcnM6IFt7XG4gICAgICAgIHByb3ZpZGU6IE5HX0FTWU5DX1ZBTElEQVRPUlMsXG4gICAgICAgIHVzZUV4aXN0aW5nOiBVbmlxdWVIb3NwaXRhbE51bVZhbGlkYXRvcixcbiAgICAgICAgbXVsdGk6IHRydWVcbiAgICB9XVxufSlcbmV4cG9ydCBjbGFzcyBVbmlxdWVIb3NwaXRhbE51bVZhbGlkYXRvciBpbXBsZW1lbnRzIEFzeW5jVmFsaWRhdG9yIHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhdGllbnRTZXJ2aWNlOiBQYXRpZW50U2VydmljZSkge1xuICAgIH1cblxuICAgIHZhbGlkYXRlKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IE9ic2VydmFibGU8VmFsaWRhdGlvbkVycm9ycyB8IG51bGw+IHtcbiAgICAgICAgcmV0dXJuIGNvbnRyb2wudmFsdWVDaGFuZ2VzXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBkZWJvdW5jZVRpbWUoMzAwKSxcbiAgICAgICAgICAgICAgICB0YWtlKDEpLFxuICAgICAgICAgICAgICAgIHN3aXRjaE1hcCh2YWx1ZSA9PiB0aGlzLnBhdGllbnRTZXJ2aWNlLmV4aXN0c0J5SG9zcGl0YWxOdW1iZXIodmFsdWUpKVxuICAgICAgICAgICAgKTtcbiAgICB9XG59XG4iXX0=