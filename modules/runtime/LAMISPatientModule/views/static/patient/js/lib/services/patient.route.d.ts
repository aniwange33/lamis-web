import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {Observable} from 'rxjs';
import {PatientService} from './patient.service';
import {Patient} from '../model/patient.model';

export declare class PatientResolve implements Resolve<Patient> {
    private service;

    constructor(service: PatientService);

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Patient>;
}

export declare const ROUTES: Routes;
