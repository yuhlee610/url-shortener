import { IsUrl } from "src/core/decorators/validator.decorator";

export class GuestCreateUrlDto {
  @IsUrl()
  sourceUrl: string;
}

export class CreateUrlDto {
  @IsUrl()
  sourceUrl: string;

  @IsUrl()
  destinationUrl: string;
}
