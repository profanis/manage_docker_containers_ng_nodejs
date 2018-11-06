import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ContainerModel } from '../models/container.model';

@Component({
  selector: 'app-docker-manager-create',
  templateUrl: './docker-manager-create.component.html',
  styleUrls: ['./docker-manager-create.component.scss'],
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
    // TODO: better return a different type
    this.createContainer.emit({
      name: value.name,
      tag: value.tag,
      id: null,
      state: null
    });
  }

}
