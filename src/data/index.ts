import mysql from "mysql2/promise";
import { ReturnType } from "../extra";

const mysql_Config = {
    host: process.env.mysql_host || "localhost",
    user: process.env.mysql_user || "root",
    password: process.env.mysql_user_password || "TLM98@mysql",
    waitForConnections: true,
    connectionLimit: Number(process.env.mysql_connection_limit) || 20,
    queueLimit: 0
};

export interface Model {
    sync: (syncer: Syncer) => { [key: string]: () => Promise<ReturnType<Model>> }
}

export interface Syncer {
    execute: Function;
}

class MysqlSyncer {
    private _pool: mysql.Pool;

    private constructor() {
        this._pool = mysql.createPool(mysql_Config);
    }

    // singleton
    private static _instance: MysqlSyncer;

    public static get instance(): MysqlSyncer {
        if (!this._instance) {
            this._instance = new MysqlSyncer();
        }
        return this._instance;
    }

    async execute(sql: string) {
        const poolConn = await this._pool.getConnection();
        return poolConn.execute(sql);
    }

}

export const mysqlSyncer = MysqlSyncer.instance;