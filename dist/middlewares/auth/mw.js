"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMW = void 0;
var core_1 = require("../../core");
var AuthMW = /** @class */ (function () {
    function AuthMW() {
        var _this = this;
        var rules = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rules[_i] = arguments[_i];
        }
        /**
         * Check whether all rules passed
         * @param user : token payload (user data)
         * @param origins : req.body, params, and query
         */
        this.checkRules = function (user, origins) {
            for (var i = 0; i < _this.rules.length; i++) {
                var rule = _this.rules[i];
                if (!rule.check(user, origins)) { // if one failed
                    return false;
                }
            }
            return true;
        };
        /**
         * Actual Middleware to use with ExpressJs
         * @param req
         * @param res
         * @param next
         */
        this.middleware = function (req, res, next) {
            var r = res.r;
            var params = req.params, query = req.query, body = req.body;
            // read the token and bind payload with request
            var payload = AuthMW.readToken(req.headers);
            req.user = payload;
            if (_this.strictToken && payload === null) {
                r.status.BAD_REQ()
                    .message("Invalid token")
                    .send();
                return;
            }
            var ruleCheckerOrigins = {
                body: req.body,
                params: req.params,
                query: req.query
            };
            // if user role is not allowed
            if (!_this.checkRules(payload, ruleCheckerOrigins)) {
                r.status.UN_AUTH()
                    .message("You are unauthorized!")
                    .send();
                return;
            }
            // passed next
            next();
        };
        this.rules = rules;
        this.strictToken = true;
    }
    /**
     * Validate Token and garb payload
     * @param headers: request headers
     */
    AuthMW.readToken = function (headers) {
        var _a;
        var token = (_a = headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (token === undefined) { // if token is  not in headers
            return null;
        }
        var payload = core_1.jwtMan.verifyToken(token);
        if (payload === null) { // if token validation failed
            return null;
        }
        return payload;
    };
    return AuthMW;
}());
exports.AuthMW = AuthMW;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbWlkZGxld2FyZXMvYXV0aC9tdy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxtQ0FBNkM7QUFHN0M7SUFJSTtRQUFBLGlCQUdDO1FBSFcsZUFBZ0I7YUFBaEIsVUFBZ0IsRUFBaEIscUJBQWdCLEVBQWhCLElBQWdCO1lBQWhCLDBCQUFnQjs7UUFzQjVCOzs7O1dBSUc7UUFDSCxlQUFVLEdBQUcsVUFBQyxJQUFTLEVBQUUsT0FBZ0I7WUFDckMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN4QyxJQUFNLElBQUksR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxnQkFBZ0I7b0JBQzlDLE9BQU8sS0FBSyxDQUFDO2lCQUNoQjthQUNKO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQyxDQUFDO1FBRUY7Ozs7O1dBS0c7UUFDSCxlQUFVLEdBQVksVUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUk7WUFDekIsSUFBQSxDQUFDLEdBQUssR0FBRyxFQUFSLENBQVM7WUFDVixJQUFBLE1BQU0sR0FBa0IsR0FBRyxPQUFyQixFQUFFLEtBQUssR0FBVyxHQUFHLE1BQWQsRUFBRSxJQUFJLEdBQUssR0FBRyxLQUFSLENBQVM7WUFFcEMsK0NBQStDO1lBQy9DLElBQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzlDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFBO1lBR2xCLElBQUksS0FBSSxDQUFDLFdBQVcsSUFBSSxPQUFPLEtBQUssSUFBSSxFQUFFO2dCQUN0QyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtxQkFDYixPQUFPLENBQUMsZUFBZSxDQUFDO3FCQUN4QixJQUFJLEVBQUUsQ0FBQztnQkFDWixPQUFPO2FBQ1Y7WUFFRCxJQUFNLGtCQUFrQixHQUFZO2dCQUNoQyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUk7Z0JBQ2QsTUFBTSxFQUFFLEdBQUcsQ0FBQyxNQUFNO2dCQUNsQixLQUFLLEVBQUUsR0FBRyxDQUFDLEtBQUs7YUFDbkIsQ0FBQTtZQUVELDhCQUE4QjtZQUM5QixJQUFJLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsa0JBQWtCLENBQUMsRUFBRTtnQkFDL0MsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7cUJBQ2IsT0FBTyxDQUFDLHVCQUF1QixDQUFDO3FCQUNoQyxJQUFJLEVBQUUsQ0FBQztnQkFDWixPQUFPO2FBQ1Y7WUFFRCxjQUFjO1lBQ2QsSUFBSSxFQUFFLENBQUM7UUFDWCxDQUFDLENBQUM7UUExRUUsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7SUFDNUIsQ0FBQztJQUVEOzs7T0FHRztJQUNJLGdCQUFTLEdBQUcsVUFBQyxPQUE0Qjs7UUFDNUMsSUFBTSxLQUFLLFNBQUcsT0FBTyxDQUFDLGFBQWEsMENBQUUsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVuRCxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUUsRUFBRSw4QkFBOEI7WUFDckQsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELElBQU0sT0FBTyxHQUFHLGFBQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUMsSUFBSSxPQUFPLEtBQUssSUFBSSxFQUFFLEVBQUUsNkJBQTZCO1lBQ2pELE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDLENBQUM7SUF3RE4sYUFBQztDQUFBLEFBaEZELElBZ0ZDO0FBaEZZLHdCQUFNIn0=