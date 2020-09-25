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
exports.user = void 0;
var uuid_1 = require("uuid");
var mapper_1 = require("../core/mapper");
var mysql_1 = require("../core/eWrapper/mysql");
var qBuilder_1 = require("../core/qBuilder");
var index_1 = require("../index");
var mapper = mapper_1.BuildMapper([
    mapper_1.mp("user_id", "userId"),
    mapper_1.mp("first_name", "firstName"),
    mapper_1.mp("last_name", "lastName"),
    mapper_1.mp("telephone_number", "telephoneNumber")
]);
exports.user = {
    getUserAccount: function (username) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, error, data;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!username) {
                        return [2 /*return*/, [index_1.MErr.WRONG_ARGUMENTS, {}]];
                    }
                    return [4 /*yield*/, mysql_1.mysqlExeEW.run("SELECT * FROM users u\n            JOIN credentials c ON c.user_id = u.user_id\n            WHERE username = ?", [username])];
                case 1:
                    _a = _b.sent(), error = _a[0], data = _a[1];
                    // Check results and Convert the into proper format
                    if (error === "") {
                        if (data[0].length == 0) {
                            return [2 /*return*/, [index_1.MErr.NO_ENTRY_FOUND, data]];
                        }
                        data = mapper.forward(data[0][0]);
                    }
                    return [2 /*return*/, [error, data]];
            }
        });
    }); },
    addUser: function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var args, _a, error, _;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    args = [
                        uuid_1.v4(),
                        data.role,
                        data.firstName,
                        data.lastName,
                        data.email,
                        data.telephoneNumber,
                        data.office,
                        data.username,
                        data.hash,
                        data.verified
                    ];
                    return [4 /*yield*/, mysql_1.mysqlExeEW.run("CALL AddAccount(" + qBuilder_1.QBuild.ARGS_STRING(args.length) + ")", args)];
                case 1:
                    _a = _b.sent(), error = _a[0], _ = _a[1];
                    return [2 /*return*/, [error, args[0]]];
            }
        });
    }); },
    getUser: function (condition) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, error, results, users, i;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    condition = mapper.backward(condition);
                    return [4 /*yield*/, mysql_1.mysqlExeEW.run.apply(mysql_1.mysqlExeEW, qBuilder_1.QBuild.SELECT('users', condition))];
                case 1:
                    _a = _b.sent(), error = _a[0], results = _a[1];
                    if (error === "") { // if error
                        users = results[0]; // [results, fields]
                        for (i = 0; i < users.length; i++) {
                            users[i] = mapper.forward(users[i]);
                        }
                    }
                    return [2 /*return*/, [error, users]];
            }
        });
    }); },
    updateUserDetails: function (userId, data) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, error, _;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    // remove unique fields
                    delete data.userId;
                    data = mapper.backward(data);
                    return [4 /*yield*/, mysql_1.mysqlExeEW.run.apply(mysql_1.mysqlExeEW, qBuilder_1.QBuild.UPDATE("users", data, { user_id: userId }))];
                case 1:
                    _a = _b.sent(), error = _a[0], _ = _a[1];
                    return [2 /*return*/, error];
            }
        });
    }); },
    updateCredentials: function (userId, data) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, error, _;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    delete data.user_id;
                    data = mapper.backward(data);
                    return [4 /*yield*/, mysql_1.mysqlExeEW.run.apply(mysql_1.mysqlExeEW, qBuilder_1.QBuild.UPDATE("credentials", data, { user_id: userId }))];
                case 1:
                    _a = _b.sent(), error = _a[0], _ = _a[1];
                    return [2 /*return*/, error];
            }
        });
    }); },
    checkUsername: function (username) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, error, data;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, mysql_1.mysqlExeEW.run.apply(mysql_1.mysqlExeEW, qBuilder_1.QBuild.SELECT('credentials', { username: username }))];
                case 1:
                    _a = _b.sent(), error = _a[0], data = _a[1];
                    if (error !== "") { // if any error happens
                        return [2 /*return*/, [error, true]];
                    }
                    return [2 /*return*/, [error, data[0].length !== 0]];
            }
        });
    }); }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhYmFzZS9tb2RlbHMvdXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2QkFBcUM7QUFDckMseUNBQWlEO0FBQ2pELGdEQUFvRDtBQUNwRCw2Q0FBMEM7QUFDMUMsa0NBQTRDO0FBaUI1QyxJQUFNLE1BQU0sR0FBRyxvQkFBVyxDQUFXO0lBQ2pDLFdBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDO0lBQ3ZCLFdBQUUsQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDO0lBQzdCLFdBQUUsQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDO0lBQzNCLFdBQUUsQ0FBQyxrQkFBa0IsRUFBRSxpQkFBaUIsQ0FBQztDQUM1QyxDQUFDLENBQUM7QUFHVSxRQUFBLElBQUksR0FBRztJQUNoQixjQUFjLEVBQUUsVUFBTyxRQUFnQjs7Ozs7b0JBQ25DLElBQUksQ0FBQyxRQUFRLEVBQUU7d0JBQ1gsc0JBQU8sQ0FBQyxZQUFJLENBQUMsZUFBZSxFQUFFLEVBQWMsQ0FBQyxFQUFDO3FCQUNqRDtvQkFFbUIscUJBQU0sa0JBQVUsQ0FBQyxHQUFHLENBQ3BDLGdIQUVtQixFQUNuQixDQUFDLFFBQVEsQ0FBQyxDQUNiLEVBQUE7O29CQUxHLEtBQWdCLFNBS25CLEVBTEksS0FBSyxRQUFBLEVBQUUsSUFBSSxRQUFBO29CQU9oQixtREFBbUQ7b0JBQ25ELElBQUksS0FBSyxLQUFLLEVBQUUsRUFBRTt3QkFDZCxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFOzRCQUNyQixzQkFBTyxDQUFDLFlBQUksQ0FBQyxjQUFjLEVBQUUsSUFBZ0IsQ0FBQyxFQUFDO3lCQUNsRDt3QkFDRCxJQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDckM7b0JBRUQsc0JBQU8sQ0FBQyxLQUFLLEVBQUUsSUFBZ0IsQ0FBQyxFQUFDOzs7U0FDcEM7SUFFRCxPQUFPLEVBQUUsVUFBTyxJQUFTOzs7OztvQkFDZixJQUFJLEdBQUc7d0JBQ1QsU0FBTyxFQUFFO3dCQUNULElBQUksQ0FBQyxJQUFJO3dCQUVULElBQUksQ0FBQyxTQUFTO3dCQUNkLElBQUksQ0FBQyxRQUFRO3dCQUNiLElBQUksQ0FBQyxLQUFLO3dCQUNWLElBQUksQ0FBQyxlQUFlO3dCQUNwQixJQUFJLENBQUMsTUFBTTt3QkFFWCxJQUFJLENBQUMsUUFBUTt3QkFDYixJQUFJLENBQUMsSUFBSTt3QkFDVCxJQUFJLENBQUMsUUFBUTtxQkFDaEIsQ0FBQztvQkFDaUIscUJBQU0sa0JBQVUsQ0FBQyxHQUFHLENBQ25DLHFCQUFtQixpQkFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQUcsRUFDckQsSUFBSSxDQUNQLEVBQUE7O29CQUhLLEtBQWEsU0FHbEIsRUFITSxLQUFLLFFBQUEsRUFBRSxDQUFDLFFBQUE7b0JBSWYsc0JBQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBVyxDQUFDLEVBQUM7OztTQUNyQztJQUVELE9BQU8sRUFBRSxVQUFPLFNBQWM7Ozs7O29CQUMxQixTQUFTLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQTtvQkFFYixxQkFBTSxrQkFBVSxDQUFDLEdBQUcsT0FBZCxrQkFBVSxFQUFRLGlCQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsR0FBQzs7b0JBQTdFLEtBQW1CLFNBQTBELEVBQTVFLEtBQUssUUFBQSxFQUFFLE9BQU8sUUFBQTtvQkFHckIsSUFBSSxLQUFLLEtBQUssRUFBRSxFQUFFLEVBQUUsV0FBVzt3QkFDM0IsS0FBSyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLG9CQUFvQjt3QkFDeEMsS0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFOzRCQUNuQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDdkM7cUJBQ0o7b0JBRUQsc0JBQU8sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQUM7OztTQUV6QjtJQUVELGlCQUFpQixFQUFFLFVBQU8sTUFBYyxFQUFFLElBQVM7Ozs7O29CQUMvQyx1QkFBdUI7b0JBQ3ZCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQTtvQkFFbEIsSUFBSSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBRVYscUJBQU0sa0JBQVUsQ0FBQyxHQUFHLE9BQWQsa0JBQVUsRUFBUSxpQkFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLEdBQUM7O29CQUF2RixLQUFhLFNBQTBFLEVBQXRGLEtBQUssUUFBQSxFQUFFLENBQUMsUUFBQTtvQkFDZixzQkFBTyxLQUFLLEVBQUM7OztTQUNoQjtJQUVELGlCQUFpQixFQUFFLFVBQU8sTUFBYyxFQUFFLElBQVM7Ozs7O29CQUMvQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7b0JBRXBCLElBQUksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUVWLHFCQUFNLGtCQUFVLENBQUMsR0FBRyxPQUFkLGtCQUFVLEVBQVEsaUJBQU0sQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLElBQUksRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxHQUFDOztvQkFBN0YsS0FBYSxTQUFnRixFQUE1RixLQUFLLFFBQUEsRUFBRSxDQUFDLFFBQUE7b0JBQ2Ysc0JBQU8sS0FBSyxFQUFDOzs7U0FDaEI7SUFFRCxhQUFhLEVBQUUsVUFBTyxRQUFnQjs7Ozt3QkFFWixxQkFBTSxrQkFBVSxDQUFDLEdBQUcsT0FBZCxrQkFBVSxFQUFRLGlCQUFNLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxFQUFDLFFBQVEsVUFBQSxFQUFDLENBQUMsR0FBQzs7b0JBQWpGLEtBQWdCLFNBQWlFLEVBQWhGLEtBQUssUUFBQSxFQUFFLElBQUksUUFBQTtvQkFFbEIsSUFBSSxLQUFLLEtBQUssRUFBRSxFQUFFLEVBQUUsdUJBQXVCO3dCQUN2QyxzQkFBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBQztxQkFDeEI7b0JBRUQsc0JBQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsRUFBQzs7O1NBQ3hDO0NBQ0osQ0FBQyJ9