import * as tslib_1 from "tslib";
import {Component} from '@angular/core';
import {RadetConverterService} from "../services/radet-converter.service";
import {RxStompService} from "@stomp/ng2-stompjs";
import {DomSanitizer} from "@angular/platform-browser";
import {saveAs} from 'file-saver';

var RadetConverterComponent = /** @class */ (function () {
    function RadetConverterComponent(service, stompService, domSanitizer) {
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

    RadetConverterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.listFacilities().subscribe(function (res) {
            return _this.facilities = res;
        });
        this.topicSubscription = this.stompService.watch("/topic/radet/status").subscribe(function (msg) {
            if (msg.body === 'start') {
                _this.running = true;
            } else if (msg.body === 'end') {
                _this.running = false;
                _this.message = "Conversion finished; download files from Download tab";
                _this.finished = true;
                _this.service.listFiles().subscribe(function (res) {
                    _this.files = res;
                });
            } else {
                _this.message = msg.body;
                _this.running = true;
            }
        });
    };
    RadetConverterComponent.prototype.selected = function () {
        return this.facilities.filter(function (f) {
            return f.selected;
        }).length > 0;
    };
    RadetConverterComponent.prototype.download = function (name) {
        this.service.download(name).subscribe(function (res) {
            var file = new File([res], name + '_Radet.xlsx', {type: 'application/octet-stream'});
            saveAs(file);
        });
    };
    RadetConverterComponent.prototype.tabChanged = function (event) {
        var _this = this;
        if (event.index === 1) {
            this.service.listFiles().subscribe(function (res) {
                _this.files = res;
            });
        }
    };
    RadetConverterComponent.prototype.monthChanged = function (month) {
        this.todaySelectable = new Date().getMonth() === month.getMonth();
    };
    RadetConverterComponent.prototype.convert = function () {
        this.running = true;
        this.finished = false;
        var ids = this.facilities.filter(function (f) {
            return f.selected;
        })
            .map(function (f) {
                return f.id;
            });
        this.service.convert(this.dateRange.start, this.dateRange.end, this.reportingPeriod, ids, this.current).subscribe();
    };
    RadetConverterComponent.prototype.ngOnDestroy = function () {
        this.topicSubscription.unsubscribe();
    };
    RadetConverterComponent.ctorParameters = function () {
        return [
            {type: RadetConverterService},
            {type: RxStompService},
            {type: DomSanitizer}
        ];
    };
    RadetConverterComponent = tslib_1.__decorate([
        Component({
            selector: 'radet-converter',
            template: "<mat-card>\r\n    <mat-card-content>\r\n        <mat-tab-group (selectedTabChange)=\"tabChanged($event)\">\r\n            <mat-tab label=\"Conversion\">\r\n                <mat-card>\r\n                    <mat-card-header class=\"full-width\">\r\n                        <ng-container *ngIf=\"running\">\r\n                            <div class=\"full-width\">\r\n                                <mat-progress-bar class=\"full-width\" mode=\"indeterminate\"></mat-progress-bar>\r\n                                <mat-form-field class=\"full-width\">\r\n                                    <input [disabled]=\"true\" matInput [value]=\"message\"/>\r\n                                </mat-form-field>\r\n                            </div>\r\n                        </ng-container>\r\n                        <ng-container *ngIf=\"finished\">\r\n                            <div class=\"full-width\">\r\n                                <mat-form-field class=\"full-width\">\r\n                                    <input [disabled]=\"true\" matInput [value]=\"message\"/>\r\n                                </mat-form-field>\r\n                            </div>\r\n                        </ng-container>\r\n                    </mat-card-header>\r\n                    <mat-card-content>\r\n                        <mat-list>\r\n                            <div mat-subheader>Available Facilities</div>\r\n                            <mat-list-item *ngFor=\"let facility of facilities\">\r\n                                <div mat-line>\r\n                                    <mat-checkbox\r\n                                            [(ngModel)]=\"facility.selected\"\r\n                                            labelPosition=\"after\">\r\n                                        {{facility.name}}\r\n                                    </mat-checkbox>\r\n                                </div>\r\n                            </mat-list-item>\r\n                        </mat-list>\r\n                        <mat-divider></mat-divider>\r\n                        <div class=\"row\">\r\n                            <div class=\"col-md-6\">\r\n                                <ejs-daterangepicker placeholder=\"Select Cohort\" [start]=\"'Year'\" [format]=\"'MMM yyyy'\"\r\n                                                     [max]=\"today\"\r\n                                                     [(value)]=\"dateRange\"\r\n                                                     [depth]=\"'Year'\">\r\n                                </ejs-daterangepicker>\r\n                            </div>\r\n                            <div class=\"col-md-6\">\r\n                                <ejs-datepicker placeholder=\"Select Reporting period\" [start]=\"'Year'\"\r\n                                                [format]=\"'MMMM y'\"\r\n                                                [(value)]=\"reportingPeriod\"\r\n                                                (valueChange)=\"monthChanged($event)\"\r\n                                                [depth]=\"'Year'\">\r\n                                </ejs-datepicker>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                            <div class=\"col-md-6\">\r\n                                <mat-checkbox [(ngModel)]=\"current\" name=\"today\" *ngIf=\"todaySelectable\">As at today</mat-checkbox>\r\n                            </div>\r\n                        </div>\r\n                    </mat-card-content>\r\n                    <mat-card-actions>\r\n                        <button mat-raised-button color=\"primary\"\r\n                                (click)=\"convert()\"\r\n                                [disabled]=\"running || !selected() || !dateRange || !reportingPeriod\">Generate Radet\r\n                        </button>\r\n                    </mat-card-actions>\r\n                </mat-card>\r\n            </mat-tab>\r\n            <mat-tab label=\"Download\">\r\n                <mat-list>\r\n                    <div mat-subheader>Available Radet Files</div>\r\n                    <mat-list-item *ngFor=\"let file of files\">\r\n                        <div mat-line>\r\n                            {{file}}\r\n                            <button mat-list-icon\r\n                                    (click)=\"download(file)\">\r\n                                <mat-icon>file_download</mat-icon>\r\n                            </button>\r\n                        </div>\r\n                    </mat-list-item>\r\n                </mat-list>\r\n            </mat-tab>\r\n        </mat-tab-group>\r\n    </mat-card-content>\r\n</mat-card>\r\n"
        }),
        tslib_1.__metadata("design:paramtypes", [RadetConverterService, RxStompService, DomSanitizer])
    ], RadetConverterComponent);
    return RadetConverterComponent;
}());
export {RadetConverterComponent};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkZXQtY29udmVydGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3JhZGV0LTEuMS4wLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvcmFkZXQtY29udmVydGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDNUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBR3BELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBYXBDO0lBZ0JJLGlDQUFvQixPQUE4QixFQUFVLFlBQTRCLEVBQVUsWUFBMEI7UUFBeEcsWUFBTyxHQUFQLE9BQU8sQ0FBdUI7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBZ0I7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQWQ1SCxlQUFVLEdBQWUsRUFBRSxDQUFDO1FBRTVCLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFFaEIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixjQUFTLEdBQWM7WUFDbkIsS0FBSyxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzNCLEdBQUcsRUFBRSxJQUFJLElBQUksRUFBRTtTQUNsQixDQUFDO1FBQ0Ysb0JBQWUsR0FBUyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ25DLG9CQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLFVBQUssR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ25CLFlBQU8sR0FBRyxLQUFLLENBQUM7SUFHaEIsQ0FBQztJQUVELDBDQUFRLEdBQVI7UUFBQSxpQkFpQkM7UUFoQkcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVB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QUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFBO0lBQ3ZILENBQUM7SUFFRCw2Q0FBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFBO0lBQ3hDLENBQUM7O2dCQXZENEIscUJBQXFCO2dCQUF3QixjQUFjO2dCQUF3QixZQUFZOztJQWhCbkgsdUJBQXVCO1FBSm5DLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxpQkFBaUI7WUFDM0Isa29KQUE2QztTQUNoRCxDQUFDO2lEQWlCK0IscUJBQXFCLEVBQXdCLGNBQWMsRUFBd0IsWUFBWTtPQWhCbkgsdUJBQXVCLENBd0VuQztJQUFELDhCQUFDO0NBQUEsQUF4RUQsSUF3RUM7U0F4RVksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSYWRldENvbnZlcnRlclNlcnZpY2UgfSBmcm9tIFwiLi4vc2VydmljZXMvcmFkZXQtY29udmVydGVyLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgUnhTdG9tcFNlcnZpY2UgfSBmcm9tIFwiQHN0b21wL25nMi1zdG9tcGpzXCI7XHJcbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tICdAc3RvbXAvc3RvbXBqcyc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gXCJyeGpzXCI7XHJcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gXCJAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyXCI7XHJcbmltcG9ydCB7IHNhdmVBcyB9IGZyb20gJ2ZpbGUtc2F2ZXInO1xyXG5pbXBvcnQgeyBEYXRlUmFuZ2UgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItY2FsZW5kYXJzJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRmFjaWxpdHkge1xyXG4gICAgaWQ6IG51bWJlcjtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIHNlbGVjdGVkOiBib29sZWFuO1xyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAncmFkZXQtY29udmVydGVyJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9yYWRldC1jb252ZXJ0LmNvbXBvbmVudC5odG1sJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgUmFkZXRDb252ZXJ0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgICBwcml2YXRlIHRvcGljU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcbiAgICBmYWNpbGl0aWVzOiBGYWNpbGl0eVtdID0gW107XHJcbiAgICBmaWxlczogc3RyaW5nW107XHJcbiAgICBydW5uaW5nID0gZmFsc2U7XHJcbiAgICBtZXNzYWdlOiBhbnk7XHJcbiAgICBmaW5pc2hlZCA9IGZhbHNlO1xyXG4gICAgZGF0ZVJhbmdlOiBEYXRlUmFuZ2UgPSB7XHJcbiAgICAgICAgc3RhcnQ6IG5ldyBEYXRlKDE5MDAsIDAsIDEpLFxyXG4gICAgICAgIGVuZDogbmV3IERhdGUoKVxyXG4gICAgfTtcclxuICAgIHJlcG9ydGluZ1BlcmlvZDogRGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICB0b2RheVNlbGVjdGFibGUgPSB0cnVlO1xyXG4gICAgdG9kYXkgPSBuZXcgRGF0ZSgpO1xyXG4gICAgY3VycmVudCA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc2VydmljZTogUmFkZXRDb252ZXJ0ZXJTZXJ2aWNlLCBwcml2YXRlIHN0b21wU2VydmljZTogUnhTdG9tcFNlcnZpY2UsIHByaXZhdGUgZG9tU2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLnNlcnZpY2UubGlzdEZhY2lsaXRpZXMoKS5zdWJzY3JpYmUocmVzID0+IHRoaXMuZmFjaWxpdGllcyA9IHJlcyk7XHJcbiAgICAgICAgdGhpcy50b3BpY1N1YnNjcmlwdGlvbiA9IHRoaXMuc3RvbXBTZXJ2aWNlLndhdGNoKFwiL3RvcGljL3JhZGV0L3N0YXR1c1wiKS5zdWJzY3JpYmUoKG1zZzogTWVzc2FnZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAobXNnLmJvZHkgPT09ICdzdGFydCcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucnVubmluZyA9IHRydWVcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChtc2cuYm9keSA9PT0gJ2VuZCcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gXCJDb252ZXJzaW9uIGZpbmlzaGVkOyBkb3dubG9hZCBmaWxlcyBmcm9tIERvd25sb2FkIHRhYlwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maW5pc2hlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlcnZpY2UubGlzdEZpbGVzKCkuc3Vic2NyaWJlKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWxlcyA9IHJlcztcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtc2cuYm9keTtcclxuICAgICAgICAgICAgICAgIHRoaXMucnVubmluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZhY2lsaXRpZXMuZmlsdGVyKGYgPT4gZi5zZWxlY3RlZCkubGVuZ3RoID4gMFxyXG4gICAgfVxyXG5cclxuICAgIGRvd25sb2FkKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuc2VydmljZS5kb3dubG9hZChuYW1lKS5zdWJzY3JpYmUocmVzID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZmlsZSA9IG5ldyBGaWxlKFtyZXNdLCBuYW1lICsgJ19SYWRldC54bHN4Jywge3R5cGU6ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nfSk7XHJcbiAgICAgICAgICAgIHNhdmVBcyhmaWxlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB0YWJDaGFuZ2VkKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50LmluZGV4ID09PSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VydmljZS5saXN0RmlsZXMoKS5zdWJzY3JpYmUocmVzID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlsZXMgPSByZXM7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1vbnRoQ2hhbmdlZChtb250aDogRGF0ZSkge1xyXG4gICAgICAgIHRoaXMudG9kYXlTZWxlY3RhYmxlID0gbmV3IERhdGUoKS5nZXRNb250aCgpID09PSBtb250aC5nZXRNb250aCgpXHJcbiAgICB9XHJcblxyXG4gICAgY29udmVydCgpIHtcclxuICAgICAgICB0aGlzLnJ1bm5pbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZmluaXNoZWQgPSBmYWxzZTtcclxuICAgICAgICBsZXQgaWRzID0gdGhpcy5mYWNpbGl0aWVzLmZpbHRlcihmID0+IGYuc2VsZWN0ZWQpXHJcbiAgICAgICAgICAgIC5tYXAoZiA9PiBmLmlkKTtcclxuICAgICAgICB0aGlzLnNlcnZpY2UuY29udmVydCh0aGlzLmRhdGVSYW5nZS5zdGFydCwgdGhpcy5kYXRlUmFuZ2UuZW5kLCB0aGlzLnJlcG9ydGluZ1BlcmlvZCwgaWRzLCB0aGlzLmN1cnJlbnQpLnN1YnNjcmliZSgpXHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy50b3BpY1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpXHJcbiAgICB9XHJcbn1cclxuIl19
