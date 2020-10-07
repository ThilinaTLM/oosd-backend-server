import { Handler } from "../../core";
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

export const assignDivision: Handler = async (req, res) => {
    const { r } = res;
    const data = req.body;
    const { complaintId } = req.params;
    const {userId} = req.user

    const error = await model.complaint.assignDivision(complaintId, data.division, userId);

    if (error === MErr.NO_ERRORS) {
        r.status.OK()
            .message("Draft complaint added!")
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
            .message("Draft complaint added!")
            .data(complaintId)
            .send();
        return;
    }

    r.send_ISE();
};

export const addAttachment: Handler = async (req, res) => {
    const { r } = res;
    const { complaintId, attachmentId } = req.params;

    const error = await model.complaint.addAttachment(complaintId, attachmentId);

    if (error === MErr.NO_ERRORS) {
        r.status.OK()
            .message("Success")
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


export const updateComplaintStatus: Handler = async (req, res) => {
    const { r } = res;
    const userId = req.user.userId;
    const { complaintId } = req.params;
    const { status, subject, description } = req.body;

    const error = await model.complaint.updateComplaintStatus(
        complaintId,
        userId,
        {
            status, subject, description
        }
    );

    if (error == MErr.NO_ERRORS) {
        r.status.OK()
            .message("Success")
            .send();
        return;
    }

    r.send_ISE();
};