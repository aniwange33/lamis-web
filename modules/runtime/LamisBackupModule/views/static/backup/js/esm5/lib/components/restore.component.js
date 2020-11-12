import * as tslib_1 from "tslib";
import {Component} from "@angular/core";
import {BackupService} from "../services/backup.service";
import {RxStompService} from "@stomp/ng2-stompjs";
import {AppLoaderService} from "@lamis/web-core";

var RestoreComponent = /** @class */ (function () {
    function RestoreComponent(backupService, stompService, loaderService) {
        this.backupService = backupService;
        this.stompService = stompService;
        this.loaderService = loaderService;
        this.submitted = false;
        this.running = false;
        this.available = false;
    }

    RestoreComponent.prototype.ngOnDestroy = function () {
        this.topicSubscription.unsubscribe();
        this.errorSubscription.unsubscribe();
    };
    RestoreComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.topicSubscription = this.stompService.watch('/topic/backup/status').subscribe(function (msg) {
            _this.status = msg.body + '\n' + _this.status;
            _this.running = msg.body !== 'Restore completed';
        });
        this.errorSubscription = this.stompService.watch('/topic/backup/error').subscribe(function (msg) {
            _this.status = 'Could not restore database; an error occurred';
            _this.running = false;
        });
        this.backupService.backupAvailable().subscribe(function (res) {
            return _this.available = res;
        });
    };
    RestoreComponent.prototype.upload = function () {
        var _this = this;
        var formData = new FormData();
        formData.append('file', this.files);
        this.loaderService.open('Uploading file: please wait...');
        this.backupService.uploadFile(formData).subscribe(function (res) {
            _this.loaderService.close();
            _this.submitted = true;
        });
    };
    RestoreComponent.prototype.restore = function () {
        this.status = 'Starting restore';
        this.submitted = false;
        this.backupService.restore().subscribe();
    };
    RestoreComponent.prototype.revert = function () {
        this.running = true;
        this.backupService.revert().subscribe();
    };
    RestoreComponent.ctorParameters = function () {
        return [
            {type: BackupService},
            {type: RxStompService},
            {type: AppLoaderService}
        ];
    };
    RestoreComponent = tslib_1.__decorate([
        Component({
            selector: 'lamis-restore',
            template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <mat-card>\n            <mat-card-content>\n                <div layout=\"row\">\n                    <mat-form-field tdFileDrop\n                                    (fileDrop)=\"files = $event\"\n                                    (click)=\"fileInput.inputElement.click()\"\n                                    (keyup.enter)=\"fileInput.inputElement.click()\"\n                                    (keyup.delete)=\"fileInput.clear()\"\n                                    (keyup.backspace)=\"fileInput.clear()\"\n                                    flex>\n                        <input matInput\n                               placeholder=\"Select or drop a file\"\n                               [value]=\"files?.length ? (files?.length + ' files') : files?.name\"\n                               readonly/>\n                    </mat-form-field>\n                    <button mat-icon-button *ngIf=\"files\" (click)=\"fileInput.clear()\" (keyup.enter)=\"fileInput.clear()\">\n                        <mat-icon>cancel</mat-icon>\n                    </button>\n                    <td-file-input class=\"push-left-sm push-right-sm\" #fileInput [(ngModel)]=\"files\">\n                        <mat-icon>folder</mat-icon>\n                        <span class=\"text-upper\">Browse...</span>\n                    </td-file-input>\n                    <span>\n                <button mat-raised-button color=\"accent\" [disabled]=\"!files || running\" class=\"text-upper\"\n                        (click)=\"upload()\">Upload</button>\n            </span>\n                </div>\n                <mat-form-field *ngIf=\"!!status\">\n                    <textarea matInput placeholder=\"Status\" [value]=\"status\"\n                              rows=\"20\"\n                              [disabled]=\"true\"></textarea>\n                </mat-form-field>\n                <mat-divider></mat-divider>\n                <mat-card-actions>\n                    <button mat-button [disabled]=\"running || !available\" class=\"text-upper\"\n                    (click)=\"revert()\">Revert to Previous backup\n                    </button>\n                    <button mat-raised-button color=\"primary\" [disabled]=\"running || !submitted\" class=\"text-upper\"\n                            (click)=\"restore()\">Restore\n                    </button>\n                </mat-card-actions>\n            </mat-card-content>\n        </mat-card>\n    </div>\n</div>",
            styles: [".drop-zone{font-weight:600}.drop-zone ::ng-deep *{pointer-events:none}"]
        }),
        tslib_1.__metadata("design:paramtypes", [BackupService, RxStompService,
            AppLoaderService])
    ], RestoreComponent);
    return RestoreComponent;
}());
export {RestoreComponent};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdG9yZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1iYWNrdXAvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9yZXN0b3JlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzNELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQVNuRDtJQVNJLDBCQUFvQixhQUE0QixFQUFVLFlBQTRCLEVBQ2xFLGFBQStCO1FBRC9CLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQWdCO1FBQ2xFLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtRQVJuRCxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsY0FBUyxHQUFZLEtBQUssQ0FBQztJQU8zQixDQUFDO0lBRUQsc0NBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUVELG1DQUFRLEdBQVI7UUFBQSxpQkFVQztRQVRHLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFDLEdBQVk7WUFDNUYsS0FBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDO1lBQzVDLEtBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLElBQUksS0FBSyxtQkFBbUIsQ0FBQztRQUNwRCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFDLEdBQVk7WUFDM0YsS0FBSSxDQUFDLE1BQU0sR0FBRywrQ0FBK0MsQ0FBQztZQUM5RCxLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxFQUFFLENBQUMsU0FBUyxDQUFDLFVBQUMsR0FBWSxJQUFLLE9BQUEsS0FBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLEVBQXBCLENBQW9CLENBQUMsQ0FBQTtJQUMxRixDQUFDO0lBRUQsaUNBQU0sR0FBTjtRQUFBLGlCQVFDO1FBUEcsSUFBTSxRQUFRLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztRQUNoQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHO1lBQ2pELEtBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDM0IsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQsa0NBQU8sR0FBUDtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsa0JBQWtCLENBQUM7UUFDakMsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBRUQsaUNBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDNUMsQ0FBQzs7Z0JBeENrQyxhQUFhO2dCQUF3QixjQUFjO2dCQUNuRCxnQkFBZ0I7O0lBVjFDLGdCQUFnQjtRQUw1QixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZUFBZTtZQUN6QiwyL0VBQXVDOztTQUUxQyxDQUFDO2lEQVVxQyxhQUFhLEVBQXdCLGNBQWM7WUFDbkQsZ0JBQWdCO09BVjFDLGdCQUFnQixDQW1ENUI7SUFBRCx1QkFBQztDQUFBLEFBbkRELElBbURDO1NBbkRZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQmFja3VwU2VydmljZSB9IGZyb20gXCIuLi9zZXJ2aWNlcy9iYWNrdXAuc2VydmljZVwiO1xuaW1wb3J0IHsgUnhTdG9tcFNlcnZpY2UgfSBmcm9tIFwiQHN0b21wL25nMi1zdG9tcGpzXCI7XG5pbXBvcnQgeyBBcHBMb2FkZXJTZXJ2aWNlIH0gZnJvbSBcIkBsYW1pcy93ZWItY29yZVwiO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tIFwiQHN0b21wL3N0b21wanNcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdsYW1pcy1yZXN0b3JlJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vcmVzdG9yZS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vcmVzdG9yZS5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFJlc3RvcmVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgZmlsZXM6IGFueTtcbiAgICBzdWJtaXR0ZWQgPSBmYWxzZTtcbiAgICBydW5uaW5nID0gZmFsc2U7XG4gICAgYXZhaWxhYmxlOiBib29sZWFuID0gZmFsc2U7XG4gICAgc3RhdHVzOiBhbnk7XG4gICAgdG9waWNTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgICBlcnJvclN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBiYWNrdXBTZXJ2aWNlOiBCYWNrdXBTZXJ2aWNlLCBwcml2YXRlIHN0b21wU2VydmljZTogUnhTdG9tcFNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBsb2FkZXJTZXJ2aWNlOiBBcHBMb2FkZXJTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMudG9waWNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5lcnJvclN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRvcGljU3Vic2NyaXB0aW9uID0gdGhpcy5zdG9tcFNlcnZpY2Uud2F0Y2goJy90b3BpYy9iYWNrdXAvc3RhdHVzJykuc3Vic2NyaWJlKChtc2c6IE1lc3NhZ2UpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gbXNnLmJvZHkgKyAnXFxuJyArIHRoaXMuc3RhdHVzO1xuICAgICAgICAgICAgdGhpcy5ydW5uaW5nID0gbXNnLmJvZHkgIT09ICdSZXN0b3JlIGNvbXBsZXRlZCc7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmVycm9yU3Vic2NyaXB0aW9uID0gdGhpcy5zdG9tcFNlcnZpY2Uud2F0Y2goJy90b3BpYy9iYWNrdXAvZXJyb3InKS5zdWJzY3JpYmUoKG1zZzogTWVzc2FnZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdGF0dXMgPSAnQ291bGQgbm90IHJlc3RvcmUgZGF0YWJhc2U7IGFuIGVycm9yIG9jY3VycmVkJztcbiAgICAgICAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5iYWNrdXBTZXJ2aWNlLmJhY2t1cEF2YWlsYWJsZSgpLnN1YnNjcmliZSgocmVzOiBib29sZWFuKSA9PiB0aGlzLmF2YWlsYWJsZSA9IHJlcylcbiAgICB9XG5cbiAgICB1cGxvYWQoKSB7XG4gICAgICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZCgnZmlsZScsIHRoaXMuZmlsZXMpO1xuICAgICAgICB0aGlzLmxvYWRlclNlcnZpY2Uub3BlbignVXBsb2FkaW5nIGZpbGU6IHBsZWFzZSB3YWl0Li4uJyk7XG4gICAgICAgIHRoaXMuYmFja3VwU2VydmljZS51cGxvYWRGaWxlKGZvcm1EYXRhKS5zdWJzY3JpYmUocmVzPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2FkZXJTZXJ2aWNlLmNsb3NlKCk7XG4gICAgICAgICAgICB0aGlzLnN1Ym1pdHRlZCA9IHRydWU7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcmVzdG9yZSgpIHtcbiAgICAgICAgdGhpcy5zdGF0dXMgPSAnU3RhcnRpbmcgcmVzdG9yZSc7XG4gICAgICAgIHRoaXMuc3VibWl0dGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYmFja3VwU2VydmljZS5yZXN0b3JlKCkuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgcmV2ZXJ0KCkge1xuICAgICAgICB0aGlzLnJ1bm5pbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmJhY2t1cFNlcnZpY2UucmV2ZXJ0KCkuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG59XG4iXX0=
