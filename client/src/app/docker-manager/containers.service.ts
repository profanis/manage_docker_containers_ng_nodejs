import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ContainerModel } from './models/container.model';

@Injectable()
export class ContainersService {

  private readonly endpoint = '/api/containers';

  constructor(private http: HttpClient) { }

  /**
   * By default it returns only the running containers
   * @param showAll show all containers. Default false
   */
  getContainers(showAll: boolean = false) {
    const params = new HttpParams().set('all', showAll.toString());

    return this.http.get<ContainerModel[]>(this.endpoint, {params});
  }
}
