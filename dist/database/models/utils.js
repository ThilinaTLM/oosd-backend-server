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
exports.utils = void 0;
var mysql_1 = require("../core/eWrapper/mysql");
var qBuilder_1 = require("../core/qBuilder");
exports.utils = {
    getAllDivisions: function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, error, data;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, mysql_1.mysqlExeEW.run('SELECT * FROM divisional_offices')];
                case 1:
                    _a = _b.sent(), error = _a[0], data = _a[1];
                    return [2 /*return*/, [error, data[0]]];
            }
        });
    }); },
    getAllGNOffices: function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, error, data;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, mysql_1.mysqlExeEW.run('SELECT * FROM grama_niladhari_offices')];
                case 1:
                    _a = _b.sent(), error = _a[0], data = _a[1];
                    return [2 /*return*/, [error, data[0]]];
            }
        });
    }); },
    addDivision: function (name, address) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, error, _;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, mysql_1.mysqlExeEW.run.apply(mysql_1.mysqlExeEW, qBuilder_1.QBuild.INSERT("divisional_offices", {
                        name: name,
                        address: address
                    }))];
                case 1:
                    _a = _b.sent(), error = _a[0], _ = _a[1];
                    return [2 /*return*/, error];
            }
        });
    }); },
    addGNOffice: function (name, address) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, error, _;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, mysql_1.mysqlExeEW.run.apply(mysql_1.mysqlExeEW, qBuilder_1.QBuild.INSERT("grama_niladhari_offices", {
                        name: name,
                        address: address
                    }))];
                case 1:
                    _a = _b.sent(), error = _a[0], _ = _a[1];
                    return [2 /*return*/, error];
            }
        });
    }); },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZGF0YWJhc2UvbW9kZWxzL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdEQUFvRDtBQUNwRCw2Q0FBMEM7QUFRN0IsUUFBQSxLQUFLLEdBQUc7SUFFakIsZUFBZSxFQUFFOzs7O3dCQUNTLHFCQUFNLGtCQUFVLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxDQUFDLEVBQUE7O29CQUF4RSxLQUFnQixTQUF3RCxFQUF2RSxLQUFLLFFBQUEsRUFBRSxJQUFJLFFBQUE7b0JBQ2xCLHNCQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDOzs7U0FDM0I7SUFFRCxlQUFlLEVBQUU7Ozs7d0JBQ1MscUJBQU0sa0JBQVUsQ0FBQyxHQUFHLENBQUMsdUNBQXVDLENBQUMsRUFBQTs7b0JBQTdFLEtBQWdCLFNBQTZELEVBQTVFLEtBQUssUUFBQSxFQUFFLElBQUksUUFBQTtvQkFDbEIsc0JBQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUM7OztTQUMzQjtJQUVELFdBQVcsRUFBRSxVQUFPLElBQVksRUFBRSxPQUFlOzs7O3dCQUMxQixxQkFBTSxrQkFBVSxDQUFDLEdBQUcsT0FBZCxrQkFBVSxFQUM1QixpQkFBTSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsRUFDakM7d0JBQ0ksSUFBSSxNQUFBO3dCQUNKLE9BQU8sU0FBQTtxQkFDVixDQUNKLEdBQUM7O29CQU5BLEtBQWEsU0FNYixFQU5DLEtBQUssUUFBQSxFQUFFLENBQUMsUUFBQTtvQkFPZixzQkFBTyxLQUFLLEVBQUE7OztTQUNmO0lBRUQsV0FBVyxFQUFFLFVBQU8sSUFBWSxFQUFFLE9BQWU7Ozs7d0JBQzFCLHFCQUFNLGtCQUFVLENBQUMsR0FBRyxPQUFkLGtCQUFVLEVBQzVCLGlCQUFNLENBQUMsTUFBTSxDQUFDLHlCQUF5QixFQUN0Qzt3QkFDSSxJQUFJLE1BQUE7d0JBQ0osT0FBTyxTQUFBO3FCQUNWLENBQ0osR0FBQzs7b0JBTkEsS0FBYSxTQU1iLEVBTkMsS0FBSyxRQUFBLEVBQUUsQ0FBQyxRQUFBO29CQU9mLHNCQUFPLEtBQUssRUFBQTs7O1NBQ2Y7Q0FDSixDQUFDIn0=