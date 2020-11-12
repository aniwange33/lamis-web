import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {Observable} from 'rxjs';
import {PharmacyService} from './pharmacy.service';
import {Pharmacy} from '../model/pharmacy.model';

export declare class PharmacyResolve implements Resolve<Pharmacy> {
    private service;

    constructor(service: PharmacyService);

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Pharmacy>;
}

export declare const ROUTES: Routes;
