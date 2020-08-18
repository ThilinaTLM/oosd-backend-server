import { Model, Syncer } from "../index";
import { ReturnType } from "../../extra";


export interface IGramaNiladariModel{
    id:number;
    gnDivisionName: string;
}


export class GramaNiladariModel implements Model {

    public static readonly NULL_Id = -1;
    public static readonly NULL_gnDivisionName = "";
    
    public readonly databaseName: string;
    public readonly tableName: string;
    public id: number;
    public gnDivisionName: string;

    constructor(){
        this.databaseName = "cms";
        this.tableName = "grama_niladhari_offices";
        this.id = GramaNiladariModel.NULL_Id;
        this.gnDivisionName = GramaNiladariModel.NULL_gnDivisionName;
    }

    public sync = (syncer: Syncer) => {
        return {
            getByGnId: (): Promise<ReturnType<GramaNiladariModel>> => this.get_byGnId(syncer),
            saveWithoutGnId: (): Promise<ReturnType<GramaNiladariModel>> => this.save_withoutGnId(syncer),
            saveWithGnId: (): Promise<ReturnType<GramaNiladariModel>> => this.save_withGnId(syncer),
            deleteByGnId: (): Promise<ReturnType<GramaNiladariModel>> => this.delete_byGnId(syncer)
        };
    };
 
    private get_byGnId = async (syncer: Syncer): Promise<ReturnType<GramaNiladariModel>> => {
        if (this.id == GramaNiladariModel.NULL_Id)
            return [{ code: 1, msg: "Id cannot be NULL" }, this];

        try {
            const [results] = await syncer.execute(
                `SELECT DISTINCT * FROM ${this.databaseName}.${this.tableName} WHERE id = '${this.id}'`
            );
            const raw = results[0];

            this.id = raw.id;
            this.gnDivisionName = raw.gn_division_name;
            
            return [{ code: 0, msg: "" }, this];

        } catch (e) {
            console.log("[SQL][ERROR]:", e.sqlMessage);
            return [{ code: 2, msg: e.sqlMessage }, this];
        }
    };

    private async save_withoutGnId(syncer: Syncer): Promise<ReturnType<GramaNiladariModel>> {
        if ( this.gnDivisionName == GramaNiladariModel.NULL_gnDivisionName )
            return [{ code: 1, msg: "Essential Details cannot be NULL" }, this];

        try {
            const [results] = await syncer.execute(
                `INSERT INTO ${this.databaseName}.${this.tableName}
                    (gn_division_name)
                 VALUES
                    ('${this.gnDivisionName}')`
            );

            this.id = results.insertId;
            return [{ code: 0, msg: "" }, this];
        } catch (e) {
            console.log("[SQL][ERROR]:", e.sqlMessage);
            return [{ code: 2, msg: e.sqlMessage }, this];
        }
    }

    private async save_withGnId(syncer: Syncer): Promise<ReturnType<GramaNiladariModel>> {
        if (this.id == GramaNiladariModel.NULL_Id || this.gnDivisionName == GramaNiladariModel.NULL_gnDivisionName )
            return [{ code: 1, msg: "Essential details cannot be NULL" }, this];

        try {
            await syncer.execute(
                `INSERT INTO ${this.databaseName}.${this.tableName}
                    (id, gn_division_name)
                 VALUES
                    (${this.id}, ${this.gnDivisionName}')`
            );

            return [{ code: 0, msg: "" }, this];

        } catch (e) {
            console.log("[SQL][ERROR]:", e.sqlMessage);
            return [{ code: 2, msg: e.sqlMessage }, this];
        }
    }

    private async delete_byGnId(syncer: Syncer): Promise<ReturnType<GramaNiladariModel>> {
        if (this.id == GramaNiladariModel.NULL_Id)
            return [{ code: 1, msg: "userId cannot be NULL" }, this];

        try {
            await syncer.execute(
                `DELETE FROM ${this.databaseName}.${this.tableName}
                    WHERE id = ${this.id}`
            );
            this.id = GramaNiladariModel.NULL_Id;

            return [{ code: 0, msg: "" }, this];
        } catch (e) {
            console.log("[SQL][ERROR]:", e.sqlMessage);
            return [{ code: 2, msg: e.sqlMessage }, this];
        }

    }

}