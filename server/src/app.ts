import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import { NextFunction, Request, Response } from 'express';
import { DockerController } from './controllers/docker.controller';
import { RuntimeError } from './errorTypes/runtime.error';


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
        // tslint:disable-next-line:ter-prefer-arrow-callback
        this.app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
            if (err instanceof RuntimeError) {
                res.status(500).json({message: err.message});
                return;
            }
            res.status(500).send(err);
            console.error(err);
        });
    }

    private middleware(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(cors());
    }

    private configureRoutes() {
        this.app.use('/api/containers', new DockerController().router);
    }
}

export default new App().app;
