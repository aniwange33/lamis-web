import * as tslib_1 from "tslib";
import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SERVER_API_URL_CONFIG } from '@lamis/web-core';
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
        return this.http.post(`${this.resourceUrl}/client-list`, req, { observe: 'response' });
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
        ids.forEach(id => params = params.append('ids', id.toString()));
        return this.http.get(`${this.resourceUrl}/case-manager/${caseManagerId}/assign-clients`, {
            params,
            observe: 'response'
        });
    }
    deAssignClients(ids) {
        let params = new HttpParams();
        ids.forEach(id => params = params.append('ids', id.toString()));
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
    { type: HttpClient },
    { type: undefined, decorators: [{ type: Inject, args: [SERVER_API_URL_CONFIG,] }] }
];
CaseManagementService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function CaseManagementService_Factory() { return new CaseManagementService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.SERVER_API_URL_CONFIG)); }, token: CaseManagementService, providedIn: "root" });
CaseManagementService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__param(1, Inject(SERVER_API_URL_CONFIG)),
    tslib_1.__metadata("design:paramtypes", [HttpClient, Object])
], CaseManagementService);
export { CaseManagementService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1tYW5hZ2VtZW50LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1jbGluaWMtMS40LjAvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvY2FzZS1tYW5hZ2VtZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBQyxVQUFVLEVBQUUsVUFBVSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDNUQsT0FBTyxFQUFDLHFCQUFxQixFQUFxQixNQUFNLGlCQUFpQixDQUFDOzs7O0FBTzFFLElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXFCO0lBRzlCLFlBQXNCLElBQWdCLEVBQXlDLFNBQTZCO1FBQXRGLFNBQUksR0FBSixJQUFJLENBQVk7UUFBeUMsY0FBUyxHQUFULFNBQVMsQ0FBb0I7UUFGckcsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFHcEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUMsY0FBYyxHQUFHLHNCQUFzQixDQUFDO0lBQ3pFLENBQUM7SUFFRCxXQUFXLENBQUMsVUFBa0I7UUFDMUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLGlCQUFpQixVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFRCxhQUFhLENBQUMsR0FBUTtRQUNsQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFZLEdBQUcsSUFBSSxDQUFDLFdBQVcsY0FBYyxFQUFFLEdBQUcsRUFBRSxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUMsQ0FBQyxDQUFDO0lBQ3BHLENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxhQUFxQixFQUFFLFVBQWtCO1FBQ3pELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQW1CLEdBQUcsSUFBSSxDQUFDLFdBQVcsYUFBYSxVQUFVLGlCQUFpQixhQUFhLFFBQVEsQ0FBQyxDQUFDO0lBQzdILENBQUM7SUFFRCxpQkFBaUI7UUFDYixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFXLHdCQUF3QixDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVELGVBQWUsQ0FBQyxVQUFrQjtRQUM5QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFnQixHQUFHLElBQUksQ0FBQyxXQUFXLGFBQWEsVUFBVSxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3BHLENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxhQUFxQixFQUFFLEdBQWE7UUFDcEQsSUFBSSxNQUFNLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztRQUM5QixHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDaEUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLGlCQUFpQixhQUFhLGlCQUFpQixFQUFFO1lBQ3JGLE1BQU07WUFDTixPQUFPLEVBQUUsVUFBVTtTQUN0QixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsZUFBZSxDQUFDLEdBQWE7UUFDekIsSUFBSSxNQUFNLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztRQUM5QixHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDaEUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLG9CQUFvQixFQUFFO1lBQzFELE1BQU07WUFDTixPQUFPLEVBQUUsVUFBVTtTQUN0QixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsU0FBUztRQUNMLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQVEsYUFBYSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVELGNBQWMsQ0FBQyxFQUFFO1FBQ2IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBUSx3QkFBd0IsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM5RCxDQUFDO0NBQ0osQ0FBQTs7WUFqRCtCLFVBQVU7NENBQUcsTUFBTSxTQUFDLHFCQUFxQjs7O0FBSDVELHFCQUFxQjtJQUhqQyxVQUFVLENBQUM7UUFDUixVQUFVLEVBQUUsTUFBTTtLQUNyQixDQUFDO0lBSTJDLG1CQUFBLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBOzZDQUExQyxVQUFVO0dBSDdCLHFCQUFxQixDQW9EakM7U0FwRFkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtIdHRwQ2xpZW50LCBIdHRwUGFyYW1zfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge1NFUlZFUl9BUElfVVJMX0NPTkZJRywgU2VydmVyQXBpVXJsQ29uZmlnfSBmcm9tICdAbGFtaXMvd2ViLWNvcmUnO1xuaW1wb3J0IHtGYWNpbGl0eX0gZnJvbSAnLi4vbW9kZWwvZmFjaWxpdHkubW9kZWwnO1xuaW1wb3J0IHtDYXNlTWFuYWdlciwgQ2FzZU1hbmFnZXJTdGF0cywgUGF0aWVudH0gZnJvbSAnLi4vbW9kZWwvY2FzZS1tYW5hZ2VtZW50Lm1vZGVsJztcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBDYXNlTWFuYWdlbWVudFNlcnZpY2Uge1xuICAgIHB1YmxpYyByZXNvdXJjZVVybCA9ICcnO1xuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIGh0dHA6IEh0dHBDbGllbnQsIEBJbmplY3QoU0VSVkVSX0FQSV9VUkxfQ09ORklHKSBwcml2YXRlIHNlcnZlclVybDogU2VydmVyQXBpVXJsQ29uZmlnKSB7XG4gICAgICAgIHRoaXMucmVzb3VyY2VVcmwgPSBzZXJ2ZXJVcmwuU0VSVkVSX0FQSV9VUkwgKyAnL2FwaS9jYXNlLW1hbmFnZW1lbnQnO1xuICAgIH1cblxuICAgIGluaXRDbGllbnRzKGZhY2lsaXR5SWQ6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChgJHt0aGlzLnJlc291cmNlVXJsfS9pbml0LWNsaWVudHMvJHtmYWNpbGl0eUlkfWApO1xuICAgIH1cblxuICAgIGdldENsaWVudExpc3QocmVxOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PFBhdGllbnRbXT4oYCR7dGhpcy5yZXNvdXJjZVVybH0vY2xpZW50LWxpc3RgLCByZXEsIHtvYnNlcnZlOiAncmVzcG9uc2UnfSk7XG4gICAgfVxuXG4gICAgZ2V0Q2FzZU1hbmFnZXJTdGF0cyhjYXNlTWFuYWdlcklkOiBudW1iZXIsIGZhY2lsaXR5SWQ6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxDYXNlTWFuYWdlclN0YXRzPihgJHt0aGlzLnJlc291cmNlVXJsfS9mYWNpbGl0eS8ke2ZhY2lsaXR5SWR9L2Nhc2UtbWFuYWdlci8ke2Nhc2VNYW5hZ2VySWR9L3N0YXRzYCk7XG4gICAgfVxuXG4gICAgZ2V0QWN0aXZlRmFjaWxpdHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PEZhY2lsaXR5PignL2FwaS9mYWNpbGl0aWVzL2FjdGl2ZScpO1xuICAgIH1cblxuICAgIGdldENhc2VNYW5hZ2VycyhmYWNpbGl0eUlkOiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8Q2FzZU1hbmFnZXJbXT4oYCR7dGhpcy5yZXNvdXJjZVVybH0vZmFjaWxpdHkvJHtmYWNpbGl0eUlkfS9jYXNlLW1hbmFnZXJzYCk7XG4gICAgfVxuXG4gICAgYXNzaWduVG9DYXNlTWFuYWdlcihjYXNlTWFuYWdlcklkOiBudW1iZXIsIGlkczogbnVtYmVyW10pIHtcbiAgICAgICAgbGV0IHBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKCk7XG4gICAgICAgIGlkcy5mb3JFYWNoKGlkID0+IHBhcmFtcyA9IHBhcmFtcy5hcHBlbmQoJ2lkcycsIGlkLnRvU3RyaW5nKCkpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYCR7dGhpcy5yZXNvdXJjZVVybH0vY2FzZS1tYW5hZ2VyLyR7Y2FzZU1hbmFnZXJJZH0vYXNzaWduLWNsaWVudHNgLCB7XG4gICAgICAgICAgICBwYXJhbXMsXG4gICAgICAgICAgICBvYnNlcnZlOiAncmVzcG9uc2UnXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRlQXNzaWduQ2xpZW50cyhpZHM6IG51bWJlcltdKSB7XG4gICAgICAgIGxldCBwYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpO1xuICAgICAgICBpZHMuZm9yRWFjaChpZCA9PiBwYXJhbXMgPSBwYXJhbXMuYXBwZW5kKCdpZHMnLCBpZC50b1N0cmluZygpKSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGAke3RoaXMucmVzb3VyY2VVcmx9L2RlLWFzc2lnbi1jbGllbnRzYCwge1xuICAgICAgICAgICAgcGFyYW1zLFxuICAgICAgICAgICAgb2JzZXJ2ZTogJ3Jlc3BvbnNlJ1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRTdGF0ZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PGFueVtdPignL2FwaS9zdGF0ZXMnKTtcbiAgICB9XG5cbiAgICBnZXRMZ2FzQnlTdGF0ZShpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxhbnlbXT4oYC9hcGkvcHJvdmluY2VzL3N0YXRlLyR7aWR9YCk7XG4gICAgfVxufVxuIl19