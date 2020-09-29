import { static as fileHandler, Express } from "express";
import multer, { FileFilterCallback } from "multer";
import { join, extname } from "path";
import { Handler } from "../../core";
import { MErr, model } from "../../database";

const UPLOADS_DIRECTORY = join(process.cwd(), process.env.UPLOADS_DIR || "uploads");
const ATTACHMENTS_DIRECTORY = join(UPLOADS_DIRECTORY, "attachments");

/**
 * Static File Server
 */
export const getAttachment: Handler = async (req, res) => {
    const { r } = res;
    const { attachmentId } = req.params;
    const [error, attachment] = await model.utils.getAttachment(attachmentId);

    if (error === MErr.NO_ERRORS) {
        res.contentType(attachment.contentType);
        res.download(join(ATTACHMENTS_DIRECTORY, attachmentId), attachment.originalName);
        return;
    }

    if (error === MErr.NO_ENTRY_FOUND) {
        r.status.NOT_FOUND()
            .message(`Couldn't find the attachment`)
            .send();
        return;
    }

    r.send_ISE();
};

export const uploadAttachment: Handler = async (req, res) => {
    const { r } = res;
    const { file } = req;
    if (file == undefined) {
        r.status.BAD_REQ()
            .message("Invalid file.")
            .send();
        return;
    }

    const error = await model.utils.addAttachment(file.filename, file.originalname, file.mimetype);

    if (error === MErr.NO_ERRORS) {
        r.status.OK()
            .message("Successfully uploaded")
            .data(file.filename)
            .send();
        return;
    }

    r.send_ISE();
};
