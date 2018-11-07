import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ContainerModel } from './models/container.model';
import { Observable } from 'rxjs';
import { DockerModel } from '../../../../server/src/models/docker.model';
import { map } from 'rxjs/operators';

@Injectable()
export class ContainersService {

  private readonly endpoint = '/api/containers';

  constructor(private http: HttpClient) { }

  /**
   * By default it returns only the running containers
   * @param showAll show all containers. Default false
   */
  getContainers(showAll: boolean = false): Observable<ContainerModel[]> {
    const params = new HttpParams().set('all', showAll.toString());

    return this.http.get<ContainerModel[]>(this.endpoint, {params});
  }

  startContainer(containerId): Observable<ContainerModel> {
    const body: any = {
      'status': 'start'
    };
    return this.http.patch<ContainerModel>(`${this.endpoint}/${containerId}`, body);
  }

  stopContainer(containerId): Observable<ContainerModel> {
    const body: any = {
      'status': 'stop'
    };
    return this.http.patch<ContainerModel>(`${this.endpoint}/${containerId}`, body);
  }

  deleteContainer(containerId): Observable<ContainerModel> {
    return this.http.delete<ContainerModel>(`${this.endpoint}/${containerId}`);
  }

  createContainer(containerModel: ContainerModel): Observable<ContainerModel> {
    const body: any = {
      'name': containerModel.name,
      'tag': containerModel.tag
    };
    return this.http.post<ContainerModel>(this.endpoint, body);
  }

  getContainerLogs(containerId: string) {
    return this.http.get<ContainerModel>(`${this.endpoint}/${containerId}/logs`);
  }

  getContainerResources(containerId: string) {
    return this.http.get<ContainerModel>(`${this.endpoint}/${containerId}/resources`);
  }
}
