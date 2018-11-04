import { DockerModel } from "../models/docker.model";
import { DockerStateModel } from "../models/docker-state.model";
const Docker = require("node-docker-api").Docker;

export class DockerService {
    private docker: any; // TODO: define the type


    constructor() {
        this.docker = new Docker({ socketPath: "/var/run/docker.sock" });
    }

    async listOfContainers(showAllContainers: boolean = false): Promise<DockerModel[]> {
        
        const containersList = await this.docker.container.list({ all: showAllContainers });

        const asyncContainers =  containersList.map(async (container: any) => this.getContainerInfo(container));

        return Promise.all(asyncContainers as DockerModel[]);
    }

    async createContainer(imageName: string, tag: string) {
        try {
            return await this.createContainerAndgetInfo(imageName, tag);
        } catch (error) {
            if (error.statusCode === 404) {
                // pull image and create new container
                await this.pullImage(imageName);
                return await this.createContainerAndgetInfo(imageName, tag);
            } 
            
            throw error;
        }
    }


    async startStopContainer(containerId: string, action: "start" | "stop"): Promise<DockerModel> {
        const container = await this.docker.container.get(containerId);
        const status = await (action === "start" ? container.start() : container.stop()); // TODO: imrpove it
        return await this.getContainerInfo(status);
    }

    async deleteContainer(containerId: string) {
        const container = await this.docker.container.get(containerId);
        return container.delete();
    }

    // TODO: IMPLEMENT
    async getLogsFromContainer(containerId: string) {
        const container = await this.docker.container.get(containerId);
        const logStream =  await container.logs({
            follow: true,
            stdout: true,
            stderr: true,
        });
        logStream.on("data", (info: any) => console.log(info));
        logStream.on("error", (err: any) => console.log(err));
        logStream.destroy();

    }

    /**
     * TODO: beautify the response
     * It terminates imidiately the stream as soon as it gets the first event argument
     * @param containerId 
     */
    async monitorContainerResources(containerId: string) {
        const container = await this.docker.container.get(containerId);
        const statStream =  await container.stats();

        return new Promise((resolve, reject) => {
            statStream.on("data", (info: any) => {
                const stats = info.toString();
                statStream.destroy();
                resolve(JSON.parse(stats));
            });
            statStream.on("error", reject);
        });
    }

    private async createContainerAndgetInfo(imageName: string, tag: string): Promise<DockerModel> {
        const container = await this.docker.container.create({
            Image: imageName,
            name: tag,
        });
        return await this.getContainerInfo(container);
    }

    
    private async pullImage(imageName: string) {

        // This is a copy-paste code from https://github.com/AgustinCB/docker-api/blob/master/examples/pull_and_check_image.js
        const promisifyStream = (stream: any) => new Promise((resolve, reject) => {
            stream.on("data", (d: any) => console.log(d.toString()));
            stream.on("end", resolve);
            stream.on("error", reject);
        });


        const createImageStream =  await this.docker.image.create({}, { fromImage: imageName, tag: "latest" });
        await promisifyStream(createImageStream);
        return await this.docker.image.get(imageName).status();
    }

    // TODO: provide a type
    private async getContainerInfo(container: any): Promise<DockerModel> {
        const containersStatus = await container.status();
            
        // initialize with empty object to avoid null pointer exception
        containersStatus.data = containersStatus.data || {};
        containersStatus.data.Config = containersStatus.data.Config || {};

        // Prepare the docker model
        const dockerModel =  new DockerModel();
        dockerModel.id = containersStatus.data.Id;
        dockerModel.name = containersStatus.data.Config.Image;

        dockerModel.tag = containersStatus.data.Name;
        dockerModel.state = new DockerStateModel(containersStatus.data.State);
        return dockerModel;
    }
}