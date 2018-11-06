import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { DockerManagerContainerComponent } from './docker-manager-container/docker-manager-container.component';
import { DockerManagerCreateComponent } from './docker-manager-create/docker-manager-create.component';
import { DockerManagerListComponent } from './docker-manager-list/docker-manager-list.component';

const routes: Routes = [
  {path: 'docker-manager', component: DockerManagerContainerComponent}
];

@NgModule({
  declarations: [
    DockerManagerContainerComponent,
    DockerManagerListComponent,
    DockerManagerCreateComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DockerManagerModule { }
