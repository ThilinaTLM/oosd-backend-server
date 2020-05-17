import { Router, Request, Response } from "express";
import rUser from "./user";

const rApi = Router();
rApi.use("/user", rUser);
rApi.get("/", index);

function index(req: Request, res: Response) {
    res.send("API SERVICES");
}

export default rApi;
