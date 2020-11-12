import * as tslib_1 from "tslib";
import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {SERVER_API_URL_CONFIG} from '@lamis/web-core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@lamis/web-core";

let CaseManagementService = class CaseManagementService {
    constructor(http, serverUrl) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.resourceUrl = '';
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/case-management';
    }

    initClients(facilityId) {
        return this.http.get(`${this.resourceUrl}/init-clients/${facilityId}`);
    }

    getClientList(req) {
        return this.http.post(`${this.resourceUrl}/client-list`, req, {observe: 'response'});
    }

    getCaseManagerStats(caseManagerId, facilityId) {
        return this.http.get(`${this.resourceUrl}/facility/${facilityId}/case-manager/${caseManagerId}/stats`);
    }

    getActiveFacility() {
        return this.http.get('/api/facilities/active');
    }

    getCaseManagers(facilityId) {
        return this.http.get(`${this.resourceUrl}/facility/${facilityId}/case-managers`);
    }

    assignToCaseManager(caseManagerId, ids) {
        let params = new HttpParams();
        ids.forEach(id => params = params.append("ids", id.toString()));
        return this.http.get(`${this.resourceUrl}/case-manager/${caseManagerId}/assign-clients`, {
            params,
            observe: 'response'
        });
    }

    deAssignClients(ids) {
        let params = new HttpParams();
        ids.forEach(id => params = params.append("ids", id.toString()));
        return this.http.get(`${this.resourceUrl}/de-assign-clients`, {
            params,
            observe: 'response'
        });
    }

    getStates() {
        return this.http.get('/api/states');
    }

    getLgasByState(id) {
        return this.http.get(`/api/provinces/state/${id}`);
    }
};
CaseManagementService.ctorParameters = () => [
    {type: HttpClient},
    {type: undefined, decorators: [{type: Inject, args: [SERVER_API_URL_CONFIG,]}]}
];
CaseManagementService.ngInjectableDef = i0.ɵɵdefineInjectable({
    factory: function CaseManagementService_Factory() {
        return new CaseManagementService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.SERVER_API_URL_CONFIG));
    }, token: CaseManagementService, providedIn: "root"
});
CaseManagementService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__param(1, Inject(SERVER_API_URL_CONFIG)),
    tslib_1.__metadata("design:paramtypes", [HttpClient, Object])
], CaseManagementService);
export {CaseManagementService};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1tYW5hZ2VtZW50LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1jbGluaWMtMS4xLjMvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvY2FzZS1tYW5hZ2VtZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDOUQsT0FBTyxFQUFFLHFCQUFxQixFQUFzQixNQUFNLGlCQUFpQixDQUFDOzs7O0FBTzVFLElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXFCO0lBRzlCLFlBQXNCLElBQWdCLEVBQXlDLFNBQTZCO1FBQXRGLFNBQUksR0FBSixJQUFJLENBQVk7UUFBeUMsY0FBUyxHQUFULFNBQVMsQ0FBb0I7UUFGckcsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFHcEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUMsY0FBYyxHQUFHLHNCQUFzQixDQUFDO0lBQ3pFLENBQUM7SUFFRCxXQUFXLENBQUMsVUFBa0I7UUFDMUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLGlCQUFpQixVQUFVLEVBQUUsQ0FBQyxDQUFBO0lBQzFFLENBQUM7SUFFRCxhQUFhLENBQUMsR0FBUTtRQUNsQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFZLEdBQUcsSUFBSSxDQUFDLFdBQVcsY0FBYyxFQUFFLEdBQUcsRUFBRSxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUMsQ0FBQyxDQUFBO0lBQ25HLENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxhQUFxQixFQUFFLFVBQWtCO1FBQ3pELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQW1CLEdBQUcsSUFBSSxDQUFDLFdBQVcsYUFBYSxVQUFVLGlCQUFpQixhQUFhLFFBQVEsQ0FBQyxDQUFBO0lBQzVILENBQUM7SUFFRCxpQkFBaUI7UUFDYixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFXLHdCQUF3QixDQUFDLENBQUE7SUFDNUQsQ0FBQztJQUVELGVBQWUsQ0FBQyxVQUFrQjtRQUM5QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFnQixHQUFHLElBQUksQ0FBQyxXQUFXLGFBQWEsVUFBVSxnQkFBZ0IsQ0FBQyxDQUFBO0lBQ25HLENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxhQUFxQixFQUFFLEdBQWE7UUFDcEQsSUFBSSxNQUFNLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztRQUM5QixHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDaEUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLGlCQUFpQixhQUFhLGlCQUFpQixFQUFFO1lBQ3JGLE1BQU07WUFDTixPQUFPLEVBQUUsVUFBVTtTQUN0QixDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQsZUFBZSxDQUFDLEdBQWE7UUFDekIsSUFBSSxNQUFNLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztRQUM5QixHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDaEUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLG9CQUFvQixFQUFFO1lBQzFELE1BQU07WUFDTixPQUFPLEVBQUUsVUFBVTtTQUN0QixDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQsU0FBUztRQUNMLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQVEsYUFBYSxDQUFDLENBQUE7SUFDOUMsQ0FBQztJQUVELGNBQWMsQ0FBQyxFQUFFO1FBQ2IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBUSx3QkFBd0IsRUFBRSxFQUFFLENBQUMsQ0FBQTtJQUM3RCxDQUFDO0NBQ0osQ0FBQTs7WUFqRCtCLFVBQVU7NENBQUcsTUFBTSxTQUFDLHFCQUFxQjs7O0FBSDVELHFCQUFxQjtJQUhqQyxVQUFVLENBQUM7UUFDUixVQUFVLEVBQUUsTUFBTTtLQUNyQixDQUFDO0lBSTJDLG1CQUFBLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBOzZDQUExQyxVQUFVO0dBSDdCLHFCQUFxQixDQW9EakM7U0FwRFkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgU0VSVkVSX0FQSV9VUkxfQ09ORklHLCBTZXJ2ZXJBcGlVcmxDb25maWcgfSBmcm9tICdAbGFtaXMvd2ViLWNvcmUnO1xuaW1wb3J0IHsgRmFjaWxpdHkgfSBmcm9tICcuLi9tb2RlbC9mYWNpbGl0eS5tb2RlbCc7XG5pbXBvcnQgeyBDYXNlTWFuYWdlciwgQ2FzZU1hbmFnZXJTdGF0cywgUGF0aWVudCB9IGZyb20gJy4uL21vZGVsL2Nhc2UtbWFuYWdlbWVudC5tb2RlbCc7XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQ2FzZU1hbmFnZW1lbnRTZXJ2aWNlIHtcbiAgICBwdWJsaWMgcmVzb3VyY2VVcmwgPSAnJztcblxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBodHRwOiBIdHRwQ2xpZW50LCBASW5qZWN0KFNFUlZFUl9BUElfVVJMX0NPTkZJRykgcHJpdmF0ZSBzZXJ2ZXJVcmw6IFNlcnZlckFwaVVybENvbmZpZykge1xuICAgICAgICB0aGlzLnJlc291cmNlVXJsID0gc2VydmVyVXJsLlNFUlZFUl9BUElfVVJMICsgJy9hcGkvY2FzZS1tYW5hZ2VtZW50JztcbiAgICB9XG5cbiAgICBpbml0Q2xpZW50cyhmYWNpbGl0eUlkOiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYCR7dGhpcy5yZXNvdXJjZVVybH0vaW5pdC1jbGllbnRzLyR7ZmFjaWxpdHlJZH1gKVxuICAgIH1cblxuICAgIGdldENsaWVudExpc3QocmVxOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PFBhdGllbnRbXT4oYCR7dGhpcy5yZXNvdXJjZVVybH0vY2xpZW50LWxpc3RgLCByZXEsIHtvYnNlcnZlOiAncmVzcG9uc2UnfSlcbiAgICB9XG5cbiAgICBnZXRDYXNlTWFuYWdlclN0YXRzKGNhc2VNYW5hZ2VySWQ6IG51bWJlciwgZmFjaWxpdHlJZDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PENhc2VNYW5hZ2VyU3RhdHM+KGAke3RoaXMucmVzb3VyY2VVcmx9L2ZhY2lsaXR5LyR7ZmFjaWxpdHlJZH0vY2FzZS1tYW5hZ2VyLyR7Y2FzZU1hbmFnZXJJZH0vc3RhdHNgKVxuICAgIH1cblxuICAgIGdldEFjdGl2ZUZhY2lsaXR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxGYWNpbGl0eT4oJy9hcGkvZmFjaWxpdGllcy9hY3RpdmUnKVxuICAgIH1cblxuICAgIGdldENhc2VNYW5hZ2VycyhmYWNpbGl0eUlkOiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8Q2FzZU1hbmFnZXJbXT4oYCR7dGhpcy5yZXNvdXJjZVVybH0vZmFjaWxpdHkvJHtmYWNpbGl0eUlkfS9jYXNlLW1hbmFnZXJzYClcbiAgICB9XG5cbiAgICBhc3NpZ25Ub0Nhc2VNYW5hZ2VyKGNhc2VNYW5hZ2VySWQ6IG51bWJlciwgaWRzOiBudW1iZXJbXSkge1xuICAgICAgICBsZXQgcGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKTtcbiAgICAgICAgaWRzLmZvckVhY2goaWQgPT4gcGFyYW1zID0gcGFyYW1zLmFwcGVuZChcImlkc1wiLCBpZC50b1N0cmluZygpKSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGAke3RoaXMucmVzb3VyY2VVcmx9L2Nhc2UtbWFuYWdlci8ke2Nhc2VNYW5hZ2VySWR9L2Fzc2lnbi1jbGllbnRzYCwge1xuICAgICAgICAgICAgcGFyYW1zLFxuICAgICAgICAgICAgb2JzZXJ2ZTogJ3Jlc3BvbnNlJ1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGRlQXNzaWduQ2xpZW50cyhpZHM6IG51bWJlcltdKSB7XG4gICAgICAgIGxldCBwYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpO1xuICAgICAgICBpZHMuZm9yRWFjaChpZCA9PiBwYXJhbXMgPSBwYXJhbXMuYXBwZW5kKFwiaWRzXCIsIGlkLnRvU3RyaW5nKCkpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYCR7dGhpcy5yZXNvdXJjZVVybH0vZGUtYXNzaWduLWNsaWVudHNgLCB7XG4gICAgICAgICAgICBwYXJhbXMsXG4gICAgICAgICAgICBvYnNlcnZlOiAncmVzcG9uc2UnXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZ2V0U3RhdGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxhbnlbXT4oJy9hcGkvc3RhdGVzJylcbiAgICB9XG5cbiAgICBnZXRMZ2FzQnlTdGF0ZShpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxhbnlbXT4oYC9hcGkvcHJvdmluY2VzL3N0YXRlLyR7aWR9YClcbiAgICB9XG59XG4iXX0=
