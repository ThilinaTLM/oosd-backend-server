import { compare, hash } from "bcrypt";
import { mysqlSyncer as syncer } from "../../data";
import { ModelError } from "../../packages/errors/err-model";
import { AuthModel } from "../../data/models/auth-model";

import { AuthManager_Errors} from "./errors";
import { ReturnType } from "../../extra";

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);

export class AuthManager {
    // singleton
    private static _instance: AuthManager;
    static get instance(): AuthManager {
        if (!this._instance) {
            this._instance = new AuthManager();
        }
        return this._instance;
    }

    private constructor() {}

    async addProfile(username: string, password: string): Promise<ReturnType<number>> {
        let profile = new AuthModel();
        profile.username = username;
        profile.hash = await hash(password, SALT_ROUNDS);
        let [error] = await profile.sync(syncer).saveWithoutUserID();
        if (error === ModelError.NO_ERRORS)
            return [AuthManager_Errors.NO_ERRORS, profile.userId];
        return [error, -1];
    }


    async verifyProfile(username: string, password: string): Promise<ReturnType<number>> {
        let profile = new AuthModel();
        profile.username = username;
        const [error] = await profile.sync(syncer).getByUsername();
        if (error === ModelError.ENTRY_NOT_FOUND) {
            return [AuthManager_Errors.USERNAME_NOT_EXISTS, -1]
        }
        if (await compare(password, profile.hash)) {
            return [AuthManager_Errors.NO_ERRORS, profile.userId];
        } else {
            return [AuthManager_Errors.INCORRECT_PASSWORD, profile.userId];
        }
    }
}

export const authManager = AuthManager.instance;
export const AM_Errors = AuthManager_Errors;