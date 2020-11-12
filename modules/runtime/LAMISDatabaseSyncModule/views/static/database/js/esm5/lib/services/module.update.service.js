import * as tslib_1 from "tslib";
import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SERVER_API_URL_CONFIG} from '@lamis/web-core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@lamis/web-core";

var ModuleUpdateService = /** @class */ (function () {
    function ModuleUpdateService(http, serverUrl) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.resourceUrl = '';
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/module-update';
    }

    ModuleUpdateService.prototype.installUpdates = function () {
        return this.http.get(this.resourceUrl + "/install-updates");
    };
    ModuleUpdateService.prototype.availableUpdates = function () {
        return this.http.get(this.resourceUrl + "/available-updates");
    };
    ModuleUpdateService.ctorParameters = function () {
        return [
            {type: HttpClient},
            {type: undefined, decorators: [{type: Inject, args: [SERVER_API_URL_CONFIG,]}]}
        ];
    };
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
    return ModuleUpdateService;
}());
export {ModuleUpdateService};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLnVwZGF0ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGFtaXMtZGF0YWJhc2UtMS4wLjAvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvbW9kdWxlLnVwZGF0ZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLHFCQUFxQixFQUFzQixNQUFNLGlCQUFpQixDQUFDOzs7O0FBTTVFO0lBR0ksNkJBQXNCLElBQWdCLEVBQXlDLFNBQTZCO1FBQXRGLFNBQUksR0FBSixJQUFJLENBQVk7UUFBeUMsY0FBUyxHQUFULFNBQVMsQ0FBb0I7UUFGckcsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFHcEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUMsY0FBYyxHQUFHLG9CQUFvQixDQUFDO0lBQ3ZFLENBQUM7SUFFRCw0Q0FBYyxHQUFkO1FBQ0ksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBYyxJQUFJLENBQUMsV0FBVyxxQkFBa0IsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFRCw4Q0FBZ0IsR0FBaEI7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFjLElBQUksQ0FBQyxXQUFXLHVCQUFvQixDQUFDLENBQUM7SUFDNUUsQ0FBQzs7Z0JBVjJCLFVBQVU7Z0RBQUcsTUFBTSxTQUFDLHFCQUFxQjs7O0lBSDVELG1CQUFtQjtRQUgvQixVQUFVLENBQUM7WUFDUixVQUFVLEVBQUUsTUFBTTtTQUNyQixDQUFDO1FBSTJDLG1CQUFBLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO2lEQUExQyxVQUFVO09BSDdCLG1CQUFtQixDQWMvQjs4QkF0QkQ7Q0FzQkMsQUFkRCxJQWNDO1NBZFksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgU0VSVkVSX0FQSV9VUkxfQ09ORklHLCBTZXJ2ZXJBcGlVcmxDb25maWcgfSBmcm9tICdAbGFtaXMvd2ViLWNvcmUnO1xuaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnLi4vbW9kZWwvbW9kdWxlLm1vZGVsJztcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBNb2R1bGVVcGRhdGVTZXJ2aWNlIHtcbiAgICBwdWJsaWMgcmVzb3VyY2VVcmwgPSAnJztcblxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBodHRwOiBIdHRwQ2xpZW50LCBASW5qZWN0KFNFUlZFUl9BUElfVVJMX0NPTkZJRykgcHJpdmF0ZSBzZXJ2ZXJVcmw6IFNlcnZlckFwaVVybENvbmZpZykge1xuICAgICAgICB0aGlzLnJlc291cmNlVXJsID0gc2VydmVyVXJsLlNFUlZFUl9BUElfVVJMICsgJy9hcGkvbW9kdWxlLXVwZGF0ZSc7XG4gICAgfVxuXG4gICAgaW5zdGFsbFVwZGF0ZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PE1vZHVsZVtdPihgJHt0aGlzLnJlc291cmNlVXJsfS9pbnN0YWxsLXVwZGF0ZXNgKTtcbiAgICB9XG5cbiAgICBhdmFpbGFibGVVcGRhdGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxNb2R1bGVbXT4oYCR7dGhpcy5yZXNvdXJjZVVybH0vYXZhaWxhYmxlLXVwZGF0ZXNgKTtcbiAgICB9XG59XG4iXX0=
