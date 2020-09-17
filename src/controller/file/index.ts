import { static as fileHandler, Express } from "express";
import multer, {FileFilterCallback} from "multer";
import { join, extname } from "path";

const DIRECTORY = join(process.cwd(), process.env.UPLOADS_DIR || "uploads")

/**
 * Static File Server
 */
export const fileServer = fileHandler(DIRECTORY);

/**
 * Multer Storage: Complaint Documents
 */
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, DIRECTORY);
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + extname(file.originalname));
    }
});

/**
 * filter
 */
function fileFilter(req: Express.Request, file: Express.Multer.File, cb: FileFilterCallback) {
    console.log("File filtering", file.mimetype)
    cb(null, true)
}

/**
 *
 */
export const uploadFile = multer({ storage: storage, }).single('attachments')
