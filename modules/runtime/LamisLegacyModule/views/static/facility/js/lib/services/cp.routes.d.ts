import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes } from '@angular/router';
import { CommunityPharmacy } from '../model/community-pharmacy.model';
import { CommunityPharmacyService } from './community-pharmacy.service';
import { Observable } from 'rxjs';
export declare class CommunityPharmacyResolve implements Resolve<CommunityPharmacy> {
    private service;
    constructor(service: CommunityPharmacyService);
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CommunityPharmacy>;
}
export declare const ROUTES: Routes;
