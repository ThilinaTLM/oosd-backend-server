"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.attachmentStorage = void 0;
var path_1 = require("path");
var multer_1 = __importDefault(require("multer"));
var uuid_1 = require("uuid");
var UPLOADS_DIRECTORY = path_1.join(process.cwd(), process.env.UPLOADS_DIR || "uploads");
var ATTACHMENTS_DIRECTORY = path_1.join(UPLOADS_DIRECTORY, 'attachments');
/**
 * Multer Storage: Complaint Documents
 */
exports.attachmentStorage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, ATTACHMENTS_DIRECTORY);
    },
    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, uuid_1.v4() + path_1.extname(file.originalname));
    }
});
/**
 * Multer Storage: Other Documents
 */
exports.storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOADS_DIRECTORY);
    },
    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path_1.extname(file.originalname));
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9taWRkbGV3YXJlcy91cGxvYWRlci9zdG9yYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDZCQUFxQztBQUNyQyxrREFBNEI7QUFDNUIsNkJBQXFDO0FBRXJDLElBQU0saUJBQWlCLEdBQUcsV0FBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsSUFBSSxTQUFTLENBQUMsQ0FBQTtBQUNuRixJQUFNLHFCQUFxQixHQUFHLFdBQUksQ0FBQyxpQkFBaUIsRUFBRSxhQUFhLENBQUMsQ0FBQTtBQUVwRTs7R0FFRztBQUNVLFFBQUEsaUJBQWlCLEdBQUcsZ0JBQU0sQ0FBQyxXQUFXLENBQUM7SUFDaEQsV0FBVyxFQUFFLFVBQVMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO1FBQy9CLEVBQUUsQ0FBQyxJQUFJLEVBQUUscUJBQXFCLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBQ0Qsb0VBQW9FO0lBQ3BFLFFBQVEsRUFBRSxVQUFTLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUM1QixFQUFFLENBQUMsSUFBSSxFQUFFLFNBQU8sRUFBRSxHQUFHLGNBQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztJQUNyRCxDQUFDO0NBQ0osQ0FBQyxDQUFDO0FBRUg7O0dBRUc7QUFDVSxRQUFBLE9BQU8sR0FBRyxnQkFBTSxDQUFDLFdBQVcsQ0FBQztJQUN0QyxXQUFXLEVBQUUsVUFBUyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDL0IsRUFBRSxDQUFDLElBQUksRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxvRUFBb0U7SUFDcEUsUUFBUSxFQUFFLFVBQVMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO1FBQzVCLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLGNBQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztJQUM3RSxDQUFDO0NBQ0osQ0FBQyxDQUFDIn0=