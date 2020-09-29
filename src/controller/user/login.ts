import { MErr, model } from "../../database";
import { jwtMan, RBuilder, Handler } from "../../core";
import { build } from "../core/users";

export const userLogin: Handler = async (req, res) => {
    const r = new RBuilder(res);

    const { username, password } = req.body;

    const [error, data] = await model.user.getUserAccount(username);

    // If no user exists
    if (error === MErr.NO_ENTRY_FOUND || error === MErr.WRONG_ARGUMENTS) {
        r.status.NOT_FOUND()
            .message("Incorrect username or password")
            .send();
        return;
    }

    if (error === MErr.NO_ERRORS) {
        const aUser = build.AuthUser(data);

        // If password is not matched
        if (!aUser.matchPassword(password)) {
            r.status.BAD_REQ()
                .message("Incorrect username or password")
                .send();
            return;
        }

        // If user is not verified
        if (!aUser.isVerified()) {
            r.status.UN_AUTH()
                .message("Account is not verified")
                .send();
            return;
        }

        r.status.OK()
            .message("Successfully login to the system")
            .data(build.CleanUser(data))
            .token(jwtMan.signToken(data))
            .send();
        return;
    }

    // If something else happened
    r.status.ERROR()
        .message("Internal Server Error")
        .send();
};