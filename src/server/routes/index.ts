import { NextFunction, RequestHandler } from "express";

export interface RouteEntry {
    method: "GET" | "POST" | "PUT" | "DELETE";
    path: string;
    handler: RequestHandler | NextFunction;
}