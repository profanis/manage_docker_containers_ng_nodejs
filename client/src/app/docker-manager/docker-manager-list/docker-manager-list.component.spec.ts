import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocmerManagerListComponent } from './docker-manager-list.component';

describe('DocmerManagerListComponent', () => {
  let component: DocmerManagerListComponent;
  let fixture: ComponentFixture<DocmerManagerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocmerManagerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocmerManagerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
