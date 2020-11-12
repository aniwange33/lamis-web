import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {EntityAuditEvent} from './entity-audit-event.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {SERVER_API_URL} from 'app/app.constants';

@Injectable()
export class EntityAuditService {
    private resourceUrl = SERVER_API_URL + 'api/audits';

    constructor(private http: HttpClient) {
    }

    getAllAudited(): Observable<string[]> {
        return this.http.get<any>(`${this.resourceUrl}/entity/all`, {observe: 'body'});
    }

    findByEntity(entity: string, limit: number): Observable<EntityAuditEvent[]> {
        const params = new HttpParams()
            .set('entityType', entity)
            .set('limit', limit.toString());

        return this.http.get<EntityAuditEvent[]>(`${this.resourceUrl}/entity/changes`, {
            params: params,
            observe: 'body'
        });
    }

    getPrevVersion(qualifiedName: string, entityId: any, commitVersion: number) {

        const params = new HttpParams()
            .set('qualifiedName', qualifiedName)
            .set('entityId', entityId)
            .set('commitVersion', commitVersion.toString());

        return this.http
            .get(`${this.resourceUrl}/entity/changes/version/previous`, {params: params, observe: 'body'});
    }
}
