"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachmentParser = exports.RBuilder = exports.preBuilt = exports.ABuilder = void 0;
var build_1 = require("./auth/build");
var response_1 = require("./response");
var uploader_1 = require("./uploader/uploader");
/**
 * Authentication Middleware builder with PreBuilts
 * ABuilder: Function which returns Builder Object
 */
exports.ABuilder = function () { return new build_1.AuthBuilder(); };
exports.preBuilt = {
    ALL_ROLES: exports.ABuilder().build(),
    ONLY_ADMIN: exports.ABuilder().allow.ADMIN().build(),
    ONLY_DIS_OFFICER: exports.ABuilder().allow.DIS_OCR().build(),
    ONLY_DIS_SEC: exports.ABuilder().allow.DIS_SEC().build()
};
/**
 * Bind RBuilder instance with every Response
 */
exports.RBuilder = response_1.bindRBuilder;
/**
 * Accept files from frontend
 */
exports.attachmentParser = uploader_1.attachmentUpload;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbWlkZGxld2FyZXMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0NBQTJDO0FBQzNDLHVDQUFpRDtBQUVqRCxnREFBdUQ7QUFFdkQ7OztHQUdHO0FBQ1UsUUFBQSxRQUFRLEdBQUcsY0FBTSxPQUFBLElBQUksbUJBQVcsRUFBRSxFQUFqQixDQUFpQixDQUFDO0FBQ25DLFFBQUEsUUFBUSxHQUFHO0lBQ3BCLFNBQVMsRUFBRSxnQkFBUSxFQUFFLENBQUMsS0FBSyxFQUFFO0lBQzdCLFVBQVUsRUFBRSxnQkFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRTtJQUM1QyxnQkFBZ0IsRUFBRSxnQkFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUssRUFBRTtJQUNwRCxZQUFZLEVBQUUsZ0JBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUU7Q0FDbkQsQ0FBQztBQUdGOztHQUVHO0FBQ1UsUUFBQSxRQUFRLEdBQUcsdUJBQXlCLENBQUM7QUFFbEQ7O0dBRUc7QUFDVSxRQUFBLGdCQUFnQixHQUFHLDJCQUFnQixDQUFDIn0=