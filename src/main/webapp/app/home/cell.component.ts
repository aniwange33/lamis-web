import {Component, ComponentFactoryResolver, Input, OnInit, ViewContainerRef} from "@angular/core";
import {XComponent} from "app/home/x.component";
import {YComponent} from "app/home/y.component";

@Component({
    selector: 'grid-cell',
    template: ''
})
export class CellComponent implements OnInit {
    @Input() widgetType: string;


    constructor(private viewContainerRef: ViewContainerRef,
                private cfr: ComponentFactoryResolver) {
    }

    ngOnInit() {
        /*
         create component instance dynamically
         */
        const component: any = this.widgetType === 'x' ? XComponent : YComponent;
        let compFactory: any = {};
        let widgetRef: any = {};

        if (component) {
            compFactory = this.cfr.resolveComponentFactory(component);
            widgetRef = this.viewContainerRef.createComponent(compFactory);
        }
    }
}
