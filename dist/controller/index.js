"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.file = exports.util = exports.complaint = exports.customer = exports.user = void 0;
var user_1 = require("./user");
var customer_1 = require("./customer");
var utils_1 = require("./utils");
var complaint_1 = require("./complaint");
var file_1 = require("./file");
/**
 * User Account Controllers
 */
exports.user = {
    login: user_1.loginUser,
    add: user_1.addUser,
    get: user_1.getUser,
    checkUsername: user_1.isUsernameExist,
    updateData: user_1.updateUserData,
    updateCredential: user_1.updateCredential,
    verify: user_1.verifyUser,
    disable: user_1.disableUser
};
/**
 * Customer Profile Controllers
 */
exports.customer = {
    add: customer_1.addCustomer,
    get: customer_1.getCustomer,
    update: customer_1.updateCustomer
};
/**
 * Complaint Controllers
 */
exports.complaint = {
    addComplaint: complaint_1.addComplaint,
    getComplaint: complaint_1.getComplaint,
    updateComplaint: complaint_1.updateComplaint
};
/**
 * Additional Controllers
 */
exports.util = {
    addDivision: utils_1.addDivision,
    addGNOffice: utils_1.addGNOffice,
    getAllDivisions: utils_1.getAllDivisions,
    getAllGNOffices: utils_1.getAllGNOffices
};
/**
 * Serve Static Files
 */
exports.file = {
    getAttachment: file_1.getAttachment
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29udHJvbGxlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSwrQkFTZ0I7QUFDaEIsdUNBSW9CO0FBQ3BCLGlDQUtpQjtBQUNqQix5Q0FJcUI7QUFFckIsK0JBQXVDO0FBRXZDOztHQUVHO0FBQ1UsUUFBQSxJQUFJLEdBQUc7SUFDaEIsS0FBSyxFQUFFLGdCQUFvQjtJQUMzQixHQUFHLEVBQUUsY0FBa0I7SUFDdkIsR0FBRyxFQUFFLGNBQWtCO0lBQ3ZCLGFBQWEsRUFBRSxzQkFBMEI7SUFDekMsVUFBVSxFQUFFLHFCQUF5QjtJQUNyQyxnQkFBZ0IsRUFBRSx1QkFBMkI7SUFDN0MsTUFBTSxFQUFFLGlCQUFxQjtJQUM3QixPQUFPLEVBQUUsa0JBQXNCO0NBQ2xDLENBQUM7QUFFRjs7R0FFRztBQUNVLFFBQUEsUUFBUSxHQUFHO0lBQ3BCLEdBQUcsRUFBRSxzQkFBc0I7SUFDM0IsR0FBRyxFQUFFLHNCQUFzQjtJQUMzQixNQUFNLEVBQUUseUJBQXlCO0NBQ3BDLENBQUM7QUFFRjs7R0FFRztBQUNVLFFBQUEsU0FBUyxHQUFHO0lBQ3JCLFlBQVksRUFBRSx3QkFBdUI7SUFDckMsWUFBWSxFQUFFLHdCQUF1QjtJQUNyQyxlQUFlLEVBQUUsMkJBQTBCO0NBQzlDLENBQUM7QUFFRjs7R0FFRztBQUNVLFFBQUEsSUFBSSxHQUFHO0lBQ2hCLFdBQVcsRUFBRSxtQkFBc0I7SUFDbkMsV0FBVyxFQUFFLG1CQUFzQjtJQUNuQyxlQUFlLEVBQUUsdUJBQTBCO0lBQzNDLGVBQWUsRUFBRSx1QkFBMEI7Q0FDOUMsQ0FBQztBQUVGOztHQUVHO0FBQ1UsUUFBQSxJQUFJLEdBQUc7SUFDaEIsYUFBYSxFQUFFLG9CQUF3QjtDQUMxQyxDQUFDIn0=