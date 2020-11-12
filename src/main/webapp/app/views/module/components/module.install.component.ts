import {Component, OnInit} from '@angular/core';
import {Module, ModuleService} from '../../../module';
import {CardViewItem, CardViewTextItemModel, NotificationService} from '@alfresco/adf-core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppLoaderService} from '@lamis/web-core';

@Component({
    selector: 'lamis-module-install',
    templateUrl: './module.install.component.html'
})
export class ModuleInstallComponent implements OnInit {
    files: File | FileList;
    properties: Array<CardViewItem> = [];
    module: Module;
    update = false;

    constructor(private moduleService: ModuleService, private notification: NotificationService,
                private router: Router, private loaderService: AppLoaderService, private route: ActivatedRoute) {

    }

    ngOnInit(): void {
        this.update = !!this.route.snapshot.data['update'];
    }

    selectEvent(files: File): void {
    }

    uploadEvent(file: File): void {
        this.module = null;
        const formData = new FormData();
        formData.append('file', file);
        this.loaderService.open('Uploading module: please wait...');
        this.moduleService.uploadModule(formData)
            .subscribe((res) => {
                    this.loaderService.close();
                    if (res.ok) {
                        this.module = res.body;
                        this.properties = [];
                        const name = new CardViewTextItemModel({
                            label: 'Name',
                            value: this.module.name,
                            key: 'name',
                        });
                        this.properties.push(name);
                        const version = new CardViewTextItemModel({
                            label: 'Version',
                            value: this.module.version,
                            key: 'version',
                        });
                        this.properties.push(version);
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
                    } else {
                        this.notification.showError('Module upload failed')
                    }
                },
                (error => this.notification.showError('Module upload failed: ' + error.text)));
    }

    install() {
        this.loaderService.open('Installing module: please wait...');
        if (this.update) {
            this.moduleService.updateModule(this.module).subscribe((res) => {
                    this.loaderService.close();
                    if (res.body && res.body.type === 'ERROR') {
                        this.notification.showError(res.body.message)
                    }
                    if (res.body && res.body.type === 'SUCCESS') {
                        this.notification.showInfo(res.body.message)
                    }
                    if (res.body.module) {
                        this.router.navigate(['..', '..'], {relativeTo: this.route});
                    }
                },
                (err: any) => {
                    this.loaderService.close();
                    this.notification.showError('Could not install module: ' + err.text);
                }
            );
        } else {
            this.moduleService.installModule(this.module).subscribe((res) => {
                    this.loaderService.close();
                    if (res.body && res.body.type === 'ERROR') {
                        this.notification.showError(res.body.message)
                    }
                    if (res.body && res.body.type === 'SUCCESS') {
                        this.notification.showInfo(res.body.message)
                    }
                    if (res.body.module) {
                        this.router.navigate(['..', res.body.module.id, 'view']);
                    }
                },
                (err: any) => {
                    this.loaderService.close();
                    this.notification.showError('Could not install module: ' + err.text);
                }
            );
        }
    }

    cancelEvent(): void {
        this.files = undefined
    }
}
