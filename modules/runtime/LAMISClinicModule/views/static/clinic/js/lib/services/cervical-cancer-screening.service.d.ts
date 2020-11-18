import { ServerApiUrlConfig } from '@lamis/web-core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Observation } from '../model/clinic.model';
export declare class CervicalCancerScreeningService {
    protected http: HttpClient;
    private serverUrl;
    resourceUrl: string;
    observationResourceUrl: string;
    constructor(http: HttpClient, serverUrl: ServerApiUrlConfig);
    find(id: string): Observable<HttpResponse<Observation>>;
    findByUuid(id: string): Observable<HttpResponse<Observation>>;
    delete(id: string): Observable<HttpResponse<Object>>;
    save(data: any): Observable<HttpResponse<Observation>>;
    update(data: any): Observable<HttpResponse<Observation>>;
    getScreeningByPatient(id: number): Observable<HttpResponse<any>>;
}
