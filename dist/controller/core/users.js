"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = void 0;
var bcrypt_1 = require("bcrypt");
var uuid_1 = require("uuid");
var SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;
/**
 * Convert around User Types
 */
exports.build = {
    AuthUser: function (du) {
        return __assign(__assign({}, du), { matchPassword: function (password) {
                try {
                    return bcrypt_1.compareSync(password, this.hash);
                }
                catch (e) {
                    return false;
                }
            },
            isVerified: function () {
                return this.verified;
            } });
    },
    CleanUser: function (u) {
        var clone = __assign({}, u);
        delete clone.username;
        delete clone.hash;
        delete clone.verified;
        if ("matchPassword" in clone) {
            delete clone.matchPassword;
        }
        return clone;
    },
    DataUser: function (nu, verified) {
        if (verified === void 0) { verified = false; }
        var clone = __assign(__assign({}, nu), { userId: uuid_1.v4(), hash: bcrypt_1.hashSync(nu.password, SALT_ROUNDS), verified: verified });
        delete clone.password;
        return clone;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udHJvbGxlci9jb3JlL3VzZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQStDO0FBQy9DLDZCQUEwQjtBQTZCMUIsSUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFBO0FBRXpEOztHQUVHO0FBQ1UsUUFBQSxLQUFLLEdBQUc7SUFDakIsUUFBUSxFQUFSLFVBQVMsRUFBa0I7UUFDdkIsNkJBQ08sRUFBRSxLQUNMLGFBQWEsRUFBYixVQUFjLFFBQWdCO2dCQUMxQixJQUFJO29CQUNBLE9BQU8sb0JBQVcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUMzQztnQkFBQyxPQUFPLENBQUMsRUFBRTtvQkFDUixPQUFPLEtBQUssQ0FBQTtpQkFDZjtZQUNMLENBQUM7WUFDRCxVQUFVLEVBQVY7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFBO1lBQ3hCLENBQUMsSUFDSjtJQUNMLENBQUM7SUFFRCxTQUFTLEVBQVQsVUFBVSxDQUE0QjtRQUNsQyxJQUFNLEtBQUssZ0JBQU8sQ0FBQyxDQUFDLENBQUM7UUFDckIsT0FBTyxLQUFLLENBQUMsUUFBUSxDQUFDO1FBQ3RCLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQztRQUNsQixPQUFPLEtBQUssQ0FBQyxRQUFRLENBQUM7UUFDdEIsSUFBSSxlQUFlLElBQUksS0FBSyxFQUFFO1lBQzFCLE9BQU8sS0FBSyxDQUFDLGFBQWEsQ0FBQztTQUM5QjtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxRQUFRLEVBQVIsVUFBUyxFQUFXLEVBQUUsUUFBZ0I7UUFBaEIseUJBQUEsRUFBQSxnQkFBZ0I7UUFDbEMsSUFBTSxLQUFLLHlCQUNKLEVBQUUsS0FDTCxNQUFNLEVBQUUsU0FBRSxFQUFFLEVBQ1osSUFBSSxFQUFFLGlCQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsRUFDeEMsUUFBUSxFQUFFLFFBQVEsR0FFckIsQ0FBQztRQUNGLE9BQU8sS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUN0QixPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0NBQ0osQ0FBQSJ9