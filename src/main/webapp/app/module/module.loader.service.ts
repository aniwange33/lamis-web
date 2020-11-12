import {Injectable, Injector} from '@angular/core';
import {Router} from '@angular/router';
import {ModuleService} from './module.service';
import {ModuleImportService} from './module.import.service';
import {RouterService} from './router.service';
import {Module} from './module.model';
import {LogService} from '@alfresco/adf-core';

@Injectable({
    providedIn: 'root'
})
export class ModuleLoaderService {
    router: Router;

    constructor(
        private moduleService: ModuleService,
        private moduleImportService: ModuleImportService,
        private injector: Injector,
        private routerService: RouterService,
        private logService: LogService
    ) {

    }

    registerModules(): Promise<any> {
        const promises = [];
        this.moduleService.getModules().subscribe(res => {
            res.body.forEach((m) => {
                promises.push(this.registerRoute(m));
            })
        });
        return Promise.all(promises);
    }

    private registerRoute(moduleToEnable: Module): Promise<any> {
        // load up the umd file and register the route whenever succeeded.
        const promises = [];
        this.moduleImportService.loadModuleSystemJS(moduleToEnable).then((exports) => {
            exports.forEach((exp: any) => {
                exp.factory.then((mf: any) =>
                    promises.push(this.routerService.createAndRegisterRoute(exp.module, mf))
                );
            });
        }, (err) => {
            this.logService.error(`${moduleToEnable.name} could not be found, did you copy the umd file to ${moduleToEnable.umdLocation}?`, err);
        });
        return Promise.all(promises);
    }
}
