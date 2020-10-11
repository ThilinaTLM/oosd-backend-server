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
comRouter.put("/reassign-div/:complaintId", preBuilt.ALL_ROLES, complaint.reAssignDivision)

comRouter.post("/add-attachment/:complaintId", complaint.addAttachment);

comRouter.get("/get-complaint", complaint.getComplaint);
comRouter.get("/get-attachments/:complaintId", complaint.getAttachments);
comRouter.get("/get-complaint-log/:complaintId", complaint.getComplaintLog);
comRouter.get('/get-count', complaint.getCount)
comRouter.get('/get-full-details/:complaintId', complaint.getComplaintComplete)

/**
 * Type : POST
 * URL : api/complaint/write-log/:complaintId
 * REQ BODY :
 *      subject*
 *      description*
 */
comRouter.post('/write-log/:complaintId', preBuilt.ALL_ROLES, complaint.writeLogEntry)

/**
 * Type : PUT
 * URL : api/complaint/mark-complaint/:complaintId
 * REQ BODY :
 *      subject
 *      description
 */
comRouter.put("/mark-complaint/aw-approval/:complaintId", preBuilt.ALL_ROLES, complaint.status.markAsAwaitingApproval);
comRouter.put("/mark-complaint/approved/:complaintId", preBuilt.ALL_ROLES, complaint.status.markAsApproved);
comRouter.put("/mark-complaint/aw-accept/:complaintId", preBuilt.ALL_ROLES, complaint.status.markForDivisionalAccept);
comRouter.put("/mark-complaint/accepted/:complaintId", preBuilt.ALL_ROLES, complaint.status.markAsAccepted);
comRouter.put("/mark-complaint/aw-div-review/:complaintId", preBuilt.ALL_ROLES, complaint.status.markForDivReview);
comRouter.put("/mark-complaint/div-reviewed/:complaintId", preBuilt.ALL_ROLES, complaint.status.markAsDivReviewed);
comRouter.put("/mark-complaint/aw-dis-review/:complaintId", preBuilt.ALL_ROLES, complaint.status.markForDisReview);
comRouter.put("/mark-complaint/dis-reviewed/:complaintId", preBuilt.ALL_ROLES, complaint.status.markAsDisReviewed);
comRouter.put("/mark-complaint/solved/:complaintId", preBuilt.ALL_ROLES, complaint.status.markAsSolved);
comRouter.put("/mark-complaint/reject/:complaintId", preBuilt.ALL_ROLES, complaint.status.markAsRejected);
