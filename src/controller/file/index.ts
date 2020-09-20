import { static as fileHandler, Express } from "express";
import multer, {FileFilterCallback} from "multer";
import { join, extname } from "path";
import { Handler } from "../../core";

const UPLOADS_DIRECTORY = join(process.cwd(), process.env.UPLOADS_DIR || "uploads")
const ATTACHMENTS_DIRECTORY = join(UPLOADS_DIRECTORY, 'attachments')

/**
 * Static File Server
 */
export const getAttachment: Handler = async (req, res) => {
    const { attachmentId } = req.params
    res.download(join(ATTACHMENTS_DIRECTORY, attachmentId))
}

