import { mysqlSyncer as syncer } from "../../../data/index";
import { AuthModel } from "../../../data/models/auth-model";
import { compare, hash } from "bcrypt";
import { ReturnType } from "../../../extra";

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;

interface IAuthManager {
    addProfile(username: string, password: string): Promise<number>
    verifyProfile_byToken(token: string): Promise<number>
    verifyProfile_byPassword(username: string, password: string): Promise<number>
}


export class AuthManager {

    /**
     * Returns ReturnType object which contains userId.
     * if failed -1 is assigned to userId
     * @param username
     * @param password
     */
    async addProfile(username: string, password: string): Promise<ReturnType<number>> {
        let profile = new AuthModel();
        profile.username = username;
        profile.hash = await hash(password, SALT_ROUNDS);
        let [error, _] = await profile.sync(syncer).saveWithoutUserId();
        if (error.code == 0)
            return [error, profile.userId];
        return [error, -1];
    }


    async verifyProfile(username: string, password: string): Promise<number> {
        let profile = new AuthModel();
        profile.username = username;
        const [error, _] = await profile.sync(syncer).getByUsername();
        if (await compare(password, profile.hash)) {
            return profile.userId;
        } else {
            return -1;
        }
    }
}