import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ContainersService } from '../containers.service';
import { ContainerModel } from '../models/container.model';

@Component({
  selector: 'app-docker-manager-logs',
  templateUrl: './docker-manager-logs.component.html',
  styleUrls: ['./docker-manager-logs.component.scss']
})
export class DockerManagerLogsComponent implements OnInit {

  containerModel$: Observable<ContainerModel>;

  constructor(private activatedRoute: ActivatedRoute,
              private containersService: ContainersService) {

  }

  ngOnInit() {
    const {id: containerId} = this.activatedRoute.snapshot.params;

    this.containerModel$ = this.containersService.getContainerLogs(containerId);
  }

}
