import { Router } from "express";
import userController from "../controllers/user.controller";

const userRouter = Router()

userRouter.post('/create', userController.create)
userRouter.post('/login', userController.authenticate)

export default userRouter