"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTo_DistrictSecApproval = exports.updateComplaint = exports.getComplaint = exports.addComplaint = void 0;
var core_1 = require("../../core");
var database_1 = require("../../database");
exports.addComplaint = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var r, data, _a, error, complaintId;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                r = res.r;
                data = req.body;
                return [4 /*yield*/, database_1.model.complaint.addComplaint(data)];
            case 1:
                _a = _b.sent(), error = _a[0], complaintId = _a[1];
                if (error === database_1.MErr.DUPLICATE) {
                    r.status.BAD_REQ()
                        .message("Duplicate complaint data")
                        .send();
                    return [2 /*return*/];
                }
                if (error === database_1.MErr.NO_ERRORS) {
                    r.status.OK()
                        .message("Draft complaint added!")
                        .data(complaintId)
                        .send();
                    return [2 /*return*/];
                }
                r.send_ISE();
                return [2 /*return*/];
        }
    });
}); };
exports.getComplaint = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var r, condition, _a, error, complaints;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                r = res.r;
                condition = req.query;
                return [4 /*yield*/, database_1.model.complaint.getComplaint(condition)];
            case 1:
                _a = _b.sent(), error = _a[0], complaints = _a[1];
                if (error == database_1.MErr.NO_ERRORS) {
                    r.status.OK()
                        .message("Success")
                        .data(complaints)
                        .send();
                    return [2 /*return*/];
                }
                r.send_ISE();
                return [2 /*return*/];
        }
    });
}); };
exports.updateComplaint = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var r, complaintId, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                r = res.r;
                complaintId = req.params.complaintId;
                return [4 /*yield*/, database_1.model.complaint.updateComplaint(complaintId, req.body)];
            case 1:
                error = _a.sent();
                if (error == database_1.MErr.NO_ERRORS) {
                    r.status.OK()
                        .message("Success")
                        .send();
                    return [2 /*return*/];
                }
                r.send_ISE();
                return [2 /*return*/];
        }
    });
}); };
exports.sendTo_DistrictSecApproval = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var r, complaintId, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                r = res.r;
                complaintId = req.params.complaintId;
                return [4 /*yield*/, database_1.model.complaint.updateComplaint(complaintId, { status: core_1.ComStates.AWAIT_APR })];
            case 1:
                error = _a.sent();
                if (error == database_1.MErr.NO_ERRORS) {
                    r.status.OK()
                        .message("Success")
                        .send();
                    return [2 /*return*/];
                }
                r.send_ISE();
                return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udHJvbGxlci9jb21wbGFpbnQvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUNBQWdEO0FBQ2hELDJDQUE2QztBQUVoQyxRQUFBLFlBQVksR0FBWSxVQUFPLEdBQUcsRUFBRSxHQUFHOzs7OztnQkFDeEMsQ0FBQyxHQUFLLEdBQUcsRUFBUixDQUFTO2dCQUNaLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO2dCQUVPLHFCQUFNLGdCQUFLLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBQTs7Z0JBQS9ELEtBQXVCLFNBQXdDLEVBQTlELEtBQUssUUFBQSxFQUFFLFdBQVcsUUFBQTtnQkFFekIsSUFBSSxLQUFLLEtBQUssZUFBSSxDQUFDLFNBQVMsRUFBRTtvQkFDMUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7eUJBQ2IsT0FBTyxDQUFDLDBCQUEwQixDQUFDO3lCQUNuQyxJQUFJLEVBQUUsQ0FBQztvQkFDWixzQkFBTztpQkFDVjtnQkFFRCxJQUFJLEtBQUssS0FBSyxlQUFJLENBQUMsU0FBUyxFQUFFO29CQUMxQixDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRTt5QkFDUixPQUFPLENBQUMsd0JBQXdCLENBQUM7eUJBQ2pDLElBQUksQ0FBQyxXQUFXLENBQUM7eUJBQ2pCLElBQUksRUFBRSxDQUFDO29CQUNaLHNCQUFPO2lCQUNWO2dCQUVELENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7OztLQUNoQixDQUFDO0FBRVcsUUFBQSxZQUFZLEdBQVksVUFBTyxHQUFHLEVBQUUsR0FBRzs7Ozs7Z0JBQ3hDLENBQUMsR0FBSyxHQUFHLEVBQVIsQ0FBUztnQkFDWixTQUFTLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztnQkFFQSxxQkFBTSxnQkFBSyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEVBQUE7O2dCQUFuRSxLQUFzQixTQUE2QyxFQUFsRSxLQUFLLFFBQUEsRUFBRSxVQUFVLFFBQUE7Z0JBRXhCLElBQUksS0FBSyxJQUFJLGVBQUksQ0FBQyxTQUFTLEVBQUU7b0JBQ3pCLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFO3lCQUNSLE9BQU8sQ0FBQyxTQUFTLENBQUM7eUJBQ2xCLElBQUksQ0FBQyxVQUFVLENBQUM7eUJBQ2hCLElBQUksRUFBRSxDQUFDO29CQUNaLHNCQUFPO2lCQUNWO2dCQUVELENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7OztLQUNoQixDQUFDO0FBRVcsUUFBQSxlQUFlLEdBQVksVUFBTyxHQUFHLEVBQUUsR0FBRzs7Ozs7Z0JBQzNDLENBQUMsR0FBSyxHQUFHLEVBQVIsQ0FBUztnQkFDVixXQUFXLEdBQUssR0FBRyxDQUFDLE1BQU0sWUFBZixDQUFnQjtnQkFFckIscUJBQU0sZ0JBQUssQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUE7O2dCQUFwRSxLQUFLLEdBQUcsU0FBNEQ7Z0JBRTFFLElBQUksS0FBSyxJQUFJLGVBQUksQ0FBQyxTQUFTLEVBQUU7b0JBQ3pCLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFO3lCQUNSLE9BQU8sQ0FBQyxTQUFTLENBQUM7eUJBQ2xCLElBQUksRUFBRSxDQUFDO29CQUNaLHNCQUFPO2lCQUNWO2dCQUVELENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7OztLQUNoQixDQUFDO0FBRVcsUUFBQSwwQkFBMEIsR0FBWSxVQUFPLEdBQUcsRUFBRSxHQUFHOzs7OztnQkFDdkQsQ0FBQyxHQUFJLEdBQUcsRUFBUCxDQUFRO2dCQUNULFdBQVcsR0FBSSxHQUFHLENBQUMsTUFBTSxZQUFkLENBQWM7Z0JBRWxCLHFCQUFNLGdCQUFLLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsRUFBQyxNQUFNLEVBQUUsZ0JBQVMsQ0FBQyxTQUFTLEVBQUMsQ0FBQyxFQUFBOztnQkFBekYsS0FBSyxHQUFHLFNBQWlGO2dCQUUvRixJQUFJLEtBQUssSUFBSSxlQUFJLENBQUMsU0FBUyxFQUFFO29CQUN6QixDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRTt5QkFDUixPQUFPLENBQUMsU0FBUyxDQUFDO3lCQUNsQixJQUFJLEVBQUUsQ0FBQztvQkFDWixzQkFBTztpQkFDVjtnQkFFRCxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7Ozs7S0FDaEIsQ0FBQSJ9