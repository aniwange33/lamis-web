import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {HealthModalComponent} from './health-modal.component';

import {HealthService} from './health.service';

@Component({
    selector: 'lamis-health',
    templateUrl: './health.component.html'
})
export class HealthCheckComponent implements OnInit {
    healthData: any;
    updatingHealth: boolean;

    constructor(private dialog: MatDialog, private healthService: HealthService) {
    }

    ngOnInit() {
        this.refresh();
    }

    baseName(name: string) {
        return this.healthService.getBaseName(name);
    }

    getBadgeClass(statusState) {
        if (statusState === 'UP') {
            return 'badge-success';
        } else {
            return 'badge-danger';
        }
    }

    refresh() {
        this.updatingHealth = true;

        this.healthService.checkHealth().subscribe(
            health => {
                this.healthData = this.healthService.transformHealthData(health);
                this.updatingHealth = false;
            },
            error => {
                if (error.status === 503) {
                    this.healthData = this.healthService.transformHealthData(error.error);
                    this.updatingHealth = false;
                }
            }
        );
    }

    showHealth(health: any) {
        console.log('Open dialog', health);
        this.dialog.open(HealthModalComponent, {
            data: {currentHealth: health}
        });
    }

    subSystemName(name: string) {
        return this.healthService.getSubSystemName(name);
    }
}
