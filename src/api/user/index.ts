import { Router, Request, Response, json } from "express";
import Sequelize from "sequelize";
import { vSignIn } from "./validators";

// Models
import { User } from "../../model/tables/users";

const rUser = Router();

// Bind middlewares
rUser.use(json()); // parse json content

// Routes
rUser.get("/", index);
rUser.post("/signin", vSignIn, signIn);
rUser.post("/signup", index);

export default rUser;

// ----------------------------------------------------------------------------------
// Request Handlers
function index(req: Request, res: Response) {
    res.send("User Route");
}

async function signIn(req: Request, res: Response) {
    const username = req.body.username;
    const password = req.body.password;

    const results = await User.findOne({
        where: {
            userName: username
        }
    });

    res.json(results);
}
