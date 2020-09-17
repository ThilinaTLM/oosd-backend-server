import { MErr, model } from "../../database";
import {  Handler } from "../../core";
import {addUser as au} from "./add";
import {userLogin as ul} from "./login";

export const addUser = au;
export const loginUser = ul;

export const getUser: Handler = async (req, res) => {
    const {r} = res;
    const query = req.query;

    const [error, users] = await model.user.getUser(query);

    if (error === MErr.NO_ERRORS) {
        r.status.OK()
            .data(users)
            .message('Success')
            .send()
        return ;
    }

    r.status.ERROR()
        .message('Internal Server Error')
        .send()
}

export const isUsernameExist: Handler = async (req, res) => {
    const {r} = res;
    const username = req.params.username

    const [error, isExist] = await model.user.checkUsername(username);

    if (error === MErr.NO_ERRORS) {
        r.status.OK()
            .data(isExist)
            .message('Success')
            .send()
        return
    }

    r.status.ERROR()
        .message('Internal Server Error')
        .send()
}

export const updateUserData: Handler = async (req, res) => {
    const {r} = res;
    const userId = req.params.userId;
    const data = req.body

    const error = await model.user.updateUserDetails(userId, data)

    if (error === MErr.NO_ERRORS) {
        r.status.OK()
            .message('Success')
            .send()
        return
    }

    r.send_ISE()
}

export const updateCredential: Handler = async  (req, res) => {
    const {r} = res;
    const userId = req.params.userId;
    const data = req.body

    const error = await model.user.updateCredentials(userId, data)

    if (error === MErr.NO_ERRORS) {
        r.status.OK()
            .message('Success')
            .send()
        return
    }

    r.send_ISE()
}

export const verifyUser: Handler = async (req, res) => {
    req.body = {verified: true}
    await updateCredential(req, res, ()=>{})
}

export const disableUser: Handler = async (req, res) => {
    req.body = {verified: false}
    await updateCredential(req, res, ()=>{})
}