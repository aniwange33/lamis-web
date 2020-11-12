import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {StatusHistory} from '../model/patient.model';
import {PatientService} from './patient.service';
import {Observable} from 'rxjs';

export declare class StatusResolve implements Resolve<StatusHistory> {
    private service;

    constructor(service: PatientService);

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<StatusHistory>;
}

export declare const ROUTES: Routes;
