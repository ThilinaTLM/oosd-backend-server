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
exports.getAllGNOffices = exports.getAllDivisions = exports.addGNOffice = exports.addDivision = void 0;
var database_1 = require("../../database");
exports.addDivision = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var r, _a, name, address, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                r = res.r;
                _a = req.body, name = _a.name, address = _a.address;
                return [4 /*yield*/, database_1.model.utils.addDivision(name, address)];
            case 1:
                error = _b.sent();
                if (error === database_1.MErr.DUPLICATE) {
                    r.status.BAD_REQ()
                        .message("Division already exists")
                        .send();
                    return [2 /*return*/];
                }
                if (error === database_1.MErr.NO_ERRORS) {
                    r.status.OK()
                        .message("Successfully added")
                        .send();
                    return [2 /*return*/];
                }
                r.status.ERROR()
                    .message("Internal server error")
                    .send();
                return [2 /*return*/];
        }
    });
}); };
exports.addGNOffice = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var r, _a, name, address, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                r = res.r;
                _a = req.body, name = _a.name, address = _a.address;
                return [4 /*yield*/, database_1.model.utils.addGNOffice(name, address)];
            case 1:
                error = _b.sent();
                if (error === database_1.MErr.DUPLICATE) {
                    r.status.BAD_REQ()
                        .message("Division already exists")
                        .send();
                    return [2 /*return*/];
                }
                if (error === database_1.MErr.NO_ERRORS) {
                    r.status.OK()
                        .message("Successfully added")
                        .send();
                    return [2 /*return*/];
                }
                r.status.ERROR()
                    .message("Internal server error")
                    .send();
                return [2 /*return*/];
        }
    });
}); };
exports.getAllDivisions = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var r, _a, error, data;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                r = res.r;
                return [4 /*yield*/, database_1.model.utils.getAllDivisions()];
            case 1:
                _a = _b.sent(), error = _a[0], data = _a[1];
                if (error === database_1.MErr.NO_ERRORS) {
                    r.status.OK()
                        .data(data)
                        .message("Success")
                        .send();
                    return [2 /*return*/];
                }
                r.status.ERROR()
                    .message("Internal server error")
                    .send();
                return [2 /*return*/];
        }
    });
}); };
exports.getAllGNOffices = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var r, _a, error, data;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                r = res.r;
                return [4 /*yield*/, database_1.model.utils.getAllGNOffices()];
            case 1:
                _a = _b.sent(), error = _a[0], data = _a[1];
                if (error === database_1.MErr.NO_ERRORS) {
                    r.status.OK()
                        .data(data)
                        .message("Success")
                        .send();
                    return [2 /*return*/];
                }
                r.status.ERROR()
                    .message("Internal server error")
                    .send();
                return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udHJvbGxlci91dGlscy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSwyQ0FBNkM7QUFHaEMsUUFBQSxXQUFXLEdBQVksVUFBTyxHQUFHLEVBQUUsR0FBRzs7Ozs7Z0JBQ3ZDLENBQUMsR0FBSyxHQUFHLEVBQVIsQ0FBUztnQkFDWixLQUFvQixHQUFHLENBQUMsSUFBSSxFQUExQixJQUFJLFVBQUEsRUFBRSxPQUFPLGFBQUEsQ0FBYztnQkFFckIscUJBQU0sZ0JBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsRUFBQTs7Z0JBQXBELEtBQUssR0FBRyxTQUE0QztnQkFFMUQsSUFBSSxLQUFLLEtBQUssZUFBSSxDQUFDLFNBQVMsRUFBRTtvQkFDMUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7eUJBQ2IsT0FBTyxDQUFDLHlCQUF5QixDQUFDO3lCQUNsQyxJQUFJLEVBQUUsQ0FBQztvQkFDWixzQkFBTztpQkFDVjtnQkFFRCxJQUFJLEtBQUssS0FBSyxlQUFJLENBQUMsU0FBUyxFQUFFO29CQUMxQixDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRTt5QkFDUixPQUFPLENBQUMsb0JBQW9CLENBQUM7eUJBQzdCLElBQUksRUFBRSxDQUFDO29CQUNaLHNCQUFPO2lCQUNWO2dCQUVELENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO3FCQUNYLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQztxQkFDaEMsSUFBSSxFQUFFLENBQUM7Ozs7S0FDZixDQUFDO0FBRVcsUUFBQSxXQUFXLEdBQVksVUFBTyxHQUFHLEVBQUUsR0FBRzs7Ozs7Z0JBQ3ZDLENBQUMsR0FBSyxHQUFHLEVBQVIsQ0FBUztnQkFDWixLQUFvQixHQUFHLENBQUMsSUFBSSxFQUExQixJQUFJLFVBQUEsRUFBRSxPQUFPLGFBQUEsQ0FBYztnQkFFckIscUJBQU0sZ0JBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsRUFBQTs7Z0JBQXBELEtBQUssR0FBRyxTQUE0QztnQkFFMUQsSUFBSSxLQUFLLEtBQUssZUFBSSxDQUFDLFNBQVMsRUFBRTtvQkFDMUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7eUJBQ2IsT0FBTyxDQUFDLHlCQUF5QixDQUFDO3lCQUNsQyxJQUFJLEVBQUUsQ0FBQztvQkFDWixzQkFBTztpQkFDVjtnQkFFRCxJQUFJLEtBQUssS0FBSyxlQUFJLENBQUMsU0FBUyxFQUFFO29CQUMxQixDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRTt5QkFDUixPQUFPLENBQUMsb0JBQW9CLENBQUM7eUJBQzdCLElBQUksRUFBRSxDQUFDO29CQUNaLHNCQUFPO2lCQUNWO2dCQUVELENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO3FCQUNYLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQztxQkFDaEMsSUFBSSxFQUFFLENBQUM7Ozs7S0FDZixDQUFDO0FBRVcsUUFBQSxlQUFlLEdBQVksVUFBTyxHQUFHLEVBQUUsR0FBRzs7Ozs7Z0JBQzNDLENBQUMsR0FBSyxHQUFHLEVBQVIsQ0FBUztnQkFFSSxxQkFBTSxnQkFBSyxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUUsRUFBQTs7Z0JBQW5ELEtBQWdCLFNBQW1DLEVBQWxELEtBQUssUUFBQSxFQUFFLElBQUksUUFBQTtnQkFFbEIsSUFBSSxLQUFLLEtBQUssZUFBSSxDQUFDLFNBQVMsRUFBRTtvQkFDMUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUU7eUJBQ1IsSUFBSSxDQUFDLElBQUksQ0FBQzt5QkFDVixPQUFPLENBQUMsU0FBUyxDQUFDO3lCQUNsQixJQUFJLEVBQUUsQ0FBQztvQkFDWixzQkFBTztpQkFDVjtnQkFFRCxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtxQkFDWCxPQUFPLENBQUMsdUJBQXVCLENBQUM7cUJBQ2hDLElBQUksRUFBRSxDQUFDOzs7O0tBQ2YsQ0FBQztBQUVXLFFBQUEsZUFBZSxHQUFZLFVBQU8sR0FBRyxFQUFFLEdBQUc7Ozs7O2dCQUMzQyxDQUFDLEdBQUssR0FBRyxFQUFSLENBQVM7Z0JBRUkscUJBQU0sZ0JBQUssQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLEVBQUE7O2dCQUFuRCxLQUFnQixTQUFtQyxFQUFsRCxLQUFLLFFBQUEsRUFBRSxJQUFJLFFBQUE7Z0JBRWxCLElBQUksS0FBSyxLQUFLLGVBQUksQ0FBQyxTQUFTLEVBQUU7b0JBQzFCLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFO3lCQUNSLElBQUksQ0FBQyxJQUFJLENBQUM7eUJBQ1YsT0FBTyxDQUFDLFNBQVMsQ0FBQzt5QkFDbEIsSUFBSSxFQUFFLENBQUM7b0JBQ1osc0JBQU87aUJBQ1Y7Z0JBRUQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUU7cUJBQ1gsT0FBTyxDQUFDLHVCQUF1QixDQUFDO3FCQUNoQyxJQUFJLEVBQUUsQ0FBQzs7OztLQUNmLENBQUMifQ==