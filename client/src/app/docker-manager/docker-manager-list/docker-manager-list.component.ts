import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { DockerModel } from '../../../../../server/src/models/docker.model';

@Component({
  selector: 'app-docker-manager-list',
  templateUrl: './docker-manager-list.component.html',
  styleUrls: ['./docker-manager-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DockerManagerListComponent {

  @Input() containers$: Observable<DockerModel[]>;
  @Output() startContainer = new EventEmitter<string>();
  @Output() stopContainer = new EventEmitter<string>();
  @Output() deleteContainer = new EventEmitter<string>();
  @Output() showContainerLogs = new EventEmitter<string>();
  @Output() showContainerResources = new EventEmitter<string>();

  actionStartContainer(containerId: string) {
    this.startContainer.emit(containerId);
  }

  actionStopContainer(containerId: string) {
    this.stopContainer.emit(containerId);
  }

  actionDeleteContainer(containerId: string) {
    this.deleteContainer.emit(containerId);
  }

  actionShowContainerLogs(containerId: string) {
    this.showContainerLogs.emit(containerId);
  }

  actionShowResources(containerId: string) {
    this.showContainerResources.emit(containerId);
  }

}
