export interface ContainerStateModel {
  status: string;
  running: boolean;
  paused: boolean;
  restarting: boolean;
  startedAt: string;
  finishedAt: string;
}
