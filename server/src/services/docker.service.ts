import { DockerModel } from '../models/docker.model';
import { DockerStateModel } from '../models/docker-state.model';
import { NoImageFound } from '../errorTypes/no-image-found.error';
import { RuntimeError } from '../errorTypes/runtime.error';
const Docker = require('node-docker-api').Docker;

export class DockerService {
    private docker: any;


    constructor() {
        this.docker = new Docker({ socketPath: '/var/run/docker.sock' });
    }

    async listOfContainers(showAllContainers: boolean = false): Promise<DockerModel[]> {
        
        const containersList = await this.docker.container.list({ all: showAllContainers });

        const asyncContainers =  containersList.map(async (container: any) => this.getContainerInfo(container));

        return Promise.all(asyncContainers as DockerModel[]);
    }

    async createContainer(imageName: string, tag: string) {
        try {
            return await this.createContainerAndGetInfo(imageName, tag);
        } catch (error) {
            if (error.statusCode === 404) {
                // pull image and create new container
                await this.pullImage(imageName);
                return await this.createContainerAndGetInfo(imageName, tag);
            } 
            
            throw error;
        }
    }


    async startStopContainer(containerId: string, action: 'start' | 'stop'): Promise<DockerModel> {
        const container = await this.docker.container.get(containerId);
        const status = await (action === 'start' ? container.start() : container.stop());
        return await this.getContainerInfo(status);
    }

    async deleteContainer(containerId: string): Promise<boolean> {
        try {
            const container = await this.docker.container.get(containerId);
            await container.delete();
        } catch (e) {
            throw new RuntimeError(e);
        }
 
        return Promise.resolve(true);
    }

    async getLogsFromContainer(containerId: string) {

        const container = await this.docker.container.get(containerId);

        const containerInfo = await this.getContainerInfo(container);

        const logStream =  await container.logs({
            stdout: true,
            stderr: true,
        });
        
        return new Promise((resolve, reject) => {
            containerInfo.logs = [];
            logStream.on('data', (d: any) => {

                
                // Create an object with 'key' the timestamp and 'value' the message that have been logged
                const regEx = new RegExp(/\[(.+)\]/);
                const matchedRegEx = regEx.exec(d.toString());

                if (matchedRegEx && containerInfo.logs) {
                    
                    containerInfo.logs.push({
                        title: matchedRegEx[1],
                        data: d.toString()
                    });
                }
                
            });
            logStream.on('end', () =>  resolve(containerInfo));
            logStream.on('error', reject);
        });

    }

    /**
     * 
     * It terminates imidiately the stream as soon as it gets the first event argument
     * @param containerId 
     */
    async getContainerResources(containerId: string) {
        const container = await this.docker.container.get(containerId);

        const containerInfo = await this.getContainerInfo(container);


        const statStream =  await container.stats();

        return new Promise((resolve, reject) => {
            statStream.on('data', (info: any) => {

                containerInfo.resources = JSON.parse(info.toString());

                statStream.destroy(); 

                resolve(containerInfo);
            });
            statStream.on('error', reject);
        });
    }

    private async createContainerAndGetInfo(imageName: string, tag: string): Promise<DockerModel> {
        const container = await this.docker.container.create({
            Image: imageName,
            name: tag,
        });
        return await this.getContainerInfo(container);
    }

    
    private async pullImage(imageName: string) {

        try {
            // This is a copy-paste code from https://github.com/AgustinCB/docker-api/blob/master/examples/pull_and_check_image.js
            const promisifyStream = (stream: any) => new Promise((resolve, reject) => {
                stream.on('data', (d: any) => console.log(d.toString()));
                stream.on('end', resolve);
                stream.on('error', reject);
            });


            const createImageStream =  await this.docker.image.create({}, { fromImage: imageName, tag: 'latest' });
            await promisifyStream(createImageStream);
            return await this.docker.image.get(imageName).status();
        } catch (e) {
            throw new NoImageFound(e);
        }
    }

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