import { Router, static as FileServer } from "express";
import { join } from "path";

export const fileServer = Router()



const UPLOADS_DIRECTORY = join(__dirname, process.env.UPLOADS_DIR || "uploads")
const handler = FileServer(UPLOADS_DIRECTORY);