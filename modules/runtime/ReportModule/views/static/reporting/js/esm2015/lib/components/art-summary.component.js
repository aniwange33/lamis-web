import * as tslib_1 from "tslib";
import {Component} from '@angular/core';
import {ReportService} from '../services/report.service';
import {RxStompService} from '@stomp/ng2-stompjs';
import {DomSanitizer} from '@angular/platform-browser';
import {saveAs} from 'file-saver';

let ArtSummaryComponent = class ArtSummaryComponent {
    constructor(service, stompService, domSanitizer) {
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

    ngOnInit() {
        this.service.getActiveFacility().subscribe(res => this.facility = res);
        this.topicSubscription = this.stompService.watch('/topic/art-summary/status').subscribe((msg) => {
            if (msg.body === 'start') {
                this.running = true;
            } else if (msg.body === 'end') {
                this.running = false;
                this.finished = true;
                this.message = 'Finished';
                this.service.listFiles().subscribe(res => {
                    this.files = res;
                });
            } else {
                this.message = msg.body;
                this.running = true;
            }
        });
    }

    download(name) {
        this.service.download(name).subscribe(res => {
            const file = new File([res], name + 'ART Summary Report.pdf', {type: 'application/octet-stream'});
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
        this.service.artSummary(this.reportingPeriod, this.facility.id, this.current).subscribe((res) => {
            const file = new File([res], this.facility.name + '_ART Summary Report.pdf', {type: 'application/octet-stream'});
            saveAs(file);
        });
    }

    ngOnDestroy() {
        this.topicSubscription.unsubscribe();
    }
};
ArtSummaryComponent.ctorParameters = () => [
    {type: ReportService},
    {type: RxStompService},
    {type: DomSanitizer}
];
ArtSummaryComponent = tslib_1.__decorate([
    Component({
        selector: 'art-summary',
        template: "<mat-card>\r\n    <mat-card-header class=\"full-width\">\r\n        <ng-container *ngIf=\"running\">\r\n            <div class=\"full-width\">\r\n                <mat-progress-bar class=\"full-width\" mode=\"indeterminate\"></mat-progress-bar>\r\n                <mat-form-field class=\"full-width\">\r\n                    <input [disabled]=\"true\" matInput [value]=\"message\"/>\r\n                </mat-form-field>\r\n            </div>\r\n        </ng-container>\r\n        <ng-container *ngIf=\"finished\">\r\n            <div class=\"full-width\">\r\n                <mat-form-field class=\"full-width\">\r\n                    <input [disabled]=\"true\" matInput [value]=\"message\"/>\r\n                </mat-form-field>\r\n            </div>\r\n        </ng-container>\r\n    </mat-card-header>\r\n    <mat-card-content>\r\n        <div class=\"row\">\r\n            <div class=\"col-md-12\">\r\n                Facility:&nbsp;&nbsp;{{facility?.name}}\r\n            </div>\r\n        </div>\r\n        <div class=\"row\">\r\n            <div class=\"col-md-6\">\r\n                <ejs-datepicker placeholder=\"Select Reporting period\" [start]=\"'Year'\"\r\n                                [format]=\"'MMMM y'\"\r\n                                (valueChangeh)=\"monthChanged($event)\"\r\n                                [(value)]=\"reportingPeriod\"\r\n                                [depth]=\"'Year'\">\r\n                </ejs-datepicker>\r\n            </div>\r\n            <div class=\"col-md-6\">\r\n                <mat-checkbox [(ngModel)]=\"current\" name=\"today\" *ngIf=\"todaySelectable\">As at today</mat-checkbox>\r\n            </div>\r\n        </div>\r\n        <mat-card-actions>\r\n            <button mat-raised-button color=\"primary\"\r\n                    (click)=\"convert()\"\r\n                    [disabled]=\"running || !reportingPeriod || !facility\">Generate Report\r\n            </button>\r\n        </mat-card-actions>\r\n    </mat-card-content>\r\n</mat-card>\r\n\r\n"
    }),
    tslib_1.__metadata("design:paramtypes", [ReportService, RxStompService, DomSanitizer])
], ArtSummaryComponent);
export {ArtSummaryComponent};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJ0LXN1bW1hcnkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGFtaXMtcmVwb3J0aW5nLTEuMC4wLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvYXJ0LXN1bW1hcnkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBR3BELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBWXBDLElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW1CO0lBYTVCLFlBQW9CLE9BQXNCLEVBQVUsWUFBNEIsRUFBVSxZQUEwQjtRQUFoRyxZQUFPLEdBQVAsT0FBTyxDQUFlO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQWdCO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQWM7UUFUcEgsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixZQUFPLEdBQVEsU0FBUyxDQUFDO1FBQ3pCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsb0JBQWUsR0FBUyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ25DLFVBQUssR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ25CLG9CQUFlLEdBQUcsSUFBSSxDQUFDO1FBRXZCLFlBQU8sR0FBWSxLQUFLLENBQUM7SUFHekIsQ0FBQztJQUVELFFBQVE7UUFDSixJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxD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LENBa0UvQjtTQWxFWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJlcG9ydFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9yZXBvcnQuc2VydmljZSc7XHJcbmltcG9ydCB7IFJ4U3RvbXBTZXJ2aWNlIH0gZnJvbSAnQHN0b21wL25nMi1zdG9tcGpzJztcclxuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gJ0BzdG9tcC9zdG9tcGpzJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xyXG5pbXBvcnQgeyBzYXZlQXMgfSBmcm9tICdmaWxlLXNhdmVyJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRmFjaWxpdHkge1xyXG4gICAgaWQ6IG51bWJlcjtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIHNlbGVjdGVkOiBib29sZWFuO1xyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnYXJ0LXN1bW1hcnknLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2FydC1zdW1tYXJ5LmNvbXBvbmVudC5odG1sJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQXJ0U3VtbWFyeUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICAgIHByaXZhdGUgdG9waWNTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuICAgIGZhY2lsaXR5OiBGYWNpbGl0eTtcclxuICAgIGZpbGVzOiBzdHJpbmdbXTtcclxuICAgIHJ1bm5pbmcgPSBmYWxzZTtcclxuICAgIG1lc3NhZ2U6IGFueSA9ICdSdW5uaW5nJztcclxuICAgIGZpbmlzaGVkID0gZmFsc2U7XHJcbiAgICByZXBvcnRpbmdQZXJpb2Q6IERhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgdG9kYXkgPSBuZXcgRGF0ZSgpO1xyXG4gICAgdG9kYXlTZWxlY3RhYmxlID0gdHJ1ZTtcclxuXHJcbiAgICBjdXJyZW50OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzZXJ2aWNlOiBSZXBvcnRTZXJ2aWNlLCBwcml2YXRlIHN0b21wU2VydmljZTogUnhTdG9tcFNlcnZpY2UsIHByaXZhdGUgZG9tU2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLnNlcnZpY2UuZ2V0QWN0aXZlRmFjaWxpdHkoKS5zdWJzY3JpYmUocmVzID0+IHRoaXMuZmFjaWxpdHkgPSByZXMpO1xyXG4gICAgICAgIHRoaXMudG9waWNTdWJzY3JpcHRpb24gPSB0aGlzLnN0b21wU2VydmljZS53YXRjaCgnL3RvcGljL2FydC1zdW1tYXJ5L3N0YXR1cycpLnN1YnNjcmliZSgobXNnOiBNZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChtc2cuYm9keSA9PT0gJ3N0YXJ0Jykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ydW5uaW5nID0gdHJ1ZVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1zZy5ib2R5ID09PSAnZW5kJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmlzaGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9ICdGaW5pc2hlZCc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlcnZpY2UubGlzdEZpbGVzKCkuc3Vic2NyaWJlKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWxlcyA9IHJlcztcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtc2cuYm9keTtcclxuICAgICAgICAgICAgICAgIHRoaXMucnVubmluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGRvd25sb2FkKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuc2VydmljZS5kb3dubG9hZChuYW1lKS5zdWJzY3JpYmUocmVzID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZmlsZSA9IG5ldyBGaWxlKFtyZXNdLCBuYW1lICsgJ0FSVCBTdW1tYXJ5IFJlcG9ydC5wZGYnLCB7dHlwZTogJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbSd9KTtcclxuICAgICAgICAgICAgc2F2ZUFzKGZpbGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHRhYkNoYW5nZWQoZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQuaW5kZXggPT09IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLmxpc3RGaWxlcygpLnN1YnNjcmliZShyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maWxlcyA9IHJlcztcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbW9udGhDaGFuZ2VkKG1vbnRoOiBEYXRlKSB7XHJcbiAgICAgICAgdGhpcy50b2RheVNlbGVjdGFibGUgPSBuZXcgRGF0ZSgpLmdldE1vbnRoKCkgPT09IG1vbnRoLmdldE1vbnRoKClcclxuICAgIH1cclxuXHJcbiAgICBjb252ZXJ0KCkge1xyXG4gICAgICAgIHRoaXMucnVubmluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5maW5pc2hlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2VydmljZS5hcnRTdW1tYXJ5KHRoaXMucmVwb3J0aW5nUGVyaW9kLCB0aGlzLmZhY2lsaXR5LmlkLCB0aGlzLmN1cnJlbnQpLnN1YnNjcmliZSgocmVzKT0+IHtcclxuICAgICAgICAgICAgY29uc3QgZmlsZSA9IG5ldyBGaWxlKFtyZXNdLCB0aGlzLmZhY2lsaXR5Lm5hbWUgKyAnX0FSVCBTdW1tYXJ5IFJlcG9ydC5wZGYnLCB7dHlwZTogJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbSd9KTtcclxuICAgICAgICAgICAgc2F2ZUFzKGZpbGUpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy50b3BpY1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpXHJcbiAgICB9XHJcbn1cclxuIl19
