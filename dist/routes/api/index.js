"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
var express_1 = require("express");
var middlewares_1 = require("../../middlewares");
var user_1 = require("./user");
var customer_1 = require("./customer");
var complaint_1 = require("./complaint");
var utils_1 = require("./utils");
exports.apiRouter = express_1.Router();
/**
 * Middle-wares
 */
exports.apiRouter.use(middlewares_1.RBuilder);
/**
 * End Points
 */
exports.apiRouter.get("/", function (req, res) {
    var r = res.r;
    r.status.OK()
        .message("Welcome to Testing API")
        .send();
});
/**
 * Routers
 */
exports.apiRouter.use("/user", user_1.userRouter);
exports.apiRouter.use("/customer", customer_1.cusRouter);
exports.apiRouter.use("/complaint", complaint_1.comRouter);
exports.apiRouter.use("/util", utils_1.utilsRouter);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcm91dGVzL2FwaS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBaUM7QUFFakMsaURBQTZDO0FBQzdDLCtCQUFvQztBQUNwQyx1Q0FBdUM7QUFDdkMseUNBQXdDO0FBQ3hDLGlDQUFzQztBQUV6QixRQUFBLFNBQVMsR0FBRyxnQkFBTSxFQUFFLENBQUM7QUFFbEM7O0dBRUc7QUFDSCxpQkFBUyxDQUFDLEdBQUcsQ0FBQyxzQkFBUSxDQUFDLENBQUM7QUFFeEI7O0dBRUc7QUFDSCxpQkFBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsVUFBQyxHQUFHLEVBQUUsR0FBRztJQUNoQixJQUFBLENBQUMsR0FBSyxHQUFlLEVBQXBCLENBQXFCO0lBQzlCLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFO1NBQ1IsT0FBTyxDQUFDLHdCQUF3QixDQUFDO1NBQ2pDLElBQUksRUFBRSxDQUFDO0FBQ2hCLENBQUMsQ0FBQyxDQUFDO0FBR0g7O0dBRUc7QUFDSCxpQkFBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsaUJBQVUsQ0FBQyxDQUFDO0FBQ25DLGlCQUFTLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxvQkFBUyxDQUFDLENBQUM7QUFDdEMsaUJBQVMsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLHFCQUFTLENBQUMsQ0FBQTtBQUN0QyxpQkFBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsbUJBQVcsQ0FBQyxDQUFDIn0=