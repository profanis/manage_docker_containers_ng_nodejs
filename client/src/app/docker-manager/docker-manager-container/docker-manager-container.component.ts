import { Component, OnInit } from '@angular/core';

import { ContainersService } from '../containers.service';

@Component({
  selector: 'app-docker-manager-container',
  templateUrl: './docker-manager-container.component.html',
  styleUrls: ['./docker-manager-container.component.scss'],
  providers: [ContainersService]
})
export class DockerManagerContainerComponent implements OnInit {

  constructor(private containerService: ContainersService) { }

  ngOnInit() {
    this.containerService.getContainers().subscribe(data => {
      console.log(data);
    });
  }

}
