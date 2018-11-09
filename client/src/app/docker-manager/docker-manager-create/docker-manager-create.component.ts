import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ContainerModel } from '../models/container.model';

@Component({
  selector: 'app-docker-manager-create',
  templateUrl: './docker-manager-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DockerManagerCreateComponent implements OnInit {

  @Output() createContainer = new EventEmitter<ContainerModel>();

  newContainerForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.newContainerForm = this.fb.group({
      name: [, Validators.required],
      tag: [, Validators.required]
    });
  }


  actionCreateContainer({value}: {value}) {
    this.createContainer.emit({
      name: value.name,
      tag: value.tag,
      id: null
    });
  }

}
