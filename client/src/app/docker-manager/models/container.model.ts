import { ContainerStateModel } from './container-state.model';

export interface ContainerModel {
  id: string;
  name: string;
  tag: string;
  state: ContainerStateModel;
}
