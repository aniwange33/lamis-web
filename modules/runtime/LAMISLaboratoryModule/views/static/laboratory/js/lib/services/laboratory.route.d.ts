import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes } from '@angular/router';
import { Observable } from 'rxjs';
import { LaboratoryService } from './laboratory.service';
import { Laboratory } from '../model/laboratory.model';
export declare class LaboratoryResolve implements Resolve<Laboratory> {
    private service;
    constructor(service: LaboratoryService);
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Laboratory>;
}
export declare const ROUTES: Routes;
