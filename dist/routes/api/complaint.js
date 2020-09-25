"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comRouter = void 0;
var express_1 = require("express");
var controller_1 = require("../../controller/");
exports.comRouter = express_1.Router();
exports.comRouter.post("add", controller_1.complaint.addComplaint);
exports.comRouter.get("get-complaint", controller_1.complaint.getComplaint);
exports.comRouter.put("update/:complaintId", controller_1.complaint.updateComplaint);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGxhaW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3JvdXRlcy9hcGkvY29tcGxhaW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1DQUFpQztBQUNqQyxnREFBOEM7QUFFakMsUUFBQSxTQUFTLEdBQUcsZ0JBQU0sRUFBRSxDQUFDO0FBRWxDLGlCQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxzQkFBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQzlDLGlCQUFTLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxzQkFBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3ZELGlCQUFTLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLHNCQUFTLENBQUMsZUFBZSxDQUFDLENBQUMifQ==