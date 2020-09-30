import { AuthBuilder } from "./auth/build";
import { bindRBuilder as bRB } from "./response";
import { Handler } from "express";
import { attachmentUpload } from "./uploader/uploader";

/**
 * Authentication Middleware builder with PreBuilds
 * ABuilder: Function which returns Builder Object
 */
export const ABuilder = () => new AuthBuilder();
export const preBuilt = {
    ALL_ROLES: ABuilder().build(),
    ONLY_ADMIN: ABuilder().allow.ADMIN().build(),
    ONLY_DIS_OFFICER: ABuilder().allow.DIS_OCR().build(),
    ONLY_DIS_SEC: ABuilder().allow.DIS_SEC().build(),
    ALL_ROLES_NOT_STRICT: ABuilder().disableToken().build()
};

/**
 * Bind RBuilder instance with every Response
 */
export const RBuilder = bRB as unknown as Handler;

/**
 * Accept files from frontend
 */
export const attachmentParser = attachmentUpload;