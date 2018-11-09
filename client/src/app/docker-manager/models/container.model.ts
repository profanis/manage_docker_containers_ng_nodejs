import { ContainerStateModel } from './container-state.model';
import { ContainerLogsModel } from './container-logs.model';

export interface ContainerModel {
  id: string;
  name: string;
  tag: string;
  state?: ContainerStateModel;
  logs?: ContainerLogsModel[];
  resources?: any;
}
