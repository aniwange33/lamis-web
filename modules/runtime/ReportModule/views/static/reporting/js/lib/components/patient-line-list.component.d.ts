import {OnDestroy, OnInit} from '@angular/core';
import {Facility} from './art-summary.component';
import {ReportService} from '../services/report.service';
import {RxStompService} from '@stomp/ng2-stompjs';
import * as moment_ from 'moment';

export declare class PatientLineListComponent implements OnInit, OnDestroy {
    private service;
    private stompService;
    params: {
        [key: string]: any;
    };
    states: any[];
    regimenTypes: any[];
    lgas: any[];
    private topicSubscription;
    facility: Facility;
    running: boolean;
    finished: boolean;
    today: moment_.Moment;
    message: any;

    constructor(service: ReportService, stompService: RxStompService);

    ngOnInit(): void;

    stateChanged(state: any): void;

    convert(): void;

    ngOnDestroy(): void;
}
