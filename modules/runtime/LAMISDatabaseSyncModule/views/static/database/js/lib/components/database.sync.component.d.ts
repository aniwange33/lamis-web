import {OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {RxStompService} from "@stomp/ng2-stompjs";
import {CardViewItem} from '@alfresco/adf-core';

export declare class DatabaseSyncComponent implements OnInit, OnDestroy {
    private stompService;
    syncing: boolean;
    tables: string;
    statusSubscription: Subscription;
    tableSubscription: Subscription;
    syncSubscription: Subscription;
    properties: CardViewItem[];
    statusProperties: CardViewItem[];

    constructor(stompService: RxStompService);

    ngOnInit(): void;

    ngOnDestroy(): void;

    sync(): void;

    previousState(): void;
}
