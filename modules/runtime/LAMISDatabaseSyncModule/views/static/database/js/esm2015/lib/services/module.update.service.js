import * as tslib_1 from "tslib";
import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SERVER_API_URL_CONFIG} from '@lamis/web-core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@lamis/web-core";

let ModuleUpdateService = class ModuleUpdateService {
    constructor(http, serverUrl) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.resourceUrl = '';
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/module-update';
    }

    installUpdates() {
        return this.http.get(`${this.resourceUrl}/install-updates`);
    }

    availableUpdates() {
        return this.http.get(`${this.resourceUrl}/available-updates`);
    }
};
ModuleUpdateService.ctorParameters = () => [
    {type: HttpClient},
    {type: undefined, decorators: [{type: Inject, args: [SERVER_API_URL_CONFIG,]}]}
];
ModuleUpdateService.ngInjectableDef = i0.ɵɵdefineInjectable({
    factory: function ModuleUpdateService_Factory() {
        return new ModuleUpdateService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.SERVER_API_URL_CONFIG));
    }, token: ModuleUpdateService, providedIn: "root"
});
ModuleUpdateService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__param(1, Inject(SERVER_API_URL_CONFIG)),
    tslib_1.__metadata("design:paramtypes", [HttpClient, Object])
], ModuleUpdateService);
export {ModuleUpdateService};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLnVwZGF0ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGFtaXMtZGF0YWJhc2UtMS4wLjAvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvbW9kdWxlLnVwZGF0ZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLHFCQUFxQixFQUFzQixNQUFNLGlCQUFpQixDQUFDOzs7O0FBTTVFLElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW1CO0lBRzVCLFlBQXNCLElBQWdCLEVBQXlDLFNBQTZCO1FBQXRGLFNBQUksR0FBSixJQUFJLENBQVk7UUFBeUMsY0FBUyxHQUFULFNBQVMsQ0FBb0I7UUFGckcsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFHcEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUMsY0FBYyxHQUFHLG9CQUFvQixDQUFDO0lBQ3ZFLENBQUM7SUFFRCxjQUFjO1FBQ1YsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLGtCQUFrQixDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVELGdCQUFnQjtRQUNaLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxvQkFBb0IsQ0FBQyxDQUFDO0lBQzVFLENBQUM7Q0FDSixDQUFBOztZQVgrQixVQUFVOzRDQUFHLE1BQU0sU0FBQyxxQkFBcUI7OztBQUg1RCxtQkFBbUI7SUFIL0IsVUFBVSxDQUFDO1FBQ1IsVUFBVSxFQUFFLE1BQU07S0FDckIsQ0FBQztJQUkyQyxtQkFBQSxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQTs2Q0FBMUMsVUFBVTtHQUg3QixtQkFBbUIsQ0FjL0I7U0FkWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBTRVJWRVJfQVBJX1VSTF9DT05GSUcsIFNlcnZlckFwaVVybENvbmZpZyB9IGZyb20gJ0BsYW1pcy93ZWItY29yZSc7XG5pbXBvcnQgeyBNb2R1bGUgfSBmcm9tICcuLi9tb2RlbC9tb2R1bGUubW9kZWwnO1xuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE1vZHVsZVVwZGF0ZVNlcnZpY2Uge1xuICAgIHB1YmxpYyByZXNvdXJjZVVybCA9ICcnO1xuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIGh0dHA6IEh0dHBDbGllbnQsIEBJbmplY3QoU0VSVkVSX0FQSV9VUkxfQ09ORklHKSBwcml2YXRlIHNlcnZlclVybDogU2VydmVyQXBpVXJsQ29uZmlnKSB7XG4gICAgICAgIHRoaXMucmVzb3VyY2VVcmwgPSBzZXJ2ZXJVcmwuU0VSVkVSX0FQSV9VUkwgKyAnL2FwaS9tb2R1bGUtdXBkYXRlJztcbiAgICB9XG5cbiAgICBpbnN0YWxsVXBkYXRlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8TW9kdWxlW10+KGAke3RoaXMucmVzb3VyY2VVcmx9L2luc3RhbGwtdXBkYXRlc2ApO1xuICAgIH1cblxuICAgIGF2YWlsYWJsZVVwZGF0ZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PE1vZHVsZVtdPihgJHt0aGlzLnJlc291cmNlVXJsfS9hdmFpbGFibGUtdXBkYXRlc2ApO1xuICAgIH1cbn1cbiJdfQ==
