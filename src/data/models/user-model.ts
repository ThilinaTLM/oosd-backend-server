import { Model, Syncer } from "../index";
import { ReturnType } from "../../extra";
import { User } from "../../packages/core/User";

class UserModel implements Model {

    public static readonly NULL_Id = -1;
    public static readonly NULL_firstName = "";
    public static readonly NULL_lastName = "";
    public static readonly NULL_email = "";
    public static readonly NULL_telephone = "";
    public static readonly NULL_role = -1;
    public static readonly NULL_permission = -1;
    public static readonly NULL_officeID = -1;

    public readonly databaseName: string;
    public readonly tableName: string;
    public id: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public telephone: string;
    public role: number;
    public permission: number;
    public officeID: number;


    constructor(){
        this.databaseName = "cms";
        this.tableName = "users";
        this.id = UserModel.NULL_Id;
        this.firstName = UserModel.NULL_firstName;
        this.lastName = UserModel.NULL_lastName;
        this.email = UserModel.NULL_email;
        this.telephone = UserModel.NULL_telephone;
        this.role = UserModel.NULL_role;
        this.permission = UserModel.NULL_permission;
        this.officeID = UserModel.NULL_officeID;
    }


    public sync = (syncer: Syncer) => {
        return {
            getByUserId: (): Promise<ReturnType<UserModel>> => this.get_byUserId(syncer),
            save_withoutUserId: (): Promise<ReturnType<UserModel>> => this.save_withoutUserId(syncer),
            save_withUserId: (): Promise<ReturnType<UserModel>> => this.save_withUserId(syncer),
            delete_byUserId: (): Promise<ReturnType<UserModel>> => this.delete_byUserId(syncer)
        };
    };

    
    private get_byUserId = async (syncer: Syncer): Promise<ReturnType<UserModel>> => {
        if (this.id == UserModel.NULL_Id)
            return [{ code: 1, msg: "Id cannot be NULL" }, this];

        try {
            const [results, fields] = await syncer.execute(
                `SELECT DISTINCT * FROM ${this.databaseName}.${this.tableName} WHERE id = '${this.id}'`
            );
            const raw = results[0];

            this.id = raw.id;
            this.firstName = raw.firstName;
            this.lastName = raw.lastName;
            this.email = raw.email;
            this.telephone = raw.telephone;
            this.role = raw.role;
            this.permission = raw.permission;
            this.officeID = raw.officeID;

            return [{ code: 0, msg: "" }, this];

        } catch (e) {
            console.log("[SQL][ERROR]:", e.sqlMessage);
            return [{ code: 2, msg: e.sqlMessage }, this];
        }
    };

    private async save_withoutUserId(syncer: Syncer): Promise<ReturnType<UserModel>> {
        if (this.firstName == UserModel.NULL_firstName || this.lastName == UserModel.NULL_lastName || this.email == UserModel.NULL_email || this.telephone == UserModel.NULL_telephone || this.role == UserModel.NULL_role || this.permission ==UserModel.NULL_permission || this.officeID == UserModel.NULL_officeID )
            return [{ code: 1, msg: "Essential Details cannot be NULL" }, this];

        try {
            const [results, fields] = await syncer.execute(
                `INSERT INTO ${this.databaseName}.${this.tableName}
                    (firstName, lastName, email, telephone, role, permission, officeID)
                 VALUES
                    ('${this.firstName}', '${this.lastName}', '${this.email}', '${this.telephone}', '${this.role}', '${this.permission}', '${this.officeID}')`
            );

            this.id = results.insertId;
            return [{ code: 0, msg: "" }, this];
        } catch (e) {
            console.log("[SQL][ERROR]:", e.sqlMessage);
            return [{ code: 2, msg: e.sqlMessage }, this];
        }
    }



    private async save_withUserId(syncer: Syncer): Promise<ReturnType<UserModel>> {
        if (this.id == UserModel.NULL_Id || this.firstName == UserModel.NULL_firstName || this.lastName == UserModel.NULL_lastName || this.email == UserModel.NULL_email || this.telephone == UserModel.NULL_telephone || this.role == UserModel.NULL_role || this.permission == UserModel.NULL_permission || this.officeID == UserModel.NULL_officeID )
            return [{ code: 1, msg: "Essential details cannot be NULL" }, this];

        try {
            const [results, fields] = await syncer.execute(
                `INSERT INTO ${this.databaseName}.${this.tableName}
                    (id, firstName, lastName, email, telephone, role, permission, officeID)
                 VALUES
                    (${this.id}, ${this.firstName}', '${this.lastName}', '${this.email}', '${this.telephone}', '${this.role}', '${this.permission}', '${this.officeID}')`
            );

            return [{ code: 0, msg: "" }, this];

        } catch (e) {
            console.log("[SQL][ERROR]:", e.sqlMessage);
            return [{ code: 2, msg: e.sqlMessage }, this];
        }
    }

    private async delete_byUserId(syncer: Syncer): Promise<ReturnType<UserModel>> {
        if (this.id == UserModel.NULL_Id)
            return [{ code: 1, msg: "userId cannot be NULL" }, this];

        try {
            await syncer.execute(
                `DELETE FROM ${this.databaseName}.${this.tableName}
                    WHERE id = ${this.id}`
            );
            this.id = UserModel.NULL_Id;

            return [{ code: 0, msg: "" }, this];
        } catch (e) {
            console.log("[SQL][ERROR]:", e.sqlMessage);
            return [{ code: 2, msg: e.sqlMessage }, this];
        }

    }










}