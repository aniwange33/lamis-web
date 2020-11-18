import * as tslib_1 from "tslib";
import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { createRequestOption, SERVER_API_URL_CONFIG } from '@lamis/web-core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@lamis/web-core";
let CommunityPharmacyService = class CommunityPharmacyService {
    constructor(http, serverUrl) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.resourceUrl = '';
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/community-pharmacies';
    }
    create(caseManager) {
        return this.http
            .post(this.resourceUrl, caseManager, { observe: 'response' });
    }
    update(caseManager) {
        return this.http
            .put(this.resourceUrl, caseManager, { observe: 'response' });
    }
    find(id) {
        return this.http
            .get(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
    delete(id) {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
    query(req) {
        const options = createRequestOption(req);
        return this.http
            .get(this.resourceUrl, { params: options, observe: 'response' });
    }
    getLgasByState(id) {
        return this.http.get(`/api/provinces/state/${id}`);
    }
};
CommunityPharmacyService.ctorParameters = () => [
    { type: HttpClient },
    { type: undefined, decorators: [{ type: Inject, args: [SERVER_API_URL_CONFIG,] }] }
];
CommunityPharmacyService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function CommunityPharmacyService_Factory() { return new CommunityPharmacyService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.SERVER_API_URL_CONFIG)); }, token: CommunityPharmacyService, providedIn: "root" });
CommunityPharmacyService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__param(1, Inject(SERVER_API_URL_CONFIG))
], CommunityPharmacyService);
export { CommunityPharmacyService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbXVuaXR5LXBoYXJtYWN5LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1mYWNpbGl0eS0xLjIuMC8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9jb21tdW5pdHktcGhhcm1hY3kuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNoRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUscUJBQXFCLEVBQXNCLE1BQU0saUJBQWlCLENBQUM7Ozs7QUFPakcsSUFBYSx3QkFBd0IsR0FBckMsTUFBYSx3QkFBd0I7SUFHakMsWUFBc0IsSUFBZ0IsRUFBeUMsU0FBNkI7UUFBdEYsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUF5QyxjQUFTLEdBQVQsU0FBUyxDQUFvQjtRQUZyRyxnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUdwQixJQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQyxjQUFjLEdBQUcsMkJBQTJCLENBQUM7SUFDOUUsQ0FBQztJQUVELE1BQU0sQ0FBQyxXQUE4QjtRQUNqQyxPQUFPLElBQUksQ0FBQyxJQUFJO2FBQ1gsSUFBSSxDQUFvQixJQUFJLENBQUMsV0FBVyxFQUFFLFdBQVcsRUFBRSxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUMsQ0FBQyxDQUFDO0lBQ3ZGLENBQUM7SUFFRCxNQUFNLENBQUMsV0FBOEI7UUFDakMsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNYLEdBQUcsQ0FBb0IsSUFBSSxDQUFDLFdBQVcsRUFBRSxXQUFXLEVBQUUsRUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFDLENBQUMsQ0FBQTtJQUNyRixDQUFDO0lBRUQsSUFBSSxDQUFDLEVBQVU7UUFDWCxPQUFPLElBQUksQ0FBQyxJQUFJO2FBQ1gsR0FBRyxDQUFvQixHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFDLENBQUMsQ0FBQztJQUNwRixDQUFDO0lBRUQsTUFBTSxDQUFDLEVBQVU7UUFDYixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUMsQ0FBQyxDQUFDO0lBQ3JGLENBQUM7SUFFRCxLQUFLLENBQUMsR0FBUztRQUNYLE1BQU0sT0FBTyxHQUFHLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pDLE9BQU8sSUFBSSxDQUFDLElBQUk7YUFDWCxHQUFHLENBQXNCLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUMsQ0FBQyxDQUFDO0lBQzVGLENBQUM7SUFFRCxjQUFjLENBQUMsRUFBRTtRQUNiLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQVEsd0JBQXdCLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDN0QsQ0FBQztDQUNKLENBQUE7O1lBaEMrQixVQUFVOzRDQUFHLE1BQU0sU0FBQyxxQkFBcUI7OztBQUg1RCx3QkFBd0I7SUFIcEMsVUFBVSxDQUFDO1FBQ1IsVUFBVSxFQUFFLE1BQU07S0FDckIsQ0FBQztJQUkyQyxtQkFBQSxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQTtHQUg3RCx3QkFBd0IsQ0FtQ3BDO1NBbkNZLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgY3JlYXRlUmVxdWVzdE9wdGlvbiwgU0VSVkVSX0FQSV9VUkxfQ09ORklHLCBTZXJ2ZXJBcGlVcmxDb25maWcgfSBmcm9tICdAbGFtaXMvd2ViLWNvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ29tbXVuaXR5UGhhcm1hY3kgfSBmcm9tICcuLi9tb2RlbC9jb21tdW5pdHktcGhhcm1hY3kubW9kZWwnO1xuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIENvbW11bml0eVBoYXJtYWN5U2VydmljZSB7XG4gICAgcHVibGljIHJlc291cmNlVXJsID0gJyc7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudCwgQEluamVjdChTRVJWRVJfQVBJX1VSTF9DT05GSUcpIHByaXZhdGUgc2VydmVyVXJsOiBTZXJ2ZXJBcGlVcmxDb25maWcpIHtcbiAgICAgICAgdGhpcy5yZXNvdXJjZVVybCA9IHNlcnZlclVybC5TRVJWRVJfQVBJX1VSTCArICcvYXBpL2NvbW11bml0eS1waGFybWFjaWVzJztcbiAgICB9XG5cbiAgICBjcmVhdGUoY2FzZU1hbmFnZXI6IENvbW11bml0eVBoYXJtYWN5KTogT2JzZXJ2YWJsZTxIdHRwUmVzcG9uc2U8Q29tbXVuaXR5UGhhcm1hY3k+PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgICAgICAgIC5wb3N0PENvbW11bml0eVBoYXJtYWN5Pih0aGlzLnJlc291cmNlVXJsLCBjYXNlTWFuYWdlciwge29ic2VydmU6ICdyZXNwb25zZSd9KTtcbiAgICB9XG5cbiAgICB1cGRhdGUoY2FzZU1hbmFnZXI6IENvbW11bml0eVBoYXJtYWN5KTogT2JzZXJ2YWJsZTxIdHRwUmVzcG9uc2U8Q29tbXVuaXR5UGhhcm1hY3k+PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgICAgICAgIC5wdXQ8Q29tbXVuaXR5UGhhcm1hY3k+KHRoaXMucmVzb3VyY2VVcmwsIGNhc2VNYW5hZ2VyLCB7b2JzZXJ2ZTogJ3Jlc3BvbnNlJ30pXG4gICAgfVxuXG4gICAgZmluZChpZDogbnVtYmVyKTogT2JzZXJ2YWJsZTxIdHRwUmVzcG9uc2U8Q29tbXVuaXR5UGhhcm1hY3k+PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgICAgICAgIC5nZXQ8Q29tbXVuaXR5UGhhcm1hY3k+KGAke3RoaXMucmVzb3VyY2VVcmx9LyR7aWR9YCwge29ic2VydmU6ICdyZXNwb25zZSd9KTtcbiAgICB9XG5cbiAgICBkZWxldGUoaWQ6IG51bWJlcik6IE9ic2VydmFibGU8SHR0cFJlc3BvbnNlPGFueT4+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGU8YW55PihgJHt0aGlzLnJlc291cmNlVXJsfS8ke2lkfWAsIHtvYnNlcnZlOiAncmVzcG9uc2UnfSk7XG4gICAgfVxuXG4gICAgcXVlcnkocmVxPzogYW55KTogT2JzZXJ2YWJsZTxIdHRwUmVzcG9uc2U8Q29tbXVuaXR5UGhhcm1hY3lbXT4+IHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IGNyZWF0ZVJlcXVlc3RPcHRpb24ocmVxKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgICAgICAgLmdldDxDb21tdW5pdHlQaGFybWFjeVtdPih0aGlzLnJlc291cmNlVXJsLCB7cGFyYW1zOiBvcHRpb25zLCBvYnNlcnZlOiAncmVzcG9uc2UnfSk7XG4gICAgfVxuXG4gICAgZ2V0TGdhc0J5U3RhdGUoaWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8YW55W10+KGAvYXBpL3Byb3ZpbmNlcy9zdGF0ZS8ke2lkfWApXG4gICAgfVxufVxuIl19