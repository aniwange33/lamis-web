import { HttpClient, HttpResponse } from '@angular/common/http';
import { ServerApiUrlConfig } from '@lamis/web-core';
import { Observable } from 'rxjs';
import { CommunityPharmacy } from '../model/community-pharmacy.model';
export declare class CommunityPharmacyService {
    protected http: HttpClient;
    private serverUrl;
    resourceUrl: string;
    constructor(http: HttpClient, serverUrl: ServerApiUrlConfig);
    create(caseManager: CommunityPharmacy): Observable<HttpResponse<CommunityPharmacy>>;
    update(caseManager: CommunityPharmacy): Observable<HttpResponse<CommunityPharmacy>>;
    find(id: number): Observable<HttpResponse<CommunityPharmacy>>;
    delete(id: number): Observable<HttpResponse<any>>;
    query(req?: any): Observable<HttpResponse<CommunityPharmacy[]>>;
    getLgasByState(id: any): Observable<any[]>;
}
