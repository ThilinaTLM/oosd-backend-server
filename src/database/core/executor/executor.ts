import mysql from "mysql";

export interface IExecutor {
    execute(sql: string, args: Array<any>): any
}

class MySQL_Executor implements IExecutor {

    private _pool: mysql.Pool;

    private constructor() {
        this._pool = mysql.createPool({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            database: process.env.MYSQL_DATABASE,
            password: process.env.MYSQL_USER_PASSWORD,
            connectionLimit: Number(process.env.MYSQL_CONNECTION_LIMIT)
        });
    }

    // singleton
    private static _instance: MySQL_Executor;

    public static get instance(): MySQL_Executor {
        if (!this._instance) {
            this._instance = new MySQL_Executor();
        }
        return this._instance;
    }

    async execute(sql: string, args: Array<any> = []) {
        return new Promise((resolve, reject) => {
            this._pool.query(sql, args, (err, results, fields) => {
                if (err) {
                    reject(err);
                }
                resolve([results, fields]);
            })
        });
    }
}

export const mysqlExecutor = MySQL_Executor.instance;