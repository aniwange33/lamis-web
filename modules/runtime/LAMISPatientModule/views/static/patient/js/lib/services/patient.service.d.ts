import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServerProvider, ServerApiUrlConfig } from '@lamis/web-core';
import { OVC, Patient, StatusHistory } from '../model/patient.model';
import * as moment_ from 'moment';
import { Facility } from '../model/facility.model';
import { ValidationErrors } from '@angular/forms';
import { Summary } from '../components/summary.widget.component';
declare type EntityResponseType = HttpResponse<Patient>;
declare type EntityArrayResponseType = HttpResponse<Patient[]>;
export interface PatientActivity {
    uuid?: string;
    id?: any;
    name?: string;
    icon?: string;
    path?: string;
    editable?: boolean;
    viewable?: boolean;
    deletable?: boolean;
}
export interface PatientTimeline {
    date?: string;
    activities?: PatientActivity[];
}
export interface PatientWidget {
    title: string;
    componentName: string;
    index: number;
    icon?: string;
}
export interface PatientObservation {
    name?: string;
    path?: string;
    icon?: string;
    tooltip?: string;
}
export declare class PatientService {
    protected http: HttpClient;
    private serverUrl;
    private authServerProvider;
    resourceUrl: string;
    resourceSearchUrl: string;
    private ovcResourceUrl;
    constructor(http: HttpClient, serverUrl: ServerApiUrlConfig, authServerProvider: AuthServerProvider);
    create(data: Patient): Observable<EntityResponseType>;
    update(data: Patient): Observable<EntityResponseType>;
    find(id: any): Observable<EntityResponseType>;
    findByUuid(id: any): Observable<EntityResponseType>;
    query(req?: any): Observable<EntityArrayResponseType>;
    delete(id: number): Observable<HttpResponse<any>>;
    getOVCByPatient(id: number): Observable<OVC>;
    widgets(patientId: number): Observable<PatientWidget[]>;
    observations(patientId: number): Observable<PatientObservation[]>;
    activities(patientId: number, detailed: boolean): Observable<PatientTimeline[]>;
    getActiveFacility(): Observable<Facility>;
    getAllFacility(): Observable<Facility[]>;
    getStates(): Observable<any[]>;
    getLgasByState(id: any): Observable<any[]>;
    getStateByLga(id: any): Observable<Object>;
    getFacility(id: any): Observable<Object>;
    existsByHospitalNumber(hospitalNum: string): Observable<ValidationErrors | null>;
    getStatusDatesByPatient(patientId: number): Observable<moment_.Moment[]>;
    getSummaryForPatient(id: number): Observable<Summary[]>;
    saveClientStatus(status: StatusHistory): Observable<HttpResponse<StatusHistory>>;
    updateClientStatus(status: StatusHistory): Observable<HttpResponse<StatusHistory>>;
    findClientStatus(id: any): Observable<HttpResponse<StatusHistory>>;
    currentClientStatus(patientId: string): Observable<string>;
    getStatusName(id: number): Observable<string>;
    private static convertStatusFromClient;
    protected convertDateFromClient(patient: Patient): Patient;
    protected convertDateFromServer(res: EntityResponseType): EntityResponseType;
    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType;
}
export {};
