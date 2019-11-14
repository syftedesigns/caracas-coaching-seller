import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';
import { RouterModule } from '@angular/router';
import { VentasComponent } from './ventas/ventas.component';
import { PagesRoutingModule } from './pages.routes';



@NgModule({
  declarations: [
    VentasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule,
    RouterModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
