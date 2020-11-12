import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ServerApiUrlConfig} from '@lamis/web-core';

export declare class FacilityService {
    protected http: HttpClient;
    private serverUrl;
    resourceUrl: string;

    constructor(http: HttpClient, serverUrl: ServerApiUrlConfig);

    update(facility: any): Observable<any>;

    getFacilitiesByLga(id: number): Observable<any>;

    getStates(): Observable<any[]>;

    getLgaByState(id: any): Observable<any[]>;

    getActive(): Observable<import("@angular/common/http").HttpResponse<Object>>;
}
