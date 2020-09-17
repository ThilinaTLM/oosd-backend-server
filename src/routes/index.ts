import { Router } from "express";
import { userRouter } from "./api/user";
import { RBuilder } from "../middlewares";
import { Response } from "../core";
import { utilsRouter } from "./api/utils";
import { fileRouter } from "./file";
import { cusRouter } from "./api/customer";

export const apiRouter = Router();

/**
 * Middle-wares
 */
apiRouter.use(RBuilder);

/**
 * End Points
 */
apiRouter.get("/", (req, res) => {
    const { r } = res as Response;
    r.status.OK()
        .message("Welcome to Testing API")
        .send();
});


/**
 * Routers
 */
apiRouter.use("/user", userRouter);
apiRouter.use("/customer", cusRouter)
apiRouter.use("/util", utilsRouter);
apiRouter.use("/file", fileRouter);