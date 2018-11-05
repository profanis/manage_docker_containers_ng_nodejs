import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [],
  imports: [
    AppRoutingModule,
    HttpClientModule
  ],
  exports: [
    AppRoutingModule,
    HttpClientModule
  ]
})
export class CoreModule { }
