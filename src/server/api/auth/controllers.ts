import { Response, Request } from "express";
import { authManager, AM_Errors } from "../../../managers/authentications/auth-manager";
import { StatusCode } from "../../utill/status-codes";

// verify password responses
export async function userLogin(req: Request, res: Response) {
    let { username, password } = req.body;
    const [error, userID] = await authManager.verifyProfile(username, password);

    if (AM_Errors.INCORRECT_PASSWORD) {
        res.status(StatusCode.CLIENT_ERRORS.UNAUTHORIZED).json({ error });
    }
    else if (AM_Errors.USERNAME_NOT_EXISTS) {
        res.status(StatusCode.CLIENT_ERRORS.NOT_FOUND).json({ error });
    } else {
        res.status(StatusCode.SUCCESS.OK).json({
            userID
        });
    }
}