import { Router } from "express";
import { userLogin } from "./controllers";

export const authRouter = Router();

authRouter.post("/login", userLogin);