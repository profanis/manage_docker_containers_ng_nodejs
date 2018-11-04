export class DockerStateModel {
    status: string;
    running: boolean;
    paused: boolean;
    restarting: boolean;
    startedAt: string;
    finishedAt: string;

    constructor(obj: any) {
        this.status = obj["Status"];
        this.running = obj["Running"];
        this.paused = obj["Paused"];
        this.restarting = obj["Restarting"];
        this.startedAt = obj["StartedAt"];
        this.finishedAt = obj["FinishedAt"];
    }

}
/* Status: 'exited',
        Running: false,
        Paused: false,
        Restarting: false,
        OOMKilled: false,
        Dead: false,
        Pid: 0,
        ExitCode: 0,
        Error: '',
        StartedAt: '2018-11-03T19:17:23.579572234Z',
        FinishedAt: '2018-11-03T19:17:23.639572476Z' */