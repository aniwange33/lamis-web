import * as AlfrescoCore from '@alfresco/adf-core';
import {LogService} from '@alfresco/adf-core';
import * as Animations from '@angular/animations';
import * as AngularCommon from '@angular/common';
import * as AngularHttp from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import * as AngularCore from '@angular/core';
import {Compiler, Injectable} from '@angular/core';
import * as DatePickerCore from '@mat-datetimepicker/core';
import * as FlexLayout from '@angular/flex-layout';
import * as Material from '@angular/material';
import * as MaterialTable from '@angular/material/table';
import * as PlatformBrowser from '@angular/platform-browser';
import * as AngularRouter from '@angular/router';
import * as CovalentCore from '@covalent/core';
import * as Lamis from '@lamis/web-core';
import * as NgBootstrap from '@ng-bootstrap/ng-bootstrap';
import * as RxStomp from '@stomp/ng2-stompjs';
import * as FileSaver from 'file-saver';
import * as NgxCharts from '@swimlane/ngx-charts';
import * as AngularFormIO from 'angular-formio';
import * as Jhiptser from 'ng-jhipster';
import * as NgStore from 'ngx-store';
import * as NgxMask from 'ngx-mask';
import * as RxJs from 'rxjs';
import * as Operators from 'rxjs/operators';
import * as Stomp from 'webstomp-client';
import * as Forms from '@angular/forms';
import * as MaterialFormIO from 'angular-material-formio';
import * as FormIO from 'formiojs';
import * as NgxDataTable from '@swimlane/ngx-datatable';
import * as CustomFormsModule from 'ng2-validation';
import * as SyncFusionCalendars from '@syncfusion/ej2-angular-calendars';
import * as SyncFusionDropDowns from '@syncfusion/ej2-angular-dropdowns';
import {Module, WebModule} from './module.model';

// Needed for the new modules
declare const SystemJS: any;

const realFetch = window.fetch;

@Injectable({
    providedIn: 'root'
})
export class ModuleImportService {
    source = `http://${window.location.host}/`;

    constructor(private compiler: Compiler, private http: HttpClient, private logService: LogService) {
        ModuleImportService.setup();
    }

    private static setup() {

        SystemJS.set('angular-material-formio', SystemJS.newModule(MaterialFormIO));
        SystemJS.set('ng2-validation', SystemJS.newModule(CustomFormsModule));
        SystemJS.set('@angular/material/table', SystemJS.newModule(MaterialTable));
        SystemJS.set('@swimlane/ngx-datatable', SystemJS.newModule(NgxDataTable));
        SystemJS.set('@syncfusion/ej2-angular-calendars', SystemJS.newModule(SyncFusionCalendars));
        SystemJS.set('@syncfusion/ej2-angular-dropdowns', SystemJS.newModule(SyncFusionDropDowns));
        SystemJS.set('formiojs', SystemJS.newModule(FormIO));
        SystemJS.set('@alfresco/adf-core', SystemJS.newModule(AlfrescoCore));
        SystemJS.set('@mat-datetimepicker/core', SystemJS.newModule(DatePickerCore));
        SystemJS.set('@swimlane/ngx-charts', SystemJS.newModule(NgxCharts));
        SystemJS.set('@angular/animations', SystemJS.newModule(Animations));
        SystemJS.set('@angular/common', SystemJS.newModule(AngularCommon));
        SystemJS.set('@angular/core', SystemJS.newModule(AngularCore));
        SystemJS.set('@angular/common/http', SystemJS.newModule(AngularHttp));
        SystemJS.set('@angular/flex-layout', SystemJS.newModule(FlexLayout));
        SystemJS.set('@angular/material', SystemJS.newModule(Material));
        SystemJS.set('@angular/platform-browser', SystemJS.newModule(PlatformBrowser));
        SystemJS.set('@angular/router', SystemJS.newModule(AngularRouter));
        SystemJS.set('@covalent/core', SystemJS.newModule(CovalentCore));
        SystemJS.set('@lamis/web-core', SystemJS.newModule(Lamis));
        SystemJS.set('@ng-bootstrap/ng-bootstrap', SystemJS.newModule(NgBootstrap));
        SystemJS.set('@stomp/ng2-stompjs', SystemJS.newModule(RxStomp));
        SystemJS.set('angular-formio', SystemJS.newModule(AngularFormIO));
        SystemJS.set('ng-jhipster', SystemJS.newModule(Jhiptser));
        SystemJS.set('ngx-store', SystemJS.newModule(NgStore));
        SystemJS.set('ngx-mask', SystemJS.newModule(NgxMask));
        SystemJS.set('rxjs', SystemJS.newModule(RxJs));
        SystemJS.set('@angular/forms', SystemJS.newModule(Forms));
        SystemJS.set('rxjs/operators', SystemJS.newModule(Operators));
        SystemJS.set('webstomp-client', SystemJS.newModule(Stomp));
        SystemJS.set('file-saver', SystemJS.newModule(FileSaver));
    }

    loadModuleSystemJS(moduleInfo: Module): Promise<any[]> {
        let umdLocation = moduleInfo.umdLocation.replace('//', '/');
        if (umdLocation.startsWith('/')) {
            umdLocation = umdLocation.substring(1);
        }
        const url = this.source + umdLocation;
        const config = {
            paths: {
                'npm:': '/node_modules/',
            },
            map: {
                app: 'dist/app',
                'moment': 'moment.min.js',
                'moment-es6': 'moment-es6.js'
            }
        };

        Object.entries(JSON.parse(moduleInfo.moduleMap || '{}')).forEach((v: any) => {
            config.map[v[0]] = v[1];
        });

        SystemJS.config(config);

        // now, import the new module
        return SystemJS.import(`${url}`).then((module) => {
            const promises = [];
            try {
                moduleInfo.webModules.forEach((webModule: WebModule) => {
                    promises.push(
                        Promise.resolve({
                            module: webModule,
                            factory: this.compiler.compileModuleAndAllComponentsAsync(module[`${webModule.name}`])
                                .then(compiled => {
                                    return compiled;
                                }, (error) => this.logService.error('Error', error))
                        })
                    );
                });
            } catch (err) {
                this.logService.error('Error', err)
            }
            return Promise.all(promises);
        }, (error) => this.logService.error('Error', error));
    }
}
