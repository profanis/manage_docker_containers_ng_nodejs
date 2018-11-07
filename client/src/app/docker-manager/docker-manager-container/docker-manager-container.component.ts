import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { ContainersService } from '../containers.service';
import { ContainerModel } from '../models/container.model';

@Component({
  selector: 'app-docker-manager-container',
  templateUrl: './docker-manager-container.component.html',
  styleUrls: ['./docker-manager-container.component.scss']
})
export class DockerManagerContainerComponent implements OnInit {

  containers$: Observable<ContainerModel[]>;
  showAllContainers = false;

  constructor(private containerService: ContainersService,
              private router: Router) { }

  ngOnInit() {
    this.getContainers();
  }

  getContainers() {
    this.containers$ = this.containerService.getContainers(this.showAllContainers);
  }

  // TODO: handle errors and create a service with an array of containers. Subscribe on this array instead
  startContainer(containerId) {
    this.invokeActionAndLoadContainers(this.containerService.startContainer(containerId));
  }

  // TODO: handle errors and create a service with an array of containers. Subscribe on this array instead
  stopContainer(containerId) {
    this.invokeActionAndLoadContainers(this.containerService.stopContainer(containerId));
  }

  // TODO: handle errors and create a service with an array of containers. Subscribe on this array instead
  deleteContainer(containerId) {
    this.invokeActionAndLoadContainers(this.containerService.deleteContainer(containerId));
  }

  // TODO: handle errors and create a service with an array of containers. Subscribe on this array instead
  createContainer(containerModel: ContainerModel) {
    this.invokeActionAndLoadContainers(this.containerService.createContainer(containerModel));
  }

  showContainerLogs(containerId) {
    this.router.navigate(['/docker-logs', containerId]);
  }

  showContainerResources(containerId) {
    this.router.navigate(['/docker-resources', containerId]);
  }

  private invokeActionAndLoadContainers(func) {
    func.pipe(
      switchMap(() => this.containerService.getContainers(true).pipe(
        tap(data => this.containers$ = of(data))
      ))
    ).subscribe();
  }
}
