import { Handler } from "../../core";
import { build } from "../core/users";
import { MErr, model } from "../../database";
import { URoles } from "../../core/";


export const addUser: Handler = async (req, res) => {
    const { r } = res;
    let verified = false
    if (req.user !== null && req.user.role === URoles.ADMIN) {
        verified = true
    }

    const new_user = build.DataUser(req.body, verified);

    const [error, userId] = await model.user.addUser(new_user);

    if (error === MErr.NO_ERRORS) {
        r.status.OK()
            .data({ userId })
            .message("Account is added")
            .send();
        return;
    }

    if (error === MErr.DUPLICATE) {
        r.status.BAD_REQ()
            .message("An User already exists with given username")
            .send()
        return ;
    }

    r.status.ERROR()
        .message("Internal Server Error")
        .send();
};