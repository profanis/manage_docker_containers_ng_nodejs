import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DockerManagerCreateComponent } from './docker-manager-create.component';

describe('DockerManagerCreateComponent', () => {
  let component: DockerManagerCreateComponent;
  let fixture: ComponentFixture<DockerManagerCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DockerManagerCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DockerManagerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
