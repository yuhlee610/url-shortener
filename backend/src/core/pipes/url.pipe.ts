import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class UrlPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    if (!urlRegex.test(value)) {
      throw new BadRequestException('Invalid URL');
    }
    return value;
  }
}