import bodyParser from "body-parser";

require("dotenv").config();
import express from "express";
import { apiRouter } from "./routes";

const PORT = Number(process.env.PORT) || 8080;

const app = express();

// middle-wares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.use("/api", apiRouter);

// start
app.listen(PORT, () => console.log(`Listening at ${PORT}`));