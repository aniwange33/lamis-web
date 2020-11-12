import {DatePipe} from '@angular/common';
import {ElementRef, NgModule, Renderer} from '@angular/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiDataUtils, JhiDateUtils, JhiParseLinks} from 'ng-jhipster';

@NgModule({
    providers: [
        DatePipe,
        JhiDataUtils,
        JhiDateUtils,
        JhiParseLinks,
        {
            provide: ElementRef,
            useValue: null
        },
        {
            provide: Renderer,
            useValue: null
        },
        {
            provide: JhiAlertService,
            useValue: null
        },
        {
            provide: NgbModal,
            useValue: null
        }
    ],
    imports: [HttpClientTestingModule]
})
export class LamisTestModule {
}
