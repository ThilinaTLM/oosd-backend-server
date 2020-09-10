import express, { Router } from "express";
import { user } from "../../controller/";

export const userRouter = Router();

/**
 * End Points
 */
userRouter.post('/login', user.login );
userRouter.post('/register', user.add );