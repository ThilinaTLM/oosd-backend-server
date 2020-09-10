import { Router } from "express";
import { userRouter } from "./api/user";
import { RBuilder } from "../middlewares";
import { Response } from "../core";
import { utilsRouter } from "./api/utils";

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
apiRouter.use("/util", utilsRouter);