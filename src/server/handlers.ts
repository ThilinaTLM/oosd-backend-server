import { Request, Response } from "express";

/**
 * request handler for root
 * @param req
 * @param res
 */
export function index(req: Request, res: Response) {
    res.send("Hello World!");
}
