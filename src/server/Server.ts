import express from "express";
import { config, ConfigRouteEntry } from "./configRoutes";

export class Server {
    private _app: express.Application;
    private _port: number;

    public constructor(port: number) {
        this._port = port;
        this._app = express();
        this.attachHandlers(config);
    }

    public startServer() {
        this._app.listen(this._port, () => {
            console.log(`Server Started! Listening at ${this._port}`);
        });
    }

    private attachHandlers(config: ConfigRouteEntry[]) {
        config.forEach((entry: ConfigRouteEntry) => {
            switch (entry.method) {
                case "GET":
                    this._app.get(entry.path, entry.handler);
                    break;
                case "POST":
                    this._app.post(entry.path, entry.handler);
                    break;
                case "PUT":
                    this._app.put(entry.path, entry.handler);
                    break;
                case "DELETE":
                    this._app.delete(entry.path, entry.handler);
                    break;
            }
        });
    }
}
