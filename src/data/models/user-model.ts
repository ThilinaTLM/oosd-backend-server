import { Model, Syncer } from "../index";

class UserModel implements Model {

    private _id?: number;
    private _firstName?: string;
    private _lastName?: string;
    private _email?: string;
    private _telephone?: string;
    private _role?: number;
    private _permission?: number;
    private _office_id?: number;

    public sync = (syncer: Syncer) => {
        return {
            // byID: () => this.pull_byID(syncer)
        };
    };

    // private pull_byID = async (syncer: Syncer): Promise<UserModel> => {

    //     return this;
    // };

}