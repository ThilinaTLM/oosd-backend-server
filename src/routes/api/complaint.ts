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
comRouter.post("/add-complaint", complaint.addComplaint);

/**
 * Type : POST
 * URL : api/complaint/assign-div/:complaintId
 * REQ BODY :
 *      division*
 */
comRouter.post("/assign-div/:complaintId", preBuilt.ALL_ROLES, complaint.assignDivision)

/**
 * Type : PUT
 * URL : api/complaint/reassign-div/:complaintId
 * REQ BODY :
 *      division*
 */
comRouter.put("/reassign-div/:complaintId", preBuilt.ALL_ROLES, complaint.reAssignDivision)

comRouter.post("/add-attachment/:complaintId", complaint.addAttachment);

comRouter.get("/get-complaint", complaint.getComplaint);
comRouter.get("/get-attachments/:complaintId", complaint.getAttachments);
comRouter.get("/get-complaint-log/:complaintId", complaint.getComplaintLog);
comRouter.get('/get-count', complaint.getCount)

/**
 * Type : PUT
 * URL : api/complaint/update-status/:complaintId
 * REQ BODY :
 *      status
 *      subject*
 *      description*
 */
comRouter.put("/update-status/:complaintId", preBuilt.ALL_ROLES, complaint.updateComplaintStatus);

