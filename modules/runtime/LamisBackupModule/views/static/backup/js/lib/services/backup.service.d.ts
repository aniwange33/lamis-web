import {HttpClient, HttpResponse} from "@angular/common/http";
import {ServerApiUrlConfig} from "@lamis/web-core";
import {Observable} from "rxjs";

export declare class BackupService {
    private http;
    private serverUrl;
    resourceUrl: string;

    constructor(http: HttpClient, serverUrl: ServerApiUrlConfig);

    uploadFile(form: any): Observable<HttpResponse<any>>;

    download(): Observable<Blob>;

    restore(): Observable<string[]>;

    revert(): Observable<string[]>;

    backupAvailable(): Observable<boolean>;

    backup(): Observable<Object>;
}
