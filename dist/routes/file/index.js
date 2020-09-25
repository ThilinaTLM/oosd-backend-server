"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileRouter = void 0;
var express_1 = require("express");
var controller_1 = require("../../controller");
var middlewares_1 = require("../../middlewares");
exports.fileRouter = express_1.Router();
/**
 * Serving Files
 */
exports.fileRouter.get('/attachment/:attachmentId', controller_1.file.getAttachment);
/**
 * Single file upload
 */
exports.fileRouter.post('/upload', middlewares_1.attachmentParser, function (req, res) {
    res.status(200).json({
        message: 'Successfully Uploaded'
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcm91dGVzL2ZpbGUvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUNBQWlDO0FBQ2pDLCtDQUF3QztBQUN4QyxpREFBcUQ7QUFFeEMsUUFBQSxVQUFVLEdBQUcsZ0JBQU0sRUFBRSxDQUFBO0FBRWxDOztHQUVHO0FBQ0gsa0JBQVUsQ0FBQyxHQUFHLENBQUMsMkJBQTJCLEVBQUUsaUJBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtBQUUvRDs7R0FFRztBQUNILGtCQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSw4QkFBZ0IsRUFBRSxVQUFDLEdBQUcsRUFBRSxHQUFHO0lBQ2xELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ2pCLE9BQU8sRUFBRSx1QkFBdUI7S0FDbkMsQ0FBQyxDQUFBO0FBQ04sQ0FBQyxDQUFDLENBQUEifQ==