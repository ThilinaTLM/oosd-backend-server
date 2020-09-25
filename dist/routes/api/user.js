"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
var express_1 = require("express");
var controller_1 = require("../../controller/");
exports.userRouter = express_1.Router();
/**
 * End Points
 */
exports.userRouter.get('/check-username/:username', controller_1.user.checkUsername);
exports.userRouter.post('/register', controller_1.user.add);
exports.userRouter.post('/login', controller_1.user.login);
exports.userRouter.get('/get-user', controller_1.user.get); // query allowed, (username not included)
exports.userRouter.put('/update-user/:userId', controller_1.user.updateData);
exports.userRouter.put('/update-credential/:userId', controller_1.user.updateCredential);
exports.userRouter.put('/verify-user/:userId', controller_1.user.verify);
exports.userRouter.put('/disable-user/:userId', controller_1.user.disable);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvYXBpL3VzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUNBQWlDO0FBQ2pDLGdEQUF5QztBQUc1QixRQUFBLFVBQVUsR0FBRyxnQkFBTSxFQUFFLENBQUM7QUFFbkM7O0dBRUc7QUFDSCxrQkFBVSxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsRUFBRSxpQkFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ2hFLGtCQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxpQkFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBRXZDLGtCQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxpQkFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBRXRDLGtCQUFVLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxpQkFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMseUNBQXlDO0FBRWhGLGtCQUFVLENBQUMsR0FBRyxDQUFDLHNCQUFzQixFQUFFLGlCQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDeEQsa0JBQVUsQ0FBQyxHQUFHLENBQUMsNEJBQTRCLEVBQUUsaUJBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ3BFLGtCQUFVLENBQUMsR0FBRyxDQUFDLHNCQUFzQixFQUFFLGlCQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDcEQsa0JBQVUsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEVBQUUsaUJBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyJ9