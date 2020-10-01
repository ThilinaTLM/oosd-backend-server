import { Router } from "express";
import { util } from "../../controller/";
import { preBuilt } from "../../middlewares";

export const utilsRouter = Router();

/**
 * End Points
 */
utilsRouter.post("/add-div", preBuilt.ONLY_ADMIN, util.addDivision);
utilsRouter.post("/add-gn-office", preBuilt.ONLY_ADMIN, util.addGNOffice);

utilsRouter.get("/all-divs", util.getAllDivisions);
utilsRouter.get("/all-gn-offices", util.getAllGNOffices);