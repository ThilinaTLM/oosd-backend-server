import {err} from "../../extra";

export class DIVISION_MANAGER_ERRORS {
    static USERNAME_NOT_EXIST = err(101, "username not found");
    static INCORRECT_PASSWORD = err(102, "incorrect password");
};