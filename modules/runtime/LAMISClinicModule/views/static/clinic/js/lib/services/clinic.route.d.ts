import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {Observable} from 'rxjs';
import {ClinicService} from './clinic.service';
import {Clinic} from '../model/clinic.model';

export declare class ClinicResolve implements Resolve<Clinic> {
    private service;

    constructor(service: ClinicService);

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Clinic>;
}

export declare const ROUTES: Routes;
