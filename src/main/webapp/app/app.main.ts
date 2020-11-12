import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {LamisAppModule} from './app.module';

if (module['hot']) {
    module['hot'].accept();
}

platformBrowserDynamic()
    .bootstrapModule(LamisAppModule, {preserveWhitespaces: true})
    // eslint-disable-next-line no-console
    .then(success => console.log('Application started'))
    .catch(err => console.error(err));
