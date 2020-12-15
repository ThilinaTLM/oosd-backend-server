import { MErr, model } from "../../database";

export interface Message {
    to: string
    subject: string
    content: string
}

export async function notifyComplainer(complaintId: string, subject: string, content: string): Promise<Message | null> {
    const [error, email] = await model.complaint.getCustomerEmail(complaintId)
    if (error != MErr.NO_ERRORS) {
        return null;
    }
    if (!email) {
        return null;
    }

    return {
        to: email,
        subject,
        content
    } as Message
}


export async function notifyComplainerAccept(complaintId: string): Promise<Message | null> {
    return notifyComplainer(
        complaintId,
        "Complaint is accepted",
        `Complaint is accepted by divisional secretariat office
                ComplaintID: ${complaintId}`
    )
}

export async function notifyComplainerResolved(complaintId: string): Promise<Message | null> {
    return notifyComplainer(
        complaintId,
        "Complaint is resolved",
        `Complaint is resolved by divisional secretariat office
                ComplaintID: ${complaintId}`
    )
}

export async function notifyComplainerRejected(complaintId: string): Promise<Message | null> {
    return notifyComplainer(
        complaintId,
        "Complaint is rejected",
        `Complaint is rejected by divisional secretariat office
                ComplaintID: ${complaintId}`
    )
}