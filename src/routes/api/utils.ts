import { Router } from "express";
import { utils } from "../../controller/";
import { preBuilt } from "../../middlewares";

export const utilsRouter = Router();

/**
 * End Points
 */
utilsRouter.post("/add-div", preBuilt.ONLY_ADMIN, utils.addDivision);
utilsRouter.post("/add-gn-office", preBuilt.ONLY_ADMIN, utils.addGNOffice);

utilsRouter.get("/all-divs", preBuilt.ALL_ROLES, utils.getAllDivisions);
utilsRouter.get("/all-gn-offices", preBuilt.ALL_ROLES, utils.getAllGNOffices);

utilsRouter.get('/all-user-roles')
utilsRouter.get('/all-user-roles')