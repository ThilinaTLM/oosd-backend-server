import { DIVISION_MANAGER_ERRORS} from "./errors";
import { DivisionModel } from "../../data/models/division-model";
import {mysqlSyncer} from "../../data";

export interface Division {
    id: number;
    name: string;
}

class DivisionManager {
    static ERR = DIVISION_MANAGER_ERRORS;

    // singleton
    private static _instance: DivisionManager;
    static get instance() {
        if (!this._instance) {
            this._instance = new DivisionManager()
        }
        return this._instance;
    }

    private constructor() {
    }

    getDivisionByID(id: number): Division {

    }

}