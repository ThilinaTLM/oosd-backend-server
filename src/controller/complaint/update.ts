import { Handler } from "../../core";
import { MErr, model } from "../../database";

export const writeLogEntry: Handler = async (req, res) => {
    const { r } = res;
    const userId = req.user.userId;
    const { complaintId } = req.params;
    const { subject, description } = req.body;

    const error = await model.complaint.updateComplaintLog(
        complaintId,
        userId,
        {
            subject, description
        }
    );

    if (error == MErr.NO_ERRORS) {
        r.status.OK()
            .message("Success")
            .send();
        return;
    }

    r.send_ISE();
}

export const markAsAwaitingApproval: Handler = async (req, res) => {
    req.body.status = "Awaiting Approval"
    if (!req.body.subject) {
        req.body.subject = ""
        req.body.description = ""
    }
    updateStatusManual(req, res, () => {});
};

export const markAsApproved: Handler = async (req, res) => {
    req.body.status = "Approved"
    if (!req.body.subject) {
        req.body.subject = ""
        req.body.description = ""
    }
    updateStatusManual(req, res, () => {});
};

export const markForDivisionalAccept: Handler = async (req, res) => {
    req.body.status = "Awaiting Accept"
    if (!req.body.subject) {
        req.body.subject = ""
        req.body.description = ""
    }
    updateStatusManual(req, res, () => {});
};

export const markAsAccepted: Handler = async (req, res) => {
    req.body.status = "In Progress"
    if (!req.body.subject) {
        req.body.subject = ""
        req.body.description = ""
    }
    updateStatusManual(req, res, () => {});
};

export const markForDivReview: Handler = async (req, res) => {
    req.body.status = "Awaiting Div Sec Review"
    if (!req.body.subject) {
        req.body.subject = ""
        req.body.description = ""
    }
    updateStatusManual(req, res, () => {});
};

export const markAsFDivReviewed: Handler = async (req, res) => {
    req.body.status = "Div Sec Reviewed"
    if (!req.body.subject) {
        req.body.subject = ""
        req.body.description = ""
    }
    updateStatusManual(req, res, () => {});
};

export const markForDisReview: Handler = async (req, res) => {
    req.body.status = "Awaiting Dis Sec Review"
    if (!req.body.subject) {
        req.body.subject = ""
        req.body.description = ""
    }
    updateStatusManual(req, res, () => {});
};



export const markAsDisReviewed: Handler = async (req, res) => {
    req.body.status = "Dis Sec Reviewed"
    if (!req.body.subject) {
        req.body.subject = ""
        req.body.description = ""
    }
    updateStatusManual(req, res, () => {});
};

export const markAsSolved: Handler = async (req, res) => {
    req.body.status = "Solved"
    if (!req.body.subject) {
        req.body.subject = ""
        req.body.description = ""
    }
    updateStatusManual(req, res, () => {});
};

export const markAsRejected: Handler = async (req, res) => {
    req.body.status = "Rejected"
    if (!req.body.subject) {
        req.body.subject = ""
        req.body.description = ""
    }
    updateStatusManual(req, res, () => {});
};


export const updateStatusManual: Handler = async (req, res) => {
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