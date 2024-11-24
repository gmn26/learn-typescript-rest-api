import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  CreateUserRequest,
  LoginRequest,
  toUserResponse,
  UserRespone,
  toGetUserInfo,
  GetUserInfo,
  ChangePassword,
} from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

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

  static async login(request: LoginRequest): Promise<UserRespone> {
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

  static async getUserInfo(token: string): Promise<GetUserInfo> {
    const datas = await prismaClient.user.findFirst(
      {
        where: {
          token: token,
        }
      }
    );

    if (!datas) {
      throw new ResponseError(400, "Invalid credentials")
    }

    const response = toGetUserInfo(datas);
    return response;
  }

  static async changePassword(token: string, request: ChangePassword): Promise<GetUserInfo> {
    const changePasswordRequest = Validation.validate(
      UserValidation.CHANGEPASSWORD,
      request
    )

    let user = await prismaClient.user.findFirst(
      {
        where: {
          token: token,
        }
      }
    );

    if (!user) {
      throw new ResponseError(401, "No credentials");
    }

    const samePassword = await bcrypt.compare(changePasswordRequest.password, user.password);

    // todo: fix this condition
    // this condition cause and error that could stop server and not return the ResponseError
    if (samePassword) {
      throw new ResponseError(400, "Cannot change with previous password");
    }

    const newHashedPassword = await bcrypt.hash(changePasswordRequest.password, 10);

    user = await prismaClient.user.update(
      {
        where: {
          username: user.username,
        },
        data: {
          password: newHashedPassword,
        }
      },
    );

    const response = toGetUserInfo(user);
    return response;
  }
}
