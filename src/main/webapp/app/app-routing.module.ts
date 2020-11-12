import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {UserRouteAccessService} from '@lamis/web-core';
import {AdminLayoutComponent, AuthLayoutComponent} from '@lamis/egret';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
                    pathMatch: 'full',
                    redirectTo: 'dashboard'
                },
                {
                    path: '',
                    component: AuthLayoutComponent,
                    children: [
                        {
                            path: 'sessions',
                            loadChildren: () => import( './views/sessions/sessions.module').then(m => m.SessionsModule),
                            data: {title: 'Session'}
                        }
                    ]
                },
                {
                    path: '',
                    component: AdminLayoutComponent,
                    children: [
                        {
                            path: 'dashboard',
                            loadChildren: () => import('./home/home.module').then(m => m.LamisHomeModule),
                            data: {
                                title: 'Dashboard',
                                breadcrumb: 'DASHBOARD',
                                authorities: ['ROLE_USER'],
                            },
                            canActivate: [UserRouteAccessService]
                        },
                        {
                            path: 'admin/modules',
                            loadChildren: () => import('./views/module/modules.module').then(m => m.ModulesModule),
                            data: {
                                title: 'Modules',
                                breadcrumb: 'MODULES',
                                authorities: ['ROLE_ADMIN'],
                            },
                            canActivate: [UserRouteAccessService]
                        },
                        {
                            path: 'admin/logs',
                            loadChildren: () => import('./admin/logs/logs.module').then(m => m.LogsModule),
                            data: {
                                title: 'Log Configuration',
                                breadcrumb: 'LOG CONFIGURATION',
                                authorities: ['ROLE_ADMIN']
                            },
                            canActivate: [UserRouteAccessService]
                        },
                        {
                            path: 'admin/metrics',
                            loadChildren: () => import('./admin/metrics/metrics.module').then(m => m.MetricsModule),
                            data: {
                                title: 'Application Metrics',
                                breadcrumb: 'APPLICATION METRICS',
                                authorities: ['ROLE_ADMIN']
                            },
                            canActivate: [UserRouteAccessService]
                        },
                        {
                            path: 'admin/configuration',
                            loadChildren: () => import('./admin/configuration/configuration.module').then(m => m.ConfigurationModule),
                            data: {
                                title: 'System Configuration',
                                breadcrumb: 'SYSTEM CONFIGURATION',
                                authorities: ['ROLE_ADMIN']
                            },
                            canActivate: [UserRouteAccessService]
                        },
                        {
                            path: 'admin/health',
                            loadChildren: () => import('./admin/health/health.module').then(m => m.HealthModule),
                            data: {
                                title: 'Health Checks',
                                breadcrumb: 'HEALTH CHECKS',
                                authorities: ['ROLE_ADMIN']
                            },
                            canActivate: [UserRouteAccessService]
                        },
                    ]
                },
                {
                    path: '**',
                    redirectTo: 'dashboard'
                }
            ],
            {enableTracing: true}
        )
    ],
    exports: [RouterModule]
})
export class LamisAppRoutingModule {
}
