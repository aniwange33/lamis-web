import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes } from '@angular/router';
import { Observable } from 'rxjs';
import { ChronicCare } from '../model/clinic.model';
import { ChronicCareService } from './chronic.care.service';
export declare class ChronicCareResolve implements Resolve<ChronicCare> {
    private service;
    constructor(service: ChronicCareService);
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ChronicCare>;
}
export declare const ROUTES: Routes;
