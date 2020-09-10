import { Handler } from "../../core";
import { build } from "../core/users";
import { MErr, model } from "../../database";


export const addUser: Handler = async (req, res) => {
    const { r } = res;
    const new_user = build.DataUser(req.body, true);

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