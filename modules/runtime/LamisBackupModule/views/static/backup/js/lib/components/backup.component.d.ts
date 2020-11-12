import {OnDestroy, OnInit} from '@angular/core';
import {BackupService} from "../services/backup.service";
import {RxStompService} from "@stomp/ng2-stompjs";

export interface Facility {
    id: number;
    name: string;
    selected: boolean;
}

export declare class BackupComponent implements OnInit, OnDestroy {
    private backupService;
    private stompService;
    private topicSubscription;
    private errorSubscription;
    running: boolean;
    available: boolean;
    status: any;
    finished: boolean;

    constructor(backupService: BackupService, stompService: RxStompService);

    ngOnInit(): void;

    backup(): void;

    download(): void;

    ngOnDestroy(): void;
}
