import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { DockerManagerContainerComponent } from './docker-manager-container/docker-manager-container.component';

const routes: Routes = [
  {path: 'docker-manager', component: DockerManagerContainerComponent}
];

@NgModule({
  declarations: [DockerManagerContainerComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DockerManagerModule { }
