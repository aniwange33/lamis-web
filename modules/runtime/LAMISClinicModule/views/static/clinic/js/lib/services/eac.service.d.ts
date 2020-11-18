import { HttpClient, HttpResponse } from '@angular/common/http';
import { ServerApiUrlConfig } from '@lamis/web-core';
import { EAC } from '../model/clinic.model';
import { Observable } from 'rxjs';
import { Moment } from 'moment';
export declare class EacService {
    protected http: HttpClient;
    private serverUrl;
    resourceUrl: string;
    constructor(http: HttpClient, serverUrl: ServerApiUrlConfig);
    create(eac: EAC): Observable<HttpResponse<EAC>>;
    update(eac: EAC): Observable<HttpResponse<EAC>>;
    find(id: number): Observable<HttpResponse<EAC>>;
    findByUuid(id: string): Observable<HttpResponse<EAC>>;
    delete(id: number): Observable<HttpResponse<any>>;
    getLatestByPatient(uuid: string): Observable<HttpResponse<EAC>>;
    getLatestViralLoadByPatient(id: number, at: Moment): Observable<HttpResponse<any>>;
    protected convertDateFromClient(eac: EAC): EAC;
    protected convertDateFromServer(res: HttpResponse<EAC>): HttpResponse<EAC>;
}
