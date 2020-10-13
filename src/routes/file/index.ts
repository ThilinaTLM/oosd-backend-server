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
 * Get Attachment Details
 */
fileRouter.get('/attachment/details/:attachmentId',  preBuilt.ALL_ROLES, file.getAttachmentDetails);


/**
 * Single file upload
 */
fileRouter.post('/upload/attachment', attachmentParser, file.addAttachment);