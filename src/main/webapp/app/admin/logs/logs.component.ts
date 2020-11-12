import {Component, OnInit} from '@angular/core';

import {Log} from './log.model';
import {LogsService} from './logs.service';

@Component({
    selector: 'lamis-logs',
    templateUrl: './logs.component.html',
    styleUrls: ['./logs.scss']
})
export class LogsComponent implements OnInit {
    loggers: Log[];
    filter: string;
    orderProp: string;
    reverse: boolean;

    constructor(private logsService: LogsService) {
        this.filter = '';
        this.orderProp = 'name';
        this.reverse = false;
    }

    ngOnInit() {
        this.logsService.findAll().subscribe(response => (this.loggers = response.body));
    }

    changeLevel(name: string, level: string) {
        const log = new Log(name, level);
        this.logsService.changeLevel(log).subscribe(() => {
            this.logsService.findAll().subscribe(response => (this.loggers = response.body));
        });
    }
}
