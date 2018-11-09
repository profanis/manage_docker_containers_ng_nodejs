import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DockerManagerCreateComponent } from './docker-manager-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContainerModel } from '../models/container.model';

describe('DockerManagerCreateComponent', () => {
  let component: DockerManagerCreateComponent;
  let fixture: ComponentFixture<DockerManagerCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
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

  it('form should be invalid', () => {
    component.ngOnInit();
    expect(component.newContainerForm.valid).toBeFalsy();
  });

  it('form should valid', () => {
    component.ngOnInit();
    component.newContainerForm.patchValue({
      name: 'this is an images nmae',
      tag: 'this is a container tag name'
    });
    expect(component.newContainerForm.valid).toBeTruthy();
  });

  it('should emit a \'createContainer\' event', () => {
    component.ngOnInit();

    component.createContainer.subscribe((data: ContainerModel) => {
      expect(data.name).toBe('this is an image name');
      expect(data.tag).toBe('this is a container tag name');
    });

    component.actionCreateContainer({value: {
        name: 'this is an image name',
        tag: 'this is a container tag name'
    }});
  });

});
