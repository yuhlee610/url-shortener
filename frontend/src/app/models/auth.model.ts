import { Response } from "./response.model";
import { User } from "./user.model";

export type LoginType = {
  email: string;
  password: string;
};

export type SignupType = LoginType & {
  name: string;
};

export type LoginResponse = Response<{
  access_token: string;
  user: User;
}>;

export type RefreshTokenResponse = LoginResponse;