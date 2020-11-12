import * as tslib_1 from "tslib";
import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SERVER_API_URL_CONFIG} from '@lamis/web-core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@lamis/web-core";

let ObservationService = class ObservationService {
    constructor(http, serverUrl) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.resourceUrl = '';
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api';
    }

    deleteObservation(path, id) {
        return this.http.delete(`${this.resourceUrl}/${path}/${id}`, {observe: 'response'});
    }

    getObservation(path, id) {
        return this.http.get(`${this.resourceUrl}/${path}/by-uuid/${id}`, {observe: 'response'});
    }
};
ObservationService.ctorParameters = () => [
    {type: HttpClient},
    {type: undefined, decorators: [{type: Inject, args: [SERVER_API_URL_CONFIG,]}]}
];
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
export {ObservationService};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzZXJ2YXRpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xhbWlzLXBhdGllbnQtMS4yLjAvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvb2JzZXJ2YXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxxQkFBcUIsRUFBc0IsTUFBTSxpQkFBaUIsQ0FBQzs7OztBQUc1RSxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFrQjtJQUczQixZQUFvQixJQUFnQixFQUF5QyxTQUE2QjtRQUF0RixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQXlDLGNBQVMsR0FBVCxTQUFTLENBQW9CO1FBRjFHLGdCQUFXLEdBQVcsRUFBRSxDQUFDO1FBR3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUM7SUFDekQsQ0FBQztJQUVELGlCQUFpQixDQUFDLElBQVksRUFBRSxFQUFVO1FBQ3RDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUMsQ0FBQyxDQUFBO0lBQ3ZGLENBQUM7SUFFRCxjQUFjLENBQUMsSUFBWSxFQUFFLEVBQVU7UUFDbkMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBTSxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxZQUFZLEVBQUUsRUFBRSxFQUFDLEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBQyxDQUFDLENBQUE7SUFDaEcsQ0FBQztDQUNKLENBQUE7O1lBWDZCLFVBQVU7NENBQUcsTUFBTSxTQUFDLHFCQUFxQjs7O0FBSDFELGtCQUFrQjtJQUQ5QixVQUFVLENBQUMsRUFBQyxVQUFVLEVBQUMsTUFBTSxFQUFDLENBQUM7SUFJVyxtQkFBQSxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQTs2Q0FBMUMsVUFBVTtHQUgzQixrQkFBa0IsQ0FjOUI7U0FkWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBTRVJWRVJfQVBJX1VSTF9DT05GSUcsIFNlcnZlckFwaVVybENvbmZpZyB9IGZyb20gJ0BsYW1pcy93ZWItY29yZSc7XG5cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOidyb290J30pXG5leHBvcnQgY2xhc3MgT2JzZXJ2YXRpb25TZXJ2aWNlIHtcbiAgICByZXNvdXJjZVVybDogc3RyaW5nID0gJyc7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsIEBJbmplY3QoU0VSVkVSX0FQSV9VUkxfQ09ORklHKSBwcml2YXRlIHNlcnZlclVybDogU2VydmVyQXBpVXJsQ29uZmlnKSB7XG4gICAgICAgIHRoaXMucmVzb3VyY2VVcmwgPSBzZXJ2ZXJVcmwuU0VSVkVSX0FQSV9VUkwgKyAnL2FwaSc7XG4gICAgfVxuXG4gICAgZGVsZXRlT2JzZXJ2YXRpb24ocGF0aDogc3RyaW5nLCBpZDogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKGAke3RoaXMucmVzb3VyY2VVcmx9LyR7cGF0aH0vJHtpZH1gLCB7b2JzZXJ2ZTogJ3Jlc3BvbnNlJ30pXG4gICAgfVxuXG4gICAgZ2V0T2JzZXJ2YXRpb24ocGF0aDogc3RyaW5nLCBpZDogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PGFueT4oYCR7dGhpcy5yZXNvdXJjZVVybH0vJHtwYXRofS9ieS11dWlkLyR7aWR9YCx7b2JzZXJ2ZTogJ3Jlc3BvbnNlJ30pXG4gICAgfVxufVxuIl19
