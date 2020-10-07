import { Router } from "express";
import { complaint } from "../../controller/";

export const comRouter = Router();

/**
 * Type : POST
 * URL : api/complaint/add-complaint
 * REQ
 *    BODY
 *      refNo
 *      type*
 *      customerId*
 *      subject*
 *      description*
 */
comRouter.post("add-complaint", complaint.addComplaint);


comRouter.post("add-attachment/:complaintId/:attachmentId", complaint.addAttachment);

comRouter.get("get-complaint", complaint.getComplaint);
comRouter.get("get-attachments/:complaintId", complaint.getComplaint);
comRouter.get("get-complaint-log/:complaintId", complaint.getComplaint);

comRouter.put("update-status/:complaintId", complaint.updateComplaintStatus);