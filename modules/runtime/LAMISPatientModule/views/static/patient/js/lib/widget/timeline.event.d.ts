import {OnInit} from '@angular/core';
import {TimelineWidget} from './timeline.widget';

export declare class TimelineEvent implements OnInit {
    private parent;
    oddClass: any;
    evenClass: any;
    _side: string;
    side: string;

    constructor(parent: TimelineWidget);

    ngOnInit(): void;

    checkClass(side: any, leftSide: any): string;

    updateRowClasses(value: any): void;
}
