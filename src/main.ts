import { Server } from "./server/Server";

class System {
    private _server: Server;

    public constructor() {
        this._server = new Server(Number(process.env.PORT) || 8080);
    }

    public start() {
        this._server.startServer();
    }
}

const system = new System();
system.start();
