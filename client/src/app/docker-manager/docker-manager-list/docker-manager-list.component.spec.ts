import { ChangeDetectionStrategy, DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { DockerManagerListComponent } from './docker-manager-list.component';


describe('DocmerManagerListComponent', () => {
  let component: DockerManagerListComponent;
  let fixture: ComponentFixture<DockerManagerListComponent>;
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
      declarations: [ DockerManagerListComponent ]
    })
    .overrideComponent(DockerManagerListComponent, {
      set: {  changeDetection: ChangeDetectionStrategy.Default  }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DockerManagerListComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the container list correctly', fakeAsync(() => {

    component.containers$ = of([containerModel]);

    tick();
    fixture.detectChanges();

    const logsDetailsElement = debugElement.queryAllNodes(By.css(`.table >tbody tr td`));

    const getHtmlValue = (elmentIndex) => logsDetailsElement[elmentIndex].parent.nativeElement.innerText;

    const containerName = getHtmlValue(0);
    const tagName = getHtmlValue(1);
    const isRunning = getHtmlValue(2);

    expect(containerName).toContain(containerModel.name);
    expect(tagName).toContain(containerModel.tag);
    expect(isRunning).toContain(containerModel.state.running);

  }));
});
