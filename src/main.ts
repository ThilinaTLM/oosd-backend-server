require("dotenv").config();
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import { apiRouter } from "./routes/api";
import { fileRouter } from "./routes/file";

const PORT = Number(process.env.PORT) || 8080;
const allowOrigins = process.env.ALLOWED_HOST || '';

const app = express();

// Middle-wares
if (allowOrigins == "all") {
    app.use(cors());
} else {
    app.use(cors({origin: allowOrigins.split('+')}));
}
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.use("/api", apiRouter);
app.use("/file", fileRouter);

// start
app.listen(PORT, () => console.log(`Listening at ${PORT}`));