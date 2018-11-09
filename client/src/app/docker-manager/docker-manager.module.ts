import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { ContainersService } from './containers.service';
import { DockerManagerContainerComponent } from './docker-manager-container/docker-manager-container.component';
import { DockerManagerCreateComponent } from './docker-manager-create/docker-manager-create.component';
import { DockerManagerListComponent } from './docker-manager-list/docker-manager-list.component';
import { DockerManagerLogsComponent } from './docker-manager-logs/docker-manager-logs.component';
import { DockerManagerResourcesComponent } from './docker-manager-resources/docker-manager-resources.component';

const routes: Routes = [
  {path: 'docker-manager', component: DockerManagerContainerComponent},
  {path: 'docker-logs/:id', component: DockerManagerLogsComponent},
  {path: 'docker-resources/:id', component: DockerManagerResourcesComponent},
];

@NgModule({
  declarations: [
    DockerManagerContainerComponent,
    DockerManagerListComponent,
    DockerManagerCreateComponent,
    DockerManagerLogsComponent,
    DockerManagerResourcesComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    ContainersService
  ]
})
export class DockerManagerModule { }
