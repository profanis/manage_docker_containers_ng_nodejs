import { RuntimeError } from './runtime.error';

export class NoImageFound extends RuntimeError {

    constructor(message: any) {
        super(message);

        // it displays on the stach trace the correct class name
        this.name = this.constructor.name;
    }
}