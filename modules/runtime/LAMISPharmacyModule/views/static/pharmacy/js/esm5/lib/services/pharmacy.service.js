import * as tslib_1 from "tslib";
import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {DATE_FORMAT, SERVER_API_URL_CONFIG} from '@lamis/web-core';
import {map} from 'rxjs/operators';
import * as moment_ from 'moment';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@lamis/web-core";

var moment = moment_;
var PharmacyService = /** @class */ (function () {
    function PharmacyService(http, serverUrl) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.resourceUrl = '';
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/pharmacies';
    }

    PharmacyService.prototype.create = function (pharmacy) {
        var _this = this;
        var copy = this.convertDateFromClient(pharmacy);
        return this.http
            .post(this.resourceUrl, copy, {observe: 'response'})
            .pipe(map(function (res) {
                return _this.convertDateFromServer(res);
            }));
    };
    PharmacyService.prototype.update = function (pharmacy) {
        var _this = this;
        var copy = this.convertDateFromClient(pharmacy);
        return this.http
            .put(this.resourceUrl, copy, {observe: 'response'})
            .pipe(map(function (res) {
                return _this.convertDateFromServer(res);
            }));
    };
    PharmacyService.prototype.find = function (id) {
        var _this = this;
        return this.http
            .get(this.resourceUrl + "/" + id, {observe: 'response'})
            .pipe(map(function (res) {
                return _this.convertDateFromServer(res);
            }));
    };
    PharmacyService.prototype.findByUuid = function (id) {
        var _this = this;
        return this.http
            .get(this.resourceUrl + "/by-uuid/" + id, {observe: 'response'})
            .pipe(map(function (res) {
                return _this.convertDateFromServer(res);
            }));
    };
    PharmacyService.prototype.delete = function (id) {
        return this.http.delete(this.resourceUrl + "/" + id, {observe: 'response'});
    };
    PharmacyService.prototype.getPatient = function (id) {
        return this.http.get("/api/patients/by-uuid/" + id, {observe: 'body'})
            .pipe(map(function (res) {
                if (res) {
                    res.dateRegistration = res.dateRegistration != null ? moment(res.dateRegistration) : null;
                }
                return res;
            }));
    };
    PharmacyService.prototype.getVisitDatesByPatient = function (patientId) {
        return this.http.get(this.resourceUrl + "/patient/" + patientId + "/visit-dates")
            .pipe(map(function (res) {
                res.forEach(function (d) {
                    return moment(d);
                });
                return res;
            }));
    };
    PharmacyService.prototype.regimenTypes = function () {
        return this.http.get(this.resourceUrl + "/regimen-types");
    };
    PharmacyService.prototype.regimenInfo = function (patientId) {
        return this.http.get(this.resourceUrl + "/regimen-info/patient/" + patientId);
    };
    PharmacyService.prototype.adrs = function () {
        return this.http.get(this.resourceUrl + "/adrs");
    };
    PharmacyService.prototype.getLinesByPharmacy = function (pharmacyId) {
        return this.http.get(this.resourceUrl + "/" + pharmacyId + "/lines");
    };
    PharmacyService.prototype.regimesByRegimenType = function (id) {
        return this.http.get(this.resourceUrl + "/regimens/regimen-type/" + id);
    };
    PharmacyService.prototype.getDrugsByRegimen = function (id) {
        return this.http.get(this.resourceUrl + "/drugs/regimen/" + id);
    };
    PharmacyService.prototype.getRegimenById = function (id) {
        return this.http.get(this.resourceUrl + "/regimen/" + id);
    };
    PharmacyService.prototype.latestVisit = function (patientId) {
        return this.http.get(this.resourceUrl + "/patient/" + patientId + "/latest");
    };
    PharmacyService.prototype.getDevolvement = function (patientId, date) {
        var d = date.format(DATE_FORMAT);
        return this.http.get(this.resourceUrl + "/patient/" + patientId + "/devolvement/at/" + d)
            .pipe(map(function (res) {
                res.dateDevolved = res.dateDevolved != null ? moment(res.dateDevolved) : null;
                res.dateReturnedToFacility = res.dateReturnedToFacility != null ? moment(res.dateReturnedToFacility) : null;
                res.dateNextClinic = res.dateNextClinic != null ? moment(res.dateNextClinic) : null;
                res.dateNextRefill = res.dateNextRefill != null ? moment(res.dateNextRefill) : null;
                return res;
            }));
    };
    PharmacyService.prototype.convertDateFromClient = function (pharmacy) {
        var copy = Object.assign({}, pharmacy, {
            dateVisit: pharmacy.dateVisit != null && pharmacy.dateVisit.isValid() ? pharmacy.dateVisit.format(DATE_FORMAT) : null,
            nextAppointment: pharmacy.nextAppointment != null && pharmacy.nextAppointment.isValid() ? pharmacy.nextAppointment.format(DATE_FORMAT) : null
        });
        return copy;
    };
    PharmacyService.prototype.convertDateFromServer = function (res) {
        if (res.body) {
            res.body.nextAppointment = res.body.nextAppointment != null ? moment(res.body.nextAppointment) : null;
            res.body.dateVisit = res.body.dateVisit != null ? moment(res.body.dateVisit) : null;
        }
        return res;
    };
    PharmacyService.prototype.convertDateArrayFromServer = function (res) {
        if (res.body) {
            res.body.forEach(function (pharmacy) {
                pharmacy.dateVisit = pharmacy.dateVisit != null ? moment(pharmacy.dateVisit) : null;
                pharmacy.nextAppointment = pharmacy.nextAppointment != null ? moment(pharmacy.nextAppointment) : null;
                1;
            });
        }
        return res;
    };
    PharmacyService.ctorParameters = function () {
        return [
            {type: HttpClient},
            {type: undefined, decorators: [{type: Inject, args: [SERVER_API_URL_CONFIG,]}]}
        ];
    };
    PharmacyService.ngInjectableDef = i0.ɵɵdefineInjectable({
        factory: function PharmacyService_Factory() {
            return new PharmacyService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.SERVER_API_URL_CONFIG));
        }, token: PharmacyService, providedIn: "root"
    });
    PharmacyService = tslib_1.__decorate([
        Injectable({providedIn: 'root'}),
        tslib_1.__param(1, Inject(SERVER_API_URL_CONFIG)),
        tslib_1.__metadata("design:paramtypes", [HttpClient, Object])
    ], PharmacyService);
    return PharmacyService;
}());
export {PharmacyService};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhhcm1hY3kuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xhbWlzLXBoYXJtYWN5LTEuMS40LyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3BoYXJtYWN5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFaEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxxQkFBcUIsRUFBc0IsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RixPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFZckMsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7Ozs7QUFHbEMsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDO0FBTXZCO0lBR0kseUJBQXNCLElBQWdCLEVBQXlDLFNBQTZCO1FBQXRGLFNBQUksR0FBSixJQUFJLENBQVk7UUFBeUMsY0FBUyxHQUFULFNBQVMsQ0FBb0I7UUFGckcsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFHcEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUMsY0FBYyxHQUFHLGlCQUFpQixDQUFDO0lBQ3BFLENBQUM7SUFFRCxnQ0FBTSxHQUFOLFVBQU8sUUFBa0I7UUFBekIsaUJBS0M7UUFKRyxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEQsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNYLElBQUksQ0FBVyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUMsQ0FBQzthQUM3RCxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUMsR0FBdUIsSUFBSyxPQUFBLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsRUFBL0IsQ0FBK0Is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QUFBO1lBQ0wsQ0FBQyxDQUFDLENBQUM7U0FDTjtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQzs7Z0JBM0gyQixVQUFVO2dEQUFHLE1BQU0sU0FBQyxxQkFBcUI7OztJQUg1RCxlQUFlO1FBRDNCLFVBQVUsQ0FBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUMsQ0FBQztRQUlZLG1CQUFBLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO2lEQUExQyxVQUFVO09BSDdCLGVBQWUsQ0ErSDNCOzBCQXhKRDtDQXdKQyxBQS9IRCxJQStIQztTQS9IWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEQVRFX0ZPUk1BVCwgU0VSVkVSX0FQSV9VUkxfQ09ORklHLCBTZXJ2ZXJBcGlVcmxDb25maWcgfSBmcm9tICdAbGFtaXMvd2ViLWNvcmUnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtcbiAgICBBZHIsXG4gICAgRGV2b2x2ZSxcbiAgICBEcnVnRFRPLFxuICAgIFBhdGllbnQsXG4gICAgUGhhcm1hY3ksXG4gICAgUGhhcm1hY3lMaW5lLFxuICAgIFJlZ2ltZW4sXG4gICAgUmVnaW1lbkluZm8sXG4gICAgUmVnaW1lblR5cGVcbn0gZnJvbSAnLi4vbW9kZWwvcGhhcm1hY3kubW9kZWwnO1xuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgTW9tZW50IH0gZnJvbSAnbW9tZW50JztcblxuY29uc3QgbW9tZW50ID0gbW9tZW50XztcblxudHlwZSBFbnRpdHlSZXNwb25zZVR5cGUgPSBIdHRwUmVzcG9uc2U8UGhhcm1hY3k+O1xudHlwZSBFbnRpdHlBcnJheVJlc3BvbnNlVHlwZSA9IEh0dHBSZXNwb25zZTxQaGFybWFjeVtdPjtcblxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgUGhhcm1hY3lTZXJ2aWNlIHtcbiAgICBwdWJsaWMgcmVzb3VyY2VVcmwgPSAnJztcblxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBodHRwOiBIdHRwQ2xpZW50LCBASW5qZWN0KFNFUlZFUl9BUElfVVJMX0NPTkZJRykgcHJpdmF0ZSBzZXJ2ZXJVcmw6IFNlcnZlckFwaVVybENvbmZpZykge1xuICAgICAgICB0aGlzLnJlc291cmNlVXJsID0gc2VydmVyVXJsLlNFUlZFUl9BUElfVVJMICsgJy9hcGkvcGhhcm1hY2llcyc7XG4gICAgfVxuXG4gICAgY3JlYXRlKHBoYXJtYWN5OiBQaGFybWFjeSk6IE9ic2VydmFibGU8RW50aXR5UmVzcG9uc2VUeXBlPiB7XG4gICAgICAgIGNvbnN0IGNvcHkgPSB0aGlzLmNvbnZlcnREYXRlRnJvbUNsaWVudChwaGFybWFjeSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgICAgICAgIC5wb3N0PFBoYXJtYWN5Pih0aGlzLnJlc291cmNlVXJsLCBjb3B5LCB7b2JzZXJ2ZTogJ3Jlc3BvbnNlJ30pXG4gICAgICAgICAgICAucGlwZShtYXAoKHJlczogRW50aXR5UmVzcG9uc2VUeXBlKSA9PiB0aGlzLmNvbnZlcnREYXRlRnJvbVNlcnZlcihyZXMpKSk7XG4gICAgfVxuXG4gICAgdXBkYXRlKHBoYXJtYWN5OiBQaGFybWFjeSk6IE9ic2VydmFibGU8RW50aXR5UmVzcG9uc2VUeXBlPiB7XG4gICAgICAgIGNvbnN0IGNvcHkgPSB0aGlzLmNvbnZlcnREYXRlRnJvbUNsaWVudChwaGFybWFjeSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgICAgICAgIC5wdXQ8UGhhcm1hY3k+KHRoaXMucmVzb3VyY2VVcmwsIGNvcHksIHtvYnNlcnZlOiAncmVzcG9uc2UnfSlcbiAgICAgICAgICAgIC5waXBlKG1hcCgocmVzOiBFbnRpdHlSZXNwb25zZVR5cGUpID0+IHRoaXMuY29udmVydERhdGVGcm9tU2VydmVyKHJlcykpKTtcbiAgICB9XG5cbiAgICBmaW5kKGlkOiBudW1iZXIpOiBPYnNlcnZhYmxlPEVudGl0eVJlc3BvbnNlVHlwZT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAgICAgICAuZ2V0PFBoYXJtYWN5PihgJHt0aGlzLnJlc291cmNlVXJsfS8ke2lkfWAsIHtvYnNlcnZlOiAncmVzcG9uc2UnfSlcbiAgICAgICAgICAgIC5waXBlKG1hcCgocmVzOiBFbnRpdHlSZXNwb25zZVR5cGUpID0+IHRoaXMuY29udmVydERhdGVGcm9tU2VydmVyKHJlcykpKTtcbiAgICB9XG5cbiAgICBmaW5kQnlVdWlkKGlkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEVudGl0eVJlc3BvbnNlVHlwZT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAgICAgICAuZ2V0PFBoYXJtYWN5PihgJHt0aGlzLnJlc291cmNlVXJsfS9ieS11dWlkLyR7aWR9YCwge29ic2VydmU6ICdyZXNwb25zZSd9KVxuICAgICAgICAgICAgLnBpcGUobWFwKChyZXM6IEVudGl0eVJlc3BvbnNlVHlwZSkgPT4gdGhpcy5jb252ZXJ0RGF0ZUZyb21TZXJ2ZXIocmVzKSkpO1xuICAgIH1cblxuXG4gICAgZGVsZXRlKGlkOiBudW1iZXIpOiBPYnNlcnZhYmxlPEh0dHBSZXNwb25zZTxhbnk+PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlPGFueT4oYCR7dGhpcy5yZXNvdXJjZVVybH0vJHtpZH1gLCB7b2JzZXJ2ZTogJ3Jlc3BvbnNlJ30pO1xuICAgIH1cblxuICAgIGdldFBhdGllbnQoaWQ6IGFueSkge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxQYXRpZW50PihgL2FwaS9wYXRpZW50cy9ieS11dWlkLyR7aWR9YCwge29ic2VydmU6ICdib2R5J30pXG4gICAgICAgICAgICAucGlwZShtYXAoKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLmRhdGVSZWdpc3RyYXRpb24gPSByZXMuZGF0ZVJlZ2lzdHJhdGlvbiAhPSBudWxsID8gbW9tZW50KHJlcy5kYXRlUmVnaXN0cmF0aW9uKSA6IG51bGxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICAgIH0pKVxuICAgIH1cblxuICAgIGdldFZpc2l0RGF0ZXNCeVBhdGllbnQocGF0aWVudElkOiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8TW9tZW50W10+KGAke3RoaXMucmVzb3VyY2VVcmx9L3BhdGllbnQvJHtwYXRpZW50SWR9L3Zpc2l0LWRhdGVzYClcbiAgICAgICAgICAgIC5waXBlKG1hcCgocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5mb3JFYWNoKGQgPT4gbW9tZW50KGQpKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgIH1cblxuICAgIHJlZ2ltZW5UeXBlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8UmVnaW1lblR5cGVbXT4oYCR7dGhpcy5yZXNvdXJjZVVybH0vcmVnaW1lbi10eXBlc2ApXG4gICAgfVxuXG4gICAgcmVnaW1lbkluZm8ocGF0aWVudElkOiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8UmVnaW1lbkluZm8+KGAke3RoaXMucmVzb3VyY2VVcmx9L3JlZ2ltZW4taW5mby9wYXRpZW50LyR7cGF0aWVudElkfWApXG4gICAgfVxuXG4gICAgYWRycygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8QWRyW10+KGAke3RoaXMucmVzb3VyY2VVcmx9L2FkcnNgKVxuICAgIH1cblxuICAgIGdldExpbmVzQnlQaGFybWFjeShwaGFybWFjeUlkOiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8UGhhcm1hY3lMaW5lW10+KGAke3RoaXMucmVzb3VyY2VVcmx9LyR7cGhhcm1hY3lJZH0vbGluZXNgKVxuICAgIH1cblxuICAgIHJlZ2ltZXNCeVJlZ2ltZW5UeXBlKGlkOiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8UmVnaW1lbltdPihgJHt0aGlzLnJlc291cmNlVXJsfS9yZWdpbWVucy9yZWdpbWVuLXR5cGUvJHtpZH1gKVxuICAgIH1cblxuICAgIGdldERydWdzQnlSZWdpbWVuKGlkOiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8RHJ1Z0RUT1tdPihgJHt0aGlzLnJlc291cmNlVXJsfS9kcnVncy9yZWdpbWVuLyR7aWR9YClcbiAgICB9XG5cbiAgICBnZXRSZWdpbWVuQnlJZChpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxSZWdpbWVuPihgJHt0aGlzLnJlc291cmNlVXJsfS9yZWdpbWVuLyR7aWR9YClcbiAgICB9XG5cbiAgICBsYXRlc3RWaXNpdChwYXRpZW50SWQ6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxQaGFybWFjeT4oYCR7dGhpcy5yZXNvdXJjZVVybH0vcGF0aWVudC8ke3BhdGllbnRJZH0vbGF0ZXN0YClcbiAgICB9XG5cbiAgICBnZXREZXZvbHZlbWVudChwYXRpZW50SWQ6IG51bWJlciwgZGF0ZTogTW9tZW50KSB7XG4gICAgICAgIGNvbnN0IGQgPSBkYXRlLmZvcm1hdChEQVRFX0ZPUk1BVCk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PERldm9sdmU+KGAke3RoaXMucmVzb3VyY2VVcmx9L3BhdGllbnQvJHtwYXRpZW50SWR9L2Rldm9sdmVtZW50L2F0LyR7ZH1gKVxuICAgICAgICAgICAgLnBpcGUobWFwKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgcmVzLmRhdGVEZXZvbHZlZCA9IHJlcy5kYXRlRGV2b2x2ZWQgIT0gbnVsbCA/IG1vbWVudChyZXMuZGF0ZURldm9sdmVkKSA6IG51bGw7XG4gICAgICAgICAgICAgICAgcmVzLmRhdGVSZXR1cm5lZFRvRmFjaWxpdHkgPSByZXMuZGF0ZVJldHVybmVkVG9GYWNpbGl0eSAhPSBudWxsID8gbW9tZW50KHJlcy5kYXRlUmV0dXJuZWRUb0ZhY2lsaXR5KSA6IG51bGw7XG4gICAgICAgICAgICAgICAgcmVzLmRhdGVOZXh0Q2xpbmljID0gcmVzLmRhdGVOZXh0Q2xpbmljICE9IG51bGwgPyBtb21lbnQocmVzLmRhdGVOZXh0Q2xpbmljKSA6IG51bGw7XG4gICAgICAgICAgICAgICAgcmVzLmRhdGVOZXh0UmVmaWxsID0gcmVzLmRhdGVOZXh0UmVmaWxsICE9IG51bGwgPyBtb21lbnQocmVzLmRhdGVOZXh0UmVmaWxsKSA6IG51bGw7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICAgIH0pKVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBjb252ZXJ0RGF0ZUZyb21DbGllbnQocGhhcm1hY3k6IFBoYXJtYWN5KTogUGhhcm1hY3kge1xuICAgICAgICBjb25zdCBjb3B5OiBQaGFybWFjeSA9IE9iamVjdC5hc3NpZ24oe30sIHBoYXJtYWN5LCB7XG4gICAgICAgICAgICBkYXRlVmlzaXQ6IHBoYXJtYWN5LmRhdGVWaXNpdCAhPSBudWxsICYmIHBoYXJtYWN5LmRhdGVWaXNpdC5pc1ZhbGlkKCkgPyBwaGFybWFjeS5kYXRlVmlzaXQuZm9ybWF0KERBVEVfRk9STUFUKSA6IG51bGwsXG4gICAgICAgICAgICBuZXh0QXBwb2ludG1lbnQ6IHBoYXJtYWN5Lm5leHRBcHBvaW50bWVudCAhPSBudWxsICYmIHBoYXJtYWN5Lm5leHRBcHBvaW50bWVudC5pc1ZhbGlkKCkgPyBwaGFybWFjeS5uZXh0QXBwb2ludG1lbnQuZm9ybWF0KERBVEVfRk9STUFUKSA6IG51bGxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjb3B5O1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjb252ZXJ0RGF0ZUZyb21TZXJ2ZXIocmVzOiBFbnRpdHlSZXNwb25zZVR5cGUpOiBFbnRpdHlSZXNwb25zZVR5cGUge1xuICAgICAgICBpZiAocmVzLmJvZHkpIHtcbiAgICAgICAgICAgIHJlcy5ib2R5Lm5leHRBcHBvaW50bWVudCA9IHJlcy5ib2R5Lm5leHRBcHBvaW50bWVudCAhPSBudWxsID8gbW9tZW50KHJlcy5ib2R5Lm5leHRBcHBvaW50bWVudCkgOiBudWxsO1xuICAgICAgICAgICAgcmVzLmJvZHkuZGF0ZVZpc2l0ID0gcmVzLmJvZHkuZGF0ZVZpc2l0ICE9IG51bGwgPyBtb21lbnQocmVzLmJvZHkuZGF0ZVZpc2l0KSA6IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY29udmVydERhdGVBcnJheUZyb21TZXJ2ZXIocmVzOiBFbnRpdHlBcnJheVJlc3BvbnNlVHlwZSk6IEVudGl0eUFycmF5UmVzcG9uc2VUeXBlIHtcbiAgICAgICAgaWYgKHJlcy5ib2R5KSB7XG4gICAgICAgICAgICByZXMuYm9keS5mb3JFYWNoKChwaGFybWFjeTogUGhhcm1hY3kpID0+IHtcbiAgICAgICAgICAgICAgICBwaGFybWFjeS5kYXRlVmlzaXQgPSBwaGFybWFjeS5kYXRlVmlzaXQgIT0gbnVsbCA/IG1vbWVudChwaGFybWFjeS5kYXRlVmlzaXQpIDogbnVsbDtcbiAgICAgICAgICAgICAgICBwaGFybWFjeS5uZXh0QXBwb2ludG1lbnQgPSBwaGFybWFjeS5uZXh0QXBwb2ludG1lbnQgIT0gbnVsbCA/IG1vbWVudChwaGFybWFjeS5uZXh0QXBwb2ludG1lbnQpIDogbnVsbDtcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cbn1cbiJdfQ==
