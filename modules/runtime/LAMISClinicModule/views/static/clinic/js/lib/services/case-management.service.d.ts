import { HttpClient } from '@angular/common/http';
import { ServerApiUrlConfig } from '@lamis/web-core';
import { Facility } from '../model/facility.model';
import { CaseManager, CaseManagerStats, Patient } from '../model/case-management.model';
export declare class CaseManagementService {
    protected http: HttpClient;
    private serverUrl;
    resourceUrl: string;
    constructor(http: HttpClient, serverUrl: ServerApiUrlConfig);
    initClients(facilityId: number): import("rxjs").Observable<Object>;
    getClientList(req: any): import("rxjs").Observable<import("@angular/common/http").HttpResponse<Patient[]>>;
    getCaseManagerStats(caseManagerId: number, facilityId: number): import("rxjs").Observable<CaseManagerStats>;
    getActiveFacility(): import("rxjs").Observable<Facility>;
    getCaseManagers(facilityId: number): import("rxjs").Observable<CaseManager[]>;
    assignToCaseManager(caseManagerId: number, ids: number[]): import("rxjs").Observable<import("@angular/common/http").HttpResponse<Object>>;
    deAssignClients(ids: number[]): import("rxjs").Observable<import("@angular/common/http").HttpResponse<Object>>;
    getStates(): import("rxjs").Observable<any[]>;
    getLgasByState(id: any): import("rxjs").Observable<any[]>;
}
