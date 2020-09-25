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
exports.EWBuilder = exports.ErrorHandlerWrapper = void 0;
var errors_1 = require("../errors");
/**
 * Error Handling Wrapper
 */
var ErrorHandlerWrapper = /** @class */ (function () {
    function ErrorHandlerWrapper(executor, eHandlers) {
        if (eHandlers === void 0) { eHandlers = []; }
        this.executor = executor;
        this.eHandlers = eHandlers;
    }
    // bind(...ehs: ErrorHandler[]) {
    //     ehs.forEach((eh) => this.eHandlers.push(eh));
    // }
    ErrorHandlerWrapper.resolveUndefined = function (args) {
        for (var i = 0; i < args.length; i++) {
            if (args[i] === undefined)
                args[i] = null;
        }
    };
    ErrorHandlerWrapper.prototype.run = function (query, args) {
        if (args === void 0) { args = []; }
        return __awaiter(this, void 0, void 0, function () {
            var results, e_1, i, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        ErrorHandlerWrapper.resolveUndefined(args); // change undefined values as null
                        return [4 /*yield*/, this.executor.execute(query, args)];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, [errors_1.ModelErrorSet.NO_ERRORS, results]];
                    case 2:
                        e_1 = _a.sent();
                        for (i = 0; i < this.eHandlers.length; i++) {
                            error = this.eHandlers[i](e_1);
                            if (!(error === errors_1.ModelErrorSet.NO_ERRORS)) {
                                return [2 /*return*/, [error, undefined]];
                            }
                        }
                        return [2 /*return*/, [errors_1.ModelErrorSet.UNKNOWN, undefined]];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ErrorHandlerWrapper;
}());
exports.ErrorHandlerWrapper = ErrorHandlerWrapper;
/**
 * Builder for Error Handler Wrapper
 * @param executor : sql executor
 * @param handlers : array of error handlers
 */
function EWBuilder(executor, handlers) {
    if (handlers === void 0) { handlers = []; }
    return new ErrorHandlerWrapper(executor, handlers);
}
exports.EWBuilder = EWBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZVdyYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZGF0YWJhc2UvY29yZS9lV3JhcHBlci9lV3JhcHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQ0FBc0Q7QUFldEQ7O0dBRUc7QUFDSDtJQUlJLDZCQUFZLFFBQXFCLEVBQUUsU0FBOEI7UUFBOUIsMEJBQUEsRUFBQSxjQUE4QjtRQUM3RCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUMvQixDQUFDO0lBRUQsaUNBQWlDO0lBQ2pDLG9EQUFvRDtJQUNwRCxJQUFJO0lBRVcsb0NBQWdCLEdBQS9CLFVBQWdDLElBQWdCO1FBQzVDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2hDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVM7Z0JBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQTtTQUM1QztJQUNMLENBQUM7SUFFSyxpQ0FBRyxHQUFULFVBQVUsS0FBYSxFQUFFLElBQXFCO1FBQXJCLHFCQUFBLEVBQUEsU0FBcUI7Ozs7Ozs7d0JBRXRDLG1CQUFtQixDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsa0NBQWtDO3dCQUM3RCxxQkFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUE7O3dCQUFuRCxPQUFPLEdBQUksU0FBd0M7d0JBQ3pELHNCQUFPLENBQUMsc0JBQWEsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLEVBQUM7Ozt3QkFFMUMsS0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTs0QkFDeEMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUM7NEJBQ2pDLElBQUksQ0FBQyxDQUFDLEtBQUssS0FBSyxzQkFBYSxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dDQUN0QyxzQkFBTyxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsRUFBQTs2QkFDNUI7eUJBQ0o7d0JBQ0Qsc0JBQU8sQ0FBQyxzQkFBYSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsRUFBQzs7Ozs7S0FFakQ7SUFDTCwwQkFBQztBQUFELENBQUMsQUFsQ0QsSUFrQ0M7QUFsQ1ksa0RBQW1CO0FBb0NoQzs7OztHQUlHO0FBQ0gsU0FBZ0IsU0FBUyxDQUFDLFFBQXFCLEVBQUUsUUFBNkI7SUFBN0IseUJBQUEsRUFBQSxhQUE2QjtJQUMxRSxPQUFPLElBQUksbUJBQW1CLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3ZELENBQUM7QUFGRCw4QkFFQyJ9