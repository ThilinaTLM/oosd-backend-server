import { Connection, Repository } from "typeorm";
import { MUser } from "../entity/MUser";

export class UserDataSource {
    private _repository: Repository<MUser>

    constructor(connection: Connection) {
        this._repository = connection.getRepository(MUser);
    }

    public async getUser_byId(id: number) {
        return await this._repository.findOne({id})
    }
}