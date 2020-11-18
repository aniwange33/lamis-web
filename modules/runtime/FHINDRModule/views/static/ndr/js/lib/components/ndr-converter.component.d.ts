import { OnDestroy, OnInit } from '@angular/core';
import { NdrConverterService } from "../services/ndr-converter.service";
import { RxStompService } from "@stomp/ng2-stompjs";
import { DomSanitizer } from "@angular/platform-browser";
export interface Facility {
    id: number;
    name: string;
    selected: boolean;
}
export declare class NdrConverterComponent implements OnInit, OnDestroy {
    private ndrService;
    private stompService;
    private domSanitizer;
    private topicSubscription;
    facilities: Facility[];
    files: string[];
    running: boolean;
    message: any;
    finished: boolean;
    constructor(ndrService: NdrConverterService, stompService: RxStompService, domSanitizer: DomSanitizer);
    ngOnInit(): void;
    selected(): boolean;
    download(name: string): void;
    tabChanged(event: any): void;
    convert(): void;
    deduplicate(): void;
    ngOnDestroy(): void;
}
