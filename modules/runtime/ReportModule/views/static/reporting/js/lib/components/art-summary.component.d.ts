import {OnDestroy, OnInit} from '@angular/core';
import {ReportService} from '../services/report.service';
import {RxStompService} from '@stomp/ng2-stompjs';
import {DomSanitizer} from '@angular/platform-browser';

export interface Facility {
    id: number;
    name: string;
    selected: boolean;
}

export declare class ArtSummaryComponent implements OnInit, OnDestroy {
    private service;
    private stompService;
    private domSanitizer;
    private topicSubscription;
    facility: Facility;
    files: string[];
    running: boolean;
    message: any;
    finished: boolean;
    reportingPeriod: Date;
    today: Date;
    todaySelectable: boolean;
    current: boolean;

    constructor(service: ReportService, stompService: RxStompService, domSanitizer: DomSanitizer);

    ngOnInit(): void;

    download(name: string): void;

    tabChanged(event: any): void;

    monthChanged(month: Date): void;

    convert(): void;

    ngOnDestroy(): void;
}
