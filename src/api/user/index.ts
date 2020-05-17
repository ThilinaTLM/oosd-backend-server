import { Router, Request, Response, json } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Validators
import { vSignIn } from "./validators";

// Models
import { User } from "../../model/tables/users";
import { Password } from "../../model/tables/passwords";

// Variables
import { SECRET } from "../../env";
import { SALT_ROUNDS } from "../../env";

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
    res.send("User API");
}

async function signIn(req: Request, res: Response) {
    const username = req.body.username;
    const password = req.body.password;

    const resData: {
        state?: "SUCCESS" | "FAILED";
        userData?: any;
        token?: string;
        msg?: string;
    } = {};

    const user: any = await User.findOne({
        attributes: ["userId", "userName", "firstName", "lastName", "roleId"],
        where: {
            userName: username
        }
    });

    if (!user) {
        return res.status(404).send("Wrong username or password!");
    }

    const pass: any = await Password.findOne({
        attributes: ["hash", "active"],
        where: {
            userId: user.userId
        }
    });

    if (!pass.active) {
        return res.status(400).send("User has not activated!");
    }

    const correctPass = await bcrypt.compare(password, pass.hash);
    if (correctPass) {
        user.authenticated = true;
        return res.json(user);
    } else {
        return res.status(400).send("Wrong username or password!");
    }
}

async function signUp(req: Request, res: Response) {
    // sign up funtionality
}
