import { v4 as genUUID } from "uuid";
import { BuildMapper, mp } from "../core/mapper";
import { mysqlExeEW } from "../core/eWrapper/mysql";
import { QBuild } from "../core/qBuilder";
import { ModelError } from "../index";

interface CustomerData {
    customerId: string,
    fullName: string,
    nic: string,
    email: string,
    telephone: string,
    address: string,

    divisionalOffice: string,
    gnOffice: string
}

const mapper = BuildMapper<CustomerData>([
    mp("customer_id", "customerId"),
    mp("full_name", "fullName"),
    mp("divisional_office", "divisionalOffice"),
    mp("gn_office", "gnOffice")
]);

export const customer = {
    addCustomer: async (data: any): Promise<[ModelError, string]> => {
        // convert into database name convention
        data = mapper.backward(data);
        data.customer_id = genUUID();

        const [error, res] = await mysqlExeEW.run(...QBuild.INSERT("customers", data));
        return [error, data.customer_id];
    },

    getCustomer: async (condition: any): Promise<[ModelError, CustomerData[]]> => {
        // convert into database name convention
        condition = mapper.backward(condition);

        const [error, res] = await mysqlExeEW.run(...QBuild.SELECT("customers", condition));

        let customers;
        if (error === "") { // if error
            customers = res[0];
            for (let i = 0; i < customers.length; i++) {
                customers[i] = mapper.forward(customers[i]);
            }
        }

        return [error, customers];
    },

    updateCustomer: async (customerId: string, data: any): Promise<ModelError> => {
        // remove unique fields
        delete data.customerId;
        delete data.nic;

        data = mapper.backward(data);

        const [error, _] = await mysqlExeEW.run(...QBuild.UPDATE("customers", data, { customer_id: customerId }));
        return error;
    }
};