import * as tslib_1 from "tslib";
import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SERVER_API_URL_CONFIG } from '@lamis/web-core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@lamis/web-core";
var CaseManagementService = /** @class */ (function () {
    function CaseManagementService(http, serverUrl) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.resourceUrl = '';
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/case-management';
    }
    CaseManagementService.prototype.initClients = function (facilityId) {
        return this.http.get(this.resourceUrl + "/init-clients/" + facilityId);
    };
    CaseManagementService.prototype.getClientList = function (req) {
        return this.http.post(this.resourceUrl + "/client-list", req, { observe: 'response' });
    };
    CaseManagementService.prototype.getCaseManagerStats = function (caseManagerId, facilityId) {
        return this.http.get(this.resourceUrl + "/facility/" + facilityId + "/case-manager/" + caseManagerId + "/stats");
    };
    CaseManagementService.prototype.getActiveFacility = function () {
        return this.http.get('/api/facilities/active');
    };
    CaseManagementService.prototype.getCaseManagers = function (facilityId) {
        return this.http.get(this.resourceUrl + "/facility/" + facilityId + "/case-managers");
    };
    CaseManagementService.prototype.assignToCaseManager = function (caseManagerId, ids) {
        var params = new HttpParams();
        ids.forEach(function (id) { return params = params.append('ids', id.toString()); });
        return this.http.get(this.resourceUrl + "/case-manager/" + caseManagerId + "/assign-clients", {
            params: params,
            observe: 'response'
        });
    };
    CaseManagementService.prototype.deAssignClients = function (ids) {
        var params = new HttpParams();
        ids.forEach(function (id) { return params = params.append('ids', id.toString()); });
        return this.http.get(this.resourceUrl + "/de-assign-clients", {
            params: params,
            observe: 'response'
        });
    };
    CaseManagementService.prototype.getStates = function () {
        return this.http.get('/api/states');
    };
    CaseManagementService.prototype.getLgasByState = function (id) {
        return this.http.get("/api/provinces/state/" + id);
    };
    CaseManagementService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: undefined, decorators: [{ type: Inject, args: [SERVER_API_URL_CONFIG,] }] }
    ]; };
    CaseManagementService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function CaseManagementService_Factory() { return new CaseManagementService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.SERVER_API_URL_CONFIG)); }, token: CaseManagementService, providedIn: "root" });
    CaseManagementService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__param(1, Inject(SERVER_API_URL_CONFIG)),
        tslib_1.__metadata("design:paramtypes", [HttpClient, Object])
    ], CaseManagementService);
    return CaseManagementService;
}());
export { CaseManagementService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1tYW5hZ2VtZW50LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1jbGluaWMtMS40LjAvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvY2FzZS1tYW5hZ2VtZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBQyxVQUFVLEVBQUUsVUFBVSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDNUQsT0FBTyxFQUFDLHFCQUFxQixFQUFxQixNQUFNLGlCQUFpQixDQUFDOzs7O0FBTzFFO0lBR0ksK0JBQXNCLElBQWdCLEVBQXlDLFNBQTZCO1FBQXRGLFNBQUksR0FBSixJQUFJLENBQVk7UUFBeUMsY0FBUyxHQUFULFNBQVMsQ0FBb0I7UUFGckcsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFHcEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUMsY0FBYyxHQUFHLHNCQUFzQixDQUFDO0lBQ3pFLENBQUM7SUFFRCwyQ0FBVyxHQUFYLFVBQVksVUFBa0I7UUFDMUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBSSxJQUFJLENBQUMsV0FBVyxzQkFBaUIsVUFBWSxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUVELDZDQUFhLEdBQWIsVUFBYyxHQUFRO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQWUsSUFBSSxDQUFDLFdBQVcsaUJBQWMsRUFBRSxHQUFHLEVBQUUsRUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFDLENBQUMsQ0FBQztJQUNwRyxDQUFDO0lBRUQsbURBQW1CLEdBQW5CLFVBQW9CLGFBQXFCLEVBQUUsVUFBa0I7UUFDekQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBc0IsSUFBSSxDQUFDLFdBQVcsa0JBQWEsVUFBVSxzQkFBaUIsYUFBYSxXQUFRLENBQUMsQ0FBQztJQUM3SCxDQUFDO0lBRUQsaURBQWlCLEdBQWpCO1FBQ0ksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBVyx3QkFBd0IsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCwrQ0FBZSxHQUFmLFVBQWdCLFVBQWtCO1FBQzlCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQW1CLElBQUksQ0FBQyxXQUFXLGtCQUFhLFVBQVUsbUJBQWdCLENBQUMsQ0FBQztJQUNwRyxDQUFDO0lBRUQsbURBQW1CLEdBQW5CLFVBQW9CLGFBQXFCLEVBQUUsR0FBYTtRQUNwRCxJQUFJLE1BQU0sR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO1FBQzlCLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBQSxFQUFFLElBQUksT0FBQSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQTVDLENBQTRDLENBQUMsQ0FBQztRQUNoRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFJLElBQUksQ0FBQyxXQUFXLHNCQUFpQixhQUFhLG9CQUFpQixFQUFFO1lBQ3JGLE1BQU0sUUFBQTtZQUNOLE9BQU8sRUFBRSxVQUFVO1NBQ3RCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCwrQ0FBZSxHQUFmLFVBQWdCLEdBQWE7UUFDekIsSUFBSSxNQUFNLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztRQUM5QixHQUFHLENBQUMsT0FBTyxDQUFDLFVBQUEsRUFBRSxJQUFJLE9BQUEsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUE1QyxDQUE0QyxDQUFDLENBQUM7UUFDaEUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBSSxJQUFJLENBQUMsV0FBVyx1QkFBb0IsRUFBRTtZQUMxRCxNQUFNLFFBQUE7WUFDTixPQUFPLEVBQUUsVUFBVTtTQUN0QixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQseUNBQVMsR0FBVDtRQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQVEsYUFBYSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVELDhDQUFjLEdBQWQsVUFBZSxFQUFFO1FBQ2IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBUSwwQkFBd0IsRUFBSSxDQUFDLENBQUM7SUFDOUQsQ0FBQzs7Z0JBaEQyQixVQUFVO2dEQUFHLE1BQU0sU0FBQyxxQkFBcUI7OztJQUg1RCxxQkFBcUI7UUFIakMsVUFBVSxDQUFDO1lBQ1IsVUFBVSxFQUFFLE1BQU07U0FDckIsQ0FBQztRQUkyQyxtQkFBQSxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQTtpREFBMUMsVUFBVTtPQUg3QixxQkFBcUIsQ0FvRGpDO2dDQTdERDtDQTZEQyxBQXBERCxJQW9EQztTQXBEWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0h0dHBDbGllbnQsIEh0dHBQYXJhbXN9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7U0VSVkVSX0FQSV9VUkxfQ09ORklHLCBTZXJ2ZXJBcGlVcmxDb25maWd9IGZyb20gJ0BsYW1pcy93ZWItY29yZSc7XG5pbXBvcnQge0ZhY2lsaXR5fSBmcm9tICcuLi9tb2RlbC9mYWNpbGl0eS5tb2RlbCc7XG5pbXBvcnQge0Nhc2VNYW5hZ2VyLCBDYXNlTWFuYWdlclN0YXRzLCBQYXRpZW50fSBmcm9tICcuLi9tb2RlbC9jYXNlLW1hbmFnZW1lbnQubW9kZWwnO1xuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIENhc2VNYW5hZ2VtZW50U2VydmljZSB7XG4gICAgcHVibGljIHJlc291cmNlVXJsID0gJyc7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudCwgQEluamVjdChTRVJWRVJfQVBJX1VSTF9DT05GSUcpIHByaXZhdGUgc2VydmVyVXJsOiBTZXJ2ZXJBcGlVcmxDb25maWcpIHtcbiAgICAgICAgdGhpcy5yZXNvdXJjZVVybCA9IHNlcnZlclVybC5TRVJWRVJfQVBJX1VSTCArICcvYXBpL2Nhc2UtbWFuYWdlbWVudCc7XG4gICAgfVxuXG4gICAgaW5pdENsaWVudHMoZmFjaWxpdHlJZDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGAke3RoaXMucmVzb3VyY2VVcmx9L2luaXQtY2xpZW50cy8ke2ZhY2lsaXR5SWR9YCk7XG4gICAgfVxuXG4gICAgZ2V0Q2xpZW50TGlzdChyZXE6IGFueSkge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Q8UGF0aWVudFtdPihgJHt0aGlzLnJlc291cmNlVXJsfS9jbGllbnQtbGlzdGAsIHJlcSwge29ic2VydmU6ICdyZXNwb25zZSd9KTtcbiAgICB9XG5cbiAgICBnZXRDYXNlTWFuYWdlclN0YXRzKGNhc2VNYW5hZ2VySWQ6IG51bWJlciwgZmFjaWxpdHlJZDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PENhc2VNYW5hZ2VyU3RhdHM+KGAke3RoaXMucmVzb3VyY2VVcmx9L2ZhY2lsaXR5LyR7ZmFjaWxpdHlJZH0vY2FzZS1tYW5hZ2VyLyR7Y2FzZU1hbmFnZXJJZH0vc3RhdHNgKTtcbiAgICB9XG5cbiAgICBnZXRBY3RpdmVGYWNpbGl0eSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8RmFjaWxpdHk+KCcvYXBpL2ZhY2lsaXRpZXMvYWN0aXZlJyk7XG4gICAgfVxuXG4gICAgZ2V0Q2FzZU1hbmFnZXJzKGZhY2lsaXR5SWQ6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxDYXNlTWFuYWdlcltdPihgJHt0aGlzLnJlc291cmNlVXJsfS9mYWNpbGl0eS8ke2ZhY2lsaXR5SWR9L2Nhc2UtbWFuYWdlcnNgKTtcbiAgICB9XG5cbiAgICBhc3NpZ25Ub0Nhc2VNYW5hZ2VyKGNhc2VNYW5hZ2VySWQ6IG51bWJlciwgaWRzOiBudW1iZXJbXSkge1xuICAgICAgICBsZXQgcGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKTtcbiAgICAgICAgaWRzLmZvckVhY2goaWQgPT4gcGFyYW1zID0gcGFyYW1zLmFwcGVuZCgnaWRzJywgaWQudG9TdHJpbmcoKSkpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChgJHt0aGlzLnJlc291cmNlVXJsfS9jYXNlLW1hbmFnZXIvJHtjYXNlTWFuYWdlcklkfS9hc3NpZ24tY2xpZW50c2AsIHtcbiAgICAgICAgICAgIHBhcmFtcyxcbiAgICAgICAgICAgIG9ic2VydmU6ICdyZXNwb25zZSdcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGVBc3NpZ25DbGllbnRzKGlkczogbnVtYmVyW10pIHtcbiAgICAgICAgbGV0IHBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKCk7XG4gICAgICAgIGlkcy5mb3JFYWNoKGlkID0+IHBhcmFtcyA9IHBhcmFtcy5hcHBlbmQoJ2lkcycsIGlkLnRvU3RyaW5nKCkpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYCR7dGhpcy5yZXNvdXJjZVVybH0vZGUtYXNzaWduLWNsaWVudHNgLCB7XG4gICAgICAgICAgICBwYXJhbXMsXG4gICAgICAgICAgICBvYnNlcnZlOiAncmVzcG9uc2UnXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldFN0YXRlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8YW55W10+KCcvYXBpL3N0YXRlcycpO1xuICAgIH1cblxuICAgIGdldExnYXNCeVN0YXRlKGlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PGFueVtdPihgL2FwaS9wcm92aW5jZXMvc3RhdGUvJHtpZH1gKTtcbiAgICB9XG59XG4iXX0=