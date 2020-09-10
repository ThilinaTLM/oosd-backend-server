import express, { Router } from "express";
import { utils } from "../../controller/";

export const utilsRouter = Router();

/**
 * End Points
 */
utilsRouter.post("/add-div", utils.addDivision);
utilsRouter.post("/add-gn-office", utils.addGNOffice);

utilsRouter.get("/add-divs", utils.getAllDivisions);
utilsRouter.get("/add-gn-offices", utils.getAllGNOffices);