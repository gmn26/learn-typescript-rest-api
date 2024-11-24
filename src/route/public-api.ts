import express from 'express';
import { UserController } from '../controller/user-controller';

export const publicRouter = express.Router();
publicRouter.post("/api/users/", UserController.register);
publicRouter.post("/api/users/login", UserController.login);
publicRouter.get("/api/users", UserController.getUserInfo);
publicRouter.patch("/api/users/edit", UserController.changePassword)