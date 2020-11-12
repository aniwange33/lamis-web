import * as tslib_1 from "tslib";
import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthServerProvider, DATE_FORMAT, SERVER_API_URL_CONFIG, ServerApiUrlConfig} from '@lamis/web-core';
import {map} from 'rxjs/operators';
import * as moment_ from 'moment';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@lamis/web-core";

var moment = moment_;
var BiometricService = /** @class */ (function () {
    function BiometricService(http, serverUrl, authServerProvider) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.authServerProvider = authServerProvider;
        this.resourceUrl = '';
        this.proxyUrl = 'http://localhost:8888/api/biometrics';
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/biometrics';
    }

    BiometricService.prototype.saveTemplates = function (biometrics) {
        var _this = this;
        biometrics = biometrics.map(function (biometric) {
            return _this.convertDateFromClient(biometric);
        });
        return this.http.post(this.resourceUrl + "/templates", biometrics, {observe: 'response'});
    };
    BiometricService.prototype.getBiometric = function (id) {
        return this.http.get(this.resourceUrl + "/" + id);
    };
    BiometricService.prototype.getPatient = function (id) {
        return this.http.get("/api/patients/by-uuid/" + id, {observe: 'body'})
            .pipe(map(function (res) {
                if (res) {
                    res.dateRegistration = res.dateRegistration != null ? moment(res.dateRegistration) : null;
                }
                return res;
            }));
    };
    BiometricService.prototype.getReaders = function () {
        return this.getObservableFromFetch(this.proxyUrl + "/readers");
    };
    BiometricService.prototype.findByPatient = function (id) {
        var _this = this;
        return this.http
            .get(this.resourceUrl + "/patient/" + id, {observe: 'response'})
            .pipe(map(function (res) {
                return _this.convertDateArrayFromServer(res);
            }));
    };
    BiometricService.prototype.delete = function (id) {
        return this.http.delete(this.resourceUrl + "/" + id, {observe: 'response'});
    };
    BiometricService.prototype.identify = function (reader) {
        var accessToken = this.authServerProvider.getToken();
        var url = new URL(this.proxyUrl + "/identify");
        url.searchParams.append('reader', reader);
        url.searchParams.append('server', window.location.host);
        url.searchParams.append('accessToken', accessToken);
        return this.getObservableFromFetch(url);
    };
    BiometricService.prototype.convertDateFromClient = function (biometric) {
        var copy = Object.assign({}, biometric, {
            date: biometric.date != null && biometric.date.isValid() ? biometric.date.format(DATE_FORMAT) : null,
        });
        return copy;
    };
    BiometricService.prototype.convertDateFromServer = function (res) {
        if (res.body) {
            res.body.date = res.body.date != null ? moment(res.body.date) : null;
        }
        return res;
    };
    BiometricService.prototype.convertDateArrayFromServer = function (res) {
        if (res.body) {
            res.body.forEach(function (biometric) {
                biometric.date = biometric.date != null ? moment(biometric.date) : null;
            });
        }
        return res;
    };
    BiometricService.prototype.getObservableFromFetch = function (url, opts) {
        //Create and return an Observable.
        return new Observable(function (observer) {
            //Make use of Fetch API to get data from URL
            fetch(url, opts || {})
                .then(function (res) {
                    /*The response.json() doesn't return json, it returns a "readable stream" which is a promise which needs to be resolved to get the actual data.*/
                    return res.json();
                })
                .then(function (body) {
                    observer.next(body);
                    /*Complete the Observable as it won't produce any more event */
                    observer.complete();
                })
                //Handle error
                .catch(function (err) {
                    return observer.error(err);
                });
        });
    };
    BiometricService.ctorParameters = function () {
        return [
            {type: HttpClient},
            {type: undefined, decorators: [{type: Inject, args: [SERVER_API_URL_CONFIG,]}]},
            {type: AuthServerProvider}
        ];
    };
    BiometricService.ngInjectableDef = i0.ɵɵdefineInjectable({
        factory: function BiometricService_Factory() {
            return new BiometricService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.SERVER_API_URL_CONFIG), i0.ɵɵinject(i2.AuthServerProvider));
        }, token: BiometricService, providedIn: "root"
    });
    BiometricService = tslib_1.__decorate([
        Injectable({providedIn: 'root'}),
        tslib_1.__param(1, Inject(SERVER_API_URL_CONFIG)),
        tslib_1.__metadata("design:paramtypes", [HttpClient, Object, AuthServerProvider])
    ], BiometricService);
    return BiometricService;
}());
export {BiometricService};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmlvbWV0cmljLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1iaW9tZXRyaWNzLTEuMC4wLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2Jpb21ldHJpYy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbEMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFdBQVcsRUFBRSxxQkFBcUIsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzdHLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQzs7OztBQUVsQyxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUM7QUFNdkI7SUFJSSwwQkFBc0IsSUFBZ0IsRUFBeUMsU0FBNkIsRUFDeEYsa0JBQXNDO1FBRHBDLFNBQUksR0FBSixJQUFJLENBQVk7UUFBeUMsY0FBUyxHQUFULFNBQVMsQ0FBb0I7UUFDeEYsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUpuRCxnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUN4QixhQUFRLEdBQUcsc0NBQXNDLENBQUM7UUFJOUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUMsY0FBYyxHQUFHLGlCQUFpQixDQUFDO0lBQ3BFLENBQUM7SUFFRCx3Q0FBYSxHQUFiLFVBQWMsVUFBdUI7UUFBckMsaUJBR0M7UUFGRyxVQUFVLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxVQUFBLFNBQVMsSUFBSSxPQUFBLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsRUFBckMsQ0FBcUMsQ0FBQyxDQUFD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S0FBSyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBbkIsQ0FBbUIsQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQzs7Z0JBdkYyQixVQUFVO2dEQUFHLE1BQU0sU0FBQyxxQkFBcUI7Z0JBQzdCLGtCQUFrQjs7O0lBTGpELGdCQUFnQjtRQUQ1QixVQUFVLENBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDLENBQUM7UUFLWSxtQkFBQSxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQTtpREFBMUMsVUFBVSxVQUNFLGtCQUFrQjtPQUxqRCxnQkFBZ0IsQ0E0RjVCOzJCQTFHRDtDQTBHQyxBQTVGRCxJQTRGQztTQTVGWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEF1dGhTZXJ2ZXJQcm92aWRlciwgREFURV9GT1JNQVQsIFNFUlZFUl9BUElfVVJMX0NPTkZJRywgU2VydmVyQXBpVXJsQ29uZmlnIH0gZnJvbSAnQGxhbWlzL3dlYi1jb3JlJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEJpb21ldHJpYywgUGF0aWVudCB9IGZyb20gJy4uL21vZGVsL2Jpb21ldHJpYy5tb2RlbCc7XG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XG5cbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XG5cbnR5cGUgRW50aXR5UmVzcG9uc2VUeXBlID0gSHR0cFJlc3BvbnNlPEJpb21ldHJpYz47XG50eXBlIEVudGl0eUFycmF5UmVzcG9uc2VUeXBlID0gSHR0cFJlc3BvbnNlPEJpb21ldHJpY1tdPjtcblxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgQmlvbWV0cmljU2VydmljZSB7XG4gICAgcHVibGljIHJlc291cmNlVXJsID0gJyc7XG4gICAgcHJveHlVcmwgPSAnaHR0cDovL2xvY2FsaG9zdDo4ODg4L2FwaS9iaW9tZXRyaWNzJztcblxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBodHRwOiBIdHRwQ2xpZW50LCBASW5qZWN0KFNFUlZFUl9BUElfVVJMX0NPTkZJRykgcHJpdmF0ZSBzZXJ2ZXJVcmw6IFNlcnZlckFwaVVybENvbmZpZyxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGF1dGhTZXJ2ZXJQcm92aWRlcjogQXV0aFNlcnZlclByb3ZpZGVyKSB7XG4gICAgICAgIHRoaXMucmVzb3VyY2VVcmwgPSBzZXJ2ZXJVcmwuU0VSVkVSX0FQSV9VUkwgKyAnL2FwaS9iaW9tZXRyaWNzJztcbiAgICB9XG5cbiAgICBzYXZlVGVtcGxhdGVzKGJpb21ldHJpY3M6IEJpb21ldHJpY1tdKSB7XG4gICAgICAgIGJpb21ldHJpY3MgPSBiaW9tZXRyaWNzLm1hcChiaW9tZXRyaWMgPT4gdGhpcy5jb252ZXJ0RGF0ZUZyb21DbGllbnQoYmlvbWV0cmljKSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChgJHt0aGlzLnJlc291cmNlVXJsfS90ZW1wbGF0ZXNgLCBiaW9tZXRyaWNzLCB7b2JzZXJ2ZTogJ3Jlc3BvbnNlJ30pXG4gICAgfVxuXG4gICAgZ2V0QmlvbWV0cmljKGlkOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8QmlvbWV0cmljPihgJHt0aGlzLnJlc291cmNlVXJsfS8ke2lkfWApXG4gICAgfVxuXG4gICAgZ2V0UGF0aWVudChpZDogYW55KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PFBhdGllbnQ+KGAvYXBpL3BhdGllbnRzL2J5LXV1aWQvJHtpZH1gLCB7b2JzZXJ2ZTogJ2JvZHknfSlcbiAgICAgICAgICAgIC5waXBlKG1hcCgocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgICAgICAgICAgICByZXMuZGF0ZVJlZ2lzdHJhdGlvbiA9IHJlcy5kYXRlUmVnaXN0cmF0aW9uICE9IG51bGwgPyBtb21lbnQocmVzLmRhdGVSZWdpc3RyYXRpb24pIDogbnVsbFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgICAgfSkpXG4gICAgfVxuXG4gICAgZ2V0UmVhZGVycygpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRPYnNlcnZhYmxlRnJvbUZldGNoKGAke3RoaXMucHJveHlVcmx9L3JlYWRlcnNgKVxuICAgIH1cblxuICAgIGZpbmRCeVBhdGllbnQoaWQ6IG51bWJlcik6IE9ic2VydmFibGU8RW50aXR5QXJyYXlSZXNwb25zZVR5cGU+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgICAgICAgLmdldDxCaW9tZXRyaWNbXT4oYCR7dGhpcy5yZXNvdXJjZVVybH0vcGF0aWVudC8ke2lkfWAsIHtvYnNlcnZlOiAncmVzcG9uc2UnfSlcbiAgICAgICAgICAgIC5waXBlKG1hcCgocmVzOiBFbnRpdHlBcnJheVJlc3BvbnNlVHlwZSkgPT4gdGhpcy5jb252ZXJ0RGF0ZUFycmF5RnJvbVNlcnZlcihyZXMpKSk7XG4gICAgfVxuXG4gICAgZGVsZXRlKGlkOiBudW1iZXIpOiBPYnNlcnZhYmxlPEh0dHBSZXNwb25zZTxhbnk+PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlPGFueT4oYCR7dGhpcy5yZXNvdXJjZVVybH0vJHtpZH1gLCB7b2JzZXJ2ZTogJ3Jlc3BvbnNlJ30pO1xuICAgIH1cblxuICAgIGlkZW50aWZ5KHJlYWRlcjogc3RyaW5nKTogYW55IHtcbiAgICAgICAgY29uc3QgYWNjZXNzVG9rZW4gPSB0aGlzLmF1dGhTZXJ2ZXJQcm92aWRlci5nZXRUb2tlbigpO1xuICAgICAgICBsZXQgdXJsID0gbmV3IFVSTChgJHt0aGlzLnByb3h5VXJsfS9pZGVudGlmeWApO1xuICAgICAgICB1cmwuc2VhcmNoUGFyYW1zLmFwcGVuZCgncmVhZGVyJywgcmVhZGVyKTtcbiAgICAgICAgdXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoJ3NlcnZlcicsIHdpbmRvdy5sb2NhdGlvbi5ob3N0KTtcbiAgICAgICAgdXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoJ2FjY2Vzc1Rva2VuJywgYWNjZXNzVG9rZW4pO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRPYnNlcnZhYmxlRnJvbUZldGNoKHVybCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNvbnZlcnREYXRlRnJvbUNsaWVudChiaW9tZXRyaWM6IEJpb21ldHJpYyk6IEJpb21ldHJpYyB7XG4gICAgICAgIGNvbnN0IGNvcHk6IEJpb21ldHJpYyA9IE9iamVjdC5hc3NpZ24oe30sIGJpb21ldHJpYywge1xuICAgICAgICAgICAgZGF0ZTogYmlvbWV0cmljLmRhdGUgIT0gbnVsbCAmJiBiaW9tZXRyaWMuZGF0ZS5pc1ZhbGlkKCkgPyBiaW9tZXRyaWMuZGF0ZS5mb3JtYXQoREFURV9GT1JNQVQpIDogbnVsbCxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjb3B5O1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjb252ZXJ0RGF0ZUZyb21TZXJ2ZXIocmVzOiBFbnRpdHlSZXNwb25zZVR5cGUpOiBFbnRpdHlSZXNwb25zZVR5cGUge1xuICAgICAgICBpZiAocmVzLmJvZHkpIHtcbiAgICAgICAgICAgIHJlcy5ib2R5LmRhdGUgPSByZXMuYm9keS5kYXRlICE9IG51bGwgPyBtb21lbnQocmVzLmJvZHkuZGF0ZSkgOiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNvbnZlcnREYXRlQXJyYXlGcm9tU2VydmVyKHJlczogRW50aXR5QXJyYXlSZXNwb25zZVR5cGUpOiBFbnRpdHlBcnJheVJlc3BvbnNlVHlwZSB7XG4gICAgICAgIGlmIChyZXMuYm9keSkge1xuICAgICAgICAgICAgcmVzLmJvZHkuZm9yRWFjaCgoYmlvbWV0cmljOiBCaW9tZXRyaWMpID0+IHtcbiAgICAgICAgICAgICAgICBiaW9tZXRyaWMuZGF0ZSA9IGJpb21ldHJpYy5kYXRlICE9IG51bGwgPyBtb21lbnQoYmlvbWV0cmljLmRhdGUpIDogbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuXG4gICAgZ2V0T2JzZXJ2YWJsZUZyb21GZXRjaCh1cmwsIG9wdHM/KSB7XG4gICAgICAgIC8vQ3JlYXRlIGFuZCByZXR1cm4gYW4gT2JzZXJ2YWJsZS5cbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKG9ic2VydmVyID0+IHtcbiAgICAgICAgICAgIC8vTWFrZSB1c2Ugb2YgRmV0Y2ggQVBJIHRvIGdldCBkYXRhIGZyb20gVVJMXG4gICAgICAgICAgICBmZXRjaCh1cmwsIG9wdHMgfHwge30pXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLypUaGUgcmVzcG9uc2UuanNvbigpIGRvZXNuJ3QgcmV0dXJuIGpzb24sIGl0IHJldHVybnMgYSBcInJlYWRhYmxlIHN0cmVhbVwiIHdoaWNoIGlzIGEgcHJvbWlzZSB3aGljaCBuZWVkcyB0byBiZSByZXNvbHZlZCB0byBnZXQgdGhlIGFjdHVhbCBkYXRhLiovXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oYm9keSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLm5leHQoYm9keSk7XG4gICAgICAgICAgICAgICAgICAgIC8qQ29tcGxldGUgdGhlIE9ic2VydmFibGUgYXMgaXQgd29uJ3QgcHJvZHVjZSBhbnkgbW9yZSBldmVudCAqL1xuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLy9IYW5kbGUgZXJyb3JcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXJyID0+IG9ic2VydmVyLmVycm9yKGVycikpO1xuICAgICAgICB9KVxuICAgIH1cbn1cbiJdfQ==
