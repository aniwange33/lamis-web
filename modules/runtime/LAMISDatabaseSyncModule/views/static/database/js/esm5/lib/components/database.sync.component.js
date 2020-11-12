import * as tslib_1 from "tslib";
import {Component} from '@angular/core';
import {RxStompService} from "@stomp/ng2-stompjs";
import {CardViewBoolItemModel, CardViewDateItemModel} from '@alfresco/adf-core';
import * as moment_ from 'moment';

var moment = moment_;
var DatabaseSyncComponent = /** @class */ (function () {
    function DatabaseSyncComponent(stompService) {
        this.stompService = stompService;
        this.syncing = false;
        this.tables = '';
        this.properties = [];
        this.statusProperties = [];
    }

    DatabaseSyncComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.statusSubscription = this.stompService.watch("/topic/server-status").subscribe(function (msg) {
            _this.properties = [];
            _this.properties.push(new CardViewDateItemModel({
                key: 'date',
                value: moment(msg.body),
                label: 'Last contact with Server',
                format: 'DD MMM, YYYY HH:MM'
            }));
            _this.properties.push(new CardViewDateItemModel({
                key: 'date',
                value: moment(msg.body),
                label: 'Last successful upload to Server',
                format: 'DD MMM, YYYY HH:MM'
            }));
        });
        this.syncSubscription = this.stompService.watch("/topic/server-status").subscribe(function (msg) {
            _this.properties = [];
            _this.properties.push(new CardViewBoolItemModel({
                key: 'date',
                value: msg.body === 'true',
                label: 'Upload Complete',
            }));
            _this.syncing = msg.body === 'false';
        });
        this.tableSubscription = this.stompService.watch("/topic/table-status").subscribe(function (msg) {
            _this.tables = msg.body;
        });
    };
    DatabaseSyncComponent.prototype.ngOnDestroy = function () {
        this.statusSubscription.unsubscribe();
        this.tableSubscription.unsubscribe();
        this.syncSubscription.unsubscribe();
    };
    DatabaseSyncComponent.prototype.sync = function () {
        this.syncing = true;
    };
    DatabaseSyncComponent.prototype.previousState = function () {
        window.history.back();
    };
    DatabaseSyncComponent.ctorParameters = function () {
        return [
            {type: RxStompService}
        ];
    };
    DatabaseSyncComponent = tslib_1.__decorate([
        Component({
            selector: 'database-sync',
            template: "<mat-card>\n    <mat-card-content>\n        <adf-card-view [properties]=\"properties\" [editable]=\"false\"></adf-card-view>\n        <adf-card-view [properties]=\"statusProperties\" [editable]=\"false\"></adf-card-view>\n\n        <mat-form-field class=\"full-width\">\n            <mat-label>Synced Tables</mat-label>\n            <textarea matInput></textarea>\n        </mat-form-field>\n\n        <mat-divider></mat-divider>\n        <button mat-raised-button type=\"button\" (click)=\"previousState()\">Back</button>\n        <button mat-raised-button color='primary'\n                (click)=\"sync()\"\n                [disabled]=\"!syncing\"\n                type=\"submit\">\n            Upload to Server\n        </button>\n    </mat-card-content>\n</mat-card>\n"
        }),
        tslib_1.__metadata("design:paramtypes", [RxStompService])
    ], DatabaseSyncComponent);
    return DatabaseSyncComponent;
}());
export {DatabaseSyncComponent};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWJhc2Uuc3luYy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1kYXRhYmFzZS0xLjAuMC8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2RhdGFiYXNlLnN5bmMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUU3RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFcEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLHFCQUFxQixFQUFnQixNQUFNLG9CQUFvQixDQUFDO0FBQ2hHLE9BQU8sS0FBSyxPQUFPLE1BQU0sUUFBUSxDQUFDO0FBRWxDLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQztBQU12QjtJQVNJLCtCQUFvQixZQUE0QjtRQUE1QixpQkFBWSxHQUFaLFlBQVksQ0FBZ0I7UUFSaEQsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixXQUFNLEdBQUcsRUFBRSxDQUFDO1FBSVosZUFBVSxHQUFtQixFQUFFLENBQUM7UUFDaEMscUJBQWdCLEdBQW1CLEVBQUUsQ0FBQztJQUd0QyxDQUFDO0lBRUQsd0NBQVEsR0FBUjtRQUFBLGlCQWdDQztRQS9CRyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQyxHQUFZO1lBQzdGLEtBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1lBQ3JCLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUkscUJBQXFCLENBQUM7Z0JBQzNDLEdBQUcsRUFBRSxNQUFNO2dCQUNYLEtBQUssRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztnQkFDdkIsS0FBSyxFQUFFLDBCQUEwQjtnQkFDakMsTUFBTSxFQUFFLG9CQUFvQjthQUMvQixDQUFDLENBQUMsQ0FBQztZQUVKLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUkscUJBQXFCLENBQUM7Z0JBQzNDLEdBQUcsRUFBRSxNQUFNO2dCQUNYLEtBQUssRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztnQkFDdkIsS0FBSyxFQUFFLGtDQUFrQztnQkFDekMsTUFBTSxFQUFFLG9CQUFvQjthQUMvQixDQUFDLENBQUMsQ0FBQTtRQUNQLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUMsR0FBWTtZQUMzRixLQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztZQUNyQixLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLHFCQUFxQixDQUFDO2dCQUMzQyxHQUFHLEVBQUUsTUFBTTtnQkFDWCxLQUFLLEVBQUUsR0FBRyxDQUFDLElBQUksS0FBSyxNQUFNO2dCQUMxQixLQUFLLEVBQUUsaUJBQWlCO2FBQzNCLENBQUMsQ0FBQyxDQUFDO1lBRUosS0FBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQztRQUN4QyxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFDLEdBQVk7WUFDM0YsS0FBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFBO1FBQzFCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELDJDQUFXLEdBQVg7UUFDSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBRUQsb0NBQUksR0FBSjtRQUNJLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ3hCLENBQUM7SUFFRCw2Q0FBYSxHQUFiO1FBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMxQixDQUFDOztnQkFqRGlDLGNBQWM7O0lBVHZDLHFCQUFxQjtRQUpqQyxTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZUFBZTtZQUN6QixpeEJBQTZDO1NBQ2hELENBQUM7aURBVW9DLGNBQWM7T0FUdkMscUJBQXFCLENBNkRqQztJQUFELDRCQUFDO0NBQUEsQUE3REQsSUE2REM7U0E3RFkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBSeFN0b21wU2VydmljZSB9IGZyb20gXCJAc3RvbXAvbmcyLXN0b21wanNcIjtcbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tICdAc3RvbXAvc3RvbXBqcyc7XG5pbXBvcnQgeyBDYXJkVmlld0Jvb2xJdGVtTW9kZWwsIENhcmRWaWV3RGF0ZUl0ZW1Nb2RlbCwgQ2FyZFZpZXdJdGVtIH0gZnJvbSAnQGFsZnJlc2NvL2FkZi1jb3JlJztcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcblxuY29uc3QgbW9tZW50ID0gbW9tZW50XztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdkYXRhYmFzZS1zeW5jJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZGF0YWJhc2Uuc3luYy5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgRGF0YWJhc2VTeW5jQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIHN5bmNpbmcgPSBmYWxzZTtcbiAgICB0YWJsZXMgPSAnJztcbiAgICBzdGF0dXNTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgICB0YWJsZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICAgIHN5bmNTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgICBwcm9wZXJ0aWVzOiBDYXJkVmlld0l0ZW1bXSA9IFtdO1xuICAgIHN0YXR1c1Byb3BlcnRpZXM6IENhcmRWaWV3SXRlbVtdID0gW107XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0b21wU2VydmljZTogUnhTdG9tcFNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdGF0dXNTdWJzY3JpcHRpb24gPSB0aGlzLnN0b21wU2VydmljZS53YXRjaChcIi90b3BpYy9zZXJ2ZXItc3RhdHVzXCIpLnN1YnNjcmliZSgobXNnOiBNZXNzYWdlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnByb3BlcnRpZXMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMucHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld0RhdGVJdGVtTW9kZWwoe1xuICAgICAgICAgICAgICAgIGtleTogJ2RhdGUnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBtb21lbnQobXNnLmJvZHkpLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnTGFzdCBjb250YWN0IHdpdGggU2VydmVyJyxcbiAgICAgICAgICAgICAgICBmb3JtYXQ6ICdERCBNTU0sIFlZWVkgSEg6TU0nXG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgIHRoaXMucHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld0RhdGVJdGVtTW9kZWwoe1xuICAgICAgICAgICAgICAgIGtleTogJ2RhdGUnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBtb21lbnQobXNnLmJvZHkpLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnTGFzdCBzdWNjZXNzZnVsIHVwbG9hZCB0byBTZXJ2ZXInLFxuICAgICAgICAgICAgICAgIGZvcm1hdDogJ0REIE1NTSwgWVlZWSBISDpNTSdcbiAgICAgICAgICAgIH0pKVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnN5bmNTdWJzY3JpcHRpb24gPSB0aGlzLnN0b21wU2VydmljZS53YXRjaChcIi90b3BpYy9zZXJ2ZXItc3RhdHVzXCIpLnN1YnNjcmliZSgobXNnOiBNZXNzYWdlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnByb3BlcnRpZXMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMucHJvcGVydGllcy5wdXNoKG5ldyBDYXJkVmlld0Jvb2xJdGVtTW9kZWwoe1xuICAgICAgICAgICAgICAgIGtleTogJ2RhdGUnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBtc2cuYm9keSA9PT0gJ3RydWUnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnVXBsb2FkIENvbXBsZXRlJyxcbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgdGhpcy5zeW5jaW5nID0gbXNnLmJvZHkgPT09ICdmYWxzZSc7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudGFibGVTdWJzY3JpcHRpb24gPSB0aGlzLnN0b21wU2VydmljZS53YXRjaChcIi90b3BpYy90YWJsZS1zdGF0dXNcIikuc3Vic2NyaWJlKChtc2c6IE1lc3NhZ2UpID0+IHtcbiAgICAgICAgICAgIHRoaXMudGFibGVzID0gbXNnLmJvZHlcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3RhdHVzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMudGFibGVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5zeW5jU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgc3luYygpIHtcbiAgICAgICAgdGhpcy5zeW5jaW5nID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcmV2aW91c1N0YXRlKCkge1xuICAgICAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XG4gICAgfVxuXG5cbn1cbiJdfQ==
