import { ContainersService } from './containers.service';
import { of } from 'rxjs';

export class ContainersServiceMock extends ContainersService {

  containerModel = {
    id: '12345',
    name: 'nginx',
    tag: 'nginx_tag_image',
    state: {
      status: 'created',
      running: true,
      paused: false,
      restarting: false,
      startedAt: '2018-11-07T21:35:49.420657537Z',
      finishedAt: '2018-11-07T21:35:49.420657537Z'
    },
    logs: [{
      title: '07/Nov/2018:21:32:02 +0000',
      data: 'log data'
    }]
  };

  getContainerLogs(containerId: string) {
    return of(this.containerModel);
  }

}
