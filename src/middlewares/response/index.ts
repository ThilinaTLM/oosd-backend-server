import { RBuilder, Handler } from "../../core";

export const bindRBuilder: Handler = (req, res, next) => {
    res.r = new RBuilder(res);
    next();
};