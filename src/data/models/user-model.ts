import { Model, Syncer } from "../index";
import { ReturnType } from "../../extra";
import { ModelError } from "../../packages/errors/err-model";

export interface IUserData {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    role: number;
    officeID: number;
}

export class UserModel implements Model, IUserData {

    public static readonly NULL_Id = -1;
    public static readonly NULL_firstName = "";
    public static readonly NULL_lastName = "";
    public static readonly NULL_email = "";
    public static readonly NULL_telephone = "";
    public static readonly NULL_role = -1;
    public static readonly NULL_officeID = -1;

    public readonly databaseName: string;
    public readonly tableName: string;
    public id: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public telephone: string;
    public role: number;
    public officeID: number;


    constructor() {
        this.databaseName = "cms";
        this.tableName = "users";
        this.id = UserModel.NULL_Id;
        this.firstName = UserModel.NULL_firstName;
        this.lastName = UserModel.NULL_lastName;
        this.email = UserModel.NULL_email;
        this.telephone = UserModel.NULL_telephone;
        this.role = UserModel.NULL_role;
        this.officeID = UserModel.NULL_officeID;
    }


    public sync = (syncer: Syncer) => {
        return {
            getByUserID: (): Promise<ReturnType<UserModel>> => this.get_byUserId(syncer),
            saveWithoutUserID: (): Promise<ReturnType<UserModel>> => this.save_withoutUserId(syncer),
            saveWithUserID: (): Promise<ReturnType<UserModel>> => this.save_withUserId(syncer),
            deleteByUserID: (): Promise<ReturnType<UserModel>> => this.delete_byUserId(syncer)
        };
    };


    private get_byUserId = async (syncer: Syncer): Promise<ReturnType<UserModel>> => {
        if (this.id == UserModel.NULL_Id)
            return [ModelError.KEY_IS_NULL, this];

        try {
            const [results] = await syncer.execute(
                `SELECT DISTINCT * FROM ${this.databaseName}.${this.tableName} WHERE id = '${this.id}'`
            );
            const raw = results[0];

            this.id = raw.id;
            this.firstName = raw.first_name;
            this.lastName = raw.last_name;
            this.email = raw.email;
            this.telephone = raw.telephone;
            this.role = Number(raw.role);
            this.officeID = raw.office_id;

            return [ModelError.NO_ERRORS, this];

        } catch (e) {
            return [ModelError.SQL_ERROR, this];
        }
    };

    private async save_withoutUserId(syncer: Syncer): Promise<ReturnType<UserModel>> {
        if (this.firstName == UserModel.NULL_firstName ||
            this.lastName == UserModel.NULL_lastName ||
            this.email == UserModel.NULL_email ||
            this.telephone == UserModel.NULL_telephone ||
            this.role == UserModel.NULL_role ||
            this.officeID == UserModel.NULL_officeID
        ) return [ModelError.ESSENTIALS_ARE_NULL, this];

        try {
            const [results] = await syncer.execute(
                `INSERT INTO ${this.databaseName}.${this.tableName}
                    (first_name, last_name, email, telephone, role, office_id)
                 VALUES
                    ('${this.firstName}', '${this.lastName}', '${this.email}', '${this.telephone}', '${this.role}', ${this.officeID})`
            );

            this.id = results.insertId;
            return [ModelError.NO_ERRORS, this];
        } catch (e) {
            return [ModelError.SQL_ERROR, this];
        }
    }


    private async save_withUserId(syncer: Syncer): Promise<ReturnType<UserModel>> {
        if (this.id == UserModel.NULL_Id ||
            this.firstName == UserModel.NULL_firstName ||
            this.lastName == UserModel.NULL_lastName ||
            this.email == UserModel.NULL_email ||
            this.telephone == UserModel.NULL_telephone ||
            this.role == UserModel.NULL_role ||
            this.officeID == UserModel.NULL_officeID
        ) return [ModelError.ESSENTIALS_ARE_NULL, this];

        try {
            await syncer.execute(
                `INSERT INTO ${this.databaseName}.${this.tableName}
                    (id, first_name, last_name, email, telephone, role, permission, office_id)
                 VALUES
                    (${this.id}, ${this.firstName}', '${this.lastName}', 
                    '${this.email}', '${this.telephone}', '${this.role}', 
                    ${this.officeID})`
            );

            return [ModelError.NO_ERRORS, this];

        } catch (e) {
            return [ModelError.SQL_ERROR, this];
        }
    }

    private async delete_byUserId(syncer: Syncer): Promise<ReturnType<UserModel>> {
        if (this.id == UserModel.NULL_Id)
            return [ModelError.KEY_IS_NULL, this];

        try {
            await syncer.execute(
                `DELETE FROM ${this.databaseName}.${this.tableName}
                    WHERE id = ${this.id}`
            );
            this.id = UserModel.NULL_Id;

            return [ModelError.NO_ERRORS, this];
        } catch (e) {
            return [ModelError.SQL_ERROR, this];
        }

    }

}