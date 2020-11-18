import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { RadetConverterService } from "../../services/radet-converter.service";
import { RxStompService } from "@stomp/ng2-stompjs";
import { DomSanitizer } from "@angular/platform-browser";
import { saveAs } from 'file-saver';
var PrepConverterComponent = /** @class */ (function () {
    function PrepConverterComponent(service, stompService, domSanitizer) {
        this.service = service;
        this.stompService = stompService;
        this.domSanitizer = domSanitizer;
        this.facilities = [];
        this.running = false;
        this.finished = false;
        this.dateRange = {
            start: new Date(1900, 0, 1),
            end: new Date()
        };
        this.reportingPeriod = new Date();
        this.todaySelectable = true;
        this.today = new Date();
        this.current = false;
    }
    PrepConverterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.listFacilities().subscribe(function (res) { return _this.facilities = res; });
        this.topicSubscription = this.stompService.watch("/topic/prep/status").subscribe(function (msg) {
            if (msg.body === 'start') {
                _this.running = true;
            }
            else if (msg.body === 'end') {
                _this.running = false;
                _this.message = "Conversion finished; download files from Download tab";
                _this.finished = true;
                _this.service.listFiles().subscribe(function (res) {
                    _this.files = res;
                });
            }
            else {
                _this.message = msg.body;
                _this.running = true;
            }
        });
    };
    PrepConverterComponent.prototype.selected = function () {
        return this.facilities.filter(function (f) { return f.selected; }).length > 0;
    };
    PrepConverterComponent.prototype.download = function (name) {
        this.service.downloadPrepFile(name).subscribe(function (res) {
            var file = new File([res], name + '_PrEP.xlsx', { type: 'application/octet-stream' });
            saveAs(file);
        });
    };
    PrepConverterComponent.prototype.tabChanged = function (event) {
        var _this = this;
        if (event.index === 1) {
            this.service.listPrepFiles().subscribe(function (res) {
                _this.files = res;
            });
        }
    };
    PrepConverterComponent.prototype.monthChanged = function (month) {
        this.todaySelectable = new Date().getMonth() === month.getMonth();
    };
    PrepConverterComponent.prototype.convert = function () {
        this.running = true;
        this.finished = false;
        var ids = this.facilities.filter(function (f) { return f.selected; })
            .map(function (f) { return f.id; });
        this.service.convertPrep(this.dateRange.start, this.dateRange.end, this.reportingPeriod, ids, this.current).subscribe();
    };
    PrepConverterComponent.prototype.ngOnDestroy = function () {
        this.topicSubscription.unsubscribe();
    };
    PrepConverterComponent.ctorParameters = function () { return [
        { type: RadetConverterService },
        { type: RxStompService },
        { type: DomSanitizer }
    ]; };
    PrepConverterComponent = tslib_1.__decorate([
        Component({
            selector: 'prep-converter',
            template: "<mat-card>\n    <mat-card-content>\n        <mat-tab-group (selectedTabChange)=\"tabChanged($event)\">\n            <mat-tab label=\"Conversion\">\n                <mat-card>\n                    <mat-card-header class=\"full-width\">\n                        <ng-container *ngIf=\"running\">\n                            <div class=\"full-width\">\n                                <mat-progress-bar class=\"full-width\" mode=\"indeterminate\"></mat-progress-bar>\n                                <mat-form-field class=\"full-width\">\n                                    <input [disabled]=\"true\" matInput [value]=\"message\"/>\n                                </mat-form-field>\n                            </div>\n                        </ng-container>\n                        <ng-container *ngIf=\"finished\">\n                            <div class=\"full-width\">\n                                <mat-form-field class=\"full-width\">\n                                    <input [disabled]=\"true\" matInput [value]=\"message\"/>\n                                </mat-form-field>\n                            </div>\n                        </ng-container>\n                    </mat-card-header>\n                    <mat-card-content>\n                        <mat-list>\n                            <div mat-subheader>Available Facilities</div>\n                            <mat-list-item *ngFor=\"let facility of facilities\">\n                                <div mat-line>\n                                    <mat-checkbox\n                                            [(ngModel)]=\"facility.selected\"\n                                            labelPosition=\"after\">\n                                        {{facility.name}}\n                                    </mat-checkbox>\n                                </div>\n                            </mat-list-item>\n                        </mat-list>\n                        <mat-divider></mat-divider>\n                        <div class=\"row\">\n                            <div class=\"col-md-6\">\n                                <ejs-daterangepicker placeholder=\"Select Cohort\" [start]=\"'Year'\" [format]=\"'MMM yyyy'\"\n                                                     [max]=\"today\"\n                                                     [(value)]=\"dateRange\"\n                                                     [depth]=\"'Year'\">\n                                </ejs-daterangepicker>\n                            </div>\n                            <div class=\"col-md-6\">\n                                <ejs-datepicker placeholder=\"Select Reporting period\" [start]=\"'Year'\"\n                                                [format]=\"'MMMM y'\"\n                                                [(value)]=\"reportingPeriod\"\n                                                (valueChange)=\"monthChanged($event)\"\n                                                [depth]=\"'Year'\">\n                                </ejs-datepicker>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-md-6\">\n                                <mat-checkbox [(ngModel)]=\"current\" name=\"today\" *ngIf=\"todaySelectable\">As at today\n                                </mat-checkbox>\n                            </div>\n                        </div>\n                    </mat-card-content>\n                    <mat-card-actions>\n                        <button mat-raised-button color=\"primary\"\n                                (click)=\"convert()\"\n                                [disabled]=\"running || !selected() || !dateRange || !reportingPeriod\">Generate PrEP\n                            Report\n                        </button>\n                    </mat-card-actions>\n                </mat-card>\n            </mat-tab>\n            <mat-tab label=\"Download\">\n                <mat-list>\n                    <div mat-subheader>Available PrEP Files</div>\n                    <mat-list-item *ngFor=\"let file of files\">\n                        <div mat-line>\n                            {{file}}\n                            <button mat-list-icon\n                                    (click)=\"download(file)\">\n                                <mat-icon>file_download</mat-icon>\n                            </button>\n                        </div>\n                    </mat-list-item>\n                </mat-list>\n            </mat-tab>\n        </mat-tab-group>\n    </mat-card-content>\n</mat-card>\n"
        }),
        tslib_1.__metadata("design:paramtypes", [RadetConverterService, RxStompService, DomSanitizer])
    ], PrepConverterComponent);
    return PrepConverterComponent;
}());
export { PrepConverterComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlcC1jb252ZXJ0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vcmFkZXQtMS40LjAvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9wcmVwL3ByZXAtY29udmVydGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBb0IsTUFBTSxlQUFlLENBQUM7QUFDM0QsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sd0NBQXdDLENBQUM7QUFDN0UsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBR2xELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sWUFBWSxDQUFDO0FBYWxDO0lBZ0JJLGdDQUFvQixPQUE4QixFQUFVLFlBQTRCLEVBQVUsWUFBMEI7UUFBeEcsWUFBTyxHQUFQLE9BQU8sQ0FBdUI7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBZ0I7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQWQ1SCxlQUFVLEdBQWUsRUFBRSxDQUFDO1FBRTVCLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFFaEIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixjQUFTLEdBQWM7WUFDbkIsS0FBSyxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzNCLEdBQUcsRUFBRSxJQUFJLElBQUksRUFBRTtTQUNsQixDQUFDO1FBQ0Ysb0JBQWUsR0FBUyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ25DLG9CQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLFVBQUssR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ25CLFlBQU8sR0FBRyxLQUFLLENBQUM7SUFHaEIsQ0FBQztJQUVELHlDQUFRLEdBQVI7UUFBQSxpQkFpQkM7UUFoQkcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFj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QUcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUE7SUFDM0gsQ0FBQztJQUVELDRDQUFXLEdBQVg7UUFDSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUE7SUFDeEMsQ0FBQzs7Z0JBdkQ0QixxQkFBcUI7Z0JBQXdCLGNBQWM7Z0JBQXdCLFlBQVk7O0lBaEJuSCxzQkFBc0I7UUFKbEMsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQiw4aEpBQTRDO1NBQy9DLENBQUM7aURBaUIrQixxQkFBcUIsRUFBd0IsY0FBYyxFQUF3QixZQUFZO09BaEJuSCxzQkFBc0IsQ0F3RWxDO0lBQUQsNkJBQUM7Q0FBQSxBQXhFRCxJQXdFQztTQXhFWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25EZXN0cm95LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtSYWRldENvbnZlcnRlclNlcnZpY2V9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9yYWRldC1jb252ZXJ0ZXIuc2VydmljZVwiO1xuaW1wb3J0IHtSeFN0b21wU2VydmljZX0gZnJvbSBcIkBzdG9tcC9uZzItc3RvbXBqc1wiO1xuaW1wb3J0IHtNZXNzYWdlfSBmcm9tICdAc3RvbXAvc3RvbXBqcyc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7RG9tU2FuaXRpemVyfSBmcm9tIFwiQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3NlclwiO1xuaW1wb3J0IHtzYXZlQXN9IGZyb20gJ2ZpbGUtc2F2ZXInO1xuaW1wb3J0IHtEYXRlUmFuZ2V9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1jYWxlbmRhcnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEZhY2lsaXR5IHtcbiAgICBpZDogbnVtYmVyO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBzZWxlY3RlZDogYm9vbGVhbjtcbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwcmVwLWNvbnZlcnRlcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3ByZXAtY29udmVydC5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgUHJlcENvbnZlcnRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBwcml2YXRlIHRvcGljU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gICAgZmFjaWxpdGllczogRmFjaWxpdHlbXSA9IFtdO1xuICAgIGZpbGVzOiBzdHJpbmdbXTtcbiAgICBydW5uaW5nID0gZmFsc2U7XG4gICAgbWVzc2FnZTogYW55O1xuICAgIGZpbmlzaGVkID0gZmFsc2U7XG4gICAgZGF0ZVJhbmdlOiBEYXRlUmFuZ2UgPSB7XG4gICAgICAgIHN0YXJ0OiBuZXcgRGF0ZSgxOTAwLCAwLCAxKSxcbiAgICAgICAgZW5kOiBuZXcgRGF0ZSgpXG4gICAgfTtcbiAgICByZXBvcnRpbmdQZXJpb2Q6IERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIHRvZGF5U2VsZWN0YWJsZSA9IHRydWU7XG4gICAgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgIGN1cnJlbnQgPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc2VydmljZTogUmFkZXRDb252ZXJ0ZXJTZXJ2aWNlLCBwcml2YXRlIHN0b21wU2VydmljZTogUnhTdG9tcFNlcnZpY2UsIHByaXZhdGUgZG9tU2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5zZXJ2aWNlLmxpc3RGYWNpbGl0aWVzKCkuc3Vic2NyaWJlKHJlcyA9PiB0aGlzLmZhY2lsaXRpZXMgPSByZXMpO1xuICAgICAgICB0aGlzLnRvcGljU3Vic2NyaXB0aW9uID0gdGhpcy5zdG9tcFNlcnZpY2Uud2F0Y2goXCIvdG9waWMvcHJlcC9zdGF0dXNcIikuc3Vic2NyaWJlKChtc2c6IE1lc3NhZ2UpID0+IHtcbiAgICAgICAgICAgIGlmIChtc2cuYm9keSA9PT0gJ3N0YXJ0Jykge1xuICAgICAgICAgICAgICAgIHRoaXMucnVubmluZyA9IHRydWVcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobXNnLmJvZHkgPT09ICdlbmQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gXCJDb252ZXJzaW9uIGZpbmlzaGVkOyBkb3dubG9hZCBmaWxlcyBmcm9tIERvd25sb2FkIHRhYlwiO1xuICAgICAgICAgICAgICAgIHRoaXMuZmluaXNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VydmljZS5saXN0RmlsZXMoKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWxlcyA9IHJlcztcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtc2cuYm9keTtcbiAgICAgICAgICAgICAgICB0aGlzLnJ1bm5pbmcgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHNlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5mYWNpbGl0aWVzLmZpbHRlcihmID0+IGYuc2VsZWN0ZWQpLmxlbmd0aCA+IDBcbiAgICB9XG5cbiAgICBkb3dubG9hZChuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5zZXJ2aWNlLmRvd25sb2FkUHJlcEZpbGUobmFtZSkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICBjb25zdCBmaWxlID0gbmV3IEZpbGUoW3Jlc10sIG5hbWUgKyAnX1ByRVAueGxzeCcsIHt0eXBlOiAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJ30pO1xuICAgICAgICAgICAgc2F2ZUFzKGZpbGUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB0YWJDaGFuZ2VkKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5pbmRleCA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLmxpc3RQcmVwRmlsZXMoKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbGVzID0gcmVzO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vbnRoQ2hhbmdlZChtb250aDogRGF0ZSkge1xuICAgICAgICB0aGlzLnRvZGF5U2VsZWN0YWJsZSA9IG5ldyBEYXRlKCkuZ2V0TW9udGgoKSA9PT0gbW9udGguZ2V0TW9udGgoKVxuICAgIH1cblxuICAgIGNvbnZlcnQoKSB7XG4gICAgICAgIHRoaXMucnVubmluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuZmluaXNoZWQgPSBmYWxzZTtcbiAgICAgICAgbGV0IGlkcyA9IHRoaXMuZmFjaWxpdGllcy5maWx0ZXIoZiA9PiBmLnNlbGVjdGVkKVxuICAgICAgICAgICAgLm1hcChmID0+IGYuaWQpO1xuICAgICAgICB0aGlzLnNlcnZpY2UuY29udmVydFByZXAodGhpcy5kYXRlUmFuZ2Uuc3RhcnQsIHRoaXMuZGF0ZVJhbmdlLmVuZCwgdGhpcy5yZXBvcnRpbmdQZXJpb2QsIGlkcywgdGhpcy5jdXJyZW50KS5zdWJzY3JpYmUoKVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRvcGljU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKClcbiAgICB9XG59XG4iXX0=