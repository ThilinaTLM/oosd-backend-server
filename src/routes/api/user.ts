import { Router } from "express";
import { user } from "../../controller/";
import { preBuilt } from '../../middlewares'

export const userRouter = Router();

/**
 * End Points
 */
userRouter.get('/check-username/:username', user.checkUsername);
userRouter.post('/register', preBuilt.ALL_ROLES_NOT_STRICT, user.add);

userRouter.post('/login', user.login);

userRouter.get('/get-user', preBuilt.ONLY_ADMIN, user.get); // query allowed, (username not included)

userRouter.put('/update-user/:userId', preBuilt.ALL_ROLES, user.updateData);
userRouter.put('/update-credential/:userId', preBuilt.ALL_ROLES, user.updateCredential);
userRouter.put('/verify-user/:userId', preBuilt.ONLY_ADMIN, user.verify);
userRouter.put('/disable-user/:userId', preBuilt.ONLY_ADMIN, user.disable);

userRouter.get('/get-count', preBuilt.ONLY_ADMIN, user.count); // query allowed
