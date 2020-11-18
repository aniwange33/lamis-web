import * as tslib_1 from "tslib";
import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { DATE_FORMAT, SERVER_API_URL_CONFIG } from '@lamis/web-core';
import { map } from 'rxjs/operators';
import * as moment_ from 'moment';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@lamis/web-core";
var moment = moment_;
var LaboratoryService = /** @class */ (function () {
    function LaboratoryService(http, serverUrl) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.resourceUrl = '';
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/laboratories';
    }
    LaboratoryService.prototype.create = function (laboratory) {
        var _this = this;
        var copy = this.convertDateFromClient(laboratory);
        return this.http
            .post(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map(function (res) { return _this.convertDateFromServer(res); }));
    };
    LaboratoryService.prototype.update = function (laboratory) {
        var _this = this;
        var copy = this.convertDateFromClient(laboratory);
        return this.http
            .put(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map(function (res) { return _this.convertDateFromServer(res); }));
    };
    LaboratoryService.prototype.find = function (id) {
        var _this = this;
        return this.http
            .get(this.resourceUrl + "/" + id, { observe: 'response' })
            .pipe(map(function (res) { return _this.convertDateFromServer(res); }));
    };
    LaboratoryService.prototype.findByUuid = function (id) {
        var _this = this;
        return this.http
            .get(this.resourceUrl + "/by-uuid/" + id, { observe: 'response' })
            .pipe(map(function (res) { return _this.convertDateFromServer(res); }));
    };
    LaboratoryService.prototype.delete = function (id) {
        return this.http.delete(this.resourceUrl + "/" + id, { observe: 'response' });
    };
    LaboratoryService.prototype.getPatient = function (id) {
        return this.http.get("/api/patients/by-uuid/" + id, { observe: 'body' })
            .pipe(map(function (res) {
            if (res) {
                res.dateRegistration = res.dateRegistration != null ? moment(res.dateRegistration) : null;
            }
            return res;
        }));
    };
    LaboratoryService.prototype.getVisitDatesByPatient = function (patientId) {
        return this.http.get(this.resourceUrl + "/patient/" + patientId + "/report-dates")
            .pipe(map(function (res) {
            res.forEach(function (d) { return moment(d); });
            return res;
        }));
    };
    LaboratoryService.prototype.laboratoryCategories = function () {
        return this.http.get(this.resourceUrl + "/test-categories");
    };
    LaboratoryService.prototype.getLinesByLaboratory = function (laboratoryId) {
        return this.http.get(this.resourceUrl + "/" + laboratoryId + "/lines");
    };
    LaboratoryService.prototype.labTestsByCategory = function (id) {
        return this.http.get(this.resourceUrl + "/lab-tests/category/" + id);
    };
    LaboratoryService.prototype.getLabTestById = function (id) {
        return this.http.get(this.resourceUrl + "/lab-test/" + id);
    };
    LaboratoryService.prototype.latestVisit = function (patientId) {
        return this.http.get(this.resourceUrl + "/patient/" + patientId + "/latest");
    };
    LaboratoryService.prototype.convertDateFromClient = function (laboratory) {
        var copy = Object.assign({}, laboratory, {
            dateResultReceived: laboratory.dateResultReceived != null && laboratory.dateResultReceived.isValid() ? laboratory.dateResultReceived.format(DATE_FORMAT) : null,
            dateAssay: laboratory.dateAssay != null && laboratory.dateAssay.isValid() ? laboratory.dateAssay.format(DATE_FORMAT) : null,
            dateSampleCollected: laboratory.dateSampleCollected != null && laboratory.dateSampleCollected.isValid() ? laboratory.dateSampleCollected.format(DATE_FORMAT) : null
        });
        return copy;
    };
    LaboratoryService.prototype.convertDateFromServer = function (res) {
        if (res.body) {
            res.body.dateSampleCollected = res.body.dateSampleCollected != null ? moment(res.body.dateSampleCollected) : null;
            res.body.dateResultReceived = res.body.dateResultReceived != null ? moment(res.body.dateResultReceived) : null;
            res.body.dateAssay = res.body.dateAssay != null ? moment(res.body.dateAssay) : null;
        }
        return res;
    };
    LaboratoryService.prototype.convertDateArrayFromServer = function (res) {
        if (res.body) {
            res.body.forEach(function (laboratory) {
                laboratory.dateResultReceived = laboratory.dateResultReceived != null ? moment(laboratory.dateResultReceived) : null;
                laboratory.dateAssay = laboratory.dateAssay != null ? moment(laboratory.dateAssay) : null;
                laboratory.dateSampleCollected = laboratory.dateSampleCollected != null ? moment(laboratory.dateSampleCollected) : null;
                1;
            });
        }
        return res;
    };
    LaboratoryService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: undefined, decorators: [{ type: Inject, args: [SERVER_API_URL_CONFIG,] }] }
    ]; };
    LaboratoryService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function LaboratoryService_Factory() { return new LaboratoryService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.SERVER_API_URL_CONFIG)); }, token: LaboratoryService, providedIn: "root" });
    LaboratoryService = tslib_1.__decorate([
        Injectable({ providedIn: 'root' }),
        tslib_1.__param(1, Inject(SERVER_API_URL_CONFIG)),
        tslib_1.__metadata("design:paramtypes", [HttpClient, Object])
    ], LaboratoryService);
    return LaboratoryService;
}());
export { LaboratoryService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFib3JhdG9yeS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGFtaXMtbGFib3JhdG9yeS0xLjQuMC8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9sYWJvcmF0b3J5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFaEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxxQkFBcUIsRUFBc0IsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RixPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7Ozs7QUFHbEMsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDO0FBTXZCO0lBR0ksMkJBQXNCLElBQWdCLEVBQXlDLFNBQTZCO1FBQXRGLFNBQUksR0FBSixJQUFJLENBQVk7UUFBeUMsY0FBUyxHQUFULFNBQVMsQ0FBb0I7UUFGckcsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFHcEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUMsY0FBYyxHQUFHLG1CQUFtQixDQUFDO0lBQ3RFLENBQUM7SUFFRCxrQ0FBTSxHQUFOLFVBQU8sVUFBc0I7UUFBN0IsaUJBS0M7UUFKRyxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDcEQsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNYLElBQUksQ0FBYSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUMsQ0FBQzthQUMvRCxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUMsR0FBdUIsSUFBSyxPQUFBLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsRUFBL0Is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QyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNySCxVQUFVLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQzFGLFVBQVUsQ0FBQyxtQkFBbUIsR0FBRyxVQUFVLENBQUMsbUJBQW1CLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDeEgsQ0FBQyxDQUFDO1lBQ04sQ0FBQyxDQUFDLENBQUM7U0FDTjtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQzs7Z0JBckcyQixVQUFVO2dEQUFHLE1BQU0sU0FBQyxxQkFBcUI7OztJQUg1RCxpQkFBaUI7UUFEN0IsVUFBVSxDQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQyxDQUFDO1FBSVksbUJBQUEsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUE7aURBQTFDLFVBQVU7T0FIN0IsaUJBQWlCLENBeUc3Qjs0QkF4SEQ7Q0F3SEMsQUF6R0QsSUF5R0M7U0F6R1ksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEQVRFX0ZPUk1BVCwgU0VSVkVSX0FQSV9VUkxfQ09ORklHLCBTZXJ2ZXJBcGlVcmxDb25maWcgfSBmcm9tICdAbGFtaXMvd2ViLWNvcmUnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTGFib3JhdG9yeSwgTGFib3JhdG9yeUxpbmUsIExhYlRlc3QsIExhYlRlc3RDYXRlZ29yeSwgUGF0aWVudCB9IGZyb20gJy4uL21vZGVsL2xhYm9yYXRvcnkubW9kZWwnO1xuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgTW9tZW50IH0gZnJvbSAnbW9tZW50JztcblxuY29uc3QgbW9tZW50ID0gbW9tZW50XztcblxudHlwZSBFbnRpdHlSZXNwb25zZVR5cGUgPSBIdHRwUmVzcG9uc2U8TGFib3JhdG9yeT47XG50eXBlIEVudGl0eUFycmF5UmVzcG9uc2VUeXBlID0gSHR0cFJlc3BvbnNlPExhYm9yYXRvcnlbXT47XG5cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIExhYm9yYXRvcnlTZXJ2aWNlIHtcbiAgICBwdWJsaWMgcmVzb3VyY2VVcmwgPSAnJztcblxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBodHRwOiBIdHRwQ2xpZW50LCBASW5qZWN0KFNFUlZFUl9BUElfVVJMX0NPTkZJRykgcHJpdmF0ZSBzZXJ2ZXJVcmw6IFNlcnZlckFwaVVybENvbmZpZykge1xuICAgICAgICB0aGlzLnJlc291cmNlVXJsID0gc2VydmVyVXJsLlNFUlZFUl9BUElfVVJMICsgJy9hcGkvbGFib3JhdG9yaWVzJztcbiAgICB9XG5cbiAgICBjcmVhdGUobGFib3JhdG9yeTogTGFib3JhdG9yeSk6IE9ic2VydmFibGU8RW50aXR5UmVzcG9uc2VUeXBlPiB7XG4gICAgICAgIGNvbnN0IGNvcHkgPSB0aGlzLmNvbnZlcnREYXRlRnJvbUNsaWVudChsYWJvcmF0b3J5KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgICAgICAgLnBvc3Q8TGFib3JhdG9yeT4odGhpcy5yZXNvdXJjZVVybCwgY29weSwge29ic2VydmU6ICdyZXNwb25zZSd9KVxuICAgICAgICAgICAgLnBpcGUobWFwKChyZXM6IEVudGl0eVJlc3BvbnNlVHlwZSkgPT4gdGhpcy5jb252ZXJ0RGF0ZUZyb21TZXJ2ZXIocmVzKSkpO1xuICAgIH1cblxuICAgIHVwZGF0ZShsYWJvcmF0b3J5OiBMYWJvcmF0b3J5KTogT2JzZXJ2YWJsZTxFbnRpdHlSZXNwb25zZVR5cGU+IHtcbiAgICAgICAgY29uc3QgY29weSA9IHRoaXMuY29udmVydERhdGVGcm9tQ2xpZW50KGxhYm9yYXRvcnkpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAgICAgICAucHV0PExhYm9yYXRvcnk+KHRoaXMucmVzb3VyY2VVcmwsIGNvcHksIHtvYnNlcnZlOiAncmVzcG9uc2UnfSlcbiAgICAgICAgICAgIC5waXBlKG1hcCgocmVzOiBFbnRpdHlSZXNwb25zZVR5cGUpID0+IHRoaXMuY29udmVydERhdGVGcm9tU2VydmVyKHJlcykpKTtcbiAgICB9XG5cbiAgICBmaW5kKGlkOiBudW1iZXIpOiBPYnNlcnZhYmxlPEVudGl0eVJlc3BvbnNlVHlwZT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAgICAgICAuZ2V0PExhYm9yYXRvcnk+KGAke3RoaXMucmVzb3VyY2VVcmx9LyR7aWR9YCwge29ic2VydmU6ICdyZXNwb25zZSd9KVxuICAgICAgICAgICAgLnBpcGUobWFwKChyZXM6IEVudGl0eVJlc3BvbnNlVHlwZSkgPT4gdGhpcy5jb252ZXJ0RGF0ZUZyb21TZXJ2ZXIocmVzKSkpO1xuICAgIH1cblxuICAgIGZpbmRCeVV1aWQoaWQ6IHN0cmluZyk6IE9ic2VydmFibGU8RW50aXR5UmVzcG9uc2VUeXBlPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgICAgICAgIC5nZXQ8TGFib3JhdG9yeT4oYCR7dGhpcy5yZXNvdXJjZVVybH0vYnktdXVpZC8ke2lkfWAsIHtvYnNlcnZlOiAncmVzcG9uc2UnfSlcbiAgICAgICAgICAgIC5waXBlKG1hcCgocmVzOiBFbnRpdHlSZXNwb25zZVR5cGUpID0+IHRoaXMuY29udmVydERhdGVGcm9tU2VydmVyKHJlcykpKTtcbiAgICB9XG5cbiAgICBkZWxldGUoaWQ6IG51bWJlcik6IE9ic2VydmFibGU8SHR0cFJlc3BvbnNlPGFueT4+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGU8YW55PihgJHt0aGlzLnJlc291cmNlVXJsfS8ke2lkfWAsIHtvYnNlcnZlOiAncmVzcG9uc2UnfSk7XG4gICAgfVxuXG4gICAgZ2V0UGF0aWVudChpZDogYW55KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PFBhdGllbnQ+KGAvYXBpL3BhdGllbnRzL2J5LXV1aWQvJHtpZH1gLCB7b2JzZXJ2ZTogJ2JvZHknfSlcbiAgICAgICAgICAgIC5waXBlKG1hcCgocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgICAgICAgICAgICByZXMuZGF0ZVJlZ2lzdHJhdGlvbiA9IHJlcy5kYXRlUmVnaXN0cmF0aW9uICE9IG51bGwgPyBtb21lbnQocmVzLmRhdGVSZWdpc3RyYXRpb24pIDogbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBnZXRWaXNpdERhdGVzQnlQYXRpZW50KHBhdGllbnRJZDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PE1vbWVudFtdPihgJHt0aGlzLnJlc291cmNlVXJsfS9wYXRpZW50LyR7cGF0aWVudElkfS9yZXBvcnQtZGF0ZXNgKVxuICAgICAgICAgICAgLnBpcGUobWFwKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLmZvckVhY2goZCA9PiBtb21lbnQoZCkpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIGxhYm9yYXRvcnlDYXRlZ29yaWVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxMYWJUZXN0Q2F0ZWdvcnlbXT4oYCR7dGhpcy5yZXNvdXJjZVVybH0vdGVzdC1jYXRlZ29yaWVzYCk7XG4gICAgfVxuXG4gICAgZ2V0TGluZXNCeUxhYm9yYXRvcnkobGFib3JhdG9yeUlkOiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8TGFib3JhdG9yeUxpbmVbXT4oYCR7dGhpcy5yZXNvdXJjZVVybH0vJHtsYWJvcmF0b3J5SWR9L2xpbmVzYCk7XG4gICAgfVxuXG4gICAgbGFiVGVzdHNCeUNhdGVnb3J5KGlkOiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8TGFiVGVzdFtdPihgJHt0aGlzLnJlc291cmNlVXJsfS9sYWItdGVzdHMvY2F0ZWdvcnkvJHtpZH1gKTtcbiAgICB9XG5cbiAgICBnZXRMYWJUZXN0QnlJZChpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxMYWJUZXN0PihgJHt0aGlzLnJlc291cmNlVXJsfS9sYWItdGVzdC8ke2lkfWApO1xuICAgIH1cblxuICAgIGxhdGVzdFZpc2l0KHBhdGllbnRJZDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PExhYm9yYXRvcnk+KGAke3RoaXMucmVzb3VyY2VVcmx9L3BhdGllbnQvJHtwYXRpZW50SWR9L2xhdGVzdGApO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjb252ZXJ0RGF0ZUZyb21DbGllbnQobGFib3JhdG9yeTogTGFib3JhdG9yeSk6IExhYm9yYXRvcnkge1xuICAgICAgICBjb25zdCBjb3B5OiBMYWJvcmF0b3J5ID0gT2JqZWN0LmFzc2lnbih7fSwgbGFib3JhdG9yeSwge1xuICAgICAgICAgICAgZGF0ZVJlc3VsdFJlY2VpdmVkOiBsYWJvcmF0b3J5LmRhdGVSZXN1bHRSZWNlaXZlZCAhPSBudWxsICYmIGxhYm9yYXRvcnkuZGF0ZVJlc3VsdFJlY2VpdmVkLmlzVmFsaWQoKSA/IGxhYm9yYXRvcnkuZGF0ZVJlc3VsdFJlY2VpdmVkLmZvcm1hdChEQVRFX0ZPUk1BVCkgOiBudWxsLFxuICAgICAgICAgICAgZGF0ZUFzc2F5OiBsYWJvcmF0b3J5LmRhdGVBc3NheSAhPSBudWxsICYmIGxhYm9yYXRvcnkuZGF0ZUFzc2F5LmlzVmFsaWQoKSA/IGxhYm9yYXRvcnkuZGF0ZUFzc2F5LmZvcm1hdChEQVRFX0ZPUk1BVCkgOiBudWxsLFxuICAgICAgICAgICAgZGF0ZVNhbXBsZUNvbGxlY3RlZDogbGFib3JhdG9yeS5kYXRlU2FtcGxlQ29sbGVjdGVkICE9IG51bGwgJiYgbGFib3JhdG9yeS5kYXRlU2FtcGxlQ29sbGVjdGVkLmlzVmFsaWQoKSA/IGxhYm9yYXRvcnkuZGF0ZVNhbXBsZUNvbGxlY3RlZC5mb3JtYXQoREFURV9GT1JNQVQpIDogbnVsbFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGNvcHk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNvbnZlcnREYXRlRnJvbVNlcnZlcihyZXM6IEVudGl0eVJlc3BvbnNlVHlwZSk6IEVudGl0eVJlc3BvbnNlVHlwZSB7XG4gICAgICAgIGlmIChyZXMuYm9keSkge1xuICAgICAgICAgICAgcmVzLmJvZHkuZGF0ZVNhbXBsZUNvbGxlY3RlZCA9IHJlcy5ib2R5LmRhdGVTYW1wbGVDb2xsZWN0ZWQgIT0gbnVsbCA/IG1vbWVudChyZXMuYm9keS5kYXRlU2FtcGxlQ29sbGVjdGVkKSA6IG51bGw7XG4gICAgICAgICAgICByZXMuYm9keS5kYXRlUmVzdWx0UmVjZWl2ZWQgPSByZXMuYm9keS5kYXRlUmVzdWx0UmVjZWl2ZWQgIT0gbnVsbCA/IG1vbWVudChyZXMuYm9keS5kYXRlUmVzdWx0UmVjZWl2ZWQpIDogbnVsbDtcbiAgICAgICAgICAgIHJlcy5ib2R5LmRhdGVBc3NheSA9IHJlcy5ib2R5LmRhdGVBc3NheSAhPSBudWxsID8gbW9tZW50KHJlcy5ib2R5LmRhdGVBc3NheSkgOiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNvbnZlcnREYXRlQXJyYXlGcm9tU2VydmVyKHJlczogRW50aXR5QXJyYXlSZXNwb25zZVR5cGUpOiBFbnRpdHlBcnJheVJlc3BvbnNlVHlwZSB7XG4gICAgICAgIGlmIChyZXMuYm9keSkge1xuICAgICAgICAgICAgcmVzLmJvZHkuZm9yRWFjaCgobGFib3JhdG9yeTogTGFib3JhdG9yeSkgPT4ge1xuICAgICAgICAgICAgICAgIGxhYm9yYXRvcnkuZGF0ZVJlc3VsdFJlY2VpdmVkID0gbGFib3JhdG9yeS5kYXRlUmVzdWx0UmVjZWl2ZWQgIT0gbnVsbCA/IG1vbWVudChsYWJvcmF0b3J5LmRhdGVSZXN1bHRSZWNlaXZlZCkgOiBudWxsO1xuICAgICAgICAgICAgICAgIGxhYm9yYXRvcnkuZGF0ZUFzc2F5ID0gbGFib3JhdG9yeS5kYXRlQXNzYXkgIT0gbnVsbCA/IG1vbWVudChsYWJvcmF0b3J5LmRhdGVBc3NheSkgOiBudWxsO1xuICAgICAgICAgICAgICAgIGxhYm9yYXRvcnkuZGF0ZVNhbXBsZUNvbGxlY3RlZCA9IGxhYm9yYXRvcnkuZGF0ZVNhbXBsZUNvbGxlY3RlZCAhPSBudWxsID8gbW9tZW50KGxhYm9yYXRvcnkuZGF0ZVNhbXBsZUNvbGxlY3RlZCkgOiBudWxsO1xuICAgICAgICAgICAgICAgIDE7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cbn1cbiJdfQ==