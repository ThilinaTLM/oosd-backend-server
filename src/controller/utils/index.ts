import { Handler } from "../../core";
import { build } from "../core/users";
import { MErr, model } from "../../database";


export const addDivision: Handler = async (req, res) => {
    const { r } = res;
    const { name, address } = req.body;

    const error = await model.utils.addDivision(name, address);

    if (error === MErr.DUPLICATE) {
        r.status.BAD_REQ()
            .message("Division already exists")
            .send();
        return;
    }

    if (error === MErr.NO_ERRORS) {
        r.status.OK()
            .message("Successfully added")
            .send();
        return;
    }

    r.status.ERROR()
        .message("Internal server error")
        .send();
};

export const addGNOffice: Handler = async (req, res) => {
    const { r } = res;
    const { name, address } = req.body;

    const error = await model.utils.addGNOffice(name, address);

    if (error === MErr.DUPLICATE) {
        r.status.BAD_REQ()
            .message("Division already exists")
            .send();
        return;
    }

    if (error === MErr.NO_ERRORS) {
        r.status.OK()
            .message("Successfully added")
            .send();
        return;
    }

    r.status.ERROR()
        .message("Internal server error")
        .send();
};

export const getAllDivisions: Handler = async (req, res) => {
    const { r } = res;

    const [error, data] = await model.utils.getAllDivisions();

    if (error === MErr.NO_ERRORS) {
        r.status.OK()
            .data(data)
            .message("Success")
            .send();
        return;
    }

    r.status.ERROR()
        .message("Internal server error")
        .send();
};

export const getAllGNOffices: Handler = async (req, res) => {
    const { r } = res;

    const [error, data] = await model.utils.getAllGNOffices();

    if (error === MErr.NO_ERRORS) {
        r.status.OK()
            .data(data)
            .message("Success")
            .send();
        return;
    }

    r.status.ERROR()
        .message("Internal server error")
        .send();
};