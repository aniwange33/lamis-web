import { HttpClient } from "@angular/common/http";
import { ServerApiUrlConfig } from "@lamis/web-core";
import { Facility } from "../components/ndr-converter.component";
import { Observable } from "rxjs";
export declare class NdrConverterService {
    private http;
    private serverUrl;
    resourceUrl: string;
    constructor(http: HttpClient, serverUrl: ServerApiUrlConfig);
    convert(ids: number[]): Observable<Object>;
    listFacilities(): Observable<Facility[]>;
    download(name: string): Observable<Blob>;
    listFiles(): Observable<string[]>;
    deduplicate(): Observable<Object>;
}
