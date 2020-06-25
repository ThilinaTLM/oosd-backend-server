import express, { Request, Response } from "express";

import rApi from "./api";
import { PORT } from "./env";
import models from "./model";

// Request Handlers ---------------------------------------------------------------------

function index(req: Request, res: Response) {
    res.send("Welcome");
}

//---------------------------------------------------------------------------------------

const app = express();

app.locals.models = models;
app.use("/api/", rApi);
app.get("/", index);

app.listen(PORT, () => console.log(`Listening at port ${PORT}`));
