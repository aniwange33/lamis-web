import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NotificationService } from '@alfresco/adf-core';
import { ActivatedRoute } from '@angular/router';
import { AppLoaderService, entityCompare } from '@lamis/web-core';
import { CommunityPharmacyService } from '../../services/community-pharmacy.service';
import { FacilityService } from '../../services/facility.service';
let CommunityPharmacyEditComponent = class CommunityPharmacyEditComponent {
    constructor(service, notification, facilityService, activatedRoute, appLoaderService) {
        this.service = service;
        this.notification = notification;
        this.facilityService = facilityService;
        this.activatedRoute = activatedRoute;
        this.appLoaderService = appLoaderService;
        this.states = [];
        this.lgas = [];
    }
    createEntity() {
        return {};
    }
    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ entity }) => {
            this.entity = !!entity && entity.body ? entity.body : entity;
            if (this.entity === undefined) {
                this.entity = this.createEntity();
                this.entity.active = true;
            }
        });
        this.facilityService.getActive().subscribe((res) => {
            const facility = res.body;
            this.entity.state = facility.state;
            this.states.push(this.entity.state);
            this.stateChange(facility.state.id);
        });
    }
    save() {
        this.isSaving = true;
        this.appLoaderService.open('Saving Community Pharmacy..');
        if (this.entity.id !== undefined) {
            this.subscribeToSaveResponse(this.service.update(this.entity));
        }
        else {
            this.subscribeToSaveResponse(this.service.create(this.entity));
        }
    }
    previousState() {
        window.history.back();
    }
    subscribeToSaveResponse(result) {
        result.subscribe((res) => this.onSaveSuccess(res.body), (res) => {
            this.onSaveError();
            this.onError(res.message);
        });
    }
    onSaveSuccess(result) {
        this.appLoaderService.close();
        this.isSaving = false;
        this.notification.openSnackMessage('Community Pharmacy successfully saved');
        this.previousState();
    }
    onSaveError() {
        this.isSaving = false;
        this.appLoaderService.close();
        //this.submitButton.disabled = true;
        this.notification.showError('Error occurred saving Community Pharmacy; try again');
        //this.progressBar.mode = 'determinate';
    }
    onError(errorMessage) {
        this.appLoaderService.close();
        this.notification.showError(errorMessage);
    }
    stateChange(id) {
        this.service.getLgasByState(id).subscribe(res => this.lgas = res);
    }
    entityCompare(e1, e2) {
        return entityCompare(e1, e2);
    }
};
CommunityPharmacyEditComponent.ctorParameters = () => [
    { type: CommunityPharmacyService },
    { type: NotificationService },
    { type: FacilityService },
    { type: ActivatedRoute },
    { type: AppLoaderService }
];
CommunityPharmacyEditComponent = tslib_1.__decorate([
    Component({
        selector: 'community-pharmacy-edit',
        template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <form name=\"form\" role=\"form\" novalidate (ngSubmit)=\"save()\" #cpForm=\"ngForm\">\n            <mat-card class=\"default\">\n                <mat-card-content>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Name</mat-label>\n                                <input matInput name=\"name\" #name=\"ngModel\"\n                                       required\n                                       [(ngModel)]=\"entity.name\"/>\n                                <mat-error\n                                        *ngIf=\"name.errors && (name.dirty || name.touched) && (name.errors.required)\">\n                                    Community Pharmacy name is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>PIN</mat-label>\n                                <input matInput name=\"pin\" #pin=\"ngModel\"\n                                       required\n                                       [(ngModel)]=\"entity.pin\"/>\n                                <mat-error\n                                        *ngIf=\"pin.errors && (pin.dirty || pin.touched) && (pin.errors.required)\">\n                                    PIN is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>State</mat-label>\n                                <mat-select name=\"state\" [(ngModel)]=\"entity.state\"\n                                            [compareWith]=\"entityCompare\"\n                                            required\n                                            #s=\"ngModel\"\n                                            (selectionChange)=\"stateChange($event.value.id)\">\n                                    <mat-option></mat-option>\n                                    <mat-option *ngFor=\"let state of states\" [value]=\"state\">{{state.name}}</mat-option>\n                                </mat-select>\n                                <mat-error\n                                        *ngIf=\"s.errors && (s.dirty || s.touched || !!entity.id) && (s.errors.required)\">\n                                    State is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>LGA</mat-label>\n                                <mat-select name=\"lga\" [(ngModel)]=\"entity.lga\" required #l=\"ngModel\"\n                                            [compareWith]=\"entityCompare\">\n                                    <mat-option></mat-option>\n                                    <mat-option *ngFor=\"let lga of lgas\" [value]=\"lga\">{{lga.name}}</mat-option>\n                                </mat-select>\n                                <mat-error\n                                        *ngIf=\"l.errors && (l.dirty || l.touched || !!entity.id) && (l.errors.required)\">\n                                    LGA is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Address</mat-label>\n                                <textarea matInput name=\"address\" [(ngModel)]=\"entity.address\" #address=\"ngModel\"\n                                          rows=\"2\" >\n                                </textarea>\n                                <mat-error\n                                        *ngIf=\"address.errors && (address.dirty || address.touched) && (address.errors.required)\">\n                                    Community Pharmacy address is required\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Email</mat-label>\n                                <input matInput name=\"email\" type=\"email\" #email=\"ngModel\"\n                                       [(ngModel)]=\"entity.email\"/>\n                            </mat-form-field>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <mat-form-field class=\"full-width\">\n                                <mat-label>Telephone</mat-label>\n                                <input matInput name=\"phone\" phoneNumber [(ngModel)]=\"entity.phone\"\n                                       #phone=\"ngModel\"/>\n                                <mat-error\n                                        *ngIf=\"phone.errors && (phone.dirty || phone.touched) && (phone.errors.invalidPhone)\">\n                                    Invalid phone number\n                                </mat-error>\n                            </mat-form-field>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <mat-checkbox name=\"active\" [(ngModel)]=\"entity.active\">Active</mat-checkbox>\n                        </div>\n                    </div>\n                </mat-card-content>\n                <mat-card-actions class=\"lamis-edit-form-actions\">\n                    <button mat-raised-button type=\"button\" (click)=\"previousState()\">Back</button>\n                    <button mat-raised-button color='primary'\n                            [disabled]=\"cpForm.invalid || isSaving\"\n                            type=\"submit\">\n                        {{entity.id !== undefined ? 'Update' : 'Save'}}\n                    </button>\n                </mat-card-actions>\n            </mat-card>\n        </form>\n    </div>\n</div>\n"
    })
], CommunityPharmacyEditComponent);
export { CommunityPharmacyEditComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbXVuaXR5LXBoYXJtYWN5LmVkaXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGFtaXMtZmFjaWxpdHktMS4yLjAvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9jb21tdW5pdHktcGhhcm1hY3kvY29tbXVuaXR5LXBoYXJtYWN5LmVkaXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHbEUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFFckYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBT2xFLElBQWEsOEJBQThCLEdBQTNDLE1BQWEsOEJBQThCO0lBT3ZDLFlBQW9CLE9BQWlDLEVBQy9CLFlBQWlDLEVBQ25DLGVBQWdDLEVBQzlCLGNBQThCLEVBQ2hDLGdCQUFrQztRQUpsQyxZQUFPLEdBQVAsT0FBTyxDQUEwQjtRQUMvQixpQkFBWSxHQUFaLFlBQVksQ0FBcUI7UUFDbkMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQzlCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUNoQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBUnRELFdBQU0sR0FBVSxFQUFFLENBQUM7UUFDbkIsU0FBSSxHQUFVLEVBQUUsQ0FBQztJQVFqQixDQUFDO0lBRUQsWUFBWTtRQUNSLE9BQTBCLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLEVBQUUsRUFBRTtZQUM1QyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQzdELElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2dCQUNsQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7YUFDN0I7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBUSxFQUFDLEVBQUU7WUFDbkQsTUFBTyxRQUFRLEdBQWEsR0FBRyxDQUFDLElBQUksQ0FBQztZQUNyQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDO1lBQ25DLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3hDLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELElBQUk7UUFDQSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLENBQUM7UUFDMUQsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxTQUFTLEVBQUU7WUFDOUIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBQ2xFO2FBQU07WUFDSCxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDbEU7SUFDTCxDQUFDO0lBRUQsYUFBYTtRQUNULE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVPLHVCQUF1QixDQUFDLE1BQXFDO1FBQ2pFLE1BQU0sQ0FBQyxTQUFTLENBQ1osQ0FBQyxHQUFzQixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFDeEQsQ0FBQyxHQUFzQixFQUFFLEVBQUU7WUFDdkIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQzdCLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVPLGFBQWEsQ0FBQyxNQUFXO1FBQzdCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLHVDQUF1QyxDQUFDLENBQUM7UUFDNUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFTyxXQUFXO1FBQ2YsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzlCLG9DQUFvQztRQUNwQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxxREFBcUQsQ0FBQyxDQUFDO1FBQ25GLHdDQUF3QztJQUM1QyxDQUFDO0lBRVMsT0FBTyxDQUFDLFlBQW9CO1FBQ2xDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQsV0FBVyxDQUFDLEVBQUU7UUFDVixJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFBO0lBQ3JFLENBQUM7SUFFRCxhQUFhLENBQUMsRUFBRSxFQUFFLEVBQUU7UUFDaEIsT0FBTyxhQUFhLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7Q0FDSixDQUFBOztZQS9FZ0Msd0JBQXdCO1lBQ2pCLG1CQUFtQjtZQUNsQixlQUFlO1lBQ2QsY0FBYztZQUNkLGdCQUFnQjs7QUFYN0MsOEJBQThCO0lBSjFDLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSx5QkFBeUI7UUFDbkMsa3NOQUF1RDtLQUMxRCxDQUFDO0dBQ1csOEJBQThCLENBc0YxQztTQXRGWSw4QkFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gJ0BhbGZyZXNjby9hZGYtY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBBcHBMb2FkZXJTZXJ2aWNlLCBlbnRpdHlDb21wYXJlIH0gZnJvbSAnQGxhbWlzL3dlYi1jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEh0dHBFcnJvclJlc3BvbnNlLCBIdHRwUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBDb21tdW5pdHlQaGFybWFjeVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jb21tdW5pdHktcGhhcm1hY3kuc2VydmljZSc7XG5pbXBvcnQgeyBDb21tdW5pdHlQaGFybWFjeSB9IGZyb20gJy4uLy4uL21vZGVsL2NvbW11bml0eS1waGFybWFjeS5tb2RlbCc7XG5pbXBvcnQgeyBGYWNpbGl0eVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9mYWNpbGl0eS5zZXJ2aWNlJztcbmltcG9ydCB7IEZhY2lsaXR5IH0gZnJvbSAnLi4vLi4vbW9kZWwvZmFjaWxpdHkubW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2NvbW11bml0eS1waGFybWFjeS1lZGl0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY29tbXVuaXR5LXBoYXJtYWN5LmVkaXQuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIENvbW11bml0eVBoYXJtYWN5RWRpdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgZW50aXR5OiBDb21tdW5pdHlQaGFybWFjeTtcbiAgICBzdGF0ZTogYW55O1xuICAgIHN0YXRlczogYW55W10gPSBbXTtcbiAgICBsZ2FzOiBhbnlbXSA9IFtdO1xuICAgIGlzU2F2aW5nOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzZXJ2aWNlOiBDb21tdW5pdHlQaGFybWFjeVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJvdGVjdGVkIG5vdGlmaWNhdGlvbjogTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGZhY2lsaXR5U2VydmljZTogRmFjaWxpdHlTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByb3RlY3RlZCBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBhcHBMb2FkZXJTZXJ2aWNlOiBBcHBMb2FkZXJTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgY3JlYXRlRW50aXR5KCk6IENvbW11bml0eVBoYXJtYWN5IHtcbiAgICAgICAgcmV0dXJuIDxDb21tdW5pdHlQaGFybWFjeT57fTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pc1NhdmluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmFjdGl2YXRlZFJvdXRlLmRhdGEuc3Vic2NyaWJlKCh7ZW50aXR5fSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5lbnRpdHkgPSAhIWVudGl0eSAmJiBlbnRpdHkuYm9keSA/IGVudGl0eS5ib2R5IDogZW50aXR5O1xuICAgICAgICAgICAgaWYgKHRoaXMuZW50aXR5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVudGl0eSA9IHRoaXMuY3JlYXRlRW50aXR5KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5lbnRpdHkuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5mYWNpbGl0eVNlcnZpY2UuZ2V0QWN0aXZlKCkuc3Vic2NyaWJlKChyZXM6IGFueSk9PiB7XG4gICAgICAgICAgICBjb25zdCAgZmFjaWxpdHk6IEZhY2lsaXR5ID0gcmVzLmJvZHk7XG4gICAgICAgICAgICB0aGlzLmVudGl0eS5zdGF0ZSA9IGZhY2lsaXR5LnN0YXRlO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZXMucHVzaCh0aGlzLmVudGl0eS5zdGF0ZSk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlKGZhY2lsaXR5LnN0YXRlLmlkKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBzYXZlKCkge1xuICAgICAgICB0aGlzLmlzU2F2aW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hcHBMb2FkZXJTZXJ2aWNlLm9wZW4oJ1NhdmluZyBDb21tdW5pdHkgUGhhcm1hY3kuLicpO1xuICAgICAgICBpZiAodGhpcy5lbnRpdHkuaWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpYmVUb1NhdmVSZXNwb25zZSh0aGlzLnNlcnZpY2UudXBkYXRlKHRoaXMuZW50aXR5KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmliZVRvU2F2ZVJlc3BvbnNlKHRoaXMuc2VydmljZS5jcmVhdGUodGhpcy5lbnRpdHkpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByZXZpb3VzU3RhdGUoKSB7XG4gICAgICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN1YnNjcmliZVRvU2F2ZVJlc3BvbnNlKHJlc3VsdDogT2JzZXJ2YWJsZTxIdHRwUmVzcG9uc2U8YW55Pj4pIHtcbiAgICAgICAgcmVzdWx0LnN1YnNjcmliZShcbiAgICAgICAgICAgIChyZXM6IEh0dHBSZXNwb25zZTxhbnk+KSA9PiB0aGlzLm9uU2F2ZVN1Y2Nlc3MocmVzLmJvZHkpLFxuICAgICAgICAgICAgKHJlczogSHR0cEVycm9yUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uU2F2ZUVycm9yKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkVycm9yKHJlcy5tZXNzYWdlKVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblNhdmVTdWNjZXNzKHJlc3VsdDogYW55KSB7XG4gICAgICAgIHRoaXMuYXBwTG9hZGVyU2VydmljZS5jbG9zZSgpO1xuICAgICAgICB0aGlzLmlzU2F2aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9uLm9wZW5TbmFja01lc3NhZ2UoJ0NvbW11bml0eSBQaGFybWFjeSBzdWNjZXNzZnVsbHkgc2F2ZWQnKTtcbiAgICAgICAgdGhpcy5wcmV2aW91c1N0YXRlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblNhdmVFcnJvcigpIHtcbiAgICAgICAgdGhpcy5pc1NhdmluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmFwcExvYWRlclNlcnZpY2UuY2xvc2UoKTtcbiAgICAgICAgLy90aGlzLnN1Ym1pdEJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9uLnNob3dFcnJvcignRXJyb3Igb2NjdXJyZWQgc2F2aW5nIENvbW11bml0eSBQaGFybWFjeTsgdHJ5IGFnYWluJyk7XG4gICAgICAgIC8vdGhpcy5wcm9ncmVzc0Jhci5tb2RlID0gJ2RldGVybWluYXRlJztcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25FcnJvcihlcnJvck1lc3NhZ2U6IHN0cmluZykge1xuICAgICAgICB0aGlzLmFwcExvYWRlclNlcnZpY2UuY2xvc2UoKTtcbiAgICAgICAgdGhpcy5ub3RpZmljYXRpb24uc2hvd0Vycm9yKGVycm9yTWVzc2FnZSk7XG4gICAgfVxuXG4gICAgc3RhdGVDaGFuZ2UoaWQpIHtcbiAgICAgICAgdGhpcy5zZXJ2aWNlLmdldExnYXNCeVN0YXRlKGlkKS5zdWJzY3JpYmUocmVzID0+IHRoaXMubGdhcyA9IHJlcylcbiAgICB9XG5cbiAgICBlbnRpdHlDb21wYXJlKGUxLCBlMikge1xuICAgICAgICByZXR1cm4gZW50aXR5Q29tcGFyZShlMSwgZTIpO1xuICAgIH1cbn1cbiJdfQ==