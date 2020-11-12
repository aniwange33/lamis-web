import {Component, OnInit} from '@angular/core';
import {
    CardViewBoolItemModel,
    CardViewDatetimeItemModel,
    CardViewItem,
    CardViewTextItemModel,
    NotificationService
} from '@alfresco/adf-core';
import {Module, ModuleService, WebModule} from '../../../module';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthorityService} from '../authority.service';
import {AppLoaderService} from '@lamis/web-core';

@Component({
    selector: 'lamis-module-details',
    templateUrl: './module.details.component.html'
})
export class ModuleDetailsComponent implements OnInit {
    properties: Array<CardViewItem> = [];
    module: Module;
    webModules: WebModule[];

    constructor(private authService: AuthorityService, private route: ActivatedRoute,
                private moduleService: ModuleService, private router: Router,
                private notification: NotificationService, private loaderService: AppLoaderService) {
    }

    ngOnInit(): void {
        this.route.data.subscribe(({entity}) => {
            this.module = !!entity && entity.body ? entity.body : entity;
            // this.moduleService.getWebModules(this.module.id).subscribe((res) => this.webModules = res.body);
            this.buildProperties();
        });
    }

    private buildProperties() {
        this.properties = [];
        this.properties.push(new CardViewTextItemModel({
            label: 'Description',
            key: 'desc',
            value: this.module.description
        }));
        this.properties.push(new CardViewBoolItemModel({
            label: 'Active',
            key: 'active',
            value: this.module.active
        }));
        const version = new CardViewTextItemModel({
            label: 'Version',
            value: this.module.version,
            key: 'version',
        });
        this.properties.push(version);
        this.properties.push(new CardViewDatetimeItemModel({
            key: 'bt',
            label: 'Build Time',
            value: this.module.buildTime,
            format: 'DD MMM YYYY HH:MM'
        }));
        const basePackage = new CardViewTextItemModel({
            label: 'Base Package',
            value: this.module.basePackage,
            key: 'bp',
        });
        this.properties.push(basePackage);
        const artifact = new CardViewTextItemModel({
            label: 'Artifact',
            value: this.module.artifact,
            key: 'artifact',
        });
        this.properties.push(artifact);
    }

    getRoles(module: WebModule): string[] {
        const roles: string[] = [];
        module.authorities.forEach(auth => {
            this.authService.roleName(auth).subscribe((res) => roles.push(res))
        });
        return roles;
    }

    activate() {
        this.loaderService.open('Activating module: please wait..');
        this.moduleService.activateModule(this.module).subscribe((res) => {
                this.module = res.body.module;
                this.buildProperties();
                this.notification.showInfo('Module successfully activated');
            },
            (err: any) => {
                this.loaderService.close();
                this.notification.showError('Could not activate module');
            }
        )
    }

    deactivate() {
        this.loaderService.open('Deactivating module: please wait...');
        this.moduleService.deactivateModule(this.module).subscribe((res) => {
                this.loaderService.close();
                this.module = res.body.module;
                this.buildProperties();
                this.notification.showInfo('Module successfully deactivated');
            },
            (err: any) => {
                this.loaderService.close();
                this.notification.showError('Could not deactivate module');
            }
        )
    }

    update() {
        this.router.navigate(['..', 'update'], {relativeTo: this.route})
    }

    uninstall() {
        this.loaderService.open('Uninstalling module: please wait...');
        this.moduleService.deleteModule(this.module).subscribe((res) => {
                //this.loaderService.close();
                this.router.navigate(['..', '..'], {relativeTo: this.route})
            },
            (err: any) => {
                this.loaderService.close();
                this.notification.showError('Could not uninstall module');
            })
    }

}
