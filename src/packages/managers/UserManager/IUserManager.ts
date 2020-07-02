import User from "../../core/User";

export interface IUserManager {
    getUser(id: number): Promise<User>;
}