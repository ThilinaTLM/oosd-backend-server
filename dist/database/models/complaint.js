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
exports.complaint = void 0;
var mapper_1 = require("../core/mapper");
var uuid_1 = require("uuid");
var mysql_1 = require("../core/eWrapper/mysql");
var qBuilder_1 = require("../core/qBuilder");
var mapper = mapper_1.BuildMapper([
    mapper_1.mp("complaint_id", "complaintId"),
    mapper_1.mp("ref_no", "refNo"),
    mapper_1.mp("customer_id", "customerId"),
    mapper_1.mp("created_date", "createdDate"),
    mapper_1.mp("assigned_div", "assignedDiv"),
    mapper_1.mp("assigned_by", "assignedBy"),
    mapper_1.mp("assigned_date", "assignedDate")
]);
exports.complaint = {
    addComplaint: function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, error, res;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    data = mapper.backward(data);
                    data.complaint_id = uuid_1.v4();
                    return [4 /*yield*/, mysql_1.mysqlExeEW.run.apply(mysql_1.mysqlExeEW, qBuilder_1.QBuild.INSERT("complaints", data))];
                case 1:
                    _a = _b.sent(), error = _a[0], res = _a[1];
                    return [2 /*return*/, [error, data.complaint_id]];
            }
        });
    }); },
    getComplaint: function (condition) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, error, res, complaints, i;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, mysql_1.mysqlExeEW.run.apply(mysql_1.mysqlExeEW, qBuilder_1.QBuild.SELECT("complaints", condition))];
                case 1:
                    _a = _b.sent(), error = _a[0], res = _a[1];
                    complaints = [];
                    if (error === "") {
                        complaints = res[0];
                        for (i = 0; i < complaints.length; i++) {
                            complaints[i] = mapper.forward(complaints[i]);
                        }
                    }
                    return [2 /*return*/, [error, complaints]];
            }
        });
    }); },
    updateComplaint: function (complaintId, data) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, error, res;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    delete data.complaintId; // remove unique keys
                    data = mapper.backward(data);
                    return [4 /*yield*/, mysql_1.mysqlExeEW.run.apply(mysql_1.mysqlExeEW, qBuilder_1.QBuild.UPDATE("complaints", data, { complaint_id: complaintId }))];
                case 1:
                    _a = _b.sent(), error = _a[0], res = _a[1];
                    return [2 /*return*/, error];
            }
        });
    }); }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGxhaW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2RhdGFiYXNlL21vZGVscy9jb21wbGFpbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUNBQWlEO0FBQ2pELDZCQUFxQztBQUNyQyxnREFBb0Q7QUFDcEQsNkNBQTBDO0FBaUIxQyxJQUFNLE1BQU0sR0FBRyxvQkFBVyxDQUFnQjtJQUN0QyxXQUFFLENBQUMsY0FBYyxFQUFFLGFBQWEsQ0FBQztJQUNqQyxXQUFFLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQztJQUNyQixXQUFFLENBQUMsYUFBYSxFQUFFLFlBQVksQ0FBQztJQUMvQixXQUFFLENBQUMsY0FBYyxFQUFFLGFBQWEsQ0FBQztJQUNqQyxXQUFFLENBQUMsY0FBYyxFQUFFLGFBQWEsQ0FBQztJQUNqQyxXQUFFLENBQUMsYUFBYSxFQUFFLFlBQVksQ0FBQztJQUMvQixXQUFFLENBQUMsZUFBZSxFQUFFLGNBQWMsQ0FBQztDQUN0QyxDQUFDLENBQUM7QUFFVSxRQUFBLFNBQVMsR0FBRztJQUNyQixZQUFZLEVBQUUsVUFBTyxJQUFTOzs7OztvQkFDMUIsSUFBSSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzdCLElBQUksQ0FBQyxZQUFZLEdBQUcsU0FBTyxFQUFFLENBQUM7b0JBRVQscUJBQU0sa0JBQVUsQ0FBQyxHQUFHLE9BQWQsa0JBQVUsRUFBUSxpQkFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLEdBQUM7O29CQUF6RSxLQUFlLFNBQTBELEVBQXhFLEtBQUssUUFBQSxFQUFFLEdBQUcsUUFBQTtvQkFDakIsc0JBQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFDOzs7U0FDckM7SUFFRCxZQUFZLEVBQUUsVUFBTyxTQUFjOzs7O3dCQUNWLHFCQUFNLGtCQUFVLENBQUMsR0FBRyxPQUFkLGtCQUFVLEVBQVEsaUJBQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLFNBQVMsQ0FBQyxHQUFDOztvQkFBOUUsS0FBZSxTQUErRCxFQUE3RSxLQUFLLFFBQUEsRUFBRSxHQUFHLFFBQUE7b0JBRWIsVUFBVSxHQUFHLEVBQUUsQ0FBQztvQkFDcEIsSUFBSSxLQUFLLEtBQUssRUFBRSxFQUFFO3dCQUNkLFVBQVUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3BCLEtBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTs0QkFDeEMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7eUJBQ2pEO3FCQUNKO29CQUVELHNCQUFPLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxFQUFDOzs7U0FDOUI7SUFFRCxlQUFlLEVBQUUsVUFBTyxXQUFtQixFQUFFLElBQVM7Ozs7O29CQUNsRCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxxQkFBcUI7b0JBQzlDLElBQUksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUVSLHFCQUFNLGtCQUFVLENBQUMsR0FBRyxPQUFkLGtCQUFVLEVBQVEsaUJBQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLElBQUksRUFBRSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsQ0FBQyxHQUFDOztvQkFBeEcsS0FBZSxTQUF5RixFQUF2RyxLQUFLLFFBQUEsRUFBRSxHQUFHLFFBQUE7b0JBQ2pCLHNCQUFPLEtBQUssRUFBQzs7O1NBQ2hCO0NBQ0osQ0FBQyJ9