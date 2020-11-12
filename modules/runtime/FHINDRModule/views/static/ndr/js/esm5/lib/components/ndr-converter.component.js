import * as tslib_1 from "tslib";
import {Component} from '@angular/core';
import {NdrConverterService} from "../services/ndr-converter.service";
import {RxStompService} from "@stomp/ng2-stompjs";
import {DomSanitizer} from "@angular/platform-browser";
import {saveAs} from 'file-saver';

var NdrConverterComponent = /** @class */ (function () {
    function NdrConverterComponent(ndrService, stompService, domSanitizer) {
        this.ndrService = ndrService;
        this.stompService = stompService;
        this.domSanitizer = domSanitizer;
        this.facilities = [];
        this.running = false;
        this.finished = false;
    }

    NdrConverterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ndrService.listFacilities().subscribe(function (res) {
            return _this.facilities = res;
        });
        this.topicSubscription = this.stompService.watch("/topic/ndr-status").subscribe(function (msg) {
            if (msg.body === 'start') {
                _this.running = true;
            } else if (msg.body === 'end') {
                _this.running = false;
                _this.message = "Conversion finished; download files from Download tab";
                _this.finished = true;
                _this.ndrService.listFiles().subscribe(function (res) {
                    _this.files = res;
                });
            } else {
                _this.message = msg.body;
                _this.running = true;
            }
        });
    };
    NdrConverterComponent.prototype.selected = function () {
        return this.facilities.filter(function (f) {
            return f.selected;
        }).length > 0;
    };
    NdrConverterComponent.prototype.download = function (name) {
        this.ndrService.download(name).subscribe(function (res) {
            var file = new File([res], name + '.zip', {type: 'application/octet-stream'});
            saveAs(file);
        });
    };
    NdrConverterComponent.prototype.tabChanged = function (event) {
        var _this = this;
        if (event.index === 1) {
            this.ndrService.listFiles().subscribe(function (res) {
                _this.files = res;
            });
        }
    };
    NdrConverterComponent.prototype.convert = function () {
        var ids = this.facilities.filter(function (f) {
            return f.selected;
        })
            .map(function (f) {
                return f.id;
            });
        this.ndrService.convert(ids).subscribe();
    };
    NdrConverterComponent.prototype.deduplicate = function () {
        var _this = this;
        this.running = true;
        this.ndrService.deduplicate().subscribe(function (res) {
            return _this.running = false;
        });
    };
    NdrConverterComponent.prototype.ngOnDestroy = function () {
        this.topicSubscription.unsubscribe();
    };
    NdrConverterComponent.ctorParameters = function () {
        return [
            {type: NdrConverterService},
            {type: RxStompService},
            {type: DomSanitizer}
        ];
    };
    NdrConverterComponent = tslib_1.__decorate([
        Component({
            selector: 'ndr-converter',
            template: "<mat-card>\r\n    <mat-card-content>\r\n        <mat-tab-group (selectedTabChange)=\"tabChanged($event)\">\r\n            <mat-tab label=\"Conversion\">\r\n                <ng-container *ngIf=\"running\">\r\n                    <mat-progress-bar mode=\"indeterminate\"></mat-progress-bar>\r\n                    <mat-form-field style=\"width: 100%\">\r\n                        <input [disabled]=\"true\" matInput [value]=\"message\"/>\r\n                    </mat-form-field>\r\n                </ng-container>\r\n                <ng-container *ngIf=\"finished\">\r\n                    <mat-form-field style=\"width: 100%\">\r\n                        <input [disabled]=\"true\" matInput [value]=\"message\"/>\r\n                    </mat-form-field>\r\n                </ng-container>\r\n                <mat-list>\r\n                    <div mat-subheader>Available Facilities</div>\r\n                    <mat-list-item *ngFor=\"let facility of facilities\">\r\n                        <mat-icon mat-list-icon>account_balance</mat-icon>\r\n                        <div mat-line>\r\n                            <mat-checkbox\r\n                                    [(ngModel)]=\"facility.selected\"\r\n                                    labelPosition=\"before\">\r\n                                {{facility.name}}\r\n                            </mat-checkbox>\r\n                        </div>\r\n                    </mat-list-item>\r\n                    <mat-divider></mat-divider>\r\n                    <button mat-button\r\n                            (click)=\"deduplicate()\"\r\n                            [disabled]=\"running\">Remove Duplicate Records\r\n                    </button>\r\n                    <button mat-raised-button color=\"primary\"\r\n                            (click)=\"convert()\"\r\n                            [disabled]=\"running || !selected()\">Generate NDR\r\n                    </button>\r\n                </mat-list>\r\n            </mat-tab>\r\n            <mat-tab label=\"Download\">\r\n                <mat-list>\r\n                    <div mat-subheader>Available NDR Files</div>\r\n                    <mat-list-item *ngFor=\"let file of files\">\r\n                        <div mat-line>\r\n                            {{file}}\r\n                            <button mat-list-icon\r\n                                    (click)=\"download(file)\">\r\n                                <mat-icon>file_download</mat-icon>\r\n                            </button>\r\n                        </div>\r\n                    </mat-list-item>\r\n                </mat-list>\r\n            </mat-tab>\r\n        </mat-tab-group>\r\n    </mat-card-content>\r\n</mat-card>"
        }),
        tslib_1.__metadata("design:paramtypes", [NdrConverterService, RxStompService, DomSanitizer])
    ], NdrConverterComponent);
    return NdrConverterComponent;
}());
export {NdrConverterComponent};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmRyLWNvbnZlcnRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1uZHIvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9uZHItY29udmVydGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDeEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBR3BELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBWXBDO0lBUUksK0JBQW9CLFVBQStCLEVBQVUsWUFBNEIsRUFBVSxZQUEwQjtRQUF6RyxlQUFVLEdBQVYsVUFBVSxDQUFxQjtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFnQjtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBTjdILGVBQVUsR0FBZSxFQUFFLENBQUM7UUFFNUIsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUVoQixhQUFRLEdBQUcsS0FBSyxDQUFDO0lBR2pCLENBQUM7SUFFRCx3Q0FBUSxHQUFSO1FBQUEsaUJBaUJDO1FBaEJHLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFLENBQUMsU0FBUyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsS0FBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLEVBQXJCLENBQXFCLENBQUMsQ0FBQztRQUN6RSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQyxHQUFZO1lBQ3pGLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUU7Z0JBQ3RCLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFBO2FBQ3RCO2lCQUFNLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxLQUFLLEVBQUU7Z0JBQzNCLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2dCQUNyQixLQUFJLENBQUMsT0FBTyxHQUFHLHVEQUF1RCxDQUFDO2dCQUN2RSxLQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztnQkFDckIsS0FBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHO29CQUNyQyxLQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztnQkFDckIsQ0FBQyxDQUFDLENBQUE7YUFDTDtpQkFBTTtnQkFDSCxLQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7Z0JBQ3hCLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO2FBQ3ZCO1FBQ0wsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQsd0NBQVEsR0FBUjtRQUNJLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsUUFBUSxFQUFWLENBQVUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7SUFDN0QsQ0FBQztJQUVELHdDQUFRLEdBQVIsVUFBUyxJQUFZO1FBQ2pCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLEdBQUc7WUFDeEMsSUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUcsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFFLDBCQUEwQixFQUFDLENBQUMsQ0FBQztZQUNoRixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsMENBQVUsR0FBVixVQUFXLEtBQUs7UUFBaEIsaUJBTUM7UUFMRyxJQUFJLEtBQUssQ0FBQyxLQUFLLEtBQUssQ0FBQyxFQUFFO1lBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLENBQUMsU0FBUyxDQUFDLFVBQUEsR0FBRztnQkFDckMsS0FBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7WUFDckIsQ0FBQyxDQUFDLENBQUE7U0FDTDtJQUNMLENBQUM7SUFFRCx1Q0FBTyxHQUFQO1FBQ0ksSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsUUFBUSxFQUFWLENBQVUsQ0FBQzthQUM1QyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsRUFBRSxFQUFKLENBQUksQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFBO0lBQzVDLENBQUM7SUFFRCwyQ0FBVyxHQUFYO1FBQUEsaUJBR0M7UUFGRyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxFQUFwQixDQUFvQixDQUFDLENBQUE7SUFDeEUsQ0FBQztJQUVELDJDQUFXLEdBQVg7UUFDSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUE7SUFDeEMsQ0FBQzs7Z0JBdEQrQixtQkFBbUI7Z0JBQXdCLGNBQWM7Z0JBQXdCLFlBQVk7O0lBUnBILHFCQUFxQjtRQUpqQyxTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZUFBZTtZQUN6QiwwcUZBQTJDO1NBQzlDLENBQUM7aURBU2tDLG1CQUFtQixFQUF3QixjQUFjLEVBQXdCLFlBQVk7T0FScEgscUJBQXFCLENBK0RqQztJQUFELDRCQUFDO0NBQUEsQUEvREQsSUErREM7U0EvRFkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOZHJDb252ZXJ0ZXJTZXJ2aWNlIH0gZnJvbSBcIi4uL3NlcnZpY2VzL25kci1jb252ZXJ0ZXIuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBSeFN0b21wU2VydmljZSB9IGZyb20gXCJAc3RvbXAvbmcyLXN0b21wanNcIjtcclxuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gJ0BzdG9tcC9zdG9tcGpzJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSBcInJ4anNcIjtcclxuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSBcIkBhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXJcIjtcclxuaW1wb3J0IHsgc2F2ZUFzIH0gZnJvbSAnZmlsZS1zYXZlcic7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEZhY2lsaXR5IHtcclxuICAgIGlkOiBudW1iZXI7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBzZWxlY3RlZDogYm9vbGVhbjtcclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ25kci1jb252ZXJ0ZXInLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL25kci1jb252ZXJ0LmNvbXBvbmVudC5odG1sJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTmRyQ29udmVydGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gICAgcHJpdmF0ZSB0b3BpY1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gICAgZmFjaWxpdGllczogRmFjaWxpdHlbXSA9IFtdO1xyXG4gICAgZmlsZXM6IHN0cmluZ1tdO1xyXG4gICAgcnVubmluZyA9IGZhbHNlO1xyXG4gICAgbWVzc2FnZTogYW55O1xyXG4gICAgZmluaXNoZWQgPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5kclNlcnZpY2U6IE5kckNvbnZlcnRlclNlcnZpY2UsIHByaXZhdGUgc3RvbXBTZXJ2aWNlOiBSeFN0b21wU2VydmljZSwgcHJpdmF0ZSBkb21TYW5pdGl6ZXI6IERvbVNhbml0aXplcikge1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMubmRyU2VydmljZS5saXN0RmFjaWxpdGllcygpLnN1YnNjcmliZShyZXMgPT4gdGhpcy5mYWNpbGl0aWVzID0gcmVzKTtcclxuICAgICAgICB0aGlzLnRvcGljU3Vic2NyaXB0aW9uID0gdGhpcy5zdG9tcFNlcnZpY2Uud2F0Y2goXCIvdG9waWMvbmRyLXN0YXR1c1wiKS5zdWJzY3JpYmUoKG1zZzogTWVzc2FnZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAobXNnLmJvZHkgPT09ICdzdGFydCcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucnVubmluZyA9IHRydWVcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChtc2cuYm9keSA9PT0gJ2VuZCcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gXCJDb252ZXJzaW9uIGZpbmlzaGVkOyBkb3dubG9hZCBmaWxlcyBmcm9tIERvd25sb2FkIHRhYlwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maW5pc2hlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5kclNlcnZpY2UubGlzdEZpbGVzKCkuc3Vic2NyaWJlKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWxlcyA9IHJlcztcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtc2cuYm9keTtcclxuICAgICAgICAgICAgICAgIHRoaXMucnVubmluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZhY2lsaXRpZXMuZmlsdGVyKGYgPT4gZi5zZWxlY3RlZCkubGVuZ3RoID4gMFxyXG4gICAgfVxyXG5cclxuICAgIGRvd25sb2FkKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMubmRyU2VydmljZS5kb3dubG9hZChuYW1lKS5zdWJzY3JpYmUocmVzID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZmlsZSA9IG5ldyBGaWxlKFtyZXNdLCBuYW1lICsgJy56aXAnLCB7dHlwZTogJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbSd9KTtcclxuICAgICAgICAgICAgc2F2ZUFzKGZpbGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHRhYkNoYW5nZWQoZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQuaW5kZXggPT09IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5uZHJTZXJ2aWNlLmxpc3RGaWxlcygpLnN1YnNjcmliZShyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maWxlcyA9IHJlcztcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29udmVydCgpIHtcclxuICAgICAgICBsZXQgaWRzID0gdGhpcy5mYWNpbGl0aWVzLmZpbHRlcihmID0+IGYuc2VsZWN0ZWQpXHJcbiAgICAgICAgICAgIC5tYXAoZiA9PiBmLmlkKTtcclxuICAgICAgICB0aGlzLm5kclNlcnZpY2UuY29udmVydChpZHMpLnN1YnNjcmliZSgpXHJcbiAgICB9XHJcblxyXG4gICAgZGVkdXBsaWNhdGUoKSB7XHJcbiAgICAgICAgdGhpcy5ydW5uaW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm5kclNlcnZpY2UuZGVkdXBsaWNhdGUoKS5zdWJzY3JpYmUocmVzID0+IHRoaXMucnVubmluZyA9IGZhbHNlKVxyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudG9waWNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKVxyXG4gICAgfVxyXG59XHJcbiJdfQ==
