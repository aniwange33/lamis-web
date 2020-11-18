import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NdrConverterService } from "../services/ndr-converter.service";
import { RxStompService } from "@stomp/ng2-stompjs";
import { DomSanitizer } from "@angular/platform-browser";
import { saveAs } from 'file-saver';
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
        this.ndrService.listFacilities().subscribe(function (res) { return _this.facilities = res; });
        this.topicSubscription = this.stompService.watch("/topic/ndr-status").subscribe(function (msg) {
            if (msg.body === 'start') {
                _this.running = true;
            }
            else if (msg.body === 'end') {
                _this.running = false;
                _this.message = "Conversion finished; download files from Download tab";
                _this.finished = true;
                _this.ndrService.listFiles().subscribe(function (res) {
                    _this.files = res;
                });
            }
            else {
                _this.message = msg.body;
                _this.running = true;
            }
        });
    };
    NdrConverterComponent.prototype.selected = function () {
        return this.facilities.filter(function (f) { return f.selected; }).length > 0;
    };
    NdrConverterComponent.prototype.download = function (name) {
        this.ndrService.download(name).subscribe(function (res) {
            var file = new File([res], name + '.zip', { type: 'application/octet-stream' });
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
        var ids = this.facilities.filter(function (f) { return f.selected; })
            .map(function (f) { return f.id; });
        this.ndrService.convert(ids).subscribe();
    };
    NdrConverterComponent.prototype.deduplicate = function () {
        var _this = this;
        this.running = true;
        this.ndrService.deduplicate().subscribe(function (res) { return _this.running = false; });
    };
    NdrConverterComponent.prototype.ngOnDestroy = function () {
        this.topicSubscription.unsubscribe();
    };
    NdrConverterComponent.ctorParameters = function () { return [
        { type: NdrConverterService },
        { type: RxStompService },
        { type: DomSanitizer }
    ]; };
    NdrConverterComponent = tslib_1.__decorate([
        Component({
            selector: 'ndr-converter',
            template: "<mat-card>\n    <mat-card-content>\n        <mat-tab-group (selectedTabChange)=\"tabChanged($event)\">\n            <mat-tab label=\"Conversion\">\n                <ng-container *ngIf=\"running\">\n                    <mat-progress-bar mode=\"indeterminate\"></mat-progress-bar>\n                    <mat-form-field style=\"width: 100%\">\n                        <input [disabled]=\"true\" matInput [value]=\"message\"/>\n                    </mat-form-field>\n                </ng-container>\n                <ng-container *ngIf=\"finished\">\n                    <mat-form-field style=\"width: 100%\">\n                        <input [disabled]=\"true\" matInput [value]=\"message\"/>\n                    </mat-form-field>\n                </ng-container>\n                <mat-list>\n                    <div mat-subheader>Available Facilities</div>\n                    <mat-list-item *ngFor=\"let facility of facilities\">\n                        <mat-icon mat-list-icon>account_balance</mat-icon>\n                        <div mat-line>\n                            <mat-checkbox\n                                    [(ngModel)]=\"facility.selected\"\n                                    labelPosition=\"before\">\n                                {{facility.name}}\n                            </mat-checkbox>\n                        </div>\n                    </mat-list-item>\n                    <mat-divider></mat-divider>\n                    <button mat-button\n                            (click)=\"deduplicate()\"\n                            [disabled]=\"running\">Remove Duplicate Records\n                    </button>\n                    <button mat-raised-button color=\"primary\"\n                            (click)=\"convert()\"\n                            [disabled]=\"running || !selected()\">Generate NDR\n                    </button>\n                </mat-list>\n            </mat-tab>\n            <mat-tab label=\"Download\">\n                <mat-list>\n                    <div mat-subheader>Available NDR Files</div>\n                    <mat-list-item *ngFor=\"let file of files\">\n                        <div mat-line>\n                            {{file}}\n                            <button mat-list-icon\n                                    (click)=\"download(file)\">\n                                <mat-icon>file_download</mat-icon>\n                            </button>\n                        </div>\n                    </mat-list-item>\n                </mat-list>\n            </mat-tab>\n        </mat-tab-group>\n    </mat-card-content>\n</mat-card>"
        }),
        tslib_1.__metadata("design:paramtypes", [NdrConverterService, RxStompService, DomSanitizer])
    ], NdrConverterComponent);
    return NdrConverterComponent;
}());
export { NdrConverterComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmRyLWNvbnZlcnRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1uZHIvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9uZHItY29udmVydGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDeEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBR3BELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBWXBDO0lBUUksK0JBQW9CLFVBQStCLEVBQVUsWUFBNEIsRUFBVSxZQUEwQjtRQUF6RyxlQUFVLEdBQVYsVUFBVSxDQUFxQjtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFnQjtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBTjdILGVBQVUsR0FBZSxFQUFFLENBQUM7UUFFNUIsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUVoQixhQUFRLEdBQUcsS0FBSyxDQUFDO0lBR2pCLENBQUM7SUFFRCx3Q0FBUSxHQUFSO1FBQUEsaUJBaUJDO1FBaEJHLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFLENBQUMsU0FBUyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsS0FBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLEVBQXJCLENBQXFCLENBQUMsQ0FBQztRQUN6RSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQyxHQUFZO1lBQ3pGLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUU7Z0JBQ3RCLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFB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aW1wb3J0IHsgQ29tcG9uZW50LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmRyQ29udmVydGVyU2VydmljZSB9IGZyb20gXCIuLi9zZXJ2aWNlcy9uZHItY29udmVydGVyLnNlcnZpY2VcIjtcbmltcG9ydCB7IFJ4U3RvbXBTZXJ2aWNlIH0gZnJvbSBcIkBzdG9tcC9uZzItc3RvbXBqc1wiO1xuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gJ0BzdG9tcC9zdG9tcGpzJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3NlclwiO1xuaW1wb3J0IHsgc2F2ZUFzIH0gZnJvbSAnZmlsZS1zYXZlcic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmFjaWxpdHkge1xuICAgIGlkOiBudW1iZXI7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHNlbGVjdGVkOiBib29sZWFuO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ25kci1jb252ZXJ0ZXInLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9uZHItY29udmVydC5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgTmRyQ29udmVydGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIHByaXZhdGUgdG9waWNTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgICBmYWNpbGl0aWVzOiBGYWNpbGl0eVtdID0gW107XG4gICAgZmlsZXM6IHN0cmluZ1tdO1xuICAgIHJ1bm5pbmcgPSBmYWxzZTtcbiAgICBtZXNzYWdlOiBhbnk7XG4gICAgZmluaXNoZWQgPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbmRyU2VydmljZTogTmRyQ29udmVydGVyU2VydmljZSwgcHJpdmF0ZSBzdG9tcFNlcnZpY2U6IFJ4U3RvbXBTZXJ2aWNlLCBwcml2YXRlIGRvbVNhbml0aXplcjogRG9tU2FuaXRpemVyKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMubmRyU2VydmljZS5saXN0RmFjaWxpdGllcygpLnN1YnNjcmliZShyZXMgPT4gdGhpcy5mYWNpbGl0aWVzID0gcmVzKTtcbiAgICAgICAgdGhpcy50b3BpY1N1YnNjcmlwdGlvbiA9IHRoaXMuc3RvbXBTZXJ2aWNlLndhdGNoKFwiL3RvcGljL25kci1zdGF0dXNcIikuc3Vic2NyaWJlKChtc2c6IE1lc3NhZ2UpID0+IHtcbiAgICAgICAgICAgIGlmIChtc2cuYm9keSA9PT0gJ3N0YXJ0Jykge1xuICAgICAgICAgICAgICAgIHRoaXMucnVubmluZyA9IHRydWVcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobXNnLmJvZHkgPT09ICdlbmQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gXCJDb252ZXJzaW9uIGZpbmlzaGVkOyBkb3dubG9hZCBmaWxlcyBmcm9tIERvd25sb2FkIHRhYlwiO1xuICAgICAgICAgICAgICAgIHRoaXMuZmluaXNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMubmRyU2VydmljZS5saXN0RmlsZXMoKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWxlcyA9IHJlcztcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtc2cuYm9keTtcbiAgICAgICAgICAgICAgICB0aGlzLnJ1bm5pbmcgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHNlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5mYWNpbGl0aWVzLmZpbHRlcihmID0+IGYuc2VsZWN0ZWQpLmxlbmd0aCA+IDBcbiAgICB9XG5cbiAgICBkb3dubG9hZChuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5uZHJTZXJ2aWNlLmRvd25sb2FkKG5hbWUpLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmlsZSA9IG5ldyBGaWxlKFtyZXNdLCBuYW1lICsgJy56aXAnLCB7dHlwZTogJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbSd9KTtcbiAgICAgICAgICAgIHNhdmVBcyhmaWxlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGFiQ2hhbmdlZChldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuaW5kZXggPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMubmRyU2VydmljZS5saXN0RmlsZXMoKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbGVzID0gcmVzO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnZlcnQoKSB7XG4gICAgICAgIGxldCBpZHMgPSB0aGlzLmZhY2lsaXRpZXMuZmlsdGVyKGYgPT4gZi5zZWxlY3RlZClcbiAgICAgICAgICAgIC5tYXAoZiA9PiBmLmlkKTtcbiAgICAgICAgdGhpcy5uZHJTZXJ2aWNlLmNvbnZlcnQoaWRzKS5zdWJzY3JpYmUoKVxuICAgIH1cblxuICAgIGRlZHVwbGljYXRlKCkge1xuICAgICAgICB0aGlzLnJ1bm5pbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLm5kclNlcnZpY2UuZGVkdXBsaWNhdGUoKS5zdWJzY3JpYmUocmVzID0+IHRoaXMucnVubmluZyA9IGZhbHNlKVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRvcGljU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKClcbiAgICB9XG59XG4iXX0=