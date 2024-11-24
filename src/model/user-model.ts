import { User } from "@prisma/client";

export type UserRespone = {
  username: string;
  name: string;
  token?: string;
};

export type CreateUserRequest = {
  username: string;
  name: string;
  password: string;
};

export function toUserResponse(user: User): UserRespone {
  return {
    name: user.name,
    username: user.username,
  };
}

export type LoginRequest = {
  username: string
  password: string
}

export type GetUserInfo = {
  username: string;
  password: string;
  name: string;
  token: string;
}

export function toGetUserInfo(user: User): GetUserInfo {
  return {
    username: user.username,
    password: user.password,
    name: user.name,
    token: user.token ?? "",
  }
}

export type ChangePassword = {
  password: string;
}