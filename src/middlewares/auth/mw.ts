import { IncomingHttpHeaders } from "http";
import { Handler, jwtMan } from "../../core";
import { Origins, Rule } from "./rule";

export class AuthMW {
    private readonly rules: Rule[];
    strictToken: boolean

    constructor(...rules: Rule[]) {
        this.rules = rules;
        this.strictToken = true;
    }

    /**
     * Validate Token and garb payload
     * @param headers: request headers
     */
    static readToken = (headers: IncomingHttpHeaders) => {
        const token = headers.authorization?.split(" ")[1];

        if (token === undefined) { // if token is  not in headers
            return null;
        }
        const payload = jwtMan.verifyToken(token);
        if (payload === null) { // if token validation failed
            return null;
        }
        return payload;
    };

    /**
     * Check whether all rules passed
     * @param user : token payload (user data)
     * @param origins : req.body, params, and query
     */
    checkRules = (user: any, origins: Origins): boolean => {
        for (let i = 0; i < this.rules.length; i++) {
            const rule = this.rules[i];
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
    middleware: Handler = (req, res, next) => {
        const { r } = res;
        const { params, query, body } = req;

        // read the token and bind payload with request
        const payload = AuthMW.readToken(req.headers);
        req.user = payload


        if (this.strictToken && payload === null) {
            r.status.BAD_REQ()
                .message("Invalid token")
                .send();
            return;
        }

        const ruleCheckerOrigins: Origins = {
            body: req.body,
            params: req.params,
            query: req.query
        }

        // if user role is not allowed
        if (!this.checkRules(payload, ruleCheckerOrigins)) {
            r.status.UN_AUTH()
                .message("You are unauthorized!")
                .send();
            return;
        }

        // passed next
        next();
    };
}
