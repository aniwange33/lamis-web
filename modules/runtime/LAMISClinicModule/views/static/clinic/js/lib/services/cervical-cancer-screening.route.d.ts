import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes } from '@angular/router';
import { Observation } from '../model/clinic.model';
import { Observable } from 'rxjs';
import { CervicalCancerScreeningService } from './cervical-cancer-screening.service';
export declare class ObservationResolve implements Resolve<Observation> {
    private service;
    constructor(service: CervicalCancerScreeningService);
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observation>;
}
export declare const ROUTES: Routes;
