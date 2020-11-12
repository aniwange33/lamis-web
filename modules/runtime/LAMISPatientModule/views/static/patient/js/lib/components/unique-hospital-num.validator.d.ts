import {AbstractControl, AsyncValidator, ValidationErrors} from '@angular/forms';
import {PatientService} from '../services/patient.service';
import {Observable} from 'rxjs';

export declare class UniqueHospitalNumValidator implements AsyncValidator {
    private patientService;

    constructor(patientService: PatientService);

    validate(control: AbstractControl): Observable<ValidationErrors | null>;
}
