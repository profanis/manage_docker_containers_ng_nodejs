import { NextFunction, Request, Response, Router } from "express";

import { DockerService } from "../services/docker.service";


export class DockerController {

    // Public members
    router: Router;
    
    // Private members
    private dockerService: DockerService;

    constructor() {
        this.dockerService = new DockerService();
        this.router = Router();
        this.get();
        this.post();
        this.startStopContainer();
        this.deleteContainer();
        this.logsFromContainer();
        this.resourcesFromContainer();
    }

    private get() {
        this.router.get("/", async (req: Request, res: Response, next: NextFunction) => {
            try {
                
                const { all } = req.query;
                const data = await this.dockerService.listOfContainers(all);
                
                res.json(data);
            } catch (error) {
                next(error);
            }
        });
    }

    private post() {
        this.router.post("/", async (req: Request, res: Response, next: NextFunction) => {
            try {
                
                const { name, tag } = req.body;
                if (!name || !tag) {
                    return next("name or tag body properties are required");
                }
                
                const data = await this.dockerService.createContainer(name, tag);
                
                res.json(data);
            } catch (error) {
                next(error);
            }
        });
    }

    private startStopContainer() {
        this.router.patch("/:id", async (req: Request, res: Response, next: NextFunction) => {
            try {
                const containerId = req.params.id;
                const { status } = req.body;

                if (!status) {
                    return next("status property is required");
                }

                const actions: any = {
                    start: () => this.dockerService.startStopContainer(containerId, "start"),
                    stop: () => this.dockerService.startStopContainer(containerId, "stop")
                };
                
                const data = await actions[status].call();
                
                res.json(data);
            } catch (error) {
                next(error);
            }
        });
    }

    private deleteContainer() {
        this.router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
            try {
                const containerId = req.params.id;

                await this.dockerService.deleteContainer(containerId);
                
                res.json({ deleted: true });
            } catch (error) {
                next(error);
            }
        });
    }

    // TODO: IMPLEMENT
    private logsFromContainer() {
        this.router.get("/:id/logs", async (req: Request, res: Response, next: NextFunction) => {
            try {
                const containerId = req.params.id;

                const data = await this.dockerService.getLogsFromContainer(containerId);
                
                res.json(data);
            } catch (error) {
                next(error);
            }
        });
    }

    private resourcesFromContainer() {
        this.router.get("/:id/resources", async (req: Request, res: Response, next: NextFunction) => {
            try {
                const containerId = req.params.id;

                const data = await this.dockerService.monitorContainerResources(containerId);
                
                res.json(data);
            } catch (error) {
                next(error);
            }
        });
    }
}