import express, { Handler, IRouter } from "express";
import { authRouter } from "./api/auth/router";
import { fileServer } from "./file/multer";

export class Server {
    // singleton
    public static _instance: Server;

    public static get instance() {
        if (!this._instance) {
            this._instance = new Server();
        }
        return this._instance;
    }

    // instance variables
    private _expApp: express.Application;
    private _port: number;

    private constructor() {
        this._port = 8080;
        this._expApp = express();
        this._expApp.use(express.json());

        this.addRouter('/api', authRouter);
        this.addRouter('/file', fileServer)
    }

    public start(port?: number) {
        if (port) {
            this._port = port;
        }
        this._expApp.listen(this._port, () => {
            console.log(`Server Started! Listening at ${this._port}`);
        });
    }

    private addRouter(path: string, router: IRouter) {
        this._expApp.use(path, router)
    }
}