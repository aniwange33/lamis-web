import * as tslib_1 from "tslib";
import {Component} from '@angular/core';
import {PharmacyService} from '../services/pharmacy.service';
import {DevolveService} from '../services/devolve.service';
import {NotificationService} from '@alfresco/adf-core';
import {AppLoaderService} from '@lamis/web-core';
import {ActivatedRoute} from '@angular/router';
import * as moment_ from 'moment';

const moment = moment_;
let EndDevolveComponent = class EndDevolveComponent {
    constructor(pharmacyService, devolveService, notification, appLoaderService, activatedRoute) {
        this.pharmacyService = pharmacyService;
        this.devolveService = devolveService;
        this.notification = notification;
        this.appLoaderService = appLoaderService;
        this.activatedRoute = activatedRoute;
        this.entity = {};
        this.dmocType = '';
        this.isSaving = false;
        this.today = moment();
    }

    ngOnInit() {
        const patientId = this.activatedRoute.snapshot.paramMap.get('patientId');
        this.pharmacyService.getPatient(patientId).subscribe((res) => {
            this.pharmacyService.getDevolvement(res.id, moment()).subscribe(r => {
                this.entity = r;
                if (this.entity.dateDiscontinued) {
                    this.minDate = r.dateDiscontinued.clone().add(2, 'day');
                } else {
                    this.minDiscontinued = r.dateDevolved.clone().add(1, 'day');
                    this.minDate = r.dateDevolved.clone().add(2, 'day');
                }
                let type = 'MMD';
                switch (r.dmocType) {
                    case 'ARC':
                        type = 'Adolescent Refill Club';
                        break;
                    case 'CPARP':
                        type = 'CPARP';
                        break;
                    case 'CARC':
                        type = 'CARC';
                        break;
                    case 'F_CARG':
                        type = 'F-CARG';
                        break;
                    case 'FAST_TRACK':
                        type = 'Fast Track';
                        break;
                    case 'S_CARG':
                        type = 'S-CARG';
                        break;
                    case 'MMS':
                        type = 'MMS';
                        break;
                }
                this.dmocType = type;
            });
        });
        this.activatedRoute.data.subscribe(({entity}) => {
            this.entity = !!entity && entity.body ? entity.body : entity;
        });
    }

    dateDiscontinuedChanged() {
        if (this.entity.dateDiscontinued) {
            this.minDate = this.entity.dateDiscontinued.clone().add(1, 'day');
        }
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.appLoaderService.open('Saving visit...');
        this.isSaving = true;
        if (this.entity.id !== undefined) {
            this.subscribeToSaveResponse(this.devolveService.update(this.entity));
        } else {
            this.subscribeToSaveResponse(this.devolveService.create(this.entity));
        }
    }

    subscribeToSaveResponse(result) {
        result.subscribe((res) => this.onSaveSuccess(res.body), (res) => {
            this.appLoaderService.close();
            this.onSaveError();
            this.onError(res.message);
        });
    }

    onSaveSuccess(result) {
        this.appLoaderService.close();
        this.isSaving = false;
        this.notification.showInfo('Devolve successfully saved');
        this.previousState();
    }

    onSaveError() {
        this.isSaving = false;
        this.notification.showError('Error saving devolve');
    }

    onError(errorMessage) {
        this.isSaving = false;
        this.notification.showError(errorMessage);
    }
};
EndDevolveComponent.ctorParameters = () => [
    {type: PharmacyService},
    {type: DevolveService},
    {type: NotificationService},
    {type: AppLoaderService},
    {type: ActivatedRoute}
];
EndDevolveComponent = tslib_1.__decorate([
    Component({
        selector: 'end-devolve',
        template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <form name=\"form\" role=\"form\" novalidate (ngSubmit)=\"save()\" #devolveForm=\"ngForm\">\n            <mat-card class=\"default\">\n                <mat-card-header>\n                </mat-card-header>\n                <mat-card-content *ngIf=\"entity\">\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Date of Devolvement</mat-label>\n                                <input matInput disabled value=\"{{entity.dateDevolved | date: 'dd MMM, yyyy'}}\">\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>DMOC Type</mat-label>\n                                <input matInput disabled [value]=\"dmocType\">\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Date Discontinued</mat-label>\n                                <input matInput [matDatepicker]=\"picker1\"\n                                       [(ngModel)]=\"entity.dateDiscontinued\"\n                                       #disc=\"ngModel\"\n                                       (dateChange)=\"dateDiscontinuedChanged()\"\n                                       [min]=\"minDiscontinued\"\n                                       [max]=\"today\"\n                                       name=\"disc\"\n                                       required>\n                                <mat-datepicker-toggle\n                                        matSuffix\n                                        [for]=\"picker1\">\n                                </mat-datepicker-toggle>\n                                <mat-datepicker #picker1></mat-datepicker>\n                                <mat-error\n                                        *ngIf=\"disc.errors && (disc.dirty || disc.touched) && (disc.errors.required)\">\n                                    Date Discontinued is required\n                                </mat-error>\n                                <mat-error\n                                        *ngIf=\"disc.errors && (disc.dirty || disc.touched) && (disc.errors.min)\">\n                                    Date Discontinued cannot be before {{minDiscontinued | date: 'dd MMM, yyyy'}}\n                                </mat-error>\n                                <mat-error\n                                        *ngIf=\"disc.errors && (disc.dirty || disc.touched) && (disc.errors.max)\">\n                                    Date Discontinued cannot be after {{today | date: 'dd MMM, yyyy'}}\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Reason Discontinued</mat-label>\n                                <mat-select name=\"reason\" #reason=\"ngModel\" [(ngModel)]=\"entity.reasonDiscontinued\" required>\n                                    <mat-option></mat-option>\n                                    <mat-option [value]=\"'Becomes pregnant'\">Becomes pregnant</mat-option>\n                                    <mat-option [value]=\"'Unable to pay service charge'\">Unable to pay service charge</mat-option>\n                                    <mat-option [value]=\"'Develops comorbidity'\">Develops comorbidity</mat-option>\n                                    <mat-option [value]=\"'Loss of viral suppression'\">Loss of viral suppression</mat-option>\n                                    <mat-option [value]=\"'Decides to go back to hospital'\">Decides to go back to hospital</mat-option>\n                                    <mat-option [value]=\"'Becomes non-adherent'\">Becomes non-adherent</mat-option>\n                                </mat-select>\n                                <mat-error\n                                        *ngIf=\"reason.errors && (reason.dirty || reason.touched) && (reason.errors.required)\">\n                                    Reason for Discontinuation is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\" *ngIf=\"minDate\">\n                                <input matInput [matDatepicker]=\"picker\"\n                                       placeholder=\"Date Returned to Facility\"\n                                       [(ngModel)]=\"entity.dateReturnedToFacility\"\n                                       #visit=\"ngModel\"\n                                       [min]=\"minDate\"\n                                       [max]=\"today\"\n                                       name=\"visit\"\n                                       required>\n                                <mat-datepicker-toggle\n                                        matSuffix\n                                        [for]=\"picker\">\n                                </mat-datepicker-toggle>\n                                <mat-datepicker #picker></mat-datepicker>\n                                <mat-error\n                                        *ngIf=\"visit.errors && (visit.dirty || visit.touched) && (visit.errors.required)\">\n                                    Date returned to Facility is required\n                                </mat-error>\n                                <mat-error\n                                        *ngIf=\"visit.errors && (visit.dirty || visit.touched) && (visit.errors.min)\">\n                                    Date returned to Facility cannot be before {{minDate | date: 'dd MMM, yyyy'}}\n                                </mat-error>\n                                <mat-error\n                                        *ngIf=\"visit.errors && (visit.dirty || visit.touched) && (visit.errors.max)\">\n                                    Date returned to Facility cannot be after {{today | date: 'dd MMM, yyyy'}}\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                </mat-card-content>\n                <mat-card-actions class=\"lamis-edit-form-actions\">\n                    <button mat-raised-button type=\"button\" (click)=\"previousState()\">Back</button>\n                    <button mat-raised-button color='primary'\n                            [disabled]=\"devolveForm.invalid || isSaving || !entity.dateDiscontinued\"\n                            type=\"submit\">\n                        Update\n                    </button>\n                </mat-card-actions>\n            </mat-card>\n        </form>\n    </div>\n</div>\n"
    }),
    tslib_1.__metadata("design:paramtypes", [PharmacyService,
        DevolveService,
        NotificationService,
        AppLoaderService,
        ActivatedRoute])
], EndDevolveComponent);
export {EndDevolveComponent};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5kLmRldm9sdmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGFtaXMtcGhhcm1hY3ktMS4xLjQvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9lbmQuZGV2b2x2ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFLakQsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFFbEMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDO0FBTXZCLElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW1CO0lBUTVCLFlBQW9CLGVBQWdDLEVBQ2hDLGNBQThCLEVBQzVCLFlBQWlDLEVBQ25DLGdCQUFrQyxFQUNoQyxjQUE4QjtRQUpoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzVCLGlCQUFZLEdBQVosWUFBWSxDQUFxQjtRQUNuQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2hDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQVhwRCxXQUFNLEdBQVksRUFBRSxDQUFDO1FBQ3JCLGFBQVEsR0FBVyxFQUFFLENBQUM7UUFDdEIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUdqQixVQUFLLEdBQUcsTUFBTSxFQUFFLENBQUM7SUFPakIsQ0FBQztJQUVELFFBQVE7UUFDSixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMs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WUFsR3dDLGVBQWU7WUFDaEIsY0FBYztZQUNkLG1CQUFtQjtZQUNqQixnQkFBZ0I7WUFDaEIsY0FBYzs7QUFaM0MsbUJBQW1CO0lBSi9CLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxhQUFhO1FBQ3ZCLDh2T0FBMkM7S0FDOUMsQ0FBQzs2Q0FTdUMsZUFBZTtRQUNoQixjQUFjO1FBQ2QsbUJBQW1CO1FBQ2pCLGdCQUFnQjtRQUNoQixjQUFjO0dBWjNDLG1CQUFtQixDQTBHL0I7U0ExR1ksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBoYXJtYWN5U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3BoYXJtYWN5LnNlcnZpY2UnO1xuaW1wb3J0IHsgRGV2b2x2ZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9kZXZvbHZlLnNlcnZpY2UnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gJ0BhbGZyZXNjby9hZGYtY29yZSc7XG5pbXBvcnQgeyBBcHBMb2FkZXJTZXJ2aWNlIH0gZnJvbSAnQGxhbWlzL3dlYi1jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IERldm9sdmUgfSBmcm9tICcuLi9tb2RlbC9waGFybWFjeS5tb2RlbCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBIdHRwRXJyb3JSZXNwb25zZSwgSHR0cFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgTW9tZW50IH0gZnJvbSAnbW9tZW50JztcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcblxuY29uc3QgbW9tZW50ID0gbW9tZW50XztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdlbmQtZGV2b2x2ZScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2VuZC5kZXZvbHZlLmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBFbmREZXZvbHZlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBlbnRpdHk6IERldm9sdmUgPSB7fTtcbiAgICBkbW9jVHlwZTogc3RyaW5nID0gJyc7XG4gICAgaXNTYXZpbmcgPSBmYWxzZTtcbiAgICBtaW5EYXRlOiBNb21lbnQ7XG4gICAgbWluRGlzY29udGludWVkOiBNb21lbnQ7XG4gICAgdG9kYXkgPSBtb21lbnQoKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcGhhcm1hY3lTZXJ2aWNlOiBQaGFybWFjeVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBkZXZvbHZlU2VydmljZTogRGV2b2x2ZVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJvdGVjdGVkIG5vdGlmaWNhdGlvbjogTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGFwcExvYWRlclNlcnZpY2U6IEFwcExvYWRlclNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJvdGVjdGVkIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICBjb25zdCBwYXRpZW50SWQgPSB0aGlzLmFjdGl2YXRlZFJvdXRlLnNuYXBzaG90LnBhcmFtTWFwLmdldCgncGF0aWVudElkJyk7XG4gICAgICAgIHRoaXMucGhhcm1hY3lTZXJ2aWNlLmdldFBhdGllbnQocGF0aWVudElkKS5zdWJzY3JpYmUoKHJlcykgPT4ge1xuICAgICAgICAgICAgdGhpcy5waGFybWFjeVNlcnZpY2UuZ2V0RGV2b2x2ZW1lbnQocmVzLmlkLCBtb21lbnQoKSkuc3Vic2NyaWJlKHIgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZW50aXR5ID0gcjtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5lbnRpdHkuZGF0ZURpc2NvbnRpbnVlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1pbkRhdGUgPSByLmRhdGVEaXNjb250aW51ZWQuY2xvbmUoKS5hZGQoMiwgJ2RheScpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWluRGlzY29udGludWVkID0gci5kYXRlRGV2b2x2ZWQuY2xvbmUoKS5hZGQoMSwgJ2RheScpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1pbkRhdGUgPSByLmRhdGVEZXZvbHZlZC5jbG9uZSgpLmFkZCgyLCAnZGF5Jyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IHR5cGUgPSAnTU1EJztcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHIuZG1vY1R5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnQVJDJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgPSAnQWRvbGVzY2VudCBSZWZpbGwgQ2x1Yic7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnQ1BBUlAnOlxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSA9ICdDUEFSUCc7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnQ0FSQyc6XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlID0gJ0NBUkMnO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ0ZfQ0FSRyc6XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlID0gJ0YtQ0FSRyc7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnRkFTVF9UUkFDSyc6XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlID0gJ0Zhc3QgVHJhY2snO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ1NfQ0FSRyc6XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlID0gJ1MtQ0FSRyc7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnTU1TJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgPSAnTU1TJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmRtb2NUeXBlID0gdHlwZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmFjdGl2YXRlZFJvdXRlLmRhdGEuc3Vic2NyaWJlKCh7ZW50aXR5fSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5lbnRpdHkgPSAhIWVudGl0eSAmJiBlbnRpdHkuYm9keSA/IGVudGl0eS5ib2R5IDogZW50aXR5O1xuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIGRhdGVEaXNjb250aW51ZWRDaGFuZ2VkKCkge1xuICAgICAgICBpZiAodGhpcy5lbnRpdHkuZGF0ZURpc2NvbnRpbnVlZCkge1xuICAgICAgICAgICAgdGhpcy5taW5EYXRlID0gdGhpcy5lbnRpdHkuZGF0ZURpc2NvbnRpbnVlZC5jbG9uZSgpLmFkZCgxLCAnZGF5JylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByZXZpb3VzU3RhdGUoKSB7XG4gICAgICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcbiAgICB9XG5cbiAgICBzYXZlKCkge1xuICAgICAgICB0aGlzLmFwcExvYWRlclNlcnZpY2Uub3BlbignU2F2aW5nIHZpc2l0Li4uJyk7XG4gICAgICAgIHRoaXMuaXNTYXZpbmcgPSB0cnVlO1xuICAgICAgICBpZiAodGhpcy5lbnRpdHkuaWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpYmVUb1NhdmVSZXNwb25zZSh0aGlzLmRldm9sdmVTZXJ2aWNlLnVwZGF0ZSh0aGlzLmVudGl0eSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpYmVUb1NhdmVSZXNwb25zZSh0aGlzLmRldm9sdmVTZXJ2aWNlLmNyZWF0ZSh0aGlzLmVudGl0eSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdWJzY3JpYmVUb1NhdmVSZXNwb25zZShyZXN1bHQ6IE9ic2VydmFibGU8SHR0cFJlc3BvbnNlPGFueT4+KSB7XG4gICAgICAgIHJlc3VsdC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAocmVzOiBIdHRwUmVzcG9uc2U8YW55PikgPT4gdGhpcy5vblNhdmVTdWNjZXNzKHJlcy5ib2R5KSxcbiAgICAgICAgICAgIChyZXM6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBMb2FkZXJTZXJ2aWNlLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5vblNhdmVFcnJvcigpO1xuICAgICAgICAgICAgICAgIHRoaXMub25FcnJvcihyZXMubWVzc2FnZSlcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25TYXZlU3VjY2VzcyhyZXN1bHQ6IGFueSkge1xuICAgICAgICB0aGlzLmFwcExvYWRlclNlcnZpY2UuY2xvc2UoKTtcbiAgICAgICAgdGhpcy5pc1NhdmluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbi5zaG93SW5mbygnRGV2b2x2ZSBzdWNjZXNzZnVsbHkgc2F2ZWQnKTtcbiAgICAgICAgdGhpcy5wcmV2aW91c1N0YXRlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblNhdmVFcnJvcigpIHtcbiAgICAgICAgdGhpcy5pc1NhdmluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbi5zaG93RXJyb3IoJ0Vycm9yIHNhdmluZyBkZXZvbHZlJyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uRXJyb3IoZXJyb3JNZXNzYWdlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5pc1NhdmluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbi5zaG93RXJyb3IoZXJyb3JNZXNzYWdlKTtcbiAgICB9XG59XG4iXX0=
