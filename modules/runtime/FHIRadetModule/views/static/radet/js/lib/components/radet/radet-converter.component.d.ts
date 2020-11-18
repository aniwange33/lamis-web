import { OnDestroy, OnInit } from '@angular/core';
import { RadetConverterService } from "../../services/radet-converter.service";
import { RxStompService } from "@stomp/ng2-stompjs";
import { DomSanitizer } from "@angular/platform-browser";
import { DateRange } from '@syncfusion/ej2-calendars';
export interface Facility {
    id: number;
    name: string;
    selected: boolean;
}
export declare class RadetConverterComponent implements OnInit, OnDestroy {
    private service;
    private stompService;
    private domSanitizer;
    private topicSubscription;
    facilities: Facility[];
    files: string[];
    running: boolean;
    message: any;
    finished: boolean;
    dateRange: DateRange;
    reportingPeriod: Date;
    todaySelectable: boolean;
    today: Date;
    current: boolean;
    constructor(service: RadetConverterService, stompService: RxStompService, domSanitizer: DomSanitizer);
    ngOnInit(): void;
    selected(): boolean;
    download(name: string): void;
    tabChanged(event: any): void;
    monthChanged(month: Date): void;
    convert(): void;
    ngOnDestroy(): void;
}
