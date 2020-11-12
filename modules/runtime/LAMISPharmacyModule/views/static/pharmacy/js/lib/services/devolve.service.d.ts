import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ServerApiUrlConfig} from '@lamis/web-core';
import * as moment_ from 'moment';
import {Moment} from 'moment';
import {
    CommunityPharmacy,
    Devolve,
    RelatedCD4,
    RelatedClinic,
    RelatedPharmacy,
    RelatedViralLoad
} from '../model/pharmacy.model';

declare type EntityResponseType = HttpResponse<Devolve>;

export declare class DevolveService {
    protected http: HttpClient;
    private serverUrl;
    resourceUrl: string;

    constructor(http: HttpClient, serverUrl: ServerApiUrlConfig);

    create(devolve: Devolve): Observable<EntityResponseType>;

    update(devolve: Devolve): Observable<EntityResponseType>;

    find(id: number): Observable<EntityResponseType>;

    findByUuid(id: string): Observable<EntityResponseType>;

    delete(id: number): Observable<HttpResponse<any>>;

    getDevolveDatesByPatient(patientId: number): Observable<moment_.Moment[]>;

    getStates(): Observable<any[]>;

    getLgasByState(id: any): Observable<any[]>;

    getCommunityPharmaciesByLga(id: any): Observable<CommunityPharmacy[]>;

    getRelatedPharmacy(devolveId: number, patientId: number, date: Moment): Observable<RelatedPharmacy>;

    getRelatedClinic(devolveId: number, patientId: number, date: Moment): Observable<RelatedClinic>;

    getRelatedViralLoad(devolveId: number, patientId: number, date: Moment): Observable<RelatedViralLoad>;

    getRelatedCD4(devolveId: number, patientId: number, date: Moment): Observable<RelatedCD4>;

    getStateByLga(id: any): Observable<Object>;

    protected convertDateFromClient(devolve: Devolve): Devolve;

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType;
}

export {};
