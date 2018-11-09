import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { HttpCustomInterceptor } from './http-custom-Interceptor';
import { LoaderComponent } from './loader.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    LoaderComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  exports: [
    AppRoutingModule,
    HttpClientModule,
    LoaderComponent
  ],
  providers: [
    ToastrService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpCustomInterceptor, multi: true }
  ]
})
export class CoreModule { }
