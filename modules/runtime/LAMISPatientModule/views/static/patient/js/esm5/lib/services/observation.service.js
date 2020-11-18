import * as tslib_1 from "tslib";
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL_CONFIG } from '@lamis/web-core';
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
        return this.http.delete(this.resourceUrl + "/" + path + "/" + id, { observe: 'response' });
    };
    ObservationService.prototype.getObservation = function (path, id) {
        return this.http.get(this.resourceUrl + "/" + path + "/by-uuid/" + id, { observe: 'response' });
    };
    ObservationService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: undefined, decorators: [{ type: Inject, args: [SERVER_API_URL_CONFIG,] }] }
    ]; };
    ObservationService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function ObservationService_Factory() { return new ObservationService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.SERVER_API_URL_CONFIG)); }, token: ObservationService, providedIn: "root" });
    ObservationService = tslib_1.__decorate([
        Injectable({ providedIn: 'root' }),
        tslib_1.__param(1, Inject(SERVER_API_URL_CONFIG)),
        tslib_1.__metadata("design:paramtypes", [HttpClient, Object])
    ], ObservationService);
    return ObservationService;
}());
export { ObservationService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzZXJ2YXRpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xhbWlzLXBhdGllbnQtMS40LjEvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvb2JzZXJ2YXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2hELE9BQU8sRUFBQyxxQkFBcUIsRUFBcUIsTUFBTSxpQkFBaUIsQ0FBQzs7OztBQUcxRTtJQUdJLDRCQUFvQixJQUFnQixFQUF5QyxTQUE2QjtRQUF0RixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQXlDLGNBQVMsR0FBVCxTQUFTLENBQW9CO1FBRjFHLGdCQUFXLEdBQVcsRUFBRSxDQUFDO1FBR3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUM7SUFDekQsQ0FBQztJQUVELDhDQUFpQixHQUFqQixVQUFrQixJQUFZLEVBQUUsRUFBVTtRQUN0QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFJLElBQUksQ0FBQyxXQUFXLFNBQUksSUFBSSxTQUFJLEVBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUMsQ0FBQyxDQUFBO0lBQ3ZGLENBQUM7SUFFRCwyQ0FBYyxHQUFkLFVBQWUsSUFBWSxFQUFFLEVBQVU7UUFDbkMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBUyxJQUFJLENBQUMsV0FBVyxTQUFJLElBQUksaUJBQVksRUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBQyxDQUFDLENBQUE7SUFDakcsQ0FBQzs7Z0JBVnlCLFVBQVU7Z0RBQUcsTUFBTSxTQUFDLHFCQUFxQjs7O0lBSDFELGtCQUFrQjtRQUQ5QixVQUFVLENBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDLENBQUM7UUFJVSxtQkFBQSxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQTtpREFBMUMsVUFBVTtPQUgzQixrQkFBa0IsQ0FjOUI7NkJBbkJEO0NBbUJDLEFBZEQsSUFjQztTQWRZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7SHR0cENsaWVudH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHtTRVJWRVJfQVBJX1VSTF9DT05GSUcsIFNlcnZlckFwaVVybENvbmZpZ30gZnJvbSAnQGxhbWlzL3dlYi1jb3JlJztcblxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgT2JzZXJ2YXRpb25TZXJ2aWNlIHtcbiAgICByZXNvdXJjZVVybDogc3RyaW5nID0gJyc7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsIEBJbmplY3QoU0VSVkVSX0FQSV9VUkxfQ09ORklHKSBwcml2YXRlIHNlcnZlclVybDogU2VydmVyQXBpVXJsQ29uZmlnKSB7XG4gICAgICAgIHRoaXMucmVzb3VyY2VVcmwgPSBzZXJ2ZXJVcmwuU0VSVkVSX0FQSV9VUkwgKyAnL2FwaSc7XG4gICAgfVxuXG4gICAgZGVsZXRlT2JzZXJ2YXRpb24ocGF0aDogc3RyaW5nLCBpZDogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKGAke3RoaXMucmVzb3VyY2VVcmx9LyR7cGF0aH0vJHtpZH1gLCB7b2JzZXJ2ZTogJ3Jlc3BvbnNlJ30pXG4gICAgfVxuXG4gICAgZ2V0T2JzZXJ2YXRpb24ocGF0aDogc3RyaW5nLCBpZDogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PGFueT4oYCR7dGhpcy5yZXNvdXJjZVVybH0vJHtwYXRofS9ieS11dWlkLyR7aWR9YCwge29ic2VydmU6ICdyZXNwb25zZSd9KVxuICAgIH1cbn1cbiJdfQ==