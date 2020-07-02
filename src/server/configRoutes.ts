import { NextFunction, RequestHandler } from "express";
import { index } from "./handlers";

export interface ConfigRouteEntry {
    method: "GET" | "POST" | "PUT" | "DELETE";
    path: string;
    handler: RequestHandler | NextFunction;
}

export const config: ConfigRouteEntry[] = [
    {
        method: "GET",
        path: "/",
        handler: index
    }
];
