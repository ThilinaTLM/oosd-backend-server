require("dotenv").config();
import bodyParser from "body-parser";
import express from "express";
import cors from 'cors'
import { apiRouter } from "./routes";

const PORT = Number(process.env.PORT) || 8080;
const allowOrigin = process.env.ALLOWED_HOST;
const app = express();

// middle-wares
app.use(cors({
    origin: allowOrigin
}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.use("/api", apiRouter);

// start
app.listen(PORT, () => console.log(`Listening at ${PORT}`));