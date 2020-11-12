import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CommonModule} from '@angular/common';
import {CovalentChipsModule, CovalentCommonModule, CovalentFileModule} from '@covalent/core';
import {ModuleListComponent} from './components/module.list.component';
import {MatCardModule, MatDividerModule} from '@angular/material';
import {CoreModule} from '@alfresco/adf-core';
import {RouterModule} from '@angular/router';
import {NgJhipsterModule} from 'ng-jhipster';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {ModuleDetailsComponent} from './components/module.details.component';
import {ModuleResolve, ROUTES} from './modules.route';
import {ModuleInstallComponent} from './components/module.install.component';
import {AuthorityService} from './authority.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
        FlexLayoutModule,
        CovalentCommonModule,
        CovalentFileModule,
        MatCardModule,
        MatDividerModule,
        CoreModule,
        RouterModule,
        NgJhipsterModule,
        NgbPaginationModule,
        CovalentChipsModule
    ],
    declarations: [
        ModuleListComponent,
        ModuleDetailsComponent,
        ModuleInstallComponent
    ],
    providers: [
        ModuleResolve,
        AuthorityService
    ]
})
export class ModulesModule {

}
