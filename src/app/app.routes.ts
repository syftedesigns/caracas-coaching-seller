import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PagesComponent } from './components/pages.component';


const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        loadChildren: () => import('./components/pages.module').then(m => m.PagesModule)
    },

];

export const APP_ROUTES = RouterModule.forRoot(routes, {
    useHash: false,
    preloadingStrategy: PreloadAllModules
});
