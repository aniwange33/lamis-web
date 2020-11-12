import {HttpClient} from "@angular/common/http";
import {ServerApiUrlConfig} from "@lamis/web-core";
import {Facility} from "../components/art-summary.component";
import {Observable} from "rxjs";

export declare class ReportService {
    private http;
    private serverUrl;
    resourceUrl: string;

    constructor(http: HttpClient, serverUrl: ServerApiUrlConfig);

    artSummary(reportingPeriod: Date, id: number, today: boolean): Observable<Blob>;

    patientLineList(params: any): Observable<Blob>;

    getRegimenTypes(): Observable<any[]>;

    getStates(): Observable<any[]>;

    getLgasByState(id: any): Observable<any[]>;

    getActiveFacility(): Observable<Facility>;

    listFacilities(): Observable<Facility[]>;

    download(name: string): Observable<Blob>;

    listFiles(): Observable<string[]>;
}
