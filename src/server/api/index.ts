import {Response, Request} from 'express'

// authentication responses
export function userLogin(req: Request, res: Response) {
    console.log(req.body);
    res.send("Got!");
}