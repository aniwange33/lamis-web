import {HttpClient} from '@angular/common/http';
import {ServerApiUrlConfig} from '@lamis/web-core';

export declare class ObservationService {
    private http;
    private serverUrl;
    resourceUrl: string;

    constructor(http: HttpClient, serverUrl: ServerApiUrlConfig);

    deleteObservation(path: string, id: string): import("rxjs").Observable<import("@angular/common/http").HttpResponse<Object>>;

    getObservation(path: string, id: string): import("rxjs").Observable<import("@angular/common/http").HttpResponse<any>>;
}
