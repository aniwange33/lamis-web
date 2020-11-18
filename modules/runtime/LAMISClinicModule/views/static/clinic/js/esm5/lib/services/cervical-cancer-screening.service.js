import * as tslib_1 from "tslib";
import { Inject, Injectable } from '@angular/core';
import * as moment_ from 'moment';
import { SERVER_API_URL_CONFIG } from '@lamis/web-core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@lamis/web-core";
var moment = moment_;
var CervicalCancerScreeningService = /** @class */ (function () {
    function CervicalCancerScreeningService(http, serverUrl) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.resourceUrl = '';
        this.observationResourceUrl = '';
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/cervical-cancer-screenings';
        this.observationResourceUrl = serverUrl.SERVER_API_URL + '/api/observations';
    }
    CervicalCancerScreeningService.prototype.find = function (id) {
        return this.http.get(this.observationResourceUrl + "/" + id, { observe: 'response' })
            .pipe(map(function (res) {
            console.log('Response1', res);
            res.body.date = res.body.date != null ? moment(res.body.date) : null;
            res.body.data.dateTreated = res.body.data.dateTreated != null ? moment(res.body.data.dateTreated) : null;
            res.body.data.dateScreened = res.body.data.dateScreened != null ? moment(res.body.data.dateScreened) : null;
            return res;
        }));
    };
    CervicalCancerScreeningService.prototype.findByUuid = function (id) {
        return this.find(id);
    };
    CervicalCancerScreeningService.prototype.delete = function (id) {
        return this.http.delete(this.observationResourceUrl + "/" + id, { observe: 'response' });
    };
    CervicalCancerScreeningService.prototype.save = function (data) {
        return this.http.post("" + this.observationResourceUrl, data, { observe: 'response' })
            .pipe(map(function (res) {
            res.body.data.dateTreated = res.body.data.dateTreated != null ? moment(res.body.data.dateTreated) : null;
            res.body.data.dateScreened = res.body.data.dateScreened != null ? moment(res.body.data.dateScreened) : null;
            return res;
        }));
    };
    CervicalCancerScreeningService.prototype.update = function (data) {
        return this.http.put("" + this.observationResourceUrl, data, { observe: 'response' })
            .pipe(map(function (res) {
            res.body.data.dateTreated = res.body.data.dateTreated != null ? moment(res.body.data.dateTreated) : null;
            res.body.data.dateScreened = res.body.data.dateScreened != null ? moment(res.body.data.dateScreened) : null;
            return res;
        }));
    };
    CervicalCancerScreeningService.prototype.getScreeningByPatient = function (id) {
        return this.http.get(this.resourceUrl + "/patient/" + id, { observe: 'response' })
            .pipe(map(function (res) {
            res.body.data = res.body.data.cervicalCancerScreening;
            res.body.date = res.body.date != null ? moment(res.body.date) : null;
            res.body.data.dateTreated = res.body.data.dateTreated != null ? moment(res.body.data.dateTreated) : null;
            res.body.data.dateScreened = res.body.data.dateScreened != null ? moment(res.body.data.dateScreened) : null;
            return res;
        }));
    };
    CervicalCancerScreeningService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: undefined, decorators: [{ type: Inject, args: [SERVER_API_URL_CONFIG,] }] }
    ]; };
    CervicalCancerScreeningService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function CervicalCancerScreeningService_Factory() { return new CervicalCancerScreeningService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.SERVER_API_URL_CONFIG)); }, token: CervicalCancerScreeningService, providedIn: "root" });
    CervicalCancerScreeningService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__param(1, Inject(SERVER_API_URL_CONFIG)),
        tslib_1.__metadata("design:paramtypes", [HttpClient, Object])
    ], CervicalCancerScreeningService);
    return CervicalCancerScreeningService;
}());
export { CervicalCancerScreeningService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VydmljYWwtY2FuY2VyLXNjcmVlbmluZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGFtaXMtY2xpbmljLTEuNC4wLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2NlcnZpY2FsLWNhbmNlci1zY3JlZW5pbmcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFakQsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFDbEMsT0FBTyxFQUFDLHFCQUFxQixFQUFxQixNQUFNLGlCQUFpQixDQUFDO0FBQzFFLE9BQU8sRUFBQyxVQUFVLEVBQUUsWUFBWSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFFOUQsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDOzs7O0FBR25DLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQztBQU12QjtJQUlJLHdDQUFzQixJQUFnQixFQUF5QyxTQUE2QjtRQUF0RixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQXlDLGNBQVMsR0FBVCxTQUFTLENBQW9CO1FBSHJHLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLDJCQUFzQixHQUFHLEVBQUUsQ0FBQztRQUcvQixJQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQyxjQUFjLEdBQUcsaUNBQWlDLENBQUM7UUFDaEYsSUFBSSxDQUFDLHNCQUFzQixHQUFHLFNBQVMsQ0FBQyxjQUFjLEdBQUcsbUJBQW1CLENBQUM7SUFDakYsQ0FBQztJQUVELDZDQUFJLEdBQUosVUFBSyxFQUFVO1FBQ1gsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBaUIsSUFBSSxDQUFDLHNCQUFzQixTQUFJLEVBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUMsQ0FBQzthQUMzRixJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUEsR0FBRztZQUNULE9BQU8sQ0FB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RyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUM1RyxPQUFPLEdBQUcsQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDWixDQUFDOztnQkFuRDJCLFVBQVU7Z0RBQUcsTUFBTSxTQUFDLHFCQUFxQjs7O0lBSjVELDhCQUE4QjtRQUgxQyxVQUFVLENBQUM7WUFDUixVQUFVLEVBQUUsTUFBTTtTQUNyQixDQUFDO1FBSzJDLG1CQUFBLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO2lEQUExQyxVQUFVO09BSjdCLDhCQUE4QixDQXdEMUM7eUNBdkVEO0NBdUVDLEFBeERELElBd0RDO1NBeERZLDhCQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHtTRVJWRVJfQVBJX1VSTF9DT05GSUcsIFNlcnZlckFwaVVybENvbmZpZ30gZnJvbSAnQGxhbWlzL3dlYi1jb3JlJztcbmltcG9ydCB7SHR0cENsaWVudCwgSHR0cFJlc3BvbnNlfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHttYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7T2JzZXJ2YXRpb259IGZyb20gJy4uL21vZGVsL2NsaW5pYy5tb2RlbCc7XG5cbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XG5cblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBDZXJ2aWNhbENhbmNlclNjcmVlbmluZ1NlcnZpY2Uge1xuICAgIHB1YmxpYyByZXNvdXJjZVVybCA9ICcnO1xuICAgIHB1YmxpYyBvYnNlcnZhdGlvblJlc291cmNlVXJsID0gJyc7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudCwgQEluamVjdChTRVJWRVJfQVBJX1VSTF9DT05GSUcpIHByaXZhdGUgc2VydmVyVXJsOiBTZXJ2ZXJBcGlVcmxDb25maWcpIHtcbiAgICAgICAgdGhpcy5yZXNvdXJjZVVybCA9IHNlcnZlclVybC5TRVJWRVJfQVBJX1VSTCArICcvYXBpL2NlcnZpY2FsLWNhbmNlci1zY3JlZW5pbmdzJztcbiAgICAgICAgdGhpcy5vYnNlcnZhdGlvblJlc291cmNlVXJsID0gc2VydmVyVXJsLlNFUlZFUl9BUElfVVJMICsgJy9hcGkvb2JzZXJ2YXRpb25zJztcbiAgICB9XG5cbiAgICBmaW5kKGlkOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8T2JzZXJ2YXRpb24+KGAke3RoaXMub2JzZXJ2YXRpb25SZXNvdXJjZVVybH0vJHtpZH1gLCB7b2JzZXJ2ZTogJ3Jlc3BvbnNlJ30pXG4gICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUmVzcG9uc2UxJywgcmVzKTtcbiAgICAgICAgICAgICAgICByZXMuYm9keS5kYXRlID0gcmVzLmJvZHkuZGF0ZSAhPSBudWxsID8gbW9tZW50KHJlcy5ib2R5LmRhdGUpIDogbnVsbDtcbiAgICAgICAgICAgICAgICByZXMuYm9keS5kYXRhLmRhdGVUcmVhdGVkID0gcmVzLmJvZHkuZGF0YS5kYXRlVHJlYXRlZCAhPSBudWxsID8gbW9tZW50KHJlcy5ib2R5LmRhdGEuZGF0ZVRyZWF0ZWQpIDogbnVsbDtcbiAgICAgICAgICAgICAgICByZXMuYm9keS5kYXRhLmRhdGVTY3JlZW5lZCA9IHJlcy5ib2R5LmRhdGEuZGF0ZVNjcmVlbmVkICE9IG51bGwgPyBtb21lbnQocmVzLmJvZHkuZGF0YS5kYXRlU2NyZWVuZWQpIDogbnVsbDtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIGZpbmRCeVV1aWQoaWQ6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5maW5kKGlkKTtcbiAgICB9XG5cbiAgICBkZWxldGUoaWQ6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZShgJHt0aGlzLm9ic2VydmF0aW9uUmVzb3VyY2VVcmx9LyR7aWR9YCwge29ic2VydmU6ICdyZXNwb25zZSd9KTtcbiAgICB9XG5cbiAgICBzYXZlKGRhdGE6IGFueSk6IE9ic2VydmFibGU8SHR0cFJlc3BvbnNlPE9ic2VydmF0aW9uPj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Q8T2JzZXJ2YXRpb24+KGAke3RoaXMub2JzZXJ2YXRpb25SZXNvdXJjZVVybH1gLCBkYXRhLCB7b2JzZXJ2ZTogJ3Jlc3BvbnNlJ30pXG4gICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHtcbiAgICAgICAgICAgICAgICByZXMuYm9keS5kYXRhLmRhdGVUcmVhdGVkID0gcmVzLmJvZHkuZGF0YS5kYXRlVHJlYXRlZCAhPSBudWxsID8gbW9tZW50KHJlcy5ib2R5LmRhdGEuZGF0ZVRyZWF0ZWQpIDogbnVsbDtcbiAgICAgICAgICAgICAgICByZXMuYm9keS5kYXRhLmRhdGVTY3JlZW5lZCA9IHJlcy5ib2R5LmRhdGEuZGF0ZVNjcmVlbmVkICE9IG51bGwgPyBtb21lbnQocmVzLmJvZHkuZGF0YS5kYXRlU2NyZWVuZWQpIDogbnVsbDtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIHVwZGF0ZShkYXRhOiBhbnkpOiBPYnNlcnZhYmxlPEh0dHBSZXNwb25zZTxPYnNlcnZhdGlvbj4+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQ8T2JzZXJ2YXRpb24+KGAke3RoaXMub2JzZXJ2YXRpb25SZXNvdXJjZVVybH1gLCBkYXRhLCB7b2JzZXJ2ZTogJ3Jlc3BvbnNlJ30pXG4gICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHtcbiAgICAgICAgICAgICAgICByZXMuYm9keS5kYXRhLmRhdGVUcmVhdGVkID0gcmVzLmJvZHkuZGF0YS5kYXRlVHJlYXRlZCAhPSBudWxsID8gbW9tZW50KHJlcy5ib2R5LmRhdGEuZGF0ZVRyZWF0ZWQpIDogbnVsbDtcbiAgICAgICAgICAgICAgICByZXMuYm9keS5kYXRhLmRhdGVTY3JlZW5lZCA9IHJlcy5ib2R5LmRhdGEuZGF0ZVNjcmVlbmVkICE9IG51bGwgPyBtb21lbnQocmVzLmJvZHkuZGF0YS5kYXRlU2NyZWVuZWQpIDogbnVsbDtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIGdldFNjcmVlbmluZ0J5UGF0aWVudChpZDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PGFueT4oYCR7dGhpcy5yZXNvdXJjZVVybH0vcGF0aWVudC8ke2lkfWAsIHtvYnNlcnZlOiAncmVzcG9uc2UnfSlcbiAgICAgICAgICAgIC5waXBlKG1hcChyZXMgPT4ge1xuICAgICAgICAgICAgICAgIHJlcy5ib2R5LmRhdGEgPSByZXMuYm9keS5kYXRhLmNlcnZpY2FsQ2FuY2VyU2NyZWVuaW5nO1xuICAgICAgICAgICAgICAgIHJlcy5ib2R5LmRhdGUgPSByZXMuYm9keS5kYXRlICE9IG51bGwgPyBtb21lbnQocmVzLmJvZHkuZGF0ZSkgOiBudWxsO1xuICAgICAgICAgICAgICAgIHJlcy5ib2R5LmRhdGEuZGF0ZVRyZWF0ZWQgPSByZXMuYm9keS5kYXRhLmRhdGVUcmVhdGVkICE9IG51bGwgPyBtb21lbnQocmVzLmJvZHkuZGF0YS5kYXRlVHJlYXRlZCkgOiBudWxsO1xuICAgICAgICAgICAgICAgIHJlcy5ib2R5LmRhdGEuZGF0ZVNjcmVlbmVkID0gcmVzLmJvZHkuZGF0YS5kYXRlU2NyZWVuZWQgIT0gbnVsbCA/IG1vbWVudChyZXMuYm9keS5kYXRhLmRhdGVTY3JlZW5lZCkgOiBudWxsO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgICB9KSk7XG4gICAgfVxufVxuIl19