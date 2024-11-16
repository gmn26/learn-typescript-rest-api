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

export type loginRequest = {
  username: string
  password: string
}