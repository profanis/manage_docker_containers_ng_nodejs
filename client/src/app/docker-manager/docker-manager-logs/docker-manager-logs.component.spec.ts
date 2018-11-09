import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ContainersServiceMock } from '../container.service.mock';
import { ContainersService } from '../containers.service';
import { DockerManagerLogsComponent } from './docker-manager-logs.component';


describe('DockerManagerLogsComponent', () => {
  let component: DockerManagerLogsComponent;
  let fixture: ComponentFixture<DockerManagerLogsComponent>;
  let debugElement: DebugElement;

  const containerModel = {
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ DockerManagerLogsComponent ],
      providers: [
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              params: {
                id: 1
              }
            }
          }
        },
        {
          provide: ContainersService, useClass: ContainersServiceMock
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DockerManagerLogsComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should render the logs correctly', () => {

    component.containerModel$ = of(containerModel);
    fixture.detectChanges();

    const logsDetailsElement = debugElement.queryAllNodes(By.css(`.row`));

    const getHtmlValue = (elmentIndex) => logsDetailsElement[elmentIndex].parent.nativeElement.innerText;

    const imageName = getHtmlValue(0);
    const containerTag = getHtmlValue(1);

    expect(imageName).toContain(containerModel.name);
    expect(containerTag).toContain(containerModel.tag);

  });
});
