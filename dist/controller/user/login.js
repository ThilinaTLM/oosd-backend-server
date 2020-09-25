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
exports.userLogin = void 0;
var database_1 = require("../../database");
var core_1 = require("../../core");
var users_1 = require("../core/users");
exports.userLogin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var r, _a, username, password, _b, error, data, aUser;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                r = new core_1.RBuilder(res);
                _a = req.body, username = _a.username, password = _a.password;
                return [4 /*yield*/, database_1.model.user.getUserAccount(username)];
            case 1:
                _b = _c.sent(), error = _b[0], data = _b[1];
                // If no user exists
                if (error === database_1.MErr.NO_ENTRY_FOUND || error === database_1.MErr.WRONG_ARGUMENTS) {
                    r.status.NOT_FOUND()
                        .message("Incorrect username or password")
                        .send();
                    return [2 /*return*/];
                }
                if (error === database_1.MErr.NO_ERRORS) {
                    aUser = users_1.build.AuthUser(data);
                    // If password is not matched
                    if (!aUser.matchPassword(password)) {
                        r.status.BAD_REQ()
                            .message("Incorrect username or password")
                            .send();
                        return [2 /*return*/];
                    }
                    // If user is not verified
                    if (!aUser.isVerified()) {
                        r.status.UN_AUTH()
                            .message("Account is not verified")
                            .send();
                        return [2 /*return*/];
                    }
                    r.status.OK()
                        .message("Successfully login to the system")
                        .data(users_1.build.CleanUser(data))
                        .token(core_1.jwtMan.signToken(data))
                        .send();
                    return [2 /*return*/];
                }
                // If something else happened
                r.status.ERROR()
                    .message("Internal Server Error")
                    .send();
                return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udHJvbGxlci91c2VyL2xvZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJDQUE2QztBQUM3QyxtQ0FBdUQ7QUFDdkQsdUNBQXNDO0FBRXpCLFFBQUEsU0FBUyxHQUFZLFVBQU8sR0FBRyxFQUFFLEdBQUc7Ozs7O2dCQUN2QyxDQUFDLEdBQUcsSUFBSSxlQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBRXRCLEtBQXlCLEdBQUcsQ0FBQyxJQUFJLEVBQS9CLFFBQVEsY0FBQSxFQUFFLFFBQVEsY0FBQSxDQUFjO2dCQUVsQixxQkFBTSxnQkFBSyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLEVBQUE7O2dCQUF6RCxLQUFnQixTQUF5QyxFQUF4RCxLQUFLLFFBQUEsRUFBRSxJQUFJLFFBQUE7Z0JBRWxCLG9CQUFvQjtnQkFDcEIsSUFBSSxLQUFLLEtBQUssZUFBSSxDQUFDLGNBQWMsSUFBSSxLQUFLLEtBQUssZUFBSSxDQUFDLGVBQWUsRUFBRTtvQkFDakUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUU7eUJBQ2YsT0FBTyxDQUFDLGdDQUFnQyxDQUFDO3lCQUN6QyxJQUFJLEVBQUUsQ0FBQztvQkFDWixzQkFBTztpQkFDVjtnQkFFRCxJQUFJLEtBQUssS0FBSyxlQUFJLENBQUMsU0FBUyxFQUFFO29CQUNwQixLQUFLLEdBQUcsYUFBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFFbkMsNkJBQTZCO29CQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsRUFBRTt3QkFDaEMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7NkJBQ2IsT0FBTyxDQUFDLGdDQUFnQyxDQUFDOzZCQUN6QyxJQUFJLEVBQUUsQ0FBQzt3QkFDWixzQkFBTztxQkFDVjtvQkFFRCwwQkFBMEI7b0JBQzFCLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLEVBQUU7d0JBQ3JCLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFOzZCQUNiLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQzs2QkFDbEMsSUFBSSxFQUFFLENBQUM7d0JBQ1osc0JBQU87cUJBQ1Y7b0JBRUQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUU7eUJBQ1IsT0FBTyxDQUFDLGtDQUFrQyxDQUFDO3lCQUMzQyxJQUFJLENBQUMsYUFBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQzt5QkFDM0IsS0FBSyxDQUFDLGFBQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7eUJBQzdCLElBQUksRUFBRSxDQUFDO29CQUNaLHNCQUFPO2lCQUNWO2dCQUVELDZCQUE2QjtnQkFDN0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUU7cUJBQ1gsT0FBTyxDQUFDLHVCQUF1QixDQUFDO3FCQUNoQyxJQUFJLEVBQUUsQ0FBQzs7OztLQUNmLENBQUMifQ==