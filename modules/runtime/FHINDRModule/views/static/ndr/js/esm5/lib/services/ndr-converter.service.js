import * as tslib_1 from "tslib";
import { Inject, Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { SERVER_API_URL_CONFIG } from "@lamis/web-core";
var NdrConverterService = /** @class */ (function () {
    function NdrConverterService(http, serverUrl) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.resourceUrl = '';
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/ndr';
    }
    NdrConverterService.prototype.convert = function (ids) {
        var params = new HttpParams();
        ids.forEach(function (id) { return params = params.append("ids", id.toString()); });
        return this.http.get(this.resourceUrl + "/run", { params: params });
    };
    NdrConverterService.prototype.listFacilities = function () {
        return this.http.get(this.resourceUrl + "/list-facilities");
    };
    NdrConverterService.prototype.download = function (name) {
        return this.http.get(this.resourceUrl + "/download/" + name, { responseType: 'blob' });
    };
    NdrConverterService.prototype.listFiles = function () {
        return this.http.get(this.resourceUrl + "/list-files");
    };
    NdrConverterService.prototype.deduplicate = function () {
        return this.http.get(this.resourceUrl + "/remove-duplicates");
    };
    NdrConverterService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: undefined, decorators: [{ type: Inject, args: [SERVER_API_URL_CONFIG,] }] }
    ]; };
    NdrConverterService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__param(1, Inject(SERVER_API_URL_CONFIG)),
        tslib_1.__metadata("design:paramtypes", [HttpClient, Object])
    ], NdrConverterService);
    return NdrConverterService;
}());
export { NdrConverterService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmRyLWNvbnZlcnRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGFtaXMtbmRyLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL25kci1jb252ZXJ0ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUscUJBQXFCLEVBQXNCLE1BQU0saUJBQWlCLENBQUM7QUFLNUU7SUFHSSw2QkFBb0IsSUFBZ0IsRUFBeUMsU0FBNkI7UUFBdEYsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUF5QyxjQUFTLEdBQVQsU0FBUyxDQUFvQjtRQUZuRyxnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUdwQixJQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQyxjQUFjLEdBQUcsVUFBVSxDQUFDO0lBQzdELENBQUM7SUFFRCxxQ0FBTyxHQUFQLFVBQVEsR0FBYTtRQUNqQixJQUFJLE1BQU0sR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO1FBQzlCLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBQSxFQUFFLElBQUksT0FBQSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQTVDLENBQTRDLENBQUMsQ0FBQztRQUNoRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFJLElBQUksQ0FBQyxXQUFXLFNBQU0sRUFBRSxFQUFDLE1BQU0sUUFBQSxFQUFDLENBQUMsQ0FBQTtJQUM3RCxDQUFDO0lBRUQsNENBQWMsR0FBZDtRQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQWdCLElBQUksQ0FBQyxXQUFXLHFCQUFrQixDQUFDLENBQUE7SUFDM0UsQ0FBQztJQUVELHNDQUFRLEdBQVIsVUFBUyxJQUFZO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUksSUFBSSxDQUFDLFdBQVcsa0JBQWEsSUFBTSxFQUFFLEVBQUMsWUFBWSxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUE7SUFDeEYsQ0FBQztJQUVELHVDQUFTLEdBQVQ7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFjLElBQUksQ0FBQyxXQUFXLGdCQUFhLENBQUMsQ0FBQTtJQUNwRSxDQUFDO0lBRUQseUNBQVcsR0FBWDtRQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUksSUFBSSxDQUFDLFdBQVcsdUJBQW9CLENBQUMsQ0FBQTtJQUNqRSxDQUFDOztnQkF4QnlCLFVBQVU7Z0RBQUcsTUFBTSxTQUFDLHFCQUFxQjs7SUFIMUQsbUJBQW1CO1FBRC9CLFVBQVUsRUFBRTtRQUk4QixtQkFBQSxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQTtpREFBMUMsVUFBVTtPQUgzQixtQkFBbUIsQ0E0Qi9CO0lBQUQsMEJBQUM7Q0FBQSxBQTVCRCxJQTRCQztTQTVCWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFBhcmFtcyB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xuaW1wb3J0IHsgU0VSVkVSX0FQSV9VUkxfQ09ORklHLCBTZXJ2ZXJBcGlVcmxDb25maWcgfSBmcm9tIFwiQGxhbWlzL3dlYi1jb3JlXCI7XG5pbXBvcnQgeyBGYWNpbGl0eSB9IGZyb20gXCIuLi9jb21wb25lbnRzL25kci1jb252ZXJ0ZXIuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anNcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5kckNvbnZlcnRlclNlcnZpY2Uge1xuICAgIHB1YmxpYyByZXNvdXJjZVVybCA9ICcnO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBASW5qZWN0KFNFUlZFUl9BUElfVVJMX0NPTkZJRykgcHJpdmF0ZSBzZXJ2ZXJVcmw6IFNlcnZlckFwaVVybENvbmZpZykge1xuICAgICAgICB0aGlzLnJlc291cmNlVXJsID0gc2VydmVyVXJsLlNFUlZFUl9BUElfVVJMICsgJy9hcGkvbmRyJztcbiAgICB9XG5cbiAgICBjb252ZXJ0KGlkczogbnVtYmVyW10pIHtcbiAgICAgICAgbGV0IHBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKCk7XG4gICAgICAgIGlkcy5mb3JFYWNoKGlkID0+IHBhcmFtcyA9IHBhcmFtcy5hcHBlbmQoXCJpZHNcIiwgaWQudG9TdHJpbmcoKSkpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChgJHt0aGlzLnJlc291cmNlVXJsfS9ydW5gLCB7cGFyYW1zfSlcbiAgICB9XG5cbiAgICBsaXN0RmFjaWxpdGllcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8RmFjaWxpdHlbXT4oYCR7dGhpcy5yZXNvdXJjZVVybH0vbGlzdC1mYWNpbGl0aWVzYClcbiAgICB9XG5cbiAgICBkb3dubG9hZChuYW1lOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEJsb2I+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYCR7dGhpcy5yZXNvdXJjZVVybH0vZG93bmxvYWQvJHtuYW1lfWAsIHtyZXNwb25zZVR5cGU6ICdibG9iJ30pXG4gICAgfVxuXG4gICAgbGlzdEZpbGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxzdHJpbmdbXT4oYCR7dGhpcy5yZXNvdXJjZVVybH0vbGlzdC1maWxlc2ApXG4gICAgfVxuXG4gICAgZGVkdXBsaWNhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGAke3RoaXMucmVzb3VyY2VVcmx9L3JlbW92ZS1kdXBsaWNhdGVzYClcbiAgICB9XG59Il19