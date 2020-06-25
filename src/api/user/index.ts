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
        statusCode?: number;
    } = {};

    const user: any = await User.findOne({
        attributes: ["userId", "userName", "firstName", "lastName", "roleId"],
        where: {
            userName: username
        }
    });

    if (!user) {
        resData.statusCode = 404;
        resData.state = "FAILED";
        resData.msg = "Wrong username or password!";
        return res.status(resData.statusCode).json(resData);
    }

    const pass: any = await Password.findOne({
        attributes: ["hash", "active"],
        where: {
            userId: user.userId
        }
    });

    if (!pass.active) {
        resData.statusCode = 400;
        resData.state = "FAILED";
        resData.msg = "User has not activated!";
        return res.status(resData.statusCode).json(resData);
    }

    const correctPass = await bcrypt.compare(password, pass.hash);
    if (correctPass) {
        resData.statusCode = 200;
        resData.state = "SUCCESS";
        resData.userData = user;
        resData.token = jwt.sign(user.toJSON(), SECRET);
        return res.status(resData.statusCode).json(resData);
    } else {
        resData.statusCode = 400;
        resData.state = "FAILED";
        resData.msg = "Wrong username or password!";
        return res.status(resData.statusCode).json(resData);
    }
}

async function signUp(req: Request, res: Response) {
    // sign up funtionality
}
