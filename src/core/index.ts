import { NextFunction as ExpNextFunction, Response as ExpResponse } from "express";
import { Request as CusRequest, Response as CusResponse } from "./i-express/custom";
import { TokenManager } from "./token-man/token-man";
import { ResponseBuilder } from "./res-builder";
import { USER_ROLES } from "./dicts/user-roles";
import { COMPLAINT_TYPES } from "./dicts/com-types";
import { COMPLAINT_STATES } from "./dicts/com-states";

import { EmailSender } from "./notifier/sender";
import { notifyComplainerAccept, notifyComplainerRejected, notifyComplainerResolved } from "./notifier/message"

/**
 * Custom Types for Express Framework
 */
export type Request = CusRequest
export type Response = CusResponse
export type NextFunction = ExpNextFunction
export type Handler = (req: Request, res: Response, next: NextFunction) => void

/**
 * Dictionaries
 */
export const URoles = USER_ROLES;
export const ComTypes = COMPLAINT_TYPES;
export const ComStates = COMPLAINT_STATES;

/**
 * Json Web Token Manager
 */
export const jwtMan = new TokenManager("24h", 10);
jwtMan.startCleaningJob();

/**
 * Response Builder for well-formatted api response
 */
export const RBuilder = ResponseBuilder;

/**
 * Email Sender
 */
export const emailSender = new EmailSender('gallecms@gmail.com', "CMS@galle123");

export class EmailBuilder {
    static complaintAccept = notifyComplainerAccept
    static complaintReject = notifyComplainerRejected
    static complaintResolved = notifyComplainerResolved
}