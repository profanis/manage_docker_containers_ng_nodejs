import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ContainersService } from '../containers.service';

@Component({
  selector: 'app-docker-manager-resources',
  templateUrl: './docker-manager-resources.component.html',
  styleUrls: ['./docker-manager-resources.component.scss']
})
export class DockerManagerResourcesComponent implements OnInit {

  containerResources$: Observable<any> = new Observable<any>();


  constructor(private activatedRoute: ActivatedRoute,
              private containersService: ContainersService) { }

  ngOnInit() {
    const {id: containerId} = this.activatedRoute.snapshot.params;

    this.containerResources$ = this.containersService.getContainerResources(containerId);
  }

}
