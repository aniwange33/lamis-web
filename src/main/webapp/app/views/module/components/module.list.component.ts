import {Component, OnInit} from '@angular/core';
import {Module} from '../../../module/module.model';
import {ModuleService} from '../../../module/module.service';
import {CardViewBoolItemModel, CardViewItem, CardViewTextItemModel} from "@alfresco/adf-core";
import {CardViewTextContentItemModel} from '@lamis/web-core';

@Component({
    selector: 'lamis-module-list',
    templateUrl: './module.list.component.html',
    styleUrls: ['./module.list.component.scss']
})
export class ModuleListComponent implements OnInit {
    modules: Module[] = [];

    constructor(private moduleService: ModuleService) {
    }

    ngOnInit(): void {
        this.moduleService.getInstalledModules().subscribe((res) => {
            this.modules = res.body.sort((m1, m2) => m1.name.localeCompare(m2.name))
        })
    }

    getProperties(module: Module): Array<CardViewItem> {
        const properties = [];
        const description = new CardViewTextContentItemModel({
            label: 'Description',
            value: module.description,
            key: 'desc',
        });
        properties.push(description);
        const active = new CardViewBoolItemModel({
            label: 'Active',
            value: module.active,
            key: 'active',
        });
        properties.push(active);
        const version = new CardViewTextItemModel({
            label: 'version',
            value: module.version,
            key: 'version',
        });
        properties.push(version);
        return properties;
    }

}
