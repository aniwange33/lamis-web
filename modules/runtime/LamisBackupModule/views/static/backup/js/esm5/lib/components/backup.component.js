import * as tslib_1 from "tslib";
import {Component} from '@angular/core';
import {BackupService} from "../services/backup.service";
import {RxStompService} from "@stomp/ng2-stompjs";
import {saveAs} from 'file-saver';

var BackupComponent = /** @class */ (function () {
    function BackupComponent(backupService, stompService) {
        this.backupService = backupService;
        this.stompService = stompService;
        this.running = false;
        this.available = false;
        this.finished = false;
    }

    BackupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.topicSubscription = this.stompService.watch('/topic/backup/status').subscribe(function (msg) {
            _this.status = msg.body + '\n' + _this.status;
            if (msg.body === 'Backup completed') {
                _this.running = false;
                _this.available = true;
            }
        });
        this.errorSubscription = this.stompService.watch('/topic/backup/error').subscribe(function (msg) {
            _this.status = 'Could not backup database; an error occurred';
            _this.running = false;
        });
        this.backupService.backupAvailable().subscribe(function (res) {
            return _this.available = res;
        });
    };
    BackupComponent.prototype.backup = function () {
        var _this = this;
        this.running = true;
        this.available = false;
        this.backupService.backup().subscribe(function (res) {
            return _this.running = false;
        });
    };
    BackupComponent.prototype.download = function () {
        this.backupService.download().subscribe(function (res) {
            var file = new File([res], name + 'backup.dump', {type: 'application/octet-stream'});
            saveAs(file);
        });
    };
    BackupComponent.prototype.ngOnDestroy = function () {
        this.topicSubscription.unsubscribe();
        this.errorSubscription.unsubscribe();
    };
    BackupComponent.ctorParameters = function () {
        return [
            {type: BackupService},
            {type: RxStompService}
        ];
    };
    BackupComponent = tslib_1.__decorate([
        Component({
            selector: 'lamis-backup',
            template: "<div class=\"lamis-edit-form\">\r\n    <div class=\"lamis-edit-form-container\">\r\n        <mat-card>\r\n            <mat-card-content>\r\n                <mat-form-field *ngIf=\"!!status\">\r\n                    <textarea matInput placeholder=\"Status\" [value]=\"status\"\r\n                              rows=\"20\"\r\n                              [disabled]=\"true\"></textarea>\r\n                </mat-form-field>\r\n                <mat-divider></mat-divider>\r\n                <mat-card-actions>\r\n                    <button mat-raised-button color=\"primary\" [disabled]=\"running\"\r\n                            class=\"text-upper\"\r\n                            (click)=\"backup()\">Create New Backup\r\n                    </button>\r\n                    <button mat-button color=\"accent\" [disabled]=\"!available\" class=\"text-upper\"\r\n                            (click)=\"download()\">Download Backup\r\n                    </button>\r\n                </mat-card-actions>\r\n            </mat-card-content>\r\n        </mat-card>\r\n    </div>\r\n</div>"
        }),
        tslib_1.__metadata("design:paramtypes", [BackupService, RxStompService])
    ], BackupComponent);
    return BackupComponent;
}());
export {BackupComponent};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja3VwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xhbWlzLWJhY2t1cC8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2JhY2t1cC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFHcEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFlBQVksQ0FBQztBQVlwQztJQVFJLHlCQUFvQixhQUE0QixFQUFVLFlBQTRCO1FBQWxFLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQWdCO1FBTHRGLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUUzQixhQUFRLEdBQUcsS0FBSyxDQUFDO0lBR2pCLENBQUM7SUFFRCxrQ0FBUSxHQUFSO1FBQUEsaUJBY0M7UUFiRyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQyxHQUFZO1lBQzVGLEtBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQztZQUM1QyxJQUFHLEdBQUcsQ0FBQyxJQUFJLEtBQUssa0JBQWtCLEVBQUM7Z0JBQy9CLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2dCQUNyQixLQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQzthQUN6QjtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUMsR0FBWTtZQUMzRixLQUFJLENBQUMsTUFBTSxHQUFHLDhDQUE4QyxDQUFDO1lBQzdELEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQyxHQUFZLElBQUssT0FBQSxLQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsRUFBcEIsQ0FBb0IsQ0FBQyxDQUFBO0lBQzFGLENBQUM7SUFFRCxnQ0FBTSxHQUFOO1FBQUEsaUJBSUM7UUFIRyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxFQUFwQixDQUFvQixDQUFDLENBQUE7SUFDdEUsQ0FBQztJQUVELGtDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFBLEdBQUc7WUFDdkMsSUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUcsYUFBYSxFQUFFLEVBQUMsSUFBSSxFQUFFLDBCQUEwQixFQUFDLENBQUMsQ0FBQztZQUN2RixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBR0QscUNBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDekMsQ0FBQzs7Z0JBcENrQyxhQUFhO2dCQUF3QixjQUFjOztJQVI3RSxlQUFlO1FBSjNCLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLHNrQ0FBc0M7U0FDekMsQ0FBQztpREFTcUMsYUFBYSxFQUF3QixjQUFjO09BUjdFLGVBQWUsQ0E2QzNCO0lBQUQsc0JBQUM7Q0FBQSxBQTdDRCxJQTZDQztTQTdDWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBCYWNrdXBTZXJ2aWNlIH0gZnJvbSBcIi4uL3NlcnZpY2VzL2JhY2t1cC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFJ4U3RvbXBTZXJ2aWNlIH0gZnJvbSBcIkBzdG9tcC9uZzItc3RvbXBqc1wiO1xyXG5pbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSAnQHN0b21wL3N0b21wanMnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tIFwicnhqc1wiO1xyXG5pbXBvcnQgeyBzYXZlQXMgfSBmcm9tICdmaWxlLXNhdmVyJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRmFjaWxpdHkge1xyXG4gICAgaWQ6IG51bWJlcjtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIHNlbGVjdGVkOiBib29sZWFuO1xyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbGFtaXMtYmFja3VwJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9iYWNrdXAuY29tcG9uZW50Lmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCYWNrdXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgICBwcml2YXRlIHRvcGljU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcbiAgICBwcml2YXRlIGVycm9yU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcbiAgICBydW5uaW5nID0gZmFsc2U7XHJcbiAgICBhdmFpbGFibGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHN0YXR1czogYW55O1xyXG4gICAgZmluaXNoZWQgPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGJhY2t1cFNlcnZpY2U6IEJhY2t1cFNlcnZpY2UsIHByaXZhdGUgc3RvbXBTZXJ2aWNlOiBSeFN0b21wU2VydmljZSkge1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMudG9waWNTdWJzY3JpcHRpb24gPSB0aGlzLnN0b21wU2VydmljZS53YXRjaCgnL3RvcGljL2JhY2t1cC9zdGF0dXMnKS5zdWJzY3JpYmUoKG1zZzogTWVzc2FnZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXR1cyA9IG1zZy5ib2R5ICsgJ1xcbicgKyB0aGlzLnN0YXR1cztcclxuICAgICAgICAgICAgaWYobXNnLmJvZHkgPT09ICdCYWNrdXAgY29tcGxldGVkJyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXZhaWxhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZXJyb3JTdWJzY3JpcHRpb24gPSB0aGlzLnN0b21wU2VydmljZS53YXRjaCgnL3RvcGljL2JhY2t1cC9lcnJvcicpLnN1YnNjcmliZSgobXNnOiBNZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gJ0NvdWxkIG5vdCBiYWNrdXAgZGF0YWJhc2U7IGFuIGVycm9yIG9jY3VycmVkJztcclxuICAgICAgICAgICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuYmFja3VwU2VydmljZS5iYWNrdXBBdmFpbGFibGUoKS5zdWJzY3JpYmUoKHJlczogYm9vbGVhbikgPT4gdGhpcy5hdmFpbGFibGUgPSByZXMpXHJcbiAgICB9XHJcblxyXG4gICAgYmFja3VwKCkge1xyXG4gICAgICAgIHRoaXMucnVubmluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5hdmFpbGFibGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmJhY2t1cFNlcnZpY2UuYmFja3VwKCkuc3Vic2NyaWJlKHJlcyA9PiB0aGlzLnJ1bm5pbmcgPSBmYWxzZSlcclxuICAgIH1cclxuXHJcbiAgICBkb3dubG9hZCgpIHtcclxuICAgICAgICB0aGlzLmJhY2t1cFNlcnZpY2UuZG93bmxvYWQoKS5zdWJzY3JpYmUocmVzID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZmlsZSA9IG5ldyBGaWxlKFtyZXNdLCBuYW1lICsgJ2JhY2t1cC5kdW1wJywge3R5cGU6ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nfSk7XHJcbiAgICAgICAgICAgIHNhdmVBcyhmaWxlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy50b3BpY1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgIHRoaXMuZXJyb3JTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxufVxyXG4iXX0=
