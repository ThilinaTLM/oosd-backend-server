import { ComTypes, Handler } from "../../core";
import { MErr, model } from "../../database";

export const addComplaint: Handler = async (req, res) => {
    const { r } = res;
    const data = req.body;

    if (data.type === ComTypes.DIRECT_TO_DIV && !data.assignedDiv) {
        r.status.BAD_REQ()
            .message("Please specify division")
            .send()
        return;
    }

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

export const assignDivision: Handler = async (req, res) => {
    const { r } = res;
    const data = req.body;
    const { complaintId } = req.params;
    const {userId} = req.user

    const error = await model.complaint.assignDivision(complaintId, data.division, userId);

    if (error === MErr.DUPLICATE) {
        r.status.BAD_REQ()
            .message("Already assigned")
            .send();
        return;
    }

    if (error === MErr.NO_ERRORS) {
        r.status.OK()
            .message("Assigned to the divisional office")
            .data(complaintId)
            .send();
        return;
    }

    r.send_ISE();
};

export const reAssignDivision: Handler = async (req, res) => {
    const { r } = res;
    const data = req.body;
    const { complaintId } = req.params;
    const {userId} = req.user

    const error = await model.complaint.updateDivisionAssignment(complaintId, data.division, userId);

    if (error === MErr.NO_ERRORS) {
        r.status.OK()
            .message("Assigned to the divisional office")
            .data(complaintId)
            .send();
        return;
    }

    r.send_ISE();
};

export const addAttachment: Handler = async (req, res) => {
    const { r } = res;
    const { complaintId } = req.params;
    const attachmentId = req.body.attachmentId

    const error = await model.complaint.addAttachment(complaintId, attachmentId);

    if (error === MErr.NO_ERRORS) {
        r.status.OK()
            .message("Success")
            .send();
        return;
    }

    if (error === MErr.DUPLICATE) {
        r.status.BAD_REQ()
            .message("Attachment is already added")
            .send()
        return;
    }

    r.send_ISE();
};

export const getComplaint: Handler = async (req, res) => {
    const { r } = res;
    const condition = req.query;

    const [error, complaint] = await model.complaint.getComplaint(condition);

    if (error == MErr.NO_ERRORS) {
        r.status.OK()
            .message("Success")
            .data(complaint)
            .send();
        return;
    }

    r.send_ISE();
};

export const getAttachments: Handler = async (req, res) => {
    const { r } = res;
    const { complaintId } = req.params;

    const [error, attachments] = await model.complaint.getComplaintAttachments(complaintId);

    if (error == MErr.NO_ERRORS) {
        r.status.OK()
            .message("Success")
            .data(attachments)
            .send();
        return;
    }

    r.send_ISE();
};

export const getComplaintLog: Handler = async (req, res) => {
    const { r } = res;
    const { complaintId } = req.params;

    const [error, log] = await model.complaint.getComplaintLogs(complaintId);

    if (error == MErr.NO_ERRORS) {
        r.status.OK()
            .message("Success")
            .data(log)
            .send();
        return;
    }

    r.send_ISE();
};

export const getComplaintCount: Handler = async (req, res) => {
    const {r} = res;
    const query = req.query

    const [error, count] = await model.utils.getCount('complaints_with_divisions', query)

    if (error == MErr.NO_ERRORS) {
        r.status.OK()
            .message("Success")
            .data(count)
            .send();
        return;
    }

    r.send_ISE();
}

export const getComplaintComplete: Handler = async (req, res) => {
    const { r } = res;
    const {complaintId} = req.params;

    const [error, complaints] = await model.complaint.getComplaintFullDetails(complaintId);

    if (error == MErr.NO_ERRORS) {
        r.status.OK()
            .message("Success")
            .data(complaints)
            .send();
        return;
    }

    r.send_ISE();
};
