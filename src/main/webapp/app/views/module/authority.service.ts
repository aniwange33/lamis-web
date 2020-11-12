import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AuthorityService {
    constructor(private http: HttpClient) {
    }

    roleName(id: string) {
        return this.http.get<string>(`api/authorities/${id}`)
    }
}
