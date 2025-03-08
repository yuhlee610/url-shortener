import { UpdateResult } from "typeorm";
import { User } from "../entities/user.entity";

export interface IUsersRepository {
  createUser: (user: User) => Promise<User>;
  findUserByEmailAndPassword: (user: User) => Promise<User>;
  updateUserRefreshToken: (
    id: number,
    refreshToken: string,
  ) => Promise<UpdateResult>;
  findUserByRefreshToken: (refreshToken: string) => Promise<User>;
  findUserByEmail: (email: string) => Promise<User>;
  findUsersAndCount: (page: number, limit: number) => Promise<[User[], number]>;
  softDeleteUser: (id: number) => Promise<UpdateResult>;
  updatePassword: (id: number, password: string, newHashPassword: string) => Promise<UpdateResult>;
}