import {HttpClient} from '@angular/common/http';
import {ServerApiUrlConfig} from '@lamis/web-core';
import {Module} from '../model/module.model';

export declare class ModuleUpdateService {
    protected http: HttpClient;
    private serverUrl;
    resourceUrl: string;

    constructor(http: HttpClient, serverUrl: ServerApiUrlConfig);

    installUpdates(): import("rxjs").Observable<Module[]>;

    availableUpdates(): import("rxjs").Observable<Module[]>;
}
