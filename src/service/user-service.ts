import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  CreateUserRequest,
  loginRequest,
  toUserResponse,
  UserRespone,
} from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import { response } from "express";

export class UserService {
  static async register(request: CreateUserRequest): Promise<UserRespone> {
    const registerRequest = Validation.validate(
      UserValidation.REGISTER,
      request
    );

    const checkUsername = await prismaClient.user.findUnique({
      where: {
        username: registerRequest.username,
      },
    });

    if (checkUsername) {
      throw new ResponseError(400, "Username already exists");
    }

    registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

    const user = await prismaClient.user.create({
      data: registerRequest,
    });

    return toUserResponse(user);
  }

  static async login(request: loginRequest): Promise<UserRespone> {
    const loginRequest = Validation.validate(
      UserValidation.LOGIN,
      request
    )

    let user = await prismaClient.user.findUnique({
      where: {
        username: loginRequest.username,
      }
    })

    if (!user) {
      throw new ResponseError(400, "Invalid credentials")
    }

    const isValid = await bcrypt.compare(loginRequest.password, user.password)

    if (!isValid) {
      throw new ResponseError(400, "Invalid credentials")
    }

    user = await prismaClient.user.update({
      where: {
        username: user.username,
      },
      data: {
        token: uuid(),
      }
    })

    const response = toUserResponse(user);
    response.token = user.token!;
    return response;
  }
}