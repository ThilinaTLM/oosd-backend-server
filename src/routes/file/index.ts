import { Router } from "express";
import { file } from "../../controller";
import { attachmentParser } from "../../middlewares";

export const fileRouter = Router()

/**
 * Serving Files
 */
fileRouter.get('/attachment/:attachmentId', file.getAttachment)

/**
 * Single file upload
 */
fileRouter.post('/upload', attachmentParser, (req, res) => {
    res.status(200).json({
        message: 'Successfully Uploaded'
    })
})