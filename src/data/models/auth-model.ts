import { Model, Syncer } from "../index";
import { ReturnType } from "../../extra";

export class AuthModel implements Model {

    public static readonly NULL_userId = -1;
    public static readonly NULL_username = "";
    public static readonly NULL_hash = "";

    public readonly tableName: string;
    public readonly databaseName: string;
    public userId: number;
    public username: string;
    public hash: string;

    constructor() {
        this.tableName = "authentications";
        this.databaseName = "cms";
        this.userId = AuthModel.NULL_userId;
        this.username = AuthModel.NULL_username;
        this.hash = AuthModel.NULL_hash;
    }

    public sync = (syncer: Syncer) => {
        return {
            getByUsername: (): Promise<ReturnType<AuthModel>> => this.get_byUsername(syncer),
            getByUserId: (): Promise<ReturnType<AuthModel>> => this.get_byUserId(syncer),
            saveWithoutUserId: (): Promise<ReturnType<AuthModel>> => this.save_withoutUserId(syncer),
            saveWithUserId: (): Promise<ReturnType<AuthModel>> => this.save_withUserId(syncer),
            deleteByUserId: (): Promise<ReturnType<AuthModel>> => this.delete_byUserId(syncer),
            deleteByUsername: (): Promise<ReturnType<AuthModel>> => this.delete_byUsername(syncer)
        };
    };

    private get_byUsername = async (syncer: Syncer): Promise<ReturnType<AuthModel>> => {
        if (this.username == AuthModel.NULL_username) {
            return [{ code: 1, msg: "username cannot be NULL" }, this];
        }

        try {
            const [results, fields] = await syncer.execute(
                `SELECT DISTINCT * FROM ${this.databaseName}.${this.tableName} WHERE username = '${this.username}'`
            );
            const raw = results[0];

            this.userId = raw.user_id;
            this.username = raw.username;
            this.hash = raw.hash;

            return [{ code: 0, msg: "" }, this];

        } catch (e) {
            console.log("[SQL][ERROR]:", e.sqlMessage);
            return [{ code: 2, msg: e.sqlMessage }, this];
        }
    };

    private get_byUserId = async (syncer: Syncer): Promise<ReturnType<AuthModel>> => {
        if (this.userId == AuthModel.NULL_userId)
            return [{ code: 1, msg: "userId cannot be NULL" }, this];

        try {
            const [results, fields] = await syncer.execute(
                `SELECT DISTINCT * FROM ${this.databaseName}.${this.tableName} WHERE user_id = '${this.userId}'`
            );
            const raw = results[0];

            this.userId = raw.user_id;
            this.username = raw.username;
            this.hash = raw.hash;

            return [{ code: 0, msg: "" }, this];

        } catch (e) {
            console.log("[SQL][ERROR]:", e.sqlMessage);
            return [{ code: 2, msg: e.sqlMessage }, this];
        }
    };

    private async save_withoutUserId(syncer: Syncer): Promise<ReturnType<AuthModel>> {
        if (this.username == AuthModel.NULL_username || this.hash == AuthModel.NULL_hash)
            return [{ code: 1, msg: "username or hash cannot be NULL" }, this];

        try {
            const [results, fields] = await syncer.execute(
                `INSERT INTO ${this.databaseName}.${this.tableName}
                    (username, hash)
                 VALUES
                    ('${this.username}', '${this.hash}')`
            );

            this.userId = results.insertId;
            return [{ code: 0, msg: "" }, this];
        } catch (e) {
            console.log("[SQL][ERROR]:", e.sqlMessage);
            return [{ code: 2, msg: e.sqlMessage }, this];
        }
    }

    private async save_withUserId(syncer: Syncer): Promise<ReturnType<AuthModel>> {
        if (this.userId == AuthModel.NULL_userId || this.username == AuthModel.NULL_username || this.hash == AuthModel.NULL_hash)
            return [{ code: 1, msg: "userId or username or hash cannot be NULL" }, this];

        try {
            const [results, fields] = await syncer.execute(
                `INSERT INTO ${this.databaseName}.${this.tableName}
                    (user_id, username, hash)
                 VALUES
                    (${this.userId}, ${this.username}', '${this.hash}')`
            );

            return [{ code: 0, msg: "" }, this];

        } catch (e) {
            console.log("[SQL][ERROR]:", e.sqlMessage);
            return [{ code: 2, msg: e.sqlMessage }, this];
        }
    }

    private async delete_byUserId(syncer: Syncer): Promise<ReturnType<AuthModel>> {
        if (this.userId == AuthModel.NULL_userId)
            return [{ code: 1, msg: "userId cannot be NULL" }, this];

        try {
            await syncer.execute(
                `DELETE FROM ${this.databaseName}.${this.tableName}
                    WHERE user_id = ${this.userId}`
            );
            this.userId = AuthModel.NULL_userId;

            return [{ code: 0, msg: "" }, this];
        } catch (e) {
            console.log("[SQL][ERROR]:", e.sqlMessage);
            return [{ code: 2, msg: e.sqlMessage }, this];
        }

    }

    private async delete_byUsername(syncer: Syncer): Promise<ReturnType<AuthModel>> {
        if (this.username == AuthModel.NULL_username)
            return [{code: 1, msg: "username cannot be NULL"}, this]
        try {
            await syncer.execute(
                `DELETE FROM ${this.databaseName}.${this.tableName}
                    WHERE username = '${this.username}'`
            );
            this.username = AuthModel.NULL_username;
            return [{ code: 0, msg: "" }, this];

        } catch (e) {
            console.log("[SQL][ERROR]:", e.sqlMessage);
            return [{ code: 2, msg: e.sqlMessage }, this];
        }
    };

}