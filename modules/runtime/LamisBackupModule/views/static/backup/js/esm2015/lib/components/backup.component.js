import * as tslib_1 from "tslib";
import {Component} from '@angular/core';
import {BackupService} from "../services/backup.service";
import {RxStompService} from "@stomp/ng2-stompjs";
import {saveAs} from 'file-saver';

let BackupComponent = class BackupComponent {
    constructor(backupService, stompService) {
        this.backupService = backupService;
        this.stompService = stompService;
        this.running = false;
        this.available = false;
        this.finished = false;
    }

    ngOnInit() {
        this.topicSubscription = this.stompService.watch('/topic/backup/status').subscribe((msg) => {
            this.status = msg.body + '\n' + this.status;
            if (msg.body === 'Backup completed') {
                this.running = false;
                this.available = true;
            }
        });
        this.errorSubscription = this.stompService.watch('/topic/backup/error').subscribe((msg) => {
            this.status = 'Could not backup database; an error occurred';
            this.running = false;
        });
        this.backupService.backupAvailable().subscribe((res) => this.available = res);
    }

    backup() {
        this.running = true;
        this.available = false;
        this.backupService.backup().subscribe(res => this.running = false);
    }

    download() {
        this.backupService.download().subscribe(res => {
            const file = new File([res], name + 'backup.dump', {type: 'application/octet-stream'});
            saveAs(file);
        });
    }

    ngOnDestroy() {
        this.topicSubscription.unsubscribe();
        this.errorSubscription.unsubscribe();
    }
};
BackupComponent.ctorParameters = () => [
    {type: BackupService},
    {type: RxStompService}
];
BackupComponent = tslib_1.__decorate([
    Component({
        selector: 'lamis-backup',
        template: "<div class=\"lamis-edit-form\">\r\n    <div class=\"lamis-edit-form-container\">\r\n        <mat-card>\r\n            <mat-card-content>\r\n                <mat-form-field *ngIf=\"!!status\">\r\n                    <textarea matInput placeholder=\"Status\" [value]=\"status\"\r\n                              rows=\"20\"\r\n                              [disabled]=\"true\"></textarea>\r\n                </mat-form-field>\r\n                <mat-divider></mat-divider>\r\n                <mat-card-actions>\r\n                    <button mat-raised-button color=\"primary\" [disabled]=\"running\"\r\n                            class=\"text-upper\"\r\n                            (click)=\"backup()\">Create New Backup\r\n                    </button>\r\n                    <button mat-button color=\"accent\" [disabled]=\"!available\" class=\"text-upper\"\r\n                            (click)=\"download()\">Download Backup\r\n                    </button>\r\n                </mat-card-actions>\r\n            </mat-card-content>\r\n        </mat-card>\r\n    </div>\r\n</div>"
    }),
    tslib_1.__metadata("design:paramtypes", [BackupService, RxStompService])
], BackupComponent);
export {BackupComponent};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja3VwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xhbWlzLWJhY2t1cC8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2JhY2t1cC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFHcEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFlBQVksQ0FBQztBQVlwQyxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFlO0lBUXhCLFlBQW9CLGFBQTRCLEVBQVUsWUFBNEI7UUFBbEUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBZ0I7UUFMdEYsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixjQUFTLEdBQVksS0FBSyxDQUFDO1FBRTNCLGFBQVEsR0FBRyxLQUFLLENBQUM7SUFHakIsQ0FBQztJQUVELFFBQVE7UUFDSixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFZLEVBQUUsRUFBRTtZQUNoRyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDNUMsSUFBRyxHQUFHLENBQUMsSUFBSSxLQUFLLGtCQUFrQixFQUFDO2dCQUMvQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztnQkFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7YUFDekI7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQVksRUFBRSxFQUFFO1lBQy9GLElBQUksQ0FBQyxNQUFNLEdBQUcsOENBQThDLENBQUM7WUFDN0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQVksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsQ0FBQTtJQUMxRixDQUFDO0lBRUQsTUFBTTtRQUNGLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsQ0FBQTtJQUN0RSxDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzFDLE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLGFBQWEsRUFBRSxFQUFDLElBQUksRUFBRSwwQkFBMEIsRUFBQyxDQUFDLENBQUM7WUFDdkYsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUdELFdBQVc7UUFDUCxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3pDLENBQUM7Q0FDSixDQUFBOztZQXJDc0MsYUFBYTtZQUF3QixjQUFjOztBQVI3RSxlQUFlO0lBSjNCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxjQUFjO1FBQ3hCLHNrQ0FBc0M7S0FDekMsQ0FBQzs2Q0FTcUMsYUFBYSxFQUF3QixjQUFjO0dBUjdFLGVBQWUsQ0E2QzNCO1NBN0NZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEJhY2t1cFNlcnZpY2UgfSBmcm9tIFwiLi4vc2VydmljZXMvYmFja3VwLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgUnhTdG9tcFNlcnZpY2UgfSBmcm9tIFwiQHN0b21wL25nMi1zdG9tcGpzXCI7XHJcbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tICdAc3RvbXAvc3RvbXBqcyc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gXCJyeGpzXCI7XHJcbmltcG9ydCB7IHNhdmVBcyB9IGZyb20gJ2ZpbGUtc2F2ZXInO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBGYWNpbGl0eSB7XHJcbiAgICBpZDogbnVtYmVyO1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgc2VsZWN0ZWQ6IGJvb2xlYW47XHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdsYW1pcy1iYWNrdXAnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2JhY2t1cC5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEJhY2t1cENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICAgIHByaXZhdGUgdG9waWNTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuICAgIHByaXZhdGUgZXJyb3JTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuICAgIHJ1bm5pbmcgPSBmYWxzZTtcclxuICAgIGF2YWlsYWJsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgc3RhdHVzOiBhbnk7XHJcbiAgICBmaW5pc2hlZCA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYmFja3VwU2VydmljZTogQmFja3VwU2VydmljZSwgcHJpdmF0ZSBzdG9tcFNlcnZpY2U6IFJ4U3RvbXBTZXJ2aWNlKSB7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy50b3BpY1N1YnNjcmlwdGlvbiA9IHRoaXMuc3RvbXBTZXJ2aWNlLndhdGNoKCcvdG9waWMvYmFja3VwL3N0YXR1cycpLnN1YnNjcmliZSgobXNnOiBNZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gbXNnLmJvZHkgKyAnXFxuJyArIHRoaXMuc3RhdHVzO1xyXG4gICAgICAgICAgICBpZihtc2cuYm9keSA9PT0gJ0JhY2t1cCBjb21wbGV0ZWQnKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdmFpbGFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5lcnJvclN1YnNjcmlwdGlvbiA9IHRoaXMuc3RvbXBTZXJ2aWNlLndhdGNoKCcvdG9waWMvYmFja3VwL2Vycm9yJykuc3Vic2NyaWJlKChtc2c6IE1lc3NhZ2UpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0dXMgPSAnQ291bGQgbm90IGJhY2t1cCBkYXRhYmFzZTsgYW4gZXJyb3Igb2NjdXJyZWQnO1xyXG4gICAgICAgICAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5iYWNrdXBTZXJ2aWNlLmJhY2t1cEF2YWlsYWJsZSgpLnN1YnNjcmliZSgocmVzOiBib29sZWFuKSA9PiB0aGlzLmF2YWlsYWJsZSA9IHJlcylcclxuICAgIH1cclxuXHJcbiAgICBiYWNrdXAoKSB7XHJcbiAgICAgICAgdGhpcy5ydW5uaW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmF2YWlsYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYmFja3VwU2VydmljZS5iYWNrdXAoKS5zdWJzY3JpYmUocmVzID0+IHRoaXMucnVubmluZyA9IGZhbHNlKVxyXG4gICAgfVxyXG5cclxuICAgIGRvd25sb2FkKCkge1xyXG4gICAgICAgIHRoaXMuYmFja3VwU2VydmljZS5kb3dubG9hZCgpLnN1YnNjcmliZShyZXMgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBmaWxlID0gbmV3IEZpbGUoW3Jlc10sIG5hbWUgKyAnYmFja3VwLmR1bXAnLCB7dHlwZTogJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbSd9KTtcclxuICAgICAgICAgICAgc2F2ZUFzKGZpbGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnRvcGljU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgICAgdGhpcy5lcnJvclN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==
