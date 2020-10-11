import { Router } from "express";
import { util } from "../../controller/";
import { preBuilt } from "../../middlewares";

export const utilsRouter = Router();

/**
 * End Points
 */
utilsRouter.post("/add-div", preBuilt.ONLY_ADMIN, util.addDivision);
utilsRouter.post("/add-gn-office", preBuilt.ONLY_ADMIN, util.addGNOffice);

utilsRouter.post("/delete-div", preBuilt.ONLY_ADMIN, util.deleteDivision)
utilsRouter.post("/delete-gn-office", preBuilt.ONLY_ADMIN, util.deleteGNOffice)

utilsRouter.get("/all-divs", util.getAllDivisions);
utilsRouter.get("/all-gn-offices", util.getAllGNOffices);
utilsRouter.get("/all-user-roles", util.getAllUserRoles);
utilsRouter.get("/all-com-states", util.getAllComplaintStates);
utilsRouter.get("/all-com-types", util.getAllComplaintTypes);