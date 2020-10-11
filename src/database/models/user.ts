import { v4 as genUUID } from "uuid";
import { BuildMapper, mp } from "../core/mapper";
import { mysqlExeEW } from "../core/eWrapper/mysql";
import { QBuild } from "../core/qBuilder";
import { MErr, ModelError } from "../index";

export interface UserData {
    userId: string;
    username: string;
    hash: string;
    verified: boolean;
    role: string;

    firstName: string;
    lastName: string;
    email: string;
    telephoneNumber: string;
    office: string;
}


const mapper = BuildMapper<UserData>([
    mp("user_id", "userId"),
    mp("first_name", "firstName"),
    mp("last_name", "lastName"),
    mp("telephone_number", "telephoneNumber")
]);


export const user = {
    getUserAccount: async (username: string): Promise<[ModelError, UserData]> => {
        if (!username) {
            return [MErr.WRONG_ARGUMENTS, {} as UserData];
        }

        let [error, data] = await mysqlExeEW.run(
            `SELECT * FROM users u
            JOIN credentials c ON c.user_id = u.user_id
            WHERE username = ?`,
            [username]
        );

        // Check results and Convert the into proper format
        if (error === "") {
            if (data[0].length == 0) {
                return [MErr.NO_ENTRY_FOUND, data as UserData];
            }
            data = mapper.forward(data[0][0]);
        }

        return [error, data as UserData];
    },

    addUser: async (data: any): Promise<[ModelError, string]> => {
        const args = [
            genUUID(),
            data.role,

            data.firstName,
            data.lastName,
            data.email,
            data.telephoneNumber,
            data.office,

            data.username,
            data.hash,
            data.verified
        ];
        const [error, _] = await mysqlExeEW.run(
            `CALL AddAccount(${QBuild.ARGS_STRING(args.length)})`,
            args
        );
        return [error, args[0] as string];
    },

    getUser: async (condition: any): Promise<[ModelError, UserData[]]> => {
        condition = mapper.backward(condition);

        const [error, results] = await mysqlExeEW.run(...QBuild.SELECT_USER(condition));

        let users;
        if (error === "") { // if error
            users = results[0]; // [results, fields]
            for (let i = 0; i < users.length; i++) {
                users[i] = mapper.forward(users[i]);
            }
        }

        return [error, users];

    },

    updateUserDetails: async (userId: string, data: any): Promise<ModelError> => {
        // remove unique fields
        delete data.userId;

        data = mapper.backward(data);

        const [error, _] = await mysqlExeEW.run(...QBuild.UPDATE("users", data, { user_id: userId }));
        return error;
    },

    updateCredentials: async (userId: string, data: any): Promise<ModelError> => {

        const [error, _] = await mysqlExeEW.run(...QBuild.UPDATE("credentials", data , { user_id: userId }));
        return error;
    },

    checkUsername: async (username: string): Promise<[ModelError, boolean]> => {

        const [error, data] = await mysqlExeEW.run(...QBuild.SELECT("credentials", { username }));

        if (error !== "") { // if any error happens
            return [error, true];
        }

        return [error, data[0].length !== 0];
    }
};





