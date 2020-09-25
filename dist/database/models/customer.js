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
exports.customer = void 0;
var uuid_1 = require("uuid");
var mapper_1 = require("../core/mapper");
var mysql_1 = require("../core/eWrapper/mysql");
var qBuilder_1 = require("../core/qBuilder");
var mapper = mapper_1.BuildMapper([
    mapper_1.mp("customer_id", "customerId"),
    mapper_1.mp("full_name", "fullName"),
    mapper_1.mp("divisional_office", "divisionalOffice"),
    mapper_1.mp("gn_office", "gnOffice")
]);
exports.customer = {
    addCustomer: function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, error, res;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    // convert into database name convention
                    data = mapper.backward(data);
                    data.customer_id = uuid_1.v4();
                    return [4 /*yield*/, mysql_1.mysqlExeEW.run.apply(mysql_1.mysqlExeEW, qBuilder_1.QBuild.INSERT("customers", data))];
                case 1:
                    _a = _b.sent(), error = _a[0], res = _a[1];
                    return [2 /*return*/, [error, data.customer_id]];
            }
        });
    }); },
    getCustomer: function (condition) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, error, res, customers, i;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    // convert into database name convention
                    condition = mapper.backward(condition);
                    return [4 /*yield*/, mysql_1.mysqlExeEW.run.apply(mysql_1.mysqlExeEW, qBuilder_1.QBuild.SELECT("customers", condition))];
                case 1:
                    _a = _b.sent(), error = _a[0], res = _a[1];
                    if (error === "") { // if error
                        customers = res[0];
                        for (i = 0; i < customers.length; i++) {
                            customers[i] = mapper.forward(customers[i]);
                        }
                    }
                    return [2 /*return*/, [error, customers]];
            }
        });
    }); },
    updateCustomer: function (customerId, data) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, error, _;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    // remove unique fields
                    delete data.customerId;
                    delete data.nic;
                    data = mapper.backward(data);
                    return [4 /*yield*/, mysql_1.mysqlExeEW.run.apply(mysql_1.mysqlExeEW, qBuilder_1.QBuild.UPDATE("customers", data, { customer_id: customerId }))];
                case 1:
                    _a = _b.sent(), error = _a[0], _ = _a[1];
                    return [2 /*return*/, error];
            }
        });
    }); }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZGF0YWJhc2UvbW9kZWxzL2N1c3RvbWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZCQUFxQztBQUNyQyx5Q0FBaUQ7QUFDakQsZ0RBQW9EO0FBQ3BELDZDQUEwQztBQWUxQyxJQUFNLE1BQU0sR0FBRyxvQkFBVyxDQUFlO0lBQ3JDLFdBQUUsQ0FBQyxhQUFhLEVBQUUsWUFBWSxDQUFDO0lBQy9CLFdBQUUsQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDO0lBQzNCLFdBQUUsQ0FBQyxtQkFBbUIsRUFBRSxrQkFBa0IsQ0FBQztJQUMzQyxXQUFFLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQztDQUM5QixDQUFDLENBQUM7QUFFVSxRQUFBLFFBQVEsR0FBRztJQUNwQixXQUFXLEVBQUUsVUFBTyxJQUFTOzs7OztvQkFDekIsd0NBQXdDO29CQUN4QyxJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDN0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFPLEVBQUUsQ0FBQztvQkFFUixxQkFBTSxrQkFBVSxDQUFDLEdBQUcsT0FBZCxrQkFBVSxFQUFRLGlCQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsR0FBQzs7b0JBQXhFLEtBQWUsU0FBeUQsRUFBdkUsS0FBSyxRQUFBLEVBQUUsR0FBRyxRQUFBO29CQUNqQixzQkFBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUM7OztTQUNwQztJQUVELFdBQVcsRUFBRSxVQUFPLFNBQWM7Ozs7O29CQUM5Qix3Q0FBd0M7b0JBQ3hDLFNBQVMsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUVsQixxQkFBTSxrQkFBVSxDQUFDLEdBQUcsT0FBZCxrQkFBVSxFQUFRLGlCQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsR0FBQzs7b0JBQTdFLEtBQWUsU0FBOEQsRUFBNUUsS0FBSyxRQUFBLEVBQUUsR0FBRyxRQUFBO29CQUdqQixJQUFJLEtBQUssS0FBSyxFQUFFLEVBQUUsRUFBRSxXQUFXO3dCQUMzQixTQUFTLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNuQixLQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7NEJBQ3ZDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3lCQUMvQztxQkFDSjtvQkFFRCxzQkFBTyxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsRUFBQzs7O1NBQzdCO0lBRUQsY0FBYyxFQUFFLFVBQU8sVUFBa0IsRUFBRSxJQUFTOzs7OztvQkFDaEQsdUJBQXVCO29CQUN2QixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7b0JBQ3ZCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztvQkFFaEIsSUFBSSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBRVYscUJBQU0sa0JBQVUsQ0FBQyxHQUFHLE9BQWQsa0JBQVUsRUFBUSxpQkFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxDQUFDLEdBQUM7O29CQUFuRyxLQUFhLFNBQXNGLEVBQWxHLEtBQUssUUFBQSxFQUFFLENBQUMsUUFBQTtvQkFDZixzQkFBTyxLQUFLLEVBQUM7OztTQUNoQjtDQUNKLENBQUMifQ==