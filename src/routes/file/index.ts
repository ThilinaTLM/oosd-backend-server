import { Router } from "express";
import { files } from "../../controller";

export const fileRouter = Router()

/**
 * Serving Files
 */
fileRouter.use('/get', files )