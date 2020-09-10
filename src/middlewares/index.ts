import { AuthenticatorBuilder } from "./authenticator";
import { bindRBuilder as bRB } from "./response";
import { Handler } from "express";

/**
 * Authentication Middleware builder
 */
export const ABuilder = () => new AuthenticatorBuilder();

/**
 * Bind RBuilder instance with every Response
 */
export const RBuilder = bRB as unknown as Handler;