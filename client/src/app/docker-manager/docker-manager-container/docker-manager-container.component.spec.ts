import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DockerManagerContainerComponent } from './docker-manager-container.component';

describe('DockerManagerContainerComponent', () => {
  let component: DockerManagerContainerComponent;
  let fixture: ComponentFixture<DockerManagerContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DockerManagerContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DockerManagerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
