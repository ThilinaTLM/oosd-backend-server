import { Model, Syncer } from "../index";
import { ReturnType } from "../../extra";

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
            saveWithoutUserId: (): Promise<ReturnType<UserModel>> => this.save_withoutUserId(syncer),
            saveWithUserId: (): Promise<ReturnType<UserModel>> => this.save_withUserId(syncer),
            deleteByUserId: (): Promise<ReturnType<UserModel>> => this.delete_byUserId(syncer)
        };
    };

    
    private get_byUserId = async (syncer: Syncer): Promise<ReturnType<UserModel>> => {
        if (this.id == UserModel.NULL_Id)
            return [{ code: 1, msg: "Id cannot be NULL" }, this];

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
            this.role = raw.role;
            this.permission = raw.permission;
            this.officeID = raw.office_id;

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
            const [results] = await syncer.execute(
                `INSERT INTO ${this.databaseName}.${this.tableName}
                    (first_name, last_name, email, telephone, role, permission, office_id)
                 VALUES
                    ('${this.firstName}', '${this.lastName}', '${this.email}', '${this.telephone}', '${this.role}', '${this.permission}', ${this.officeID})`
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
            await syncer.execute(
                `INSERT INTO ${this.databaseName}.${this.tableName}
                    (id, first_name, last_name, email, telephone, role, permission, office_id)
                 VALUES
                    (${this.id}, ${this.firstName}', '${this.lastName}', '${this.email}', '${this.telephone}', '${this.role}', '${this.permission}', ${this.officeID})`
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