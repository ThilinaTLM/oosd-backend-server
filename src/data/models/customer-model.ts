import { Model, Syncer } from "../index";
import { ReturnType } from "../../extra";

class CustomerModel implements Model {

    public static readonly NULL_Id = -1;
    public static readonly NULL_fullName = "";
    public static readonly NULL_Nic = "";
    public static readonly NULL_Email = "";
    public static readonly NULL_Telephone = "";
    public static readonly NULL_Address = "";
    public static readonly NULL_DivisionalOfficeID = -1;
    public static readonly NULL_GnOffice = "";

    public readonly databaseName: string;
    public readonly tableName: string;
    public id: number;
    public fullName: string;
    public nic: string;
    public email: string;
    public telephone: string;
    public address: string;
    public divisionalOfficeID: number;
    public gnOffice: string;

    constructor() {
        this.databaseName = "cms";
        this.tableName = "customers";
        this.id = CustomerModel.NULL_Id;
        this.fullName = CustomerModel.NULL_fullName;
        this.nic = CustomerModel.NULL_Nic;
        this.email = CustomerModel.NULL_Email;
        this.telephone = CustomerModel.NULL_Telephone;
        this.address = CustomerModel.NULL_Address;
        this.divisionalOfficeID = CustomerModel.NULL_DivisionalOfficeID;
        this.gnOffice = CustomerModel.NULL_GnOffice;

    }

    public sync = (syncer: Syncer) => {
        return {
            getByCustomerId: (): Promise<ReturnType<CustomerModel>> => this.get_byCustomerId(syncer),
            saveWithoutCustomerId: (): Promise<ReturnType<CustomerModel>> => this.save_withoutCustomerId(syncer),
            saveWithUCustomerId: (): Promise<ReturnType<CustomerModel>> => this.save_withCustomerId(syncer),
            deleteByCustomerId: (): Promise<ReturnType<CustomerModel>> => this.delete_byCustomerId(syncer)
        };
    };


    private get_byCustomerId = async (syncer: Syncer): Promise<ReturnType<CustomerModel>> => {
        if (this.id == CustomerModel.NULL_Id)
            return [{ code: 1, msg: "Id cannot be NULL" }, this];

        try {
            const [results] = await syncer.execute(
                `SELECT DISTINCT * FROM ${this.databaseName}.${this.tableName} WHERE id = '${this.id}'`
            );
            const raw = results[0];

            this.id = raw.id;
            this.fullName = raw.full_name;
            this.nic = raw.nic;
            this.email = raw.email;
            this.telephone = raw.telephone;
            this.address = raw.address;
            this.divisionalOfficeID = raw.divisional_office_id;
            this.gnOffice = raw.gn_office;

            return [{ code: 0, msg: "" }, this];

        } catch (e) {
            console.log("[SQL][ERROR]:", e.sqlMessage);
            return [{ code: 2, msg: e.sqlMessage }, this];
        }
    };

    private async save_withoutCustomerId(syncer: Syncer): Promise<ReturnType<CustomerModel>> {
        if (
            this.fullName == CustomerModel.NULL_fullName ||
            this.nic == CustomerModel.NULL_Nic ||
            this.address == CustomerModel.NULL_Address ||
            this.divisionalOfficeID == CustomerModel.NULL_DivisionalOfficeID ||
            this.gnOffice == CustomerModel.NULL_GnOffice
        ) return [{ code: 1, msg: "Essential Details cannot be NULL" }, this];

        try {
            const [results] = await syncer.execute(
                `INSERT INTO ${this.databaseName}.${this.tableName}
                    (full_name, nic, email, telephone, address, divisional_office_id, gn_office)
                 VALUES
                    ('${this.fullName}', '${this.nic}', '${this.email}', '${this.telephone}', '${this.address}', '${this.divisionalOfficeID}', '${this.gnOffice}')`
            );

            this.id = results.insertId;
            return [{ code: 0, msg: "" }, this];
        } catch (e) {
            console.log("[SQL][ERROR]:", e.sqlMessage);
            return [{ code: 2, msg: e.sqlMessage }, this];
        }
    }


    private async save_withCustomerId(syncer: Syncer): Promise<ReturnType<CustomerModel>> {
        if (
            this.id == CustomerModel.NULL_Id ||
            this.fullName == CustomerModel.NULL_fullName ||
            this.nic == CustomerModel.NULL_Nic ||
            this.address == CustomerModel.NULL_Address ||
            this.divisionalOfficeID == CustomerModel.NULL_DivisionalOfficeID ||
            this.gnOffice == CustomerModel.NULL_GnOffice
        ) return [{ code: 1, msg: "Essential details cannot be NULL" }, this];

        try {
            await syncer.execute(
                `INSERT INTO ${this.databaseName}.${this.tableName}
                    (id, full_name, nic, email, telephone, address, divisional_office_id, gn_office)
                 VALUES
                    (${this.id}, ${this.fullName}', '${this.nic}', '${this.email}', '${this.telephone}', '${this.address}', '${this.divisionalOfficeID}', '${this.gnOffice}')`
            );

            return [{ code: 0, msg: "" }, this];

        } catch (e) {
            console.log("[SQL][ERROR]:", e.sqlMessage);
            return [{ code: 2, msg: e.sqlMessage }, this];
        }
    }

    private async delete_byCustomerId(syncer: Syncer): Promise<ReturnType<CustomerModel>> {
        if (this.id == CustomerModel.NULL_Id)
            return [{ code: 1, msg: "CustomerId cannot be NULL" }, this];

        try {
            await syncer.execute(
                `DELETE FROM ${this.databaseName}.${this.tableName}
                    WHERE id = ${this.id}`
            );
            this.id = CustomerModel.NULL_Id;

            return [{ code: 0, msg: "" }, this];
        } catch (e) {
            console.log("[SQL][ERROR]:", e.sqlMessage);
            return [{ code: 2, msg: e.sqlMessage }, this];
        }

    }


}


