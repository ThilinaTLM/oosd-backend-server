import {
    Request as ExpRequest,
    Response as ExpResponse,
} from "express";

import { UserData } from "../../database/models/user";
import { RBuilder } from "../";

export interface Request extends ExpRequest {
    user: UserData
}

export interface Response extends ExpResponse {
    r: typeof RBuilder.prototype
}