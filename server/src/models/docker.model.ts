import { DockerStateModel } from "./docker-state.model";
import { DockerLogsModel } from "./docker-logs.model";

export class DockerModel {
    id: string;
    name: string;
    tag: string;
    state: DockerStateModel;
    logs?: DockerLogsModel[];
    resources?: any;

    constructor() {

    }
}