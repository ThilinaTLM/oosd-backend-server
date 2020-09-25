"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachmentUpload = void 0;
var multer_1 = __importDefault(require("multer"));
var storage_1 = require("./storage");
/**
 * File parser middle-wares
 */
exports.attachmentUpload = multer_1.default({
    storage: storage_1.attachmentStorage
}).single("attachment");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbWlkZGxld2FyZXMvdXBsb2FkZXIvdXBsb2FkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsa0RBQTRCO0FBQzVCLHFDQUE4QztBQUU5Qzs7R0FFRztBQUNVLFFBQUEsZ0JBQWdCLEdBQUcsZ0JBQU0sQ0FDbEM7SUFDSSxPQUFPLEVBQUUsMkJBQWlCO0NBQzdCLENBQ0osQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMifQ==