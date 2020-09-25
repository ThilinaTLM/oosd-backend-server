import { ComStates, Handler } from "../../core";
import { MErr, model } from "../../database";

export const addComplaint: Handler = async (req, res) => {
    const { r } = res;
    const data = req.body;

    const [error, complaintId] = await model.complaint.addComplaint(data);

    if (error === MErr.DUPLICATE) {
        r.status.BAD_REQ()
            .message("Duplicate complaint data")
            .send();
        return;
    }

    if (error === MErr.NO_ERRORS) {
        r.status.OK()
            .message("Draft complaint added!")
            .data(complaintId)
            .send();
        return;
    }

    r.send_ISE();
};

export const getComplaint: Handler = async (req, res) => {
    const { r } = res;
    const condition = req.query;

    const [error, complaints] = await model.complaint.getComplaint(condition);

    if (error == MErr.NO_ERRORS) {
        r.status.OK()
            .message("Success")
            .data(complaints)
            .send();
        return;
    }

    r.send_ISE();
};

export const updateComplaint: Handler = async (req, res) => {
    const { r } = res;
    const { complaintId } = req.params;

    const error = await model.complaint.updateComplaint(complaintId, req.body);

    if (error == MErr.NO_ERRORS) {
        r.status.OK()
            .message("Success")
            .send();
        return;
    }

    r.send_ISE();
};

export const sendTo_DistrictSecApproval: Handler = async (req, res) => {
    const {r} = res;
    const {complaintId} = req.params

    const error = await model.complaint.updateComplaint(complaintId, {status: ComStates.AWAIT_APR})

    if (error == MErr.NO_ERRORS) {
        r.status.OK()
            .message("Success")
            .send();
        return;
    }

    r.send_ISE();
}