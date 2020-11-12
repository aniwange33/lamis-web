import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {SERVER_API_URL} from 'app/app.constants';

@Injectable()
export class ElasticsearchReindexService {
    private resourceUrl = SERVER_API_URL + 'api/elasticsearch/index';

    constructor(
        private http: HttpClient
    ) {
    }

    reindex(): Observable<any> {
        return this.http.post(`${this.resourceUrl}`, {});
    }
}
