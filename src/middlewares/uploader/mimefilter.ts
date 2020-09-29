import { Express } from "express";
import { FileFilterCallback } from "multer";

/**
 * Mime filter
 */
export function onlyPDF(req: Express.Request, file: Express.Multer.File, cb: FileFilterCallback) {
    if (file.mimetype === "application/pdf") {
        cb(null, true);
        return;
    }
    cb(null, false);
}