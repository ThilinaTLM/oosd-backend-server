import { Permission } from "./";

export class PTypes {
    public static ALL: Permission = { code: 2** 32 - 1, name:"full access" };
    public static ADD_USER: Permission = { code: 1, name:"add new user" };
    public static DELETE_USER: Permission = { code: 2, name:"delete user" };
    public static UPDATE_USER: Permission = { code: 4, name:"update user" };
}