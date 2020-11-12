import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Module, ModuleResponse, WebModule} from './module.model';
import {Observable} from 'rxjs';
import {SERVER_API_URL} from 'app/app.constants';

@Injectable({
    providedIn: 'root'
})
export class ModuleService {

    constructor(private http: HttpClient) {
    }

    public uploadModule(form): Observable<HttpResponse<Module>> {
        return this.http.post<Module>(SERVER_API_URL + 'api/modules/upload', form, {'observe': 'response'})
    }

    public getModules(): Observable<HttpResponse<Module[]>> {
        return this.http.get<Module[]>(SERVER_API_URL + 'api/modules', {observe: 'response'});
    }

    public getInstalledModules(): Observable<HttpResponse<Module[]>> {
        return this.http.get<Module[]>(SERVER_API_URL + 'api/modules/installed', {observe: 'response'});
    }

    public getWebModules(moduleId: number): Observable<HttpResponse<WebModule[]>> {
        return this.http.get<WebModule[]>(SERVER_API_URL + `api/modules/${moduleId}/web-modules`, {observe: 'response'});
    }

    public installModule(module: Module) {
        return this.http.post<ModuleResponse>(SERVER_API_URL + 'api/modules/install?install=true', module, {observe: 'response'});
    }

    public updateModule(module: Module) {
        return this.http.post<ModuleResponse>(SERVER_API_URL + 'api/modules/update', module, {observe: 'response'});
    }

    public activateModule(module: Module) {
        return this.http.post<ModuleResponse>(SERVER_API_URL + 'api/modules/activate', module, {observe: 'response'});
    }

    public deactivateModule(module: Module) {
        return this.http.post<ModuleResponse>(SERVER_API_URL + 'api/modules/deactivate', module, {observe: 'response'});
    }

    public deleteModule(module: Module) {
        return this.http.post<ModuleResponse>(SERVER_API_URL + `api/modules/uninstall`, module, {observe: 'response'});
    }

    public getModule(id: number) {
        return this.http.get<Module>(SERVER_API_URL + `api/modules/${id}`, {observe: 'response'});
    }
}
