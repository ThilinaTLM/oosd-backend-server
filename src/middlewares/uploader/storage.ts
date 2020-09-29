import { extname, join } from "path";
import multer from "multer";
import { v4 as genUUID } from "uuid";

const UPLOADS_DIRECTORY = join(process.cwd(), process.env.UPLOADS_DIR || "uploads")
const ATTACHMENTS_DIRECTORY = join(UPLOADS_DIRECTORY, 'attachments')

/**
 * Multer Storage: Complaint Documents
 */
export const attachmentStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, ATTACHMENTS_DIRECTORY);
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, genUUID());
    }
});

/**
 * Multer Storage: Other Documents
 */
export const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, UPLOADS_DIRECTORY);
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + extname(file.originalname));
    }
});