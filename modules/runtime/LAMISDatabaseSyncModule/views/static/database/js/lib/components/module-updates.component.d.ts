import {OnInit} from '@angular/core';
import {CardViewItem} from '@alfresco/adf-core';
import {Module} from '../model/module.model';
import {ModuleUpdateService} from '../services/module.update.service';

export declare class ModuleUpdatesComponent implements OnInit {
    private service;
    modules: Module[];
    isUpdating: boolean;
    installed: boolean;

    constructor(service: ModuleUpdateService);

    ngOnInit(): void;

    getProperties(module: Module): Array<CardViewItem>;

    updateModules(): void;

    previousState(): void;
}
