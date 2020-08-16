import { Request, Response } from "express";
import { RouteEntry } from ".";

export const config: RouteEntry[] = [
    {
        method: "GET",
        path: "/",
        handler: index
    }
];

// response home url
function index(req: Request, res: Response) {
    res.send("Hello World!");
}
