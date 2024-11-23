import { NextFunction, Response, Request } from "express";
import { CreateUserRequest } from "../model/user-model";
import { UserService } from "../service/user-service";

export class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateUserRequest = req.body;
      const response = await UserService.register(request);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateUserRequest = req.body;
      const response = await UserService.login(request);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error)
    }
  }

  static async getUserInfo(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateUserRequest = req.body;
      const response = await UserService.getUserInfo();
      res.status(200).json({
        data: response,
      })
    } catch (error) {
      next(error)
    }
  }
}
