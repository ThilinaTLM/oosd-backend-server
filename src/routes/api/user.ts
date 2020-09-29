import { Router } from "express";
import { user } from "../../controller/";
import { disableUser } from "../../controller/user";

export const userRouter = Router();

/**
 * End Points
 */
userRouter.get('/check-username/:username', user.checkUsername);
userRouter.post('/register', user.add);

userRouter.post('/login', user.login);

userRouter.get('/get-user', user.get); // query allowed, (username not included)

userRouter.put('/update-user/:userId', user.updateData);
userRouter.put('/update-credential/:userId', user.updateCredential);
userRouter.put('/verify-user/:userId', user.verify);
userRouter.put('/disable-user/:userId', user.disable);