import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { VentasComponent } from './ventas/ventas.component';


const routes: Routes = [
    { path: '', component: VentasComponent },
    { path: '', pathMatch: 'full', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
