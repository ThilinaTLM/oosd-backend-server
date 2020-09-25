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
exports.disableUser = exports.verifyUser = exports.updateCredential = exports.updateUserData = exports.isUsernameExist = exports.getUser = exports.loginUser = exports.addUser = void 0;
var database_1 = require("../../database");
var add_1 = require("./add");
var login_1 = require("./login");
exports.addUser = add_1.addUser;
exports.loginUser = login_1.userLogin;
exports.getUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var r, query, _a, error, users;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                r = res.r;
                query = req.query;
                return [4 /*yield*/, database_1.model.user.getUser(query)];
            case 1:
                _a = _b.sent(), error = _a[0], users = _a[1];
                if (error === database_1.MErr.NO_ERRORS) {
                    r.status.OK()
                        .data(users)
                        .message('Success')
                        .send();
                    return [2 /*return*/];
                }
                r.status.ERROR()
                    .message('Internal Server Error')
                    .send();
                return [2 /*return*/];
        }
    });
}); };
exports.isUsernameExist = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var r, username, _a, error, isExist;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                r = res.r;
                username = req.params.username;
                return [4 /*yield*/, database_1.model.user.checkUsername(username)];
            case 1:
                _a = _b.sent(), error = _a[0], isExist = _a[1];
                if (error === database_1.MErr.NO_ERRORS) {
                    r.status.OK()
                        .data(isExist)
                        .message('Success')
                        .send();
                    return [2 /*return*/];
                }
                r.status.ERROR()
                    .message('Internal Server Error')
                    .send();
                return [2 /*return*/];
        }
    });
}); };
exports.updateUserData = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var r, userId, data, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                r = res.r;
                userId = req.params.userId;
                data = req.body;
                return [4 /*yield*/, database_1.model.user.updateUserDetails(userId, data)];
            case 1:
                error = _a.sent();
                if (error === database_1.MErr.NO_ERRORS) {
                    r.status.OK()
                        .message('Success')
                        .send();
                    return [2 /*return*/];
                }
                r.send_ISE();
                return [2 /*return*/];
        }
    });
}); };
exports.updateCredential = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var r, userId, data, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                r = res.r;
                userId = req.params.userId;
                data = req.body;
                return [4 /*yield*/, database_1.model.user.updateCredentials(userId, data)];
            case 1:
                error = _a.sent();
                if (error === database_1.MErr.NO_ERRORS) {
                    r.status.OK()
                        .message('Success')
                        .send();
                    return [2 /*return*/];
                }
                r.send_ISE();
                return [2 /*return*/];
        }
    });
}); };
exports.verifyUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                req.body = { verified: true };
                return [4 /*yield*/, exports.updateCredential(req, res, function () { })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.disableUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                req.body = { verified: false };
                return [4 /*yield*/, exports.updateCredential(req, res, function () { })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udHJvbGxlci91c2VyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJDQUE2QztBQUU3Qyw2QkFBb0M7QUFDcEMsaUNBQXdDO0FBRTNCLFFBQUEsT0FBTyxHQUFHLGFBQUUsQ0FBQztBQUNiLFFBQUEsU0FBUyxHQUFHLGlCQUFFLENBQUM7QUFFZixRQUFBLE9BQU8sR0FBWSxVQUFPLEdBQUcsRUFBRSxHQUFHOzs7OztnQkFDcEMsQ0FBQyxHQUFJLEdBQUcsRUFBUCxDQUFRO2dCQUNWLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO2dCQUVELHFCQUFNLGdCQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBQTs7Z0JBQWhELEtBQWlCLFNBQStCLEVBQS9DLEtBQUssUUFBQSxFQUFFLEtBQUssUUFBQTtnQkFFbkIsSUFBSSxLQUFLLEtBQUssZUFBSSxDQUFDLFNBQVMsRUFBRTtvQkFDMUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUU7eUJBQ1IsSUFBSSxDQUFDLEtBQUssQ0FBQzt5QkFDWCxPQUFPLENBQUMsU0FBUyxDQUFDO3lCQUNsQixJQUFJLEVBQUUsQ0FBQTtvQkFDWCxzQkFBUTtpQkFDWDtnQkFFRCxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtxQkFDWCxPQUFPLENBQUMsdUJBQXVCLENBQUM7cUJBQ2hDLElBQUksRUFBRSxDQUFBOzs7O0tBQ2QsQ0FBQTtBQUVZLFFBQUEsZUFBZSxHQUFZLFVBQU8sR0FBRyxFQUFFLEdBQUc7Ozs7O2dCQUM1QyxDQUFDLEdBQUksR0FBRyxFQUFQLENBQVE7Z0JBQ1YsUUFBUSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFBO2dCQUVYLHFCQUFNLGdCQUFLLENBQUMsSUFB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