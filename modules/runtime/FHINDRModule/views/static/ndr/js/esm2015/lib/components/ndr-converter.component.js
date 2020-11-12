import * as tslib_1 from "tslib";
import {Component} from '@angular/core';
import {NdrConverterService} from "../services/ndr-converter.service";
import {RxStompService} from "@stomp/ng2-stompjs";
import {DomSanitizer} from "@angular/platform-browser";
import {saveAs} from 'file-saver';

let NdrConverterComponent = class NdrConverterComponent {
    constructor(ndrService, stompService, domSanitizer) {
        this.ndrService = ndrService;
        this.stompService = stompService;
        this.domSanitizer = domSanitizer;
        this.facilities = [];
        this.running = false;
        this.finished = false;
    }

    ngOnInit() {
        this.ndrService.listFacilities().subscribe(res => this.facilities = res);
        this.topicSubscription = this.stompService.watch("/topic/ndr-status").subscribe((msg) => {
            if (msg.body === 'start') {
                this.running = true;
            } else if (msg.body === 'end') {
                this.running = false;
                this.message = "Conversion finished; download files from Download tab";
                this.finished = true;
                this.ndrService.listFiles().subscribe(res => {
                    this.files = res;
                });
            } else {
                this.message = msg.body;
                this.running = true;
            }
        });
    }

    selected() {
        return this.facilities.filter(f => f.selected).length > 0;
    }

    download(name) {
        this.ndrService.download(name).subscribe(res => {
            const file = new File([res], name + '.zip', {type: 'application/octet-stream'});
            saveAs(file);
        });
    }

    tabChanged(event) {
        if (event.index === 1) {
            this.ndrService.listFiles().subscribe(res => {
                this.files = res;
            });
        }
    }

    convert() {
        let ids = this.facilities.filter(f => f.selected)
            .map(f => f.id);
        this.ndrService.convert(ids).subscribe();
    }

    deduplicate() {
        this.running = true;
        this.ndrService.deduplicate().subscribe(res => this.running = false);
    }

    ngOnDestroy() {
        this.topicSubscription.unsubscribe();
    }
};
NdrConverterComponent.ctorParameters = () => [
    {type: NdrConverterService},
    {type: RxStompService},
    {type: DomSanitizer}
];
NdrConverterComponent = tslib_1.__decorate([
    Component({
        selector: 'ndr-converter',
        template: "<mat-card>\r\n    <mat-card-content>\r\n        <mat-tab-group (selectedTabChange)=\"tabChanged($event)\">\r\n            <mat-tab label=\"Conversion\">\r\n                <ng-container *ngIf=\"running\">\r\n                    <mat-progress-bar mode=\"indeterminate\"></mat-progress-bar>\r\n                    <mat-form-field style=\"width: 100%\">\r\n                        <input [disabled]=\"true\" matInput [value]=\"message\"/>\r\n                    </mat-form-field>\r\n                </ng-container>\r\n                <ng-container *ngIf=\"finished\">\r\n                    <mat-form-field style=\"width: 100%\">\r\n                        <input [disabled]=\"true\" matInput [value]=\"message\"/>\r\n                    </mat-form-field>\r\n                </ng-container>\r\n                <mat-list>\r\n                    <div mat-subheader>Available Facilities</div>\r\n                    <mat-list-item *ngFor=\"let facility of facilities\">\r\n                        <mat-icon mat-list-icon>account_balance</mat-icon>\r\n                        <div mat-line>\r\n                            <mat-checkbox\r\n                                    [(ngModel)]=\"facility.selected\"\r\n                                    labelPosition=\"before\">\r\n                                {{facility.name}}\r\n                            </mat-checkbox>\r\n                        </div>\r\n                    </mat-list-item>\r\n                    <mat-divider></mat-divider>\r\n                    <button mat-button\r\n                            (click)=\"deduplicate()\"\r\n                            [disabled]=\"running\">Remove Duplicate Records\r\n                    </button>\r\n                    <button mat-raised-button color=\"primary\"\r\n                            (click)=\"convert()\"\r\n                            [disabled]=\"running || !selected()\">Generate NDR\r\n                    </button>\r\n                </mat-list>\r\n            </mat-tab>\r\n            <mat-tab label=\"Download\">\r\n                <mat-list>\r\n                    <div mat-subheader>Available NDR Files</div>\r\n                    <mat-list-item *ngFor=\"let file of files\">\r\n                        <div mat-line>\r\n                            {{file}}\r\n                            <button mat-list-icon\r\n                                    (click)=\"download(file)\">\r\n                                <mat-icon>file_download</mat-icon>\r\n                            </button>\r\n                        </div>\r\n                    </mat-list-item>\r\n                </mat-list>\r\n            </mat-tab>\r\n        </mat-tab-group>\r\n    </mat-card-content>\r\n</mat-card>"
    }),
    tslib_1.__metadata("design:paramtypes", [NdrConverterService, RxStompService, DomSanitizer])
], NdrConverterComponent);
export {NdrConverterComponent};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmRyLWNvbnZlcnRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1uZHIvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9uZHItY29udmVydGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDeEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBR3BELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBWXBDLElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXFCO0lBUTlCLFlBQW9CLFVBQStCLEVBQVUsWUFBNEIsRUFBVSxZQUEwQjtRQUF6RyxlQUFVLEdBQVYsVUFBVSxDQUFxQjtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFnQjtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBTjdILGVBQVUsR0FBZSxFQUFFLENBQUM7UUFFNUIsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUVoQixhQUFRLEdBQUcsS0FBSyxDQUFDO0lBR2pCLENBQUM7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ3pFLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQVksRUFBRSxFQUFFO1lBQzdGLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFBO2FBQ3RCO2lCQUFNLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxLQUFLLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2dCQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHLHVEQUF1RCxDQUFDO2dCQUN2RSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztnQkFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQ3hDLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO2dCQUNyQixDQUFDLENBQUMsQ0FBQTthQUNMO2lCQUFNO2dCQUNILElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztnQkFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7YUFDdkI7UUFDTCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxRQUFRO1FBQ0osT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBO0lBQzdELENBQUM7SUFFRCxRQUFRLENBQUMsSUFBWTtRQUNqQixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDM0MsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUcsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFFLDBCQUEwQixFQUFDLENBQUMsQ0FBQztZQUNoRixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQUs7UUFDWixJQUFJLEtBQUssQ0FBQyxLQUFLLEtBQUssQ0FBQyxFQUFFO1lBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUN4QyxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztZQUNyQixDQUFDLENBQUMsQ0FBQTtTQUNMO0lBQ0wsQ0FBQztJQUVELE9BQU87UUFDSCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7YUFDNUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFBO0lBQzVDLENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxDQUFBO0lBQ3hFLENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFBO0lBQ3hDLENBQUM7Q0FDSixDQUFBOztZQXZEbUMsbUJBQW1CO1lBQXdCLGNBQWM7WUFBd0IsWUFBWTs7QUFScEgscUJBQXFCO0lBSmpDLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxlQUFlO1FBQ3pCLDBxRkFBMkM7S0FDOUMsQ0FBQzs2Q0FTa0MsbUJBQW1CLEVBQXdCLGNBQWMsRUFBd0IsWUFBWTtHQVJwSCxxQkFBcUIsQ0ErRGpDO1NBL0RZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTmRyQ29udmVydGVyU2VydmljZSB9IGZyb20gXCIuLi9zZXJ2aWNlcy9uZHItY29udmVydGVyLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgUnhTdG9tcFNlcnZpY2UgfSBmcm9tIFwiQHN0b21wL25nMi1zdG9tcGpzXCI7XHJcbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tICdAc3RvbXAvc3RvbXBqcyc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gXCJyeGpzXCI7XHJcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gXCJAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyXCI7XHJcbmltcG9ydCB7IHNhdmVBcyB9IGZyb20gJ2ZpbGUtc2F2ZXInO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBGYWNpbGl0eSB7XHJcbiAgICBpZDogbnVtYmVyO1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgc2VsZWN0ZWQ6IGJvb2xlYW47XHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICduZHItY29udmVydGVyJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9uZHItY29udmVydC5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIE5kckNvbnZlcnRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICAgIHByaXZhdGUgdG9waWNTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuICAgIGZhY2lsaXRpZXM6IEZhY2lsaXR5W10gPSBbXTtcclxuICAgIGZpbGVzOiBzdHJpbmdbXTtcclxuICAgIHJ1bm5pbmcgPSBmYWxzZTtcclxuICAgIG1lc3NhZ2U6IGFueTtcclxuICAgIGZpbmlzaGVkID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBuZHJTZXJ2aWNlOiBOZHJDb252ZXJ0ZXJTZXJ2aWNlLCBwcml2YXRlIHN0b21wU2VydmljZTogUnhTdG9tcFNlcnZpY2UsIHByaXZhdGUgZG9tU2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLm5kclNlcnZpY2UubGlzdEZhY2lsaXRpZXMoKS5zdWJzY3JpYmUocmVzID0+IHRoaXMuZmFjaWxpdGllcyA9IHJlcyk7XHJcbiAgICAgICAgdGhpcy50b3BpY1N1YnNjcmlwdGlvbiA9IHRoaXMuc3RvbXBTZXJ2aWNlLndhdGNoKFwiL3RvcGljL25kci1zdGF0dXNcIikuc3Vic2NyaWJlKChtc2c6IE1lc3NhZ2UpID0+IHtcclxuICAgICAgICAgICAgaWYgKG1zZy5ib2R5ID09PSAnc3RhcnQnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJ1bm5pbmcgPSB0cnVlXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobXNnLmJvZHkgPT09ICdlbmQnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9IFwiQ29udmVyc2lvbiBmaW5pc2hlZDsgZG93bmxvYWQgZmlsZXMgZnJvbSBEb3dubG9hZCB0YWJcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmluaXNoZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uZHJTZXJ2aWNlLmxpc3RGaWxlcygpLnN1YnNjcmliZShyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsZXMgPSByZXM7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gbXNnLmJvZHk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJ1bm5pbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3RlZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5mYWNpbGl0aWVzLmZpbHRlcihmID0+IGYuc2VsZWN0ZWQpLmxlbmd0aCA+IDBcclxuICAgIH1cclxuXHJcbiAgICBkb3dubG9hZChuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLm5kclNlcnZpY2UuZG93bmxvYWQobmFtZSkuc3Vic2NyaWJlKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBuZXcgRmlsZShbcmVzXSwgbmFtZSArICcuemlwJywge3R5cGU6ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nfSk7XHJcbiAgICAgICAgICAgIHNhdmVBcyhmaWxlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB0YWJDaGFuZ2VkKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50LmluZGV4ID09PSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmRyU2VydmljZS5saXN0RmlsZXMoKS5zdWJzY3JpYmUocmVzID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlsZXMgPSByZXM7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnZlcnQoKSB7XHJcbiAgICAgICAgbGV0IGlkcyA9IHRoaXMuZmFjaWxpdGllcy5maWx0ZXIoZiA9PiBmLnNlbGVjdGVkKVxyXG4gICAgICAgICAgICAubWFwKGYgPT4gZi5pZCk7XHJcbiAgICAgICAgdGhpcy5uZHJTZXJ2aWNlLmNvbnZlcnQoaWRzKS5zdWJzY3JpYmUoKVxyXG4gICAgfVxyXG5cclxuICAgIGRlZHVwbGljYXRlKCkge1xyXG4gICAgICAgIHRoaXMucnVubmluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5uZHJTZXJ2aWNlLmRlZHVwbGljYXRlKCkuc3Vic2NyaWJlKHJlcyA9PiB0aGlzLnJ1bm5pbmcgPSBmYWxzZSlcclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnRvcGljU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKClcclxuICAgIH1cclxufVxyXG4iXX0=
