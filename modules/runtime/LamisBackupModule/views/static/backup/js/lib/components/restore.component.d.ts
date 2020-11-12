import {OnDestroy, OnInit} from "@angular/core";
import {BackupService} from "../services/backup.service";
import {RxStompService} from "@stomp/ng2-stompjs";
import {AppLoaderService} from "@lamis/web-core";
import {Subscription} from "rxjs";

export declare class RestoreComponent implements OnInit, OnDestroy {
    private backupService;
    private stompService;
    private loaderService;
    files: any;
    submitted: boolean;
    running: boolean;
    available: boolean;
    status: any;
    topicSubscription: Subscription;
    errorSubscription: Subscription;

    constructor(backupService: BackupService, stompService: RxStompService, loaderService: AppLoaderService);

    ngOnDestroy(): void;

    ngOnInit(): void;

    upload(): void;

    restore(): void;

    revert(): void;
}
