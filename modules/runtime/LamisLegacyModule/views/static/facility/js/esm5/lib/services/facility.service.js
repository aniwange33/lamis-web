import * as tslib_1 from "tslib";
import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SERVER_API_URL_CONFIG} from '@lamis/web-core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@lamis/web-core";

var FacilityService = /** @class */ (function () {
    function FacilityService(http, serverUrl) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.resourceUrl = '';
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/facilities';
    }

    FacilityService.prototype.update = function (facility) {
        return this.http
            .post(this.resourceUrl + "/switch", facility, {observe: 'response'});
    };
    FacilityService.prototype.getFacilitiesByLga = function (id) {
        return this.http
            .get(this.resourceUrl + "/lga/" + id, {observe: 'body'});
    };
    FacilityService.prototype.getStates = function () {
        return this.http.get('/api/states');
    };
    FacilityService.prototype.getLgaByState = function (id) {
        return this.http.get("/api/provinces/state/" + id);
    };
    FacilityService.prototype.getActive = function () {
        return this.http
            .get(this.resourceUrl + "/active", {observe: 'response'});
    };
    FacilityService.ctorParameters = function () {
        return [
            {type: HttpClient},
            {type: undefined, decorators: [{type: Inject, args: [SERVER_API_URL_CONFIG,]}]}
        ];
    };
    FacilityService.ngInjectableDef = i0.ɵɵdefineInjectable({
        factory: function FacilityService_Factory() {
            return new FacilityService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.SERVER_API_URL_CONFIG));
        }, token: FacilityService, providedIn: "root"
    });
    FacilityService = tslib_1.__decorate([
        Injectable({providedIn: 'root'}),
        tslib_1.__param(1, Inject(SERVER_API_URL_CONFIG)),
        tslib_1.__metadata("design:paramtypes", [HttpClient, Object])
    ], FacilityService);
    return FacilityService;
}());
export {FacilityService};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjaWxpdHkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xhbWlzLWZhY2lsaXR5LyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2ZhY2lsaXR5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVsRCxPQUFPLEVBQUUscUJBQXFCLEVBQXNCLE1BQU0saUJBQWlCLENBQUM7Ozs7QUFHNUU7SUFHSSx5QkFBc0IsSUFBZ0IsRUFBeUMsU0FBNkI7UUFBdEYsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUF5QyxjQUFTLEdBQVQsU0FBUyxDQUFvQjtRQUZyRyxnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUdwQixJQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQyxjQUFjLEdBQUcsaUJBQWlCLENBQUM7SUFDcEUsQ0FBQztJQUVELGdDQUFNLEdBQU4sVUFBTyxRQUFRO1FBQ1gsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNYLElBQUksQ0FBSSxJQUFJLENBQUMsV0FBVyxZQUFTLEVBQUUsUUFBUSxFQUFFLEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBQyxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVELDRDQUFrQixHQUFsQixVQUFtQixFQUFVO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLElBQUk7YUFDWCxHQUFHLENBQVcsSUFBSSxDQUFDLFdBQVcsYUFBUSxFQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQTtJQUN2RSxDQUFDO0lBRUQsbUNBQVMsR0FBVDtRQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQVEsYUFBYSxDQUFDLENBQUE7SUFDOUMsQ0FBQztJQUVELHVDQUFhLEdBQWIsVUFBYyxFQUFFO1FBQ1osT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBUSwwQkFBd0IsRUFBSSxDQUFDLENBQUE7SUFDN0QsQ0FBQztJQUVELG1DQUFTLEdBQVQ7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJO2FBQ1gsR0FBRyxDQUFJLElBQUksQ0FBQyxXQUFXLFlBQVMsRUFBRSxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUMsQ0FBQyxDQUFBO0lBQ2pFLENBQUM7O2dCQXpCMkIsVUFBVTtnREFBRyxNQUFNLFNBQUMscUJBQXFCOzs7SUFINUQsZUFBZTtRQUQzQixVQUFVLENBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDLENBQUM7UUFJWSxtQkFBQSxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQTtpREFBMUMsVUFBVTtPQUg3QixlQUFlLENBNkIzQjswQkFuQ0Q7Q0FtQ0MsQUE3QkQsSUE2QkM7U0E3QlksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFNFUlZFUl9BUElfVVJMX0NPTkZJRywgU2VydmVyQXBpVXJsQ29uZmlnIH0gZnJvbSAnQGxhbWlzL3dlYi1jb3JlJztcblxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgRmFjaWxpdHlTZXJ2aWNlIHtcbiAgICBwdWJsaWMgcmVzb3VyY2VVcmwgPSAnJztcblxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBodHRwOiBIdHRwQ2xpZW50LCBASW5qZWN0KFNFUlZFUl9BUElfVVJMX0NPTkZJRykgcHJpdmF0ZSBzZXJ2ZXJVcmw6IFNlcnZlckFwaVVybENvbmZpZykge1xuICAgICAgICB0aGlzLnJlc291cmNlVXJsID0gc2VydmVyVXJsLlNFUlZFUl9BUElfVVJMICsgJy9hcGkvZmFjaWxpdGllcyc7XG4gICAgfVxuXG4gICAgdXBkYXRlKGZhY2lsaXR5KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgICAgICAgLnBvc3QoYCR7dGhpcy5yZXNvdXJjZVVybH0vc3dpdGNoYCwgZmFjaWxpdHksIHtvYnNlcnZlOiAncmVzcG9uc2UnfSk7XG4gICAgfVxuXG4gICAgZ2V0RmFjaWxpdGllc0J5TGdhKGlkOiBudW1iZXIpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAgICAgICAuZ2V0PGFueVtdPihgJHt0aGlzLnJlc291cmNlVXJsfS9sZ2EvJHtpZH1gLCB7b2JzZXJ2ZTogJ2JvZHknfSlcbiAgICB9XG5cbiAgICBnZXRTdGF0ZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PGFueVtdPignL2FwaS9zdGF0ZXMnKVxuICAgIH1cblxuICAgIGdldExnYUJ5U3RhdGUoaWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8YW55W10+KGAvYXBpL3Byb3ZpbmNlcy9zdGF0ZS8ke2lkfWApXG4gICAgfVxuXG4gICAgZ2V0QWN0aXZlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAgICAgICAuZ2V0KGAke3RoaXMucmVzb3VyY2VVcmx9L2FjdGl2ZWAsIHtvYnNlcnZlOiAncmVzcG9uc2UnfSlcbiAgICB9XG59XG4iXX0=
