import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';

import { ContainersService } from '../containers.service';
import { ContainerModel } from '../models/container.model';

@Component({
  selector: 'app-docker-manager-container',
  templateUrl: './docker-manager-container.component.html'
})
export class DockerManagerContainerComponent implements OnInit, OnDestroy {

  containers$: Observable<ContainerModel[]>;
  showAllContainers = false;


  private unsubscribe: Subject<void> = new Subject();

  constructor(private containerService: ContainersService,
              private router: Router) { }

  ngOnInit() {
    this.getContainers();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  getContainers() {
    this.containers$ = this.containerService.getContainers(this.showAllContainers);
  }


  startContainer(containerId) {
    this.invokeActionAndLoadContainers(this.containerService.startContainer(containerId));
  }

  stopContainer(containerId) {
    this.invokeActionAndLoadContainers(this.containerService.stopContainer(containerId));
  }

  deleteContainer(containerId) {
    this.invokeActionAndLoadContainers(this.containerService.deleteContainer(containerId));
  }

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
      takeUntil(this.unsubscribe),
      switchMap(() => this.containerService.getContainers(true).pipe(
        tap(data => this.containers$ = of(data))
      ))
    ).subscribe();
  }
}
