import { HttpClient, HttpResponse } from '@angular/common/http';
import { ServerApiUrlConfig } from '@lamis/web-core';
import { ChronicCare } from '../model/clinic.model';
import { Observable } from 'rxjs';
import * as moment_ from 'moment';
export declare class ChronicCareService {
    protected http: HttpClient;
    private serverUrl;
    resourceUrl: string;
    constructor(http: HttpClient, serverUrl: ServerApiUrlConfig);
    create(chronicCare: ChronicCare): Observable<HttpResponse<ChronicCare>>;
    update(chronicCare: ChronicCare): Observable<HttpResponse<ChronicCare>>;
    find(id: number): Observable<HttpResponse<ChronicCare>>;
    findByUuid(id: string): Observable<HttpResponse<ChronicCare>>;
    delete(id: number): Observable<HttpResponse<any>>;
    getDmScreens(): Observable<Object>;
    getTbScreens(): Observable<Object>;
    getDmScreenByChronicCare(id: number): Observable<Object>;
    getTbScreenByChronicCare(id: number): Observable<Object>;
    getVisitDatesByPatient(patientId: number): Observable<moment_.Moment[]>;
    protected convertDateFromServer(res: HttpResponse<ChronicCare>): HttpResponse<ChronicCare>;
    protected convertDateFromClient(chronicCare: ChronicCare): ChronicCare;
}
