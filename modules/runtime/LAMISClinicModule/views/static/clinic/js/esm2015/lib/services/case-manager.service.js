import * as tslib_1 from "tslib";
import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {createRequestOption, SERVER_API_URL_CONFIG} from '@lamis/web-core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@lamis/web-core";

let CaseManagerService = class CaseManagerService {
    constructor(http, serverUrl) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.resourceUrl = '';
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/case-managers';
    }

    create(caseManager) {
        return this.http
            .post(this.resourceUrl, caseManager, {observe: 'response'});
    }

    update(caseManager) {
        return this.http
            .put(this.resourceUrl, caseManager, {observe: 'response'});
    }

    find(id) {
        return this.http
            .get(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    findByUuid(id) {
        return this.http
            .get(`${this.resourceUrl}/by-uuid/${id}`, {observe: 'response'});
    }

    delete(id) {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    query(req) {
        const options = createRequestOption(req);
        return this.http
            .get(this.resourceUrl, {params: options, observe: 'response'});
    }
};
CaseManagerService.ctorParameters = () => [
    {type: HttpClient},
    {type: undefined, decorators: [{type: Inject, args: [SERVER_API_URL_CONFIG,]}]}
];
CaseManagerService.ngInjectableDef = i0.ɵɵdefineInjectable({
    factory: function CaseManagerService_Factory() {
        return new CaseManagerService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.SERVER_API_URL_CONFIG));
    }, token: CaseManagerService, providedIn: "root"
});
CaseManagerService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__param(1, Inject(SERVER_API_URL_CONFIG)),
    tslib_1.__metadata("design:paramtypes", [HttpClient, Object])
], CaseManagerService);
export {CaseManagerService};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1tYW5hZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1jbGluaWMtMS4xLjMvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvY2FzZS1tYW5hZ2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDaEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLHFCQUFxQixFQUFzQixNQUFNLGlCQUFpQixDQUFDOzs7O0FBT2pHLElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQWtCO0lBRzNCLFlBQXNCLElBQWdCLEVBQXlDLFNBQTZCO1FBQXRGLFNBQUksR0FBSixJQUFJLENBQVk7UUFBeUMsY0FBUyxHQUFULFNBQVMsQ0FBb0I7UUFGckcsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFHcEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUMsY0FBYyxHQUFHLG9CQUFvQixDQUFDO0lBQ3ZFLENBQUM7SUFFRCxNQUFNLENBQUMsV0FBd0I7UUFDM0IsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNYLElBQUksQ0FBYyxJQUFJLENBQUMsV0FBVyxFQUFFLFdBQVcsRUFBRSxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUMsQ0FBQyxDQUFDO0lBQ2pGLENBQUM7SUFFRCxNQUFNLENBQUMsV0FBd0I7UUFDM0IsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNYLEdBQUcsQ0FBYyxJQUFJLENBQUMsV0FBVyxFQUFFLFdBQVcsRUFBRSxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUMsQ0FBQyxDQUFBO0lBQy9FLENBQUM7SUFFRCxJQUFJLENBQUMsRUFBVTtRQUNYLE9BQU8sSUFBSSxDQUFDLElBQUk7YUFDWCxHQUFHLENBQWMsR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBQyxDQUFDLENBQUM7SUFDOUUsQ0FBQztJQUVELFVBQVUsQ0FBQyxFQUFVO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLElBQUk7YUFDWCxHQUFHLENBQWMsR0FBRyxJQUFJLENBQUMsV0FBVyxZQUFZLEVBQUUsRUFBRSxFQUFFLEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBQyxDQUFDLENBQUM7SUFDdEYsQ0FBQztJQUVELE1BQU0sQ0FBQyxFQUFVO1FBQ2IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBTSxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFDLENBQUMsQ0FBQztJQUNyRixDQUFDO0lBRUQsS0FBSyxDQUFDLEdBQVM7UUFDWCxNQUFNLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6QyxPQUFPLElBQUksQ0FBQyxJQUFJO2FBQ1gsR0FBRyxDQUFnQixJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFDLENBQUMsQ0FBQztJQUN0RixDQUFDO0NBQ0osQ0FBQTs7WUFqQytCLFVBQVU7NENBQUcsTUFBTSxTQUFDLHFCQUFxQjs7O0FBSDVELGtCQUFrQjtJQUg5QixVQUFVLENBQUM7UUFDUixVQUFVLEVBQUUsTUFBTTtLQUNyQixDQUFDO0lBSTJDLG1CQUFBLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBOzZDQUExQyxVQUFVO0dBSDdCLGtCQUFrQixDQW9DOUI7U0FwQ1ksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBjcmVhdGVSZXF1ZXN0T3B0aW9uLCBTRVJWRVJfQVBJX1VSTF9DT05GSUcsIFNlcnZlckFwaVVybENvbmZpZyB9IGZyb20gJ0BsYW1pcy93ZWItY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDYXNlTWFuYWdlciB9IGZyb20gJy4uL21vZGVsL2Nhc2UtbWFuYWdlbWVudC5tb2RlbCc7XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQ2FzZU1hbmFnZXJTZXJ2aWNlIHtcbiAgICBwdWJsaWMgcmVzb3VyY2VVcmwgPSAnJztcblxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBodHRwOiBIdHRwQ2xpZW50LCBASW5qZWN0KFNFUlZFUl9BUElfVVJMX0NPTkZJRykgcHJpdmF0ZSBzZXJ2ZXJVcmw6IFNlcnZlckFwaVVybENvbmZpZykge1xuICAgICAgICB0aGlzLnJlc291cmNlVXJsID0gc2VydmVyVXJsLlNFUlZFUl9BUElfVVJMICsgJy9hcGkvY2FzZS1tYW5hZ2Vycyc7XG4gICAgfVxuXG4gICAgY3JlYXRlKGNhc2VNYW5hZ2VyOiBDYXNlTWFuYWdlcik6IE9ic2VydmFibGU8SHR0cFJlc3BvbnNlPENhc2VNYW5hZ2VyPj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAgICAgICAucG9zdDxDYXNlTWFuYWdlcj4odGhpcy5yZXNvdXJjZVVybCwgY2FzZU1hbmFnZXIsIHtvYnNlcnZlOiAncmVzcG9uc2UnfSk7XG4gICAgfVxuXG4gICAgdXBkYXRlKGNhc2VNYW5hZ2VyOiBDYXNlTWFuYWdlcik6IE9ic2VydmFibGU8SHR0cFJlc3BvbnNlPENhc2VNYW5hZ2VyPj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAgICAgICAucHV0PENhc2VNYW5hZ2VyPih0aGlzLnJlc291cmNlVXJsLCBjYXNlTWFuYWdlciwge29ic2VydmU6ICdyZXNwb25zZSd9KVxuICAgIH1cblxuICAgIGZpbmQoaWQ6IG51bWJlcik6IE9ic2VydmFibGU8SHR0cFJlc3BvbnNlPENhc2VNYW5hZ2VyPj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAgICAgICAuZ2V0PENhc2VNYW5hZ2VyPihgJHt0aGlzLnJlc291cmNlVXJsfS8ke2lkfWAsIHtvYnNlcnZlOiAncmVzcG9uc2UnfSk7XG4gICAgfVxuXG4gICAgZmluZEJ5VXVpZChpZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxIdHRwUmVzcG9uc2U8Q2FzZU1hbmFnZXI+PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgICAgICAgIC5nZXQ8Q2FzZU1hbmFnZXI+KGAke3RoaXMucmVzb3VyY2VVcmx9L2J5LXV1aWQvJHtpZH1gLCB7b2JzZXJ2ZTogJ3Jlc3BvbnNlJ30pO1xuICAgIH1cblxuICAgIGRlbGV0ZShpZDogbnVtYmVyKTogT2JzZXJ2YWJsZTxIdHRwUmVzcG9uc2U8YW55Pj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZTxhbnk+KGAke3RoaXMucmVzb3VyY2VVcmx9LyR7aWR9YCwge29ic2VydmU6ICdyZXNwb25zZSd9KTtcbiAgICB9XG5cbiAgICBxdWVyeShyZXE/OiBhbnkpOiBPYnNlcnZhYmxlPEh0dHBSZXNwb25zZTxDYXNlTWFuYWdlcltdPj4ge1xuICAgICAgICBjb25zdCBvcHRpb25zID0gY3JlYXRlUmVxdWVzdE9wdGlvbihyZXEpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAgICAgICAuZ2V0PENhc2VNYW5hZ2VyW10+KHRoaXMucmVzb3VyY2VVcmwsIHtwYXJhbXM6IG9wdGlvbnMsIG9ic2VydmU6ICdyZXNwb25zZSd9KTtcbiAgICB9XG59XG4iXX0=
