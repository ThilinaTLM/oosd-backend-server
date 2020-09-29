import { Router } from "express";
import { file } from "../../controller";
import { attachmentParser, preBuilt, RBuilder } from "../../middlewares";

export const fileRouter = Router()

/**
 * Middle-wares
 */
fileRouter.use(RBuilder);

/**
 * Serving Files
 */
fileRouter.get('/attachment/:attachmentId',  preBuilt.ALL_ROLES, file.getAttachment);

/**
 * Single file upload
 */
fileRouter.post('/upload/attachment', preBuilt.ALL_ROLES, attachmentParser, file.addAttachment);