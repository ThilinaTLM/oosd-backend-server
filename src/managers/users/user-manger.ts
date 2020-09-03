import { User } from "../../packages/core/User";


export class UserManger {
    // singleton
    private static _instance: UserManger;
    static get instance(): UserManger {
        if (!this._instance) {
            this._instance = new UserManger();
        }
        return this._instance;
    }

    private constructor() {
    }

    async getUserByID(userID: number) {

    }
}