import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { DockerManagerModule } from './docker-manager/docker-manager.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    DockerManagerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
