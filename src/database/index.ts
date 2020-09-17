import { user } from "./models/user";
import { utils } from "./models/utils";
import {customer} from "./models/customer";
import { ModelErrorSet, ModelError as MError } from "./core/errors";

/**
 * Model Error Set for handle errors
 */
export const MErr = ModelErrorSet;
export type ModelError = MError;

/**
 * Models For Accessing Database
 */
export const model = {
    user,
    utils,
    customer
};