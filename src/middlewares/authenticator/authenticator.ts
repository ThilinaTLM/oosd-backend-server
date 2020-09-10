import { Handler, jwtMan, Request } from "../../core";

type RuleArgs = Request
type Rule = (data: RuleArgs) => boolean

class Authenticator {
    private readonly rules: Rule[];
    private readonly needToken: boolean;

    constructor(...rules: Rule[]) {
        this.rules = rules;
        this.needToken = true;
    }

    readToken = (req: Request) => {
        const token = req.headers.authorization?.split(" ")[1];
        if (token === undefined) {
            return null;
        }
        const payload = jwtMan.verifyToken(token);
        if (payload === null) {
            return null;
        }
        return payload;
    };

    checkRules = (data: any): boolean => {
        for (let i = 0; i < this.rules.length; i++) {
            const rule = this.rules[i];
            if (!rule(data)) { // if one failed
                return false;
            }
        }
        return true;
    };


    middleware: Handler = (req, res, next) => {
        const { r } = res;
        const { params, query, body } = req;
        const payload = this.readToken(req);

        if (this.needToken && payload === null) {
            r.status.BAD_REQ()
                .message("Invalid token");
            return;
        }

        // if user role is not allowed
        if (!this.checkRules({ payload, body, params, query })) {
            r.status.UN_AUTH()
                .message("You are unauthorized!")
                .send();
            return;
        }

        // bind user data with request
        req.user = payload;
        next();
    };
}
