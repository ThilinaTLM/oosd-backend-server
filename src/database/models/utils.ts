import { mysqlExeEW } from "../core/eWrapper/mysql";
import { QBuild } from "../core/qBuilder";
import { ModelError } from "../index";

interface Office {
    name :string,
    address: string
}

export const utils = {

    getAllDivisions: async (): Promise<[ModelError, Office[]]> => {
        const [error, data] = await mysqlExeEW.run('SELECT * FROM divisional_offices');
        return [error, data[0]];
    },

    getAllGNOffices: async (): Promise<[ModelError, Office[]]> => {
        const [error, data] = await mysqlExeEW.run('SELECT * FROM grama_niladhari_offices');
        return [error, data[0]];
    },

    addDivision: async (name: string, address: string): Promise<ModelError> => {
        const [error, _] = await mysqlExeEW.run(
            ...QBuild.INSERT("divisional_offices",
                {
                    name,
                    address
                }
            ));
        return error
    },

    addGNOffice: async (name: string, address: string): Promise<ModelError> => {
        const [error, _] = await mysqlExeEW.run(
            ...QBuild.INSERT("grama_niladhari_offices",
                {
                    name,
                    address
                }
            ));
        return error
    },
};