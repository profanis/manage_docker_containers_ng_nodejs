export class RuntimeError extends Error {
    constructor(message: string) {
        super(message);

        // it displays on the stach trace the correct class name
        this.name = this.constructor.name;
    }
}