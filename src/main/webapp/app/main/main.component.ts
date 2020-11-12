import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {RxStompService} from '@stomp/ng2-stompjs';

@Component({
    selector: 'jhi-main',
    template: `
        <router-outlet></router-outlet>
    `
})
export class MainComponent implements OnInit, OnDestroy {
    moduleSubscription: Subscription;

    constructor(private rxStompService: RxStompService) {
    }

    ngOnDestroy(): void {
        this.moduleSubscription.unsubscribe()
    }

    ngOnInit(): void {
        this.moduleSubscription = this.rxStompService.watch('/topic/modules-changed')
            .subscribe(res => {
                window.location.reload();
            });
    }

}
