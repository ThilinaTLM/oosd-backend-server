"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthBuilder = void 0;
var mw_1 = require("./mw");
var user_roles_1 = require("../../core/dicts/user-roles");
var rule_1 = require("./rule");
var UserRule_SubBuilder = /** @class */ (function () {
    function UserRule_SubBuilder(parent) {
        this.selectedRoles = [];
        this.parent = parent;
    }
    // private removeFromSelected(role: string) {
    //     for (let i = 0; i < this.selectedRules.length; i++) {
    //         if (role === this.selectedRules[i]) {
    //             this.selectedRules.splice(i, 1);
    //             return true;
    //         }
    //     }
    //     return false;
    // }
    /**
     * Allow each user role to pass authentication checking
     */
    UserRule_SubBuilder.prototype.ADMIN = function () {
        this.selectedRoles.push('ADMIN');
        return this.parent;
    };
    UserRule_SubBuilder.prototype.DIS_SEC = function () {
        this.selectedRoles.push('DIS_SEC');
        return this.parent;
    };
    UserRule_SubBuilder.prototype.DIS_OCR = function () {
        this.selectedRoles.push('DIS_OCR');
        return this.parent;
    };
    UserRule_SubBuilder.prototype.DIV_SEC = function () {
        this.selectedRoles.push('DIV_SEC');
        return this.parent;
    };
    UserRule_SubBuilder.prototype.DIV_OCR = function () {
        this.selectedRoles.push('DIV_OCR');
        return this.parent;
    };
    UserRule_SubBuilder.prototype.build = function () {
        // if no user filtering
        if (this.selectedRoles.length === 0) {
            return [];
        }
        // if only allow single role
        if (this.selectedRoles.length === 1) {
            return [UserRule_SubBuilder.allowRules[this.selectedRoles[0]]];
        }
        // if multiple roles are allowed
        var rules = [];
        for (var role in UserRule_SubBuilder.notAllowRules) {
            if (!this.selectedRoles.includes(role)) {
                rules.push(UserRule_SubBuilder.notAllowRules[role]);
            }
        }
        return rules;
    };
    UserRule_SubBuilder.notAllowRules = {
        ADMIN: new rule_1.Rule('role', user_roles_1.USER_ROLES.ADMIN, { algo: "NEQ" }),
        DIS_SEC: new rule_1.Rule('role', user_roles_1.USER_ROLES.DIS_SEC, { algo: "NEQ" }),
        DIS_OCR: new rule_1.Rule('role', user_roles_1.USER_ROLES.DIS_OCR, { algo: "NEQ" }),
        DIV_SEC: new rule_1.Rule('role', user_roles_1.USER_ROLES.DIV_SEC, { algo: "NEQ" }),
        DIV_OCR: new rule_1.Rule('role', user_roles_1.USER_ROLES.DIV_OCR, { algo: "NEQ" }),
    };
    UserRule_SubBuilder.allowRules = {
        ADMIN: new rule_1.Rule('role', user_roles_1.USER_ROLES.ADMIN),
        DIS_SEC: new rule_1.Rule('role', user_roles_1.USER_ROLES.DIS_SEC),
        DIS_OCR: new rule_1.Rule('role', user_roles_1.USER_ROLES.DIS_OCR),
        DIV_SEC: new rule_1.Rule('role', user_roles_1.USER_ROLES.DIV_SEC),
        DIV_OCR: new rule_1.Rule('role', user_roles_1.USER_ROLES.DIV_OCR),
    };
    return UserRule_SubBuilder;
}());
var AuthBuilder = /** @class */ (function () {
    function AuthBuilder() {
        this.allow = new UserRule_SubBuilder(this);
        this.responseTokenError = true;
    }
    AuthBuilder.prototype.disableToken = function () {
        this.responseTokenError = false;
    };
    AuthBuilder.prototype.build = function () {
        var authMW = new (mw_1.AuthMW.bind.apply(mw_1.AuthMW, __spreadArrays([void 0], this.allow.build())))();
        authMW.strictToken = this.responseTokenError;
        return authMW.middleware;
    };
    return AuthBuilder;
}());
exports.AuthBuilder = AuthBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbWlkZGxld2FyZXMvYXV0aC9idWlsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsMkJBQThCO0FBQzlCLDBEQUF5RDtBQUN6RCwrQkFBOEI7QUFLOUI7SUFvQkksNkJBQVksTUFBbUI7UUFDM0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7SUFDeEIsQ0FBQztJQUVELDZDQUE2QztJQUM3Qyw0REFBNEQ7SUFDNUQsZ0RBQWdEO0lBQ2hELCtDQUErQztJQUMvQywyQkFBMkI7SUFDM0IsWUFBWTtJQUNaLFFBQVE7SUFDUixvQkFBb0I7SUFDcEIsSUFBSTtJQUVKOztPQUVHO0lBQ0gsbUNBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUQscUNBQU8sR0FBUDtRQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ25DLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUQscUNBQU8sR0FBUDtRQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ25DLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUQscUNBQU8sR0FBUDtRQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ25DLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUQscUNBQU8sR0FBUDtRQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ25D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