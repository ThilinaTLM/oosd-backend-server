import { Model, Syncer } from "../index";
import { ReturnType } from "../../extra";


export interface IComplaintModel {
    id : number;
    referenceNumber: number;
    origin: string;
    assignTo: number;
    submotTo: number;
    customer: number;
    subject: String;
    description: string;
    attachments: string;
    createdDate: Date;
    assignedDate: Date;
    currentState: number;
    log: object;

}


export class ComplaintModel implements Model {

    public static readonly NULL_Id = -1;
    public static readonly NULL_referenceNumber = -1;
    public static readonly NULL_Origin = "";
    public static readonly NULL_assignTo = -1;
    public static readonly NULL_submitBy = -1;
    public static readonly NULL_Customer = -1;
    public static readonly NULL_Subject = "";
    public static readonly NULL_Description = "";
    public static readonly NULL_Attachments = "";
    public static readonly NULL_createdDate = new Date("1990-01-01T00:00:00");
    public static readonly NULL_assignedDate = new Date("1990-01-01T00:00:00");
    public static readonly NULL_currentState = -1;
    public static readonly NULL_Log = {"null":"null"};

    public readonly databaseName: string;
    public readonly tableName: string;
    public id: number;
    public referenceNumber: number;
    public origin: string;
    public assignTo: number;
    public submitBy: number;
    public customer: number;
    public subject: string;
    public description: string;
    public attachments: string;
    public createdDate: Date;
    public assignedDate: Date;
    public currentState: number;
    public log: object;

    constructor() {
        this.databaseName = "cms";
        this.tableName = "complaints";
        this.id = ComplaintModel.NULL_Id;
        this.referenceNumber = ComplaintModel.NULL_referenceNumber;
        this.origin = ComplaintModel.NULL_Origin;
        this.assignTo = ComplaintModel.NULL_assignTo;
        this.submitBy = ComplaintModel.NULL_submitBy;
        this.customer = ComplaintModel.NULL_Customer;
        this.subject = ComplaintModel.NULL_Subject;
        this.description = ComplaintModel.NULL_Description;
        this.attachments = ComplaintModel.NULL_Attachments;
        this.createdDate = ComplaintModel.NULL_createdDate;
        this.assignedDate = ComplaintModel.NULL_assignedDate;
        this.currentState = ComplaintModel.NULL_currentState;
        this.log = ComplaintModel.NULL_Log;

    }

    public sync = (syncer: Syncer) => {
        return {
            getByUserId: (): Promise<ReturnType<ComplaintModel>> => this.get_byUserId(syncer),
            saveWithoutUserId: (): Promise<ReturnType<ComplaintModel>> => this.save_withoutUserId(syncer),
            saveWithUserId: (): Promise<ReturnType<ComplaintModel>> => this.save_withUserId(syncer),
            deleteByUserId: (): Promise<ReturnType<ComplaintModel>> => this.delete_byUserId(syncer)
        };
    };


    private get_byUserId = async (syncer: Syncer): Promise<ReturnType<ComplaintModel>> => {
        if (this.id == ComplaintModel.NULL_Id)
            return [{ code: 1, msg: "Id cannot be NULL" }, this];

        try {
            const [results] = await syncer.execute(
                `SELECT DISTINCT * FROM ${this.databaseName}.${this.tableName} WHERE id = '${this.id}'`
            );
            const raw = results[0];

            this.id = raw.id;
            this.referenceNumber = raw.reference_number;
            this.origin = raw.origin;
            this.assignTo = raw.assign_to;
            this.submitBy = raw.submit_by;
            this.customer = raw.customer;
            this.subject = raw.subject;
            this.description = raw.description;
            this.attachments = raw.attachments;
            this.createdDate = raw.created_date;
            this.assignedDate = raw.assigned_date;
            this.currentState = raw.current_state;
            this.log = raw.log;

            return [{ code: 0, msg: "" }, this];

        } catch (e) {
            console.log("[SQL][ERROR]:", e.sqlMessage);
            return [{ code: 2, msg: e.sqlMessage }, this];
        }
    };

    private async save_withoutUserId(syncer: Syncer): Promise<ReturnType<ComplaintModel>> {
        if (
            this.referenceNumber == ComplaintModel.NULL_referenceNumber ||
            this.origin == ComplaintModel.NULL_Origin ||
            this.assignTo == ComplaintModel.NULL_assignTo ||
            this.subject == ComplaintModel.NULL_Subject ||
            this.description == ComplaintModel.NULL_Description ||
            this.createdDate == ComplaintModel.NULL_createdDate ||
            this.currentState == ComplaintModel.NULL_currentState ||
            this.log == ComplaintModel.NULL_Log

        ) return [{ code: 1, msg: "Essential Details cannot be NULL" }, this];

        try {
            const [results] = await syncer.execute(
                `INSERT INTO ${this.databaseName}.${this.tableName}
                    (reference_number, origin, assign_to, submit_by, customer, subject, description, attachments)
                 VALUES
                    ('${this.referenceNumber}', '${this.origin}', '${this.assignTo}', '${this.submitBy}', '${this.customer}', '${this.subject}', '${this.description}', '${this.attachments}')`
            );

            this.id = results.insertId;
            return [{ code: 0, msg: "" }, this];
        } catch (e) {
            console.log("[SQL][ERROR]:", e.sqlMessage);
            return [{ code: 2, msg: e.sqlMessage }, this];
        }
    }


    private async save_withUserId(syncer: Syncer): Promise<ReturnType<ComplaintModel>> {
        if (
            this.id == ComplaintModel.NULL_Id ||
            this.referenceNumber == ComplaintModel.NULL_referenceNumber ||
            this.origin == ComplaintModel.NULL_Origin ||
            this.assignTo == ComplaintModel.NULL_assignTo ||
            this.subject == ComplaintModel.NULL_Subject ||
            this.description == ComplaintModel.NULL_Description ||
            this.createdDate == ComplaintModel.NULL_createdDate ||
            this.currentState == ComplaintModel.NULL_currentState ||
            this.log == ComplaintModel.NULL_Log

        ) return [{ code: 1, msg: "Essential details cannot be NULL" }, this];

        try {
            await syncer.execute(
                `INSERT INTO ${this.databaseName}.${this.tableName}
                    (id, reference_number, origin, assign_to, submit_by, customer, subject, description, attachments)
                 VALUES
                    (${this.id}, '${this.referenceNumber}', '${this.origin}', '${this.assignTo}', '${this.submitBy}', '${this.customer}', '${this.subject}', '${this.description}', '${this.attachments}')`
            );

            return [{ code: 0, msg: "" }, this];

        } catch (e) {
            console.log("[SQL][ERROR]:", e.sqlMessage);
            return [{ code: 2, msg: e.sqlMessage }, this];
        }
    }

    private async delete_byUserId(syncer: Syncer): Promise<ReturnType<ComplaintModel>> {
        if (this.id == ComplaintModel.NULL_Id)
            return [{ code: 1, msg: "userId cannot be NULL" }, this];

        try {
            await syncer.execute(
                `DELETE FROM ${this.databaseName}.${this.tableName}
                    WHERE id = ${this.id}`
            );
            this.id = ComplaintModel.NULL_Id;

            return [{ code: 0, msg: "" }, this];
        } catch (e) {
            console.log("[SQL][ERROR]:", e.sqlMessage);
            return [{ code: 2, msg: e.sqlMessage }, this];
        }

    }


}


