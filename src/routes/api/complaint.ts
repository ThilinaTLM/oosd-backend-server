import { Router } from "express";
import { complaint } from "../../controller/";

export const comRouter = Router();

comRouter.post("add", complaint.addComplaint);
comRouter.get("get-complaint", complaint.getComplaint);
comRouter.put("update/:complaintId", complaint.updateComplaint);