import { Handler } from "express";
import {
    addUser,
    loginUser,
    getUser,
    isUsernameExist,
    updateUserData,
    updateCredential,
    verifyUser,
    disableUser
} from "./user";
import {
    addCustomer,
    getCustomer,
    updateCustomer
} from "./customer";
import {
    addDivision,
    addGNOffice,
    getAllDivisions,
    getAllGNOffices
} from "./utils";
import {
    addComplaint,
    getComplaint,
    updateComplaint
} from "./complaint";

import { getAttachment } from "./file";

/**
 * User Account Controllers
 */
export const user = {
    login: loginUser as Handler, // login user with username and password
    add: addUser as Handler, // add user account
    get: getUser as Handler,
    checkUsername: isUsernameExist as Handler,
    updateData: updateUserData as Handler,
    updateCredential: updateCredential as Handler,
    verify: verifyUser as Handler,
    disable: disableUser as Handler
};

/**
 * Customer Profile Controllers
 */
export const customer = {
    add: addCustomer as Handler,
    get: getCustomer as Handler,
    update: updateCustomer as Handler
};

/**
 * Complaint Controllers
 */
export const complaint = {
    addComplaint: addComplaint as Handler,
    getComplaint: getComplaint as Handler,
    updateComplaint: updateComplaint as Handler
};

/**
 * Additional Controllers
 */
export const util = {
    addDivision: addDivision as Handler,
    addGNOffice: addGNOffice as Handler,
    getAllDivisions: getAllDivisions as Handler,
    getAllGNOffices: getAllGNOffices as Handler
};

/**
 * Serve Static Files
 */
export const file = {
    getAttachment: getAttachment as Handler
};