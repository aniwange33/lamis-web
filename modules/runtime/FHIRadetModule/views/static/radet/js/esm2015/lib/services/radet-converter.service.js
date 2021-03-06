import * as tslib_1 from "tslib";
import { Inject, Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { DATE_FORMAT, SERVER_API_URL_CONFIG } from "@lamis/web-core";
import * as moment_ from 'moment';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@lamis/web-core";
const moment = moment_;
let RadetConverterService = class RadetConverterService {
    constructor(http, serverUrl) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.resourceUrl = '';
        this.prepResourceUrl = '';
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/radet';
        this.prepResourceUrl = serverUrl.SERVER_API_URL + '/api/prep';
    }
    convert(start, end, reportingPeriod, ids, today) {
        let params = new HttpParams();
        params = params.append('cohortStart', moment(start).format(DATE_FORMAT));
        params = params.append('cohortEnd', moment(end).format(DATE_FORMAT));
        params = params.append('reportingPeriod', moment(reportingPeriod).format(DATE_FORMAT));
        params = params.append("today", today);
        ids.forEach(id => params = params.append("ids", id.toString()));
        return this.http.get(`${this.resourceUrl}/convert`, { params });
    }
    listFacilities() {
        return this.http.get(`${this.resourceUrl}/list-facilities`);
    }
    download(name) {
        return this.http.get(`${this.resourceUrl}/download/${name}`, { responseType: 'blob' });
    }
    listFiles() {
        return this.http.get(`${this.resourceUrl}/list-files`);
    }
    convertPrep(start, end, reportingPeriod, ids, today) {
        let params = new HttpParams();
        params = params.append('cohortStart', moment(start).format(DATE_FORMAT));
        params = params.append('cohortEnd', moment(end).format(DATE_FORMAT));
        params = params.append('reportingPeriod', moment(reportingPeriod).format(DATE_FORMAT));
        params = params.append("today", today);
        ids.forEach(id => params = params.append("ids", id.toString()));
        return this.http.get(`${this.prepResourceUrl}/convert`, { params });
    }
    downloadPrepFile(name) {
        return this.http.get(`${this.prepResourceUrl}/download/${name}`, { responseType: 'blob' });
    }
    listPrepFiles() {
        return this.http.get(`${this.prepResourceUrl}/list-files`);
    }
};
RadetConverterService.ctorParameters = () => [
    { type: HttpClient },
    { type: undefined, decorators: [{ type: Inject, args: [SERVER_API_URL_CONFIG,] }] }
];
RadetConverterService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function RadetConverterService_Factory() { return new RadetConverterService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.SERVER_API_URL_CONFIG)); }, token: RadetConverterService, providedIn: "root" });
RadetConverterService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__param(1, Inject(SERVER_API_URL_CONFIG)),
    tslib_1.__metadata("design:paramtypes", [HttpClient, Object])
], RadetConverterService);
export { RadetConverterService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkZXQtY29udmVydGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9yYWRldC0xLjQuMC8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9yYWRldC1jb252ZXJ0ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUM1RCxPQUFPLEVBQUMsV0FBVyxFQUFFLHFCQUFxQixFQUFxQixNQUFNLGlCQUFpQixDQUFDO0FBR3ZGLE9BQU8sS0FBSyxPQUFPLE1BQU0sUUFBUSxDQUFDOzs7O0FBRWxDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQztBQUt2QixJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFxQjtJQUk5QixZQUFvQixJQUFnQixFQUF5QyxTQUE2QjtRQUF0RixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQXlDLGNBQVMsR0FBVCxTQUFTLENBQW9CO1FBSG5HLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLG9CQUFlLEdBQUcsRUFBRSxDQUFDO1FBR3hCLElBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDLGNBQWMsR0FBRyxZQUFZLENBQUM7UUFDM0QsSUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUMsY0FBYyxHQUFHLFdBQVcsQ0FBQztJQUNsRSxDQUFDO0lBRUQsT0FBTyxDQUFDLEtBQVcsRUFBRSxHQUFTLEVBQUUsZUFBcUIsRUFBRSxHQUFhLEVBQUUsS0FBVTtRQUM1RSxJQUFJLE1BQU0sR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO1FBQzlCLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDekUsTUFBTSxH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QyxxQkFBcUI7OztBQUoxRCxxQkFBcUI7SUFIakMsVUFBVSxDQUFDO1FBQ1IsVUFBVSxFQUFFLE1BQU07S0FDckIsQ0FBQztJQUt5QyxtQkFBQSxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQTs2Q0FBMUMsVUFBVTtHQUozQixxQkFBcUIsQ0FnRGpDO1NBaERZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtIdHRwQ2xpZW50LCBIdHRwUGFyYW1zfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcbmltcG9ydCB7REFURV9GT1JNQVQsIFNFUlZFUl9BUElfVVJMX0NPTkZJRywgU2VydmVyQXBpVXJsQ29uZmlnfSBmcm9tIFwiQGxhbWlzL3dlYi1jb3JlXCI7XG5pbXBvcnQge0ZhY2lsaXR5fSBmcm9tIFwiLi4vY29tcG9uZW50cy9yYWRldC9yYWRldC1jb252ZXJ0ZXIuY29tcG9uZW50XCI7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XG5cbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgUmFkZXRDb252ZXJ0ZXJTZXJ2aWNlIHtcbiAgICBwdWJsaWMgcmVzb3VyY2VVcmwgPSAnJztcbiAgICBwdWJsaWMgcHJlcFJlc291cmNlVXJsID0gJyc7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsIEBJbmplY3QoU0VSVkVSX0FQSV9VUkxfQ09ORklHKSBwcml2YXRlIHNlcnZlclVybDogU2VydmVyQXBpVXJsQ29uZmlnKSB7XG4gICAgICAgIHRoaXMucmVzb3VyY2VVcmwgPSBzZXJ2ZXJVcmwuU0VSVkVSX0FQSV9VUkwgKyAnL2FwaS9yYWRldCc7XG4gICAgICAgIHRoaXMucHJlcFJlc291cmNlVXJsID0gc2VydmVyVXJsLlNFUlZFUl9BUElfVVJMICsgJy9hcGkvcHJlcCc7XG4gICAgfVxuXG4gICAgY29udmVydChzdGFydDogRGF0ZSwgZW5kOiBEYXRlLCByZXBvcnRpbmdQZXJpb2Q6IERhdGUsIGlkczogbnVtYmVyW10sIHRvZGF5OiBhbnkpIHtcbiAgICAgICAgbGV0IHBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKCk7XG4gICAgICAgIHBhcmFtcyA9IHBhcmFtcy5hcHBlbmQoJ2NvaG9ydFN0YXJ0JywgbW9tZW50KHN0YXJ0KS5mb3JtYXQoREFURV9GT1JNQVQpKTtcbiAgICAgICAgcGFyYW1zID0gcGFyYW1zLmFwcGVuZCgnY29ob3J0RW5kJywgbW9tZW50KGVuZCkuZm9ybWF0KERBVEVfRk9STUFUKSk7XG4gICAgICAgIHBhcmFtcyA9IHBhcmFtcy5hcHBlbmQoJ3JlcG9ydGluZ1BlcmlvZCcsIG1vbWVudChyZXBvcnRpbmdQZXJpb2QpLmZvcm1hdChEQVRFX0ZPUk1BVCkpO1xuICAgICAgICBwYXJhbXMgPSBwYXJhbXMuYXBwZW5kKFwidG9kYXlcIiwgdG9kYXkpO1xuICAgICAgICBpZHMuZm9yRWFjaChpZCA9PiBwYXJhbXMgPSBwYXJhbXMuYXBwZW5kKFwiaWRzXCIsIGlkLnRvU3RyaW5nKCkpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYCR7dGhpcy5yZXNvdXJjZVVybH0vY29udmVydGAsIHtwYXJhbXN9KVxuICAgIH1cblxuICAgIGxpc3RGYWNpbGl0aWVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxGYWNpbGl0eVtdPihgJHt0aGlzLnJlc291cmNlVXJsfS9saXN0LWZhY2lsaXRpZXNgKVxuICAgIH1cblxuICAgIGRvd25sb2FkKG5hbWU6IHN0cmluZyk6IE9ic2VydmFibGU8QmxvYj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChgJHt0aGlzLnJlc291cmNlVXJsfS9kb3dubG9hZC8ke25hbWV9YCwge3Jlc3BvbnNlVHlwZTogJ2Jsb2InfSlcbiAgICB9XG5cbiAgICBsaXN0RmlsZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PHN0cmluZ1tdPihgJHt0aGlzLnJlc291cmNlVXJsfS9saXN0LWZpbGVzYClcbiAgICB9XG5cbiAgICBjb252ZXJ0UHJlcChzdGFydDogRGF0ZSwgZW5kOiBEYXRlLCByZXBvcnRpbmdQZXJpb2Q6IERhdGUsIGlkczogbnVtYmVyW10sIHRvZGF5OiBhbnkpIHtcbiAgICAgICAgbGV0IHBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKCk7XG4gICAgICAgIHBhcmFtcyA9IHBhcmFtcy5hcHBlbmQoJ2NvaG9ydFN0YXJ0JywgbW9tZW50KHN0YXJ0KS5mb3JtYXQoREFURV9GT1JNQVQpKTtcbiAgICAgICAgcGFyYW1zID0gcGFyYW1zLmFwcGVuZCgnY29ob3J0RW5kJywgbW9tZW50KGVuZCkuZm9ybWF0KERBVEVfRk9STUFUKSk7XG4gICAgICAgIHBhcmFtcyA9IHBhcmFtcy5hcHBlbmQoJ3JlcG9ydGluZ1BlcmlvZCcsIG1vbWVudChyZXBvcnRpbmdQZXJpb2QpLmZvcm1hdChEQVRFX0ZPUk1BVCkpO1xuICAgICAgICBwYXJhbXMgPSBwYXJhbXMuYXBwZW5kKFwidG9kYXlcIiwgdG9kYXkpO1xuICAgICAgICBpZHMuZm9yRWFjaChpZCA9PiBwYXJhbXMgPSBwYXJhbXMuYXBwZW5kKFwiaWRzXCIsIGlkLnRvU3RyaW5nKCkpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYCR7dGhpcy5wcmVwUmVzb3VyY2VVcmx9L2NvbnZlcnRgLCB7cGFyYW1zfSlcbiAgICB9XG5cbiAgICBkb3dubG9hZFByZXBGaWxlKG5hbWU6IHN0cmluZyk6IE9ic2VydmFibGU8QmxvYj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChgJHt0aGlzLnByZXBSZXNvdXJjZVVybH0vZG93bmxvYWQvJHtuYW1lfWAsIHtyZXNwb25zZVR5cGU6ICdibG9iJ30pXG4gICAgfVxuXG4gICAgbGlzdFByZXBGaWxlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8c3RyaW5nW10+KGAke3RoaXMucHJlcFJlc291cmNlVXJsfS9saXN0LWZpbGVzYClcbiAgICB9XG59XG4iXX0=