import "reflect-metadata";
import { Connection, createConnection } from "typeorm";
import { UserDataSource } from "./sources/UserDataSource";
import { DivisionDataSource } from "./sources/DivisionDataSource";

export class DatabaseService {
    // Singleton Implementation
    private static _instance: DatabaseService
    public static get instance(): DatabaseService {
        if (!this._instance) {
            this._instance = new DatabaseService()
        }
        return this._instance;
    }

    // Connections
    private _connection!: Connection

    // DataSources
    private readonly _dataSource_users: UserDataSource
    private readonly _dataSource_divisions: DivisionDataSource

    private constructor() {
        this._dataSource_users = new UserDataSource(this._connection);
        this._dataSource_divisions = new DivisionDataSource(this._connection);
    }

    get dataSource_users(): UserDataSource {
        return this._dataSource_users
    }

    get dataSource_divisions(): DivisionDataSource {
        return this._dataSource_divisions;
    }

// -------------------------------------------------------------------------
    public async startService() {
        this._connection = await createConnection()
        console.log("Connection Start with Database")
    }

    public async synchronizeEntities() {
        await this._connection.synchronize(false);
    }

    public async recreateDatabase() {
        await this._connection.synchronize(true);
    }
}
