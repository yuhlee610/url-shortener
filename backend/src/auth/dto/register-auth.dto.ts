import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class RegisterAuthDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
