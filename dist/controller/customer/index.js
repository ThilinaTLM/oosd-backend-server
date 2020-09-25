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
exports.getCustomer = exports.updateCustomer = exports.addCustomer = void 0;
var database_1 = require("../../database");
exports.addCustomer = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var r, data, _a, error, customerId;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                r = res.r;
                data = req.body;
                return [4 /*yield*/, database_1.model.customer.addCustomer(data)];
            case 1:
                _a = _b.sent(), error = _a[0], customerId = _a[1];
                if (error === database_1.MErr.DUPLICATE) {
                    r.status.BAD_REQ()
                        .message('Duplicate customer entry')
                        .send();
                    return [2 /*return*/];
                }
                if (error === database_1.MErr.NO_ERRORS) {
                    r.status.OK()
                        .message('Customer entry added!')
                        .data(customerId)
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
exports.updateCustomer = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var r, customerId, data, error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                r = res.r;
                customerId = req.params.customerId;
                data = req.body;
                return [4 /*yield*/, database_1.model.customer.updateCustomer(customerId, data)];
            case 1:
                error = _a.sent();
                if (error === database_1.MErr.NO_ERRORS) {
                    r.status.OK()
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
exports.getCustomer = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var r, query, _a, error, customers;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                r = res.r;
                query = req.query;
                return [4 /*yield*/, database_1.model.customer.getCustomer(query)];
            case 1:
                _a = _b.sent(), error = _a[0], customers = _a[1];
                if (error === database_1.MErr.NO_ERRORS) {
                    r.status.OK()
                        .message('Success')
                        .data(customers)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udHJvbGxlci9jdXN0b21lci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSwyQ0FBNkM7QUFHaEMsUUFBQSxXQUFXLEdBQVksVUFBTyxHQUFHLEVBQUUsR0FBRzs7Ozs7Z0JBQ3hDLENBQUMsR0FBSSxHQUFHLEVBQVAsQ0FBTztnQkFDVCxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztnQkFFTSxxQkFBTSxnQkFBSyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUE7O2dCQUE1RCxLQUFzQixTQUFzQyxFQUEzRCxLQUFLLFFBQUEsRUFBRSxVQUFVLFFBQUE7Z0JBRXhCLElBQUksS0FBSyxLQUFLLGVBQUksQ0FBQyxTQUFTLEVBQUU7b0JBQzFCLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO3lCQUNiLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQzt5QkFDbkMsSUFBSSxFQUFFLENBQUE7b0JBQ1gsc0JBQVE7aUJBQ1g7Z0JBRUQsSUFBSSxLQUFLLEtBQUssZUFBSSxDQUFDLFNBQVMsRUFBRTtvQkFDMUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUU7eUJBQ1IsT0FBTyxDQUFDLHVCQUF1QixDQUFDO3lCQUNoQyxJQUFJLENBQUMsVUFBVSxDQUFDO3lCQUNoQixJQUFJLEVBQUUsQ0FBQTtvQkFDWCxzQkFBUTtpQkFDWDtnQkFFRCxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtxQkFDWCxPQUFPLENBQUMsdUJBQXVCLENBQUM7cUJBQ2hDLElBQUksRUFBRSxDQUFBOzs7O0tBQ2QsQ0FBQTtBQUVZLFFBQUEsY0FBYyxHQUFZLFVBQU8sR0FBRyxFQUFFLEdBQUc7Ozs7O2dCQUMzQyxDQUFDLEdBQUksR0FBRyxFQUFQLENBQVE7Z0JBQ1YsVUFBVSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO2dCQUNuQyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQTtnQkFFUCxxQkFBTSxnQkFBSyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxFQUFBOztnQkFBN0QsS0FBSyxHQUFHLFNBQXFEO2dCQUVuRSxJQUFJLEtBQUssS0FBSyxlQUFJLENBQUMsU0FBUyxFQUFFO29CQUMxQixDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRTt5QkFDUixPQUFPLENBQUMsU0FBUyxDQUFDO3lCQUNsQixJQUFJLEVBQUUsQ0FBQTtvQkFDWCxzQkFBUTtpQkFDWDtnQkFFRCxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtxQkFDWCxPQUFPLENBQUMsdUJBQXVCLENBQUM7cUJBQ2hDLElBQUksRUFBRSxDQUFBOzs7O0tBQ2QsQ0FBQTtBQUVZLFFBQUEsV0FBVyxHQUFZLFVBQU8sR0FBRyxFQUFFLEdBQUc7Ozs7O2dCQUN4QyxDQUFDLEdBQUksR0FBRyxFQUFQLENBQVE7Z0JBQ1YsS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7Z0JBRUcscUJBQU0sZ0JBQUssQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFBOztnQkFBNUQsS0FBcUIsU0FBdUMsRUFBM0QsS0FBSyxRQUFBLEVBQUUsU0FBUyxRQUFBO2dCQUV2QixJQUFJLEtBQUssS0FBSyxlQUFJLENBQUMsU0FBUyxFQUFFO29CQUMxQixDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRTt5QkFDUixPQUFPLENBQUMsU0FBUyxDQUFDO3lCQUNsQixJQUFJLENBQUMsU0FBUyxDQUFDO3lCQUNmLElBQUksRUFBRSxDQUFBO29CQUNYLHNCQUFNO2lCQUNUO2dCQUVELENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO3FCQUNYLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQztxQkFDaEMsSUFBSSxFQUFFLENBQUE7Ozs7S0FDZCxDQUFBIn0=