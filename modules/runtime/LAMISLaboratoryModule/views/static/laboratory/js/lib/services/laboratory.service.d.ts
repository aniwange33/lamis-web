import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ServerApiUrlConfig} from '@lamis/web-core';
import {Laboratory, LaboratoryLine, LabTest, LabTestCategory, Patient} from '../model/laboratory.model';
import * as moment_ from 'moment';

declare type EntityResponseType = HttpResponse<Laboratory>;
declare type EntityArrayResponseType = HttpResponse<Laboratory[]>;

export declare class LaboratoryService {
    protected http: HttpClient;
    private serverUrl;
    resourceUrl: string;

    constructor(http: HttpClient, serverUrl: ServerApiUrlConfig);

    create(laboratory: Laboratory): Observable<EntityResponseType>;

    update(laboratory: Laboratory): Observable<EntityResponseType>;

    find(id: number): Observable<EntityResponseType>;

    findByUuid(id: string): Observable<EntityResponseType>;

    delete(id: number): Observable<HttpResponse<any>>;

    getPatient(id: any): Observable<Patient>;

    getVisitDatesByPatient(patientId: number): Observable<moment_.Moment[]>;

    laboratoryCategories(): Observable<LabTestCategory[]>;

    getLinesByLaboratory(laboratoryId: number): Observable<LaboratoryLine[]>;

    labTestsByCategory(id: number): Observable<LabTest[]>;

    getLabTestById(id: any): Observable<LabTest>;

    latestVisit(patientId: number): Observable<Laboratory>;

    protected convertDateFromClient(laboratory: Laboratory): Laboratory;

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType;

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType;
}

export {};
