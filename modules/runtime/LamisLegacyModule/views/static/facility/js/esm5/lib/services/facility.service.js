import * as tslib_1 from "tslib";
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL_CONFIG } from '@lamis/web-core';
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
            .post(this.resourceUrl + "/switch", facility, { observe: 'response' });
    };
    FacilityService.prototype.getFacilitiesByLga = function (id) {
        return this.http
            .get(this.resourceUrl + "/lga/" + id, { observe: 'body' });
    };
    FacilityService.prototype.getStates = function () {
        return this.http.get('/api/states');
    };
    FacilityService.prototype.getLgaByState = function (id) {
        return this.http.get("/api/provinces/state/" + id);
    };
    FacilityService.prototype.getActive = function () {
        return this.http
            .get(this.resourceUrl + "/active", { observe: 'response' });
    };
    FacilityService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: undefined, decorators: [{ type: Inject, args: [SERVER_API_URL_CONFIG,] }] }
    ]; };
    FacilityService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function FacilityService_Factory() { return new FacilityService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.SERVER_API_URL_CONFIG)); }, token: FacilityService, providedIn: "root" });
    FacilityService = tslib_1.__decorate([
        Injectable({ providedIn: 'root' }),
        tslib_1.__param(1, Inject(SERVER_API_URL_CONFIG))
    ], FacilityService);
    return FacilityService;
}());
export { FacilityService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjaWxpdHkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xhbWlzLWZhY2lsaXR5LTEuMi4wLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2ZhY2lsaXR5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVsRCxPQUFPLEVBQUUscUJBQXFCLEVBQXNCLE1BQU0saUJBQWlCLENBQUM7Ozs7QUFJNUU7SUFHSSx5QkFBc0IsSUFBZ0IsRUFBeUMsU0FBNkI7UUFBdEYsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUF5QyxjQUFTLEdBQVQsU0FBUyxDQUFvQjtRQUZyRyxnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUdwQixJQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQyxjQUFjLEdBQUcsaUJBQWlCLENBQUM7SUFDcEUsQ0FBQztJQUVELGdDQUFNLEdBQU4sVUFBTyxRQUFRO1FBQ1gsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNYLElBQUksQ0FBSSxJQUFJLENBQUMsV0FBVyxZQUFTLEVBQUUsUUFBUSxFQUFFLEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBQyxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVELDRDQUFrQixHQUFsQixVQUFtQixFQUFVO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLElBQUk7YUFDWCxHQUFHLENBQVcsSUFBSSxDQUFDLFdBQVcsYUFBUSxFQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQTtJQUN2RSxDQUFDO0lBRUQsbUNBQVMsR0FBVDtRQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQVEsYUFBYSxDQUFDLENBQUE7SUFDOUMsQ0FBQztJQUVELHVDQUFhLEdBQWIsVUFBYyxFQUFFO1FBQ1osT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBUSwwQkFBd0IsRUFBSSxDQUFDLENBQUE7SUFDN0QsQ0FBQztJQUVELG1DQUFTLEdBQVQ7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJO2FBQ1gsR0FBRyxDQUFjLElBQUksQ0FBQyxXQUFXLFlBQVMsRUFBRSxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUMsQ0FBQyxDQUFBO0lBQzNFLENBQUM7O2dCQXpCMkIsVUFBVTtnREFBRyxNQUFNLFNBQUMscUJBQXFCOzs7SUFINUQsZUFBZTtRQUQzQixVQUFVLENBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDLENBQUM7UUFJWSxtQkFBQSxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQTtPQUg3RCxlQUFlLENBNkIzQjswQkFwQ0Q7Q0FvQ0MsQUE3QkQsSUE2QkM7U0E3QlksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFNFUlZFUl9BUElfVVJMX0NPTkZJRywgU2VydmVyQXBpVXJsQ29uZmlnIH0gZnJvbSAnQGxhbWlzL3dlYi1jb3JlJztcbmltcG9ydCB7IEZhY2lsaXR5IH0gZnJvbSAnLi4vbW9kZWwvZmFjaWxpdHkubW9kZWwnO1xuXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBGYWNpbGl0eVNlcnZpY2Uge1xuICAgIHB1YmxpYyByZXNvdXJjZVVybCA9ICcnO1xuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIGh0dHA6IEh0dHBDbGllbnQsIEBJbmplY3QoU0VSVkVSX0FQSV9VUkxfQ09ORklHKSBwcml2YXRlIHNlcnZlclVybDogU2VydmVyQXBpVXJsQ29uZmlnKSB7XG4gICAgICAgIHRoaXMucmVzb3VyY2VVcmwgPSBzZXJ2ZXJVcmwuU0VSVkVSX0FQSV9VUkwgKyAnL2FwaS9mYWNpbGl0aWVzJztcbiAgICB9XG5cbiAgICB1cGRhdGUoZmFjaWxpdHkpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAgICAgICAucG9zdChgJHt0aGlzLnJlc291cmNlVXJsfS9zd2l0Y2hgLCBmYWNpbGl0eSwge29ic2VydmU6ICdyZXNwb25zZSd9KTtcbiAgICB9XG5cbiAgICBnZXRGYWNpbGl0aWVzQnlMZ2EoaWQ6IG51bWJlcik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgICAgICAgIC5nZXQ8YW55W10+KGAke3RoaXMucmVzb3VyY2VVcmx9L2xnYS8ke2lkfWAsIHtvYnNlcnZlOiAnYm9keSd9KVxuICAgIH1cblxuICAgIGdldFN0YXRlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8YW55W10+KCcvYXBpL3N0YXRlcycpXG4gICAgfVxuXG4gICAgZ2V0TGdhQnlTdGF0ZShpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxhbnlbXT4oYC9hcGkvcHJvdmluY2VzL3N0YXRlLyR7aWR9YClcbiAgICB9XG5cbiAgICBnZXRBY3RpdmUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgICAgICAgIC5nZXQ8RmFjaWxpdHk+KGAke3RoaXMucmVzb3VyY2VVcmx9L2FjdGl2ZWAsIHtvYnNlcnZlOiAncmVzcG9uc2UnfSlcbiAgICB9XG59XG4iXX0=