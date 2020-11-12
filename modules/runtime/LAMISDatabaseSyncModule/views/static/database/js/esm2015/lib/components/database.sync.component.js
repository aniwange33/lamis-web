import * as tslib_1 from "tslib";
import {Component} from '@angular/core';
import {RxStompService} from "@stomp/ng2-stompjs";
import {CardViewBoolItemModel, CardViewDateItemModel} from '@alfresco/adf-core';
import * as moment_ from 'moment';

const moment = moment_;
let DatabaseSyncComponent = class DatabaseSyncComponent {
    constructor(stompService) {
        this.stompService = stompService;
        this.syncing = false;
        this.tables = '';
        this.properties = [];
        this.statusProperties = [];
    }

    ngOnInit() {
        this.statusSubscription = this.stompService.watch("/topic/server-status").subscribe((msg) => {
            this.properties = [];
            this.properties.push(new CardViewDateItemModel({
                key: 'date',
                value: moment(msg.body),
                label: 'Last contact with Server',
                format: 'DD MMM, YYYY HH:MM'
            }));
            this.properties.push(new CardViewDateItemModel({
                key: 'date',
                value: moment(msg.body),
                label: 'Last successful upload to Server',
                format: 'DD MMM, YYYY HH:MM'
            }));
        });
        this.syncSubscription = this.stompService.watch("/topic/server-status").subscribe((msg) => {
            this.properties = [];
            this.properties.push(new CardViewBoolItemModel({
                key: 'date',
                value: msg.body === 'true',
                label: 'Upload Complete',
            }));
            this.syncing = msg.body === 'false';
        });
        this.tableSubscription = this.stompService.watch("/topic/table-status").subscribe((msg) => {
            this.tables = msg.body;
        });
    }

    ngOnDestroy() {
        this.statusSubscription.unsubscribe();
        this.tableSubscription.unsubscribe();
        this.syncSubscription.unsubscribe();
    }

    sync() {
        this.syncing = true;
    }

    previousState() {
        window.history.back();
    }
};
DatabaseSyncComponent.ctorParameters = () => [
    {type: RxStompService}
];
DatabaseSyncComponent = tslib_1.__decorate([
    Component({
        selector: 'database-sync',
        template: "<mat-card>\n    <mat-card-content>\n        <adf-card-view [properties]=\"properties\" [editable]=\"false\"></adf-card-view>\n        <adf-card-view [properties]=\"statusProperties\" [editable]=\"false\"></adf-card-view>\n\n        <mat-form-field class=\"full-width\">\n            <mat-label>Synced Tables</mat-label>\n            <textarea matInput></textarea>\n        </mat-form-field>\n\n        <mat-divider></mat-divider>\n        <button mat-raised-button type=\"button\" (click)=\"previousState()\">Back</button>\n        <button mat-raised-button color='primary'\n                (click)=\"sync()\"\n                [disabled]=\"!syncing\"\n                type=\"submit\">\n            Upload to Server\n        </button>\n    </mat-card-content>\n</mat-card>\n"
    }),
    tslib_1.__metadata("design:paramtypes", [RxStompService])
], DatabaseSyncComponent);
export {DatabaseSyncComponent};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWJhc2Uuc3luYy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1kYXRhYmFzZS0xLjAuMC8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2RhdGFiYXNlLnN5bmMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUU3RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFcEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLHFCQUFxQixFQUFnQixNQUFNLG9CQUFvQixDQUFDO0FBQ2hHLE9BQU8sS0FBSyxPQUFPLE1BQU0sUUFBUSxDQUFDO0FBRWxDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQztBQU12QixJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFxQjtJQVM5QixZQUFvQixZQUE0QjtRQUE1QixpQkFBWSxHQUFaLFlBQVksQ0FBZ0I7UUFSaEQsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixXQUFNLEdBQUcsRUFBRSxDQUFDO1FBSVosZUFBVSxHQUFtQixFQUFFLENBQUM7UUFDaEMscUJBQWdCLEdBQW1CLEVBQUUsQ0FBQztJQUd0QyxDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQVksRUFBRSxFQUFFO1lBQ2pHLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUkscUJBQXFCLENBQUM7Z0JBQzNDLEdBQUcsRUFBRSxNQUFNO2dCQUNYLEtBQUssRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztnQkFDdkIsS0FBSyxFQUFFLDBCQUEwQjtnQkFDakMsTUFBTSxFQUFFLG9CQUFvQjthQUMvQixDQUFDLENBQUMsQ0FBQztZQUVKLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUkscUJBQXFCLENBQUM7Z0JBQzNDLEdBQUcsRUFBRSxNQUFNO2dCQUNYLEtBQUssRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztnQkFDdkIsS0FBSyxFQUFFLGtDQUFrQztnQkFDekMsTUFBTSxFQUFFLG9CQUFvQjthQUMvQixDQUFDLENBQUMsQ0FBQTtRQUNQLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBWSxFQUFFLEVBQUU7WUFDL0YsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7WUFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxxQkFBcUIsQ0FBQztnQkFDM0MsR0FBRyxFQUFFLE1BQU07Z0JBQ1gsS0FBSyxFQUFFLEdBQUcsQ0FBQyxJQUFJLEtBQUssTUFBTTtnQkFDMUIsS0FBSyxFQUFFLGlCQUFpQjthQUMzQixDQUFDLENBQUMsQ0FBQztZQUVKLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLElBQUksS0FBSyxPQUFPLENBQUM7UUFDeEMsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFZLEVBQUUsRUFBRTtZQUMvRixJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUE7UUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN0QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFRCxJQUFJO1FBQ0EsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDeEIsQ0FBQztJQUVELGFBQWE7UUFDVCxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzFCLENBQUM7Q0FHSixDQUFBOztZQXBEcUMsY0FBYzs7QUFUdkMscUJBQXFCO0lBSmpDLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxlQUFlO1FBQ3pCLGl4QkFBNkM7S0FDaEQsQ0FBQzs2Q0FVb0MsY0FBYztHQVR2QyxxQkFBcUIsQ0E2RGpDO1NBN0RZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgUnhTdG9tcFNlcnZpY2UgfSBmcm9tIFwiQHN0b21wL25nMi1zdG9tcGpzXCI7XG5pbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSAnQHN0b21wL3N0b21wanMnO1xuaW1wb3J0IHsgQ2FyZFZpZXdCb29sSXRlbU1vZGVsLCBDYXJkVmlld0RhdGVJdGVtTW9kZWwsIENhcmRWaWV3SXRlbSB9IGZyb20gJ0BhbGZyZXNjby9hZGYtY29yZSc7XG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XG5cbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZGF0YWJhc2Utc3luYycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2RhdGFiYXNlLnN5bmMuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIERhdGFiYXNlU3luY0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBzeW5jaW5nID0gZmFsc2U7XG4gICAgdGFibGVzID0gJyc7XG4gICAgc3RhdHVzU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gICAgdGFibGVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgICBzeW5jU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gICAgcHJvcGVydGllczogQ2FyZFZpZXdJdGVtW10gPSBbXTtcbiAgICBzdGF0dXNQcm9wZXJ0aWVzOiBDYXJkVmlld0l0ZW1bXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzdG9tcFNlcnZpY2U6IFJ4U3RvbXBTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3RhdHVzU3Vic2NyaXB0aW9uID0gdGhpcy5zdG9tcFNlcnZpY2Uud2F0Y2goXCIvdG9waWMvc2VydmVyLXN0YXR1c1wiKS5zdWJzY3JpYmUoKG1zZzogTWVzc2FnZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wcm9wZXJ0aWVzID0gW107XG4gICAgICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdEYXRlSXRlbU1vZGVsKHtcbiAgICAgICAgICAgICAgICBrZXk6ICdkYXRlJyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogbW9tZW50KG1zZy5ib2R5KSxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0xhc3QgY29udGFjdCB3aXRoIFNlcnZlcicsXG4gICAgICAgICAgICAgICAgZm9ybWF0OiAnREQgTU1NLCBZWVlZIEhIOk1NJ1xuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdEYXRlSXRlbU1vZGVsKHtcbiAgICAgICAgICAgICAgICBrZXk6ICdkYXRlJyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogbW9tZW50KG1zZy5ib2R5KSxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0xhc3Qgc3VjY2Vzc2Z1bCB1cGxvYWQgdG8gU2VydmVyJyxcbiAgICAgICAgICAgICAgICBmb3JtYXQ6ICdERCBNTU0sIFlZWVkgSEg6TU0nXG4gICAgICAgICAgICB9KSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zeW5jU3Vic2NyaXB0aW9uID0gdGhpcy5zdG9tcFNlcnZpY2Uud2F0Y2goXCIvdG9waWMvc2VydmVyLXN0YXR1c1wiKS5zdWJzY3JpYmUoKG1zZzogTWVzc2FnZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wcm9wZXJ0aWVzID0gW107XG4gICAgICAgICAgICB0aGlzLnByb3BlcnRpZXMucHVzaChuZXcgQ2FyZFZpZXdCb29sSXRlbU1vZGVsKHtcbiAgICAgICAgICAgICAgICBrZXk6ICdkYXRlJyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogbXNnLmJvZHkgPT09ICd0cnVlJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ1VwbG9hZCBDb21wbGV0ZScsXG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgIHRoaXMuc3luY2luZyA9IG1zZy5ib2R5ID09PSAnZmFsc2UnO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnRhYmxlU3Vic2NyaXB0aW9uID0gdGhpcy5zdG9tcFNlcnZpY2Uud2F0Y2goXCIvdG9waWMvdGFibGUtc3RhdHVzXCIpLnN1YnNjcmliZSgobXNnOiBNZXNzYWdlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnRhYmxlcyA9IG1zZy5ib2R5XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnN0YXR1c1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLnRhYmxlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMuc3luY1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIHN5bmMoKSB7XG4gICAgICAgIHRoaXMuc3luY2luZyA9IHRydWU7XG4gICAgfVxuXG4gICAgcHJldmlvdXNTdGF0ZSgpIHtcbiAgICAgICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xuICAgIH1cblxuXG59XG4iXX0=
