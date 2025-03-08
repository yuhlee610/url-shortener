import { Url } from "src/urls/entities/url.entity";

export class CreateVisitorDto {
  ipAddress: string;
  url: Url;
}
