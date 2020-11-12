import * as tslib_1 from "tslib";
import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {DATE_FORMAT, SERVER_API_URL_CONFIG} from '@lamis/web-core';
import {map} from 'rxjs/operators';
import * as moment_ from 'moment';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@lamis/web-core";

const moment = moment_;
let LaboratoryService = class LaboratoryService {
    constructor(http, serverUrl) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.resourceUrl = '';
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/laboratories';
    }

    create(laboratory) {
        const copy = this.convertDateFromClient(laboratory);
        return this.http
            .post(this.resourceUrl, copy, {observe: 'response'})
            .pipe(map((res) => this.convertDateFromServer(res)));
    }

    update(laboratory) {
        const copy = this.convertDateFromClient(laboratory);
        return this.http
            .put(this.resourceUrl, copy, {observe: 'response'})
            .pipe(map((res) => this.convertDateFromServer(res)));
    }

    find(id) {
        return this.http
            .get(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .pipe(map((res) => this.convertDateFromServer(res)));
    }

    findByUuid(id) {
        return this.http
            .get(`${this.resourceUrl}/by-uuid/${id}`, {observe: 'response'})
            .pipe(map((res) => this.convertDateFromServer(res)));
    }

    delete(id) {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    getPatient(id) {
        return this.http.get(`/api/patients/by-uuid/${id}`, {observe: 'body'})
            .pipe(map((res) => {
                if (res) {
                    res.dateRegistration = res.dateRegistration != null ? moment(res.dateRegistration) : null;
                }
                return res;
            }));
    }

    getVisitDatesByPatient(patientId) {
        return this.http.get(`${this.resourceUrl}/patient/${patientId}/report-dates`)
            .pipe(map((res) => {
                res.forEach(d => moment(d));
                return res;
            }));
    }

    laboratoryCategories() {
        return this.http.get(`${this.resourceUrl}/test-categories`);
    }

    getLinesByLaboratory(laboratoryId) {
        return this.http.get(`${this.resourceUrl}/${laboratoryId}/lines`);
    }

    labTestsByCategory(id) {
        return this.http.get(`${this.resourceUrl}/lab-tests/category/${id}`);
    }

    getLabTestById(id) {
        return this.http.get(`${this.resourceUrl}/lab-test/${id}`);
    }

    latestVisit(patientId) {
        return this.http.get(`${this.resourceUrl}/patient/${patientId}/latest`);
    }

    convertDateFromClient(laboratory) {
        const copy = Object.assign({}, laboratory, {
            dateReported: laboratory.dateResultReceived != null && laboratory.dateResultReceived.isValid() ? laboratory.dateResultReceived.format(DATE_FORMAT) : null,
            dateAssay: laboratory.dateAssay != null && laboratory.dateAssay.isValid() ? laboratory.dateAssay.format(DATE_FORMAT) : null,
            dateSampleCollected: laboratory.dateSampleCollected != null && laboratory.dateSampleCollected.isValid() ? laboratory.dateSampleCollected.format(DATE_FORMAT) : null
        });
        return copy;
    }

    convertDateFromServer(res) {
        if (res.body) {
            res.body.dateSampleCollected = res.body.dateSampleCollected != null ? moment(res.body.dateSampleCollected) : null;
            res.body.dateResultReceived = res.body.dateResultReceived != null ? moment(res.body.dateResultReceived) : null;
            res.body.dateAssay = res.body.dateAssay != null ? moment(res.body.dateAssay) : null;
        }
        return res;
    }

    convertDateArrayFromServer(res) {
        if (res.body) {
            res.body.forEach((laboratory) => {
                laboratory.dateResultReceived = laboratory.dateResultReceived != null ? moment(laboratory.dateResultReceived) : null;
                laboratory.dateAssay = laboratory.dateAssay != null ? moment(laboratory.dateAssay) : null;
                laboratory.dateSampleCollected = laboratory.dateSampleCollected != null ? moment(laboratory.dateSampleCollected) : null;
                1;
            });
        }
        return res;
    }
};
LaboratoryService.ctorParameters = () => [
    {type: HttpClient},
    {type: undefined, decorators: [{type: Inject, args: [SERVER_API_URL_CONFIG,]}]}
];
LaboratoryService.ngInjectableDef = i0.ɵɵdefineInjectable({
    factory: function LaboratoryService_Factory() {
        return new LaboratoryService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.SERVER_API_URL_CONFIG));
    }, token: LaboratoryService, providedIn: "root"
});
LaboratoryService = tslib_1.__decorate([
    Injectable({providedIn: 'root'}),
    tslib_1.__param(1, Inject(SERVER_API_URL_CONFIG)),
    tslib_1.__metadata("design:paramtypes", [HttpClient, Object])
], LaboratoryService);
export {LaboratoryService};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFib3JhdG9yeS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGFtaXMtbGFib3JhdG9yeS0xLjEuMS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9sYWJvcmF0b3J5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFaEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxxQkFBcUIsRUFBc0IsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RixPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7Ozs7QUFHbEMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDO0FBTXZCLElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWlCO0lBRzFCLFlBQXNCLElBQWdCLEVBQXlDLFNBQTZCO1FBQXRGLFNBQUksR0FBSixJQUFJLENBQVk7UUFBeUMsY0FBUyxHQUFULFNBQVMsQ0FBb0I7UUFGckcsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFHcEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUMsY0FBYyxHQUFHLG1CQUFtQixDQUFDO0lBQ3RFLENBQUM7SUFFRCxNQUFNLENBQUMsVUFBc0I7UUFDekIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3BELE9BQU8sSUFBSSxDQUFDLElBQUk7YUFDWCxJQUFJLENBQWEsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFDLENBQUM7YUFDL0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQXVCLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakYsQ0FBQztJQUVELE1BQU0sQ0FBQyxVQUFzQjtRQUN6QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDcEQsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNYLEdBQUcsQ0FBYSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUMsQ0FBQzthQUM5RCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBdUIsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqRixDQUFDO0lBRUQsSUFBSSxDQUFDLEVBQVU7UUFDWCxPQUFPLElBQUksQ0FBQyxJQUFJO2FBQ1gsR0FBRyxDQUFhLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUMsQ0FBQzthQUNuRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBdUIsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqRixDQUFDO0lBRUQsVUFBVSxDQUFDLEVBQVU7UUFDakIsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNYLEdBQUcsQ0FBYSxHQUFHLElBQUksQ0FBQyxXQUFXLFlBQVksRUFBRSxFQUFFLEVBQUUsRUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFDLENBQUM7YUFDM0UsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQXVCLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakYsQ0FBQztJQUVELE1BQU0sQ0FBQyxFQUFVO1FBQ2IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBTSxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFDLENBQUMsQ0FBQztJQUNyRixDQUFDO0lBRUQsVUFBVSxDQUFDLEVBQU87UUFDZCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFVLHlCQUF5QixFQUFFLEVBQUUsRUFBRSxFQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUMsQ0FBQzthQUMxRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDZCxJQUFJLEdBQUcsRUFBRTtnQkFDTCxHQUFHLENBQUMsZ0JBQWdCLEdBQUcsR0FBRyxDQUFDLGdCQUFnQixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUE7YUFDNUY7WUFDRCxPQUFPLEdBQUcsQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDWCxDQUFDO0lBRUQsc0JBQXNCLENBQUMsU0FBaUI7UUFDcEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLFlBQVksU0FBUyxlQUFlLENBQUM7YUFDbEYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ1YsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLE9BQU8sR0FBRyxDQUFDO1FBQ2YsQ0FBQyxDQUFDLENBQ0wsQ0FBQTtJQUNULENBQUM7SUFFRCxvQkFBb0I7UUFDaEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBb0IsR0FBRyxJQUFJLENBQUMsV0FBVyxrQkFBa0IsQ0FBQyxDQUFBO0lBQ2xGLENBQUM7SUFFRCxvQkFBb0IsQ0FBQyxZQUFvQjtRQUNyQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFtQixHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksWUFBWSxRQUFRLENBQUMsQ0FBQTtJQUN2RixDQUFDO0lBRUQsa0JBQWtCLENBQUMsRUFBVTtRQUN6QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFZLEdBQUcsSUFBSSxDQUFDLFdBQVcsdUJBQXVCLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDbkYsQ0FBQztJQUVELGNBQWMsQ0FBQyxFQUFFO1FBQ2IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBVSxHQUFHLElBQUksQ0FBQyxXQUFXLGFBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQTtJQUN2RSxDQUFDO0lBRUQsV0FBVyxDQUFDLFNBQWlCO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQWEsR0FBRyxJQUFJLENBQUMsV0FBVyxZQUFZLFNBQVMsU0FBUyxDQUFDLENBQUE7SUFDdkYsQ0FBQztJQUVTLHFCQUFxQixDQUFDLFVBQXNCO1FBQ2xELE1BQU0sSUFBSSxHQUFlLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFVBQVUsRUFBRTtZQUNuRCxZQUFZLEVBQUUsVUFBVSxDQUFDLGtCQUFrQixJQUFJLElBQUksSUFBSSxVQUFVLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUk7WUFDekosU0FBUyxFQUFFLFVBQVUsQ0FBQyxTQUFTLElBQUksSUFBSSxJQUFJLFVBQVUsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQzNILG1CQUFtQixFQUFFLFVBQVUsQ0FBQyxtQkFBbUIsSUFBSSxJQUFJLElBQUksVUFBVSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO1NBQ3RLLENBQUMsQ0FBQztRQUNILE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFUyxxQkFBcUIsQ0FBQyxHQUF1QjtRQUNuRCxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUU7WUFDVixHQUFHLENBQUMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDbEgsR0FBRyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLGtCQUFrQixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQy9HLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztTQUN2RjtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVTLDBCQUEwQixDQUFDLEdBQTRCO1FBQzdELElBQUksR0FBRyxDQUFDLElBQUksRUFBRTtZQUNWLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBc0IsRUFBRSxFQUFFO2dCQUN4QyxVQUFVLENBQUMsa0JBQWtCLEdBQUcsVUFBVSxDQUFDLGtCQUFrQixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ3JILFVBQVUsQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDMUYsVUFBVSxDQUFDLG1CQUFtQixHQUFHLFVBQVUsQ0FBQyxtQkFBbUIsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUN4SCxDQUFDLENBQUE7WUFDTCxDQUFDLENBQUMsQ0FBQztTQUNOO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0NBQ0osQ0FBQTs7WUF0RytCLFVBQVU7NENBQUcsTUFBTSxTQUFDLHFCQUFxQjs7O0FBSDVELGlCQUFpQjtJQUQ3QixVQUFVLENBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDLENBQUM7SUFJWSxtQkFBQSxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQTs2Q0FBMUMsVUFBVTtHQUg3QixpQkFBaUIsQ0F5RzdCO1NBekdZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgREFURV9GT1JNQVQsIFNFUlZFUl9BUElfVVJMX0NPTkZJRywgU2VydmVyQXBpVXJsQ29uZmlnIH0gZnJvbSAnQGxhbWlzL3dlYi1jb3JlJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IExhYm9yYXRvcnksIExhYm9yYXRvcnlMaW5lLCBMYWJUZXN0LCBMYWJUZXN0Q2F0ZWdvcnksIFBhdGllbnQgfSBmcm9tICcuLi9tb2RlbC9sYWJvcmF0b3J5Lm1vZGVsJztcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcbmltcG9ydCB7IE1vbWVudCB9IGZyb20gJ21vbWVudCc7XG5cbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XG5cbnR5cGUgRW50aXR5UmVzcG9uc2VUeXBlID0gSHR0cFJlc3BvbnNlPExhYm9yYXRvcnk+O1xudHlwZSBFbnRpdHlBcnJheVJlc3BvbnNlVHlwZSA9IEh0dHBSZXNwb25zZTxMYWJvcmF0b3J5W10+O1xuXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBMYWJvcmF0b3J5U2VydmljZSB7XG4gICAgcHVibGljIHJlc291cmNlVXJsID0gJyc7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudCwgQEluamVjdChTRVJWRVJfQVBJX1VSTF9DT05GSUcpIHByaXZhdGUgc2VydmVyVXJsOiBTZXJ2ZXJBcGlVcmxDb25maWcpIHtcbiAgICAgICAgdGhpcy5yZXNvdXJjZVVybCA9IHNlcnZlclVybC5TRVJWRVJfQVBJX1VSTCArICcvYXBpL2xhYm9yYXRvcmllcyc7XG4gICAgfVxuXG4gICAgY3JlYXRlKGxhYm9yYXRvcnk6IExhYm9yYXRvcnkpOiBPYnNlcnZhYmxlPEVudGl0eVJlc3BvbnNlVHlwZT4ge1xuICAgICAgICBjb25zdCBjb3B5ID0gdGhpcy5jb252ZXJ0RGF0ZUZyb21DbGllbnQobGFib3JhdG9yeSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgICAgICAgIC5wb3N0PExhYm9yYXRvcnk+KHRoaXMucmVzb3VyY2VVcmwsIGNvcHksIHtvYnNlcnZlOiAncmVzcG9uc2UnfSlcbiAgICAgICAgICAgIC5waXBlKG1hcCgocmVzOiBFbnRpdHlSZXNwb25zZVR5cGUpID0+IHRoaXMuY29udmVydERhdGVGcm9tU2VydmVyKHJlcykpKTtcbiAgICB9XG5cbiAgICB1cGRhdGUobGFib3JhdG9yeTogTGFib3JhdG9yeSk6IE9ic2VydmFibGU8RW50aXR5UmVzcG9uc2VUeXBlPiB7XG4gICAgICAgIGNvbnN0IGNvcHkgPSB0aGlzLmNvbnZlcnREYXRlRnJvbUNsaWVudChsYWJvcmF0b3J5KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgICAgICAgLnB1dDxMYWJvcmF0b3J5Pih0aGlzLnJlc291cmNlVXJsLCBjb3B5LCB7b2JzZXJ2ZTogJ3Jlc3BvbnNlJ30pXG4gICAgICAgICAgICAucGlwZShtYXAoKHJlczogRW50aXR5UmVzcG9uc2VUeXBlKSA9PiB0aGlzLmNvbnZlcnREYXRlRnJvbVNlcnZlcihyZXMpKSk7XG4gICAgfVxuXG4gICAgZmluZChpZDogbnVtYmVyKTogT2JzZXJ2YWJsZTxFbnRpdHlSZXNwb25zZVR5cGU+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgICAgICAgLmdldDxMYWJvcmF0b3J5PihgJHt0aGlzLnJlc291cmNlVXJsfS8ke2lkfWAsIHtvYnNlcnZlOiAncmVzcG9uc2UnfSlcbiAgICAgICAgICAgIC5waXBlKG1hcCgocmVzOiBFbnRpdHlSZXNwb25zZVR5cGUpID0+IHRoaXMuY29udmVydERhdGVGcm9tU2VydmVyKHJlcykpKTtcbiAgICB9XG5cbiAgICBmaW5kQnlVdWlkKGlkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEVudGl0eVJlc3BvbnNlVHlwZT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAgICAgICAuZ2V0PExhYm9yYXRvcnk+KGAke3RoaXMucmVzb3VyY2VVcmx9L2J5LXV1aWQvJHtpZH1gLCB7b2JzZXJ2ZTogJ3Jlc3BvbnNlJ30pXG4gICAgICAgICAgICAucGlwZShtYXAoKHJlczogRW50aXR5UmVzcG9uc2VUeXBlKSA9PiB0aGlzLmNvbnZlcnREYXRlRnJvbVNlcnZlcihyZXMpKSk7XG4gICAgfVxuXG4gICAgZGVsZXRlKGlkOiBudW1iZXIpOiBPYnNlcnZhYmxlPEh0dHBSZXNwb25zZTxhbnk+PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlPGFueT4oYCR7dGhpcy5yZXNvdXJjZVVybH0vJHtpZH1gLCB7b2JzZXJ2ZTogJ3Jlc3BvbnNlJ30pO1xuICAgIH1cblxuICAgIGdldFBhdGllbnQoaWQ6IGFueSkge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxQYXRpZW50PihgL2FwaS9wYXRpZW50cy9ieS11dWlkLyR7aWR9YCwge29ic2VydmU6ICdib2R5J30pXG4gICAgICAgICAgICAucGlwZShtYXAoKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLmRhdGVSZWdpc3RyYXRpb24gPSByZXMuZGF0ZVJlZ2lzdHJhdGlvbiAhPSBudWxsID8gbW9tZW50KHJlcy5kYXRlUmVnaXN0cmF0aW9uKSA6IG51bGxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICAgIH0pKVxuICAgIH1cblxuICAgIGdldFZpc2l0RGF0ZXNCeVBhdGllbnQocGF0aWVudElkOiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8TW9tZW50W10+KGAke3RoaXMucmVzb3VyY2VVcmx9L3BhdGllbnQvJHtwYXRpZW50SWR9L3JlcG9ydC1kYXRlc2ApXG4gICAgICAgICAgICAucGlwZShtYXAoKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXMuZm9yRWFjaChkID0+IG1vbWVudChkKSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICB9XG5cbiAgICBsYWJvcmF0b3J5Q2F0ZWdvcmllcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8TGFiVGVzdENhdGVnb3J5W10+KGAke3RoaXMucmVzb3VyY2VVcmx9L3Rlc3QtY2F0ZWdvcmllc2ApXG4gICAgfVxuXG4gICAgZ2V0TGluZXNCeUxhYm9yYXRvcnkobGFib3JhdG9yeUlkOiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8TGFib3JhdG9yeUxpbmVbXT4oYCR7dGhpcy5yZXNvdXJjZVVybH0vJHtsYWJvcmF0b3J5SWR9L2xpbmVzYClcbiAgICB9XG5cbiAgICBsYWJUZXN0c0J5Q2F0ZWdvcnkoaWQ6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxMYWJUZXN0W10+KGAke3RoaXMucmVzb3VyY2VVcmx9L2xhYi10ZXN0cy9jYXRlZ29yeS8ke2lkfWApXG4gICAgfVxuXG4gICAgZ2V0TGFiVGVzdEJ5SWQoaWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8TGFiVGVzdD4oYCR7dGhpcy5yZXNvdXJjZVVybH0vbGFiLXRlc3QvJHtpZH1gKVxuICAgIH1cblxuICAgIGxhdGVzdFZpc2l0KHBhdGllbnRJZDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PExhYm9yYXRvcnk+KGAke3RoaXMucmVzb3VyY2VVcmx9L3BhdGllbnQvJHtwYXRpZW50SWR9L2xhdGVzdGApXG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNvbnZlcnREYXRlRnJvbUNsaWVudChsYWJvcmF0b3J5OiBMYWJvcmF0b3J5KTogTGFib3JhdG9yeSB7XG4gICAgICAgIGNvbnN0IGNvcHk6IExhYm9yYXRvcnkgPSBPYmplY3QuYXNzaWduKHt9LCBsYWJvcmF0b3J5LCB7XG4gICAgICAgICAgICBkYXRlUmVwb3J0ZWQ6IGxhYm9yYXRvcnkuZGF0ZVJlc3VsdFJlY2VpdmVkICE9IG51bGwgJiYgbGFib3JhdG9yeS5kYXRlUmVzdWx0UmVjZWl2ZWQuaXNWYWxpZCgpID8gbGFib3JhdG9yeS5kYXRlUmVzdWx0UmVjZWl2ZWQuZm9ybWF0KERBVEVfRk9STUFUKSA6IG51bGwsXG4gICAgICAgICAgICBkYXRlQXNzYXk6IGxhYm9yYXRvcnkuZGF0ZUFzc2F5ICE9IG51bGwgJiYgbGFib3JhdG9yeS5kYXRlQXNzYXkuaXNWYWxpZCgpID8gbGFib3JhdG9yeS5kYXRlQXNzYXkuZm9ybWF0KERBVEVfRk9STUFUKSA6IG51bGwsXG4gICAgICAgICAgICBkYXRlU2FtcGxlQ29sbGVjdGVkOiBsYWJvcmF0b3J5LmRhdGVTYW1wbGVDb2xsZWN0ZWQgIT0gbnVsbCAmJiBsYWJvcmF0b3J5LmRhdGVTYW1wbGVDb2xsZWN0ZWQuaXNWYWxpZCgpID8gbGFib3JhdG9yeS5kYXRlU2FtcGxlQ29sbGVjdGVkLmZvcm1hdChEQVRFX0ZPUk1BVCkgOiBudWxsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY29weTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY29udmVydERhdGVGcm9tU2VydmVyKHJlczogRW50aXR5UmVzcG9uc2VUeXBlKTogRW50aXR5UmVzcG9uc2VUeXBlIHtcbiAgICAgICAgaWYgKHJlcy5ib2R5KSB7XG4gICAgICAgICAgICByZXMuYm9keS5kYXRlU2FtcGxlQ29sbGVjdGVkID0gcmVzLmJvZHkuZGF0ZVNhbXBsZUNvbGxlY3RlZCAhPSBudWxsID8gbW9tZW50KHJlcy5ib2R5LmRhdGVTYW1wbGVDb2xsZWN0ZWQpIDogbnVsbDtcbiAgICAgICAgICAgIHJlcy5ib2R5LmRhdGVSZXN1bHRSZWNlaXZlZCA9IHJlcy5ib2R5LmRhdGVSZXN1bHRSZWNlaXZlZCAhPSBudWxsID8gbW9tZW50KHJlcy5ib2R5LmRhdGVSZXN1bHRSZWNlaXZlZCkgOiBudWxsO1xuICAgICAgICAgICAgcmVzLmJvZHkuZGF0ZUFzc2F5ID0gcmVzLmJvZHkuZGF0ZUFzc2F5ICE9IG51bGwgPyBtb21lbnQocmVzLmJvZHkuZGF0ZUFzc2F5KSA6IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY29udmVydERhdGVBcnJheUZyb21TZXJ2ZXIocmVzOiBFbnRpdHlBcnJheVJlc3BvbnNlVHlwZSk6IEVudGl0eUFycmF5UmVzcG9uc2VUeXBlIHtcbiAgICAgICAgaWYgKHJlcy5ib2R5KSB7XG4gICAgICAgICAgICByZXMuYm9keS5mb3JFYWNoKChsYWJvcmF0b3J5OiBMYWJvcmF0b3J5KSA9PiB7XG4gICAgICAgICAgICAgICAgbGFib3JhdG9yeS5kYXRlUmVzdWx0UmVjZWl2ZWQgPSBsYWJvcmF0b3J5LmRhdGVSZXN1bHRSZWNlaXZlZCAhPSBudWxsID8gbW9tZW50KGxhYm9yYXRvcnkuZGF0ZVJlc3VsdFJlY2VpdmVkKSA6IG51bGw7XG4gICAgICAgICAgICAgICAgbGFib3JhdG9yeS5kYXRlQXNzYXkgPSBsYWJvcmF0b3J5LmRhdGVBc3NheSAhPSBudWxsID8gbW9tZW50KGxhYm9yYXRvcnkuZGF0ZUFzc2F5KSA6IG51bGw7XG4gICAgICAgICAgICAgICAgbGFib3JhdG9yeS5kYXRlU2FtcGxlQ29sbGVjdGVkID0gbGFib3JhdG9yeS5kYXRlU2FtcGxlQ29sbGVjdGVkICE9IG51bGwgPyBtb21lbnQobGFib3JhdG9yeS5kYXRlU2FtcGxlQ29sbGVjdGVkKSA6IG51bGw7XG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG59XG4iXX0=