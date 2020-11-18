import * as tslib_1 from "tslib";
import { Inject, Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { DATE_FORMAT, SERVER_API_URL_CONFIG } from "@lamis/web-core";
import * as moment_ from 'moment';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@lamis/web-core";
var moment = moment_;
var RadetConverterService = /** @class */ (function () {
    function RadetConverterService(http, serverUrl) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.resourceUrl = '';
        this.prepResourceUrl = '';
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/radet';
        this.prepResourceUrl = serverUrl.SERVER_API_URL + '/api/prep';
    }
    RadetConverterService.prototype.convert = function (start, end, reportingPeriod, ids, today) {
        var params = new HttpParams();
        params = params.append('cohortStart', moment(start).format(DATE_FORMAT));
        params = params.append('cohortEnd', moment(end).format(DATE_FORMAT));
        params = params.append('reportingPeriod', moment(reportingPeriod).format(DATE_FORMAT));
        params = params.append("today", today);
        ids.forEach(function (id) { return params = params.append("ids", id.toString()); });
        return this.http.get(this.resourceUrl + "/convert", { params: params });
    };
    RadetConverterService.prototype.listFacilities = function () {
        return this.http.get(this.resourceUrl + "/list-facilities");
    };
    RadetConverterService.prototype.download = function (name) {
        return this.http.get(this.resourceUrl + "/download/" + name, { responseType: 'blob' });
    };
    RadetConverterService.prototype.listFiles = function () {
        return this.http.get(this.resourceUrl + "/list-files");
    };
    RadetConverterService.prototype.convertPrep = function (start, end, reportingPeriod, ids, today) {
        var params = new HttpParams();
        params = params.append('cohortStart', moment(start).format(DATE_FORMAT));
        params = params.append('cohortEnd', moment(end).format(DATE_FORMAT));
        params = params.append('reportingPeriod', moment(reportingPeriod).format(DATE_FORMAT));
        params = params.append("today", today);
        ids.forEach(function (id) { return params = params.append("ids", id.toString()); });
        return this.http.get(this.prepResourceUrl + "/convert", { params: params });
    };
    RadetConverterService.prototype.downloadPrepFile = function (name) {
        return this.http.get(this.prepResourceUrl + "/download/" + name, { responseType: 'blob' });
    };
    RadetConverterService.prototype.listPrepFiles = function () {
        return this.http.get(this.prepResourceUrl + "/list-files");
    };
    RadetConverterService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: undefined, decorators: [{ type: Inject, args: [SERVER_API_URL_CONFIG,] }] }
    ]; };
    RadetConverterService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function RadetConverterService_Factory() { return new RadetConverterService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.SERVER_API_URL_CONFIG)); }, token: RadetConverterService, providedIn: "root" });
    RadetConverterService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__param(1, Inject(SERVER_API_URL_CONFIG)),
        tslib_1.__metadata("design:paramtypes", [HttpClient, Object])
    ], RadetConverterService);
    return RadetConverterService;
}());
export { RadetConverterService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkZXQtY29udmVydGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9yYWRldC0xLjQuMC8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9yYWRldC1jb252ZXJ0ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUM1RCxPQUFPLEVBQUMsV0FBVyxFQUFFLHFCQUFxQixFQUFxQixNQUFNLGlCQUFpQixDQUFDO0FBR3ZGLE9BQU8sS0FBSyxPQUFPLE1BQU0sUUFBUSxDQUFDOzs7O0FBRWxDLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQztBQUt2QjtJQUlJLCtCQUFvQixJQUFnQixFQUF5QyxTQUE2QjtRQUF0RixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQXlDLGNBQVMsR0FBVCxTQUFTLENBQW9CO1FBSG5HLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLG9CQUFlLEdBQUcsRUFBRSxDQUFDO1FBR3hCLElBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDLGNBQWMsR0FBRyxZQUFZLENBQUM7UUFDM0QsSUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUMsY0FBYyxHQUFHLFdBQVcsQ0FBQztJQUNsRSxDQUFDO0lBRUQsdUNBQU8sR0FBUCxVQUFRLEtBQVcsRUFBRSxHQUFTLEVBQUUsZUFBcUIsRUFBRSxHQUFhLEVBQUUsS0FBVTtRQUM1RSxJQUFJLE1BQU0sR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO1FBQzlCLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDekUsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMs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cUJBQXFCOzs7SUFKMUQscUJBQXFCO1FBSGpDLFVBQVUsQ0FBQztZQUNSLFVBQVUsRUFBRSxNQUFNO1NBQ3JCLENBQUM7UUFLeUMsbUJBQUEsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUE7aURBQTFDLFVBQVU7T0FKM0IscUJBQXFCLENBZ0RqQztnQ0E1REQ7Q0E0REMsQUFoREQsSUFnREM7U0FoRFkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGV9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0h0dHBDbGllbnQsIEh0dHBQYXJhbXN9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xuaW1wb3J0IHtEQVRFX0ZPUk1BVCwgU0VSVkVSX0FQSV9VUkxfQ09ORklHLCBTZXJ2ZXJBcGlVcmxDb25maWd9IGZyb20gXCJAbGFtaXMvd2ViLWNvcmVcIjtcbmltcG9ydCB7RmFjaWxpdHl9IGZyb20gXCIuLi9jb21wb25lbnRzL3JhZGV0L3JhZGV0LWNvbnZlcnRlci5jb21wb25lbnRcIjtcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcblxuY29uc3QgbW9tZW50ID0gbW9tZW50XztcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBSYWRldENvbnZlcnRlclNlcnZpY2Uge1xuICAgIHB1YmxpYyByZXNvdXJjZVVybCA9ICcnO1xuICAgIHB1YmxpYyBwcmVwUmVzb3VyY2VVcmwgPSAnJztcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCwgQEluamVjdChTRVJWRVJfQVBJX1VSTF9DT05GSUcpIHByaXZhdGUgc2VydmVyVXJsOiBTZXJ2ZXJBcGlVcmxDb25maWcpIHtcbiAgICAgICAgdGhpcy5yZXNvdXJjZVVybCA9IHNlcnZlclVybC5TRVJWRVJfQVBJX1VSTCArICcvYXBpL3JhZGV0JztcbiAgICAgICAgdGhpcy5wcmVwUmVzb3VyY2VVcmwgPSBzZXJ2ZXJVcmwuU0VSVkVSX0FQSV9VUkwgKyAnL2FwaS9wcmVwJztcbiAgICB9XG5cbiAgICBjb252ZXJ0KHN0YXJ0OiBEYXRlLCBlbmQ6IERhdGUsIHJlcG9ydGluZ1BlcmlvZDogRGF0ZSwgaWRzOiBudW1iZXJbXSwgdG9kYXk6IGFueSkge1xuICAgICAgICBsZXQgcGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKTtcbiAgICAgICAgcGFyYW1zID0gcGFyYW1zLmFwcGVuZCgnY29ob3J0U3RhcnQnLCBtb21lbnQoc3RhcnQpLmZvcm1hdChEQVRFX0ZPUk1BVCkpO1xuICAgICAgICBwYXJhbXMgPSBwYXJhbXMuYXBwZW5kKCdjb2hvcnRFbmQnLCBtb21lbnQoZW5kKS5mb3JtYXQoREFURV9GT1JNQVQpKTtcbiAgICAgICAgcGFyYW1zID0gcGFyYW1zLmFwcGVuZCgncmVwb3J0aW5nUGVyaW9kJywgbW9tZW50KHJlcG9ydGluZ1BlcmlvZCkuZm9ybWF0KERBVEVfRk9STUFUKSk7XG4gICAgICAgIHBhcmFtcyA9IHBhcmFtcy5hcHBlbmQoXCJ0b2RheVwiLCB0b2RheSk7XG4gICAgICAgIGlkcy5mb3JFYWNoKGlkID0+IHBhcmFtcyA9IHBhcmFtcy5hcHBlbmQoXCJpZHNcIiwgaWQudG9TdHJpbmcoKSkpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChgJHt0aGlzLnJlc291cmNlVXJsfS9jb252ZXJ0YCwge3BhcmFtc30pXG4gICAgfVxuXG4gICAgbGlzdEZhY2lsaXRpZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PEZhY2lsaXR5W10+KGAke3RoaXMucmVzb3VyY2VVcmx9L2xpc3QtZmFjaWxpdGllc2ApXG4gICAgfVxuXG4gICAgZG93bmxvYWQobmFtZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxCbG9iPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGAke3RoaXMucmVzb3VyY2VVcmx9L2Rvd25sb2FkLyR7bmFtZX1gLCB7cmVzcG9uc2VUeXBlOiAnYmxvYid9KVxuICAgIH1cblxuICAgIGxpc3RGaWxlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8c3RyaW5nW10+KGAke3RoaXMucmVzb3VyY2VVcmx9L2xpc3QtZmlsZXNgKVxuICAgIH1cblxuICAgIGNvbnZlcnRQcmVwKHN0YXJ0OiBEYXRlLCBlbmQ6IERhdGUsIHJlcG9ydGluZ1BlcmlvZDogRGF0ZSwgaWRzOiBudW1iZXJbXSwgdG9kYXk6IGFueSkge1xuICAgICAgICBsZXQgcGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKTtcbiAgICAgICAgcGFyYW1zID0gcGFyYW1zLmFwcGVuZCgnY29ob3J0U3RhcnQnLCBtb21lbnQoc3RhcnQpLmZvcm1hdChEQVRFX0ZPUk1BVCkpO1xuICAgICAgICBwYXJhbXMgPSBwYXJhbXMuYXBwZW5kKCdjb2hvcnRFbmQnLCBtb21lbnQoZW5kKS5mb3JtYXQoREFURV9GT1JNQVQpKTtcbiAgICAgICAgcGFyYW1zID0gcGFyYW1zLmFwcGVuZCgncmVwb3J0aW5nUGVyaW9kJywgbW9tZW50KHJlcG9ydGluZ1BlcmlvZCkuZm9ybWF0KERBVEVfRk9STUFUKSk7XG4gICAgICAgIHBhcmFtcyA9IHBhcmFtcy5hcHBlbmQoXCJ0b2RheVwiLCB0b2RheSk7XG4gICAgICAgIGlkcy5mb3JFYWNoKGlkID0+IHBhcmFtcyA9IHBhcmFtcy5hcHBlbmQoXCJpZHNcIiwgaWQudG9TdHJpbmcoKSkpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChgJHt0aGlzLnByZXBSZXNvdXJjZVVybH0vY29udmVydGAsIHtwYXJhbXN9KVxuICAgIH1cblxuICAgIGRvd25sb2FkUHJlcEZpbGUobmFtZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxCbG9iPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGAke3RoaXMucHJlcFJlc291cmNlVXJsfS9kb3dubG9hZC8ke25hbWV9YCwge3Jlc3BvbnNlVHlwZTogJ2Jsb2InfSlcbiAgICB9XG5cbiAgICBsaXN0UHJlcEZpbGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxzdHJpbmdbXT4oYCR7dGhpcy5wcmVwUmVzb3VyY2VVcmx9L2xpc3QtZmlsZXNgKVxuICAgIH1cbn1cbiJdfQ==