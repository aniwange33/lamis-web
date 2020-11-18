import { HttpClient, HttpResponse } from '@angular/common/http';
import { ServerApiUrlConfig } from '@lamis/web-core';
import { Observable } from 'rxjs';
import { CaseManager } from '../model/case-management.model';
export declare class CaseManagerService {
    protected http: HttpClient;
    private serverUrl;
    resourceUrl: string;
    constructor(http: HttpClient, serverUrl: ServerApiUrlConfig);
    create(caseManager: CaseManager): Observable<HttpResponse<CaseManager>>;
    update(caseManager: CaseManager): Observable<HttpResponse<CaseManager>>;
    find(id: number): Observable<HttpResponse<CaseManager>>;
    findByUuid(id: string): Observable<HttpResponse<CaseManager>>;
    delete(id: number): Observable<HttpResponse<any>>;
    query(req?: any): Observable<HttpResponse<CaseManager[]>>;
}
