import multer from "multer";
import { attachmentStorage } from "./storage";

/**
 * File parser middle-wares
 */
export const attachmentUpload = multer(
    {
        storage: attachmentStorage
    }
).single("attachment");