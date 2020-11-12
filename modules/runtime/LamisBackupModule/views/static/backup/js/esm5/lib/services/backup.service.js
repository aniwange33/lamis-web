import * as tslib_1 from "tslib";
import {Inject, Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {SERVER_API_URL_CONFIG} from "@lamis/web-core";

var BackupService = /** @class */ (function () {
    function BackupService(http, serverUrl) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.resourceUrl = '';
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/backup';
    }

    BackupService.prototype.uploadFile = function (form) {
        return this.http.post(this.resourceUrl + '/upload', form, {'observe': 'response'});
    };
    BackupService.prototype.download = function () {
        return this.http.get(this.resourceUrl + "/download", {responseType: 'blob'});
    };
    BackupService.prototype.restore = function () {
        return this.http.get(this.resourceUrl + "/restore");
    };
    BackupService.prototype.revert = function () {
        return this.http.get(this.resourceUrl + "/revert");
    };
    BackupService.prototype.backupAvailable = function () {
        return this.http.get(this.resourceUrl + "/backup-available");
    };
    BackupService.prototype.backup = function () {
        return this.http.get(this.resourceUrl + "/backup");
    };
    BackupService.ctorParameters = function () {
        return [
            {type: HttpClient},
            {type: undefined, decorators: [{type: Inject, args: [SERVER_API_URL_CONFIG,]}]}
        ];
    };
    BackupService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__param(1, Inject(SERVER_API_URL_CONFIG)),
        tslib_1.__metadata("design:paramtypes", [HttpClient, Object])
    ], BackupService);
    return BackupService;
}());
export {BackupService};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja3VwLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1iYWNrdXAvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvYmFja3VwLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDaEUsT0FBTyxFQUFFLHFCQUFxQixFQUFzQixNQUFNLGlCQUFpQixDQUFDO0FBSTVFO0lBR0ksdUJBQW9CLElBQWdCLEVBQXlDLFNBQTZCO1FBQXRGLFNBQUksR0FBSixJQUFJLENBQVk7UUFBeUMsY0FBUyxHQUFULFNBQVMsQ0FBb0I7UUFGbkcsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFHcEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztJQUNoRSxDQUFDO0lBR00sa0NBQVUsR0FBakIsVUFBa0IsSUFBSTtRQUNsQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFNLElBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUMsQ0FBQyxDQUFBO0lBQzNGLENBQUM7SUFFRCxnQ0FBUSxHQUFSO1FBQ0ksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBSSxJQUFJLENBQUMsV0FBVyxjQUFXLEVBQUUsRUFBQyxZQUFZLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQTtJQUNoRixDQUFDO0lBRUQsK0JBQU8sR0FBUDtRQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQWMsSUFBSSxDQUFDLFdBQVcsYUFBVSxDQUFDLENBQUE7SUFDakUsQ0FBQztJQUVELDhCQUFNLEdBQU47UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFjLElBQUksQ0FBQyxXQUFXLFlBQVMsQ0FBQyxDQUFBO0lBQ2hFLENBQUM7SUFFRCx1Q0FBZSxHQUFmO1FBQ0ksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBYSxJQUFJLENBQUMsV0FBVyxzQkFBbUIsQ0FBQyxDQUFBO0lBQ3pFLENBQUM7SUFFRCw4QkFBTSxHQUFOO1FBQ0ksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBSSxJQUFJLENBQUMsV0FBVyxZQUFTLENBQUMsQ0FBQTtJQUN0RCxDQUFDOztnQkEzQnlCLFVBQVU7Z0RBQUcsTUFBTSxTQUFDLHFCQUFxQjs7SUFIMUQsYUFBYTtRQUR6QixVQUFVLEVBQUU7UUFJOEIsbUJBQUEsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUE7aURBQTFDLFVBQVU7T0FIM0IsYUFBYSxDQStCekI7SUFBRCxvQkFBQztDQUFBLEFBL0JELElBK0JDO1NBL0JZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XG5pbXBvcnQgeyBTRVJWRVJfQVBJX1VSTF9DT05GSUcsIFNlcnZlckFwaVVybENvbmZpZyB9IGZyb20gXCJAbGFtaXMvd2ViLWNvcmVcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqc1wiO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQmFja3VwU2VydmljZSB7XG4gICAgcHVibGljIHJlc291cmNlVXJsID0gJyc7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsIEBJbmplY3QoU0VSVkVSX0FQSV9VUkxfQ09ORklHKSBwcml2YXRlIHNlcnZlclVybDogU2VydmVyQXBpVXJsQ29uZmlnKSB7XG4gICAgICAgIHRoaXMucmVzb3VyY2VVcmwgPSBzZXJ2ZXJVcmwuU0VSVkVSX0FQSV9VUkwgKyAnL2FwaS9iYWNrdXAnO1xuICAgIH1cblxuXG4gICAgcHVibGljIHVwbG9hZEZpbGUoZm9ybSk6IE9ic2VydmFibGU8SHR0cFJlc3BvbnNlPGFueT4+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PGFueT4odGhpcy5yZXNvdXJjZVVybCArICcvdXBsb2FkJywgZm9ybSwgeydvYnNlcnZlJzogJ3Jlc3BvbnNlJ30pXG4gICAgfVxuXG4gICAgZG93bmxvYWQoKTogT2JzZXJ2YWJsZTxCbG9iPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGAke3RoaXMucmVzb3VyY2VVcmx9L2Rvd25sb2FkYCwge3Jlc3BvbnNlVHlwZTogJ2Jsb2InfSlcbiAgICB9XG5cbiAgICByZXN0b3JlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxzdHJpbmdbXT4oYCR7dGhpcy5yZXNvdXJjZVVybH0vcmVzdG9yZWApXG4gICAgfVxuXG4gICAgcmV2ZXJ0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxzdHJpbmdbXT4oYCR7dGhpcy5yZXNvdXJjZVVybH0vcmV2ZXJ0YClcbiAgICB9XG5cbiAgICBiYWNrdXBBdmFpbGFibGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PGJvb2xlYW4+KGAke3RoaXMucmVzb3VyY2VVcmx9L2JhY2t1cC1hdmFpbGFibGVgKVxuICAgIH1cblxuICAgIGJhY2t1cCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYCR7dGhpcy5yZXNvdXJjZVVybH0vYmFja3VwYClcbiAgICB9XG59Il19
