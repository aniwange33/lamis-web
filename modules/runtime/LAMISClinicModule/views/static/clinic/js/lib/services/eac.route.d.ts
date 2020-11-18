import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes } from '@angular/router';
import { EAC } from '../model/clinic.model';
import { Observable } from 'rxjs';
import { EacService } from './eac.service';
export declare class EacResolve implements Resolve<EAC> {
    private service;
    constructor(service: EacService);
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<EAC>;
}
export declare const ROUTES: Routes;
