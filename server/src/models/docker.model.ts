import { DockerStateModel } from "./docker-state.model";

export class DockerModel {
    id: string;
    name: string;
    tag: string;
    state: DockerStateModel;

    constructor() {

    }
}