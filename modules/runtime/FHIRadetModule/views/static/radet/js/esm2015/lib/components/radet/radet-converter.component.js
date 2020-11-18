import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { RadetConverterService } from "../../services/radet-converter.service";
import { RxStompService } from "@stomp/ng2-stompjs";
import { DomSanitizer } from "@angular/platform-browser";
import { saveAs } from 'file-saver';
let RadetConverterComponent = class RadetConverterComponent {
    constructor(service, stompService, domSanitizer) {
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
    ngOnInit() {
        this.service.listFacilities().subscribe(res => this.facilities = res);
        this.topicSubscription = this.stompService.watch("/topic/radet/status").subscribe((msg) => {
            if (msg.body === 'start') {
                this.running = true;
            }
            else if (msg.body === 'end') {
                this.running = false;
                this.message = "Conversion finished; download files from Download tab";
                this.finished = true;
                this.service.listFiles().subscribe(res => {
                    this.files = res;
                });
            }
            else {
                this.message = msg.body;
                this.running = true;
            }
        });
    }
    selected() {
        return this.facilities.filter(f => f.selected).length > 0;
    }
    download(name) {
        this.service.download(name).subscribe(res => {
            const file = new File([res], name + '_Radet.xlsx', { type: 'application/octet-stream' });
            saveAs(file);
        });
    }
    tabChanged(event) {
        if (event.index === 1) {
            this.service.listFiles().subscribe(res => {
                this.files = res;
            });
        }
    }
    monthChanged(month) {
        this.todaySelectable = new Date().getMonth() === month.getMonth();
    }
    convert() {
        this.running = true;
        this.finished = false;
        let ids = this.facilities.filter(f => f.selected)
            .map(f => f.id);
        this.service.convert(this.dateRange.start, this.dateRange.end, this.reportingPeriod, ids, this.current).subscribe();
    }
    ngOnDestroy() {
        this.topicSubscription.unsubscribe();
    }
};
RadetConverterComponent.ctorParameters = () => [
    { type: RadetConverterService },
    { type: RxStompService },
    { type: DomSanitizer }
];
RadetConverterComponent = tslib_1.__decorate([
    Component({
        selector: 'radet-converter',
        template: "<mat-card>\n    <mat-card-content>\n        <mat-tab-group (selectedTabChange)=\"tabChanged($event)\">\n            <mat-tab label=\"Conversion\">\n                <mat-card>\n                    <mat-card-header class=\"full-width\">\n                        <ng-container *ngIf=\"running\">\n                            <div class=\"full-width\">\n                                <mat-progress-bar class=\"full-width\" mode=\"indeterminate\"></mat-progress-bar>\n                                <mat-form-field class=\"full-width\">\n                                    <input [disabled]=\"true\" matInput [value]=\"message\"/>\n                                </mat-form-field>\n                            </div>\n                        </ng-container>\n                        <ng-container *ngIf=\"finished\">\n                            <div class=\"full-width\">\n                                <mat-form-field class=\"full-width\">\n                                    <input [disabled]=\"true\" matInput [value]=\"message\"/>\n                                </mat-form-field>\n                            </div>\n                        </ng-container>\n                    </mat-card-header>\n                    <mat-card-content>\n                        <mat-list>\n                            <div mat-subheader>Available Facilities</div>\n                            <mat-list-item *ngFor=\"let facility of facilities\">\n                                <div mat-line>\n                                    <mat-checkbox\n                                            [(ngModel)]=\"facility.selected\"\n                                            labelPosition=\"after\">\n                                        {{facility.name}}\n                                    </mat-checkbox>\n                                </div>\n                            </mat-list-item>\n                        </mat-list>\n                        <mat-divider></mat-divider>\n                        <div class=\"row\">\n                            <div class=\"col-md-6\">\n                                <ejs-daterangepicker placeholder=\"Select Cohort\" [start]=\"'Year'\" [format]=\"'MMM yyyy'\"\n                                                     [max]=\"today\"\n                                                     [(value)]=\"dateRange\"\n                                                     [depth]=\"'Year'\">\n                                </ejs-daterangepicker>\n                            </div>\n                            <div class=\"col-md-6\">\n                                <ejs-datepicker placeholder=\"Select Reporting period\" [start]=\"'Year'\"\n                                                [format]=\"'MMMM y'\"\n                                                [(value)]=\"reportingPeriod\"\n                                                (valueChange)=\"monthChanged($event)\"\n                                                [depth]=\"'Year'\">\n                                </ejs-datepicker>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-md-6\">\n                                <mat-checkbox [(ngModel)]=\"current\" name=\"today\" *ngIf=\"todaySelectable\">As at today\n                                </mat-checkbox>\n                            </div>\n                        </div>\n                    </mat-card-content>\n                    <mat-card-actions>\n                        <button mat-raised-button color=\"primary\"\n                                (click)=\"convert()\"\n                                [disabled]=\"running || !selected() || !dateRange || !reportingPeriod\">Generate Radet\n                        </button>\n                    </mat-card-actions>\n                </mat-card>\n            </mat-tab>\n            <mat-tab label=\"Download\">\n                <mat-list>\n                    <div mat-subheader>Available Radet Files</div>\n                    <mat-list-item *ngFor=\"let file of files\">\n                        <div mat-line>\n                            {{file}}\n                            <button mat-list-icon\n                                    (click)=\"download(file)\">\n                                <mat-icon>file_download</mat-icon>\n                            </button>\n                        </div>\n                    </mat-list-item>\n                </mat-list>\n            </mat-tab>\n        </mat-tab-group>\n    </mat-card-content>\n</mat-card>\n"
    }),
    tslib_1.__metadata("design:paramtypes", [RadetConverterService, RxStompService, DomSanitizer])
], RadetConverterComponent);
export { RadetConverterComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkZXQtY29udmVydGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3JhZGV0LTEuNC4wLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvcmFkZXQvcmFkZXQtY29udmVydGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBb0IsTUFBTSxlQUFlLENBQUM7QUFDM0QsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sd0NBQXdDLENBQUM7QUFDN0UsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBR2xELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sWUFBWSxDQUFDO0FBYWxDLElBQWEsdUJBQXVCLEdBQXBDLE1BQWEsdUJBQXVCO0lBZ0JoQyxZQUFvQixPQUE4QixFQUFVLFlBQTRCLEVBQVUsWUFBMEI7UUFBeEcsWUFBTyxHQUFQLE9BQU8sQ0FBdUI7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBZ0I7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQWQ1SCxlQUFVLEdBQWUsRUFBRSxDQUFDO1FBRTVCLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFFaEIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixjQUFTLEdBQWM7WUFDbkIsS0FBSyxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzNCLEdBQUcsRUFBRSxJQUFJLElBQUksRUFBRTtTQUNsQixDQUFDO1FBQ0Ysb0JBQWUsR0FBUyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ25DLG9CQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLFVBQUssR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ25CLFlBQU8sR0FBRyxLQUFLLENBQUM7SUFHaEIsQ0FBQztJQUVELFFBQVE7UUFDSixJQUFJLENBQUMs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O0lBQ3ZILENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFBO0lBQ3hDLENBQUM7Q0FDSixDQUFBOztZQXhEZ0MscUJBQXFCO1lBQXdCLGNBQWM7WUFBd0IsWUFBWTs7QUFoQm5ILHVCQUF1QjtJQUpuQyxTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsaUJBQWlCO1FBQzNCLDQvSUFBNkM7S0FDaEQsQ0FBQzs2Q0FpQitCLHFCQUFxQixFQUF3QixjQUFjLEVBQXdCLFlBQVk7R0FoQm5ILHVCQUF1QixDQXdFbkM7U0F4RVksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uRGVzdHJveSwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7UmFkZXRDb252ZXJ0ZXJTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvcmFkZXQtY29udmVydGVyLnNlcnZpY2VcIjtcbmltcG9ydCB7UnhTdG9tcFNlcnZpY2V9IGZyb20gXCJAc3RvbXAvbmcyLXN0b21wanNcIjtcbmltcG9ydCB7TWVzc2FnZX0gZnJvbSAnQHN0b21wL3N0b21wanMnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge0RvbVNhbml0aXplcn0gZnJvbSBcIkBhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXJcIjtcbmltcG9ydCB7c2F2ZUFzfSBmcm9tICdmaWxlLXNhdmVyJztcbmltcG9ydCB7RGF0ZVJhbmdlfSBmcm9tICdAc3luY2Z1c2lvbi9lajItY2FsZW5kYXJzJztcblxuZXhwb3J0IGludGVyZmFjZSBGYWNpbGl0eSB7XG4gICAgaWQ6IG51bWJlcjtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgc2VsZWN0ZWQ6IGJvb2xlYW47XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncmFkZXQtY29udmVydGVyJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vcmFkZXQtY29udmVydC5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgUmFkZXRDb252ZXJ0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgcHJpdmF0ZSB0b3BpY1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICAgIGZhY2lsaXRpZXM6IEZhY2lsaXR5W10gPSBbXTtcbiAgICBmaWxlczogc3RyaW5nW107XG4gICAgcnVubmluZyA9IGZhbHNlO1xuICAgIG1lc3NhZ2U6IGFueTtcbiAgICBmaW5pc2hlZCA9IGZhbHNlO1xuICAgIGRhdGVSYW5nZTogRGF0ZVJhbmdlID0ge1xuICAgICAgICBzdGFydDogbmV3IERhdGUoMTkwMCwgMCwgMSksXG4gICAgICAgIGVuZDogbmV3IERhdGUoKVxuICAgIH07XG4gICAgcmVwb3J0aW5nUGVyaW9kOiBEYXRlID0gbmV3IERhdGUoKTtcbiAgICB0b2RheVNlbGVjdGFibGUgPSB0cnVlO1xuICAgIHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICBjdXJyZW50ID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNlcnZpY2U6IFJhZGV0Q29udmVydGVyU2VydmljZSwgcHJpdmF0ZSBzdG9tcFNlcnZpY2U6IFJ4U3RvbXBTZXJ2aWNlLCBwcml2YXRlIGRvbVNhbml0aXplcjogRG9tU2FuaXRpemVyKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuc2VydmljZS5saXN0RmFjaWxpdGllcygpLnN1YnNjcmliZShyZXMgPT4gdGhpcy5mYWNpbGl0aWVzID0gcmVzKTtcbiAgICAgICAgdGhpcy50b3BpY1N1YnNjcmlwdGlvbiA9IHRoaXMuc3RvbXBTZXJ2aWNlLndhdGNoKFwiL3RvcGljL3JhZGV0L3N0YXR1c1wiKS5zdWJzY3JpYmUoKG1zZzogTWVzc2FnZSkgPT4ge1xuICAgICAgICAgICAgaWYgKG1zZy5ib2R5ID09PSAnc3RhcnQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ydW5uaW5nID0gdHJ1ZVxuICAgICAgICAgICAgfSBlbHNlIGlmIChtc2cuYm9keSA9PT0gJ2VuZCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2UgPSBcIkNvbnZlcnNpb24gZmluaXNoZWQ7IGRvd25sb2FkIGZpbGVzIGZyb20gRG93bmxvYWQgdGFiXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5maW5pc2hlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLmxpc3RGaWxlcygpLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbGVzID0gcmVzO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9IG1zZy5ib2R5O1xuICAgICAgICAgICAgICAgIHRoaXMucnVubmluZyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgc2VsZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmZhY2lsaXRpZXMuZmlsdGVyKGYgPT4gZi5zZWxlY3RlZCkubGVuZ3RoID4gMFxuICAgIH1cblxuICAgIGRvd25sb2FkKG5hbWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLnNlcnZpY2UuZG93bmxvYWQobmFtZSkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICBjb25zdCBmaWxlID0gbmV3IEZpbGUoW3Jlc10sIG5hbWUgKyAnX1JhZGV0Lnhsc3gnLCB7dHlwZTogJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbSd9KTtcbiAgICAgICAgICAgIHNhdmVBcyhmaWxlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGFiQ2hhbmdlZChldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuaW5kZXggPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMuc2VydmljZS5saXN0RmlsZXMoKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbGVzID0gcmVzO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vbnRoQ2hhbmdlZChtb250aDogRGF0ZSkge1xuICAgICAgICB0aGlzLnRvZGF5U2VsZWN0YWJsZSA9IG5ldyBEYXRlKCkuZ2V0TW9udGgoKSA9PT0gbW9udGguZ2V0TW9udGgoKVxuICAgIH1cblxuICAgIGNvbnZlcnQoKSB7XG4gICAgICAgIHRoaXMucnVubmluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuZmluaXNoZWQgPSBmYWxzZTtcbiAgICAgICAgbGV0IGlkcyA9IHRoaXMuZmFjaWxpdGllcy5maWx0ZXIoZiA9PiBmLnNlbGVjdGVkKVxuICAgICAgICAgICAgLm1hcChmID0+IGYuaWQpO1xuICAgICAgICB0aGlzLnNlcnZpY2UuY29udmVydCh0aGlzLmRhdGVSYW5nZS5zdGFydCwgdGhpcy5kYXRlUmFuZ2UuZW5kLCB0aGlzLnJlcG9ydGluZ1BlcmlvZCwgaWRzLCB0aGlzLmN1cnJlbnQpLnN1YnNjcmliZSgpXG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMudG9waWNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKVxuICAgIH1cbn1cbiJdfQ==