import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DockerManagerLogsComponent } from './docker-manager-logs.component';

describe('DockerManagerLogsComponent', () => {
  let component: DockerManagerLogsComponent;
  let fixture: ComponentFixture<DockerManagerLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DockerManagerLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DockerManagerLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
