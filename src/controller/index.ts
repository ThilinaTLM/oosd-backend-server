import { Handler } from "express";
import {
    addUser,
    loginUser,
    getUser,
    isUsernameExist,
    updateUserData,
    updateCredential,
    verifyUser,
    disableUser,
    getUserCount
} from "./user";
import {
    addCustomer,
    getCustomer, getCustomerCount,
    updateCustomer
} from "./customer";
import {
    addDivision,
    addGNOffice,
    getAllDivisions,
    getAllGNOffices,
    getAllComplaintStates,
    getAllComplaintTypes,
    getAllUserRoles,
    deleteDivision,
    deleteGNOffice
} from "./utils";
import {
    addComplaint,
    addAttachment,
    getComplaint,
    getAttachments,
    getComplaintLog,
    assignDivision,
    getComplaintCount,
    reAssignDivision,
    getComplaintComplete
} from "./complaint";
import {
    writeLogEntry,
    markAsAwaitingApproval,
    markAsApproved,
    markForDivisionalAccept,
    markAsAccepted,
    markForDivReview,
    markAsFDivReviewed,
    markForDisReview,
    markAsDisReviewed,
    markAsSolved,
    markAsRejected,
    updateStatusManual
} from "./complaint/update";

import { getAttachment, uploadAttachment, getAttachmentDetails } from "./file";

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
    disable: disableUser as Handler,
    count: getUserCount as Handler
};

/**
 * Customer Profile Controllers
 */
export const customer = {
    add: addCustomer as Handler,
    get: getCustomer as Handler,
    update: updateCustomer as Handler,
    count: getCustomerCount as Handler
};

/**
 * Complaint Controllers
 */
export const complaint = {
    addComplaint: addComplaint as Handler,
    addAttachment: addAttachment as Handler,
    assignDivision: assignDivision as Handler,
    reAssignDivision: reAssignDivision as Handler,
    writeLogEntry: writeLogEntry as Handler,

    getComplaint: getComplaint as Handler,
    getAttachments: getAttachments as Handler,
    getComplaintLog: getComplaintLog as Handler,
    getCount: getComplaintCount as Handler,
    getComplaintComplete: getComplaintComplete as Handler,

    status: {
        markAsAwaitingApproval: markAsAwaitingApproval as Handler,
        markAsApproved: markAsApproved as Handler,
        markForDivisionalAccept: markForDivisionalAccept as Handler,
        markAsAccepted: markAsAccepted as Handler,
        markForDivReview: markForDivReview as Handler,
        markAsDivReviewed: markAsFDivReviewed as Handler,
        markForDisReview: markForDisReview as Handler,
        markAsDisReviewed: markAsDisReviewed as Handler,
        markAsSolved: markAsSolved as Handler,
        markAsRejected: markAsRejected as Handler,
        updateStatusManual: updateStatusManual as Handler
    }
};

/**
 * Additional Controllers
 */
export const util = {
    addDivision: addDivision as Handler,
    addGNOffice: addGNOffice as Handler,

    deleteDivision: deleteDivision as Handler,
    deleteGNOffice: deleteGNOffice as Handler,

    getAllDivisions: getAllDivisions as Handler,
    getAllGNOffices: getAllGNOffices as Handler,
    getAllComplaintStates: getAllComplaintStates as Handler,
    getAllComplaintTypes: getAllComplaintTypes as Handler,
    getAllUserRoles: getAllUserRoles as Handler
};

/**
 * Serve Static Files
 */
export const file = {
    getAttachment: getAttachment as Handler,
    getAttachmentDetails: getAttachmentDetails as Handler,
    addAttachment: uploadAttachment as Handler
};