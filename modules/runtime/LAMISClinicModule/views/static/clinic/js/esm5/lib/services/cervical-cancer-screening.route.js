import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CervicalCancerScreeningService } from './cervical-cancer-screening.service';
import { CervicalCancerScreeningDetailComponent } from '../components/cervical-cancer-screening/cervical-cancer-screening-detail.component';
import { CervicalCancerScreeningComponent } from '../components/cervical-cancer-screening/cervical-cancer-screening.component';
import * as i0 from "@angular/core";
import * as i1 from "./cervical-cancer-screening.service";
var ObservationResolve = /** @class */ (function () {
    function ObservationResolve(service) {
        this.service = service;
    }
    ObservationResolve.prototype.resolve = function (route, state) {
        var id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(filter(function (response) { return response.ok; }), map(function (patient) { return patient.body; }));
        }
        return of({});
    };
    ObservationResolve.ctorParameters = function () { return [
        { type: CervicalCancerScreeningService }
    ]; };
    ObservationResolve.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function ObservationResolve_Factory() { return new ObservationResolve(i0.ɵɵinject(i1.CervicalCancerScreeningService)); }, token: ObservationResolve, providedIn: "root" });
    ObservationResolve = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [CervicalCancerScreeningService])
    ], ObservationResolve);
    return ObservationResolve;
}());
export { ObservationResolve };
var ɵ0 = {
    title: 'Cervical Cancer Screening',
    breadcrumb: 'CERVICAL CANCER SCREENING'
}, ɵ1 = {
    authorities: ['ROLE_USER'],
    title: 'Cervical Cancer Screening',
    breadcrumb: 'CERVICAL CANCER SCREENING'
}, ɵ2 = {
    authorities: ['ROLE_DEC'],
    title: 'Cervical Cancer Screening',
    breadcrumb: 'ADD CERVICAL CANCER SCREENING'
}, ɵ3 = {
    authorities: ['ROLE_DEC'],
    title: 'Cervical Cancer Screening',
    breadcrumb: 'CERVICAL CANCER SCREENING EDIT'
};
export var ROUTES = [
    {
        path: '',
        data: ɵ0,
        children: [
            {
                path: ':id/patient/:patientId/view',
                component: CervicalCancerScreeningDetailComponent,
                resolve: {
                    entity: ObservationResolve
                },
                data: ɵ1,
            },
            {
                path: 'patient/:patientId/new',
                component: CervicalCancerScreeningComponent,
                data: ɵ2,
            },
            {
                path: ':id/patient/:patientId/edit',
                component: CervicalCancerScreeningComponent,
                resolve: {
                    entity: ObservationResolve
                },
                data: ɵ3,
            }
        ]
    }
];
export { ɵ0, ɵ1, ɵ2, ɵ3 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VydmljYWwtY2FuY2VyLXNjcmVlbmluZy5yb3V0ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xhbWlzLWNsaW5pYy0xLjQuMC8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9jZXJ2aWNhbC1jYW5jZXItc2NyZWVuaW5nLnJvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBYSxFQUFFLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDcEMsT0FBTyxFQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzQyxPQUFPLEVBQUMsOEJBQThCLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQUNuRixPQUFPLEVBQUMsc0NBQXNDLEVBQUMsTUFBTSxvRkFBb0YsQ0FBQztBQUMxSSxPQUFPLEVBQUMsZ0NBQWdDLEVBQUMsTUFBTSw2RUFBNkUsQ0FBQzs7O0FBSzdIO0lBQ0ksNEJBQW9CLE9BQXVDO1FBQXZDLFlBQU8sR0FBUCxPQUFPLENBQWdDO0lBQzNELENBQUM7SUFFRCxvQ0FBTyxHQUFQLFVBQVEsS0FBNkIsRUFBRSxLQUEwQjtRQUM3RCxJQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDMUQsSUFBSSxFQUFFLEVBQUU7WUFDSixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FDN0IsTUFBTSxDQUFDLFVBQUMsUUFBbUMsSUFBSyxPQUFBLFFBQVEsQ0FBQyxFQUFFLEVBQVgsQ0FBVyxDQUFDLEVBQzVELEdBQUcsQ0FBQyxVQUFDLE9BQWtDLElBQUssT0FBQSxPQUFPLENBQUMsSUFBSSxFQUFaLENBQVksQ0FBQyxDQUM1RCxDQUFDO1NBQ0w7UUFDRCxPQUFPLEVBQUUsQ0FBYyxFQUFFLENBQUMsQ0FBQztJQUMvQixDQUFDOztnQkFaNEIsOEJBQThCOzs7SUFEbEQsa0JBQWtCO1FBSDlCLFVBQVUsQ0FBQztZQUNSLFVBQVUsRUFBRSxNQUFNO1NBQ3JCLENBQUM7aURBRStCLDhCQUE4QjtPQURsRCxrQkFBa0IsQ0FjOUI7NkJBM0JEO0NBMkJDLEFBZEQsSUFjQztTQWRZLGtCQUFrQjtTQW1CakI7SUFDRixLQUFLLEVBQUUsMkJBQTJCO0lBQ2xDLFVBQVUsRUFBRSwyQkFBMkI7Q0FDMUMsT0FRYTtJQUNGLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQztJQUMxQixLQUFLLEVBQUUsMkJBQTJCO0lBQ2xDLFVBQVUsRUFBRSwyQkFBMkI7Q0FDMUMsT0FNSztJQUNGLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQztJQUN6QixLQUFLLEVBQUUsMkJBQTJCO0lBQ2xDLFVBQVUsRUFBRSwrQkFBK0I7Q0FDOUMsT0FTSztJQUNGLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQztJQUN6QixLQUFLLEVBQUUsMkJBQTJCO0lBQ2xDLFVBQVUsRUFBRSxnQ0FBZ0M7Q0FDL0M7QUF6Q2pCLE1BQU0sQ0FBQyxJQUFNLE1BQU0sR0FBVztJQUMxQjtRQUNJLElBQUksRUFBRSxFQUFFO1FBQ1IsSUFBSSxJQUdIO1FBQ0QsUUFBUSxFQUFFO1lBQ047Z0JBQ0ksSUFBSSxFQUFFLDZCQUE2QjtnQkFDbkMsU0FBUyxFQUFFLHNDQUFzQztnQkFDakQsT0FBTyxFQUFFO29CQUNMLE1BQU0sRUFBRSxrQkFBa0I7aUJBQzdCO2dCQUNELElBQUksSUFJSDthQUVKO1lBQ0Q7Z0JBQ0ksSUFBSSxFQUFFLHdCQUF3QjtnQkFDOUIsU0FBUyxFQUFFLGdDQUFnQztnQkFDM0MsSUFBSSxJQUlIO2FBRUo7WUFDRDtnQkFDSSxJQUFJLEVBQUUsNkJBQTZCO2dCQUNuQyxTQUFTLEVBQUUsZ0NBQWdDO2dCQUMzQyxPQUFPLEVBQUU7b0JBQ0wsTUFBTSxFQUFFLGtCQUFrQjtpQkFDN0I7Z0JBQ0QsSUFBSSxJQUlIO2FBRUo7U0FDSjtLQUNKO0NBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgUmVzb2x2ZSwgUm91dGVyU3RhdGVTbmFwc2hvdCwgUm91dGVzfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7T2JzZXJ2YXRpb259IGZyb20gJy4uL21vZGVsL2NsaW5pYy5tb2RlbCc7XG5pbXBvcnQge09ic2VydmFibGUsIG9mfSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZmlsdGVyLCBtYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7SHR0cFJlc3BvbnNlfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge0NlcnZpY2FsQ2FuY2VyU2NyZWVuaW5nU2VydmljZX0gZnJvbSAnLi9jZXJ2aWNhbC1jYW5jZXItc2NyZWVuaW5nLnNlcnZpY2UnO1xuaW1wb3J0IHtDZXJ2aWNhbENhbmNlclNjcmVlbmluZ0RldGFpbENvbXBvbmVudH0gZnJvbSAnLi4vY29tcG9uZW50cy9jZXJ2aWNhbC1jYW5jZXItc2NyZWVuaW5nL2NlcnZpY2FsLWNhbmNlci1zY3JlZW5pbmctZGV0YWlsLmNvbXBvbmVudCc7XG5pbXBvcnQge0NlcnZpY2FsQ2FuY2VyU2NyZWVuaW5nQ29tcG9uZW50fSBmcm9tICcuLi9jb21wb25lbnRzL2NlcnZpY2FsLWNhbmNlci1zY3JlZW5pbmcvY2VydmljYWwtY2FuY2VyLXNjcmVlbmluZy5jb21wb25lbnQnO1xuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE9ic2VydmF0aW9uUmVzb2x2ZSBpbXBsZW1lbnRzIFJlc29sdmU8T2JzZXJ2YXRpb24+IHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNlcnZpY2U6IENlcnZpY2FsQ2FuY2VyU2NyZWVuaW5nU2VydmljZSkge1xuICAgIH1cblxuICAgIHJlc29sdmUocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90KTogT2JzZXJ2YWJsZTxPYnNlcnZhdGlvbj4ge1xuICAgICAgICBjb25zdCBpZCA9IHJvdXRlLnBhcmFtc1snaWQnXSA/IHJvdXRlLnBhcmFtc1snaWQnXSA6IG51bGw7XG4gICAgICAgIGlmIChpZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VydmljZS5maW5kKGlkKS5waXBlKFxuICAgICAgICAgICAgICAgIGZpbHRlcigocmVzcG9uc2U6IEh0dHBSZXNwb25zZTxPYnNlcnZhdGlvbj4pID0+IHJlc3BvbnNlLm9rKSxcbiAgICAgICAgICAgICAgICBtYXAoKHBhdGllbnQ6IEh0dHBSZXNwb25zZTxPYnNlcnZhdGlvbj4pID0+IHBhdGllbnQuYm9keSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9mKDxPYnNlcnZhdGlvbj57fSk7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgUk9VVEVTOiBSb3V0ZXMgPSBbXG4gICAge1xuICAgICAgICBwYXRoOiAnJyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgdGl0bGU6ICdDZXJ2aWNhbCBDYW5jZXIgU2NyZWVuaW5nJyxcbiAgICAgICAgICAgIGJyZWFkY3J1bWI6ICdDRVJWSUNBTCBDQU5DRVIgU0NSRUVOSU5HJ1xuICAgICAgICB9LFxuICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHBhdGg6ICc6aWQvcGF0aWVudC86cGF0aWVudElkL3ZpZXcnLFxuICAgICAgICAgICAgICAgIGNvbXBvbmVudDogQ2VydmljYWxDYW5jZXJTY3JlZW5pbmdEZXRhaWxDb21wb25lbnQsXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgICAgICAgICBlbnRpdHk6IE9ic2VydmF0aW9uUmVzb2x2ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBhdXRob3JpdGllczogWydST0xFX1VTRVInXSxcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdDZXJ2aWNhbCBDYW5jZXIgU2NyZWVuaW5nJyxcbiAgICAgICAgICAgICAgICAgICAgYnJlYWRjcnVtYjogJ0NFUlZJQ0FMIENBTkNFUiBTQ1JFRU5JTkcnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAvL2NhbkFjdGl2YXRlOiBbVXNlclJvdXRlQWNjZXNzU2VydmljZV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcGF0aDogJ3BhdGllbnQvOnBhdGllbnRJZC9uZXcnLFxuICAgICAgICAgICAgICAgIGNvbXBvbmVudDogQ2VydmljYWxDYW5jZXJTY3JlZW5pbmdDb21wb25lbnQsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBhdXRob3JpdGllczogWydST0xFX0RFQyddLFxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ0NlcnZpY2FsIENhbmNlciBTY3JlZW5pbmcnLFxuICAgICAgICAgICAgICAgICAgICBicmVhZGNydW1iOiAnQUREIENFUlZJQ0FMIENBTkNFUiBTQ1JFRU5JTkcnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAvL2NhbkFjdGl2YXRlOiBbVXNlclJvdXRlQWNjZXNzU2VydmljZV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcGF0aDogJzppZC9wYXRpZW50LzpwYXRpZW50SWQvZWRpdCcsXG4gICAgICAgICAgICAgICAgY29tcG9uZW50OiBDZXJ2aWNhbENhbmNlclNjcmVlbmluZ0NvbXBvbmVudCxcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICAgICAgICAgIGVudGl0eTogT2JzZXJ2YXRpb25SZXNvbHZlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIGF1dGhvcml0aWVzOiBbJ1JPTEVfREVDJ10sXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnQ2VydmljYWwgQ2FuY2VyIFNjcmVlbmluZycsXG4gICAgICAgICAgICAgICAgICAgIGJyZWFkY3J1bWI6ICdDRVJWSUNBTCBDQU5DRVIgU0NSRUVOSU5HIEVESVQnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAvL2NhbkFjdGl2YXRlOiBbVXNlclJvdXRlQWNjZXNzU2VydmljZV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH1cbl07XG4iXX0=