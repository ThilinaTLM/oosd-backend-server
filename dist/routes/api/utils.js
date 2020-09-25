"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utilsRouter = void 0;
var express_1 = require("express");
var controller_1 = require("../../controller/");
var middlewares_1 = require("../../middlewares");
exports.utilsRouter = express_1.Router();
/**
 * End Points
 */
exports.utilsRouter.post("/add-div", middlewares_1.preBuilt.ONLY_ADMIN, controller_1.util.addDivision);
exports.utilsRouter.post("/add-gn-office", middlewares_1.preBuilt.ONLY_ADMIN, controller_1.util.addGNOffice);
exports.utilsRouter.get("/all-divs", middlewares_1.preBuilt.ALL_ROLES, controller_1.util.getAllDivisions);
exports.utilsRouter.get("/all-gn-offices", middlewares_1.preBuilt.ALL_ROLES, controller_1.util.getAllGNOffices);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcm91dGVzL2FwaS91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBaUM7QUFDakMsZ0RBQXlDO0FBQ3pDLGlEQUE2QztBQUVoQyxRQUFBLFdBQVcsR0FBRyxnQkFBTSxFQUFFLENBQUM7QUFFcEM7O0dBRUc7QUFDSCxtQkFBVyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsc0JBQVEsQ0FBQyxVQUFVLEVBQUUsaUJBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNwRSxtQkFBVyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxzQkFBUSxDQUFDLFVBQVUsRUFBRSxpQkFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBRTFFLG1CQUFXLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxzQkFBUSxDQUFDLFNBQVMsRUFBRSxpQkFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ3ZFLG1CQUFXLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLHNCQUFRLENBQUMsU0FBUyxFQUFFLGlCQUFJLENBQUMsZUFBZSxDQUFDLENBQUMifQ==