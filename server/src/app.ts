import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import { NextFunction, Request, Response } from "express";
import { DockerController } from "./controllers/docker.controller";


class App {
    public app: express.Application;

    constructor() {

        this.app = express();
        this.middleware();
        this.configureRoutes();
        this.handleOperationalErrors();
    }

    /**
     * Error handling middleware should be defined as the last app.use() method
     */
    private handleOperationalErrors() {
        this.app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
            console.error(err.stack);
            res.status(500).send(err);
        });
    }

    private middleware(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(cors());
    }

    private configureRoutes() {
        this.app.use("/api/containers", new DockerController().router);
    }
}

export default new App().app;
