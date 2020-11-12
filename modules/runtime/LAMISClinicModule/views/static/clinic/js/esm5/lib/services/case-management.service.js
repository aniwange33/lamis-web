import * as tslib_1 from "tslib";
import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {SERVER_API_URL_CONFIG} from '@lamis/web-core';
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
        return this.http.post(this.resourceUrl + "/client-list", req, {observe: 'response'});
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
        ids.forEach(function (id) {
            return params = params.append("ids", id.toString());
        });
        return this.http.get(this.resourceUrl + "/case-manager/" + caseManagerId + "/assign-clients", {
            params: params,
            observe: 'response'
        });
    };
    CaseManagementService.prototype.deAssignClients = function (ids) {
        var params = new HttpParams();
        ids.forEach(function (id) {
            return params = params.append("ids", id.toString());
        });
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
    CaseManagementService.ctorParameters = function () {
        return [
            {type: HttpClient},
            {type: undefined, decorators: [{type: Inject, args: [SERVER_API_URL_CONFIG,]}]}
        ];
    };
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
    return CaseManagementService;
}());
export {CaseManagementService};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1tYW5hZ2VtZW50LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1jbGluaWMtMS4xLjMvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvY2FzZS1tYW5hZ2VtZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDOUQsT0FBTyxFQUFFLHFCQUFxQixFQUFzQixNQUFNLGlCQUFpQixDQUFDOzs7O0FBTzVFO0lBR0ksK0JBQXNCLElBQWdCLEVBQXlDLFNBQTZCO1FBQXRGLFNBQUksR0FBSixJQUFJLENBQVk7UUFBeUMsY0FBUyxHQUFULFNBQVMsQ0FBb0I7UUFGckcsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFHcEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUMsY0FBYyxHQUFHLHNCQUFzQixDQUFDO0lBQ3pFLENBQUM7SUFFRCwyQ0FBVyxHQUFYLFVBQVksVUFBa0I7UUFDMUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBSSxJQUFJLENBQUMsV0FBVyxzQkFBaUIsVUFBWSxDQUFDLENBQUE7SUFDMUUsQ0FBQztJQUVELDZDQUFhLEdBQWIsVUFBYyxHQUFRO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQWUsSUFBSSxDQUFDLFdBQVcsaUJBQWMsRUFBRSxHQUFHLEVBQUUsRUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFDLENBQUMsQ0FBQTtJQUNuRyxDQUFDO0lBRUQsbURBQW1CLEdBQW5CLFVBQW9CLGFBQXFCLEVBQUUsVUFBa0I7UUFDekQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBc0IsSUFBSSxDQUFDLFdBQVcsa0JBQWEsVUFBVSxzQkFBaUIsYUFBYSxXQUFRLENBQUMsQ0FBQTtJQUM1SCxDQUFDO0lBRUQsaURBQWlCLEdBQWpCO1FBQ0ksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBVyx3QkFBd0IsQ0FBQyxDQUFBO0lBQzVELENBQUM7SUFFRCwrQ0FBZSxHQUFmLFVBQWdCLFVBQWtCO1FBQzlCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQW1CLElBQUksQ0FBQyxXQUFXLGtCQUFhLFVBQVUsbUJBQWdCLENBQUMsQ0FBQTtJQUNuRyxDQUFDO0lBRUQsbURBQW1CLEdBQW5CLFVBQW9CLGFBQXFCLEVBQUUsR0FBYTtRQUNwRCxJQUFJLE1BQU0sR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO1FBQzlCLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBQSxFQUFFLElBQUksT0FBQSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQTVDLENBQTRDLENBQUMsQ0FBQztRQUNoRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFJLElBQUksQ0FBQyxXQUFXLHNCQUFpQixhQUFhLG9CQUFpQixFQUFFO1lBQ3JGLE1BQU0sUUFBQTtZQUNOLE9BQU8sRUFBRSxVQUFVO1NBQ3RCLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCwrQ0FBZSxHQUFmLFVBQWdCLEdBQWE7UUFDekIsSUFBSSxNQUFNLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztRQUM5QixHQUFHLENBQUMsT0FBTyxDQUFDLFVBQUEsRUFBRSxJQUFJLE9BQUEsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUE1QyxDQUE0QyxDQUFDLENBQUM7UUFDaEUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBSSxJQUFJLENBQUMsV0FBVyx1QkFBb0IsRUFBRTtZQUMxRCxNQUFNLFFBQUE7WUFDTixPQUFPLEVBQUUsVUFBVTtTQUN0QixDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQseUNBQVMsR0FBVDtRQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQVEsYUFBYSxDQUFDLENBQUE7SUFDOUMsQ0FBQztJQUVELDhDQUFjLEdBQWQsVUFBZSxFQUFFO1FBQ2IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBUSwwQkFBd0IsRUFBSSxDQUFDLENBQUE7SUFDN0QsQ0FBQzs7Z0JBaEQyQixVQUFVO2dEQUFHLE1BQU0sU0FBQyxxQkFBcUI7OztJQUg1RCxxQkFBcUI7UUFIakMsVUFBVSxDQUFDO1lBQ1IsVUFBVSxFQUFFLE1BQU07U0FDckIsQ0FBQztRQUkyQyxtQkFBQSxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQTtpREFBMUMsVUFBVTtPQUg3QixxQkFBcUIsQ0FvRGpDO2dDQTdERDtDQTZEQyxBQXBERCxJQW9EQztTQXBEWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBTRVJWRVJfQVBJX1VSTF9DT05GSUcsIFNlcnZlckFwaVVybENvbmZpZyB9IGZyb20gJ0BsYW1pcy93ZWItY29yZSc7XG5pbXBvcnQgeyBGYWNpbGl0eSB9IGZyb20gJy4uL21vZGVsL2ZhY2lsaXR5Lm1vZGVsJztcbmltcG9ydCB7IENhc2VNYW5hZ2VyLCBDYXNlTWFuYWdlclN0YXRzLCBQYXRpZW50IH0gZnJvbSAnLi4vbW9kZWwvY2FzZS1tYW5hZ2VtZW50Lm1vZGVsJztcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBDYXNlTWFuYWdlbWVudFNlcnZpY2Uge1xuICAgIHB1YmxpYyByZXNvdXJjZVVybCA9ICcnO1xuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIGh0dHA6IEh0dHBDbGllbnQsIEBJbmplY3QoU0VSVkVSX0FQSV9VUkxfQ09ORklHKSBwcml2YXRlIHNlcnZlclVybDogU2VydmVyQXBpVXJsQ29uZmlnKSB7XG4gICAgICAgIHRoaXMucmVzb3VyY2VVcmwgPSBzZXJ2ZXJVcmwuU0VSVkVSX0FQSV9VUkwgKyAnL2FwaS9jYXNlLW1hbmFnZW1lbnQnO1xuICAgIH1cblxuICAgIGluaXRDbGllbnRzKGZhY2lsaXR5SWQ6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChgJHt0aGlzLnJlc291cmNlVXJsfS9pbml0LWNsaWVudHMvJHtmYWNpbGl0eUlkfWApXG4gICAgfVxuXG4gICAgZ2V0Q2xpZW50TGlzdChyZXE6IGFueSkge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Q8UGF0aWVudFtdPihgJHt0aGlzLnJlc291cmNlVXJsfS9jbGllbnQtbGlzdGAsIHJlcSwge29ic2VydmU6ICdyZXNwb25zZSd9KVxuICAgIH1cblxuICAgIGdldENhc2VNYW5hZ2VyU3RhdHMoY2FzZU1hbmFnZXJJZDogbnVtYmVyLCBmYWNpbGl0eUlkOiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8Q2FzZU1hbmFnZXJTdGF0cz4oYCR7dGhpcy5yZXNvdXJjZVVybH0vZmFjaWxpdHkvJHtmYWNpbGl0eUlkfS9jYXNlLW1hbmFnZXIvJHtjYXNlTWFuYWdlcklkfS9zdGF0c2ApXG4gICAgfVxuXG4gICAgZ2V0QWN0aXZlRmFjaWxpdHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PEZhY2lsaXR5PignL2FwaS9mYWNpbGl0aWVzL2FjdGl2ZScpXG4gICAgfVxuXG4gICAgZ2V0Q2FzZU1hbmFnZXJzKGZhY2lsaXR5SWQ6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxDYXNlTWFuYWdlcltdPihgJHt0aGlzLnJlc291cmNlVXJsfS9mYWNpbGl0eS8ke2ZhY2lsaXR5SWR9L2Nhc2UtbWFuYWdlcnNgKVxuICAgIH1cblxuICAgIGFzc2lnblRvQ2FzZU1hbmFnZXIoY2FzZU1hbmFnZXJJZDogbnVtYmVyLCBpZHM6IG51bWJlcltdKSB7XG4gICAgICAgIGxldCBwYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpO1xuICAgICAgICBpZHMuZm9yRWFjaChpZCA9PiBwYXJhbXMgPSBwYXJhbXMuYXBwZW5kKFwiaWRzXCIsIGlkLnRvU3RyaW5nKCkpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYCR7dGhpcy5yZXNvdXJjZVVybH0vY2FzZS1tYW5hZ2VyLyR7Y2FzZU1hbmFnZXJJZH0vYXNzaWduLWNsaWVudHNgLCB7XG4gICAgICAgICAgICBwYXJhbXMsXG4gICAgICAgICAgICBvYnNlcnZlOiAncmVzcG9uc2UnXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZGVBc3NpZ25DbGllbnRzKGlkczogbnVtYmVyW10pIHtcbiAgICAgICAgbGV0IHBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKCk7XG4gICAgICAgIGlkcy5mb3JFYWNoKGlkID0+IHBhcmFtcyA9IHBhcmFtcy5hcHBlbmQoXCJpZHNcIiwgaWQudG9TdHJpbmcoKSkpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChgJHt0aGlzLnJlc291cmNlVXJsfS9kZS1hc3NpZ24tY2xpZW50c2AsIHtcbiAgICAgICAgICAgIHBhcmFtcyxcbiAgICAgICAgICAgIG9ic2VydmU6ICdyZXNwb25zZSdcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBnZXRTdGF0ZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PGFueVtdPignL2FwaS9zdGF0ZXMnKVxuICAgIH1cblxuICAgIGdldExnYXNCeVN0YXRlKGlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PGFueVtdPihgL2FwaS9wcm92aW5jZXMvc3RhdGUvJHtpZH1gKVxuICAgIH1cbn1cbiJdfQ==
