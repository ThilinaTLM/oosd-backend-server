import { Handler } from "../core";
import { USER_ROLES } from "../core/dicts/user-roles";
import { jwtMan, RBuilder } from "../core";

/**
 * Role is a union type derived from keys of USER_ROLES
 */
type Role = keyof typeof USER_ROLES

/**
 * This interface should be implemented
 *         to be able to check authentications
 */
interface HasRole {
    role: string
}

/**
 * Authenticator
 */
class Authenticator {
    private accepts: string[];

    constructor(accRoles: Role[] = []) {
        this.accepts = [];
        accRoles.forEach((r) => {
            this.addRole(r);
        });
    }

    addRole(r: Role) {
        const role = USER_ROLES[r];
        if (role === undefined) return;
        this.accepts.push(role);
    }

    /**
     * Base Logic for test authentication from a token
     * @param user
     */
    private isAuth = (user: HasRole): boolean => {
        return this.accepts.includes(user.role);
    };

    /**
     * Express middleware can be used to filter unauthorized users
     */
    middleware: Handler = (req, res, next) => {
        const r = new RBuilder(res);

        // If token is not provided
        const token = req.headers.authorization?.split(" ")[1];
        if (token === undefined) {
            r.status.BAD_REQ()
                .message("Can't Authenticate, Invalid Token!")
                .send();
            return;
        }

        // if token is not valid
        const payload = jwtMan.verifyToken(token);
        if (payload === null) {
            r.status.UN_AUTH()
                .message("Can't Authenticate, Invalid Token!")
                .send();
            return;
        }

        // if user role is not allowed
        if (!this.isAuth(payload)) {
            r.status.UN_AUTH()
                .message("You are not allowed to access!")
                .send();
            return;
        }

        // bind user data to request
        req.user = payload;
        next();
    };
}

/**
 * Authenticate Middleware Builder
 */
export class AuthenticatorBuilder {
    private auth: Authenticator;

    constructor() {
        this.auth = new Authenticator();
    }

    ADMIN = () => this.addRole("ADMIN");
    DIS_OCR = () => this.addRole("DIS_OCR");
    DIS_SEC = () => this.addRole("DIS_SEC");
    DIV_OCR = () => this.addRole("DIV_OCR");
    DIV_SEC = () => this.addRole("DIV_SEC");

    build(): Handler {
        return this.auth.middleware;
    }

    private addRole(r: Role) {
        this.auth.addRole(r);
        return this;
    }
}