import * as tslib_1 from "tslib";
import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SERVER_API_URL_CONFIG} from '@lamis/web-core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@lamis/web-core";

var ObservationService = /** @class */ (function () {
    function ObservationService(http, serverUrl) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.resourceUrl = '';
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api';
    }

    ObservationService.prototype.deleteObservation = function (path, id) {
        return this.http.delete(this.resourceUrl + "/" + path + "/" + id, {observe: 'response'});
    };
    ObservationService.prototype.getObservation = function (path, id) {
        return this.http.get(this.resourceUrl + "/" + path + "/by-uuid/" + id, {observe: 'response'});
    };
    ObservationService.ctorParameters = function () {
        return [
            {type: HttpClient},
            {type: undefined, decorators: [{type: Inject, args: [SERVER_API_URL_CONFIG,]}]}
        ];
    };
    ObservationService.ngInjectableDef = i0.ɵɵdefineInjectable({
        factory: function ObservationService_Factory() {
            return new ObservationService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.SERVER_API_URL_CONFIG));
        }, token: ObservationService, providedIn: "root"
    });
    ObservationService = tslib_1.__decorate([
        Injectable({providedIn: 'root'}),
        tslib_1.__param(1, Inject(SERVER_API_URL_CONFIG)),
        tslib_1.__metadata("design:paramtypes", [HttpClient, Object])
    ], ObservationService);
    return ObservationService;
}());
export {ObservationService};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzZXJ2YXRpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xhbWlzLXBhdGllbnQtMS4yLjAvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvb2JzZXJ2YXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxxQkFBcUIsRUFBc0IsTUFBTSxpQkFBaUIsQ0FBQzs7OztBQUc1RTtJQUdJLDRCQUFvQixJQUFnQixFQUF5QyxTQUE2QjtRQUF0RixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQXlDLGNBQVMsR0FBVCxTQUFTLENBQW9CO1FBRjFHLGdCQUFXLEdBQVcsRUFBRSxDQUFDO1FBR3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUM7SUFDekQsQ0FBQztJQUVELDhDQUFpQixHQUFqQixVQUFrQixJQUFZLEVBQUUsRUFBVTtRQUN0QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFJLElBQUksQ0FBQyxXQUFXLFNBQUksSUFBSSxTQUFJLEVBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUMsQ0FBQyxDQUFBO0lBQ3ZGLENBQUM7SUFFRCwyQ0FBYyxHQUFkLFVBQWUsSUFBWSxFQUFFLEVBQVU7UUFDbkMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBUyxJQUFJLENBQUMsV0FBVyxTQUFJLElBQUksaUJBQVksRUFBSSxFQUFDLEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBQyxDQUFDLENBQUE7SUFDaEcsQ0FBQzs7Z0JBVnlCLFVBQVU7Z0RBQUcsTUFBTSxTQUFDLHFCQUFxQjs7O0lBSDFELGtCQUFrQjtRQUQ5QixVQUFVLENBQUMsRUFBQyxVQUFVLEVBQUMsTUFBTSxFQUFDLENBQUM7UUFJVyxtQkFBQSxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQTtpREFBMUMsVUFBVTtPQUgzQixrQkFBa0IsQ0FjOUI7NkJBbkJEO0NBbUJDLEFBZEQsSUFjQztTQWRZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IFNFUlZFUl9BUElfVVJMX0NPTkZJRywgU2VydmVyQXBpVXJsQ29uZmlnIH0gZnJvbSAnQGxhbWlzL3dlYi1jb3JlJztcblxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46J3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBPYnNlcnZhdGlvblNlcnZpY2Uge1xuICAgIHJlc291cmNlVXJsOiBzdHJpbmcgPSAnJztcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCwgQEluamVjdChTRVJWRVJfQVBJX1VSTF9DT05GSUcpIHByaXZhdGUgc2VydmVyVXJsOiBTZXJ2ZXJBcGlVcmxDb25maWcpIHtcbiAgICAgICAgdGhpcy5yZXNvdXJjZVVybCA9IHNlcnZlclVybC5TRVJWRVJfQVBJX1VSTCArICcvYXBpJztcbiAgICB9XG5cbiAgICBkZWxldGVPYnNlcnZhdGlvbihwYXRoOiBzdHJpbmcsIGlkOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUoYCR7dGhpcy5yZXNvdXJjZVVybH0vJHtwYXRofS8ke2lkfWAsIHtvYnNlcnZlOiAncmVzcG9uc2UnfSlcbiAgICB9XG5cbiAgICBnZXRPYnNlcnZhdGlvbihwYXRoOiBzdHJpbmcsIGlkOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8YW55PihgJHt0aGlzLnJlc291cmNlVXJsfS8ke3BhdGh9L2J5LXV1aWQvJHtpZH1gLHtvYnNlcnZlOiAncmVzcG9uc2UnfSlcbiAgICB9XG59XG4iXX0=
