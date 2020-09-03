import mysql from "mysql2/promise";
import { IExecutor } from "./executor";

class MySQL_Executor  implements IExecutor {

    // singleton
    private static _instance: MySQL_Executor;

    public static get instance(): MySQL_Executor {
        if (!this._instance) {
            this._instance = new MySQL_Executor();
        }
        return this._instance;
    }

    private _pool: mysql.Pool;

    private constructor() {
        this._pool = mysql.createPool({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_USER_PASSWORD,
            waitForConnections: true,
            connectionLimit: Number(process.env.MYSQL_CONNECTION_LIMIT),
            queueLimit: 0
        });
    }

    async execute(sql: string, args: Array<any> = []) {
        const poolConn = await this._pool.getConnection();
        return poolConn.execute(sql, args);
    }
}

export const mysqlExecutor = MySQL_Executor.instance;