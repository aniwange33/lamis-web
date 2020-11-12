import {CoreModule} from '@alfresco/adf-core';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CovalentChipsModule, CovalentCommonModule, CovalentMessageModule, CovalentSearchModule} from '@covalent/core';
import {MaterialModule} from 'app/material.module';

@NgModule({
    imports: [
        MaterialModule,
        FlexLayoutModule,
        CoreModule,
        CovalentCommonModule,
        CovalentChipsModule,
        CovalentMessageModule,
        CovalentSearchModule,
    ],
    exports: [
        MaterialModule,
        FlexLayoutModule,
        CoreModule,
        CovalentCommonModule,
        CovalentChipsModule,
        CovalentMessageModule,
        CovalentSearchModule,
    ]
})
export class CommonComponentModule {

}
