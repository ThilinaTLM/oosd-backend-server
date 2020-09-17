import { AuthBuilder } from "./auth/build";
import { bindRBuilder as bRB } from "./response";
import { Handler } from "express";

/**
 * Authentication Middleware builder with PreBuilts
 * ABuilder: Function which returns Builder Object
 */
export const ABuilder = () => new AuthBuilder();
export const preBuilt = {
    ALL_ROLES: ABuilder().build(),
    ONLY_ADMIN: ABuilder().allow.ADMIN().build(),
    ONLY_DIS_OFFICER: ABuilder().allow.DIS_OCR().build(),
    ONLY_DIS_SEC: ABuilder().allow.DIS_SEC().build()
}


/**
 * Bind RBuilder instance with every Response
 */
export const RBuilder = bRB as unknown as Handler;