import * as tslib_1 from "tslib";
import {Component} from "@angular/core";
import {BackupService} from "../services/backup.service";
import {RxStompService} from "@stomp/ng2-stompjs";
import {AppLoaderService} from "@lamis/web-core";

let RestoreComponent = class RestoreComponent {
    constructor(backupService, stompService, loaderService) {
        this.backupService = backupService;
        this.stompService = stompService;
        this.loaderService = loaderService;
        this.submitted = false;
        this.running = false;
        this.available = false;
    }

    ngOnDestroy() {
        this.topicSubscription.unsubscribe();
        this.errorSubscription.unsubscribe();
    }

    ngOnInit() {
        this.topicSubscription = this.stompService.watch('/topic/backup/status').subscribe((msg) => {
            this.status = msg.body + '\n' + this.status;
            this.running = msg.body !== 'Restore completed';
        });
        this.errorSubscription = this.stompService.watch('/topic/backup/error').subscribe((msg) => {
            this.status = 'Could not restore database; an error occurred';
            this.running = false;
        });
        this.backupService.backupAvailable().subscribe((res) => this.available = res);
    }

    upload() {
        const formData = new FormData();
        formData.append('file', this.files);
        this.loaderService.open('Uploading file: please wait...');
        this.backupService.uploadFile(formData).subscribe(res => {
            this.loaderService.close();
            this.submitted = true;
        });
    }

    restore() {
        this.status = 'Starting restore';
        this.submitted = false;
        this.backupService.restore().subscribe();
    }

    revert() {
        this.running = true;
        this.backupService.revert().subscribe();
    }
};
RestoreComponent.ctorParameters = () => [
    {type: BackupService},
    {type: RxStompService},
    {type: AppLoaderService}
];
RestoreComponent = tslib_1.__decorate([
    Component({
        selector: 'lamis-restore',
        template: "<div class=\"lamis-edit-form\">\n    <div class=\"lamis-edit-form-container\">\n        <mat-card>\n            <mat-card-content>\n                <div layout=\"row\">\n                    <mat-form-field tdFileDrop\n                                    (fileDrop)=\"files = $event\"\n                                    (click)=\"fileInput.inputElement.click()\"\n                                    (keyup.enter)=\"fileInput.inputElement.click()\"\n                                    (keyup.delete)=\"fileInput.clear()\"\n                                    (keyup.backspace)=\"fileInput.clear()\"\n                                    flex>\n                        <input matInput\n                               placeholder=\"Select or drop a file\"\n                               [value]=\"files?.length ? (files?.length + ' files') : files?.name\"\n                               readonly/>\n                    </mat-form-field>\n                    <button mat-icon-button *ngIf=\"files\" (click)=\"fileInput.clear()\" (keyup.enter)=\"fileInput.clear()\">\n                        <mat-icon>cancel</mat-icon>\n                    </button>\n                    <td-file-input class=\"push-left-sm push-right-sm\" #fileInput [(ngModel)]=\"files\">\n                        <mat-icon>folder</mat-icon>\n                        <span class=\"text-upper\">Browse...</span>\n                    </td-file-input>\n                    <span>\n                <button mat-raised-button color=\"accent\" [disabled]=\"!files || running\" class=\"text-upper\"\n                        (click)=\"upload()\">Upload</button>\n            </span>\n                </div>\n                <mat-form-field *ngIf=\"!!status\">\n                    <textarea matInput placeholder=\"Status\" [value]=\"status\"\n                              rows=\"20\"\n                              [disabled]=\"true\"></textarea>\n                </mat-form-field>\n                <mat-divider></mat-divider>\n                <mat-card-actions>\n                    <button mat-button [disabled]=\"running || !available\" class=\"text-upper\"\n                    (click)=\"revert()\">Revert to Previous backup\n                    </button>\n                    <button mat-raised-button color=\"primary\" [disabled]=\"running || !submitted\" class=\"text-upper\"\n                            (click)=\"restore()\">Restore\n                    </button>\n                </mat-card-actions>\n            </mat-card-content>\n        </mat-card>\n    </div>\n</div>",
        styles: [".drop-zone{font-weight:600}.drop-zone ::ng-deep *{pointer-events:none}"]
    }),
    tslib_1.__metadata("design:paramtypes", [BackupService, RxStompService,
        AppLoaderService])
], RestoreComponent);
export {RestoreComponent};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdG9yZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1iYWNrdXAvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9yZXN0b3JlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzNELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQVNuRCxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFnQjtJQVN6QixZQUFvQixhQUE0QixFQUFVLFlBQTRCLEVBQ2xFLGFBQStCO1FBRC9CLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQWdCO1FBQ2xFLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtRQVJuRCxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsY0FBUyxHQUFZLEtBQUssQ0FBQztJQU8zQixDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUVELFFBQVE7UUFDSixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFZLEVBQUUsRUFBRTtZQUNoRyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDNUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsSUFBSSxLQUFLLG1CQUFtQixDQUFDO1FBQ3BELENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBWSxFQUFFLEVBQUU7WUFDL0YsSUFBSSxDQUFDLE1BQU0sR0FBRywrQ0FBK0MsQ0FBQztZQUM5RCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBWSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxDQUFBO0lBQzFGLENBQUM7SUFFRCxNQUFNO1FBQ0YsTUFBTSxRQUFRLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztRQUNoQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFBLEVBQUU7WUFDbkQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUMzQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxPQUFPO1FBQ0gsSUFBSSxDQUFDLE1BQU0sR0FBRyxrQkFBa0IsQ0FBQztRQUNqQyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzdDLENBQUM7SUFFRCxNQUFNO1FBQ0YsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM1QyxDQUFDO0NBRUosQ0FBQTs7WUExQ3NDLGFBQWE7WUFBd0IsY0FBYztZQUNuRCxnQkFBZ0I7O0FBVjFDLGdCQUFnQjtJQUw1QixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsZUFBZTtRQUN6QiwyL0VBQXVDOztLQUUxQyxDQUFDOzZDQVVxQyxhQUFhLEVBQXdCLGNBQWM7UUFDbkQsZ0JBQWdCO0dBVjFDLGdCQUFnQixDQW1ENUI7U0FuRFksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBCYWNrdXBTZXJ2aWNlIH0gZnJvbSBcIi4uL3NlcnZpY2VzL2JhY2t1cC5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBSeFN0b21wU2VydmljZSB9IGZyb20gXCJAc3RvbXAvbmcyLXN0b21wanNcIjtcbmltcG9ydCB7IEFwcExvYWRlclNlcnZpY2UgfSBmcm9tIFwiQGxhbWlzL3dlYi1jb3JlXCI7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gXCJAc3RvbXAvc3RvbXBqc1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2xhbWlzLXJlc3RvcmUnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9yZXN0b3JlLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9yZXN0b3JlLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUmVzdG9yZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBmaWxlczogYW55O1xuICAgIHN1Ym1pdHRlZCA9IGZhbHNlO1xuICAgIHJ1bm5pbmcgPSBmYWxzZTtcbiAgICBhdmFpbGFibGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBzdGF0dXM6IGFueTtcbiAgICB0b3BpY1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICAgIGVycm9yU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGJhY2t1cFNlcnZpY2U6IEJhY2t1cFNlcnZpY2UsIHByaXZhdGUgc3RvbXBTZXJ2aWNlOiBSeFN0b21wU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGxvYWRlclNlcnZpY2U6IEFwcExvYWRlclNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50b3BpY1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLmVycm9yU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudG9waWNTdWJzY3JpcHRpb24gPSB0aGlzLnN0b21wU2VydmljZS53YXRjaCgnL3RvcGljL2JhY2t1cC9zdGF0dXMnKS5zdWJzY3JpYmUoKG1zZzogTWVzc2FnZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdGF0dXMgPSBtc2cuYm9keSArICdcXG4nICsgdGhpcy5zdGF0dXM7XG4gICAgICAgICAgICB0aGlzLnJ1bm5pbmcgPSBtc2cuYm9keSAhPT0gJ1Jlc3RvcmUgY29tcGxldGVkJztcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZXJyb3JTdWJzY3JpcHRpb24gPSB0aGlzLnN0b21wU2VydmljZS53YXRjaCgnL3RvcGljL2JhY2t1cC9lcnJvcicpLnN1YnNjcmliZSgobXNnOiBNZXNzYWdlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnN0YXR1cyA9ICdDb3VsZCBub3QgcmVzdG9yZSBkYXRhYmFzZTsgYW4gZXJyb3Igb2NjdXJyZWQnO1xuICAgICAgICAgICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmJhY2t1cFNlcnZpY2UuYmFja3VwQXZhaWxhYmxlKCkuc3Vic2NyaWJlKChyZXM6IGJvb2xlYW4pID0+IHRoaXMuYXZhaWxhYmxlID0gcmVzKVxuICAgIH1cblxuICAgIHVwbG9hZCgpIHtcbiAgICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdmaWxlJywgdGhpcy5maWxlcyk7XG4gICAgICAgIHRoaXMubG9hZGVyU2VydmljZS5vcGVuKCdVcGxvYWRpbmcgZmlsZTogcGxlYXNlIHdhaXQuLi4nKTtcbiAgICAgICAgdGhpcy5iYWNrdXBTZXJ2aWNlLnVwbG9hZEZpbGUoZm9ybURhdGEpLnN1YnNjcmliZShyZXM9PiB7XG4gICAgICAgICAgICB0aGlzLmxvYWRlclNlcnZpY2UuY2xvc2UoKTtcbiAgICAgICAgICAgIHRoaXMuc3VibWl0dGVkID0gdHJ1ZTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICByZXN0b3JlKCkge1xuICAgICAgICB0aGlzLnN0YXR1cyA9ICdTdGFydGluZyByZXN0b3JlJztcbiAgICAgICAgdGhpcy5zdWJtaXR0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5iYWNrdXBTZXJ2aWNlLnJlc3RvcmUoKS5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICByZXZlcnQoKSB7XG4gICAgICAgIHRoaXMucnVubmluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuYmFja3VwU2VydmljZS5yZXZlcnQoKS5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbn1cbiJdfQ==
