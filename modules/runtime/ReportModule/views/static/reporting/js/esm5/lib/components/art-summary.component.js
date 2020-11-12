import * as tslib_1 from "tslib";
import {Component} from '@angular/core';
import {ReportService} from '../services/report.service';
import {RxStompService} from '@stomp/ng2-stompjs';
import {DomSanitizer} from '@angular/platform-browser';
import {saveAs} from 'file-saver';

var ArtSummaryComponent = /** @class */ (function () {
    function ArtSummaryComponent(service, stompService, domSanitizer) {
        this.service = service;
        this.stompService = stompService;
        this.domSanitizer = domSanitizer;
        this.running = false;
        this.message = 'Running';
        this.finished = false;
        this.reportingPeriod = new Date();
        this.today = new Date();
        this.todaySelectable = true;
        this.current = false;
    }

    ArtSummaryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.getActiveFacility().subscribe(function (res) {
            return _this.facility = res;
        });
        this.topicSubscription = this.stompService.watch('/topic/art-summary/status').subscribe(function (msg) {
            if (msg.body === 'start') {
                _this.running = true;
            } else if (msg.body === 'end') {
                _this.running = false;
                _this.finished = true;
                _this.message = 'Finished';
                _this.service.listFiles().subscribe(function (res) {
                    _this.files = res;
                });
            } else {
                _this.message = msg.body;
                _this.running = true;
            }
        });
    };
    ArtSummaryComponent.prototype.download = function (name) {
        this.service.download(name).subscribe(function (res) {
            var file = new File([res], name + 'ART Summary Report.pdf', {type: 'application/octet-stream'});
            saveAs(file);
        });
    };
    ArtSummaryComponent.prototype.tabChanged = function (event) {
        var _this = this;
        if (event.index === 1) {
            this.service.listFiles().subscribe(function (res) {
                _this.files = res;
            });
        }
    };
    ArtSummaryComponent.prototype.monthChanged = function (month) {
        this.todaySelectable = new Date().getMonth() === month.getMonth();
    };
    ArtSummaryComponent.prototype.convert = function () {
        var _this = this;
        this.running = true;
        this.finished = false;
        this.service.artSummary(this.reportingPeriod, this.facility.id, this.current).subscribe(function (res) {
            var file = new File([res], _this.facility.name + '_ART Summary Report.pdf', {type: 'application/octet-stream'});
            saveAs(file);
        });
    };
    ArtSummaryComponent.prototype.ngOnDestroy = function () {
        this.topicSubscription.unsubscribe();
    };
    ArtSummaryComponent.ctorParameters = function () {
        return [
            {type: ReportService},
            {type: RxStompService},
            {type: DomSanitizer}
        ];
    };
    ArtSummaryComponent = tslib_1.__decorate([
        Component({
            selector: 'art-summary',
            template: "<mat-card>\r\n    <mat-card-header class=\"full-width\">\r\n        <ng-container *ngIf=\"running\">\r\n            <div class=\"full-width\">\r\n                <mat-progress-bar class=\"full-width\" mode=\"indeterminate\"></mat-progress-bar>\r\n                <mat-form-field class=\"full-width\">\r\n                    <input [disabled]=\"true\" matInput [value]=\"message\"/>\r\n                </mat-form-field>\r\n            </div>\r\n        </ng-container>\r\n        <ng-container *ngIf=\"finished\">\r\n            <div class=\"full-width\">\r\n                <mat-form-field class=\"full-width\">\r\n                    <input [disabled]=\"true\" matInput [value]=\"message\"/>\r\n                </mat-form-field>\r\n            </div>\r\n        </ng-container>\r\n    </mat-card-header>\r\n    <mat-card-content>\r\n        <div class=\"row\">\r\n            <div class=\"col-md-12\">\r\n                Facility:&nbsp;&nbsp;{{facility?.name}}\r\n            </div>\r\n        </div>\r\n        <div class=\"row\">\r\n            <div class=\"col-md-6\">\r\n                <ejs-datepicker placeholder=\"Select Reporting period\" [start]=\"'Year'\"\r\n                                [format]=\"'MMMM y'\"\r\n                                (valueChangeh)=\"monthChanged($event)\"\r\n                                [(value)]=\"reportingPeriod\"\r\n                                [depth]=\"'Year'\">\r\n                </ejs-datepicker>\r\n            </div>\r\n            <div class=\"col-md-6\">\r\n                <mat-checkbox [(ngModel)]=\"current\" name=\"today\" *ngIf=\"todaySelectable\">As at today</mat-checkbox>\r\n            </div>\r\n        </div>\r\n        <mat-card-actions>\r\n            <button mat-raised-button color=\"primary\"\r\n                    (click)=\"convert()\"\r\n                    [disabled]=\"running || !reportingPeriod || !facility\">Generate Report\r\n            </button>\r\n        </mat-card-actions>\r\n    </mat-card-content>\r\n</mat-card>\r\n\r\n"
        }),
        tslib_1.__metadata("design:paramtypes", [ReportService, RxStompService, DomSanitizer])
    ], ArtSummaryComponent);
    return ArtSummaryComponent;
}());
export {ArtSummaryComponent};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJ0LXN1bW1hcnkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGFtaXMtcmVwb3J0aW5nLTEuMC4wLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvYXJ0LXN1bW1hcnkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBR3BELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBWXBDO0lBYUksNkJBQW9CLE9BQXNCLEVBQVUsWUFBNEIsRUFBVSxZQUEwQjtRQUFoRyxZQUFPLEdBQVAsT0FBTyxDQUFlO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQWdCO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQWM7UUFUcEgsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixZQUFPLEdBQVEsU0FBUyxDQUFDO1FBQ3pCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsb0JBQWUsR0FBUyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ25DLFVBQUssR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ25CLG9CQUFlLEdBQUcsSUFBSSxDQUFDO1FBRXZCLFlBQU8sR0FBWSxLQUFLLENBQUM7SUFHekIsQ0FBQztJQUVELHNDQUFRLEdBQVI7UUFBQSxpQkFpQkM7UUFoQkcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEtBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxFQUFuQixDQUFtQixDQUFDLENBQUM7UUFDdkUsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUks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T0FiM0csbUJBQW1CLENBa0UvQjtJQUFELDBCQUFDO0NBQUEsQUFsRUQsSUFrRUM7U0FsRVksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSZXBvcnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvcmVwb3J0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBSeFN0b21wU2VydmljZSB9IGZyb20gJ0BzdG9tcC9uZzItc3RvbXBqcyc7XHJcbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tICdAc3RvbXAvc3RvbXBqcyc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuaW1wb3J0IHsgc2F2ZUFzIH0gZnJvbSAnZmlsZS1zYXZlcic7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEZhY2lsaXR5IHtcclxuICAgIGlkOiBudW1iZXI7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBzZWxlY3RlZDogYm9vbGVhbjtcclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2FydC1zdW1tYXJ5JyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9hcnQtc3VtbWFyeS5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEFydFN1bW1hcnlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgICBwcml2YXRlIHRvcGljU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcbiAgICBmYWNpbGl0eTogRmFjaWxpdHk7XHJcbiAgICBmaWxlczogc3RyaW5nW107XHJcbiAgICBydW5uaW5nID0gZmFsc2U7XHJcbiAgICBtZXNzYWdlOiBhbnkgPSAnUnVubmluZyc7XHJcbiAgICBmaW5pc2hlZCA9IGZhbHNlO1xyXG4gICAgcmVwb3J0aW5nUGVyaW9kOiBEYXRlID0gbmV3IERhdGUoKTtcclxuICAgIHRvZGF5ID0gbmV3IERhdGUoKTtcclxuICAgIHRvZGF5U2VsZWN0YWJsZSA9IHRydWU7XHJcblxyXG4gICAgY3VycmVudDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc2VydmljZTogUmVwb3J0U2VydmljZSwgcHJpdmF0ZSBzdG9tcFNlcnZpY2U6IFJ4U3RvbXBTZXJ2aWNlLCBwcml2YXRlIGRvbVNhbml0aXplcjogRG9tU2FuaXRpemVyKSB7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5zZXJ2aWNlLmdldEFjdGl2ZUZhY2lsaXR5KCkuc3Vic2NyaWJlKHJlcyA9PiB0aGlzLmZhY2lsaXR5ID0gcmVzKTtcclxuICAgICAgICB0aGlzLnRvcGljU3Vic2NyaXB0aW9uID0gdGhpcy5zdG9tcFNlcnZpY2Uud2F0Y2goJy90b3BpYy9hcnQtc3VtbWFyeS9zdGF0dXMnKS5zdWJzY3JpYmUoKG1zZzogTWVzc2FnZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAobXNnLmJvZHkgPT09ICdzdGFydCcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucnVubmluZyA9IHRydWVcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChtc2cuYm9keSA9PT0gJ2VuZCcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maW5pc2hlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2UgPSAnRmluaXNoZWQnO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLmxpc3RGaWxlcygpLnN1YnNjcmliZShyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsZXMgPSByZXM7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gbXNnLmJvZHk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJ1bm5pbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBkb3dubG9hZChuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnNlcnZpY2UuZG93bmxvYWQobmFtZSkuc3Vic2NyaWJlKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBuZXcgRmlsZShbcmVzXSwgbmFtZSArICdBUlQgU3VtbWFyeSBSZXBvcnQucGRmJywge3R5cGU6ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nfSk7XHJcbiAgICAgICAgICAgIHNhdmVBcyhmaWxlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB0YWJDaGFuZ2VkKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50LmluZGV4ID09PSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VydmljZS5saXN0RmlsZXMoKS5zdWJzY3JpYmUocmVzID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlsZXMgPSByZXM7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1vbnRoQ2hhbmdlZChtb250aDogRGF0ZSkge1xyXG4gICAgICAgIHRoaXMudG9kYXlTZWxlY3RhYmxlID0gbmV3IERhdGUoKS5nZXRNb250aCgpID09PSBtb250aC5nZXRNb250aCgpXHJcbiAgICB9XHJcblxyXG4gICAgY29udmVydCgpIHtcclxuICAgICAgICB0aGlzLnJ1bm5pbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZmluaXNoZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNlcnZpY2UuYXJ0U3VtbWFyeSh0aGlzLnJlcG9ydGluZ1BlcmlvZCwgdGhpcy5mYWNpbGl0eS5pZCwgdGhpcy5jdXJyZW50KS5zdWJzY3JpYmUoKHJlcyk9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBuZXcgRmlsZShbcmVzXSwgdGhpcy5mYWNpbGl0eS5uYW1lICsgJ19BUlQgU3VtbWFyeSBSZXBvcnQucGRmJywge3R5cGU6ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nfSk7XHJcbiAgICAgICAgICAgIHNhdmVBcyhmaWxlKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudG9waWNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKVxyXG4gICAgfVxyXG59XHJcbiJdfQ==
