import { IsNotEmpty } from "class-validator";

export class UpdateUserPasswordDto {
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  newPassword: string;
}
