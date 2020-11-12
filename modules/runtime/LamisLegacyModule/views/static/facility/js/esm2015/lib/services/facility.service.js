import * as tslib_1 from "tslib";
import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SERVER_API_URL_CONFIG} from '@lamis/web-core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@lamis/web-core";

let FacilityService = class FacilityService {
    constructor(http, serverUrl) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.resourceUrl = '';
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/facilities';
    }

    update(facility) {
        return this.http
            .post(`${this.resourceUrl}/switch`, facility, {observe: 'response'});
    }

    getFacilitiesByLga(id) {
        return this.http
            .get(`${this.resourceUrl}/lga/${id}`, {observe: 'body'});
    }

    getStates() {
        return this.http.get('/api/states');
    }

    getLgaByState(id) {
        return this.http.get(`/api/provinces/state/${id}`);
    }

    getActive() {
        return this.http
            .get(`${this.resourceUrl}/active`, {observe: 'response'});
    }
};
FacilityService.ctorParameters = () => [
    {type: HttpClient},
    {type: undefined, decorators: [{type: Inject, args: [SERVER_API_URL_CONFIG,]}]}
];
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
export {FacilityService};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjaWxpdHkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xhbWlzLWZhY2lsaXR5LyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2ZhY2lsaXR5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVsRCxPQUFPLEVBQUUscUJBQXFCLEVBQXNCLE1BQU0saUJBQWlCLENBQUM7Ozs7QUFHNUUsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZTtJQUd4QixZQUFzQixJQUFnQixFQUF5QyxTQUE2QjtRQUF0RixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQXlDLGNBQVMsR0FBVCxTQUFTLENBQW9CO1FBRnJHLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBR3BCLElBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDLGNBQWMsR0FBRyxpQkFBaUIsQ0FBQztJQUNwRSxDQUFDO0lBRUQsTUFBTSxDQUFDLFFBQVE7UUFDWCxPQUFPLElBQUksQ0FBQyxJQUFJO2FBQ1gsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsU0FBUyxFQUFFLFFBQVEsRUFBRSxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUMsQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxFQUFVO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLElBQUk7YUFDWCxHQUFHLENBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxRQUFRLEVBQUUsRUFBRSxFQUFFLEVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUE7SUFDdkUsQ0FBQztJQUVELFNBQVM7UUFDTCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFRLGFBQWEsQ0FBQyxDQUFBO0lBQzlDLENBQUM7SUFFRCxhQUFhLENBQUMsRUFBRTtRQUNaLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQVEsd0JBQXdCLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDN0QsQ0FBQztJQUVELFNBQVM7UUFDTCxPQUFPLElBQUksQ0FBQyxJQUFJO2FBQ1gsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsU0FBUyxFQUFFLEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBQyxDQUFDLENBQUE7SUFDakUsQ0FBQztDQUNKLENBQUE7O1lBMUIrQixVQUFVOzRDQUFHLE1BQU0sU0FBQyxxQkFBcUI7OztBQUg1RCxlQUFlO0lBRDNCLFVBQVUsQ0FBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUMsQ0FBQztJQUlZLG1CQUFBLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBOzZDQUExQyxVQUFVO0dBSDdCLGVBQWUsQ0E2QjNCO1NBN0JZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTRVJWRVJfQVBJX1VSTF9DT05GSUcsIFNlcnZlckFwaVVybENvbmZpZyB9IGZyb20gJ0BsYW1pcy93ZWItY29yZSc7XG5cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIEZhY2lsaXR5U2VydmljZSB7XG4gICAgcHVibGljIHJlc291cmNlVXJsID0gJyc7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudCwgQEluamVjdChTRVJWRVJfQVBJX1VSTF9DT05GSUcpIHByaXZhdGUgc2VydmVyVXJsOiBTZXJ2ZXJBcGlVcmxDb25maWcpIHtcbiAgICAgICAgdGhpcy5yZXNvdXJjZVVybCA9IHNlcnZlclVybC5TRVJWRVJfQVBJX1VSTCArICcvYXBpL2ZhY2lsaXRpZXMnO1xuICAgIH1cblxuICAgIHVwZGF0ZShmYWNpbGl0eSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgICAgICAgIC5wb3N0KGAke3RoaXMucmVzb3VyY2VVcmx9L3N3aXRjaGAsIGZhY2lsaXR5LCB7b2JzZXJ2ZTogJ3Jlc3BvbnNlJ30pO1xuICAgIH1cblxuICAgIGdldEZhY2lsaXRpZXNCeUxnYShpZDogbnVtYmVyKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgICAgICAgLmdldDxhbnlbXT4oYCR7dGhpcy5yZXNvdXJjZVVybH0vbGdhLyR7aWR9YCwge29ic2VydmU6ICdib2R5J30pXG4gICAgfVxuXG4gICAgZ2V0U3RhdGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxhbnlbXT4oJy9hcGkvc3RhdGVzJylcbiAgICB9XG5cbiAgICBnZXRMZ2FCeVN0YXRlKGlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PGFueVtdPihgL2FwaS9wcm92aW5jZXMvc3RhdGUvJHtpZH1gKVxuICAgIH1cblxuICAgIGdldEFjdGl2ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgICAgICAgLmdldChgJHt0aGlzLnJlc291cmNlVXJsfS9hY3RpdmVgLCB7b2JzZXJ2ZTogJ3Jlc3BvbnNlJ30pXG4gICAgfVxufVxuIl19
