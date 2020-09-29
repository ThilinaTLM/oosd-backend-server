import { AuthMW } from "./mw";
import { USER_ROLES } from "../../core/dicts/user-roles";
import { Rule } from "./rule";
import { Handler } from "express";

type Role = (keyof typeof USER_ROLES)

class UserRule_SubBuilder {
    private static notAllowRules = {
        ADMIN: new Rule('role', USER_ROLES.ADMIN, { algo: "NEQ" }),
        DIS_SEC: new Rule('role', USER_ROLES.DIS_SEC, { algo: "NEQ" }),
        DIS_OCR: new Rule('role', USER_ROLES.DIS_OCR, { algo: "NEQ" }),
        DIV_SEC: new Rule('role', USER_ROLES.DIV_SEC, { algo: "NEQ" }),
        DIV_OCR: new Rule('role', USER_ROLES.DIV_OCR, { algo: "NEQ" }),
    }

    private static allowRules = {
        ADMIN: new Rule('role', USER_ROLES.ADMIN, ),
        DIS_SEC: new Rule('role', USER_ROLES.DIS_SEC, ),
        DIS_OCR: new Rule('role', USER_ROLES.DIS_OCR, ),
        DIV_SEC: new Rule('role', USER_ROLES.DIV_SEC, ),
        DIV_OCR: new Rule('role', USER_ROLES.DIV_OCR, ),
    }

    private readonly selectedRoles: Role[];
    private readonly parent: AuthBuilder

    constructor(parent: AuthBuilder) {
        this.selectedRoles = [];
        this.parent = parent
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
    ADMIN(): AuthBuilder  {
        this.selectedRoles.push('ADMIN');
        return this.parent;
    }

    DIS_SEC(): AuthBuilder {
        this.selectedRoles.push('DIS_SEC');
        return this.parent;
    }

    DIS_OCR(): AuthBuilder {
        this.selectedRoles.push('DIS_OCR');
        return this.parent;
    }

    DIV_SEC(): AuthBuilder {
        this.selectedRoles.push('DIV_SEC');
        return this.parent;
    }

    DIV_OCR(): AuthBuilder {
        this.selectedRoles.push('DIV_OCR');
        return this.parent;
    }

    build(): Rule[] {

        // if no user filtering
        if (this.selectedRoles.length === 0) {
            return [];
        }

        // if only allow single role
        if (this.selectedRoles.length === 1) {
            return [UserRule_SubBuilder.allowRules[this.selectedRoles[0]]];
        }

        // if multiple roles are allowed
        const rules: Rule[] = []
        for (let role in UserRule_SubBuilder.notAllowRules) {
            if (!this.selectedRoles.includes(role as Role)) {
                rules.push(UserRule_SubBuilder.notAllowRules[role as Role])
            }
        }
        return rules;
    }
}

export class AuthBuilder {
    readonly allow: UserRule_SubBuilder
    private responseTokenError: boolean

    constructor() {
        this.allow = new UserRule_SubBuilder(this)
        this.responseTokenError = true
    }

    disableToken() {
        this.responseTokenError = false
    }


    build(): Handler {
        const authMW = new AuthMW(
            ...this.allow.build()
        )
        authMW.strictToken = this.responseTokenError;

        return authMW.middleware as Handler;
    }
}


new AuthBuilder().allow.ADMIN().build()