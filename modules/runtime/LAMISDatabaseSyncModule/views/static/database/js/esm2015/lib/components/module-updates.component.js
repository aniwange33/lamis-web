import * as tslib_1 from "tslib";
import {Component} from '@angular/core';
import {CardViewBoolItemModel, CardViewTextItemModel} from '@alfresco/adf-core';
import {ModuleUpdateService} from '../services/module.update.service';

let ModuleUpdatesComponent = class ModuleUpdatesComponent {
    constructor(service) {
        this.service = service;
        this.modules = [];
        this.isUpdating = false;
        this.installed = false;
    }

    ngOnInit() {
        this.service.availableUpdates().subscribe(res => this.modules = res);
    }

    getProperties(module) {
        const properties = [];
        const description = new CardViewTextItemModel({
            label: 'Description',
            value: module.description,
            key: 'desc',
        });
        properties.push(description);
        const active = new CardViewBoolItemModel({
            label: 'Active',
            value: module.active,
            key: 'active',
        });
        properties.push(active);
        const version = new CardViewTextItemModel({
            label: 'version',
            value: module.version,
            key: 'version',
        });
        properties.push(version);
        return properties;
    }

    updateModules() {
        this.isUpdating = true;
        this.installed = false;
        this.service.installUpdates().subscribe(res => {
            this.modules = res;
            this.isUpdating = false;
            this.installed = true;
        });
    }

    previousState() {
        window.history.back();
    }
};
ModuleUpdatesComponent.ctorParameters = () => [
    {type: ModuleUpdateService}
];
ModuleUpdatesComponent = tslib_1.__decorate([
    Component({
        selector: 'module-update',
        template: "<div class=\"layout\">\n    <div class=\"list-container\">\n        <mat-card>\n            <mat-card-header *ngIf=\"installed\">\n                Updates installed; please restart service or system\n            </mat-card-header>\n            <mat-card-content>\n                <div class=\"row\" *ngIf=\"modules\">\n                    <div class=\"col-sm-12 col-md-4 col-lg-6\"\n                         *ngFor=\"let module of modules\">\n                        <mat-card class=\"\">\n                            <mat-card-header>\n                                <mat-card-title>\n                                    {{module.name}}\n                                </mat-card-title>\n                            </mat-card-header>\n                            <mat-card-content>\n                                <adf-card-view [properties]=\"getProperties(module)\"></adf-card-view>\n                            </mat-card-content>\n                        </mat-card>\n                    </div>\n                </div>\n                <adf-empty-content\n                        *ngIf=\"!modules\"\n                        icon=\"group\"\n                        [title]=\"'No updates available'\">\n                </adf-empty-content>\n                <mat-divider></mat-divider>\n                <button mat-raised-button type=\"button\" (click)=\"previousState()\">Back</button>\n                <button mat-raised-button color='primary'\n                        (click)=\"updateModules()\"\n                        [disabled]=\"!modules || isUpdating\"\n                        type=\"submit\">\n                    Install Updates\n                </button>\n            </mat-card-content>\n        </mat-card>\n    </div>\n</div>\n"
    }),
    tslib_1.__metadata("design:paramtypes", [ModuleUpdateService])
], ModuleUpdatesComponent);
export {ModuleUpdatesComponent};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLXVwZGF0ZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGFtaXMtZGF0YWJhc2UtMS4wLjAvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9tb2R1bGUtdXBkYXRlcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFFLHFCQUFxQixFQUFnQixxQkFBcUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRWhHLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBT3hFLElBQWEsc0JBQXNCLEdBQW5DLE1BQWEsc0JBQXNCO0lBSy9CLFlBQW9CLE9BQTRCO1FBQTVCLFlBQU8sR0FBUCxPQUFPLENBQXFCO1FBSmhELFlBQU8sR0FBYSxFQUFFLENBQUM7UUFDdkIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixjQUFTLEdBQUcsS0FBSyxDQUFDO0lBR2xCLENBQUM7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLENBQUE7SUFDeEUsQ0FBQztJQUVELGFBQWEsQ0FBQyxNQUFjO1FBQ3hCLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUN0QixNQUFNLFdBQVcsR0FBRyxJQUFJLHFCQUFxQixDQUFDO1lBQzFDLEtBQUssRUFBRSxhQUFhO1lBQ3BCLEtBQUssRUFBRSxNQUFNLENBQUMsV0FBVztZQUN6QixHQUFHLEVBQUUsTUFBTTtTQUNkLENBQUMsQ0FBQztRQUNILFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDN0IsTUFBTSxNQUFNLEdBQUcsSUFBSSxxQkFBcUIsQ0FBQztZQUNyQyxLQUFLLEVBQUUsUUFBUTtZQUNmLEtBQUssRUFBRSxNQUFNLENBQUMsTUFBTTtZQUNwQixHQUFHLEVBQUUsUUFBUTtTQUNoQixDQUFDLENBQUM7UUFDSCxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hCLE1BQU0sT0FBTyxHQUFHLElBQUkscUJBQXFCLENBQUM7WUFDdEMsS0FBSyxFQUFFLFNBQVM7WUFDaEIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxPQUFPO1lBQ3JCLEdBQUcsRUFBRSxTQUFTO1NBQ2pCLENBQUMsQ0FBQztRQUNILFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekIsT0FBTyxVQUFVLENBQUM7SUFDdEIsQ0FBQztJQUVELGFBQWE7UUFDVCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUMxQyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztZQUNuQixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztZQUN4QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxhQUFhO1FBQ1QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMxQixDQUFDO0NBQ0osQ0FBQTs7WUEzQ2dDLG1CQUFtQjs7QUFMdkMsc0JBQXNCO0lBSmxDLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxlQUFlO1FBQ3pCLGl1REFBOEM7S0FDakQsQ0FBQzs2Q0FNK0IsbUJBQW1CO0dBTHZDLHNCQUFzQixDQWdEbEM7U0FoRFksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhcmRWaWV3Qm9vbEl0ZW1Nb2RlbCwgQ2FyZFZpZXdJdGVtLCBDYXJkVmlld1RleHRJdGVtTW9kZWwgfSBmcm9tICdAYWxmcmVzY28vYWRmLWNvcmUnO1xuaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnLi4vbW9kZWwvbW9kdWxlLm1vZGVsJztcbmltcG9ydCB7IE1vZHVsZVVwZGF0ZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9tb2R1bGUudXBkYXRlLnNlcnZpY2UnO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbW9kdWxlLXVwZGF0ZScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL21vZHVsZS11cGRhdGVzLmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBNb2R1bGVVcGRhdGVzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBtb2R1bGVzOiBNb2R1bGVbXSA9IFtdO1xuICAgIGlzVXBkYXRpbmcgPSBmYWxzZTtcbiAgICBpbnN0YWxsZWQgPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc2VydmljZTogTW9kdWxlVXBkYXRlU2VydmljZSkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlcnZpY2UuYXZhaWxhYmxlVXBkYXRlcygpLnN1YnNjcmliZShyZXMgPT4gdGhpcy5tb2R1bGVzID0gcmVzKVxuICAgIH1cblxuICAgIGdldFByb3BlcnRpZXMobW9kdWxlOiBNb2R1bGUpOiBBcnJheTxDYXJkVmlld0l0ZW0+IHtcbiAgICAgICAgY29uc3QgcHJvcGVydGllcyA9IFtdO1xuICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IG5ldyBDYXJkVmlld1RleHRJdGVtTW9kZWwoe1xuICAgICAgICAgICAgbGFiZWw6ICdEZXNjcmlwdGlvbicsXG4gICAgICAgICAgICB2YWx1ZTogbW9kdWxlLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAga2V5OiAnZGVzYycsXG4gICAgICAgIH0pO1xuICAgICAgICBwcm9wZXJ0aWVzLnB1c2goZGVzY3JpcHRpb24pO1xuICAgICAgICBjb25zdCBhY3RpdmUgPSBuZXcgQ2FyZFZpZXdCb29sSXRlbU1vZGVsKHtcbiAgICAgICAgICAgIGxhYmVsOiAnQWN0aXZlJyxcbiAgICAgICAgICAgIHZhbHVlOiBtb2R1bGUuYWN0aXZlLFxuICAgICAgICAgICAga2V5OiAnYWN0aXZlJyxcbiAgICAgICAgfSk7XG4gICAgICAgIHByb3BlcnRpZXMucHVzaChhY3RpdmUpO1xuICAgICAgICBjb25zdCB2ZXJzaW9uID0gbmV3IENhcmRWaWV3VGV4dEl0ZW1Nb2RlbCh7XG4gICAgICAgICAgICBsYWJlbDogJ3ZlcnNpb24nLFxuICAgICAgICAgICAgdmFsdWU6IG1vZHVsZS52ZXJzaW9uLFxuICAgICAgICAgICAga2V5OiAndmVyc2lvbicsXG4gICAgICAgIH0pO1xuICAgICAgICBwcm9wZXJ0aWVzLnB1c2godmVyc2lvbik7XG4gICAgICAgIHJldHVybiBwcm9wZXJ0aWVzO1xuICAgIH1cblxuICAgIHVwZGF0ZU1vZHVsZXMoKSB7XG4gICAgICAgIHRoaXMuaXNVcGRhdGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuaW5zdGFsbGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2VydmljZS5pbnN0YWxsVXBkYXRlcygpLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgdGhpcy5tb2R1bGVzID0gcmVzO1xuICAgICAgICAgICAgdGhpcy5pc1VwZGF0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmluc3RhbGxlZCA9IHRydWU7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcHJldmlvdXNTdGF0ZSgpIHtcbiAgICAgICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xuICAgIH1cbn1cbiJdfQ==
