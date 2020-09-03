import { join, extname } from 'path'
import multer from 'multer'

//
const UPLOADS_DIRECTORY = join(__dirname, process.env.UPLOADS_DIR || "uploads")

const multerStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, UPLOADS_DIRECTORY);
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + extname(file.originalname));
    }
});

