import { Handler } from "express";
import { userLogin } from "./user/login";
import { addUser } from "./user/add";
import { addDivision, addGNOffice, getAllDivisions, getAllGNOffices } from "./utils";

/**
 * User Account Controllers
 */
export const user = {
    login: userLogin as Handler, // login user with username and password
    add: addUser as Handler // add user account
};

/**
 * Additional Controllers
 */
export const utils = {
    addDivision: addDivision as Handler,
    addGNOffice: addGNOffice as Handler,
    getAllDivisions: getAllDivisions as Handler,
    getAllGNOffices: getAllGNOffices as Handler
};