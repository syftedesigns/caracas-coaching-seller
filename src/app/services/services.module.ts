import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from '../angular-material.module';
import { WpService } from './wordpress/wp.service';
import { GlobalService } from './global/global.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    AngularMaterialModule
  ],
  providers: [
    WpService,
    GlobalService
  ]
})
export class ServicesModule { }
