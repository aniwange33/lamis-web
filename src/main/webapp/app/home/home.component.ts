import {Component, ComponentFactoryResolver, OnDestroy, OnInit} from '@angular/core';
import {DisplayGrid, GridsterConfig, GridsterItem, GridType} from 'angular-gridster2';
import {RxStompService} from '@stomp/ng2-stompjs';
import {Router} from '@angular/router';
import {LogService} from "@alfresco/adf-core";

export interface Widget extends GridsterItem {
    component: string
}

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
    options: GridsterConfig;
    dashboard: Array<Widget>;
    value: any;

    pattern = '^[0703|0706|0803|0806|0810|0813|0814|0816|0903|0906|0705|0805|0807|0811|0815|0905|0701|0708|0802|0808|0812|0902|0907|0901|0809|0817|0818|0908|0909|07028|07029|0819|07025|07026|0704|07027|0709|0707|0804|0702]\\d{7}$';
    pattern1 = '\\d+';

    change(value?) {
        console.log('Input', this.value)
    }

    constructor(private rxStompService: RxStompService, private router: Router, private cfr: ComponentFactoryResolver,
                private logService: LogService) {
    }

    previewPdf() {
    }

    createFakeBlob(): Blob {
        const pdfData = atob(
            'JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwog' +
            'IC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAv' +
            'TWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0K' +
            'Pj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAg' +
            'L1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+' +
            'PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9u' +
            'dAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2Jq' +
            'Cgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJU' +
            'CjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVu' +
            'ZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4g' +
            'CjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAw' +
            'MDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9v' +
            'dCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G');
        return new Blob([pdfData], {type: 'application/pdf'});
    }

    ngOnInit() {
        this.options = {
            gridType: GridType.Fit,
            displayGrid: DisplayGrid.OnDragAndResize,
            pushItems: true,
            draggable: {
                enabled: true
            },
            resizable: {
                enabled: true
            },
            api: {},
            itemResizeCallback: (item, itemComponent) => {
                console.log('Item resize', itemComponent.gridster)
            },
            itemRemovedCallback: (item, itemComponent) => console.log('Gridster', itemComponent.gridster)
        };

        this.dashboard = [
            {cols: 2, rows: 1, y: 0, x: 0, component: 'x'},
            {cols: 2, rows: 2, y: 0, x: 2, component: 'x'},
            {cols: 1, rows: 1, y: 0, x: 4, component: 'x'},
            {cols: 3, rows: 2, y: 1, x: 4, component: 'y'},
            {cols: 1, rows: 1, y: 4, x: 5, component: 'x'},
            {cols: 1, rows: 1, y: 2, x: 1, component: 'x'},
            {cols: 2, rows: 2, y: 5, x: 5, component: 'y'},
            {cols: 2, rows: 2, y: 3, x: 2, component: 'x'},
            {cols: 2, rows: 1, y: 2, x: 2, component: 'y'},
            {cols: 1, rows: 1, y: 3, x: 4, component: 'y'},
            {cols: 1, rows: 1, y: 0, x: 6, component: 'x'}
        ];
    }

    changedOptions() {
        if (this.options.api && this.options.api.optionsChanged) {
            this.options.api.optionsChanged();
        }
    }

    removeItem($event, item) {
        $event.preventDefault();
        $event.stopPropagation();
        this.dashboard.splice(this.dashboard.indexOf(item), 1);
    }

    addItem() {
        this.dashboard.push({x: 0, y: 0, cols: 1, rows: 1, component: 'x'});
    }

    ngOnDestroy() {
    }

    form = {
        components: [{
            type: 'editgrid',
            label: 'Cars',
            key: 'cars',
            defaultOpen: true,
            removeRow: 'Cancel',
            components: [
                {
                    type: 'select',
                    label: 'Make',
                    key: 'make',
                    placeholder: 'Select your make',
                    dataSrc: 'values',
                    validate: {
                        required: true
                    },
                    data: {
                        values: [
                            {
                                label: 'Chevy',
                                value: 'chevrolet'
                            },
                            {
                                value: 'honda',
                                label: 'Honda'
                            },
                            {
                                label: 'Ford',
                                value: 'ford'
                            },
                            {
                                label: 'Toyota',
                                value: 'toyota'
                            }
                        ]
                    }
                },
                {
                    type: 'select',
                    label: 'Model',
                    key: 'model',
                    placeholder: 'Select your model',
                    dataSrc: 'url',
                    data: {
                        url: 'https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/{{ row.make }}?format=json'
                    },
                    valueProperty: 'Model_Name',
                    template: '<span>{{ item.Model_Name }}</span>',
                    refreshOn: 'make',
                    clearOnRefresh: true,
                    selectValues: 'Results',
                    validate: {
                        required: true
                    }
                }
            ]
        }]
    };
    formId = 'patient-edit';
}
