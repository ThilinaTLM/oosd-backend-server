import { Handler } from "../../core";
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
            .message("Grama Niladhari Division already exists")
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

export const getAllManual: Handler = async (req, res) => {
    const { r } = res;

    // @ts-ignore
    const [error, data] = await model.utils[req.modelName]();

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

export const getAllDivisions: Handler = async (req, res, next) => {
    req.modelName = "getAllDivisions"
    getAllManual(req, res, next)
};

export const getAllGNOffices: Handler = async (req, res, next) => {
    req.modelName = "getAllGNOffices"
    getAllManual(req, res, next)
};

export const getAllComplaintStates: Handler = async (req, res, next) => {
    req.modelName = "getAllComplaintStatus"
    getAllManual(req, res, next)
};

export const getAllComplaintTypes: Handler = async (req, res, next) => {
    req.modelName = "getAllComplaintTypes"
    getAllManual(req, res, next)
};

export const getAllUserRoles: Handler = async (req, res, next) => {
    req.modelName = "getAllUserRoles"
    getAllManual(req, res, next)
};

export const deleteDivision: Handler = async (req, res) => {
    const { r } = res;
    const { name } = req.body;

    const error = await model.utils.deleteDivision(name);

    if (error === MErr.NO_ERRORS) {
        r.status.OK()
            .message("Successfully deleted")
            .send();
        return;
    }

    r.status.ERROR()
        .message("Internal server error")
        .send();
};

export const deleteGNOffice: Handler = async (req, res) => {
    const { r } = res;
    const { name } = req.body;

    const error = await model.utils.deleteGNOffice(name);

    if (error === MErr.NO_ERRORS) {
        r.status.OK()
            .message("Successfully deleted")
            .send();
        return;
    }

    r.status.ERROR()
        .message("Internal server error")
        .send();
};

