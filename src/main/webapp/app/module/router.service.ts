import {WebModule} from './module.model';
import {Route, Router} from '@angular/router';
import {Injectable, Injector, ModuleWithComponentFactories} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RouterService {
    router: Router;

    constructor(private injector: Injector) {
    }

    createAndRegisterRoute(module: WebModule, exports: ModuleWithComponentFactories<any>): Promise<any> {
        this.router = this.injector.get(Router);
        const route: Route = {
            path: module.path.replace('//', '/'),
            data: {
                title: module.title,
                breadcrumb: module.breadcrumb,
                authorities: module.authorities
            },
            loadChildren: () => exports.ngModuleFactory
        };
        return this.registerRoute(route);
    }

    routeIsRegistered(path: string) {
        return this.router.config.filter(r => r.path === path).length > 0;
    }

    registerRoute(route: Route): Promise<any> {
        if (this.routeIsRegistered(route.path)) {
            return Promise.resolve(true);
        }
        this.router.config[2].children.push(route);
        this.updateRouteConfig(this.router.config);
        return Promise.resolve(true);
    }

    private updateRouteConfig(config) {
        this.router.resetConfig(config);
    }
}
