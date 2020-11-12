import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {Observable} from 'rxjs';
import {Devolve} from '../model/pharmacy.model';
import {DevolveService} from './devolve.service';

export declare class DevolveResolve implements Resolve<Devolve> {
    private service;

    constructor(service: DevolveService);

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Devolve>;
}

export declare const ROUTES: Routes;
