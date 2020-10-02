import { Handler } from "../../core";
import { MErr, model } from "../../database";


export const addCustomer: Handler = async (req, res) => {
    const {r} = res
    const data = req.body;

    const [error, customerId] = await model.customer.addCustomer(data);

    if (error === MErr.DUPLICATE) {
        r.status.BAD_REQ()
            .message('Duplicate customer entry')
            .send()
        return ;
    }

    if (error === MErr.NO_ERRORS) {
        r.status.OK()
            .message('Customer entry added!')
            .data(customerId)
            .send()
        return ;
    }

    r.status.ERROR()
        .message('Internal Server Error')
        .send()
}

export const updateCustomer: Handler = async (req, res) => {
    const {r} = res;
    const customerId = req.params.customerId;
    const data = req.body

    const error = await model.customer.updateCustomer(customerId, data)

    if (error === MErr.NO_ERRORS) {
        r.status.OK()
            .message('Success')
            .send()
        return ;
    }

    r.status.ERROR()
        .message('Internal Server Error')
        .send()
}

export const getCustomer: Handler = async (req, res) => {
    const {r} = res;
    const query = req.query; // valid customer fields

    const [error, customers] = await model.customer.getCustomer(query);

    if (error === MErr.NO_ERRORS) {
        r.status.OK()
            .message('Success')
            .data(customers)
            .send()
        return
    }

    r.status.ERROR()
        .message('Internal Server Error')
        .send()
}

export const getCustomerCount: Handler = async (req, res) => {
    const {r} = res;

    const [error, count] = await model.utils.getCount('customers');

    if (error === MErr.NO_ERRORS) {
        r.status.OK()
            .message('Success')
            .data(count)
            .send()
        return
    }

    r.status.ERROR()
        .message('Internal Server Error')
        .send()
}
