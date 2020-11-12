import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {XComponent} from './x.component';
import {YComponent} from './y.component';
import {JsonFormModule, LamisSharedModule, MatDateFormatModule} from '@lamis/web-core';
import {HOME_ROUTE} from './home.route';
import {HomeComponent} from './home.component';
import {MaterialModule} from 'app/material.module';
import {GridsterModule} from 'angular-gridster2';
import {CoreModule} from '@alfresco/adf-core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CellComponent} from './cell.component';
import {FormioModule} from 'angular-formio';
import {DropDownListModule} from '@syncfusion/ej2-angular-dropdowns';
import {DateRangePickerModule} from '@syncfusion/ej2-angular-calendars';
import {NgxMaskModule} from 'ngx-mask';
import {CustomFormsModule} from 'ng2-validation';
import {FormsModule} from '@angular/forms';
import {PhoneNumberValidator} from 'app/home/phone.number.validator';

@NgModule({
    imports: [
        CommonModule,
        LamisSharedModule,
        RouterModule.forChild([HOME_ROUTE]),
        GridsterModule,
        MaterialModule,
        CoreModule,
        MatDateFormatModule,
        FlexLayoutModule,
        FormioModule,
        JsonFormModule,
        DateRangePickerModule,
        DropDownListModule,
        NgxMaskModule.forChild(),
        CustomFormsModule,
        FormsModule
    ],
    declarations: [HomeComponent, XComponent, YComponent, CellComponent, PhoneNumberValidator],
    entryComponents: [XComponent, YComponent],
    providers: []
})
export class LamisHomeModule {
}
