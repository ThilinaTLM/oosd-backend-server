import { IUserManager } from "./IUserManager";
import {User} from "../../core/User";
import { DatabaseService } from "../../../data/DatabaseService";

export class UserManager implements IUserManager {
    private _databaseService: DatabaseService;

    constructor(databaseService: DatabaseService) {
        this._databaseService = databaseService;
    }

    public async getUser(id: number): Promise<User> {
        let user = await this._databaseService.dataSource_users.getUser_byId(id);
        if (!user) {
            return User.NullUser;
        }
        return new User();
    }

    public async addUser(user: User) {

    }

}
