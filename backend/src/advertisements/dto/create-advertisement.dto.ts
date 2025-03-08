import { IsNotEmpty } from 'class-validator';

export class CreateAdvertisementDto {
  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  title: string;
}
