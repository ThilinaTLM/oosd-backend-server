import { Router } from "express";
import { Response } from "../../core";
import { RBuilder } from "../../middlewares";
import { userRouter } from "./user";
import { cusRouter } from "./customer";
import { comRouter } from "./complaint";
import { utilsRouter } from "./utils";

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
apiRouter.use("/customer", cusRouter);
apiRouter.use("/complaint", comRouter)
apiRouter.use("/util", utilsRouter);
