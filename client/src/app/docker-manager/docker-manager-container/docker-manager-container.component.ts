import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ContainersService } from '../containers.service';
import { ContainerModel } from '../models/container.model';

@Component({
  selector: 'app-docker-manager-container',
  templateUrl: './docker-manager-container.component.html',
  styleUrls: ['./docker-manager-container.component.scss'],
  providers: [ContainersService]
})
export class DockerManagerContainerComponent implements OnInit {

  containers$: Observable<ContainerModel[]>;

  constructor(private containerService: ContainersService) { }

  ngOnInit() {
    this.initContainers();
  }

  // TODO: handle errors and create a service with an array of containers. Subscribe on this array instead
  startContainer(containerId) {
    this.containers$ = this.containerService.startContainer(containerId).pipe(
      switchMap(() => this.containerService.getContainers(true))
    );
  }

  // TODO: handle errors and create a service with an array of containers. Subscribe on this array instead
  stopContainer(containerId) {
    this.containers$ = this.containerService.stopContainer(containerId).pipe(
      switchMap(() => this.containerService.getContainers(true))
    );
  }

  // TODO: handle errors and create a service with an array of containers. Subscribe on this array instead
  deleteContainer(containerId) {
    this.containers$ = this.containerService.deleteContainer(containerId).pipe(
      switchMap(() => this.containerService.getContainers(true))
    );
  }

  // TODO: handle errors and create a service with an array of containers. Subscribe on this array instead
  createContainer(containerModel: ContainerModel) {
    this.containers$ = this.containerService.createContainer(containerModel).pipe(
      switchMap(() => this.containerService.getContainers(true))
    );
  }

  private initContainers() {
    this.containers$ = this.containerService.getContainers(true);
  }
}
