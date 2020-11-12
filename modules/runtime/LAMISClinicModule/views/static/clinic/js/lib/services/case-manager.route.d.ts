import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {Observable} from 'rxjs';
import {CaseManager} from '../model/case-management.model';
import {CaseManagerService} from './case-manager.service';

export declare class CaseManagerResolve implements Resolve<CaseManager> {
    private service;

    constructor(service: CaseManagerService);

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CaseManager>;
}

export declare const ROUTES: Routes;
