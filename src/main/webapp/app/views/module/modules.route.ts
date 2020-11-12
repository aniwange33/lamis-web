import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot, Routes} from '@angular/router';
import {ModuleListComponent} from './components/module.list.component';
import {UserRouteAccessService} from '@lamis/web-core';
import {ModuleDetailsComponent} from './components/module.details.component';
import {EMPTY, Observable, of} from 'rxjs';
import {Module} from '../../module'
import {ModuleService} from '../../module/module.service';
import {ModuleInstallComponent} from './components/module.install.component';
import {Injectable} from '@angular/core';
import {catchError, mergeMap} from "rxjs/operators";
import {HttpResponse} from '@angular/common/http';

@Injectable()
export class ModuleResolve implements Resolve<Module> {
    constructor(private service: ModuleService, private router: Router) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Module> {
        const id = route.params['id'] ? route.params['id'] : null;
        return this.service.getModule(id).pipe(
            catchError((err) => {
                this.router.navigateByUrl('/admin/modules');
                return EMPTY;
            }),
            mergeMap((res: HttpResponse<Module>) => {
                return of(res.body);
            })
        );
    }
}

export const ROUTES: Routes = [
    {
        path: '',
        data: {
            title: 'Modules',
            breadcrumb: 'MODULES',
            authorities: ['ROLE_ADMIN'],
        },
        canActivate: [UserRouteAccessService],
        children: [
            {
                path: '',
                component: ModuleListComponent,
                data: {
                    breadcrumb: 'MODULES',
                    title: 'Modules',
                }
            },
            {
                path: ':id/view',
                component: ModuleDetailsComponent,
                resolve: {
                    entity: ModuleResolve
                },
                data: {
                    authorities: ['ROLE_ADMIN'],
                    title: 'Module Details',
                    breadcrumb: 'MODULE DETAILS'
                },
                canActivate: [UserRouteAccessService]
            },
            {
                path: ':id/update',
                component: ModuleInstallComponent,
                resolve: {
                    entity: ModuleResolve
                },
                data: {
                    authorities: ['ROLE_ADMIN'],
                    title: 'UpdateModule',
                    breadcrumb: 'UPDATE MODULE',
                    update: true
                },
                canActivate: [UserRouteAccessService]
            },
            {
                path: 'install',
                component: ModuleInstallComponent,
                data: {
                    authorities: ['ROLE_ADMIN'],
                    title: 'Install Module',
                    breadcrumb: 'INSTALL MODULE'
                },
                canActivate: [UserRouteAccessService]
            }
        ]
    }
];
