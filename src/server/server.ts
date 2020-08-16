import express from "express";
import { RouteEntry } from "./routes";

import { config } from "./routes/app";
import { api_config } from "./routes/api";

export class Server {
    // instance variables
    private _expApp: express.Application;
    private _port: number;

    private constructor() {
        this._port = 8080;
        this._expApp = express();
        this._expApp.use(express.json());
        this._setupRoutes(config);
        this._setupRoutes(api_config);
    }

    // singleton
    public static _instance: Server;

    public static get instance() {
        if (!this._instance) {
            this._instance = new Server();
        }
        return this._instance;
    }

    public start(port?: number) {
        if (port) {
            this._port = port;
        }
        this._expApp.listen(this._port, () => {
            console.log(`Server Started! Listening at ${this._port}`);
        });
    }

    private _setupRoutes(config: RouteEntry[]) {
        config.forEach((entry: RouteEntry) => {
            switch (entry.method) {
                case "GET":
                    this._expApp.get(entry.path, entry.handler);
                    break;
                case "POST":
                    this._expApp.post(entry.path, entry.handler);
                    break;
                case "PUT":
                    this._expApp.put(entry.path, entry.handler);
                    break;
                case "DELETE":
                    this._expApp.delete(entry.path, entry.handler);
                    break;
            }
        });
    }
}
