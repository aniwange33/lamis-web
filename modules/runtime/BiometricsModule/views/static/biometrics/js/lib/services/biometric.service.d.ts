import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthServerProvider, ServerApiUrlConfig} from '@lamis/web-core';
import {Biometric, Patient} from '../model/biometric.model';

declare type EntityResponseType = HttpResponse<Biometric>;
declare type EntityArrayResponseType = HttpResponse<Biometric[]>;

export declare class BiometricService {
    protected http: HttpClient;
    private serverUrl;
    private authServerProvider;
    resourceUrl: string;
    proxyUrl: string;

    constructor(http: HttpClient, serverUrl: ServerApiUrlConfig, authServerProvider: AuthServerProvider);

    saveTemplates(biometrics: Biometric[]): Observable<HttpResponse<Object>>;

    getBiometric(id: string): Observable<Biometric>;

    getPatient(id: any): Observable<Patient>;

    getReaders(): any;

    findByPatient(id: number): Observable<EntityArrayResponseType>;

    delete(id: number): Observable<HttpResponse<any>>;

    identify(reader: string): any;

    protected convertDateFromClient(biometric: Biometric): Biometric;

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType;

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType;

    getObservableFromFetch(url: any, opts?: any): Observable<{}>;
}

export {};
