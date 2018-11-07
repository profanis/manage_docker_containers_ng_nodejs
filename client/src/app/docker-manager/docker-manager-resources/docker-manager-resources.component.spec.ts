import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DockerManagerResourcesComponent } from './docker-manager-resources.component';

describe('DockerManagerResourcesComponent', () => {
  let component: DockerManagerResourcesComponent;
  let fixture: ComponentFixture<DockerManagerResourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DockerManagerResourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DockerManagerResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
