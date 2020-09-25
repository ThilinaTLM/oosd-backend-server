"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RBuilder = exports.jwtMan = exports.ComStates = exports.ComTypes = exports.URoles = void 0;
var token_man_1 = require("./token-man/token-man");
var res_builder_1 = require("./res-builder");
var user_roles_1 = require("./dicts/user-roles");
var com_types_1 = require("./dicts/com-types");
var com_states_1 = require("./dicts/com-states");
/**
 * Dictionaries
 */
exports.URoles = user_roles_1.USER_ROLES;
exports.ComTypes = com_types_1.COMPLAINT_TYPES;
exports.ComStates = com_states_1.COMPLAINT_STATES;
/**
 * Json Web Token Manager
 */
exports.jwtMan = new token_man_1.TokenManager("24h", 10);
exports.jwtMan.startCleaningJob();
/**
 * Response Builder for well-formatted api response
 */
exports.RBuilder = res_builder_1.ResponseBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29yZS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxtREFBcUQ7QUFDckQsNkNBQWdEO0FBQ2hELGlEQUFnRDtBQUNoRCwrQ0FBb0Q7QUFDcEQsaURBQXNEO0FBVXREOztHQUVHO0FBQ1UsUUFBQSxNQUFNLEdBQUcsdUJBQVUsQ0FBQztBQUNwQixRQUFBLFFBQVEsR0FBRywyQkFBZSxDQUFDO0FBQzNCLFFBQUEsU0FBUyxHQUFHLDZCQUFnQixDQUFDO0FBRTFDOztHQUVHO0FBQ1UsUUFBQSxNQUFNLEdBQUcsSUFBSSx3QkFBWSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNsRCxjQUFNLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztBQUUxQjs7R0FFRztBQUNVLFFBQUEsUUFBUSxHQUFHLDZCQUFlLENBQUMifQ==