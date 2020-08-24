import { Model, Syncer } from "../index";
import { ReturnType } from "../../extra";


export interface IDivisionModel{
    id:number;
    divisionName: string;
}


export class DivisionModel implements Model {

    public static readonly NULL_Id = -1;
    public static readonly NULL_divisionName = "";
    
    public readonly databaseName: string;
    public readonly tableName: string;
    public id: number;
    public divisionName: string;

    constructor(){
        this.databaseName = "cms";
        this.tableName = "divisional_offices";
        this.id = DivisionModel.NULL_Id;
        this.divisionName = DivisionModel.NULL_divisionName;
    }

    public sync = (syncer: Syncer) => {
        return {
            getByDivisionId: (): Promise<ReturnType<DivisionModel>> => this.get_byDivisionId(syncer),
            saveWithoutDivisionId: (): Promise<ReturnType<DivisionModel>> => this.save_withoutDivisionId(syncer),
            saveWithDivisionId: (): Promise<ReturnType<DivisionModel>> => this.save_withDivisionId(syncer),
            deleteByDivisionId: (): Promise<ReturnType<DivisionModel>> => this.delete_byDivisionId(syncer)
        };
    };
 
    private get_byDivisionId = async (syncer: Syncer): Promise<ReturnType<DivisionModel>> => {
        if (this.id == DivisionModel.NULL_Id)
            return [{ code: 1, msg: "Id cannot be NULL" }, this];

        try {
            const [results] = await syncer.execute(
                `SELECT DISTINCT * FROM ${this.databaseName}.${this.tableName} WHERE id = '${this.id}'`
            );
            const raw = results[0];

            this.id = raw.id;
            this.divisionName = raw.division_name;
            
            return [{ code: 0, msg: "" }, this];

        } catch (e) {
            console.log("[SQL][ERROR]:", e.sqlMessage);
            return [{ code: 2, msg: e.sqlMessage }, this];
        }
    };

    private async save_withoutDivisionId(syncer: Syncer): Promise<ReturnType<DivisionModel>> {
        if ( this.divisionName == DivisionModel.NULL_divisionName )
            return [{ code: 1, msg: "Essential Details cannot be NULL" }, this];

        try {
            const [results] = await syncer.execute(
                `INSERT INTO ${this.databaseName}.${this.tableName}
                    (division_name)
                 VALUES
                    ('${this.divisionName}')`
            );

            this.id = results.insertId;
            return [{ code: 0, msg: "" }, this];
        } catch (e) {
            console.log("[SQL][ERROR]:", e.sqlMessage);
            return [{ code: 2, msg: e.sqlMessage }, this];
        }
    }

    private async save_withDivisionId(syncer: Syncer): Promise<ReturnType<DivisionModel>> {
        if (this.id == DivisionModel.NULL_Id || this.divisionName == DivisionModel.NULL_divisionName )
            return [{ code: 1, msg: "Essential details cannot be NULL" }, this];

        try {
            await syncer.execute(
                `INSERT INTO ${this.databaseName}.${this.tableName}
                    (id, division_name)
                 VALUES
                    (${this.id}, ${this.divisionName}')`
            );

            return [{ code: 0, msg: "" }, this];

        } catch (e) {
            console.log("[SQL][ERROR]:", e.sqlMessage);
            return [{ code: 2, msg: e.sqlMessage }, this];
        }
    }

    private async delete_byDivisionId(syncer: Syncer): Promise<ReturnType<DivisionModel>> {
        if (this.id == DivisionModel.NULL_Id)
            return [{ code: 1, msg: "DivisionID cannot be NULL" }, this];

        try {
            await syncer.execute(
                `DELETE FROM ${this.databaseName}.${this.tableName}
                    WHERE id = ${this.id}`
            );
            this.id = DivisionModel.NULL_Id;

            return [{ code: 0, msg: "" }, this];
        } catch (e) {
            console.log("[SQL][ERROR]:", e.sqlMessage);
            return [{ code: 2, msg: e.sqlMessage }, this];
        }

    }

}