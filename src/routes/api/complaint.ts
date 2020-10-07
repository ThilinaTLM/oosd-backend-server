import { Router } from "express";
import { complaint } from "../../controller/";
import { preBuilt } from "../../middlewares";

export const comRouter = Router();

/**
 * Type : POST
 * URL : api/complaint/add-complaint
 * REQ BODY :
 *      refNo
 *      type*
 *      customerId*
 *      subject*
 *      description*
 *      assignedDiv
 */
comRouter.post("add-complaint", preBuilt.ALL_ROLES, complaint.addComplaint);

/**
 * Type : POST
 * URL : api/complaint/assign-div/:complaintId
 * REQ BODY :
 *      division*
 */
comRouter.post("assign-div/:complaintId", preBuilt.ALL_ROLES, complaint.assignDivision)

comRouter.post("add-attachment/:complaintId/:attachmentId", complaint.addAttachment);

comRouter.get("/get-complaint", complaint.getComplaint);
comRouter.get("/get-attachments/:complaintId", complaint.getComplaint);
comRouter.get("/get-complaint-log/:complaintId", complaint.getComplaint);
comRouter.get('/get-count', complaint.getCount)

/**
 * Type : PUT
 * URL : api/complaint/update-status/:complaintId
 * REQ BODY :
 *      status
 *      subject*
 *      description*
 */
comRouter.put("/update-status/:complaintId", complaint.updateComplaintStatus);

/**
 * Type : PUT
 * URL : api/complaint/assign-div/:complaintId
 * REQ BODY :
 *      division*
 */
comRouter.put("/assign-div/:complaintId", preBuilt.ALL_ROLES, complaint.reAssignDivision)