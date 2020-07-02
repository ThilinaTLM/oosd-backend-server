import { Connection, Repository } from "typeorm";
import { MDivision } from "../entity/MDivision";

export class DivisionDataSource {
    private _repository: Repository<MDivision>

    constructor(connection: Connection) {
        this._repository = connection.getRepository(MDivision);
    }

    async getDivision_byName(name: string): Promise<MDivision | undefined> {
        return this._repository.findOne({name});
    }

    async getDivision_byId(id: number): Promise<MDivision | undefined> {
        return this._repository.findOne({id});
    }

    async createOrUpdateDivision(name: string): Promise<MDivision> {
        let div = new MDivision();
        div.name = name;
        return await this._repository.save(div);
    }
}