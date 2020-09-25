"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.model = exports.MErr = void 0;
var user_1 = require("./models/user");
var utils_1 = require("./models/utils");
var customer_1 = require("./models/customer");
var complaint_1 = require("./models/complaint");
var errors_1 = require("./core/errors");
/**
 * Model Error Set for handle errors
 */
exports.MErr = errors_1.ModelErrorSet;
/**
 * Models For Accessing Database
 */
exports.model = {
    user: user_1.user,
    utils: utils_1.utils,
    customer: customer_1.customer,
    complaint: complaint_1.complaint
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZGF0YWJhc2UvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0NBQXFDO0FBQ3JDLHdDQUF1QztBQUN2Qyw4Q0FBMkM7QUFDM0MsZ0RBQTZDO0FBQzdDLHdDQUFvRTtBQUVwRTs7R0FFRztBQUNVLFFBQUEsSUFBSSxHQUFHLHNCQUFhLENBQUM7QUFHbEM7O0dBRUc7QUFDVSxRQUFBLEtBQUssR0FBRztJQUNqQixJQUFJLGFBQUE7SUFDSixLQUFLLGVBQUE7SUFDTCxRQUFRLHFCQUFBO0lBQ1IsU0FBUyx1QkFBQTtDQUNaLENBQUMifQ==