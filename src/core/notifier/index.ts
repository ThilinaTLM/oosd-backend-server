import { EmailSender } from "./sender";
import { notifyComplainerAccept, notifyComplainerRejected, notifyComplainerResolved } from "./message"

export const emailSender = new EmailSender('gallecms@gmail.com', "CMS@galle123");

export class EmailBuilder {
    static complaintAccept = notifyComplainerAccept
    static complaintReject = notifyComplainerRejected
    static complaintResolved = notifyComplainerResolved
}