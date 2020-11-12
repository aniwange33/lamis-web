import * as tslib_1 from "tslib";
import {Inject, Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {DATE_FORMAT, SERVER_API_URL_CONFIG} from "@lamis/web-core";
import * as moment_ from 'moment';

var moment = moment_;
var RadetConverterService = /** @class */ (function () {
    function RadetConverterService(http, serverUrl) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.resourceUrl = '';
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/radet';
    }

    RadetConverterService.prototype.convert = function (start, end, reportingPeriod, ids, today) {
        var params = new HttpParams();
        params = params.append('cohortStart', moment(start).format(DATE_FORMAT));
        params = params.append('cohortEnd', moment(end).format(DATE_FORMAT));
        params = params.append('reportingPeriod', moment(reportingPeriod).format(DATE_FORMAT));
        params = params.append("today", today);
        ids.forEach(function (id) {
            return params = params.append("ids", id.toString());
        });
        return this.http.get(this.resourceUrl + "/convert", {params: params});
    };
    RadetConverterService.prototype.listFacilities = function () {
        return this.http.get(this.resourceUrl + "/list-facilities");
    };
    RadetConverterService.prototype.download = function (name) {
        return this.http.get(this.resourceUrl + "/download/" + name, {responseType: 'blob'});
    };
    RadetConverterService.prototype.listFiles = function () {
        return this.http.get(this.resourceUrl + "/list-files");
    };
    RadetConverterService.ctorParameters = function () {
        return [
            {type: HttpClient},
            {type: undefined, decorators: [{type: Inject, args: [SERVER_API_URL_CONFIG,]}]}
        ];
    };
    RadetConverterService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__param(1, Inject(SERVER_API_URL_CONFIG)),
        tslib_1.__metadata("design:paramtypes", [HttpClient, Object])
    ], RadetConverterService);
    return RadetConverterService;
}());
export {RadetConverterService};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkZXQtY29udmVydGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9yYWRldC0xLjEuMC8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9yYWRldC1jb252ZXJ0ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsV0FBVyxFQUFFLHFCQUFxQixFQUFzQixNQUFNLGlCQUFpQixDQUFDO0FBR3pGLE9BQU8sS0FBSyxPQUFPLE1BQU0sUUFBUSxDQUFDO0FBRWxDLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQztBQUd2QjtJQUdJLCtCQUFvQixJQUFnQixFQUF5QyxTQUE2QjtRQUF0RixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQXlDLGNBQVMsR0FBVCxTQUFTLENBQW9CO1FBRm5HLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBR3BCLElBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDLGNBQWMsR0FBRyxZQUFZLENBQUM7SUFDL0QsQ0FBQztJQUVELHVDQUFPLEdBQVAsVUFBUSxLQUFXLEVBQUUsR0FBUyxFQUFFLGVBQXFCLEVBQUUsR0FBYSxFQUFFLEtBQVU7UUFDNUUsSUFBSSxNQUFNLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztRQUM5QixNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ3pFLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDckUsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ3ZGLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN2QyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQUEsRUFBRSxJQUFJLE9BQUEsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUE1QyxDQUE0QyxDQUFDLENBQUM7UUFDaEUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBSSxJQUFJLENBQUMsV0FBVyxhQUFVLEVBQUUsRUFBQyxNQUFNLFFBQUEsRUFBQyxDQUFDLENBQUE7SUFDakUsQ0FBQztJQUVELDhDQUFjLEdBQWQ7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFnQixJQUFJLENBQUMsV0FBVyxxQkFBa0IsQ0FBQyxDQUFBO0lBQzNFLENBQUM7SUFFRCx3Q0FBUSxHQUFSLFVBQVMsSUFBWTtRQUNqQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFJLElBQUksQ0FBQyxXQUFXLGtCQUFhLElBQU0sRUFBRSxFQUFDLFlBQVksRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFBO0lBQ3hGLENBQUM7SUFFRCx5Q0FBUyxHQUFUO1FBQ0ksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBYyxJQUFJLENBQUMsV0FBVyxnQkFBYSxDQUFDLENBQUE7SUFDcEUsQ0FBQzs7Z0JBeEJ5QixVQUFVO2dEQUFHLE1BQU0sU0FBQyxxQkFBcUI7O0lBSDFELHFCQUFxQjtRQURqQyxVQUFVLEVBQUU7UUFJOEIsbUJBQUEsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUE7aURBQTFDLFVBQVU7T0FIM0IscUJBQXFCLENBNEJqQztJQUFELDRCQUFDO0NBQUEsQUE1QkQsSUE0QkM7U0E1QlkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBQYXJhbXMgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcbmltcG9ydCB7IERBVEVfRk9STUFULCBTRVJWRVJfQVBJX1VSTF9DT05GSUcsIFNlcnZlckFwaVVybENvbmZpZyB9IGZyb20gXCJAbGFtaXMvd2ViLWNvcmVcIjtcbmltcG9ydCB7IEZhY2lsaXR5IH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvcmFkZXQtY29udmVydGVyLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XG5cbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBSYWRldENvbnZlcnRlclNlcnZpY2Uge1xuICAgIHB1YmxpYyByZXNvdXJjZVVybCA9ICcnO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBASW5qZWN0KFNFUlZFUl9BUElfVVJMX0NPTkZJRykgcHJpdmF0ZSBzZXJ2ZXJVcmw6IFNlcnZlckFwaVVybENvbmZpZykge1xuICAgICAgICB0aGlzLnJlc291cmNlVXJsID0gc2VydmVyVXJsLlNFUlZFUl9BUElfVVJMICsgJy9hcGkvcmFkZXQnO1xuICAgIH1cblxuICAgIGNvbnZlcnQoc3RhcnQ6IERhdGUsIGVuZDogRGF0ZSwgcmVwb3J0aW5nUGVyaW9kOiBEYXRlLCBpZHM6IG51bWJlcltdLCB0b2RheTogYW55KSB7XG4gICAgICAgIGxldCBwYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpO1xuICAgICAgICBwYXJhbXMgPSBwYXJhbXMuYXBwZW5kKCdjb2hvcnRTdGFydCcsIG1vbWVudChzdGFydCkuZm9ybWF0KERBVEVfRk9STUFUKSk7XG4gICAgICAgIHBhcmFtcyA9IHBhcmFtcy5hcHBlbmQoJ2NvaG9ydEVuZCcsIG1vbWVudChlbmQpLmZvcm1hdChEQVRFX0ZPUk1BVCkpO1xuICAgICAgICBwYXJhbXMgPSBwYXJhbXMuYXBwZW5kKCdyZXBvcnRpbmdQZXJpb2QnLCBtb21lbnQocmVwb3J0aW5nUGVyaW9kKS5mb3JtYXQoREFURV9GT1JNQVQpKTtcbiAgICAgICAgcGFyYW1zID0gcGFyYW1zLmFwcGVuZChcInRvZGF5XCIsIHRvZGF5KTtcbiAgICAgICAgaWRzLmZvckVhY2goaWQgPT4gcGFyYW1zID0gcGFyYW1zLmFwcGVuZChcImlkc1wiLCBpZC50b1N0cmluZygpKSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGAke3RoaXMucmVzb3VyY2VVcmx9L2NvbnZlcnRgLCB7cGFyYW1zfSlcbiAgICB9XG5cbiAgICBsaXN0RmFjaWxpdGllcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8RmFjaWxpdHlbXT4oYCR7dGhpcy5yZXNvdXJjZVVybH0vbGlzdC1mYWNpbGl0aWVzYClcbiAgICB9XG5cbiAgICBkb3dubG9hZChuYW1lOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEJsb2I+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYCR7dGhpcy5yZXNvdXJjZVVybH0vZG93bmxvYWQvJHtuYW1lfWAsIHtyZXNwb25zZVR5cGU6ICdibG9iJ30pXG4gICAgfVxuXG4gICAgbGlzdEZpbGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxzdHJpbmdbXT4oYCR7dGhpcy5yZXNvdXJjZVVybH0vbGlzdC1maWxlc2ApXG4gICAgfVxufVxuIl19
