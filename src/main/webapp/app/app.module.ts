import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {APP_INITIALIZER, Compiler, COMPILER_OPTIONS, CompilerFactory, NgModule} from '@angular/core';
import {BrowserModule, HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';

import './vendor';
import {
    AuthExpiredInterceptor,
    AuthInterceptor,
    ErrorHandlerInterceptor,
    LamisCoreModule,
    NotificationInterceptor
} from '@lamis/web-core';
import {MainComponent} from './main/main.component';
import {
    PERFECT_SCROLLBAR_CONFIG,
    PerfectScrollbarConfigInterface,
    PerfectScrollbarModule
} from 'ngx-perfect-scrollbar';
import {ModuleLoaderService} from './module';
import {JitCompilerFactory} from '@angular/platform-browser-dynamic';
import {GestureConfig} from '@angular/material';
import {CoreModule, TranslateLoaderService} from '@alfresco/adf-core';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LocalStorageService, SessionStorageService, WebStorageModule} from 'ngx-store';
import {SERVER_API_URL} from 'app/app.constants';
import {LamisAppRoutingModule} from 'app/app-routing.module';
import {EgretModule} from '@lamis/egret';
import {NgxMaskModule} from 'ngx-mask';

// AoT requires an exported function for factories
export function createCompiler(compilerFactory: CompilerFactory) {
    return compilerFactory.createCompiler();
}

export function loadModules(moduleLoaderService: ModuleLoaderService): Function {
    return () => moduleLoaderService.registerModules();
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CoreModule.forRoot(),
        EgretModule,
        TranslateModule.forRoot({
            loader: {provide: TranslateLoader, useClass: TranslateLoaderService}
        }),
        LamisCoreModule.forRoot({SERVER_API_URL: SERVER_API_URL || ''}),
        WebStorageModule,
        PerfectScrollbarModule,
        LamisAppRoutingModule,
        NgxMaskModule.forRoot()
    ],
    declarations: [MainComponent],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true
        },
        {provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig},
        {provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG},
        {
            provide: APP_INITIALIZER,
            multi: true,
            useFactory: loadModules,
            deps: [ModuleLoaderService]
        },
        {provide: COMPILER_OPTIONS, useValue: {}, multi: true},
        {provide: CompilerFactory, useClass: JitCompilerFactory, deps: [COMPILER_OPTIONS]},
        {provide: Compiler, useFactory: createCompiler, deps: [CompilerFactory]}
    ],
    bootstrap: [MainComponent]
})
export class LamisAppModule {
    constructor(private localStorage: LocalStorageService, private sessionStorage: SessionStorageService) {
        /*let token = this.localStorage.get('authenticationToken') || this.sessionStorage.get('authenticationToken') || '';
        fetchIntercept.register({
            request: function (url, config) {
                config['headers']['Authorization'] = 'Bearer ' + token;
                return [url, config];
            }
        });*/
    }
}
