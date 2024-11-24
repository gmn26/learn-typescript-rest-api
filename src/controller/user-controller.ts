import { NextFunction, Response, Request } from "express";
import { ChangePassword, CreateUserRequest } from "../model/user-model";
import { UserService } from "../service/user-service";
import { ResponseError } from "../error/response-error";

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
      const token: string | undefined = req.headers["authorization"];

      if (token == undefined) {
        throw new ResponseError(401, "No credentials")
      }

      const response = await UserService.getUserInfo(token);
      res.status(200).json({
        data: response,
      })
    } catch (error) {
      next(error)
    }
  }

  static async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const token: string = req.headers["authorization"]!;
      const request: ChangePassword = req.body;

      const response = UserService.changePassword(token, request);
      res.status(200).json({ response });
    } catch (error) {
      next(error)
    }
  }
}
