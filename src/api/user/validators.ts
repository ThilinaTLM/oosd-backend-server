import { Request, Response, NextFunction } from "express";

export function vSignIn(req: Request, res: Response, next: NextFunction) {
    const username = req.body.username || "";
    const password = req.body.password || "";

    if (!username || username === "") {
        return res.status(400).json({
            error: "BAD_USERNAME",
            msg: "Username is not defined."
        });
    }

    if (!password || password === "") {
        return res.status(400).json({
            error: "BAD_PASSWORD",
            msg: "Password is not defined."
        });
    }

    next();
}
