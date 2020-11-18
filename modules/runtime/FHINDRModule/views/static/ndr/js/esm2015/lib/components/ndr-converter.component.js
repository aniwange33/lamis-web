import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NdrConverterService } from "../services/ndr-converter.service";
import { RxStompService } from "@stomp/ng2-stompjs";
import { DomSanitizer } from "@angular/platform-browser";
import { saveAs } from 'file-saver';
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
            }
            else if (msg.body === 'end') {
                this.running = false;
                this.message = "Conversion finished; download files from Download tab";
                this.finished = true;
                this.ndrService.listFiles().subscribe(res => {
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
        this.ndrService.download(name).subscribe(res => {
            const file = new File([res], name + '.zip', { type: 'application/octet-stream' });
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
    { type: NdrConverterService },
    { type: RxStompService },
    { type: DomSanitizer }
];
NdrConverterComponent = tslib_1.__decorate([
    Component({
        selector: 'ndr-converter',
        template: "<mat-card>\n    <mat-card-content>\n        <mat-tab-group (selectedTabChange)=\"tabChanged($event)\">\n            <mat-tab label=\"Conversion\">\n                <ng-container *ngIf=\"running\">\n                    <mat-progress-bar mode=\"indeterminate\"></mat-progress-bar>\n                    <mat-form-field style=\"width: 100%\">\n                        <input [disabled]=\"true\" matInput [value]=\"message\"/>\n                    </mat-form-field>\n                </ng-container>\n                <ng-container *ngIf=\"finished\">\n                    <mat-form-field style=\"width: 100%\">\n                        <input [disabled]=\"true\" matInput [value]=\"message\"/>\n                    </mat-form-field>\n                </ng-container>\n                <mat-list>\n                    <div mat-subheader>Available Facilities</div>\n                    <mat-list-item *ngFor=\"let facility of facilities\">\n                        <mat-icon mat-list-icon>account_balance</mat-icon>\n                        <div mat-line>\n                            <mat-checkbox\n                                    [(ngModel)]=\"facility.selected\"\n                                    labelPosition=\"before\">\n                                {{facility.name}}\n                            </mat-checkbox>\n                        </div>\n                    </mat-list-item>\n                    <mat-divider></mat-divider>\n                    <button mat-button\n                            (click)=\"deduplicate()\"\n                            [disabled]=\"running\">Remove Duplicate Records\n                    </button>\n                    <button mat-raised-button color=\"primary\"\n                            (click)=\"convert()\"\n                            [disabled]=\"running || !selected()\">Generate NDR\n                    </button>\n                </mat-list>\n            </mat-tab>\n            <mat-tab label=\"Download\">\n                <mat-list>\n                    <div mat-subheader>Available NDR Files</div>\n                    <mat-list-item *ngFor=\"let file of files\">\n                        <div mat-line>\n                            {{file}}\n                            <button mat-list-icon\n                                    (click)=\"download(file)\">\n                                <mat-icon>file_download</mat-icon>\n                            </button>\n                        </div>\n                    </mat-list-item>\n                </mat-list>\n            </mat-tab>\n        </mat-tab-group>\n    </mat-card-content>\n</mat-card>"
    }),
    tslib_1.__metadata("design:paramtypes", [NdrConverterService, RxStompService, DomSanitizer])
], NdrConverterComponent);
export { NdrConverterComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmRyLWNvbnZlcnRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1uZHIvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9uZHItY29udmVydGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDeEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBR3BELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBWXBDLElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXFCO0lBUTlCLFlBQW9CLFVBQStCLEVBQVUsWUFBNEIsRUFBVSxZQUEwQjtRQUF6RyxlQUFVLEdBQVYsVUFBVSxDQUFxQjtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFnQjtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBTjdILGVBQVUsR0FBZSxFQUFFLENBQUM7UUFFNUIsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUVoQixhQUFRLEdBQUcsS0FBSyxDQUFDO0lBR2pCLENBQUM7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ3pFLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQVksRUFBRSxFQUFFO1lBQzdGLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFBO2FBQ3RCO2lCQUFNLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxLQUFLLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2dCQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHLHVEQUF1RCxDQUFDO2dCQUN2RSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztnQkFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQ3hDLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO2dCQUNyQixDQUFDLENBQUMsQ0FBQTthQUNMO2lCQUFNO2dCQUNILElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztnQkFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7YUFDdkI7UUFDTCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxRQUFRO1FBQ0osT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBO0lBQzdELENBQUM7SUFFRCxRQUFRLENBQUMsSUFBWTtRQUNqQixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDM0MsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUcsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFFLDBCQUEwQixFQUFDLENBQUMsQ0FBQztZQUNoRixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQUs7UUFDWixJQUFJLEtBQUssQ0FBQyxLQUFLLEtBQUssQ0FBQyxFQUFFO1lBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUN4QyxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztZQUNyQixDQUFDLENBQUMsQ0FBQTtTQUNMO0lBQ0wsQ0FBQztJQUVELE9BQU87UUFDSCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7YUFDNUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFBO0lBQzVDLENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxDQUFBO0lBQ3hFLENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFBO0lBQ3hDLENBQUM7Q0FDSixDQUFBOztZQXZEbUMsbUJBQW1CO1lBQXdCLGNBQWM7WUFBd0IsWUFBWTs7QUFScEgscUJBQXFCO0lBSmpDLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxlQUFlO1FBQ3pCLDhqRkFBMkM7S0FDOUMsQ0FBQzs2Q0FTa0MsbUJBQW1CLEVBQXdCLGNBQWMsRUFBd0IsWUFBWTtHQVJwSCxxQkFBcUIsQ0ErRGpDO1NBL0RZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5kckNvbnZlcnRlclNlcnZpY2UgfSBmcm9tIFwiLi4vc2VydmljZXMvbmRyLWNvbnZlcnRlci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBSeFN0b21wU2VydmljZSB9IGZyb20gXCJAc3RvbXAvbmcyLXN0b21wanNcIjtcbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tICdAc3RvbXAvc3RvbXBqcyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSBcIkBhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXJcIjtcbmltcG9ydCB7IHNhdmVBcyB9IGZyb20gJ2ZpbGUtc2F2ZXInO1xuXG5leHBvcnQgaW50ZXJmYWNlIEZhY2lsaXR5IHtcbiAgICBpZDogbnVtYmVyO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBzZWxlY3RlZDogYm9vbGVhbjtcbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduZHItY29udmVydGVyJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbmRyLWNvbnZlcnQuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIE5kckNvbnZlcnRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBwcml2YXRlIHRvcGljU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gICAgZmFjaWxpdGllczogRmFjaWxpdHlbXSA9IFtdO1xuICAgIGZpbGVzOiBzdHJpbmdbXTtcbiAgICBydW5uaW5nID0gZmFsc2U7XG4gICAgbWVzc2FnZTogYW55O1xuICAgIGZpbmlzaGVkID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5kclNlcnZpY2U6IE5kckNvbnZlcnRlclNlcnZpY2UsIHByaXZhdGUgc3RvbXBTZXJ2aWNlOiBSeFN0b21wU2VydmljZSwgcHJpdmF0ZSBkb21TYW5pdGl6ZXI6IERvbVNhbml0aXplcikge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLm5kclNlcnZpY2UubGlzdEZhY2lsaXRpZXMoKS5zdWJzY3JpYmUocmVzID0+IHRoaXMuZmFjaWxpdGllcyA9IHJlcyk7XG4gICAgICAgIHRoaXMudG9waWNTdWJzY3JpcHRpb24gPSB0aGlzLnN0b21wU2VydmljZS53YXRjaChcIi90b3BpYy9uZHItc3RhdHVzXCIpLnN1YnNjcmliZSgobXNnOiBNZXNzYWdlKSA9PiB7XG4gICAgICAgICAgICBpZiAobXNnLmJvZHkgPT09ICdzdGFydCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJ1bm5pbmcgPSB0cnVlXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1zZy5ib2R5ID09PSAnZW5kJykge1xuICAgICAgICAgICAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9IFwiQ29udmVyc2lvbiBmaW5pc2hlZDsgZG93bmxvYWQgZmlsZXMgZnJvbSBEb3dubG9hZCB0YWJcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLm5kclNlcnZpY2UubGlzdEZpbGVzKCkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsZXMgPSByZXM7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gbXNnLmJvZHk7XG4gICAgICAgICAgICAgICAgdGhpcy5ydW5uaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBzZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmFjaWxpdGllcy5maWx0ZXIoZiA9PiBmLnNlbGVjdGVkKS5sZW5ndGggPiAwXG4gICAgfVxuXG4gICAgZG93bmxvYWQobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMubmRyU2VydmljZS5kb3dubG9hZChuYW1lKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBuZXcgRmlsZShbcmVzXSwgbmFtZSArICcuemlwJywge3R5cGU6ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nfSk7XG4gICAgICAgICAgICBzYXZlQXMoZmlsZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHRhYkNoYW5nZWQoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmluZGV4ID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLm5kclNlcnZpY2UubGlzdEZpbGVzKCkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5maWxlcyA9IHJlcztcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb252ZXJ0KCkge1xuICAgICAgICBsZXQgaWRzID0gdGhpcy5mYWNpbGl0aWVzLmZpbHRlcihmID0+IGYuc2VsZWN0ZWQpXG4gICAgICAgICAgICAubWFwKGYgPT4gZi5pZCk7XG4gICAgICAgIHRoaXMubmRyU2VydmljZS5jb252ZXJ0KGlkcykuc3Vic2NyaWJlKClcbiAgICB9XG5cbiAgICBkZWR1cGxpY2F0ZSgpIHtcbiAgICAgICAgdGhpcy5ydW5uaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5uZHJTZXJ2aWNlLmRlZHVwbGljYXRlKCkuc3Vic2NyaWJlKHJlcyA9PiB0aGlzLnJ1bm5pbmcgPSBmYWxzZSlcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50b3BpY1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpXG4gICAgfVxufVxuIl19