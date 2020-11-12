import {OnInit} from '@angular/core';
import {FacilityService} from '../services/facility.service';
import {NotificationService} from '@alfresco/adf-core';

export declare class FacilityComponent implements OnInit {
    private facilityService;
    private notification;
    states: any[];
    lgas: any[];
    facilities: any[];
    active: any;
    facility: any;

    constructor(facilityService: FacilityService, notification: NotificationService);

    ngOnInit(): void;

    entityCompare(e1: any, e2: any): boolean;

    stateChanged(id: any): void;

    lgaChanged(id: any): void;

    setActive(): void;
}
